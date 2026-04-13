import React, { useState } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Calendar as CalendarIcon, 
  ArrowRight,
  AlertCircle,
  Phone,
  Plus,
  ClipboardList,
  Target,
  Search,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { motion } from 'motion/react';
import { Booking, Lead, Inquiry } from '../types';
import { rupee, fdate } from '../constants';

interface DashboardProps {
  bookings: Booking[];
  leads: Lead[];
  inquiries: Inquiry[];
  onAddClick: () => void;
}

export default function Dashboard({ bookings, leads, inquiries, onAddClick }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredBookings = todayBookings.filter(b => 
    b.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.etype.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredInquiries = todayInquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.etype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Hello, Rohit</h1>
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{fdate(todayStr)}</span>
      </div>

      {/* TODAY SUMMARY — TOP SECTION */}
      <section className="grid grid-cols-3 gap-2">
        {[
          { label: 'Bookings', value: todayBookings.length, icon: CalendarIcon, color: 'sky' },
          { label: 'Inquiries', value: todayInquiries.length, icon: Target, color: 'gold' },
          { label: 'Follow-ups', value: pendingFollowups, icon: AlertCircle, color: 'rose' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-3 rounded-2xl border border-border flex flex-col items-center justify-center shadow-sm">
            <div className={`p-1.5 rounded-lg bg-${stat.color}/10 text-${stat.color} mb-1`}>
              <stat.icon size={14} />
            </div>
            <div className="text-lg font-serif font-bold text-navy leading-none">{stat.value}</div>
            <div className="text-[8px] font-bold uppercase text-muted tracking-tighter mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* QUICK ACTION SECTION */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 py-4 bg-navy text-white rounded-2xl shadow-md active:scale-95 transition-all"
        >
          <Plus size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Add Booking</span>
        </button>
        <button 
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 py-4 bg-white border-2 border-navy text-navy rounded-2xl shadow-sm active:scale-95 transition-all"
        >
          <Target size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">Add Inquiry</span>
        </button>
      </section>

      {/* EMPTY STATE CARD — NOT FULL SCREEN */}
      {bookings.length === 0 && inquiries.length === 0 && (
        <div className="bg-white p-5 rounded-3xl border border-border shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gold/10 text-gold rounded-xl shrink-0">
              <Building2 size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-navy">Start by adding your first booking</h3>
              <p className="text-[10px] text-muted leading-relaxed">Your dashboard will show today's agenda and pending tasks once you add data.</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH (Moved down for better hierarchy) */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={16} />
        <input
          type="text"
          placeholder="Search client or event..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-xl text-xs focus:border-navy outline-none shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ACTION REQUIRED (If data exists) */}
      {(pendingFollowups > 0 || newInquiries > 0) && (
        <section className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Action Required</h2>
          <div className="grid grid-cols-1 gap-2">
            {pendingFollowups > 0 && (
              <div className="flex items-center justify-between p-3 bg-rose-pale border border-rose/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose" />
                  <span className="text-xs font-bold text-navy">{pendingFollowups} Urgent Follow-ups</span>
                </div>
                <button className="px-3 py-1 bg-rose text-white text-[10px] font-bold rounded-lg uppercase">Fix</button>
              </div>
            )}
            {newInquiries > 0 && (
              <div className="flex items-center justify-between p-3 bg-sky-pale border border-sky/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-sky" />
                  <span className="text-xs font-bold text-navy">{newInquiries} New Inquiries</span>
                </div>
                <button className="px-3 py-1 bg-sky text-white text-[10px] font-bold rounded-lg uppercase">Reply</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TODAY'S AGENDA */}
      {(bookings.length > 0 || inquiries.length > 0) && (
        <section className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Today's Schedule</h2>
          
          {filteredBookings.length === 0 && filteredInquiries.length === 0 ? (
            <div className="bg-white p-5 rounded-2xl border border-border flex items-center gap-3 text-muted shadow-sm">
              <ClipboardList size={18} className="opacity-40" />
              <p className="text-[10px]">No matching events for today.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredBookings.map(b => (
                <div key={b.id} className="card-mobile flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-navy text-white rounded-xl flex items-center justify-center font-bold text-sm">
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
              {filteredInquiries.map(i => (
                <div key={i.id} className="card-mobile flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-sky-pale text-sky rounded-xl flex items-center justify-center font-bold text-sm">
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
      )}

      {/* QUICK STATS */}
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

      {/* RECENT ACTIVITY */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-bold uppercase text-muted tracking-widest">Recent Activity</h2>
          <button className="text-[10px] font-bold text-navy-lit">View All</button>
        </div>
        <div className="space-y-3">
          {inquiries.slice(0, 3).map(i => (
            <div key={i.id} className="card-mobile flex items-center justify-between py-3">
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

      {/* FLOATING ACTION BUTTON (Mobile FAB) */}
      <button
        onClick={onAddClick}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gold text-navy rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all z-40 md:hidden"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
