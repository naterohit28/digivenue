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
  const [onboarding, setOnboarding] = useState<OnboardingState>({ 
    step: 1, 
    isComplete: localStorage.getItem('onboardingComplete') === 'true' 
  });

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
    }
    if (onboarding.step === 2) setOnboarding({ ...onboarding, step: 3 });
  };

  const completeOnboarding = () => {
    setOnboarding({ ...onboarding, isComplete: true });
    localStorage.setItem('onboardingComplete', 'true');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard bookings={bookings} leads={leads} inquiries={inquiries} />;
      case 'calendar': return <Calendar bookings={bookings} inquiries={inquiries} />;
      case 'bookings': return <Bookings bookings={bookings} />;
      case 'leads': return <Leads leads={leads} />;
      case 'growth': return <Growth links={socialLinks} onUpdate={setSocialLinks} venueName="Ashraya Grand" bookings={bookings} />;
      default: return <Dashboard bookings={bookings} leads={leads} inquiries={inquiries} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg">
      {/* Onboarding Overlay */}
      {!onboarding.isComplete && (
        <div className="fixed inset-0 z-[200] bg-navy/95 flex items-center justify-center p-6 text-white text-center backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 max-w-xs">
            <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto text-navy shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              {onboarding.step === 1 ? <Building2 size={48} /> : onboarding.step === 2 ? <Plus size={48} /> : <CheckCircle2 size={48} />}
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold">
                {onboarding.step === 1 ? 'Welcome to DigiVenue' : onboarding.step === 2 ? 'Add Your First Booking' : 'Ready to Go!'}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                {onboarding.step === 1 ? 'The smartest way to manage your banquet hall. Let\'s set up your venue first.' : onboarding.step === 2 ? 'Quickly add a booking or inquiry to see how it works.' : 'You\'re all set to manage your venue like a pro.'}
              </p>
            </div>
            <button 
              onClick={() => {
                if (onboarding.step === 1) setOnboarding({ ...onboarding, step: 2 });
                else if (onboarding.step === 3) completeOnboarding();
                else setIsQuickAddOpen(true);
              }}
              className="w-full py-4 bg-gold text-navy font-bold rounded-2xl shadow-xl active:scale-95 transition-all"
            >
              {onboarding.step === 1 ? 'Get Started' : onboarding.step === 2 ? '+ Quick Add' : 'Enter Dashboard'}
            </button>
          </motion.div>
        </div>
      )}

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
    </div>
  );
}
