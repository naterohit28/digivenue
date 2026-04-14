import React, { useState } from 'react';
import { Target, Phone, IndianRupee, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Lead } from '../types';
import { rupee } from '../constants';

interface LeadsProps {
  leads: Lead[];
  onConvert: (id: number) => void;
  onUpdateStatus: (id: number, status: Lead['status']) => void;
}

export default function Leads({ leads, onConvert, onUpdateStatus }: LeadsProps) {
  const [activeTab, setActiveTab] = useState('new');

  const filteredLeads = leads.filter(l => {
    if (activeTab === 'new') return l.status === 'new';
    if (activeTab === 'follow-up') return l.status === 'follow-up';
    if (activeTab === 'converted') return l.status === 'converted';
    return l.status === 'lost';
  });

  const tabs = [
    { id: 'new', label: 'New', count: leads.filter(l => l.status === 'new').length },
    { id: 'follow-up', label: 'Follow', count: leads.filter(l => l.status === 'follow-up').length },
    { id: 'converted', label: 'Done', count: leads.filter(l => l.status === 'converted').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-2xl font-bold text-navy">Leads</h1>
        
        <div className="flex p-1 bg-white border border-border rounded-xl shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id ? 'bg-navy text-white shadow-md' : 'text-muted'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface text-muted'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredLeads.map(l => (
          <motion.div 
            key={l.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-mobile space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface text-navy rounded-xl flex items-center justify-center font-bold">
                  {l.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">{l.name}</div>
                  <div className="text-[10px] text-muted">{l.etype}</div>
                </div>
              </div>
              <button className="p-2 text-jade hover:bg-jade/10 rounded-full transition-colors">
                <Phone size={20} />
              </button>
            </div>

            <div className="p-3 bg-surface rounded-xl text-xs text-muted leading-relaxed italic">
              "{l.notes || l.source}"
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1">
                  <IndianRupee size={10} /> {rupee(l.budget).split('.')[0]}
                </div>
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1">
                  <Users size={10} /> {l.guests}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateStatus(l.id, 'lost')}
                  className="px-4 py-2 border border-border text-navy text-[10px] font-bold rounded-lg active:scale-95 transition-all"
                >
                  Archive
                </button>
                <button 
                  onClick={() => {
                    if (l.status === 'new') onUpdateStatus(l.id, 'follow-up');
                    else onConvert(l.id);
                  }}
                  className="px-4 py-2 bg-navy text-white text-[10px] font-bold rounded-lg active:scale-95 transition-all"
                >
                  {l.status === 'new' ? 'Follow Up' : 'Book'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="py-20 text-center space-y-4 opacity-40">
          <Target size={64} className="mx-auto text-muted" />
          <p className="text-lg font-medium">No leads in this stage</p>
        </div>
      )}
    </div>
  );
}
