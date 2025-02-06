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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { Button } from "@/components/atoms"
import { TbIconsFilled } from "react-icons/tb";

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

interface IconSelectorProps {
  onSelectIcon: (iconName: string | null) => void
}

export function IconsSelector({ onSelectIcon }: IconSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLibrary, setSelectedLibrary] = useState<IconLibrary>("Ri")
  const [isOpen, setIsOpen] = useState(false)

  const allIcons = useMemo(() => {
    return Object.keys(iconLibraries[selectedLibrary]).filter((key) => key.startsWith(selectedLibrary))
  }, [selectedLibrary])

  const filteredIcons = useMemo(() => {
    return allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allIcons, searchTerm])

  const handleSelectIcon = (iconName: string) => {
    onSelectIcon(iconName)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {/* <Input
          type="text"
          placeholder="Select an icon"
          value=""
          readOnly
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
        /> */}
        <Button
          onClick={() => setIsOpen(true)}
          className="flex justify-between items-center"
        >
          <TbIconsFilled className="w-4 h-4 stroke-1 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-4 border-b">
          <Label htmlFor="library-select" className="text-sm font-medium">
            Icon Library
          </Label>
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
        <div className="p-4 border-b">
          <Label htmlFor="icon-search" className="text-sm font-medium">
            Search Icons
          </Label>
          <Input
            id="icon-search"
            type="text"
            placeholder="Search for an icon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-1.5"
          />
        </div>
        <div className="h-[300px] overflow-y-auto p-2">
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
      </PopoverContent>
    </Popover>
  )
}

