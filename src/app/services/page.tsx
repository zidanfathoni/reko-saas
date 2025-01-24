import Breadcrumb from '@/components/atoms/breadcrumb2';
import ServicesModules from '@/components/modules/services';
import { MainLayout } from '@/components/templates';


export default function ServicesPages() {
  return (
    <MainLayout>

      <Breadcrumb pageName="Our Services"
        pageDescription="We offer a wide range of services to help you grow your business."
      />
      <ServicesModules />
    </MainLayout>
  );
}
