export default function LoadingState({ label = "Loading..." }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
      <p className="mt-4 text-sm text-slate-600">{label}</p>
    </div>
  );
}
