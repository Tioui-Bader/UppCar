import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImageDark from "../../asset/eeeee.png";
import bgImageLight from "../../asset/ee.png";
import { TrashIcon } from "lucide-react";
import { AR } from "./ar.js";
import { FR } from "./fr.js";

export function GlobeIcon({ size = 24, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>; }
export function ZapIcon({ size = 24, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>; }
export function ShieldIcon({ size = 16, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>; }
export function MapPinIcon({ size = 16, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>; }
export function ArrowRightIcon({ size = 16, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>; }
export function SunIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>; }
export function MoonIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>; }
export function CameraIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>; }
export function SaveIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>; }
export function LogoutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>; }
export function LockIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>; }
export function StarIcon({ filled = false, size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>; }
export function CarIcon({ size = 20, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>; }
export function CalendarIcon({ size = 14, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>; }
export function CheckCircleIcon({ size = 14, color = "#10b981" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; }
export function ClockIcon({ size = 14, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>; }
export function AwardIcon({ size = 16, color = "currentColor" }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>; }
export function SparkleIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L14 8L19 8L15 11L17 16L12 13L7 16L9 11L5 8L10 8L12 3Z" /></svg>; }
export function BellIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>; }
export function SettingsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>; }
export function CreditCardIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>; }

export function AnimatedLogo({ onClick }) {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, background: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,var(--accent-color) 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 2, background: 'var(--bg-color)', borderRadius: 12, zIndex: 1 }} />
                <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
                    <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
                </svg>
            </div>
            <div style={{ position: 'relative', fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.5px" }}>
                <span style={{ color: "var(--text-main)" }}>Upp</span>
                <span style={{ color: "var(--accent-color)" }}>Car</span>
                <span style={{ position: 'absolute', bottom: 6, right: -12, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-color)', animation: 'blink 2s infinite' }} />
            </div>
        </div>
    );
}

export function GlassInput({ icon, label, value, onChange, disabled, placeholder, type = "text", isDarkMode }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: isDarkMode ? "#a1a1aa" : "#475569", letterSpacing: "0.02em" }}>{label}</label>
            <div style={{
                display: "flex", alignItems: "center", gap: 12,
                height: 52, padding: "0 18px", borderRadius: 16,
                background: isDarkMode ? "rgba(10, 14, 25, 0.4)" : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1.5px solid ${focused ? "var(--accent-color)" : (isDarkMode ? "rgba(var(--accent-rgb),0.5)" : "rgba(var(--accent-rgb),0.4)")}`,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: focused
                    ? "0 0 25px rgba(var(--accent-rgb),0.6), inset 0 0 20px rgba(var(--accent-rgb),0.5)"
                    : "0 0 15px rgba(var(--accent-rgb),0.4), inset 0 0 15px rgba(var(--accent-rgb),0.4)",
                opacity: disabled ? 0.6 : 1,
            }}>
                <span style={{ color: focused ? "var(--accent-color)" : (isDarkMode ? "#a1a1aa" : "#94a3b8"), flexShrink: 0 }}>{icon}</span>
                <input
                    type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{
                        flex: 1, background: "none", border: "none", outline: "none",
                        fontSize: 14, fontWeight: 600,
                        color: isDarkMode ? "#f8fafc" : "#0f172a",
                        cursor: disabled ? "not-allowed" : "text",
                    }}
                />
            </div>
        </div>
    );
}


export function ModernStatCard({ icon, label, value, trend, color, isDarkMode, onClick }) {
    return (
        <div style={{
            padding: "20px", borderRadius: 24,
            background: "var(--card-bg)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${color}30`,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer", position: "relative", overflow: "hidden"
        }}
            onClick={onClick}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.boxShadow = `0 16px 40px ${color}25`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.boxShadow = "none"; }}
        >
            <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: color, filter: "blur(30px)", opacity: 0.15 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: trend > 0 ? "#10b981" : "#ef4444", background: trend > 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", padding: "4px 10px", borderRadius: 20 }}>
                    {trend > 0 ? `+${trend}%` : `${trend}%`}
                </div>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(22px, 6vw, 32px)", color: "var(--text-main)", letterSpacing: "-1px" }}>{value}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, fontWeight: 600 }}>{label}</div>
        </div>
    );
}

export function ActivityTimeline({ icon, iconBg, title, sub, time, status, statusColor, isDarkMode }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: `1px solid ${isDarkMode ? "rgba(var(--accent-rgb),0.1)" : "rgba(0,0,0,0.05)"}`, transition: "all 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateX(6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: iconBg, border: `1px solid ${statusColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-main)" }}>{title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, fontWeight: 500 }}>{sub}</div>
            </div>
            <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: statusColor, background: `${statusColor}15`, padding: "4px 12px", borderRadius: 20 }}>{status}</span>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontWeight: 600 }}><ClockIcon size={12} />{time}</div>
            </div>
        </div>
    );
}

export function ModernToggle({ label, desc, defaultOn, color, isDarkMode }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="modern-toggle-row" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 18px", borderRadius: 20,
            background: on ? `${color}0c` : "var(--card-bg)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${on ? color + "40" : (isDarkMode ? "rgba(var(--accent-rgb),0.1)" : "rgba(0,0,0,0.05)")}`,
            transition: "all 0.3s ease",
            cursor: "pointer",
        }} onClick={() => setOn(!on)}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-main)", whiteSpace: "normal", lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontWeight: 500, lineHeight: 1.4 }}>{desc}</div>
            </div>
            <div style={{
                width: 52, height: 28, borderRadius: 14, border: "none",
                background: on ? color : (isDarkMode ? "rgba(255,255,255,0.15)" : "#cbd5e1"),
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                boxShadow: on ? `0 0 16px ${color}60` : "none",
            }}>
                <div style={{
                    position: "absolute", top: 3, left: on ? 27 : 3, width: 22, height: 22,
                    borderRadius: "50%", background: "#fff",
                    transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }} />
            </div>
        </div>
    );
}

export function GlassBadge({ label, icon, color }) {
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 30,
            background: `${color}15`,
            border: `1px solid ${color}40`,
            fontSize: 12, fontWeight: 800, color,
            backdropFilter: "blur(4px)",
            letterSpacing: "0.02em"
        }}>
            {icon}<span>{label}</span>
        </div>
    );
}

export const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { transition: background 0.3s; overflow-x: hidden; }

