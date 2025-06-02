import { useNavigate as useReactRouterNavigate } from "react-router-dom"

import { compilePath } from "./compilePath"
import { type AppRoutes, type RoutePath } from "./types"

export const useNavigate = () => {
  const navigate = useReactRouterNavigate()

  return async function typedNavigate<Path extends RoutePath>(
    to: Path,
    options?: {
      params?: AppRoutes[Path]
      state?: unknown
      replace?: boolean
    }
  ) {
    const path = compilePath(to, options?.params)
    await navigate(path, {
      state: options?.state,
      replace: options?.replace,
    })
  }
}
