export interface GetUsersDetailResponse {
    status: boolean
    message: string
    data: DataUsersDetail
  }

  export interface DataUsersDetail {
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
