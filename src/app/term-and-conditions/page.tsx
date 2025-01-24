import Breadcrumb from '@/components/atoms/breadcrumb2';
import TermAndConditionsModules, { getTermAndConditionsStaticProps } from '@/components/modules/term-and-conditions';
import { MainLayout } from '@/components/templates';

const TermAndConditionsPage = async () => {
  const content = await getTermAndConditionsStaticProps();

  return (
    <MainLayout>
      <Breadcrumb pageName="Term and Conditions"
        pageDescription="Dummy feedback from virtual customers using our component library."
      />
      <TermAndConditionsModules content={content} />
    </MainLayout>
  );
};

export default TermAndConditionsPage;