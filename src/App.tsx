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
import SocialMediaLeads from './components/SocialMedia/SocialMediaLeads';
import Modal from './components/UI/Modal';

// Data & Types
import { MOCK_INQUIRIES, MOCK_SOCIAL_LEADS, MOCK_ACTIVITIES } from './data/mockData';
import { cn } from './lib/utils';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

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
                <button className="px-4 py-2 text-muted hover:text-navy rounded-xl text-xs font-bold transition-colors">This Week</button>
                <button className="px-4 py-2 text-muted hover:text-navy rounded-xl text-xs font-bold transition-colors">This Month</button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatCard 
                label="Total Inquiries" 
                value={12} 
                subValue="+3 since yesterday" 
                icon={Target} 
                color="sky" 
                delay={0.1}
              />
              <StatCard 
                label="Pending Follow-ups" 
                value={5} 
                subValue="2 urgent tasks" 
                icon={Clock} 
                color="rose" 
                delay={0.2}
              />
              <StatCard 
                label="Confirmed Bookings" 
                value={8} 
                subValue="4 weddings, 4 corporate" 
                icon={CheckCircle2} 
                color="jade" 
                delay={0.3}
              />
              <StatCard 
                label="Est. Revenue" 
                value="₹24.5L" 
                subValue="15% above target" 
                icon={TrendingUp} 
                color="gold" 
                delay={0.4}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <RecentInquiries inquiries={MOCK_INQUIRIES} />
                <div className="bg-navy rounded-[40px] p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 font-serif">Grow Your Bookings</h3>
                    <p className="text-white/70 max-w-md mb-6 leading-relaxed">
                      Our smart algorithm suggests the best dates to promote based on historical demand and upcoming muhurats.
                    </p>
                    <button className="flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform">
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
        return <SocialMediaLeads leads={MOCK_SOCIAL_LEADS} />;
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
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsInquiryModalOpen(false); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Client Name</label>
              <input type="text" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" placeholder="e.g. Amit Sharma" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Phone Number</label>
              <input type="tel" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Event Type</label>
              <select className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors appearance-none">
                <option>Wedding</option>
                <option>Reception</option>
                <option>Engagement</option>
                <option>Corporate</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Event Date</label>
              <input type="date" className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Notes</label>
            <textarea className="w-full px-4 py-3 bg-bg border border-border rounded-xl outline-none focus:border-gold transition-colors min-h-[100px]" placeholder="Any special requirements..."></textarea>
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
