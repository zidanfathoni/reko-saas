export interface GetTestimonialsDetailResponse {
    status: boolean
    message: string
    data: Data
  }

  export interface Data {
    id: string
    name: string
    job_title: string
    company: string
    message: string
    link: string
    created_at: string
    updated_at: string
  }
