import React from 'react';
import { X, HelpCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ExplainableModal({ alert, onClose, onAcknowledge }) {
  if (!alert) return null;

  const exp = alert.explainable || {};

  return (
    <div className="fixed inset-[#0] bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">EXPLAINABLE AI RATIONALE</span>
              <h3 className="text-base font-extrabold text-white">{alert.title || alert.alertType}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          {/* Rule Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">SOURCE RECORD</span>
              <div className="font-bold text-slate-100">{exp.sourceDepartment || 'Emergency Department Record'}</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-[11px] mt-1">
                {exp.sourceValue || alert.previousRecord || 'Penicillin allergy logged'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">RECEIVING RECORD</span>
              <div className="font-bold text-slate-100">{exp.receivingDepartment || 'Neurology Chart'}</div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-amber-300 font-mono text-[11px] mt-1">
                {exp.receivingValue || alert.receivingRecord || 'Not acknowledged / Empty'}
              </div>
            </div>
          </div>

          {/* Logic Comparison */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-2">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
              COMPARISON LOGIC:
            </div>
            <p className="text-slate-200 text-xs leading-relaxed font-semibold">
              {exp.comparisonLogic || 'Previous department record contains documented clinical values, but receiving department intake form leaves the field unpopulated or un-reconciled.'}
            </p>
          </div>

          {/* Clinical Implication & Result */}
          <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/50 space-y-2">
            <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>RESULT / POTENTIAL GAP DETECTED:</span>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">
              {exp.clinicalImplication || 'Potential information gap detected during inter-departmental handoff.'}
            </p>
          </div>

          {/* Actionable Recommendation */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">RECOMMENDED CLINICAL ACTION:</span>
            <div className="text-xs font-bold text-emerald-400 mt-1">
              {alert.recommendedAction || 'Verify allergy and clinical information with patient and care team.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">Human Clinician Final Decision Maker</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAcknowledge(alert.id);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Acknowledge Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
