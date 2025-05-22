"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ImageIcon, X } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/atoms/form"
import { cn } from "@/lib/utils"

interface ImageUploadFieldProps {
  label: string
  description?: string
  value: string
  onChange: (value: string | File) => void
  placeholder?: string
  required?: boolean
  className?: string
  error?: string
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  placeholder = "https://example.com/image.png",
  required = false,
  className,
  error,
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<"url" | "file">("url")
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onChange(file)

    // Clean up the object URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url || null)
    onChange(url)
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleMode = () => {
    setMode(mode === "url" ? "file" : "url")
    // Reset preview when switching modes
    if (mode === "file") {
      setPreview(value || null)
    }
  }

  return (
    <FormItem className={cn("space-y-3", className)}>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>

      <div className="space-y-3">
        {/* Image Preview */}
        {preview && (
          <div className="relative w-full max-w-xs overflow-hidden rounded-md border border-border">
            <img
              src={preview || "/placeholder.svg"}
              alt={label}
              className="h-40 w-full object-contain"
              onError={() => setPreview(null)}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Input Controls */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={mode === "url" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("url")}
              className="text-xs"
            >
              URL
            </Button>
            <Button
              type="button"
              variant={mode === "file" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("file")}
              className="text-xs"
            >
              Upload File
            </Button>
          </div>

          {mode === "url" ? (
            <FormControl>
              <Input
                placeholder={placeholder}
                value={typeof value === "string" ? value : ""}
                onChange={handleUrlChange}
                className="w-full"
              />
            </FormControl>
          ) : (
            <div className="flex items-center gap-2">
              <FormControl>
                <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
              </FormControl>
            </div>
          )}
        </div>
      </div>

      {description && <FormDescription>{description}</FormDescription>}
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  )
}
