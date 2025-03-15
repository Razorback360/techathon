"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Eye, Upload } from "lucide-react";

interface IdCardPreviewProps {
  file?: File;
  onRemove?: () => void;
  previewSize?: "sm" | "md" | "lg";
  className?: string;
  onChange?: (file: File) => void;
  inputId?: string;
}

export function IdCardPreview({
  file,
  onRemove,
  previewSize = "md",
  className = "",
  onChange,
  inputId = "id-card-upload",
}: IdCardPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Create object URL when file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && onChange) {
      onChange(selectedFile);
    }
  };

  const isPdf = file?.type.includes("pdf");
  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  return (
    <div className={`relative ${className}`}>
      {file ? (
        <>
          <Dialog>
            <DialogHeader className="hidden" hidden>
              <DialogTitle>ID Card Preview</DialogTitle>
              <DialogDescription>
                Preview your ID card to verify your identity.
              </DialogDescription>
              x
            </DialogHeader>
            <DialogTrigger asChild>
              <button
                className={`${sizes[previewSize]} border-neon-blue/50 bg-background/50 hover:border-neon-blue flex cursor-pointer items-center justify-center overflow-hidden rounded-md border transition-colors`}
                aria-label="View ID card"
              >
                {isPdf ? (
                  <div className="flex flex-col items-center p-1 text-center text-[10px]">
                    <span>PDF</span>
                    <Eye className="h-4 w-4" />
                  </div>
                ) : (
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="ID Preview"
                    width={
                      previewSize === "sm"
                        ? 48
                        : previewSize === "md"
                          ? 80
                          : 128
                    }
                    height={
                      previewSize === "sm"
                        ? 48
                        : previewSize === "md"
                          ? 80
                          : 128
                    }
                    className="object-cover"
                  />
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="relative flex h-full w-full items-center justify-center">
                {isPdf ? (
                  <iframe src={previewUrl} className="h-[80vh] w-full" />
                ) : (
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="ID Card"
                    width={800}
                    height={600}
                    className="max-h-[80vh] object-contain"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
              aria-label="Remove file"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </>
      ) : (
        <label
          htmlFor={inputId}
          className={`${sizes[previewSize]} border-neon-blue/50 hover:bg-neon-blue/5 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors`}
        >
          <Upload className="text-neon-blue h-5 w-5" />
          <span className="mt-1 text-center text-[10px]">Upload</span>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
