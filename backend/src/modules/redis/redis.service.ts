import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { createClient, RedisArgument, RedisClientType } from "redis"

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      url: this.configService.get("REDIS_URI"),
    })
    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }

  getClient(): RedisClientType {
    return this.client
  }

  set(key: string, value: string) {
    return this.client.set(key, value)
  }

  get(key: string) {
    return this.client.get(key)
  }

  del(key: string) {
    return this.client.del(key)
  }

  expire(key: RedisArgument, seconds: number, mode?: "NX" | "XX" | "GT" | "LT") {
    return this.client.expire(key, seconds, mode)
  }

  async scan(pattern: string) {
    const foundKeys: string[] = []
    let cursor = "0"

    do {
      const result = await this.client.scan(cursor, { MATCH: pattern, COUNT: 100 })
      cursor = result.cursor
      foundKeys.push(...result.keys)
    } while (cursor !== "0")

    return foundKeys
  }
}
