export default function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-lg font-semibold text-slate-900">Something went wrong</p>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
