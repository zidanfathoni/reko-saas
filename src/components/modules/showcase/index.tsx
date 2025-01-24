import { Button } from "@/components/atoms/button";


const posts = [
  {
    id: 'post-1',
    title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
    description:
      'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
    label: 'Ut varius dolor turpis',
    author: 'Jane Doe',
    published: '1 Jan 2024',
    link: '#',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
  },
  {
    id: 'post-2',
    title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
    description:
      'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
    label: 'Ut varius dolor turpis',
    author: 'Jane Doe',
    published: '1 Jan 2024',
    link: '#',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
  },
  {
    id: 'post-3',
    title: 'Duis sem sem, gravida vel porttitor eu, volutpat ut arcu',
    description:
      'Pellentesque eget quam ligula. Sed felis ante, consequat nec ultrices ut, ornare quis metus. Vivamus sit amet tortor vel enim sollicitudin hendrerit.',
    label: 'Ut varius dolor turpis',
    author: 'Jane Doe',
    published: '1 Jan 2024',
    link: '#',
    image: 'https://shadcnblocks.com/images/block/placeholder-dark-1.svg',
  },
];

const ShowcaseModules = () => {
  return (
    <section className="py-32">
      <div className="container max-w-6xl">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2 className="mb-6 mt-4 text-4xl font-semibold md:text-5xl">
              Experience the difference with us
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              We believe in creating lasting partnerships with our clients,
              focusing on long-term success through collaborative innovation and
              dedicated support.
            </p>
            {/* <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Button className="gap-2" size="lg">
                Start Now
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                Book a demo
              </Button>
            </div> */}
          </div>
          <div className="flex flex-col gap-12 md:gap-20">
            <div className="rounded-xl border p-2">
              <img
                src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                alt="placeholder"
                className="aspect-video w-full rounded-xl border border-dashed object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-2xl font-semibold">
                  Straightforward Pricing
                </h3>
                <p className="text-muted-foreground">
                  Clear, upfront pricing with no hidden fees. Get an instant
                  quote through our simple online form.
                </p>
              </div>
              <div className="items-center gap-2 flex flex-col justify-center">
                <Button className="w-full">Read More</Button>
              </div>
            </div>
            <div className="rounded-xl border p-2">
              <img
                src="https://shadcnblocks.com/images/block/placeholder-2.svg"
                alt="placeholder"
                className="aspect-video w-full rounded-xl border border-dashed object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-2xl font-semibold">
                  Structured Development
                </h3>
                <p className="text-muted-foreground">
                  Regular progress updates and defined milestones ensure
                  complete visibility throughout your project&apos;s lifecycle.
                </p>
              </div>
              <div className="items-center gap-2 flex flex-col justify-center">
                <Button className="w-full">Read More</Button>
              </div>
            </div>
            <div className="rounded-xl border p-2">
              <img
                src="https://shadcnblocks.com/images/block/placeholder-3.svg"
                alt="placeholder"
                className="aspect-video w-full rounded-xl border border-dashed object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-2xl font-semibold">
                  Scalable Architecture
                </h3>
                <p className="text-muted-foreground">
                  Built with scalability in mind, our solutions grow with your
                  needs while maintaining consistent performance.
                </p>
              </div>
              <div className="items-center gap-2 flex flex-col justify-center">
                <Button className="w-full">Read More</Button>
              </div>
            </div>
            <div className="rounded-xl border p-2">
              <img
                src="https://shadcnblocks.com/images/block/placeholder-4.svg"
                alt="placeholder"
                className="aspect-video w-full rounded-xl border border-dashed object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-2xl font-semibold">
                  Dedicated Support
                </h3>
                <p className="text-muted-foreground">
                  Access our dedicated support team through multiple channels
                  for quick resolution of any concerns.
                </p>
              </div>
              <div className="items-center gap-2 flex flex-col justify-center">
                <Button className="w-full">Read More</Button>
              </div>
            </div>
            <div className="rounded-xl border p-2">
              <img
                src="https://shadcnblocks.com/images/block/placeholder-5.svg"
                alt="placeholder"
                className="aspect-video w-full rounded-xl border border-dashed object-cover"
              />
              <div className="p-6">
                <h3 className="mb-1 text-2xl font-semibold">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. If our solution
                  doesn&apos;t meet your expectations.
                </p>
              </div>
              <div className="items-center gap-2 flex flex-col justify-center">
                <Button className="w-full">Read More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseModules;
