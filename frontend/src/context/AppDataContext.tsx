import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Campaign, 
  Creator, 
  CampaignApplication, 
  CollaborationItem, 
  NotificationItem, 
  CampaignStatus,
  ApplicationStatus,
  CreatorInvitation,
  CreatorPortfolioItem
} from '../types';
import { INITIAL_CREATORS } from '../data/mockCreators';
import { campaignApi } from '../services/api';
import { INITIAL_CAMPAIGNS, INITIAL_APPLICATIONS, INITIAL_COLLABORATIONS, INITIAL_INVITATIONS } from '../data/mockCampaigns';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { useToast } from './ToastContext';

interface AppDataContextType {
  creators: Creator[];
  campaigns: Campaign[];
  applications: CampaignApplication[];
  collaborations: CollaborationItem[];
  notifications: NotificationItem[];
  invitations: CreatorInvitation[];
  shortlistedCreatorIds: string[];
  unreadNotificationCount: number;
  
  // Actions
  addCampaign: (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => Promise<Campaign | undefined>;
  editCampaign: (campaignId: string, updates: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (campaignId: string) => Promise<void>;
  updateCampaignStatus: (campaignId: string, status: CampaignStatus) => Promise<void>;
  applyToCampaign: (applicationData: {
    campaignId: string;
    proposal: string;
    proposedPrice: number;
    portfolioLink: string;
    availability: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
  }) => boolean;
  hasAppliedToCampaign: (campaignId: string, creatorId: string) => boolean;
  toggleShortlist: (creatorId: string) => void;
  isShortlisted: (creatorId: string) => boolean;
  sendInvitation: (invitationData: {
    campaignId: string;
    creatorId: string;
    notes?: string;
  }) => boolean;
  respondToInvitation: (invitationId: string, status: 'Accepted' | 'Declined') => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;
  updateCollaborationProgress: (
    collabId: string, 
    percentage: number, 
    status: CollaborationItem['progressStatus'], 
    notes?: string,
    submittedUrl?: string
  ) => void;
  approveCollaboration: (collabId: string, approved: boolean, feedback?: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  updateCreatorProfileData: (creatorId: string, updates: Partial<Creator>) => void;
  addPortfolioItem: (creatorId: string, item: Omit<CreatorPortfolioItem, 'id'>) => void;
  removePortfolioItem: (creatorId: string, itemId: string) => void;
  resetDemoData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info, error } = useToast();

  const [creators, setCreators] = useState<Creator[]>(() => {
    try {
      const saved = localStorage.getItem('necto_creators');
      return saved ? JSON.parse(saved) : INITIAL_CREATORS;
    } catch {
      return INITIAL_CREATORS;
    }
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const [applications, setApplications] = useState<CampaignApplication[]>(() => {
    try {
      const saved = localStorage.getItem('necto_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [collaborations, setCollaborations] = useState<CollaborationItem[]>(() => {
    try {
      const saved = localStorage.getItem('necto_collaborations');
      return saved ? JSON.parse(saved) : INITIAL_COLLABORATIONS;
    } catch {
      return INITIAL_COLLABORATIONS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('necto_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [invitations, setInvitations] = useState<CreatorInvitation[]>(() => {
    try {
      const saved = localStorage.getItem('necto_invitations');
      return saved ? JSON.parse(saved) : INITIAL_INVITATIONS;
    } catch {
      return INITIAL_INVITATIONS;
    }
  });

  const [shortlistedCreatorIds, setShortlistedCreatorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('necto_shortlists');
      return saved ? JSON.parse(saved) : ['creator-1'];
    } catch {
      return ['creator-1'];
    }
  });

  useEffect(() => {
    campaignApi.getCampaigns().then(res => {
      const mappedCampaigns = res.data.map((apiCamp: any) => ({
        ...apiCamp,
        brandName: apiCamp.brand_name || apiCamp.brandName || '',
        budgetDisplay: apiCamp.budget_display || `$${apiCamp.budget || 0}`,
        targetAudience: apiCamp.target_audience || 'General Audience',
        preferredNiche: apiCamp.preferred_niche || 'Tech & Gadgets',
        startDate: apiCamp.start_date || new Date().toISOString().split('T')[0],
        endDate: apiCamp.end_date || new Date().toISOString().split('T')[0],
        deadline: apiCamp.deadline || new Date().toISOString().split('T')[0],
        additionalInstructions: apiCamp.additional_instructions || '',
        applicationsCount: apiCamp.applications_count || 0,
        createdAt: apiCamp.created_at || new Date().toISOString()
      }));
      setCampaigns(mappedCampaigns);
    }).catch(err => {
      console.error("Failed to load campaigns", err);
    });
  }, []);

  // Local storage synchronizers
  useEffect(() => {
    localStorage.setItem('necto_creators', JSON.stringify(creators));
  }, [creators]);


  useEffect(() => {
    localStorage.setItem('necto_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('necto_collaborations', JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem('necto_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('necto_invitations', JSON.stringify(invitations));
  }, [invitations]);

  useEffect(() => {
    localStorage.setItem('necto_shortlists', JSON.stringify(shortlistedCreatorIds));
  }, [shortlistedCreatorIds]);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const addCampaign = async (campaignData: Omit<Campaign, 'id' | 'applicationsCount' | 'createdAt'>) => {
    try {
      // Map camelCase to snake_case for the API
      const apiPayload = {
        title: campaignData.title,
        brand_name: campaignData.brandName,
        description: campaignData.description,
        budget: campaignData.budget,
        platforms: campaignData.platforms,
        deliverables: campaignData.deliverables
      };
      
      const res = await campaignApi.createCampaign(apiPayload);
      
      // Merge backend response with the rich frontend data
      const newCamp: Campaign = {
        ...campaignData,
        id: res.data.id,
        applicationsCount: 0,
        createdAt: res.data.created_at || new Date().toISOString()
      };
      
      setCampaigns(prev => [newCamp, ...prev]);
      success('Campaign Created Successfully!', `"${newCamp.title}" is now active in demo state.`);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Campaign Published',
      message: `Your campaign "${newCamp.title}" has been published and is visible to creators.`,
      timestamp: 'Just now',
      read: false,
      type: 'status',
      link: '/dashboard/business/campaigns'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newCamp;
    } catch (err) {
      error('Error', 'Failed to create campaign');
    }
  };

  const updateCampaignStatus = async (campaignId: string, status: CampaignStatus) => {
    try {
      await campaignApi.updateCampaign(campaignId, { status });
      setCampaigns(prev => prev.map(c => (c.id === campaignId ? { ...c, status } : c)));
      info('Campaign Status Updated', `Status changed to ${status}`);
    } catch (err) {
      error('Error', 'Failed to update campaign status');
    }
  };

  const hasAppliedToCampaign = (campaignId: string, creatorId: string) => {
    return applications.some(app => app.campaignId === campaignId && app.creatorId === creatorId);
  };

  const applyToCampaign = (applicationData: {
    campaignId: string;
    proposal: string;
    proposedPrice: number;
    portfolioLink: string;
    availability: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
  }): boolean => {
    const targetCampaign = campaigns.find(c => c.id === applicationData.campaignId);
    if (!targetCampaign) {
      error('Campaign Not Found', 'Could not locate target campaign.');
      return false;
    }

    if (hasAppliedToCampaign(applicationData.campaignId, applicationData.creatorId)) {
      error('Application Already Submitted', 'You have already applied for this campaign in this demo.');
      return false;
    }

    const newApp: CampaignApplication = {
      id: `app-${Date.now().toString(36)}`,
      campaignId: targetCampaign.id,
      campaignTitle: targetCampaign.title,
      brandName: targetCampaign.brandName,
      creatorId: applicationData.creatorId,
      creatorName: applicationData.creatorName,
      creatorAvatar: applicationData.creatorAvatar,
      creatorNiche: targetCampaign.preferredNiche,
      proposal: applicationData.proposal,
      proposedPrice: applicationData.proposedPrice,
      portfolioLink: applicationData.portfolioLink,
      availability: applicationData.availability,
      status: 'Applied',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);
    
    // Update campaign application count
    setCampaigns(prev => prev.map(c => 
      c.id === targetCampaign.id ? { ...c, applicationsCount: c.applicationsCount + 1 } : c
    ));

    // Create notification for brand
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Campaign Application',
      message: `${applicationData.creatorName} submitted an application for "${targetCampaign.title}".`,
      timestamp: 'Just now',
      read: false,
      type: 'application',
      link: '/dashboard/business/campaigns'
    };
    setNotifications(prev => [newNotif, ...prev]);

    success('Application Submitted!', `Successfully submitted your proposal to ${targetCampaign.brandName}.`);
    return true;
  };

  const toggleShortlist = (creatorId: string) => {
    setShortlistedCreatorIds(prev => {
      const exists = prev.includes(creatorId);
      if (exists) {
        info('Creator Removed', 'Creator removed from your shortlisted list.');
        return prev.filter(id => id !== creatorId);
      } else {
        const creator = creators.find(c => c.id === creatorId);
        success('Creator Shortlisted!', `${creator?.name || 'Creator'} added to your shortlist.`);
        return [...prev, creatorId];
      }
    });
  };

  const isShortlisted = (creatorId: string) => {
    return shortlistedCreatorIds.includes(creatorId);
  };

  const updateApplicationStatus = (applicationId: string, status: ApplicationStatus, notes?: string) => {
    const targetApp = applications.find(a => a.id === applicationId);

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return { ...app, status, feedbackNotes: notes || app.feedbackNotes };
      }
      return app;
    }));

    // If accepted, ensure exactly ONE collaboration item is created without duplicates
    if (status === 'Accepted' && targetApp) {
      setCollaborations(prev => {
        const alreadyExists = prev.some(
          c => c.campaignId === targetApp.campaignId && c.counterpartName === targetApp.creatorName
        );
        if (alreadyExists) return prev;

        const newCollab: CollaborationItem = {
          id: `collab-${Date.now().toString(36)}`,
          campaignId: targetApp.campaignId,
          campaignTitle: targetApp.campaignTitle,
          counterpartName: targetApp.creatorName,
          counterpartRole: 'Creator',
          deliverables: [targetApp.proposal.slice(0, 40) + '... Deliverables'],
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progressPercentage: 25,
          progressStatus: 'In Progress',
          submissionNotes: `Application proposal accepted at $${targetApp.proposedPrice}. Milestone collaboration active.`
        };
        return [newCollab, ...prev];
      });

      // Notify the creator
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'Proposal Accepted!',
        message: `Your pitch for "${targetApp.campaignTitle}" was accepted. Milestone tracking is now active!`,
        timestamp: 'Just now',
        read: false,
        type: 'application',
        link: '/dashboard/creator/collaborations'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    info('Application Updated', `Application status changed to ${status}.`);
  };

  const updateCollaborationProgress = (
    collabId: string, 
    percentage: number, 
    status: CollaborationItem['progressStatus'], 
    notes?: string,
    submittedUrl?: string
  ) => {
    setCollaborations(prev => prev.map(collab => {
      if (collab.id === collabId) {
        return {
          ...collab,
          progressPercentage: percentage,
          progressStatus: status,
          submissionNotes: notes !== undefined ? notes : collab.submissionNotes,
          submittedUrl: submittedUrl !== undefined ? submittedUrl : collab.submittedUrl
        };
      }
      return collab;
    }));
    success('Collaboration Updated', `Deliverables progress saved (${percentage}%).`);
  };

  const editCampaign = async (campaignId: string, updates: Partial<Campaign>) => {
    try {
      const apiUpdates: any = { ...updates };
      if (updates.brandName) apiUpdates.brand_name = updates.brandName;
      
      const res = await campaignApi.updateCampaign(campaignId, apiUpdates);
      
      const updatedBackendData = res.data;
      const mappedUpdates = {
        ...updatedBackendData,
        brandName: updatedBackendData.brand_name || updatedBackendData.brandName || updates.brandName,
      };
      
      setCampaigns(prev => prev.map(c => (c.id === campaignId ? { ...c, ...updates, ...mappedUpdates } : c)));
      success('Campaign Updated', 'Your campaign modifications have been saved.');
    } catch (err) {
      error('Error', 'Failed to update campaign');
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      await campaignApi.deleteCampaign(campaignId);
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      info('Campaign Deleted', 'Campaign removed from active listings.');
    } catch (err) {
      error('Error', 'Failed to delete campaign');
    }
  };

  const sendInvitation = (invitationData: {
    campaignId: string;
    creatorId: string;
    notes?: string;
  }): boolean => {
    const targetCampaign = campaigns.find(c => c.id === invitationData.campaignId);
    const targetCreator = creators.find(c => c.id === invitationData.creatorId);

    if (!targetCampaign || !targetCreator) {
      error('Invitation Failed', 'Could not locate target campaign or creator.');
      return false;
    }

    const existing = invitations.find(
      inv => inv.campaignId === invitationData.campaignId && inv.creatorId === invitationData.creatorId
    );
    if (existing) {
      info('Already Invited', `An invitation for "${targetCampaign.title}" has already been sent to ${targetCreator.name}.`);
      return false;
    }

    const newInv: CreatorInvitation = {
      id: `inv-${Date.now().toString(36)}`,
      campaignId: targetCampaign.id,
      campaignTitle: targetCampaign.title,
      brandName: targetCampaign.brandName,
      creatorId: targetCreator.id,
      creatorName: targetCreator.name,
      creatorAvatar: targetCreator.avatar,
      budget: targetCampaign.budget,
      budgetDisplay: targetCampaign.budgetDisplay,
      deliverables: targetCampaign.deliverables,
      sentAt: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: invitationData.notes || `Hi ${targetCreator.name}, we would love to collaborate on our upcoming campaign!`
    };

    setInvitations(prev => [newInv, ...prev]);

    // Add notification for creator
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Brand Invitation',
      message: `${targetCampaign.brandName} invited you to collaborate on "${targetCampaign.title}" (${targetCampaign.budgetDisplay}).`,
      timestamp: 'Just now',
      read: false,
      type: 'invitation',
      link: '/dashboard/creator/invitations'
    };
    setNotifications(prev => [newNotif, ...prev]);

    success('Invitation Dispatched!', `Invited ${targetCreator.name} to "${targetCampaign.title}".`);
    return true;
  };

  const respondToInvitation = (invitationId: string, status: 'Accepted' | 'Declined') => {
    const targetInv = invitations.find(i => i.id === invitationId);
    if (!targetInv) return;

    setInvitations(prev => prev.map(inv => (inv.id === invitationId ? { ...inv, status } : inv)));

    if (status === 'Accepted') {
      setCollaborations(prev => {
        const alreadyExists = prev.some(
          c => c.campaignId === targetInv.campaignId && (c.counterpartName === targetInv.brandName || c.counterpartName === targetInv.creatorName)
        );
        if (alreadyExists) return prev;

        const newCollab: CollaborationItem = {
          id: `collab-${Date.now().toString(36)}`,
          campaignId: targetInv.campaignId,
          campaignTitle: targetInv.campaignTitle,
          counterpartName: targetInv.brandName,
          counterpartRole: 'Brand',
          deliverables: targetInv.deliverables,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progressPercentage: 10,
          progressStatus: 'In Progress',
          submissionNotes: 'Invitation accepted by creator; planning initial content production.'
        };
        return [newCollab, ...prev];
      });

      // Send status notification to brand owner
      const responseNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'Invitation Accepted!',
        message: `${targetInv.creatorName} has accepted your campaign invitation for "${targetInv.campaignTitle}".`,
        timestamp: 'Just now',
        read: false,
        type: 'invitation',
        link: '/dashboard/business/collaborations'
      };
      setNotifications(prev => [responseNotif, ...prev]);

      success('Invitation Accepted!', `Collaboration initiated with ${targetInv.brandName}.`);
    } else {
      const declineNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: 'Invitation Declined',
        message: `${targetInv.creatorName} has declined your invitation for "${targetInv.campaignTitle}".`,
        timestamp: 'Just now',
        read: false,
        type: 'invitation',
        link: '/dashboard/business/campaigns'
      };
      setNotifications(prev => [declineNotif, ...prev]);

      info('Invitation Declined', `You declined the invitation from ${targetInv.brandName}.`);
    }
  };

