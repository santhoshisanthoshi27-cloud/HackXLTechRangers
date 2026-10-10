import { PromotionPlatform } from '../types';

export interface PlatformConfig {
  id: PromotionPlatform;
  name: string;
  tagline: string;
  businessDescription: string;
  creatorDescription: string;
  iconName: string;
  badgeColor: string;
  gradientBg: string;
}

export const PLATFORMS_DATA: PlatformConfig[] = [
  {
    id: 'Instagram',
    name: 'Instagram',
    tagline: 'Visual stories, Reels & lifestyle promotions',
    businessDescription: 'Promote products via Reels, visual carousels, and engaging Stories to tap into active shoppers.',
    creatorDescription: 'Create engaging Reels, feed aesthetics, and Stories showcasing products to an active audience.',
    iconName: 'Instagram',
    badgeColor: 'text-pink-600 bg-pink-50 border-pink-200',
    gradientBg: 'from-pink-500 via-purple-500 to-indigo-500'
  },
  {
    id: 'YouTube',
    name: 'YouTube',
    tagline: 'Long-form reviews, shorts & deep tutorials',
    businessDescription: 'Deep-dive product walkthroughs, dedicated video integrations, and YouTube Shorts for high trust.',
    creatorDescription: 'Produce detailed dedicated reviews, sponsorships, and viral Shorts with long-tail search reach.',
    iconName: 'Youtube',
    badgeColor: 'text-red-600 bg-red-50 border-red-200',
    gradientBg: 'from-red-600 to-orange-500'
  },
  {
    id: 'Facebook',
    name: 'Facebook',
    tagline: 'Community groups, reels & diverse demographics',
    businessDescription: 'Engage wide demographics, targeted regional communities, and viral video discussions.',
    creatorDescription: 'Publish engaging video clips, community discussions, and group recommendations.',
    iconName: 'Facebook',
    badgeColor: 'text-blue-600 bg-blue-50 border-blue-200',
    gradientBg: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'LinkedIn',
    name: 'LinkedIn',
    tagline: 'B2B thought leadership & professional services',
    businessDescription: 'Reach decision-makers, SaaS prospects, and founders with authoritative industry endorsements.',
    creatorDescription: 'Craft thought leadership posts, case studies, and career/tech insights for professionals.',
    iconName: 'Linkedin',
    badgeColor: 'text-blue-800 bg-blue-50 border-blue-300',
    gradientBg: 'from-blue-700 to-indigo-800'
  }
];
