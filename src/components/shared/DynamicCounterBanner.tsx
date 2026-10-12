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
    <div className="mx-auto inline-flex items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-full border border-blue-400/25 bg-gradient-to-r from-[#0c182e] via-[#142344] to-[#0c182e] px-5 sm:px-7 py-2.5 sm:py-3 shadow-xl shadow-blue-950/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 hover:scale-[1.02]">
      {/* Ponto sutil de atividade ao vivo */}
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white/20 shadow-xs" />
      </span>

      <div className="text-left leading-tight sm:leading-snug">
        <p className="font-display text-base sm:text-lg md:text-xl font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          <span
            className={cn(
              'inline-block transition-all duration-300 font-black text-amber-300',
              isBumping && 'scale-115 text-yellow-200',
            )}
          >
            {formattedCount}
          </span>{' '}
          professores
        </p>
        <p className="text-xs sm:text-sm font-semibold text-blue-100/85">
          já usam o Gêniozinho em Ação!
        </p>
      </div>
    </div>
  );
};

export default DynamicCounterBanner;
