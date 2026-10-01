import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, AlertTriangle, ShieldAlert, Cpu, CheckCircle2, 
  Clock, ArrowRight, Sparkles 
} from 'lucide-react';
import { api } from '../services/api';

export default function HandoffMonitorView({ onNavigate, onSelectHandoffForGapAnalysis }) {
  const [handoffs, setHandoffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getHandoffs();
      if (res.success) {
        setHandoffs(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleAnalyzeClick = (handoff) => {
    if (onSelectHandoffForGapAnalysis) {
      onSelectHandoffForGapAnalysis(handoff);
    }
    onNavigate('ai-gap-detector');
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">HANDOFF MONITOR</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            Clinical Handoff Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of inter-department patient transfers and continuity readiness metrics
          </p>
        </div>

        <button
          onClick={() => onNavigate('ai-gap-detector')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2"
        >
          <Cpu className="w-4 h-4" />
          <span>Launch AI Gap Detector</span>
        </button>
      </div>

      {/* Handoff List / Cards */}
      <div className="space-y-4">
        {handoffs.map((h) => (
          <div
            key={h.id}
            className={`p-5 rounded-2xl border transition shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              h.patientId === 'P-1001' && h.status === 'Needs Review'
                ? 'bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/40 border-cyan-500/50 shadow-cyan-500/10'
                : 'bg-[#0b1329] border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Left: Patient & Route */}
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border shrink-0 ${
                h.riskLevel === 'HIGH' ? 'bg-red-950 text-red-400 border-red-800/60' :
                h.riskLevel === 'MEDIUM' ? 'bg-amber-950 text-amber-400 border-amber-800/60' :
                'bg-emerald-950 text-emerald-400 border-emerald-800/60'
              }`}>
                {h.riskLevel === 'HIGH' ? <AlertTriangle className="w-6 h-6" /> : <ArrowRightLeft className="w-6 h-6" />}
              </div>

              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-extrabold text-white">{h.patientName}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold">
                    {h.patientId}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    h.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    h.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {h.riskLevel} RISK
                  </span>
                </div>

                <div className="flex items-center space-x-2 mt-2 text-xs font-semibold text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono">
                    {h.fromDept}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono">
                    {h.toDept}
                  </span>
                  <span className="text-slate-500 text-[11px] ml-2">Transfer Time: {h.time}</span>
                </div>
              </div>
            </div>

            {/* Right: Status & Action */}
            <div className="flex items-center space-x-4 self-end md:self-auto">
              {/* Completeness Score */}
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completeness Score</div>
                <div className="text-lg font-black text-cyan-400">{h.completenessScore}%</div>
              </div>

              {/* Status Badge */}
              <span className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                h.status === 'Needs Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' :
                h.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              }`}>
                {h.status}
              </span>

              {/* Analyze Handoff Button */}
              <button
                onClick={() => handleAnalyzeClick(h)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-1.5"
              >
                <Cpu className="w-4 h-4" />
                <span>Analyze Handoff</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
