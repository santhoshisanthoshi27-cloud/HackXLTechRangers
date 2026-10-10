import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ showTagline = false, className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Connected nodes icon */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 p-0.5 shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all duration-300 transform group-hover:scale-105`}>
        <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center p-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full text-purple-400 group-hover:text-purple-300 transition-colors"
          >
            {/* Connected Nodes Symbol */}
            <circle cx="18" cy="5" r="3" fill="#8b5cf6" fillOpacity="0.3" stroke="currentColor" />
            <circle cx="6" cy="12" r="3" fill="#3b82f6" fillOpacity="0.3" stroke="currentColor" />
            <circle cx="18" cy="19" r="3" fill="#a855f7" fillOpacity="0.3" stroke="currentColor" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#60a5fa" strokeDasharray="1 1" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#c084fc" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <span className={`font-black tracking-tight text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] ${textSizes[size]}`}>
          NEC<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TO</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase font-semibold text-purple-700/80 -mt-1">
            Connect. Collaborate. Grow.
          </span>
        )}
      </div>
    </Link>
  );
};