:root {
  --bg-color: #f0fdf4;
  --text-main: #064e3b;
  --text-muted: #166534;
  --nav-bg: rgba(255, 255, 255, 0.6);
  --nav-border: rgba(6, 78, 59, 0.1);
  --card-bg: rgba(255, 255, 255, 0.8);
  --card-border: rgba(6, 78, 59, 0.1);
  --grid-line: rgba(6, 78, 59, 0.05);
  --accent-gradient: linear-gradient(135deg, #047857 0%, #10b981 50%, #0ea5e9 100%);
  --accent-color: #10b981;
  --accent-rgb: 16, 185, 129;
  --btn-text: #ffffff;
  --primary-btn-bg: linear-gradient(135deg, #ff2929ff 0%, #d30e0eff 100%);
}

[data-theme='dark'] {
  --bg-color: #060912;
  --text-main: #e6edf3;
  --text-muted: #9ca3af;
  --nav-bg: rgba(10, 14, 26, 0.7);
  --nav-border: rgba(255, 255, 255, 0.06);
  --card-bg: rgba(10, 14, 26, 0.65);
  --card-border: rgba(255, 255, 255, 0.08);
  --grid-line: rgba(255, 255, 255, 0.03);
  --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  --accent-color: #60a5fa;
  --accent-rgb: 96, 165, 250;
  --btn-text: #060912;
  --primary-btn-bg: linear-gradient(135deg, #ff2929ff 0%, #d30e0eff 100%);
}

body { background: var(--bg-color); color: var(--text-main); }

.nav-wrapper { position: relative; z-index: 100; margin: 9px 20px; transition: all 0.3s ease; }
.nav-glass { display:flex; align-items:center; justify-content:space-between; padding: 8px 26px; background:var(--nav-bg); backdrop-filter:blur(30px); -webkit-backdrop-filter:blur(30px); border:1px solid var(--nav-border); border-radius:30px; box-shadow:0 0px 40px rgba(43, 43, 43, 0.5); animation:fadeUp 0.6s ease-out; }
.nav-link { position:relative; color:var(--text-muted); text-decoration:none; font-family:'Syne',sans-serif; font-size:14px; font-weight:700; padding:8px 16px; border-radius:12px; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); overflow:hidden; }
.nav-link::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--text-main); opacity:0; z-index:-1; transition:opacity 0.3s ease; border-radius:12px; }
.nav-link:hover { color:var(--bg-color); transform:translateY(-2px); }
.nav-link:hover::before { opacity:1; }

.icon-btn { background:rgba(255,255,255,0.05); border:1px solid var(--nav-border); color:var(--text-main); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;left: 10px; }
.icon-btn:hover { background:var(--text-main); color:var(--bg-color); transform:scale(1.1) rotate(5deg); box-shadow:0 4px 12px rgba(0,0,0,0.1); }

.primary-btnDE {
  position:relative; background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 100%); background-size:200% 200%;
  color:#ffffff; border:none; border-radius:16px; font-family:'Syne',sans-serif; font-weight:800; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:10px; letter-spacing:0.3px; overflow:hidden;
  transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); animation:btnGradientMove 4s ease infinite;
  box-shadow:0 0 0 1px rgba(37,99,235,0.3),0 4px 15px rgba(37,99,235,0.3),0 0 40px rgba(14,165,233,0.15);
  font-family: 'DM Sans', 'Syne', sans-serif;
}
.primary-btnDE::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.25) 50%,transparent 100%); animation:shineSweep 3s ease-in-out infinite; pointer-events:none; }
.primary-btnDE::after { content:''; position:absolute; inset:-3px; border-radius:19px; background:var(--accent-gradient); background-size:300% 300%; z-index:-1; opacity:0.6; filter:blur(6px); animation:btnGradientMove 4s ease infinite; }
.primary-btnDE:hover { transform:translateY(-1px) scale(1.01); box-shadow:0 0 0 1px rgba(14,165,233,0.5),0 8px 30px rgba(37,99,235,0.5),0 0 60px rgba(14,165,233,0.3); }
.primary-btnDE:active { transform:translateY(1px) scale(0.98); }

