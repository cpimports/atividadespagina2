'use client';

import { useRef } from 'react';
import { useProgress } from '@/hooks/useProgress';

/** Barra de "kits promocionais vendidos" com título externo limpo e elegante. */
export default function ScarcityBar({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(ref, 87);

  return (
    <div ref={ref} className={`mx-auto max-w-xl ${className}`}>
      {/* Texto de alerta limpo e direto fora do card */}
      <h3 className="mb-3.5 sm:mb-4 text-center font-display text-base sm:text-lg md:text-xl font-extrabold text-ink leading-snug">
        <span className="text-coral">Atenção!</span> Restam poucas vagas <br className="hidden sm:inline" />
        com 80% de desconto + 12 Bônus Inclusos
      </h3>

      {/* Card dedicado para a barra de progresso e métricas em tempo real */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold">
          <span className="flex items-center gap-1.5 text-coral font-black">
            🔥 {Math.floor(progress)}% dos kits vendidos
          </span>
          <span className="font-semibold text-slate-600">
            Últimas unidades com 80% OFF
          </span>
        </div>
        <div
          className="mt-2.5 h-3.5 sm:h-4 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5"
          role="progressbar"
          aria-valuenow={Math.floor(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Kits promocionais vendidos"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-coral shadow-xs transition-[width] duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
