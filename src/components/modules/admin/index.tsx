'use client';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/atoms/breadcrumb';
import { Label } from '@/components/atoms/label';
import { Switch } from '@/components/atoms/switch';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/atoms/tooltip';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';
import { IconForm } from '@/helper/iconsForm';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import Link from 'next/link';
import { Player } from "@lottiefiles/react-lottie-player";
import { SectionCards } from './section-chart';
import { ChartAreaInteractive } from './chart-dashboard';
import { useState } from 'react';
import CustomCKEditor from '@/components/atoms/CKEditor';



const AdminDashboardModules: React.FC = () => {

    const [content, setContent] = useState<string>('<p>Konten awal editor</p>');

    const animationURL = "/lottie/Animation - 1738942814622.json";

    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { settings, setSettings } = sidebar;

    return (
        <ContentLayout title="Dashboard">
            {
                settings.disabled ? (
                    <Player
                        src={animationURL}
                        autoplay
                        loop
                        speed={1}
                        style={{ width: "50%", height: "50%" }}
                    />
                ) : (
                    <>
                        <div className="flex flex-1 flex-col">
                            <div className="@container/main flex flex-1 flex-col gap-2">
                                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                    <SectionCards />
                                    <div className="px-4 lg:px-6">
                                        <ChartAreaInteractive />
                                    </div>
                                    <div>
                                        <CustomCKEditor
                                            data={content}
                                            onChange={(newData) => setContent(newData)}
                                        />
                                        <div>
                                            <h2>Preview:</h2>
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </ContentLayout>
    );
}

export default AdminDashboardModules;
