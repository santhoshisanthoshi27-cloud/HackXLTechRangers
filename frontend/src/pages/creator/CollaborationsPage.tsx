import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { CollaborationItem } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Upload, 
  FileText, 
  Info, 
  ArrowUpRight,
  Sliders,
  Sparkles
} from 'lucide-react';

export const CollaborationsPage: React.FC = () => {
  const { collaborations, updateCollaborationProgress } = useAppData();
  const [selectedCollabForEdit, setSelectedCollabForEdit] = useState<CollaborationItem | null>(null);

  const [editPercentage, setEditPercentage] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<CollaborationItem['progressStatus']>('In Progress');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');

  const openUpdateModal = (collab: CollaborationItem) => {
    setSelectedCollabForEdit(collab);
    setEditPercentage(collab.progressPercentage);
    setEditStatus(collab.progressStatus);
    setEditNotes(collab.submissionNotes || '');
    setEditUrl(collab.submittedUrl || '');
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollabForEdit) return;

    updateCollaborationProgress(
      selectedCollabForEdit.id,
      editPercentage,
      editStatus,
      editNotes,
      editUrl
    );

    setSelectedCollabForEdit(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Collaboration Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track deliverable milestones, submit content drafts, and coordinate approvals with brands.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Demo Tracking • Real contracts/payments require backend integration</span>
        </div>
      </div>

      {/* Collaborations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collaborations.map(collab => (
          <div
            key={collab.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-purple-200 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  {collab.counterpartName}
                </span>
                <StatusBadge status={collab.progressStatus} size="sm" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {collab.campaignTitle}
              </h3>

              {/* Deliverables Checklist */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Deliverables Checklist:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {collab.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submission Notes */}
              {collab.submissionNotes && (
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs text-purple-900 mb-4">
                  <span className="font-bold block mb-0.5">Latest Progress Notes:</span>
                  <p className="text-[11px] leading-relaxed">{collab.submissionNotes}</p>
                </div>
              )}
            </div>

            {/* Bottom Progress Bar & Action */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Milestone Completion</span>
                  <span className="text-purple-700">{collab.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${collab.progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due {collab.dueDate}</span>
                </span>

                <button
                  onClick={() => openUpdateModal(collab)}
                  className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors cursor-pointer"
                >
                  Update Milestone
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Progress Modal */}
      {selectedCollabForEdit && (
        <Modal
          isOpen={!!selectedCollabForEdit}
          onClose={() => setSelectedCollabForEdit(null)}
          title="Update Deliverables Progress"
          subtitle={selectedCollabForEdit.campaignTitle}
          maxWidth="md"
        >
          <form onSubmit={handleSaveProgress} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Progress Status
              </label>
              <select
                value={editStatus}
                onChange={e => setEditStatus(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted for Review</option>
                <option value="Approved">Approved / Completed</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Completion Percentage</span>
                <span className="text-purple-700">{editPercentage}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={editPercentage}
                onChange={e => setEditPercentage(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Content Draft URL / Review Link
              </label>
              <input
                type="url"
                value={editUrl}
                onChange={e => setEditUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or https://instagram.com/reel/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Progress Notes & Deliverable Remarks
              </label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
                placeholder="Share review remarks, shoot updates, or instructions for the brand..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedCollabForEdit(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Save Progress
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
