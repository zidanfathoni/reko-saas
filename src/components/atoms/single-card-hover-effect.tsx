import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";

interface CardItem {
  id: string;
  title: string;
  description: string;
  author?: string;
  published: string;
  link: string;
  image: string;
  onClick?: () => void;
}

 const SingleHoverEffect = ({
    id,
    title,
    description,
    author,
    published,
    link,
    image,
    onClick,

}: CardItem) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <Link
          href={link}
          key={link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === id && (
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
                src={image}
                alt={title}
                className="aspect-[16/9] h-full w-full object-cover object-center"
              />
            </div>
            <div className="px-4 py-6 md:px-6 md:py-4 lg:px-4 lg:py-4">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                {title}
              </h3>
              <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">{description}</p>
              <div className="items-center gap-2 flex flex-col justify-center">
                    <Button
                        onClick={onClick}
                    className="w-full">Buy Now</Button>
                  </div>
            </div>
          </Card>
        </Link>
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

export default SingleHoverEffect;
