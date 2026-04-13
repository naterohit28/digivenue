import React, { useState } from 'react';
import { X, Calendar, Users, Phone, User, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

export default function QuickAddModal({ isOpen, onClose, onAdd }: QuickAddModalProps) {
  const [type, setType] = useState<'booking' | 'inquiry'>('booking');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, type });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-navy/60 backdrop-blur-sm">
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full max-w-md bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-navy">Quick Add</h2>
          <button onClick={onClose} className="p-2 text-muted hover:bg-surface rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex p-1 bg-surface rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setType('booking')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'booking' ? 'bg-navy text-white' : 'text-muted'}`}
            >
              Booking
            </button>
            <button
              type="button"
              onClick={() => setType('inquiry')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'inquiry' ? 'bg-navy text-white' : 'text-muted'}`}
            >
              Inquiry
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
              <input
                required
                placeholder="Client Name"
                className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl focus:border-navy outline-none"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, date: new Date().toISOString().split('T')[0] })}
                  className="flex-1 py-2 bg-surface border border-border rounded-lg text-[10px] font-bold uppercase text-navy"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setFormData({ ...formData, date: tomorrow.toISOString().split('T')[0] });
                  }}
                  className="flex-1 py-2 bg-surface border border-border rounded-lg text-[10px] font-bold uppercase text-navy"
                >
                  Tomorrow
                </button>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
                <input
                  required
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl focus:border-navy outline-none"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
                  <input
                    type="number"
                    placeholder="Guests"
                    className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl focus:border-navy outline-none"
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: e.target.value })}
                  />
                </div>
                <div className="flex gap-1">
                  {[100, 200, 500].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData({ ...formData, guests: n.toString() })}
                      className="flex-1 py-1 bg-surface border border-border rounded-lg text-[8px] font-bold text-muted"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative h-fit">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl focus:border-navy outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-navy-mid transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Save {type === 'booking' ? 'Booking' : 'Inquiry'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
