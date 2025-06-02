export type AppRoutes = {
  "/": void
  "/about": void
  "/auth": void
  "/auth/login": void
  "/auth/registration": void
  "/auth/reset": void
  "/user/:id": { id: string }
  "/posts/:postId/comments/:commentId": { postId: string; commentId: string }
  "/search": { query?: string; sort?: "asc" | "desc" }
}

export type RoutePath = keyof AppRoutes
export type RouteParams<T extends RoutePath> = AppRoutes[T]
