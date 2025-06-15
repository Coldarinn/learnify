export function parseBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value

  if (typeof value === "string") {
    const v = value.trim().toLowerCase()
    if (v === "true") return true
    if (v === "false") return false
  }

  throw new Error(`Не удалось преобразовать значение "${String(value)}" в логическое значение.`)
}
