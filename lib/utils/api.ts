// Kadjot Fitness - API Client

import { User, Program } from '../types';
import { API_BASE_URL } from './constants';

interface ApiResponse<T> {
  success?: boolean;
  error?: string;
  [key: string]: any;
}

/**
 * Base fetch with credentials
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// ============= AUTH APIs =============

export const authApi = {
  /**
   * Register new user
   */
  async register(username: string, email: string, password: string): Promise<{ user: User }> {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  /**
   * Login user
   */
  async login(username: string, password: string): Promise<{ user: User }> {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  /**
   * Logout user
   */
  async logout(): Promise<{ success: boolean }> {
    return apiFetch('/auth/logout', { method: 'POST' });
  },

  /**
   * Get current user
   */
  async me(): Promise<{ user: User }> {
    return apiFetch('/auth/me');
  },
};

// ============= PROGRAM APIs =============

export const programApi = {
  /**
   * Get active program
   */
  async getActive(): Promise<{ program: Program | null }> {
    return apiFetch('/programs/active');
  },

  /**
   * Create new program
   */
  async create(startDate: string, dayStartTime: string = '05:00'): Promise<{ program_id: number }> {
    return apiFetch('/programs', {
      method: 'POST',
      body: JSON.stringify({ start_date: startDate, day_start_time: dayStartTime }),
    });
  },

  /**
   * Update program
   */
  async update(
    programId: number,
    data: Partial<Pick<Program, 'current_week' | 'current_phase' | 'status'>>
  ): Promise<{ success: boolean }> {
    return apiFetch(`/programs/${programId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// ============= ACTIVITY APIs =============

export const activityApi = {
  /**
   * Toggle activity completion
   */
  async toggleCompletion(
    dayPlanId: number,
    activityId: string,
    completed: boolean
  ): Promise<{ success: boolean }> {
    return apiFetch('/activity-progress/toggle', {
      method: 'POST',
      body: JSON.stringify({ day_plan_id: dayPlanId, activity_id: activityId, completed }),
    });
  },

  /**
   * Get or create day plan for a specific date
   */
  async getOrCreateDayPlan(
    programId: number,
    date: string
  ): Promise<{ day_plan_id: number }> {
    return apiFetch(`/programs/${programId}/day-plans/${date}`, {
      method: 'POST',
      body: JSON.stringify({ plan_date: date }),
    });
  },
};

// ============= HEALTH CHECK =============

export async function checkHealth(): Promise<{ status: string; database: string }> {
  try {
    return await apiFetch('/health');
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}
