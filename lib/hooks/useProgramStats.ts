'use client';

// Kadjot Fitness - Program Stats Custom Hook

import { useMemo } from 'react';
import { PhaseInfo } from '../types';
import { PHASES } from '../utils/constants';
import { getCurrentWeek, getDaysSinceStart } from '../utils/activityHelpers';
import { useProgram } from '../../contexts/ProgramContext';

export function useProgramStats() {
  const { programData } = useProgram();

  const isProgramStarted = useMemo(() => {
    if (!programData.startDate) return false;

    const startDate = new Date(programData.startDate);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today >= startDate;
  }, [programData.startDate]);

  const daysInProgram = useMemo(() => {
    return 84; // 12 weeks × 7 days = 84 days total program length
  }, []);

  const currentWeek = useMemo(() => {
    if (!programData.startDate || !isProgramStarted) return 0;
    return getCurrentWeek(programData.startDate);
  }, [programData.startDate, isProgramStarted]);

  const currentPhase: PhaseInfo | null = useMemo(() => {
    if (currentWeek === 0) return null;

    // Find the phase based on current week
    const phaseWeeks = Object.keys(PHASES)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = phaseWeeks.length - 1; i >= 0; i--) {
      if (currentWeek >= phaseWeeks[i]) {
        return PHASES[phaseWeeks[i]];
      }
    }

    return PHASES[1]; // Default to Foundation Phase
  }, [currentWeek]);

  const daysCompleted = useMemo(() => {
    return programData.completedDays?.length || 0;
  }, [JSON.stringify(programData.completedDays)]);

  const programProgress = useMemo(() => {
    const totalDays = 84; // 12 weeks = 84 days
    if (daysCompleted === 0) return 0;
    return Math.min(Math.round((daysCompleted / totalDays) * 100), 100);
  }, [daysCompleted]);

  const totalWorkoutsGenerated = useMemo(() => {
    return programData.dailyPlans.length;
  }, [programData.dailyPlans.length]);

  return {
    isProgramStarted,
    daysInProgram,
    daysCompleted,
    currentWeek,
    currentPhase,
    programProgress,
    totalWorkoutsGenerated,
  };
}
