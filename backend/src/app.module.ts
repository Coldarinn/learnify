import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ScheduleModule } from "@nestjs/schedule"
import { GraphQLUpload } from "graphql-upload"
import { join } from "path"

import { TwoFaModule } from "./modules/2fa/2fa.module"
import { AuthModule } from "./modules/auth/auth.module"
import { MailerModule } from "./modules/mailer/mailer.module"
import { PrismaModule } from "./modules/prisma/prisma.module"
import { RedisModule } from "./modules/redis/redis.module"
import { S3Module } from "./modules/s3/s3.module"
import { SessionModule } from "./modules/session/session.module"
import { TokenModule } from "./modules/token/token.module"
import { UserModule } from "./modules/user/user.module"
import { GqlContext } from "./shared/types/gql-context.types"
import { IS_DEV_ENV, isDev } from "./shared/utils/is-dev.util"

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        graphiql: isDev(configService),
        path: configService.get<string>("GRAPHQL_PREFIX"),
        autoSchemaFile: join(process.cwd(), "src/graphql/schema.gql"),
        sortSchema: true,
        uploads: false,
        resolvers: { Upload: GraphQLUpload },
        context: ({ req, res }: GqlContext) => ({ req, res }),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),

    PrismaModule,
    RedisModule,
    MailerModule,

    TokenModule,
    SessionModule,

    UserModule,
    AuthModule,
    TwoFaModule,
    S3Module,
  ],
})
export class AppModule {}
