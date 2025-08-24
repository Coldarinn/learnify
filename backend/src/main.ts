import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { RedisStore } from "connect-redis"
import cookieParser from "cookie-parser"
import session from "express-session"
import { graphqlUploadExpress } from "graphql-upload"
import ms, { StringValue } from "ms"

import { AppModule } from "./app.module"
import { RedisService } from "./modules/redis/redis.service"
import { parseBoolean } from "./shared/utils/parse-boolean.util"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true })

  const config = app.get(ConfigService)

  const redis = app.get(RedisService)

  app.use(graphqlUploadExpress())

  app.use(cookieParser(config.get("COOKIES_SECRET")))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  app.use(
    session({
      secret: config.get("SESSION_SECRET")!,
      name: config.get("SESSION_NAME"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: config.get("SESSION_DOMAIN"),
        maxAge: ms(config.get<StringValue>("SESSION_MAX_AGE")!),
        httpOnly: parseBoolean(config.get("SESSION_HTTP_ONLY")),
        secure: parseBoolean(config.get("SESSION_SECURE")),
        sameSite: config.get("SESSION_SAME_SITE"),
      },
      store: new RedisStore({
        client: redis,
        prefix: config.get("SESSION_PREFIX"),
      }),
    })
  )

  const rawOrigins = config.get<string>("ALLOWED_ORIGINS")
  const origin = rawOrigins?.split(",").map((origin) => origin.trim())
  console.log("origin: ", origin)
  app.enableCors({
    origin,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })

  await app.listen(config.get<number>("APPLICATION_PORT")!)
}
bootstrap()
