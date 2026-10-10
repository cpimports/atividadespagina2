import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Lock, CreditCard, Check, Gift, Zap, Clock } from 'lucide-react';
import { CtaButton, SectionHeading, BottomWaveDivider } from '@/components/landing/ui';
import ScarcityBar from '@/components/landing/ScarcityBar';

interface OfferSectionProps {
  price?: string;
  installmentText?: string;
  checkoutUrl?: string;
}

const mainItems = [
  '+1500 Atividades Lúdicas e Adaptadas para Autistas',
  'Acesso Imediato e Vitalício à Plataforma com todo Material',
  'Tranquilidade e Suporte para Você',
];

const bonusItems = [
  'Mega Pacote de +1000 Moldes de EVA',
  'Kit de Medalhas de Reconhecimento',
  '+10 Jogos Inclusivos e Testados',
  'Guia de Adaptação de Atividades para Autistas',
];

const lastBenefit = '+ 8 SUPER BÔNUS';

const secureItems = [
  { icon: ShieldCheck, label: 'Compra Segura' },
  { icon: Lock, label: 'Privacidade' },
  { icon: CreditCard, label: 'Pagamento' },
];

const AnimatedClock = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Caixa externa do relógio fixa */}
    <circle cx="12" cy="12" r="9.5" />
    {/* Eixo central fixo */}
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    {/* Ponteiro das horas */}
    <line
      x1="12"
      y1="12"
      x2="12"
      y2="7.5"
      strokeWidth="2.2"
      className="[transform-origin:12px_12px] animate-[spin_12s_linear_infinite]"
    />
    {/* Ponteiro dos minutos girando no sentido horário */}
    <line
      x1="12"
      y1="12"
      x2="12"
      y2="5"
      strokeWidth="1.8"
      className="[transform-origin:12px_12px] animate-[spin_3s_linear_infinite]"
    />
  </svg>
);

