'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/atoms/breadcrumb';
import { Label } from '@/components/atoms/label';
import { Switch } from '@/components/atoms/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/atoms/tooltip';
import LoginAdminPage from '@/components/modules/admin/auth';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';
import { IconForm } from '@/helper/iconsForm';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import Link from 'next/link';

export default function AuthPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;
  return (
    <ContentLayout title="Auth Admin">
      <LoginAdminPage />
    </ContentLayout>
  );
}
