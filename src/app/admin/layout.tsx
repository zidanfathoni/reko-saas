"use client"

import { Toaster } from '@/components/atoms/toaster';
import { ReduxProvider, AppProgressBarProvider } from '@/components/molecules';
import AdminPanelLayout from '@/components/templates/admin-panel/admin-panel-layout';
import { useSidebar } from '@/hooks/use-sidebar';
import { useAppDispatch, useAppSelector, useStore } from '@/hooks/use-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Storage } from '@/lib';
import { fetchMe } from '@/lib/slices/auth/meSlice';
// import useCookieWatcher from '@/helper/cookiesHelper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // useCookieWatcher();
  const dispatch = useAppDispatch();
  const { me, loadingMe, error } = useAppSelector((state) => state.me);

  useEffect(() => {

    dispatch(fetchMe());
  }, []); // Effect dijalankan saat pertama kali render

  return (
    <ReduxProvider>
      <AppProgressBarProvider>
        <AdminPanelLayout>{children}</AdminPanelLayout>
        <Toaster />
      </AppProgressBarProvider>
    </ReduxProvider>
  );
}
