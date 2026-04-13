import { Inquiry, SocialLead, Activity } from '../types';

export const MOCK_INQUIRIES: Inquiry[] = [
  { id: 1, name: 'Rohit Sharma', etype: 'Wedding', date: '2026-11-15', budget: 500000, status: 'new', contact: '+91 98765 43210', message: 'Interested in wedding booking', guests: 400, received: '2h ago' },
  { id: 2, name: 'Priya Patel', etype: 'Engagement', date: '2026-09-20', budget: 250000, status: 'contacted', contact: '+91 98765 43211', message: 'Need quote for engagement', guests: 200, received: '5h ago' },
  { id: 3, name: 'Amit Kumar', etype: 'Corporate', date: '2026-10-05', budget: 150000, status: 'new', contact: '+91 98765 43212', message: 'Corporate event inquiry', guests: 150, received: '1d ago' },
  { id: 4, name: 'Sneha Reddy', etype: 'Haldi', date: '2026-12-01', budget: 100000, status: 'converted', contact: '+91 98765 43213', message: 'Haldi ceremony', guests: 100, received: '2d ago' },
  { id: 5, name: 'Vikram Singh', etype: 'Reception', date: '2026-11-18', budget: 400000, status: 'new', contact: '+91 98765 43214', message: 'Reception inquiry', guests: 300, received: '3d ago' },
];

export const MOCK_SOCIAL_LEADS: SocialLead[] = [
  { id: 's1', name: 'Anjali Gupta', platform: 'Instagram', message: 'Hi, interested in booking for a wedding in Dec.', time: '10 mins ago', status: 'unread' },
  { id: 's2', name: 'Suresh Raina', platform: 'Facebook', message: 'Need quote for corporate event.', time: '2 hours ago', status: 'replied' },
  { id: 's3', name: 'Meera Bai', platform: 'WhatsApp', message: 'Is Nov 12th available?', time: '5 hours ago', status: 'unread' },
  { id: 's4', name: 'Rahul Dravid', platform: 'Instagram', message: 'Beautiful venue! Can I visit tomorrow?', time: '1 day ago', status: 'converted' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { icon: 'Phone', type: 'sky', title: 'Called Rohit Sharma', sub: 'Wedding inquiry follow-up', time: '1 hour ago' },
  { icon: 'FileText', type: 'jade', title: 'Sent quote to Priya Patel', sub: 'Engagement package shared', time: '3 hours ago' },
  { icon: 'Clock', type: 'rose', title: 'Follow-up pending', sub: 'Amit Kumar - Corporate event', time: '5 hours ago' },
  { icon: 'MapPin', type: 'gold', title: 'Venue visit scheduled', sub: 'Sneha Reddy visiting tomorrow', time: 'Yesterday' },
];
