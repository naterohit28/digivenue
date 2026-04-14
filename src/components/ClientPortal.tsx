import React, { useState } from 'react';
import { Link as LinkIcon, Copy, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import { fdate } from '../constants';

interface ClientPortalProps {
  bookings: Booking[];
}

export default function ClientPortal({ bookings }: ClientPortalProps) {
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const booking = bookings.find(b => b.id.toString() === selectedBooking);
  const portalUrl = booking ? `digivenue.app/ashraya/portal/${booking.id}-${booking.client.toLowerCase().replace(/\s/g, '-')}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${portalUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Client Portal</h1>
          <p className="text-muted text-sm tracking-wide">Share booking links with clients — OTP-verified WhatsApp login</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
            <LinkIcon size={18} className="text-navy" />
            <h2 className="font-serif text-lg font-bold text-navy">Generate Client Link</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Select Booking</label>
              <select 
                value={selectedBooking}
                onChange={(e) => setSelectedBooking(e.target.value)}
                className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm"
              >
                <option value="">— Select a booking —</option>
                {bookings.map(b => (
                  <option key={b.id} value={b.id}>{b.client} · {fdate(b.date)}</option>
                ))}
              </select>
            </div>

            {booking && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-surface border border-border space-y-2">
                  <div className="text-[10px] font-bold uppercase text-muted tracking-widest">Client Portal Link</div>
                  <div className="font-mono text-xs text-navy-lit break-all">{portalUrl}</div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-bold hover:bg-surface transition-all"
                  >
                    {copied ? <ShieldCheck size={18} className="text-jade" /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gold text-navy text-sm font-bold hover:bg-gold-l transition-all shadow-sm">
                    <MessageSquare size={18} />
                    Send via WhatsApp
                  </button>
                </div>

                <div className="bg-gold-pale rounded-xl p-4 border border-gold/20">
                  <div className="text-xs font-bold text-gold uppercase mb-2">What the client sees:</div>
                  <ul className="space-y-1.5">
                    {['Booking summary & event details', 'Payment status & balance due', 'Venue information & directions', 'Contact manager button'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-muted">
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <section className="bg-navy rounded-2xl border border-white/10 overflow-hidden shadow-xl text-white">
          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <div className="font-serif text-2xl font-bold">Ashraya Grand</div>
              <p className="text-white/60 text-xs tracking-widest uppercase font-bold">Client Portal Preview</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                  <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm opacity-50">Rahul Sharma</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">WhatsApp Number</label>
                  <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm opacity-50">+91 98765 43210</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto text-gold">
                  <MessageSquare size={24} />
                </div>
                <div className="space-y-1">
                  <div className="font-bold">OTP Verification</div>
                  <p className="text-xs text-white/50">Check your WhatsApp for the 4-digit code</p>
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xl font-bold text-gold">
                      -
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-gold text-navy font-bold text-sm">Verify & Login</button>
              </div>
            </div>

            <p className="text-[10px] text-white/30 text-center leading-relaxed">
              Secure access to booking details via WhatsApp OTP verification.<br />Powered by DigiVenue.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
