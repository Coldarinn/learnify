export interface Location {
  country: string
  city: string
  latidute: number
  longitude: number
}

export interface Device {
  browser: string
  os: string
  type: string
}

export interface SessionMetadata {
  location: Location
  device: Device
  ip: string
}
