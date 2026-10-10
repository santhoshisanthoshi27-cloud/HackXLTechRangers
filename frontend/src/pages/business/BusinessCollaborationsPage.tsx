import React from 'react';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { 
  Briefcase, 
  Info,
  Database
} from 'lucide-react';

export const BusinessCollaborationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Brand Collaborations & Milestones
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              0 Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track creator milestones, inspect draft submissions, and verify promotional deliverables.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200 self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Real API integration is pending database verification</span>
        </div>
      </div>

      {/* Collaborations Grid (Blocked by API) */}
      <EmptyState
        icon={Database}
        title="Live Data Blocked"
        description="Collaborations data cannot be loaded until the Supabase migration is verified and the backend API is updated. The previous mock data has been removed per strict preservation instructions."
      />
    </div>
  );
};
