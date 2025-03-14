import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" |"xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "10xl"
  textSize?: "sm" | "md" | "lg"
  variant?: "default" | "white"
  showText?: boolean
}

export function Logo({ className, size = "md", variant = "default", showText = false, textSize = "md" }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 64,
    "2xl": 80,
    "3xl": 96,
    "4xl": 112,
    "5xl": 128,
    "6xl": 144,
    "7xl": 160,
    "8xl": 176,
    "9xl": 192,
    "10xl": 208,
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  }

  return (
    <Link href="/" className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative">
        <Image
          src="/logo-.png"
          alt="Techathon Logo"
          width={sizes[size]}
          height={sizes[size]}
          className="object-contain"
        />
      </div>
      {showText && (
        <span className={cn("font-bold font-header italic", textSizes[textSize], variant === "default" ? "text-gradient" : "text-white")}>
          Techathon
        </span>
      )}
    </Link>
  )
}

