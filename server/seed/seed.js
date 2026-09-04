require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

function monthlyEmi(principal, annualRate, months) {
  if (annualRate === 0) {
    return Math.round(principal / months);
  }

  const r = annualRate / 12 / 100;
  const factor = Math.pow(1 + r, months);
  return Math.round((principal * r * factor) / (factor - 1));
}

function buildPlans(price) {
  return [
    {
      planId: "emi-3-0",
      tenure: 3,
      interestRate: 0,
      monthlyPayment: monthlyEmi(price, 0, 3),
      cashback: 0,
      processingFee: 0,
    },
    {
      planId: "emi-6-0",
      tenure: 6,
      interestRate: 0,
      monthlyPayment: monthlyEmi(price, 0, 6),
      cashback: 1500,
      processingFee: 0,
    },
    {
      planId: "emi-12-105",
      tenure: 12,
      interestRate: 10.5,
      monthlyPayment: monthlyEmi(price, 10.5, 12),
      cashback: 0,
      processingFee: 499,
    },
    {
      planId: "emi-18-105",
      tenure: 18,
      interestRate: 10.5,
      monthlyPayment: monthlyEmi(price, 10.5, 18),
      cashback: 3000,
      processingFee: 499,
    },
  ];
}

const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "Smartphone",
    description:
      "A premium flagship with a bright Pro display, advanced camera system, and all-day performance. Choose a 1Fi EMI plan backed by mutual funds.",
    variants: [
      {
        variantId: "silver-256",
        color: "Silver",
        colorHex: "#C0C7D1",
        storage: "256 GB",
        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
        mrp: 149900,
        price: 139900,
        emiPlans: buildPlans(139900),
      },
      {
        variantId: "black-512",
        color: "Black",
        colorHex: "#1F2937",
        storage: "512 GB",
        image:
          "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80",
        mrp: 179900,
        price: 169900,
        emiPlans: buildPlans(169900),
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    category: "Smartphone",
    description:
      "Galaxy AI, a versatile 200MP camera, and an S Pen on a refined titanium body. Spread the cost with flexible 1Fi EMI tenures.",
    variants: [
      {
        variantId: "titanium-black-256",
        color: "Titanium Black",
        colorHex: "#111827",
        storage: "256 GB",
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80",
        mrp: 134999,
        price: 124999,
        emiPlans: buildPlans(124999),
      },
      {
        variantId: "titanium-gray-512",
        color: "Titanium Gray",
        colorHex: "#6B7280",
        storage: "512 GB",
        image:
          "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=1200&q=80",
        mrp: 154999,
        price: 144999,
        emiPlans: buildPlans(144999),
      },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9",
    brand: "Google",
    category: "Smartphone",
    description:
      "Clean Android, computational photography, and on-device Gemini features. Pay monthly with 0% and standard interest EMI options.",
    variants: [
      {
        variantId: "obsidian-256",
        color: "Obsidian",
        colorHex: "#0B0F19",
        storage: "256 GB",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjdoM9PX_KF99LgsbodFWVXXUPKDs4nmhZhSyBgCw1ufQIJllboJY4WRU&s=10",
        mrp: 109999,
        price: 99999,
        emiPlans: buildPlans(99999),
      },
      {
        variantId: "hazel-512",
        color: "Hazel",
        colorHex: "#A8A29E",
        storage: "512 GB",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
        mrp: 129999,
        price: 119999,
        emiPlans: buildPlans(119999),
      },
    ],
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("Missing MONGODB_URI. Copy server/.env.example to server/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
