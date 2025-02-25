import { useEffect } from "react";
import { parseSignedCookie } from "./parseSignedCookie";
import Cookies from "js-cookie";


const useCookieWatcher = () => {
  const token = parseSignedCookie(Cookies.get('token'));
  const role = parseSignedCookie(Cookies.get('role'));
  useEffect(() => {
    const checkCookie = () => {

      if (!token && !role) {
        console.log("Cookie hilang, menghapus localStorage...");
        localStorage.clear();
      }
    };

    // Cek saat komponen pertama kali dimuat
    checkCookie();

    // Set interval untuk mengecek cookie setiap beberapa detik (opsional)
    const interval = setInterval(checkCookie, 5000); // Cek setiap 5 detik

    return () => clearInterval(interval);
  }, [token, role]);
};

export default useCookieWatcher;
