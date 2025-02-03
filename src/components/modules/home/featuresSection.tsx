import { Badge } from '@/components/atoms/badge';
import { Check } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Comprehensive Tutorials",
    description: "Step-by-step guides designed to help you learn coding effectively, from beginner to advanced levels."
  },
  {
    id: 2,
    title: "Professional Development Services",
    description: "Tailored solutions for software development, ensuring reliable and scalable results for your projects."
  },
  {
    id: 3,
    title: "Community Support",
    description: "Join a growing community of developers to share knowledge, solve problems, and grow together."
  },
  {
    id: 4,
    title: "Cutting-Edge Technologies",
    description: "Stay ahead with solutions built using the latest frameworks and industry best practices."
  },
  {
    id: 5,
    title: "Affordable Pricing",
    description: "Get top-notch development and learning services at competitive and transparent prices."
  },
  {
    id: 6,
    title: "Customizable Solutions",
    description: "We tailor our services to fit your specific needs, ensuring the best outcomes for your projects."
  }
];

export const FeaturesSection = () => (
  <div className="w-full bg-background-secondary">
    <div className="container mx-auto">
      <div className="flex flex-col items-start gap-2 p-10 lg:p-20">
        <div>
          <Badge>🚀 Why Choose Receh Koding</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
            Features That Make Us Stand Out
          </h2>
          <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-xl">
            Discover the key features that set Receh Koding apart. Whether you&apos;re looking for professional development services or easy-to-follow tutorials, we&apos;ve got you covered with the best tools and resources.
          </p>
        </div>
        <div className="flex w-full flex-col gap-10 pt-12">
          <div className="grid grid-cols-2 items-start gap-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex w-full flex-row items-start gap-6">
                <Check className="mt-2 h-8 w-8 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
