import React from 'react';
import { Activity } from '../../types';
import { Phone, FileText, Clock, MapPin, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const iconMap: Record<string, LucideIcon> = {
    Phone: Phone,
    FileText: FileText,
    Clock: Clock,
    MapPin: MapPin,
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-border card-shadow">
      <h3 className="text-lg font-bold text-navy mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((activity, idx) => {
          const Icon = iconMap[activity.icon] || Clock;
          return (
            <div key={idx} className="flex gap-4 relative">
              {idx !== activities.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-border"></div>
              )}
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10",
                activity.type === 'sky' && "bg-sky-pale text-sky",
                activity.type === 'jade' && "bg-jade-pale text-jade",
                activity.type === 'rose' && "bg-rose-pale text-rose",
                activity.type === 'gold' && "bg-gold-pale text-gold",
              )}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-navy truncate">{activity.title}</p>
                <p className="text-xs text-muted mt-0.5">{activity.sub}</p>
                <p className="text-[10px] text-faint uppercase tracking-widest mt-1 font-bold">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-8 py-3 text-xs font-bold text-navy bg-bg rounded-xl hover:bg-border transition-colors">
        View Full History
      </button>
    </div>
  );
}
