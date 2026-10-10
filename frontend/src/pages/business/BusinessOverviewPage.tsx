import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Briefcase, 
  Users, 
  Heart, 
  Sparkles, 
  PlusCircle, 
  Search, 
  ArrowRight, 
  TrendingUp,
  Layers,
  AlertCircle
} from 'lucide-react';

export const BusinessOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API loading block
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brand Owner Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Business Owner'}!
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Manage your marketing campaigns, review creator proposals, and run NECTO AI matching to find the best talent for your brand.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/dashboard/business/campaigns/new"
              className="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-purple-700" />
              <span>Post New Campaign</span>
            </Link>

            <Link
              to="/dashboard/business/creators"
              className="px-4 py-2.5 bg-purple-600/60 hover:bg-purple-600 text-white border border-purple-400/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-purple-300" />
              <span>Discover Creators</span>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <Briefcase className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard 
          title="Total Campaigns" 
          value="-" 
          icon={Layers} 
        />
        <StatCard 
          title="Applications Received" 
          value="-" 
          icon={Users} 
        />
        <StatCard 
          title="Shortlisted Creators" 
          value="-" 
          icon={Heart} 
        />
        <StatCard 
          title="Active Collaborations" 
          value="-" 
          icon={Briefcase} 
        />
      </div>

      {/* API Blocked State Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-full shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-900">Database Integration Pending</h3>
          <p className="text-xs text-amber-700 mt-1 max-w-2xl leading-relaxed">
            Live metrics and creator data are currently blocked pending the final Supabase PostgreSQL schema verification (Phase 4/5). 
            Temporary mock values have been removed as per strict preservation protocols. 
            Once the database is stamped, live API data will populate here.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Applications & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Creator Proposals */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
              <p className="text-xs text-slate-400">Proposals submitted by creators</p>
            </div>
            <Link
              to="/dashboard/business/applications"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <EmptyState 
            title="No Data Available"
            description="Applications data cannot be loaded until the database migration is finalized."
          />
        </div>

        {/* Right: Active Campaigns & Quick Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                to="/dashboard/business/creators"
                className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 hover:bg-purple-100/70 transition-all flex flex-col items-center text-center gap-2 text-purple-900 font-bold"
              >
                <Search className="w-5 h-5 text-purple-600" />
                <span>Search Creators</span>
              </Link>
              <Link
                to="/dashboard/business/ai-match"
                className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 hover:bg-indigo-100/70 transition-all flex flex-col items-center text-center gap-2 text-indigo-900 font-bold"
              >
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>AI Recommendation</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Recent Campaigns</h2>
              <Link
                to="/dashboard/business/campaigns"
                className="text-xs font-semibold text-purple-600 hover:underline"
              >
                Manage
              </Link>
            </div>
            <EmptyState 
              title="No Campaigns Loaded"
              description="Campaign data is blocked pending DB verification."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
