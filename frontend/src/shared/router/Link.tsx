import { Link as ReactRouterLink } from "react-router-dom"

import { compilePath } from "./compilePath"
import { type AppRoutes, type RoutePath } from "./types"

type LinkProps<Path extends RoutePath> = {
  to: Path
  params?: AppRoutes[Path]
  state?: unknown
  replace?: boolean
  reloadDocument?: boolean
  children?: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">

export function Link<Path extends RoutePath>({ to, params, state, replace, reloadDocument, children, ...rest }: LinkProps<Path>) {
  const path = compilePath(to, params)

  return (
    <ReactRouterLink
      to={{
        pathname: path,
        ...(state !== undefined ? { state } : {}),
      }}
      replace={replace}
      reloadDocument={reloadDocument}
      {...rest}
    >
      {children}
    </ReactRouterLink>
  )
}
