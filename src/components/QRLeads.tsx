import React from 'react';
import { QrCode, Download, Printer, TrendingUp, Users, CheckCircle2, MousePointer2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function QRLeads() {
  const stats = [
    { label: 'Total Scans', value: '47', icon: MousePointer2, color: 'navy' },
    { label: 'Inquiries', value: '12', icon: Users, color: 'jade' },
    { label: 'Converted', value: '3', icon: CheckCircle2, color: 'gold' },
    { label: 'Rate', value: '25%', icon: TrendingUp, color: 'sky' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">QR Lead Capture</h1>
          <p className="text-muted text-sm tracking-wide">Place QR codes at your venue — visitors scan to submit inquiries instantly</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-bold hover:bg-surface transition-colors">
            <Printer size={18} />
            Print QR
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-bold hover:bg-navy-mid transition-colors">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col items-center justify-center p-12 space-y-8">
          <div className="text-[10px] uppercase tracking-widest text-muted font-bold">Your Venue QR Code</div>
          
          <div className="p-6 bg-white border-4 border-navy rounded-3xl shadow-xl relative group">
            <div className="w-48 h-48 bg-surface rounded-xl flex items-center justify-center">
              <QrCode size={120} className="text-navy" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
              <span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-navy shadow-lg">SCAN PREVIEW</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="font-serif text-2xl font-bold text-navy">Ashraya Grand</div>
            <p className="text-sm text-muted">Scan to book your event</p>
            <div className="pt-4">
              <span className="font-mono text-xs text-navy-lit bg-navy/5 px-3 py-1 rounded-full">digivenue.app/ashraya/inquiry</span>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
              <TrendingUp size={18} className="text-navy" />
              <h2 className="font-serif text-lg font-bold text-navy">QR Scan Stats</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border space-y-1">
                  <div className="flex items-center justify-between">
                    <stat.icon size={16} className="text-muted" />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className={`text-2xl font-serif font-bold text-${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border bg-surface">
              <h2 className="font-serif text-lg font-bold text-navy">QR Settings</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Redirect URL</label>
                <input type="text" defaultValue="digivenue.app/ashraya/inquiry" className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm font-mono" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted tracking-wider">QR Color Theme</label>
                <select className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm">
                  <option>Navy Blue (default)</option>
                  <option>Black</option>
                  <option>Gold</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Auto-assign Leads To</label>
                <select className="w-full px-4 py-2 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy text-sm">
                  <option>Rohit (Manager)</option>
                  <option>Sales Team</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
