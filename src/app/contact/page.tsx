import ContactModules from '@/components/modules/contact';
import TeamsModules from '@/components/modules/about/teamsModules';
import { MainLayout } from '@/components/templates';

export default function ContactPages() {
  return (
    <MainLayout>
      <ContactModules />
    </MainLayout>
  );
}
