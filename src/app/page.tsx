
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OfertaPage from './oferta/page';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      const search = window.location.search || '';
      router.replace(`/oferta${search}`);
    }
  }, [router]);

  return <OfertaPage />;
}
