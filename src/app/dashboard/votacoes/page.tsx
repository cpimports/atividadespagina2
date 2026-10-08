"use client";

import React from 'react';
import { Vote, Sparkles, Check, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGeniozinho } from '@/context/geniozinho-context';

export default function VotacoesPage() {
  const { polls, votePoll } = useGeniozinho();

  return (
    <div className="space-y-8">
      {/* Top Banner de Votações */}
      <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-sky-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-sky-600/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <Vote className="w-3.5 h-3.5" />
            <span>Poder de Escolha das Educadoras</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Você ajuda a decidir o que vamos criar.
          </h1>

          <p className="text-sm sm:text-base text-sky-100 font-medium leading-relaxed">
            Nossos maiores lançamentos são decididos pelas próprias assinantes. Vote na temática ou recurso que você mais precisa para o seu dia a dia.
          </p>
        </div>
      </div>

      {/* Lista de Enquetes e Votações Ativas */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>🗳️ Enquetes Ativas</span>
            <span className="text-xs text-slate-400 font-normal">({polls.length} abertas)</span>
          </h2>
          <span className="text-xs text-slate-400">
            Cada assinante tem direito a 1 voto por enquete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => {
            const percentage = Math.min(Math.round((poll.votesCount / poll.goal) * 100), 100);

            return (
              <div
                key={poll.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                {/* Imagem de Capa da Enquete */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={poll.coverUrl}
                    alt={poll.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-slate-800 backdrop-blur-sm border-0 text-xs font-bold shadow-sm">
                      {poll.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Até {poll.expiresAt}
                    </span>
                  </div>
                </div>

                {/* Conteúdo da Enquete */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                      {poll.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {poll.description}
                    </p>
                  </div>

                  {/* Barra de Progresso da Meta de Votos */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        {poll.votesCount} professoras votaram
                      </span>
                      <span className="text-slate-400 font-medium">
                        Meta: {poll.goal} votos ({percentage}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2 rounded-full bg-slate-100" />
                  </div>

                  {/* Botão de Votar */}
                  <div className="pt-2">
                    <Button
                      onClick={() => votePoll(poll.id)}
                      className={`w-full font-bold h-11 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${
                        poll.votedByMe
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20'
                      }`}
                    >
                      {poll.votedByMe ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Seu voto foi registrado! (Clique para alterar)</span>
                        </>
                      ) : (
                        <>
                          <Vote className="w-4 h-4" />
                          <span>Votar neste próximo lançamento</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
