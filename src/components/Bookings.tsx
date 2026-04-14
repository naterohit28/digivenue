import React, { useState } from 'react';
import { Search, Calendar, Users, Building2, ClipboardList, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import { rupee, fdate, statusOf } from '../constants';

interface BookingsProps {
  bookings: Booking[];
  onDelete: (id: number) => void;
}

export default function Bookings({ bookings, onDelete }: BookingsProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.client.toLowerCase().includes(search.toLowerCase()) || 
                          b.venue.toLowerCase().includes(search.toLowerCase());
    const status = statusOf(b);
    const matchesFilter = filter === 'all' || status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-2xl font-bold text-navy">Bookings</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:border-navy outline-none shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'confirmed', 'paid', 'pending', 'overdue'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                filter === f ? 'bg-navy text-white border-navy shadow-sm' : 'bg-white text-muted border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredBookings.map(b => {
          const status = statusOf(b);
          return (
            <motion.div 
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-mobile space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface text-navy rounded-xl flex items-center justify-center font-bold text-lg">
                    {b.client[0]}
                  </div>
                  <div>
                    <div className="text-base font-bold text-navy">{b.client}</div>
                    <div className="text-xs text-muted">{b.etype} • {b.venue}</div>
                  </div>
                </div>
                <span className={`badge b-${status}`}>{status}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50">
                <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase text-muted tracking-widest flex items-center gap-1">
                    <Calendar size={10} /> Date
                  </div>
                  <div className="text-xs font-mono font-bold text-navy">{fdate(b.date)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-bold uppercase text-muted tracking-widest flex items-center gap-1">
                    <Users size={10} /> Guests
                  </div>
                  <div className="text-xs font-mono font-bold text-navy">{b.guests}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[9px] font-bold uppercase text-muted tracking-widest">Total Amount</div>
                  <div className="text-sm font-bold text-navy">{rupee(b.amount)}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onDelete(b.id)}
                    className="p-2 bg-rose/10 text-rose rounded-lg hover:bg-rose/20 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-lg active:scale-95 transition-all">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <div className="py-20 text-center space-y-4 opacity-40">
          <ClipboardList size={64} className="mx-auto text-muted" />
          <p className="text-lg font-medium">No bookings found</p>
        </div>
      )}
    </div>
  );
}
