import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Cron } from "@nestjs/schedule"
import { Request } from "express"

import { RedisService } from "@/modules/redis/redis.service"
import { SessionModel } from "@/modules/session/models/session.model"

import { SessionMetadata } from "./types/session-metadata.types"

@Injectable()
export class SessionService {
  private readonly prefix: string
  private readonly logger = new Logger(SessionService.name)

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {
    this.prefix = this.configService.get<string>("SESSION_PREFIX")!
  }

  save(session: Request["session"], userId: string, metadata: SessionMetadata): Promise<boolean> {
    session.createdAt = session.createdAt || new Date()
    session.userId = userId
    session.metadata = metadata

    return new Promise((resolve, reject) => {
      session.regenerate((err) => {
        if (err) reject(new InternalServerErrorException("Couldn't save session"))
        resolve(true)
      })
    })
  }

  async getById(sessionId: string): Promise<SessionModel> {
    const raw = await this.redisService.get(`${this.prefix}${sessionId}`)
    if (!raw) throw new NotFoundException("Session not found")

    return {
      ...(JSON.parse(raw) as SessionModel),
      id: sessionId,
    }
  }

  async getAllByUser(userId: string): Promise<SessionModel[]> {
    const keys = await this.redisService.scan(`${this.prefix}*`)

    const sessions = await Promise.all(
      keys.map(async (key) => {
        const raw = await this.redisService.get(key)
        if (!raw) return null

        const data = JSON.parse(raw) as SessionModel
        return data.userId === userId ? { ...data, id: key.replace(this.prefix, "") } : null
      })
    )

    return sessions.filter((s) => !!s).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  async terminateById(sessionId: string): Promise<boolean> {
    await this.redisService.del(`${this.prefix}${sessionId}`)
    return true
  }

  async terminateAllByUser(userId: string): Promise<boolean> {
    const keys = await this.redisService.scan(`${this.prefix}*`)

    const userSessionKeys: string[] = []

    for (const key of keys) {
      const raw = await this.redisService.get(key)
      if (!raw) continue

      const session = JSON.parse(raw) as SessionModel
      if (session.userId === userId) {
        userSessionKeys.push(key)
      }
    }

    if (userSessionKeys.length === 0) return true

    await this.redisService.del(userSessionKeys)
    return true
  }

  async exists(sessionId: string): Promise<boolean> {
    const data = await this.redisService.get(`${this.prefix}${sessionId}`)
    return !!data
  }

  @Cron("0 4 * * 0")
  async cleanupDeadSessions(): Promise<void> {
    this.logger.log("Starting session cleanup...")

    const keys = await this.redisService.scan(`${this.prefix}*`)
    if (keys.length === 0) {
      this.logger.log("No sessions to check")
      return
    }

    let removed = 0

    const multi = this.redisService.getClient().multi()

    for (const key of keys) {
      multi.ttl(key)
    }

    const results = await multi.exec()

    for (let i = 0; i < keys.length; i++) {
      const ttl = results[i]

      if (typeof ttl === "number" && ttl < 0) {
        await this.redisService.del(keys[i])
        removed++
      }
    }

    this.logger.log(`Cleanup complete: ${removed} dead sessions removed out of ${keys.length} checked`)
  }
}
