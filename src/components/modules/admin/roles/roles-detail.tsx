// app/roles/[id]/RolesDetailClient.tsx (Client Component)
"use client"

import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useEffect, useMemo, useState } from "react"
import { Filter, Shield } from "lucide-react"
import { Checkbox } from "@/components/atoms/checkbox"
import { Textarea } from "@/components/atoms/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { createrole, fetchRolesDetail, updaterole } from "@/lib/slices/admin/user-and-role-permission/admin-roleSlice"
import { fetchPermissionAll } from "@/lib/slices/admin/user-and-role-permission/admin-permissionSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
import { Separator } from "@/components/atoms/separator"
import LoadingComponents from "@/components/atoms/loading"

interface RolesDetailClientProps {
    id: string;
}

export default function RolesDetailClient({ id }: RolesDetailClientProps) {
    const dispatch = useAppDispatch();
    const { roles, loading, error } = useAppSelector((state) => state.rolesDetail);
    const { permission, loadingPermission, errorPermission } = useAppSelector((state) => state.permission);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [permissions, setPermissions] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    // Extract unique groups from permission names
    const groups = useMemo(() => {
        const groupSet = new Set<string>()
        permission.data.forEach((perm) => {
            const group = perm.name.split(".")[0]
            groupSet.add(group)
        })
        return Array.from(groupSet).sort()
    }, [permission.data])

    // Filter permissions by selected groups
    const filteredPermissions = useMemo(() => {
        if (selectedGroups.length === 0) {
            return permission.data
        }
        return permission.data.filter((perm) => {
            const group = perm.name.split(".")[0]
            return selectedGroups.includes(group)
        })
    }, [permission.data, selectedGroups])

    // Group permissions by their group name
    const groupedPermissions = useMemo(() => {
        const grouped: { [key: string]: typeof permission.data } = {}
        filteredPermissions.forEach((perm) => {
            const group = perm.name.split(".")[0]
            if (!grouped[group]) {
                grouped[group] = []
            }
            grouped[group].push(perm)
        })
        return grouped
    }, [filteredPermissions])


    const handleGroupToggle = (group: string) => {
        setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]))
    }

    const handleSelectAllGroups = () => {
        setSelectedGroups(groups)
    }

    const handleDeselectAllGroups = () => {
        setSelectedGroups([])
    }

    // const formatPermissionName = (name: string) => {
    //     const [group, action] = name.split(".")
    //     return `${action?.charAt(0).toUpperCase() + action.slice(1)}`
    // }

    const formatGroupName = (group: string) => {
        return group.charAt(0).toUpperCase() + group.slice(1)
    }

    const handleSelectAll = () => {
        const allPermissionIds = permission.data.map((perm: any) => perm.id);
        setPermissions(allPermissionIds);
    };

    const handleDeselectAll = () => {
        setPermissions([]);
    };

    const handlePostUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        var data = {
            name: name,
            description: description,
            permissions: permissions,
        }

        if (id !== 'add') {
            try {
                await dispatch(updaterole({ id, data: JSON.stringify(data) }));


            } catch (error) {
                console.error("Error updating role:", error);
            }
        } else {
            try {
                await dispatch(createrole(JSON.stringify(data)));

            } catch (error) {
                console.error("Error creating role:", error);
            }
        }
    };

    useEffect(() => {
        dispatch(fetchPermissionAll());
        if (id !== 'add') {
            dispatch(fetchRolesDetail(id));
        } else {
            setName('');
            setDescription('');
            setPermissions([]);
            setSelectedGroups([]);
        }
    }, [id, dispatch]);


    // (2) Update form HANYA jika data permission berubah & ID cocok
    useEffect(() => {
        console.log("Roles data:", roles);
        if (roles?.data?.id === id) { // Pastikan data sesuai dengan ID saat ini
            setName(roles.data.name || '');
            console.log("Setting name:", roles.data.name);
            setDescription(roles.data.description || '');
            console.log("Setting description:", roles.data.description);

            // Set permissions if they exist
            if (roles.data.permissions && Array.isArray(roles.data.permissions)) {
                setPermissions(roles.data.permissions.map((perm: any) => perm.id));
                console.log("Setting permissions:", roles.data.permissions);
            }

        }
    }, [roles, id]); // Hanya tergantung permission & id

    if (loading || loadingPermission) {
        return
        <LoadingComponents />
    }
    if (error || errorPermission) {
        return <div>Error: {error || errorPermission}</div>; // Tampilkan error state
    }
    if (!roles || !permission) {
        return <div>No data available</div>; // Tampilkan jika tidak ada data
    }

    return (
        <div>
            <div className="text-center lg:text-left pb-8">
                <h1 className="mb-2 text-3xl font-semibold lg:mb-1 lg:text-4xl">
                    {id !== 'add' ? `Edit Role Permission for ${roles.data.name}` : "Add Role"}
                </h1>
                <p className="text-muted-foreground">
                    {id !== 'add' ? "This is a form to edit a role in the admin panel. You can edit the role with name, description, and permissions." : "This is a form to add a role in the admin panel. You can add a role with name, description, and permissions."}
                </p>
            </div>
            <form>
                <Card>
                    <CardContent className="space-y-4 pt-8">
                        <div className="space-y-2">
                            <Label htmlFor="role-name">Role Name (format: admin-content)</Label>
                            <Input
                                id="role-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter role name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role-description">Description</Label>
                            <Textarea
                                id="role-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter role description"
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Div mapping row with name and select */}
                <div className="py-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Permission Management
                            </CardTitle>
                            <CardDescription>Select permissions to assign to users or roles</CardDescription>

                            {/* Group Filters */}
                            <div className="space-y-3 pt-4">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4" />
                                    <Label className="text-sm font-medium">Filter by Groups:</Label>
                                    <Button variant="outline" size="sm" onClick={handleSelectAllGroups}>
                                        All Groups
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleDeselectAllGroups}>
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {groups.map((group) => (
                                        <Button
                                            key={group}
                                            variant={selectedGroups.includes(group) ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleGroupToggle(group)}
                                            className="h-8"
                                        >
                                            {formatGroupName(group)}
                                            {selectedGroups.includes(group) && (
                                                <Badge variant="secondary" className="ml-2 h-5 px-1">
                                                    {permission.data.filter((p) => p.name.startsWith(group + ".")).length}
                                                </Badge>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Permission Actions */}
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                                    Select All Visible
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                                    Deselect All
                                </Button>
                                <Badge variant="secondary" className="ml-auto">
                                    {permissions.length} Permissions Selected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {Object.keys(groupedPermissions).length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No permissions found. Select one or more groups to view permissions.
                                </div>
                            ) : (
                                Object.entries(groupedPermissions).map(([group, groupPerms]) => (
                                    <div key={group} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold">{formatGroupName(group)}</h3>
                                            <Badge variant="outline">{groupPerms.length} permissions</Badge>
                                        </div>
                                        <div className="grid gap-3 pl-4">
                                            {groupPerms.map((perm) => (
                                                <div key={perm.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${perm.id}`}
                                                        checked={permissions.includes(perm.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setPermissions([...permissions, perm.id])
                                                            } else {
                                                                setPermissions(permissions.filter((id) => id !== perm.id))
                                                            }
                                                        }}
                                                    />
                                                    <Label
                                                        htmlFor={`permission-${perm.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
                                                    >
                                                        {/* <span>{formatPermissionName(perm.name)}</span> */}
                                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{perm.name}</code>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {Object.keys(groupedPermissions).length > 1 && <Separator className="mt-4" />}
                                    </div>
                                ))
                            )}
                            {/* Save Permission */}

                        </CardContent>
                        <CardFooter className="flex justify-end p-8">
                            <Button type="submit" onClick={handlePostUpdate}>
                                {id ? "Update Permissions" : "Create Permissions"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>


            </form>
        </div>
    );
}
