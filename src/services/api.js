const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

/**
 * Generic fetch wrapper with JSON handling and error extraction.
 */
async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.detail || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export function loginUser(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function registerUser(email, password) {
  return request("/auth/register", {
    method: "POST",
    body: { email, password },
  });
}

export function getProfile(token) {
  return request("/auth/profile", { token });
}

export function forgotPassword(email) {
  return request("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export function resetPasswordWithOtp(email, otp, new_password) {
  return request("/auth/forgot-password/reset", {
    method: "POST",
    body: { email, otp, new_password },
  });
}

// ─── Profile & Members ───────────────────────────────────────────────────────

export function getMembers(token) {
  return request("/auth/members", { token });
}

export function inviteMember(email, token) {
  return request("/auth/invite", {
    method: "POST",
    body: { email },
    token,
  });
}

export function redeemPromo(code, token) {
  return request("/auth/redeem-promo", {
    method: "POST",
    body: { code },
    token,
  });
}

export function addDomain(domain, token) {
  return request("/auth/add-domain", {
    method: "POST",
    body: { domain },
    token,
  });
}
// ─── Scanner ──────────────────────────────────────────────────────────────────

export function registerScanTask(domain, token) {
  return request("/scanner/register-scan-task", {
    method: "POST",
    body: { domain },
    token,
  });
}

// ─── Score / Analyzer ─────────────────────────────────────────────────────────

export function getScore(domain, token) {
  return request(`/score/get_score?domain=${encodeURIComponent(domain)}`, {
    token,
  });
}

export function getIpReputation(ip, token) {
  return request(`/score/ip-reputation?ip=${encodeURIComponent(ip)}`, {
    token,
  });
}

// ─── WebSocket ────────────────────────────────────────────────────────────────

export function getWebSocketUrl(orgId) {
  const base = API_BASE.replace(/^http/, "ws");
  return `${base}/webhooks/ws/${orgId}`;
}

