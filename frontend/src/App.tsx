import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ProfessionSelectPage } from './pages/ProfessionSelectPage';
import { RegisterPage } from './pages/RegisterPage';
import { RegisterSuccessPage } from './pages/RegisterSuccessPage';
import { PlatformSelectPage } from './pages/PlatformSelectPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Business Dashboard Pages
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { BusinessOverviewPage } from './pages/business/BusinessOverviewPage';
import { CreatorDiscoveryPage } from './pages/business/CreatorDiscoveryPage';
import { CreateCampaignPage } from './pages/business/CreateCampaignPage';
import { CampaignManagementPage } from './pages/business/CampaignManagementPage';
import { AiMatchPage } from './pages/business/AiMatchPage';
import { BusinessProfilePage } from './pages/business/BusinessProfilePage';
import { CreatorShortlistPage } from './pages/business/CreatorShortlistPage';
import { CampaignApplicationsPage } from './pages/business/CampaignApplicationsPage';
import { BusinessCollaborationsPage } from './pages/business/BusinessCollaborationsPage';

// Creator Dashboard Pages
import { CreatorOverviewPage } from './pages/creator/CreatorOverviewPage';
import { CreatorProfileSetupPage } from './pages/creator/CreatorProfileSetupPage';
import { ExploreCampaignsPage } from './pages/creator/ExploreCampaignsPage';
import { MyApplicationsPage } from './pages/creator/MyApplicationsPage';
import { CollaborationsPage } from './pages/creator/CollaborationsPage';
import { CreatorInvitationsPage } from './pages/creator/CreatorInvitationsPage';

// Admin Dashboard Pages
import { AdminLayout } from './layouts/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminCampaignsPage } from './pages/admin/AdminCampaignsPage';
import { AdminPendingPage } from './pages/admin/AdminPendingPage';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppDataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public & Onboarding Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/select-profession" element={<ProfessionSelectPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register-success" element={<RegisterSuccessPage />} />
              <Route path="/select-platforms" element={<PlatformSelectPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Authenticated Dashboard Shell */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                {/* Fallback to business default */}
                <Route index element={<Navigate to="/dashboard/business" replace />} />
                
                {/* Business Owner Routes */}
                <Route path="business" element={<BusinessOverviewPage />} />
                <Route path="business/profile" element={<BusinessProfilePage />} />
                <Route path="business/creators" element={<CreatorDiscoveryPage />} />
                <Route path="business/shortlist" element={<CreatorShortlistPage />} />
                <Route path="business/campaigns/new" element={<CreateCampaignPage />} />
                <Route path="business/campaigns" element={<CampaignManagementPage />} />
                <Route path="business/applications" element={<CampaignApplicationsPage />} />
                <Route path="business/collaborations" element={<BusinessCollaborationsPage />} />
                <Route path="business/ai-match" element={<AiMatchPage />} />

                {/* Content Creator Routes */}
                <Route path="creator" element={<CreatorOverviewPage />} />
                <Route path="creator/profile" element={<CreatorProfileSetupPage />} />
                <Route path="creator/campaigns" element={<ExploreCampaignsPage />} />
                <Route path="creator/applications" element={<MyApplicationsPage />} />
                <Route path="creator/invitations" element={<CreatorInvitationsPage />} />
                <Route path="creator/collaborations" element={<CollaborationsPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="businesses" element={<AdminUsersPage roleFilter="business" />} />
                <Route path="creators" element={<AdminUsersPage roleFilter="creator" />} />
                <Route path="campaigns" element={<AdminCampaignsPage />} />
                
                {/* Pending Features */}
                <Route path="applications" element={<AdminPendingPage title="Applications" description="Managing individual creator applications is pending backend schema refactor." />} />
                <Route path="collaborations" element={<AdminPendingPage title="Collaborations" description="Tracking live collaborations is pending backend schema refactor." />} />
                <Route path="reports" element={<AdminPendingPage title="Reports & Moderation" description="Platform reports and moderation queues are pending backend implementation." />} />
                <Route path="notifications" element={<AdminPendingPage title="Admin Notifications" description="System alerts and notifications are pending backend implementation." />} />
                <Route path="audit" element={<AdminPendingPage title="Audit Logs" description="Secure action auditing is pending backend architecture." />} />
                <Route path="health" element={<AdminPendingPage title="Platform Health" description="Advanced system monitoring is pending backend integration." />} />
                <Route path="settings" element={<AdminPendingPage title="Admin Settings" description="Global platform settings are pending implementation." />} />
              </Route>

              {/* 404 Catch All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AppDataProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
