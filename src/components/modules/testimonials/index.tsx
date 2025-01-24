"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { Card } from "@/components/atoms/card"
import { FaExternalLinkAlt } from "react-icons/fa";
import Breadcrumb from "@/components/atoms/breadcrumb2"
import { DataTestimonials, GetTestimonials, MetaTestimonials, PaginationTestimonials } from "@/lib/interface/testimonials/getTestimonials"
import { api } from "@/lib/axios/instance"
import PaginationControls from "@/components/molecules/pagination-control"
import { Loader2 } from "lucide-react"
import LoadingComponents from "@/components/atoms/loading"


const testimonials = [
  {
    image: 'https://i.imgur.com/VRtqhGC.png',
    text: 'I\'m blown away by the versatility of the components in this library. They make UI development a breeze!',
    name: 'Alice Johnson',
    company: '@alicejohnson',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/VRtqhGC.png',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    company: '@davidsmith',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/kaDy9hV.jpeg',
    text: 'The components in this library are not just well-designed but also highly customizable. It\'s a developer\'s dream!',
    name: 'Emma Brown',
    company: '@emmabrown',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/cRwFxtE.png',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    company: '@jameswilson',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/TQIqsob.png',
    text: 'Implementing this component library was a game-changer for our team. It has elevated our product\'s UI to a whole new level!',
    name: 'Sophia Lee',
    company: '@sophialee',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/3ROmJ0S.png',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    company: '@michaeldavis',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    company: '@emilychen',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'I love how easy it is to customize the components  to fit our brand\'s style. The design is clean and modern.',
    name: 'Robert Lee',
    company: '@robertlee',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    company: '@sarahtaylor',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    company: '@kevinwhite',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/yTsomza.png',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    company: '@rachelpatel',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/pnsLqpq.png',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    company: '@briankim',
    social: 'https://i.imgur.com/VRtqhGC.png'
  }
];

const Testimonials: React.FC = () => {
  const [data, setData] = useState<DataTestimonials[]>([]);
  const [meta, setMeta] = useState<MetaTestimonials>();
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationTestimonials>(
    meta?.pagination || {} as PaginationTestimonials
  );

  const handlePageClick = (page: number) => {
    // Logika untuk menangani perubahan halaman
    console.log('Page clicked:', page);
    setPagination(prev => ({ ...prev, page }));
    // Lakukan fetching data untuk halaman baru di sini
  };


  const pageNumbers = [];
  for (let i = 1; i <= pagination.pageCount; i++) {
    pageNumbers.push(i);
  }

  const openInNewTab = (url: string) => {
    window.open(url, "_blank")?.focus()
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<GetTestimonials>(`/testimonials?pagination[pageSize]=12&pagination[page]=${pagination.page ?? 1}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
        setData(response.data.data);
        setMeta(response.data.meta);
        setPagination(response.data.meta.pagination);
        if (response.data.data.length === 0) {
          setEmptyData(true);
        } else {
          setEmptyData(false);
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pagination.page]);



  return (
    <div >

      <div className="relative container">
        <div
          className={cn(
            "flex justify-center items-center gap-5 flex-wrap",

          )}
        >
          {loading && (
            <LoadingComponents />
          )}
          <Suspense
            fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
            {data.map((testimonial, index) => (
              <Card
                key={index}
                className="w-80 h-auto p-5 relative bg-card border-border"
              >
                <div className="flex items-center">
                  {/* <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  /> */}
                  <div className="flex flex-col pl-4">
                    <span className="font-semibold text-base">
                      {testimonial.attributes.title}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.attributes.company}
                    </span>
                  </div>
                </div>
                <div className="mt-5 mb-5">
                  <p className="text-foreground font-medium">
                    {testimonial.attributes.message}
                  </p>
                </div>
                <button
                  onClick={() => openInNewTab(testimonial.attributes.link.href)}
                  className="absolute top-4 right-4 hover:opacity-80 transition-opacity"
                >
                  <FaExternalLinkAlt className="h-4 w-4 hover:bg-background-secondary" aria-hidden="true" />
                </button>
              </Card>
            ))}
          </Suspense>
        </div>
      </div>

      <PaginationControls currentPage={pagination.page} totalPages={pagination.pageCount} onChange={handlePageClick} />
    </div>
  )
}

export default Testimonials