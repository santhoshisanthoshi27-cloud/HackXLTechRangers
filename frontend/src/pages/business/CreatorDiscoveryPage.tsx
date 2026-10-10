import React, { useState } from 'react';
import { CreatorFilterPanel } from '../../components/creator/CreatorFilterPanel';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { Search, Info, Database } from 'lucide-react';

export const CreatorDiscoveryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [maxBudget, setMaxBudget] = useState<number>(2000);
  const [selectedSort, setSelectedSort] = useState('featured');

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedNiche('All');
    setSelectedPlatform('All');
    setMaxBudget(2000);
    setSelectedSort('featured');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search, filter, and shortlist verified content creators across top social platforms.
          </p>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold self-start sm:self-auto border border-slate-200">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Real creator API integration is pending database verification</span>
        </div>
      </div>

      {/* Filter Component */}
      <CreatorFilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNiche={selectedNiche}
        setSelectedNiche={setSelectedNiche}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        onClearFilters={handleClearFilters}
      />

      {/* Grid of Creators (Blocked by API) */}
      <EmptyState
        icon={Database}
        title="Live Data Blocked"
        description="Creator profiles cannot be loaded until the Supabase migration is verified and the backend API is updated. The previous mock data has been removed per your strict preservation instructions."
      />
    </div>
  );
};
