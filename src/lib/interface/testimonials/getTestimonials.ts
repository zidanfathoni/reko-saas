export interface GetTestimonials {
    status: boolean
    message: string
    data: DataTestimonials[]
    meta: MetaTestimonials
  }

  export interface DataTestimonials {
    id: string
    name: string
    job_title: string
    company: string
    message: string
    link: string
    created_at: string
    updated_at: string
  }

  export interface MetaTestimonials {
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
