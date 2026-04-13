import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Plus, Calendar as CalendarIcon, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, Inquiry } from '../types';
import { MONTHS, DAY_H, MUHURAT_DB, fdate } from '../constants';

interface CalendarProps {
  bookings: Booking[];
  inquiries: Inquiry[];
}

export default function Calendar({ bookings, inquiries }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showMuhurat, setShowMuhurat] = useState(false);
  const [showInquiries, setShowInquiries] = useState(false);
  const [showHotDates, setShowHotDates] = useState(false);

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const days = [];
  const totalDays = daysInMonth(currentMonth);
  const startDay = firstDayOfMonth(currentMonth);

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const getDayData = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayBookings = bookings.filter(b => b.date === dateStr);
    const dayInquiries = inquiries.filter(i => i.date === dateStr);
    const muhurat = MUHURAT_DB.find(m => m.date === dateStr);
    
    const isHot = (dayBookings.length > 0 && dayInquiries.length > 2) || 
                  (muhurat?.type === 'vivah' && dayInquiries.length > 1);

    return { dateStr, dayBookings, dayInquiries, muhurat, isHot };
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Calendar</h1>
        <div className="flex items-center gap-2 bg-white border border-border rounded-xl p-1 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-surface rounded-lg"><ChevronLeft size={20} /></button>
          <span className="text-xs font-bold px-2 min-w-[100px] text-center">{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-surface rounded-lg"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Toggles - Part 3 */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'muhurat', label: 'Muhurat', active: showMuhurat, set: setShowMuhurat, color: 'gold' },
          { id: 'inquiries', label: 'Inquiries', active: showInquiries, set: setShowInquiries, color: 'sky' },
          { id: 'hot', label: 'Hot Dates', active: showHotDates, set: setShowHotDates, color: 'rose' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => t.set(!t.active)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
              t.active ? `bg-${t.color} text-white border-${t.color} shadow-sm` : 'bg-white text-muted border-border'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 border-b border-border bg-surface">
          {DAY_H.map(d => (
            <div key={d} className="py-3 text-center text-[10px] font-bold text-faint uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} className="aspect-square border-b border-r border-border bg-bg/30" />;
            
            const { dateStr, dayBookings, dayInquiries, muhurat, isHot } = getDayData(day);
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={`aspect-square border-b border-r border-border p-1 relative flex flex-col items-center justify-center transition-all ${
                  isSelected ? 'bg-navy/5' : 'hover:bg-surface'
                }`}
              >
                <span className={`text-xs font-bold ${dayBookings.length > 0 ? 'text-navy' : 'text-muted'}`}>
                  {day}
                </span>
                
                <div className="flex gap-0.5 mt-1">
                  {dayBookings.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-navy" />}
                  {showInquiries && dayInquiries.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-sky" />}
                  {showMuhurat && muhurat && <div className={`w-1.5 h-1.5 rounded-full ${muhurat.type === 'vivah' ? 'bg-gold' : 'bg-faint'}`} />}
                  {showHotDates && isHot && <div className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />}
                </div>

                {isSelected && (
                  <motion.div layoutId="active-day" className="absolute inset-0 border-2 border-navy rounded-sm pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selection Details */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-6 rounded-3xl border border-border shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-navy">{fdate(selectedDate)}</h3>
              <button onClick={() => setSelectedDate(null)} className="text-xs font-bold text-muted">Close</button>
            </div>
            
            <div className="space-y-3">
              {getDayData(parseInt(selectedDate.split('-')[2])).dayBookings.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-navy/10 text-navy rounded-lg"><CalendarIcon size={16} /></div>
                    <div>
                      <div className="text-sm font-bold text-navy">{b.client}</div>
                      <div className="text-[10px] text-muted">{b.etype} • {b.guests} Guests</div>
                    </div>
                  </div>
                  <span className="badge b-confirmed">Booked</span>
                </div>
              ))}
              {showInquiries && getDayData(parseInt(selectedDate.split('-')[2])).dayInquiries.map(i => (
                <div key={i.id} className="flex items-center justify-between p-3 bg-sky-pale rounded-xl border border-sky/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky/10 text-sky rounded-lg"><Star size={16} /></div>
                    <div>
                      <div className="text-sm font-bold text-navy">{i.name}</div>
                      <div className="text-[10px] text-muted">Inquiry • {i.guests} Guests</div>
                    </div>
                  </div>
                  <span className="badge b-new">Inquiry</span>
                </div>
              ))}
              {showMuhurat && getDayData(parseInt(selectedDate.split('-')[2])).muhurat && (
                <div className="p-3 bg-gold-pale rounded-xl border border-gold/10 flex items-center gap-3">
                  <Star className="text-gold" size={16} />
                  <div>
                    <div className="text-xs font-bold text-navy capitalize">{getDayData(parseInt(selectedDate.split('-')[2])).muhurat?.type} Muhurat</div>
                    <div className="text-[10px] text-gold-d font-medium">Auspicious for events</div>
                  </div>
                </div>
              )}
              {showHotDates && getDayData(parseInt(selectedDate.split('-')[2])).isHot && (
                <div className="p-3 bg-rose-pale rounded-xl border border-rose/10 flex items-center gap-3">
                  <Flame className="text-rose" size={16} />
                  <div>
                    <div className="text-xs font-bold text-navy">High Demand Date</div>
                    <div className="text-[10px] text-rose font-medium">Multiple inquiries received</div>
                  </div>
                </div>
              )}
              {getDayData(parseInt(selectedDate.split('-')[2])).dayBookings.length === 0 && 
               getDayData(parseInt(selectedDate.split('-')[2])).dayInquiries.length === 0 && (
                <p className="text-center py-4 text-xs text-muted italic">No events or inquiries for this date</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
