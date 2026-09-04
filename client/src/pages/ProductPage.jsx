import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VariantSelector from "../components/VariantSelector.jsx";
import EmiPlanCard from "../components/EmiPlanCard.jsx";
import TrustSection from "../components/TrustSection.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { getProductBySlug, selectEmiPlan } from "../services/api.js";
import { formatInr, formatRate } from "../utils/format.js";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ctaMessage, setCtaMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  function load() {
    setLoading(true);
    setError("");
    setPlanId("");
    setCtaMessage("");
    setShowConfirm(false);
    setSelectedImage(0);

    getProductBySlug(slug)
      .then((response) => {
        const data = response.data;
        setProduct(data);
        setSelectedColor(data.variants?.[0]?.color || "");
        setSelectedStorage(data.variants?.[0]?.storage || "");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [slug]);

  const variant = useMemo(
    () =>
      product?.variants.find(
        (item) =>
          item.color === selectedColor && item.storage === selectedStorage,
      ),
    [product, selectedColor, selectedStorage],
  );

  const selectedPlan = variant?.emiPlans.find((plan) => plan.planId === planId);

  const colors = useMemo(
    () => [...new Set(product?.variants.map((item) => item.color) || [])],
    [product],
  );

  const storages = useMemo(
    () => [...new Set(product?.variants.map((item) => item.storage) || [])],
    [product],
  );

  function handleColorChange(color) {
    const matchingVariants = product.variants.filter(
      (item) => item.color === color,
    );

    const storageAvailable = matchingVariants.some(
      (item) => item.storage === selectedStorage,
    );

    setSelectedColor(color);

    if (!storageAvailable) {
      setSelectedStorage(matchingVariants[0]?.storage || "");
    }

    setPlanId("");
    setCtaMessage("");
    setShowConfirm(false);
    setSelectedImage(0);
  }

  function handleStorageChange(storage) {
    setSelectedStorage(storage);
    setPlanId("");
    setCtaMessage("");
    setShowConfirm(false);
    setSelectedImage(0);
  }

  async function handleProceed() {
    if (!variant || !selectedPlan) {
      setCtaMessage("Please select an EMI plan to continue.");
      return;
    }

    setSubmitting(true);
    setCtaMessage("");

    try {
      await selectEmiPlan({
        slug: product.slug,
        variantId: variant.variantId,
        planId: selectedPlan.planId,
      });
      setShowConfirm(true);
    } catch (err) {
      setCtaMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState label="Loading product..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={load} />;
  }

  if (!product || !variant) {
    return <ErrorState message="This product could not be displayed." />;
  }

  const savings = variant.mrp - variant.price;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-700">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {product.name}
      </p>

      <section className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <img
              src={variant.images?.[selectedImage] || variant.image}
              alt={`${product.name} ${variant.color} ${variant.storage} view ${selectedImage + 1}`}
              className="h-[420px] w-full object-contain"
            />

            {variant.images?.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === 0
                        ? variant.images.length - 1
                        : selectedImage - 1,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-lg shadow-sm hover:bg-white"
                  aria-label="Previous image"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage === variant.images.length - 1
                        ? 0
                        : selectedImage + 1,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-lg shadow-sm hover:bg-white"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            ) : null}
          </div>

          {variant.images?.length > 1 ? (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {variant.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                    selectedImage === index
                      ? "border-brand-600"
                      : "border-slate-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-medium text-brand-700">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-slate-700">
            Selected: <span className="font-semibold">{variant.color}</span> /{" "}
            <span className="font-semibold">{variant.storage}</span>
          </p>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-semibold">{formatInr(variant.price)}</p>
            <p className="text-sm text-slate-500 line-through">
              {formatInr(variant.mrp)}
            </p>
            {savings > 0 ? (
              <p className="text-sm font-semibold text-brand-700">
                Save {formatInr(savings)}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <VariantSelector
              colors={colors}
              storages={storages}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              variants={product.variants}
              onColorChange={handleColorChange}
              onStorageChange={handleStorageChange}
            />
          </div>
        </div>
      </section>

      <section id="emi-plans" className="mt-12">
        <h2 className="text-2xl font-semibold">Choose an EMI plan</h2>
        <p className="mt-2 text-sm text-slate-600">
          Plans shown are for {variant.color} / {variant.storage}.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {variant.emiPlans.map((plan) => (
            <EmiPlanCard
              key={plan.planId}
              plan={plan}
              selected={plan.planId === planId}
              onSelect={(next) => {
                setPlanId(next.planId);
                setCtaMessage("");
              }}
            />
          ))}
        </div>

        {ctaMessage ? (
          <p className="mt-4 text-sm font-medium text-red-600" role="alert">
            {ctaMessage}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleProceed}
          disabled={submitting}
          className="mt-6 hidden rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:inline-flex"
        >
          {submitting ? "Confirming..." : "Proceed with selected plan"}
        </button>

        {selectedPlan ? (
          <p className="mt-3 text-sm text-slate-600">
            Selected: {formatInr(selectedPlan.monthlyPayment)}/month ·{" "}
            {formatRate(selectedPlan.interestRate)}
          </p>
        ) : null}
      </section>

      <TrustSection />

      <div className="sticky bottom-0 -mx-4 mt-8 border-t border-slate-200 bg-white/95 p-4 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={handleProceed}
          disabled={submitting}
          className="w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Confirming..." : "Proceed with selected plan"}
        </button>
      </div>

      {showConfirm ? (
        <ConfirmationModal
          productName={product.name}
          variant={variant}
          plan={selectedPlan}
          onClose={() => setShowConfirm(false)}
        />
      ) : null}
    </div>
  );
}
