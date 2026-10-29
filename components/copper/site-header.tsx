import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const NAV = [
  { href: "#products", label: "Products" },
  { href: "#plus", label: "Copper Plus" },
  { href: "#privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home" className="shrink-0">
          <Logo className="w-24 sm:w-40" />
        </Link>
        <nav aria-label="Main" className="flex items-center sm:gap-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-1 py-1 text-xs font-medium whitespace-nowrap transition-colors sm:px-2 sm:text-sm"
            >
              {item.label}
            </a>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
