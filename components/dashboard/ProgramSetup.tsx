'use client';

import { useProgram } from '@/contexts/ProgramContext';
import { useState } from 'react';

export default function ProgramSetup() {
  const { programData, setProgramStart, resetProgram } = useProgram();
  const [selectedDate, setSelectedDate] = useState(
    programData.startDate || new Date().toISOString().split('T')[0]
  );
  const [dayStartTime, setDayStartTime] = useState('05:00');
  const [isStarting, setIsStarting] = useState(false);

  const handleStartProgram = async () => {
    setIsStarting(true);
    try {
      await setProgramStart(selectedDate, dayStartTime);
    } catch (error) {
      console.error('Failed to start program:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your program? This will clear all progress.')) {
      resetProgram();
    }
  };

  if (programData.startDate) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-green-900">✅ Program Started</h3>
            <div className="mt-1 sm:mt-2 space-y-1">
              <p className="text-sm font-semibold text-green-700">
                Start Date: <span className="font-black">{new Date(programData.startDate).toLocaleDateString()}</span>
              </p>
              <p className="text-sm font-semibold text-green-700">
                Day Starts: <span className="font-black">{programData.dayStartTime || '05:00'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="rounded-lg bg-stone-700 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl whitespace-nowrap"
          >
            Reset Program
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 via-amber-50 to-green-50 p-4 sm:p-6 lg:p-8 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-black text-gray-900">🎯 Start Your Program</h3>
      <p className="mt-2 text-sm sm:text-base font-medium text-gray-600">
        Set your program start date and daily schedule:
      </p>
      
      <div className="mt-4 sm:mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="block text-sm font-bold text-gray-700">
            Program Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-2 block w-full rounded-lg border-2 border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-sm transition-colors focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        
        <div>
          <label htmlFor="day-start-time" className="block text-sm font-bold text-gray-700">
            Your Day Starts At
          </label>
          <input
            type="time"
            id="day-start-time"
            value={dayStartTime}
            onChange={(e) => setDayStartTime(e.target.value)}
                className="mt-2 block w-full rounded-lg border-2 border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-sm transition-colors focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <p className="mt-1 text-xs font-medium text-gray-500">
            Used to determine if activities are late
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          onClick={handleStartProgram}
          disabled={isStarting}
          className="w-full rounded-lg bg-gradient-to-r from-green-600 to-lime-600 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-black text-white shadow-lg transition-all hover:from-green-700 hover:to-lime-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isStarting ? 'Starting Program...' : 'Start Program'}
        </button>
      </div>
    </div>
  );
}
