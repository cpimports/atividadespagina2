"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Layers, 
  Lightbulb, 
  Vote, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Flame, 
  Star, 
  Gift, 
  Search,
  ExternalLink,
  ArrowUpRight
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useGeniozinho } from '@/context/geniozinho-context';
import { 
  Activity, 
  Suggestion, 
  SuggestionStatus, 
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
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const { 
    activities, 
    addActivity, 
    updateActivity, 
    deleteActivity,
    suggestions, 
    updateSuggestionStatus,
    polls,
    calendarEvents
  } = useGeniozinho();

  const [activeTab, setActiveTab] = useState<'metrics' | 'activities' | 'suggestions' | 'polls'>('metrics');
  const [activitySearch, setActivitySearch] = useState('');

  // Modal de Adicionar/Editar Atividade
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Form Fields de Atividade
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Novidades');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [skill, setSkill] = useState<ActivitySkill>('Atenção');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('AEE');
  const [ageRange, setAgeRange] = useState<AgeRange>('5–6 anos');
  const [level, setLevel] = useState<ActivityLevel>('Fácil');
  const [type, setType] = useState<ActivityType>('Atividade');
  const [pedagogicalObjective, setPedagogicalObjective] = useState('');
  const [description, setDescription] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [materialsNeededStr, setMaterialsNeededStr] = useState('Folha impressa, Lápis macio, Tesoura');
  const [isNew, setIsNew] = useState(true);
  const [isPopular, setIsPopular] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);

  // Métricas do SaaS Gêniozinho em Ação
  const totalSubscribers = 1428;
  const activeSubscribers = 1395;
  const churnRate = '1.8%';
  const newSubscribersThisMonth = 94;
  const pricePerSub = 39.90;
  const mrr = (activeSubscribers * pricePerSub).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const openAddModal = () => {
    setEditingActivity(null);
    setTitle('');
    setCategory('Novidades');
    setThumbnailUrl('https://picsum.photos/600/400?random=99');
    setPdfUrl('https://drive.google.com');
    setSkill('Atenção');
    setTargetAudience('AEE');
    setAgeRange('5–6 anos');
    setLevel('Fácil');
    setType('Atividade');
    setPedagogicalObjective('Estimular o foco visual e a coordenação motora adaptada.');
    setDescription('Material desenvolvido para atendimento especializado em sala de recursos.');
    setHowToUse('Apresente os cartões de forma pausada e incentive o pareamento.');
    setMaterialsNeededStr('Prancha impressa, Tesoura escolar, Cola bastão');
    setIsNew(true);
    setIsPopular(false);
    setIsExclusive(false);
    setIsActivityModalOpen(true);
  };

  const openEditModal = (act: Activity) => {
    setEditingActivity(act);
    setTitle(act.title);
    setCategory(act.category);
    setThumbnailUrl(act.thumbnailUrl);
    setPdfUrl(act.pdfUrl);
    setSkill(act.skills[0] || 'Atenção');
    setTargetAudience(act.targetAudience[0] || 'AEE');
    setAgeRange(act.ageRange);
    setLevel(act.level);
    setType(act.type);
    setPedagogicalObjective(act.pedagogicalObjective || '');
    setDescription(act.description || '');
    setHowToUse(act.howToUse || '');
    setMaterialsNeededStr(act.materialsNeeded?.join(', ') || 'Material impresso');
    setIsNew(Boolean(act.isNew));
    setIsPopular(Boolean(act.isPopular));
    setIsExclusive(Boolean(act.isExclusive));
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const materialsArray = materialsNeededStr.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingActivity) {
      // Atualizar existente
      updateActivity({
        ...editingActivity,
        title,
        category,
        thumbnailUrl,
        pdfUrl,
        skills: [skill],
        targetAudience: [targetAudience],
        ageRange,
        level,
        type,
        pedagogicalObjective,
        skillsWorked: `${skill} e mediação funcional`,
        description,
        howToUse,
        materialsNeeded: materialsArray,
        isNew,
        isPopular,
        isExclusive,
      });
      toast({ title: 'Atividade atualizada com sucesso! ✅' });
    } else {
      // Criar nova
      addActivity({
        title,
        category,
        thumbnailUrl: thumbnailUrl || 'https://picsum.photos/600/400',
        pdfUrl: pdfUrl || 'https://drive.google.com',
        skills: [skill],
        targetAudience: [targetAudience],
        ageRange,
        level,
        type,
        pedagogicalObjective,
        skillsWorked: `${skill} e atenção compartilhada`,
        description,
        howToUse,
        materialsNeeded: materialsArray,
        isNew,
        isPopular,
        isExclusive,
        tags: [skill, targetAudience, type],
      });
      toast({ title: 'Nova atividade cadastrada no clube! 🚀' });
    }

    setIsActivityModalOpen(false);
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta atividade?')) {
      deleteActivity(id);
      toast({ title: 'Atividade removida' });
    }
  };

  // Transformar sugestão em atividade diretamente pelo painel administrativo (Section 21)
  const handleTransformSuggestion = (sug: Suggestion) => {
    setEditingActivity(null);
    setTitle(sug.title);
    setCategory('Novidades');
    setThumbnailUrl('https://picsum.photos/600/400?random=88');
    setPdfUrl('https://drive.google.com');
    setSkill(sug.skill);
    setTargetAudience(sug.targetAudience);
    setAgeRange(sug.ageRange);
    setLevel('Fácil');
    setType('Atividade');
    setPedagogicalObjective(`Atender à demanda pedagógica solicitada pela comunidade: ${sug.title}`);
    setDescription(sug.description);
    setHowToUse('Passo 1: Imprima as fichas em papel sulfite ou fotográfico.\nPasso 2: Plastifique com polaseal.\nPasso 3: Aplique na sala de recursos.');
    setMaterialsNeededStr('Prancha plastificada, Velcro adesivo');
    setIsNew(true);
    setIsPopular(true);
    setIsExclusive(false);
    setIsActivityModalOpen(true);

    // Marca a sugestão como em produção ou disponível
    updateSuggestionStatus(sug.id, 'em_producao');
    toast({ title: 'Sugestão importada para o formulário de cadastro!' });
  };

  const filteredActivities = activities.filter((a) =>
    a.title.toLowerCase().includes(activitySearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Banner Admin */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-xs font-bold text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Painel de Controle Administrativo (SaaS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gestão da Plataforma Gêniozinho em Ação
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Métricas de receita, publicação de materiais pedagógicos, moderação de sugestões e enquetes.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-400/20 text-xs flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Atividade</span>
        </Button>
      </div>

      {/* Navegação de Abas do Admin */}
      <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)}>
        <TabsList className="p-1 bg-white border border-slate-200 rounded-2xl h-auto gap-1">
          <TabsTrigger
            value="metrics"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            <span>Métricas & Receita</span>
          </TabsTrigger>

          <TabsTrigger
            value="activities"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Layers className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
            <span>Gerenciar Atividades ({activities.length})</span>
          </TabsTrigger>

          <TabsTrigger
            value="suggestions"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Lightbulb className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span>Sugestões das Professoras ({suggestions.length})</span>
          </TabsTrigger>

          <TabsTrigger
            value="polls"
            className="text-xs font-bold py-2 px-4 rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
          >
            <Vote className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            <span>Votações & Enquetes</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. ABA MÉTRICAS (Section 18) */}
        <TabsContent value="metrics" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                MRR (Receita Recorrente)
              </span>
              <p className="text-2xl font-extrabold text-emerald-600">{mrr}</p>
              <p className="text-[11px] text-slate-500 font-medium">
                Baseado em {activeSubscribers} assinantes x R$ 39,90
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Assinantes Ativos
              </span>
              <p className="text-2xl font-extrabold text-slate-900">{activeSubscribers}</p>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +{newSubscribersThisMonth} novos este mês
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Materiais Publicados
              </span>
              <p className="text-2xl font-extrabold text-sky-600">1.540+</p>
              <p className="text-[11px] text-slate-500 font-medium">
                Distribuídos em 8 categorias
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Taxa de Churn (Cancelamento)
              </span>
              <p className="text-2xl font-extrabold text-slate-800">{churnRate}</p>
              <p className="text-[11px] text-emerald-600 font-medium">
                Altíssima retenção pela rotina contínua
              </p>
            </div>
          </div>
        </TabsContent>

        {/* 2. ABA GERENCIAR ATIVIDADES (CRUD - Section 19 & 20) */}
        <TabsContent value="activities" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  placeholder="Filtrar por título..."
                  className="pl-9 h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                />
              </div>

              <Button
                onClick={openAddModal}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold h-9 rounded-xl w-full sm:w-auto"
              >
                + Adicionar Atividade
              </Button>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 pb-2">
                    <th className="py-2.5">Atividade</th>
                    <th className="py-2.5">Categoria</th>
                    <th className="py-2.5">Habilidade</th>
                    <th className="py-2.5">Faixa Etária</th>
                    <th className="py-2.5">Destaques</th>
                    <th className="py-2.5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredActivities.slice(0, 15).map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-3 font-bold text-slate-900 max-w-[220px] truncate">
                        {act.title}
                      </td>
                      <td className="py-3 text-slate-600">{act.category}</td>
                      <td className="py-3 text-sky-700 font-semibold">{act.skills.join(', ')}</td>
                      <td className="py-3 text-slate-500">{act.ageRange}</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          {act.isNew && <Badge className="bg-amber-100 text-amber-800 text-[9px] border-0">Novo</Badge>}
                          {act.isPopular && <Badge className="bg-rose-100 text-rose-800 text-[9px] border-0">Popular</Badge>}
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditModal(act)}
                            className="h-7 w-7 p-0 text-slate-600 hover:text-sky-600"
                            title="Editar"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteActivity(act.id)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* 3. ABA SUGESTÕES DAS PROFESSORAS (Section 21) */}
        <TabsContent value="suggestions" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Gerenciar Pedidos & Transformar em Atividade
              </h3>
              <p className="text-xs text-slate-500">
                Altere o status ou clique em "Transformar em Atividade" para pré-preencher o cadastro com os dados da professora.
              </p>
            </div>

            <div className="space-y-3">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{sug.title}</span>
                      <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full font-semibold">
                        {sug.skill} • {sug.targetAudience}
                      </span>
                      <span className="text-[10px] text-rose-600 font-bold">
                        ❤️ {sug.votesCount} votos
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{sug.description}</p>
                    <p className="text-[10px] text-slate-400">Por: {sug.authorName}</p>
                  </div>

                  {/* Ações de Status & Transformar */}
                  <div className="flex flex-wrap items-center gap-2 self-end sm:self-center shrink-0">
                    <Select
                      value={sug.status}
                      onValueChange={(val: any) => updateSuggestionStatus(sug.id, val)}
                    >
                      <SelectTrigger className="h-8 text-xs bg-white rounded-lg w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em_analise">🟡 Em análise</SelectItem>
                        <SelectItem value="em_producao">🔵 Em produção</SelectItem>
                        <SelectItem value="disponivel">🟢 Publicada</SelectItem>
                        <SelectItem value="recusada">🔴 Recusada</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="sm"
                      onClick={() => handleTransformSuggestion(sug)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 rounded-lg"
                    >
                      ⚡ Transformar em Atividade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* 4. ABA VOTAÇÕES */}
        <TabsContent value="polls" className="space-y-4 pt-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">
              Enquetes do Clube
            </h3>
            <div className="space-y-3">
              {polls.map((poll) => (
                <div key={poll.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{poll.title}</h4>
                    <p className="text-xs text-slate-500">{poll.votesCount} votos de {poll.goal} meta</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-0 text-xs">
                    {poll.status === 'ativa' ? 'Ativa' : 'Encerrada'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Adicionar/Editar Atividade */}
      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">
              {editingActivity ? 'Editar Atividade' : 'Cadastrar Nova Atividade'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Preencha os atributos pedagógicos para disponibilizar no acervo do clube.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveActivity} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Título da Atividade *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Pareamento de Animais e Texturas"
                className="h-9 text-xs rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Categoria</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novidades">Novidades</SelectItem>
                    <SelectItem value="Alfabetização">Alfabetização</SelectItem>
                    <SelectItem value="Números">Números</SelectItem>
                    <SelectItem value="Atividades sensoriais">Atividades sensoriais</SelectItem>
                    <SelectItem value="Jogos Educativos">Jogos Educativos</SelectItem>
                    <SelectItem value="Ensino Completo">Ensino Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Habilidade Central</label>
                <Select value={skill} onValueChange={(val: any) => setSkill(val)}>
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-56">
                    {SKILLS_LIST.map((sk) => (
                      <SelectItem key={sk} value={sk}>{sk}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Público</label>
                <Select value={targetAudience} onValueChange={(val: any) => setTargetAudience(val)}>
                  <SelectTrigger className="h-9 text-xs rounded-xl">
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
                <label className="text-xs font-bold text-slate-700 block mb-1">Faixa Etária</label>
                <Select value={ageRange} onValueChange={(val: any) => setAgeRange(val)}>
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_RANGES_LIST.map((age) => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Recurso</label>
                <Select value={type} onValueChange={(val: any) => setType(val)}>
                  <SelectTrigger className="h-9 text-xs rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES_LIST.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL da Imagem / Capa</label>
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className="h-9 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Link do Arquivo PDF / Google Drive</label>
                <Input
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="h-9 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Objetivo Pedagógico (BNCC)</label>
              <Input
                value={pedagogicalObjective}
                onChange={(e) => setPedagogicalObjective(e.target.value)}
                placeholder="Ex: Desenvolver a coordenação visomotora fina e pareamento"
                className="h-9 text-xs rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Descrição</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Breve descrição dos pontos fortes do material..."
                className="text-xs rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Como Utilizar (Guia AEE)</label>
              <Textarea
                value={howToUse}
                onChange={(e) => setHowToUse(e.target.value)}
                rows={3}
                placeholder="Passo a passo com dicas de mediação inclusiva..."
                className="text-xs rounded-xl"
              />
            </div>

            {/* Destaques (Section 20) */}
            <div className="pt-2 border-t flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="rounded text-sky-600"
                />
                <span>🆕 Marcar como Novo</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <span>🔥 Destaque / Popular</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExclusive}
                  onChange={(e) => setIsExclusive(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>⭐ Exclusivo do Clube</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsActivityModalOpen(false)}
                className="text-xs rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl"
              >
                Salvar Atividade
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
