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
