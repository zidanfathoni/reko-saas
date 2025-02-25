import { NextRequest, NextResponse } from "next/server";

// Fungsi untuk decode signed cookies
function parseSignedCookie(value: string | undefined) {
  if (!value) return null;
  try {
    // Menghapus prefix "s:" dari cookie
    const raw = value.startsWith("s:") ? value.slice(2) : value;

    // Memisahkan payload Base64 dan signature (Base64 sebelum titik)
    const base64Payload = raw.split(".")[0];

    // Decode Base64 ke string JSON
    const decoded = Buffer.from(base64Payload, "base64").toString("utf-8");

    // Parse JSON dan ambil bagian `message`
    const parsed = JSON.parse(decoded);

    return parsed.message; // Ambil data yang kita butuhkan
  } catch (error) {
    console.error("Error decoding signed cookie:", error);
    return null;
  }
}

export function middleware(req: NextRequest) {
  console.log("Cookies saat masuk middleware:", req.cookies.getAll());

  // Decode token dan role dari cookies
  const token = parseSignedCookie(req.cookies.get("token")?.value);
  const role = parseSignedCookie(req.cookies.get("role")?.value);

  console.log("Decoded Token:", token);
  console.log("Decoded Role:", role);

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  // 🔹 Jika token ada dan role admin/super-admin → Redirect dari /admin/auth ke /admin
  if (token && (role === "admin" || role === "super-admin") && pathname === "/admin/auth") {
    console.log("🔄 Redirecting to /admin...");
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // 🔹 Jika token ada dan role user → Redirect dari /auth ke /dashboard
  if (token && role === "user" && pathname === "/auth") {
    console.log("🔄 Redirecting to /dashboard...");
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 🔹 Biarkan "/admin/auth" bisa diakses tanpa login
  if (pathname.startsWith("/admin/auth")) {
    return NextResponse.next();
  }

  // 🔹 Jika tidak ada token, redirect ke home
  if (!token) {
    console.log("🔄 Redirecting to home...");
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 🔹 Proteksi halaman berdasarkan role
  if (pathname.startsWith("/admin") && role !== "admin" && role !== "super-admin") {
    console.log("⛔ Unauthorized access to /admin");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard") && role !== "user") {
    console.log("⛔ Unauthorized access to /dashboard");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/admin/auth", "/dashboard/:path*", "/admin/:path*"], // Proteksi route yang diperlukan
};
