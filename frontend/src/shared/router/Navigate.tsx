import { Navigate as ReactRouterNavigate } from "react-router"

import { compilePath } from "./compilePath"
import { type AppRoutes, type RoutePath } from "./types"

type NavigateProps<Path extends RoutePath> = {
  to: Path
  params?: AppRoutes[Path]
  state?: unknown
  replace?: boolean
}

export const Navigate = <Path extends RoutePath>(props: NavigateProps<Path>) => {
  const { to, params, state, replace } = props

  const path = compilePath(to, params)

  return (
    <ReactRouterNavigate
      to={{
        pathname: path,
        ...(state !== undefined ? { state } : {}),
      }}
      replace={replace}
    />
  )
}
