const mongoose = require("mongoose");

const emiPlanSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true },
    tenure: { type: Number, required: true },
    monthlyPayment: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
    processingFee: { type: Number, default: 0 },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    variantId: { type: String, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, default: "#111827" },
    storage: { type: String, required: true },
    image: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    emiPlans: { type: [emiPlanSchema], required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, default: "Smartphone" },
    variants: {
      type: [variantSchema],
      required: true,
      validate: [(v) => v.length >= 2, "A product must have at least 2 variants"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
