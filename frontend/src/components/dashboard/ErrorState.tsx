import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  retryAction?: () => void;
  isWarning?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Something went wrong", 
  message = "We couldn't load this data. Please try again later.",
  retryAction,
  isWarning = false
}) => {
  const Icon = isWarning ? AlertTriangle : AlertCircle;
  const colorClass = isWarning ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-rose-500 bg-rose-50 border-rose-200';
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-200">
      <div className={`p-4 rounded-full ${colorClass} border mb-4`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">{message}</p>
      
      {retryAction && (
        <button 
          onClick={retryAction}
          className="mt-6 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
