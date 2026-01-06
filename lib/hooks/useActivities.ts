'use client';

// Kadjot Fitness - Activities Custom Hook

import { useMemo, useState, useEffect } from 'react';
import { Activity, ActivityStatus } from '../types';
import { WEEK_ACTIVITIES } from '../utils/constants';
import { getActivityStatus, getCycleDayName, getDaysSinceStart } from '../utils/activityHelpers';
import { useProgram } from '../../contexts/ProgramContext';

interface ActivityWithStatus extends Activity {
  status: ActivityStatus;
  isCompleted: boolean;
}

interface UseActivitiesOptions {
  date?: string; // Optional date in YYYY-MM-DD format
}

export function useActivities(options: UseActivitiesOptions = {}) {
  const { programData } = useProgram();
  
  // Get current local date in YYYY-MM-DD format (not UTC!)
  const getCurrentLocalDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Use provided date or calculate current date fresh (no caching)
  const currentDate = getCurrentLocalDate();
  const viewDate = options.date || currentDate;

  const todaysActivities: ActivityWithStatus[] = useMemo(() => {
    if (!programData.startDate) {
      return [];
    }

    const todayKey = viewDate;
    
    // Calculate days since start for the view date
    const viewDateObj = new Date(viewDate);
    viewDateObj.setHours(0, 0, 0, 0);
    const startDate = new Date(programData.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const diffTime = viewDateObj.getTime() - startDate.getTime();
    const daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const programDays = daysSince + 1;
    
    const dayName = getCycleDayName(programDays);
    const activities = WEEK_ACTIVITIES[dayName] || [];

    const todayProgress = programData.todayProgress[todayKey] || {};

    const isProgramStarted = viewDateObj >= startDate;

    return activities.map((activity) => {
      const isCompleted = todayProgress[activity.id] || false;
      const status = getActivityStatus(activity, isCompleted, isProgramStarted);

      return {
        ...activity,
        status,
        isCompleted,
      };
    });
  }, [programData.startDate, programData.todayProgress, viewDate]);

  const completedCount = useMemo(() => {
    return todaysActivities.filter((a) => a.isCompleted).length;
  }, [todaysActivities]);

  const completionPercentage = useMemo(() => {
    if (todaysActivities.length === 0) return 0;
    return Math.round((completedCount / todaysActivities.length) * 100);
  }, [completedCount, todaysActivities.length]);

  return {
    todaysActivities,
    completedCount,
    totalCount: todaysActivities.length,
    completionPercentage,
    viewDate,
    currentDate,
  };
}
