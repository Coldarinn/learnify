import { useParams as useReactRouterParams } from "react-router-dom"

import { type AppRoutes, type RoutePath } from "./types"

export function useParams<Path extends RoutePath>(_path: Path): AppRoutes[Path] {
  return useReactRouterParams() as AppRoutes[Path]
}
