import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { getProducts } from "../services/api.js";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    setError("");
    getProducts()
      .then((response) => setProducts(response.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <LoadingState label="Fetching products..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={load} />;
  }

  if (!products.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">No products yet</p>
        <p className="mt-2 text-sm text-slate-600">
          Seed the database with `npm run seed` in the server folder.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm font-medium text-brand-700">Shop on EMI</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Smartphones with mutual fund-backed EMI plans
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Compare variants, pick a tenure, and proceed with a 1Fi plan. All product
        and EMI data is loaded from the API.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
