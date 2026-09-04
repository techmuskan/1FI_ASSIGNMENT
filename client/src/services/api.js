const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export function getProducts() {
  return request("/api/products");
}

export function getProductBySlug(slug) {
  return request(`/api/products/${slug}`);
}

export function selectEmiPlan(body) {
  return request("/api/emi/select", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
