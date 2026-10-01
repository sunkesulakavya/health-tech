// MEDFLOW In-Memory Data Store & Sync Manager
// Provides realistic state persistence for hackathon demonstration

let patients = [
  {
    id: "P-1001",
    name: "Ravi Kumar",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    allergy: "Penicillin",
    symptoms: ["Severe headache", "Dizziness", "Vomiting"],
    vitals: {
      bp: "168/102 mmHg",
      sugar: "190 mg/dL",
      heartRate: "92 bpm",
      spO2: "97%"
    },
    currentDepartment: "Neurology",
    status: "Under Observation",
    handoffRisk: "High",
    reasonsForCare: ["Severe headache", "Dizziness", "Vomiting"],
    medications: [
      { name: "Paracetamol 500mg IV", time: "09:30 AM", status: "Administered" },
      { name: "Mannitol 20% IV", time: "10:15 AM", status: "Administered" }
    ],
    investigations: [
      { id: "INV-101", title: "Blood Test", status: "Completed", dept: "Laboratory", time: "10:30" },
      { id: "INV-102", title: "CT Brain", status: "Completed", dept: "Radiology", time: "11:15" },
      { id: "INV-103", title: "Final Radiology Report", status: "Pending", dept: "Radiology", time: "11:15" }
    ],
    timeline: [
      {
        id: "TL-1",
        time: "09:10 AM",
        department: "Emergency",
        event: "Patient Admitted with acute symptoms",
        staff: "Dr. Ramesh (Emergency)",
        vitals: "BP: 168/102 | Sugar: 190 | SpO2: 97%",
        notes: "Severe headache, dizziness, vomiting reported. Penicillin allergy flagged.",
        documents: ["Emergency Triage Sheet", "Vitals Log"]
      },
      {
        id: "TL-2",
        time: "10:00 AM",
        department: "Neurology",
        event: "Neurologist Consultation & Transfer Request",
        staff: "Dr. Sarah (Neurology)",
        vitals: "Not re-checked on arrival",
        notes: "Brain CT Scan requested. Neurological assessment initiated.",
        documents: ["Neurology Initial Note", "CT Requisition"]
      },
      {
        id: "TL-3",
        time: "10:30 AM",
        department: "Laboratory",
        event: "Blood Panel Sample Processed",
        staff: "Nurse Anjali",
        vitals: "Normal blood parameters except blood sugar",
        notes: "CBC, Electrolytes, Serum Glucose processed.",
        documents: ["Lab Report #8820"]
      },
      {
        id: "TL-4",
        time: "11:15 AM",
        department: "Radiology",
        event: "CT Brain Completed",
        staff: "Tech Vikram",
        vitals: "Stable",
        notes: "Scan image acquired. Final radiologist text report pending.",
        documents: ["CT DICOM Metadata"]
      },
      {
        id: "TL-5",
        time: "12:00 PM",
        department: "Ward",
        event: "Patient Transferred for Observation",
        staff: "Dr. Sarah",
        vitals: "BP: 160/98 mmHg",
        notes: "Placed in Bay 4. Awaiting final CT summary.",
        documents: ["Handover Slip"]
      }
    ],
    departmentRecords: {
      Emergency: {
        department: "Emergency Department",
        bp: "168/102",
        sugar: "190",
        allergy: "Penicillin",
        medication: "Paracetamol 500mg IV, Mannitol 20%",
        symptoms: "Severe headache, Dizziness, Vomiting",
        ct: "Ordered"
      },
      Neurology: {
        department: "Neurology",
        bp: "Not recorded",
        sugar: "190",
        allergy: "Not acknowledged",
        medication: "Incomplete",
        symptoms: "Severe headache",
        ct: "Completed (Final report pending)"
      }
    }
  },
  {
    id: "P-1002",
    name: "Anita Rao",
    age: 46,
    gender: "Female",
    bloodGroup: "O+",
    allergy: "Latex",
    symptoms: ["Abdominal pain", "Nausea"],
    vitals: { bp: "128/84 mmHg", sugar: "110 mg/dL", heartRate: "78 bpm", spO2: "99%" },
    currentDepartment: "Ward",
    status: "Stable",
    handoffRisk: "Medium",
    reasonsForCare: ["Post-Op Observation"],
    medications: [{ name: "Cefuroxime 500mg", time: "08:00 AM", status: "Administered" }],
    investigations: [
      { id: "INV-104", title: "Blood Test", status: "Completed", dept: "Laboratory", time: "10:00" }
    ],
    timeline: [
      { id: "TL-201", time: "08:30 AM", department: "Emergency", event: "Admitted", staff: "Dr. Ramesh" },
      { id: "TL-202", time: "11:00 AM", department: "Ward", event: "Transferred to Ward", staff: "Nurse Anjali" }
    ]
  },
  {
    id: "P-1003",
    name: "Arjun Singh",
    age: 61,
    gender: "Male",
    bloodGroup: "A+",
    allergy: "Aspirin",
    symptoms: ["Shortness of breath", "Chest tightness"],
    vitals: { bp: "145/92 mmHg", sugar: "210 mg/dL", heartRate: "104 bpm", spO2: "91%" },
    currentDepartment: "ICU",
    status: "Critical",
    handoffRisk: "High",
    reasonsForCare: ["Acute Respiratory Distress"],
    medications: [{ name: "Nebulizer Duolin", time: "08:15 AM", status: "Administered" }],
    investigations: [
      { id: "INV-105", title: "Arterial Blood Gas", status: "Pending", dept: "ICU", time: "08:00" }
    ],
    timeline: [
      { id: "TL-301", time: "07:30 AM", department: "Emergency", event: "Admitted", staff: "Dr. Ramesh" },
      { id: "TL-302", time: "08:30 AM", department: "ICU", event: "Emergency ICU Handoff", staff: "Dr. Kapoor" }
    ]
  },
  {
    id: "P-1004",
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    bloodGroup: "AB+",
    allergy: "None known",
    symptoms: ["Mild fever", "Cough"],
    vitals: { bp: "118/76 mmHg", sugar: "95 mg/dL", heartRate: "72 bpm", spO2: "98%" },
    currentDepartment: "Emergency",
    status: "Stable",
    handoffRisk: "Low",
    reasonsForCare: ["Fever evaluation"],
    medications: [],
    investigations: [],
    timeline: [
      { id: "TL-401", time: "11:30 AM", department: "Emergency", event: "Admitted", staff: "Dr. Ramesh" }
    ]
  },
  {
    id: "P-1005",
    name: "Vikram Malhotra",
    age: 58,
    gender: "Male",
    bloodGroup: "O-",
    allergy: "Sulfa Drugs",
    symptoms: ["Joint pain", "Swelling"],
    vitals: { bp: "135/88 mmHg", sugar: "140 mg/dL", heartRate: "82 bpm", spO2: "96%" },
    currentDepartment: "Radiology",
    status: "Under Observation",
    handoffRisk: "Medium",
    reasonsForCare: ["X-Ray & MRI Evaluation"],
    medications: [],
    investigations: [],
    timeline: [
      { id: "TL-501", time: "10:15 AM", department: "Radiology", event: "Imaging Started", staff: "Tech Vikram" }
    ]
  }
];

