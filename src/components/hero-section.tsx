"use client";

import { TypewriterText } from "@/components/typewriter-text";
import { Button, buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { CountdownTimer } from "@/components/countdown-timer";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function HeroSection() {
  // March 13, 2025
  const eventDate = new Date("2025-03-13T00:00:00");

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="bg-primary/20 absolute top-1/4 -left-20 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-accent/10 absolute -right-20 bottom-1/4 h-64 w-64 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="mb-6 flex justify-center">
              <Logo size="10xl" />
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              <TypewriterText
                text="Techathon 2025"
                className="text-gradient glow font-header mb-2 block"
              />
              <span className="font-header mt-2 block text-3xl md:text-5xl">
                Innovate. Build. Compete.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-foreground font-body mb-8 text-xl md:text-2xl">
              Join the Kingdom's brightest minds in an intense hackathon where
              creativity meets technology.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="mb-12">
              <CountdownTimer targetDate={eventDate} />
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <Link
              href="https://forms.gle/rVZSGH5zWUk5SGNG7"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
              })}
            >
              Register Now
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="font-body absolute right-0 bottom-8 left-0 mx-auto flex w-max animate-bounce flex-col items-center">
        <span className="mb-2 text-sm">Scroll Down</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
