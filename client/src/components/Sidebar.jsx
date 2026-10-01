import React from 'react';
import { 
  LayoutDashboard, Users, Clock, ArrowRightLeft, Cpu, FileClock, 
  AlertOctagon, Building2, LineChart, History, Settings, Sparkles
} from 'lucide-react';

export default function Sidebar({ currentTab, onNavigate, onOpenTransferModal, onOpenDemoGuide }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'timeline', label: 'Patient Timeline', icon: Clock },
    { id: 'handoff-monitor', label: 'Handoff Monitor', icon: ArrowRightLeft },
    { id: 'ai-gap-detector', label: 'AI Gap Detector', icon: Cpu, badge: 'CORE AI', special: true },
    { id: 'pending-reports', label: 'Pending Reports', icon: FileClock, count: 4 },
    { id: 'alerts', label: 'Alert Center', icon: AlertOctagon, count: 3, alert: true },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'audit-log', label: 'Audit Log', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0b1329] border-r border-slate-800/80 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-3 space-y-1">
        {/* Hackathon Judge Demo Shortcut Button */}
        <button
          onClick={onOpenDemoGuide}
          className="w-full mb-3 p-2.5 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-between shadow-lg shadow-cyan-900/20 hover:border-cyan-400 transition"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Judge Demo Walkthrough</span>
          </div>
          <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300 font-mono">11 STEPS</span>
        </button>

        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
          Main Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                isActive
                  ? item.special
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/40'
                    : 'bg-slate-800/90 text-cyan-400 border border-cyan-500/30 shadow-md'
                  : item.special
                  ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 hover:bg-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? (item.special ? 'text-white' : 'text-cyan-400') : 'text-slate-400 group-hover:text-cyan-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-mono">
                  {item.badge}
                </span>
              )}

              {item.count && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.alert ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Patient Transfer Demo Button */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={onOpenTransferModal}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition flex items-center justify-center space-x-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Transfer Patient Demo</span>
        </button>
        <div className="text-[10px] text-center text-slate-400 mt-2 font-mono">
          MEDFLOW v1.0 • Hackathon Edition
        </div>
      </div>
    </aside>
  );
}
