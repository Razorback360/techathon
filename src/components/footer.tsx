import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-secondary border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Logo size="md" />
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground font-body text-sm">
              &copy; {currentYear} KFUPM Computer Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
