import React from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Calendar as CalendarIcon, 
  ArrowRight,
  AlertCircle,
  Phone,
  Plus,
  ClipboardList,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { Booking, Lead, Inquiry } from '../types';
import { rupee, fdate } from '../constants';

interface DashboardProps {
  bookings: Booking[];
  leads: Lead[];
  inquiries: Inquiry[];
}

export default function Dashboard({ bookings, leads, inquiries }: DashboardProps) {
  const pendingFollowups = leads.filter(l => l.status === 'follow-up').length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(b => b.date === todayStr);
  const todayInquiries = inquiries.filter(i => i.date === todayStr);
  const newInquiries = inquiries.filter(i => i.status === 'new').length;

  const kpis = [
    { label: 'Revenue', value: rupee(2450000), icon: IndianRupee, color: 'gold' },
    { label: 'Leads', value: leads.length, icon: TrendingUp, color: 'jade' },
    { label: 'Bookings', value: bookings.length, icon: CalendarIcon, color: 'sky' },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome & Daily Summary */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-navy">Hello, Rohit</h1>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{fdate(todayStr)}</span>
        </div>

        {/* Daily Summary Card - Part 5/6 */}
        <div className="bg-white p-5 rounded-3xl border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Daily Summary</h2>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="text-sm font-bold text-navy">{todayBookings.length}</div>
                <div className="text-[8px] font-bold uppercase text-muted">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-navy">{todayInquiries.length}</div>
                <div className="text-[8px] font-bold uppercase text-muted">Inquiries</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {pendingFollowups > 0 && (
              <div className="flex items-center justify-between p-3 bg-rose-pale border border-rose/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose" />
                  <span className="text-xs font-bold text-navy">{pendingFollowups} Pending Follow-ups</span>
                </div>
                <button className="text-[10px] font-bold text-rose uppercase">Fix Now</button>
              </div>
            )}
            {newInquiries > 0 && (
              <div className="flex items-center justify-between p-3 bg-sky-pale border border-sky/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-sky" />
                  <span className="text-xs font-bold text-navy">{newInquiries} New Inquiries</span>
                </div>
                <button className="text-[10px] font-bold text-sky uppercase">Reply</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions - Habit Loop */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => {}} 
          className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl shadow-sm active:scale-95 transition-all"
        >
          <div className="p-2 bg-gold/10 text-gold rounded-lg">
            <Plus size={18} />
          </div>
          <span className="text-xs font-bold text-navy">New Booking</span>
        </button>
        <button 
          onClick={() => {}} 
          className="flex items-center gap-3 p-4 bg-white border border-border rounded-2xl shadow-sm active:scale-95 transition-all"
        >
          <div className="p-2 bg-sky/10 text-sky rounded-lg">
            <Target size={18} />
          </div>
          <span className="text-xs font-bold text-navy">New Inquiry</span>
        </button>
      </section>

      {/* Today's Agenda */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Today's Schedule</h2>
        
        {/* Empty State Fix - Part 5 */}
        {todayBookings.length === 0 && todayInquiries.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-navy">0</div>
                  <div className="text-[9px] font-bold uppercase text-muted">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-navy">0</div>
                  <div className="text-[9px] font-bold uppercase text-muted">Inquiries</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-navy text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <Plus size={12} /> Add New
              </button>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <ClipboardList size={20} className="opacity-40" />
              <p className="text-xs">No events or inquiries scheduled for today.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {todayBookings.map(b => (
              <div key={b.id} className="card-mobile flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy text-white rounded-xl flex items-center justify-center font-bold">
                    {b.client[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy">{b.client}</div>
                    <div className="text-[10px] text-muted">{b.etype} • {b.guests} Guests</div>
                  </div>
                </div>
                <span className="badge b-confirmed">Confirmed</span>
              </div>
            ))}
            {todayInquiries.map(i => (
              <div key={i.id} className="card-mobile flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-pale text-sky rounded-xl flex items-center justify-center font-bold">
                    {i.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy">{i.name}</div>
                    <div className="text-[10px] text-muted">Inquiry • {i.etype}</div>
                  </div>
                </div>
                <span className="badge b-new">New</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-3">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white p-4 rounded-2xl border border-border text-center space-y-1 shadow-sm">
            <div className={`w-8 h-8 mx-auto rounded-lg bg-${kpi.color}/10 text-${kpi.color} flex items-center justify-center mb-1`}>
              <kpi.icon size={16} />
            </div>
            <div className="text-[18px] font-serif font-bold text-navy">
              {typeof kpi.value === 'number' ? kpi.value : kpi.value.split('.')[0]}
            </div>
            <div className="text-[9px] font-bold uppercase text-muted tracking-tighter">{kpi.label}</div>
          </div>
        ))}
      </section>

      {/* Recent Activity */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Recent Activity</h2>
          <button className="text-[10px] font-bold text-navy-lit">View All</button>
        </div>
        <div className="space-y-3">
          {inquiries.slice(0, 3).map(i => (
            <div key={i.id} className="card-mobile flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-surface rounded-lg text-muted">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">{i.name}</div>
                  <div className="text-[10px] text-muted">Inquiry for {i.etype} • {i.received}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-navy text-white text-[10px] font-bold rounded-lg active:scale-95 transition-all">Call</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
