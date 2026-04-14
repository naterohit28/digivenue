import React from 'react';
import { Plus, Calendar, FileText, Send } from 'lucide-react';

interface QuickActionsProps {
  onAddInquiry: () => void;
}

export default function QuickActions({ onAddInquiry }: QuickActionsProps) {
  const actions = [
    { label: 'New Inquiry', icon: Plus, onClick: onAddInquiry, primary: true },
    { label: 'Schedule Visit', icon: Calendar, onClick: () => {} },
    { label: 'Send Quote', icon: Send, onClick: () => {} },
    { label: 'Generate Report', icon: FileText, onClick: () => {} },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-border card-shadow">
      <h3 className="text-lg font-bold text-navy mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 ${
              action.primary 
                ? "bg-navy text-white border-navy shadow-lg shadow-navy/20" 
                : "bg-bg text-navy border-border hover:border-gold"
            }`}
          >
            <action.icon size={20} className={action.primary ? "text-gold" : "text-muted"} />
            <span className="text-[11px] font-bold mt-2 uppercase tracking-wider">{action.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gold-pale rounded-2xl border border-gold/20">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎉</span>
          <p className="text-xs font-bold text-navy">Pro Tip</p>
        </div>
        <p className="text-[10px] text-navy/70 leading-relaxed">
          Respond to inquiries within 15 minutes to increase your booking chances by 3x!
        </p>
      </div>
    </div>
  );
}
