"use client"

import type React from "react"
import { useState } from "react"
import { IconsSelector } from "./iconsSelector"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Button } from "@/components/atoms/button"
import * as Ri from "react-icons/ri"
import * as Fa from "react-icons/fa"
import * as Md from "react-icons/md"
import * as Io from "react-icons/io"
import * as Ai from "react-icons/ai"

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

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element

export function IconForm() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleSelectIcon = (iconName: string | null) => {
    setSelectedIcon(iconName)
  }

  const SelectedIconComponent = selectedIcon
    ? ((iconLibraries[selectedIcon.slice(0, 2) as keyof IconLibraries] as any)[selectedIcon] as IconComponent)
    : null

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="icon-input">Selected Icon</Label>
          <div className="flex mt-1.5">
            <div className="relative flex-grow">
              <Input
                id="icon-input" type="text" value={selectedIcon || ""} readOnly className="pr-10" />
              {SelectedIconComponent && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SelectedIconComponent className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
            <div className="px-1">
              <IconsSelector onSelectIcon={handleSelectIcon} />
            </div>
            <Button variant="outline" className="" onClick={() => setSelectedIcon(null)}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

