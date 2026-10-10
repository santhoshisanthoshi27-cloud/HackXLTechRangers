import React from 'react';
import { Campaign } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Users, 
  Send, 
  Edit3, 
  Briefcase,
  Target,
  Sparkles
} from 'lucide-react';

interface CampaignDetailModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  isOpen,
  onClose,
  onApply,
  onEdit
}) => {
  const { user } = useAuth();
  const { hasAppliedToCampaign } = useAppData();

  if (!campaign) return null;

  const isCreator = user?.role === 'creator';
  const isBusiness = user?.role === 'business';
  const alreadyApplied = isCreator && user ? hasAppliedToCampaign(campaign.id, user.id) : false;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={campaign.title}
      subtitle={`Campaign Overview • ${campaign.brandName}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 to-indigo-50/70 border border-purple-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-purple-100 flex items-center justify-center font-bold text-purple-700 shadow-xs shrink-0">
              {campaign.brandLogo ? (
                <img
                  src={campaign.brandLogo}
                  alt={campaign.brandName}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <Briefcase className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block">
                {campaign.brandName}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{campaign.title}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span>Niche: <strong>{campaign.preferredNiche}</strong></span>
                <span>•</span>
                <span>Budget: <strong className="text-purple-700">{campaign.budgetDisplay}</strong></span>
              </div>
            </div>
          </div>

          <StatusBadge status={campaign.status} size="sm" />
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Campaign Overview & Objective
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {campaign.description}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
            <Target className="w-4 h-4 text-purple-600 shrink-0" />
            <span><strong>Target Audience:</strong> {campaign.targetAudience}</span>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Expected Deliverables
          </h4>
          <ul className="space-y-2">
            {campaign.deliverables.map((del, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supported Channels & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Promotion Channels
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {campaign.platforms.map(p => (
                <span
                  key={p}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Timeline & Deadline
            </h4>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Application Deadline:</span>
                <span className="font-bold text-slate-900">{campaign.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Campaign Window:</span>
                <span>{campaign.startDate} to {campaign.endDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Instructions */}
        {campaign.additionalInstructions && (
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
            <span className="font-bold block mb-0.5">Creator Guidelines / Remarks:</span>
            <p>{campaign.additionalInstructions}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {campaign.applicationsCount} Creators Applied
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>

            {isCreator && onApply && (
              <button
                onClick={() => {
                  onClose();
                  onApply(campaign);
                }}
                disabled={alreadyApplied}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  alreadyApplied
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs cursor-pointer'
                }`}
              >
                {alreadyApplied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Campaign</span>
                  </>
                )}
              </button>
            )}

            {isBusiness && onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(campaign);
                }}
                className="px-5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Campaign</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
