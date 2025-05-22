export interface GetWebSettingResponse {
    status: boolean
    message: string
    setup: Setup
    health: Health
  }

  export interface Setup {
    id: string
    name: string
    tagline: string
    description: string
    logo: string
    favicon: string
    email: string
    phone: string
    address: string
    social_facebook: string
    social_instagram: string
    social_tiktok: string
    social_twitter: string
    social_linkedin: string
    social_youtube: string
    social_whatsapp: string
    link_video: string
    tax_rate: number
    created_at: string
    updated_at: string
  }

  export interface Health {
    healthy: boolean
    report: Report
  }

  export interface Report {
    env: Env
    appKey: AppKey
    redis: Redis
  }

  export interface Env {
    displayName: string
    health: Health2
  }

  export interface Health2 {
    healthy: boolean
  }

  export interface AppKey {
    displayName: string
    health: Health3
  }

  export interface Health3 {
    healthy: boolean
  }

  export interface Redis {
    displayName: string
    health: Health4
    meta: Meta[]
  }

  export interface Health4 {
    healthy: boolean
    message: string
  }

  export interface Meta {
    connection: string
    status: string
    used_memory: string
    error: any
  }
