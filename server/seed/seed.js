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
        images: [
          "https://inspireonline.in/cdn/shop/files/IMG-18071497_m_jpeg_1_65079243-8ab3-474a-a5a8-86452ae7a2d3.jpg?v=1757449924&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071498_m_jpeg_1_63e6a18e-608b-4d05-82cc-7fb71cf28928.jpg?v=1757449923&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071499_m_jpeg_1_b29ef5ac-0f4e-4e08-bfd5-e7496b9ee673.jpg?v=1757449924&width=823"
        ],
        mrp: 149900,
        price: 139900,
        emiPlans: buildPlans(139900),
      },
      {
        variantId: "deep-blue-512",
        color: "Deep Blue",
        colorHex: "#1F2937",
        storage: "512 GB",
        images: [
          "https://inspireonline.in/cdn/shop/files/IMG-18071457_m_jpeg_1_e2d54f32-8e46-41f0-81a3-d6711cd2fc4b.jpg?v=1757450002&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071458_m_jpeg_1_8a239aca-d06c-489c-b199-d4997339a4c0.jpg?v=1757450001&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071459_m_jpeg_1_4837a8aa-5a25-4fbf-abdf-7d819976af61.jpg?v=1757450002&width=823"
        ],
        mrp: 179900,
        price: 169900,
        emiPlans: buildPlans(169900),
      },
      {
        variantId: "deep-blue-256",
        color: "Deep Blue",
        colorHex: "#1F2937",
        storage: "256 GB",
        images: [
          "https://inspireonline.in/cdn/shop/files/IMG-18071457_m_jpeg_1_e2d54f32-8e46-41f0-81a3-d6711cd2fc4b.jpg?v=1757450002&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071458_m_jpeg_1_8a239aca-d06c-489c-b199-d4997339a4c0.jpg?v=1757450001&width=823",
          "https://inspireonline.in/cdn/shop/files/IMG-18071459_m_jpeg_1_4837a8aa-5a25-4fbf-abdf-7d819976af61.jpg?v=1757450002&width=823"
        ],
        mrp: 159900,
        price: 149900,
        emiPlans: buildPlans(149900),
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
        images: [
          "https://sota.store/image/cache/catalog/Samsung-3/samsung-s24-ultra-s928-blk-05-1600x1600.webp",
          "https://www.imobily.eu/image/cache/catalog/samsung/GalaxyS24Ultra/TitaniumBlack/8-800x800.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/3/3b/Back_view_of_Samsung_Galaxy_S24_Ultra_Black.jpg"
        ],
        mrp: 134999,
        price: 124999,
        emiPlans: buildPlans(124999),
      },
      {
        variantId: "titanium-gray-512",
        color: "Titanium Gray",
        colorHex: "#6B7280",
        storage: "512 GB",
        images: [
          "https://www.pbtech.co.nz/imgprod/M/P/MPHSAM0092801__2.jpg",
          "https://www.telstra.com.au/content/dam/tcom/devices/mobile/mhdwhst-s24u/titaniumgrey/samsung-galaxyS24Ultra-titaniumGrey-07-900x1200.jpg",
          "https://st.bigc-cs.com/cdn-cgi/image/format%3Dwebp%2Cquality%3D90/public/media/catalog/product/61/20/2000008016261/2000008016261_4-20251117134731-.jpg"
        ],
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
        images: [
          "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/w/f/n/-original-imahggeukc7vp7d6.jpeg?q=90",
          "https://assets.products-live.ao.com/Images/1a2a3a3c-7910-4c30-851d-fb4be00b3cfa/1280x1280/Google_Pixel9Pro_Obsidian_02.jpg",
          "https://swipe.ua/content/images/35/1030x1030l80bl0/google-pixel-9-pro-16-128gb-obsidian-59593675209192.png"
        ],
        mrp: 109999,
        price: 99999,
        emiPlans: buildPlans(99999),
      },
      {
        variantId: "obsidian-512",
        color: "Obsidian",
        colorHex: "#0B0F19",
        storage: "512 GB",
        images: [
          "https://rukminim2.flixcart.com/image/1536/1536/xif0q/mobile/w/f/n/-original-imahggeukc7vp7d6.jpeg?q=90",
          "https://assets.products-live.ao.com/Images/1a2a3a3c-7910-4c30-851d-fb4be00b3cfa/1280x1280/Google_Pixel9Pro_Obsidian_02.jpg",
          "https://swipe.ua/content/images/35/1030x1030l80bl0/google-pixel-9-pro-16-128gb-obsidian-59593675209192.png"
        ],
        mrp: 119999,
        price: 109999,
        emiPlans: buildPlans(109999),
      },
      {
        variantId: "hazel-512",
        color: "Hazel",
        colorHex: "#A8A29E",
        storage: "512 GB",
        images: [
          "https://www.shopaholic.pk/cdn/shop/files/9-pro-hazel-front.jpg?v=1744364434",
          "https://ibrat.ru/upload/iblock/ae9/7nw9ne67ptyv5m1c6skd1ipplc6ath0n.png",
          "https://ibrat.ru/upload/iblock/e08/t105djrij75ftvb9jjazrxbzz6izcfnn.png"
        ],
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
