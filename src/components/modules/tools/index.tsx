"use client";

import {
  ArrowRight,
  Award,
  Building2,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Loader2,
  Trophy,
} from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import Breadcrumb from "@/components/atoms/breadcrumb2";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataTools, GetTools, MetaTools, PaginationTools } from "@/lib/interface/tools/getTools";
import { axiosApi } from "@/lib";
import { toast } from "@/components/atoms/use-toast";
import { api } from "@/lib/axios/instance";
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import LoadingComponents from "@/components/atoms/loading";

const ToolsModules: React.FC = () => {
  const [data, setData] = useState<DataTools[]>([]);
  const [meta, setMeta] = useState<MetaTools>();
  const [loading, setLoading] = useState<boolean>(true);
  const [emptyData, setEmptyData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<PaginationTools>(
    meta?.pagination || {} as PaginationTools
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<GetTools>(`/tools?pagination[pageSize]=12&pagination[page]=${pagination.page ?? 1}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            'populate': 'link.link',
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
    <section className="pb-24 pt-10">
      <div className="container px-0 md:px-8 pb-10">
        <Breadcrumb pageName="Tools"
          pageDescription="Explore a collection of powerful tools designed to enhance your productivity as a developer. From code generators to API testers and project analysis tools, find everything you need to work efficiently and create professional-grade software."
        />
        <div className="flex flex-col">
          <Separator />
          {loading && (
            <LoadingComponents />
          )}
          <Suspense
            fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                  <div className="order-2 flex items-center gap-2 md:order-none">
                    <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                      <DynamicIcon icon={item.attributes.link.icons_web} className="h-14" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.attributes.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.attributes.type}
                      </p>
                    </div>
                  </div>
                  <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                    {item.attributes.description}
                  </p>
                  <Button variant="outline" asChild>
                    <a
                      className="order-3 ml-auto w-fit gap-2 md:order-none"
                      href={item.attributes.link.link.href}
                      target={item.attributes.link.link.target}
                    >
                      <span>{item.attributes.link.link.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </Suspense>
        </div>
      </div>
      <PaginationControls currentPage={pagination.page} totalPages={pagination.pageCount} onChange={handlePageClick} />
    </section>
  );
};

export default ToolsModules;
