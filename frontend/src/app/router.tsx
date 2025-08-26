import { userAtom } from "@/entities/user"
import { Navigate } from "@/shared/router"
import { computed } from "@reatom/core"
import { reatomComponent } from "@reatom/react"
import { ReactNode } from "react"
import { createBrowserRouter } from "react-router"
import { type RouteObject } from "react-router"

import { Dashboard } from "@/pages/Dashboard"
import { AuthLayout, ResetPassword, SignIn, SignUp } from "@/pages/auth"

import { Layout } from "./Layout"

type Props = {
  children: ReactNode
}
const isAuth = computed(() => !!userAtom().id)

const ProtectedRoute = reatomComponent((props: Props) => {
  const { children } = props

  return isAuth() ? children : <Navigate to="/auth/sign-in" replace />
})

const GuestRoute = reatomComponent((props: Props) => {
  const { children } = props

  return !isAuth() ? children : <Navigate to="/dashboard" replace />
})

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
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
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <Navigate to="/auth/sign-in" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]

export const router = createBrowserRouter(routes)