let handoffs = [
  {
    id: "HND-101",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    fromDept: "Emergency",
    toDept: "Neurology",
    time: "10:00 AM",
    status: "Needs Review",
    riskLevel: "HIGH",
    completenessScore: 78,
    unresolvedGaps: 4
  },
  {
    id: "HND-102",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    fromDept: "Neurology",
    toDept: "Radiology",
    time: "11:15 AM",
    status: "In Progress",
    riskLevel: "MEDIUM",
    completenessScore: 85,
    unresolvedGaps: 2
  },
  {
    id: "HND-103",
    patientId: "P-1002",
    patientName: "Anita Rao",
    fromDept: "Radiology",
    toDept: "Ward",
    time: "11:45 AM",
    status: "Completed",
    riskLevel: "LOW",
    completenessScore: 95,
    unresolvedGaps: 0
  },
  {
    id: "HND-104",
    patientId: "P-1003",
    patientName: "Arjun Singh",
    fromDept: "Ward",
    toDept: "ICU",
    time: "08:30 AM",
    status: "Critical Review",
    riskLevel: "HIGH",
    completenessScore: 72,
    unresolvedGaps: 3
  }
];

let pendingReports = [
  {
    id: "REP-101",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    investigation: "CT Brain",
    department: "Radiology",
    requested: "10:05 AM",
    completed: "11:15 AM",
    reportStatus: "Final Report Pending",
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    priority: "High"
  },
  {
    id: "REP-102",
    patientId: "P-1002",
    patientName: "Anita Rao",
    investigation: "Blood Test",
    department: "Laboratory",
    requested: "09:30 AM",
    completed: "10:00 AM",
    reportStatus: "Report Ready",
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    priority: "Low"
  },
  {
    id: "REP-103",
    patientId: "P-1003",
    patientName: "Arjun Singh",
    investigation: "Arterial Blood Gas",
    department: "ICU",
    requested: "08:00 AM",
    completed: "08:25 AM",
    reportStatus: "Pending Review",
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
    priority: "High"
  }
];

