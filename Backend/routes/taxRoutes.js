const express = require("express");
const router = express.Router();
const TaxForm = require("../models/taxModels");

// POST /api/submission
router.post("/", async (req, res) => {
    const { tax_type, taxAmount } = req.body;
  
    if (!tax_type || !taxAmount || taxAmount <= 0) {
      return res.status(400).json({ error: "Jumlah pajak harus angka positif" });
    }
  
    const year = new Date().getFullYear(); // misal: 2025
  
    try {
      // Hitung jumlah pengajuan di tahun ini
      const count = await TaxForm.countDocuments({
        submitted_at: {
          $gte: new Date(`${year}-01-01T00:00:00Z`),
          $lt: new Date(`${year + 1}-01-01T00:00:00Z`)
        }
      });
  
      const newIndex = count + 1; // 1, 2, 3, ...
      const reference_number = `TAX${year}-${newIndex}`; // Misal: TAX2025-1
  
      const taxForm = await TaxForm.create({
        reference_number,
        tax_type,
        taxAmount,
        submitted_at: new Date()
      });
  
      res.status(201).json(taxForm);
    } catch (error) {
      res.status(500).json({ error: "Gagal menyimpan pengajuan" });
    }
  });
  

// GET /api/submission/:ref
router.get("/:ref", async (req, res) => {
  const { ref } = req.params;

  try {
    const taxForm = await TaxForm.findOne({ reference_number: ref });
    if (!taxForm) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }
    res.json(taxForm);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
