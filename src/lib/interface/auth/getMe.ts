export interface GetMeResponse {
  message: string
  data: DataGetMe
}

export interface DataGetMe {
  user: User
  role: Role
}

export interface User {
  id: string
  full_name: string
  username: string
  phone: string
  city: string
  state: string
  is_active: number
  is_verified: number
  avatar: string
  job_title: string
  company: string
  website: string
  role_id: string
  team_id: number
  email: string
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}
