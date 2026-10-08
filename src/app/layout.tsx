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
  title: 'Gêniozinho em Ação - Atividades Educativas para Crianças',
  description: 'Kit completo de atividades educativas e interativas, prontas para aplicar em casa ou na escola, e transformar a rotina de aprendizado de crianças com estilos únicos de aprendizagem e atenção.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${alegreya.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" href="https://scripts.converteai.net/f304b502-422a-4d15-8f6c-5e42de7baf1b/players/68a677e85a4844a26844462d/v4/embed.html" />
        <script dangerouslySetInnerHTML={{ __html: `!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);` }} />
        <link rel="preload" href="https://scripts.converteai.net/f304b502-422a-4d15-8f6c-5e42de7baf1b/players/68a677e85a4844a26844462d/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preload" href="https://cdn.converteai.net/f304b502-422a-4d15-8f6c-5e42de7baf1b/68a677ca758079d62739838e/main.m3u8" as="fetch" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
        
        {/* Preconnect to critical third-party origins */}
        <link rel="preload" href="/images/logo.webp" as="image" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <link rel="preconnect" href="https://scripts.converteai.net" />

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
        
        {/* InitiateCheckout Event Script for UTMify */}
        <Script id="initiate-checkout-tracker" strategy="lazyOnload">
          {`
            document.addEventListener('click', function(e) {
              const checkoutButton = e.target && e.target.closest('#btn-comprar');
              if (checkoutButton) {
                e.preventDefault(); // Stop the default link navigation

                // Track the event with UTMify
                if (window.utmify_pixel && typeof window.utmify_pixel.track === 'function') {
                  window.utmify_pixel.track('InitiateCheckout');
                }

                const finalUrl = checkoutButton.href;

                // Redirect manually after a short delay to ensure the tracking event is sent
                setTimeout(() => {
                  window.location.href = finalUrl;
                }, 500); // 500ms delay
              }
            }, true);
          `}
        </Script>
      </body>
    </html>
  );
}
