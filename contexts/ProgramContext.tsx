'use client';

// Kadjot Fitness - Program State Context

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProgramData, DayProgress } from '../lib/types';
import { getTodayKey } from '../lib/utils/activityHelpers';
import { useAuth } from './AuthContext';
import { programApi, activityApi } from '../lib/utils/api';

interface ProgramContextType {
  programData: ProgramData;
  setProgramStart: (startDate: string, dayStartTime: string) => Promise<void>;
  toggleActivity: (activityId: string, date?: string) => Promise<void>;
  resetProgram: () => void;
  isLoading: boolean;
}

const STORAGE_KEY = 'kadjot_next_program_data';
const OLD_STORAGE_KEY = 'kadjot_program_data'; // Old HTML version key

const initialProgramData: ProgramData = {
  startDate: null,
  dayStartTime: '05:00',
  dailyPlans: [],
  todayProgress: {},
  completedDays: [],
  stats: { totalWorkouts: 0 },
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function ProgramProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [programData, setProgramData] = useState<ProgramData>(initialProgramData);
  const [programId, setProgramId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data when auth state changes
  useEffect(() => {
    if (!authLoading) {
      loadData();
    }
  }, [isAuthenticated, authLoading]);

  // Save data whenever it changes
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Guest mode: save to localStorage
        saveData();
      }
      // TODO: For authenticated users, save to backend API
      // For now, also save to localStorage as backup
      if (isAuthenticated && programData.startDate) {
        saveData();
      }
    }
  }, [programData, isLoading, isAuthenticated]);

  async function loadData() {
    try {
      // Clean up old localStorage key from HTML version
      if (localStorage.getItem(OLD_STORAGE_KEY)) {
        localStorage.removeItem(OLD_STORAGE_KEY);
      }

      if (isAuthenticated) {
        // Fetch from backend API
        const { program } = await programApi.getActive();
        if (program) {
          setProgramId(program.id);
          setProgramData({
            startDate: program.start_date,
            dayStartTime: program.day_start_time || '05:00',
            dailyPlans: [],
            todayProgress: {},
            completedDays: [],
            stats: { totalWorkouts: 0 },
          });
          
          // Also load from localStorage as backup for activity completions
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const localData = JSON.parse(saved);
            if (localData.todayProgress) {
              setProgramData(prev => ({
                ...prev,
                todayProgress: localData.todayProgress,
                completedDays: localData.completedDays || []
              }));
            }
          }
        } else {
          // No program in database, start fresh
          setProgramId(null);
          setProgramData(initialProgramData);
        }
      } else {
        // Guest mode: load from NEW localStorage key
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          // Recalculate completedDays from todayProgress to ensure consistency
          data.completedDays = recalculateCompletedDays(data);
          setProgramData(data);
        } else {
          setProgramData(initialProgramData);
        }
      }
    } catch (error) {
      console.error('Error loading program data:', error);
      // Fallback to localStorage on API error
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setProgramData(data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(programData));
    } catch (error) {
      console.error('Error saving program data:', error);
    }
  }

  // Helper function to recalculate completedDays from todayProgress
  function recalculateCompletedDays(data: ProgramData): string[] {
    if (!data.startDate || !data.todayProgress) return [];
    
    const { WEEK_ACTIVITIES } = require('../lib/utils/constants');
    const { getCycleDayName } = require('../lib/utils/activityHelpers');
    
    const completedDays: string[] = [];
    const startDate = new Date(data.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    // Check each date in todayProgress
    Object.keys(data.todayProgress).forEach(dateKey => {
      const dayProgress = data.todayProgress[dateKey];
      
      // Calculate which day of the program THIS SPECIFIC DATE represents
      const thisDate = new Date(dateKey);
      thisDate.setHours(0, 0, 0, 0);
      const diffTime = thisDate.getTime() - startDate.getTime();
      const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 for 1-indexed
      
      const dayName = getCycleDayName(daysSinceStart);
      const activities = WEEK_ACTIVITIES[dayName] || [];
      const totalActivities = activities.length;
      
      // ONLY count activities that are actually part of this day's schedule
      const validActivityIds = activities.map(a => a.id);
      const completedCount = validActivityIds.filter(id => dayProgress[id] === true).length;
      
      if (completedCount === totalActivities && totalActivities > 0) {
        completedDays.push(dateKey);
      }
    });
    
    return completedDays;
  }

  async function setProgramStart(startDate: string, dayStartTime: string) {
    try {
      if (isAuthenticated) {
        // Save to backend API
        const result = await programApi.create(startDate, dayStartTime);
        setProgramId(result.program_id);
      }
      
      // Update local state
      setProgramData((prev) => ({
        ...prev,
        startDate,
        dayStartTime,
      }));
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Failed to create program. Please try again.');
    }
  }

  async function toggleActivity(activityId: string, date?: string) {
    const dateKey = date || getTodayKey();

    // First, update local state optimistically
    setProgramData((prev) => {
      // Create a deep copy of todayProgress
      const newProgress: DayProgress = {};
      
      // Copy all existing dates
      Object.keys(prev.todayProgress).forEach(key => {
        newProgress[key] = { ...prev.todayProgress[key] };
      });

      // Ensure the current date exists
      if (!newProgress[dateKey]) {
        newProgress[dateKey] = {};
      }

      // Toggle the activity
      const wasCompleted = newProgress[dateKey][activityId] || false;
      const nowCompleted = !wasCompleted;
      newProgress[dateKey][activityId] = nowCompleted;

      // Check if day is 100% complete
      // Get today's activity count based on program day
      const { WEEK_ACTIVITIES } = require('../lib/utils/constants');
      const { getCycleDayName, getDaysSinceStart } = require('../lib/utils/activityHelpers');
      
      let updatedCompletedDays = [...prev.completedDays];
      
      if (prev.startDate) {
        const programDays = getDaysSinceStart(prev.startDate);
        const dayName = getCycleDayName(programDays);
        const activities = WEEK_ACTIVITIES[dayName] || [];
        const totalActivities = activities.length;
        
        // ONLY count activities that are actually part of this day's schedule
        const validActivityIds = activities.map(a => a.id);
        const completedCount = validActivityIds.filter(id => newProgress[dateKey][id] === true).length;
        const isFullyComplete = completedCount === totalActivities && totalActivities > 0;
        
        // Update completedDays array
        const wasInCompletedDays = updatedCompletedDays.includes(dateKey);
        
        if (isFullyComplete && !wasInCompletedDays) {
          // Day just reached 100%, add to completedDays
          updatedCompletedDays.push(dateKey);
        } else if (!isFullyComplete && wasInCompletedDays) {
          // Day was 100% but no longer is, remove from completedDays
          updatedCompletedDays = updatedCompletedDays.filter(d => d !== dateKey);
        }
      }

      // Try to save to backend for authenticated users
      if (isAuthenticated && programId) {
        (async () => {
          try {
            // Note: Backend expects day_plan_id, but for simplicity we'll use programId
            // This is a workaround - ideally we'd create/fetch day plans properly
            // For now, just save to localStorage as the backend integration needs more work
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
              ...prev,
              todayProgress: newProgress,
              completedDays: updatedCompletedDays
            }));
          } catch (error) {
            console.error('Error saving activity to backend:', error);
          }
        })();
      }

      return {
        ...prev,
        todayProgress: newProgress,
        completedDays: updatedCompletedDays,
      };
    });
  }

  function resetProgram() {
    setProgramData(initialProgramData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(OLD_STORAGE_KEY); // Also clean up old key
  }

  const value: ProgramContextType = {
    programData,
    setProgramStart,
    toggleActivity,
    resetProgram,
    isLoading,
  };

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
}

/**
 * useProgram hook
 */
export function useProgram() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
}
