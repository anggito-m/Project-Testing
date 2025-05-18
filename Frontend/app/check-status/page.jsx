"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Loader2, Receipt, Search, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

export default function CheckStatusPage() {
  const [referenceNumber, setReferenceNumber] = useState("")
  const [submission, setSubmission] = useState(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCheck = () => {
    if (!referenceNumber.trim()) {
      setError("Nomor referensi harus diisi")
      return
    }

    setError("")
    setLoading(true)

    // Simulate network delay
    setTimeout(() => {
      // Get submission data from localStorage
      const existingData = localStorage.getItem("taxSubmissions")
      if (existingData) {
        const submissions = JSON.parse(existingData)
        const found = submissions.find((s) => s.referenceNumber === referenceNumber)
        if (found) {
          setSubmission(found)
          toast.success("Data ditemukan", {
            description: `Pengajuan dengan nomor ${referenceNumber} berhasil ditemukan.`,
          })
        } else {
          setSubmission(null)
          toast.error("Data tidak ditemukan", {
            description: "Nomor referensi tidak valid atau data pengajuan tidak ditemukan.",
          })
        }
      } else {
        setSubmission(null)
        toast.error("Data tidak ditemukan", {
          description: "Tidak ada data pengajuan yang tersimpan.",
        })
      }
      setSearched(true)
      setLoading(false)
    }, 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleCheck()
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Search className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">Cek Status Pengajuan</h1>
          <p className="text-muted-foreground">Masukkan nomor referensi untuk melihat status pengajuan pajak Anda.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Masukkan Nomor Referensi</CardTitle>
            <CardDescription>Nomor referensi dapat ditemukan pada bukti pengajuan pajak Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Nomor Referensi</Label>
              <div className="flex gap-2">
                <Input
                  id="referenceNumber"
                  placeholder="Contoh: TAX2025-001"
                  value={referenceNumber}
                  onChange={(e) => {
                    setReferenceNumber(e.target.value)
                    if (error) setError("")
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button onClick={handleCheck} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="ml-2 hidden sm:inline">Cek</span>
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {searched && !loading && (
              <div className="pt-2">
                {submission ? (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Detail Pengajuan</h3>
                      </div>
                      <Badge variant="success">Diproses</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nomor Referensi</p>
                        <p className="font-medium">{submission.referenceNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Jenis Pajak</p>
                        <p className="font-medium">{submission.taxType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Jumlah Pajak</p>
                        <p className="font-medium">{formatCurrency(submission.taxAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tanggal Pengajuan</p>
                        <p className="font-medium">
                          {new Date(submission.submissionDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Data Tidak Ditemukan</AlertTitle>
                    <AlertDescription>
                      Nomor referensi tidak valid atau data pengajuan tidak ditemukan.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Formulir
              </Link>
            </Button>
            {submission && (
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/confirmation?ref=${submission.referenceNumber}`}>
                  Lihat Detail
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
