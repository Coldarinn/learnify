import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"
import { ArgsProps } from "antd/es/notification"
import { ReactNode } from "react"

import { useNotification } from "@/shared/components/Notification"

export const useApiAction = <TParams, TResult>(
  fn: (params: TParams) => Promise<TResult>,
  options?: {
    success?: Omit<ArgsProps, "description" | "message"> & {
      message?: string
      description?: (error: string) => ReactNode
    }
    showError?: boolean
    error?: Omit<ArgsProps, "description" | "message"> & {
      message?: string
      description?: (error: string) => ReactNode
    }
  }
) => {
  const { success, error, showError = true } = options || {}

  const notify = useNotification()

  const apiAction = action(async (params: TParams) => {
    try {
      const result = await wrap(fn(params))
      if (success?.message) notify.success({ ...success, message: success.message, description: success.description?.(success.message!) })
      return result
    } catch (err) {
      let message = ""

      if (err instanceof Error && "errors" in err && Array.isArray(err.errors)) {
        message = err.errors.map((err) => err.message).join("; ")
      } else if (err instanceof Error) {
        message = err.message
      } else {
        message = error?.message || "Something went wrong"
      }

      if (showError) notify.error({ ...error, message, description: error?.description?.(message) })
      throw err
    }
  }).extend(withAsync())

  return apiAction
}
