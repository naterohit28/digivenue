import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import TopBar from './components/Layout/TopBar';
import Sidebar from './components/Layout/Sidebar';
import StatCard from './components/Dashboard/StatCard';
import RecentInquiries from './components/Dashboard/RecentInquiries';
import QuickActions from './components/Dashboard/QuickActions';
import ActivityTimeline from './components/Dashboard/ActivityTimeline';
import Leads from './components/Leads';
import Bookings from './components/Bookings';
import Calendar from './components/Calendar';
import Customers from './components/Customers';
import Settings from './components/Settings';
import SocialMediaLeads from './components/SocialMedia/SocialMediaLeads';
import StoriesGrowthEngine from './components/Growth/StoriesGrowthEngine';
import Modal from './components/UI/Modal';

// Data & Types
import { MOCK_INQUIRIES, MOCK_SOCIAL_LEADS, MOCK_ACTIVITIES, MOCK_LEADS, MOCK_BOOKINGS, MOCK_CAMPAIGNS } from './data/mockData';
import { cn } from './lib/utils';
import { ToastProvider, useToast } from './components/UI/Toast';
import { Booking, Lead, Inquiry, SocialLead, Campaign } from './types';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const { showToast } = useToast();

  // Global State
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [socialLeads, setSocialLeads] = useState<SocialLead[]>(MOCK_SOCIAL_LEADS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);

  // Handlers
  const handleAddInquiry = (newInq: Partial<Inquiry>) => {
    const inq: Inquiry = {
      id: Math.max(...inquiries.map(i => i.id), 0) + 1,
      name: newInq.name || 'New Client',
      contact: newInq.contact || '',
      etype: newInq.etype || 'Wedding',
      date: newInq.date || new Date().toISOString().split('T')[0],
      guests: newInq.guests || 0,
      budget: newInq.budget || 0,
      message: newInq.message || '',
      status: 'new',
      received: 'Just now'
    };
    setInquiries([inq, ...inquiries]);
    showToast('New inquiry added successfully!');
    setIsInquiryModalOpen(false);
  };

  const handleConvertLead = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const newBooking: Booking = {
      id: Math.max(...bookings.map(b => b.id), 0) + 1,
      client: lead.name,
      etype: lead.etype,
      venue: lead.venue,
      date: lead.date,
      amount: lead.budget,
      advance: 0,
      guests: lead.guests,
      notes: lead.notes
    };

    setBookings([newBooking, ...bookings]);
    setLeads(leads.filter(l => l.id !== leadId));
    showToast(`Lead ${lead.name} converted to booking!`);
  };

  const handleDeleteBooking = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
    showToast('Booking removed');
  };

  const handleUpdateLeadStatus = (id: number, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    showToast(`Lead status updated to ${status}`);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-navy">Venue Overview</h2>
                <p className="text-muted mt-1">Here's what's happening at Ashraya Grand today</p>
              </div>
              <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-border shadow-sm">
                <button className="px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold shadow-lg shadow-navy/20">Today</button>
                <button onClick={() => showToast('Filtering by week...', 'info')} className="px-4 py-2 text-muted hover:text-navy rounded-xl text-xs font-bold transition-colors">This Week</button>
                <button onClick={() => showToast('Filtering by month...', 'info')} className="px-4 py-2 text-muted hover:text-navy rounded-xl text-xs font-bold transition-colors">This Month</button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard 
                label="Total Inquiries" 
                value={inquiries.length} 
                subValue="+3 since yesterday" 
                icon={Target} 
                color="sky" 
                delay={0.1}
              />
              <StatCard 
                label="Pending Follow-ups" 
                value={leads.filter(l => l.status === 'follow-up').length} 
                subValue="2 urgent tasks" 
                icon={Clock} 
                color="rose" 
                delay={0.2}
              />
              <StatCard 
                label="Confirmed Bookings" 
                value={bookings.length} 
                subValue="4 weddings, 4 corporate" 
                icon={CheckCircle2} 
                color="jade" 
                delay={0.3}
              />
              <StatCard 
                label="Est. Revenue" 
                value={`₹${(bookings.reduce((sum, b) => sum + b.amount, 0) / 100000).toFixed(1)}L`} 
                subValue="15% above target" 
                icon={TrendingUp} 
                color="gold" 
                delay={0.4}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <RecentInquiries inquiries={inquiries} />
                <div className="bg-navy rounded-[40px] p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 font-serif">Grow Your Bookings</h3>
                    <p className="text-white/70 max-w-md mb-6 leading-relaxed">
                      Our smart algorithm suggests the best dates to promote based on historical demand and upcoming muhurats.
                    </p>
                    <button 
                      onClick={() => setActivePage('stories')}
                      className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform"
                    >
                      View Growth Insights
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl group-hover:bg-gold/20 transition-all"></div>
                </div>
              </div>
              <div className="space-y-8">
                <QuickActions onAddInquiry={() => setIsInquiryModalOpen(true)} />
                <ActivityTimeline activities={MOCK_ACTIVITIES} />
              </div>
            </div>
          </div>
        );
      case 'social':
        return <SocialMediaLeads leads={socialLeads} />;
      case 'stories':
        return <StoriesGrowthEngine />;
      case 'leads':
        return <Leads leads={leads} onConvert={handleConvertLead} onUpdateStatus={handleUpdateLeadStatus} />;
      case 'bookings':
        return <Bookings bookings={bookings} onDelete={handleDeleteBooking} />;
      case 'calendar':
        return <Calendar bookings={bookings} inquiries={inquiries} />;
      case 'customers':
        return <Customers />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-slide-up">
            <div className="w-20 h-20 bg-bg rounded-3xl flex items-center justify-center text-4xl">🚧</div>
            <h3 className="text-2xl font-bold text-navy font-serif">{activePage.charAt(0).toUpperCase() + activePage.slice(1)} Module</h3>
            <p className="text-muted max-w-xs">This section is part of the full DigiVenue SmartOS experience and is coming soon in the demo.</p>
            <button 
              onClick={() => setActivePage('dashboard')}
              className="text-gold font-bold hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar 
        activePage={activePage} 
        onPageChange={setActivePage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Inquiry Modal */}
      <Modal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)}
        title="Add New Inquiry"
      >
        <form className="space-y-6" onSubmit={(e) => { 
          e.preventDefault(); 
          const formData = new FormData(e.currentTarget);
          handleAddInquiry({
            name: formData.get('name') as string,
            contact: formData.get('phone') as string,
            etype: formData.get('etype') as string,
            date: formData.get('date') as string,
            message: formData.get('notes') as string,
          });
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Client Name</label>
              <input name="name" type="text" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" placeholder="e.g. Amit Sharma" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Phone Number</label>
              <input name="phone" type="tel" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Event Type</label>
              <select name="etype" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors appearance-none">
                <option>Wedding</option>
                <option>Reception</option>
                <option>Engagement</option>
                <option>Corporate</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Event Date</label>
              <input name="date" type="date" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Notes</label>
            <textarea name="notes" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors min-h-[100px]" placeholder="Any special requirements..."></textarea>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsInquiryModalOpen(false)} className="flex-1 py-4 bg-bg text-navy font-bold rounded-2xl hover:bg-border transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-navy text-white font-bold rounded-2xl shadow-lg shadow-navy/20 hover:bg-navy-mid transition-colors">Save Inquiry</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
