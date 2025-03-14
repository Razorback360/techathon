"use client"

import { useState } from "react"
import { FadeIn } from "@/components/fade-in"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Copy, Check } from "lucide-react"

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false)

  const email = "techathon@cckfupm.com"

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text)
    if (type === "email") {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-header">
            Get in <span className="text-gradient glow">Touch</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-16 font-body">
            Have questions about the hackathon? Reach out to us!
          </p>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-1 gap-8">
            <FadeIn direction="right">
              <div className="bg-secondary/50 rounded-xl p-6 backdrop-blur-xs border border-secondary h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-header">Email</h3>
                </div>

                <div className="flex items-center justify-between bg-background/50 p-3 rounded-lg">
                  <span className="text-muted-foreground font-body">{email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(email, "email")}
                    aria-label="Copy email to clipboard"
                  >
                    {emailCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center font-body">
              <p className="text-muted-foreground mb-6">Organized by KFUPM Computer Club</p>
              <a href="#register" onClick={(e) => {
                e.preventDefault()
                document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
              }}>
                <Button variant="secondary" size="lg">
                  Register for Techathon
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

