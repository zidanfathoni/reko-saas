export interface GetServiceCategoryResponse {
    status: boolean
    message: string
    data: DataServiceCategory[]
    meta: Meta
  }

  export interface DataServiceCategory {
    id: string
    name: string
    description: string
    icon: string
    color: string
    slug: string
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
