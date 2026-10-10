import React from 'react';
import { ContentNiche, PromotionPlatform } from '../../types';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';

interface CreatorFilterPanelProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedNiche: string;
  setSelectedNiche: (val: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (val: string) => void;
  maxBudget: number;
  setMaxBudget: (val: number) => void;
  selectedSort: string;
  setSelectedSort: (val: string) => void;
  onClearFilters: () => void;
}

export const CreatorFilterPanel: React.FC<CreatorFilterPanelProps> = ({
  searchQuery,
  setSearchQuery,
  selectedNiche,
  setSelectedNiche,
  selectedPlatform,
  setSelectedPlatform,
  maxBudget,
  setMaxBudget,
  selectedSort,
  setSelectedSort,
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
    maxBudget < 2000 ||
    selectedSort !== 'featured';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search creator by name, handle, or location..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-hidden"
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

        {/* Sort Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort By:</span>
          <select
            value={selectedSort}
            onChange={e => setSelectedSort(e.target.value)}
            className="flex-1 sm:w-44 py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          >
            <option value="featured">Featured First</option>
            <option value="followers">Largest Audience</option>
            <option value="engagement">Highest Engagement</option>
            <option value="price-low">Budget: Low to High</option>
          </select>
        </div>
      </div>

      {/* Filter Chips / Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
        {/* Niche Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Content Niche
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

        {/* Platform Selector */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Platform
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

        {/* Budget Range Filter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Max Budget
            </label>
            <span className="text-xs font-bold text-purple-700">
              ${maxBudget}
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={2000}
            step={50}
            value={maxBudget}
            onChange={e => setMaxBudget(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
        </div>
      </div>

      {/* Clear Filters Reset Button */}
      {isFiltered && (
        <div className="flex justify-end pt-1">
          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
