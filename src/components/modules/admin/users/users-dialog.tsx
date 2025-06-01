import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
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
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Dialog } from "@radix-ui/react-dialog"
import { createUser, fetchUsersDetail, updateUser } from "@/lib/slices/admin/user-and-role-permission/admin-userSlice"
import { fetchRolesAll } from "@/lib/slices/admin/user-and-role-permission/admin-roleSlice"
import { toast } from "@/components/atoms/use-toast"
import { Eye, EyeOff } from "lucide-react"
interface UsersProps {
    id?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AdminUsersDialog({ id, open, onOpenChange }: UsersProps) {
    const dispatch = useAppDispatch();
    const { userDetail, loadingUserDetail, errorUserDetail } = useAppSelector((state) => state.usersDetail);
    const { roles, loading, error } = useAppSelector((state) => state.roles);
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [jobTitle, setJobTitle] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [roleId, setRoleId] = useState<string>('');
    const [rolesLoaded, setRolesLoaded] = useState(false);

    const handlePostUpdate = async (e: React.FormEvent) => {
        console.log("handlePostUpdate called with id:", id);
        e.preventDefault();
        const formData = new FormData();

        // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
        if (id) {
            formData.append("fullName", name);
            formData.append("username", username);
            formData.append("jobTitle", jobTitle);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("roleId", roleId || ''); // Pastikan roleId tidak null
            // Update existing user
            try {
                await dispatch(updateUser({ id, data: formData }));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after update
                setName(''); // Clear form fields
                setUsername(''); // Clear form fields
                setJobTitle(''); // Clear form fields
                setPhone(''); // Clear form fields
                setEmail(''); // Clear form fields
                setRoleId(''); // Clear form fields
            } catch (error) {
                console.error("Error updating user:", error);
                // Dispatch failure action or show error message
            }
        } else {

            formData.append("fullName", name);
            formData.append("username", username);
            formData.append("jobTitle", jobTitle);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("roleId", roleId || ''); // Pastikan roleId tidak null
            console.error("ID is required for updating user");
            // Create new user
            if (password !== confirmPassword) {
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: "Password and Confirm Password do not match.",
                });
                // Show error message for password mismatch
                return;
            }
            try {
                await dispatch(createUser(formData));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after creation
                setName(''); // Clear form fields
                setUsername(''); // Clear form fields
                setJobTitle(''); // Clear form fields
                setPhone(''); // Clear form fields
                setEmail(''); // Clear form fields
                setRoleId(''); // Clear form fields
            } catch (error) {
                console.error("Error creating user:", error);
                // Dispatch failure action or show error message
            }
        }
    }


    // (1) Fetch data hanya ketika ID berubah
    useEffect(() => {
        if (id) {
            dispatch(fetchUsersDetail(id)).then(() => {
                // Setelah userDetail selesai, baru load roles
                if (!rolesLoaded) {
                    dispatch(fetchRolesAll()).then(() => {
                        setRolesLoaded(true);
                    });
                }
            });
        } else {
            // Jika tidak ada ID, langsung load roles
            if (!rolesLoaded) {
                dispatch(fetchRolesAll()).then(() => {
                    setRolesLoaded(true);
                });
            }
        }
    }, [id, dispatch, rolesLoaded]);

    // (2) Update form HANYA jika data user berubah & ID cocok
    useEffect(() => {
        if (userDetail?.data?.id === id) {
            setName(userDetail.data.full_name || '');
            setUsername(userDetail.data.username || '');
            setJobTitle(userDetail.data.job_title || '');
            setPhone(userDetail.data.phone || '');
            setEmail(userDetail.data.email || '');
            setRoleId(userDetail.data.role_id || '');
        } else if (id && !userDetail) {
            setName('');
            setUsername('');
            setJobTitle('');
            setPhone('');
            setEmail('');
            setRoleId('');
        }
    }, [userDetail, id]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit Users" : "Add Users"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            id ? "This is a form to edit Users to the admin panel. You can edit Users with name, description, and User." : "This is a form to add Users to the admin panel. You can add Users with name, description, and User."
                        } format: roles(just menu. it will automatically add(manage, view, create, delete) users)

                    </DialogDescription>
                </DialogHeader>
                <form
                    id="form-user"
                >
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
                        <Label htmlFor="form-username">Username</Label>
                        <Input
                            id="form-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter form username"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-job-title">Job Title</Label>
                        <Input
                            id="form-job-title"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Enter job title"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-phone">Phone</Label>
                        <Input
                            id="form-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-email">Email</Label>
                        <Input
                            id="form-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            required
                        />
                    </div>
                    {
                        !id && (
                            <div>
                                <div className="space-y-2">
                                    <Label htmlFor="form-password">Password</Label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="form-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            required={!id} // Password is required only when creating a new user
                                            className="pr-10" // Add padding for the icon
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="form-confirm-password">Confirm Password</Label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="form-confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                            required={!id} // Confirm password is required only when creating a new user
                                            className="pr-10" // Add padding for the icon
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="space-y-2">
                        <Label htmlFor="form-role">Role</Label>
                        <Select onValueChange={setRoleId} defaultValue={roleId} disabled={loading || !!error}>
                            <SelectTrigger id="form-role" className="w-full">
                                <SelectValue
                                    placeholder={
                                        loading ? "Loading roles..." :
                                            error ? "Error loading roles" :
                                                id && !userDetail ? "Loading user data..." :
                                                    "Select role"
                                    }
                                />
                            </SelectTrigger>
                            {!loading && !error && (
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        {roles.data.map((role) => (
                                            <SelectItem key={role.id} value={role.id}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            )}
                        </Select>
                        {loading && <p className="text-sm text-muted-foreground">Loading roles...</p>}
                        {error && <p className="text-sm text-destructive">Error loading roles</p>}
                    </div>


                </form>

                <DialogFooter>
                    <Button
                        type="submit"
                        form="form-user"
                        onClick={handlePostUpdate}
                    >
                        {id ? "Update User" : "Create User"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
