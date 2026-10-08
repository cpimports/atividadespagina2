"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  Bot, 
  FolderPlus, 
  ArrowRight, 
  Clock, 
  Layers,
  Heart,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Activity } from '@/lib/types';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

export default function NovidadesPage() {
  const { activities } = useGeniozinho();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Atividades novas
  const recentActivities = activities.filter((act) => {
    if (selectedCategory !== 'all' && act.category !== selectedCategory) {
      return false;
    }
    if (timeFilter === 'week') {
      return act.isNew || act.publishedAt?.startsWith('2026-09');
    }
    return true;
  });

  const categories = ['all', 'Novidades', 'Alfabetização', 'Números', 'Atividades sensoriais', 'Jogos Educativos', 'Ensino Completo'];

  return (
    <div className="space-y-8">
      {/* Top Banner de Novidades */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-orange-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lançamentos Contínuos Toda Semana</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            A plataforma está sempre crescendo.
          </h1>

          <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-medium">
            Toda semana nossa equipe pedagógica e de designers desenha e adiciona dezenas de novos recursos adaptados para você nunca ficar sem opções na sala de aula.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
            <span className="bg-white/25 px-3 py-1 rounded-xl">✨ 32 novos materiais esta semana</span>
            <span className="bg-white/25 px-3 py-1 rounded-xl">📦 6 novas coleções temáticas</span>
            <span className="bg-white/25 px-3 py-1 rounded-xl">🤖 5 ferramentas de IA ativas</span>
          </div>
        </div>
      </div>

      {/* Destaque das Novidades da Plataforma (recursos e coleções) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FolderPlus className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <Badge className="bg-amber-100 text-amber-800 border-0 text-[10px] font-bold">
              COLEÇÃO NOVA
            </Badge>
            <h3 className="font-bold text-slate-800 text-sm">
              Ciências Adaptadas para Autismo
            </h3>
            <p className="text-xs text-slate-500 leading-snug">
              Pranchas sobre corpo humano, animais e plantas com comandos visuais diretos.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <Badge className="bg-sky-100 text-sky-800 border-0 text-[10px] font-bold">
              NOVA FERRAMENTA
            </Badge>
            <h3 className="font-bold text-slate-800 text-sm">
              Adaptador de Atividades AEE com IA
            </h3>
            <p className="text-xs text-slate-500 leading-snug">
              Transforme qualquer atividade complexa em passos curtos e com apoio visual em 3 segundos.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <Badge className="bg-emerald-100 text-emerald-800 border-0 text-[10px] font-bold">
              KIT SAZONAL
            </Badge>
            <h3 className="font-bold text-slate-800 text-sm">
              Especial Dia dos Professores & Crianças
            </h3>
            <p className="text-xs text-slate-500 leading-snug">
              Moldes de lembrancinhas, cartazes de afeto e medalhas de incentivo infantil.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros de Data e Categoria */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filtro de Período */}
        <div className="flex border border-slate-200 rounded-xl p-1 bg-slate-50 w-full sm:w-auto">
          <button
            onClick={() => setTimeFilter('week')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeFilter === 'week' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Adicionados nesta semana
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeFilter === 'month' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Neste mês
          </button>
          <button
            onClick={() => setTimeFilter('all')}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Todos os recentes
          </button>
        </div>

        {/* Categorias Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grade de Materiais Novos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>🆕 Adicionados recentemente</span>
            <span className="text-xs text-slate-400 font-normal">
              ({recentActivities.length} materiais)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentActivities.map((activity) => (
            <ActivityCardEnhanced
              key={activity.id}
              activity={activity}
              onSelect={(act) => setSelectedActivity(act)}
            />
          ))}
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
