"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Activity, 
  Suggestion, 
  VotePoll, 
  CalendarEvent, 
  AppNotification, 
  TeacherProfile,
  AIGenerationHistoryItem,
  SuggestionStatus
} from '@/lib/types';
import { 
  initialActivities, 
  initialSuggestions, 
  initialVotePolls, 
  initialCalendarEvents, 
  initialNotifications, 
  initialTeacherProfile 
} from '@/lib/mock-data';

interface GeniozinhoContextType {
  // Atividades
  activities: Activity[];
  favorites: string[];
  toggleFavorite: (activityId: string) => void;
  isFavorite: (activityId: string) => boolean;
  addActivity: (activity: Omit<Activity, 'id' | 'accessCount' | 'downloadsCount'>) => Activity;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  
  // Histórico
  history: { activity: Activity; viewedAt: string }[];
  recordView: (activity: Activity) => void;
  clearHistory: () => void;

  // Sugestões
  suggestions: Suggestion[];
  submitSuggestion: (data: {
    title: string;
    targetAudience: Suggestion['targetAudience'];
    skill: Suggestion['skill'];
    ageRange: Suggestion['ageRange'];
    description: string;
  }) => Suggestion;
  voteSuggestion: (id: string) => void;
  updateSuggestionStatus: (id: string, status: SuggestionStatus) => void;

  // Votações
  polls: VotePoll[];
  votePoll: (pollId: string) => void;
  createPoll: (poll: Omit<VotePoll, 'id' | 'votesCount' | 'votedByMe' | 'status'>) => void;

  // Calendário
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;

  // Notificações
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;

  // IA Histórico
  aiHistory: AIGenerationHistoryItem[];
  saveAIGeneration: (item: Omit<AIGenerationHistoryItem, 'id' | 'createdAt'>) => void;

  // Perfil & Admin
  teacherProfile: TeacherProfile;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  toggleAdminMode: () => void;
}

const GeniozinhoContext = createContext<GeniozinhoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FAVORITES: 'geniozinho_favorites',
  HISTORY: 'geniozinho_history',
  SUGGESTIONS: 'geniozinho_suggestions',
  ACTIVITIES: 'geniozinho_activities',
  POLLS: 'geniozinho_polls',
  NOTIFICATIONS: 'geniozinho_notifications',
  AI_HISTORY: 'geniozinho_ai_history',
  ADMIN_MODE: 'geniozinho_admin_mode',
};

