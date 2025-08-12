import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { ReadStream } from "fs-capacitor"
import { FileUpload } from "graphql-upload"

interface FileValidationOptions {
  maxSize?: number
  allowedMimeTypes?: string[]
}

const DEFAULT_OPTIONS: Required<FileValidationOptions> = {
  maxSize: 5 * 1024 * 1024,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/bmp", "image/tiff", "image/x-icon"],
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly options: Required<FileValidationOptions>

  constructor(options: FileValidationOptions = {}) {
    this.options = {
      maxSize: options.maxSize ?? DEFAULT_OPTIONS.maxSize,
      allowedMimeTypes: options.allowedMimeTypes ?? DEFAULT_OPTIONS.allowedMimeTypes,
    }
  }

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
    if (!this.options.allowedMimeTypes.includes(mimetype))
      throw new BadRequestException(`Invalid file type. Allowed types: ${this.options.allowedMimeTypes.join(", ")}`)
  }

  private async validateFileSize(fileStream: ReadStream): Promise<void> {
    const isValid = await new Promise<boolean>((resolve, reject) => {
      let totalSize = 0

      fileStream.on("data", (chunk: Buffer) => {
        totalSize += chunk.length
        if (totalSize > this.options.maxSize) {
          fileStream.destroy()
          resolve(false)
        }
      })

      fileStream.on("end", () => resolve(true))
      fileStream.on("error", reject)
    })

    if (!isValid) throw new BadRequestException(`File too large. Maximum size is ${this.options.maxSize / (1024 * 1024)} mb`)
  }
}