export default function OfferSection({
  price = '19,75',
  installmentText = 'ou 4x de R$5,73',
  checkoutUrl = 'https://loja.geniozinhoemacao.com.br/checkout/v4/WbE0rP04SZDO0RPFaY8D',
}: OfferSectionProps) {
  return (
    <section id="oferta-especial" className="bg-paper-grid pt-16 md:pt-24 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <span className="flex flex-col items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-coral/30 bg-coral/10 px-4 py-1.5 text-sm font-black uppercase tracking-wider text-coral shadow-2xs sm:px-5 sm:py-2 sm:text-base md:text-lg">
                <AnimatedClock className="h-5 w-5 shrink-0 text-coral sm:h-6 sm:w-6" />
                Última Chance
              </span>
              <span className="text-xl font-extrabold leading-snug text-ink sm:text-2xl md:text-[1.75rem]">
                Condição Especial por Tempo Limitado
              </span>
            </span>
          }
        />

        {/* Card Escuro Unificado Premium */}
        <div className="relative mx-auto mt-6 max-w-5xl overflow-hidden rounded-[2.5rem] border-2 border-marker/40 bg-ink shadow-[0_20px_50px_rgba(27,42,74,0.35)]">


          <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12">
            {/* Lado Esquerdo: O que está incluso (Design Dark Premium) */}
            <div className="lg:col-span-7">
              {/* Header do Produto */}
              <div className="flex flex-col items-center border-b border-white/10 pb-6 text-center">
                <div className="relative mb-3.5 overflow-hidden rounded-2xl border-2 border-white/20 bg-white/10 p-2.5 shadow-lg">
                  <Image
                    src="/images/offer-mockup.webp"
                    alt="Kit de Atividades para Autistas + Bônus"
                    width={110}
                    height={85}
                    className="h-auto w-24 object-contain drop-shadow-lg sm:w-28"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-2xl font-black leading-tight tracking-tight text-marker drop-shadow-[0_2px_12px_rgba(250,204,21,0.3)] sm:text-3xl md:text-[1.95rem]">
                  Kit de Atividades para Autistas + Bônus
                </h3>
              </div>

              {/* Itens Principais Unificados em Bloco Único */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <ul className="divide-y divide-white/10">
                  {mainItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                        <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold leading-snug text-slate-100 sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caixa de Bônus em Destaque Dourado */}
              <div className="mt-6 rounded-2xl border-2 border-marker/40 bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent p-4 sm:p-5 backdrop-blur-xs">
                <div className="flex items-center justify-center gap-2 border-b border-white/10 pb-3 text-center">
                  <Gift className="h-4 w-4 text-marker" aria-hidden="true" />
                  <span className="text-xs font-black uppercase tracking-wider text-marker">
                    Super Bônus Inclusos
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {bonusItems.map((item, i) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-200 sm:text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-marker/30 bg-marker/20 font-mono text-[11px] font-black text-marker">
                        {i + 1}
                      </span>
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3.5 border-t border-white/10 pt-3 text-center">
                  <p className="font-display text-xs font-black uppercase tracking-wide text-coral sm:text-sm">
                    🎁 {lastBenefit} LIBERADOS SOMENTE HOJE!
                  </p>
                </div>
              </div>
            </div>

            {/* Lado Direito: Caixa de Preço e Fechamento */}
            <div className="flex flex-col justify-center rounded-3xl border border-white/15 bg-white/5 p-6 text-center shadow-inner sm:p-8 lg:col-span-5">
              <span className="mb-4 inline-block self-center rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                Acesso Completo
              </span>
              <p className="text-sm font-semibold text-slate-400 line-through sm:text-base">
                De R$ 97,00 por apenas
              </p>
              <div className="mt-2 flex items-baseline justify-center gap-1 font-display">
                <span className="text-2xl font-black text-marker sm:text-3xl">R$</span>
                <span className="text-6xl font-black leading-none tracking-tight text-marker sm:text-7xl">
                  {price}
                </span>
              </div>
              {installmentText && (
                <p className="mt-2 text-sm font-bold text-slate-200 sm:text-base">
                  {installmentText}
                </p>
              )}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400 sm:text-sm">
                <Zap className="h-4 w-4 fill-emerald-400" aria-hidden="true" />
                Pagamento Único · Acesso Vitalício
              </p>

              <CtaButton
                id="btn-comprar"
                href={checkoutUrl}
                size="lg"
                pulse
                className="mt-6 w-full"
              >
                Garantir meu kit com desconto!
              </CtaButton>

              <div className="mt-6 flex justify-center border-t border-white/10 pt-5">
                <Image
                  src="/images/security-badges.webp"
                  alt="Compra Segura, Privacidade Protegida, Pagamento Seguro"
                  width={280}
                  height={42}
                  className="h-auto w-52 sm:w-60 object-contain opacity-90"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-6 rounded-3xl border-2 border-emerald-300/80 bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/40 p-6 text-center shadow-xl shadow-emerald-600/10 sm:flex-row sm:p-8 sm:text-left">
          <Image
            src="/images/guarantee-seal.webp"
            alt="Selo de Garantia de 7 dias"
            width={120}
            height={120}
            className="h-auto w-24 shrink-0 sm:w-28"
            loading="lazy"
          />
          <div>
            <h3 className="font-display text-xl font-black text-yellow-500 sm:text-2xl">
              Sua Satisfação Garantida ou Seu Dinheiro de Volta!
            </h3>
            <p className="mt-2 text-ink-soft">
              Aproveite a compra sem risco. Se em até 7 dias você sentir que o kit não é para você, devolvemos seu
              dinheiro sem perguntas.
            </p>
          </div>
        </div>

        <ScarcityBar className="mt-12" />
      </div>
      <BottomWaveDivider className="text-slate-50 mt-12 md:mt-16" />
    </section>
  );
}
