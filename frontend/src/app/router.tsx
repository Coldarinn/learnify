import { Navigate, createBrowserRouter } from "react-router"
import { type RouteObject } from "react-router"

import { Dashboard } from "@/pages/Dashboard"
import { AuthLayout, SignIn, SignUp } from "@/pages/auth"

import { Layout } from "./Layout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
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
