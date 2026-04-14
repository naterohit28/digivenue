import React, { useState, useEffect } from 'react';
import { Calculator, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { rupee } from '../constants';

export default function DealCalculator() {
  const [dealAmount, setDealAmount] = useState<number>(0);
  const [gst18, setGst18] = useState<number>(0);
  const [gst5, setGst5] = useState<number>(0);
  const [commission, setCommission] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (!dealAmount && !gst18 && !gst5) {
      setResults(null);
      return;
    }

    const base18 = gst18 / 0.18;
    const base5 = gst5 / 0.05;
    const totalGST = gst18 + gst5;
    const bankTotal = base18 + base5 + totalGST;
    const cash = Math.max(0, dealAmount - base18 - base5 - commission);
    const verify = bankTotal + cash + commission;

    setResults({
      base18,
      base5,
      totalGST,
      bankTotal,
      cash,
      verify,
      diff: Math.abs(verify - dealAmount)
    });
  }, [dealAmount, gst18, gst5, commission]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-navy">Deal Split Calculator</h1>
        <p className="text-muted text-sm tracking-wide">Reverse GST calculator — split any deal into bank & cash portions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
            <Calculator size={18} className="text-navy" />
            <h2 className="font-serif text-lg font-bold text-navy">GST Reverse Calculator</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Total Deal Amount (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 500000"
                value={dealAmount || ''}
                onChange={(e) => setDealAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy transition-all font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted tracking-wider">GST @18% Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 18000"
                  value={gst18 || ''}
                  onChange={(e) => setGst18(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy transition-all font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted tracking-wider">GST @5% Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 7000"
                  value={gst5 || ''}
                  onChange={(e) => setGst5(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-muted tracking-wider">Your Commission (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 10000"
                value={commission || ''}
                onChange={(e) => setCommission(Number(e.target.value))}
                className="w-full px-4 py-3 bg-bg border border-border rounded-xl focus:outline-none focus:border-navy transition-all font-mono"
              />
            </div>

            {results && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-surface border border-border space-y-4"
              >
                <div className="text-[10px] font-bold uppercase text-muted tracking-widest mb-2">Calculation Breakdown</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">18% GST Base Amount</span>
                    <span className="font-mono font-medium">{rupee(results.base18)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">5% GST Base Amount</span>
                    <span className="font-mono font-medium">{rupee(results.base5)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Total GST Collected</span>
                    <span className="font-mono font-medium">{rupee(results.totalGST)}</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-navy flex items-center gap-2">
                      🏦 Bank / Invoice Amount
                    </span>
                    <span className="font-mono font-bold text-navy text-lg">{rupee(results.bankTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-jade flex items-center gap-2">
                      💵 Cash Portion
                    </span>
                    <span className="font-mono font-bold text-jade text-lg">{rupee(results.cash)}</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-text">Total Verified Deal</span>
                  <span className="font-mono font-bold text-text">{rupee(results.verify)}</span>
                </div>

                {results.diff < 10 ? (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-jade bg-jade-pale px-3 py-2 rounded-lg">
                    <CheckCircle2 size={14} />
                    DEAL VERIFIED — TOTALS MATCH
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-amber bg-amber-pale px-3 py-2 rounded-lg">
                    <AlertCircle size={14} />
                    DIFFERENCE OF {rupee(results.diff)} — CHECK INPUTS
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border bg-surface flex items-center gap-2">
              <Info size={18} className="text-navy" />
              <h2 className="font-serif text-lg font-bold text-navy">Quick GST Reference</h2>
            </div>
            <div className="p-6">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>GST %</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium text-xs">Banquet Hall Rent</td>
                    <td className="font-mono text-xs">18%</td>
                    <td className="text-muted text-[10px]">Venue hire</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xs">Catering / Food</td>
                    <td className="font-mono text-xs">5%</td>
                    <td className="text-muted text-[10px]">Per plate</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xs">Alcohol / Bar</td>
                    <td className="font-mono text-xs">18%</td>
                    <td className="text-muted text-[10px]">Bar packages</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-xs">Decoration</td>
                    <td className="font-mono text-xs">18%</td>
                    <td className="text-muted text-[10px]">Floral, lights</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-navy rounded-2xl p-6 text-white space-y-4 shadow-lg">
            <h3 className="font-serif text-xl font-bold">How It Works</h3>
            <div className="space-y-4 text-sm text-white/70 leading-relaxed">
              <p>
                <strong className="text-white">Bank (Invoice) portion</strong> is calculated by taking the GST amounts you've collected and deriving the base taxable value.
              </p>
              <div className="p-4 rounded-xl bg-white/5 font-mono text-xs space-y-2">
                <div>Base₁₈ = GST₁₈ ÷ 0.18</div>
                <div>Base₅ = GST₅ ÷ 0.05</div>
                <div>Bank Total = Base₁₈ + Base₅ + Total GST</div>
              </div>
              <p>
                The <strong className="text-white">Cash portion</strong> is the remaining amount from the total deal after subtracting the bank-invoiced base and your commission.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
