"use client"

import { TypewriterText } from "@/components/typewriter-text"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { CountdownTimer } from "@/components/countdown-timer"
import { Logo } from "@/components/logo"

export function HeroSection() {
  // March 13, 2025
  const eventDate = new Date("2025-03-13T00:00:00")

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <Logo size="10xl"/>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <TypewriterText text="Techathon 2025" className="block text-gradient glow mb-2 font-header" />
              <span className="block text-3xl md:text-5xl mt-2 font-header">Innovate. Build. Compete.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-xl md:text-2xl mb-8 text-foreground font-body">
              Join the Kingdom's brightest minds in an intense hackathon where creativity meets technology.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="mb-12">
              <CountdownTimer targetDate={eventDate} />
            </div>
          </FadeIn>

          <FadeIn delay={1}>
            <a href="#register" onClick={(e) => {
              e.preventDefault()
              document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
            }}>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-6 font-body">
              Register Now
            </Button>
            </a>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 mx-auto w-max flex flex-col items-center animate-bounce font-body">
        <span className="text-sm mb-2">Scroll Down</span>
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
  )
}

