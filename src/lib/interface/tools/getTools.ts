export interface GetTools {
  data: DataTools[]
  meta: MetaTools
}

export interface DataTools {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  slug: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  link: Link
}

export interface Link {
  id: number
  icons_web: string
  link: Link2
}

export interface Link2 {
  id: number
  href: string
  label: string
  target: string
  is_external: boolean
  theme: string
}

export interface MetaTools {
  pagination: PaginationTools
}

export interface PaginationTools {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