:root .primary-btnDE { background:linear-gradient(135deg,#059669 0%,#0a523a9a 50%,#197553ff 100%); box-shadow:0 0 0 1px rgba(5,150,105,0.3),0 4px 15px rgba(5,150,105,0.3),0 0 40px rgba(52,211,153,0.15); }
:root .primary-btnDE::after { background:linear-gradient(135deg,#059669,#10b981,#34d399,#059669); }
[data-theme='dark'] .primary-btnDE { background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 100%); box-shadow:0 0 0 1px rgba(37,99,235,0.3),0 4px 15px rgba(37,99,235,0.3),0 0 40px rgba(14,165,233,0.15); }
[data-theme='dark'] .primary-btnDE::after { background:linear-gradient(135deg,#2563eb,#0ea5e9,#6366f1,#2563eb); }

.secondary-btn { background:transparent; color:var(--text-main); border:1px solid var(--card-border); padding:14px 28px; border-radius:16px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:10px; }
.secondary-btn:hover {color:var(--bg-color); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
.secondary-btn svg { transition:transform 0.3s ease; }
.secondary-btn:hover svg { transform:translateX(4px); }

.secondary-btnkk { background:transparent; color:var(--text-main); border:1px solid var(--card-border); padding:14px 28px; border-radius:16px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:10px; }
.secondary-btnkk:hover {color:var(--bg-coloor); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
.secondary-btnkk svg { transition:transform 0.3s ease; }
.secondary-btnkk:hover svg { transform:translateX(4px); }

.camera-overlay { opacity: 0; pointer-events: none; }
label:hover .camera-overlay { opacity: 1; }

.secondary-btne { background:transparent; color:var(--text-main); border:1px solid var(--card-border); padding:14px 28px; border-radius:16px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:10px; }
.secondary-btne:hover {background-color: var(--text-main); color:var(--bg-color); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
.secondary-btne svg { transition:transform 0.3s ease; }
.secondary-btne:hover svg { transform:translateX(4px); }
.primary-btnE { color:#ffffff; border:none; padding:10.5px 30px; border-radius:12px; font-family:'Syne',sans-serif; font-size:15.3px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:8px; backdrop-filter:blur(4px); background:var(--text-main); }
.primary-btnE:hover { background:var(--accent-gradient); color:white; transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.1); border:none; }
[data-theme='dark'] .primary-btnE { background:linear-gradient(155deg,#1e3a8a,#1d4ed8); box-shadow:0px 0px 15px #1e3a8a; }

@keyframes fadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
@keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
@keyframes glowPulse { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:0.7;transform:scale(1.1);} }
@keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
@keyframes spinWheel { 100%{transform:rotate(360deg);} }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
@keyframes inputGlowContinuous { 
    0%, 100% { box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.3), inset 0 0 10px rgba(var(--accent-rgb), 0.3); } 
    50% { box-shadow: 0 0 25px rgba(var(--accent-rgb), 0.6), inset 0 0 25px rgba(var(--accent-rgb), 0.7); border-color: rgba(var(--accent-rgb), 0.8) !important; } 
}

.glass-panel {
  background: var(--card-bg);
  backdrop-filter: blur(32px);
  border: 1px solid var(--card-border);
  border-radius: 32px;
}

  @media (max-width: 768px) {
    /* === PREVENT ALL HORIZONTAL OVERFLOW === */
    html, body { overflow-x: hidden !important; max-width: 100vw !important; }
    * { max-width: 100%; }

    /* === NAVBAR === */
    .nav-wrapper { margin: 8px 10px !important; }
    .nav-glass { padding: 8px 12px !important; border-radius: 20px !important; }
    .icon-btn { position: static !important; left: auto !important; padding: 8px !important; }

    /* === PANELS === */
    .glass-panel { border-radius: 20px !important; }

    /* === TABS: hide scrollbar but keep scrollable === */
    .profile-tabs { gap: 6px !important; padding: 6px !important; }
    .profile-tabs::-webkit-scrollbar { display: none; }
    .profile-tabs { -ms-overflow-style: none; scrollbar-width: none; }

    /* === BUTTONS: scale down gracefully === */
    .primary-btnDE { font-size: 13px !important; gap: 8px !important; }
    .secondary-btn, .secondary-btne, .secondary-btnkk {
      padding: 10px 16px !important;
      font-size: 13px !important;
      border-radius: 14px !important;
      gap: 6px !important;
    }

    /* === MOBILE MENU SHEET === */
    .mob-menu-panel { position: fixed; inset: 0; z-index: 9999; display: flex; flex-direction: column; pointer-events: none; }
    .mob-menu-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); pointer-events: all; }
    .mob-menu-sheet { position: absolute; top: 68px; left: 10px; right: 10px; border-radius: 24px; overflow: hidden; pointer-events: all; animation: mobileMenuSlideDown 0.35s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes mobileMenuSlideDown {
      from { opacity: 0; transform: translateY(-16px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* === TOGGLE ROW === */
    .modern-toggle-row { padding: 14px 16px !important; }
    .modern-toggle-row > div:first-child { flex: 1 !important; min-width: 0 !important; }
    .modern-toggle-row > div:last-child { flex-shrink: 0 !important; }
  }
`;

export default function Profile() {
    const navigate = useNavigate();
    const [selectedLang] = useState(localStorage.getItem("appLang") || "FR");

    const t = (path, defaultText) => {
        if (selectedLang !== "AR" && selectedLang !== "FR") return defaultText;
        const keys = path.split('.');
        let current = selectedLang === "AR" ? { ...AR } : { ...FR };
        for (let key of keys) {
            if (current[key] === undefined) return defaultText;
            current = current[key];
        }
        return current;
    };

    useEffect(() => {
        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
    }, [selectedLang]);
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("appTheme") === "dark"
    );
    const [activeTab, setActiveTab] = useState("overview");
    const [showAllActivities, setShowAllActivities] = useState(false);

    const [favoritesCount, setFavoritesCount] = useState(0);
    const [reservationsCount, setReservationsCount] = useState(0);
    const [viewedCount, setViewedCount] = useState(0);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favoriteCars") || "[]");
        const resv = JSON.parse(localStorage.getItem("userReservations") || "[]");
        const views = JSON.parse(localStorage.getItem("viewedCars") || "[]");
        const acts = JSON.parse(localStorage.getItem("userActivity") || "[]");

        setFavoritesCount(favs.length);
        setReservationsCount(resv.length);
        setViewedCount(views.length);
        setActivities(acts);
    }, []);

    const clearActivities = () => {
        localStorage.removeItem("userActivity");
        localStorage.removeItem("viewedCars");
        setActivities([]);
        setViewedCount(0);
    };

    // Form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // Navbar states
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Profile Image Handler
    const [profileImage, setProfileImage] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);

                // 🔥 sauvegarde
                localStorage.setItem("profileImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const pUser = JSON.parse(storedUser);
                setFirstName(pUser.firstName || "");
                setLastName(pUser.lastName || "");
                setEmail(pUser.email || "");
                setPhone(pUser.number || pUser.phone || "");
                setCurrentUser(pUser);
            } catch (e) {
                console.error("Error parsing user data", e);
            }
        }
    }, []);
    const handleRemoveImage = () => {
        setProfileImage(null);

        // 🔥 supprimer du localStorage
        localStorage.removeItem("profileImage");
    };
    useEffect(() => {
        const t = isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("appTheme", t);
    }, [isDarkMode]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSave = () => {
        setIsEditing(false);
        // Implement save logic to backend here
    };

    const tabs = [
        { id: "overview", label: t("profile.tabs.overview", "Overview"), icon: <GlobeIcon size={16} /> },
        { id: "settings", label: t("profile.tabs.settings", "Settings"), icon: <SettingsIcon size={16} /> },
        { id: "security", label: t("profile.tabs.security", "Security"), icon: <ShieldIcon size={16} /> },
        { id: "password", label: t("profile.tabs.password", "Modify Password"), icon: <LockIcon size={16} /> }
    ];


    return (
        <div style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            background: `url(${isDarkMode ? bgImageDark : bgImageLight}) center/cover no-repeat fixed`,
            fontFamily: "'Inter', 'DM Sans', sans-serif",
            position: "relative", overflowX: "hidden", maxWidth: "100vw"
        }}>
            <div style={{
                position: "absolute", inset: 0,
                zIndex: 0, pointerEvents: "none"
            }} />
            <style>{css}</style>

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

                {/* Navbar matching HomeConnect exactly */}
                <div className="nav-wrapper" dir="ltr">
                    <nav className="nav-glass">
                        <AnimatedLogo onClick={() => navigate("/homeConnect")} />
                        {!isMobile && (
                            <ul style={{ display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0, position: "relative", left: selectedLang === "AR" ? "auto" : "1.8%", right: selectedLang === "AR" ? "2.9%" : "auto" }}>
                                {[
                                    { k: "vehicles", l: t("profile.nav.vehicles", "Vehicles") },
                                    { k: "services", l: t("profile.nav.services", "Services") },
                                    { k: "pricing", l: t("profile.nav.pricing", "Pricing"), b: true },
                                    { k: "aboutUs", l: t("profile.nav.aboutUs", "About Us") }
                                ].map(({ k, l, b }) => (
                                    <li key={k}>
                                        <span className="nav-link" style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                                            {l}
                                            {b && <span style={{ background: "var(--accent-gradient)", color: isDarkMode ? "#000" : "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>{t("profile.nav.new", "New")}</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
                            {isMobile ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                    </button>
                                    <button
                                        className="icon-btn"
                                        onClick={() => setMobileMenuOpen(p => !p)}
                                        style={{ background: mobileMenuOpen ? "var(--text-main)" : "transparent", color: mobileMenuOpen ? "var(--bg-color)" : "var(--text-main)" }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {mobileMenuOpen
                                                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                                                : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="14" x2="20" y2="14" /></>
                                            }
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                    </button>
                                    <div style={{ width: 1, height: 24, background: "var(--nav-border)", margin: "0 4px" }} />
                                    <div className="login-menu-wrap" style={{ position: "relative" }}>
                                        {currentUser ? (
                                            <div style={{ position: "relative" }}>
                                                {/* Avatar pill */}
                                                {/* Avatar pill — Format 5 Floating glow card */}
                                                <div style={{
                                                    display: "inline-flex", alignItems: "center", gap: 13,
                                                    padding: "13px 15px 13px 15px", borderRadius: 18,
                                                    background: isDarkMode
                                                        ? "rgba(10,8,24,0.9)"
                                                        : "rgba(255,255,255,0.95)",
                                                    border: `2px solid ${isDarkMode ? "rgba(150, 62, 231, 0.4)" : "rgba(114, 250, 2, 0.93)"}`,
                                                    cursor: "pointer", position: "relative", overflow: "hidden",
                                                    boxShadow: isDarkMode
                                                        ? "0 0 0 1px rgba(168,85,247,0.1), 0 8px 32px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.08)"
                                                        : "0 0 0 1px rgba(43, 233, 68, 0.58)), 0 8px 32px rgba(18, 180, 39, 0.43), 0 4px 16px rgba(248, 248, 248, 0.06)",
                                                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                                    backdropFilter: "blur(20px)",
                                                }}
                                                    onClick={() => setUserMenuOpen(p => !p)}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.boxShadow = isDarkMode
                                                            ? "0 0 0 1px rgba(168,85,247,0.3), 0 12px 40px rgba(168,85,247,0.35), 0 0 80px rgba(168,85,247,0.15)"
                                                            : "0px 0px 15px rgba(100, 237, 58, 0.61)";
                                                        e.currentTarget.style.transform = "translateY(-2px)";
                                                        e.currentTarget.style.borderColor = isDarkMode ? "rgba(168,85,247,0.7)" : "rgba(100, 237, 58, 0.61)";
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.boxShadow = isDarkMode
                                                            ? "0 0 0 1px rgba(168,85,247,0.1), 0 8px 32px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.08)"
                                                            : "0px 0px 5px rgba(100, 237, 58, 0.61)";
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                        e.currentTarget.style.borderColor = isDarkMode ? "rgba(168,85,247,0.4)" : "rgba(100, 237, 58, 0.61)";
                                                    }}
                                                >
                                                    {/* Glow line top */}
                                                    <div style={{
                                                        position: "absolute", top: -1, left: "20%", right: "20%", height: 1,
                                                        background: isDarkMode
                                                            ? "linear-gradient(90deg, transparent, rgba(168,85,247,0.9), transparent)"
                                                            : "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
                                                        pointerEvents: "none",
                                                    }} />

                                                    {/* Shine sweep */}
                                                    <div style={{
                                                        position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%",
                                                        background: isDarkMode
                                                            ? "linear-gradient(120deg, transparent, rgba(168,85,247,0.08), transparent)"
                                                            : "linear-gradient(120deg, transparent, rgba(124,58,237,0.06), transparent)",
                                                        animation: "shineSweep 3s ease-in-out infinite",
                                                        pointerEvents: "none", borderRadius: 18,
                                                    }} />

                                                    {/* Avatar */}
                                                    {/* Avatar */}
                                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                                        <div style={{
                                                            width: 36, height: 36, borderRadius: 12,
                                                            background: "var(--accent-gradient)",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff",
                                                            overflow: "hidden",  // ← ajoute ça
                                                            boxShadow: isDarkMode
                                                                ? "0 0 20px rgba(168,85,247,0.6)"
                                                                : "0 0 16px rgba(124,58,237,0.4), 0 4px 12px rgba(0,0,0,0.1)",
                                                        }}>
                                                            {profileImage ? (  // ← condition image
                                                                <img
                                                                    src={profileImage}
                                                                    alt="avatar"
                                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                />
                                                            ) : (
                                                                currentUser.email.charAt(0).toUpperCase()
                                                            )}
                                                        </div>
                                                        {/* Point online */}
                                                        <div style={{
                                                            position: "absolute", bottom: -2, right: -2,
                                                            width: 11, height: 11, borderRadius: "50%",
                                                            background: "#22c55e",
                                                            border: `2px solid ${isDarkMode ? "#0a0818" : "#fff"}`,
                                                            boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                                                            animation: "pulse 2s infinite",
                                                        }} />
                                                    </div>

                                                    {/* Texte */}
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                        <span style={{
                                                            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15,
                                                            ...(isDarkMode ? {
                                                                background: "linear-gradient(90deg, #e6edf3, #c084fc)",
                                                                WebkitBackgroundClip: "text", backgroundClip: "text",
                                                                WebkitTextFillColor: "transparent",
                                                                display: "inline-block",
                                                            } : {
                                                                color: "var(--accent-gradient)",
                                                            })
                                                        }}>
                                                            {currentUser.name || currentUser.email.split("@")[0]}
                                                        </span>
                                                        <span style={{
                                                            fontFamily: "'DM Sans', sans-serif", fontSize: 12.5,
                                                            color: isDarkMode ? "rgba(231, 231, 231, 0.8)" : "rgba(0, 0, 0, 0.7)",
                                                        }}>
                                                            {currentUser.email}
                                                        </span>
                                                    </div>

                                                    {/* Chevron */}
                                                    <svg style={{
                                                        marginLeft: 2, opacity: isDarkMode ? 0.6 : 0.7,
                                                        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                                                        transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                                                    }}
                                                        width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                        stroke={isDarkMode ? "#a855f7" : "#7c3aed"}
                                                        strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </div>
                                                {/* Dropdown menu */}
                                                <div style={{
                                                    position: "absolute", top: "calc(100% + 12px)", right: 0,
                                                    width: 240, borderRadius: 20, overflow: "hidden",
                                                    background: isDarkMode ? "rgba(10,12,24,0.97)" : "rgba(255,255,255,0.97)",
                                                    border: `1px solid ${isDarkMode ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"}`,
                                                    boxShadow: isDarkMode
                                                        ? "0 0 0 1px rgba(168,85,247,0.15), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.08)"
                                                        : "0 0 0 1px rgba(168,85,247,0.1), 0 20px 40px rgba(0,0,0,0.12)",
                                                    backdropFilter: "blur(20px)",
                                                    opacity: userMenuOpen ? 1 : 0,
                                                    visibility: userMenuOpen ? "visible" : "hidden",
                                                    transform: userMenuOpen ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.96)",
                                                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                                                    zIndex: 999,
                                                }}>
                                                    {/* Glow top */}
                                                    <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)" }} />

                                                    {/* Header user info */}
                                                    <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                                                            <div>
                                                                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--accent-color)", fontFamily: "'Syne',sans-serif" }}>{currentUser.name || currentUser.email.split("@")[0]}</div>
                                                                <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Sans',sans-serif", position: "relative", top: 3.6 }}>{currentUser.email}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Menu items */}
                                                    {[
                                                        { id: "myReservations", label: t("profile.userMenu.myReservations", "Mes Réservations"), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, color: isDarkMode ? "#60a5fa" : "#2563eb" },
                                                        { id: "favorites", label: t("profile.userMenu.favorites", "Favoris"), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>, color: isDarkMode ? "#f43f5e" : "#e11d48" },
                                                    ].map(({ id, label, icon, color }) => (
                                                        <div key={id} style={{ padding: "11px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s ease", color: "var(--text-main)" }}
                                                            onClick={() => {
                                                                if (id === "favorites") navigate("/favorites");
                                                                if (id === "myReservations") navigate("/profile"); // Or wherever reservations should go
                                                            }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.paddingLeft = "22px"; e.currentTarget.style.paddingRight = "14px"; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "18px"; e.currentTarget.style.paddingRight = "18px"; }}>
                                                            <div style={{ width: 30, height: 30, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0, transition: "all 0.2s" }}>
                                                                {icon}
                                                            </div>
                                                            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                                                            <svg style={{ marginLeft: selectedLang === "AR" ? 0 : "auto", marginRight: selectedLang === "AR" ? "auto" : 0, opacity: 0.4, transform: selectedLang === "AR" ? "rotate(180deg)" : "none" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                                        </div>
                                                    ))}

                                                    {/* Divider */}
                                                    <div style={{ height: 1, background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", margin: "4px 0" }} />

                                                    {/* Log out */}
                                                    <div style={{ padding: "11px 18px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s ease" }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.paddingLeft = "22px"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "18px"; }}
                                                        onClick={() => {
                                                            localStorage.removeItem("accessToken");
                                                            localStorage.removeItem("refreshToken");
                                                            localStorage.removeItem("user");
                                                            setCurrentUser(null);
                                                            setUserMenuOpen(false);
                                                            navigate("/");
                                                        }}>
                                                        <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                                        </div>
                                                        <span style={{ fontSize: 14, fontWeight: 600, color: "#ef4444", fontFamily: "'DM Sans',sans-serif" }}>{t("profile.userMenu.logout", "Log out")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <button className="primary-btnE" style={isMobile ? { padding: "8px 14px", fontSize: 13 } : {}} onClick={() => setMenuOpen(p => !p)}>
                                                    {t("profile.nav.login", "Se connecter")}
                                                    <svg style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </button>
                                                <div style={{
                                                    position: "absolute", top: "calc(100% + 14px)",
                                                    left: selectedLang === "AR" ? "auto" : "40%",
                                                    right: selectedLang === "AR" ? "40%" : "auto",
                                                    transform: menuOpen ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-12px) scale(0.95)",
                                                    opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden",
                                                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                                    width: 280, borderRadius: 24, overflow: "hidden",
                                                    background: isDarkMode ? "linear-gradient(145deg, rgba(12,14,26,0.98), rgba(7,9,18,0.99))" : "rgba(255,255,255,0.98)",
                                                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(6,78,59,0.1)"}`,
                                                    boxShadow: isDarkMode ? "0 0 0 2px rgba(96,165,250,0.2), 0 4px 20px rgba(96,165,250,0.15)" : "0 0 0 2px rgba(16,185,129,0.2), 0 4px 20px rgba(16,185,129,0.15)",
                                                    zIndex: 999,
                                                }}>
                                                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(96,165,250,0.6)" : "rgba(16,185,129,0.6)"}, transparent)` }} />
                                                    {[
                                                        { label: t("profile.nav.client", "Client"), desc: t("profile.nav.clientDesc", "Louer un véhicule"), color: isDarkMode ? "#60a5fa" : "#10b981", glow: isDarkMode ? "rgba(96,165,250,0.12)" : "rgba(16,185,129,0.08)", badge: null, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                                                        { label: t("profile.nav.agency", "Agence de location"), desc: t("profile.nav.agencyDesc", "Gérer ma flotte"), color: isDarkMode ? "#a855f7" : "#047857", glow: isDarkMode ? "rgba(168,85,247,0.12)" : "rgba(4,120,87,0.08)", badge: t("profile.nav.badgePro", "Pro"), icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><path d="M8 7V5a2 2 0 0 0-4 0v2" /></svg> },
                                                    ].map(({ label, desc, color, glow, badge, icon }, i) => (
                                                        <div key={label} style={{ padding: "12px 15px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, borderBottom: i === 0 ? `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.06)"}` : "none", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", position: "relative" }}
                                                            onClick={() => { if (label === "Client") navigate("/login"); }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = glow; e.currentTarget.style.transform = "translateX(1px)"; const ico = e.currentTarget.querySelector(".mico"); ico.style.background = `${color}25`; ico.style.borderColor = `${color}50`; ico.style.boxShadow = `0 0 16px ${color}30`; ico.style.transform = "scale(1.01) rotate(-4deg)"; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; const ico = e.currentTarget.querySelector(".mico"); ico.style.background = `${color}10`; ico.style.borderColor = `${color}25`; ico.style.boxShadow = "none"; ico.style.transform = "none"; }}>
                                                            <div className="mico" style={{ width: 42, height: 42, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}10`, border: `1px solid ${color}25`, color, transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}>{icon}</div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "var(--text-main)", marginBottom: 2 }}>{label}</div>
                                                                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans',sans-serif" }}>{desc}</div>
                                                            </div>
                                                            {badge && <div style={{ padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", background: "linear-gradient(135deg, #a855f7, #6366f1)", color: "#fff", animation: "pulse 2s ease-in-out infinite" }}>{badge}</div>}
                                                            <svg style={{ color: "var(--text-muted)", flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </nav>

                    {isMobile && mobileMenuOpen && (
                        <div className="mob-menu-panel" onClick={() => setMobileMenuOpen(false)}>
                            <div className="mob-menu-backdrop" />
                            <div className="mob-menu-sheet" style={{
                                background: isDarkMode ? "rgba(10,8,24,0.97)" : "rgba(255,255,255,0.98)",
                                border: `1px solid ${isDarkMode ? "rgba(168,85,247,0.2)" : "rgba(16,185,129,0.2)"}`,
                            }} onClick={e => e.stopPropagation()}>

                                {currentUser && (
                                    <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(128,128,128,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--accent-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 16, overflow: "hidden" }}>
                                            {profileImage ? <img src={profileImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : currentUser.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-main)" }}>{currentUser.name || currentUser.email.split("@")[0]}</div>
                                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{currentUser.email}</div>
                                        </div>
                                    </div>
                                )}

                                {[
                                    { label: t("profile.nav.vehicles", "Vehicles"), path: "/homeConnect" },
                                    { label: t("profile.nav.services", "Services"), path: "/services" },
                                    { label: t("profile.nav.pricing", "Pricing"), path: "/pricing" },
                                    { label: t("profile.nav.aboutUs", "About Us"), path: "/about" },
                                ].map(item => (
                                    <div key={item.path} onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "var(--text-main)", cursor: "pointer", borderBottom: "1px solid rgba(128,128,128,0.07)" }}>
                                        {item.label}
                                    </div>
                                ))}

                                {currentUser && (
                                    <div onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("user"); setCurrentUser(null); setMobileMenuOpen(false); navigate("/"); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "#ef4444", cursor: "pointer" }}>
                                        {t("profile.userMenu.logout", "Log out")}
                                    </div>
                                )}
                                {!currentUser && (
                                    <div onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "var(--accent-color)", cursor: "pointer" }}>
                                        {t("profile.nav.login", "Se connecter")}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>



                {/* Main Asymmetrical Layout */}
                <div style={{ flex: 1, padding: isMobile ? "16px 12px" : "66px 5%", display: "flex", gap: isMobile ? 20 : 40, alignItems: "flex-start", maxWidth: 1600, margin: "0 auto", width: "100%", boxSizing: "border-box", overflowX: "hidden", flexDirection: isMobile ? "column" : "row" }}>

                    {/* Left Sticky User Card */}
                    <div className="glass-panel" style={{ width: isMobile ? "100%" : 380, position: isMobile ? "static" : "sticky", top: 6, padding: isMobile ? 20 : 32, display: "flex", flexDirection: "column", gap: 24, animation: "fadeUp 0.6s ease" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
                            <label

                                style={{
                                    cursor: "pointer",
                                    width: 140,
                                    height: 140,
                                    borderRadius: "50%",
                                    border: "3.5px solid rgba(var(--accent-rgb), 0.5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 48,
                                    fontWeight: 900,
                                    color: "var(--text-main)",
                                    position: "relative",
                                    overflow: "hidden",
                                    background: isDarkMode
                                        ? "linear-gradient(to top, rgba(43, 178, 231, 0.3), transparent)"
                                        : "linear-gradient(to top, rgba(34,197,94,0.2), transparent)",
                                }}

                            >
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <>{currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}</>
                                )}

                                {/* Camera overlay on hover universally */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "rgba(0,0,0,0.4)",
                                        opacity: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "0.3s",
                                    }}
                                    className="camera-overlay"
                                >
                                    <CameraIcon color="#fff" />
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageUpload}
                                />
                            </label>

                            {profileImage ? (
                                <button
                                    onClick={handleRemoveImage}
                                    style={{
                                        position: "absolute",
                                        top: 105,
                                        right: "calc(50% - 70px)",
                                        background: "var(--bg-color)",
                                        border: "2px solid #ef4444",
                                        borderRadius: "50%",
                                        width: 34,
                                        height: 34,
                                        color: "#ef4444",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                                        zIndex: 10,
                                    }}
                                >
                                    <TrashIcon size={16} />
                                </button>
                            ) : (
                                <label
                                    style={{
                                        position: "absolute",
                                        top: 105,
                                        right: "calc(50% - 70px)",
                                        background: "var(--accent-color)",
                                        border: `2px solid var(--bg-color)`,
                                        borderRadius: "50%",
                                        width: 34,
                                        height: 34,
                                        color: "#fff",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                                        zIndex: 10,
                                    }}
                                >
                                    <CameraIcon size={16} color="#fff" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 900, color: "var(--text-main)", marginTop: 24, letterSpacing: "-0.5px" }}>
                                {currentUser?.name || t("profile.sidebar.user", "Utilisateur")}
                            </h2>
                            <div style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}><MapPinIcon size={14} /> {t("profile.sidebar.location", "Casablanca, MA")}</div>

                            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                                <GlassBadge label="VIP" icon={<AwardIcon size={14} />} color="#fbbf24" />
                                <GlassBadge label={t("profile.sidebar.verified", "Verified")} icon={<ShieldIcon size={14} />} color="#10b981" />
                            </div>
                        </div>

                        <div style={{ height: 1, background: "var(--card-border)", margin: "8px 0" }} />

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>{t("profile.sidebar.memberSince", "Member since")}</span>
                                <span style={{ fontSize: 13, color: "var(--text-main)", fontWeight: 800 }}>March 2026</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>{t("profile.sidebar.totalRented", "Total Rented")}</span>
                                <span style={{ fontSize: 13, color: "var(--text-main)", fontWeight: 800 }}>{reservationsCount} {t("profile.sidebar.vehiclesCount", "Vehicles")}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>{t("profile.sidebar.loyaltyPoints", "Loyalty Points")}</span>
                                <span style={{ fontSize: 13, color: "var(--accent-color)", fontWeight: 800, display: "flex", alignItems: "center", gap: 4 }}><StarIcon size={12} filled /> 1,250</span>
                            </div>
                        </div>

                        <button className="primary-btnDE" style={{ width: "100%", padding: isMobile ? 14 : 18, marginTop: 8 }} onClick={() => { setActiveTab("settings"); setIsEditing(!isEditing); }}>
                            {isEditing && activeTab === "settings" ? <><SaveIcon /> {t("profile.sidebar.save", "Save")}</> : <><SettingsIcon /> {t("profile.sidebar.editProfile", "Edit Profile")}</>}
                        </button>
                    </div>

                    {/* Right Content Area */}
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: isMobile ? 24 : 32, animation: "fadeUp 0.8s ease" }}>

                        {/* Tabs Navigation */}
                        <div className="glass-panel profile-tabs" style={{ padding: isMobile ? 6 : 12, display: "flex", gap: isMobile ? 4 : 12, overflowX: "auto", borderRadius: 24, scrollbarWidth: "none" }}>
                            {tabs.map(tab => (
                                <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                    display: "flex", alignItems: "center", gap: isMobile ? 6 : 10,
                                    padding: isMobile ? "9px 12px" : "14px 24px",
                                    borderRadius: 14, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                    background: activeTab === tab.id ? "var(--accent-color)" : "transparent",
                                    color: activeTab === tab.id ? (isDarkMode ? "#000" : "#fff") : "var(--text-muted)",
                                    fontWeight: 700, fontSize: isMobile ? 12 : 14, flexShrink: 0, whiteSpace: "nowrap",
                                    boxShadow: activeTab === tab.id ? "0 8px 24px rgba(var(--accent-rgb), 0.4)" : "none"
                                }}>
                                    {!isMobile && tab.icon} {tab.label}
                                </div>
                            ))}
                        </div>

                        {/* Overview Content */}
                        {activeTab === "overview" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 32, animation: "fadeUp 0.4s ease" }}>
                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                                    <ModernStatCard icon={<CarIcon size={24} />} label={t("profile.overview.vehiclesViewed", "Vehicles Viewed")} value={viewedCount.toString()} trend={12} color="#3b82f6" isDarkMode={isDarkMode} />
                                    <ModernStatCard icon={<HeartIcon size={24} />} label={t("profile.overview.savedFavorites", "Saved Favorites")} value={favoritesCount.toString()} trend={5} color="#ec4899" isDarkMode={isDarkMode} onClick={() => navigate("/favorites")} />
                                    <ModernStatCard icon={<AwardIcon size={24} />} label={t("profile.overview.scheduledTests", "Scheduled Tests")} value={reservationsCount.toString()} trend={-2} color="#10b981" isDarkMode={isDarkMode} />
                                </div>
                                <div className="glass-panel" style={{ padding: isMobile ? 20 : 40 }}>
                                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 16 : 0, justifyContent: "space-between", marginBottom: 32 }}>
                                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? 20 : 24, fontWeight: 900, color: "var(--text-main)" }}>
                                            {t("profile.overview.recentActivity", "Recent Activity")}
                                        </h3>
                                        <div style={{ display: "flex", gap: 12, width: isMobile ? "100%" : "auto" }}>
                                            <button
                                                className="secondary-btne"
                                                style={{
                                                    padding: "10px 20px",
                                                    borderColor: "rgba(239, 68, 68, 0.3)",
                                                    color: "#ef4444",
                                                    width: isMobile ? "100%" : "auto"
                                                }}
                                                onClick={clearActivities}
                                            >
                                                {selectedLang === "AR" ? "مسح الكل" : "Supprimer tout"} <TrashIcon size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                        {activities.length > 0 ? (
                                            activities.slice(0, showAllActivities ? 50 : 3).map((activity, idx) => (
                                                <div key={activity.id} style={{
                                                    display: "flex", gap: 12, padding: isMobile ? "12px 14px" : "16px 20px",
                                                    background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(6,78,59,0.03)",
                                                    borderRadius: 16, border: "1px solid var(--card-border)",
                                                    animation: `fadeUp 0.4s ease both ${idx * 0.05}s`
                                                }}>
                                                    <div style={{
                                                        width: 40, height: 40, borderRadius: 12,
                                                        background: activity.type === 'favorite_add' ? "rgba(236,72,153,0.15)" :
                                                            activity.type === 'booking' ? "rgba(59,130,246,0.15)" :
                                                                activity.type === 'view' ? "rgba(16,185,129,0.15)" : "rgba(168,85,247,0.15)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        color: activity.type === 'favorite_add' ? "#ec4899" :
                                                            activity.type === 'booking' ? "#3b82f6" :
                                                                "#10b981"
                                                    }}>
                                                        {activity.type === 'favorite_add' ? <HeartIcon size={20} /> :
                                                            activity.type === 'booking' ? <CarIcon size={20} /> :
                                                                <ZapIcon size={20} />}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-main)", wordBreak: "break-word" }}>
                                                            {activity.type === 'favorite_add' ? t("profile.activity.favorited", "Vous avez ajouté aux favoris") :
                                                                activity.type === 'favorite_remove' ? t("profile.activity.removedFav", "Vous avez retiré des favoris") :
                                                                    activity.type === 'booking' ? t("profile.activity.booked", "Vous avez réservé") :
                                                                        t("profile.activity.viewed", "Vous avez consulté")}
                                                            <span style={{ color: "var(--accent-color)", marginLeft: 6 }}>{activity.details.carName || "BMW M4 Competition"}</span>
                                                        </div>
                                                        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                                                            {new Date(activity.timestamp).toLocaleString(selectedLang === "AR" ? "ar-MA" : "fr-FR", {
                                                                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{
                                                display: "flex", flexDirection: "column", alignItems: "center",
                                                justifyContent: "center", padding: "48px 20px", gap: 20,
                                                background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(6,78,59,0.02)",
                                                borderRadius: 24, border: "1px dashed var(--card-border)",
                                                position: "relative", overflow: "hidden", width: "100%"
                                            }}>
                                                <div style={{ textAlign: "center", zIndex: 1 }}>
                                                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "var(--text-main)", marginBottom: 8, textAlign: "center" }}>
                                                        {t("profile.overview.noActivity", "No activity yet")}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, maxWidth: 260, lineHeight: 1.6, margin: "0 auto", textAlign: "center" }}>
                                                        {t("profile.overview.noActivityDesc", "Your bookings, favorites and actions will appear here from your first interaction.")}
                                                    </div>
                                                    <button
                                                        className="primary-btnDE"
                                                        style={{ padding: "12px 28px", fontSize: 13, borderRadius: 12, marginTop: 24, position: "relative", left: isMobile ? 34 : 30 }}
                                                        onClick={() => navigate("/homeConnect")}
                                                    >
                                                        {t("profile.overview.exploreVehicles", "Explorer les véhicules")}
                                                        <ArrowRightIcon size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {activities.length > 0 && (
                                        <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-end", marginTop: 16 }}>
                                            <button
                                                className="secondary-btne"
                                                style={{ padding: "10px 20px", fontSize: 15, position: "relative", top: 10, width: isMobile ? "100%" : "auto" }}
                                                onClick={() => setShowAllActivities(!showAllActivities)}
                                            >
                                                {showAllActivities
                                                    ? (selectedLang === "AR" ? "عرض أقل" : "Voir moins")
                                                    : (selectedLang === "AR" ? "عرض الكل" : t("profile.overview.seeAll", "Voir tout"))
                                                }
                                                <ArrowRightIcon size={14} style={{ transform: showAllActivities ? "rotate(-90deg)" : "none", transition: "transform 0.3s" }} />
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        {/* Settings Form Content */}
                        {activeTab === "settings" && (
                            <div className="glass-panel" style={{ padding: isMobile ? 20 : 40, animation: "fadeUp 0.4s ease" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: isMobile ? 24 : 40 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--accent-gradient)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 8px 24px rgba(var(--accent-rgb), 0.3)" }}>
                                        <SettingsIcon size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 4vw, 28px)", fontWeight: 900, color: "var(--text-main)", letterSpacing: "-0.5px" }}>{t("profile.settings.title", "Personal Information")}</h3>
                                        <p style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500, marginTop: 4 }}>{t("profile.settings.desc", "Manage your contact information and account preferences.")}</p>
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 32 }}>
                                    <GlassInput label={t("profile.settings.firstName", "First Name")} icon={<span>A</span>} value={firstName} onChange={e => setFirstName(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.firstName", "Votre prénom")} isDarkMode={isDarkMode} />
                                    <GlassInput label={t("profile.settings.lastName", "Last Name")} icon={<span>Z</span>} value={lastName} onChange={e => setLastName(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.lastName", "Votre nom")} isDarkMode={isDarkMode} />
                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <GlassInput label={t("profile.settings.email", "Email Address")} icon={<GlobeIcon size={18} />} type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.email", "exemple@email.com")} isDarkMode={isDarkMode} />
                                    </div>
                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <GlassInput label={t("profile.settings.phone", "Phone Number")} icon={<MapPinIcon size={18} />} type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.phone", "+212 600-000000")} isDarkMode={isDarkMode} />
                                    </div>
                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <GlassInput label={t("profile.settings.address", "Full Address")} icon={<MapPinIcon size={18} />} type="text" value={address} onChange={e => setAddress(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.address", "123 Avenue des Palmiers")} isDarkMode={isDarkMode} />
                                    </div>
                                    <GlassInput label={t("profile.settings.city", "City")} icon={<MapPinIcon size={18} />} value={city} onChange={e => setCity(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.city", "Casablanca")} isDarkMode={isDarkMode} />
                                    <GlassInput label={t("profile.settings.country", "Country")} icon={<GlobeIcon size={18} />} value={country} onChange={e => setCountry(e.target.value)} disabled={!isEditing} placeholder={t("profile.settings.placeholders.country", "Maroc")} isDarkMode={isDarkMode} />
                                </div>

                                {isEditing && (
                                    <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row", justifyContent: "flex-end", gap: 16, marginTop: isMobile ? 24 : 40, animation: "fadeUp 0.3s ease" }}>
                                        <button className="secondary-btnkk" style={{ width: isMobile ? "100%" : "auto" }} onClick={() => setIsEditing(false)}>{t("profile.settings.cancel", "Annuler")}</button>
                                        <button className="primary-btnDE" style={{ padding: "14px 32px", width: isMobile ? "100%" : "auto" }} onClick={handleSave}>
                                            <SaveIcon /> {t("profile.settings.saveChanges", "Enregistrer les modifications")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Security Content */}
                        {activeTab === "security" && (
                            <div className="glass-panel" style={{ padding: isMobile ? 20 : 40, animation: "fadeUp 0.4s ease", display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                                        <ShieldIcon size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 4vw, 24px)", fontWeight: 900, color: "var(--text-main)" }}>{t("profile.security.title", "Security & Privacy")}</h3>
                                        <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, marginTop: 4 }}>{t("profile.security.desc", "Manage your account security and privacy settings.")}</p>
                                    </div>
                                </div>

                                <ModernToggle label={t("profile.security.twoFactor", "Two-Factor Authentication (2FA)")} desc={t("profile.security.twoFactorDesc", "Secure your account with an additional SMS code.")} defaultOn={true} color="#10b981" isDarkMode={isDarkMode} />
                                <ModernToggle label={t("profile.security.loginNotifs", "Login Notifications")} desc={t("profile.security.loginNotifsDesc", "Receive an alert when a new device logs in.")} defaultOn={true} color="#3b82f6" isDarkMode={isDarkMode} />
                                <ModernToggle label={t("profile.security.dataSharing", "Partner Data Sharing")} desc={t("profile.security.dataSharingDesc", "Allow personalized offers from our partners.")} defaultOn={false} color="#f59e0b" isDarkMode={isDarkMode} />

                                <div style={{ marginTop: isMobile ? 16 : 24 }}>
                                    <button className="secondary-btn" onClick={() => setActiveTab("password")} style={{ borderColor: "#ef4444", color: "#ef4444", cursor: "pointer", width: isMobile ? "100%" : "auto" }}><LockIcon size={16} /> {t("profile.security.changePassword", "Change Password")}</button>
                                </div>
                            </div>
                        )}

                        {/* Password Content */}
                        {activeTab === "password" && (
                            <div className="glass-panel" style={{ padding: isMobile ? 20 : 40, animation: "fadeUp 0.4s ease", display: "flex", flexDirection: "column", gap: isMobile ? 20 : 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
                                        <LockIcon size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 4vw, 24px)", fontWeight: 900, color: "var(--text-main)" }}>{t("profile.password.title", "Change your Password")}</h3>
                                        <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, marginTop: 4 }}>{t("profile.password.desc", "Ensure you use a strong and complex password.")}</p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 16 }}>
                                    <GlassInput label={t("profile.password.current", "Current Password")} icon={<LockIcon size={18} />} type="password" placeholder="**************" isDarkMode={isDarkMode} />
                                    <GlassInput label={t("profile.password.new", "New Password")} icon={<LockIcon size={18} />} type="password" placeholder="**************" isDarkMode={isDarkMode} />
                                    <GlassInput label={t("profile.password.confirm", "Confirm New Password")} icon={<LockIcon size={18} />} type="password" placeholder="**************" isDarkMode={isDarkMode} />
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: isMobile ? 16 : 24 }}>
                                    <button className="primary-btnDE" style={{ padding: "14px 32px", cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
                                        <SaveIcon /> {t("profile.password.updateBtn", "Mettre à jour le mot de passe")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer (Simplified for Profile) */}

            </div>
        </div>
    );
}

// Missing HeartIcon
export function HeartIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
}

