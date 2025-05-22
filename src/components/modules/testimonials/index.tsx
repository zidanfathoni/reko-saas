"use client"

import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { Card } from "@/components/atoms/card"
import { FaExternalLinkAlt } from "react-icons/fa";
import Breadcrumb from "@/components/atoms/breadcrumb2"
import { DataTestimonials, GetTestimonials, MetaTestimonials } from "@/lib/interface/testimonials/getTestimonials"
import { api } from "@/lib/axios/instance"
import PaginationControls from "@/components/molecules/pagination-control"
import { Loader2 } from "lucide-react"
import LoadingComponents from "@/components/atoms/loading"


const Testimonials: React.FC = () => {
  const [data, setData] = useState<DataTestimonials[]>([]);
  const [meta, setMeta] = useState<MetaTestimonials>();
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<MetaTestimonials>(
    meta || {} as MetaTestimonials
  );

  const handlePageClick = (page: number) => {
    // Logika untuk menangani perubahan halaman
    console.log('Page clicked:', page);
    setPagination(prev => ({ ...prev, current_page: page }));
    // Lakukan fetching data untuk halaman baru di sini
  };


  const pageNumbers = [];
  for (let i = 1; i <= pagination.total; i++) {
    pageNumbers.push(i);
  }

  const openInNewTab = (url: string) => {
    window.open(url, "_blank")?.focus()
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<GetTestimonials>(`/testimonials?pageSize=12&page=${pagination.current_page ?? 1}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); // ganti '/endpoint' dengan endpoint yang sesuai
        setData(response.data.data);
        setMeta(response.data.meta);
        setPagination(response.data.meta);
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
  }, [pagination.current_page]);



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
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.company}
                    </span>
                  </div>
                </div>
                <div className="mt-5 mb-5">
                  <p className="text-foreground font-medium">
                    {testimonial.message}
                  </p>
                </div>
                <button
                  onClick={() => openInNewTab(testimonial.link)}
                  className="absolute top-4 right-4 hover:opacity-80 transition-opacity"
                >
                  <FaExternalLinkAlt className="h-4 w-4 hover:bg-background-secondary" aria-hidden="true" />
                </button>
              </Card>
            ))}
          </Suspense>
        </div>
      </div>

      <PaginationControls currentPage={pagination.current_page} totalPages={pagination.last_page} onChange={handlePageClick} />
    </div>
  )
}

export default Testimonials
