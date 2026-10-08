'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { BrainCircuit, Users, Award, PersonStanding, Sparkles } from 'lucide-react';
import { SectionHeading, BottomCurveDivider } from '@/components/landing/ui';

// 10 imagens reais de crianças aplicando as atividades na prática:
const practiceImages = [
  '/images/pratica-1.webp',
  '/images/pratica-2.webp',
  '/images/pratica-3.webp',
  '/images/pratica-4.webp',
  '/images/pratica-5.webp',
  '/images/pratica-6.webp',
  '/images/pratica-7.webp',
  '/images/pratica-8.webp',
  '/images/pratica-9.webp',
  '/images/pratica-10.webp',
];

const benefits = [
  {
    icon: Award,
    title: 'Autonomia',
    color: 'bg-sky-100 text-sky-700',
    bar: 'bg-sky-400',
    text: 'Estimule a capacidade do seu aluno de superar desafios e se expressar de forma independente, fortalecendo sua confiança e independência nas interações sociais e no desenvolvimento pessoal.',
  },
  {
    icon: BrainCircuit,
    title: 'Desenvolvimento cognitivo',
    color: 'bg-violet-100 text-violet-700',
    bar: 'bg-violet-400',
    text: 'Estimula o desenvolvimento das habilidades cognitivas, ajudando-o a compreender e gerenciar emoções, melhorando sua capacidade de resolução de problemas e promovendo um pensamento mais claro e estruturado.',
  },
  {
    icon: PersonStanding,
    title: 'Autoconfiança',
    color: 'bg-emerald-100 text-emerald-700',
    bar: 'bg-emerald-400',
    text: 'Fortalece a autoestima e a confiança, fornecendo-lhe ferramentas para identificar e gerenciar emoções, melhorando sua comunicação verbal e não verbal e capacitando-o a interagir positivamente com outras pessoas.',
  },
  {
    icon: Users,
    title: 'Inclusão',
    color: 'bg-amber-100 text-amber-700',
    bar: 'bg-amber-400',
    text: 'Estimule a integração do seu aluno em diferentes ambientes sociais, incentivando o desenvolvimento de habilidades de comunicação e interação que o ajudem a estabelecer amizades significativas e a desfrutar de relacionamentos sociais gratificantes.',
  },
];

export default function CommunicationJourneySection() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
    },
    [
      AutoScroll({
        speed: 1.6, // Velocidade balanceada e fluida (nem muito lento, nem muito rápido)
        startDelay: 0,
        stopOnInteraction: false, // Quando o usuário soltar o dedo ou mouse, volta a rodar suavemente
        stopOnMouseEnter: true, // Pausa suave ao passar o mouse por cima
      }),
    ],
  );

  return (
    <section id="communication-journey" className="bg-[#F1F5F9] pt-16 md:pt-24 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Veja como nosso kit pode transformar a jornada de comunicação do seu aluno autista"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, color, bar, text }) => (
            <article
              key={title}
              className="relative flex flex-col items-center text-center overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${bar}`} />
              <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-display text-lg font-extrabold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
            </article>
          ))}
        </div>

        {/* Bloco: Atividades na prática com carrossel interativo e arrastável */}
        <div className="mt-14 sm:mt-18">
          <div className="mb-7 sm:mb-9 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/80 bg-sky-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-sky-800 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
              Na Prática
            </span>
            <h3 className="mt-2.5 font-display text-xl sm:text-2xl md:text-[1.65rem] font-extrabold text-ink tracking-tight">
              Veja nossas atividades sendo aplicadas na prática 💙
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-soft max-w-lg mx-auto">
              Confira momentos reais de desenvolvimento, aprendizado e interação com as atividades do kit
            </p>
          </div>

          {/* Carrossel contínuo interativo: arrastável com dedo no celular e mouse no computador */}
          <div
            ref={emblaRef}
            className="cursor-grab active:cursor-grabbing overflow-hidden py-3 select-none"
            aria-label="Carrossel de atividades na prática"
          >
            <div className="flex touch-pan-y gap-4 sm:gap-5">
              {practiceImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="shrink-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-sm shadow-slate-900/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] w-[210px] overflow-hidden rounded-xl bg-slate-100 sm:w-[260px] md:w-[290px]">
                    <Image
                      src={src}
                      alt="Criança aplicando atividade adaptada na prática"
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
        </div>
      </div>
      <BottomCurveDivider className="text-white mt-12 md:mt-16" />
    </section>
  );
}
