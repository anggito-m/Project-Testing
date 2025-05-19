"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowRight, Receipt, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

// Form validation schema
const formSchema = z.object({
  taxType: z.string({
    required_error: "Jenis pajak harus dipilih",
  }),
  taxAmount: z.coerce
    .number({
      required_error: "Jumlah pajak harus diisi",
      invalid_type_error: "Jumlah pajak harus berupa angka",
    })
    .positive({
      message: "Jumlah pajak harus angka positif",
    }),
});

export default function TaxForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taxAmount: undefined,
    },
  });

  // Handle form submission
  /*function onSubmit(values) {
    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      try {
        // Generate reference number
        const refNumber = `TAX2025-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`;

        // Create submission data
        const submissionData = {
          referenceNumber: refNumber,
          taxType: values.taxType,
          taxAmount: values.taxAmount,
          submissionDate: new Date().toISOString(),
        };

        // Store in MongoDB
        const response = fetch("http://localhost:5000/api/submission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            taxType: values.taxType,
            taxAmount: values.taxAmount,
          }),
        })
        
        if (!response.ok) {
          throw new Error("Gagal mengirim data")
        }
        
        const data = response.json()

        // Show success toast
        toast.success("Pengajuan Berhasil", {
          description: `Nomor referensi: ${refNumber}`,
          duration: 5000,
        });

        // Navigate to confirmation page with data
        router.push(`/confirmation?ref=${refNumber}`);
      } catch (error) {
        toast.error("Terjadi Kesalahan", {
          description: "Gagal menyimpan data pengajuan. Silakan coba lagi.",
          duration: 5000,
        });
        setIsSubmitting(false);
      }
    }, 1000);
  }*/

  // Handle form submission
  async function onSubmit(values) {
    setIsSubmitting(true);
    console.log("Values yang dikirim:", values);
    try {
      const response = await fetch("http://localhost:5000/api/submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          taxType: values.taxType,
          taxAmount: values.taxAmount,
        }),
      });

      console.log("Values yang dikirim:", response.body);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.error || "Gagal mengirim data");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      toast.success("Pengajuan Berhasil", {
        description: `Nomor referensi: ${data.reference_number}`,
        duration: 5000,
      });

      router.push(`/confirmation?ref=${data.reference_number}`);
    } catch (error) {
      console.error("Error saat submit:", error);
      toast.error("Terjadi Kesalahan", {
        description: "Gagal menyimpan data pengajuan. Silakan coba lagi.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Receipt className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold">Formulir Pengajuan Pajak</h1>
          <p className="text-muted-foreground">
            Silakan isi formulir di bawah ini untuk mengajukan pembayaran pajak.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detail Pengajuan</CardTitle>
            <CardDescription>
              Masukkan informasi pajak yang akan dibayarkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="taxType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Pajak</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis pajak" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pajak Penghasilan">
                            Pajak Penghasilan
                          </SelectItem>
                          <SelectItem value="Pajak Kendaraan">
                            Pajak Kendaraan
                          </SelectItem>
                          <SelectItem value="Pajak Bumi dan Bangunan">
                            Pajak Bumi dan Bangunan
                          </SelectItem>
                          <SelectItem value="Pajak Pertambahan Nilai">
                            Pajak Pertambahan Nilai
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Pilih jenis pajak yang ingin Anda bayarkan.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="taxAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Pajak</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            Rp
                          </span>
                          <Input
                            type="number"
                            className="pl-9"
                            placeholder="0"
                            {...field}
                            onChange={(e) => {
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : e.target.value
                              );
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Masukkan jumlah pajak dalam Rupiah (tanpa titik atau
                        koma).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert
                  variant="outline"
                  className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
                >
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle>Informasi</AlertTitle>
                  <AlertDescription>
                    Pastikan data yang Anda masukkan sudah benar sebelum
                    melanjutkan.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Memproses...</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      </>
                    ) : (
                      <>
                        Ajukan Pembayaran
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link href="/check-status">Cek Status Pengajuan</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
