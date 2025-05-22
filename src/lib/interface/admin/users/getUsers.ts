export interface GetUsersResponse {
    status: boolean
    message: string
    data: DataUsers[]
    meta: Meta
  }

  export interface DataUsers {
    id: string
    full_name: string
    username: string
    job_title: string
    avatar: string
    phone: string
    is_verified_number: number
    is_active: number
    email: string
    is_verified: number
    provider: string
    provider_id: string
    remember_me_token: string
    role_id: string
    created_at: string
    updated_at: string
  }

  export interface Meta {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string
    previous_page_url: string
  }
