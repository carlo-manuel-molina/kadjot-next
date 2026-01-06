'use client';

import { useActivities } from '@/lib/hooks/useActivities';
import { useProgramStats } from '@/lib/hooks/useProgramStats';
import ActivityCard from './ActivityCard';

export default function TodaysActivities() {
  const { isProgramStarted } = useProgramStats();
  const { todaysActivities, completionPercentage, completedCount, totalCount } = useActivities();

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
      <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">📋 Today's Activities</h2>
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
    </div>
  );
}
