import React, { useState } from 'react';
import { Creator, Campaign } from '../../types';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { 
  CheckCircle, 
  Star, 
  MapPin, 
  Heart, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface CreatorDetailModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  creator,
  isOpen,
  onClose
}) => {
  const { campaigns, isShortlisted, toggleShortlist, sendInvitation } = useAppData();
  const { info } = useToast();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
  const [showInviteSelect, setShowInviteSelect] = useState<boolean>(false);

  if (!creator) return null;

  const shortlisted = isShortlisted(creator.id);
  const activeCampaigns = campaigns.filter(c => c.status === 'Active');

  const handleSendInvite = () => {
    if (!selectedCampaignId) {
      info('Select Campaign', 'Please choose a campaign to invite this creator to.');
      return;
    }
    sendInvitation({
      campaignId: selectedCampaignId,
      creatorId: creator.id,
      notes: `We reviewed your verified media kit and want to invite you to our promotional campaign!`
    });
    setShowInviteSelect(false);
    setSelectedCampaignId('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Creator Profile"
      subtitle="Verified Creator Media Kit & Collaboration Details"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 via-slate-50 to-indigo-50/80 border border-purple-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-18 h-18 rounded-2xl object-cover ring-4 ring-white shadow-md"
              />
              {creator.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                  <CheckCircle className="w-5 h-5 text-purple-600 fill-purple-100" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900">{creator.name}</h3>
                <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">{creator.handle}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{creator.location}</span>
                <span>•</span>
                <span className={creator.available ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-medium'}>
                  {creator.available ? '● Available for Hires' : '○ Limited Availability'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Heart Toggle */}
          <button
            onClick={() => toggleShortlist(creator.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              shortlisted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${shortlisted ? 'fill-rose-500' : ''}`} />
            <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
          </button>
        </div>

        {/* Bio */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            About the Creator
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {creator.bio}
          </p>
        </div>

        {/* Metrics Grid (Sample Illustrative Data) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Audience & Performance Metrics
            </h4>
            <span className="text-[11px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
              <Info className="w-3 h-3" /> Illustrative Demo Data
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-400 font-medium block">Total Reach</span>
              <span className="text-lg font-bold text-slate-900 mt-1 flex items-center justify-center gap-1">
                <Users className="w-4 h-4 text-purple-600" />
                {creator.audienceSize}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-400 font-medium block">Avg. Engagement</span>
              <span className="text-lg font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                {creator.engagementRate}%
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-400 font-medium block">Client Rating</span>
              <span className="text-lg font-bold text-amber-500 mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                {creator.rating}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-xs text-slate-400 font-medium block">Pricing Bracket</span>
              <span className="text-sm font-bold text-slate-900 mt-2 block truncate">
                {creator.pricingRange}
              </span>
            </div>
          </div>
        </div>

        {/* Niches and Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Content Niches
            </h4>
            <div className="flex flex-wrap gap-2">
              {creator.niches.map(niche => (
                <span
                  key={niche}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Active Platforms
            </h4>
            <div className="flex flex-wrap gap-2">
              {creator.platforms.map(platform => (
                <span
                  key={platform}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Demographics Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Audience Demographics Breakdown
          </h4>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Top Locations:</span>
              <span className="font-semibold text-slate-800">{creator.demographics.topCountry}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Age Group:</span>
              <span className="font-semibold text-slate-800">{creator.demographics.ageRange}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Gender Ratio:</span>
              <span className="font-semibold text-slate-800">{creator.demographics.genderRatio}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Sample Deliverables Portfolio
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {creator.portfolio.map(item => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-purple-300 transition-all shadow-xs"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-purple-600">{item.platform}</span>
                    <span className="text-slate-500 font-medium">{item.viewsOrReach}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite to Campaign Section */}
        {showInviteSelect ? (
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3">
            <h4 className="text-sm font-bold text-purple-900">Invite {creator.name} to a Campaign</h4>
            {activeCampaigns.length === 0 ? (
              <p className="text-xs text-purple-700">No active campaigns found. Please create a campaign first.</p>
            ) : (
              <div className="space-y-2">
                <select
                  value={selectedCampaignId}
                  onChange={e => setSelectedCampaignId(e.target.value)}
                  className="w-full text-xs font-medium p-2.5 rounded-xl border border-purple-200 bg-white text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                >
                  <option value="">-- Choose Campaign --</option>
                  {activeCampaigns.map(camp => (
                    <option key={camp.id} value={camp.id}>
                      {camp.title} ({camp.budgetDisplay})
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleSendInvite}
                    className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs"
                  >
                    Confirm & Send Invite
                  </button>
                  <button
                    onClick={() => setShowInviteSelect(false)}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/50 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => setShowInviteSelect(true)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm shadow-purple-600/25 hover:shadow-purple-600/35 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invite to Campaign</span>
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
