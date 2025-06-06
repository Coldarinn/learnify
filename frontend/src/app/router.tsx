import { createBrowserRouter, Navigate } from "react-router"
import { type RouteObject } from "react-router"

import { AuthLayout, SignIn, SignUp } from "@/pages/auth"

export const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/sign-in" replace />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
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
