import Breadcrumb from '@/components/atoms/breadcrumb2';
import PrivacyPolicyModules, { getPrivacyPolicyStaticProps } from '@/components/modules/privacy-policy';
import { MainLayout } from '@/components/templates';

const PrivacyPolicyPage = async () => {
  const content = await getPrivacyPolicyStaticProps();

  return (
    <MainLayout>
      <Breadcrumb pageName="Privacy Policy"
        pageDescription="Dummy feedback from virtual customers using our component library."
      />
      <PrivacyPolicyModules content={content} />
    </MainLayout>
  );
};

export default PrivacyPolicyPage;