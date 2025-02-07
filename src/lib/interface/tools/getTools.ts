export interface GetTools {
  status: boolean
  message: string
  data: Data
}

export interface Data {
  meta: MetaTools
  data: DataTools[]
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

export interface DataTools {
  id: string
  name: string
  slug: string
  description: string
  link: string
  icons: string
  created_at: string
  updated_at: string
}
