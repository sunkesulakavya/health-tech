// MEDFLOW Frontend API Client Service

const API_BASE = '/api';

export const api = {
  // Patients
  getPatients: async (searchQuery = '') => {
    try {
      const res = await fetch(`${API_BASE}/patients?q=${encodeURIComponent(searchQuery)}`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [] };
    }
  },

  getPatientById: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/patients/${id}`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: null };
    }
  },

  // Handoffs & AI Gap Analysis
  getHandoffs: async () => {
    try {
      const res = await fetch(`${API_BASE}/handoffs`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [] };
    }
  },

  analyzeHandoff: async (patientId, previousDept, receivingDept) => {
    try {
      const res = await fetch(`${API_BASE}/handoffs/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, previousDept, receivingDept })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  runPreTransferCheck: async (patientId, targetDepartment) => {
    try {
      const res = await fetch(`${API_BASE}/handoffs/pre-transfer-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, targetDepartment })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  transferPatient: async (patientId, toDepartment, reason, user) => {
    try {
      const res = await fetch(`${API_BASE}/patients/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId, toDepartment, reason, user })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  // Pending Reports
  getPendingReports: async () => {
    try {
      const res = await fetch(`${API_BASE}/reports/pending`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [] };
    }
  },

  markReportReviewed: async (reportId, user) => {
    try {
      const res = await fetch(`${API_BASE}/reports/${reportId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  // Alerts
  getAlerts: async () => {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [] };
    }
  },

  acknowledgeAlert: async (alertId, user) => {
    try {
      const res = await fetch(`${API_BASE}/alerts/${alertId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  resolveAlert: async (alertId, user) => {
    try {
      const res = await fetch(`${API_BASE}/alerts/${alertId}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
      });
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false };
    }
  },

  // Audit Logs
  getAuditLogs: async () => {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [] };
    }
  },

  // Department Overview
  getDepartmentOverview: async () => {
    try {
      const res = await fetch(`${API_BASE}/department-overview`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: [], visualFlow: [] };
    }
  },

  // Admin Analytics
  getAnalytics: async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      return await res.json();
    } catch (err) {
      console.error('API Error:', err);
      return { success: false, data: null };
    }
  }
};
