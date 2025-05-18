"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, CheckCircle2, Printer, Receipt, XCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refNumber = searchParams.get("ref")

  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      // Get submission data from localStorage
      const existingData = localStorage.getItem("taxSubmissions")
      if (existingData) {
        const submissions = JSON.parse(existingData)
        const found = submissions.find((s) => s.referenceNumber === refNumber)
        if (found) {
          setSubmission(found)
        } else {
          toast.error("Data tidak ditemukan", {
            description: "Nomor referensi tidak valid atau data pengajuan tidak ditemukan.",
          })
        }
      } else {
        toast.error("Data tidak ditemukan", {
          description: "Tidak ada data pengajuan yang tersimpan.",
        })
      }
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [refNumber])

  const handleBackClick = () => {
    router.push("/")
  }

  const handlePrint = () => {
    toast.info("Mencetak bukti pengajuan...", {
      description: "Halaman cetak akan terbuka dalam beberapa saat.",
    })
    setTimeout(() => {
      window.print()
    }, 500)
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          {loading ? (
            <Skeleton className="mx-auto h-10 w-10 rounded-full" />
          ) : submission ? (
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-10 w-10 text-red-500" />
          )}
          <h1 className="text-3xl font-bold">
            {loading ? (
              <Skeleton className="mx-auto h-9 w-48" />
            ) : submission ? (
              "Pengajuan Berhasil"
            ) : (
              "Data Tidak Ditemukan"
            )}
          </h1>
          <p className="text-muted-foreground">
            {loading ? (
              <Skeleton className="mx-auto h-5 w-72" />
            ) : submission ? (
              "Berikut adalah detail pengajuan pajak Anda."
            ) : (
              "Nomor referensi tidak valid atau data pengajuan tidak ditemukan."
            )}
          </p>
        </div>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ) : submission ? (
          <Card className="print:border-none print:shadow-none">
            <CardHeader className="print:pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  Bukti Pengajuan Pajak
                </CardTitle>
                <Badge variant="outline" className="print:hidden">
                  {submission.referenceNumber}
                </Badge>
              </div>
              <CardDescription>Simpan nomor referensi ini untuk pengecekan status di kemudian hari.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nomor Referensi</p>
                    <p className="font-medium">{submission.referenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="success" className="mt-1">
                      Diproses
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Pajak</p>
                    <p className="font-medium">{submission.taxType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jumlah Pajak</p>
                    <p className="font-medium">{formatCurrency(submission.taxAmount)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Tanggal Pengajuan</p>
                    <p className="font-medium">
                      {new Date(submission.submissionDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-green-50 p-4 dark:bg-green-950/30">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-500" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-400">Pengajuan Berhasil</h4>
                    <p className="text-sm text-green-700 dark:text-green-500">
                      Pengajuan pajak Anda telah berhasil diproses. Silakan lakukan pembayaran sesuai dengan jumlah yang
                      tertera.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button variant="outline" onClick={handleBackClick} className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <Button onClick={handlePrint} className="w-full sm:w-auto print:hidden">
                <Printer className="mr-2 h-4 w-4" />
                Cetak Bukti
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Data Tidak Ditemukan</CardTitle>
              <CardDescription>Nomor referensi tidak valid atau data pengajuan tidak ditemukan.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pastikan Anda memasukkan nomor referensi yang benar. Jika Anda yakin nomor referensi sudah benar,
                silakan hubungi layanan pelanggan kami.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBackClick}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Formulir
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
