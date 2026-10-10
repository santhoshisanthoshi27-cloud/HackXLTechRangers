import React from 'react';
import { ContentNiche, PromotionPlatform } from '../../types';
import { Search, X } from 'lucide-react';

interface CampaignFilterPanelProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedNiche: string;
  setSelectedNiche: (val: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (val: string) => void;
  maxBudget: number;
  setMaxBudget: (val: number) => void;
  onClearFilters: () => void;
}

export const CampaignFilterPanel: React.FC<CampaignFilterPanelProps> = ({
  searchQuery,
  setSearchQuery,
  selectedNiche,
  setSelectedNiche,
  selectedPlatform,
  setSelectedPlatform,
  maxBudget,
  setMaxBudget,
  onClearFilters
}) => {
  const niches: (ContentNiche | 'All')[] = [
    'All',
    'Tech & Gadgets',
    'Fashion & Beauty',
    'Food & Culinary',
    'Fitness & Health',
    'Travel & Adventure',
    'Home Décor & Lifestyle',
    'Business & Finance'
  ];

  const platforms: (PromotionPlatform | 'All')[] = [
    'All',
    'Instagram',
    'YouTube',
    'Facebook',
    'LinkedIn'
  ];

  const isFiltered =
    searchQuery !== '' ||
    selectedNiche !== 'All' ||
    selectedPlatform !== 'All' ||
    maxBudget < 2500;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search campaigns by brand, keyword, or deliverables..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Target Niche
          </label>
          <select
            value={selectedNiche}
            onChange={e => setSelectedNiche(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          >
            {niches.map(niche => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Promotion Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={e => setSelectedPlatform(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Min Budget
            </label>
            <span className="text-xs font-bold text-purple-700">
              ${maxBudget}
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={2500}
            step={50}
            value={maxBudget}
            onChange={e => setMaxBudget(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
        </div>
      </div>

      {isFiltered && (
        <div className="flex justify-end pt-1">
          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
