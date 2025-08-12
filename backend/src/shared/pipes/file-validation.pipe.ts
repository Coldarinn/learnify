import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { ReadStream } from "fs-capacitor"
import { FileUpload } from "graphql-upload"

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024
const DEFAULT_ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/bmp", "image/tiff", "image/x-icon"]

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize = DEFAULT_MAX_SIZE,
    private readonly allowedMimeTypes = DEFAULT_ALLOWED_MIME_TYPES
  ) {}

  async transform(value: FileUpload): Promise<FileUpload> {
    this.validateInput(value)
    const fileStream = value.createReadStream()

    try {
      this.validateMimeType(value.mimetype)
      await this.validateFileSize(fileStream)
      return value
    } finally {
      fileStream.destroy()
    }
  }

  private validateInput(value: FileUpload): void {
    if (!value?.filename) throw new BadRequestException("File not provided or invalid")
  }

  private validateMimeType(mimetype: string): void {
    if (!this.allowedMimeTypes.includes(mimetype))
      throw new BadRequestException(`Invalid file type. Allowed types: ${this.allowedMimeTypes.join(", ")}`)
  }

  private async validateFileSize(fileStream: ReadStream): Promise<void> {
    const isValid = await new Promise<boolean>((resolve, reject) => {
      let totalSize = 0

      fileStream.on("data", (chunk: Buffer) => {
        totalSize += chunk.length
        if (totalSize > this.maxSize) {
          fileStream.destroy()
          resolve(false)
        }
      })

      fileStream.on("end", () => resolve(true))
      fileStream.on("error", reject)
    })

    if (!isValid) throw new BadRequestException(`File too large. Maximum size is ${this.maxSize / (1024 * 1024)} mb`)
  }
}
