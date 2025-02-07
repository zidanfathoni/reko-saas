"use client"

import { Toaster } from '@/components/atoms/toaster';
import { ReduxProvider, AppProgressBarProvider } from '@/components/molecules';
import AdminPanelLayout from '@/components/templates/admin-panel/admin-panel-layout';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Storage } from '@/lib';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const checkAuth = useSidebar((state) => state.checkAuth);
  const navigate = useRouter();

  useEffect(() => {
    checkAuth();
    const token = Storage.get('local', 'token');
    const role = Storage.get('local', 'role');
    if (!token && !role) {
      navigate.push('/admin/auth');
    } else if (role === 'user') {
      console.log('role', role);
      navigate.push('/auth');
    }
  }, [checkAuth, navigate]);
  return (
    <ReduxProvider>
      <AppProgressBarProvider>
        <AdminPanelLayout>{children}</AdminPanelLayout>
        <Toaster />
      </AppProgressBarProvider>
    </ReduxProvider>
  );
}
