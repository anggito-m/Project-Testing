import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Receipt, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold">
            PajakKu
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-primary"
          >
            Pengajuan Pajak
          </Link>
          <Link
            href="/check-status"
            className="font-medium transition-colors hover:text-primary"
          >
            Cek Status
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
