import { ArrowDownRight } from 'lucide-react';

import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import StackSection from './stackSection';

const HeroSection = () => {
  return (

    <section className="pt-32 pb-12">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              🌟 Your Coding & Development Partner
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Receh Koding: Build and Grow with Confidence
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Professional software development solutions combined with easy-to-follow coding tutorials.
              Let Receh Koding help you turn your ideas into reality.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Start Learning</Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto hover:bg-secondary hover:text-secondary-foreground"
                onClick={() => (window.location.href = '/contact')}
              >
                Contact Us
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder hero"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
      <StackSection />
    </section>
  );
};

export default HeroSection;


{/* <StackSection /> */ }