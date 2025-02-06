"use client"

import { useState } from "react"
import * as Ri from "react-icons/ri"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"

export default function IconSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const allIcons = Object.keys(Ri).filter((key) => key.startsWith("Ri"))

  const filteredIcons = allIcons.filter((iconName) => iconName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React Icons Selector</h1>

      <div className="mb-4">
        <Label htmlFor="icon-search">Search Icons</Label>
        <Input
          id="icon-search"
          type="text"
          placeholder="Search for an icon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="selected-icon">Selected Icon</Label>
        <Input id="selected-icon" type="text" value={selectedIcon || ""} readOnly className="w-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filteredIcons.map((iconName) => {
          const IconComponent = Ri[iconName as keyof typeof Ri]
          return (
            <button
              key={iconName}
              className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col items-center justify-center"
              onClick={() => setSelectedIcon(iconName)}
            >
              <IconComponent className="text-2xl mb-1" />
              <span className="text-xs text-center break-all">{iconName}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

