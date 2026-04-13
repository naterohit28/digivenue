import React from 'react';
import { SocialLead } from '../../types';
import { Instagram, Facebook, MessageCircle, MoreVertical, Reply, CheckCircle, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SocialMediaLeadsProps {
  leads: SocialLead[];
}

export default function SocialMediaLeads({ leads }: SocialMediaLeadsProps) {
  const platformIcon: Record<string, LucideIcon> = {
    Instagram: Instagram,
    Facebook: Facebook,
    WhatsApp: MessageCircle,
    Direct: CheckCircle,
  };


  const platformColor: Record<string, string> = {
    Instagram: 'text-rose bg-rose-pale border-rose/20',
    Facebook: 'text-sky bg-sky-pale border-sky/20',
    WhatsApp: 'text-jade bg-jade-pale border-jade/20',
    Direct: 'text-navy bg-bg border-border',
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-navy">Social Media Leads</h2>
          <p className="text-sm text-muted mt-1">All your social inquiries in one unified inbox</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold hover:bg-bg transition-colors">
            Filter Source
          </button>
          <button className="px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold shadow-lg shadow-navy/20 hover:bg-navy-mid transition-colors">
            Connect Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.map((lead) => {
          const Icon = platformIcon[lead.platform] || MessageCircle;
          return (
            <div key={lead.id} className="bg-white p-6 rounded-3xl border border-border card-shadow group hover:border-gold/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2.5 rounded-xl border", platformColor[lead.platform])}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">{lead.name}</h4>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{lead.platform}</p>
                  </div>
                </div>
                <span className="text-[10px] text-muted font-mono">{lead.time}</span>
              </div>
              
              <div className="bg-bg p-4 rounded-2xl mb-6">
                <p className="text-sm text-navy/80 italic leading-relaxed">"{lead.message}"</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy text-white rounded-xl text-xs font-bold hover:bg-navy-mid transition-all active:scale-95">
                  <Reply size={14} />
                  Reply
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-border text-navy rounded-xl text-xs font-bold hover:border-gold transition-all active:scale-95">
                  Convert
                </button>
                <button className="p-3 bg-bg text-muted rounded-xl hover:text-navy transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gold-pale p-8 rounded-[40px] border border-gold/20 text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <span className="text-2xl">💡</span>
        </div>
        <h3 className="text-xl font-bold text-navy mb-2 font-serif">Unified Social Inbox</h3>
        <p className="text-sm text-navy/60 max-w-md mx-auto leading-relaxed mb-6">
          Connect your Instagram and Facebook pages to automatically sync leads directly into DigiVenue SmartOS.
        </p>
        <button className="px-6 py-3 bg-navy text-white rounded-2xl text-sm font-bold shadow-xl shadow-navy/20 hover:scale-105 transition-transform">
          Connect My Pages
        </button>
      </div>
    </div>
  );
}
