import { Link } from "react-router-dom";
import { formatInr } from "../utils/format.js";

export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/3] bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {product.brand}
          </p>
          <h2 className="mt-1 text-lg font-semibold">{product.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Starting at {formatInr(product.startingPrice)}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            View product
          </span>
        </div>
      </Link>
    </article>
  );
}
