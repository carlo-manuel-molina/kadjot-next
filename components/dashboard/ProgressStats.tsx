'use client';

import { useProgramStats } from '@/lib/hooks/useProgramStats';
import { useActivities } from '@/lib/hooks/useActivities';

export default function ProgressStats() {
  const { 
    isProgramStarted, 
    daysInProgram,
    daysCompleted,
    currentWeek, 
    currentPhase, 
    programProgress 
  } = useProgramStats();
  
  const { completionPercentage } = useActivities();

  if (!isProgramStarted) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Current Week */}
      <div className="rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-100 to-lime-100 p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold text-green-700">📅 Current Week</p>
            <p className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-green-900">Week {currentWeek}</p>
          </div>
          <div className="rounded-full bg-green-500 p-3 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Current Phase */}
      <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100 p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-bold text-yellow-700">⚡ Current Phase</p>
            <p className="mt-1 sm:mt-2 text-base sm:text-lg font-black text-yellow-900 truncate">{currentPhase?.name || 'Not Started'}</p>
          </div>
          <div className="rounded-full bg-yellow-600 p-3 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Days Completed (100%) */}
      <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-100 to-yellow-100 p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold text-amber-700">✅ Days Completed</p>
            <p className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-amber-900">{daysCompleted}</p>
            <p className="mt-1 text-xs text-amber-600">of {daysInProgram} days in program</p>
          </div>
          <div className="rounded-full bg-amber-600 p-3 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="rounded-xl border-2 border-lime-300 bg-gradient-to-br from-lime-100 to-green-100 p-4 sm:p-6 shadow-lg transition-all hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-bold text-lime-700">📊 Today's Progress</p>
            <p className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-lime-900">{completionPercentage}%</p>
          </div>
          <div className="rounded-full bg-lime-600 p-3 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Program Progress Bar */}
      <div className="rounded-xl border-2 border-lime-300 bg-gradient-to-r from-lime-50 to-green-50 p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-4">
        <div className="mb-2 sm:mb-3 flex items-center justify-between">
          <p className="text-sm sm:text-base font-black text-green-900">🎯 Overall Progress</p>
          <p className="text-xl sm:text-2xl font-black text-green-900">{programProgress}%</p>
        </div>
        <div className="h-3 sm:h-4 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 shadow-lg transition-all duration-500"
            style={{ width: `${programProgress}%` }}
          />
        </div>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-green-700">
          🏆 Complete all 12 weeks (84 days) to finish the program
        </p>
      </div>
    </div>
  );
}
