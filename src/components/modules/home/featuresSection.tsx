import { Badge } from '@/components/atoms/badge';
import { Check } from 'lucide-react';

export const FeaturesSection = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex flex-col items-start gap-2 p-10 lg:p-20">
        <div>
          <Badge>Platform</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
            Something new!
          </h2>
          <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-xl">
            Managing a small business today is already tough.
          </p>
        </div>
        <div className="flex w-full flex-col gap-10 pt-12">
          <div className="grid grid-cols-2 items-start gap-10 lg:grid-cols-3">
            <div className="flex w-full flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Easy to use</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Fast and reliable</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it fast and reliable.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Beautiful and modern</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it beautiful and modern.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Easy to use</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Fast and reliable</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it fast and reliable.
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-6">
              <Check className="mt-2 h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Beautiful and modern</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve made it beautiful and modern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
