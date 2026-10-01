import React, { useState } from 'react';
import { Activity, Shield, Lock, Mail, UserCheck, ArrowRight, Sparkles, Stethoscope, HeartPulse, UserCog } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onBackToLanding }) {
  const [email, setEmail] = useState('sarah.neurology@hospital.org');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Doctor');

  const handleCustomLogin = (e) => {
    e.preventDefault();
    onLoginSuccess({
      email,
      role,
      name: role === 'Doctor' ? 'Dr. Sarah' : role === 'Nurse' ? 'Nurse Anjali' : role === 'Admin' ? 'Chief Admin' : 'Dept Staff',
      department: role === 'Doctor' ? 'Neurology' : role === 'Nurse' ? 'Ward' : 'Administration'
    });
  };

  const handleQuickDemo = (demoRole) => {
    let demoUser = {};
    if (demoRole === 'Doctor') {
      demoUser = { email: 'sarah.neurology@medflow.org', role: 'Doctor', name: 'Dr. Sarah', department: 'Neurology' };
    } else if (demoRole === 'Nurse') {
      demoUser = { email: 'anjali.ward@medflow.org', role: 'Nurse', name: 'Nurse Anjali', department: 'Ward 4' };
    } else if (demoRole === 'Admin') {
      demoUser = { email: 'admin@medflow.org', role: 'Admin', name: 'System Admin', department: 'Clinical Ops' };
    }
    onLoginSuccess(demoUser);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-cyan-500 selection:text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-[#0b1329] border border-slate-800 shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left Panel - Branding */}
        <div className="relative p-8 lg:p-12 bg-gradient-to-br from-slate-900 via-[#0b1329] to-cyan-950/60 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <button
              onClick={onBackToLanding}
              className="text-xs text-slate-400 hover:text-cyan-400 font-semibold mb-8 flex items-center space-x-1 transition"
            >
              <span>← Back to Overview</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                MEDFLOW
              </span>
            </div>

            <p className="text-sm font-semibold text-cyan-400 mt-4 font-mono">
              AI-Powered Patient Continuity & Clinical Handoff Intelligence
            </p>

            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mt-6 leading-snug">
              “No Critical Patient Information Left Behind.”
            </h2>

            <p className="text-slate-400 text-xs mt-4 leading-relaxed">
              Designed for hospital clinicians to prevent unacknowledged allergies, missing vital streams, and unreviewed imaging reports across multi-department transfers.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
              <Shield className="w-4 h-4" />
              <span>Role-Based Secure Clinical Access</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Demo Environment • No Real Patient Data Stored
            </div>
          </div>
        </div>

        {/* Right Panel - Login Card */}
        <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Workspace Portal Login</h3>
            <p className="text-xs text-slate-400 mt-1">Select a demo role or enter credentials to proceed</p>
          </div>

          {/* Quick Judge Demo Accounts (Primary CTA for Hackathon) */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Hackathon Judge Demos</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Doctor')}
                className="py-2 px-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 font-bold text-xs flex flex-col items-center space-y-1 transition group"
              >
                <Stethoscope className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Doctor Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('Nurse')}
                className="py-2 px-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 text-blue-300 font-bold text-xs flex flex-col items-center space-y-1 transition group"
              >
                <HeartPulse className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span>Nurse Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('Admin')}
                className="py-2 px-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-purple-300 font-bold text-xs flex flex-col items-center space-y-1 transition group"
              >
                <UserCog className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-[#0b1329] px-3 text-[10px] text-slate-400 font-mono uppercase">or sign in with email</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
              <div className="relative">
                <UserCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none transition appearance-none"
                >
                  <option value="Doctor">Doctor (Clinical Lead)</option>
                  <option value="Nurse">Nurse (Patient Care)</option>
                  <option value="Department Staff">Department Staff</option>
                  <option value="Admin">Admin (Clinical Ops)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
            >
              <span>Login to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
