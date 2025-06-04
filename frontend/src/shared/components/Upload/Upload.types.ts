import type { GetProp } from "antd/es/_util/type"
import type { UploadProps as AntUploadProps } from "antd/es/upload"
export type { UploadRef } from "antd/es/upload/Upload"

export type UploadProps<T = unknown> = AntUploadProps<T>
export type FileType<T> = Parameters<GetProp<UploadProps<T>, "beforeUpload">>[0]
