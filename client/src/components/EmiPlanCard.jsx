import { formatInr, formatRate } from "../utils/format.js";

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      aria-pressed={selected}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-brand-600 bg-brand-50 shadow-sm ring-2 ring-brand-600"
          : "border-slate-200 bg-white hover:border-brand-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-semibold text-slate-900">
            {formatInr(plan.monthlyPayment)}
            <span className="text-sm font-medium text-slate-500">/month</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">{plan.tenure} months</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            plan.interestRate === 0
              ? "bg-brand-100 text-brand-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {formatRate(plan.interestRate)}
        </span>
      </div>
      {plan.cashback > 0 ? (
        <p className="mt-3 text-sm font-medium text-brand-700">
          Cashback {formatInr(plan.cashback)}
        </p>
      ) : (
        <p className="mt-3 text-sm text-slate-500">No cashback on this plan</p>
      )}
      {plan.processingFee > 0 ? (
        <p className="mt-1 text-xs text-slate-500">
          Processing fee {formatInr(plan.processingFee)}
        </p>
      ) : null}
    </button>
  );
}
