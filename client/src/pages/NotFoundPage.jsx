import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        Check the URL or go back to the product listing.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white"
      >
        Back to shop
      </Link>
    </div>
  );
}
