import { useLocation } from "react-router-dom"

import { type AppRoutes, type RoutePath } from "./types"

export function useQuery<Path extends RoutePath>(): Partial<AppRoutes[Path]> {
  const { search } = useLocation()
  return Object.fromEntries(new URLSearchParams(search).entries()) as Partial<AppRoutes[Path]>
}
