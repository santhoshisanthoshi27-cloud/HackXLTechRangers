import { Campaign, CampaignApplication, CollaborationItem, CreatorInvitation } from '../types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'AuraPulse Wireless Noise-Cancelling Headphones Launch',
    brandName: 'AuraSound Audio',
    brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=120&q=80',
    description: 'Launch promotional campaign for our flagship ANC headphones focusing on unboxing, sound quality breakdown, and daily commuting ergonomics.',
    objective: 'Brand Awareness & Product Conversions',
    targetAudience: 'Tech early adopters, remote workers, students, audiophiles aged 18-35.',
    preferredNiche: 'Tech & Gadgets',
    platforms: ['YouTube', 'Instagram'],
    budget: 1200,
    budgetDisplay: '$1,200',
    startDate: '2026-10-15',
    endDate: '2026-11-15',
    deadline: '2026-10-25',
    deliverables: [
      '1x Dedicated YouTube Review (8-12 mins) or In-depth 60s Reel',
      '2x Instagram Stories with trackable discount swipe-up link',
      'Honest battery life and ANC latency test'
    ],
    additionalInstructions: 'Emphasize the 45-hour battery life and custom EQ smartphone app.',
    status: 'Active',
    applicationsCount: 4,
    createdAt: '2026-10-01'
  },
  {
    id: 'camp-2',
    title: 'GlowBotanica 100% Organic Radiance Serum Spring Campaign',
    brandName: 'GlowBotanica Skincare',
    brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80',
    description: 'Introduce our cruelty-free botanical Vitamin C serum. We seek creators who demonstrate natural skin textures and honest 7-day before-after highlights.',
    objective: 'User-Generated Content & Direct Sales',
    targetAudience: 'Skincare enthusiasts, clean beauty buyers aged 20-40.',
    preferredNiche: 'Fashion & Beauty',
    platforms: ['Instagram', 'YouTube'],
    budget: 850,
    budgetDisplay: '$850',
    startDate: '2026-10-12',
    endDate: '2026-11-05',
    deadline: '2026-10-20',
    deliverables: [
      '1x Aesthetic Instagram Reel showcasing routine application',
      '3x High-resolution product lifestyle photos for brand reposting',
      'Promo code mention with exclusive 20% discount'
    ],
    additionalInstructions: 'Natural daylight preferred; avoid heavy beauty filters.',
    status: 'Active',
    applicationsCount: 6,
    createdAt: '2026-10-03'
  },
  {
    id: 'camp-3',
    title: 'GreenFork Artisanal Farm-to-Table Meal Prep Subscription',
    brandName: 'GreenFork Organics',
    brandLogo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80',
    description: 'Promote healthy, hassle-free dining by cooking a GreenFork gourmet box in under 15 minutes. Focus on freshness, flavor, and recyclable packaging.',
    objective: 'Subscription Trials & Local Metro Reach',
    targetAudience: 'Busy professionals, health-conscious couples, foodies.',
    preferredNiche: 'Food & Culinary',
    platforms: ['Instagram', 'Facebook'],
    budget: 650,
    budgetDisplay: '$650',
    startDate: '2026-10-18',
    endDate: '2026-11-20',
    deadline: '2026-10-28',
    deliverables: [
      '1x Engaging recipe cooking video (60-90s Reel or Short)',
      '1x Carousel post showing ingredients & plated dish',
      'First-order referral link in bio'
    ],
    additionalInstructions: 'Must show the eco-friendly insulated packaging.',
    status: 'Active',
    applicationsCount: 3,
    createdAt: '2026-10-04'
  },
  {
    id: 'camp-4',
    title: 'FlowPulse Productivity OS — B2B Founder Integration',
    brandName: 'FlowPulse Inc.',
    brandLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    description: 'Sponsorship for creators who speak to startup founders, solopreneurs, and engineering managers about daily workflow automation and task prioritization.',
    objective: 'High-intent B2B SaaS Signups',
    targetAudience: 'Software engineers, founders, project managers.',
    preferredNiche: 'Business & Finance',
    platforms: ['LinkedIn', 'YouTube'],
    budget: 1500,
    budgetDisplay: '$1,500',
    startDate: '2026-11-01',
    endDate: '2026-12-01',
    deadline: '2026-10-30',
    deliverables: [
      '1x Thought-leadership LinkedIn article/case study',
      '1x 60-second video demo illustrating workspace setup'
    ],
    additionalInstructions: 'Focus on time saved per week vs legacy spreadsheet trackers.',
    status: 'Draft',
    applicationsCount: 1,
    createdAt: '2026-10-06'
  }
];

