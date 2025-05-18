import Link from "next/link"
import { Receipt } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">PajakKu</span>
            </div>
            <p className="text-sm text-muted-foreground">Solusi pembayaran pajak online yang mudah, cepat, dan aman.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Layanan</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                    Pengajuan Pajak
                  </Link>
                </li>
                <li>
                  <Link href="/check-status" className="text-muted-foreground transition-colors hover:text-foreground">
                    Cek Status
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Bantuan</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Hubungi Kami
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PajakKu. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  )
}
