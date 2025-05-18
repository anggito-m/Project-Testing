import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import { HeroIcon } from "@/components/hero-icon";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bayar Pajak Jadi Lebih Mudah
                </h1>
                <p className="text-base sm:text-lg text-gray-500 md:text-xl dark:text-gray-400 max-w-[600px]">
                  PajakKu membantu Anda mengajukan dan membayar pajak dengan
                  cepat, aman, dan tanpa ribet.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/form">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ajukan Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/check-status">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Cek Status Pengajuan
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] mx-auto">
                <HeroIcon />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2 max-w-[85%] sm:max-w-none">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm dark:bg-blue-800">
                Fitur Unggulan
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Kenapa Memilih PajakKu?
              </h2>
              <p className="text-gray-500 md:text-lg/relaxed mx-auto max-w-[700px]">
                Kami menyediakan solusi terbaik untuk kebutuhan perpajakan Anda
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col h-full items-center space-y-3 rounded-lg border p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-800">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-50" />
              </div>
              <h3 className="text-xl font-bold text-center">Cepat & Efisien</h3>
              <p className="text-center text-gray-500 dark:text-gray-400 flex-grow">
                Proses pengajuan pajak hanya dalam hitungan menit, tanpa perlu
                antre.
              </p>
              <Link
                href="/form"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Coba Sekarang
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col h-full items-center space-y-3 rounded-lg border p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-800">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-50" />
              </div>
              <h3 className="text-xl font-bold text-center">
                Aman & Terpercaya
              </h3>
              <p className="text-center text-gray-500 dark:text-gray-400 flex-grow">
                Data Anda terlindungi dengan sistem keamanan terkini.
              </p>
              <Link
                href="/form"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Pelajari Lebih Lanjut
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col h-full items-center space-y-3 rounded-lg border p-4 md:p-6 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-800">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-50" />
              </div>
              <h3 className="text-xl font-bold text-center">Mudah Digunakan</h3>
              <p className="text-center text-gray-500 dark:text-gray-400 flex-grow">
                Antarmuka yang sederhana dan intuitif untuk semua pengguna.
              </p>
              <Link
                href="/form"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Lihat Demo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
            <div className="space-y-2 max-w-[85%] sm:max-w-none">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm dark:bg-blue-800">
                Cara Kerja
              </div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Bayar Pajak dalam 3 Langkah
              </h2>
              <p className="text-gray-500 md:text-lg/relaxed mx-auto max-w-[700px]">
                Proses pembayaran pajak yang sederhana dan efisien
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                1
              </div>
              <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200 dark:bg-gray-800"></div>
              <h3 className="text-xl font-bold mb-2">Pilih Jenis Pajak</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Pilih jenis pajak yang ingin Anda bayarkan dari berbagai opsi
                yang tersedia.
              </p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                2
              </div>
              <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200 dark:bg-gray-800"></div>
              <h3 className="text-xl font-bold mb-2">Isi Jumlah Pajak</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Masukkan jumlah pajak yang akan dibayarkan sesuai dengan
                ketentuan.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Dapatkan Bukti</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Terima bukti pengajuan pajak yang dapat digunakan untuk
                keperluan administrasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[85%] sm:max-w-none">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Siap Mengajukan Pajak?
              </h2>
              <p className="text-gray-500 md:text-lg/relaxed mx-auto max-w-[600px] dark:text-gray-400">
                Mulai sekarang dan rasakan kemudahan mengajukan pajak dengan
                PajakKu.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/form">
                <Button size="lg" className="w-full sm:w-auto">
                  Ajukan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/check-status">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Cek Status Pengajuan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
