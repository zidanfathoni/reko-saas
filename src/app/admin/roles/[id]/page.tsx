import RolesDetailClient from "@/components/modules/admin/roles/roles-detail"
import { ContentLayout } from "@/components/templates/admin-panel/content-layout"



interface RolesDetailProps {
    params: Promise<{ id: string }>
  }


  export default async function RolesDetailPage({ params }: RolesDetailProps) {
  // Await params untuk mendapatkan id
  const { id } = await params

  return (

            <ContentLayout title="Roles">
                <div
                    className="container px-4 pb-8 pt-8 sm:px-8"
                >
                <RolesDetailClient id={id} />
                </div>
            </ContentLayout>
  )

  }
