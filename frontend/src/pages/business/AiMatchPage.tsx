import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { calculateCreatorMatch } from '../../utils/aiMatcher';
import { CreatorDetailModal } from '../../components/creator/CreatorDetailModal';
import { Modal } from '../../components/common/Modal';
import { Creator } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Info, 
  Heart, 
  Send,
  Eye,
  Sliders
} from 'lucide-react';

export const AiMatchPage: React.FC = () => {
  const { campaigns, creators, isShortlisted, toggleShortlist, sendInvitation } = useAppData();
  const { success } = useToast();

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaigns[0]?.id || ''
  );
  const [selectedCreatorForModal, setSelectedCreatorForModal] = useState<Creator | null>(null);
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [nicheOnly, setNicheOnly] = useState<boolean>(false);
  const [viewingBreakdownCreator, setViewingBreakdownCreator] = useState<{ creator: Creator; matchData: any } | null>(null);

  const activeCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  // Calculate matches for all creators for this campaign
  const matches = activeCampaign
    ? creators
        .map(creator => {
          const matchData = calculateCreatorMatch(activeCampaign, creator);
          return {
            creator,
            matchData
          };
        })
        .filter(item => {
          if (item.matchData.overallScore < minMatchScore) return false;
          if (nicheOnly && !item.matchData.nicheMatch) return false;
          return true;
        })
        .sort((a, b) => b.matchData.overallScore - a.matchData.overallScore)
    : [];

  const handleQuickInvite = (creator: Creator) => {
    if (!activeCampaign) return;
    sendInvitation({
      campaignId: activeCampaign.id,
      creatorId: creator.id,
      notes: `We ran NECTO AI Match and identified your profile as a high-compatibility match for our campaign!`
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>AI MATCHING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            NECTO AI Creator Match
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Select an active campaign to view algorithmic creator rankings based on <strong>niche alignment, platform presence, budget compatibility, audience reach, and real-time availability</strong>.
          </p>
        </div>

        {/* Informational notice */}
        <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 max-w-xl text-xs text-purple-100 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 text-purple-300 mt-0.5" />
          <span>
            <strong>Transparency Notice:</strong> All match scores are generated client-side using deterministic heuristic rules. Ready for integration with our planned Python ML recommendation service in Phase 4.
          </span>
        </div>
      </div>

      {/* Campaign Selection Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Analyze Compatibility For Campaign:
          </label>
          <select
            value={selectedCampaignId}
            onChange={e => setSelectedCampaignId(e.target.value)}
            className="w-full sm:max-w-md py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          >
            {campaigns.map(camp => (
              <option key={camp.id} value={camp.id}>
                {camp.title} ({camp.preferredNiche} • {camp.budgetDisplay})
              </option>
            ))}
          </select>
        </div>

        {activeCampaign && (
          <div className="flex flex-wrap items-center gap-3 text-xs bg-purple-50/70 p-3 rounded-xl border border-purple-100">
            <div>
              <span className="text-slate-400 block font-medium">Required Niche:</span>
              <strong className="text-purple-900">{activeCampaign.preferredNiche}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Allocated Budget:</span>
              <strong className="text-purple-900">{activeCampaign.budgetDisplay}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Platforms:</span>
              <strong className="text-purple-900">{activeCampaign.platforms.join(', ')}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Match Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Filter By Match Score:</span>
          <div className="flex items-center gap-1">
            {[0, 80, 90].map(threshold => (
              <button
                key={threshold}
                onClick={() => setMinMatchScore(threshold)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  minMatchScore === threshold
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {threshold === 0 ? 'All Matches' : `${threshold}%+ Match`}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={nicheOnly}
            onChange={e => setNicheOnly(e.target.checked)}
            className="w-4 h-4 accent-purple-600 rounded"
          />
          <span>Exact Niche Matches Only</span>
        </label>
      </div>

      {/* Recommended Creators Match List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>Ranked Creators for "{activeCampaign?.title}" ({matches.length} matched)</span>
          <span>Higher Match Score = Greater Compatibility</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {matches.map(({ creator, matchData }, index) => {
            const shortlisted = isShortlisted(creator.id);

            // Color badge for match score
            const scoreColor =
              matchData.overallScore >= 90
                ? 'from-emerald-500 to-teal-600 text-white'
                : matchData.overallScore >= 75
                ? 'from-purple-600 to-indigo-600 text-white'
                : 'from-amber-500 to-orange-500 text-white';

            return (
              <div
                key={creator.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-purple-200 hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left: Creator Info + Match Score */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  {/* Rank indicator */}
                  <span className="hidden sm:flex w-7 h-7 rounded-full bg-slate-100 text-slate-500 items-center justify-center text-xs font-bold shrink-0">
                    #{index + 1}
                  </span>

                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100 shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{creator.name}</h3>
                      <span className="text-xs text-slate-400 font-medium">{creator.handle}</span>
                      {creator.verified && (
                        <CheckCircle2 className="w-4 h-4 text-purple-600 fill-purple-100" />
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {creator.primaryNiche}
                      </span>
                      {creator.platforms.map(p => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600"
                        >
                          {p}
                        </span>
                      ))}
                      <span className="text-xs text-slate-500 font-medium ml-1">
                        • {creator.audienceSize} Audience • {creator.pricingRange}
                      </span>
                    </div>

                    {/* Explanatory AI Match recommendation reason */}
                    <div className="pt-2">
                      <p className="text-xs text-purple-900 bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Recommended:</strong> {matchData.reasons.join('. ')}.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Score Breakdown Pill & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {/* Match score badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Match Score
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {matchData.overallScore >= 90 ? 'Ideal Candidate' : 'High Affinity'}
                      </span>
                    </div>

                    <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${scoreColor} shadow-md text-center`}>
                      <span className="text-xl font-black">{matchData.overallScore}%</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => setViewingBreakdownCreator({ creator, matchData })}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Breakdown</span>
                    </button>

                    <button
                      onClick={() => toggleShortlist(creator.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        shortlisted
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600'
                      }`}
                      title={shortlisted ? 'Shortlisted' : 'Shortlist'}
                    >
                      <Heart className={`w-4 h-4 ${shortlisted ? 'fill-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => setSelectedCreatorForModal(creator)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => handleQuickInvite(creator)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Invite</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Creator Detail Modal */}
      <CreatorDetailModal
        creator={selectedCreatorForModal}
        isOpen={!!selectedCreatorForModal}
        onClose={() => setSelectedCreatorForModal(null)}
      />

      {/* Score Breakdown Modal */}
      {viewingBreakdownCreator && (
        <Modal
          isOpen={!!viewingBreakdownCreator}
          onClose={() => setViewingBreakdownCreator(null)}
          title="Match Score Transparency Breakdown"
          subtitle={`Compatibility analysis for ${viewingBreakdownCreator.creator.name}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50/80 rounded-2xl border border-purple-200">
              <span className="font-bold text-slate-800 text-sm">Overall Algorithm Score:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-purple-700 block">
                  {viewingBreakdownCreator.matchData.overallScore}%
                </span>
                <span className="text-[11px] text-purple-600 block font-medium">
                  {viewingBreakdownCreator.matchData.nicheScore + viewingBreakdownCreator.matchData.platformScore + viewingBreakdownCreator.matchData.budgetScore + viewingBreakdownCreator.matchData.audienceScore + viewingBreakdownCreator.matchData.availabilityScore} / 100 max pts
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800">1. Niche Alignment</span>
                  <span className="block text-[11px] text-slate-500">
                    {viewingBreakdownCreator.matchData.nicheMatch ? 'Category matched' : 'Cross-niche / General'}
                  </span>
                </div>
                <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  +{viewingBreakdownCreator.matchData.nicheScore} / 35 pts
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800">2. Platform Compatibility</span>
                  <span className="block text-[11px] text-slate-500">
                    {viewingBreakdownCreator.matchData.platformMatchCount} platform(s) matched
                  </span>
                </div>
                <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  +{viewingBreakdownCreator.matchData.platformScore} / 25 pts
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800">3. Budget Compatibility</span>
                  <span className="block text-[11px] text-slate-500">
                    {viewingBreakdownCreator.matchData.budgetCompatible ? 'Within bracket' : 'Outside preferred rate'}
                  </span>
                </div>
                <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  +{viewingBreakdownCreator.matchData.budgetScore} / 20 pts
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800">4. Engagement Quality</span>
                  <span className="block text-[11px] text-slate-500">
                    {viewingBreakdownCreator.creator.engagementRate}% organic engagement
                  </span>
                </div>
                <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  +{viewingBreakdownCreator.matchData.audienceScore} / 10 pts
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800">5. Real-time Availability</span>
                  <span className="block text-[11px] text-slate-500">
                    {viewingBreakdownCreator.matchData.availabilityMatch ? 'Open for bookings' : 'Currently booked'}
                  </span>
                </div>
                <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  +{viewingBreakdownCreator.matchData.availabilityScore} / 10 pts
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs">
              <span className="font-bold text-purple-900 block mb-1">Generated Rationales:</span>
              <ul className="list-disc list-inside space-y-1 text-purple-800">
                {viewingBreakdownCreator.matchData.reasons.map((r: string, idx: number) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingBreakdownCreator(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
