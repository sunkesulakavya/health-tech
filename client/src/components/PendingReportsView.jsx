import React, { useState, useEffect } from 'react';
import { FileClock, CheckCircle2, FileText, Search, User, Filter, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';

export default function PendingReportsView({ currentUser, onNavigate }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const res = await api.getPendingReports();
    if (res.success) {
      setReports(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleMarkReviewed = async (reportId) => {
    const reviewer = currentUser?.name || 'Dr. Sarah';
    const res = await api.markReportReviewed(reportId, reviewer);
    if (res.success) {
      fetchReports();
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">DIAGNOSTIC WORKFLOW</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            PENDING REPORT TRACKER
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track unreviewed lab and imaging investigation reports across departments to prevent diagnostic delays
          </p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-2xl bg-[#0b1329] border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="p-5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <FileClock className="w-4 h-4 text-amber-400" />
            <span>PENDING CLINICAL INVESTIGATIONS ({reports.length})</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Investigation</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Requested</th>
                <th className="py-3.5 px-4">Completed</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Report Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/50 transition">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-100">{r.patientName}</div>
                    <div className="text-[10px] font-mono text-cyan-400">{r.patientId}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-cyan-300 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{r.investigation}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{r.department}</td>
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">{r.requested}</td>
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">{r.completed}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      r.priority === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {r.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      r.reviewed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                    }`}>
                      {r.reportStatus}
                    </span>
                    {r.reviewedBy && (
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        By {r.reviewedBy} at {r.reviewedAt}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {!r.reviewed ? (
                      <button
                        onClick={() => handleMarkReviewed(r.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition inline-flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Reviewed</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Reviewed</span>
                      </span>
                    )}
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
