"use client";

import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { Mail, Phone, Copy, Check } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "techathon@cckfupm.com";

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    void navigator.clipboard.writeText(text);
    if (type === "email") {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="bg-secondary/30 relative overflow-hidden py-20"
    >
      <div className="bg-primary/10 absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <FadeIn>
          <h2 className="font-header mb-4 text-center text-3xl font-bold md:text-4xl">
            Get in <span className="text-gradient glow">Touch</span>
          </h2>
          <p className="text-muted-foreground font-body mx-auto mb-16 max-w-3xl text-center">
            Have questions about the hackathon? Reach out to us!
          </p>
        </FadeIn>

        <div className="mx-auto max-w-2xl">
          <div className="grid gap-8 md:grid-cols-1">
            <FadeIn direction="right">
              <div className="bg-secondary/50 border-secondary h-full rounded-xl border p-6 backdrop-blur-xs">
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-accent/10 rounded-lg p-3">
                    <Mail className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-header text-xl font-bold">Email</h3>
                </div>

                <div className="bg-background/50 flex items-center justify-between rounded-lg p-3">
                  <span className="text-muted-foreground font-body">
                    {email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(email, "email")}
                    aria-label="Copy email to clipboard"
                  >
                    {emailCopied ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="font-body mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Organized by KFUPM Computer Club
              </p>
              <Link
                href="https://forms.gle/rVZSGH5zWUk5SGNG7"
                target="_blank"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                Register for Techathon
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
