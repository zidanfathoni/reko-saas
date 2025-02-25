// Utility function to decode signed cookies
export function parseSignedCookie<T = any>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    // Remove the "s:" prefix from the cookie
    const raw = value.startsWith("s:") ? value.slice(2) : value;

    // Split Base64 payload and signature (Base64 before the dot)
    const base64Payload = raw.split(".")[0];

    // Decode Base64 into a JSON string
    const decoded = Buffer.from(base64Payload, "base64").toString("utf-8");

    // Parse the JSON string
    const parsed = JSON.parse(decoded);

    return parsed.message as T; // Cast to the expected type
  } catch (error) {
    console.error("Error decoding signed cookie:", error);
    return null;
  }
}

// Usage example:
// const message = parseSignedCookie<{ userId: number }>(cookieValue);