'use client';

import { useEffect } from 'react';

interface UTMHandlerProps {
  checkoutDomains: string[];
}

/**
 * Captura os parâmetros UTM da URL e armazena no localStorage para persistência.
 */
function translateAndStoreUtms() {
  try {
    const currentParams = new URLSearchParams(window.location.search);

    if (currentParams.toString()) {
      localStorage.setItem('utms', currentParams.toString());
    }
  } catch (error) {
    console.error("Erro ao capturar ou salvar UTMs:", error);
  }
}

/**
 * Anexa os UTMs armazenados a todos os links de checkout que correspondam aos domínios configurados.
 */
function attachUtmsToCheckoutLinks(checkoutDomains: string[]) {
  try {
    const storedUtms = localStorage.getItem('utms');

    if (storedUtms) {
      // Percorre cada domínio configurado (ex: pay.cakto.com.br, loja.geniozinhoemacao.com.br)
      checkoutDomains.forEach(domain => {
        const checkoutLinks = document.querySelectorAll<HTMLAnchorElement>(`a[href*='${domain}']`);

        checkoutLinks.forEach(link => {
          // Evita adicionar parâmetros duplicados se já existirem no link
          if (link.href.includes('utm_source')) {
            return;
          }

          const separator = link.href.includes("?") ? "&" : "?";
          link.href = `${link.href}${separator}${storedUtms}`;
        });
      });
    }
  } catch (error) {
    console.error("Erro ao anexar UTMs aos links:", error);
  }
}

export default function UTMHandler({ checkoutDomains }: UTMHandlerProps) {
  useEffect(() => {
    // 1. Captura e armazena os UTMs
    translateAndStoreUtms();

    // 2. Anexa os UTMs salvos aos links e observa mudanças dinâmicas na página com debounce
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const debouncedAttach = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        attachUtmsToCheckoutLinks(checkoutDomains);
      }, 150);
    };

    attachUtmsToCheckoutLinks(checkoutDomains);

    const observer = new MutationObserver(debouncedAttach);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };

  }, [checkoutDomains]);

  return null;
}
