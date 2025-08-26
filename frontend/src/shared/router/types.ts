export type AppRoutes = {
  "/": never
  "/auth": never
  "/auth/sign-in": never
  "/auth/sign-up": never
  "/auth/reset-password": { token: string }
  "/dashboard": never
  "/user-profile": never
}

export type RoutePath = keyof AppRoutes
export type RouteParams<T extends RoutePath> = AppRoutes[T]
