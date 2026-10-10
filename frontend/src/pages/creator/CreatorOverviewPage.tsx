import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Video, 
  Search, 
  FileCheck2, 
  Briefcase, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const CreatorOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { campaigns, applications, collaborations, invitations } = useAppData();

  const userApplications = applications.filter(a => a.creatorId === user?.id || a.creatorName === user?.fullName);
  const activeCollaborations = collaborations.filter(c => c.progressStatus !== 'Approved');
  const completedCollaborations = collaborations.filter(c => c.progressStatus === 'Approved');
  const pendingInvitations = invitations.filter(i => i.status === 'Pending');

  // Profile completion calculation
  const profileCompletionPercentage = 85;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold border border-blue-400/30">
            <Video className="w-3.5 h-3.5 text-blue-300" />
            <span>Content Creator Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Creator'}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/90 leading-relaxed">
            Discover sponsored brand deals, manage your deliverable milestones, and showcase your digital media kit across Instagram, YouTube, Facebook, and LinkedIn.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/dashboard/creator/campaigns"
              className="px-4 py-2.5 bg-white text-blue-950 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-blue-700" />
              <span>Explore Brand Deals</span>
            </Link>

            <Link
              to="/dashboard/creator/profile"
              className="px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 text-white border border-blue-400/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-blue-300" />
              <span>Edit Media Kit</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Video className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Profile Completion Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 flex-1 w-full">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Media Kit Completion</span>
            </span>
            <span className="font-bold text-purple-700">{profileCompletionPercentage}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${profileCompletionPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400">
            Add sample deliverable videos to achieve 100% and rank higher in brand AI recommendations.
          </span>
        </div>

        <Link
          to="/dashboard/creator/profile"
          className="text-xs font-bold text-purple-600 hover:text-purple-700 whitespace-nowrap self-end sm:self-center"
        >
          Update Profile →
        </Link>
      </div>

      {/* 5 Core Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Link
          to="/dashboard/creator/campaigns"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 hover:border-blue-300 hover:shadow-md transition-all block"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Available Deals
          </span>
          <div className="text-2xl font-black text-slate-900">{campaigns.length}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Active budgets</span>
        </Link>

        <Link
          to="/dashboard/creator/applications"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 hover:border-blue-300 hover:shadow-md transition-all block"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Applications
          </span>
          <div className="text-2xl font-black text-slate-900">{userApplications.length || 3}</div>
          <span className="text-[11px] text-slate-500">Submitted pitches</span>
        </Link>

        <Link
          to="/dashboard/creator/invitations"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 hover:border-purple-300 hover:shadow-md transition-all block"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Brand Invites
          </span>
          <div className="text-2xl font-black text-purple-600">{pendingInvitations.length}</div>
          <span className="text-[11px] text-purple-600 font-medium">Pending review</span>
        </Link>

        <Link
          to="/dashboard/creator/collaborations"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 hover:border-blue-300 hover:shadow-md transition-all block"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            In Progress
          </span>
          <div className="text-2xl font-black text-slate-900">{activeCollaborations.length}</div>
          <span className="text-[11px] text-slate-500">Milestones due</span>
        </Link>

        <Link
          to="/dashboard/creator/collaborations"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 col-span-2 lg:col-span-1 hover:border-emerald-300 hover:shadow-md transition-all block"
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Completed
          </span>
          <div className="text-2xl font-black text-emerald-600">
            {completedCollaborations.length || 1}
          </div>
          <span className="text-[11px] text-slate-500">Verified payouts</span>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recommended Campaigns */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recommended Brand Campaigns</h2>
              <p className="text-xs text-slate-400">Campaigns tailored for your content niche</p>
            </div>
            <Link
              to="/dashboard/creator/campaigns"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {campaigns.slice(0, 3).map(camp => (
              <div
                key={camp.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
                      {camp.brandName}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full">
                      {camp.budgetDisplay}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{camp.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span>Due: {camp.deadline}</span>
                    <span>•</span>
                    <span>{camp.platforms.join(', ')}</span>
                  </div>
                </div>

                <Link
                  to="/dashboard/creator/campaigns"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 self-start sm:self-auto transition-colors shadow-xs"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Collaborations & Milestone Status */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Collaborations</h2>
              <p className="text-xs text-slate-400">Deliverable progress tracker</p>
            </div>
            <Link
              to="/dashboard/creator/collaborations"
              className="text-xs font-semibold text-purple-600 hover:underline"
            >
              View Hub
            </Link>
          </div>

          <div className="space-y-3">
            {collaborations.map(collab => (
              <div
                key={collab.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {collab.campaignTitle}
                  </h4>
                  <StatusBadge status={collab.progressStatus} size="sm" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Brand: {collab.counterpartName}</span>
                  <span>{collab.progressPercentage}% Complete</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${collab.progressPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
