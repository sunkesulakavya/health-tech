import React, { useState, useEffect } from 'react';
import { AlertOctagon, ShieldCheck, CheckCircle2, Eye, Filter, HelpCircle } from 'lucide-react';
import { api } from '../services/api';
import ExplainableModal from './ExplainableModal';

export default function AlertCenterView({ currentUser, onNavigate }) {
  const [alerts, setAlerts] = useState([]);
  const [filterPriority, setFilterPriority] = useState('All');
  const [activeExplainable, setActiveExplainable] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    setLoading(true);
    const res = await api.getAlerts();
    if (res.success) {
      setAlerts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAcknowledge = async (alertId) => {
    const user = currentUser?.name || 'Dr. Sarah';
    const res = await api.acknowledgeAlert(alertId, user);
    if (res.success) fetchAlerts();
  };

  const handleResolve = async (alertId) => {
    const user = currentUser?.name || 'Dr. Sarah';
    const res = await api.resolveAlert(alertId, user);
    if (res.success) fetchAlerts();
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterPriority === 'All') return true;
    return a.priority.toLowerCase() === filterPriority.toLowerCase();
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">CONTINUITY ALERTS</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            ALERT CENTER
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prioritized information continuity alerts requiring clinician verification
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterPriority === p ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Table */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Alert Type</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredAlerts.map((a) => (
                <tr key={a.id} className="hover:bg-slate-800/50 transition">
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                      a.priority === 'Critical' ? 'bg-red-600 text-white animate-pulse' :
                      a.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      a.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {a.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-100">{a.patientName}</td>
                  <td className="py-4 px-4 font-bold text-cyan-300">{a.alertType}</td>
                  <td className="py-4 px-4 text-slate-300">{a.department}</td>
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">{a.time}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      a.status === 'Active' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      a.status === 'Acknowledged' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setActiveExplainable(a)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-[11px] transition inline-flex items-center space-x-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Why Alert?</span>
                      </button>

                      {a.status === 'Active' && (
                        <button
                          onClick={() => handleAcknowledge(a.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition inline-flex items-center space-x-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Acknowledge</span>
                        </button>
                      )}

                      {a.status !== 'Resolved' && (
                        <button
                          onClick={() => handleResolve(a.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition inline-flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeExplainable && (
        <ExplainableModal
          alert={activeExplainable}
          onClose={() => setActiveExplainable(null)}
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}
