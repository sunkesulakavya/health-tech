import React, { useState, useEffect } from 'react';
import { History, User, Clock, Building2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function AuditLogView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getAuditLogs();
      if (res.success) {
        setLogs(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">CLINICAL GOVERNANCE</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            CLINICAL AUDIT LOG
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable tracking of user actions, alert acknowledgments, report reviews, and patient transfers
          </p>
        </div>
      </div>

      {/* Audit Table */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Action Performed</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition">
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">{log.timestamp}</td>
                  <td className="py-4 px-4 font-bold text-cyan-300 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{log.user}</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-100">{log.action}</td>
                  <td className="py-4 px-4 text-slate-300 font-bold">{log.patient}</td>
                  <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">{log.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
