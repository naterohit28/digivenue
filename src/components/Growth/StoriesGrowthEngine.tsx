import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  IndianRupee, 
  Plus, 
  Share2, 
  Instagram, 
  MessageCircle, 
  Download, 
  AlertTriangle,
  ArrowRight,
  Eye,
  CheckCircle2,
  Image as ImageIcon,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Campaign, CampaignTemplate, Opportunity } from '../../types';
import { MOCK_CAMPAIGNS, MOCK_TEMPLATES, MOCK_OPPORTUNITIES } from '../../data/mockData';
import { useToast } from '../UI/Toast';

export default function StoriesGrowthEngine() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'templates'>('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);

  const totalPotentialRevenue = MOCK_OPPORTUNITIES.reduce((sum, op) => sum + op.potentialRevenue, 0);

  const handleCreateCampaign = () => {
    showToast('Campaign creation wizard opened', 'info');
    setIsCreateModalOpen(true);
  };

  const handleUseTemplate = (name: string) => {
    showToast(`Template "${name}" selected for new campaign`, 'success');
  };

  const handleShare = (title: string) => {
    showToast(`Sharing "${title}" to social media...`, 'info');
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-navy">Stories <span className="text-gold">(Growth Engine)</span></h2>
          <p className="text-muted mt-1">Turn empty dates into high-revenue bookings with smart campaigns.</p>
        </div>
        <button 
          onClick={handleCreateCampaign}
          className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-navy/20 hover:bg-navy-mid transition-all active:scale-95"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Opportunity Alerts */}
      <div className="bg-rose-pale border border-rose/20 rounded-[32px] p-6 md:p-8 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-rose text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose/20">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-navy">Revenue at Risk: ₹{totalPotentialRevenue.toLocaleString()}</h3>
              <p className="text-navy/60 mt-1 max-w-md">
                We detected <span className="font-bold text-rose">{MOCK_OPPORTUNITIES.length} unbooked Saturdays</span> in the next 60 days. Run a targeted campaign to fill these dates.
              </p>
            </div>
          </div>
          <button 
            onClick={() => showToast('Analyzing unbooked dates...', 'info')}
            className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-navy-mid transition-all"
          >
            Promote These Dates
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl group-hover:bg-rose/10 transition-all"></div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-border shadow-sm w-fit">
        <button 
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-6 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === 'overview' ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-muted hover:text-navy"
          )}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('campaigns')}
          className={cn(
            "px-6 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === 'campaigns' ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-muted hover:text-navy"
          )}
        >
          Active Campaigns
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={cn(
            "px-6 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === 'templates' ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-muted hover:text-navy"
          )}
        >
          Templates
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_CAMPAIGNS.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} onShare={() => handleShare(campaign.title)} />
                ))}
              </div>
              
              <div className="bg-white p-8 rounded-[40px] border border-border card-shadow">
                <h3 className="text-xl font-bold text-navy mb-6">Top Performing Templates</h3>
                <div className="space-y-4">
                  {MOCK_TEMPLATES.map((template) => (
                    <div 
                      key={template.id} 
                      onClick={() => handleUseTemplate(template.name)}
                      className="flex items-center justify-between p-4 bg-bg rounded-2xl border border-border hover:border-gold/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gold shadow-sm">
                          <Target size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-navy">{template.name}</p>
                          <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{template.eventType}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-muted group-hover:text-gold transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaigns' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_CAMPAIGNS.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} onShare={() => handleShare(campaign.title)} />
              ))}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_TEMPLATES.map((template) => (
                <TemplateCard key={template.id} template={template} onUse={() => handleUseTemplate(template.name)} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <div className="bg-navy p-6 rounded-3xl text-white card-shadow">
            <h3 className="text-lg font-bold mb-4 font-serif">Growth ROI</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Total Revenue Generated</p>
                <p className="text-3xl font-serif font-bold text-gold">₹4.2L</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Total Leads</p>
                  <p className="text-xl font-bold">128</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-1">Conversions</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-white/60">Campaign Efficiency</span>
                  <span className="text-jade font-bold">+18%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-jade h-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-border card-shadow">
            <h3 className="text-lg font-bold text-navy mb-4">Upcoming Opportunities</h3>
            <div className="space-y-4">
              {MOCK_OPPORTUNITIES.map((op) => (
                <div key={op.id} className="p-4 bg-bg rounded-2xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-rose uppercase tracking-widest">{op.reason}</span>
                    <span className="text-[10px] font-mono text-muted">{op.date}</span>
                  </div>
                  <p className="text-sm font-bold text-navy">Potential: ₹{(op.potentialRevenue/100000).toFixed(1)}L</p>
                  <button 
                    onClick={() => showToast(`Creating campaign for ${op.date}...`, 'info')}
                    className="w-full mt-3 py-2 bg-white border border-border text-navy text-[10px] font-bold rounded-lg hover:border-gold transition-colors"
                  >
                    Create Campaign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onShare: () => void;
  key?: React.Key;
}

function CampaignCard({ campaign, onShare }: CampaignCardProps) {
  const { showToast } = useToast();
  return (
    <div className="bg-white rounded-3xl border border-border card-shadow overflow-hidden group hover:border-gold/30 transition-all">
      <div className="h-40 relative overflow-hidden">
        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
            campaign.status === 'Active' ? "bg-jade text-white" : "bg-gold text-navy"
          )}>
            {campaign.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold text-navy mb-1">{campaign.title}</h4>
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-4">{campaign.eventType}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-bg rounded-2xl">
            <p className="text-[9px] text-muted uppercase tracking-widest font-bold mb-1">Inquiries</p>
            <p className="text-lg font-bold text-navy">{campaign.metrics.inquiries}</p>
          </div>
          <div className="p-3 bg-bg rounded-2xl">
            <p className="text-[9px] text-muted uppercase tracking-widest font-bold mb-1">Revenue</p>
            <p className="text-lg font-bold text-jade">₹{(campaign.metrics.revenue/100000).toFixed(1)}L</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy text-white rounded-xl text-xs font-bold hover:bg-navy-mid transition-all active:scale-95"
          >
            <Share2 size={14} />
            Share
          </button>
          <button 
            onClick={() => showToast('Opening campaign analytics...', 'info')}
            className="p-3 bg-bg text-muted rounded-xl hover:text-navy transition-colors"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: CampaignTemplate;
  onUse: () => void;
  key?: React.Key;
}

function TemplateCard({ template, onUse }: TemplateCardProps) {
  const { showToast } = useToast();
  return (
    <div className="bg-white p-6 rounded-3xl border border-border card-shadow group hover:border-gold/30 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold-pale text-gold rounded-xl flex items-center justify-center">
          <ImageIcon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-navy">{template.name}</h4>
          <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{template.eventType}</p>
        </div>
      </div>
      
      <div className="bg-bg p-4 rounded-2xl mb-6">
        <p className="text-sm text-navy/80 italic leading-relaxed mb-3">"{template.caption}"</p>
        <p className="text-xs font-bold text-gold">Offer: {template.offer}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {template.hashtags.map(tag => (
            <span key={tag} className="text-[9px] text-navy/40 font-mono">{tag}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onUse}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy text-white rounded-xl text-xs font-bold hover:bg-navy-mid transition-all active:scale-95"
        >
          Use Template
        </button>
        <button 
          onClick={() => showToast('Downloading creative assets...', 'info')}
          className="p-3 bg-bg text-muted rounded-xl hover:text-navy transition-colors"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
