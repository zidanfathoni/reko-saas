import AdminDashboardModules from "@/components/modules/admin";
import { parseSignedCookie } from "@/helper/parseSignedCookie";
import { cookies } from 'next/headers'
import { Storage } from "@/lib";


export default function DashboardPage() {
  const cookieStore = cookies()
  const token = parseSignedCookie(cookieStore.get('token')?.value);
  const role = parseSignedCookie(cookieStore.get('role')?.value);
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    Storage.remove('local', 'login');
    Storage.remove('local', 'token');
    Storage.remove('local', 'role');
    return <meta httpEquiv="refresh" content="0; url=/admin/auth" />
  } else if (!token && (role !== "admin" || role !== "super-admin")) {
    return <meta httpEquiv="refresh" content="0; url=/unauthorized" />
  }

  return (
    <AdminDashboardModules />
  );
}
