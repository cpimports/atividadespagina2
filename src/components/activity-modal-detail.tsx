"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity } from '@/lib/types';
import { useGeniozinho } from '@/context/geniozinho-context';
import { 
  Heart, 
  Download, 
  Printer, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award,
  Layers,
  BookOpen
} from 'lucide-react';
import { PrintPreviewModal } from './print-preview-modal';

interface ActivityModalDetailProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityModalDetail({ activity, isOpen, onClose }: ActivityModalDetailProps) {
  const { toggleFavorite, isFavorite, recordView } = useGeniozinho();
  const [showPrintModal, setShowPrintModal] = useState(false);

  if (!activity) return null;

  const isFav = isFavorite(activity.id);

  const handleDownload = () => {
    recordView(activity);
    window.open(activity.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPrintPreview = () => {
    recordView(activity);
    setShowPrintModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl bg-white p-0 rounded-2xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Header Banner com Imagem & Título */}
          <div className="relative bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 p-6 text-white shrink-0">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white/30 shrink-0 bg-white">
                <img
                  src={activity.thumbnailUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs backdrop-blur-sm">
                    {activity.category}
                  </Badge>
                  {activity.isNew && (
                    <Badge className="bg-amber-400 text-slate-900 border-0 text-xs font-bold">
                      ✨ NOVIDADE
                    </Badge>
                  )}
                  {activity.isPopular && (
                    <Badge className="bg-rose-500 text-white border-0 text-xs font-medium">
                      🔥 MAIS ACESSADO
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {activity.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-3 text-xs text-sky-100">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {activity.ageRange}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Nível: {activity.level}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Tipo: {activity.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Pedagógico Detalhado */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
            {/* Metadados / Tags Rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Faixa Etária</p>
                <p className="text-sm font-bold text-slate-800">{activity.ageRange}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Dificuldade</p>
                <p className="text-sm font-bold text-slate-800">{activity.level}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Formato</p>
                <p className="text-sm font-bold text-slate-800">{activity.type}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Público</p>
                <p className="text-sm font-bold text-sky-600 truncate">
                  {activity.targetAudience.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>

            {/* Habilidades Trabalhadas */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Habilidades em Destaque
              </h4>
              <div className="flex flex-wrap gap-2">
                {activity.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-semibold rounded-full border border-sky-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 1. Objetivo Pedagógico */}
            <div className="space-y-1.5 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Objetivo Pedagógico (Alinhado à BNCC)
              </h4>
              <p className="text-sm text-emerald-950 leading-relaxed">
                {activity.pedagogicalObjective}
              </p>
            </div>

            {/* 2. Descrição */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sobre este material
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* 3. Como Utilizar (Guia para Professora / Mediadora de AEE) */}
            <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                Como Utilizar (Passo a Passo Inclusivo para AEE)
              </h4>
              <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed pl-1">
                {activity.howToUse}
              </div>
            </div>

            {/* 4. Materiais Necessários */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Materiais Necessários
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                {activity.materialsNeeded.map((mat, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Fixo com Botão Grande de Baixar/Imprimir */}
          <div className="border-t p-4 sm:p-5 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
            <Button
              variant="outline"
              onClick={() => toggleFavorite(activity.id)}
              className={`flex items-center gap-2 w-full sm:w-auto transition-all ${
                isFav 
                  ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFav ? 'Salvo nos Favoritos' : 'Favoritar'}</span>
            </Button>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleOpenPrintPreview}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border-slate-300 text-slate-700 hover:bg-white"
              >
                <Printer className="w-4 h-4" />
                <span>Visualizar Folha</span>
              </Button>

              <Button
                onClick={handleDownload}
                className="flex-1 sm:flex-initial bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>📥 Baixar / Imprimir PDF</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Impressão */}
      <PrintPreviewModal
        activity={activity}
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
      />
    </>
  );
}
