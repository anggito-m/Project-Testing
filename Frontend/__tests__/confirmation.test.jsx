import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmationPage from "../app/confirmation/page";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock sonner toast
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

function formatRupiah(number) {
  return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Mock window.print
window.print = jest.fn();

describe("ConfirmationPage", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    useRouter.mockReturnValue(mockRouter);
    global.fetch = jest.fn();

    window.print = jest.fn(); // Mock window.print supaya bisa dipantau
  });

  //   it("shows loading state initially", () => {
  //     useSearchParams.mockReturnValue(new URLSearchParams("?ref=TAX2023-001"));

  //     render(<ConfirmationPage />);

  //     expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  //   });

  it("displays submission data when fetch is successful", async () => {
    const mockData = {
      reference_number: "TAX2023-001",
      tax_type: "Pajak Penghasilan",
      taxAmount: 1000000,
      submitted_at: "2023-11-15T10:30:00Z",
      status: "Diproses",
    };

    useSearchParams.mockReturnValue(new URLSearchParams("?ref=TAX2023-001"));
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(<ConfirmationPage />);

    await waitFor(() => {
      const elements = screen.getAllByText("Pengajuan Berhasil");
      expect(elements.length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(mockData.reference_number).length
      ).toBeGreaterThan(0);
      expect(screen.getByText(mockData.tax_type)).toBeInTheDocument();
      const formattedTaxAmount = formatRupiah(mockData.taxAmount);
      expect(screen.getByText(formattedTaxAmount)).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    useSearchParams.mockReturnValue(new URLSearchParams("?ref=INVALID-REF"));
    global.fetch.mockRejectedValueOnce(new Error("Submission not found"));

    render(<ConfirmationPage />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Data tidak ditemukan", {
        description:
          "Nomor referensi tidak valid atau data pengajuan tidak ditemukan.",
      });
      // cari heading level 1 yang ada teks "Data Tidak Ditemukan"
      const heading1 = screen.getByRole("heading", {
        level: 1,
        name: /Data Tidak Ditemukan/i,
      });
      expect(heading1).toBeInTheDocument();

      // atau heading level 3
      const heading3 = screen.getByRole("heading", {
        level: 3,
        name: /Data Tidak Ditemukan/i,
      });
      expect(heading3).toBeInTheDocument();
    });
  });

  it("handles back button click", async () => {
    const mockData = {
      reference_number: "TAX2023-001",
      tax_type: "Pajak Penghasilan",
      taxAmount: 1000000,
      submitted_at: "2023-11-15T10:30:00Z",
      status: "Diproses",
    };

    useSearchParams.mockReturnValue(new URLSearchParams("?ref=TAX2023-001"));
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(<ConfirmationPage />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Kembali"));
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("handles print button click", async () => {
    const mockData = {
      reference_number: "TAX2023-001",
      tax_type: "Pajak Penghasilan",
      taxAmount: 1000000,
      submitted_at: "2023-11-15T10:30:00Z",
      status: "Diproses",
    };

    useSearchParams.mockReturnValue(new URLSearchParams("?ref=TAX2023-001"));
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    render(<ConfirmationPage />);

    const printButton = await screen.findByText("Cetak Bukti");
    fireEvent.click(printButton);

    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith("Mencetak bukti pengajuan...", {
        description: "Halaman cetak akan terbuka dalam beberapa saat.",
      });
      expect(window.print).toHaveBeenCalled();
    });
  });
});
