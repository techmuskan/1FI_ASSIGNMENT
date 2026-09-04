const Product = require("../models/Product");

function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

exports.getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    service: "1fi-api",
    timestamp: new Date().toISOString(),
  });
};

exports.getProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 }).lean();
    const data = products.map((product) => {
      const prices = product.variants.map((variant) => variant.price);
      const startingPrice = Math.min(...prices);
      const preview = product.variants[0];

      return {
        name: product.name,
        slug: product.slug,
        description: product.description,
        brand: product.brand,
        category: product.category,
        startingPrice,
        image: preview?.images?.[0] || "",
        variantCount: product.variants.length,
      };
    });

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    sendError(res, 500, "Failed to fetch products");
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    sendError(res, 500, "Failed to fetch product");
  }
};

exports.getVariant = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    const variant = product.variants.find(
      (item) => item.variantId === req.params.variantId
    );

    if (!variant) {
      return sendError(res, 404, "Variant not found");
    }

    res.status(200).json({
      success: true,
      data: {
        product: {
          name: product.name,
          slug: product.slug,
          brand: product.brand,
        },
        variant,
      },
    });
  } catch (error) {
    sendError(res, 500, "Failed to fetch variant");
  }
};

exports.selectEmiPlan = async (req, res) => {
  try {
    const { slug, variantId, planId } = req.body || {};

    if (!slug || !variantId || !planId) {
      return sendError(res, 400, "slug, variantId, and planId are required");
    }

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    const variant = product.variants.find((item) => item.variantId === variantId);

    if (!variant) {
      return sendError(res, 404, "Variant not found");
    }

    const plan = variant.emiPlans.find((item) => item.planId === planId);

    if (!plan) {
      return sendError(res, 404, "EMI plan not found");
    }

    res.status(200).json({
      success: true,
      message: "EMI plan selected",
      data: {
        product: {
          name: product.name,
          slug: product.slug,
        },
        variant: {
          variantId: variant.variantId,
          color: variant.color,
          storage: variant.storage,
          price: variant.price,
        },
        plan,
      },
    });
  } catch (error) {
    sendError(res, 500, "Failed to select EMI plan");
  }
};
