'use client';

import React from 'react';
import Image from 'next/image';
import { CtaButton, SectionHeading, BottomWaveDivider } from '@/components/landing/ui';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Home, School, Stethoscope } from 'lucide-react';

const activityImages = [
  '/images/activity-6.webp',
  '/images/activity-1.webp',
  '/images/activity-2.webp',
  '/images/activity-3.webp',
  '/images/activity-4.webp',
  '/images/activity-5.webp',
  '/images/activity-7.webp',
  '/images/activity-8.webp',
  '/images/activity-9.webp',
  '/images/activity-10.webp',
  '/images/activity-11.webp',
  '/images/activity-12.webp',
  '/images/activity-13.webp',
];

const places = [
  { icon: School, label: 'Na escola' },
  { icon: Home, label: 'Em casa' },
  { icon: Stethoscope, label: 'No consultório' },
];

export default function KitDescriptionSection() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
    },
    [
      AutoScroll({
        speed: 1.6, // Mesma velocidade balanceada e fluida
        startDelay: 0,
        stopOnInteraction: false, // Ao soltar, volta a rodar automaticamente
        stopOnMouseEnter: true, // Pausa ao passar o mouse
      }),
    ],
  );

  return (
    <section id="kit-description" className="relative overflow-hidden bg-sky-50 pt-16 md:pt-24 pb-0">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <>
              O Kit que estimula o <span className="text-sky-600 font-black">desenvolvimento das crianças autistas</span> e
              facilita sua rotina em sala de aula
            </>
          }
          subtitle="Mais de 1500 atividades inclusivas e adaptadas para crianças autistas, criadas para estimular o foco, a linguagem, a interação social e o desenvolvimento cognitivo."
        />

        <div className="mx-auto -mt-6 mb-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-ink-soft">
            O material é 100% digital, disponível na nossa plataforma em PDF pronto para imprimir, para você usar
            imediatamente em casa, na escola ou no consultório.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {places.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sm font-semibold text-ink"
              >
                <Icon className="h-4 w-4 text-sky-600" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mx-auto mb-6 sm:mb-8 max-w-lg text-center font-display text-lg font-extrabold leading-snug tracking-tight text-ink sm:text-xl md:text-2xl">
            Veja algumas das atividades <br />
            que estão <span className="text-sky-600">no kit</span>
          </h3>

          {/* Carrossel contínuo interativo: arrastável com dedo no celular e mouse no computador */}
          <div
            ref={emblaRef}
            className="cursor-grab active:cursor-grabbing overflow-hidden py-3 select-none"
            aria-label="Carrossel de prévia das atividades"
          >
            <div className="flex touch-pan-y gap-4 sm:gap-5">
              {activityImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="shrink-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-sm shadow-slate-900/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] w-[210px] overflow-hidden rounded-xl bg-slate-100 sm:w-[260px] md:w-[290px]">
                    <Image
                      src={src}
                      alt="Exemplo de atividade inclusiva"
                      fill
                      className="object-cover pointer-events-none select-none"
                      sizes="(max-width: 640px) 210px, (max-width: 768px) 260px, 290px"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-ink-soft">
            Essas são apenas algumas das{' '}
            <strong className="text-ink">mais de 1500 atividades exclusivas</strong> que você recebe na Plataforma
            Gêniozinho em Ação!
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton href="#oferta-especial" size="lg" pulse>
            Quero acessar o material agora!
          </CtaButton>
        </div>
      </div>
      <BottomWaveDivider className="text-[#F1F5F9] mt-12 md:mt-16" />
    </section>
  );
}
