'use client';

import { useState, useEffect, useRef } from 'react';
import { useSharedCounter } from '@/hooks/useSharedCounter';
import { cn } from '@/lib/utils';

const DynamicCounterBanner = () => {
  const count = useSharedCounter();
  const [isBumping, setIsBumping] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsBumping(true);
    const timer = setTimeout(() => setIsBumping(false), 700);
    return () => clearTimeout(timer);
  }, [count]);

  const formattedCount = new Intl.NumberFormat('pt-BR').format(count);

  return (
    <div className="mx-auto inline-flex items-center gap-3 sm:gap-3.5 rounded-2xl sm:rounded-full border border-slate-200/90 bg-white/95 px-5 sm:px-6 py-2.5 sm:py-3 shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
      {/* Ponto sutil de atividade ao vivo */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>

      <div className="text-left leading-tight sm:leading-snug">
        <p className="font-display text-base sm:text-lg md:text-xl font-black text-ink">
          <span
            className={cn(
              'inline-block transition-all duration-300',
              isBumping && 'scale-115 text-emerald-600',
            )}
          >
            {formattedCount}
          </span>{' '}
          professores
        </p>
        <p className="text-xs sm:text-sm font-semibold text-ink-soft">
          já usam o Gêniozinho em Ação!
        </p>
      </div>
    </div>
  );
};

export default DynamicCounterBanner;
