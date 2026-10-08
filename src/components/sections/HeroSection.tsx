'use client';

import Image from 'next/image';
import React from 'react';
import { Check } from 'lucide-react';
import { CtaButton, BottomWaveDivider } from '@/components/landing/ui';


const heroHighlights = [
  'Acesso imediato',
  'Material em PDF visual e profissional',
  'Atividades organizadas por objetivo',
  'Prontas para adaptar à sua realidade',
];


export default function HeroSection() {
  return (
    <section className="bg-paper-grid relative overflow-hidden pb-0 pt-8 md:pt-12">
        {/* Formas decorativas leves (sem blur/animação, não pesam no celular) */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-32 hidden h-64 w-64 rounded-full bg-sky-200/40 md:block" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.webp"
              alt="Logo Gêniozinho em Ação"
              width={84}
              height={70}
              className="h-auto w-[68px] sm:w-[82px]"
              priority
            />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-[1.45rem] font-black leading-[1.2] tracking-tight text-ink sm:text-2xl md:text-3xl lg:text-[2.4rem]">
              <span className="text-sky-600 font-black">+1500</span> Atividades Lúdicas e Adaptadas para{' '}
              <span className="text-sky-600 font-black">Crianças Autistas</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Economize horas de preparo com atividades prontas, validadas por pedagogos e psicólogos, que estimulam o
              foco, a linguagem, a socialização e o desenvolvimento cognitivo dos seus alunos com TEA.
            </p>
          </div>

          {/* Mockup do Kit Completo sem fundo nenhum */}
          <div className="relative mx-auto mt-8 max-w-3xl px-2 sm:px-4">
            <Image
              src="/images/hero-activities-kit.webp"
              alt="Kit Completo +1500 Atividades para Crianças Autistas"
              width={1024}
              height={682}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_16px_32px_rgba(27,42,74,0.14)]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 800px"
            />
          </div>

          {/* Destaques Rápidos (Compacto, Acima do Botão com Checks 100% Alinhados) */}
          <div className="mx-auto mt-6 max-w-xl px-2 sm:px-0">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
              {heroHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-2xs transition-colors hover:border-slate-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                    <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold leading-tight text-ink sm:text-[13px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Chamada para Ação */}
          <div className="mt-6 flex flex-col items-center gap-3.5">
            <CtaButton href="#kit-description" size="lg" pulse>
              Garantir meu kit com desconto
            </CtaButton>
            <Image
              src="/images/security-badges-dark.webp"
              alt="Compra Segura, Privacidade Protegida, Pagamento Seguro"
              width={280}
              height={42}
              className="h-auto w-52 sm:w-60 object-contain opacity-85"
              loading="lazy"
            />
          </div>
        </div>
        <BottomWaveDivider className="text-slate-50/90 mt-10 md:mt-14" />
      </section>
  );
}
