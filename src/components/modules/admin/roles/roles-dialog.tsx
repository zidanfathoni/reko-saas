import { Button } from "@/components/atoms/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select"
import { api } from "@/lib"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Checkbox } from "@/components/atoms/checkbox"
import { IconsSelect } from "@/helper/iconsSelect"
import { Textarea } from "@/components/atoms/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { createrole, fetchRolesDetail, updaterole } from "@/lib/slices/admin/user-and-role-permission/admin-roleSlice"
import { fetchPermission, fetchPermissionAll } from "@/lib/slices/admin/user-and-role-permission/admin-permissionSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Badge } from "@/components/atoms/badge"
interface RolesProps {
    id?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AdminRolesDialog({ id, open, onOpenChange }: RolesProps) {
    const dispatch = useAppDispatch();
    const { roles, loading, error } = useAppSelector((state) => state.rolesDetail);
    const { permission, loadingPermission, errorPermission } = useAppSelector((state) => state.permission);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [permissions, setPermissions] = useState<string[]>([]);

    const handleSelectAll = () => {
        // Select all permissions
        const allPermissionIds = permission.data.map((perm: any) => perm.id);
        setPermissions(allPermissionIds);
    }
    const handleDeselectAll = () => {
        // Deselect all permissions
        setPermissions([]);
    }

    const handlePostUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);

        //check is update or create
        if (id) {
            // Update existing role
            try {
                // await dispatch(updaterole({ id, data: formData }));

            } catch (error) {
                console.error("Error updating role:", error);
            }
        }
        else {
            // Create new role
            try {
                // await dispatch(createrole(formData));
            } catch (error) {
                console.error("Error creating role:", error);
            }
        }
    }


    // (1) Fetch data hanya ketika ID berubah
    useEffect(() => {
        dispatch(fetchPermissionAll()); // Pastikan permission sudah di-fetch sebelum membuka dialog
        if (id) {
            dispatch(fetchRolesDetail(id));
        } else {
            // Jika ID tidak ada, reset form
            setName('');
            setDescription('');
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
        return <div>Loading...</div>; // Tampilkan loading state
    }
    if (error || errorPermission) {
        return <div>Error: {error || errorPermission}</div>; // Tampilkan error state
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit Roles" : "Add Roles"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            id ? "This is a form to edit roles to the admin panel. You can edit roles with name, description, and Permission." : "This is a form to add roles to the admin panel. You can add roles with name, description, and Permission."
                        }

                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className="space-y-2">
                        <Label htmlFor="form-name">Name</Label>
                        <Input
                            id="form-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter form name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-description">Description</Label>
                        <Textarea
                            id="form-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter form description"
                            rows={3}
                        />
                    </div>

                    {/* Div mapping row with name and select */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Permission Management
                            </CardTitle>
                            <CardDescription>Select permissions to assign to users or roles</CardDescription>
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                                    Select All
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                                    Deselect All
                                </Button>
                                <Badge variant="secondary" className="ml-auto">
                                    {permissions.length} Permissions Selected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="form-permissions">Permissions</Label>
                                <div className="space-y-3">
                                    {permission.data.map((perm: any) => (
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
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {perm.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                </form>

                <DialogFooter>
                    <Button
                    // onClick={submitHandler}
                    >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
