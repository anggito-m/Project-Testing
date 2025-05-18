"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Receipt,
  Search,
  Menu,
  X,
  Home,
  FileText,
  CheckSquare,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/form", label: "Pengajuan Pajak", icon: FileText },
    { href: "/check-status", label: "Cek Status", icon: CheckSquare },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold">
            PajakKu
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`font-medium transition-colors hover:text-primary ${
                isActive(route.href) ? "text-primary" : "text-foreground/60"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="hidden md:flex"
          >
            <Link href="/check-status">
              <Search className="h-4 w-4" />
              <span className="sr-only">Cek Status</span>
            </Link>
          </Button>
          <ModeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Animation */}
      <div
        className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-3/4 max-w-xs bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">PajakKu</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex flex-col space-y-1">
              {routes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-3 px-3 py-3 text-base font-medium rounded-md transition-colors hover:bg-accent ${
                      isActive(route.href)
                        ? "text-primary bg-accent/50"
                        : "text-foreground/60"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t">
              <Button asChild className="w-full justify-start">
                <Link href="/form" onClick={() => setMobileMenuOpen(false)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Ajukan Pajak Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
