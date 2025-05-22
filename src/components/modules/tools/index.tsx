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
import PaginationControls from "@/components/molecules/pagination-control";
import DynamicIcon from "@/helper/dynamicIcons";
import LoadingComponents from "@/components/atoms/loading";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchTools, setPage } from "@/lib/slices/toolsSlices";

const ToolsModules: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tools, loading, error } = useAppSelector((state) => state.tools);

  const handlePageClick = (page: number) => {
    dispatch(setPage(page));
  };

//   const pageNumbers = [];
//   for (let i = 1; i <= tools.meta.last_page; i++) {
//     pageNumbers.push(i);
//   }

  useEffect(() => {
    dispatch(fetchTools({ page: tools.meta.current_page, pageSize:1 }));
  }, [dispatch, tools.meta.current_page]);

  return (
    <section className="pb-24 pt-10">
      <div className="container px-0 md:px-8 pb-10">
        <Breadcrumb pageName="Tools"
          pageDescription="Explore a collection of powerful tools designed to enhance your productivity as a developer. From code generators to API testers and project analysis tools, find everything you need to work efficiently and create professional-grade software."
        />
        <div className="flex flex-col">
          <Separator />
          {loading ? (
            <LoadingComponents />
          ) : (
            <Suspense
              fallback={<Loader2 className="h-16 w-16 animate-spin text-primary" />}>
              {tools.data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                    <div className="order-2 flex items-center gap-2 md:order-none">
                      <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                        <DynamicIcon icon={item.icon} className="h-14" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{item.name}</p>
                        {/* <p className="text-sm text-muted-foreground">
                          {item.attributes.type}
                        </p> */}
                      </div>
                    </div>
                    <p className="order-1 text-xl font-semibold md:order-none md:col-span-2">
                      {item.description}
                    </p>
                    <Button variant="outline" asChild>
                      <a
                        className="order-3 ml-auto w-fit gap-2 md:order-none"
                        href={item.link_url}
                        target={item.link_target ?? "_blank"}
                      >
                        <span>{item.link_label ?? `Let's Gooo!`}</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <Separator />
                </React.Fragment>
              ))}
            </Suspense>
          )
          }

        </div>
      </div>
      <PaginationControls currentPage={tools.meta.current_page} totalPages={tools.meta.last_page} onChange={handlePageClick} />
    </section>
  );
};

export default ToolsModules;
