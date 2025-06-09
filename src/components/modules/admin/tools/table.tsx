"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis, Plus, Trash } from "lucide-react"
import { Badge } from "@/components/atoms/badge"
import { Checkbox } from "@/components/atoms/checkbox"
import { DataTools, GetTools } from "@/lib/interface/tools/getTools"
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchTools, fetchToolsDelete, setPage } from "@/lib/slices/toolsSlices"
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/atoms"
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"
import { AddToolsDialog } from "./add-tools"

import PermissionHelper from '@/helper/permission-helper';
import { Storage } from '@/lib';
import LoadingComponents from "@/components/atoms/loading"


export function ToolsTable() {

   // Ambil permissions sekali saat mount
   const [permissions] = useState(() => PermissionHelper.getUserPermissions());

   // Hitung semua permission sekaligus
   const toolPermissions = useMemo(() => ({
     canAccess: PermissionHelper.checkPermissions(permissions, ['tools.manage', 'tools.view']),
     canEdit: PermissionHelper.checkPermissions(permissions, ['tools.manage', 'tools.edit']),
     canDelete: PermissionHelper.checkPermissions(permissions, ['tools.manage', 'tools.delete']),
     canCreate: PermissionHelper.checkPermissions(permissions, ['tools.manage', 'tools.create']),
   }), [permissions]);

    if (toolPermissions.canAccess) {
        // redirect to 404 page if user does not have access
        window.location.href = '/404';
    }
    const [selectedUserSlug, setSelectedUserSlug] = useState<string | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataTools | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [response, setResponse] = useState<GetTools>();
    const dispatch = useAppDispatch();
    const { tools, loading, error } = useAppSelector((state) => state.tools);

    const inputRef = useRef<HTMLInputElement>(null);



    const openUserDialog = (slug?: string) => {
        setSelectedUserSlug(slug || null)
        setDialogOpen(true)
    }

    const handlePageClick = (page: number) => {
        dispatch(setPage(page));
    };

    // handle delete selected rows
    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) {
            return;
        }
        const idsToDelete = Array.from(selectedRows);
        // Call your delete API here with idsToDelete
        dispatch(fetchToolsDelete(idsToDelete))
        // After deletion, clear the selected rows
        setSelectedRows(new Set());
        // Optionally, you can refetch the data to update the table
        dispatch(fetchTools({ page: tools.meta.current_page, pageSize: tools.meta.per_page ?? 10, search: searchQuery }));
    }



    const toggleSelectAll = () => {
        if (selectedRows.size === tools.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(tools.data.map((tools) => tools.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchTools({ page: tools.meta?.current_page ?? 1, pageSize: tools.meta?.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataTools) => {
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
    }, [dispatch, tools.meta?.current_page ?? 1, tools.meta?.per_page, searchQuery]);


    if (loading) {
        return (
            <LoadingComponents />
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search Tools..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchTools({ page: tools.meta.current_page, pageSize: tools.meta.per_page ?? 10, search: e.target.value }))

                    }}
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2">
                    {/* Delete Tools by select all, use dialog */}

                    {selectedRows.size > 0 && (
                        !toolPermissions.canDelete && (
                            <Button
                                variant="destructive"
                                onClick={handleDeleteSelected}
                            >
                                <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} />
                                Delete Selected ({selectedRows.size})
                            </Button>
                        )
                    )}
                    {/* Add Tools */}
                    {
                        !toolPermissions.canCreate && (
                            <Button
                                className="ml-auto"
                                variant="outline"
                                onClick={() => openUserDialog()}
                            >
                                <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} />
                                Add Tools
                            </Button>
                        )
                    }
                    {/* Refresh Tools */}

                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={tools.data.length > 0 && selectedRows.size === tools.data.length}
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
                                    Email
                                </div>
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Links</TableHead>
                            {/* Action */}
                            <TableHead className="w-[100px] text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tools.data.length > 0 ? (
                            tools.data.map((data) => (
                                <TableRow key={data.id} data-state={selectedRows.has(data.id) ? "selected" : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(data.id)}
                                            onCheckedChange={() => toggleRowSelection(data.id)}
                                            aria-label="Select row"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{data.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <DynamicIcon icon={data.icon} height={24} fontSize={24} />
                                        </div>
                                    </TableCell>
                                    <TableCell>{data.description}</TableCell>
                                    <TableCell>
                                        <a
                                            href={data.link_url}
                                            target={data.link_target ?? "_blank"}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {data.link_label ?? `Let's Gooo!`}
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div>
                                            {
                                                !toolPermissions.canEdit && (
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
                            dispatch(fetchTools({ page: tools.meta.current_page, pageSize: Number(value) }))
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
                    <PaginationControls currentPage={tools.meta.current_page ?? 1} totalPages={tools.meta.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>
            <AddToolsDialog
                key={selectedUserSlug}
                slug={selectedUserSlug || undefined}
                open={dialogOpen}
                onOpenChange={setDialogOpen} />
        </div>
    )
}
