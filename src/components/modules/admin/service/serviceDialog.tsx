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
import { createService, fetchServiceDetail, updateService } from "@/lib/slices/admin/service/admin-service-slice"
import { fetchServiceCategoryAll } from "@/lib/slices/admin/service/admin-serviceCategory-slice"
interface ServiceProps {
    id?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AdminServiceDialog({ id, open, onOpenChange }: ServiceProps) {
    const dispatch = useAppDispatch();
    const { serviceDetail, loadingServiceDetail, errorServiceDetail } = useAppSelector((state) => state.ServiceDetail);
    const { serviceCategory, loadingServiceCategory, errorServiceCategory } = useAppSelector((state) => state.serviceCategory);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [duration, setDuration] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<string>('');
    const [serviceLoaded, setServiceLoaded] = useState(false);


    const handlePostUpdate = async (e: React.FormEvent) => {
        console.log("handlePostUpdate called with id:", id);
        e.preventDefault();
        const formData = new FormData();

        // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
        if (id) {
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("duration", duration.toString());
            formData.append("isActive", isActive ? 'true' : 'false');
            formData.append("category_id", categoryId || ''); // Pastikan category_id tidak null
            // Update existing testimonial
            try {
                await dispatch(updateService({ id: serviceDetail.data.id, data: formData }));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after update
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
                setPrice(''); // Clear form fields
                setImageFile(null); // Clear image file
                setDuration(0); // Clear form fields
                setIsActive(true); // Reset isActive to true
                setCategoryId(''); // Clear form fields
            } catch (error) {
                console.error("Error updating testimonial:", error);
                // Dispatch failure action or show error message
            }
        } else {
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            if (imageFile) {
                formData.append("images", imageFile); // Pastikan imageFile tidak null
            }
            formData.append("duration", duration.toString());
            formData.append("isActive", isActive ? 'true' : 'false');
            formData.append("category_id", categoryId || ''); // Pastikan category_id tidak null
            console.error("ID is required for updating testimonial");
            // Create new testimonial
            try {
                await dispatch(createService(formData));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after creation
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
                setPrice(''); // Clear form fields
                imageFile && setImageFile(null); // Clear image file
                setDuration(0); // Clear form fields
                setIsActive(true); // Reset isActive to true
                setCategoryId(''); // Clear form fields
            } catch (error) {
                console.error("Error creating testimonial:", error);
                // Dispatch failure action or show error message
            }
        }
    }


        // (1) Fetch data hanya ketika ID berubah
        useEffect(() => {
            if (id) {
                dispatch(fetchServiceDetail(id)).then(() => {
                    // Setelah userDetail selesai, baru load roles
                    if (!serviceLoaded) {
                        dispatch(fetchServiceCategoryAll()).then(() => {
                            setServiceLoaded(true);
                        });
                    }
                });
            } else {
                // Jika tidak ada ID, langsung load roles
                if (!serviceLoaded) {
                    dispatch(fetchServiceCategoryAll()).then(() => {
                        setServiceLoaded(true);
                    });
                }
            }
        }, [id, dispatch, setServiceLoaded]);

    // (2) Update form HANYA jika data testimonial berubah & ID cocok
    useEffect(() => {
        if (serviceDetail?.data?.slug === id) { // Pastikan data sesuai dengan ID saat ini
            setName(serviceDetail.data.name || '');
            setDescription(serviceDetail.data.description || '');
            setPrice(serviceDetail.data.price || '');
            setImageFile(serviceDetail.data.images ? new File([serviceDetail.data.images], "image.jpg") : null); // Menggunakan file dari URL
            setDuration(serviceDetail.data.duration || 0);
            setIsActive(serviceDetail.data.is_active === 1 ? true : false);
            setCategoryId(serviceDetail.data.category_id || '');
        }
    }, [serviceDetail]); // Hanya tergantung testimonial & id

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit Service" : "Add Service"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            id ? "This is a form to edit Service to the admin panel. You can edit Service with name, description, and Testimonial." : "This is a form to add Service to the admin panel. You can add Service with name, description, and Testimonial."
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
                        <Label htmlFor="form-price">Price</Label>
                        <Input
                            id="form-price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter form price"
                            type="number"
                            required
                        />
                    </div>
                    {
                        !id && (
                            <div className="space-y-2">
                                <Label htmlFor="form-image">Image</Label>
                                <Input
                                    id="form-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImageFile(file);
                                        }
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className="space-y-2">
                        <Label htmlFor="form-duration">Duration (in minutes)</Label>
                        <Input
                            id="form-duration"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            placeholder="Enter form duration"
                            type="number"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-category">Category</Label>
                        <Select
                            onValueChange={setCategoryId}
                            defaultValue={categoryId}
                        >
                            <SelectTrigger id="form-category" className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Service Categories</SelectLabel>
                                    {serviceCategory?.data?.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="form-is-active"
                            checked={isActive}
                            onCheckedChange={(checked) => setIsActive(checked === true ? true : false)}
                        />
                        <Label htmlFor="form-is-active">Is Active</Label>
                        {isActive ? <Eye className="text-green-500" /> : <EyeOff className="text-red-500" />}
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
