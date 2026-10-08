"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Bot, 
  Calendar, 
  Lightbulb, 
  Vote, 
  Heart, 
  History, 
  Users, 
  User, 
  ShieldCheck, 
  Crown,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { favorites, isAdminMode } = useGeniozinho();

  const navItems = [
    { label: 'Início', href: '/dashboard', icon: Home, badge: null },
    { label: 'Biblioteca', href: '/dashboard/biblioteca', icon: BookOpen, badge: null },
    { label: 'Novidades', href: '/dashboard/novidades', icon: Sparkles, badge: '32 novos', badgeColor: 'bg-amber-100 text-amber-800' },
    { label: 'Inteligência Artificial', href: '/dashboard/ia', icon: Bot, badge: 'NOVO', badgeColor: 'bg-sky-100 text-sky-700' },
    { label: 'Calendário Pedagógico', href: '/dashboard/calendario', icon: Calendar, badge: null },
    { label: 'Sugira uma Atividade', href: '/dashboard/sugestoes', icon: Lightbulb, badge: null },
    { label: 'Votações', href: '/dashboard/votacoes', icon: Vote, badge: null },
    { label: 'Favoritos', href: '/dashboard/favoritos', icon: Heart, badge: favorites.length > 0 ? String(favorites.length) : null, badgeColor: 'bg-rose-100 text-rose-700' },
    { label: 'Histórico', href: '/dashboard/historico', icon: History, badge: null },
    { label: 'Comunidade', href: '/dashboard/comunidade', icon: Users, badge: 'VIP', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { label: 'Meu Perfil', href: '/dashboard/perfil', icon: User, badge: null },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none">
      {/* Top Brand Logo */}
      <div className="p-5 border-b border-slate-100">
        <Link 
          href="/dashboard" 
          onClick={onNavigate}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              Gêniozinho <span className="text-sky-600">em Ação</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              Recursos para AEE & Inclusão
            </span>
          </div>
        </Link>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Menu Principal
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100/80 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Link para o Painel Admin */}
        <div className="pt-4 mt-2 border-t border-slate-100">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Administração</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <Link
            href="/dashboard/admin"
            onClick={onNavigate}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === '/dashboard/admin'
                ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200 shadow-sm'
                : 'text-slate-600 hover:bg-amber-50/50 hover:text-amber-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Painel Admin</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          </Link>
        </div>
      </div>

      {/* Bottom Subscription Card */}
      <div className="p-4 border-t border-slate-100 bg-gradient-to-b from-transparent to-slate-50">
        <div className="bg-sky-50/80 rounded-xl p-3 border border-sky-100 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sky-900 flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Plano Assinante
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
              Ativo
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Acesso ilimitado a +1.500 materiais e ferramentas de IA.
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>R$ 39,90/mês</span>
            <Link
              href="/dashboard/perfil"
              onClick={onNavigate}
              className="text-sky-600 font-semibold hover:underline"
            >
              Gerenciar →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
