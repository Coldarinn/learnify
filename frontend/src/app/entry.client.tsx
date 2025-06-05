import React from "react"
import ReactDOM from "react-dom/client"
import { matchRoutes, RouterProvider } from "react-router"

import { routes, router } from "./router"

hydrate()

async function hydrate() {
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy)

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        // @ts-ignore
        const routeModule = await m.route.lazy?.()
        Object.assign(m.route, { ...routeModule, lazy: undefined })
      })
    )
  }

  ReactDOM.hydrateRoot(
    document.getElementById("app")!,
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}
