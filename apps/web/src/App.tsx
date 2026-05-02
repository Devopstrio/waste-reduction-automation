import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import WasteDashboard from './pages/WasteDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The waste reduction engine is currently scanning global multi-cloud inventory and analyzing utilization metrics. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<WasteDashboard />} />
          <Route path="/inventory" element={<Placeholder name="Resource Inventory & Tag Audit" />} />
          <Route path="/detection" element={<Placeholder name="Waste Detection & Anomaly Center" />} />
          <Route path="/remediation" element={<Placeholder name="Automated Remediation & Approval Hub" />} />
          <Route path="/efficiency" element={<Placeholder name="Resource Efficiency & Utilization Profiling" />} />
          <Route path="/savings" element={<Placeholder name="FinOps Savings & ROI Tracker" />} />
          <Route path="/sustainability" element={<Placeholder name="Green-Ops & Carbon Impact Dashboard" />} />
          <Route path="/governance" element={<Placeholder name="Policy Enforcement & Governance Hub" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
