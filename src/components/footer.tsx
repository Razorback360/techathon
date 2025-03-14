import { Logo } from "@/components/logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-secondary/80 border-t border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size="md" />
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground font-body">
              &copy; {currentYear} KFUPM Computer Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

