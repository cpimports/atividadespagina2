"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Crown, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  Award, 
  Sparkles, 
  Heart, 
  History, 
  Lightbulb, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useGeniozinho } from '@/context/geniozinho-context';
import { useToast } from '@/hooks/use-toast';

export default function PerfilPage() {
  const { toast } = useToast();
  const { teacherProfile, suggestions, favorites, history } = useGeniozinho();

  const [activeTab, setActiveTab] = useState<'subscription' | 'suggestions' | 'gamification' | 'settings'>('subscription');
  const [isManagingPlan, setIsManagingPlan] = useState(false);

  // Minhas sugestões
  const mySuggestions = suggestions.filter((s) => s.votedByMe);

  const handleManageSubscription = () => {
    setIsManagingPlan(true);
    toast({
      title: 'Portal de Assinatura Aberto',
      description: 'Estrutura preparada para integração com gateway de pagamento seguro (Stripe / Hotmart / Asaas / Cakto).',
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner de Identidade do Usuário */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-md shrink-0 bg-sky-50">
            <img
              src={teacherProfile.avatar}
              alt={teacherProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-0 text-xs font-bold">
                ⭐ ASSINATURA ATIVA
              </Badge>
              <span className="text-xs text-slate-400 font-medium">{teacherProfile.school}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Profª {teacherProfile.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {teacherProfile.role} • {teacherProfile.email}
            </p>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3 text-xs text-sky-700 font-semibold">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                {favorites.length} favoritos
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-sky-600" />
                {history.length} acessos recentes
              </span>
            </div>
          </div>
        </div>

        {/* Card Resumo do Plano ao Lado */}
        <div className="bg-sky-50/80 border border-sky-200/70 p-4 rounded-2xl text-center sm:text-right shrink-0 w-full sm:w-auto">
          <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">
            Plano Atual
          </span>
          <p className="text-xl font-extrabold text-slate-900">
            R$ 39,90 <span className="text-xs text-slate-500 font-normal">/mês</span>
          </p>
          <span className="text-[11px] text-slate-500 block pt-0.5">
            Renovação em {teacherProfile.nextBillingDate}
          </span>
          <Button
            size="sm"
            onClick={handleManageSubscription}
            className="mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl w-full"
          >
            Gerenciar assinatura
          </Button>
        </div>
      </div>

      {/* Abas do Perfil */}
      <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
        <TabsList className="p-1 bg-white border border-slate-200 rounded-2xl h-auto gap-1">
          <TabsTrigger
            value="subscription"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-sky-50 data-[state=active]:text-sky-800"
          >
            <Crown className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            <span>Sua Assinatura</span>
          </TabsTrigger>

          <TabsTrigger
            value="suggestions"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-sky-50 data-[state=active]:text-sky-800"
          >
            <Lightbulb className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            <span>Minhas Sugestões</span>
          </TabsTrigger>

          <TabsTrigger
            value="gamification"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-sky-50 data-[state=active]:text-sky-800"
          >
            <Award className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            <span>Conquistas</span>
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-sky-50 data-[state=active]:text-sky-800"
          >
            <Settings className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span>Configurações</span>
          </TabsTrigger>
        </TabsList>

        {/* ABA 1: ASSINATURA (Section 17) */}
        <TabsContent value="subscription" className="space-y-6 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  Assinatura Recorrente Mensal
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Plano Gêniozinho em Ação
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Seu passe livre para todas as atividades, lançamentos e assistente pedagógica de IA.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-3xl font-extrabold text-slate-900">R$ 39,90</span>
                <span className="text-xs text-slate-500 block">cobrado mensalmente</span>
              </div>
            </div>

            {/* O que está incluso */}
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Seus Benefícios Ilimitados:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  '✓ Biblioteca completa (+1.500 materiais)',
                  '✓ Novos materiais toda semana',
                  '✓ 5 Ferramentas de IA Pedagógica',
                  '✓ Calendário pedagógico antecipado',
                  '✓ Sugestões de novos materiais',
                  '✓ Poder de voto nos lançamentos',
                  '✓ Sistema de favoritos sem limite',
                  '✓ Histórico de navegação inteligente',
                  '✓ Comunidade VIP no WhatsApp'
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.replace('✓ ', '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formas de pagamento & Ações */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Cartão de Crédito final •••• 4242</p>
                  <p className="text-[11px] text-slate-400">Próxima renovação automática: {teacherProfile.nextBillingDate}</p>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleManageSubscription}
                  className="text-xs font-semibold h-9 rounded-xl border-slate-300"
                >
                  Alterar Forma de Pagamento
                </Button>
                <Button
                  onClick={handleManageSubscription}
                  className="text-xs font-bold h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white"
                >
                  Ver Faturas
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ABA 2: MINHAS SUGESTÕES */}
        <TabsContent value="suggestions" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Sugestões que você enviou ou apoiou
                </h3>
                <p className="text-xs text-slate-500">
                  Acompanhe em tempo real o status de cada material pedido.
                </p>
              </div>
              <Link href="/dashboard/sugestoes">
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold h-8">
                  + Nova Sugestão
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {mySuggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-800">{sug.title}</h4>
                    <p className="text-xs text-slate-500">{sug.description}</p>
                    <span className="text-[10px] text-slate-400">
                      {sug.targetAudience} • {sug.skill} • {sug.votesCount} votos
                    </span>
                  </div>

                  <Badge className="bg-sky-100 text-sky-800 border-0 text-xs font-bold shrink-0">
                    {sug.status === 'em_producao' ? '🔵 Em Produção' : sug.status === 'disponivel' ? '🟢 Disponível' : '🟡 Em Análise'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ABA 3: CONQUISTAS (Section 29) */}
        <TabsContent value="gamification" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  🌟 Reconhecimento Docente
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {teacherProfile.gamification.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Pequenas conquistas por participar da comunidade, sugerir e enriquecer a educação inclusiva.
                </p>
              </div>

              <div className="text-center sm:text-right bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
                <span className="text-2xl font-extrabold text-amber-900">
                  {teacherProfile.gamification.points}
                </span>
                <span className="text-[10px] text-amber-700 font-bold uppercase block">
                  Pontos de Impacto
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacherProfile.gamification.badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    b.unlocked
                      ? 'bg-white border-amber-200 shadow-xs'
                      : 'bg-slate-50/70 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{b.icon}</span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-slate-900">{b.title}</h4>
                        {b.unlocked && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
                            Conquistado
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* ABA 4: CONFIGURAÇÕES */}
        <TabsContent value="settings" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 max-w-xl">
            <h3 className="font-extrabold text-base text-slate-900">
              Dados Cadastrais
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo</label>
                <Input defaultValue={teacherProfile.name} className="h-9 text-xs rounded-xl" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">E-mail</label>
                <Input defaultValue={teacherProfile.email} className="h-9 text-xs rounded-xl" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Função / Cargo</label>
                <Input defaultValue={teacherProfile.role} className="h-9 text-xs rounded-xl" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Escola / Instituição</label>
                <Input defaultValue={teacherProfile.school} className="h-9 text-xs rounded-xl" />
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => toast({ title: 'Dados atualizados com sucesso!' })}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs h-9 rounded-xl"
                >
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
