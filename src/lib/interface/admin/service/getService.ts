export interface GetServiceResponse {
    status: boolean
    message: string
    data: DataService[]
    meta: Meta
  }

  export interface DataService {
    id: string
    name: string
    description: string
    price: string
    images: string
    slug: string
    duration: number
    is_active: number
    category_id: string
    created_at: string
    updated_at: string
    category: Category
  }

  export interface Category {
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
