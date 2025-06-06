import Cookies from "js-cookie"

export const accessToken = "accessToken"
export const refreshToken = "refreshToken"

export const getAccessToken = (cookieHeader?: string | null) => {
  if (cookieHeader) {
    const cookies = new Map(cookieHeader.split("; ").map((c) => c.split("=") as [string, string]))

    return cookies.get(accessToken) || null
  }

  return Cookies.get(accessToken) || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(accessToken, accessToken, { domain: import.meta.env.VITE_DOMAIN, sameSite: "strict", secure: true })
}

export const removeAccessToken = () => {
  Cookies.remove(accessToken)
}
