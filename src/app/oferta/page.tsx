'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import { Skeleton } from '@/components/ui/skeleton';
import AboutSection from '@/components/sections/AboutSection';

// Dynamically import sections that are below the fold
const KitDescriptionSection = dynamic(() => import('@/components/sections/KitDescriptionSection'), {
  loading: () => <Skeleton className="h-[600px] w-full" />
});
const CommunicationJourneySection = dynamic(() => import('@/components/sections/CommunicationJourneySection'), {
  loading: () => <Skeleton className="h-[400px] w-full" />
});
const HowToReceiveSection = dynamic(() => import('@/components/sections/HowToReceiveSection'), {
  loading: () => <Skeleton className="h-[300px] w-full" />
});
const BenefitsSection = dynamic(() => import('@/components/sections/BenefitsSection'), {
  loading: () => <Skeleton className="h-[800px] w-full" />
});
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <Skeleton className="h-[800px] w-full" />
});
const OfferSection = dynamic(() => import('@/components/sections/OfferSection'), {
  loading: () => <Skeleton className="h-[1000px] w-full" />
});
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'), {
  loading: () => <Skeleton className="h-[500px] w-full" />
});


export default function OfertaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <KitDescriptionSection />
        <CommunicationJourneySection />
        <HowToReceiveSection />
        <BenefitsSection />
        <TestimonialsSection />
        <OfferSection 
          price="19,75" 
          installmentText="ou 4x de R$5,73" 
          checkoutUrl="https://loja.geniozinhoemacao.com.br/checkout/v4/WbE0rP04SZDO0RPFaY8D" 
        /> 
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
