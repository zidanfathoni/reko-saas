const partners = [
  {
    name: "Vercel",
    logo: "https://shadcnblocks.com/images/block/logos/vercel.svg",
    className: "h-7 w-auto",
  },

  {
    name: "Astro",
    logo: "https://shadcnblocks.com/images/block/logos/tailwind.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Supabase",
    logo: "https://shadcnblocks.com/images/block/logos/supabase.svg",
    className: "h-6 w-auto",
  },
  {
    name: "Figma",
    logo: "https://shadcnblocks.com/images/block/logos/figma.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Astro",
    logo: "https://shadcnblocks.com/images/block/logos/astro.svg",
    className: "h-6 w-auto",
  },
];

const TrustedSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Trusted by these companies</h2>
          <p className="mt-1 text-muted-foreground">
            Used by the world&apos;s leading companies
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
            {partners.map((partner, index) => (
              <img
                key={index}
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={109}
                height={48}
                className={partner.className}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
