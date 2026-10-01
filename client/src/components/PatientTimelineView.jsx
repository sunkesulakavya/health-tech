import React, { useState, useEffect } from 'react';
import { 
  Clock, Building2, User, FileText, Activity, AlertTriangle, 
  CheckCircle2, ChevronRight, ArrowDown, Sparkles 
} from 'lucide-react';
import { api } from '../services/api';

export default function PatientTimelineView({ patientId, onNavigate }) {
  const [patient, setPatient] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await api.getPatientById(patientId || 'P-1001');
      if (res.success) {
        setPatient(res.data);
        if (res.data.timeline?.length > 0) {
          setSelectedEvent(res.data.timeline[0]);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [patientId]);

  if (loading || !patient) {
    return <div className="p-8 text-center text-slate-400 font-mono">Loading patient timeline...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-cyan-950/60 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Continuous Timeline</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800">
              {patient.id}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-1">
            Patient Journey — {patient.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactive multi-department continuity log • Click any timeline event to inspect recorded clinical state
          </p>
        </div>

        <button
          onClick={() => onNavigate('ai-gap-detector')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze Handoff Gaps</span>
        </button>
      </div>

      {/* Main Grid: Timeline + Event Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800/80 shadow-xl relative">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-between">
              <span>Departmental Transition Timeline</span>
              <span className="text-cyan-400 font-mono">{patient.timeline?.length || 0} Events Logged</span>
            </div>

            {/* Vertical Line */}
            <div className="absolute left-8 lg:left-12 top-20 bottom-10 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-slate-800"></div>

            <div className="space-y-6 relative">
              {patient.timeline?.map((ev, idx) => {
                const isSelected = selectedEvent?.id === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className={`relative pl-12 lg:pl-16 pr-4 py-4 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    {/* Node Dot */}
                    <div className={`absolute left-3.5 lg:left-7 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center -translate-x-1/2 transition ${
                      isSelected ? 'bg-cyan-500 border-white scale-125 shadow-lg shadow-cyan-500/50' : 'bg-slate-900 border-cyan-500'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold text-xs">
                          {ev.time}
                        </span>
                        <span className="text-xs font-black uppercase text-slate-100 font-mono tracking-wider">
                          {ev.department}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{ev.staff}</span>
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-100 mt-2">{ev.event}</div>

                    {ev.notes && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{ev.notes}</p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {ev.vitals && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono border border-slate-800">
                          {ev.vitals}
                        </span>
                      )}
                      {ev.documents?.map((doc, dIdx) => (
                        <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-cyan-400" />
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Event Detail Inspector */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-slate-800/80 shadow-xl sticky top-20 space-y-5">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Event Detail Inspector</span>
              <span className="text-[10px] font-mono text-slate-500">Click event to view</span>
            </div>

            {selectedEvent ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">Department & Timestamp</div>
                  <div className="text-lg font-black text-white mt-0.5">{selectedEvent.department}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">Recorded at {selectedEvent.time}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Recorded Event</div>
                  <div className="text-xs text-slate-200 font-semibold p-3 rounded-xl bg-slate-900 border border-slate-800">
                    {selectedEvent.event}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Attending Clinician / Staff</div>
                  <div className="text-xs text-cyan-300 font-semibold p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>{selectedEvent.staff}</span>
                  </div>
                </div>

                {selectedEvent.notes && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Clinical Notes</div>
                    <div className="text-xs text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed">
                      {selectedEvent.notes}
                    </div>
                  </div>
                )}

                {selectedEvent.documents && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Attached Documents</div>
                    <div className="space-y-1.5">
                      {selectedEvent.documents.map((doc, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-200">
                          <span className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-cyan-400" />
                            <span>{doc}</span>
                          </span>
                          <span className="text-[10px] text-cyan-400 font-mono font-bold">Attached</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                Select a timeline node on the left to inspect detailed clinical logs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
