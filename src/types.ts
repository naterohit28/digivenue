export interface Venue {
  id: string;
  name: string;
  cap: number;
  emoji: string;
  color: string;
  bg: string;
}

export interface Booking {
  id: number;
  client: string;
  etype: string;
  venue: string;
  date: string;
  amount: number;
  advance: number;
  guests: number;
  notes: string;
}

export interface Lead {
  id: number;
  name: string;
  etype: string;
  date: string;
  guests: number;
  budget: number;
  venue: string;
  phone: string;
  source: string;
  status: 'new' | 'follow-up' | 'converted' | 'lost';
  notes: string;
}

export interface Inquiry {
  id: number;
  name: string;
  contact: string;
  etype: string;
  date: string;
  guests: number;
  budget: number;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  received: string;
}

export interface Activity {
  icon: string;
  type: 'gold' | 'jade' | 'sky' | 'rose';
  title: string;
  sub: string;
  time: string;
}

export type Platform = 'Instagram' | 'Facebook' | 'WhatsApp' | 'Direct';

export interface SocialLead {
  id: string;
  name: string;
  platform: Platform;
  message: string;
  time: string;
  status: 'unread' | 'replied' | 'converted';
}

export interface SocialLinks {
  instagram: string;
  googleBusiness: string;
  website: string;
  whatsappBusiness: string;
}

export interface OnboardingState {
  step: number;
  isComplete: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  eventType: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Draft' | 'Completed';
  metrics: {
    views: number;
    inquiries: number;
    bookings: number;
    revenue: number;
  };
  image: string;
}

export interface CampaignTemplate {
  id: string;
  name: string;
  eventType: string;
  caption: string;
  offer: string;
  hashtags: string[];
}

export interface Opportunity {
  id: string;
  date: string;
  reason: string;
  potentialRevenue: number;
  isWeekend: boolean;
}

export interface Muhurat {
  date: string;
  type: 'vivah' | 'shubh' | 'avoid';
  nakshatra: string;
  tithi: string;
  yoga: string;
  timing: string;
  reason: string;
  tags: string[];
  panchang?: string[];
}
