import React from 'react';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { Heart, Search, Database, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreatorShortlistPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shortlisted Creators
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
              0 Saved
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your curated list of preferred creators, inspect their media kits, and invite them to campaigns.
          </p>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold self-start sm:self-auto border border-slate-200">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Real API integration is pending database verification</span>
        </div>

        <Link
          to="/dashboard/business/creators"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Discover More Creators</span>
        </Link>
      </div>

      {/* Grid of Shortlisted Creators (Blocked by API) */}
      <EmptyState
        icon={Database}
        title="Live Data Blocked"
        description="Shortlist data cannot be loaded until the Supabase migration is verified and the backend API is updated. The previous mock data has been removed per strict preservation instructions."
      />
    </div>
  );
};
