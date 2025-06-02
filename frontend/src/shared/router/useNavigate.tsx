import { useNavigate as useReactRouterNavigate } from "react-router-dom"
import { type AppRoutes, type RoutePath } from "./types"
import { compilePath } from "./compilePath"

export const useNavigate = () => {
  const navigate = useReactRouterNavigate()

  return function typedNavigate<Path extends RoutePath>(
    to: Path,
    options?: {
      params?: AppRoutes[Path]
      state?: unknown
      replace?: boolean
    }
  ) {
    const path = compilePath(to, options?.params)
    navigate(path, {
      state: options?.state,
      replace: options?.replace,
    })
  }
}
