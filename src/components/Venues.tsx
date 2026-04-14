import React from 'react';
import { Plus, Edit2, Users, Calendar, IndianRupee } from 'lucide-react';
import { motion } from 'motion/react';
import { Venue, Booking } from '../types';
import { VENUES, INITIAL_BOOKINGS, rupee, fdate } from '../constants';

interface VenuesProps {
  venues: Venue[];
  bookings: Booking[];
}

export default function Venues({ venues, bookings }: VenuesProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Venues</h1>
          <p className="text-muted text-sm tracking-wide">Manage your venue portfolio</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white text-sm font-bold rounded-xl hover:bg-navy-mid transition-all shadow-sm">
          <Plus size={18} />
          Add Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {venues.map((v, i) => {
          const vBks = bookings.filter(b => b.venue === v.id);
          const vRev = vBks.reduce((sum, b) => sum + b.amount, 0);
          const nextBk = [...vBks]
            .filter(b => b.date >= new Date().toISOString().split('T')[0])
            .sort((a, b) => a.date.localeCompare(b.date))[0];

          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-32 relative overflow-hidden" style={{ backgroundColor: v.bg }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 text-3xl">{v.emoji}</div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="font-serif text-xl font-bold text-white tracking-wide">{v.name}</h3>
                </div>
                <button className="absolute top-4 left-4 p-2 rounded-lg bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20">
                  <Edit2 size={16} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase text-faint tracking-widest">Capacity</div>
                    <div className="text-sm font-bold text-navy flex items-center gap-1.5">
                      <Users size={14} className="text-faint" />
                      {v.cap}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase text-faint tracking-widest">Bookings</div>
                    <div className="text-sm font-bold text-navy flex items-center gap-1.5">
                      <Calendar size={14} className="text-faint" />
                      {vBks.length}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase text-faint tracking-widest">Revenue</div>
                    <div className="text-sm font-bold text-jade flex items-center gap-1">
                      <IndianRupee size={12} className="text-jade/60" />
                      {rupee(vRev).replace('₹', '')}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-faint">
                    <span>Occupancy</span>
                    <span>{Math.floor(Math.random() * 40) + 10}%</span>
                  </div>
                  <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                    <div className="h-full transition-all" style={{ width: '35%', backgroundColor: v.color }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  {nextBk ? (
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase text-faint tracking-widest">Next Event</div>
                      <div className="text-xs font-medium text-navy">
                        {nextBk.client.split(' ')[0]} · {fdate(nextBk.date)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-faint italic text-center">No upcoming bookings</div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
