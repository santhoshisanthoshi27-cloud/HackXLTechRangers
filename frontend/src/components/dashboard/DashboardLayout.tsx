import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Route protection: unauthenticated users redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Direct /dashboard index routing according to active user role
  if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
    return <Navigate to={user.role === 'creator' ? '/dashboard/creator' : '/dashboard/business'} replace />;
  }

  // Role separation guard: prevent cross-role dashboard view leakage
  if (user.role === 'business' && location.pathname.startsWith('/dashboard/creator')) {
    return <Navigate to="/dashboard/business" replace />;
  }
  if (user.role === 'creator' && location.pathname.startsWith('/dashboard/business')) {
    return <Navigate to="/dashboard/creator" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
