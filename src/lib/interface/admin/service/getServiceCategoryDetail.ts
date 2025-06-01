export interface GetServiceCategoryDetailResponse {
    status: boolean
    message: string
    data: DataServiceCategoryDetail
  }

  export interface DataServiceCategoryDetail {
    id: string
    name: string
    description: string
    icon: string
    color: string
    slug: string
    created_at: string
    updated_at: string
  }
