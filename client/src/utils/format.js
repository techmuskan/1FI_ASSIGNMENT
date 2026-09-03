export function formatInr(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRate(rate) {
  return rate === 0 ? "0% interest" : `${rate}% interest`;
}
