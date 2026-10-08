"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Activity } from '@/lib/types';
import { Printer, Download, ExternalLink, Check, Sparkles } from 'lucide-react';

interface PrintPreviewModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrintPreviewModal({ activity, isOpen, onClose }: PrintPreviewModalProps) {
  if (!activity) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenDrive = () => {
    window.open(activity.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2 text-sky-600 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Visualização de Impressão Pedagógica</span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {activity.title}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Pronto para impressão em formato A4. Use a impressora ou baixe o arquivo em PDF para suas aulas.
          </DialogDescription>
        </DialogHeader>

        {/* Simulador da Folha A4 Pedagógica */}
        <div className="my-4 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl space-y-4 shadow-inner text-slate-800">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <p className="text-xs font-bold text-sky-700 uppercase">Gêniozinho em Ação • Recurso Pedagógico</p>
              <h3 className="text-lg font-bold text-slate-900">{activity.title}</h3>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Turma / Aluno: _____________________</p>
              <p>Data: _____/_____/2026</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg border border-slate-100">
            <div className="w-40 h-40 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
              <img
                src={activity.thumbnailUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-700">Objetivo:</strong> {activity.pedagogicalObjective}</p>
              <p><strong className="text-slate-700">Habilidades:</strong> {activity.skillsWorked}</p>
              <p><strong className="text-slate-700">Faixa Etária:</strong> {activity.ageRange} | <strong className="text-slate-700">Nível:</strong> {activity.level}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {activity.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded text-[10px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-sky-50/70 p-3 rounded-lg border border-sky-100 text-xs text-sky-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-sky-600" />
              Orientações para a Professora / Mediadora de AEE:
            </p>
            <p className="text-slate-600 pl-5 whitespace-pre-line leading-relaxed">
              {activity.howToUse}
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t">
          <Button
            variant="outline"
            onClick={handleOpenDrive}
            className="flex items-center gap-2 border-sky-200 text-sky-700 hover:bg-sky-50"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir Pasta Completa no Google Drive</span>
          </Button>

          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2 border-slate-200 hover:bg-slate-100 text-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir (A4)</span>
          </Button>

          <Button
            onClick={handleOpenDrive}
            className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 shadow-md shadow-sky-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Baixar em PDF</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
