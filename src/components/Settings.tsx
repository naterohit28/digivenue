import React, { useState } from 'react';
import { Settings as SettingsIcon, Building2, Bell, Shield, CreditCard, Globe, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './UI/Toast';

export default function Settings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState({ whatsapp: true, summary: true });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`${key === 'whatsapp' ? 'WhatsApp Alerts' : 'Daily Summary'} ${!prefs[key] ? 'enabled' : 'disabled'}`, 'info');
  };

  const sections = [
    { id: 'profile', label: 'Venue Profile', icon: Building2, desc: 'Manage your venue details, capacity, and branding.' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Configure WhatsApp, email, and push alerts.' },
    { id: 'security', label: 'Security', icon: Shield, desc: 'Manage passwords and team access permissions.' },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard, desc: 'View invoices and manage your subscription.' },
    { id: 'integrations', label: 'Integrations', icon: Globe, desc: 'Connect Instagram, Facebook, and WhatsApp.' },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="font-serif text-3xl font-bold text-navy">Settings</h1>
        <p className="text-muted text-sm tracking-wide">Configure your SmartOS experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => showToast(`Opening ${section.label}...`, 'info')}
              className="w-full flex items-start gap-4 p-6 bg-white border border-border rounded-[32px] text-left hover:border-gold/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-bg rounded-2xl flex items-center justify-center text-navy group-hover:bg-gold-pale group-hover:text-gold transition-colors shrink-0">
                <section.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-navy mb-1">{section.label}</h3>
                <p className="text-xs text-muted leading-relaxed">{section.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-navy p-8 rounded-[40px] text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-gold text-navy text-[10px] font-bold rounded-md uppercase tracking-widest">Pro Plan</span>
                <span className="text-xs text-white/60">Renews in 12 days</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 font-serif">Ashraya Grand</h3>
              <p className="text-white/70 text-sm mb-6">You are currently using the Pro Plan with unlimited bookings and advanced growth tools.</p>
              <button 
                onClick={() => showToast('Redirecting to billing...', 'info')}
                className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-sm font-bold hover:bg-white/20 transition-all"
              >
                Manage Subscription
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-border card-shadow">
            <h3 className="text-lg font-bold text-navy mb-6">Quick Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-bg rounded-2xl">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-muted" />
                  <span className="text-sm font-bold text-navy">WhatsApp Alerts</span>
                </div>
                <button 
                  onClick={() => togglePref('whatsapp')}
                  className={cn(
                    "w-10 h-6 rounded-full relative transition-colors",
                    prefs.whatsapp ? "bg-jade" : "bg-muted"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    prefs.whatsapp ? "right-1" : "left-1"
                  )}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-bg rounded-2xl">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-muted" />
                  <span className="text-sm font-bold text-navy">Daily Summary</span>
                </div>
                <button 
                  onClick={() => togglePref('summary')}
                  className={cn(
                    "w-10 h-6 rounded-full relative transition-colors",
                    prefs.summary ? "bg-jade" : "bg-muted"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    prefs.summary ? "right-1" : "left-1"
                  )}></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
