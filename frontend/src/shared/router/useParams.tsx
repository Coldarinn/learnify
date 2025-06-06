import { useParams as useReactRouterParams } from "react-router"

import { type AppRoutes, type RoutePath } from "./types"

export const useParams = <Path extends RoutePath>(_path: Path): AppRoutes[Path] => {
  return useReactRouterParams() as AppRoutes[Path]
}