export const INITIAL_APPLICATIONS: CampaignApplication[] = [
  {
    id: 'app-1',
    campaignId: 'camp-1',
    campaignTitle: 'AuraPulse Wireless Noise-Cancelling Headphones Launch',
    brandName: 'AuraSound Audio',
    creatorId: 'creator-1',
    creatorName: 'Alex Rivera',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    creatorNiche: 'Tech & Gadgets',
    proposal: 'Hey AuraSound team! I run a 185K tech channel where my audience loves audio deep-dives. I can test the ANC against industry benchmarks and showcase commuting isolation.',
    proposedPrice: 850,
    portfolioLink: 'https://youtube.com',
    availability: 'Immediate (can deliver in 5 business days)',
    status: 'Shortlisted',
    submittedAt: '2026-10-05',
    feedbackNotes: 'Impressive tech benchmarks portfolio; reviewing audio comparison pitch.'
  },
  {
    id: 'camp-2-app',
    campaignId: 'camp-2',
    campaignTitle: 'GlowBotanica 100% Organic Radiance Serum Spring Campaign',
    brandName: 'GlowBotanica Skincare',
    creatorId: 'creator-2',
    creatorName: 'Maya Chen',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    creatorNiche: 'Fashion & Beauty',
    proposal: 'My audience of 320K actively seeks cruelty-free serums. I propose a 7-day glow diary Reel with micro-zoom skin textures and morning sunshine aesthetics.',
    proposedPrice: 800,
    portfolioLink: 'https://instagram.com',
    availability: 'Available next week',
    status: 'Under Review',
    submittedAt: '2026-10-06'
  },
  {
    id: 'camp-3-app',
    campaignId: 'camp-3',
    campaignTitle: 'GreenFork Artisanal Farm-to-Table Meal Prep Subscription',
    brandName: 'GreenFork Organics',
    creatorId: 'creator-3',
    creatorName: 'Chef Rohan Kapoor',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    creatorNiche: 'Food & Culinary',
    proposal: 'I would love to prepare a 15-minute quick gourmet recipe using the fresh ingredients and showcase how unboxing saves meal prep hassle for working couples.',
    proposedPrice: 600,
    portfolioLink: 'https://instagram.com',
    availability: 'Starting Oct 20th',
    status: 'Accepted',
    submittedAt: '2026-10-07'
  }
];

export const INITIAL_COLLABORATIONS: CollaborationItem[] = [
  {
    id: 'collab-1',
    campaignId: 'camp-3',
    campaignTitle: 'GreenFork Artisanal Farm-to-Table Meal Prep Subscription',
    counterpartName: 'GreenFork Organics',
    counterpartRole: 'Brand',
    deliverables: ['1x Recipe Reel', '1x Plated Carousel', 'Discount Code Link'],
    dueDate: '2026-10-28',
    progressPercentage: 65,
    progressStatus: 'In Progress',
    submissionNotes: 'Ingredients received; initial shoot completed, editing final color grade.'
  },
  {
    id: 'collab-2',
    campaignId: 'camp-1',
    campaignTitle: 'AuraPulse Wireless Noise-Cancelling Headphones Launch',
    counterpartName: 'Alex Rivera',
    counterpartRole: 'Creator',
    deliverables: ['1x Dedicated YouTube Review', '2x IG Stories'],
    dueDate: '2026-11-05',
    progressPercentage: 25,
    progressStatus: 'Not Started',
    submissionNotes: 'Review unit tracking provided; waiting for package delivery.'
  }
];

export const INITIAL_INVITATIONS: CreatorInvitation[] = [
  {
    id: 'inv-1',
    campaignId: 'camp-1',
    campaignTitle: 'AuraPulse Wireless Noise-Cancelling Headphones Launch',
    brandName: 'AuraSound Audio',
    creatorId: 'creator-1',
    creatorName: 'Alex Rivera',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    budget: 1200,
    budgetDisplay: '$1,200',
    deliverables: [
      '1x Dedicated YouTube Review (8-12 mins)',
      '2x Instagram Stories with trackable discount swipe-up link'
    ],
    sentAt: '2026-10-08',
    status: 'Pending',
    notes: 'Hi Alex, we love your audio tech reviews and want to sponsor a dedicated ANC comparison for our launch!'
  },
  {
    id: 'inv-2',
    campaignId: 'camp-4',
    campaignTitle: 'FlowPulse Productivity OS — B2B Founder Integration',
    brandName: 'FlowPulse Inc.',
    creatorId: 'creator-1',
    creatorName: 'Alex Rivera',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    budget: 1500,
    budgetDisplay: '$1,500',
    deliverables: [
      '1x Thought-leadership LinkedIn article/case study',
      '1x 60-second video demo illustrating workspace setup'
    ],
    sentAt: '2026-10-07',
    status: 'Pending',
    notes: 'We would love to feature your desk setup and daily developer productivity stack in FlowPulse.'
  }
];
