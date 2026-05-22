import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSquaresFourDuotone, PiUsersDuotone, PiBuildingsDuotone, PiCalendarCheckDuotone, PiWalletDuotone,
  PiUserPlusDuotone, PiBuildingDuotone, PiCalendarPlusDuotone, PiCurrencyDollarDuotone,
  PiMagnifyingGlassDuotone, PiBellDuotone, PiGearDuotone, PiSignOutDuotone, PiQuestionDuotone, PiFileTextDuotone,
  PiCarProfileDuotone
} from "react-icons/pi";

const AnimatedLogo = ({ hideText = false }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
      <div className="animated-logo-bg" style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,#3b82f6 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 2, background: '#ffffff', borderRadius: 12, zIndex: 1 }} />
        <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
          <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
          <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
        </svg>
      </div>
      {!hideText && (
        <div style={{ position: 'relative', fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.5px", margin: 0 }}>
          <span style={{ color: "#1e293b" }}>Upp</span>
          <span style={{ color: "#3b82f6" }}>Car</span>
          <span style={{ position: 'absolute', bottom: 6, right: -12, width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', animation: 'blink 2s infinite' }} />
        </div>
      )}
    </div>
  );
};

const Homeadmin = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Overview");

  useEffect(() => {
    document.title = "UppCar - Admin Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/loginadmin");
  };

  const navItems = [
    { name: "Overview", icon: <PiSquaresFourDuotone size={22} className="modern-icon" /> },
    { name: "Users", icon: <PiUsersDuotone size={22} className="modern-icon" /> },
    { name: "Agencies", icon: <PiBuildingsDuotone size={22} className="modern-icon" /> },
    { name: "Reservations", icon: <PiCalendarCheckDuotone size={22} className="modern-icon" /> },
    { name: "Financials", icon: <PiWalletDuotone size={22} className="modern-icon" /> },
  ];

  const kpis = [
    { label: "New Users", value: "24", icon: <PiUserPlusDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+12%", gradient: "linear-gradient(135deg, #10b981, #059669)", bgSoft: "#ecfdf5", color: "#10b981" },
    { label: "New Agencies", value: "3", icon: <PiBuildingDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+2", gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", bgSoft: "#eff6ff", color: "#3b82f6" },
    { label: "Reservations", value: "12", icon: <PiCalendarPlusDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+8%", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", bgSoft: "#fffbeb", color: "#f59e0b" },
    { label: "Daily Revenue", value: "$2,450", icon: <PiCurrencyDollarDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+15%", gradient: "linear-gradient(135deg, #ef4444, #dc2626)", bgSoft: "#fef2f2", color: "#ef4444" },
  ];

  const activities = [
    {
      user: "John Doe",
      action: "Created new",
      entity: "User Account",
      status: "SUCCESS",
      time: "2 min ago",
      statusColor: "#10b981",
      statusBg: "#ecfdf5"
    },
    {
      user: "Sarah Wilson",
      action: "Updated",
      entity: "Agency Profile",
      status: "UPDATED",
      time: "15 min ago",
      statusColor: "#3b82f6",
      statusBg: "#eff6ff"
    },
    {
      user: "Mike Johnson",
      action: "Confirmed",
      entity: "Reservation #1234",
      status: "CONFIRMED",
      time: "1 hour ago",
      statusColor: "#f59e0b",
      statusBg: "#fffbeb"
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .admin-dashboard {
          font-family: 'Outfit', system-ui, sans-serif;
          background: #f8fafc;
          /* Subtle background pattern */
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
          min-height: 100vh;
          display: flex;
          color: #1e293b;
        }

        /* Glassmorphism sidebar */
        .glass-sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          z-index: 20;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .logo-area {
          padding: 28px 24px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.6);
        }
        
        .logo-text {
          font-size: 26px;
          font-weight: 800;
          background: linear-gradient(135deg, #1e293b, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .nav-container {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .nav-btn {
          width: 100%;
          border: none;
          padding: 14px 18px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          color: #64748b;
          font-weight: 500;
        }

        .nav-btn:hover {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.9);
          color: #1e293b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .nav-btn.active {
          background: #ffffff;
          color: #2563eb;
          font-weight: 700;
          box-shadow: 0 8px 16px rgba(37, 99, 235, 0.08);
          position: relative;
        }
        
        .nav-btn.active::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          height: 24px;
          width: 4px;
          background: #3b82f6;
          border-radius: 0 4px 4px 0;
        }

        .nav-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          background: #f1f5f9;
          transition: all 0.3s ease;
        }
        
        .nav-btn.active .nav-icon {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
          transform: scale(1.05);
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25);
          margin-bottom: 20px;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(59, 130, 246, 0.35);
        }

        .footer-link {
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .footer-link:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
        
        .footer-link.logout {
          color: #ef4444;
        }
        
        .footer-link.logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        /* Main Content */
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .glass-header {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          padding: 20px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          position: sticky;
          top: 0;
        }

        .search-bar {
          position: relative;
          width: 320px;
          transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .search-bar:focus-within {
          width: 420px;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: #f8fafc;
          border: 1px solid transparent;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #1e293b;
        }

        .search-input::placeholder {
          color: #94a3b8;
          transition: opacity 0.3s ease;
        }

        .search-input:focus::placeholder {
          opacity: 0.5;
        }
        
        .search-input:hover {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        
        .search-input:focus {
          background: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 4px 20px rgba(37, 99, 235, 0.08);
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 16px;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-bar:focus-within .search-icon {
          color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: #ffffff;
          color: #64748b;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 18px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        
        .icon-btn:hover {
          border-color: #e2e8f0;
          color: #1e293b;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.04);
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          font-weight: 700;
          font-size: 16px;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
          transition: all 0.2s ease;
          border: 2px solid #ffffff;
        }
        
        .avatar:hover {
          transform: scale(1.05);
        }

        .main-content {
          padding: 32px;
          overflow-y: auto;
          flex: 1;
        }

        .page-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }
        
        .page-subtitle {
          color: #64748b;
          font-size: 15px;
          margin: 0 0 32px 0;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .kpi-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .kpi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: var(--card-gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .kpi-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          background: #ffffff;
        }
        
        .kpi-card:hover::before {
          opacity: 1;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .kpi-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-size: 24px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
        }

        .kpi-indicator {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        .kpi-label {
          font-size: 15px;
          color: #64748b;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .kpi-value {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -1px;
        }

        /* Activity Table */
        .table-container {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
          overflow: hidden;
        }

        .table-header {
          padding: 24px 32px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        
        .view-all-btn {
          color: #3b82f6;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          background: transparent;
          border: none;
          font-family: inherit;
        }
        .view-all-btn:hover {
          text-decoration: underline;
        }

        .activity-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .activity-table th {
          background: #f8fafc;
          padding: 16px 32px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .activity-table td {
          padding: 20px 32px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
        }

        .table-row {
          transition: all 0.2s ease;
        }
        
        .table-row:hover td {
          background: #f8fafc;
        }
        
        .table-row:last-child td {
          border-bottom: none;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #e2e8f0;
          display: grid;
          place-items: center;
          font-weight: 700;
          color: #475569;
          font-size: 14px;
        }

        .user-name {
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          font-size: 15px;
        }

        .user-action {
          color: #64748b;
          margin: 4px 0 0;
          font-size: 13px;
        }

        .entity-cell {
          font-weight: 600;
          color: #334155;
          font-size: 14px;
        }

        .status-badge {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .time-cell {
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }

        .action-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
          color: #0f172a;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        /* Modern icon base animations */
        .modern-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Dual-tone effect enhancement */
        .modern-icon path[opacity="0.2"] {
          opacity: 0.35 !important;
        }

        .logo-icon {
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 4px 10px rgba(59, 130, 246, 0.5));
        }

        /* Nav Icon Hover animations */
        .nav-btn:hover .modern-icon {
          transform: scale(1.15) rotate(-5deg);
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        
        .nav-btn.active .modern-icon {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.4));
        }

        /* KPI Icon animations */
        .kpi-card:hover .kpi-svg {
          animation: pulseIcon 1.5s infinite;
          transform: scale(1.15);
          filter: drop-shadow(0 0 12px currentColor);
        }

        /* Header Icons animations */
        .icon-btn:hover .bell-icon {
          animation: ring 1s ease-in-out infinite;
          color: #ef4444;
        }

        .icon-btn:hover .settings-icon {
          animation: spin 3s linear infinite;
          color: #3b82f6;
        }

        .btn-primary:hover .modern-icon {
          transform: translateX(4px) scale(1.1);
        }

        .footer-link:hover .modern-icon {
          transform: scale(1.1) translateX(2px);
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }

        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes pulseIcon {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }

        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
          60% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinWheel { 100%{transform:rotate(360deg);} }
        @keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        .animated-logo-bg { 
          background: linear-gradient(135deg, #e0e7ff 0%, #bfdbfe 100%); 
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25); 
        }
      `}</style>

      <div className="admin-dashboard">
        {/* SIDEBAR */}
        <aside className="glass-sidebar">
          <div className="logo-area" style={{ padding: '24px 20px', display: 'flex', justifyContent: 'flex-start' }}>
            <AnimatedLogo />
          </div>

          <nav className="nav-container">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`nav-btn ${activeNav === item.name ? "active" : ""}`}
              >
                <div className="nav-icon">{item.icon}</div>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="btn-primary">
              <PiFileTextDuotone size={20} className="modern-icon" /> New Report
            </button>
            <div
              className="footer-link"
              onClick={() => { }}
            >
              <PiQuestionDuotone size={20} className="modern-icon" /> Help Center
            </div>
            <div
              className="footer-link logout"
              onClick={handleLogout}
            >
              <PiSignOutDuotone size={20} className="modern-icon" /> Logout
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="main-wrapper">
          {/* HEADER */}
          <header className="glass-header">
            <div className="search-bar">
              <PiMagnifyingGlassDuotone size={20} className="search-icon modern-icon" />
              <input type="text" placeholder="Search anything..." className="search-input" />
            </div>

            <div className="header-actions">
              <button className="icon-btn">
                <PiBellDuotone size={24} className="modern-icon bell-icon" />
              </button>
              <button className="icon-btn">
                <PiGearDuotone size={24} className="modern-icon settings-icon" />
              </button>
              <div className="avatar">A</div>
            </div>
          </header>

          {/* DASHBOARD CONTENT */}
          <main className="main-content">
            <div className="animate-fade-in">
              <h2 className="page-title">Welcome back, Admin 👋</h2>
              <p className="page-subtitle">Here is what's happening with UppCar today.</p>
            </div>

            {/* KPI GRID */}
            <div className="kpi-grid">
              {kpis.map((kpi, i) => (
                <div
                  key={i}
                  className={`kpi-card animate-fade-in delay-${i % 4}`}
                  style={{ "--card-gradient": kpi.gradient }}
                >
                  <div className="kpi-header">
                    <div className="kpi-icon" style={{ background: kpi.gradient, color: "white" }}>
                      {kpi.icon}
                    </div>
                    <div className="kpi-indicator" style={{ background: kpi.bgSoft, color: kpi.color }}>
                      {kpi.indicator}
                    </div>
                  </div>
                  <div>
                    <p className="kpi-label">{kpi.label}</p>
                    <p className="kpi-value">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTIVITY TABLE */}
            <div className="table-container animate-fade-in delay-3">
              <div className="table-header">
                <h3 className="table-title">Recent Activity</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>User / Action</th>
                      <th>Entity</th>
                      <th>Status</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity, i) => (
                      <tr key={i} className="table-row">
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="user-name">{activity.user}</p>
                              <p className="user-action">{activity.action}</p>
                            </div>
                          </div>
                        </td>
                        <td className="entity-cell">{activity.entity}</td>
                        <td>
                          <span
                            className="status-badge"
                            style={{ background: activity.statusBg, color: activity.statusColor }}
                          >
                            {activity.status}
                          </span>
                        </td>
                        <td className="time-cell">{activity.time}</td>
                        <td>
                          <button className="action-btn">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Homeadmin;
