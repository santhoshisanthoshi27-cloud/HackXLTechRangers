import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { NotificationDrawer } from './NotificationDrawer';
import { 
  Bell, 
  Menu, 
  Sparkles, 
  Briefcase, 
  Video, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
  const { user, switchRoleDemo } = useAuth();
  const { unreadNotificationCount } = useAppData();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole: 'business' | 'creator') => {
    switchRoleDemo(newRole);
    navigate(newRole === 'business' ? '/dashboard/business' : '/dashboard/creator');
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">
                Hi, {user?.fullName || 'Demo User'}
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                {user?.role === 'business' ? 'Business Owner' : 'Content Creator'}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {user?.role === 'business' ? 'Manage campaigns & discover verified creators' : 'Explore paid brand collaborations & showcase content'}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Interactive Role Switcher Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium border border-slate-200/70">
            <button
              onClick={() => handleRoleSwitch('business')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                user?.role === 'business'
                  ? 'bg-white text-purple-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Switch demo to Business Owner"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Brand View</span>
            </button>
            <button
              onClick={() => handleRoleSwitch('creator')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                user?.role === 'creator'
                  ? 'bg-white text-purple-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Switch demo to Content Creator"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Creator View</span>
            </button>
          </div>

          {/* AI Match Quick Link (for businesses) */}
          {user?.role === 'business' && (
            <Link
              to="/dashboard/business/ai-match"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 rounded-xl transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Match</span>
            </Link>
          )}

          {/* Notifications Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-slate-100 transition-colors"
            aria-label="Open notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <Link
            to={user?.role === 'creator' ? '/dashboard/creator/profile' : '/dashboard/business/profile'}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-85 transition-opacity"
            title="View Profile"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.fullName || 'User Avatar'}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-600/20"
            />
          </Link>
        </div>
      </header>

      {/* Slide-over notifications */}
      <NotificationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
