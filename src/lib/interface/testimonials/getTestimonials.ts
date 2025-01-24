export interface GetTestimonials {
  data: DataTestimonials[]
  meta: MetaTestimonials
}

export interface DataTestimonials {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  slug: string
  company: string
  job: string
  message: string
  link: Link
}

export interface Link {
  id: number
  href: string
  label: string
  target: string
  is_external: boolean
}

export interface MetaTestimonials {
  pagination: PaginationTestimonials
}

export interface PaginationTestimonials {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
