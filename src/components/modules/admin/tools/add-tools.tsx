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
interface CategoryData {
  id: number
  name: string
  description: string
}

export function AddToolsDialog() {
  const cdnImage = process.env.NEXT_PUBLIC_CDN_URL + "/assets/";
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSelected = (value: boolean) => {
    setIsOpen(value);
  }

  return (
    <DialogContent className="sm:max-w-[825px]">
      <DialogHeader>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      <form>
        <div className="space-y-2">
          <Label htmlFor="form-name">Form Name</Label>
          <Input
            id="form-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter form name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="form-description">Form Description</Label>
          <Textarea
            id="form-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter form description"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon-selector">Form Icon</Label>
          <IconsSelect
            onSelectIcon={setSelectedIcon}
            selectedIcon={selectedIcon}
            toggleSelected={toggleSelected}
            isOpen={isOpen}
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