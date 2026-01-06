'use client';

import { useState } from 'react';
import { useActivities } from '@/lib/hooks/useActivities';
import { useProgramStats } from '@/lib/hooks/useProgramStats';
import ActivityCard from './ActivityCard';

export default function TodaysActivities() {
  const { isProgramStarted } = useProgramStats();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const { todaysActivities, completionPercentage, completedCount, totalCount, viewDate, currentDate } = useActivities({ date: selectedDate });

  const handlePreviousDay = () => {
    const current = new Date(selectedDate || currentDate);
    current.setDate(current.getDate() - 1);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const current = new Date(selectedDate || currentDate);
    current.setDate(current.getDate() + 1);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setSelectedDate(undefined); // Reset to current date
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isToday = viewDate === currentDate;
  const isFuture = new Date(viewDate) > new Date(currentDate);

  if (!isProgramStarted) {
    return (
      <div className="rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center shadow-lg">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-4 text-2xl font-black text-gray-900">No Program Started</h3>
        <p className="mt-2 text-base font-semibold text-gray-600">
          Start your program above to see today's activities.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-green-50 to-yellow-50 p-4 sm:p-6 shadow-xl">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              📋 {isToday ? "Today's Activities" : "Daily Activities"}
            </h2>
            <p className="mt-1 text-sm font-bold text-gray-700">
              {formatDate(viewDate)}
              {isToday && <span className="ml-2 text-green-600">• Today</span>}
              {isFuture && <span className="ml-2 text-blue-600">• Future</span>}
            </p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base font-bold text-gray-600">
              {completedCount} of {totalCount} completed ({completionPercentage}%)
            </p>
          </div>
          {completionPercentage === 100 && (
            <div className="flex items-center gap-2 rounded-full bg-green-500 px-4 sm:px-5 py-1.5 sm:py-2 shadow-lg">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm sm:text-base font-black text-white">All Done!</span>
            </div>
          )}
        </div>
      </div>

      {todaysActivities.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No activities scheduled for today.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}

      {/* Date Navigation */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handlePreviousDay}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-2.5 font-bold text-white shadow-md hover:from-amber-700 hover:to-yellow-700 transition-all hover:scale-105"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous Day</span>
        </button>

        {!isToday && (
          <button
            onClick={handleToday}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-600 px-4 py-2.5 font-bold text-white shadow-md hover:from-green-700 hover:to-lime-700 transition-all hover:scale-105"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Today</span>
          </button>
        )}

        <button
          onClick={handleNextDay}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-2.5 font-bold text-white shadow-md hover:from-amber-700 hover:to-yellow-700 transition-all hover:scale-105"
        >
          <span>Next Day</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
