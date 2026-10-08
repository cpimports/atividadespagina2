"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  Search, 
  Bell, 
  ShieldCheck, 
  User, 
  ExternalLink, 
  Check, 
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGeniozinho } from '@/context/geniozinho-context';
import { Sidebar } from './sidebar';

export function Topbar() {
  const router = useRouter();
  const { 
    teacherProfile, 
    notifications, 
    unreadNotificationsCount, 
    markAllNotificationsRead, 
    isAdminMode, 
    toggleAdminMode 
  } = useGeniozinho();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/biblioteca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Esquerda: Mobile Menu Toggle & Busca Rápida */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Sheet Trigger */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-slate-600">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar onNavigate={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por atividade, habilidade, tema ou idade..."
            className="pl-9 pr-4 h-9 bg-slate-50 border-slate-200 text-xs rounded-xl focus-visible:ring-sky-500 focus-visible:bg-white transition-all w-full"
          />
        </form>
      </div>

      {/* Direita: Ações, Notificações e Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Botão de Alternar Modo Admin para teste rápido */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAdminMode}
          className={`text-xs font-semibold h-8 rounded-lg transition-all ${
            isAdminMode
              ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              : 'text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Alternar entre visão da Professora e visão da Administradora"
        >
          <ShieldCheck className={`w-3.5 h-3.5 mr-1 ${isAdminMode ? 'text-amber-700' : 'text-slate-400'}`} />
          <span className="hidden md:inline">{isAdminMode ? 'Modo Admin Ativo' : 'Visão Admin'}</span>
        </Button>

        {/* Notificações Interativas */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-600 hover:text-slate-900 h-9 w-9 rounded-xl"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white ring-1 ring-rose-200 animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl shadow-xl border-slate-200" align="end">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-800">Notificações</span>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-1.5 py-0.2 rounded-full">
                    {unreadNotificationsCount} novas
                  </span>
                )}
              </div>
              {unreadNotificationsCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] text-sky-600 hover:text-sky-700 font-medium"
                >
                  Marcar como lidas
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 text-xs space-y-1 transition-colors ${
                    notif.read ? 'bg-white opacity-70' : 'bg-sky-50/40 font-medium'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-800 text-[11px]">{notif.title}</p>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.date}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{notif.message}</p>
                  {notif.link && (
                    <Link
                      href={notif.link}
                      className="inline-block text-[10px] text-sky-600 font-bold hover:underline pt-0.5"
                    >
                      Ver detalhes →
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="p-2 border-t border-slate-100 text-center bg-slate-50 rounded-b-2xl">
              <span className="text-[10px] text-slate-400">
                Avisos de novos materiais e atualizações da comunidade
              </span>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-sky-100 border border-sky-300 shrink-0">
                <img
                  src={teacherProfile.avatar}
                  alt={teacherProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <span className="font-bold text-xs text-slate-800 block leading-tight">
                  Profª {teacherProfile.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {teacherProfile.role.split('&')[0]}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-1.5 rounded-xl shadow-lg border-slate-200" align="end">
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {teacherProfile.name}
                </p>
                <p className="text-[11px] text-slate-500 leading-none truncate">
                  {teacherProfile.email}
                </p>
                <div className="pt-1">
                  <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ⭐ Assinatura Ativa (R$ 39,90)
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/perfil" className="text-xs font-medium cursor-pointer">
                <User className="w-3.5 h-3.5 mr-2 text-slate-500" />
                <span>Meu Perfil & Assinatura</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/admin" className="text-xs font-medium cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5 mr-2 text-amber-500" />
                <span>Área Administrativa</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/comunidade" className="text-xs font-medium cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 mr-2 text-sky-500" />
                <span>Grupo VIP no WhatsApp</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => router.push('/')}
              className="text-xs font-medium text-rose-600 cursor-pointer focus:bg-rose-50"
            >
              <LogOut className="w-3.5 h-3.5 mr-2" />
              <span>Sair da conta</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
