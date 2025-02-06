"use client"

import type React from "react"
import { useState, useMemo } from "react"
import * as Ri from "react-icons/ri"
import * as Fa from "react-icons/fa"
import * as Md from "react-icons/md"
import * as Io from "react-icons/io"
import * as Ai from "react-icons/ai"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Button } from "@/components/atoms/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { Search } from "lucide-react"

type IconLibraries = {
  Ri: typeof Ri
  Fa: typeof Fa
  Md: typeof Md
  Io: typeof Io
  Ai: typeof Ai
}

const iconLibraries: IconLibraries = {
  Ri,
  Fa,
  Md,
  Io,
  Ai,
}

type IconLibrary = keyof IconLibraries
type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element

export default function IconSelector3() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [selectedLibrary, setSelectedLibrary] = useState<IconLibrary>("Ri")
  const [isOpen, setIsOpen] = useState(false)

  const allIcons = useMemo(() => {
    return Object.keys(iconLibraries[selectedLibrary]).filter((key) => key.startsWith(selectedLibrary))
  }, [selectedLibrary])

  const filteredIcons = useMemo(() => {
    return allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allIcons, searchTerm])

  const handleSelectIcon = (iconName: string) => {
    setSelectedIcon(iconName)
    setIsOpen(false)
  }

  const SelectedIconComponent = selectedIcon
    ? ((iconLibraries[selectedLibrary] as any)[selectedIcon] as IconComponent)
    : null

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
            <div className="space-y-4">
              <div>
                <Label htmlFor="library-select">Icon Library</Label>
                <Select
                  value={selectedLibrary}
                  onValueChange={(value: IconLibrary) => {
                    setSelectedLibrary(value)
                    setSearchTerm("")
                  }}
                >
                  <SelectTrigger id="library-select" className="w-full mt-1.5">
                    <SelectValue placeholder="Select a library" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconLibraries).map((lib) => (
                      <SelectItem key={lib} value={lib}>
                        {lib}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
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
                    const IconComponent = (iconLibraries[selectedLibrary] as any)[iconName] as IconComponent
                    return (
                      <button
                        key={iconName}
                        className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col items-center justify-center"
                        onClick={() => handleSelectIcon(iconName)}
                      >
                        <IconComponent className="text-2xl mb-1" />
                        <span className="text-xs text-center break-all">{iconName.replace(selectedLibrary, "")}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

