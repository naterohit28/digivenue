import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-bg rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center text-navy font-bold">D</div>
          <span className="font-serif text-xl font-bold tracking-tight hidden sm:block">
            Digi<span className="text-gold">Venue</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="p-2 text-muted hover:text-navy hover:bg-bg rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">Ashraya Grand</p>
            <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Manager</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs border-2 border-gold/20">
            RS
          </div>
        </div>
      </div>
    </header>
  );
}
