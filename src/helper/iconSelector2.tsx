"use client"

import { useState } from "react"
import * as Ri from "react-icons/ri"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Button } from "@/components/atoms/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover"
import { Search } from "lucide-react"

export default function IconSelector2() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const allIcons = Object.keys(Ri).filter((key) => key.startsWith("Ri"))

  const filteredIcons = allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName)
    setIsOpen(false)
  }

  const SelectedIconComponent = selectedIcon ? Ri[selectedIcon as keyof typeof Ri] : null

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <Label htmlFor="icon-input">Selected Icon</Label>
      <div className="flex mt-1.5">
        <div className="relative flex-grow">
          <Input id="icon-input" type="text" value={selectedIcon || ""} readOnly className="pr-10" />
          {SelectedIconComponent && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SelectedIconComponent className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="mb-4">
              <Label htmlFor="icon-search">Search Icons</Label>
              <Input
                id="icon-search"
                type="text"
                placeholder="Search for an icon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mt-1.5"
              />
            </div>
            <div className="h-60 overflow-y-auto">
              <div className="grid grid-cols-4 gap-2">
                {filteredIcons.map((iconName) => {
                  const IconComponent = Ri[iconName as keyof typeof Ri]
                  return (
                    <button
                      key={iconName}
                      className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col items-center justify-center"
                      onClick={() => handleSelectIcon(iconName)}
                    >
                      <IconComponent className="text-2xl mb-1" />
                      <span className="text-xs text-center break-all">{iconName.replace("Ri", "")}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

