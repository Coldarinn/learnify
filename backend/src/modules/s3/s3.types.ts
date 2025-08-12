import { Readable } from "stream"

export interface UploadFileOptions {
  stream?: Readable
  key: string
  contentType?: string
  acl?: "private" | "public-read"
}

export interface DeleteFileOptions {
  key: string
}

export interface GetFileOptions {
  key: string
}

export interface GetPresignedUrlOptions {
  key: string
  expiresInSeconds?: number
}
