import React, { useState, useEffect } from 'react';
import { 
  Users, FileClock, AlertOctagon, Cpu, ArrowRightLeft, Search, 
  ChevronRight, Eye, ShieldAlert, Sparkles, Filter, CheckCircle2 
} from 'lucide-react';
import { api } from '../services/api';

export default function DoctorDashboard({ currentUser, onSelectPatient, onNavigate, onOpenTransferModal }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState('All');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getPatients();
      if (res.success) {
        setPatients(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredPatients = patients.filter((p) => {
    if (filterRisk === 'All') return true;
    return p.handoffRisk === filterRisk;
  });

  return (
    <div className="p-4 lg:p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
              Good morning, {currentUser?.name || 'Dr. Sarah'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              {currentUser?.department || 'Neurology'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Clinical Handoff & Continuity Dashboard • Real-time patient information monitoring active
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenTransferModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center space-x-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Transfer Patient</span>
          </button>

          <button
            onClick={() => onNavigate('ai-gap-detector')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Run Handoff AI Check</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Patients */}
        <div 
          onClick={() => onNavigate('patients')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Patients</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">12</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
            <span>In Neurology & Wards</span>
          </div>
        </div>

        {/* Pending Reports */}
        <div 
          onClick={() => onNavigate('pending-reports')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Reports</span>
            <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileClock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400 mt-3">4</div>
          <div className="text-[11px] text-amber-400/80 mt-1 flex items-center space-x-1">
            <span>Awaiting radiologist review</span>
          </div>
        </div>

        {/* Handoff Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Handoff Alerts</span>
            <div className="w-9 h-9 rounded-xl bg-red-950 text-red-400 border border-red-800/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-red-400 mt-3">3</div>
          <div className="text-[11px] text-red-400/80 mt-1">Requires clinical verification</div>
        </div>

        {/* Critical Information Gaps */}
        <div 
          onClick={() => onNavigate('ai-gap-detector')}
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Info Gaps Detected</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-300 mt-3">2</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>AI Continuity Engine Alert</span>
          </div>
        </div>
      </div>

      {/* Main Table: Patients Requiring Attention */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="p-5 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>PATIENTS REQUIRING ATTENTION</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Patients currently in transition or flagged with potential clinical handoff information gaps
            </p>
          </div>

          {/* Risk Filter Buttons */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['All', 'High', 'Medium', 'Low'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  filterRisk === risk
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {risk} Risk
              </button>
            ))}
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient ID</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Current Department</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Handoff Risk</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredPatients.map((p) => (
                <tr 
                  key={p.id} 
                  className={`hover:bg-slate-800/50 transition ${
                    p.id === 'P-1001' ? 'bg-cyan-950/20 border-l-4 border-l-cyan-500' : ''
                  }`}
                >
                  <td className="py-4 px-4 font-mono font-bold text-cyan-400">{p.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-100 flex items-center space-x-2">
                    <span>{p.name}</span>
                    {p.id === 'P-1001' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                        DEMO FOCUS
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-300">{p.age} y/o • {p.gender}</td>
                  <td className="py-4 px-4 font-semibold text-slate-200">{p.currentDepartment}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                      p.status === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      p.status === 'Under Observation' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      p.handoffRisk === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm' :
                      p.handoffRisk === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {p.handoffRisk} Risk
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => {
                        onSelectPatient(p.id);
                        onNavigate('patient-detail');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs transition inline-flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
