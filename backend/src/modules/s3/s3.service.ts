import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Readable } from "stream"

import { DeleteFileOptions, GetFileOptions, GetPresignedUrlOptions, UploadFileOptions } from "./s3.types"

@Injectable()
export class S3Service {
  private readonly s3: S3Client
  private readonly bucket: string

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get("S3_BUCKET")!

    this.s3 = new S3Client({
      region: this.configService.get("S3_REGION"),
      credentials: {
        accessKeyId: this.configService.get("S3_ACCESS_KEY_ID")!,
        secretAccessKey: this.configService.get("S3_SECRET_ACCESS_KEY")!,
      },
      endpoint: this.configService.get("S3_ENDPOINT"),
      forcePathStyle: true,
    })
  }

  async uploadFile({ stream, key, contentType, acl = "private" }: UploadFileOptions): Promise<string> {
    if (!stream) throw new InternalServerErrorException("No file data provided")

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: stream,
      ContentType: contentType,
      ACL: acl,
    })

    try {
      await this.s3.send(command)
      return key
    } catch (error) {
      console.error("S3 Upload error:", error)
      throw new InternalServerErrorException("S3 upload failed")
    }
  }

  async deleteFile({ key }: DeleteFileOptions): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    try {
      await this.s3.send(command)
      return true
    } catch (error) {
      console.error("S3 Delete error:", error)
      throw new InternalServerErrorException("S3 delete failed")
    }
  }

  async getFileStream({ key }: GetFileOptions): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    try {
      const result = await this.s3.send(command)
      return result.Body as Readable
    } catch (error) {
      console.error("S3 Download error:", error)
      throw new InternalServerErrorException("S3 download failed")
    }
  }

  async getPresignedUrl({ key, expiresInSeconds = 3600 }: GetPresignedUrlOptions): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    })

    try {
      return await getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds })
    } catch (error) {
      console.error("S3 Presigned URL error:", error)
      throw new InternalServerErrorException("Failed to generate signed URL")
    }
  }

  async listFolder(prefix = ""): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
      Delimiter: "/",
    })

    try {
      const result = await this.s3.send(command)
      return result.Contents?.map((item) => item.Key!) || []
    } catch (error) {
      console.error("S3 List error:", error)
      throw new InternalServerErrorException("S3 list failed")
    }
  }
}
