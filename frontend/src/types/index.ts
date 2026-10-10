export type UserRole = 'business' | 'creator' | 'admin';

export type PromotionPlatform = 'Instagram' | 'YouTube' | 'Facebook' | 'LinkedIn';

export type ContentNiche = 
  | 'Tech & Gadgets' 
  | 'Fashion & Beauty' 
  | 'Food & Culinary' 
  | 'Fitness & Health' 
  | 'Travel & Adventure' 
  | 'Home Décor & Lifestyle'
  | 'Business & Finance'
  | 'Gaming & Entertainment';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  selectedPlatforms: PromotionPlatform[];
  companyName?: string;
  industry?: string;
  location?: string;
  website?: string;
  avatarUrl: string;
  bio?: string;
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  platform: PromotionPlatform;
  url: string;
  viewsOrReach: string;
  thumbnail: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  primaryNiche: ContentNiche;
  niches: ContentNiche[];
  platforms: PromotionPlatform[];
  location: string;
  audienceSize: string; // e.g. "125K"
  totalFollowers: number;
  engagementRate: number; // e.g. 4.8
  pricingRange: string; // e.g. "$300 - $800"
  minBudget: number;
  maxBudget: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  verified: boolean;
  available: boolean;
  portfolio: CreatorPortfolioItem[];
  demographics: {
    topCountry: string;
    ageRange: string;
    genderRatio: string;
  };
}

export type CampaignStatus = 'Draft' | 'Active' | 'Completed' | 'Cancelled';

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  description: string;
  objective: string;
  targetAudience: string;
  preferredNiche: ContentNiche;
  platforms: PromotionPlatform[];
  budget: number;
  budgetDisplay: string;
  startDate: string;
  endDate: string;
  deadline: string;
  deliverables: string[];
  additionalInstructions?: string;
  status: CampaignStatus;
  applicationsCount: number;
  createdAt: string;
}

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Rejected';

export interface CampaignApplication {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorNiche: ContentNiche;
  proposal: string;
  proposedPrice: number;
  portfolioLink: string;
  availability: string;
  status: ApplicationStatus;
  submittedAt: string;
  feedbackNotes?: string;
}

export interface CollaborationItem {
  id: string;
  campaignId: string;
  campaignTitle: string;
  counterpartName: string;
  counterpartRole: 'Brand' | 'Creator';
  deliverables: string[];
  dueDate: string;
  progressPercentage: number;
  progressStatus: 'Not Started' | 'In Progress' | 'Submitted' | 'Approved';
  submissionNotes?: string;
  submittedUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'application' | 'invitation' | 'status' | 'system';
  link?: string;
}

export interface MatchScoreDetails {
  overallScore: number; // 0 - 100
  nicheMatch: boolean;
  nicheScore: number; // 0 - 35
  platformMatchCount: number;
  platformScore: number; // 0 - 25
  budgetCompatible: boolean;
  budgetScore: number; // 0 - 20
  audienceScore: number; // 0 - 10
  availabilityMatch: boolean;
  availabilityScore: number; // 0 - 10
  reasons: string[];
}

export type InvitationStatus = 'Pending' | 'Accepted' | 'Declined';

export interface CreatorInvitation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  budget: number;
  budgetDisplay: string;
  deliverables: string[];
  sentAt: string;
  status: InvitationStatus;
  notes?: string;
}