  const approveCollaboration = (collabId: string, approved: boolean, feedback?: string) => {
    setCollaborations(prev => prev.map(collab => {
      if (collab.id === collabId) {
        return {
          ...collab,
          progressStatus: approved ? 'Approved' : 'In Progress',
          progressPercentage: approved ? 100 : collab.progressPercentage,
          submissionNotes: feedback ? `Review Feedback: ${feedback}` : collab.submissionNotes
        };
      }
      return collab;
    }));

    if (approved) {
      success('Deliverables Approved!', 'Campaign deliverables verified and marked as complete.');
    } else {
      info('Revision Requested', 'Feedback notes shared with the creator.');
    }
  };

  const addPortfolioItem = (creatorId: string, item: Omit<CreatorPortfolioItem, 'id'>) => {
    const newItem: CreatorPortfolioItem = {
      ...item,
      id: `p-${Date.now().toString(36)}`
    };
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return { ...c, portfolio: [newItem, ...c.portfolio] };
      }
      return c;
    }));
    success('Portfolio Item Added', `"${newItem.title}" added to your creator media kit.`);
  };

  const removePortfolioItem = (creatorId: string, itemId: string) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return { ...c, portfolio: c.portfolio.filter(p => p.id !== itemId) };
      }
      return c;
    }));
    info('Item Removed', 'Portfolio item removed.');
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    info('Notifications Cleared', 'All notifications marked as read.');
  };

  const updateCreatorProfileData = (creatorId: string, updates: Partial<Creator>) => {
    setCreators(prev => prev.map(c => c.id === creatorId ? { ...c, ...updates } : c));
    success('Profile Saved', 'Creator profile information updated.');
  };

  const resetDemoData = () => {
    localStorage.removeItem('necto_creators');
    localStorage.removeItem('necto_campaigns');
    localStorage.removeItem('necto_applications');
    localStorage.removeItem('necto_collaborations');
    localStorage.removeItem('necto_notifications');
    localStorage.removeItem('necto_invitations');
    localStorage.removeItem('necto_shortlists');

    // Deep clone baseline data to avoid stale shared references
    setCreators(JSON.parse(JSON.stringify(INITIAL_CREATORS)));
    setCampaigns(JSON.parse(JSON.stringify(INITIAL_CAMPAIGNS)));
    setApplications(JSON.parse(JSON.stringify(INITIAL_APPLICATIONS)));
    setCollaborations(JSON.parse(JSON.stringify(INITIAL_COLLABORATIONS)));
    setNotifications(JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS)));
    setInvitations(JSON.parse(JSON.stringify(INITIAL_INVITATIONS)));
    setShortlistedCreatorIds(['creator-1']);

    success('Demo Baseline Restored', 'All demo state has been reset to default hackathon baseline.');
  };

  return (
    <AppDataContext.Provider
      value={{
        creators,
        campaigns,
        applications,
        collaborations,
        notifications,
        invitations,
        shortlistedCreatorIds,
        unreadNotificationCount,
        addCampaign,
        editCampaign,
        deleteCampaign,
        updateCampaignStatus,
        applyToCampaign,
        hasAppliedToCampaign,
        toggleShortlist,
        isShortlisted,
        sendInvitation,
        respondToInvitation,
        updateApplicationStatus,
        updateCollaborationProgress,
        approveCollaboration,
        markNotificationRead,
        markAllNotificationsRead,
        updateCreatorProfileData,
        addPortfolioItem,
        removePortfolioItem,
        resetDemoData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
