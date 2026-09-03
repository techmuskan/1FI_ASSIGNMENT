const items = [
  { title: "0% EMI options", body: "Short tenures with no interest." },
  { title: "Backed by mutual funds", body: "Plans designed around MF-backed EMI." },
  { title: "Secure checkout", body: "Demo flow with no payment capture." },
  { title: "Flexible tenures", body: "Choose 3 to 18 month plans." },
];

export default function TrustSection() {
  return (
    <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="mt-1 text-sm text-slate-600">{item.body}</p>
        </div>
      ))}
    </section>
  );
}
