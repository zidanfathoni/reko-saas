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
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/atoms/checkbox"
import { IconsSelect } from "@/helper/iconsSelect"
import { Textarea } from "@/components/atoms/textarea"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { fetchToolsDetail, fetchToolsPost, fetchToolsUpdate } from "@/lib/slices/toolsSlices"
interface ToolsProps {
    slug?: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AddToolsDialog({ slug, open, onOpenChange }: ToolsProps) {
    const dispatch = useAppDispatch();
    const { toolsDetail, loadingDetail, errorDetail } = useAppSelector((state) => state.toolsDetail);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
    const [linkLabel, setLinkLabel] = useState<string>('');
    const [linkTarget, setLinkTarget] = useState<string>('');
    const [linkUrl, setLinkUrl] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSelected = (value: boolean) => {
        setIsOpen(value);
    }

    const handlePostUpdate = async (e: React.FormEvent) => {
        console.log("handlePostUpdate called with id:", slug);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("icon", selectedIcon || ''); // Pastikan icon tidak null
        formData.append("description", description);
        formData.append("linkLabel", linkLabel);
        formData.append("linkUrl", linkUrl);
        formData.append("linkTarget", linkTarget || '_blank'); // Default ke '_blank' jika tidak ada


        // Cek apakah ID ada, jika ada berarti update, jika tidak berarti create
        if (slug) {
            // Update existing tool
            try {
                const id = toolsDetail.data.id; // Ambil ID dari toolsDetail
                await dispatch(fetchToolsUpdate({ id, data: formData }));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after update
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
            } catch (error) {
                console.error("Error updating tool:", error);
                // Dispatch failure action or show error message
            }
        } else {
            console.error("ID is required for updating tool");
            // Create new tool
            try {
                await dispatch(fetchToolsPost(formData));
                // Dispatch success action or show success message
                open && onOpenChange(false); // Close dialog after creation
                setName(''); // Clear form fields
                setDescription(''); // Clear form fields
            } catch (error) {
                console.error("Error creating tool:", error);
                // Dispatch failure action or show error message
            }
        }
    }

    // (1) Fetch data hanya ketika ID berubah
    useEffect(() => {
        if (slug) {
            dispatch(fetchToolsDetail(slug));
        }
    }, [slug, dispatch]);

    // (2) Update form HANYA jika data tool berubah & ID cocok
    useEffect(() => {
        if (toolsDetail?.data?.slug === slug) { // Pastikan data sesuai dengan ID saat ini
            setName(toolsDetail.data.name || '');
            setDescription(toolsDetail.data.description || '');
            setSelectedIcon(toolsDetail.data.icon || null);
            setLinkLabel(toolsDetail.data.link_label || '');
            setLinkTarget(toolsDetail.data.link_target || '_blank');
            setLinkUrl(toolsDetail.data.link_url || '');
        }
    }, [toolsDetail, slug]); // Hanya tergantung tool & id


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {slug ? "Edit Tools" : "Add Tools"}
                    </DialogTitle>
                    <DialogDescription>
                        {
                            slug ? "This is a form to edit tools in the admin panel. You can edit tools with name, description, icon, link label, link target, and link URL." : "This is a form to add tools in the admin panel. You can add tools with name, description, icon, link label, link target, and link URL."
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
                    <div className="space-y-2">
                        <Label htmlFor="icon-selector">Icon</Label>
                        <IconsSelect
                            onSelectIcon={setSelectedIcon}
                            selectedIcon={selectedIcon}
                            toggleSelected={toggleSelected}
                            isOpen={isOpen}
                        />
                    </div>
                    {/* div row: link label and link target */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="link-label">Link Label</Label>
                            <Input
                                id="link-label"
                                value={linkLabel}
                                onChange={(e) => setLinkLabel(e.target.value)}
                                placeholder="Enter link label"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link-target">Link Target</Label>
                            <Select onValueChange={setLinkTarget} defaultValue={linkTarget}>
                                <SelectTrigger id="link-target" className="w-full">
                                    <SelectValue placeholder="Select link target" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="_blank">New Tab</SelectItem>
                                        <SelectItem value="_self">Same Tab</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* div link url */}
                    <div className="space-y-2">
                        <Label htmlFor="link-url">Link URL</Label>
                        <Input
                            id="link-url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Enter link URL"
                        />
                    </div>

                </form>

                <DialogFooter>
                    <Button
                    type="submit"
                    form="form-tools"
                    onClick={handlePostUpdate}
                    disabled={loadingDetail || !name || !description || !selectedIcon || !linkLabel || !linkUrl}
                    >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
