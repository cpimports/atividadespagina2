"use client";

import Image from "next/image";
import { Sparkles, ShieldCheck, FolderDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

interface MemberHeaderProps {
  totalActivities?: number;
}

export function MemberHeader({ totalActivities }: MemberHeaderProps) {
  return (
    <header className="w-full bg-card/95 backdrop-blur-md border border-border shadow-sm rounded-2xl sticky top-2 z-40">
      <div className="px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="https://i.imgur.com/29Kp6BM.png"
            alt="Gêniozinho em Ação Logo"
            width={44}
            height={44}
            className="w-10 h-10 object-contain"
            unoptimized
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary tracking-tight">
                Gêniozinho em Ação
              </span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300 text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Membro VIP
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Portal Exclusivo de Materiais Educativos
            </p>
          </div>
        </div>


      </div>
    </header>
  );
}
