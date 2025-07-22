import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { RedisStore } from "connect-redis"
import cookieParser from "cookie-parser"
import session from "express-session"
import ms, { StringValue } from "ms"

import { AppModule } from "./app.module"
import { RedisService } from "./modules/redis/redis.service"
import { parseBoolean } from "./shared/utils/parse-boolean.util"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true })

  const config = app.get(ConfigService)

  const redis = app.get(RedisService)

  app.use(cookieParser(config.get("COOKIES_SECRET")))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  app.use(
    session({
      secret: config.get("SESSION_SECRET")!,
      name: config.get<string>("SESSION_NAME"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: config.get<string>("SESSION_DOMAIN"),
        maxAge: ms(config.get<StringValue>("SESSION_MAX_AGE")!),
        httpOnly: parseBoolean(config.get("SESSION_HTTP_ONLY")),
        secure: parseBoolean(config.get("SESSION_SECURE")),
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redis,
        prefix: config.get("SESSION_FOLDER"),
      }),
    })
  )

  app.enableCors({
    origin: config.get<string>("ALLOWED_ORIGIN"),
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })

  await app.listen(config.get<number>("APPLICATION_PORT")!)
}
bootstrap()
