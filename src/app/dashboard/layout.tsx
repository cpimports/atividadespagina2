"use client";

import React from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';
import { GeniozinhoProvider } from '@/context/geniozinho-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeniozinhoProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar no Desktop */}
        <div className="hidden lg:block h-full">
          <Sidebar />
        </div>

        {/* Área Central de Conteúdo */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Topbar />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto pb-16">
              {children}
            </div>
          </main>
        </div>
      </div>
    </GeniozinhoProvider>
  );
}

