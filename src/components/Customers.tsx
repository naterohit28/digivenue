import React from 'react';
import { Users, Mail, Phone, Calendar, IndianRupee, Search, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { rupee } from '../constants';

const MOCK_CUSTOMERS = [
  { id: 1, name: 'Rohit Sharma', email: 'rohit@example.com', phone: '+91 98765 43210', events: 2, totalSpend: 1450000, lastEvent: '2026-11-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', events: 1, totalSpend: 250000, lastEvent: '2026-09-20' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 98765 43212', events: 1, totalSpend: 150000, lastEvent: '2026-10-05' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 98765 43213', events: 3, totalSpend: 800000, lastEvent: '2026-12-01' },
];

export default function Customers() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Customers</h1>
          <p className="text-muted text-sm tracking-wide">Manage your client relationships and history</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={18} />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:border-navy outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Information</th>
                <th>Events</th>
                <th>Total Spend</th>
                <th>Last Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface text-navy rounded-full flex items-center justify-center font-bold">
                        {customer.name[0]}
                      </div>
                      <span className="font-bold text-navy">{customer.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1 text-xs text-muted">
                      <span className="flex items-center gap-1.5"><Mail size={12} /> {customer.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={12} /> {customer.phone}</span>
                    </div>
                  </td>
                  <td className="font-mono text-sm">{customer.events}</td>
                  <td className="font-bold text-navy">{rupee(customer.totalSpend)}</td>
                  <td className="text-xs text-muted font-mono">{customer.lastEvent}</td>
                  <td>
                    <button className="p-2 hover:bg-bg rounded-lg text-muted transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gold-pale p-8 rounded-[40px] border border-gold/20 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <Users size={32} className="text-gold" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-navy mb-1 font-serif">Customer Loyalty Insights</h3>
          <p className="text-sm text-navy/60 leading-relaxed">
            DigiVenue tracks repeat clients and referrals automatically. You have <span className="font-bold text-navy">12 loyal customers</span> who have booked more than once.
          </p>
        </div>
        <button className="px-6 py-3 bg-navy text-white rounded-2xl text-sm font-bold shadow-xl shadow-navy/20 hover:scale-105 transition-transform whitespace-nowrap">
          View Loyalty Report
        </button>
      </div>
    </div>
  );
}
