import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiSquaresFourDuotone, PiUsersDuotone, PiBuildingsDuotone, PiCalendarCheckDuotone, PiWalletDuotone,
  PiUserPlusDuotone, PiBuildingDuotone, PiCalendarPlusDuotone, PiCurrencyDollarDuotone,
  PiMagnifyingGlassDuotone, PiBellDuotone, PiGearDuotone, PiSignOutDuotone, PiQuestionDuotone, PiFileTextDuotone,
  PiCarProfileDuotone, PiMoonDuotone, PiSunDuotone
} from "react-icons/pi";

const AnimatedLogo = ({ hideText = false }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
      <div className="animated-logo-bg" style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,var(--primary) 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
        <div className="logo-inner-bg" style={{ position: 'absolute', inset: 2, borderRadius: 12, zIndex: 1 }} />
        <svg className="logo-car-svg" style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
          <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
          <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
        </svg>
      </div>
      {!hideText && (
        <div style={{ position: 'relative', fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.5px", margin: 0 }}>
          <span className="logo-text-p1">Upp</span>
          <span className="logo-text-p2">Car</span>
          <span className="logo-dot" style={{ position: 'absolute', bottom: 6, right: -12, width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', animation: 'blink 2s infinite' }} />
        </div>
      )}
    </div>
  );
};

const Homeadmin = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Overview");

  // THEME MANAGEMENT
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("adminTheme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.title = "UppCar - Admin Dashboard";
    
    // Listen for system theme changes if no local storage override
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("adminTheme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("adminTheme", theme);
    document.body.style.background = theme === "dark" ? "#09090b" : "#f8fafc";
    document.body.style.transition = "background 0.3s ease";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

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
    { label: "New Users", value: "24", icon: <PiUserPlusDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+12%", type: "success" },
    { label: "New Agencies", value: "3", icon: <PiBuildingDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+2", type: "primary" },
    { label: "Reservations", value: "12", icon: <PiCalendarPlusDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+8%", type: "warning" },
    { label: "Daily Revenue", value: "$2,450", icon: <PiCurrencyDollarDuotone size={28} className="modern-icon kpi-svg" />, indicator: "+15%", type: "danger" },
  ];

  const activities = [
    {
      user: "John Doe",
      action: "Created new",
      entity: "User Account",
      status: "SUCCESS",
      time: "2 min ago",
      type: "success"
    },
    {
      user: "Sarah Wilson",
      action: "Updated",
      entity: "Agency Profile",
      status: "UPDATED",
      time: "15 min ago",
      type: "primary"
    },
    {
      user: "Mike Johnson",
      action: "Confirmed",
      entity: "Reservation #1234",
      status: "CONFIRMED",
      time: "1 hour ago",
      type: "warning"
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        /* CSS VARIABLES - LIGHT THEME (DEFAULT) */
        :root {
          --bg-main: #f8fafc;
          --bg-pattern: #e2e8f0;
          --surface: rgba(255, 255, 255, 0.85);
          --surface-solid: #ffffff;
          --surface-hover: #f1f5f9;
          --surface-active: #ffffff;
          --border: rgba(226, 232, 240, 0.8);
          --border-strong: #cbd5e1;
          
          --text-main: #0f172a;
          --text-secondary: #1e293b;
          --text-muted: #64748b;
          --text-placeholder: #94a3b8;
          
          --primary: #3b82f6;
          --primary-hover: #2563eb;
          --primary-soft: #eff6ff;
          --primary-grad: linear-gradient(135deg, #3b82f6, #2563eb);
          
          --success: #10b981;
          --success-soft: #ecfdf5;
          --success-grad: linear-gradient(135deg, #10b981, #059669);
          
          --warning: #f59e0b;
          --warning-soft: #fffbeb;
          --warning-grad: linear-gradient(135deg, #f59e0b, #d97706);
          
          --danger: #ef4444;
          --danger-soft: #fef2f2;
          --danger-grad: linear-gradient(135deg, #ef4444, #dc2626);
          
          --shadow-sm: 0 2px 6px rgba(0,0,0,0.02);
          --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.03);
          --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.06);
          
          --nav-active-bg: #ffffff;
          --nav-active-shadow: 0 8px 16px rgba(37, 99, 235, 0.08);
          --icon-bg: #f1f5f9;
        }

        /* CSS VARIABLES - DARK THEME */
        [data-theme="dark"] {
          --bg-main: #09090b; /* zinc-950 */
          --bg-pattern: rgba(255,255,255,0.03);
          --surface: rgba(24, 24, 27, 0.7); /* zinc-900 */
          --surface-solid: #18181b;
          --surface-hover: rgba(255,255,255,0.05);
          --surface-active: rgba(59, 130, 246, 0.1);
          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.15);
          
          --text-main: #fafafa;
          --text-secondary: #e4e4e7;
          --text-muted: #a1a1aa;
          --text-placeholder: #52525b;
          
          --primary: #3b82f6;
          --primary-hover: #60a5fa;
          --primary-soft: rgba(59, 130, 246, 0.15);
          
          --success: #34d399;
          --success-soft: rgba(16, 185, 129, 0.15);
          
          --warning: #fbbf24;
          --warning-soft: rgba(245, 158, 11, 0.15);
          
          --danger: #f87171;
          --danger-soft: rgba(239, 68, 68, 0.15);
          
          --shadow-sm: 0 2px 6px rgba(0,0,0,0.2);
          --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.4);
          
          --nav-active-bg: rgba(59, 130, 246, 0.1);
          --nav-active-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          --icon-bg: rgba(255,255,255,0.05);
        }

        /* GLOBAL TRANSITIONS */
        *, *::before, *::after {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }

        .admin-dashboard {
          font-family: 'Outfit', system-ui, sans-serif;
          background-color: var(--bg-main);
          background-image: radial-gradient(var(--bg-pattern) 1px, transparent 1px);
          background-size: 20px 20px;
          min-height: 100vh;
          display: flex;
          color: var(--text-secondary);
        }

        /* Glassmorphism sidebar */
        .glass-sidebar {
          width: 280px;
          background: var(--surface);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid var(--border);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.05);
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
          border-bottom: 1px solid var(--border);
        }
        
        .logo-inner-bg { background: var(--surface-solid); }
        .logo-car-svg { stroke: var(--text-main); }
        .logo-text-p1 { color: var(--text-main); }
        .logo-text-p2 { color: var(--primary); }

        .logo-text {
          font-size: 26px;
          font-weight: 800;
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
          background: transparent;
          color: var(--text-muted);
          font-weight: 500;
        }

        .nav-btn:hover {
          transform: translateX(4px);
          background: var(--surface-hover);
          color: var(--text-main);
        }

        .nav-btn.active {
          background: var(--nav-active-bg);
          color: var(--primary);
          font-weight: 700;
          box-shadow: var(--nav-active-shadow);
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
          background: var(--primary);
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
          background: var(--icon-bg);
        }
        
        .nav-btn.active .nav-icon {
          background: var(--primary-grad);
          color: white;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
          transform: scale(1.05);
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid var(--border);
        }

        /* TOGGLE THEME SWITCH */
        .theme-toggle-sidebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 14px;
          background: var(--icon-bg);
          border: 1px solid var(--border);
          cursor: pointer;
          margin-bottom: 16px;
        }
        .theme-toggle-sidebar:hover {
          background: var(--surface-hover);
        }
        
        .toggle-switch {
          width: 40px;
          height: 22px;
          background: var(--text-placeholder);
          border-radius: 20px;
          position: relative;
        }
        [data-theme="dark"] .toggle-switch {
          background: var(--primary);
        }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        [data-theme="dark"] .toggle-thumb {
          transform: translateX(18px);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: var(--primary-grad);
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
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25);
          margin-bottom: 20px;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(59, 130, 246, 0.35);
          filter: brightness(1.1);
        }

        .footer-link {
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .footer-link:hover {
          background: var(--surface-hover);
          color: var(--text-main);
        }
        
        .footer-link.logout {
          color: var(--danger);
        }
        
        .footer-link.logout:hover {
          background: var(--danger-soft);
        }

        /* Main Content */
        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .glass-header {
          background: var(--surface);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
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
        }

        .search-bar:focus-within {
          width: 420px;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: var(--icon-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          outline: none;
          color: var(--text-main);
        }

        .search-input::placeholder {
          color: var(--text-placeholder);
        }
        
        .search-input:hover {
          border-color: var(--border-strong);
        }
        
        .search-input:focus {
          background: var(--surface-solid);
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--primary-soft);
        }
        
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-placeholder);
          font-size: 16px;
          pointer-events: none;
        }

        .search-bar:focus-within .search-icon {
          color: var(--primary);
          transform: translateY(-50%) scale(1.1);
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
          border: 1px solid var(--border);
          background: var(--surface-solid);
          color: var(--text-muted);
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 18px;
          box-shadow: var(--shadow-sm);
        }
        
        .icon-btn:hover {
          border-color: var(--border-strong);
          color: var(--text-main);
          transform: translateY(-1px);
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--primary-grad);
          color: white;
          font-weight: 700;
          font-size: 16px;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
          border: 2px solid var(--surface-solid);
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
          color: var(--text-main);
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }
        
        .page-subtitle {
          color: var(--text-muted);
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
          background: var(--surface);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
        }
        
        .kpi-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: var(--card-gradient);
          opacity: 0;
        }
        
        .kpi-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          background: var(--surface-solid);
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
          color: white;
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
        }

        .kpi-indicator {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        /* KPI TYPE STYLES */
        .type-success .kpi-icon { background: var(--success-grad); }
        .type-success .kpi-indicator { background: var(--success-soft); color: var(--success); }
        .type-success { --card-gradient: var(--success-grad); }

        .type-primary .kpi-icon { background: var(--primary-grad); }
        .type-primary .kpi-indicator { background: var(--primary-soft); color: var(--primary); }
        .type-primary { --card-gradient: var(--primary-grad); }

        .type-warning .kpi-icon { background: var(--warning-grad); }
        .type-warning .kpi-indicator { background: var(--warning-soft); color: var(--warning); }
        .type-warning { --card-gradient: var(--warning-grad); }

        .type-danger .kpi-icon { background: var(--danger-grad); }
        .type-danger .kpi-indicator { background: var(--danger-soft); color: var(--danger); }
        .type-danger { --card-gradient: var(--danger-grad); }


        .kpi-label {
          font-size: 15px;
          color: var(--text-muted);
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .kpi-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
          letter-spacing: -1px;
        }

        /* Activity Table */
        .table-container {
          background: var(--surface-solid);
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
          overflow: hidden;
        }

        .table-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
        }
        
        .view-all-btn {
          color: var(--primary);
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
          background: var(--surface);
          padding: 16px 32px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border);
        }

        .activity-table td {
          padding: 20px 32px;
          border-bottom: 1px solid var(--border);
        }

        .table-row:hover td {
          background: var(--surface-hover);
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
          background: var(--icon-bg);
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          font-weight: 700;
          color: var(--text-main);
          font-size: 14px;
        }

        .user-name {
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
          font-size: 15px;
        }

        .user-action {
          color: var(--text-muted);
          margin: 4px 0 0;
          font-size: 13px;
        }

        .entity-cell {
          font-weight: 600;
          color: var(--text-secondary);
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
        
        /* STATUS TYPES */
        .status-success { background: var(--success-soft); color: var(--success); }
        .status-primary { background: var(--primary-soft); color: var(--primary); }
        .status-warning { background: var(--warning-soft); color: var(--warning); }
        .status-danger { background: var(--danger-soft); color: var(--danger); }

        .time-cell {
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 500;
        }

        .action-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface-solid);
          font-family: inherit;
          font-weight: 600;
          font-size: 13px;
          color: var(--text-main);
          cursor: pointer;
        }
        
        .action-btn:hover {
          border-color: var(--border-strong);
          background: var(--surface-hover);
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

        .modern-icon {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .modern-icon path[opacity="0.2"] {
          opacity: 0.35 !important;
        }

        .logo-icon {
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 4px 10px rgba(59, 130, 246, 0.5));
        }

        .nav-btn:hover .modern-icon {
          transform: scale(1.15) rotate(-5deg);
        }
        
        .nav-btn.active .modern-icon {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .kpi-card:hover .kpi-svg {
          animation: pulseIcon 1.5s infinite;
          transform: scale(1.15);
        }

        .icon-btn:hover .bell-icon {
          animation: ring 1s ease-in-out infinite;
          color: var(--danger);
        }

        .icon-btn:hover .settings-icon {
          animation: spin 3s linear infinite;
          color: var(--primary);
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
          background: var(--icon-bg); 
          border: 1px solid var(--border);
        }
      `}</style>

      <div className="admin-dashboard" data-theme={theme}>
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
            <div className="theme-toggle-sidebar" onClick={toggleTheme}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {theme === "dark" ? <PiMoonDuotone size={18} color="var(--text-main)" /> : <PiSunDuotone size={18} color="var(--text-main)" />}
                <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-main)" }}>{theme === "dark" ? "Mode Sombre" : "Mode Clair"}</span>
              </div>
              <div className="toggle-switch">
                <div className="toggle-thumb" />
              </div>
            </div>

            <button className="btn-primary">
              <PiFileTextDuotone size={20} className="modern-icon" /> New Report
            </button>
            <div className="footer-link" onClick={() => { }}>
              <PiQuestionDuotone size={20} className="modern-icon" /> Help Center
            </div>
            <div className="footer-link logout" onClick={handleLogout}>
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
                <div key={i} className={`kpi-card type-${kpi.type} animate-fade-in delay-${i % 4}`}>
                  <div className="kpi-header">
                    <div className="kpi-icon">
                      {kpi.icon}
                    </div>
                    <div className="kpi-indicator">
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
                          <span className={`status-badge status-${activity.type}`}>
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
