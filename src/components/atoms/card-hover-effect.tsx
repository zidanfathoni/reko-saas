import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";

export const HoverEffect = ({
  items,
  className,
  button,
}: {
  button?: {
    active: boolean;
    label: string;
  };
  items: {
    id: string;
    title: string;
    description: string;
    label: string;
    author: string;
    published: string;
    link: string;
    image: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-secondary/[0.1] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="group bg-background border border-border dark:border-slate-700">
            <div>
              <img
                src={item?.image}
                alt={item?.title}
                className="aspect-[16/9] h-full w-full object-cover object-center"
              />
            </div>
            <div className="px-4 py-6 md:px-6 md:py-4 lg:px-4 lg:py-4">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                {item?.title}
              </h3>
              <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">{item?.description}</p>
              {
                button?.active === false ? (
                  <p className="flex items-center hover:underline">
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </p>
                ) : (
                  <div className="items-center gap-2 flex flex-col justify-center">
                    <Button className="w-full">{button?.label}</Button>
                  </div>
                )
              }
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div>{children}</div>
      </div>
    </div>
  );
};