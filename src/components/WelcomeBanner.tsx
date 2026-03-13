import { Zap } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f4c81] via-[#1565c0] to-[#0097a7] p-6 md:p-8 mb-6">
      {/* Background decorative circles */}
      <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white opacity-5" />
      <div className="absolute -right-4 top-8 w-40 h-40 rounded-full bg-white opacity-5" />
      <div className="absolute right-32 -bottom-12 w-48 h-48 rounded-full bg-white opacity-5" />

      <div className="relative flex items-center justify-between">
        <div className="flex-1 max-w-lg">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Welcome to Jeeny!
          </h2>
          <p className="text-blue-100 text-sm md:text-base mb-6 opacity-90">
            Manage your inventory, track arrivals and departures, and streamline your operations all in one place.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            <Zap size={16} className="text-amber-500" />
            Quick Start
          </button>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center ml-8">
          <div className="relative">
            {/* SVG Illustration of person with boxes */}
            <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Floor */}
              <ellipse cx="95" cy="148" rx="70" ry="8" fill="rgba(255,255,255,0.1)" />
              
              {/* Box stack */}
              <rect x="20" y="100" width="50" height="45" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <rect x="28" y="90" width="40" height="18" rx="3" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <line x1="45" y1="90" x2="45" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="20" y1="118" x2="70" y2="118" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Person */}
              {/* Head */}
              <circle cx="110" cy="42" r="16" fill="rgba(255,220,177,0.9)" />
              {/* Hair */}
              <path d="M94 38 Q94 24 110 24 Q126 24 126 38" fill="rgba(80,50,30,0.8)" />
              {/* Body */}
              <rect x="96" y="58" width="28" height="40" rx="6" fill="rgba(255,255,255,0.25)" />
              {/* Arms */}
              <path d="M96 62 Q80 68 78 80" stroke="rgba(255,220,177,0.9)" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M124 62 Q138 65 142 72" stroke="rgba(255,220,177,0.9)" strokeWidth="8" strokeLinecap="round" fill="none"/>
              {/* Legs */}
              <path d="M104 98 Q102 118 100 140" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M116 98 Q118 118 120 140" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" fill="none"/>

              {/* Box being carried */}
              <rect x="128" y="58" width="35" height="30" rx="4" fill="rgba(251,191,36,0.7)" stroke="rgba(251,191,36,0.9)" strokeWidth="1.5" />
              <line x1="145" y1="58" x2="145" y2="88" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <line x1="128" y1="73" x2="163" y2="73" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
