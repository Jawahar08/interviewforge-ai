import React, { useState } from 'react';
import { Users, FileBarChart, Settings, Search, Bell, Video, CheckCircle, XCircle } from 'lucide-react';
import './index.css';

const mockCandidates = [
  { id: 1, name: "Sarah Jenkins", role: "Frontend Engineer", score: 92, status: "Passed", date: "2026-06-18", duration: "45m" },
  { id: 2, name: "Michael Chen", role: "Backend Engineer", score: 85, status: "Passed", date: "2026-06-18", duration: "50m" },
  { id: 3, name: "Alex Rodriguez", role: "Full Stack Dev", score: 64, status: "Failed", date: "2026-06-17", duration: "30m" },
  { id: 4, name: "Emily Watson", role: "Product Designer", score: 88, status: "Passed", date: "2026-06-17", duration: "40m" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('candidates');

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">IF</div>
          <h2>InterviewForge</h2>
          <span className="badge">Admin</span>
        </div>
        <nav className="nav-menu">
          <button className={`nav-item ${activeTab === 'candidates' ? 'active' : ''}`} onClick={() => setActiveTab('candidates')}>
            <Users size={20} /> Candidates
          </button>
          <button className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <FileBarChart size={20} /> Analytics
          </button>
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} color="#64748b" />
            <input type="text" placeholder="Search candidates, roles..." />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="avatar">HR</div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="page-header">
            <h1>Candidate Pipeline</h1>
            <button className="btn-primary">Export Report</button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Interviews</span>
              <span className="stat-value">124</span>
              <span className="stat-trend positive">↑ 12% this week</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Avg AI Score</span>
              <span className="stat-value">78/100</span>
              <span className="stat-trend positive">↑ 2% this week</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pass Rate</span>
              <span className="stat-value">62%</span>
              <span className="stat-trend negative">↓ 5% this week</span>
            </div>
          </div>

          {/* Data Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Role Applied</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>AI Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCandidates.map(c => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.role}</td>
                    <td>{c.date}</td>
                    <td>{c.duration}</td>
                    <td>
                      <div className="score-bar-wrapper">
                        <div className="score-bar" style={{ width: `${c.score}%`, backgroundColor: c.score >= 80 ? '#10b981' : c.score >= 70 ? '#f59e0b' : '#ef4444' }}></div>
                      </div>
                      <span style={{ fontSize: '0.85rem' }}>{c.score}%</span>
                    </td>
                    <td>
                      <span className={`status-badge ${c.status.toLowerCase()}`}>
                        {c.status === 'Passed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-secondary btn-sm"><Video size={14}/> View Recording</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
