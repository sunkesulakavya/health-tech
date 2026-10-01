import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function JudgeDemoGuideModal({ onClose, onNavigateStep }) {
  const steps = [
    { step: 1, title: "Login as Doctor", desc: "Select 'Try Doctor Demo' on the login screen.", action: () => onNavigateStep('login') },
    { step: 2, title: "Open Patient Ravi Kumar (P-1001)", desc: "Click 'View' on Ravi Kumar under Patients Requiring Attention.", action: () => onNavigateStep('patient-detail') },
    { step: 3, title: "Show Continuous Timeline", desc: "Inspect Emergency → Neurology → Radiology → Ward transition notes.", action: () => onNavigateStep('timeline') },
    { step: 4, title: "Open Handoff Monitor", desc: "Locate Emergency → Neurology transfer (Status: Needs Review).", action: () => onNavigateStep('handoff-monitor') },
    { step: 5, title: "Click 'Analyze Handoff'", desc: "Launch the AI Handoff Gap Detector.", action: () => onNavigateStep('ai-gap-detector') },
    { step: 6, title: "Review AI Analysis", desc: "View 4 prioritized gaps & Information Completeness Score (78%).", action: () => onNavigateStep('ai-gap-detector') },
    { step: 7, title: "Click 'Why did I get this alert?'", desc: "Demonstrate Explainable AI source vs receiving comparison logic.", action: () => onNavigateStep('ai-gap-detector') },
    { step: 8, title: "Click 'Acknowledge Alert'", desc: "Acknowledge allergy gap and add to audit log.", action: () => onNavigateStep('ai-gap-detector') },
    { step: 9, title: "Open Pending Reports", desc: "Navigate to CT Brain report tracker.", action: () => onNavigateStep('pending-reports') },
    { step: 10, title: "Mark Report as Reviewed", desc: "Change CT report status to Reviewed.", action: () => onNavigateStep('pending-reports') },
    { step: 11, title: "Return to Dashboard", desc: "Observe real-time updated counters & cleared alert flags.", action: () => onNavigateStep('dashboard') }
  ];

  return (
    <div className="fixed inset-[#0] bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#0f172a] border border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">HACKATHON EVALUATION GUIDE</span>
              <h3 className="text-lg font-extrabold text-white">11-Step Judge Demonstration Walkthrough</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
          {steps.map((s) => (
            <div key={s.step} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/80 font-bold text-xs flex items-center justify-center font-mono">
                  {s.step}
                </div>
                <div>
                  <div className="font-extrabold text-white">{s.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{s.desc}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  s.action();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs transition flex items-center space-x-1"
              >
                <span>Jump</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
