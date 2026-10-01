import React, { useState, useEffect } from 'react';
import { 
  Cpu, ArrowRightLeft, AlertTriangle, ShieldCheck, HelpCircle, CheckCircle2, 
  Sparkles, FileText, Activity, AlertOctagon, RefreshCw, Check 
} from 'lucide-react';
import { api } from '../services/api';
import ExplainableModal from './ExplainableModal';

export default function HandoffGapDetectorView({ patientId, selectedHandoff, onNavigate }) {
  const [patient, setPatient] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(-1);
  const [activeExplainableAlert, setActiveExplainableAlert] = useState(null);
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await api.getPatientById(patientId || 'P-1001');
      if (res.success) {
        setPatient(res.data);
      }
    }
    loadData();
  }, [patientId]);

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisStepIndex(0);

    const steps = [
      "Reading previous record...",
      "Reading receiving record...",
      "Comparing patient information...",
      "Checking pending investigations...",
      "Detecting inconsistencies...",
      "Generating explainable alerts..."
    ];

    // Animate step by step
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStepIndex(i);
      await new Promise((r) => setTimeout(r, 400));
    }

    // Call API endpoint
    const prevDept = selectedHandoff?.fromDept || 'Emergency';
    const recDept = selectedHandoff?.toDept || 'Neurology';
    const res = await api.analyzeHandoff(patientId || 'P-1001', prevDept, recDept);

    if (res.success) {
      setAnalysisResult(res.aiAnalysis);
    }
    setAnalyzing(false);
  };

  const handleAcknowledgeAlert = async (alertId) => {
    setAcknowledgedAlertIds((prev) => [...prev, alertId]);
    await api.acknowledgeAlert(alertId, 'Dr. Sarah');
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">CORE FEATURE</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold">
              Handoff Gap Detector
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            AI HANDOFF GAP DETECTOR
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated inter-departmental record comparison engine identifying missing, unacknowledged, or pending information
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 transition flex items-center space-x-2 shrink-0 transform hover:-translate-y-0.5"
        >
          <Sparkles className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
          <span>{analyzing ? 'Analyzing Handoff...' : 'Analyze Handoff'}</span>
        </button>
      </div>

      {/* Side-by-Side Comparison Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Animated Scanning Line Overlay during analysis */}
        {analyzing && <div className="animate-scan z-20"></div>}

        {/* LEFT PANEL: PREVIOUS DEPARTMENT RECORD */}
        <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">SOURCE RECORD</span>
              <h2 className="text-lg font-extrabold text-white">PREVIOUS DEPARTMENT RECORD</h2>
            </div>
            <span className="px-3 py-1 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 font-mono font-bold text-xs">
              Emergency Department
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Patient:</span>
              <span className="font-bold text-slate-100">{patient?.name || 'Ravi Kumar'} ({patient?.id || 'P-1001'})</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">BP (Vitals):</span>
              <span className="font-bold text-red-400 font-mono">168/102 mmHg (Elevated)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Blood Sugar:</span>
              <span className="font-bold text-amber-400 font-mono">190 mg/dL</span>
            </div>

            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center justify-between">
              <span className="text-red-300 font-bold">Allergy Documented:</span>
              <span className="font-black text-white px-2.5 py-0.5 rounded bg-red-600 font-mono">Penicillin</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Medication Administered:</span>
              <span className="font-semibold text-slate-200">Paracetamol 500mg, Mannitol 20%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Reported Symptoms:</span>
              <span className="font-semibold text-slate-200">Severe headache, Dizziness, Vomiting</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">CT Brain Status:</span>
              <span className="font-mono text-cyan-400 font-bold">Ordered</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: RECEIVING DEPARTMENT RECORD */}
        <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">INTAKE RECORD</span>
              <h2 className="text-lg font-extrabold text-white">RECEIVING DEPARTMENT RECORD</h2>
            </div>
            <span className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-mono font-bold text-xs">
              Neurology
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Patient:</span>
              <span className="font-bold text-slate-100">{patient?.name || 'Ravi Kumar'} ({patient?.id || 'P-1001'})</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-800/40 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">BP (Vitals):</span>
              <span className="font-bold text-amber-400 font-mono">Not recorded</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Blood Sugar:</span>
              <span className="font-bold text-slate-200 font-mono">190 mg/dL</span>
            </div>

            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center justify-between">
              <span className="text-red-300 font-bold">Allergy Acknowledgment:</span>
              <span className="font-black text-red-400 font-mono px-2 py-0.5 rounded bg-red-950">Not acknowledged</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-800/40 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Medication Reconciliation:</span>
              <span className="font-semibold text-amber-400">Incomplete</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Reported Symptoms:</span>
              <span className="font-semibold text-slate-200">Severe headache</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-800/40 flex items-center justify-between">
              <span className="text-slate-400 font-semibold">CT Brain Status:</span>
              <span className="font-mono text-amber-400 font-bold">Completed (Final report pending)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Analysis Step Indicator */}
      {analyzing && (
        <div className="p-6 rounded-2xl bg-[#0b1329] border border-cyan-500/40 shadow-2xl space-y-4">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>MEDFLOW AI Comparison Engine Running...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "Reading previous record...",
              "Reading receiving record...",
              "Comparing patient information...",
              "Checking pending investigations...",
              "Detecting inconsistencies...",
              "Generating explainable alerts..."
            ].map((stepText, sIdx) => {
              const isFinished = sIdx <= analysisStepIndex;
              return (
                <div
                  key={sIdx}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2.5 transition ${
                    isFinished
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    isFinished ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-600'
                  }`}>
                    {isFinished ? <Check className="w-3 h-3 stroke-[3]" /> : sIdx + 1}
                  </div>
                  <span>{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI ANALYSIS RESULT SECTION */}
      {analysisResult && (
        <div className="p-6 lg:p-8 rounded-3xl bg-[#0b1329] border border-cyan-500/40 shadow-2xl space-y-8 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  MEDFLOW HANDOFF ANALYSIS SUMMARY
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                {analysisResult.totalGapsDetected} Continuity Information Gaps Detected
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {analysisResult.disclaimer}
              </p>
            </div>

            {/* Information Completeness Score Gauge */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Information Completeness Score
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Continuous Data Chain</div>
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-950 border-4 border-cyan-500 flex items-center justify-center font-black text-xl text-cyan-400 shadow-lg shadow-cyan-500/20">
                {analysisResult.completenessScore}%
              </div>
            </div>
          </div>

          {/* Detected Alert Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              PRIORITIZED CLINICAL CONTINUITY ALERTS
            </h3>

            {analysisResult.alerts?.map((alert) => {
              const isAcknowledged = acknowledgedAlertIds.includes(alert.id);
              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition shadow-lg space-y-3 ${
                    alert.priority.includes('HIGH')
                      ? 'bg-red-950/20 border-red-500/40'
                      : alert.priority.includes('MEDIUM')
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-blue-950/20 border-blue-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] tracking-wider ${
                        alert.priority.includes('HIGH') ? 'bg-red-600 text-white' :
                        alert.priority.includes('MEDIUM') ? 'bg-amber-500 text-slate-950' :
                        'bg-blue-600 text-white'
                      }`}>
                        {alert.priority}
                      </span>
                      <h4 className="text-base font-extrabold text-white">{alert.title}</h4>
                    </div>

                    {isAcknowledged && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Acknowledged</span>
                      </span>
                    )}
                  </div>

                  {/* Comparison Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-400 font-bold">Previous Record: </span>
                      <span className="text-slate-200 font-semibold">{alert.previousRecord}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Receiving Record: </span>
                      <span className="text-amber-400 font-semibold">{alert.receivingRecord}</span>
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <div className="text-xs font-bold text-emerald-400 flex items-center space-x-2">
                    <span>Recommended Action:</span>
                    <span className="text-slate-200 font-normal">{alert.recommendedAction}</span>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveExplainableAlert(alert)}
                      className="px-3.5 py-1.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 font-bold text-xs transition flex items-center space-x-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Why did I get this alert?</span>
                    </button>

                    {!isAcknowledged && (
                      <button
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Acknowledge Alert</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Explainable AI Modal Dialog */}
      {activeExplainableAlert && (
        <ExplainableModal
          alert={activeExplainableAlert}
          onClose={() => setActiveExplainableAlert(null)}
          onAcknowledge={handleAcknowledgeAlert}
        />
      )}
    </div>
  );
}
