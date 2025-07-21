import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"

import { getGraphQLConfig } from "./config/graphql.config"
import { AuthModule } from "./modules/auth/auth.module"
import { PrismaModule } from "./modules/prisma/prisma.module"
import { UserModule } from "./modules/user/user.module"
import { IS_DEV_ENV } from "./shared/utils/is-dev.util"

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
