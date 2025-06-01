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
import { createTestimonials, fetchTestimonialsDetail, updateTestimonials } from "@/lib/slices/admin/testimonials-slice"
interface TestimonialsProps {
    id?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AdminTestimonialsDialog({ id, open, onOpenChange }: TestimonialsProps) {
    const dispatch = useAppDispatch();
    const { testimonialsDetail, loadingDetail, errorDetail } = useAppSelector((state) => state.testimonialDetail);
    const [name, setName] = useState<string>('');
    const [jobTitle, setJobTitle] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const handlePostUpdate = async (e: React.FormEvent) => {
        console.log("handlePostUpdate called with id:", id);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("jobTitle", jobTitle);
        formData.append("company", company);
        formData.append("message", message);
        formData.append("link", link || ''); // Pastikan link tidak null

        // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
        if (id) {
            // Update existing testimonial
            try {
                await dispatch(updateTestimonials({ id, data: formData }));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after update
                setName(''); // Clear form fields
                setJobTitle(''); // Clear form fields
                setCompany(''); // Clear form fields
                setMessage(''); // Clear form fields
                setLink(''); // Clear form fields
            } catch (error) {
                console.error("Error updating testimonial:", error);
                // Dispatch failure action or show error message
            }
        } else {
            console.error("ID is required for updating testimonial");
            // Create new testimonial
            try {
                await dispatch(createTestimonials(formData));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after creation
                setName(''); // Clear form fields
                setJobTitle(''); // Clear form fields
                setCompany(''); // Clear form fields
                setMessage(''); // Clear form fields
                setLink(''); // Clear form fields
            } catch (error) {
                console.error("Error creating testimonial:", error);
                // Dispatch failure action or show error message
            }
        }
    }


    // (1) Fetch data hanya ketika ID berubah
    useEffect(() => {
        if (id) {
            dispatch(fetchTestimonialsDetail(id));
        }
    }, [id, dispatch]);

    // (2) Update form HANYA jika data testimonial berubah & ID cocok
    useEffect(() => {
        if (testimonialsDetail?.data?.id === id) { // Pastikan data sesuai dengan ID saat ini
            setName(testimonialsDetail.data.name || '');
            setJobTitle(testimonialsDetail.data.job_title || '');
            setCompany(testimonialsDetail.data.company || '');
            setMessage(testimonialsDetail.data.message || '');
            setLink(testimonialsDetail.data.link || '');
        }
    }, [testimonialsDetail, id]); // Hanya tergantung testimonial & id

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {id ? "Edit Testimonials" : "Add Testimonials"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            id ? "This is a form to edit Testimonials to the admin panel. You can edit Testimonials with name, description, and Testimonial." : "This is a form to add Testimonials to the admin panel. You can add Testimonials with name, description, and Testimonial."
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
                        <Label htmlFor="form-company">Company</Label>
                        <Input
                            id="form-company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Enter company name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-message">Message</Label>
                        <Textarea
                            id="form-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter testimonial message"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="form-link">Link</Label>
                        <Input
                            id="form-link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter link (optional)"
                            required={false} // Link is optional
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
