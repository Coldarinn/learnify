import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Request } from "express"
import fetch from "node-fetch"
import { OAuthProvider } from "prisma/generated"

import { PrismaService } from "@/modules/prisma/prisma.service"
import { SessionService } from "@/modules/session/session.service"
import { getSessionMetadata } from "@/modules/session/utils/session.utils"
import { UserModel } from "@/modules/user/models/user.model"
import { UserService } from "@/modules/user/user.service"

import { GoogleProfileResponse } from "./interfaces/google-profile-response.interface"
import { OAuthProfile } from "./interfaces/oauth-profile.interface"
import { OAuthTokenResponse } from "./interfaces/oauth-token-response.interface"
import { YandexProfileResponse } from "./interfaces/yandex-profile-response.interface"

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

    if (!user) {
      await this.prismaService.$transaction(async (tx) => {
        user = await this.userService.create(
          {
            email: profile.email,
            username: profile.email.split("@")[0],
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            avatar: profile.avatar,
            password: "",
          },
          tx
        )
        user = await this.userService.update(user.id, { isEmailConfirmed: true }, tx)
      })
    } else if (oauthAccount && oauthAccount.userId !== user.id) throw new UnauthorizedException("OAuth account is linked to another user")

    if (!user) throw new UnauthorizedException("Counldn't sign in")

    if (!oauthAccount) {
      oauthAccount = await this.prismaService.oAuthAccount.create({
        data: {
          provider,
          providerUserId: profile.id,
          userId: user.id,
        },
      })
    }

    const metadata = getSessionMetadata(headers, ip, userAgent)

    await this.sessionService.save(session, user.id, metadata)

    const { password: _, ...safeUser } = user
    return safeUser
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

  private async getGoogleProfile(code: string): Promise<OAuthProfile> {
    const tokenRes = await fetch(this.configService.get("OAUTH_GOOGLE_TOKEN_URL")!, {
      method: "POST",
      body: new URLSearchParams({
        code,
        client_id: this.configService.get<string>("OAUTH_GOOGLE_CLIENT_ID")!,
        client_secret: this.configService.get<string>("OAUTH_GOOGLE_CLIENT_SECRET")!,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenRes.ok) throw new UnauthorizedException("Invalid Google OAuth code")

    const token = (await tokenRes.json()) as OAuthTokenResponse

    const response = await fetch(this.configService.get("OAUTH_GOOGLE_URL")!, {
      headers: { Authorization: `Bearer ${token.access_token}` },
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
