import { redirect as reactRouterRedirect } from "react-router-dom"
import { type AppRoutes, type RoutePath } from "./types"
import { compilePath } from "./compilePath"

export function redirect<Path extends RoutePath>(to: Path, params?: AppRoutes[Path]) {
  const path = compilePath(to, params)
  return reactRouterRedirect(path)
}
