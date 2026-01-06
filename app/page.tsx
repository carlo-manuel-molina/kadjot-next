'use client';

import ProgramSetup from '@/components/dashboard/ProgramSetup';
import ProgressStats from '@/components/dashboard/ProgressStats';
import TodaysActivities from '@/components/dashboard/TodaysActivities';
import QuickActions from '@/components/dashboard/QuickActions';
import AuthUI from '@/components/auth/AuthUI';
import { useProgramStats } from '@/lib/hooks/useProgramStats';

export default function Home() {
  const { isProgramStarted } = useProgramStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 via-slate-300 to-stone-200">
      {/* Header - Vintage Magazine Style (Compact) */}
      <header className="relative bg-gradient-to-b from-amber-50 via-yellow-50 to-stone-100 border-b-4 border-double border-amber-900 shadow-md">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="text-center border-2 border-double border-amber-900/30 py-3 sm:py-4 bg-white/40 backdrop-blur-sm">
            {/* Compact header layout */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1">
              <span className="text-amber-800 text-sm">✦</span>
              <p className="text-xs font-serif italic text-amber-900/70">Est. 2024</p>
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-amber-950 tracking-wide" style={{ letterSpacing: '0.1em' }}>
                KADJOT FITNESS
              </h1>
              <p className="text-xs font-serif italic text-amber-900/70">Vol. I</p>
              <span className="text-amber-800 text-sm">✦</span>
            </div>
            
            {/* Subtitle */}
            <p className="font-serif italic text-xs sm:text-sm text-amber-800">
              Progressive 12-Week Core Strength Journal
            </p>
          </div>
        </div>
      </header>

      {/* Auth Section - Sky Layer */}
      <div className="border-b-2 border-blue-400/30 bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
          <AuthUI />
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Program Setup */}
          <ProgramSetup />

          {/* Progress Stats - Only show when program is started */}
          {isProgramStarted && <ProgressStats />}

          {/* Two Column Layout - Stack on mobile, side-by-side on desktop */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {/* Today's Activities - Full width on mobile, 2 columns on desktop */}
            <div className="lg:col-span-2">
              <TodaysActivities />
            </div>

            {/* Quick Actions - Full width on mobile, 1 column on desktop */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Foreground (Soil, Tree Bark, Moss) */}
      <footer className="mt-12 bg-gradient-to-r from-stone-900 via-emerald-950 to-amber-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-stone-400">
            © {new Date().getFullYear()} Kadjot Fitness • 12-Week Core Strength Program • Track your progress, achieve your goals 💪
          </p>
        </div>
      </footer>
    </div>
  );
}
