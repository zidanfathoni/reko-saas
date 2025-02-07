"use client"

import type React from "react"
import { useState, useMemo } from "react"
import * as Ri from "react-icons/ri"
import * as Fa from "react-icons/fa"
import * as Md from "react-icons/md"
import * as Io from "react-icons/io"
import * as Ai from "react-icons/ai"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select"
import { ChevronDown, ChevronRight, Search, SquareX } from "lucide-react"
import { Card, CardContent } from "@/components/atoms"

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
  selectedIcon: string | null
  toggleSelected: (value: boolean | false) => void
  isOpen: boolean | false
}

export function IconsSelect({ onSelectIcon, selectedIcon, toggleSelected, isOpen }: IconSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLibrary, setSelectedLibrary] = useState<IconLibrary>("Ri")

  const allIcons = useMemo(() => {
    return Object.keys(iconLibraries[selectedLibrary]).filter((key) => key.startsWith(selectedLibrary))
  }, [selectedLibrary])

  const filteredIcons = useMemo(() => {
    return allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allIcons, searchTerm])

  const handleSelectIcon = (iconName: string) => {
    onSelectIcon(iconName)
  }

  const SelectedIconComponent = selectedIcon
    ? ((iconLibraries[selectedIcon.slice(0, 2) as keyof IconLibraries] as any)[selectedIcon] as IconComponent)
    : null

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          disabled
          className="w-full justify-start text-left font-normal"
          onClick={(e) => { e.preventDefault() }}
        >
          <div className="flex items-center gap-2">
            {SelectedIconComponent ? <SelectedIconComponent className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            <span>{selectedIcon || "Select an icon"}</span>
          </div>
        </Button>
        {selectedIcon && (
          <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(), onSelectIcon(null) }} className="shrink-0">
            <SquareX className="h-4 w-4" />
            <span className="sr-only">Clear selection</span>
          </Button>
        )}
        <Button variant="ghost" size="icon"
          onClick={(e) => {
            e.preventDefault()
            toggleSelected(!isOpen)
          }}
          className="shrink-0">
          {
            isOpen === true ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          }
          <span className="sr-only">Open Icons</span>
        </Button>
      </div>
      {
        isOpen === true ? (
          <Card>
            <CardContent
              className="py-2"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Select
                    value={selectedLibrary}
                    onValueChange={(value: IconLibrary) => {
                      setSelectedLibrary(value)
                      setSearchTerm("")
                    }}
                  >
                    <SelectTrigger id="library-select" className="w-full">
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
                  <Input
                    type="text"
                    placeholder="Search icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="h-[200px] overflow-y-auto border rounded-md p-2">
                  <div className="grid lg:grid-cols-6 grid-cols-4 gap-2">
                    {filteredIcons.map((iconName) => {
                      const IconComponent = (iconLibraries[selectedLibrary] as any)[iconName] as IconComponent
                      return (
                        <Button
                          key={iconName}
                          variant="outline"
                          className="h-auto aspect-square p-2 flex flex-col items-center justify-center"
                          onClick={(e) => { e.preventDefault(), handleSelectIcon(iconName) }}
                        >
                          <IconComponent className="text-xl mb-1" />
                          <span className="text-xs text-center break-all">{iconName.replace(selectedLibrary, "")}</span>
                        </Button>
                      )
                    }
                    )
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) :
          (
            <></>
          )
      }
    </div>
  )
}

