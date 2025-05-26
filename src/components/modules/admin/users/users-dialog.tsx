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
import { Dialog } from "@radix-ui/react-dialog"
import { createUser, fetchUsersDetail, updateUser } from "@/lib/slices/admin/user-and-role-permission/admin-userSlice"
interface UsersProps {
  id?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminUsersDialog({ id, open, onOpenChange }: UsersProps ) {
    const dispatch = useAppDispatch();
    const { userDetail, loadingUserDetail, errorUserDetail } = useAppSelector((state) => state.usersDetail);
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
      // Update existing user
      try {
        await dispatch(updateUser({ id, data: formData }));
        // Dispatch success action or show success message
        open && onOpenChange(false); // Close dialog after update
        setName(''); // Clear form fields
        setDescription(''); // Clear form fields
      } catch (error) {
        console.error("Error updating user:", error);
        // Dispatch failure action or show error message
      }
    } else {
        console.error("ID is required for updating user");
      // Create new user
      try {
        await dispatch(createUser(formData));
        // Dispatch success action or show success message
        open && onOpenChange(false); // Close dialog after creation
        setName(''); // Clear form fields
        setDescription(''); // Clear form fields
      } catch (error) {
        console.error("Error creating user:", error);
        // Dispatch failure action or show error message
      }
    }
  }


// (1) Fetch data hanya ketika ID berubah
useEffect(() => {
    if (id) {
      dispatch(fetchUsersDetail(id));
    }
  }, [id, dispatch]);

  // (2) Update form HANYA jika data user berubah & ID cocok
  useEffect(() => {
    if (userDetail?.data?.id === id) { // Pastikan data sesuai dengan ID saat ini
      setName(userDetail.data.full_name || '');
    }
  }, [userDetail, id]); // Hanya tergantung user & id

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
            form="form-user"
            onClick={handlePostUpdate}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}
