import type {Metadata} from 'next';
import { Inter, Alegreya, Nunito } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import SocialProofNotification from '@/components/shared/SocialProofNotification';
import UTMHandler from '@/components/shared/UTMHandler';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800', '900'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.geniozinhoemacao.com.br'),
  title: 'Gêniozinho em Ação - Atividades Educativas para Crianças',
  description: 'Kit completo de atividades educativas e interativas, prontas para aplicar em casa ou na escola, e transformar a rotina de aprendizado de crianças com estilos únicos de aprendizagem e atenção.',
  alternates: {
    canonical: 'https://www.geniozinhoemacao.com.br/oferta',
  },
  openGraph: {
    title: 'Gêniozinho em Ação - Atividades Educativas para Crianças',
    description: 'Kit completo de atividades educativas e interativas, prontas para aplicar em casa ou na escola.',
    url: 'https://www.geniozinhoemacao.com.br/oferta',
    siteName: 'Gêniozinho em Ação',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${alegreya.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect e DNS-Prefetch do domínio de checkout para carregamento imediato */}
        <link rel="preconnect" href="https://loja.geniozinhoemacao.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://loja.geniozinhoemacao.com.br" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.utmify.com.br" />

        {/* Pré-carregamento dos elementos visuais críticos acima da dobra */}
        <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/hero-activities-kit.webp" as="image" type="image/webp" />

        {/* UTMify Pixel Loader */}
        <Script id="utmify-pixel-loader" strategy="lazyOnload">
        {`
          window.pixelId = "689374be46b9142a86a43379";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
        </Script>
      </head>
      <body className="font-body antialiased">
        
        <AnnouncementBar />
        {children}
        <Toaster />
        <SocialProofNotification />
        {/* Configurado para capturar UTMs tanto da página principal quanto da página de oferta */}
        <UTMHandler checkoutDomains={["pay.cakto.com.br", "loja.geniozinhoemacao.com.br"]} />
        
        {/* InitiateCheckout Event Script for UTMify & Ultra-Fast Checkout Navigation */}
        <Script id="initiate-checkout-tracker" strategy="lazyOnload">
          {`
            (function() {
              const defaultCheckout = "https://loja.geniozinhoemacao.com.br/checkout/v4/WbE0rP04SZDO0RPFaY8D";

              function prefetchCheckout(url) {
                if (window._checkoutPrefetched) return;
                window._checkoutPrefetched = true;
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = url || defaultCheckout;
                document.head.appendChild(link);
              }

              // Inicia conexão assim que o usuário aproxima o mouse ou toca na tela
              document.addEventListener('mouseover', function(e) {
                const btn = e.target && e.target.closest('#btn-comprar, a[href*="loja.geniozinhoemacao.com.br"]');
                if (btn) prefetchCheckout(btn.href);
              }, { passive: true });

              document.addEventListener('touchstart', function(e) {
                const btn = e.target && e.target.closest('#btn-comprar, a[href*="loja.geniozinhoemacao.com.br"]');
                if (btn) prefetchCheckout(btn.href);
              }, { passive: true });

              // Clique no botão de compra: resposta imediata
              document.addEventListener('click', function(e) {
                const checkoutButton = e.target && e.target.closest('#btn-comprar, a[href*="loja.geniozinhoemacao.com.br"]');
                if (checkoutButton) {
                  e.preventDefault();

                  // Resposta visual imediata ao clique
                  checkoutButton.style.opacity = '0.85';
                  checkoutButton.style.pointerEvents = 'none';

                  // Dispara o tracking sem travar o usuário
                  if (window.utmify_pixel && typeof window.utmify_pixel.track === 'function') {
                    try {
                      window.utmify_pixel.track('InitiateCheckout');
                    } catch (_) {}
                  }

                  const finalUrl = checkoutButton.href || defaultCheckout;

                  // Navegação rápida sem delay perceptível (40ms para envio assíncrono seguro)
                  setTimeout(() => {
                    window.location.href = finalUrl;
                  }, 40);
                }
              }, true);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
