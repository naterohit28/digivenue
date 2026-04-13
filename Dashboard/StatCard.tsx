import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  color: 'gold' | 'jade' | 'rose' | 'sky';
  delay?: number;
}

export default function StatCard({ label, value, subValue, icon: Icon, color, delay = 0 }: StatCardProps) {
  const colorMap = {
    gold: 'bg-gold-pale text-gold border-gold/20',
    jade: 'bg-jade-pale text-jade border-jade/20',
    rose: 'bg-rose-pale text-rose border-rose/20',
    sky: 'bg-sky-pale text-sky border-sky/20',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-5 rounded-3xl border border-border card-shadow flex flex-col justify-between group hover:border-gold/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-2xl border", colorMap[color])}>
          <Icon size={24} />
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{label}</p>
          <p className="text-2xl font-serif font-bold text-navy mt-1">{value}</p>
        </div>
      </div>
      {subValue && (
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-[10px] text-muted font-medium">{subValue}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-jade animate-pulse"></div>
        </div>
      )}
    </motion.div>
  );
}
