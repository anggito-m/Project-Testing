const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const taxRouter = require("../routes/taxRoutes"); 
const TaxForm = require("../models/taxModels");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
app.use(express.json());
app.use("/api/submission", taxRouter);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await TaxForm.deleteMany(); // clear test data
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /api/submission", () => {
  it("should submit tax form and return 201 with reference number", async () => {
    const res = await request(app)
      .post("/api/submission")
      .send({ taxType: "Pajak Penghasilan", taxAmount: 500000 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("reference_number");
    expect(res.body.tax_type).toBe("Pajak Penghasilan");
    expect(res.body.taxAmount).toBe(500000);
  });

  it("should return 400 if taxAmount is not a positive number", async () => {
    const res = await request(app)
      .post("/api/submission")
      .send({ taxType: "Pajak Kendaraan", taxAmount: -100 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Jumlah pajak harus angka positif");
  });

  it("should return 400 if taxAmount is missing", async () => {
    const res = await request(app)
      .post("/api/submission")
      .send({ taxType: "Pajak Kendaraan" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Jumlah pajak harus angka positif");
  });
});

describe("GET /api/submission/:ref", () => {
  it("should return tax form by reference number", async () => {
    const tax = await TaxForm.create({
      reference_number: "TAX2025-1",
      tax_type: "Pajak Penghasilan",
      taxAmount: 750000,
      submitted_at: new Date()
    });

    const res = await request(app).get(`/api/submission/${tax.reference_number}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.reference_number).toBe("TAX2025-1");
    expect(res.body.taxAmount).toBe(750000);
  });

  it("should return 404 if tax form not found", async () => {
    const res = await request(app).get("/api/submission/TAX9999-999");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Data tidak ditemukan");
  });
});
