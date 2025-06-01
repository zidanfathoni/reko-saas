"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { Plus, Trash } from "lucide-react"

import { Checkbox } from "@/components/atoms/checkbox"
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"
import { DataTestimonials } from "@/lib/interface/testimonials/getTestimonials"
import { deleteTestimonials, fetchTestimonials, setPage } from "@/lib/slices/admin/testimonials-slice"
import { AdminTestimonialsDialog } from "./testimonialsDialog"
import PermissionHelper from "@/helper/permission-helper"



export function TestimonialsTable() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataTestimonials | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const dispatch = useAppDispatch();
    const { testimonials, loading, error } = useAppSelector((state) => state.testimonial);

    const inputRef = useRef<HTMLInputElement>(null);


    // Ambil permissions sekali saat mount
    const [permissions] = useState(() => PermissionHelper.getUserPermissions());

    // Hitung semua permission sekaligus
    const permission = useMemo(() => ({
        canAccess: PermissionHelper.checkPermissions(permissions, ['testimonials.manage', 'testimonials.view']),
        canEdit: PermissionHelper.checkPermissions(permissions, ['testimonials.manage', 'testimonials.edit']),
        canDelete: PermissionHelper.checkPermissions(permissions, ['testimonials.manage', 'testimonials.delete']),
        canCreate: PermissionHelper.checkPermissions(permissions, ['testimonials.manage', 'testimonials.create']),
    }), [permissions]);

    if (permission.canAccess) {
        // redirect to 404 page if user does not have access
        window.location.href = '/404';
    }


    const openUserDialog = (id?: string) => {
        setSelectedUserId(id || null)
        setDialogOpen(true)
    }


    const handlePageClick = (page: number) => {
        dispatch(setPage(page));
    };

    // handle delete selected rows
    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) return;
        const idsToDelete = Array.from(selectedRows);
        // Call your delete action here, e.g., dispatch(deleteTestimonials(idsToDelete));
        dispatch(deleteTestimonials(idsToDelete))
        // Reset selected rows after deletion
        setSelectedRows(new Set());
        // // Optionally, you can refetch the data after deletion
        // dispatch(fetchTestimonials({ page: testimonials.meta.current_page, pageSize: testimonials.meta.per_page ?? 10, search: searchQuery }));
    }



    const toggleSelectAll = () => {
        if (selectedRows.size === testimonials.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(testimonials.data.map((Testimonials) => Testimonials.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchTestimonials({ page: testimonials.meta.current_page, pageSize: testimonials.meta.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataTestimonials) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    // Handle row selection
    const toggleRowSelection = (id: string) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            fetchDataCategory(); // Panggil fungsi untuk mendapatkan data
        }
    };

    useEffect(() => {
        fetchDataCategory();
    }, [dispatch, testimonials.meta.current_page, testimonials.meta.per_page, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search Testimonials..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchTestimonials({ page: testimonials.meta.current_page, pageSize: testimonials.meta.per_page ?? 10, search: e.target.value }))

                    }}
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2">
                    {/* Delete Tools by select all, use dialog */}
                    {selectedRows.size > 0 && (
                        !permission.canDelete && (
                            <Button
                                variant="destructive"
                                disabled={selectedRows.size === 0}
                                className="ml-auto"
                                onClick={handleDeleteSelected}
                            >
                                <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                                Delete Testimonials ({selectedRows.size})
                            </Button>
                        )
                    )}
                    {/* Add Tools */}
                    {
                        !permission.canCreate && (
                            <Button
                                className="ml-auto"
                                variant="outline"
                                onClick={() => openUserDialog()}
                            >
                                <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} />
                                Add Testimonials
                            </Button>
                        )
                    }
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={testimonials.data.length > 0 && selectedRows.size === testimonials.data.length}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                                <div className="flex items-center">
                                    Name
                                    {sortColumn === "name" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Job Title
                                    {sortColumn === "job_title" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Company
                                    {sortColumn === "company" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Message
                                    {sortColumn === "message" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Link
                                    {sortColumn === "link" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.data.length > 0 ? (
                            testimonials.data.map((data) => (
                                <TableRow key={data.id} data-state={selectedRows.has(data.id) ? "selected" : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(data.id)}
                                            onCheckedChange={() => toggleRowSelection(data.id)}
                                            aria-label="Select row"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{data.name}</TableCell>
                                    <TableCell>{data.job_title}</TableCell>
                                    <TableCell>{data.company}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{data.message}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {data.link ? (
                                            <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                {data.link}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">No link provided</span>
                                        )}
                                    </TableCell>


                                    <TableCell className="text-end">
                                        <div>
                                            {
                                                !permission.canEdit && (
                                                    <Button variant="ghost" onClick={() => openUserDialog(data.id)} className="h-8 w-8 p-0" aria-label="Edit">
                                                        <DynamicIcon icon="FaPenToSquare" className="h-4 w-4" />
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={String(pageSize)}
                        onValueChange={(value) => {
                            setPageSize(Number(value))
                            dispatch(fetchTestimonials({ page: testimonials.meta.current_page, pageSize: Number(value) }))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20, 30, 50].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <PaginationControls currentPage={testimonials.meta.current_page ?? 1} totalPages={testimonials.meta.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>

            <AdminTestimonialsDialog
                key={selectedUserId}
                id={selectedUserId || undefined}
                open={dialogOpen}
                onOpenChange={setDialogOpen} />
        </div>
    )
}
