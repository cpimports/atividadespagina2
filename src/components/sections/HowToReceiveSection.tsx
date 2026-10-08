import { CreditCard, Printer, Sparkles } from 'lucide-react';
import { SectionHeading, BottomWaveDivider } from '@/components/landing/ui';

const steps = [
  {
    icon: CreditCard,
    title: 'Adquira seu pacote',
    description: 'Realize o pagamento e receba o acesso à nossa plataforma exclusiva com todo o material organizado.',
  },
  {
    icon: Printer,
    title: 'Acesse e imprima quando quiser',
    description: 'Baixe e imprima as atividades quando e quantas vezes precisar.',
  },
  {
    icon: Sparkles,
    title: 'Aplique com seus alunos',
    description: 'Use as atividades em sala de aula e torne o aprendizado mais prático, inclusivo e divertido.',
  },
];

export default function HowToReceiveSection() {
  return (
    <section id="how-to-receive" className="bg-white pt-16 md:pt-24 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Veja como receber seu material" />
        <ol className="relative mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {/* linha tracejada ligando os passos (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-ink/20 md:block"
          />
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-marker font-display text-2xl font-black text-ink shadow-[0_4px_0_0_#1B2A4A]">
                {index + 1}
              </span>
              <div className="w-full flex-1 rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-md">
                <Icon className="mx-auto mb-3 h-7 w-7 text-sky-600" aria-hidden="true" />
                <h3 className="mb-2 font-display text-lg font-extrabold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <BottomWaveDivider className="text-slate-50/90 mt-12 md:mt-16" flip />
    </section>
  );
}
