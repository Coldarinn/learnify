export type AppRoutes = {
  "/": never
  "/about": never
  "/auth": never
  "/auth/login": never
  "/auth/registration": never
  "/auth/reset": never
  "/user/:id": { id: string }
  "/posts/:postId/comments/:commentId": { postId: string; commentId: string }
  "/search": { query?: string; sort?: "asc" | "desc" }
}

export type RoutePath = keyof AppRoutes
export type RouteParams<T extends RoutePath> = AppRoutes[T]
