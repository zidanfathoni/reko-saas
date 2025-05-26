
import { PermissionsTable } from '@/components/modules/admin/permissions/table';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminRolesPages() {
  return (
    <ContentLayout title="Permissions">
      <div
                      className="container px-4 pb-8 pt-8 sm:px-8"
                  >
                      <PermissionsTable />
                  </div>
    </ContentLayout>
  );
}
