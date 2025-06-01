export interface GetServiceDetailResponse {
    status: boolean
    message: string
    data: DataServiceDetail
  }

  export interface DataServiceDetail {
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
