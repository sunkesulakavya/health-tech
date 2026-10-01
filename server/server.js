const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dataStore = require('./dataStore');
const aiEngine = require('./aiEngine');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Header logging middleware
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// System Status & Disclaimer
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'MEDFLOW AI-Powered Patient Continuity Engine',
    mode: 'DEMO ENVIRONMENT — NOT FOR REAL CLINICAL USE',
    mongoConnected: false,
    timestamp: new Date().toISOString()
  });
});

// 1. GET ALL PATIENTS (With Search Support)
app.get('/api/patients', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  let patients = dataStore.getPatients();

  if (query) {
    patients = patients.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.currentDepartment.toLowerCase().includes(query)
    );
  }

  res.json({ success: true, count: patients.length, data: patients });
});

// 2. GET SINGLE PATIENT
app.get('/api/patients/:id', (req, res) => {
  const patient = dataStore.getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }
  res.json({ success: true, data: patient });
});

// 3. HANDOFF MONITOR LIST
app.get('/api/handoffs', (req, res) => {
  res.json({ success: true, data: dataStore.getHandoffs() });
});

// 4. CORE FEATURE: AI HANDOFF GAP DETECTOR ANALYSIS
app.post('/api/handoffs/analyze', (req, res) => {
  const { patientId, previousDept, receivingDept } = req.body;
  const patient = dataStore.getPatientById(patientId || 'P-1001');

  const prevRec = patient?.departmentRecords?.[previousDept || 'Emergency'] || {
    department: 'Emergency Department',
    bp: '168/102',
    sugar: '190',
    allergy: 'Penicillin',
    medication: 'Paracetamol 500mg IV, Mannitol 20%',
    symptoms: 'Severe headache, Dizziness, Vomiting',
    ct: 'Ordered'
  };

  const recRec = patient?.departmentRecords?.[receivingDept || 'Neurology'] || {
    department: 'Neurology',
    bp: 'Not recorded',
    sugar: '190',
    allergy: 'Not acknowledged',
    medication: 'Incomplete',
    symptoms: 'Severe headache',
    ct: 'Completed (Final report pending)'
  };

  const result = aiEngine.analyzeHandoffGap(prevRec, recRec, patient);

  res.json({
    success: true,
    patientId: patient?.id || 'P-1001',
    patientName: patient?.name || 'Ravi Kumar',
    previousDepartmentRecord: prevRec,
    receivingDepartmentRecord: recRec,
    aiAnalysis: result
  });
});

// 5. AI PRE-TRANSFER READINESS CHECK
app.post('/api/handoffs/pre-transfer-check', (req, res) => {
  const { patientId, targetDepartment } = req.body;
  const patient = dataStore.getPatientById(patientId || 'P-1001');

  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient not found' });
  }

  const result = aiEngine.runPreTransferCheck(patient, targetDepartment || 'Neurology');
  res.json({ success: true, data: result });
});

// 6. TRANSFER PATIENT DEMO
app.post('/api/patients/transfer', (req, res) => {
  const { patientId, toDepartment, reason, user } = req.body;
  if (!patientId || !toDepartment) {
    return res.status(400).json({ success: false, message: 'patientId and toDepartment are required' });
  }

  const result = dataStore.transferPatient(patientId, toDepartment, reason || 'Specialist transfer', user || 'Dr. Sarah');
  if (!result) {
    return res.status(404).json({ success: false, message: 'Patient transfer failed' });
  }

  res.json({ success: true, message: 'Patient transferred successfully', data: result });
});

// 7. PENDING REPORTS
app.get('/api/reports/pending', (req, res) => {
  res.json({ success: true, data: dataStore.getPendingReports() });
});

// 8. MARK REPORT AS REVIEWED
app.post('/api/reports/:id/review', (req, res) => {
  const { user } = req.body;
  const updatedReport = dataStore.markReportReviewed(req.params.id, user || 'Dr. Sarah');
  if (!updatedReport) {
    return res.status(404).json({ success: false, message: 'Report not found' });
  }
  res.json({ success: true, message: 'Report marked as reviewed', data: updatedReport });
});

// 9. ALERTS
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, data: dataStore.getAlerts() });
});

