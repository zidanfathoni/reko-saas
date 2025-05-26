export interface GetRolesDetailResponse {
    status: boolean
    message: string
    data: DataRolesDetail
  }

  export interface DataRolesDetail {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    permissions: Permission[]
  }

  export interface Permission {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
  }
