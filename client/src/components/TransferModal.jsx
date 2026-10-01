import React, { useState } from 'react';
import { X, ArrowRightLeft, Cpu, ShieldCheck, AlertTriangle, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function TransferModal({ onClose, onTransferComplete }) {
  const [patientId, setPatientId] = useState('P-1001');
  const [toDepartment, setToDepartment] = useState('Neurology');
  const [reason, setReason] = useState('Specialist Consultation & Brain CT Evaluation');
  const [analyzingCheck, setAnalyzingCheck] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [transferring, setTransferring] = useState(false);

  const handleRunPreCheck = async () => {
    setAnalyzingCheck(true);
    const res = await api.runPreTransferCheck(patientId, toDepartment);
    if (res.success) {
      setCheckResult(res.data);
    }
    setAnalyzingCheck(false);
  };

  const handleConfirmTransfer = async () => {
    setTransferring(true);
    const res = await api.transferPatient(patientId, toDepartment, reason, 'Dr. Sarah');
    if (res.success) {
      if (onTransferComplete) onTransferComplete(res.data);
      onClose();
    }
    setTransferring(false);
  };

  return (
    <div className="fixed inset-[#0] bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0f172a] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">PATIENT TRANSFER DEMO</span>
              <h3 className="text-base font-extrabold text-white">Inter-Departmental Handoff Transfer</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Select Patient</label>
              <select
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value);
                  setCheckResult(null);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="P-1001">Ravi Kumar (P-1001) - Emergency</option>
                <option value="P-1002">Anita Rao (P-1002) - Ward</option>
                <option value="P-1003">Arjun Singh (P-1003) - ICU</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Target Department</label>
              <select
                value={toDepartment}
                onChange={(e) => {
                  setToDepartment(e.target.value);
                  setCheckResult(null);
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-cyan-300 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Neurology">Neurology</option>
                <option value="Radiology">Radiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Ward">Ward</option>
                <option value="ICU">ICU</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Transfer Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Pre-Transfer Notice */}
          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold">
                MEDFLOW will check for unresolved information gaps before transfer.
              </span>
            </div>

            <button
              onClick={handleRunPreCheck}
              disabled={analyzingCheck}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition shrink-0 flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{analyzingCheck ? 'Checking...' : 'Analyze Before Transfer'}</span>
            </button>
          </div>

          {/* AI Pre-Transfer Check Results */}
          {checkResult && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">PRE-TRANSFER READINESS CHECK</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">Target: {checkResult.targetDepartment}</div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Information Completeness Score</div>
                    <div className="text-base font-black text-cyan-400">{checkResult.completenessScore}%</div>
                  </div>
                </div>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-bold">
                  {checkResult.completeCount} Complete
                </div>
                <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-400 font-bold">
                  {checkResult.needsReviewCount} Needs Review
                </div>
                <div className="p-2 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 font-bold">
                  {checkResult.pendingCount} Pending
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {checkResult.checklist?.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-200">{item.item}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      item.status === 'Complete' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.status === 'Needs Review' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">Updates timeline & audit log</span>
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition">
              Cancel
            </button>
            <button
              onClick={handleConfirmTransfer}
              disabled={transferring}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{transferring ? 'Transferring...' : 'Review & Confirm Transfer'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
