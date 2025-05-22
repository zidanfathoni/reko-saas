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
import { api } from "@/lib"
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/atoms/checkbox"
import { IconsSelect } from "@/helper/iconsSelect"
import { Textarea } from "@/components/atoms/textarea"
interface ToolsProps {
  id?: number
}

export function AddToolsDialog({ id }: ToolsProps) {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/uploads/";
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

  return (
    <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Tools</DialogTitle>
        <DialogDescription>
            This is a form to add tools to the admin panel. You can add tools with name, description, and icon.

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
        // onClick={submitHandler}
        >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  )
}
