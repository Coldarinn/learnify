import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"
import fetch from "node-fetch"
import { OAuthProvider } from "prisma/generated"

import { PrismaService } from "@/modules/prisma/prisma.service"
import { SessionService } from "@/modules/session/session.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { FullUserModel } from "@/modules/user/models/full-user.model"
import { UserModel } from "@/modules/user/models/user.model"
import { UserService } from "@/modules/user/user.service"
import { toSafeUser } from "@/modules/user/utils/to-safe-user.util"

import { GoogleProfileResponse, OAuthProfile, OAuthTokenResponse, YandexProfileResponse } from "./oauth.types"

@Injectable()
export class OAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly sessionService: SessionService
  ) {}

  async signInOAuth(
    code: string,
    provider: OAuthProvider,
    session: Request["session"],
    headers: Request["headers"],
    ip: Request["ip"],
    userAgent: string
  ): Promise<UserModel> {
    const profile = await this.getProfileFromProvider(code, provider)

    let user = await this.userService.findByLogin(profile.email).catch(() => null)

    let oauthAccount = await this.prismaService.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId: profile.id,
        },
      },
    })

    if (oauthAccount && user && oauthAccount.userId !== user.id) throw new UnauthorizedException("Email is linked to another user")

    if (!user && !oauthAccount) {
      await this.prismaService.$transaction(async (tx) => {
        const username = await this.generateUniqueUsername(profile.email.split("@")[0])

        user = await this.userService.create(
          {
            email: profile.email,
            username,
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            avatar: profile.avatar,
            password: "",
          },
          tx
        )
        user = await this.userService.update(user.id, { isEmailConfirmed: true }, tx)

        oauthAccount = await tx.oAuthAccount.create({
          data: {
            provider,
            providerUserId: profile.id,
            userId: user.id,
          },
        })
      })
    }

    if (user && !oauthAccount) {
      oauthAccount = await this.prismaService.oAuthAccount.create({
        data: {
          provider,
          providerUserId: profile.id,
          userId: user.id,
        },
      })
    }

    if (!user && oauthAccount) {
      user = await this.prismaService.user.findUnique({
        where: { id: oauthAccount.userId },
      })
    }

    if (!user) throw new UnauthorizedException("Couldn't sign in")

    const metadata = getSessionMetadata(headers, ip, userAgent)

    await this.sessionService.save(session, user.id, metadata)

    return toSafeUser(user as FullUserModel)
  }

  async linkOAuthAccount(userId: string, code: string, provider: OAuthProvider): Promise<boolean> {
    const profile = await this.getProfileFromProvider(code, provider)

    const user = await this.userService.getById(userId).catch(() => null)
    if (!user) throw new UnauthorizedException("Couldn't link OAuth account to user")

    const existingOAuth = await this.prismaService.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId: profile.id,
        },
      },
    })

    if (existingOAuth && existingOAuth.userId === userId) throw new UnauthorizedException("This OAuth account is already linked to you")
    if (existingOAuth && existingOAuth.userId !== userId) throw new UnauthorizedException("This OAuth account is already linked to another user")

    if (!existingOAuth) {
      await this.prismaService.oAuthAccount.create({
        data: {
          provider,
          providerUserId: profile.id,
          userId,
        },
      })
    }

    return true
  }

  async unlinkOAuthAccount(userId: string, provider: OAuthProvider): Promise<boolean> {
    const account = await this.prismaService.oAuthAccount.findFirst({
      where: {
        userId,
        provider,
      },
    })

    if (!account) throw new UnauthorizedException("This OAuth provider is not linked to your account")

    const linkedAccountsCount = await this.prismaService.oAuthAccount.count({
      where: {
        userId,
      },
    })

    const user = await this.userService.getById(userId)

    const hasPassword = !!user.password?.length

    if (linkedAccountsCount <= 1 && !hasPassword) throw new UnauthorizedException("You can't unlink the only login method")

    await this.prismaService.oAuthAccount.delete({
      where: {
        id: account.id,
      },
    })

    return true
  }

  private async generateUniqueUsername(base: string): Promise<string> {
    let username = base
    let counter = 1
    let exists = true

    while (exists) {
      const user = await this.userService.findByLogin(username).catch(() => null)
      if (!user) {
        exists = false
      } else {
        username = `${base}${counter}`
        counter++
      }
    }

    return username
  }

  private async getProfileFromProvider(code: string, provider: OAuthProvider): Promise<OAuthProfile> {
    switch (provider) {
      case "google":
        return this.getGoogleProfile(code)
      case "yandex":
        return this.getYandexProfile(code)
      default:
        throw new UnauthorizedException("Unsupported OAuth provider")
    }
  }

  private async getGoogleProfile(accessToken: string): Promise<OAuthProfile> {
    if (!accessToken) throw new UnauthorizedException("Invalid Google OAuth access token")

    const response = await fetch(this.configService.get("OAUTH_GOOGLE_URL")!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) throw new UnauthorizedException("Invalid Google OAuth token")

    const data = (await response.json()) as GoogleProfileResponse

    return {
      provider: "google",
      id: data.sub,
      email: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
      avatar: data.picture,
    }
  }

  private async getYandexProfile(code: string): Promise<OAuthProfile> {
    const tokenRes = await fetch(this.configService.get("OAUTH_YANDEX_TOKEN_URL")!, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: this.configService.get<string>("OAUTH_YANDEX_CLIENT_ID")!,
        client_secret: this.configService.get<string>("OAUTH_YANDEX_CLIENT_SECRET")!,
      }),
    })

    if (!tokenRes.ok) throw new UnauthorizedException("Invalid Yandex OAuth code")

    const token = (await tokenRes.json()) as OAuthTokenResponse

    const response = await fetch(this.configService.get("OAUTH_YANDEX_URL")!, {
      headers: { Authorization: `OAuth ${token.access_token}` },
    })

    if (!response.ok) throw new UnauthorizedException("Invalid Yandex OAuth token")

    const data = (await response.json()) as YandexProfileResponse

    return {
      provider: "yandex",
      id: data.id,
      email: data.default_email,
      firstName: data.first_name,
      lastName: data.last_name,
      avatar: data.default_avatar_id ? `https://avatars.yandex.net/get-yapic/${data.default_avatar_id}/islands-200` : undefined,
    }
  }
}
