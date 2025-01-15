import { Button } from '@/components/atoms/button';
import { MoveRight } from 'lucide-react';
import Headers from '@/components/atoms/headers';

export const LatestServicesSection = () => (
  <section className='bg-background-secondary'>
    <div className="w-full py-10 lg:py-20">
      <Headers
        title='Our Services'
        description='Discover a wide range of professional software development services tailored to meet your unique business needs. From web and mobile app development to custom solutions, we deliver excellence at every step.'
      />
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-regular max-w-xl text-2xl tracking-tighter md:text-4xl">
            Latest Services
          </h4>
          <Button className="gap-4">
            View all Services <MoveRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
