export type AppRoutes = {
  "/": never
  "/auth": never
  "/auth/sign-in": never
  "/auth/sign-up": never
}

export type RoutePath = keyof AppRoutes
export type RouteParams<T extends RoutePath> = AppRoutes[T]
