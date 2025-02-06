
import { PricingSection } from '@/components/modules/subscriptions';
import { FaqSection } from '@/components/modules/subscriptions/faqsSection';
import { MainLayout } from '@/components/templates';

import { FaArrowRight } from "react-icons/fa6";

const defaultTiers = [
  {
    name: "Starter",
    price: {
      monthly: 15,
      yearly: 144,
    },
    description: "Perfect for individuals and small projects",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 to-gray-500/30 blur-2xl rounded-full" />
        <FaArrowRight className="w-7 h-7 relative z-10 text-gray-500 dark:text-gray-400 animate-[float_3s_ease-in-out_infinite]" />
      </div>
    ),
    features: [
      {
        name: "Basic Analytics",
        description: "Track essential metrics and user behavior",
        included: true,
      },
      {
        name: "5 Team Members",
        description: "Collaborate with a small team",
        included: true,
      },
      {
        name: "Basic Support",
        description: "Email support with 24h response time",
        included: true,
      },
      {
        name: "API Access",
        description: "Limited API access for basic integrations",
        included: false,
      },
    ],
  },
  {
    name: "Pro",
    price: {
      monthly: 49,
      yearly: 470,
    },
    description: "Ideal for growing teams and businesses",
    highlight: true,
    badge: "Most Popular",
    icon: (
      <div className="relative">
        <FaArrowRight className="w-7 h-7 relative z-10" />
      </div>
    ),
    features: [
      {
        name: "Advanced Analytics",
        description: "Deep insights and custom reports",
        included: true,
      },
      {
        name: "Unlimited Team Members",
        description: "Scale your team without limits",
        included: true,
      },
      {
        name: "Priority Support",
        description: "24/7 priority email and chat support",
        included: true,
      },
      {
        name: "Full API Access",
        description: "Complete API access with higher rate limits",
        included: true,
      },
    ],
  },
]


const DEMO_FAQS = [
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply sign up for an account and follow our quick setup guide. We'll walk you through each step of the process.",
    category: "Getting Started",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
    category: "Billing",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    category: "Pricing",
  },
  {
    question: "How can I contact support?",
    answer: "Our support team is available 24/7 through our help center, email support, or live chat. We typically respond within 2 hours.",
    category: "Support",
  },
];


export default function SubscriptionsPages() {
  return (
    <MainLayout>
      {/* <PricingSection tiers={defaultTiers} /> */}

      <FaqSection
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services"
        items={DEMO_FAQS}
      />
    </MainLayout>
  );
}
