import { Toaster } from '@/components/atoms/toaster';
import { ReduxProvider, AppProgressBarProvider } from '@/components/molecules';
import AdminPanelLayout from '@/components/templates/admin-panel/admin-panel-layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AppProgressBarProvider>
        <AdminPanelLayout>{children}</AdminPanelLayout>
        <Toaster />
      </AppProgressBarProvider>
    </ReduxProvider>
  );
}
