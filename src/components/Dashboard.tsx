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
    <div className="space-y-6 pb-8">
      {/* Search & Welcome */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-navy">Hello, Rohit</h1>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{fdate(todayStr)}</span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input
            type="text"
            placeholder="Search client or event..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:border-navy outline-none shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
            <div className="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Bookings</div>
            <div className="text-2xl font-serif font-bold text-navy">{bookings.length}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
            <div className="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Inquiries</div>
            <div className="text-2xl font-serif font-bold text-navy">{inquiries.length}</div>
          </div>
        </div>

        {/* Empty State / Welcome Card */}
        {bookings.length === 0 && inquiries.length === 0 && (
          <div className="bg-white p-5 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gold/10 text-gold rounded-2xl">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy">Welcome to DigiVenue</h3>
                <p className="text-[10px] text-muted">Manage your venue like a pro. Start by adding your first booking or inquiry.</p>
              </div>
            </div>
            <button 
              onClick={onAddClick}
              className="w-full py-3 bg-gold text-navy text-xs font-bold rounded-2xl shadow-sm active:scale-95 transition-all"
            >
              + Add Your First Booking
            </button>
          </div>
        )}

        {/* Action Required Card */}
        {(pendingFollowups > 0 || newInquiries > 0 || (pendingFollowups === 0 && newInquiries === 0 && (bookings.length > 0 || inquiries.length > 0))) && (
          <div className="bg-white p-5 rounded-3xl border border-border shadow-sm space-y-4">
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
              {pendingFollowups === 0 && newInquiries === 0 && (
                <div className="flex items-center gap-2 p-3 bg-jade-pale border border-jade/10 rounded-xl text-jade">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold">All caught up for today!</span>
                </div>
              )}
            </div>
          </div>
        )}
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
        
        {filteredBookings.length === 0 && filteredInquiries.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-navy">{todayBookings.length}</div>
                  <div className="text-[9px] font-bold uppercase text-muted">Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-navy">{todayInquiries.length}</div>
                  <div className="text-[9px] font-bold uppercase text-muted">Inquiries</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-navy text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                <Plus size={12} /> Add New
              </button>
            </div>
            <div className="flex items-center gap-3 text-muted">
              <ClipboardList size={20} className="opacity-40" />
              <p className="text-xs">No matching events for today.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map(b => (
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
            {filteredInquiries.map(i => (
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
