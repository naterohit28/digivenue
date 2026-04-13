import React from 'react';
import { Inquiry } from '../../types';
import { Phone, MessageSquare, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RecentInquiriesProps {
  inquiries: Inquiry[];
}

export default function RecentInquiries({ inquiries }: RecentInquiriesProps) {
  return (
    <div className="bg-white rounded-3xl border border-border card-shadow overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-bold text-navy">Recent Inquiries</h3>
        <button className="text-xs text-gold font-bold hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Event Type</th>
              <th>Event Date</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-navy font-bold text-xs">
                      {inquiry.name[0]}
                    </div>
                    <span className="font-bold">{inquiry.name}</span>
                  </div>
                </td>
                <td>{inquiry.etype}</td>
                <td className="font-mono text-xs">{inquiry.date}</td>
                <td className="font-bold">₹{inquiry.budget.toLocaleString()}</td>
                <td>
                  <span className={cn(
                    "badge",
                    inquiry.status === 'new' && "b-new",
                    inquiry.status === 'contacted' && "b-follow",
                    inquiry.status === 'converted' && "b-paid",
                    inquiry.status === 'closed' && "b-lost"
                  )}>
                    {inquiry.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-bg rounded-lg text-muted hover:text-navy transition-colors">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 hover:bg-bg rounded-lg text-muted hover:text-jade transition-colors">
                      <MessageSquare size={16} />
                    </button>
                    <button className="p-2 hover:bg-bg rounded-lg text-muted hover:text-gold transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
