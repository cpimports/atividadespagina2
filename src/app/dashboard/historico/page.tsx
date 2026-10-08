"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { History as HistoryIcon, Clock, Trash2, ArrowRight, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Activity } from '@/lib/types';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

export default function HistoricoPage() {
  const { history, clearHistory } = useGeniozinho();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Formatar tempo relativo amigável
  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMin = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMin / 60);

      if (diffMin < 2) return 'Acessado agora mesmo';
      if (diffMin < 60) return `Você acessou há ${diffMin} minutos`;
      if (diffHours < 24) return `Você acessou há ${diffHours} horas`;
      return `Você acessou em ${new Date(isoString).toLocaleDateString('pt-BR')}`;
    } catch {
      return 'Você acessou recentemente';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner de Histórico */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>Memória da sua Navegação</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Histórico de Acesso
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Reencontre rapidamente qualquer material que você abriu ou consultou nas últimas sessões.
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-xs border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            <span>Limpar Histórico</span>
          </Button>
        )}
      </div>

      {/* Lista de Atividades do Histórico em Formato de Timeline */}
      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={`${item.activity.id}-${index}`}
              onClick={() => setSelectedActivity(item.activity)}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={item.activity.thumbnailUrl}
                    alt={item.activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-sky-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(item.viewedAt)}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug">
                    {item.activity.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                    <span>{item.activity.category}</span>
                    <span>•</span>
                    <span>{item.activity.ageRange}</span>
                    <span>•</span>
                    <span>Nível: {item.activity.level}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.activity.pdfUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-xs h-8 rounded-xl border-slate-200"
                >
                  <Download className="w-3.5 h-3.5 mr-1 text-sky-600" />
                  <span>Baixar</span>
                </Button>

                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold h-8 rounded-xl"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  <span>Abrir</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Estado Vazio */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto text-3xl">
            🕘
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Nenhum histórico registrado ainda
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              À medida que você navegar e abrir as atividades da biblioteca, elas aparecerão listadas aqui com a data e hora do seu acesso.
            </p>
          </div>
          <Link href="/dashboard/biblioteca" className="inline-block pt-2">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl">
              Começar a navegar agora →
            </Button>
          </Link>
        </div>
      )}

      {/* Modal Detalhado da Atividade */}
      <ActivityModalDetail
        activity={selectedActivity}
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}
