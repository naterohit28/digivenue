import React, { useState } from 'react';
import { Search, IndianRupee, CheckCircle2, AlertCircle, Wallet, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import { rupee, fdate, statusOf, VENUES } from '../constants';

interface PaymentTrackerProps {
  bookings: Booking[];
}

export default function PaymentTracker({ bookings }: PaymentTrackerProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.client.toLowerCase().includes(search.toLowerCase());
    const balance = b.amount - b.advance;
    const matchesFilter = filter === 'all' || (filter === 'due' && balance > 0) || (filter === 'paid' && balance <= 0);
    return matchesSearch && matchesFilter;
  });

  const totalInvoiced = bookings.reduce((sum, b) => sum + b.amount, 0);
  const totalReceived = bookings.reduce((sum, b) => sum + b.advance, 0);
  const totalOutstanding = totalInvoiced - totalReceived;
  const overdueCount = bookings.filter(b => statusOf(b) === 'overdue').length;

  const kpis = [
    { label: 'Total Invoiced', value: rupee(totalInvoiced), sub: `${bookings.length} bookings`, color: 'gold', icon: IndianRupee },
    { label: 'Received', value: rupee(totalReceived), sub: `${totalInvoiced ? Math.round((totalReceived / totalInvoiced) * 100) : 0}% collected`, color: 'jade', icon: CheckCircle2 },
    { label: 'Outstanding', value: rupee(totalOutstanding), sub: 'Pending collection', color: 'rose', icon: AlertCircle },
    { label: 'Overdue', value: overdueCount, sub: 'Past event date', color: 'amber', icon: Clock },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Payment Tracker</h1>
          <p className="text-muted text-sm tracking-wide">Full visibility on every rupee — due, received, and pending</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" size={16} />
          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-border shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-surface text-muted">
                <kpi.icon size={20} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold">{kpi.label}</div>
              <div className={`font-serif text-2xl font-bold text-${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-muted">{kpi.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-bold text-navy">All Booking Payments</h2>
          <div className="flex gap-2">
            {['all', 'due', 'paid'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  filter === f 
                  ? 'bg-navy text-white border-navy' 
                  : 'bg-white text-muted border-border hover:border-muted'
                }`}
              >
                {f === 'all' ? 'All' : f === 'due' ? 'Has Balance' : 'Fully Paid'}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Event</th>
                <th>Date</th>
                <th>Total</th>
                <th>Received</th>
                <th>Balance</th>
                <th>Progress</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.sort((a, b) => (b.amount - b.advance) - (a.amount - a.advance)).map(b => {
                const balance = b.amount - b.advance;
                const progress = Math.round((b.advance / b.amount) * 100);
                const status = statusOf(b);
                return (
                  <tr key={b.id}>
                    <td className="font-bold">{b.client}</td>
                    <td className="text-muted text-xs">{b.etype}</td>
                    <td className="font-mono text-xs">{fdate(b.date)}</td>
                    <td className="font-mono text-xs">{rupee(b.amount)}</td>
                    <td className="font-mono text-xs text-jade">{rupee(b.advance)}</td>
                    <td className={`font-mono text-xs ${balance > 0 ? 'text-rose font-bold' : 'text-muted'}`}>
                      {balance > 0 ? rupee(balance) : '—'}
                    </td>
                    <td className="w-32">
                      <div className="space-y-1">
                        <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                          <div className="h-full bg-jade" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="text-[9px] font-bold text-faint text-right">{progress}%</div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge b-${status}`}>{status}</span>
                    </td>
                    <td>
                      <button className="px-3 py-1 rounded-lg border border-border text-navy text-[10px] font-bold hover:bg-surface transition-colors">
                        + Pay
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
