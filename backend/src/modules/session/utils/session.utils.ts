import DeviceDetector from "device-detector-js"
import { Request } from "express"
import { lookup } from "geoip-lite"

import { SessionMetadata } from "@/modules/session/types/session-metadata.types"

function getClientIp(headers: Request["headers"], ip: Request["ip"]): string {
  const cloudflareIp = Array.isArray(headers["cf-connecting-ip"]) ? headers["cf-connecting-ip"][0] : headers["cf-connecting-ip"]

  if (cloudflareIp) return cloudflareIp

  const forwardedFor = headers["x-forwarded-for"]
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0].trim()

  return ip || ""
}

export function getSessionMetadata(headers: Request["headers"], ip: Request["ip"], userAgent: string): SessionMetadata {
  const clientIp = getClientIp(headers, ip)
  const location = lookup(clientIp)
  const device = new DeviceDetector().parse(userAgent)

  return {
    location: {
      country: location?.country || "",
      city: location?.city || "",
      latitude: location?.ll[0] || 0,
      longitude: location?.ll[1] || 0,
    },
    device: {
      browser: device.client?.name || "",
      os: device.os?.name || "",
      type: device.device?.type || "",
    },
    ip: clientIp,
  }
}