let alerts = [
  {
    id: "ALT-101",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    alertType: "Allergy Not Acknowledged",
    priority: "High",
    department: "Neurology",
    time: "10:05 AM",
    status: "Active",
    details: "Previous record lists Penicillin allergy, receiving department has not acknowledged it.",
    explainable: {
      source: "Emergency Department Record",
      receiving: "Neurology Department Record",
      comparison: "Previous allergy field = Penicillin, Receiving allergy field = Empty / Not Acknowledged",
      result: "Potential severe adverse reaction risk. Verification required before administering new medications."
    }
  },
  {
    id: "ALT-102",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    alertType: "CT Report Pending",
    priority: "High",
    department: "Radiology",
    time: "11:15 AM",
    status: "Active",
    details: "CT Brain completed at 11:15 AM. Final radiologist report awaiting clinical review.",
    explainable: {
      source: "Radiology PACS System",
      receiving: "Neurology Ward Record",
      comparison: "CT DICOM images available = Yes, Final text report reviewed by treating physician = No",
      result: "Pending investigation results may contain urgent anatomical findings requiring immediate action."
    }
  },
  {
    id: "ALT-103",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    alertType: "Latest BP Missing",
    priority: "Medium",
    department: "Neurology",
    time: "10:10 AM",
    status: "Active",
    details: "High BP (168/102) recorded in Emergency. No updated vitals logged in receiving department.",
    explainable: {
      source: "Emergency Vitals Log (168/102 mmHg)",
      receiving: "Neurology Arrival Sheet",
      comparison: "Previous BP = 168/102 (Elevated), Receiving BP field = Unpopulated",
      result: "Hypertensive trajectory unmonitored during departmental transition."
    }
  },
  {
    id: "ALT-104",
    patientId: "P-1001",
    patientName: "Ravi Kumar",
    alertType: "Medication History Incomplete",
    priority: "Medium",
    department: "Neurology",
    time: "10:12 AM",
    status: "Active",
    details: "Emergency administered Paracetamol & Mannitol. Receiving medication list is un-reconciled.",
    explainable: {
      source: "Emergency Medication Administration Record",
      receiving: "Neurology Active Order Sheet",
      comparison: "Emergency medications administered = 2, Receiving reconciliation status = Incomplete",
      result: "Risk of duplicated dosage or omitted therapeutic coverage during handoff."
    }
  },
  {
    id: "ALT-105",
    patientId: "P-1003",
    patientName: "Arjun Singh",
    alertType: "Critical SpO2 Drop Alert",
    priority: "Critical",
    department: "ICU",
    time: "08:45 AM",
    status: "Active",
    details: "SpO2 registered at 91% on ICU transfer. Oxygenation monitoring required.",
    explainable: {
      source: "Ward Transfer Sheet (96%)",
      receiving: "ICU Monitor Stream (91%)",
      comparison: "Oxygen saturation dropped 5 points during transfer corridor transit",
      result: "Hypoxemia trajectory requires immediate clinical verification."
    }
  }
];

