import { type AppRoutes, type RoutePath } from "./types"

export const compilePath = <Path extends RoutePath>(path: Path, params?: AppRoutes[Path]): string => {
  if (!params) return path

  let result: Path | string = path
  for (const [key, value] of Object.entries(params)) {
    if (result.includes(`:${key}`)) {
      result = result.replace(`:${key}`, encodeURIComponent(String(value)))
    }
  }

  const queryParams: Record<string, string> = {}
  for (const [key, value] of Object.entries(params)) {
    if (!path.includes(`:${key}`) && value !== undefined) {
      queryParams[key] = String(value)
    }
  }

  if (Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString()
    return `${result}?${queryString}`
  }

  return result
}
