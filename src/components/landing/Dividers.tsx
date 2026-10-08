import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  flip?: boolean;
}

/**
 * Onda suave no rodapé da seção, preenchendo a transição para a próxima seção.
 */
export function BottomWaveDivider({ className, flip = false }: DividerProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        preserveAspectRatio="none"
        className={cn('w-full h-8 sm:h-11 md:h-14 block', flip && '-scale-x-100')}
      >
        <path
          d="M0,26 C320,56 760,4 1120,34 C1260,46 1360,36 1440,22 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Onda dupla de alta elegância com camada de transparência suave.
 */
export function BottomLayeredWaveDivider({ className, flip = false }: DividerProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 68"
        fill="none"
        preserveAspectRatio="none"
        className={cn('w-full h-9 sm:h-12 md:h-16 block', flip && '-scale-x-100')}
      >
        {/* Camada translúcida sutil de profundidade */}
        <path
          d="M0,22 C340,60 800,8 1160,40 C1280,50 1370,38 1440,26 L1440,68 L0,68 Z"
          fill="currentColor"
          opacity="0.32"
        />
        {/* Onda principal sólida */}
        <path
          d="M0,34 C380,12 860,56 1200,26 C1300,18 1380,24 1440,32 L1440,68 L0,68 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Curva suave e minimalista no rodapé da seção.
 */
export function BottomCurveDivider({
  className,
  inverted = false,
}: DividerProps & { inverted?: boolean }) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden leading-none pointer-events-none select-none -mb-[1px]',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-10 md:h-12 block"
      >
        <path
          d={
            inverted
              ? 'M0,48 Q720,0 1440,48 L1440,48 L0,48 Z'
              : 'M0,10 Q720,48 1440,10 L1440,48 L0,48 Z'
          }
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
