export const endpoints = {
  auth: {
    signIn: {
      endpoint: "/auth/sign-in",
      method: "POST",
    },
    signUp: {
      endpoint: "/auth/sign-up",
      method: "POST",
    },
    refresh: {
      endpoint: "/auth/refresh",
      method: "POST",
    },
    reset: {
      endpoint: "/auth/reset",
      method: "POST",
    },
  },
} as const
