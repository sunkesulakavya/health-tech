import React, { useState, useEffect } from 'react';
import { Building2, Users, ArrowRightLeft, FileClock, AlertOctagon, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function DepartmentsView({ onNavigate }) {
  const [deptOverview, setDeptOverview] = useState([]);
  const [visualFlow, setVisualFlow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getDepartmentOverview();
      if (res.success) {
        setDeptOverview(res.data);
        setVisualFlow(res.visualFlow);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">CLINICAL OPERATIONAL VIEW</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            DEPARTMENT OVERVIEW & PATIENT FLOW
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Inter-department patient movement pipeline and clinical workload monitoring
          </p>
        </div>
      </div>

      {/* Visual Hospital Flow Pipeline */}
      <div className="p-6 rounded-3xl bg-[#0b1329] border border-slate-800/80 shadow-xl space-y-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center justify-between">
          <span>VISUAL HOSPITAL PATIENT FLOW PIPELINE</span>
          <span className="text-cyan-400">Real-Time Ingestion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {visualFlow.map((step, idx) => (
            <div key={idx} className="relative p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center">
              <span className="text-[10px] font-mono text-cyan-400 font-bold">STAGE 0{step.step}</span>
              <div className="text-sm font-extrabold text-white mt-1">{step.name}</div>
              <div className="text-2xl font-black text-cyan-400 mt-2">{step.count} Patients</div>

              {idx < visualFlow.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-[#0b1329] p-1 rounded-full border border-slate-700 text-cyan-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deptOverview.map((dept) => (
          <div key={dept.department} className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800/80 hover:border-cyan-500/40 transition shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">{dept.department}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-800">
                {dept.patientCount} Patients
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Handoffs</div>
                <div className="text-base font-extrabold text-cyan-400 mt-0.5">{dept.pendingHandoffs}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Reports</div>
                <div className="text-base font-extrabold text-amber-400 mt-0.5">{dept.pendingReports}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Alerts</div>
                <div className="text-base font-extrabold text-red-400 mt-0.5">{dept.openAlerts}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/60">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Patients in Department</div>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {dept.patients?.map((p) => (
                  <div key={p.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{p.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{p.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
