import { formatInr, formatRate } from "../utils/format.js";

export default function ConfirmationModal({ productName, variant, plan, onClose }) {
  if (!plan || !variant) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emi-confirm-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <p id="emi-confirm-title" className="text-lg font-semibold">
          EMI plan selected
        </p>
        <p className="mt-1 text-sm text-slate-600">{productName}</p>
        <p className="text-sm text-slate-600">
          {variant.color} / {variant.storage}
        </p>
        <div className="mt-4 rounded-xl bg-brand-50 p-4">
          <p className="text-xl font-semibold text-slate-900">
            {formatInr(plan.monthlyPayment)}/month for {plan.tenure} months
          </p>
          <p className="mt-1 text-sm font-medium text-brand-700">
            {formatRate(plan.interestRate)}
          </p>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          This is a demo confirmation. No payment is processed.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}
