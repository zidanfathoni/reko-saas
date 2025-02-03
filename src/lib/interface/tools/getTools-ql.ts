import { gql } from "@apollo/client";



export const GET_TOOLS = gql`
  query Tools($pagination: PaginationArg, $sort: [String]) {
    tools(pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          title
          slug
          type
          description
          link {
            id
            icons_web
            link {
              id
              label
              href
              is_external
              target
              theme
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
`;

export interface GetToolsQlResponse {
  data: DataToolQl
}

export interface DataToolQl {
  tools: ToolsQl
}

export interface ToolsQl {
  data: Tools[]
  meta: MetaTools
}

export interface Tools {
  id: string
  attributes: Attributes
}

export interface Attributes {
  title: string
  slug: string
  type: string
  description: string
  link: Link
}

export interface Link {
  id: string
  icons_web: string
  link: Link2
}

export interface Link2 {
  id: string
  label: string
  href: string
  is_external: boolean
  target: string
  theme: string
}

export interface MetaTools {
  pagination: PaginationTools
}

export interface PaginationTools {
  page: number
  pageCount: number
  pageSize: number
  total: number
}