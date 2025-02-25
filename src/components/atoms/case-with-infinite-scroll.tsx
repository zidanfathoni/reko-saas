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
      id: "flutter",
      description: "Flutter",
      image: "/images/stacks/flutter.png",
    },
    {
      id: "laravel",
      description: "Laravel",
      image: "/images/stacks/laravel.png",
    },
    {
      id: "nextjs",
      description: "NextJS",
      image: "/images/stacks/nextjs.png",
    },
    {
      id: "react",
      description: "React",
      image: "/images/stacks/react.png",
    },
    {
      id: "vuejs",
      description: "VueJS",
      image: "/images/stacks/vuejs.webp",
    },
    {
      id: "strapi",
      description: "Strapi",
      image: "/images/stacks/strapi.png",
    },
    {
      id: "adonis",
      description: "AdonisJS",
      image: "/images/stacks/adonis.png",
    },
    {
      id: "express",
      description: "ExpressJS",
      image: "/images/stacks/Expressjs.png",
    },
    {
      id: "python",
      description: "Python",
      image: "/images/stacks/python.png",
    },
    {
      id: "odoo",
      description: "Odoo",
      image: "/images/stacks/odoo.png",
    },
    {
      id: "wordpress",
      description: "Wordpress",
      image: "/images/stacks/wordpress.png",
    },
    {
      id: "arduino",
      description: "Arduino",
      image: "/images/stacks/arduino.png",
    },
    {
      id: "mysql",
      description: "MySQL",
      image: "/images/stacks/mysql.png",
    },
    {
      id: "supabase",
      description: "Supabase",
      image: "/images/stacks/supabase.png",
    },
    {
      id: "postgresql",
      description: "PostgreSQL",
      image: "/images/stacks/postgresql.png",
    },
    {
      id: "mongodb",
      description: "MongoDB",
      image: "/images/stacks/mongoDB.png",
    },
    {
      id: "graphql",
      description: "GraphQL",
      image: "/images/stacks/graphql.png",
    },
    {
      id: "docker",
      description: "Docker",
      image: "/images/stacks/docker.png",
    },
    {
      id: "midtrans",
      description: "Midtrans",
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
