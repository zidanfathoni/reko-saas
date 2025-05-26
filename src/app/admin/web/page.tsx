"use client"

import { WebForm } from '@/components/modules/admin/web/webForm';
import { WebHealth } from '@/components/modules/admin/web/webHealth';
import { ContentLayout } from '@/components/templates/admin-panel/content-layout';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchWebSetting } from '@/lib/slices/admin/admin-webSetting-Slice';
import { useEffect, useState } from 'react';




export default function AdminWebSettingPages() {
  const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch();
    const { webSetting, loading, error } = useAppSelector((state) => state.webSetting);

    // Fetch web settings when the component mounts
    useEffect(() => {
        dispatch(fetchWebSetting());
    }, [dispatch]);
    return (
        <ContentLayout title="Web Settings">
            <div>
                {
                    loading ? (
                        <div className="flex items-center justify-center h-screen">
                            <p>Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-screen">
                            <p>Error: {error}</p>
                        </div>
                    ) : (
                        <>
                        <WebHealth
                    health={webSetting?.health}
                />
                <WebForm
                    setup={webSetting?.setup}
                 />
                 </>
                    )
                }
            </div>
        </ContentLayout>
    );
}
