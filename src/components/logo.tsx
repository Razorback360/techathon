import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "10xl";
  textSize?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "white";
  showText?: boolean;
  textPlacement?: "side" | "under";
}

export function Logo({
  className,
  size = "md",
  variant = "default",
  showText = false,
  textPlacement = "side",
  textSize = "md",
}: LogoProps) {
  const sizes = {
    xs: 24,
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
  };

  const textSizes = {
    xs: "text-md",
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2",
        textPlacement === "side" ? "flex-row" : "flex-col",
        className,
      )}
    >
      <div className="relative">
        <Image
          src="/logo-no-text.png"
          alt="Techathon Logo"
          width={sizes[size]}
          height={sizes[size]}
          className="object-contain"
        />
      </div>
      {showText && (
        <span
          className={cn(
            "font-header font-bold italic",
            textSizes[textSize],
            variant === "default" ? "text-gradient" : "text-white",
          )}
        >
          Techathon
        </span>
      )}
    </Link>
  );
}
