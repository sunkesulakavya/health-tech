import React from 'react';
import { 
  Activity, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, 
  Layers, Cpu, FileSpreadsheet, Lock, Users, Sparkles, Database, Code
} from 'lucide-react';

export default function LandingPage({ onExploreDemo, onLogin }) {
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <header className="px-6 lg:px-12 py-5 flex items-center justify-between border-b border-slate-800/80 bg-[#0b1329]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
              MEDFLOW
            </span>
            <span className="hidden md:inline-block text-xs text-cyan-400 ml-3 border-l border-slate-700 pl-3 font-mono">
              Clinical Continuity Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onExploreDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Explore Demo
          </button>
          <button
            onClick={onLogin}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center space-x-2"
          >
            <span>Login to Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 pt-16 pb-24 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-6 shadow-inner">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>AI-Powered Patient Continuity & Clinical Handoff Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight">
          “No Critical Patient Information{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Left Behind.
          </span>”
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl font-normal leading-relaxed">
          AI-powered continuity intelligence for safer, more connected hospital workflows. Eliminating information gaps, unacknowledged allergies, and pending report delays across department handoffs.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-500/30 transition flex items-center justify-center space-x-3 transform hover:-translate-y-0.5"
          >
            <span>Experience the MedFlow Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-base transition flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Select Demo Role & Login</span>
          </button>
        </div>

        {/* Demo Banner Notice */}
        <div className="mt-10 text-xs font-mono px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400">
          DEMO ENVIRONMENT — NOT FOR REAL CLINICAL USE • FOR HACKATHON EVALUATION
        </div>
      </section>

      {/* Key Differentiator Banner */}
      <section className="px-6 lg:px-16 py-12 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Architectural Principles</h2>
            <h3 className="text-2xl font-bold text-white mt-1">What MEDFLOW Is vs. Is Not</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What MedFlow IS NOT */}
            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4">
              <div className="flex items-center space-x-3 text-red-400 font-bold text-lg border-b border-red-900/40 pb-3">
                <AlertTriangle className="w-6 h-6" />
                <span>MEDFLOW IS NOT:</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>An AI Doctor or autonomous clinical decision maker</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>A diagnostic engine that diagnoses diseases</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>A prescription or drug recommendation system</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>A replacement for trained healthcare professionals</span>
                </li>
              </ul>
            </div>

            {/* What MedFlow IS */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400 font-bold text-lg border-b border-emerald-900/40 pb-3">
                <CheckCircle2 className="w-6 h-6" />
                <span>MEDFLOW IS:</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>A continuous patient information continuity engine</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>A clinical handoff intelligence & gap detector</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>A pending lab & radiology result tracker</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>An explainable, human-in-the-loop workflow assistant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="px-6 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">The Problem</h2>
          <h3 className="text-3xl font-extrabold text-white mt-2">Information Friction in Hospital Department Handoffs</h3>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm">
            When a patient moves between hospital units, critical health facts get fragmented, buried, or forgotten.
          </p>
        </div>

        {/* Department Flow Diagram */}
        <div className="p-8 rounded-2xl bg-[#0b1329] border border-slate-800 relative overflow-hidden">
          <div className="text-xs font-mono text-slate-400 mb-6 text-center">Typical Fragmented Handoff Corridor</div>
          
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
            {['Emergency', 'Specialist', 'Laboratory', 'Radiology', 'Ward', 'ICU', 'Discharge'].map((dept, idx) => (
              <div key={dept} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] font-mono text-cyan-400">Step 0{idx + 1}</span>
                <span className="text-xs font-bold text-slate-200 mt-1">{dept}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-300 text-xs flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>
              <strong>Clinical Risk Point:</strong> During handoffs, allergies are often unacknowledged, latest vitals are unlogged, and imaging reports remain un-reviewed.
            </span>
          </div>
        </div>
      </section>

      {/* How MedFlow Works */}
      <section className="px-6 lg:px-16 py-20 bg-[#0b1329]/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">How It Works</h2>
            <h3 className="text-3xl font-extrabold text-white mt-2">4-Step Handoff Intelligence Workflow</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-extrabold">1</div>
              <h4 className="text-base font-bold text-slate-100">Continuous Ingestion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingests EHR events, vital streams, lab orders, and nursing charts into one unified patient timeline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-extrabold">2</div>
              <h4 className="text-base font-bold text-slate-100">NLP & Rules Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compares source department charts against receiving unit intake records to isolate missing or inconsistent values.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-extrabold">3</div>
              <h4 className="text-base font-bold text-slate-100">Explainable AI Alerts</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates prioritized alerts with explicit audit trails showing exactly why an alert was triggered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-extrabold">4</div>
              <h4 className="text-base font-bold text-slate-100">Clinical Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowers doctors and nurses to acknowledge, review, and close continuity gaps before finalizing transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Full-Stack Architecture</h2>
          <h3 className="text-2xl font-bold text-white mt-1">Built with Modern Web & AI Technologies</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <Code className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-200">React.js & Vite</div>
            <div className="text-xs text-slate-400 mt-1">Frontend UI & Tailwind CSS</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <Layers className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-200">Node.js & Express</div>
            <div className="text-xs text-slate-400 mt-1">REST API Backend Services</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <Database className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-200">MongoDB Ready</div>
            <div className="text-xs text-slate-400 mt-1">Dual-Mode Persistence Store</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-200">AI Rules Engine</div>
            <div className="text-xs text-slate-400 mt-1">NLP Comparison Engine</div>
          </div>
        </div>
      </section>

      {/* CTA & Final Message */}
      <section className="px-6 lg:px-16 py-20 bg-gradient-to-b from-[#0b1329] to-[#080d1a] border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            “Every department sees the same patient story — complete, current and connected.”
          </h2>
          <p className="text-slate-400 text-sm">
            Ready to evaluate the MedFlow clinical continuity hackathon prototype?
          </p>

          <button
            onClick={onExploreDemo}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-500/30 transition inline-flex items-center space-x-3"
          >
            <span>Experience the MedFlow Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Team Credits Footer */}
      <footer className="px-6 lg:px-12 py-8 bg-[#050812] border-t border-slate-900 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-300 text-sm">MEDFLOW Project Team</div>
            <div className="text-slate-400 mt-1">
              Team Leader: <strong className="text-cyan-400 font-mono">Kavya Sunkesula — VTU30916</strong>
            </div>
            <div className="text-slate-400">
              Team Members: <span className="text-slate-300">Amrutha Valli — VTU31148</span> | <span className="text-slate-300">L. Manvitha — VTU32952</span>
            </div>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] text-slate-600">
            <div>Healthcare AI Hackathon Prototype</div>
            <div>© 2026 MEDFLOW • All Rights Reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
