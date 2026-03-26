const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001/api";

// ─── Generate (the only server call) ─────────────────────────

export const generateApi = {
  async generate({
    profileContext,
    jobDescription,
    question,
    companyName,
    maxChars,
    captchaToken,
  }) {
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileContext,
        jobDescription,
        question,
        companyName,
        maxChars,
        captchaToken,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Request failed" }));
      throw new Error(err.error || "Failed to generate answer");
    }

    return res.json();
  },
};
