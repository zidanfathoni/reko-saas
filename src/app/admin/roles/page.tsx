
import { RolesTable } from '@/components/modules/admin/roles/table';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminRolesPages() {
    return (
        <ContentLayout title="Roles">
            <div
                className="container px-4 pb-8 pt-8 sm:px-8"
            >
                <RolesTable />
            </div>
        </ContentLayout>
    );
}
