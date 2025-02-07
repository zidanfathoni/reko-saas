import Breadcrumb from '@/components/atoms/breadcrumb2';
import { MainLayout } from '@/components/templates';

export default function DashboardPages() {
  return (
    <MainLayout>

      <Breadcrumb pageName="Dashboard"
        pageDescription="We help you solve your coding problems. Get the best solutions to your coding issues and errors. Find the right answers to your questions and get unstuck with Receh Koding."
      />
    </MainLayout>
  );
}
