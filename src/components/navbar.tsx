"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { isRegistrationOpen } from "@/config/registration";
import { Logo } from "@/components/logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if registration is open
    setRegistrationOpen(isRegistrationOpen());

    window.addEventListener("scroll", handleScroll);
    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(
          (anchor as HTMLAnchorElement).getAttribute("href") || "",
        );
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    anchorRef.current?.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(
        anchorRef.current?.getAttribute("href") || "",
      );
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 py-2 shadow-md backdrop-blur-md"
            : "bg-transparent py-4"
        }`}
      >
        <div className={`container flex items-center justify-between`}>
          <Logo size="md" showText textSize="sm" textPlacement="side" />

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="font-header hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="hover:text-neon-blue transition-colors hover:cursor-pointer"
            >
              About
            </a>
            <a
              href="#structure"
              className="hover:text-neon-blue transition-colors hover:cursor-pointer"
            >
              Structure
            </a>
            <a
              href="#prizes"
              className="hover:text-neon-blue transition-colors hover:cursor-pointer"
            >
              Prizes
            </a>
            <a
              href="#contact"
              className="hover:text-neon-blue transition-colors hover:cursor-pointer"
            >
              Contact
            </a>
            {registrationOpen ? (
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("register")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Button variant="secondary" size="sm">
                  Register Now
                </Button>
              </a>
            ) : (
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <header>
          <div
            className={`fixed inset-0 transition-all duration-300 ${isScrolled ? "top-10" : "top-16"} z-40 min-h-full bg-black md:hidden`}
          >
            <nav className="font-header flex flex-col items-center gap-6 bg-black pt-8">
              <a
                href="#about"
                className="hover:text-neon-blue text-xl transition-colors hover:cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#structure"
                className="hover:text-neon-blue text-xl transition-colors hover:cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Structure
              </a>
              <a
                href="#prizes"
                className="hover:text-neon-blue text-xl transition-colors hover:cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Prizes
              </a>
              <a
                href="#contact"
                className="hover:text-neon-blue text-xl transition-colors hover:cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              {registrationOpen ? (
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document
                      .getElementById("register")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Button variant="secondary" size="lg" className="mt-4">
                    Register Now
                  </Button>
                </a>
              ) : (
                <Button variant="outline" size="lg" className="mt-4" disabled>
                  Coming Soon
                </Button>
              )}
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
