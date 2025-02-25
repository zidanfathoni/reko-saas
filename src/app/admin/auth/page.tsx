"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginAdminPage from "@/components/modules/admin/auth";
import { ContentLayout } from "@/components/templates/admin-panel/content-layout";
import { Storage } from "@/lib";
import { Player } from "@lottiefiles/react-lottie-player";

export default function AuthPage() {
  const animationURL = "/lottie/Animation - 1738942814622.json";
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 🔹 Ambil token & role dari localStorage
    const token = Storage.get("local", "token");
    const role = Storage.get("local", "role");

    // 🔹 Jika token & role adalah "admin" atau "super-admin", redirect ke /admin
    if (token && (role === "admin" || role === "super-admin")) {
      router.replace("/admin");
    }
    setLoading(false);
  }, [router, loading]); // Effect dijalankan saat pertama kali render

  if (loading === true) return (
    <Player
      src={animationURL}
      autoplay
      loop
      speed={1}
      style={{ width: "50%", height: "50%" }}
    />
  );

  return (
    <ContentLayout title="Auth Admin">
      <LoginAdminPage />
    </ContentLayout>
  );
}