export function GeniozinhoProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [favorites, setFavorites] = useState<string[]>(['1', '10', '35', '42', '43', '50', '59']);
  const [history, setHistory] = useState<{ activity: Activity; viewedAt: string }[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [polls, setPolls] = useState<VotePoll[]>(initialVotePolls);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [aiHistory, setAiHistory] = useState<AIGenerationHistoryItem[]>([]);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(initialTeacherProfile);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Carregar dados salvos do localStorage na montagem
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedSuggestions = localStorage.getItem(STORAGE_KEYS.SUGGESTIONS);
      if (savedSuggestions) setSuggestions(JSON.parse(savedSuggestions));

      const savedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (savedActivities) setActivities(JSON.parse(savedActivities));

      const savedPolls = localStorage.getItem(STORAGE_KEYS.POLLS);
      if (savedPolls) setPolls(JSON.parse(savedPolls));

      const savedAi = localStorage.getItem(STORAGE_KEYS.AI_HISTORY);
      if (savedAi) setAiHistory(JSON.parse(savedAi));

      const savedAdmin = localStorage.getItem(STORAGE_KEYS.ADMIN_MODE);
      if (savedAdmin) setIsAdminMode(JSON.parse(savedAdmin));
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Salvar no localStorage quando o estado mudar
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch {}
  }, [history, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
    } catch {}
  }, [suggestions, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch {}
  }, [activities, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.POLLS, JSON.stringify(polls));
    } catch {}
  }, [polls, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.AI_HISTORY, JSON.stringify(aiHistory));
    } catch {}
  }, [aiHistory, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_MODE, JSON.stringify(isAdminMode));
    } catch {}
  }, [isAdminMode, isHydrated]);

  // Ações de Atividades & Favoritos
  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(activityId);
      if (exists) {
        return prev.filter((id) => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });

    setActivities((prev) =>
      prev.map((act) =>
        act.id === activityId ? { ...act, isFavorite: !act.isFavorite } : act
      )
    );
  };

  const isFavorite = (activityId: string) => favorites.includes(activityId);

  const addActivity = (data: Omit<Activity, 'id' | 'accessCount' | 'downloadsCount'>) => {
    const newAct: Activity = {
      ...data,
      id: `act-${Date.now()}`,
      accessCount: 1,
      downloadsCount: 0,
      publishedAt: new Date().toISOString().split('T')[0],
      isFavorite: false,
    };
    setActivities((prev) => [newAct, ...prev]);
    return newAct;
  };

  const updateActivity = (updated: Activity) => {
    setActivities((prev) => prev.map((act) => (act.id === updated.id ? updated : act)));
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((act) => act.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setHistory((prev) => prev.filter((h) => h.activity.id !== id));
  };

  // Histórico
  const recordView = (activity: Activity) => {
    const nowStr = new Date().toISOString();
    setHistory((prev) => {
      // Remove anterior se já estiver no histórico para subir para o topo
      const filtered = prev.filter((item) => item.activity.id !== activity.id);
      return [{ activity, viewedAt: nowStr }, ...filtered].slice(0, 30);
    });

    // Incrementa contagem de acesso na atividade
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activity.id ? { ...a, accessCount: (a.accessCount || 0) + 1 } : a
      )
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Sugestões
  const submitSuggestion = (data: {
    title: string;
    targetAudience: Suggestion['targetAudience'];
    skill: Suggestion['skill'];
    ageRange: Suggestion['ageRange'];
    description: string;
  }) => {
    const newSug: Suggestion = {
      id: `sug-${Date.now()}`,
      ...data,
      votesCount: 1,
      status: 'em_analise',
      authorName: `Profª ${teacherProfile.name}`,
      createdAt: new Date().toISOString().split('T')[0],
      votedByMe: true,
    };
    setSuggestions((prev) => [newSug, ...prev]);
    return newSug;
  };

  const voteSuggestion = (id: string) => {
    setSuggestions((prev) =>
      prev.map((sug) => {
        if (sug.id === id) {
          const currentlyVoted = sug.votedByMe;
          return {
            ...sug,
            votesCount: currentlyVoted ? sug.votesCount - 1 : sug.votesCount + 1,
            votedByMe: !currentlyVoted,
          };
        }
        return sug;
      })
    );
  };

  const updateSuggestionStatus = (id: string, status: SuggestionStatus) => {
    setSuggestions((prev) =>
      prev.map((sug) => (sug.id === id ? { ...sug, status } : sug))
    );
  };

  // Votações
  const votePoll = (pollId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId) {
          const currentlyVoted = poll.votedByMe;
          return {
            ...poll,
            votesCount: currentlyVoted ? poll.votesCount - 1 : poll.votesCount + 1,
            votedByMe: !currentlyVoted,
          };
        }
        return poll;
      })
    );
  };

  const createPoll = (poll: Omit<VotePoll, 'id' | 'votesCount' | 'votedByMe' | 'status'>) => {
    const newPoll: VotePoll = {
      ...poll,
      id: `poll-${Date.now()}`,
      votesCount: 0,
      votedByMe: false,
      status: 'ativa',
    };
    setPolls((prev) => [newPoll, ...prev]);
  };

  // Calendário
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEv: CalendarEvent = {
      ...event,
      id: `cal-${Date.now()}`,
    };
    setCalendarEvents((prev) => [...prev, newEv]);
  };

  // Notificações
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // IA
  const saveAIGeneration = (item: Omit<AIGenerationHistoryItem, 'id' | 'createdAt'>) => {
    const record: AIGenerationHistoryItem = {
      ...item,
      id: `ai-${Date.now()}`,
      createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setAiHistory((prev) => [record, ...prev].slice(0, 20));
  };

  // Toggle Admin
  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
  };

  return (
    <GeniozinhoContext.Provider
      value={{
        activities,
        favorites,
        toggleFavorite,
        isFavorite,
        addActivity,
        updateActivity,
        deleteActivity,
        history,
        recordView,
        clearHistory,
        suggestions,
        submitSuggestion,
        voteSuggestion,
        updateSuggestionStatus,
        polls,
        votePoll,
        createPoll,
        calendarEvents,
        addCalendarEvent,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsRead,
        markNotificationRead,
        aiHistory,
        saveAIGeneration,
        teacherProfile,
        isAdminMode,
        setIsAdminMode,
        toggleAdminMode,
      }}
    >
      {children}
    </GeniozinhoContext.Provider>
  );
}

export function useGeniozinho() {
  const context = useContext(GeniozinhoContext);
  if (!context) {
    throw new Error('useGeniozinho must be used within a GeniozinhoProvider');
  }
  return context;
}
