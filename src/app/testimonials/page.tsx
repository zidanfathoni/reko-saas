import Breadcrumb from '@/components/atoms/breadcrumb2';
import Testimonials from '@/components/modules/testimonials';
import { MainLayout } from '@/components/templates';


export default function TestimonialsPages() {
  return (
    <MainLayout>
      <div className=" pb-10">
        <Breadcrumb pageName="Testimonials"
          pageDescription="Hear from our satisfied clients about their experiences working with us. Discover how our solutions have helped businesses achieve their goals through expert development, innovative tools, and exceptional service. Your success is our priority!"
        />
        <Testimonials />
      </div>
    </MainLayout>
  );
}
