import React, { useState, useEffect } from 'react';
import { 
  User, Activity, Heart, Droplets, Thermometer, ShieldAlert, FileText, 
  Clock, Cpu, ArrowRightLeft, CheckCircle2, AlertTriangle, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { api } from '../services/api';

export default function PatientDetailView({ patientId, onNavigate, onOpenTransferModal }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      setLoading(true);
      const res = await api.getPatientById(patientId || 'P-1001');
      if (res.success) {
        setPatient(res.data);
      }
      setLoading(false);
    }
    fetchPatient();
  }, [patientId]);

  if (loading || !patient) {
    return (
      <div className="p-8 text-center text-slate-400 font-mono">
        Loading clinical patient record...
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs text-slate-400 hover:text-cyan-400 font-semibold flex items-center space-x-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('timeline')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition flex items-center space-x-2"
          >
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>View Continuous Timeline</span>
          </button>

          <button
            onClick={() => onNavigate('ai-gap-detector')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Analyze Handoff Gaps</span>
          </button>

          <button
            onClick={onOpenTransferModal}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/20 transition flex items-center space-x-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Transfer Patient</span>
          </button>
        </div>
      </div>

      {/* Main Patient Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-cyan-500/30">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl lg:text-3xl font-black text-white">{patient.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold text-xs">
                {patient.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs">
                {patient.status}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1.5 flex flex-wrap items-center gap-3 font-medium">
              <span>Age: <strong className="text-slate-200">{patient.age}</strong></span>
              <span>•</span>
              <span>Gender: <strong className="text-slate-200">{patient.gender}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong className="text-cyan-400 font-bold">{patient.bloodGroup}</strong></span>
              <span>•</span>
              <span>Department: <strong className="text-slate-200">{patient.currentDepartment}</strong></span>
            </div>
          </div>
        </div>

        {/* Allergy High Priority Alert Box */}
        {patient.allergy && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 flex items-center space-x-3 shadow-lg shadow-red-900/10">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono">HIGH PRIORITY ALLERGY</div>
              <div className="text-sm font-extrabold text-white">{patient.allergy}</div>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 1 & 2: Vitals & Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* VITALS CARD */}
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
                <Heart className="w-4 h-4 text-cyan-400" />
                <span>2. CURRENT VITALS</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500">Last updated: 12:00 PM</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</div>
                <div className="text-xl font-extrabold text-red-400 mt-1">{patient.vitals.bp}</div>
                <span className="text-[10px] text-red-400 font-semibold">Elevated (Hypertensive)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Blood Sugar</div>
                <div className="text-xl font-extrabold text-amber-400 mt-1">{patient.vitals.sugar}</div>
                <span className="text-[10px] text-amber-400 font-semibold">Above normal</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate</div>
                <div className="text-xl font-extrabold text-slate-100 mt-1">{patient.vitals.heartRate}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">Normal sinus</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">SpO2</div>
                <div className="text-xl font-extrabold text-cyan-400 mt-1">{patient.vitals.spO2}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">Normal oxygenation</span>
              </div>
            </div>
          </div>

          {/* SECTION 5: ACTIVE CONDITIONS / REASONS FOR CARE */}
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>5. ACTIVE CONDITIONS / REASONS FOR CARE</span>
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                NON-DIAGNOSTIC SYMPTOM RECORD
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {patient.reasonsForCare?.map((reason, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200">
                  • {reason}
                </span>
              ))}
            </div>

            {/* Crucial Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Clinical Note:</strong> Symptoms listed above are recorded from intake documentation. MEDFLOW does not produce autonomous medical diagnoses or treatment prescriptions.
              </span>
            </div>
          </div>

          {/* SECTION 3: CURRENT MEDICATIONS */}
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>3. CURRENT MEDICATIONS</span>
              </h2>
              <span className="text-[10px] font-mono text-cyan-400">DEMO DATA RECORD</span>
            </div>

            <div className="space-y-2">
              {patient.medications?.map((med, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{med.name}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400 text-[11px]">{med.time}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 & 6: Allergies & Investigations */}
        <div className="space-y-6">
          {/* ALLERGIES CARD */}
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>4. ALLERGIES</span>
            </h2>

            <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/50 text-center">
              <div className="text-xs text-red-300 font-semibold">Documented Severe Allergy</div>
              <div className="text-xl font-black text-white mt-1">{patient.allergy || 'None Known'}</div>
              <div className="text-[10px] text-red-400 mt-2 font-mono">
                Requires clinical acknowledgment at every handoff!
              </div>
            </div>
          </div>

          {/* INVESTIGATIONS CARD */}
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>6. INVESTIGATIONS</span>
            </h2>

            <div className="space-y-2.5">
              {patient.investigations?.map((inv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{inv.title}</div>
                    <div className="text-[10px] text-slate-400">{inv.dept} • {inv.time}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    inv.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('pending-reports')}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-bold text-xs transition"
            >
              Open Pending Reports Tracker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
