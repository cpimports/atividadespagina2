"use client";

import React from 'react';
import { 
  MessageCircle, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Share2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';

export default function ComunidadePage() {
  const testimonials = [
    {
      author: 'Profª Débora M. (AEE / Curitiba)',
      text: 'O grupo do WhatsApp é um respiro! Quando estou em dúvida sobre como mediar um comportamento ou qual prancha usar, as colegas sempre respondem com muito carinho.',
      tag: 'Educação Especial'
    },
    {
      author: 'Profª Carla Silveira (Mediadora / Rio de Janeiro)',
      text: 'Já baixei mais de 40 atividades recomendadas direto pelas outras professoras aqui no grupo. A sensação de pertencimento é indescritível.',
      tag: 'Mediação Escolar'
    },
    {
      author: 'Profª Letícia Amaral (Sala de Recursos / Salvador)',
      text: 'As discussões sobre adaptação para alunos autistas não verbais me deram ideias que transformaram o rendimento dos meus pequenos este mês!',
      tag: 'Autismo & CSA'
    }
  ];

  const handleOpenWhatsApp = () => {
    window.open('https://chat.whatsapp.com/sample-geniozinho-vip', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner da Comunidade */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-700/15 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <Users className="w-3.5 h-3.5" />
            <span>Espaço Exclusivo para Assinantes VIP</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Comunidade de Professoras & Mediadoras
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
            Um ambiente acolhedor, sem julgamentos, feito para quem vive os desafios reais da educação especial e inclusiva todos os dias.
          </p>
        </div>
      </div>

      {/* Card Principal de Acesso ao WhatsApp VIP */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Grupo Ativo no WhatsApp • +1.280 Educadoras
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Grupo VIP de Apoio e Troca Pedagógica
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            Receba notificações em primeira mão de novos materiais, participe de enquetes rápidas e compartilhe fotos de como suas crianças reagiram às atividades do Gêniozinho em Ação.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-600">
            <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Moderação pedagógica ativa
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Troca de ideias de manejo e DUA
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sem mensagens de spam
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <Button
            onClick={handleOpenWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 text-sm flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <WhatsappIcon className="w-5 h-5 fill-white" />
            <span>Entrar no Grupo VIP do WhatsApp</span>
          </Button>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Acesso reservado exclusivamente para membros ativos
          </span>
        </div>
      </div>

      {/* Relatos da Rede de Educadoras */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>O que as professoras dizem sobre nossa rede de apoio</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-3"
            >
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{item.text}"
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.author}</p>
                  <p className="text-[10px] text-sky-600 font-semibold">{item.tag}</p>
                </div>
                <span className="text-lg">🌸</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
