import { redirect as reactRouterRedirect } from "react-router"

import { compilePath } from "./compilePath"
import { type AppRoutes, type RoutePath } from "./types"

export const redirect = <Path extends RoutePath>(to: Path, params?: AppRoutes[Path]) => {
  const path = compilePath(to, params)
  return reactRouterRedirect(path)
}
