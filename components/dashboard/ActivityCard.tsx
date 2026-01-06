'use client';

// Kadjot Fitness - Activity Card Component

import React, { useState } from 'react';
import { Activity, ActivityStatus } from '../../lib/types';
import { shouldDisableCheckbox, getStatusBadgeClass, getStatusText } from '../../lib/utils/activityHelpers';
import { useProgram } from '../../contexts/ProgramContext';
import Modal from '../ui/Modal';

interface ActivityWithStatus extends Activity {
  status: ActivityStatus;
  isCompleted: boolean;
}

interface ActivityCardProps {
  activity: ActivityWithStatus;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { toggleActivity } = useProgram();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = shouldDisableCheckbox(activity.status);
  const statusText = getStatusText(activity.status);
  const statusClass = getStatusBadgeClass(activity.status);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!isDisabled) {
      console.log('Toggling activity:', activity.id, 'from', activity.isCompleted, 'to', !activity.isCompleted);
      await toggleActivity(activity.id);
    }
  };

  const handleInstructionsClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsLoading(true);
    setIsModalOpen(true);

    try {
      // Fetch the HTML file
      const response = await fetch(activity.link);
      const html = await response.text();
      setHtmlContent(html);
    } catch (error) {
      console.error('Error loading instructions:', error);
      setHtmlContent('<p class="text-stone-700">Failed to load instructions. Please try again.</p>');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl transition-all shadow-md ${
          activity.isCompleted
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400'
            : activity.status === 'missed'
            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-400 hover:shadow-lg'
            : activity.status === 'ongoing'
            ? 'bg-gradient-to-r from-green-50 to-lime-50 border-2 border-green-400'
            : 'bg-white border-2 border-gray-300'
        }`}
      >
        {/* Checkbox */}
        <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={activity.isCompleted}
            disabled={isDisabled}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 ${
              isDisabled
                ? 'cursor-not-allowed opacity-40'
                : 'cursor-pointer hover:scale-110 transition-transform'
            } ${
              activity.isCompleted 
              ? 'accent-green-600 border-green-600' 
              : activity.status === 'missed'
              ? 'accent-amber-600 border-amber-400'
              : 'accent-lime-600 border-gray-400'
            }`}
            title={
              isDisabled
                ? activity.status === 'upcoming'
                  ? 'This activity is not yet available'
                  : activity.status === 'ongoing'
                  ? 'This activity is currently ongoing'
                  : 'This activity is not yet available'
                : activity.isCompleted
                ? 'Click to mark as incomplete'
                : 'Click to mark as done'
            }
          />
        </div>

        {/* Activity Info */}
        <div className="flex-1 min-w-0">
          <button
            onClick={handleInstructionsClick}
          className={`text-base sm:text-lg font-bold text-left hover:underline transition-colors break-words ${
            activity.isCompleted 
              ? 'text-green-700 hover:text-green-900' 
              : 'text-lime-700 hover:text-lime-900'
          }`}
          >
            {activity.name} 📖
          </button>
          <div className={`text-xs sm:text-sm font-semibold mt-1 break-words ${
            activity.isCompleted ? 'text-green-700' : 'text-gray-700'
          }`}>
            ⏰ {activity.time} • {activity.duration} • {activity.details}
          </div>
        </div>

        {/* Status Badge */}
        <span className={`${statusClass} flex-shrink-0 whitespace-nowrap`}>{statusText}</span>
      </div>

      {/* Modal for Instructions */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`📖 ${activity.name} - Instructions`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600 font-semibold">Loading instructions...</p>
            </div>
          </div>
        ) : (
          <div 
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </Modal>
    </>
  );
}
