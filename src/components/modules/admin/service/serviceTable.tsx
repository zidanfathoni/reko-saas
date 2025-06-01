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
import { AdminServiceDialog } from "./serviceDialog"
import { DataService } from "@/lib/interface/admin/service/getService"
import { deleteService, fetchService, setPage } from "@/lib/slices/admin/service/admin-service-slice"



export function ServiceTable() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataService | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const dispatch = useAppDispatch();
    const { service, loadingService, errorService } = useAppSelector((state) => state.service);

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
        currentPage = service.meta.current_page ?? 1,
        totalPages = service.meta.last_page ?? 1,
    }) => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    }

    const goToNext = ({
        currentPage = service.meta.current_page ?? 1,
        totalPages = service.meta.last_page ?? 1,
    }) => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1));
        }
    }

    // handle delete selected rows
    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) return;
        const idsToDelete = Array.from(selectedRows);
        // Call your delete action here, e.g., dispatch(deleteService(idsToDelete));
        dispatch(deleteService(idsToDelete))
        // Reset selected rows after deletion
        setSelectedRows(new Set());
        // // Optionally, you can refetch the data after deletion
        // dispatch(fetchService({ page: testimonials.meta.current_page, pageSize: testimonials.meta.per_page ?? 10, search: searchQuery }));
    }



    const toggleSelectAll = () => {
        if (selectedRows.size === service.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(service.data.map((Service) => Service.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchData = async () => {
        dispatch(fetchService({ page: service.meta.current_page, pageSize: service.meta.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataService) => {
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
            fetchData(); // Panggil fungsi untuk mendapatkan data
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, service.meta.current_page, service.meta.per_page, searchQuery]);

    return (
        <div>
            <div className="flex flex-row items-center justify-between py-4">
                <Input
                    placeholder="Search Service..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchService({ page: 1, pageSize: service.meta.per_page ?? 10, search: e.target.value }))

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
                                Delete Service ({selectedRows.size})
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
                                Add Service
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
                                    checked={service.data.length > 0 && selectedRows.size === service.data.length}
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
                            <TableHead className="text-center">
                                <div className="flex items-center">
                                    Price
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center">
                                    Image
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center">
                                    Active
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center">
                                    Category
                                </div>
                            </TableHead>


                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {service.data.length > 0 ? (
                            service.data.map((data) => (
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
                                    <TableCell className="text-center">
                                        {
                                            data.price ? (
                                                <span className="font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(data.price))}</span>
                                            ) : (
                                                <span className="text-muted-foreground">No Price</span>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {data.images ? (
                                            <img src={data.images} alt={data.name} className="h-10 w-10 object-cover rounded-md" />
                                        ) : (
                                            <span className="text-muted-foreground">No Image</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {data.is_active ? (
                                            <span className="text-green-500">Active</span>
                                        ) : (
                                            <span className="text-red-500">Inactive</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {data.category ? data.category.name : "No Category"}
                                    </TableCell>


                                    <TableCell className="text-end">
                                        <div>
                                            {
                                                !permission.canEdit && (
                                                    <Button variant="ghost" onClick={() => openUserDialog(data.slug)} className="h-8 w-8 p-0" aria-label="Edit">
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
                            dispatch(fetchService({ page: service.meta.current_page, pageSize: Number(value) }))
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
                    <PaginationControls currentPage={service.meta.current_page ?? 1} totalPages={service.meta.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>

            <AdminServiceDialog
                key={selectedUserId}
                id={selectedUserId || undefined}
                open={dialogOpen}
                onOpenChange={setDialogOpen} />
        </div>
    )
}
