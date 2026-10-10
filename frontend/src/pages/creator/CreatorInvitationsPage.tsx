import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Check, 
  Briefcase,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CreatorInvitationsPage: React.FC = () => {
  const { invitations, respondToInvitation } = useAppData();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Brand Invitations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              {invitations.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Direct sponsorship invitations sent specifically to you by brands through NECTO.
          </p>
        </div>

        <Link
          to="/dashboard/creator/collaborations"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Active Collaborations</span>
        </Link>
      </div>

      {/* Invitations List */}
      {invitations.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No Brand Invitations Yet"
          description="When businesses discover your media kit or run NECTO AI Match and invite you to their campaigns, their direct invitations will appear here."
          actionText="Explore Open Campaigns"
          onAction={() => navigate('/dashboard/creator/campaigns')}
        />
      ) : (
        <div className="space-y-4">
          {invitations.map(inv => (
            <div
              key={inv.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-purple-200 hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    {inv.brandName}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    inv.status === 'Accepted'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : inv.status === 'Declined'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {inv.status}
                  </span>
                  <span className="text-xs text-slate-400">• Sent: {inv.sentAt}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {inv.campaignTitle}
                </h3>

                {inv.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    "{inv.notes}"
                  </p>
                )}

                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Deliverables:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {inv.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Offered Budget
                  </span>
                  <span className="text-2xl font-black text-purple-700">
                    {inv.budgetDisplay}
                  </span>
                </div>

                {inv.status === 'Pending' ? (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => respondToInvitation(inv.id, 'Declined')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => respondToInvitation(inv.id, 'Accepted')}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept & Collaborate</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-slate-500 pt-1">
                    Invitation {inv.status.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
