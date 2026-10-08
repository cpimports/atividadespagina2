"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Activity } from "@/lib/mock-data";
import { FolderDown, Sparkles, CheckCircle } from "lucide-react";

interface ActivityViewModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityViewModal({
  activity,
  isOpen,
  onClose,
}: ActivityViewModalProps) {
  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-border bg-card">
        <DialogHeader className="p-5 pb-3 border-b bg-muted/20">
          <div className="flex items-center justify-between gap-3 pr-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-xs">
                {activity.category}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Arquivo Digital em PDF
              </Badge>
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground mt-2">
            {activity.title}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Material exclusivo pronto para imprimir em folha A4.
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border bg-muted shadow-xs">
            <Image
              unoptimized
              src={activity.thumbnailUrl}
              alt={`Visualização da atividade ${activity.title}`}
              width={800}
              height={500}
              className="w-full h-full object-contain"
              data-ai-hint={activity.aiHint}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-sky-50/50 p-4 rounded-xl border border-sky-100">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-primary">Objetivo Pedagógico</h4>
                <p className="text-xs text-muted-foreground">
                  Desenvolve atenção, coordenação e fixação do aprendizado através do estímulo visual e lúdico.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-700">Como Imprimir</h4>
                <p className="text-xs text-muted-foreground">
                  Recomendado imprimir em folha A4. Para maior durabilidade, sugerimos plastificar e aplicar velcro.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-muted/30 border-t flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="w-full sm:w-auto">
            Fechar
          </Button>

          <Button size="sm" className="w-full sm:w-auto gap-2 font-semibold shadow-xs" asChild>
            <a
              href={activity.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FolderDown className="w-4 h-4" />
              Acessar Arquivos no Google Drive
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
