import AdminPanelLayout from "@/components/templates/admin-panel/admin-panel-layout";


export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
