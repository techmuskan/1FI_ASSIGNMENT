export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">1Fi</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Buy smartphones on EMI plans backed by mutual funds. Sample catalog for
            the SDE-1 full-stack assignment.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Why 1Fi</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>0% EMI options</li>
            <li>Flexible tenures</li>
            <li>No hidden product data on the client</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Support</p>
          <p className="mt-2 text-sm text-slate-600">
            Demo app only. Payments are not processed.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} 1Fi. All prices and EMI values are sample data.
      </div>
    </footer>
  );
}
