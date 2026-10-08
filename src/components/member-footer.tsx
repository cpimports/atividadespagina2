"use client";

import Image from "next/image";
import { Heart, ShieldCheck, Lock } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export function MemberFooter() {
  return (
    <footer className="w-full bg-card border-t border-border mt-12 py-8 text-muted-foreground">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/60">
          {/* Brand */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <Image
              src="https://i.imgur.com/29Kp6BM.png"
              alt="Gêniozinho em Ação Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain mx-auto md:mx-0"
              unoptimized
            />
            <div>
              <p className="font-bold text-foreground text-sm">Gêniozinho em Ação</p>
              <p className="text-xs text-muted-foreground">Um mundo onde brincar ensina e aprender encanta!</p>
            </div>
          </div>

          {/* Badges / Guarantees */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ambiente 100% Seguro</span>
            </div>
            <div className="flex items-center gap-1 text-sky-700 font-medium">
              <Lock className="w-4 h-4 text-sky-600" />
              <span>Acesso Exclusivo para Membros</span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
          <p className="max-w-xl text-[11px] leading-relaxed">
            ⚠️ <strong>Aviso Legal:</strong> Este material digital é de uso exclusivo pessoal e escolar do comprador. É expressamente proibida a reprodução para fins comerciais, revenda ou compartilhamento público.
          </p>
          <p className="text-[11px] shrink-0">
            © {new Date().getFullYear()} Gêniozinho em Ação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
