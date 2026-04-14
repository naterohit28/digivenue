import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  Users, 
  Settings, 
  Share2, 
  ClipboardList,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads / Inquiries', icon: Target },
  { id: 'bookings', label: 'Bookings', icon: ClipboardList },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'stories', label: 'Stories (Growth)', icon: TrendingUp, isNew: true },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, onPageChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-[60] md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-navy text-white z-[70] transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-navy font-bold">D</div>
            <span className="font-serif text-xl font-bold tracking-tight">
              Digi<span className="text-gold">Venue</span>
            </span>
          </div>

          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                  activePage === item.id 
                    ? "bg-gold text-navy font-bold shadow-lg shadow-gold/20" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    activePage === item.id ? "text-navy" : "group-hover:text-gold"
                  )} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.isNew && (
                  <span className={cn(
                    "text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-full font-bold",
                    activePage === item.id ? "bg-navy text-gold" : "bg-gold text-navy"
                  )}>
                    New
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">Pro Plan</p>
            <p className="text-xs font-bold mb-3">Ashraya Grand</p>
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-2">
              <div className="bg-gold h-full w-3/4"></div>
            </div>
            <p className="text-[9px] text-white/40">75% of monthly capacity used</p>
          </div>
        </div>
      </aside>
    </>
  );
}
