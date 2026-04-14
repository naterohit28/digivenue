import React from 'react';
import { motion } from 'motion/react';
import { IndianRupee, CheckCircle2, AlertCircle, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Booking } from '../types';
import { rupee, fdate, statusOf, VENUES, MONTH_S } from '../constants';

interface FinancesProps {
  bookings: Booking[];
}

export default function Finances({ bookings }: FinancesProps) {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
  const collected = bookings.reduce((sum, b) => sum + b.advance, 0);
  const outstanding = totalRevenue - collected;
  const fullyPaid = bookings.filter(b => statusOf(b) === 'paid').length;

  const kpis = [
    { label: 'Total Revenue', value: rupee(totalRevenue), sub: `${bookings.length} bookings`, color: 'gold', icon: IndianRupee },
    { label: 'Collected', value: rupee(collected), sub: `${totalRevenue ? Math.round((collected / totalRevenue) * 100) : 0}% of total`, color: 'jade', icon: CheckCircle2 },
    { label: 'Outstanding', value: rupee(outstanding), sub: `${bookings.filter(b => b.amount > b.advance).length} pending`, color: 'rose', icon: AlertCircle },
    { label: 'Fully Paid', value: fullyPaid, sub: `of ${bookings.length} bookings`, color: 'navy', icon: Wallet },
  ];

  // Mock monthly data
  const monthlyData = MONTH_S.slice(0, 6).map((month, i) => {
    const rev = Math.floor(Math.random() * 500000) + 200000;
    const col = Math.floor(rev * (0.6 + Math.random() * 0.3));
    return { month, rev, col };
  });

  const maxVal = Math.max(...monthlyData.map(d => d.rev));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-navy">Finances</h1>
        <p className="text-muted text-sm tracking-wide">Revenue tracking and payment management</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface">
            <h2 className="font-serif text-lg font-bold text-navy">Monthly Revenue</h2>
          </div>
          <div className="p-6 h-64 flex items-end justify-between gap-4">
            {monthlyData.map((data, i) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-48">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.rev / maxVal) * 100}%` }}
                    className="flex-1 bg-navy-mid rounded-t-lg relative"
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {rupee(data.rev)}
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.col / maxVal) * 100}%` }}
                    className="flex-1 bg-jade rounded-t-lg relative"
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-jade text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {rupee(data.col)}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold text-muted uppercase">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-surface border-t border-border flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-navy-mid" />
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-jade" />
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Collected</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface">
            <h2 className="font-serif text-lg font-bold text-navy">Revenue by Venue</h2>
          </div>
          <div className="p-6 space-y-6">
            {VENUES.map(v => {
              const vRev = bookings.filter(b => b.venue === v.id).reduce((sum, b) => sum + b.amount, 0);
              const percentage = totalRevenue ? Math.round((vRev / totalRevenue) * 100) : 0;
              return (
                <div key={v.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                      <span className="font-semibold">{v.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-navy font-bold">{rupee(vRev)}</span>
                      <span className="text-xs text-muted w-8 text-right">{percentage}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: v.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-surface flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-navy">Payment Tracker</h2>
          <div className="text-xs font-bold text-muted uppercase tracking-widest">All Bookings</div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Total</th>
                <th>Received</th>
                <th>Balance</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.sort((a, b) => (b.amount - b.advance) - (a.amount - a.advance)).map(b => {
                const balance = b.amount - b.advance;
                const progress = Math.round((b.advance / b.amount) * 100);
                const status = statusOf(b);
                return (
                  <tr key={b.id}>
                    <td className="font-bold">{b.client}</td>
                    <td className="text-muted">{VENUES.find(v => v.id === b.venue)?.name}</td>
                    <td className="font-mono text-xs">{fdate(b.date)}</td>
                    <td className="font-mono text-xs">{rupee(b.amount)}</td>
                    <td className="font-mono text-xs text-jade">{rupee(b.advance)}</td>
                    <td className={`font-mono text-xs ${balance > 0 ? 'text-rose font-bold' : 'text-muted'}`}>
                      {balance > 0 ? rupee(balance) : '—'}
                    </td>
                    <td className="w-32">
                      <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                        <div className="h-full bg-jade" style={{ width: `${progress}%` }} />
                      </div>
                    </td>
                    <td>
                      <span className={`badge b-${status}`}>{status}</span>
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
