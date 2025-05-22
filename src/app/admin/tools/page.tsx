
import { ToolsTable } from '@/components/modules/admin/tools/table';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';

export default function AdminTools() {
    return (
        <ContentLayout title="Tools">

            <div
                className="container px-4 pb-8 pt-8 sm:px-8"
            >
                <ToolsTable />
            </div>
        </ContentLayout>
    );
}
