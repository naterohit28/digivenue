import React, { useState } from 'react';
import { Bell, MessageSquare, Mail, Smartphone, Save, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Notifications() {
  const [settings, setSettings] = useState({
    whatsapp: true,
    push: true,
    email: false,
    newBooking: true,
    payment: true,
    lead: true,
    overdue: true,
    tomorrow: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-10 h-6 rounded-full transition-colors relative ${active ? 'bg-jade' : 'bg-border-l'}`}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'left-5' : 'left-1'} shadow-sm`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Notifications & Reports</h1>
          <p className="text-muted text-sm tracking-wide">Configure daily summaries, WhatsApp alerts & report delivery</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy text-sm font-bold rounded-xl hover:bg-gold-l transition-all shadow-sm">
          <Save size={18} />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
            <Smartphone size={18} className="text-navy" />
            <h2 className="font-serif text-lg font-bold text-navy">Delivery Channels</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-navy/20 transition-all cursor-pointer" onClick={() => toggleSetting('whatsapp')}>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-jade/10 text-jade">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">WhatsApp</div>
                  <div className="text-xs text-muted">Send daily summary to your WhatsApp</div>
                </div>
              </div>
              <Toggle active={settings.whatsapp} onClick={() => {}} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-navy/20 transition-all cursor-pointer" onClick={() => toggleSetting('push')}>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-sky/10 text-sky">
                  <Bell size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">Push Notification</div>
                  <div className="text-xs text-muted">Browser / app push alerts</div>
                </div>
              </div>
              <Toggle active={settings.push} onClick={() => {}} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-navy/20 transition-all cursor-pointer" onClick={() => toggleSetting('email')}>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-violet/10 text-violet">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">Email</div>
                  <div className="text-xs text-muted">Detailed report to your inbox</div>
                </div>
              </div>
              <Toggle active={settings.email} onClick={() => {}} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
            <Bell size={18} className="text-navy" />
            <h2 className="font-serif text-lg font-bold text-navy">Instant Alerts</h2>
          </div>
          <div className="p-6">
            <div className="text-[10px] font-bold uppercase text-muted tracking-widest mb-4">Alert me when...</div>
            <div className="space-y-4">
              {[
                { id: 'newBooking', label: 'New Booking', desc: 'Immediately on confirmation', icon: '📝' },
                { id: 'payment', label: 'Payment Received', desc: 'When advance or balance is logged', icon: '💰' },
                { id: 'lead', label: 'New Lead / Inquiry', desc: 'From QR scan or inquiry form', icon: '🎯' },
                { id: 'overdue', label: 'Overdue Balance', desc: 'Event date passed with pending amount', icon: '⚠️' },
                { id: 'tomorrow', label: 'Event Tomorrow Reminder', desc: 'Day-before event checklist alert', icon: '📅' },
              ].map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{alert.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-navy">{alert.label}</div>
                      <div className="text-xs text-muted">{alert.desc}</div>
                    </div>
                  </div>
                  <Toggle active={settings[alert.id as keyof typeof settings]} onClick={() => toggleSetting(alert.id as keyof typeof settings)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
            <ShieldCheck size={18} className="text-navy" />
            <h2 className="font-serif text-lg font-bold text-navy">Venue Profile</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Venue Name</label>
              <input type="text" defaultValue="Ashraya Grand" className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Manager Name</label>
              <input type="text" defaultValue="Rohit" className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">WhatsApp Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm font-mono" />
            </div>
          </div>
        </section>

        <section className="bg-jade-pale rounded-2xl p-6 border border-jade/20 space-y-4">
          <div className="flex items-center gap-2 text-jade font-bold">
            <MessageSquare size={20} />
            Daily Report Preview
          </div>
          <div className="bg-white/50 p-4 rounded-xl font-mono text-xs text-navy leading-relaxed whitespace-pre-wrap">
{`*DigiVenue Daily Report*
📅 Date: Today

━━━━━━━━━━━━━━━
📋 Total Bookings: *7 total*
💰 Collected Today: *₹0*
⏳ Balance Pending: *₹8,35,000*
🎯 New Leads: *2*
━━━━━━━━━━━━━━━

Sent by DigiVenue ✅`}
          </div>
          <p className="text-[10px] text-jade/70 font-medium">This report is sent automatically at 9:00 PM every day to your WhatsApp.</p>
        </section>
      </div>
    </div>
  );
}
