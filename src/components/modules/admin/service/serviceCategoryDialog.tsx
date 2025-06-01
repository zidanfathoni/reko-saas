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
import { createServiceCategory, fetchServiceCategoryDetail, updateServiceCategory } from "@/lib/slices/admin/service/admin-serviceCategory-slice"
interface ServiceCategoryProps {
    id?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AdminServiceCategoryDialog({ id, open, onOpenChange }: ServiceCategoryProps) {
    const dispatch = useAppDispatch();
    const { serviceCategoryDetail, loadingServiceCategoryDetail, errorServiceCategoryDetail } = useAppSelector((state) => state.serviceCategoryDetail);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
    const [color, setColor] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSelected = (value: boolean) => {
        setIsOpen(value);
    }

    const handlePostUpdate = async (e: React.FormEvent) => {
        console.log("handlePostUpdate called with id:", id);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("icon", selectedIcon || ''); // Pastikan icon tidak null
        formData.append("color", color || ''); // Pastikan color tidak null

        // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
        if (id) {
            // Update existing testimonial
            try {
                await dispatch(updateServiceCategory({ id, data: formData }));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after update
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
                setSelectedIcon(''); // Clear form fields
                setColor(''); // Clear form fields
            } catch (error) {
                console.error("Error updating testimonial:", error);
                // Dispatch failure action or show error message
            }
        } else {
            console.error("ID is required for updating testimonial");
            // Create new testimonial
            try {
                await dispatch(createServiceCategory(formData));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after creation
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
                setSelectedIcon(''); // Clear form fields
                setColor(''); // Clear form fields
            } catch (error) {
                console.error("Error creating testimonial:", error);
                // Dispatch failure action or show error message
            }
        }
    }


    // (1) Fetch data hanya ketika ID berubah
    useEffect(() => {
        if (id) {
            dispatch(fetchServiceCategoryDetail(id));
        }
    }, [id, dispatch]);

    // (2) Update form HANYA jika data testimonial berubah & ID cocok
    useEffect(() => {
        if (serviceCategoryDetail?.data?.id === id) { // Pastikan data sesuai dengan ID saat ini
            setName(serviceCategoryDetail.data.name || '');
            setDescription(serviceCategoryDetail.data.description || '');
            setSelectedIcon(serviceCategoryDetail.data.icon || null);
            setColor(serviceCategoryDetail.data.color || '');
        }
    }, [serviceCategoryDetail, id]); // Hanya tergantung testimonial & id

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit ServiceCategory" : "Add ServiceCategory"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            id ? "This is a form to edit ServiceCategory to the admin panel. You can edit ServiceCategory with name, description, and Testimonial." : "This is a form to add ServiceCategory to the admin panel. You can add ServiceCategory with name, description, and Testimonial."
                        } format: roles(just menu. it will automatically add(manage, view, create, delete) testimonials)

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
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="icon-selector">Icon</Label>
                        <IconsSelect
                            onSelectIcon={setSelectedIcon}
                            selectedIcon={selectedIcon}
                            toggleSelected={toggleSelected}
                            isOpen={isOpen}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-color">Color</Label>
                        <Input
                            id="form-color"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="Select color"
                            required
                        />
                    </div>



                </form>

                <DialogFooter>
                    <Button
                        type="submit"
                        form="form-testimonial"
                        onClick={handlePostUpdate}
                    >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
