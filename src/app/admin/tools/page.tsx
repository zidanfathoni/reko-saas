
import AdminToolsModule from '@/components/modules/admin/tools';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function UsersPages() {
  return (
    <ContentLayout title="Tools">

      <div className="items-center justify-items-center py-8">
        <AdminToolsModule />
      </div>
    </ContentLayout>
  );
}
