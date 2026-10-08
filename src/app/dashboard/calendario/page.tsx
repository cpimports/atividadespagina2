"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  Clock, 
  BookOpen, 
  Download, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeniozinho } from '@/context/geniozinho-context';
import { CalendarEvent, Activity } from '@/lib/types';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

function CalendarioContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  const { calendarEvents, activities } = useGeniozinho();

  const [selectedMonth, setSelectedMonth] = useState<number>(10); // Outubro default
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(() => {
    if (eventParam) {
      return calendarEvents.find((e) => e.id === eventParam) || calendarEvents[0];
    }
    return calendarEvents[0];
  });
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const months = [
    { num: 8, name: 'Agosto' },
    { num: 9, name: 'Setembro' },
    { num: 10, name: 'Outubro' },
    { num: 11, name: 'Novembro' },
    { num: 12, name: 'Dezembro' },
  ];

  // Atividades ligadas ao evento selecionado
  const relatedActivities = selectedEvent
    ? activities.filter((act) => selectedEvent.relatedActivityIds.includes(act.id))
    : [];

  return (
    <div className="space-y-8">
      {/* Top Header do Calendário */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-sky-600/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Planejamento Pedagógico Antecipado</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Calendário Pedagógico & Datas Especiais
          </h1>

          <p className="text-sm text-sky-100 max-w-xl font-medium">
            Nunca mais seja pega de surpresa. Veja com semanas de antecedência as principais datas do calendário escolar com atividades e recursos já preparados.
          </p>
        </div>

        {/* Seletor de Meses */}
        <div className="flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shrink-0">
          {months.map((m) => (
            <button
              key={m.num}
              onClick={() => setSelectedMonth(m.num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === m.num
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Lista de Eventos do Mês (Esquerda) + Materiais Relacionados (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna 1: Eventos do Calendário (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-sky-600" />
              <span>Datas em Destaque</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Clique para ver os materiais
            </span>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((evt) => {
              const isSelected = selectedEvent?.id === evt.id;

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-200 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 text-slate-800">
                    <span className="text-base font-extrabold leading-none">{evt.day}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {evt.month}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600">
                        {evt.badge}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {evt.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-sky-600">
                      <span>{evt.relatedActivityIds.length} materiais vinculados</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coluna 2: Materiais e Recursos do Evento Selecionado (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedEvent ? (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                    {selectedEvent.date}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedEvent.category}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedEvent.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Atividades Relacionadas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Materiais Prontos para Imprimir para Esta Data</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    {relatedActivities.length} encontrados
                  </span>
                </div>

                {relatedActivities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedActivities.map((act) => (
                      <ActivityCardEnhanced
                        key={act.id}
                        activity={act}
                        onSelect={(item) => setSelectedActivity(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-6 rounded-2xl text-center text-xs text-slate-500 space-y-2">
                    <p>Estamos finalizando novos pacotes temáticos para esta data!</p>
                    <Button
                      onClick={() => window.location.href = '/dashboard/sugestoes'}
                      className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold h-8"
                    >
                      💡 Pedir uma atividade para esta data
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              Selecione uma data no calendário ao lado para visualizar os recursos.
            </div>
          )}
        </div>
      </div>

      {/* Modal Detalhado da Atividade */}
      <ActivityModalDetail
        activity={selectedActivity}
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}

export default function CalendarioPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Carregando calendário...</div>}>
      <CalendarioContent />
    </Suspense>
  );
}

