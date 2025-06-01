
import { ServiceCategoryTable } from '@/components/modules/admin/service/serviceCategoryTable';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminServiceCategoryPages() {
    return (
        <ContentLayout title="Service Category">
            <div className="container px-4 pb-8 pt-8 sm:px-8">
                <ServiceCategoryTable />
            </div>
        </ContentLayout>
    );
}
