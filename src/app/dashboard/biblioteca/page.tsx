"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  Sparkles, 
  LayoutGrid, 
  List, 
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useGeniozinho } from '@/context/geniozinho-context';
import { 
  Activity, 
  ActivitySkill, 
  TargetAudience, 
  AgeRange, 
  ActivityLevel, 
  ActivityType 
} from '@/lib/types';
import { 
  SKILLS_LIST, 
  TARGET_AUDIENCES_LIST, 
  AGE_RANGES_LIST, 
  LEVELS_LIST, 
  TYPES_LIST 
} from '@/lib/mock-data';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

function BibliotecaContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'recent';

  const { activities } = useGeniozinho();

  // Estados dos filtros
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>(initialSort === 'popular' ? 'popular' : 'recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSkill('all');
    setSelectedAudience('all');
    setSelectedAge('all');
    setSelectedLevel('all');
    setSelectedType('all');
    setSortBy('recent');
  };

  const activeFiltersCount = [
    selectedSkill !== 'all',
    selectedAudience !== 'all',
    selectedAge !== 'all',
    selectedLevel !== 'all',
    selectedType !== 'all',
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  // Filtragem e ordenação
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // 1. Busca por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = activity.title.toLowerCase().includes(q);
        const matchDesc = activity.description?.toLowerCase().includes(q);
        const matchCategory = activity.category.toLowerCase().includes(q);
        const matchSkills = activity.skills.some((s) => s.toLowerCase().includes(q));
        const matchTags = activity.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCategory && !matchSkills && !matchTags) {
          return false;
        }
      }

      // 2. Habilidade
      if (selectedSkill !== 'all') {
        if (!activity.skills.includes(selectedSkill as ActivitySkill)) {
          return false;
        }
      }

      // 3. Público
      if (selectedAudience !== 'all') {
        if (!activity.targetAudience.includes(selectedAudience as TargetAudience)) {
          return false;
        }
      }

      // 4. Idade
      if (selectedAge !== 'all') {
        if (activity.ageRange !== selectedAge) {
          return false;
        }
      }

      // 5. Nível
      if (selectedLevel !== 'all') {
        if (activity.level !== selectedLevel) {
          return false;
        }
      }

      // 6. Tipo
      if (selectedType !== 'all') {
        if (activity.type !== selectedType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.accessCount || 0) - (a.accessCount || 0);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      // default: recent
      return (b.publishedAt || '').localeCompare(a.publishedAt || '');
    });
  }, [
    activities,
    searchQuery,
    selectedSkill,
    selectedAudience,
    selectedAge,
    selectedLevel,
    selectedType,
    sortBy,
  ]);

  return (
    <div className="space-y-6">
      {/* Top Header da Biblioteca */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca Completa & Organizada</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Biblioteca de Atividades
          </h1>
          <p className="text-sm text-slate-500">
            Encontre rapidamente o material que você precisa para sua rotina na sala regular ou no AEE.
          </p>
        </div>

        {/* Barra de Busca Principal */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por nome, habilidade (ex: atenção, pareamento), tema..."
            className="pl-11 pr-10 h-12 bg-slate-50 border-slate-200 text-sm rounded-2xl focus-visible:ring-sky-500 focus-visible:bg-white transition-all w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros em linha no Desktop */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Filtros Rápidos</span>
              {activeFiltersCount > 0 && (
                <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-[10px]">
                  {activeFiltersCount} ativos
                </span>
              )}
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar filtros</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {/* Por Habilidade */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Habilidade
              </label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Todas as habilidades" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  <SelectItem value="all">Todas as habilidades</SelectItem>
                  {SKILLS_LIST.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Por Público */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Público
              </label>
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Todos os públicos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os públicos</SelectItem>
                  {TARGET_AUDIENCES_LIST.map((aud) => (
                    <SelectItem key={aud} value={aud}>
                      {aud}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Por Idade */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Faixa Etária
              </label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Todas as idades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as idades</SelectItem>
                  {AGE_RANGES_LIST.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Por Nível */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Nível
              </label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os níveis</SelectItem>
                  {LEVELS_LIST.map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Por Tipo */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Tipo de Recurso
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-9 text-xs bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {TYPES_LIST.map((typ) => (
                    <SelectItem key={typ} value={typ}>
                      {typ}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Ordenação e Quantidade */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <p className="text-xs text-slate-500 font-medium">
          Mostrando <strong className="text-slate-800">{filteredActivities.length}</strong> materiais encontrados
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Ordenar por:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-8 text-xs bg-white border-slate-200 rounded-lg w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="popular">Mais acessados</SelectItem>
                <SelectItem value="name">Ordem alfabética</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex border border-slate-200 rounded-lg p-0.5 bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Visualização em Grade"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Visualização em Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grade de Atividades */}
      {filteredActivities.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
              : 'space-y-3'
          }
        >
          {filteredActivities.map((activity) => (
            <ActivityCardEnhanced
              key={activity.id}
              activity={activity}
              onSelect={(act) => setSelectedActivity(act)}
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio Acolhedor */
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto text-2xl">
            🔎
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Nenhuma atividade encontrada com esses filtros
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tente remover alguns filtros ou buscar por palavras-chave mais abrangentes.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="text-xs border-slate-200"
            >
              Limpar todos os filtros
            </Button>
            <Button
              onClick={() => window.location.href = '/dashboard/sugestoes'}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
            >
              💡 Pedir este material para a gente
            </Button>
          </div>
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

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Carregando biblioteca...</div>}>
      <BibliotecaContent />
    </Suspense>
  );
}

