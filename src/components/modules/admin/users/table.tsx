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
import { DataUsers, GetUsersResponse } from "@/lib/interface/admin/users/getUsers"
import { fetchUsers, setPage } from "@/lib/slices/admin/admin-userSlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/atoms/dropdown-menu"
import { BsFillMenuButtonWideFill } from "react-icons/bs"
import { Dialog, DialogTrigger } from "@/components/atoms/dialog"



export function UsersTable() {
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [sortColumn, setSortColumn] = useState<keyof DataUsers | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [response, setResponse] = useState<GetUsersResponse>();
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.users);

    const inputRef = useRef<HTMLInputElement>(null);



    const handlePageClick = (page: number) => {
        dispatch(setPage(page));
    };

    // handle search



    const toggleSelectAll = () => {
        if (selectedRows.size === users.data.length) {
            setSelectedRows(new Set())
        } else {
            const newSelectedRows = new Set(users.data.map((users) => users.id))
            setSelectedRows(newSelectedRows)
        }
    }

    const fetchDataCategory = async () => {
        dispatch(fetchUsers({ page: users.meta.current_page, pageSize: users.meta.per_page ?? 10, search: searchQuery }));
    };

    // Handle sorting
    const handleSort = (column: keyof DataUsers) => {
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
    }, [dispatch, users.meta.current_page, users.meta.per_page, searchQuery]);

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        dispatch(fetchUsers({ page: users.meta.current_page, pageSize: users.meta.per_page ?? 10, search: e.target.value }))

                    }}
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2">
                { selectedRows.size > 0 && (
                     <Dialog>
                     <DialogTrigger asChild>
                         <Button variant="destructive" disabled={selectedRows.size === 0} className="ml-auto">
                             <Trash className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                             Delete Users
                         </Button>
                     </DialogTrigger>
                     {/* <AddToolsDialog
                     /> */}
                 </Dialog>
                   )}
                    {/* Add Tools */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="ml-auto" variant="outline">
                                <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        {/* <AddToolsDialog
                        /> */}
                    </Dialog>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={users.data.length > 0 && selectedRows.size === users.data.length}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select all"
                                />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("full_name")}>
                                <div className="flex items-center">
                                    Name
                                    {sortColumn === "full_name" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("full_name")}>
                                <div className="flex items-center">
                                    Email
                                    {sortColumn === "full_name" && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                                </div>
                            </TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length > 0 ? (
                            users.data.map((data) => (
                                <TableRow key={data.id} data-state={selectedRows.has(data.id) ? "selected" : undefined}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.has(data.id)}
                                            onCheckedChange={() => toggleRowSelection(data.id)}
                                            aria-label="Select row"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{data.full_name}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.phone}</TableCell>
                                    <TableCell>
                                        {/* Badge is_active */}
                                        <Badge variant={data.is_active ? "default" : "destructive"}>
                                            {data.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="flex justify-end">
                                                    <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="shadow-none"
                                                    aria-label="Edit item">
                                                        <BsFillMenuButtonWideFill />
                                                    </Button>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <span>Edit</span>
                                                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                        <span>Delete</span>
                                                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                            dispatch(fetchUsers({ page: users.meta.current_page, pageSize: Number(value) }))
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
                    <PaginationControls currentPage={users.meta.current_page ?? 1} totalPages={users.meta.last_page ?? 1} onChange={handlePageClick} />
                </div>
            </div>
        </div>
    )
}