// 10. ACKNOWLEDGE ALERT
app.post('/api/alerts/:id/acknowledge', (req, res) => {
  const { user } = req.body;
  const alert = dataStore.acknowledgeAlert(req.params.id, user || 'Dr. Sarah');
  if (!alert) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  res.json({ success: true, message: 'Alert acknowledged', data: alert });
});

// 11. RESOLVE ALERT
app.post('/api/alerts/:id/resolve', (req, res) => {
  const { user } = req.body;
  const alert = dataStore.resolveAlert(req.params.id, user || 'Dr. Sarah');
  if (!alert) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  res.json({ success: true, message: 'Alert resolved', data: alert });
});

// 12. AUDIT LOGS
app.get('/api/audit-logs', (req, res) => {
  res.json({ success: true, data: dataStore.getAuditLogs() });
});

// 13. DEPARTMENT OVERVIEW
app.get('/api/department-overview', (req, res) => {
  const patients = dataStore.getPatients();
  const alerts = dataStore.getAlerts();
  const reports = dataStore.getPendingReports();
  const handoffs = dataStore.getHandoffs();

  const departments = ['Emergency', 'Neurology', 'Radiology', 'Laboratory', 'Ward', 'ICU'];

  const deptData = departments.map((dept) => {
    const deptPatients = patients.filter((p) => p.currentDepartment === dept);
    const deptHandoffs = handoffs.filter((h) => h.fromDept === dept || h.toDept === dept);
    const deptReports = reports.filter((r) => r.department === dept && !r.reviewed);
    const deptAlerts = alerts.filter((a) => a.department === dept && a.status === 'Active');

    return {
      department: dept,
      patientCount: deptPatients.length,
      pendingHandoffs: deptHandoffs.filter((h) => h.status !== 'Completed').length,
      pendingReports: deptReports.length,
      openAlerts: deptAlerts.length,
      patients: deptPatients.map((p) => ({ id: p.id, name: p.name, risk: p.handoffRisk }))
    };
  });

  res.json({
    success: true,
    data: deptData,
    visualFlow: [
      { step: 1, name: 'Emergency', count: deptData[0].patientCount },
      { step: 2, name: 'Specialist (Neurology)', count: deptData[1].patientCount },
      { step: 3, name: 'Radiology / Lab', count: deptData[2].patientCount + deptData[3].patientCount },
      { step: 4, name: 'Ward', count: deptData[4].patientCount },
      { step: 5, name: 'ICU', count: deptData[5].patientCount }
    ]
  });
});

// 14. ADMIN ANALYTICS
app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      totalPatients: dataStore.getPatients().length,
      activeHandoffs: dataStore.getHandoffs().filter((h) => h.status !== 'Completed').length,
      openAlerts: dataStore.getAlerts().filter((a) => a.status === 'Active').length,
      pendingReports: dataStore.getPendingReports().filter((r) => !r.reviewed).length,
      handoffsPerDepartment: [
        { department: 'Emergency', count: 14 },
        { department: 'Neurology', count: 9 },
        { department: 'Radiology', count: 12 },
        { department: 'Laboratory', count: 8 },
        { department: 'Ward', count: 18 },
        { department: 'ICU', count: 6 }
      ],
      gapTypes: [
        { type: 'Unacknowledged Allergy', count: 35, percentage: 38, color: '#ef4444' },
        { type: 'Pending Lab / PACS Report', count: 28, percentage: 30, color: '#f59e0b' },
        { type: 'Missing Vitals / BP', count: 18, percentage: 20, color: '#06b6d4' },
        { type: 'Incomplete Med History', count: 11, percentage: 12, color: '#3b82f6' }
      ],
      completenessTrend: [
        { day: 'Mon', score: 82 },
        { day: 'Tue', score: 86 },
        { day: 'Wed', score: 84 },
        { day: 'Thu', score: 89 },
        { day: 'Fri', score: 93 },
        { day: 'Sat', score: 91 },
        { day: 'Sun', score: 95 }
      ]
    }
  });
});

// ==================================================
// MERGED FRONTEND STATIC SERVING
// ==================================================
const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Fallback to index.html for Client-Side Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`MEDFLOW Unified Server running on http://localhost:${PORT}`);
  console.log(`Serving React Frontend & Express REST API on single port`);
  console.log(`==================================================`);
});
