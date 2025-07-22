import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Cookie, SessionData } from "express-session"

import { Device, Location, SessionMetadata } from "@/modules/auth/types/session-metadata.types"

@ObjectType()
export class LocationModel implements Location {
  @Field(() => String)
  country: string

  @Field(() => String)
  city: string

  @Field(() => Number)
  latitude: number

  @Field(() => Number)
  longitude: number
}

@ObjectType()
export class DeviceModel implements Device {
  @Field(() => String)
  browser: string

  @Field(() => String)
  os: string

  @Field(() => String)
  type: string
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadata {
  @Field(() => LocationModel)
  location: LocationModel

  @Field(() => DeviceModel)
  device: DeviceModel

  @Field(() => String)
  ip: string
}

@ObjectType()
export class SessionModel implements SessionData {
  @Field(() => ID)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  createdAt: string

  @Field(() => SessionMetadataModel)
  metadata: SessionMetadataModel

  cookie: Cookie
}
