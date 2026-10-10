import React, { useState } from 'react';
import { ApplicationStatus } from '../../types';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { 
  FileCheck2, 
  Search,
  Briefcase,
  Database,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CampaignApplicationsPage: React.FC = () => {
  const [selectedCampaignFilter, setSelectedCampaignFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | ApplicationStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions: ('All' | ApplicationStatus)[] = [
    'All',
    'Applied',
    'Under Review',
    'Shortlisted',
    'Accepted',
    'Rejected'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Campaign Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              0 Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review creator pitches across all your active campaigns, assess proposals, and approve partnerships.
          </p>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold self-start sm:self-auto border border-slate-200">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Real API integration is pending database verification</span>
        </div>

        <Link
          to="/dashboard/business/campaigns"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Manage Campaigns</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search query */}
          <div className="relative flex-1 w-full opacity-50 pointer-events-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by creator name, proposal keyword, or campaign..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              disabled
            />
          </div>

          {/* Filter by Campaign */}
          <div className="w-full sm:w-auto opacity-50 pointer-events-none">
            <select
              value={selectedCampaignFilter}
              onChange={e => setSelectedCampaignFilter(e.target.value)}
              className="w-full sm:w-56 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              disabled
            >
              <option value="All">All Campaigns</option>
            </select>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto opacity-50 pointer-events-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
            Status:
          </span>
          {statusOptions.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStatusFilter === st
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
              disabled
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List (Blocked by API) */}
      <EmptyState
        icon={Database}
        title="Live Data Blocked"
        description="Application data cannot be loaded until the Supabase migration is verified and the backend API is updated. The previous mock data has been removed per strict preservation instructions."
      />
    </div>
  );
};
