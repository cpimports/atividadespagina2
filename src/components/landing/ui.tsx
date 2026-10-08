import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Etiqueta pequena acima dos títulos (estilo "post-it"). */
export function Eyebrow({
  children,
  className,
  tone = 'blue',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'yellow' | 'blue' | 'green' | 'coral' | 'dark';
}) {
  const tones = {
    yellow: 'bg-amber-50 text-amber-800 border-amber-200',
    blue: 'bg-sky-100 text-sky-900 border-sky-200',
    green: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    coral: 'bg-rose-100 text-rose-900 border-rose-200',
    dark: 'bg-white/10 text-marker border-white/15',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Cabeçalho padrão de seção. */
export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  subtitle,
  dark = false,
  className,
}: {
  eyebrow?: React.ReactNode;
  eyebrowTone?: 'yellow' | 'blue' | 'green' | 'coral' | 'dark';
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto mb-12 max-w-3xl text-center md:mb-16', className)}>
      {eyebrow && (
        <Eyebrow tone={eyebrowTone ?? (dark ? 'dark' : 'yellow')} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'font-display text-[1.45rem] font-black leading-[1.2] tracking-tight sm:text-2xl md:text-3xl lg:text-[2.4rem]',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-slate-300' : 'text-ink-soft')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Botão de chamada para ação refinado, com proporções confortáveis e texto espaçado sem encostar nas bordas. */
export function CtaButton({
  href,
  children,
  id,
  className,
  size = 'lg',
  pulse = true,
}: {
  href: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  size?: 'md' | 'lg';
  pulse?: boolean;
}) {
  return (
    <Link
      id={id}
      href={href}
      className={cn(
        'group relative overflow-hidden inline-flex items-center justify-center rounded-2xl border-2 border-ink bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-center font-display font-black uppercase tracking-wide text-ink select-none max-w-full',
        'shadow-[0_4px_0_0_#1B2A4A,0_6px_20px_-2px_rgba(250,204,21,0.38)] transition-all duration-300',
        'hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:scale-[0.99] active:shadow-[0_1px_0_0_#1B2A4A]',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300',
        pulse && 'animate-cta-pulse-gentle',
        size === 'lg'
          ? 'min-h-[52px] sm:min-h-[58px] md:min-h-[62px] px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 text-xs min-[360px]:text-[13px] sm:text-base md:text-[1.05rem]'
          : 'min-h-[46px] sm:min-h-[52px] md:min-h-[56px] px-5 sm:px-7 md:px-8 py-3 sm:py-3.5 text-xs min-[360px]:text-[13px] sm:text-sm md:text-base',
        className,
      )}
    >
      {/* Filete superior de luz estilo acabamento premium 3D */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-white/70"
      />

      {/* Feixe dinâmico de brilho que percorre o botão */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full animate-cta-gleam bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      {/* Texto perfeitamente contido, com entrelinha arejada e espaço generoso */}
      <span className="relative z-10 inline-block text-center leading-snug sm:leading-tight max-w-full break-words hyphens-none py-0.5">
        {children}
      </span>
    </Link>
  );
}

export * from './Dividers';
