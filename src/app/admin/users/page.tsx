
import { UsersTable } from '@/components/modules/admin/users/table';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminUsersPages() {
  return (
    <ContentLayout title="Users">
      <div
                      className="container px-4 pb-8 pt-8 sm:px-8"
                  >
                      <UsersTable />
                  </div>
    </ContentLayout>
  );
}
