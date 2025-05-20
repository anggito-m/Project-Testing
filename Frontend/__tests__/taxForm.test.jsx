import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaxForm from "../app/form/page";
import { useRouter } from "next/navigation";

// Mock router and toast
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("TaxForm", () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders form inputs correctly", () => {
    render(<TaxForm />);
    expect(screen.getByText(/Formulir Pengajuan Pajak/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Jumlah Pajak/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<TaxForm />);

    fireEvent.click(screen.getByText("Ajukan Pembayaran"));

    // Update your test to look for the actual error messages shown in your form
    await waitFor(() => {
      expect(
        screen.getByText("Jumlah pajak harus angka positif")
      ).toBeInTheDocument();
      expect(screen.getByText("Jenis pajak harus dipilih")).toBeInTheDocument();
    });
  });

  //   it("submits the form with valid data and redirects", async () => {
  //     render(<TaxForm />);

  //     // Select tax type
  //     const combobox = screen.getByRole("combobox", { name: /jenis pajak/i });
  //     fireEvent.mouseDown(combobox);
  //     fireEvent.click(screen.getByText("Pajak Penghasilan"));

  //     // Enter amount
  //     const amountInput = screen.getByRole("spinbutton");
  //     fireEvent.change(amountInput, { target: { value: "1000000" } });

  //     // Submit form
  //     fireEvent.click(screen.getByTestId("submit-button"));

  //     // Verify fetch was called
  //     await waitFor(() => {
  //       expect(global.fetch).toHaveBeenCalledWith(
  //         "http://localhost:5000/api/submission",
  //         expect.objectContaining({
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             taxType: "Pajak Penghasilan",
  //             taxAmount: 1000000,
  //           }),
  //         })
  //       );
  //     });

  //     // await waitFor(() => {
  //     //   expect(fetch).toHaveBeenCalledWith(
  //     //     "http://localhost:5000/api/submission",
  //     //     expect.any(Object)
  //     //   );
  //     //   expect(pushMock).toHaveBeenCalledWith("/confirmation?ref=TAX2025-001");
  //     // });
  //   });
});
