import { Venue, Booking, Lead, Inquiry, Activity, Muhurat, SocialLinks } from './types';

export const VENUES: Venue[] = [
  { id: 'grand-hall', name: 'Grand Hall', cap: 500, emoji: '🏛️', color: '#c8920a', bg: '#1a3f60' },
  { id: 'garden-lawn', name: 'Garden Lawn', cap: 300, emoji: '🌿', color: '#1e7a50', bg: '#1a4a30' },
  { id: 'banquet-a', name: 'Banquet Hall A', cap: 200, emoji: '✨', color: '#1a60a8', bg: '#1a304a' },
  { id: 'banquet-b', name: 'Banquet Hall B', cap: 180, emoji: '🎊', color: '#6030a0', bg: '#2a1a50' },
  { id: 'rooftop', name: 'Rooftop Lounge', cap: 150, emoji: '🌅', color: '#b83030', bg: '#4a1a1a' },
];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTH_S = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DAY_H = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const rupee = (n: number) => '₹' + Number(n).toLocaleString('en-IN');
export const fdate = (s: string) => {
  if (!s) return '—';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const statusOf = (b: Booking) => {
  if (b.advance >= b.amount) return 'paid';
  const today = new Date().toISOString().split('T')[0];
  if (b.date < today && b.advance < b.amount) return 'overdue';
  return 'confirmed';
};

export const MUHURAT_DB: Muhurat[] = [
  { date: '2026-03-15', type: 'vivah', nakshatra: 'Rohini', tithi: 'Panchami', timing: '08:00–13:00', yoga: 'Amrit', reason: 'Post-Holi Shukla Panchami — Rohini vivah', tags: ['Vivah', 'Sagai'], panchang: ['marathi', 'gujarati', 'north', 'drik'] },
  { date: '2026-03-18', type: 'vivah', nakshatra: 'Punarvasu', tithi: 'Ashtami', timing: '07:30–12:30', yoga: 'Siddha', reason: 'Chaitra Shukla Ashtami + Punarvasu', tags: ['Vivah'], panchang: ['marathi', 'drik', 'north'] },
  { date: '2026-03-22', type: 'vivah', nakshatra: 'Uttara Phalguni', tithi: 'Dwadashi', timing: '07:00–12:00', yoga: 'Shubha', reason: 'Chaitra Shukla Dwadashi', tags: ['Vivah', 'Reception'], panchang: ['north', 'drik', 'marathi'] },
  { date: '2026-04-07', type: 'vivah', nakshatra: 'Rohini', tithi: 'Navami', timing: '07:00–12:00', yoga: 'Siddha', reason: 'Vaishakh begins — wedding season in full swing', tags: ['Vivah'], panchang: ['marathi', 'drik', 'north'] },
  { date: '2026-04-22', type: 'shubh', nakshatra: 'Rohini', tithi: 'Navami', timing: '06:30–12:30', yoga: 'Siddha', reason: 'Akshaya Tritiya — all-day auspicious, no muhurat needed', tags: ['Vivah', 'Griha Pravesh', 'Sagai'], panchang: ['marathi', 'gujarati', 'north', 'drik'] },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 1, client: 'Sharma Wedding', etype: 'Wedding', venue: 'grand-hall', date: '2026-04-08', amount: 950000, advance: 400000, guests: 450, notes: 'Stage required, floral arch' },
  { id: 2, client: 'Mehra Reception', etype: 'Reception', venue: 'garden-lawn', date: '2026-04-12', amount: 420000, advance: 420000, guests: 280, notes: 'Outdoor seating preferred' },
];

export const INITIAL_LEADS: Lead[] = [
  { id: 1, name: 'Emma Wilson', etype: 'Wedding', date: '2026-04-18', guests: 300, budget: 1500000, venue: 'grand-hall', phone: '+91 98100 11111', source: 'Website', status: 'new', notes: 'Very interested, follow up by EOW' },
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, name: 'Anita Sharma', contact: 'anita@email.com', etype: 'Wedding', date: '2026-04-16', guests: 350, budget: 1200000, message: 'Looking for grand wedding venue', status: 'new', received: '2h ago' },
];

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  instagram: '',
  googleBusiness: '',
  website: '',
  whatsappBusiness: '',
};
