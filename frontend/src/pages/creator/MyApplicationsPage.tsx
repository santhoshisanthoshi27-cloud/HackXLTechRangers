import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { CampaignApplication, ApplicationStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  FileCheck2, 
  ExternalLink, 
  DollarSign, 
  Calendar, 
  Clock, 
  Briefcase,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { applications } = useAppData();

  const [activeStatusTab, setActiveStatusTab] = useState<'All' | ApplicationStatus>('All');
  const [selectedAppModal, setSelectedAppModal] = useState<CampaignApplication | null>(null);

  const statusTabs: ('All' | ApplicationStatus)[] = [
    'All',
    'Applied',
    'Under Review',
    'Shortlisted',
    'Accepted',
    'Rejected'
  ];

  const filteredApplications = applications.filter(app => {
    if (activeStatusTab === 'All') return true;
    return app.status === activeStatusTab;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track submitted brand proposals, review feedback, and monitor acceptance statuses.
          </p>
        </div>

        <Link
          to="/dashboard/creator/campaigns"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
        >
          Find More Deals
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto">
        {statusTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveStatusTab(tab)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeStatusTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title="No Applications Found"
          description={`You do not have any applications currently under the "${activeStatusTab}" status.`}
          actionText="Explore Open Campaigns"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApplications.map(app => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    {app.brandName}
                  </span>
                  <StatusBadge status={app.status} size="sm" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1">
                  {app.campaignTitle}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{app.proposal}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Proposed Rate</span>
                  <span className="font-extrabold text-slate-900 text-sm">${app.proposedPrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {app.submittedAt}
                  </span>

                  <button
                    onClick={() => setSelectedAppModal(app)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedAppModal && (
        <Modal
          isOpen={!!selectedAppModal}
          onClose={() => setSelectedAppModal(null)}
          title="Application Details"
          subtitle={`Your proposal for ${selectedAppModal.brandName}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Campaign:</span>
                <strong className="text-slate-900">{selectedAppModal.campaignTitle}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Brand:</span>
                <strong className="text-purple-700">{selectedAppModal.brandName}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Application Status:</span>
                <StatusBadge status={selectedAppModal.status} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Proposed Rate:</span>
                <strong className="text-emerald-700">${selectedAppModal.proposedPrice} USD</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Availability:</span>
                <span>{selectedAppModal.availability}</span>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Your Submitted Proposal
              </h5>
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed">
                {selectedAppModal.proposal}
              </div>
            </div>

            {selectedAppModal.portfolioLink && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Attached Portfolio
                </h5>
                <a
                  href={selectedAppModal.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>{selectedAppModal.portfolioLink}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {selectedAppModal.feedbackNotes && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
                <span className="font-bold block mb-1">Brand Feedback:</span>
                <p>{selectedAppModal.feedbackNotes}</p>
              </div>
            )}

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedAppModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
