export interface GetTools {
    status: boolean
    message: string
    data: DataTools[]
    meta: MetaTools
  }

  export interface DataTools {
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

  export interface MetaTools {
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
