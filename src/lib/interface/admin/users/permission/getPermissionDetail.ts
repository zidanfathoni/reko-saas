export interface GetPermissionDetailResponse {
    status: boolean
    message: string
    data: DataPermission
  }

  export interface DataPermission {
    id: string
    name: string
    description: string
    created_at: string
    updated_at: string
  }
