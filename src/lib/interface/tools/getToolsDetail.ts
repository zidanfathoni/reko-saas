export interface GetToolsDetailResponse {
    status: boolean
    message: string
    data: Data
  }

  export interface Data {
    id: string
    name: string
    slug: string
    icon: string
    description: string
    link_label: string
    link_url: string
    link_target: string
    created_at: string
    updated_at: string
  }
