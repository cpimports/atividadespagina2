"use client";

import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Heart, 
  Send, 
  CheckCircle2, 
  Flame, 
  Filter, 
  Users, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  SKILLS_LIST, 
  TARGET_AUDIENCES_LIST, 
  AGE_RANGES_LIST 
} from '@/lib/mock-data';
import { TargetAudience, AgeRange, ActivitySkill } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function SugestoesPage() {
  const { toast } = useToast();
  const { suggestions, submitSuggestion, voteSuggestion } = useGeniozinho();

  // Estados do Formulário
  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('AEE');
  const [skill, setSkill] = useState<ActivitySkill>('Atenção');
  const [ageRange, setAgeRange] = useState<AgeRange>('5–6 anos');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'em_analise' | 'em_producao' | 'disponivel'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({ variant: 'destructive', title: 'Preencha o título e a descrição da sugestão' });
      return;
    }

    submitSuggestion({
      title: title.trim(),
      targetAudience,
      skill,
      ageRange,
      description: description.trim(),
    });

    setIsSubmitted(true);
    toast({
      title: 'Sugestão enviada! 💙',
      description: 'Obrigada por ajudar a construir a plataforma com a gente.',
    });
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setIsSubmitted(false);
  };

  const filteredSuggestions = suggestions.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const statusConfig = {
    em_analise: { label: '🟡 Em análise', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    em_producao: { label: '🔵 Em produção', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    disponivel: { label: '🟢 Disponível', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    recusada: { label: '🔴 Recusada', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  };

  return (
    <div className="space-y-10">
      {/* Top Banner de Co-criação */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-slate-950 shadow-xl shadow-amber-500/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-xs font-bold text-slate-900 border border-black/10">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Você Pede. A Gente Cria.</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Não encontrou o que precisava? Conte para a gente.
          </h1>

          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Sua sugestão pode virar o próximo material exclusivo da plataforma. Nossa equipe de pedagogas e ilustradores analisa cada pedido semanalmente!
          </p>
        </div>
      </div>

      {/* Grid: Formulário de Envio (Esquerda) + Votação dos Pedidos Reais (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulário de Sugestão (Col 5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          {!isSubmitted ? (
            <>
              <div className="space-y-1">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Enviar Nova Sugestão</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Descreva em detalhes o recurso ou jogo que facilitaria a sua aula.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nome da atividade que você gostaria: *
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Prancha de pareamento de sombras de frutas"
                    className="h-10 text-xs rounded-xl bg-slate-50 border-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Para qual público?
                    </label>
                    <Select value={targetAudience} onValueChange={(val: any) => setTargetAudience(val)}>
                      <SelectTrigger className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TARGET_AUDIENCES_LIST.map((aud) => (
                          <SelectItem key={aud} value={aud}>{aud}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Qual faixa etária?
                    </label>
                    <Select value={ageRange} onValueChange={(val: any) => setAgeRange(val)}>
                      <SelectTrigger className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_RANGES_LIST.map((age) => (
                          <SelectItem key={age} value={age}>{age}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Qual habilidade gostaria de trabalhar?
                  </label>
                  <Select value={skill} onValueChange={(val: any) => setSkill(val)}>
                    <SelectTrigger className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-56">
                      {SKILLS_LIST.map((sk) => (
                        <SelectItem key={sk} value={sk}>{sk}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Conte um pouco mais sobre o que você precisa: *
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Descreva como o material deve ser estruturado, se precisa de velcro, figuras reais, apoio visual ou tamanho específico..."
                    className="text-xs rounded-xl bg-slate-50 border-slate-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-11 rounded-xl shadow-md shadow-sky-600/20 text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar sugestão</span>
                </Button>
              </form>
            </>
          ) : (
            /* Tela de Agradecimento e Sucesso */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
                💙
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Sugestão enviada com sucesso!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Obrigada por ajudar a construir a plataforma com a gente. Seu pedido entrou na lista de análise e outras professoras já podem votar nele!
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleResetForm}
                className="text-xs border-slate-200 font-semibold"
              >
                Enviar outra sugestão
              </Button>
            </div>
          )}
        </div>

        {/* Lista de Pedidos das Professoras & Votação (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <span>O que as professoras estão pedindo</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Vote nos materiais que você também gostaria de ter na sua sala de aula.
                </p>
              </div>

              {/* Filtro por Status */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setStatusFilter('em_producao')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    statusFilter === 'em_producao' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Em produção
                </button>
                <button
                  onClick={() => setStatusFilter('disponivel')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    statusFilter === 'disponivel' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Disponíveis
                </button>
              </div>
            </div>

            {/* Lista de Sugestões com Votação */}
            <div className="space-y-3.5">
              {filteredSuggestions.map((sug) => {
                const st = statusConfig[sug.status];

                return (
                  <div
                    key={sug.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${st.color}`}>
                          {st.label}
                        </span>
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                          {sug.skill}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {sug.targetAudience} • {sug.ageRange}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {sug.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sug.description}
                      </p>

                      <p className="text-[10px] text-slate-400 pt-1">
                        Sugerido por: {sug.authorName}
                      </p>
                    </div>

                    {/* Botão de Votação Interativo */}
                    <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200/70 pt-2 sm:pt-0 sm:pl-4">
                      <div className="text-center">
                        <span className="text-sm font-extrabold text-slate-800 block">
                          {sug.votesCount}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          votos
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => voteSuggestion(sug.id)}
                        className={`text-xs font-bold rounded-xl h-8 px-3.5 transition-all ${
                          sug.votedByMe
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                            : 'border border-rose-200 text-rose-600 hover:bg-rose-50 bg-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 mr-1.5 ${sug.votedByMe ? 'fill-white' : ''}`} />
                        <span>{sug.votedByMe ? 'Votado! ❤️' : 'Quero esse'}</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
