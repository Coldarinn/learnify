import { Link as ReactRouterLink } from "react-router"

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

export const Link = <Path extends RoutePath>(props: LinkProps<Path>) => {
  const { to, params, state, replace, reloadDocument, children, ...rest } = props

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
