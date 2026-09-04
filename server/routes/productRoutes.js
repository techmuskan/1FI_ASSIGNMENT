const express = require("express");
const {
  getHealth,
  getProducts,
  getProductBySlug,
  getVariant,
  selectEmiPlan,
} = require("../controllers/productController");

const router = express.Router();

router.get("/health", getHealth);
router.get("/products", getProducts);
router.get("/products/:slug", getProductBySlug);
router.get("/products/:slug/variants/:variantId", getVariant);
router.post("/emi/select", selectEmiPlan);

module.exports = router;
