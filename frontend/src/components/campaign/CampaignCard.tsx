import React from 'react';
import { Campaign } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Send, 
  Check, 
  ExternalLink,
  ChevronRight,
  Briefcase
} from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onApply?: (campaign: Campaign) => void;
  onViewDetails?: (campaign: Campaign) => void;
  onStatusChange?: (campaignId: string, status: Campaign['status']) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onApply,
  onViewDetails,
  onStatusChange
}) => {
  const { user } = useAuth();
  const { hasAppliedToCampaign } = useAppData();

  const isCreator = user?.role === 'creator';
  const alreadyApplied = isCreator && user ? hasAppliedToCampaign(campaign.id, user.id) : false;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 p-6 flex flex-col justify-between group">
      <div>
        {/* Header: Brand Name + Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0 shadow-2xs">
              {campaign.brandLogo ? (
                <img
                  src={campaign.brandLogo}
                  alt={campaign.brandName}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <Briefcase className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider block">
                {campaign.brandName}
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                {campaign.title}
              </h3>
            </div>
          </div>

          <StatusBadge status={campaign.status} size="sm" />
        </div>

        {/* Campaign Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {campaign.description}
        </p>

        {/* Niche & Platforms */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            {campaign.preferredNiche}
          </span>
          {campaign.platforms.map(p => (
            <span
              key={p}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Deliverables snippet */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Expected Deliverables:
          </span>
          <ul className="space-y-1 text-slate-700">
            {campaign.deliverables.slice(0, 2).map((del, idx) => (
              <li key={idx} className="flex items-start gap-1.5 truncate">
                <span className="text-purple-500 font-bold">•</span>
                <span className="truncate">{del}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Metrics & Actions */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span className="text-xs text-slate-400 font-normal">Budget:</span>
            <span className="text-sm font-black text-purple-700">{campaign.budgetDisplay}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-medium text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Due {campaign.deadline}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Applications Count Badge */}
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>{campaign.applicationsCount} Applications</span>
          </span>

          <div className="flex items-center gap-2">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(campaign)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                Details
              </button>
            )}

            {isCreator && onApply && (
              <button
                onClick={() => onApply(campaign)}
                disabled={alreadyApplied}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                  alreadyApplied
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs cursor-pointer'
                }`}
              >
                {alreadyApplied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
