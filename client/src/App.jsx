import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDetailView from './components/PatientDetailView';
import PatientTimelineView from './components/PatientTimelineView';
import HandoffMonitorView from './components/HandoffMonitorView';
import HandoffGapDetectorView from './components/HandoffGapDetectorView';
import PendingReportsView from './components/PendingReportsView';
import AlertCenterView from './components/AlertCenterView';
import DepartmentsView from './components/DepartmentsView';
import AdminAnalyticsView from './components/AdminAnalyticsView';
import AuditLogView from './components/AuditLogView';
import TransferModal from './components/TransferModal';
import JudgeDemoGuideModal from './components/JudgeDemoGuideModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [selectedHandoff, setSelectedHandoff] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    showToast(`Welcome ${user.name} (${user.role})`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const navigateTo = (viewId) => {
    setCurrentView(viewId);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-200 text-xs font-bold shadow-2xl animate-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Render Public Landing Page */}
      {currentView === 'landing' && (
        <LandingPage
          onExploreDemo={() => navigateTo('login')}
          onLogin={() => navigateTo('login')}
        />
      )}

      {/* Render Login Page */}
      {currentView === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => navigateTo('landing')}
        />
      )}

      {/* Main Authenticated Dashboard Shell */}
      {currentView !== 'landing' && currentView !== 'login' && (
        <div className="min-h-screen flex flex-col">
          {/* Top Bar Navigation */}
          <Navbar
            currentUser={currentUser}
            onLogout={handleLogout}
            onSelectPatient={(id) => setSelectedPatientId(id)}
            onNavigate={navigateTo}
          />

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <Sidebar
              currentTab={currentView}
              onNavigate={navigateTo}
              onOpenTransferModal={() => setShowTransferModal(true)}
              onOpenDemoGuide={() => setShowDemoGuide(true)}
            />

            {/* Main Dynamic View Content */}
            <main className="flex-1 overflow-y-auto bg-[#080d1a]">
              {currentView === 'dashboard' && (
                <DoctorDashboard
                  currentUser={currentUser}
                  onSelectPatient={(id) => setSelectedPatientId(id)}
                  onNavigate={navigateTo}
                  onOpenTransferModal={() => setShowTransferModal(true)}
                />
              )}

              {(currentView === 'patient-detail' || currentView === 'patients') && (
                <PatientDetailView
                  patientId={selectedPatientId}
                  onNavigate={navigateTo}
                  onOpenTransferModal={() => setShowTransferModal(true)}
                />
              )}

              {currentView === 'timeline' && (
                <PatientTimelineView
                  patientId={selectedPatientId}
                  onNavigate={navigateTo}
                />
              )}

              {currentView === 'handoff-monitor' && (
                <HandoffMonitorView
                  onNavigate={navigateTo}
                  onSelectHandoffForGapAnalysis={(h) => {
                    setSelectedHandoff(h);
                    setSelectedPatientId(h.patientId);
                  }}
                />
              )}

              {currentView === 'ai-gap-detector' && (
                <HandoffGapDetectorView
                  patientId={selectedPatientId}
                  selectedHandoff={selectedHandoff}
                  onNavigate={navigateTo}
                />
              )}

              {currentView === 'pending-reports' && (
                <PendingReportsView
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                />
              )}

              {currentView === 'alerts' && (
                <AlertCenterView
                  currentUser={currentUser}
                  onNavigate={navigateTo}
                />
              )}

              {currentView === 'departments' && (
                <DepartmentsView onNavigate={navigateTo} />
              )}

              {currentView === 'analytics' && (
                <AdminAnalyticsView />
              )}

              {currentView === 'audit-log' && (
                <AuditLogView />
              )}

              {currentView === 'settings' && (
                <div className="p-8 max-w-4xl mx-auto space-y-4">
                  <h1 className="text-2xl font-bold text-white">System Settings & Data Store Config</h1>
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300">
                    <div>Mode: <strong className="text-cyan-400">DEMO IN-MEMORY persistence (MongoDB Ready)</strong></div>
                    <div>AI Engine: <strong className="text-cyan-400">Deterministic Rules + NLP Comparison Engine</strong></div>
                    <div>Port: <strong className="text-cyan-400">5000 (Backend) / 5173 (Frontend)</strong></div>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 font-mono">
                      MEDFLOW Clinical Continuity Platform • Version 1.0.0 Hackathon Build
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Global Transfer Modal */}
      {showTransferModal && (
        <TransferModal
          onClose={() => setShowTransferModal(false)}
          onTransferComplete={(data) => {
            showToast(`Patient transferred to ${data.handoff.toDept}`);
            navigateTo('handoff-monitor');
          }}
        />
      )}

      {/* Global Judge Demo Guide Modal */}
      {showDemoGuide && (
        <JudgeDemoGuideModal
          onClose={() => setShowDemoGuide(false)}
          onNavigateStep={(targetView) => {
            if (targetView === 'login') {
              setCurrentUser(null);
              navigateTo('login');
            } else {
              if (!currentUser) {
                setCurrentUser({ name: 'Dr. Sarah', role: 'Doctor', department: 'Neurology' });
              }
              navigateTo(targetView);
            }
          }}
        />
      )}
    </div>
  );
}
