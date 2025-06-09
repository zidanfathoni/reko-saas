"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react"

import { Checkbox } from "@/components/atoms/checkbox"
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"
import PermissionHelper from "@/helper/permission-helper"
import { AdminServiceCategoryDialog } from "./serviceCategoryDialog"
import { DataServiceCategory } from "@/lib/interface/admin/service/getServiceCategory"
import { deleteServiceCategory, fetchServiceCategory, setPage } from "@/lib/slices/admin/service/admin-serviceCategory-slice"
import LoadingComponents from "@/components/atoms/loading"



export function ServiceCategoryTable() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataServiceCategory | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const dispatch = useAppDispatch();
    const { serviceCategory, loadingServiceCategory, errorServiceCategory } = useAppSelector((state) => state.serviceCategory);

    const inputRef = useRef<HTMLInputElement>(null);


    // Ambil permissions sekali saat mount
    const [permissions] = useState(() => PermissionHelper.getUserPermissions());

    // Hitung semua permission sekaligus
    const permission = useMemo(() => ({
        canAccess: PermissionHelper.checkPermissions(permissions, ['services.manage', 'services.view']),
        canEdit: PermissionHelper.checkPermissions(permissions, ['services.manage', 'services.edit']),
        canDelete: PermissionHelper.checkPermissions(permissions, ['services.manage', 'services.delete']),
        canCreate: PermissionHelper.checkPermissions(permissions, ['services.manage', 'services.create']),
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


  const goToPrevious = ({
    currentPage = serviceCategory.meta.current_page ?? 1,
    totalPages = serviceCategory.meta.last_page ?? 1,
  }) => {
    if (currentPage > 1) {
        dispatch(setPage(currentPage - 1));
    }
  }

  const goToNext = ({
    currentPage = serviceCategory.meta.current_page ?? 1,
    totalPages = serviceCategory.meta.last_page ?? 1,
  }) => {
    if (currentPage < totalPages) {
        dispatch(setPage(currentPage + 1));
    }
  }

    // handle delete selected rows
    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) return;
        const idsToDelete = Array.from(selectedRows);
        // Call your delete action here, e.g., dispatch(deleteServiceCategory(idsToDelete));
        dispatch(deleteServiceCategory(idsToDelete))
        // Reset selected rows after deletion
        setSelectedRows(new Set());
        // // Optionally, you can refetch the data after deletion
        // dispatch(fetchServiceCategory({ page: testimonials.meta.current_page, pageSize: testimonials.meta.per_page ?? 10, search: searchQuery }));
    }



    const toggleSelectAll = () => {
        if (selectedRows.size === serviceCategory.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(serviceCategory.data.map((ServiceCategory) => ServiceCategory.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchServiceCategory({ page: serviceCategory.meta?.current_page ?? 1, pageSize: serviceCategory.meta?.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataServiceCategory) => {
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
    }, [dispatch, serviceCategory.meta?.current_page ?? 1, serviceCategory.meta?.per_page, searchQuery]);


    if (loadingServiceCategory) {
        return (
            <LoadingComponents />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search ServiceCategory..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchServiceCategory({ page: 1, pageSize: serviceCategory.meta.per_page ?? 10, search: e.target.value }))

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
                                Delete ServiceCategory ({selectedRows.size})
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
                                Add ServiceCategory
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
                                    checked={serviceCategory.data.length > 0 && selectedRows.size === serviceCategory.data.length}
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
                                    Description
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Icon
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center">
                                    Color
                                </div>
                            </TableHead>
                            <TableHead className="max-w-[200px] truncate">
                                <div className="flex items-center">
                                    Slug
                                </div>
                            </TableHead>

                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {serviceCategory.data.length > 0 ? (
                            serviceCategory.data.map((data) => (
                                <TableRow key={data.id} data-state={selectedRows.has(data.id) ? "selected" : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(data.id)}
                                            onCheckedChange={() => toggleRowSelection(data.id)}
                                            aria-label="Select row"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{data.name}</TableCell>
                                    <TableCell>{data.description}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <DynamicIcon icon={data.icon} height={24} fontSize={24} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        <div className="flex items-center">
                                            <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: data.color }}>
                                            </span>
                                        </div>
                                        </TableCell>

                                    <TableCell className="max-w-[200px] truncate">{data.slug}</TableCell>


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
                                        dispatch(fetchServiceCategory({ page: serviceCategory.meta.current_page, pageSize: Number(value) }))
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
                                <PaginationControls currentPage={serviceCategory.meta?.current_page ?? 1} totalPages={serviceCategory.meta?.last_page ?? 1} onChange={handlePageClick} />
                            </div>
                        </div>

            <AdminServiceCategoryDialog
                key={selectedUserId}
                id={selectedUserId || undefined}
                open={dialogOpen}
                onOpenChange={setDialogOpen} />
        </div>
    )
}
