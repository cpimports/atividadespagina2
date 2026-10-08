"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  Flame, 
  Bot, 
  Lightbulb, 
  Calendar, 
  ArrowRight, 
  Heart, 
  Download, 
  Users, 
  CheckCircle, 
  MessageCircle,
  Clock,
  Layers,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Activity } from '@/lib/types';
import { ActivityCardEnhanced } from '@/components/activity-card-enhanced';
import { ActivityModalDetail } from '@/components/activity-modal-detail';

export default function DashboardHomePage() {
  const router = useRouter();
  const { 
    activities, 
    teacherProfile, 
    suggestions, 
    voteSuggestion, 
    calendarEvents, 
    recordView 
  } = useGeniozinho();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Filtros rápidos
  const quickFilters = [
    { label: 'Autismo & AEE', query: 'Autismo' },
    { label: 'Alfabetização', query: 'Alfabetização' },
    { label: 'Coordenação Motora', query: 'Coordenação' },
    { label: 'Sensorial & Foco', query: 'Sensorial' },
    { label: 'Pareamento & Cores', query: 'Pareamento' },
    { label: 'Emoções', query: 'Emoções' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/biblioteca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickFilter = (q: string) => {
    router.push(`/dashboard/biblioteca?q=${encodeURIComponent(q)}`);
  };

  // 1. Novidades desta semana (atividades marcadas como isNew)
  const newActivities = activities.filter((a) => a.isNew).slice(0, 4);

  // 2. Mais acessados pelas professoras (marcados como isPopular ou maior accessCount)
  const popularActivities = [...activities]
    .sort((a, b) => (b.accessCount || 0) - (a.accessCount || 0))
    .slice(0, 4);

  // 3. Próximas datas do calendário
  const upcomingEvents = calendarEvents.slice(0, 3);

  // 4. Sugestões em destaque das professoras
  const topSuggestions = [...suggestions]
    .sort((a, b) => b.votesCount - a.votesCount)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      {/* 1. HERO & SAUDAÇÃO PERSONALIZADA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-600 text-white p-6 sm:p-10 shadow-xl shadow-sky-600/15">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-sky-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ecossistema para AEE, Educação Especial & Inclusão</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Olá, professora {teacherProfile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-base sm:text-xl text-sky-100 font-medium">
            O que você precisa preparar hoje para seus alunos?
          </p>

          {/* 2. GRANDE BARRA DE BUSCA */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border border-sky-100">
              <Search className="w-5 h-5 ml-3 text-slate-400 shrink-0" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise por atividade, habilidade, tema ou idade..."
                className="border-0 shadow-none focus-visible:ring-0 text-slate-800 text-sm sm:text-base placeholder:text-slate-400 h-11"
              />
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 sm:px-7 rounded-xl h-11 shrink-0 shadow-md shadow-sky-600/30"
              >
                Buscar
              </Button>
            </div>
          </form>

          {/* Tags de busca rápida */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-sky-100">
            <span className="font-semibold text-white/80">Buscas frequentes:</span>
            {quickFilters.map((qf) => (
              <button
                key={qf.label}
                type="button"
                onClick={() => handleQuickFilter(qf.query)}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white transition-colors"
              >
                {qf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fundo decorativo sutil */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* BANNER DE STATUS DO CLUBE (+1.500 MATERIAIS) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">+1.500</p>
            <p className="text-xs text-slate-500 font-medium">Materiais no Clube</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">32 Novos</p>
            <p className="text-xs text-slate-500 font-medium">Lançados esta semana</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">5 Ferramentas</p>
            <p className="text-xs text-slate-500 font-medium">IA Pedagógica Inclusiva</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900">R$ 39,90</p>
            <p className="text-xs text-slate-500 font-medium">Acesso mensal ilimitado</p>
          </div>
        </div>
      </section>

      {/* 3. ✨ NOVIDADES DESTA SEMANA */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                Atualização Semanal
              </span>
              <span className="text-xs text-slate-400">• 32 novos materiais adicionados</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Novidades desta semana
            </h2>
          </div>
          <Link
            href="/dashboard/novidades"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Ver todas as novidades</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newActivities.map((activity) => (
            <ActivityCardEnhanced
              key={activity.id}
              activity={activity}
              onSelect={(act) => setSelectedActivity(act)}
            />
          ))}
        </div>
      </section>

      {/* 4. 🔥 MAIS ACESSADOS PELAS PROFESSORAS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              Mais Populares
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              Mais acessados pelas professoras
            </h2>
          </div>
          <Link
            href="/dashboard/biblioteca?sort=popular"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Explorar acervo completo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularActivities.map((activity) => (
            <ActivityCardEnhanced
              key={activity.id}
              activity={activity}
              onSelect={(act) => setSelectedActivity(act)}
            />
          ))}
        </div>
      </section>

      {/* 5. 🤖 PRECISA CRIAR ALGUMA COISA? (CARD GRANDE DA IA) */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-sky-900 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 border border-white/10">
            <Bot className="w-4 h-4 text-sky-400" />
            <span>Inteligência Artificial Pedagógica Inclusiva</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Sua nova assistente para preparar atividades.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Crie, adapte e encontre ideias sob medida para suas aulas e atendimentos de AEE em poucos segundos.
            Sem complicação, direto ao ponto.
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-sky-200 pt-1">
            <span className="bg-white/10 px-3 py-1 rounded-lg">✨ Gerador de Atividades</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">♻️ Adaptador para AEE/Autismo</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">📚 Planos de Aula BNCC</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg">💡 Ideias Rápidas</span>
          </div>

          <div className="pt-3">
            <Link href="/dashboard/ia">
              <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-7 py-3 rounded-xl shadow-lg shadow-amber-400/20 text-sm flex items-center gap-2 transition-transform active:scale-95">
                <span>Experimentar IA Agora</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Fundo ilustrativo sutil */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
      </section>

      {/* 6. 💡 VOCÊ PEDE. A GENTE CRIA. */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              Co-criação com Educadoras
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Você pede. A gente cria.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Não encontrou o que precisava para sua turma? Conte para a gente e vote nas ideias de outras professoras.
            </p>
          </div>

          <Link href="/dashboard/sugestoes">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm">
              Enviar minha sugestão →
            </Button>
          </Link>
        </div>

        {/* Lista de pedidos em destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topSuggestions.map((sug) => {
            const statusMap = {
              em_analise: { label: '🟡 Em análise', color: 'bg-amber-50 text-amber-800 border-amber-200' },
              em_producao: { label: '🔵 Em produção', color: 'bg-sky-50 text-sky-800 border-sky-200' },
              disponivel: { label: '🟢 Disponível', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              recusada: { label: '🔴 Recusada', color: 'bg-rose-50 text-rose-800 border-rose-200' },
            };
            const st = statusMap[sug.status];

            return (
              <div
                key={sug.id}
                className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${st.color}`}>
                      {st.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {sug.votesCount} votos
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
                    {sug.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {sug.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[130px]">
                    {sug.authorName}
                  </span>
                  <Button
                    size="sm"
                    variant={sug.votedByMe ? 'default' : 'outline'}
                    onClick={() => voteSuggestion(sug.id)}
                    className={`text-[11px] h-7 rounded-lg font-bold ${
                      sug.votedByMe
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    <Heart className={`w-3 h-3 mr-1 ${sug.votedByMe ? 'fill-white' : ''}`} />
                    {sug.votedByMe ? 'Votado!' : 'Quero também'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. 📅 PRÓXIMAS DATAS E TEMAS PEDAGÓGICOS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              Planejamento Antecipado
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              Próximas datas e temas do calendário
            </h2>
          </div>
          <Link
            href="/dashboard/calendario"
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Ver calendário pedagógico completo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex gap-4 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col items-center justify-center shrink-0 text-sky-800">
                <span className="text-base font-extrabold leading-none">{evt.day}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{evt.month}</span>
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600">
                    {evt.badge}
                  </Badge>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {evt.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/dashboard/calendario?event=${evt.id}`}
                    className="text-[11px] font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
                  >
                    Ver materiais relacionados ({evt.relatedActivityIds.length}) →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 💬 COMUNIDADE VIP TEASER */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-white border border-white/20">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Comunidade Exclusiva para Assinantes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
            Você não está sozinha na sua sala de aula.
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Troque experiências, dicas de manejo e relatos diários com centenas de professoras de AEE, mediadoras e especialistas de todo o Brasil.
          </p>
        </div>

        <Link href="/dashboard/comunidade" className="shrink-0">
          <Button className="bg-white hover:bg-emerald-50 text-emerald-800 font-bold px-6 py-2.5 rounded-xl shadow-md text-xs sm:text-sm">
            Entrar no Grupo VIP →
          </Button>
        </Link>
      </section>

      {/* Modal Detalhado da Atividade */}
      <ActivityModalDetail
        activity={selectedActivity}
        isOpen={Boolean(selectedActivity)}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}
