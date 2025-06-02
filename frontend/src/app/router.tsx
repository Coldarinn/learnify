import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import { type RouteObject as ReactRouterRouteObject } from "react-router-dom"

import { Link, type RoutePath } from "@/shared/router"

type RouteObject = Omit<ReactRouterRouteObject, "path" | "children"> & {
  path: RoutePath
  children?: RouteObject[] | ReactRouterRouteObject["children"]
}

const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <h1>Error Page</h1>,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>,
      },
      {
        path: "/about",
        element: <h1>About Page</h1>,
      },
      {
        path: "/auth",
        element: (
          <>
            <h1>Auth Layout</h1>
            <hr />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" replace />,
          },
          {
            path: "/auth/login",
            element: (
              <h2>
                Login Page <Link to="/auth/registration">Registration</Link>
              </h2>
            ),
          },
          {
            path: "/auth/registration",
            element: <h2>Registration Page</h2>,
          },
        ],
      },
      {
        path: "/user/:id",
        element: <h1>User Page</h1>,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]

export const router = createBrowserRouter(routerConfig as ReactRouterRouteObject[])
