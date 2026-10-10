import React, { useState } from 'react';
import { Campaign } from '../../types';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { DollarSign, Link as LinkIcon, Clock, Send, AlertCircle } from 'lucide-react';

interface CampaignApplyModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignApplyModal: React.FC<CampaignApplyModalProps> = ({
  campaign,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const { applyToCampaign, hasAppliedToCampaign } = useAppData();
  const { error } = useToast();

  const [proposal, setProposal] = useState('');
  const [proposedPrice, setProposedPrice] = useState<number>(campaign?.budget || 500);
  const [portfolioLink, setPortfolioLink] = useState('https://instagram.com/alexriveratech');
  const [availability, setAvailability] = useState('Available immediately, can complete within 5 days');
  const [validationError, setValidationError] = useState('');

  if (!campaign) return null;

  const alreadyApplied = user ? hasAppliedToCampaign(campaign.id, user.id) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      error('Not Authenticated', 'Please log in as a creator to submit an application.');
      return;
    }

    if (!proposal.trim()) {
      setValidationError('Please enter a brief pitch or proposal explaining your ideas.');
      return;
    }

    if (proposedPrice <= 0) {
      setValidationError('Please enter a valid proposed rate.');
      return;
    }

    setValidationError('');

    const success = applyToCampaign({
      campaignId: campaign.id,
      proposal,
      proposedPrice: Number(proposedPrice),
      portfolioLink,
      availability,
      creatorId: user.id,
      creatorName: user.fullName,
      creatorAvatar: user.avatarUrl
    });

    if (success) {
      setProposal('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Campaign"
      subtitle={`Submit your pitch to ${campaign.brandName}`}
      maxWidth="lg"
    >
      {alreadyApplied ? (
        <div className="text-center py-8 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            ✓
          </div>
          <h4 className="text-base font-bold text-slate-900">Application Already Submitted</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have already submitted a proposal for "{campaign.title}". You can track its status in the "My Applications" tab.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campaign Summary Box */}
          <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 text-xs">
            <span className="font-bold text-purple-900 block">{campaign.title}</span>
            <div className="flex items-center justify-between text-purple-700 mt-1">
              <span>Client Budget: {campaign.budgetDisplay}</span>
              <span>Deadline: {campaign.deadline}</span>
            </div>
          </div>

          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Proposal Text */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Your Proposal / Content Angle <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={proposal}
              onChange={e => setProposal(e.target.value)}
              placeholder="Outline your creative ideas, how you will highlight the product, and why your audience is the ideal fit..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              required
            />
          </div>

          {/* Proposed Price & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Proposed Price ($ USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="50"
                  max="10000"
                  value={proposedPrice}
                  onChange={e => setProposedPrice(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Availability
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={availability}
                  onChange={e => setAvailability(e.target.value)}
                  placeholder="e.g. Immediate / Next 7 days"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Portfolio Link */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Relevant Portfolio / Showcase Link
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={portfolioLink}
                onChange={e => setPortfolioLink(e.target.value)}
                placeholder="https://instagram.com/yourhandle or YouTube channel"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
