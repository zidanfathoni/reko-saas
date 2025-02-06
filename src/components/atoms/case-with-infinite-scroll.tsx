"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "./card";
import DynamicIcon from "@/helper/dynamicIcons";
import Image from "next/image";

function Case() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);


  const logos = [
    {
      id: "logo-1",
      description: "Logo 1",
      image: "/images/stacks/flutter.png",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "/images/stacks/laravel.png",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "/images/stacks/nextjs.png",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "/images/stacks/react.png",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "/images/stacks/vuejs.webp",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "/images/stacks/strapi.png",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "/images/stacks/adonis.png",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "/images/stacks/Expressjs.png",
    },
    {
      id: "logo-9",
      description: "Logo 9",
      image: "/images/stacks/odoo.png",
    },
    {
      id: "logo-10",
      description: "Logo 10",
      image: "/images/stacks/wordpress.png",
    },
    {
      id: "logo-11",
      description: "Logo 11",
      image: "/images/stacks/mysql.png",
    },
    {
      id: "logo-12",
      description: "Logo 12",
      image: "/images/stacks/supabase.png",
    },
    {
      id: "logo-13",
      description: "Logo 13",
      image: "/images/stacks/postgresql.png",
    },
    {
      id: "logo-14",
      description: "Logo 14",
      image: "/images/stacks/mongoDB.png",
    },
    {
      id: "logo-15",
      description: "Logo 15",
      image: "/images/stacks/docker.png",
    },
    {
      id: "logo-16",
      description: "Logo 16",
      image: "/images/stacks/midtrans.png",
    },
  ];

  return (
    <div className="w-full py-2 lg:py-2">
      <div className="container mx-auto">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="px-3 basis-1/2 pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <Card className="p-3 dark:bg-foreground bg-background-secondary rounded-lg">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <Image
                        src={logo.image}
                        alt={logo.description}
                        className="h-8 w-auto"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export { Case };
