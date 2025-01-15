import Breadcrumb from '@/components/atoms/breadcrumb2';
import CoursesModules from '@/components/modules/event';
import { MainLayout } from '@/components/templates';



export default function EventPages() {
  return (
    <MainLayout>
      <Breadcrumb pageName="Event"
        pageDescription="We provide a wide range events, workshops, and seminars to help you learn and grow. Stay updated with the latest trends, tips, and tricks to enhance your skills and knowledge in software development."
      />
      <CoursesModules />
    </MainLayout>
  );
}
