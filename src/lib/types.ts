export type ActivitySkill =
  | 'Atenção'
  | 'Concentração'
  | 'Coordenação motora'
  | 'Motricidade fina'
  | 'Percepção visual'
  | 'Raciocínio lógico'
  | 'Comunicação'
  | 'Emoções'
  | 'Habilidades sociais'
  | 'Alfabetização'
  | 'Matemática'
  | 'Ciências'
  | 'Cores'
  | 'Formas'
  | 'Sequências'
  | 'Pareamento';

export type TargetAudience =
  | 'Educação infantil'
  | 'Educação especial'
  | 'AEE'
  | 'Alfabetização'
  | 'Crianças autistas';

export type AgeRange =
  | '3–4 anos'
  | '5–6 anos'
  | '7–8 anos'
  | '9–10 anos'
  | '11+ anos';

export type ActivityLevel = 'Fácil' | 'Intermediário' | 'Avançado';

export type ActivityType =
  | 'Atividade'
  | 'Jogo'
  | 'Ficha'
  | 'Cartaz'
  | 'Molde'
  | 'Recurso pedagógico'
  | 'Lembrancinha'
  | 'Material para imprimir';

export interface Activity {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  pdfUrl: string;
  isFavorite?: boolean;
  aiHint?: string;
  
  // Categorias detalhadas para filtros
  skills: ActivitySkill[];
  targetAudience: TargetAudience[];
  ageRange: AgeRange;
  level: ActivityLevel;
  type: ActivityType;
  
  // Detalhes pedagógicos (página/modal da atividade)
  pedagogicalObjective: string;
  skillsWorked: string;
  description: string;
  howToUse: string; // Passo a passo para a professora / mediadora de AEE
  materialsNeeded: string[];
  
  // Badges e destaques
  isNew?: boolean;
  isPopular?: boolean;
  isExclusive?: boolean;
  accessCount?: number;
  downloadsCount?: number;
  publishedAt?: string;
  tags?: string[];
}

export type SuggestionStatus = 'em_analise' | 'em_producao' | 'disponivel' | 'recusada';

export interface Suggestion {
  id: string;
  title: string;
  targetAudience: TargetAudience;
  skill: ActivitySkill;
  ageRange: AgeRange;
  description: string;
  votesCount: number;
  status: SuggestionStatus;
  authorName: string;
  createdAt: string;
  votedByMe?: boolean;
}

export interface VotePoll {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  votesCount: number;
  goal: number;
  category: string;
  expiresAt: string;
  votedByMe?: boolean;
  status: 'ativa' | 'encerrada';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  monthNumber: number; // 1-12
  badge: string;
  description: string;
  relatedActivityIds: string[];
  category: string;
  color: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'new_material' | 'suggestion_ready' | 'thematic_event' | 'system';
  link?: string;
}

export interface TeacherProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  school: string;
  subscriptionPlan: string;
  subscriptionPrice: string;
  subscriptionStatus: 'ativa' | 'pendente' | 'cancelada';
  nextBillingDate: string;
  gamification: {
    title: string;
    points: number;
    badges: {
      id: string;
      title: string;
      description: string;
      icon: string;
      unlocked: boolean;
    }[];
  };
}

export interface AIGenerationHistoryItem {
  id: string;
  toolType: 'generator' | 'adapter' | 'lesson-plan' | 'ideas' | 'chat';
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

export interface HistoryItem {
  activityId: string;
  viewedAt: string;
}
