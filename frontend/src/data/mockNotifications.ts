import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Creator Application',
    message: 'Alex Rivera applied for "AuraPulse Wireless Headphones Launch" with an $850 proposal.',
    timestamp: '15 mins ago',
    read: false,
    type: 'application',
    link: '/dashboard/business/campaigns'
  },
  {
    id: 'notif-2',
    title: 'Application Shortlisted 🎉',
    message: 'Your application for GreenFork Artisanal Farm-to-Table has been Accepted by the brand!',
    timestamp: '2 hours ago',
    read: false,
    type: 'status',
    link: '/dashboard/creator/applications'
  },
  {
    id: 'notif-3',
    title: 'Deliverable Review Approaching',
    message: 'Submission due in 5 days for "GreenFork Artisanal Farm-to-Table" campaign.',
    timestamp: '1 day ago',
    read: true,
    type: 'system',
    link: '/dashboard/creator/collaborations'
  },
  {
    id: 'notif-4',
    title: 'AI Recommendation Match',
    message: 'NECTO AI identified 3 high-affinity creators for your active campaign.',
    timestamp: '2 days ago',
    read: true,
    type: 'invitation',
    link: '/dashboard/business/ai-match'
  }
];
