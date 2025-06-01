"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination"
import { on } from "events"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onChange?: (page: number) => void
}

export default function PaginationControls({ currentPage, totalPages, onChange }: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?page=${page}`)
  }

  const renderPageLinks = () => {
    const pageLinks = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${pathname}?page=${i}`}
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
              onChange?.(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return pageLinks
  }

  return (
    <Pagination>
      <PaginationContent>
        {
          currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`${pathname}?page=${currentPage - 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                  onChange?.(currentPage - 1)
                }}
              />
            </PaginationItem>
          )
        }
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=1`}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(1)
                  onChange?.(1)
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {renderPageLinks()}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`${pathname}?page=${totalPages}`}
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(totalPages)
                  onChange?.(totalPages)
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {
          currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`${pathname}?page=${currentPage + 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  onChange?.(currentPage + 1)
                }}
              />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}
