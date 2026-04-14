import React from 'react';
import { MessageSquare, Plus, Mail, Phone, Calendar, IndianRupee } from 'lucide-react';
import { motion } from 'motion/react';
import { Inquiry } from '../types';
import { rupee, fdate } from '../constants';

interface InquiriesProps {
  inquiries: Inquiry[];
}

export default function Inquiries({ inquiries }: InquiriesProps) {
  const statusBadge = (s: string) => {
    switch (s) {
      case 'new': return 'b-new';
      case 'contacted': return 'b-follow';
      case 'converted': return 'b-converted';
      case 'closed': return 'b-lost';
      default: return 'b-new';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-navy">Inquiries</h1>
          <p className="text-muted text-sm tracking-wide">{inquiries.length} incoming requests</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white text-sm font-bold rounded-xl hover:bg-navy-mid transition-all shadow-sm">
          <Plus size={18} />
          New Inquiry
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Event</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map(i => (
                <tr key={i.id}>
                  <td className="font-bold">{i.name}</td>
                  <td className="text-muted text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1.5"><Mail size={10} /> {i.contact}</span>
                    </div>
                  </td>
                  <td>{i.etype}</td>
                  <td className="font-mono text-xs">{fdate(i.date)}</td>
                  <td className="font-mono text-xs">{i.guests}</td>
                  <td className="font-mono text-xs font-bold text-navy">{rupee(i.budget)}</td>
                  <td>
                    <span className={`badge ${statusBadge(i.status)}`}>{i.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-lg bg-navy text-white text-[10px] font-bold hover:bg-navy-mid transition-colors">
                        Convert
                      </button>
                      <button className="px-3 py-1 rounded-lg border border-border text-muted text-[10px] font-bold hover:bg-surface transition-colors">
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {inquiries.length === 0 && (
        <div className="py-20 text-center space-y-4 opacity-40">
          <MessageSquare size={64} className="mx-auto text-muted" />
          <p className="text-lg font-medium">No inquiries yet</p>
        </div>
      )}
    </div>
  );
}
