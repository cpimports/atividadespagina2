
'use client';

import { useEffect, useState, useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';
import { incrementCount } from '@/hooks/useSharedCounter';

const buyers = [
    { name: 'Nicole', location: 'São Paulo, SP' },
    { name: 'Lucas', location: 'Rio de Janeiro, RJ' },
    { name: 'Fernanda', location: 'Belo Horizonte, MG' },
    { name: 'Rafael', location: 'Curitiba, PR' },
    { name: 'Juliana', location: 'Salvador, BA' },
    { name: 'Carlos', location: 'Fortaleza, CE' },
    { name: 'Ana', location: 'Porto Alegre, RS' },
    { name: 'Pedro', location: 'Recife, PE' },
    { name: 'Beatriz', location: 'Goiânia, GO' },
    { name: 'Thiago', location: 'Brasília, DF' },
];

interface CurrentNotification {
  name: string;
  location: string;
  key: number;
}

export default function SocialProofNotification() {
  const [notification, setNotification] = useState<CurrentNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showRandomNotification = useCallback(() => {
    // This logic now runs only on the client, preventing hydration mismatches
    const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
    setNotification({ ...randomBuyer, key: Date.now() });
    setIsVisible(true);
    incrementCount(); // Incrementa o contador global

    // Fica visível por 6 segundos e depois some suavemente
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  }, []);

  useEffect(() => {
    // Moved the entire timer logic into useEffect to ensure it only runs on the client.
    const initialTimeout = setTimeout(showRandomNotification, 5000);
    const interval = setInterval(showRandomNotification, 16000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showRandomNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div
      key={notification.key}
      className={`fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs px-4 py-2.5 text-ink shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-2xs">
        <ShoppingCart className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs sm:text-sm font-semibold text-ink">
          <span className="font-extrabold">{notification.name}</span> acabou de comprar!
        </p>
        <p className="text-[11px] text-ink-soft">{notification.location} · Agora mesmo</p>
      </div>
    </div>
  );
}
