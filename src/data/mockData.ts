import { Inquiry, SocialLead, Activity, Campaign, CampaignTemplate, Opportunity, Lead, Booking } from '../types';

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

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'Summer Wedding Special',
    eventType: 'Wedding',
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    status: 'Active',
    metrics: { views: 1250, inquiries: 45, bookings: 4, revenue: 3500000 },
    image: 'https://picsum.photos/seed/wedding/800/600'
  },
  {
    id: 'c2',
    title: 'Corporate Early Bird',
    eventType: 'Corporate',
    startDate: '2026-08-01',
    endDate: '2026-09-15',
    status: 'Draft',
    metrics: { views: 0, inquiries: 0, bookings: 0, revenue: 0 },
    image: 'https://picsum.photos/seed/corporate/800/600'
  }
];

export const MOCK_TEMPLATES: CampaignTemplate[] = [
  {
    id: 't1',
    name: 'Grand Wedding Offer',
    eventType: 'Wedding',
    caption: 'Make your dream wedding a reality at Ashraya Grand! Special discounts for upcoming dates.',
    offer: 'Flat 15% OFF on venue booking + complimentary floral decor.',
    hashtags: ['#WeddingVenue', '#IndianWedding', '#DreamWedding', '#AshrayaGrand']
  },
  {
    id: 't2',
    name: 'Corporate Excellence',
    eventType: 'Corporate',
    caption: 'Host your next corporate event with world-class amenities and seamless service.',
    offer: 'Complimentary AV setup and high-speed Wi-Fi for all bookings.',
    hashtags: ['#CorporateEvents', '#BusinessMeeting', '#ConferenceVenue']
  }
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  { id: 'o1', date: '2026-11-21', reason: 'Unbooked Saturday', potentialRevenue: 800000, isWeekend: true },
  { id: 'o2', date: '2026-11-28', reason: 'Unbooked Saturday', potentialRevenue: 800000, isWeekend: true },
  { id: 'o3', date: '2026-12-05', reason: 'High Demand Muhurat', potentialRevenue: 1200000, isWeekend: true },
];

export const MOCK_LEADS: Lead[] = [
  { id: 1, name: 'Emma Wilson', etype: 'Wedding', date: '2026-11-18', guests: 300, budget: 1500000, venue: 'Grand Hall', phone: '+91 98100 11111', source: 'Website', status: 'new', notes: 'Very interested, follow up by EOW' },
  { id: 2, name: 'Rajan Mehta', etype: 'Corporate', date: '2026-11-22', guests: 80, budget: 280000, venue: 'Banquet Hall A', phone: '+91 98200 22222', source: 'Referral', status: 'follow-up', notes: 'Needs AV quote' },
  { id: 3, name: 'Priya Shah', etype: 'Birthday', date: '2026-11-27', guests: 60, budget: 120000, venue: 'Rooftop Lounge', phone: '+91 98300 33333', source: 'Instagram', status: 'new', notes: 'Rooftop mandatory' },
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 1, client: 'Sharma Wedding', etype: 'Wedding', venue: 'Grand Hall', date: '2026-11-08', amount: 950000, advance: 400000, guests: 450, notes: 'Stage required, floral arch' },
  { id: 2, client: 'Mehra Reception', etype: 'Reception', venue: 'Garden Lawn', date: '2026-11-12', amount: 420000, advance: 420000, guests: 280, notes: 'Outdoor seating preferred' },
  { id: 3, client: 'TechConf 2026', etype: 'Corporate', venue: 'Banquet Hall A', date: '2026-11-15', amount: 195000, advance: 100000, guests: 120, notes: 'AV setup needed' },
];
