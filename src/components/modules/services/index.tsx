"use client"

import Breadcrumb from '@/components/atoms/breadcrumb2';
import { HoverEffect } from '@/components/atoms/card-hover-effect';
import Headers from '@/components/atoms/headers';
import { PaginationMeta } from '@/components/molecules/pagination-meta';



const posts = [
  {
    id: 'post-1',
    title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
    description:
      'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
    label: 'Ut varius dolor turpis',
    author: 'Jane Doe',
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
    author: 'Jane Doe',
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
    author: 'Jane Doe',
    published: '1 Jan 2024',
    link: '#',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
  },
];

const ServicesModules = () => {
  return (
    <section className="pb-32">
      <div className="container flex flex-col items-center gap-2 lg:px-16">
        <HoverEffect button={
          {
            active: true,
            label: 'Read More',
          }
        } items={posts} />
      </div>

      <PaginationMeta />
    </section>
  );
};

export default ServicesModules;
