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

export function useActivities() {
  const { programData } = useProgram();
  
  // Track current date to force recalculation when day changes
  const [currentDate, setCurrentDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Check if date has changed every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date().toISOString().split('T')[0];
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentDate]);

  const todaysActivities: ActivityWithStatus[] = useMemo(() => {
    if (!programData.startDate) {
      return [];
    }

    const todayKey = currentDate;
    const programDays = getDaysSinceStart(programData.startDate);
    const dayName = getCycleDayName(programDays);
    const activities = WEEK_ACTIVITIES[dayName] || [];

    const todayProgress = programData.todayProgress[todayKey] || {};

    const startDate = new Date(programData.startDate);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isProgramStarted = today >= startDate;

    return activities.map((activity) => {
      const isCompleted = todayProgress[activity.id] || false;
      const status = getActivityStatus(activity, isCompleted, isProgramStarted);

      return {
        ...activity,
        status,
        isCompleted,
      };
    });
  }, [programData.startDate, programData.todayProgress, currentDate]);

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
  };
}
