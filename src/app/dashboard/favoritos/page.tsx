"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Activity } from '@/lib/types';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

export default function FavoritosPage() {
  const { activities, favorites } = useGeniozinho();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Atividades favoritadas
  const favoriteActivities = activities.filter((act) => favorites.includes(act.id));

  return (
    <div className="space-y-8">
      {/* Top Banner de Favoritos */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Coleção Pessoal da Professora</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Meus Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Acesse rapidamente os materiais que você mais usa ou quer deixar guardados para as próximas aulas.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-2xl font-extrabold text-rose-600 block">
            {favoriteActivities.length}
          </span>
          <span className="text-xs text-slate-400 font-medium">materiais salvos</span>
        </div>
      </div>

      {/* Grade de Atividades Favoritas */}
      {favoriteActivities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteActivities.map((activity) => (
            <ActivityCardEnhanced
              key={activity.id}
              activity={activity}
              onSelect={(act) => setSelectedActivity(act)}
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-md mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-3xl">
            ❤️
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Você ainda não favoritou nenhuma atividade
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore a biblioteca e clique no coração dos cards para guardar seus materiais favoritos aqui.
            </p>
          </div>
          <Link href="/dashboard/biblioteca" className="inline-block pt-2">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl">
              Explorar Biblioteca de Atividades →
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
