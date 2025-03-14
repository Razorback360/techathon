"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X, Eye } from "lucide-react"

interface IdCardPreviewProps {
  file: File
  onRemove?: () => void
  previewSize?: "sm" | "md" | "lg"
  className?: string
}

export function IdCardPreview({ file, onRemove, previewSize = "md", className = "" }: IdCardPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(() => {
    if (!file) return ""
    return URL.createObjectURL(file)
  })

  // Clean up object URL on unmount
  useState(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  })

  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  }

  const isPdf = file.type.includes("pdf")

  return (
    <div className={`relative ${className}`}>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={`${sizes[previewSize]} border border-neon-blue/50 rounded-md overflow-hidden bg-background/50 flex items-center justify-center cursor-pointer hover:border-neon-blue transition-colors`}
            aria-label="View ID card"
          >
            {isPdf ? (
              <div className="text-[10px] text-center p-1 flex flex-col items-center">
                <span>PDF</span>
                <Eye className="h-4 w-4" />
              </div>
            ) : (
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="ID Preview"
                width={previewSize === "sm" ? 48 : previewSize === "md" ? 80 : 128}
                height={previewSize === "sm" ? 48 : previewSize === "md" ? 80 : 128}
                className="object-cover"
              />
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <div className="relative w-full h-full flex items-center justify-center">
            {isPdf ? (
              <iframe src={previewUrl} className="w-full h-[80vh]" />
            ) : (
              <Image
                src={previewUrl || "/placeholder.svg"}
                alt="ID Card"
                width={800}
                height={600}
                className="object-contain max-h-[80vh]"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
          aria-label="Remove file"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

