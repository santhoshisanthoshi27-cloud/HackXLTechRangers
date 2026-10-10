import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { CampaignCard } from '../../components/campaign/CampaignCard';
import { CampaignFilterPanel } from '../../components/campaign/CampaignFilterPanel';
import { CampaignApplyModal } from '../../components/campaign/CampaignApplyModal';
import { Campaign } from '../../types';
import { EmptyState } from '../../components/common/EmptyState';
import { Search, Briefcase, Info } from 'lucide-react';

export const ExploreCampaignsPage: React.FC = () => {
  const { campaigns } = useAppData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [maxBudget, setMaxBudget] = useState<number>(2500);
  const [activeApplyCampaign, setActiveApplyCampaign] = useState<Campaign | null>(null);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedNiche('All');
    setSelectedPlatform('All');
    setMaxBudget(2500);
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(camp => {
      // Show only active or draft campaigns for creator exploration
      if (camp.status !== 'Active') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          camp.title.toLowerCase().includes(q) ||
          camp.brandName.toLowerCase().includes(q) ||
          camp.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedNiche !== 'All' && camp.preferredNiche !== selectedNiche) {
        return false;
      }

      if (selectedPlatform !== 'All' && !camp.platforms.includes(selectedPlatform as any)) {
        return false;
      }

      if (camp.budget > maxBudget) {
        return false;
      }

      return true;
    });
  }, [campaigns, searchQuery, selectedNiche, selectedPlatform, maxBudget]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Brand Sponsorships
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse open commercial campaigns, pitch your content proposals, and secure sponsored creator partnerships.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive application submission demo</span>
        </div>
      </div>

      {/* Filter Component */}
      <CampaignFilterPanel
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNiche={selectedNiche}
        setSelectedNiche={setSelectedNiche}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        onClearFilters={handleClearFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>Showing {filteredCampaigns.length} Active Campaigns</span>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Matching Campaigns"
          description="We couldn't find any active campaigns matching your chosen criteria. Try adjusting your budget or clearing category filters."
          actionText="Clear Filters"
          onAction={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCampaigns.map(camp => (
            <CampaignCard
              key={camp.id}
              campaign={camp}
              onApply={c => setActiveApplyCampaign(c)}
              onViewDetails={c => setActiveApplyCampaign(c)}
            />
          ))}
        </div>
      )}

      {/* Apply Modal */}
      <CampaignApplyModal
        campaign={activeApplyCampaign}
        isOpen={!!activeApplyCampaign}
        onClose={() => setActiveApplyCampaign(null)}
      />
    </div>
  );
};
