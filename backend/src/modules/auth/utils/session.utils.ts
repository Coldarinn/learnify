import { InternalServerErrorException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import DeviceDetector from "device-detector-js"
import { Request } from "express"
import { lookup } from "geoip-lite"
import { User } from "prisma/generated"

import { SessionMetadata } from "@/modules/auth/types/session-metadata.types"
import { IS_DEV_ENV } from "@/shared/utils/is-dev.util"

function getClientIp(req: Request): string {
  if (IS_DEV_ENV) return "104.156.244.107"

  const cloudflareIp = Array.isArray(req.headers["cf-connecting-ip"]) ? req.headers["cf-connecting-ip"][0] : req.headers["cf-connecting-ip"]

  if (cloudflareIp) return cloudflareIp

  const forwardedFor = req.headers["x-forwarded-for"]
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0].trim()

  return req.ip || ""
}

export function getSessionMetadata(req: Request, userAgent: string): SessionMetadata {
  const ip = getClientIp(req)
  const location = lookup(ip)
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
    ip,
  }
}

export function saveSession(req: Request, user: User, metadata: SessionMetadata): Promise<User> {
  return new Promise((resolve, reject) => {
    req.session.createdAt = new Date()
    req.session.userId = user.id
    req.session.metadata = metadata

    req.session.save((err) => {
      if (err) reject(new InternalServerErrorException("Couldn't save session"))

      resolve(user)
    })
  })
}

export function destroySession(req: Request, configService: ConfigService): Promise<boolean> {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(new InternalServerErrorException("Couldn't destroy session"))

      req.res?.clearCookie(configService.get("SESSION_NAME")!)

      resolve(true)
    })
  })
}
