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
import { DataRoles, GetRolesResponse } from "@/lib/interface/admin/users/roles/getRoles"
import { deleterole, fetchRoles, setPage } from "@/lib/slices/admin/user-and-role-permission/admin-roleSlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/atoms/dropdown-menu"
import { BsFillMenuButtonWideFill } from "react-icons/bs"
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"
import PermissionHelper from "@/helper/permission-helper"
import LoadingComponents from "@/components/atoms/loading"



export function RolesTable() {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataRoles | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [response, setResponse] = useState<GetRolesResponse>();
    const dispatch = useAppDispatch();
    const { roles, loading, error } = useAppSelector((state) => state.roles);

    const inputRef = useRef<HTMLInputElement>(null);


    // Ambil permissions sekali saat mount
    const [permissions] = useState(() => PermissionHelper.getUserPermissions());

    // Hitung semua permission sekaligus
    const permission = useMemo(() => ({
        canAccess: PermissionHelper.checkPermissions(permissions, ['permission.manage', 'permission.view']),
        canEdit: PermissionHelper.checkPermissions(permissions, ['permission.manage', 'permission.edit']),
        canDelete: PermissionHelper.checkPermissions(permissions, ['permission.manage', 'permission.delete']),
        canCreate: PermissionHelper.checkPermissions(permissions, ['permission.manage', 'permission.create']),
    }), [permissions]);

    if (permission.canAccess) {
        // redirect to 404 page if user does not have access
        window.location.href = '/404';
    }

    const openUserDialog = (id?: string) => {
        setSelectedUserId(id || null) // Set selected user ID or null if no ID is provided
        setDialogOpen(true)
    }

    const handlePageClick = (page: number) => {
        dispatch(setPage(page));
    };

    // handle delete selected rows
    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) return; // No rows selected
        const idsToDelete = Array.from(selectedRows);
        // Call your delete API here with idsToDelete
        dispatch(deleterole(idsToDelete))
        // After deletion, clear the selected rows
        setSelectedRows(new Set());
        // Optionally, you can refetch the roles data to reflect the changes
        // window.location.reload(); // Reload the page to reflect changes
    }



    const toggleSelectAll = () => {
        if (selectedRows.size === roles.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(roles.data.map((roles) => roles.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchRoles({ page: roles.meta?.current_page ?? 1, pageSize: roles.meta?.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataRoles) => {
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
    }, [dispatch, roles.meta?.current_page ?? 1, roles.meta?.per_page, searchQuery]);

    if (loading) {
        return (
            <LoadingComponents />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between p-4">
                <Input
                    placeholder="Search Roles..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchRoles({ page: 1, pageSize: roles.meta.per_page ?? 10, search: e.target.value }))

                    }}
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2">
                    {selectedRows.size > 0 && (
                        !permission.canDelete && (
                            <Button
                                variant="destructive"
                                disabled={selectedRows.size === 0}
                                className="ml-auto"
                                onClick={handleDeleteSelected}
                            >
                                <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                                Delete Roles ({selectedRows.size})
                            </Button>
                        )
                    )}
                    {/* Add Tools */}
                   {
                    !permission.canCreate && (
                        <Button
                        className="ml-auto"
                        variant="outline"
                        onClick={() => {
                            window.location.href = `/admin/roles/add`; // Redirect to the role detail page
                        }}
                    >
                        <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                        Add Role
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
                                    checked={roles.data.length > 0 && selectedRows.size === roles.data.length}
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
                        {roles.data.length > 0 ? (
                            roles.data.map((data) => (
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
                                            <Button variant="ghost"
                                                onClick={() => {
                                                    window.location.href = `/admin/roles/${data.id}`; // Redirect to the role detail page
                                                }}
                                                className="h-8 w-8 p-0" aria-label="Edit">
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
                            dispatch(fetchRoles({ page: roles.meta?.current_page, pageSize: Number(value) }))
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
                    <PaginationControls currentPage={roles.meta?.current_page ?? 1} totalPages={roles.meta?.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>
        </div>
    )
}
