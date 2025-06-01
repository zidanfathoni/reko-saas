
import { ServiceTable } from '@/components/modules/admin/service/serviceTable';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminServicePages() {
    return (
        <ContentLayout title="Service">
            <div className="container px-4 pb-8 pt-8 sm:px-8">
                <ServiceTable />
            </div>
        </ContentLayout>
    );
}
