import React, { useState, useEffect } from 'react';
import { LineChart, BarChart2, PieChart, Users, ArrowRightLeft, AlertOctagon, FileClock, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function AdminAnalyticsView() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getAnalytics();
      if (res.success) {
        setAnalytics(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || !analytics) {
    return <div className="p-8 text-center text-slate-400 font-mono">Loading clinical analytics data...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">EXECUTIVE REPORTING</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            ADMIN ANALYTICS & HANDOFF METRICS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Hospital-wide information gap trends, departmental throughput, and continuity quality indicators
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Patients</div>
          <div className="text-3xl font-black text-white mt-2">{analytics.totalPatients}</div>
          <div className="text-[10px] text-slate-500 mt-1">Across all hospital units</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase">Active Handoffs</div>
          <div className="text-3xl font-black text-cyan-400 mt-2">{analytics.activeHandoffs}</div>
          <div className="text-[10px] text-cyan-400 mt-1">Transfers currently in motion</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase">Open Alerts</div>
          <div className="text-3xl font-black text-red-400 mt-2">{analytics.openAlerts}</div>
          <div className="text-[10px] text-red-400 mt-1">Requires clinical verification</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase">Pending Reports</div>
          <div className="text-3xl font-black text-amber-400 mt-2">{analytics.pendingReports}</div>
          <div className="text-[10px] text-amber-400 mt-1">Awaiting radiologist review</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Handoffs per Department Bar Chart */}
        <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>HANDOFFS PER DEPARTMENT</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Monthly Volume</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.handoffsPerDepartment?.map((item) => {
              const maxVal = 20;
              const pct = (item.count / maxVal) * 100;
              return (
                <div key={item.department} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.department}</span>
                    <span className="text-cyan-400 font-mono font-bold">{item.count} handoffs</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Information Gap Types Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>INFORMATION GAP TYPES</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Breakdown %</span>
          </div>

          <div className="space-y-4 pt-2">
            {analytics.gapTypes?.map((gap) => (
              <div key={gap.type} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: gap.color }}></div>
                  <span className="text-xs font-bold text-slate-200">{gap.type}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-slate-400">{gap.count} cases</span>
                  <span className="font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {gap.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
