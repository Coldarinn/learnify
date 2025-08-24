import { action, wrap } from "@reatom/core"
import { withAsync } from "@reatom/core"

import { useNotification } from "@/shared/components/Notification"

export function useApiAction<TParams, TResult>(
  fn: (params: TParams) => Promise<TResult>,
  options?: {
    success?: string
    error?: string
    showError?: boolean
  }
) {
  const { success, error, showError = true } = options || {}

  const notify = useNotification()

  const apiAction = action(async (params: TParams) => {
    try {
      const result = await wrap(fn(params))
      if (success) notify.success({ message: success })
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : error || "Something went wrong"
      if (showError) notify.error({ message: message })
      throw err
    }
  }).extend(withAsync())

  return apiAction
}
