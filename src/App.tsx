import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Target, 
  Plus,
  TrendingUp,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VENUES, INITIAL_BOOKINGS, INITIAL_LEADS, INITIAL_INQUIRIES, INITIAL_SOCIAL_LINKS } from './constants';
import { Booking, Lead, Inquiry, SocialLinks, OnboardingState } from './types';

// Components
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Bookings from './components/Bookings';
import Leads from './components/Leads';
import QuickAddModal from './components/QuickAddModal';
import Growth from './components/Growth';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'add', label: 'Add', icon: Plus, isCenter: true },
    { id: 'leads', label: 'Leads', icon: Target },
    { id: 'growth', label: 'Growth', icon: TrendingUp },
  ];

  const handleQuickAdd = (data: any) => {
    if (data.type === 'booking') {
      const newBooking: Booking = {
        id: Date.now(),
        client: data.name,
        date: data.date,
        guests: parseInt(data.guests) || 0,
        etype: 'General',
        venue: VENUES[0].id,
        amount: 0,
        advance: 0,
        notes: `Phone: ${data.phone}`
      };
      setBookings([newBooking, ...bookings]);
      showNotification('Booking added successfully!');
    } else {
      const newInquiry: Inquiry = {
        id: Date.now(),
        name: data.name,
        contact: data.phone,
        date: data.date,
        guests: parseInt(data.guests) || 0,
        etype: 'General',
        budget: 0,
        message: 'Quick inquiry',
        status: 'new',
        received: 'Just now'
      };
      setInquiries([newInquiry, ...inquiries]);
      showNotification('Inquiry saved!');
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard bookings={bookings} leads={leads} inquiries={inquiries} onAddClick={() => setIsQuickAddOpen(true)} />;
      case 'calendar': return <Calendar bookings={bookings} inquiries={inquiries} />;
      case 'bookings': return <Bookings bookings={bookings} />;
      case 'leads': return <Leads leads={leads} />;
      case 'growth': return <Growth links={socialLinks} onUpdate={setSocialLinks} venueName="Ashraya Grand" bookings={bookings} onNotify={showNotification} />;
      default: return <Dashboard bookings={bookings} leads={leads} inquiries={inquiries} onAddClick={() => setIsQuickAddOpen(true)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg">
      {/* Header */}
      <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <span className="font-serif text-xl font-bold text-navy">
          Digi<span className="text-gold">Venue</span>
        </span>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold text-navy font-bold flex items-center justify-center text-xs shadow-sm">RS</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:max-w-4xl md:mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-center justify-around py-2 px-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-bottom">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'add') setIsQuickAddOpen(true);
              else setActivePage(item.id);
            }}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${
              item.isCenter ? 'relative -top-8' : ''
            } ${activePage === item.id ? 'text-navy' : 'text-muted'}`}
          >
            {item.isCenter ? (
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center shadow-2xl border-[6px] border-bg active:scale-90 transition-all">
                  <item.icon size={32} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy mt-1">
                  {item.label}
                </span>
              </div>
            ) : (
              <>
                <item.icon size={24} className={activePage === item.id ? 'text-gold' : ''} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${activePage === item.id ? 'text-navy' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </button>
        ))}
      </nav>

      <QuickAddModal 
        isOpen={isQuickAddOpen} 
        onClose={() => setIsQuickAddOpen(false)} 
        onAdd={handleQuickAdd} 
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-navy text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <CheckCircle2 size={18} className="text-gold" />
            <span className="text-xs font-bold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
