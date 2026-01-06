'use client';

// Kadjot Fitness - Activities Custom Hook

import { useMemo } from 'react';
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

  const todaysActivities: ActivityWithStatus[] = useMemo(() => {
    if (!programData.startDate) {
      return [];
    }

    const programDays = getDaysSinceStart(programData.startDate);
    const dayName = getCycleDayName(programDays);
    const activities = WEEK_ACTIVITIES[dayName] || [];

    const todayKey = new Date().toISOString().split('T')[0];
    const todayProgress = programData.todayProgress[todayKey] || {};

    const startDate = new Date(programData.startDate);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isProgramStarted = today >= startDate;

    console.log('useActivities - recalculating:', {
      dayName,
      todayKey,
      todayProgress,
      programData: programData.todayProgress
    });

    return activities.map((activity) => {
      const isCompleted = todayProgress[activity.id] || false;
      const status = getActivityStatus(activity, isCompleted, isProgramStarted);

      return {
        ...activity,
        status,
        isCompleted,
      };
    });
  }, [programData.startDate, programData.todayProgress]);

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
