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
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Google-flutter-logo.svg/2560px-Google-flutter-logo.svg.png",
    },
    {
      id: "logo-2",
      description: "Logo 2",
      image: "https://www.builtbyplatform.co.uk/wp-content/uploads/2560px-Logo.min_.svg.png",
    },
    {
      id: "logo-3",
      description: "Logo 3",
      image: "https://shadcnblocks.com/images/block/logos/nextjs.svg",
    },
    {
      id: "logo-4",
      description: "Logo 4",
      image: "https://shadcnblocks.com/images/block/logos/react.png",
    },
    {
      id: "logo-5",
      description: "Logo 5",
      image: "https://testrigor.com/wp-content/uploads/2023/03/vuejs-logo.png",
    },
    {
      id: "logo-6",
      description: "Logo 6",
      image: "https://cms.doowup.fr/uploads/logo_strapi_3e3b13122f.png",
    },
    {
      id: "logo-7",
      description: "Logo 7",
      image: "https://miro.medium.com/v2/resize:fit:800/1*NvAqNoaERe7VzT-s47PQcw.png",
    },
    {
      id: "logo-8",
      description: "Logo 8",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
    },
    {
      id: "logo-9",
      description: "Logo 9",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Odoo_logo.svg/1200px-Odoo_logo.svg.png",
    },
    {
      id: "logo-10",
      description: "Logo 10",
      image: "https://www.freeiconspng.com/uploads/transparent-wordpress-logo-clipart--2.png",
    },
    {
      id: "logo-11",
      description: "Logo 11",
      image: "https://cdn.icon-icons.com/icons2/2699/PNG/512/mysql_horizontal_logo_icon_170929.png",
    },
    {
      id: "logo-12",
      description: "Logo 12",
      image: "https://shadcnblocks.com/images/block/logos/supabase.svg",
    },
    {
      id: "logo-13",
      description: "Logo 13",
      image: "https://logos-download.com/wp-content/uploads/2016/10/PostgreSQL_logo_Postgre_SQL.png",
    },
    {
      id: "logo-14",
      description: "Logo 14",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/1200px-MongoDB_Logo.svg.png",
    },
    {
      id: "logo-15",
      description: "Logo 15",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/2560px-Docker_%28container_engine%29_logo.svg.png",
    },
    {
      id: "logo-16",
      description: "Logo 16",
      image: "https://rec-data.kalibrr.com/logos/62V5X6AMXQ9CCRSGRRXE4MSQX7QGBYCW7PGRZWQV-5b98db77.png",
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
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className="h-8 w-auto"
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
};

export { Case };
