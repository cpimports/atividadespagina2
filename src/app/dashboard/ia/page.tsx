"use client";

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  RefreshCw, 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  Copy, 
  Check, 
  Printer, 
  Send, 
  History, 
  Clock, 
  User,
  Sliders,
  ChevronRight,
  HelpCircle,
  FileText
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useGeniozinho } from '@/context/geniozinho-context';
import { AIService, ChatMessage } from '@/lib/ai-service';
import { 
  SKILLS_LIST, 
  TARGET_AUDIENCES_LIST, 
  AGE_RANGES_LIST, 
  LEVELS_LIST 
} from '@/lib/mock-data';
import { TargetAudience, AgeRange, ActivitySkill, ActivityLevel } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function IAPage() {
  const { toast } = useToast();
  const { aiHistory, saveAIGeneration } = useGeniozinho();

  const [activeTab, setActiveTab] = useState<'generator' | 'adapter' | 'lesson-plan' | 'ideas' | 'chat'>('generator');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Form 1: Gerador de Atividades
  const [f1Audience, setF1Audience] = useState<TargetAudience>('AEE');
  const [f1Age, setF1Age] = useState<AgeRange>('5–6 anos');
  const [f1Skill, setF1Skill] = useState<ActivitySkill>('Atenção');
  const [f1Theme, setF1Theme] = useState('Animais da Fazenda e Sons');
  const [f1Level, setF1Level] = useState<ActivityLevel>('Fácil');
  const [f1Time, setF1Time] = useState('20 a 30 minutos');

  // Form 2: Adaptador de Atividades
  const [f2OriginalText, setF2OriginalText] = useState(
    'Ficha com 10 questões escritas para a criança ler um texto longo sobre plantas, circular as palavras difíceis e responder perguntas dissertativas.'
  );
  const [f2Goal, setF2Goal] = useState<'mais_simples' | 'mais_visual' | 'menos_estimulos' | 'atencao' | 'comunicacao_csa' | 'coordenacao'>('mais_visual');
  const [f2StudentProfile, setF2StudentProfile] = useState('Criança autista nível 1 de suporte, alfabetização inicial, seletividade sensorial para cores fortes');

  // Form 3: Plano de Aula
  const [f3Theme, setF3Theme] = useState('Identidade, Emoções e Amizade no AEE');
  const [f3Age, setF3Age] = useState<AgeRange>('5–6 anos');
  const [f3Duration, setF3Duration] = useState('50 minutos (1 atendimento)');
  const [f3Objective, setF3Objective] = useState('Identificar sentimentos de frustração e alegria usando recurso tátil e visual');
  const [f3Skill, setF3Skill] = useState<ActivitySkill>('Emoções');
  const [f3Audience, setF3Audience] = useState<TargetAudience>('Crianças autistas');

  // Form 4: Ideias Rápidas
  const [f4Situation, setF4Situation] = useState('Tenho 30 minutos com uma criança de 6 anos autista e quero trabalhar atenção e pareamento.');

  // Form 5: Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: 'Olá, professora! 💙 Sou sua assistente pedagógica especializada em AEE e inclusão escolar. Como posso te ajudar a planejar ou adaptar suas atividades hoje?',
      timestamp: 'Agora'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Executar Gerador de Atividades
  const handleGenerateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentResult('');
    try {
      const result = await AIService.generateActivity({
        targetAudience: f1Audience,
        ageRange: f1Age,
        skill: f1Skill,
        theme: f1Theme,
        level: f1Level,
        availableTime: f1Time,
      });
      setCurrentResult(result);
      saveAIGeneration({
        toolType: 'generator',
        title: `Atividade: ${f1Theme} (${f1Skill})`,
        summary: `${f1Audience} • ${f1Age} • ${f1Level}`,
        content: result,
      });
      toast({ title: 'Atividade gerada com sucesso! ✨', description: 'Pronta para utilizar ou imprimir com sua turma.' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro ao gerar', description: 'Tente novamente em instantes.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Executar Adaptador
  const handleAdaptActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentResult('');
    try {
      const result = await AIService.adaptActivity({
        originalActivityDescription: f2OriginalText,
        adaptationGoal: f2Goal,
        studentProfile: f2StudentProfile,
      });
      setCurrentResult(result);
      saveAIGeneration({
        toolType: 'adapter',
        title: `Adaptação Inclusiva (${f2Goal})`,
        summary: f2StudentProfile || 'Adaptação pedagógica AEE',
        content: result,
      });
      toast({ title: 'Atividade adaptada! ♻️', description: 'Nova versão inclusiva estruturada com apoio visual.' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro ao adaptar' });
    } finally {
      setIsLoading(false);
    }
  };

  // Executar Plano de Aula
  const handleGenerateLessonPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentResult('');
    try {
      const result = await AIService.generateLessonPlan({
        theme: f3Theme,
        ageRange: f3Age,
        duration: f3Duration,
        objective: f3Objective,
        skill: f3Skill,
        targetAudience: f3Audience,
      });
      setCurrentResult(result);
      saveAIGeneration({
        toolType: 'lesson-plan',
        title: `Plano: ${f3Theme}`,
        summary: `${f3Duration} • ${f3Age} • BNCC`,
        content: result,
      });
      toast({ title: 'Plano de aula gerado! 📚' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro ao gerar plano' });
    } finally {
      setIsLoading(false);
    }
  };

  // Executar Ideias Rápidas
  const handleGenerateQuickIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentResult('');
    try {
      const result = await AIService.generateQuickIdeas({
        situation: f4Situation,
      });
      setCurrentResult(result);
      saveAIGeneration({
        toolType: 'ideas',
        title: `Ideias Rápidas`,
        summary: f4Situation.slice(0, 50) + '...',
        content: result,
      });
      toast({ title: 'Ideias preparadas! 💡' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro ao gerar ideias' });
    } finally {
      setIsLoading(false);
    }
  };

  // Executar Envio no Chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const reply = await AIService.chatWithPedagogicalAssistant(chatMessages, userMsg.text);
      const assistantMsg: ChatMessage = {
        id: `chat-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Erro no chat' });
    } finally {
      setChatLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copiado para a área de transferência! 📋' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner da Assistente IA */}
      <div className="bg-gradient-to-r from-sky-700 via-indigo-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-sky-200 border border-white/20">
            <Bot className="w-4 h-4 text-amber-300" />
            <span>Inteligência Artificial Exclusiva para Professoras</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Assistente Pedagógica Inteligente
          </h1>

          <p className="text-sm text-indigo-100 leading-relaxed font-medium">
            Sua assistente para planejar, adaptar e criar atividades especializadas para AEE, autismo e inclusão em poucos segundos.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl text-xs text-indigo-100 space-y-1 shrink-0 text-center md:text-left">
          <p className="font-bold text-white flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Inclusão Garantida
          </p>
          <p className="text-[11px] text-indigo-200">
            Respostas alinhadas à BNCC e práticas baseadas em evidências no TEA.
          </p>
        </div>
      </div>

      {/* Grid Principal: Ferramentas (Esquerda) + Resultado/Histórico (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel de Ferramentas (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
          {/* Navegação entre as 5 ferramentas */}
          <Tabs value={activeTab} onValueChange={(val: any) => { setActiveTab(val); setCurrentResult(''); }}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 p-1 bg-slate-100 rounded-2xl h-auto gap-1">
              <TabsTrigger
                value="generator"
                className="text-[11px] font-bold py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-sky-700 data-[state=active]:shadow-xs flex flex-col sm:flex-row items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Criar Atividade</span>
              </TabsTrigger>

              <TabsTrigger
                value="adapter"
                className="text-[11px] font-bold py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs flex flex-col sm:flex-row items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                <span>Adaptar</span>
              </TabsTrigger>

              <TabsTrigger
                value="lesson-plan"
                className="text-[11px] font-bold py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-xs flex flex-col sm:flex-row items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Plano de Aula</span>
              </TabsTrigger>

              <TabsTrigger
                value="ideas"
                className="text-[11px] font-bold py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-xs flex flex-col sm:flex-row items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Sem Ideias</span>
              </TabsTrigger>

              <TabsTrigger
                value="chat"
                className="text-[11px] font-bold py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:text-rose-700 data-[state=active]:shadow-xs flex flex-col sm:flex-row items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
                <span>Assistente</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: GERADOR DE ATIVIDADES */}
            <TabsContent value="generator" className="space-y-4 pt-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span>✨ Criar uma atividade sob medida</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Preencha os dados e a inteligência criará uma atividade completa com objetivos, desenvolvimento e adaptações.
                </p>
              </div>

              <form onSubmit={handleGenerateActivity} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Público-Alvo</label>
                    <Select value={f1Audience} onValueChange={(val: any) => setF1Audience(val)}>
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
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Faixa Etária</label>
                    <Select value={f1Age} onValueChange={(val: any) => setF1Age(val)}>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Habilidade Trabalhada</label>
                    <Select value={f1Skill} onValueChange={(val: any) => setF1Skill(val)}>
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
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Nível de Dificuldade</label>
                    <Select value={f1Level} onValueChange={(val: any) => setF1Level(val)}>
                      <SelectTrigger className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LEVELS_LIST.map((lvl) => (
                          <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Tema da Atividade</label>
                    <Input
                      value={f1Theme}
                      onChange={(e) => setF1Theme(e.target.value)}
                      placeholder="Ex: Primavera, Animais, Alimentação..."
                      className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Tempo Disponível</label>
                    <Input
                      value={f1Time}
                      onChange={(e) => setF1Time(e.target.value)}
                      placeholder="Ex: 20 a 30 minutos"
                      className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-11 rounded-xl shadow-md shadow-sky-600/20 text-xs flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Estruturando atividade pedagógica...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Criar Atividade com IA</span>
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 2: ADAPTAR ATIVIDADE */}
            <TabsContent value="adapter" className="space-y-4 pt-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span>♻️ Adaptar uma atividade existente para AEE</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Cole o enunciado ou descreva a tarefa regular. A IA transformará em uma versão acessível e inclusiva.
                </p>
              </div>

              <form onSubmit={handleAdaptActivity} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Cole ou descreva a atividade original:
                  </label>
                  <Textarea
                    value={f2OriginalText}
                    onChange={(e) => setF2OriginalText(e.target.value)}
                    rows={4}
                    placeholder="Ex: Ficha de ciências sobre plantas com texto longo e perguntas abertas..."
                    className="text-xs rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Como você gostaria de adaptar?
                  </label>
                  <Select value={f2Goal} onValueChange={(val: any) => setF2Goal(val)}>
                    <SelectTrigger className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mais_simples">Mais simples (passos curtos e diretos)</SelectItem>
                      <SelectItem value="mais_visual">Mais visual (pictogramas e pareamento)</SelectItem>
                      <SelectItem value="menos_estimulos">Menos estímulos (sensory-friendly / sem sobrecarga)</SelectItem>
                      <SelectItem value="atencao">Foco em atenção e concentração sustentada</SelectItem>
                      <SelectItem value="comunicacao_csa">Comunicação Alternativa (PECS / prancha)</SelectItem>
                      <SelectItem value="coordenacao">Coordenação motora adaptada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Perfil do aluno (opcional):
                  </label>
                  <Input
                    value={f2StudentProfile}
                    onChange={(e) => setF2StudentProfile(e.target.value)}
                    placeholder="Ex: Criança autista não-verbal, adora dinossauros..."
                    className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl shadow-md shadow-emerald-600/20 text-xs flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gerando adaptação inclusiva...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Gerar Versão Adaptada</span>
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 3: PLANO DE AULA */}
            <TabsContent value="lesson-plan" className="space-y-4 pt-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span>📚 Criar plano de aula estruturado (BNCC)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Gere um plano completo com acolhimento, desenvolvimento prático, recursos de acessibilidade e avaliação.
                </p>
              </div>

              <form onSubmit={handleGenerateLessonPlan} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Tema da Aula</label>
                    <Input
                      value={f3Theme}
                      onChange={(e) => setF3Theme(e.target.value)}
                      placeholder="Ex: Higiene pessoal e autonomia"
                      className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Faixa Etária</label>
                    <Select value={f3Age} onValueChange={(val: any) => setF3Age(val)}>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Duração Total</label>
                    <Input
                      value={f3Duration}
                      onChange={(e) => setF3Duration(e.target.value)}
                      placeholder="Ex: 50 minutos"
                      className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Habilidade Principal</label>
                    <Select value={f3Skill} onValueChange={(val: any) => setF3Skill(val)}>
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
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Objetivo Pedagógico Central</label>
                  <Input
                    value={f3Objective}
                    onChange={(e) => setF3Objective(e.target.value)}
                    placeholder="Ex: Promover a autorregulação através de rotinas visuais"
                    className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl shadow-md shadow-indigo-600/20 text-xs flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Estruturando plano de aula...</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Gerar Plano de Aula Completo</span>
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 4: IDEIAS RÁPIDAS */}
            <TabsContent value="ideas" className="space-y-4 pt-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span>💡 Estou sem ideias — Ajuda Instantânea</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Descreva o que está acontecendo ou o tempo que você tem. Receba 3 ideias práticas imediatas com materiais que você já tem na sala.
                </p>
              </div>

              <form onSubmit={handleGenerateQuickIdeas} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Conte sua situação ou desafio:
                  </label>
                  <Textarea
                    value={f4Situation}
                    onChange={(e) => setF4Situation(e.target.value)}
                    rows={4}
                    placeholder="Ex: Tenho 30 minutos com uma criança de 6 anos e quero trabalhar atenção..."
                    className="text-xs rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white"
                  />
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Exemplos rápidos:</span>
                  <button
                    type="button"
                    onClick={() => setF4Situation('Tenho 20 minutos no AEE com aluno autista agitado e preciso acalmá-lo trabalhando coordenação.')}
                    className="text-sky-600 hover:underline"
                  >
                    Aluno agitado no AEE
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setF4Situation('Preciso de uma dinâmica em grupo inclusiva para a roda de conversa com crianças de 4 a 5 anos.')}
                    className="text-sky-600 hover:underline"
                  >
                    Roda de conversa inclusiva
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold h-11 rounded-xl shadow-md shadow-amber-500/20 text-xs flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Buscando ideias criativas...</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-4 h-4" />
                      <span>Gerar 3 Ideias Rápidas</span>
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* TAB 5: CHAT COM A ASSISTENTE */}
            <TabsContent value="chat" className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <span>🤖 Conversar com a Assistente Pedagógica</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tire dúvidas em tempo real sobre manejo de crises, PEI, atividades da biblioteca ou adaptações.
                </p>
              </div>

              {/* Mensagens do Chat */}
              <div className="h-80 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">
                        🤖
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-xs whitespace-pre-line'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] mt-1 ${msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex gap-2 items-center text-xs text-slate-400 pl-9">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-medium text-sky-700">Assistente digitando orientações...</span>
                  </div>
                )}
              </div>

              {/* Input do Chat */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Conte o que você precisa preparar hoje..."
                  className="h-10 text-xs rounded-xl bg-slate-50 border-slate-200 focus-visible:bg-white"
                />
                <Button
                  type="submit"
                  disabled={!chatInput.trim() || chatLoading}
                  className="bg-sky-600 hover:bg-sky-700 text-white h-10 px-4 rounded-xl shrink-0 font-bold"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Painel Lateral: Resultado Atual & Histórico de Gerações (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card do Resultado Gerado */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-sm text-slate-800">Resultado Gerado</h3>
              </div>

              {currentResult && (
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 text-xs text-slate-600 hover:text-slate-900"
                    title="Copiar texto"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="ml-1 text-[11px]">{copied ? 'Copiado!' : 'Copiar'}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrint}
                    className="h-7 text-xs text-slate-600 hover:text-slate-900"
                    title="Imprimir"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="ml-1 text-[11px]">Imprimir</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Conteúdo do Resultado ou Estado Vazio */}
            {isLoading ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-700">A assistente pedagógica está estruturando o material...</p>
                <p className="text-[11px] text-slate-400">Aplicando diretrizes do DUA e adaptações para inclusão escolar.</p>
              </div>
            ) : currentResult ? (
              <div className="max-h-[500px] overflow-y-auto p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-normal space-y-2">
                {currentResult}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2 text-slate-400">
                <Bot className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-medium text-slate-600">Nenhuma geração no momento</p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Escolha uma ferramenta ao lado, preencha as preferências e clique em gerar para ver o resultado estruturado aqui.
                </p>
              </div>
            )}
          </div>

          {/* Histórico das Gerações Recentes */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-sky-600" />
                Histórico de Gerações
              </span>
              <span className="text-[10px] text-slate-400">{aiHistory.length} salvas</span>
            </div>

            {aiHistory.length > 0 ? (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {aiHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCurrentResult(item.content)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-100 cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-slate-800 truncate max-w-[200px]">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[11px] text-slate-400 py-4">
                Suas atividades geradas ficarão salvas aqui para você consultar a qualquer momento.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