let auditLogs = [
  {
    id: "AUD-1",
    user: "Dr. Sarah",
    action: "Viewed handoff alert",
    patient: "Ravi Kumar",
    timestamp: "12:15 PM",
    department: "Neurology"
  },
  {
    id: "AUD-2",
    user: "Nurse Anjali",
    action: "Acknowledged allergy alert",
    patient: "Ravi Kumar",
    timestamp: "12:18 PM",
    department: "Ward"
  },
  {
    id: "AUD-3",
    user: "Radiology Staff",
    action: "Uploaded CT report",
    patient: "Ravi Kumar",
    timestamp: "12:22 PM",
    department: "Radiology"
  }
];

module.exports = {
  getPatients: () => patients,
  getPatientById: (id) => patients.find((p) => p.id === id),
  getHandoffs: () => handoffs,
  getPendingReports: () => pendingReports,
  getAlerts: () => alerts,
  getAuditLogs: () => auditLogs,
  
  markReportReviewed: (reportId, user = "Dr. Sarah") => {
    const report = pendingReports.find((r) => r.id === reportId);
    if (report) {
      report.reviewed = true;
      report.reportStatus = "Reviewed";
      report.reviewedBy = user;
      report.reviewedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Add audit log
      auditLogs.unshift({
        id: `AUD-${Date.now()}`,
        user: user,
        action: `Marked report '${report.investigation}' as Reviewed`,
        patient: report.patientName,
        timestamp: report.reviewedAt,
        department: report.department
      });
      return report;
    }
    return null;
  },

  acknowledgeAlert: (alertId, user = "Dr. Sarah") => {
    const alert = alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = "Acknowledged";
      
      auditLogs.unshift({
        id: `AUD-${Date.now()}`,
        user: user,
        action: `Acknowledged Alert: ${alert.alertType}`,
        patient: alert.patientName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        department: alert.department
      });
      return alert;
    }
    return null;
  },

  resolveAlert: (alertId, user = "Dr. Sarah") => {
    const alert = alerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = "Resolved";
      
      auditLogs.unshift({
        id: `AUD-${Date.now()}`,
        user: user,
        action: `Resolved Alert: ${alert.alertType}`,
        patient: alert.patientName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        department: alert.department
      });
      return alert;
    }
    return null;
  },

  transferPatient: (patientId, toDepartment, reason, user = "Dr. Sarah") => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      const fromDepartment = patient.currentDepartment;
      patient.currentDepartment = toDepartment;
      
      // Add timeline event
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newTlId = `TL-${Date.now()}`;
      patient.timeline.push({
        id: newTlId,
        time: timeStr,
        department: toDepartment,
        event: `Transferred from ${fromDepartment} to ${toDepartment}`,
        staff: user,
        vitals: `BP: ${patient.vitals.bp} | SpO2: ${patient.vitals.spO2}`,
        notes: `Transfer Reason: ${reason}`,
        documents: ["Handoff Verification Record"]
      });

      // Add new Handoff record
      const newHandoff = {
        id: `HND-${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        fromDept: fromDepartment,
        toDept: toDepartment,
        time: timeStr,
        status: "Completed",
        riskLevel: patient.handoffRisk || "MEDIUM",
        completenessScore: 88,
        unresolvedGaps: 1
      };
      handoffs.unshift(newHandoff);

      // Audit Log
      auditLogs.unshift({
        id: `AUD-${Date.now()}`,
        user: user,
        action: `Transferred Patient from ${fromDepartment} to ${toDepartment}`,
        patient: patient.name,
        timestamp: timeStr,
        department: toDepartment
      });

      return { patient, handoff: newHandoff };
    }
    return null;
  }
};
