import { Module } from "@nestjs/common"

import { TwoFaModule } from "@/modules/2fa/2fa.module"
import { SessionModule } from "@/modules/session/session.module"
import { UserModule } from "@/modules/user/user.module"

import { AuthenticationModule } from "./authentication/authentication.module"
import { EmailChangeModule } from "./email-change/email-change.module"
import { OAuthModule } from "./oauth/oauth.module"
import { PasswordRecoveryModule } from "./password-recovery/password-recovery.module"
import { RegistrationModule } from "./registration/registration.module"

@Module({
  imports: [RegistrationModule, AuthenticationModule, OAuthModule, PasswordRecoveryModule, EmailChangeModule, UserModule, SessionModule, TwoFaModule],
})
export class AuthModule {}
