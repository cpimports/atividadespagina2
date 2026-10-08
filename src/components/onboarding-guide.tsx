"use client";

import { useState } from "react";
import { 
  Printer, 
  Scissors, 
  FolderDown, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Layers,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function OnboardingGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-sky-50 via-white to-blue-50/50 shadow-sm overflow-hidden transition-all duration-300">
      <CardHeader className="p-4 sm:p-6 pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-xl font-bold text-primary">
                  Guia Prático: Como Imprimir e Montar suas Atividades
                </CardTitle>
                <Badge variant="secondary" className="bg-primary/15 text-primary text-xs font-semibold">
                  +1.500 Atividades no Total
                </Badge>
              </div>
              <CardDescription className="text-sm text-foreground/80 mt-1">
                Todas as atividades estão <strong>organizadas e separadas por categorias</strong> aqui na plataforma, e dentro do Google Drive você tem acesso a <strong>+1.500 atividades completas</strong> em PDF prontas para imprimir!
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              {isOpen ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Ocultar Dicas</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Ver Dicas de Impressão</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-4 sm:p-6 pt-0 space-y-4 border-t border-primary/10 mt-3 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Dica 1: Papéis */}
            <div className="bg-white/80 p-4 rounded-xl border border-sky-100 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Printer className="w-4 h-4 text-sky-600" />
                <h4>1. Escolha do Papel Ideal</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • <strong>Para colorir e traçar:</strong> Papel Sulfite comum (75g ou 90g).<br />
                • <strong>Para jogos e tabuleiros:</strong> Papel Offset 180g ou Papel Fotográfico Fosco (maior firmeza nas mãos da criança).
              </p>
            </div>

            {/* Dica 2: Plastificação e Velcro */}
            <div className="bg-white/80 p-4 rounded-xl border border-sky-100 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <Scissors className="w-4 h-4 text-amber-600" />
                <h4>2. Jogos Infinitos com Velcro</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • Plastifique com <strong>Polaseal</strong> ou use <strong>papel contact transparente</strong>.<br />
                • Use <strong>velcro adesivo em moeda (redondinho)</strong> nas peças móveis. A criança adora o som e o tato de colar e descolar!
              </p>
            </div>

            {/* Dica 3: Organização */}
            <div className="bg-white/80 p-4 rounded-xl border border-sky-100 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h4>3. Acervo Organizado & Separado</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                • Todas as <strong>+1.500 atividades</strong> estão divididas por temas pedagógicos.<br />
                • Navegue pelas abas ou acesse as pastas correspondentes diretamente no Google Drive.
              </p>
            </div>
          </div>

          {/* Banner Drive Raiz */}
          <div className="bg-primary/10 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <FolderDown className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary">
                  Acesso Completo ao Acervo (+1.500 Atividades em PDF)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Arquivos organizados e separados por pastas no Google Drive com download ilimitado.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              asChild
              className="text-xs shrink-0 w-full sm:w-auto shadow-xs font-semibold"
            >
              <a
                href="https://drive.google.com/drive/u/2/folders/1gJc4ZMGqTSQuF9GMj4zc-gSaoUgFhVbp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FolderDown className="w-4 h-4 mr-1.5" />
                Abrir Pasta Geral (+1.500)
              </a>
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
