import { createBrowserRouter, Navigate, Outlet } from "react-router"
import { type RouteObject } from "react-router"

import { Link } from "@/shared/router"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div>
        <h1>Layout</h1>
        <hr />
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
      {
        path: "auth",
        element: (
          <>
            <h2>Auth Layout</h2>
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
            path: "sign-in",
            element: (
              <h3>
                Sign In <Link to="/auth/sign-in">Go To Sign Up</Link>
              </h3>
            ),
          },
          {
            path: "sign-up",
            element: (
              <h3>
                Sign Up <Link to="/auth/sign-up">Go To Sign In</Link>
              </h3>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
