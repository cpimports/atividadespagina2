"use client";

import React from 'react';
import { Activity } from '@/lib/types';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Heart, Eye, Download, Users, Sparkles, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActivityCardEnhancedProps {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

export function ActivityCardEnhanced({ activity, onSelect }: ActivityCardEnhancedProps) {
  const { toggleFavorite, isFavorite, recordView } = useGeniozinho();
  const isFav = isFavorite(activity.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(activity.id);
  };

  const handleCardClick = () => {
    recordView(activity);
    onSelect(activity);
  };

  const handleDirectDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordView(activity);
    window.open(activity.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Imagem / Thumbnail com Badges e Botão Favoritar */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={activity.thumbnailUrl}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradiente sutil para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges de Destaque no Topo Esquerdo */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
          {activity.isNew && (
            <Badge className="bg-amber-400 text-slate-900 border-0 text-[10px] font-bold shadow-sm">
              ✨ NOVO
            </Badge>
          )}
          {activity.isPopular && (
            <Badge className="bg-rose-500 text-white border-0 text-[10px] font-semibold shadow-sm">
              🔥 POPULAR
            </Badge>
          )}
          <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 border-0 text-[10px] font-medium shadow-sm">
            {activity.category}
          </Badge>
        </div>

        {/* Botão de Favoritar no Topo Direito */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
            isFav
              ? 'bg-rose-50 text-rose-500 shadow-rose-200 ring-2 ring-rose-300'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Ação rápida ao passar o mouse */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Button
            size="sm"
            onClick={handleDirectDownload}
            className="flex-1 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-md backdrop-blur-sm h-8"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-sky-600" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Habilidades Principais */}
          <div className="flex flex-wrap gap-1 mb-1.5">
            {activity.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100"
              >
                {skill}
              </span>
            ))}
            {activity.skills.length > 2 && (
              <span className="text-[10px] text-slate-400 px-1 py-0.5">
                +{activity.skills.length - 2}
              </span>
            )}
          </div>

          {/* Nome da Atividade */}
          <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-sky-600 transition-colors">
            {activity.title}
          </h3>
        </div>

        {/* Informações de Idade, Nível e Formato */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-600">
            <Users className="w-3 h-3 text-slate-400" />
            {activity.ageRange}
          </span>
          <span className="text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
            {activity.level}
          </span>
        </div>

        {/* Botão Ver Atividade */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-50 font-semibold h-8 rounded-lg flex items-center justify-center gap-1 mt-1 border border-sky-100/60"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ver atividade</span>
        </Button>
      </div>
    </div>
  );
}
