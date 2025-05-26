import { Button } from "@/components/atoms/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/atoms/dialog"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useEffect, useRef, useState } from "react"
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
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/atoms/checkbox"
import { IconsSelect } from "@/helper/iconsSelect"
import { Textarea } from "@/components/atoms/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { createPermission, fetchPermissionDetail, updatePermission } from "@/lib/slices/admin/user-and-role-permission/admin-permissionSlice"
import { Dialog } from "@radix-ui/react-dialog"
interface PermissionsProps {
  id?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminPermissionsDialog({ id, open, onOpenChange }: PermissionsProps ) {
    const dispatch = useAppDispatch();
    const { permission, loading, error } = useAppSelector((state) => state.permissionDetail);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handlePostUpdate = async (e: React.FormEvent) => {
    console.log("handlePostUpdate called with id:", id);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
    if (id) {
      // Update existing permission
      try {
        await dispatch(updatePermission({ id, data: formData }));
        // Dispatch success action or show success message
        open && onOpenChange(false); // Close dialog after update
        setName(''); // Clear form fields
        setDescription(''); // Clear form fields
      } catch (error) {
        console.error("Error updating permission:", error);
        // Dispatch failure action or show error message
      }
    } else {
        console.error("ID is required for updating permission");
      // Create new permission
      try {
        await dispatch(createPermission(formData));
        // Dispatch success action or show success message
        open && onOpenChange(false); // Close dialog after creation
        setName(''); // Clear form fields
        setDescription(''); // Clear form fields
      } catch (error) {
        console.error("Error creating permission:", error);
        // Dispatch failure action or show error message
      }
    }
  }


// (1) Fetch data hanya ketika ID berubah
useEffect(() => {
    if (id) {
      dispatch(fetchPermissionDetail(id));
    }
  }, [id, dispatch]);

  // (2) Update form HANYA jika data permission berubah & ID cocok
  useEffect(() => {
    if (permission?.data?.id === id) { // Pastikan data sesuai dengan ID saat ini
      setName(permission.data.name || '');
      setDescription(permission.data.description || '');
    }
  }, [permission, id]); // Hanya tergantung permission & id

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
            {id ? "Edit Permissions" : "Add Permissions"}
            </DialogTitle>
        <DialogDescription>
            {
                id ? "This is a form to edit Permissions to the admin panel. You can edit Permissions with name, description, and Permission." : "This is a form to add Permissions to the admin panel. You can add Permissions with name, description, and Permission."
            } format: roles(just menu. it will automatically add(manage, view, create, delete) permissions)

        </DialogDescription>
      </DialogHeader>
      <form
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
          <Label htmlFor="form-description">Description</Label>
          <Textarea
            id="form-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter form description"
            rows={3}
          />
        </div>


      </form>

      <DialogFooter>
        <Button
            type="submit"
            form="form-permission"
            onClick={handlePostUpdate}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}
