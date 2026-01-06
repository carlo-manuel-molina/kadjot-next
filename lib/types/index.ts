// Kadjot Fitness - TypeScript Type Definitions

export interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface Program {
  id: number;
  user_id: number;
  start_date: string;
  day_start_time: string;
  current_week: number;
  current_phase: string;
  status: 'active' | 'paused' | 'completed' | 'reset';
  created_at?: string;
  updated_at?: string;
}

export interface Activity {
  id: string;
  name: string;
  time: string;
  duration: string;
  details: string;
  link: string;
}

export type ActivityStatus = 'scheduled' | 'upcoming' | 'ongoing' | 'missed' | 'completed';

export interface ActivityProgress {
  [activityId: string]: boolean;
}

export interface DayProgress {
  [date: string]: ActivityProgress;
}

export interface ProgramData {
  startDate: string | null;
  dayStartTime: string;
  dailyPlans: DailyPlan[];
  todayProgress: DayProgress;
  completedDays: string[]; // Array of dates (YYYY-MM-DD) with 100% completion
  stats: ProgramStats;
}

export interface DailyPlan {
  date: string;
  generated: boolean;
}

export interface ProgramStats {
  totalWorkouts: number;
  currentStreak?: number;
  longestStreak?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface WeekActivities {
  [day: string]: Activity[];
}

export interface PhaseInfo {
  name: string;
  weeks: string;
  color: string;
}

export interface Phases {
  [week: number]: PhaseInfo;
}
