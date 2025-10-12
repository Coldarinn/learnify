export type Session = {
  id: string
  userId: string
  createdAt: Date
  metadata: {
    location: {
      country: string
      city: string
      latitude: number
      longitude: number
    }
    device: {
      browser: string
      os: string
      type: string
    }
    ip: string
  }
}
