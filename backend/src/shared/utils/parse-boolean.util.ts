export function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value

  if (typeof value === "string") {
    const v = value.trim().toLowerCase()
    if (v === "true") return true
    if (v === "false") return false
  }

  throw new Error(`Couldn't convert the value of "${String(value)}" to a boolean value.`)
}
