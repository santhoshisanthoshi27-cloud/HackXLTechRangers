import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { 
  LayoutDashboard, 
  Search, 
  PlusCircle, 
  Layers, 
  Sparkles, 
  FileCheck2, 
  Briefcase, 
  UserCheck, 
  Share2, 
  Home, 
  LogOut, 
  X,
  Heart,
  Mail,
  Building2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { resetDemoData } = useAppData();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

interface SidebarNavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

  const businessNavItems: SidebarNavItem[] = [
    { label: 'Overview', path: '/dashboard/business', icon: LayoutDashboard },
    { label: 'Creator Discovery', path: '/dashboard/business/creators', icon: Search },
    { label: 'AI Creator Match', path: '/dashboard/business/ai-match', icon: Sparkles, highlight: true },
    { label: 'Shortlisted Creators', path: '/dashboard/business/shortlist', icon: Heart },
    { label: 'Create Campaign', path: '/dashboard/business/campaigns/new', icon: PlusCircle },
    { label: 'Campaign Management', path: '/dashboard/business/campaigns', icon: Layers },
    { label: 'Applications Received', path: '/dashboard/business/applications', icon: FileCheck2 },
    { label: 'Collaborations', path: '/dashboard/business/collaborations', icon: Briefcase },
    { label: 'Brand Profile', path: '/dashboard/business/profile', icon: Building2 },
  ];

  const creatorNavItems: SidebarNavItem[] = [
    { label: 'Overview', path: '/dashboard/creator', icon: LayoutDashboard },
    { label: 'Explore Campaigns', path: '/dashboard/creator/campaigns', icon: Search },
    { label: 'Brand Invitations', path: '/dashboard/creator/invitations', icon: Mail },
    { label: 'My Applications', path: '/dashboard/creator/applications', icon: FileCheck2 },
    { label: 'Collaborations', path: '/dashboard/creator/collaborations', icon: Briefcase },
    { label: 'Profile & Portfolio', path: '/dashboard/creator/profile', icon: UserCheck },
  ];

  const navItems: SidebarNavItem[] = user?.role === 'creator' ? creatorNavItems : businessNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top Logo & Close Button */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
            <div className="bg-white p-2 rounded-xl">
              <Logo size="sm" />
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Role Banner */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[10px] font-bold tracking-wider uppercase text-purple-400">
              Active Workspace
            </span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-white capitalize">
                {user?.role === 'business' ? 'Brand Portal' : 'Creator Portal'}
              </span>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-medium">
                Demo
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                      : item.highlight
                      ? 'text-purple-300 hover:bg-slate-800 hover:text-white bg-purple-950/40 border border-purple-800/40'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                  {item.highlight && (
                    <span className="ml-auto text-[10px] uppercase font-bold tracking-wider bg-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          <NavLink
            to="/select-platforms"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            <span>Promotion Platforms</span>
          </NavLink>

          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Back to Public Site</span>
          </NavLink>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-purple-300 transition-colors cursor-pointer"
            title="Reset demo data to default baseline"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>Reset Demo Baseline</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Demo</span>
          </button>
        </div>
      </aside>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reset Demo Baseline"
        subtitle="Demo-only system maintenance operation"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <span className="font-bold block">Restore Default Mock Data</span>
              <p className="leading-relaxed">
                This will reset all campaigns, applications, invitations, and collaborations back to the clean hackathon demo baseline. All changes saved in localStorage will be cleared.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <span className="font-semibold text-slate-800 block mb-1">Demo Limitations Notice:</span>
            NECTO runs in client-side prototype mode. In production, persistent data is stored in the PostgreSQL database with backend role-based access control.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                setShowResetConfirm(false);
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Confirm Reset Baseline
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
