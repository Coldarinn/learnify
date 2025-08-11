export interface UploadFileOptions {
  buffer: Buffer
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
