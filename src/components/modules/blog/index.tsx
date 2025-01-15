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

const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

const BlogModules = () => {
  return (
    <section className="pb-32 pt-10">
      <div className="container flex flex-col items-center gap-4 lg:px-16">
        <Breadcrumb pageName="Blogs"
          pageDescription="Dive into a collection of articles, coding tutorials, and IT insights. Stay updated with the latest trends, tips, and tricks to enhance your skills and knowledge in software development."
        />

        <HoverEffect button={
          {
            active: false,
            label: 'Read More',
          }
        } items={posts} />
      </div>
      <PaginationMeta />
    </section>
  );
};

export default BlogModules;
