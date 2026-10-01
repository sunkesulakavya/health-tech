import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Search, Bell, Shield, User, ChevronDown, LogOut, 
  AlertTriangle, FileText, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { api } from '../services/api';

export default function Navbar({ currentUser, onLogout, onSelectPatient, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Input
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      setShowSearchDropdown(true);
      const res = await api.getPatients(query);
      if (res.success) {
        setSearchResults(res.data);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  const handlePatientClick = (patientId) => {
    onSelectPatient(patientId);
    setShowSearchDropdown(false);
    setSearchQuery('');
    onNavigate('patients');
  };

  const notifications = [
    {
      id: 1,
      type: 'high',
      title: 'High Priority Allergy Alert',
      desc: 'Penicillin allergy requires verification for Ravi Kumar (P-1001)',
      time: '10 mins ago',
      action: () => { onSelectPatient('P-1001'); onNavigate('ai-gap-detector'); }
    },
    {
      id: 2,
      type: 'pending',
      title: 'CT Brain Report Awaiting Review',
      desc: 'Radiology report uploaded for Ravi Kumar (P-1001)',
      time: '25 mins ago',
      action: () => { onNavigate('pending-reports'); }
    },
    {
      id: 3,
      type: 'handoff',
      title: 'Department Handoff Completed',
      desc: 'Anita Rao (P-1002) transferred to Ward',
      time: '1 hour ago',
      action: () => { onNavigate('handoff-monitor'); }
    }
  ];

  return (
    <header className="h-16 bg-[#0b1329]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
      {/* Brand & Security Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
              MEDFLOW
            </span>
          </div>
        </div>

        {/* Security Indicator */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Secure Clinical Workspace</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-md mx-4" ref={searchRef}>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search patient by Name, ID (P-1001), or Department..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 border-b border-slate-800/80">
              {isSearching ? 'Searching database...' : searchResults.length > 0 ? 'Matching Patients' : 'No patients found'}
            </div>
            <div className="max-h-64 overflow-y-auto">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className="p-3 hover:bg-slate-800/70 cursor-pointer flex items-center justify-between border-b border-slate-800/40 last:border-0 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 flex items-center justify-center font-bold text-xs">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                        <span>{patient.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          {patient.id}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {patient.age} y/o {patient.gender} • Dept: <span className="text-cyan-400 font-medium">{patient.currentDepartment}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    patient.handoffRisk === 'High' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                    patient.handoffRisk === 'Medium' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {patient.handoffRisk} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center space-x-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 lg:w-96 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Clinical Notifications</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40">3 Active</span>
              </div>
              <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => { n.action(); setShowNotifications(false); }}
                    className="p-3 hover:bg-slate-800/60 cursor-pointer transition flex items-start space-x-3"
                  >
                    {n.type === 'high' ? (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    ) : n.type === 'pending' ? (
                      <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-200">{n.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{n.desc}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2.5 p-1.5 pl-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs">
              {currentUser?.name ? currentUser.name.charAt(3) || 'S' : 'D'}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200 leading-tight">{currentUser?.name || 'Dr. Sarah'}</div>
              <div className="text-[10px] text-cyan-400 leading-tight">{currentUser?.role || 'Doctor (Neurology)'}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-semibold text-slate-200">{currentUser?.name}</div>
                <div className="text-[10px] text-slate-400">{currentUser?.email}</div>
              </div>
              <button
                onClick={onLogout}
                className="w-full mt-1 flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Role / Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
