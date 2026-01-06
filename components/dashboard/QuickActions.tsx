'use client';

import { useActivities } from '@/lib/hooks/useActivities';
import { useProgramStats } from '@/lib/hooks/useProgramStats';
import { getCycleDayName } from '@/lib/utils/activityHelpers';

export default function QuickActions() {
  const { isProgramStarted, daysInProgram } = useProgramStats();
  const { todaysActivities } = useActivities();

  const generateCalendarEvent = () => {
    if (!isProgramStarted) return;

    const today = new Date();
    const cycleDayName = getCycleDayName(daysInProgram);
    
    // Create ICS file content
    const events = todaysActivities.map((activity) => {
      // Parse activity time (HH:MM format)
      const [hours, minutes] = activity.time.split(':').map(Number);
      
      // Parse activity duration (e.g., "25 min" or "5 min")
      const durationMatch = activity.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 30;
      
      const startTime = new Date(today);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + durationMinutes);

      // Format dates for ICS (must be in UTC format YYYYMMDDTHHMMSSZ)
      const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      return `BEGIN:VEVENT
UID:kadjot-${today.toISOString()}-${activity.id}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startTime)}
DTEND:${formatICSDate(endTime)}
SUMMARY:Kadjot Fitness - ${activity.name}
DESCRIPTION:${activity.details}\\n\\nDuration: ${activity.duration}\\n\\nClick activity name in app for detailed instructions
LOCATION:Home
END:VEVENT`;
    }).join('\n');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kadjot Fitness//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${events}
END:VCALENDAR`;

    // Download the file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kadjot-${cycleDayName.toLowerCase()}-${today.toISOString().split('T')[0]}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateDailyPlan = () => {
    if (!isProgramStarted) return;

    const cycleDayName = getCycleDayName(daysInProgram);
    const today = new Date().toLocaleDateString();

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kadjot Fitness - ${cycleDayName} - ${today}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f9fafb;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            color: #111827;
            margin: 0;
        }
        .header p {
            color: #6b7280;
            margin: 8px 0 0;
        }
        .activity {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .activity h2 {
            margin: 0 0 8px;
            color: #111827;
            font-size: 18px;
        }
        .activity .instructions {
            color: #4b5563;
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .activity a {
            color: #2563eb;
            text-decoration: none;
        }
        .activity a:hover {
            text-decoration: underline;
        }
        .checkbox {
            margin-top: 12px;
        }
        @media print {
            body {
                background: white;
            }
            .activity {
                box-shadow: none;
                border: 1px solid #e5e7eb;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏋️ Kadjot Fitness - ${cycleDayName}</h1>
        <p>${today}</p>
    </div>
    ${todaysActivities.map(activity => `
    <div class="activity">
        <h2>${activity.name}</h2>
        ${activity.instructions ? `<div class="instructions">${activity.instructions}</div>` : ''}
        ${activity.instructionsUrl ? `<div><a href="${activity.instructionsUrl}" target="_blank">View Instructions →</a></div>` : ''}
        <div class="checkbox">
            <label>
                <input type="checkbox"> Completed
            </label>
        </div>
    </div>
    `).join('')}
</body>
</html>`;

    // Download the file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kadjot-daily-plan-${today.replace(/\//g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isProgramStarted) {
    return null;
  }

  return (
    <div className="rounded-xl border-2 border-amber-400 bg-gradient-to-br from-amber-900/20 via-stone-700/20 to-emerald-900/20 backdrop-blur-sm p-4 sm:p-6 shadow-xl">
      <h3 className="text-xl sm:text-2xl font-black text-amber-950">⚡ Quick Actions</h3>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold text-stone-700">
        Export your daily plan or add activities to your calendar.
      </p>
      
      <div className="mt-4 sm:mt-6 flex flex-col gap-3">
        <button
          onClick={generateDailyPlan}
          className="flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-amber-800 to-yellow-700 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-black text-white shadow-lg transition-all hover:from-amber-900 hover:to-yellow-800 hover:shadow-xl"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>📝 Generate Daily Plan</span>
        </button>
        
        <button
          onClick={generateCalendarEvent}
          className="flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-emerald-900 to-stone-900 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-black text-white shadow-lg transition-all hover:from-emerald-950 hover:to-stone-950 hover:shadow-xl"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>📅 Export to Calendar</span>
        </button>
      </div>
    </div>
  );
}
