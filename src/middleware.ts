import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Daftar rute yang dilindungi
  const protectedRoutes = ["/dashboard/:path*", "/admin/:path*"];

  // Periksa apakah path saat ini termasuk yang dilindungi
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.includes(":path*")) {
      const baseRoute = route.replace("/:path*", "");
      return path.startsWith(baseRoute);
    }
    return path === route;
  });

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Helper function untuk mendekode Base64 payload
  const decodeBase64 = (base64String: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) => {
    const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
    return JSON.parse(decodedString);
  };

  // Ambil dan decode cookies
  const tokenCookie = req.cookies.get("token")?.value
    ? decodeURIComponent(req.cookies.get("token")?.value || "")
    : null;
  const pathCookie = req.cookies.get("path")?.value
    ? decodeURIComponent(req.cookies.get("path")?.value || "")
    : null;

  // Validasi cookie token dan path
  if (!tokenCookie || !pathCookie) {
    // Redirect ke halaman login berdasarkan path
    const loginUrl = path.startsWith("/admin")
      ? new URL("/auth", req.url)
      : new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Extract payload dari cookies
  let tokenData;
  let pathData;
  try {
    const tokenPayload = tokenCookie.replace("s:", "").split(".")[0];
    const pathPayload = pathCookie.replace("s:", "").split(".")[0];
    tokenData = decodeBase64(tokenPayload);
    pathData = decodeBase64(pathPayload);
  } catch (error) {
    console.error("Error parsing cookies:", error);
    const loginUrl = path.startsWith("/admin")
      ? new URL("/auth", req.url)
      : new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Aturan akses berdasarkan path
  if (path.startsWith("/dashboard") && pathData.message !== "user") {
    const loginUrl = new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (path.startsWith("/admin") && !pathData.message.startsWith("admin")) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Jika semua valid, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
