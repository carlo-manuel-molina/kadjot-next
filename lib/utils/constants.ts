// Kadjot Fitness - Constants and Activity Data

import { WeekActivities, Phases } from '../types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const PHASES: Phases = {
  1: { name: 'Foundation Phase', weeks: '1-2', color: '#84cc16' },  // lime-500 - young rice seedlings
  3: { name: 'Building Phase', weeks: '3-6', color: '#eab308' },    // yellow-500 - growing rice
  7: { name: 'Strength Phase', weeks: '7-10', color: '#d97706' },   // amber-600 - ripening rice
  11: { name: 'Peak Performance', weeks: '11-12', color: '#15803d' } // green-700 - harvest ready
};

export const WEEK_ACTIVITIES: WeekActivities = {
  monday: [
    { id: 'core', name: 'Core Workout', time: '05:15', duration: '15 min', details: 'Dead Bug, Glute Bridge, Side Plank, Bird Dog', link: '/DETAILED_CORE_PROGRAM.html#core-workout' },
    { id: 'lunch', name: 'Lunch Desk Reset', time: '12:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'afternoon', name: 'Afternoon Desk Reset', time: '15:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' }
  ],
  tuesday: [
    { id: 'run', name: 'Beach/Sand Running', time: '05:15', duration: '20-30 min', details: 'Packed sand, easy pace, midfoot landing - Run both directions', link: '/DETAILED_CORE_PROGRAM.html#running-protocol' },
    { id: 'lunch', name: 'Lunch Desk Reset', time: '12:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'afternoon', name: 'Afternoon Desk Reset', time: '15:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' }
  ],
  wednesday: [
    { id: 'lunch', name: 'Lunch Desk Reset', time: '12:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'afternoon', name: 'Afternoon Desk Reset', time: '15:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'gym', name: 'Gym Workout', time: '18:00', duration: '45-60 min', details: 'Leg Press, Cable Row, Goblet Squat, Back Extension', link: '/DETAILED_CORE_PROGRAM.html#gym-workout' }
  ],
  thursday: [
    { id: 'core', name: 'Core Workout', time: '05:15', duration: '15 min', details: 'Dead Bug, Glute Bridge, Side Plank, Bird Dog', link: '/DETAILED_CORE_PROGRAM.html#core-workout' },
    { id: 'lunch', name: 'Lunch Desk Reset', time: '12:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'afternoon', name: 'Afternoon Desk Reset', time: '15:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' }
  ],
  friday: [
    { id: 'lunch', name: 'Lunch Desk Reset', time: '12:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'afternoon', name: 'Afternoon Desk Reset', time: '15:00', duration: '5-8 min', details: 'Pelvic Tilts, Hip Flexor, Upper-Back Extension', link: '/DETAILED_CORE_PROGRAM.html#daily-desk-reset' },
    { id: 'mobility', name: 'Mobility & Stretching', time: '19:00', duration: '12 min', details: 'Cat-Cow, Child\'s Pose, Knees-to-Chest', link: '/DETAILED_CORE_PROGRAM.html#mobility-stretching' }
  ],
  saturday: [
    { id: 'run', name: 'Beach/Sand Running (Flexible)', time: '09:00', duration: '20-30 min', details: 'Packed or soft sand, easy pace - Do anytime today', link: '/DETAILED_CORE_PROGRAM.html#running-protocol' },
    { id: 'gym', name: 'Gym Workout (Flexible)', time: '10:00', duration: '45-60 min', details: 'Leg Press, Cable Row, Goblet Squat - Do anytime today', link: '/DETAILED_CORE_PROGRAM.html#gym-workout' }
  ],
  sunday: [
    { id: 'mobility', name: 'Mobility & Stretching (Optional)', time: '10:00', duration: '12 min', details: 'Light stretching - Do if you feel like it', link: '/DETAILED_CORE_PROGRAM.html#mobility-stretching' }
  ]
};

export const ACTIVITY_WINDOW_MINUTES = 30; // ±30 minutes window for "ongoing" status
