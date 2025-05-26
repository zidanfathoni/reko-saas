"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Trash } from "lucide-react"
import { Badge } from "@/components/atoms/badge"
import { Checkbox } from "@/components/atoms/checkbox"
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"
import { fetchPermission, setPage } from "@/lib/slices/admin/user-and-role-permission/admin-permissionSlice"
import { DataPermission } from "@/lib/interface/admin/users/permission/getPermission"
import { AdminPermissionsDialog } from "./permission-dialog"



export function PermissionsTable() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataPermission | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const dispatch = useAppDispatch();
    const { permission, loadingPermission, errorPermission } = useAppSelector((state) => state.permission);

    const inputRef = useRef<HTMLInputElement>(null);


    const openUserDialog = (id?: string) => {
        setSelectedUserId(id || null)
        setDialogOpen(true)
    }


    const handlePageClick = (page: number) => {
        dispatch(setPage(page));
    };

    // handle search



    const toggleSelectAll = () => {
        if (selectedRows.size === permission.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(permission.data.map((Permissions) => Permissions.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchPermission({ page: permission.meta.current_page, pageSize: permission.meta.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataPermission) => {
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
    }, [dispatch, permission.meta.current_page, permission.meta.per_page, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search Permissions..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchPermission({ page: permission.meta.current_page, pageSize: permission.meta.per_page ?? 10, search: e.target.value }))

                    }}
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2">
                    {selectedRows.size > 0 && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" disabled={selectedRows.size === 0} className="ml-auto">
                                    <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} />
                                    Delete Permissions
                                </Button>
                            </DialogTrigger>
                            {/* <AddToolsDialog
                     /> */}
                        </Dialog>
                    )}
                    {/* Add Tools */}
                    <Button
                        className="ml-auto"
                        variant="outline"
                        onClick={() => openUserDialog()}
                    >
                        <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} />
                        Add Permissions
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={permission.data.length > 0 && selectedRows.size === permission.data.length}
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
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permission.data.length > 0 ? (
                            permission.data.map((data) => (
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
                                    <TableCell className="text-end">
                                        <div>
                                            <Button variant="ghost" onClick={() => openUserDialog(data.id)} className="h-8 w-8 p-0" aria-label="Edit">
                                                <DynamicIcon icon="FaPenToSquare" className="h-4 w-4" />
                                            </Button>
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
                            dispatch(fetchPermission({ page: permission.meta.current_page, pageSize: Number(value) }))
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
                    <PaginationControls currentPage={permission.meta.current_page ?? 1} totalPages={permission.meta.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>

            <AdminPermissionsDialog
                key={selectedUserId}
                id={selectedUserId || undefined}
                open={dialogOpen}
                onOpenChange={setDialogOpen} />
        </div>
    )
}
