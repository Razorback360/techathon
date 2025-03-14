"use client"

import { useEffect, useState } from "react"
import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { isRegistrationOpen, registrationConfig } from "@/config/registration"

export function RegistrationSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)

  // Check if registration is open on component mount and window focus
  useEffect(() => {
    const checkRegistration = () => {
      setIsOpen(isRegistrationOpen())
    }

    // Check on mount
    checkRegistration()

    // Check on window focus (in case the user has the page open when the date changes)
    window.addEventListener("focus", checkRegistration)

    // Set up interval to check every minute
    const interval = setInterval(checkRegistration, 60000)

    return () => {
      window.removeEventListener("focus", checkRegistration)
      clearInterval(interval)
    }
  }, [])

  // Format the registration date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }).format(date)
  }

  return (
    <section id="register" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-neon-green/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold font-header text-center mb-4">
            <span className="text-gradient glow">Register</span> for Techathon
          </h2>

          {isOpen ? (
            <>
              <p className="text-center text-foreground font-body max-w-3xl mx-auto mb-8">
                Registration is now open! Fill out the form below to secure your spot in the Techathon 2025 hackathon.
              </p>

              <FadeIn>
                <RegistrationForm />
              </FadeIn>
            </>
          ) : (
            <>
              <p className="text-center text-foreground font-body max-w-3xl mx-auto mb-8">
                Registration opens on {formatDate(registrationConfig.registrationStartDate)}. Stay tuned!
              </p>

              <div className="flex justify-center mb-12">
                <Button variant="outline" size="lg" disabled className="text-lg px-8 py-6">
                  Registration Coming Soon
                </Button>
              </div>

              <div className="max-w-2xl mx-auto bg-neon-darkblue/50 border border-neon-blue/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-neon-blue">Get Ready for Techathon 2025!</h3>
                <p className="mb-4">
                  Prepare your team and ideas for the upcoming hackathon. Registration will open soon, allowing you to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-foreground font-body">
                  <li>Form teams of 3-5 members</li>
                  <li>Submit your innovative project ideas</li>
                  <li>Compete for exciting prizes</li>
                  <li>Network with industry professionals</li>
                </ul>
                <p className="text-muted-foreground font-body">
                  Make sure to check back on {formatDate(registrationConfig.registrationStartDate)} to register your
                  team!
                </p>
              </div>
            </>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

