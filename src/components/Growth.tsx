import React, { useState } from 'react';
import { 
  Instagram, 
  MapPin, 
  Globe, 
  MessageSquare, 
  Share2, 
  Copy, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { SocialLinks, Booking, Muhurat } from '../types';
import { MUHURAT_DB } from '../constants';

interface GrowthProps {
  links: SocialLinks;
  onUpdate: (links: SocialLinks) => void;
  venueName: string;
  bookings: Booking[];
}

export default function Growth({ links, onUpdate, venueName, bookings }: GrowthProps) {
  const [localLinks, setLocalLinks] = useState(links);

  const handleShare = () => {
    const message = `Hi, sharing our venue details:
${venueName}
Instagram: ${localLinks.instagram || 'Not added'}
Location: ${localLinks.googleBusiness || 'Not added'}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleCopy = () => {
    const message = `Hi, sharing our venue details:
${venueName}
Instagram: ${localLinks.instagram || 'Not added'}
Location: ${localLinks.googleBusiness || 'Not added'}`;
    navigator.clipboard.writeText(message);
    console.log('Copied');
  };

  // Opportunity Insights Logic
  const today = new Date();
  const next30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const emptyDates = next30Days.filter(date => !bookings.some(b => b.date === date)).slice(0, 3);
  const weekendAvailability = next30Days.filter(date => {
    const d = new Date(date);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    return isWeekend && !bookings.some(b => b.date === date);
  }).slice(0, 2);

  const upcomingMuhurats = MUHURAT_DB.filter(m => m.date >= today.toISOString().split('T')[0] && !bookings.some(b => b.date === m.date)).slice(0, 2);
  const emptyUpcoming = next30Days.filter(date => !bookings.some(b => b.date === date)).slice(0, 2);

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Growth Hub</h1>
        <div className="p-2 bg-gold/10 text-gold rounded-lg">
          <TrendingUp size={20} />
        </div>
      </div>

      {/* SECTION A — QUICK SHARE */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={handleShare}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-navy text-white rounded-2xl shadow-md active:scale-95 transition-all"
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Share Venue</span>
        </button>
        <button 
          onClick={handleCopy}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-border text-navy rounded-2xl shadow-sm active:scale-95 transition-all"
        >
          <Copy size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Copy Details</span>
        </button>
      </section>

      {/* SECTION B — ONLINE PRESENCE */}
      <section className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-4">
        <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Online Presence</h2>
        <div className="space-y-3">
          {[
            { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'instagram.com/...' },
            { id: 'googleBusiness', label: 'Google Maps', icon: MapPin, placeholder: 'maps.google.com/...' },
            { id: 'website', label: 'Website', icon: Globe, placeholder: 'www.yourvenue.com' },
            { id: 'whatsappBusiness', label: 'WhatsApp Biz', icon: MessageSquare, placeholder: 'wa.me/...' },
          ].map(item => (
            <div key={item.id} className="relative">
              <item.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                placeholder={item.placeholder}
                className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-xl text-sm focus:border-navy outline-none transition-all"
                value={(localLinks as any)[item.id]}
                onChange={e => {
                  const newLinks = { ...localLinks, [item.id]: e.target.value };
                  setLocalLinks(newLinks);
                  onUpdate(newLinks); // Auto-save
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C — OPPORTUNITY INSIGHT */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Opportunity Insights</h2>
        <div className="grid grid-cols-1 gap-3">
          {upcomingMuhurats.map(m => (
            <div key={m.date} className="bg-gold-pale border border-gold/20 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 text-gold rounded-lg">
                  <Star size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">Muhurat: {new Date(m.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                  <div className="text-[10px] text-gold-d font-medium">Auspicious & Available</div>
                </div>
              </div>
              <button className="p-2 text-gold hover:bg-gold/10 rounded-full">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
          
          {weekendAvailability.map(date => (
            <div key={date} className="bg-sky-pale border border-sky/20 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky/10 text-sky rounded-lg">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">Weekend: {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                  <div className="text-[10px] text-sky font-medium">Perfect for receptions</div>
                </div>
              </div>
              <button className="p-2 text-sky hover:bg-sky/10 rounded-full">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}

          {emptyUpcoming.map(date => (
            <div key={date} className="bg-white border border-border p-4 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface text-muted rounded-lg">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">Empty: {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                  <div className="text-[10px] text-muted font-medium">No bookings yet</div>
                </div>
              </div>
              <button className="p-2 text-muted hover:bg-surface rounded-full">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D — ACTION */}
      <section className="bg-gradient-to-br from-navy to-navy-mid p-6 rounded-3xl text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <Zap size={24} className="text-gold" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Boost Bookings</h3>
            <p className="text-xs text-white/60">Promote your open dates on Instagram</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-white text-navy text-xs font-bold rounded-xl active:scale-95 transition-all">
            Promote Date
          </button>
          <button className="py-3 bg-gold text-navy text-xs font-bold rounded-xl active:scale-95 transition-all">
            Get Inquiries
          </button>
        </div>
      </section>
    </div>
  );
}
