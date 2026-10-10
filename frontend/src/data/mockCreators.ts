import { Creator } from '../types';

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Alex Rivera',
    handle: '@alexriveratech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Tech enthusiast & developer breaking down consumer electronics, AI developer tools, and smart desk setups.',
    primaryNiche: 'Tech & Gadgets',
    niches: ['Tech & Gadgets', 'Business & Finance'],
    platforms: ['YouTube', 'Instagram', 'LinkedIn'],
    location: 'Bangalore, India',
    audienceSize: '185K',
    totalFollowers: 185000,
    engagementRate: 5.4,
    pricingRange: '$400 - $950',
    minBudget: 400,
    maxBudget: 950,
    rating: 4.9,
    reviewCount: 38,
    verified: true,
    available: true,
    portfolio: [
      {
        id: 'p1',
        title: 'Top 5 AI Tools for Productivity (Sponsored Integration)',
        platform: 'YouTube',
        url: 'https://youtube.com',
        viewsOrReach: '94K Views',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'p2',
        title: 'Minimalist Ergonomic Workspace Tour',
        platform: 'Instagram',
        url: 'https://instagram.com',
        viewsOrReach: '42K Plays',
        thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'India (62%), USA (22%)',
      ageRange: '21-35 years (78%)',
      genderRatio: '70% Male / 30% Female'
    }
  },
  {
    id: 'creator-2',
    name: 'Maya Chen',
    handle: '@mayastylecraft',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bio: 'Sustainable fashion curator and organic skincare advocate blending everyday elegance with honest reviews.',
    primaryNiche: 'Fashion & Beauty',
    niches: ['Fashion & Beauty', 'Home Décor & Lifestyle'],
    platforms: ['Instagram', 'YouTube'],
    location: 'Mumbai, India',
    audienceSize: '320K',
    totalFollowers: 320000,
    engagementRate: 6.2,
    pricingRange: '$600 - $1,400',
    minBudget: 600,
    maxBudget: 1400,
    rating: 5.0,
    reviewCount: 54,
    verified: true,
    available: true,
    portfolio: [
      {
        id: 'p3',
        title: 'Monochrome Capsule Wardrobe Essentials',
        platform: 'Instagram',
        url: 'https://instagram.com',
        viewsOrReach: '120K Plays',
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'p4',
        title: 'Clean Beauty Morning Routine for Radiant Skin',
        platform: 'YouTube',
        url: 'https://youtube.com',
        viewsOrReach: '88K Views',
        thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'India (58%), UK (18%)',
      ageRange: '18-32 years (84%)',
      genderRatio: '82% Female / 18% Male'
    }
  },
  {
    id: 'creator-3',
    name: 'Chef Rohan Kapoor',
    handle: '@rohanskitchencraft',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Culinary innovator sharing quick artisanal recipes, cloud kitchen reviews, and gourmet pantry discoveries.',
    primaryNiche: 'Food & Culinary',
    niches: ['Food & Culinary', 'Fitness & Health'],
    platforms: ['Instagram', 'Facebook', 'YouTube'],
    location: 'New Delhi, India',
    audienceSize: '240K',
    totalFollowers: 240000,
    engagementRate: 4.9,
    pricingRange: '$350 - $800',
    minBudget: 350,
    maxBudget: 800,
    rating: 4.8,
    reviewCount: 29,
    verified: true,
    available: true,
    portfolio: [
      {
        id: 'p5',
        title: '15-Minute Gourmet Truffle Pasta Challenge',
        platform: 'Instagram',
        url: 'https://instagram.com',
        viewsOrReach: '85K Plays',
        thumbnail: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'India (75%), UAE (12%)',
      ageRange: '24-45 years (72%)',
      genderRatio: '55% Female / 45% Male'
    }
  },
  {
    id: 'creator-4',
    name: 'Sarah Jenkins',
    handle: '@sarahfitnesscore',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Certified strength trainer & nutritionist empowering busy professionals with science-backed workouts.',
    primaryNiche: 'Fitness & Health',
    niches: ['Fitness & Health', 'Food & Culinary'],
    platforms: ['Instagram', 'YouTube'],
    location: 'London, UK',
    audienceSize: '95K',
    totalFollowers: 95000,
    engagementRate: 7.1,
    pricingRange: '$300 - $700',
    minBudget: 300,
    maxBudget: 700,
    rating: 4.9,
    reviewCount: 22,
    verified: true,
    available: false,
    portfolio: [
      {
        id: 'p6',
        title: 'Full Body Mobility & Core in 20 Minutes',
        platform: 'YouTube',
        url: 'https://youtube.com',
        viewsOrReach: '45K Views',
        thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'UK (60%), USA (25%)',
      ageRange: '20-40 years (80%)',
      genderRatio: '65% Female / 35% Male'
    }
  },
  {
    id: 'creator-5',
    name: 'Leo Santos',
    handle: '@leorover',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Cinematographer and adventure storyteller documenting off-grid stays, eco-resorts, and gear tests.',
    primaryNiche: 'Travel & Adventure',
    niches: ['Travel & Adventure', 'Tech & Gadgets'],
    platforms: ['YouTube', 'Instagram'],
    location: 'Goa / Melbourne',
    audienceSize: '150K',
    totalFollowers: 150000,
    engagementRate: 5.8,
    pricingRange: '$500 - $1,200',
    minBudget: 500,
    maxBudget: 1200,
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    available: true,
    portfolio: [
      {
        id: 'p7',
        title: 'Solo Bikepacking Himalayas 4K Documentary',
        platform: 'YouTube',
        url: 'https://youtube.com',
        viewsOrReach: '140K Views',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'India (45%), Australia (30%)',
      ageRange: '22-38 years (82%)',
      genderRatio: '60% Male / 40% Female'
    }
  },
  {
    id: 'creator-6',
    name: 'Ananya Sharma',
    handle: '@ananyaspaces',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Architectural interior designer transforming studio flats with smart storage, biophilic decor, and lighting.',
    primaryNiche: 'Home Décor & Lifestyle',
    niches: ['Home Décor & Lifestyle', 'Fashion & Beauty'],
    platforms: ['Instagram', 'YouTube', 'Facebook'],
    location: 'Bangalore, India',
    audienceSize: '110K',
    totalFollowers: 110000,
    engagementRate: 6.5,
    pricingRange: '$350 - $750',
    minBudget: 350,
    maxBudget: 750,
    rating: 4.8,
    reviewCount: 19,
    verified: false,
    available: true,
    portfolio: [
      {
        id: 'p8',
        title: 'Tiny Apartment Makeover on a $500 Budget',
        platform: 'Instagram',
        url: 'https://instagram.com',
        viewsOrReach: '95K Plays',
        thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'India (80%), Singapore (10%)',
      ageRange: '25-45 years (75%)',
      genderRatio: '75% Female / 25% Male'
    }
  },
  {
    id: 'creator-7',
    name: 'David Vance',
    handle: '@davidvancegrowth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: 'SaaS advisor & fintech writer analyzing startup growth frameworks and B2B software stacks for founders.',
    primaryNiche: 'Business & Finance',
    niches: ['Business & Finance', 'Tech & Gadgets'],
    platforms: ['LinkedIn', 'YouTube'],
    location: 'Austin, Texas',
    audienceSize: '82K',
    totalFollowers: 82000,
    engagementRate: 4.2,
    pricingRange: '$600 - $1,500',
    minBudget: 600,
    maxBudget: 1500,
    rating: 5.0,
    reviewCount: 42,
    verified: true,
    available: true,
    portfolio: [
      {
        id: 'p9',
        title: 'How Modern D2C Brands Automate Retention',
        platform: 'LinkedIn',
        url: 'https://linkedin.com',
        viewsOrReach: '35K Impressions',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
      }
    ],
    demographics: {
      topCountry: 'USA (65%), UK (20%)',
      ageRange: '28-50 years (85%)',
      genderRatio: '68% Male / 32% Female'
    }
  }
];
