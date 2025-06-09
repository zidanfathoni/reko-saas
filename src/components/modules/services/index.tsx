"use client"

import Breadcrumb from '@/components/atoms/breadcrumb2';
import { HoverEffect } from '@/components/atoms/card-hover-effect';
import Headers from '@/components/atoms/headers';
import SingleHoverEffect from '@/components/atoms/single-card-hover-effect';
import { PaginationMeta } from '@/components/molecules/pagination-meta';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchService } from '@/lib/slices/admin/service/admin-service-slice';
import { useEffect, useState } from 'react';



const posts = [
    {
        id: 'post-1',
        title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
        description:
            'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
        label: 'Ut varius dolor turpis',
        published: '1 Jan 2024',
        link: '#',
        image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
    },
    {
        id: 'post-2',
        title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
        description:
            'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
        label: 'Ut varius dolor turpis',
        published: '1 Jan 2024',
        link: '#',
        image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
    },
    {
        id: 'post-3',
        title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
        description:
            'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
        label: 'Ut varius dolor turpis',
        published: '1 Jan 2024',
        link: '#',
        image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
    },
];

const ServicesModules = () => {
    const [pageSize, setPageSize] = useState(10)
    const [searchQuery, setSearchQuery] = useState("")
    const dispatch = useAppDispatch();
    const { service, loadingService, errorService } = useAppSelector((state) => state.service);

    const fetchData = async () => {
        dispatch(fetchService({ page: service.meta?.current_page ?? 1, pageSize: service.meta?.per_page ?? 10, search: searchQuery }));
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, service.meta?.current_page ?? 1, service.meta?.per_page, searchQuery]);

    return (
        <section className="pb-32">
            <div className="container flex flex-col items-center gap-2 lg:px-16">
                {
                    loadingService ? (
                        <div className="flex items-center justify-center h-screen">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  py-10">
                            {
                                service?.data?.map((item, index) => (
                                    <SingleHoverEffect
                                        key={index}
                                        id={item?.id}
                                        title={item?.name}
                                        description={item?.description}
                                        published={item?.created_at}
                                        image={item?.images}
                                        link={`/services/${item?.slug}`}
                                        onClick={() => console.log('Card clicked')}

                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>

            <PaginationMeta />
        </section>
    );
};

export default ServicesModules;
