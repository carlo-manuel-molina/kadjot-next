// Kadjot Fitness - Activity Helper Functions

import { Activity, ActivityStatus } from '../types';
import { ACTIVITY_WINDOW_MINUTES } from './constants';

/**
 * Calculate the current status of an activity
 */
export function getActivityStatus(
  activity: Activity,
  isCompleted: boolean,
  isProgramStarted: boolean,
  activityDate?: string // YYYY-MM-DD format
): ActivityStatus {
  if (!isProgramStarted) {
    return 'scheduled';
  }

  if (isCompleted) {
    return 'completed';
  }

  // Get current local date for comparison
  const now = new Date();
  const currentDate = getCurrentLocalDate();
  const targetDate = activityDate || currentDate;

  // Future dates: all activities are "upcoming"
  if (targetDate > currentDate) {
    return 'upcoming';
  }

  // Past dates: incomplete activities are "missed"
  if (targetDate < currentDate) {
    return 'missed';
  }

  // Today: check time windows
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const activityMinutes = timeToMinutes(activity.time);
  const startWindow = activityMinutes - ACTIVITY_WINDOW_MINUTES;
  const endWindow = activityMinutes + ACTIVITY_WINDOW_MINUTES;

  if (currentMinutes < startWindow) {
    return 'upcoming';
  }

  if (currentMinutes >= startWindow && currentMinutes <= endWindow) {
    return 'ongoing';
  }

  return 'missed';
}

/**
 * Get current local date in YYYY-MM-DD format (not UTC!)
 */
function getCurrentLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if checkbox should be disabled for an activity
 */
export function shouldDisableCheckbox(status: ActivityStatus): boolean {
  // Only enable for missed and completed (to toggle back)
  return status === 'scheduled' || status === 'upcoming' || status === 'ongoing';
}

/**
 * Get current time in minutes since midnight
 */
export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/**
 * Convert HH:MM time string to minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Calculate days since program start
 */
export function getDaysSinceStart(startDate: string): number {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - start.getTime();
  const daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  // Return days starting from 1 (so first day = Day 1, not Day 0)
  return daysSince + 1;
}

/**
 * Get the day of the 7-day cycle based on program day
 */
export function getCycleDayName(programDay: number): string {
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  // Subtract 1 because programDay is now 1-indexed (Day 1 = first day, not Day 0)
  return dayNames[(programDay - 1) % 7];
}

/**
 * Calculate current week number
 */
export function getCurrentWeek(startDate: string): number {
  const days = getDaysSinceStart(startDate);
  // days is now 1-indexed, so subtract 1 before dividing by 7
  return Math.floor((days - 1) / 7) + 1;
}

/**
 * Get today's date key for progress tracking (YYYY-MM-DD)
 */
export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Get status badge class for styling
 */
export function getStatusBadgeClass(status: ActivityStatus): string {
  const baseClasses = 'px-3 py-1.5 rounded-lg text-sm font-black shadow-sm';
  
  switch (status) {
    case 'scheduled':
    case 'upcoming':
      return `${baseClasses} bg-yellow-500 text-white`;
    case 'ongoing':
      return `${baseClasses} bg-lime-500 text-white animate-pulse shadow-lg`;
    case 'missed':
      return `${baseClasses} bg-amber-600 text-white`;
    case 'completed':
      return `${baseClasses} bg-green-600 text-white`;
    default:
      return baseClasses;
  }
}

/**
 * Get status display text
 */
export function getStatusText(status: ActivityStatus): string {
  switch (status) {
    case 'scheduled':
      return 'Scheduled';
    case 'upcoming':
      return 'Upcoming';
    case 'ongoing':
      return 'Ongoing';
    case 'missed':
      return 'Missed';
    case 'completed':
      return 'Done';
    default:
      return '';
  }
}
