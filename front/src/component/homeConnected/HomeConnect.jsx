import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logActivity } from "../../utils/activity";
import { AR } from "./ar";
import { FR } from "./fr";
const PHRASES = [
    "Smarter Rentals Start Here.",
    "All-in-One Rental Intelligence.",
    "Powering Modern Mobility.",
    "From Booking to Business Growth."
];
const css = `
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
  --btn-text: #ffffff;
}

[data-theme='dark'] {
  --bg-color: rgb(10, 10, 15);
  --text-main: #e6edf3;
  --text-muted: #9ca3af;
  --nav-bg: rgba(10, 14, 26, 0.7);
  --nav-border: rgba(255, 255, 255, 0.06);
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.07);
  --grid-line: rgba(255, 255, 255, 0.03);
  --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  --accent-color: #60a5fa;
  --btn-text: #060912;
}

body { background: var(--bg-color); color: var(--text-main); position: relative; }
[data-theme='dark'] body::before { content: ''; }

/* ── BASE DARK/LIGHT BACKGROUND ── */
.home-base-bg {
  position: fixed;
  inset: 0;
  z-index: -10;
  background: var(--bg-color);
}

/* ── ULTRA-MODERN CORNER GLOW ── */
.home-mesh-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  filter: blur(50px) contrast(110%);
}
[data-theme='dark'] .home-mesh-bg {
  background: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.4) 0, transparent 45%),
    radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.35) 0, transparent 40%),
    radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.3) 0, transparent 45%),
    radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.25) 0, transparent 40%);
}

.home-noise-bg {
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  /*background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");*/
}
[data-theme='dark'] .home-noise-bg { opacity: 0.04; }
:root .home-noise-bg { opacity: 0.07; }

/* blobs animés — palette luxury car */
.home-blob{
  position:fixed;border-radius:50%;
  filter:blur(100px);pointer-events:none;z-index:1;
  animation:homeDrift 18s ease-in-out infinite;
}
.home-blob1{ width:600px;height:400px;top:-150px; left:-150px; background:rgba(16,185,129,.15); }
.home-blob2{ width:450px;height:550px;bottom:-150px; right:-100px; background:rgba(99,102,241,.12); }
.home-blob3{ width:320px;height:320px;top:40%; left:30%; background:rgba(245,158,11,.08); }
.home-blob4{ width:220px;height:220px;top:20%; right:30%; background:rgba(168,85,247,.1); }

@keyframes homeDrift{
  0%,100%{transform:translate(0,0) scale(1) rotate(0deg);}
  33%{transform:translate(30px,-20px) scale(1.08) rotate(3deg);}
  66%{transform:translate(-20px,30px) scale(.95) rotate(-3deg);}
}

.gradient-text { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

@keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(0.75);opacity:0.5;} }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
@keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
@keyframes breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6;} 50%{transform:translate(-50%,-50%) scale(1.12);opacity:1;} }
@keyframes spinWheel { 100%{transform:rotate(360deg);} }
@keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
@keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes gradientShift { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes borderGlow { 0%{border-color:rgba(16,185,129,0.3); box-shadow: 0 0 12px rgba(16,185,129,0.2);} 50%{border-color:rgba(16,185,129,0.7); box-shadow: 0 0 24px rgba(16,185,129,0.4);} 100%{border-color:rgba(16,185,129,0.3); box-shadow: 0 0 12px rgba(16,185,129,0.2);} }
@keyframes borderGlowDark { 0%{border-color:rgba(96,165,250,0.3); box-shadow: 0 0 12px rgba(96,165,250,0.2);} 50%{border-color:rgba(96,165,250,0.8); box-shadow: 0 0 24px rgba(96,165,250,0.4);} 100%{border-color:rgba(96,165,250,0.3); box-shadow: 0 0 12px rgba(96,165,250,0.2);} }
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
@keyframes badgeBlink { 0%,100%{opacity:1;background:rgba(255,255,255,0.15);} 50%{opacity:0.7;background:rgba(255,255,255,0.25);} }
@keyframes marquee { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
@keyframes footerFadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
@keyframes onlineDot { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0);} }
@keyframes glowPulse { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:0.7;transform:scale(1.1);} }
@keyframes mobileSlideUp { from{opacity:0;transform:translateY(40px);} to{opacity:1;transform:translateY(0);} }
@keyframes mobilePing { 0%{transform:scale(1);opacity:1;} 100%{transform:scale(2);opacity:0;} }

.nav-wrapper { position: sticky; top: 10px; z-index: 100; margin: 0 20px; transition: all 0.3s ease; }
.nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 5px 20px; background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); animation: fadeUp 0.6s ease-out; }
.nav-link { position: relative; color: var(--text-muted); text-decoration: none; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; padding: 8px 16px; border-radius: 12px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); overflow: hidden; }
.nav-link::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--text-main); opacity:0; z-index:-1; transition:opacity 0.3s ease; border-radius:12px; }
.nav-link:hover { color:var(--bg-color); transform:translateY(-2px); }
.nav-link:hover::before { opacity:1; }

.icon-btn { background:rgba(255,255,255,0.05); border:1px solid var(--nav-border); color:var(--text-main); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative;left: 10px; }
.icon-btn:hover { background:var(--text-main); color:var(--bg-color); transform:scale(1.1) rotate(5deg); box-shadow:0 4px 12px rgba(0,0,0,0.1); }
@media (max-width: 768px) {
  .icon-btn:hover { transform: none !important; rotate: none !important; }
}

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
.secondary-btn:hover { background:var(--text-main); color:var(--bg-color); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
.secondary-btn svg { transition:transform 0.3s ease; }
.secondary-btn:hover svg { transform:translateX(4px); }

.primary-btnE { color:#ffffff; border:none; padding:10.5px 30px; border-radius:12px; font-family:'Syne',sans-serif; font-size:15.3px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:8px; backdrop-filter:blur(4px); background:var(--text-main); }
.primary-btnE:hover { background:var(--accent-gradient); color:white; transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.1); border:none; }
[data-theme='dark'] .primary-btnE { background:linear-gradient(155deg,#1e3a8a,#1d4ed8); box-shadow:0px 0px 15px #1e3a8a; }

.fleet-card { background:var(--card-bg); border:1px solid var(--card-border); border-radius:24px; padding:32px; transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); display:flex; flex-direction:column; overflow:hidden; position:relative; }
.fleet-card:hover { transform:translateY(-10px); border-color:var(--accent-color); box-shadow:0 24px 48px rgba(0,0,0,0.1); }
.car-img { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); cursor:pointer; }
.fleet-card:hover .car-img { transform: scale(1.08); }

/* Footer styles */
.f-link { color:var(--text-muted); text-decoration:none; font-size:16px; font-weight:500; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); position:relative; display:inline-block; padding-bottom:1px; }
.f-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--accent-color); transition:width 0.35s ease; }
.f-link:hover { color:var(--text-main); transform:translateX(5px); }
.f-link:hover::after { width:100%; }
.f-social { width:48px; height:48px; border-radius:50%; background:var(--card-bg); border:1px solid var(--card-border); display:flex; align-items:center; justify-content:center; color:var(--text-main); font-weight:700; font-size:14px; cursor:pointer; transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1); position:relative; overflow:hidden; }
.f-social::before { content:''; position:absolute; inset:0; background:var(--accent-gradient); opacity:0; transition:opacity 0.3s; }
.f-social span { position:relative; z-index:1; transition:color 0.3s; }
.f-social:hover { transform:translateY(-2px) scale(1.1); border-color:var(--accent-color); box-shadow:0 12px 28px rgba(0,0,0,0.15),0 0 0 1px var(--accent-color); }
.f-social:hover span { color:var(--btn-text); }
.f-col-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:var(--text-main); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:24px; position:relative; display:inline-block; }
.f-col-titlee { font-family:'Syne',sans-serif; fontSize: 25; maxWidth: 760; marginBottom: 51; animation: "fadeUp 0.7s 0.3s ease both"; position: "relative"; top: 93; display:inline-block; }
.f-col-title::after { content:''; position:absolute; bottom:-6px; left:0; width:24px; height:2px; background:var(--accent-color); border-radius:2px; transition:width 0.4s ease; }
.f-col:hover .f-col-title::after { width:100%; }
.f-bottom-link { color:var(--text-muted); font-size:15px; text-decoration:none; transition:all 0.3s; }
.f-bottom-link:hover { color:var(--accent-color); }

/* ══════════════════════════════════
   MOBILE STYLES — Ultra Modern
══════════════════════════════════ */
@media (max-width: 768px) {

  /* NAV */
  .nav-wrapper { margin: 0 10px; top: 8px; }
  .nav-glass { padding: 10px 14px; border-radius: 18px; }
  .nav-glass ul { display: none !important; }

  /* BUTTONS */
  .primary-btnDE { border-radius: 14px !important; }
  .secondary-btn { border-radius: 14px !important; }

  /* FOOTER MOBILE */
  .f-link { font-size: 14px; }
  .f-col-title { font-size: 12px; margin-bottom: 16px; }
  .f-social { width: 42px; height: 42px; font-size: 12px; }

  /* HIDE SCROLLBAR */
  .mobile-scroll::-webkit-scrollbar { display: none; }
  .mobile-scroll { -ms-overflow-style: none; scrollbar-width: none; }

  /* MOBILE CARD SWIPE */
  .mobile-card-row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 4px 16px 8px;
    margin: 0 -16px;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .mobile-card-row::-webkit-scrollbar { display: none; }
  .mobile-card-snap { scroll-snap-align: start; flex-shrink: 0; }

  /* PANEL MOBILE */
  .hiw-panel-mobile {
    border-right: none !important;
    border-bottom: 1px solid var(--card-border);
    padding: 40px 20px !important;
  }
  .hiw-panel-mobile:last-child { border-bottom: none; }

  /* ── MOBILE HAMBURGER ── */
  .mob-burger { display: flex !important; }
  /* hide desktop user pill on mobile */
  .desktop-user-pill { display: none !important; }
}
@keyframes mobileMenuSlideDown {
  from { opacity:0; transform:translateY(-18px) scale(0.97); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes mobileMenuSlideUp {
  from { opacity:1; transform:translateY(0) scale(1); }
  to   { opacity:0; transform:translateY(-18px) scale(0.97); }
}
.mob-burger { display: none; }
.mob-menu-panel {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}
.mob-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: all;
}
.mob-menu-sheet {
  position: absolute;
  top: 74px;
  left: 10px;
  right: 10px;
  border-radius: 26px;
  overflow: hidden;
  pointer-events: all;
  animation: mobileMenuSlideDown 0.38s cubic-bezier(0.16,1,0.3,1) both;
}
  @keyframes arrowFall {
  0%   { transform: translateY(-8px); opacity: 0; }
  30%  { opacity: 1; }
  70%  { opacity: 1; }
  100% { transform: translateY(8px); opacity: 0; }
}
.hyrakle
{
  position: relative;
  right: 2px;
}
@keyframes floatIcon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes scanLens { 0% { left: -100%; top: -100%; } 100% { left: 100%; top: 100%; } }
`;


function SearchIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
}
function SunIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}
function MoonIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
}
function GlobeIcon({ size = 24, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function ZapIcon({ size = 24, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function CheckIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}

function AnimatedSearchIcon() {
    return (
        <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--accent-gradient)',
                filter: 'blur(35px)', opacity: 0.15,
                borderRadius: '50%',
            }} />
            <svg
                width="80" height="80" viewBox="0 0 24 24"
                style={{ animation: 'floatIcon 3s ease-in-out infinite', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
            >
                <defs>
                    <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent-color)" />
                        <stop offset="100%" stopColor="var(--text-main)" />
                    </linearGradient>
                </defs>
                <circle cx="11" cy="11" r="8" stroke="url(#searchGrad)" strokeWidth="1.5" fill="none" />
                <path d="M21 21l-4.35-4.35" stroke="url(#searchGrad)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="11" cy="11" r="5" fill="var(--accent-color)" opacity="0.1" />
            </svg>
        </div>
    );
}
function ShieldIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function CrosshairIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>;
}
function MapPinIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
function ArrowRightIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}
function CompassIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
}
function UsersIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function CalendarIcon({ size = 18, color = "currentColor" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M12 14v4M10 16h4" />
        </svg>
    );
}

function AnimatedLogo({ onClick }) {
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
function FleetMockup({ active, selectedLang, isMobile }) {
    const isAr = selectedLang === "AR";
    const text = isAr ? AR.mockups.fleet : { title: "Live Fleet Status", subtitle: "GPS tracking · 4 vehicles", live: "LIVE" };
    const cars = isAr ? AR.mockups.fleet.cars.map((c, i) => {
        const orig = [
            { c: "#00e5a0", pulse: true },
            { c: "#4da6ff", pulse: false },
            { c: "#ffb547", pulse: false },
            { c: "#bf7fff", pulse: false }
        ];
        return { ...orig[i], n: c.n, st: c.st, d: c.d };
    }) : [
        { n: "Mercedes G-Class", st: "On Trip", c: "#00e5a0", d: "140 km/h", pulse: true },
        { n: "Porsche 911 GT3", st: "Available", c: "#4da6ff", d: "Garage A", pulse: false },
        { n: "Range Rover SV", st: "Maintenance", c: "#ffb547", d: "In Shop", pulse: false },
        { n: "Ferrari SF90", st: "Reserved", c: "#bf7fff", d: "Mar 22", pulse: false },
    ];
    return (
        <div style={{ position: "absolute", inset: 0, padding: isMobile ? "64px 16px 20px" : "72px 32px 28px", opacity: active ? 1 : 0, transform: active ? "none" : "translateY(16px) scale(0.97)", transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)", pointerEvents: active ? "auto" : "none" }}>
            <div style={{ marginBottom: isMobile ? 14 : 20, display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
                <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: 12, background: "linear-gradient(135deg,#006b46,#00e5a0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,229,160,0.3)" }}>
                    <svg width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>
                </div>
                <div>
                    <div style={{ color: "var(--text-main)", fontSize: isMobile ? 15 : 18, fontWeight: 800, fontFamily: "'Syne',sans-serif", letterSpacing: -0.5 }}>{text.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 1 }}>{text.subtitle}</div>
                </div>
                <div style={{ marginLeft: isAr ? 0 : "auto", marginRight: isAr ? "auto" : 0, display: "flex", alignItems: "center", gap: 4, background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 20, padding: isMobile ? "3px 8px" : "5px 12px" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 6px #00e5a0", animation: "pulse 2s infinite" }} />
                    <span style={{ color: "#00e5a0", fontSize: 9, fontWeight: 800, letterSpacing: "0.05em" }}>{text.live}</span>
                </div>
            </div>
            <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--card-border)", background: "var(--card-bg)" }}>
                {cars.map((car, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, padding: isMobile ? "10px 12px" : "14px 18px", borderBottom: i < cars.length - 1 ? "1px solid var(--card-border)" : "none", transition: "background 0.2s", cursor: "default" }}>
                        <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: car.c, boxShadow: `0 0 8px ${car.c}` }} />
                            {car.pulse && <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: `1px solid ${car.c}`, opacity: 0.4, animation: "ping 1.5s infinite" }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "var(--text-main)", fontWeight: 700, fontSize: isMobile ? 13 : 14, letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.n}</div>
                            {isMobile && <div style={{ color: "var(--text-muted)", fontSize: 10 }}>{car.d}</div>}
                        </div>
                        {!isMobile && <span style={{ color: "var(--text-muted)", fontSize: 12, minWidth: 60, textAlign: isAr ? "left" : "right" }}>{car.d}</span>}
                        <div style={{ padding: isMobile ? "2px 8px" : "3px 10px", borderRadius: 8, background: `${car.c}18`, color: car.c, fontSize: isMobile ? 9 : 10, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", flexShrink: 0 }}>{car.st}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}


/* ─── CRM Mockup ─── */
function CRMMockup({ active, selectedLang, isMobile }) {
    const isAr = selectedLang === "AR";
    const st = isAr ? AR.mockups.crm.stats : [
        { label: "Total VIPs", val: "1,248" },
        { label: "Retention Rate", val: "94%" }
    ];
    const clients = isAr ? AR.mockups.crm.clients.map((c, i) => {
        const cols = ["#bf7fff", "#ffb547", "#4da6ff"];
        return { ...c, color: cols[i] };
    }) : [
        { initials: "AR", name: "Alexander R.", tier: "Platinum", rentals: 12, spend: "$18,400", color: "#bf7fff" },
        { initials: "SL", name: "Sophie L.", tier: "Gold", rentals: 7, spend: "$9,200", color: "#ffb547" },
        { initials: "MK", name: "Marcus K.", tier: "Silver", rentals: 3, spend: "$3,100", color: "#4da6ff" },
    ];
    return (
        <div style={{ position: "absolute", inset: 0, padding: isMobile ? "64px 16px 20px" : "72px 32px 28px", opacity: active ? 1 : 0, transform: active ? "none" : "translateY(16px) scale(0.97)", transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)", pointerEvents: active ? "auto" : "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: isMobile ? 12 : 16 }}>
                {[{ ...st[0], color: "#bf7fff", bg: "var(--card-bg)" },
                { ...st[1], color: "#00e5a0", bg: "var(--card-bg)" }].map((s, i) => (
                    <div key={i} style={{ borderRadius: 16, padding: isMobile ? "12px 16px" : "18px 20px", background: s.bg, border: "1px solid var(--card-border)" }}>
                        <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: isMobile ? 24 : 34, fontWeight: 900, fontFamily: "'Syne',sans-serif", color: s.color, lineHeight: 1 }}>{s.val}</div>
                    </div>
                ))}
            </div>
            <div style={{ borderRadius: 18, border: "1px solid var(--card-border)", overflow: "hidden", background: "var(--card-bg)" }}>
                {clients.slice(0, isMobile ? 2 : 3).map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: isMobile ? "10px 14px" : "13px 18px", borderBottom: i < (isMobile ? 1 : 2) ? "1px solid var(--card-border)" : "none", cursor: "default" }}>
                        <div style={{ width: isMobile ? 32 : 36, height: isMobile ? 32 : 36, borderRadius: 10, background: `${c.color}25`, border: `1.5px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{c.initials}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "var(--text-main)", fontWeight: 700, fontSize: isMobile ? 13 : 14 }}>{c.name}</div>
                            <div style={{ color: c.color, fontSize: 10, fontWeight: 600 }}>{c.tier} · {c.rentals} {isAr ? "إيجارات" : "rentals"}</div>
                        </div>
                        <div style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 700 }}>{c.spend}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}


/* ─── Reservations Mockup ─── */
function ReservationsMockup({ active, selectedLang, isMobile }) {
    const [accepted, setAccepted] = useState(null);
    useEffect(() => { if (!active) setAccepted(null); }, [active]);
    const isAr = selectedLang === "AR";
    const text = isAr ? AR.mockups.reservations : {
        newRequest: "New request", ref: "REF #8922A", title: "Booking Request",
        car: "Audi RS6 Avant · Mar 20–24", client: "Client", identity: "Identity",
        verified: "✓ Verified", total: "Total Value", accept: "Accept Booking",
        decline: "Decline", confirmed: "✓ Booking Confirmed!", declined: "✕ Booking Declined"
    };
    return (
        <div style={{ position: "absolute", inset: 0, padding: isMobile ? "64px 16px 20px" : "72px 32px 28px", display: "flex", flexDirection: "column", opacity: active ? 1 : 0, transform: active ? "none" : "scale(1.03)", transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)", pointerEvents: active ? "auto" : "none" }}>
            <div style={{ borderRadius: 22, flex: 1, display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16, background: "linear-gradient(135deg, rgba(255,181,71,0.07) 0%, rgba(0,0,0,0) 100%)", border: "1px solid rgba(255,181,71,0.2)", padding: isMobile ? "16px 18px" : "24px 24px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: isMobile ? 140 : 200, height: isMobile ? 140 : 200, background: "radial-gradient(circle, rgba(255,181,71,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffb547", animation: "pulse 1.5s infinite", boxShadow: "0 0 8px #ffb547" }} />
                    <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em" }}>{text.newRequest}</span>
                </div>
                <div>
                    <div style={{ color: "var(--text-main)", fontSize: isMobile ? 16 : 22, fontWeight: 900, fontFamily: "'Syne',sans-serif", letterSpacing: -0.5, marginBottom: 4 }}>{text.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: isMobile ? 11 : 13 }}>{text.car}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
                    <div style={{ width: isMobile ? 28 : 32, height: isMobile ? 28 : 32, borderRadius: "50%", background: "#ffb54720", border: "1px solid #ffb54740", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffb547", fontWeight: 800, fontSize: 12 }}>J</div>
                    <div>
                        <div style={{ color: "var(--text-main)", fontWeight: 700, fontSize: 12 }}>{text.client}</div>
                        <div style={{ color: "#22c55e", fontSize: 10, fontWeight: 700 }}>{text.verified}</div>
                    </div>
                </div>
                {accepted === null ? (
                    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                        <button onClick={() => setAccepted(true)} className="primary-btnE" style={{ flex: 1, padding: isMobile ? "8px" : "10px", fontSize: isMobile ? 11 : 13, background: "#ffb547", border: "none" }}>{text.accept}</button>
                        <button onClick={() => setAccepted(false)} className="secondary-btn" style={{ flex: 0.4, padding: isMobile ? "8px" : "10px", fontSize: isMobile ? 11 : 13, border: "1px solid var(--card-border)" }}>{text.decline}</button>
                    </div>
                ) : (
                    <div style={{ marginTop: 10, padding: isMobile ? "8px" : "12px", borderRadius: 12, background: accepted ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${accepted ? "#22c55e" : "#ef4444"}`, color: accepted ? "#22c55e" : "#ef4444", textAlign: "center", fontWeight: 800, fontSize: isMobile ? 12 : 14, animation: "fadeUp 0.3s ease" }}>
                        {accepted ? text.confirmed : text.declined}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Analytics Mockup ─── */
function AnalyticsMockup({ active, selectedLang, isMobile }) {
    const isAr = selectedLang === "AR";
    const bars = [40, 65, 45, 85, 70, 95, 80];
    const text = isAr ? AR.mockups.analytics : {
        label: "Projected Revenue · March", value: "$142K",
        growth: "↑ +24% vs last month", avg: "Daily Avg: $4,580",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        stats: [
            { l: "Bookings", v: "38" },
            { l: "Utilization", v: "87%" },
            { l: "Avg. Duration", v: "3.2d" }
        ]
    };
    const days = text.days;

    return (
        <div style={{ position: "absolute", inset: 0, padding: isMobile ? "64px 16px 20px" : "72px 32px 28px", display: "flex", flexDirection: "column", opacity: active ? 1 : 0, transform: active ? "none" : "translateY(-14px)", transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)", pointerEvents: active ? "auto" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isMobile ? 16 : 24 }}>
                <div>
                    <div style={{ color: "var(--text-muted)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>{text.label}</div>
                    <div style={{ color: "var(--text-main)", fontSize: isMobile ? 32 : 44, fontWeight: 900, fontFamily: "'Syne',sans-serif", lineHeight: 1, letterSpacing: -1.5 }}>{text.value}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: isAr ? "flex-start" : "flex-end" }}>
                    <div style={{ padding: isMobile ? "3px 8px" : "5px 12px", borderRadius: 20, background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)", color: "#00e5a0", fontSize: isMobile ? 10 : 12, fontWeight: 800 }}>{text.growth}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 10 }}>{text.avg}</div>
                </div>
            </div>
            {/* Chart */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: isMobile ? 4 : 8, paddingBottom: 8 }}>
                    {bars.map((h, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                            <div style={{ width: "100%", height: active ? `${h}%` : "0%", borderRadius: isMobile ? "4px 4px 0 0" : "7px 7px 0 0", background: i === 6 ? "linear-gradient(180deg,#4da6ff,rgba(77,166,255,0.15))" : i === 4 || i === 5 ? "rgba(77,166,255,0.35)" : "rgba(77,166,255,0.15)", boxShadow: i === 6 ? "0 -4px 20px rgba(77,166,255,0.4)" : "none", transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`, position: "relative", minHeight: 2 }}>
                                {i === 6 && !isMobile && <div style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", background: "rgba(77,166,255,0.15)", border: "1px solid rgba(77,166,255,0.3)", borderRadius: 6, padding: "2px 6px", color: "#4da6ff", fontSize: 10, fontWeight: 800, whiteSpace: "nowrap", opacity: active ? 1 : 0, transition: "opacity 0.3s 0.8s" }}>$22K</div>}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", gap: isMobile ? 4 : 8 }}>
                    {days.map((d, i) => (
                        <div key={i} style={{ flex: 1, textAlign: "center", color: i === 6 ? "#4da6ff" : "var(--text-muted)", fontSize: 9, fontWeight: i === 6 ? 800 : 500 }}>{isMobile ? d.charAt(0) : d}</div>
                    ))}
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: isMobile ? 6 : 8, marginTop: isMobile ? 12 : 16 }}>
                {text.stats.map((s, i) => {
                    const cols = ["#4da6ff", "#00e5a0", "#bf7fff"];
                    return (
                        <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 10, padding: isMobile ? "6px 4px" : "10px 12px", textAlign: "center" }}>
                            <div style={{ color: cols[i], fontSize: isMobile ? 14 : 18, fontWeight: 900, fontFamily: "'Syne',sans-serif" }}>{s.v}</div>
                            <div style={{ color: "var(--text-muted)", fontSize: isMobile ? 8 : 10, marginTop: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

class Particle {
    constructor(W, H) { this.W = W; this.H = H; this.reset(); }
    reset() {
        this.x = Math.random() * this.W; this.y = Math.random() * this.H;
        this.vx = (Math.random() - 0.5) * 0.28; this.vy = (Math.random() - 0.5) * 0.28;
        this.r = Math.random() * 1.2 + 0.3; this.alpha = Math.random() * 0.28 + 0.06;
        this.color = ['#6366f1', '#10b981', '#3b82f6', '#a78bfa', '#34d399'][Math.floor(Math.random() * 5)];
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) this.reset();
    }
}


const AI_PHRASES = [
    "Voiture de sport au coucher du soleil",
    "SUV élégant dans une forêt brumeuse",
    "Berline noire sous la pluie à Paris",
    "Cabriolet blanc en bord de mer",
    "4x4 rouge sur des dunes de sable",
];

export default function UppCarLanding() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const footerRef = useRef(null);
    const [displayed, setDisplayed] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("appTheme") === "dark");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [aiValue, setAiValue] = useState("");
    const [aiFocused, setAiFocused] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiPlaceholder, setAiPlaceholder] = useState("");
    const [aiCharIdx, setAiCharIdx] = useState(0);
    const [aiTextIdx, setAiTextIdx] = useState(0);
    const [aiDeleting, setAiDeleting] = useState(false);
    // ── States ──
    const [listening, setListening] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") || null
    );
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const audioCtxRef = useRef(null);
    const lastPlayRef = useRef(0);
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favoriteCars");
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });

    const toggleFavorite = (carId) => {
        setFavorites(prev => {
            const next = new Set(prev);
            const isAdding = !next.has(carId);
            if (next.has(carId)) {
                next.delete(carId);
                logActivity('favorite_remove', { carId });
            } else {
                next.add(carId);
                logActivity('favorite_add', { carId });
            }
            localStorage.setItem("favoriteCars", JSON.stringify(Array.from(next)));
            return next;
        });
    };

    useEffect(() => {
        const ensureCtx = () => {
            if (!audioCtxRef.current) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (AC) audioCtxRef.current = new AC();
            }
            return audioCtxRef.current;
        };

        const playClick = () => {
            const now = Date.now();
            if (now - lastPlayRef.current < 60) return; // throttle
            lastPlayRef.current = now;
            const ctx = ensureCtx();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, ctx.currentTime);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
            osc.stop(ctx.currentTime + 0.07);
        };

        const onPointerDown = () => {
            try { playClick(); } catch (e) { }
        };

        window.addEventListener('pointerdown', onPointerDown, { passive: true });
        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, []);
    const t = (path, defaultText) => {
        if (selectedLang !== "AR" && selectedLang !== "FR") return defaultText;
        const keys = path.split('.');
        let val = selectedLang === "AR" ? AR : FR;
        for (let k of keys) {
            if (!val || val[k] === undefined) return defaultText;
            val = val[k];
        }
        return val;
    };

    useEffect(() => {
        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
        localStorage.setItem("appLang", selectedLang);
    }, [selectedLang]);
    useEffect(() => {
        const t = isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("appTheme", t);
    }, [isDarkMode]);
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) setCurrentUser(JSON.parse(user));
    }, []);
    // Fermer si clic dehors
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest(".login-menu-wrap")) setMenuOpen(false);
            if (!e.target.closest(".lang-menu-wrap")) setLangMenuOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);
    // ── Fonction ──
    const startListening = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return alert("Utilisez Chrome ou Edge");

        if (listening) { setListening(false); return; }

        const recognition = new SR();

        // ← change la langue selon selectedLang
        recognition.lang = selectedLang === "AR" ? "ar-MA" :
            selectedLang === "EN" ? "en-US" :
                "fr-FR";

        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onerror = () => setListening(false);
        recognition.onresult = (e) => {
            const text = Array.from(e.results)
                .map(r => r[0].transcript)
                .join("");
            setAiValue(text);

            // Si c'est le résultat final, on lance la recherche automatiquement
            if (e.results[e.results.length - 1].isFinal) {
                handleGenerate(text);
            }
        };

        recognition.start();
    };
    useEffect(() => {
        if (aiFocused) return;
        const currentArray = selectedLang === "AR" ? AR.hero.aiPhrases : (selectedLang === "FR" ? FR.hero.aiPhrases : AI_PHRASES);
        const current = currentArray[aiTextIdx % currentArray.length];
        const speed = aiDeleting ? 4 : 8;
        const t = setTimeout(() => {
            if (!aiDeleting && aiCharIdx < current.length) {
                setAiPlaceholder(current.slice(0, aiCharIdx + 1));
                setAiCharIdx(c => c + 1);
            } else if (!aiDeleting && aiCharIdx === current.length) {
                setTimeout(() => setAiDeleting(true), 3800);
            } else if (aiDeleting && aiCharIdx > 0) {
                setAiPlaceholder(current.slice(0, aiCharIdx - 1));
                setAiCharIdx(c => c - 1);
            } else {
                setAiDeleting(false);
                setAiTextIdx(i => (i + 1) % currentArray.length);
            }
        }, speed);
        return () => clearTimeout(t);
    }, [aiCharIdx, aiDeleting, aiTextIdx, aiFocused]);

    const handleGenerate = (queryOverride) => {
        const query = (typeof queryOverride === 'string') ? queryOverride : aiValue;
        if (aiLoading || !query.trim()) return;
        setAiLoading(true);
        setShowSearchOverlay(true);
        setHasSearched(false);

        fetch(`http://localhost:8080/api/cars/search?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data);
                setHasSearched(true);

                // Log view activities for found cars (limit to first 4 for stats)
                if (data && data.length > 0) {
                    data.slice(0, 4).forEach(car => {
                        logActivity('view', { carId: car.id, carName: car.name });
                    });
                }
                // Minimum delay to show the "Searching" animation
                setTimeout(() => {
                    setAiLoading(false);
                    setShowSearchOverlay(false);
                    // Scroll to results
                    setTimeout(() => {
                        const resultsEl = document.getElementById("search-results");
                        if (resultsEl) {
                            const yOffset = -40;
                            const y = resultsEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                        }
                    }, 100);
                }, 2500);
            })
            .catch(err => {
                console.error("Search error:", err);
                setAiLoading(false);
                setShowSearchOverlay(false);
            });
    };
    const features = [
        {
            id: 0,
            title: t("agencyOS.features.0.title", "Fleet Management"),
            tagline: t("agencyOS.features.0.tagline", "Real-time garage tracking, live specs, and availability."),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" />
                </svg>
            ),
            color: "#00e5a0",
            glow: "rgba(0,229,160,0.18)",
            label: t("agencyOS.features.0.label", "FLEET"),
        },
        {
            id: 1,
            title: t("agencyOS.features.1.title", "Customer CRM"),
            tagline: t("agencyOS.features.1.tagline", "Visualize histories, VIP programs, and retention tools."),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            color: "#bf7fff",
            glow: "rgba(191,127,255,0.18)",
            label: t("agencyOS.features.1.label", "CRM"),
        },
        {
            id: 2,
            title: t("agencyOS.features.2.title", "Smart Reservations"),
            tagline: t("agencyOS.features.2.tagline", "Accept or decline instantly. Stop managing via Excel."),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                </svg>
            ),
            color: "#ffb547",
            glow: "rgba(255,181,71,0.18)",
            label: t("agencyOS.features.2.label", "BOOKINGS"),
        },
        {
            id: 3,
            title: t("agencyOS.features.3.title", "Yield Analytics"),
            tagline: t("agencyOS.features.3.tagline", "Dynamic pricing algorithms and revenue forecasting."),
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            ),
            color: "#4da6ff",
            glow: "rgba(77,166,255,0.18)",
            label: t("agencyOS.features.3.label", "ANALYTICS"),
        },
    ];
    const [mounted, setMounted] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        timerRef.current = setInterval(() => {
            setActiveFeature(p => (p + 1) % 4);
        }, 4000);
        return () => clearInterval(timerRef.current);
    }, []);

    const handleSelect = (id) => {
        clearInterval(timerRef.current);
        setActiveFeature(id);
        timerRef.current = setInterval(() => {
            setActiveFeature(p => (p + 1) % 4);
        }, 4000);
    };

    const f = features[activeFeature];

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const footerTop = footerRef.current.getBoundingClientRect().top;
                setShowScrollButton(footerTop < window.innerHeight);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
    useEffect(() => {
        const TYPE_SPEED = 10;     // Vitesse augmentée (avant 20)
        const DELETE_SPEED = 15;   // Vitesse augmentée (avant 100)
        const PAUSE_TIME = 1500;   // Pause réduite (avant 3000)

        const currentArray = selectedLang === "AR"
            ? AR.hero.phrases
            : (selectedLang === "FR" ? FR.hero.phrases : PHRASES);

        const current = currentArray[phraseIndex % currentArray.length];

        let timeout;

        if (!isDeleting && displayed.length < current.length) {
            timeout = setTimeout(() => {
                setDisplayed(current.slice(0, displayed.length + 1)); // ← +1 au lieu de +4
            }, TYPE_SPEED);

        } else if (!isDeleting && displayed.length === current.length) {
            timeout = setTimeout(() => setIsDeleting(true), PAUSE_TIME);

        } else if (isDeleting && displayed.length > 0) {
            timeout = setTimeout(() => {
                setDisplayed(displayed.slice(0, -1)); // ← -1 au lieu de -4
            }, DELETE_SPEED);

        } else {
            setIsDeleting(false);
            setPhraseIndex((i) => (i + 1) % currentArray.length);
        }

        return () => clearTimeout(timeout);

    }, [displayed, isDeleting, phraseIndex, isMobile, selectedLang]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W, H, id, tt = 0;
        let parts = [];
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; parts = Array.from({ length: 90 }, () => new Particle(W, H)); };
        const loop = () => {
            ctx.clearRect(0, 0, W, H);

            /* aurora */
            tt += .0025;
            const g1 = ctx.createRadialGradient(W * .22 + Math.sin(tt) * 70, H * .28 + Math.cos(tt * .7) * 45, 0, W * .3, H * .3, W * .52);
            g1.addColorStop(0, isDarkMode ? 'rgba(99,102,241,.07)' : 'rgba(99,102,241,.05)');
            g1.addColorStop(1, 'transparent');
            ctx.globalAlpha = 1; ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

            const g2 = ctx.createRadialGradient(W * .78 + Math.cos(tt * .6) * 55, H * .65 + Math.sin(tt) * 38, 0, W * .68, H * .6, W * .42);
            g2.addColorStop(0, isDarkMode ? 'rgba(16,185,129,.05)' : 'rgba(16,185,129,.04)');
            g2.addColorStop(1, 'transparent');
            ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

            /* particles */
            if (isDarkMode) {
                parts.forEach(p => {
                    p.update();
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
                });
            }
            id = requestAnimationFrame(loop);
        };
        resize(); window.addEventListener("resize", resize); loop();
        return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
    }, [isDarkMode]);

    const brandColors = {
        "Mercedes-Benz": { light: "#00ADEF", dark: "#38bdf8" }, "Porsche": { light: "#D5001C", dark: "#f87171" },
        "BMW": { light: "#1C69D4", dark: "#60a5fa" }, "Audi": { light: "#BB0A14", dark: "#fb923c" },
        "Range Rover": { light: "#005A2B", dark: "#34d399" }, "Maserati": { light: "#1B3A6B", dark: "#818cf8" },
        "Aston Martin": { light: "#004225", dark: "#6ee7b7" }, "Tesla": { light: "#CC0000", dark: "#f87171" },
        "Jaguar": { light: "#2563eb", dark: "#93c5fd" }, "Lexus": { light: "#9f1239", dark: "#fca5a5" },
        "Volvo": { light: "#003057", dark: "#7dd3fc" }, "Alfa Romeo": { light: "#991b1b", dark: "#fca5a5" },
        "Bentley": { light: "#065f46", dark: "#6ee7b7" }, "Ferrari": { light: "#D40000", dark: "#f87171" },
        "Lamborghini": { light: "#b45309", dark: "#fcd34d" }, "Bugatti": { light: "#1C3F8F", dark: "#a5b4fc" },
    };
    const getColor = (brand) => isDarkMode ? brandColors[brand]?.dark : brandColors[brand]?.light;

    return (
        <>
            <style>{css}</style>
            <div className="home-base-bg" />
            <div className="home-mesh-bg" />
            <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />
            <div className="home-noise-bg" />
            <div className="home-blob home-blob1" />
            <div className="home-blob home-blob2" />
            <div className="home-blob home-blob3" />
            <div className="home-blob home-blob4" />

            <div style={{ position: "relative", zIndex: 1, overflowX: "hidden", width: "100%" }}>

                {/* ══ NAV ══ */}
                <div className="nav-wrapper" dir="ltr" onMouseLeave={() => setActiveDropdown(null)}>
                    <nav className="nav-glass">
                        <AnimatedLogo onClick={() => navigate("/")} />
                        {!isMobile && (
                            <ul style={{ display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
                                {[{ l: t("nav.vehicles", "Profil") }, { l: t("nav.services", "Réservations") }, { l: t("nav.pricing", "Favoris"), b: true }, { l: t("nav.aboutUs", "À propos") }].map(({ l, b }) => (
                                    <li key={l} onMouseEnter={() => !["EN", "AR", "FR"].includes(selectedLang) && setActiveDropdown([t("nav.vehicles", "Vehicles"), t("nav.services", "Services"), t("nav.pricing", "Pricing")].includes(l) ? l : null)}>
                                        <span href={l === t("nav.aboutUs", "À propos") ? "#ecosystem" : "/"} onClick={(e) => {
                                            if (l === t("nav.aboutUs", "À propos") || l === t("nav.aboutUs", "About Us")) {
                                                e.preventDefault();
                                                const eco = document.getElementById("ecosystem");
                                                if (eco) {
                                                    eco.scrollIntoView({ behavior: "smooth" });
                                                    setActiveDropdown(null);
                                                } else window.location.href = "/homeConnect#ecosystem";
                                            } else if (l === t("nav.vehicles", "Profil")) {
                                                e.preventDefault();
                                                navigate("/profile");
                                            } else if (l === t("nav.pricing", "Favoris")) {
                                                e.preventDefault();
                                                navigate("/favorites");
                                            }
                                        }} className="nav-link" style={{
                                            display: "flex", alignItems: "center", gap: 6, cursor: "pointer"
                                        }}>
                                            {l}
                                            {b && <span style={{ background: "var(--accent-gradient)", color: isDarkMode ? "#000" : "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>{t("nav.pricingBadge", "Pro")}</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* RIGHT SIDE — mobile: theme + hamburger | desktop: full controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
                            {isMobile ? (
                                <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", right: selectedLang === "AR" ? 19 : 0 }}>
                                    {/* Theme toggle */}
                                    <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                    </button>
                                    {/* Hamburger */}
                                    <div className="mobile-menu-wrap" style={{ position: "relative" }}>
                                        <button
                                            className="icon-btn"
                                            onClick={() => setMobileMenuOpen(p => !p)}
                                            style={{
                                                background: mobileMenuOpen ? "var(--text-main)" : "transparent",
                                                color: mobileMenuOpen ? "var(--bg-color)" : "var(--text-main)"
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                {mobileMenuOpen ? (
                                                    <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                                                ) : (
                                                    <><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Hide lang + theme on mobile — they live in the mobile panel */}
                                    {!isMobile && (
                                        <div className="lang-menu-wrap" style={{ position: "relative" }}>
                                            <button
                                                className="icon-btn"
                                                style={{
                                                    position: "relative",
                                                    background: langMenuOpen ? "var(--text-main)" : "transparent",
                                                    color: langMenuOpen ? "var(--bg-color)" : "var(--text-main)",
                                                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                                }}
                                                onClick={() => setLangMenuOpen(p => !p)}
                                                aria-label="Changer de langue"
                                            >
                                                <svg
                                                    style={{
                                                        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                        transform: langMenuOpen ? "rotate(-180deg) scale(1.15)" : "rotate(0deg) scale(1)"
                                                    }}
                                                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
                                                >
                                                    <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
                                                </svg>
                                                <span style={{
                                                    position: "absolute", top: -4, right: -4,
                                                    background: "var(--accent-color)", color: "#fff",
                                                    fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: 6,
                                                    lineHeight: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                                    pointerEvents: "none"
                                                }}>{selectedLang}</span>
                                            </button>

                                            {langMenuOpen && (
                                                <div style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "calc(100% + 12px)",
                                                    left: "auto",
                                                    transform: "translateY(-50%)",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    background: isDarkMode ? "rgba(10,14,26,0.97)" : "rgba(255,255,255,0.97)",
                                                    borderRadius: "14px",
                                                    padding: "6px",
                                                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(16,185,129,0.15)"}`,
                                                    gap: "4px",
                                                    alignItems: "center",
                                                    boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.4)" : "0 10px 25px rgba(0,0,0,0.1)",
                                                    backdropFilter: "blur(20px)",
                                                    zIndex: 100
                                                }}>
                                                    {[
                                                        { code: "AR", label: "العربية" },
                                                        { code: "FR", label: "Français" },
                                                        { code: "EN", label: "English" }
                                                    ].map(lang => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => { setSelectedLang(lang.code); setLangMenuOpen(false); }}
                                                            style={{
                                                                display: "flex", alignItems: "center", gap: "6px",
                                                                background: selectedLang === lang.code ? "var(--text-main)" : "transparent",
                                                                color: selectedLang === lang.code ? "var(--bg-color)" : "var(--text-muted)",
                                                                border: "none", borderRadius: "9px", padding: "6px 12px",
                                                                fontSize: "12px", fontWeight: "800", cursor: "pointer",
                                                                textTransform: "uppercase", transition: "all 0.3s",
                                                                fontFamily: "'Syne', sans-serif",
                                                            }}
                                                            onMouseEnter={e => { if (selectedLang !== lang.code) e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
                                                            onMouseLeave={e => { if (selectedLang !== lang.code) e.currentTarget.style.background = "transparent"; }}
                                                        >
                                                            <span style={{ fontSize: "16px", filter: selectedLang !== lang.code ? "grayscale(40%) opacity(0.8)" : "none", transition: "all 0.3s" }}>{lang.flag}</span>
                                                            {lang.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <button className="icon-btn" style={{ display: isMobile ? "none" : undefined }} onClick={() => setIsDarkMode(!isDarkMode)}>
                                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                    </button>
                                    {!isMobile && <div style={{ width: 1, height: 24, background: "var(--nav-border)", margin: "0 4px" }} />}
                                    <div className="login-menu-wrap desktop-user-pill" style={{ position: "relative", display: isMobile ? "none" : undefined }}>
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
                                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                                        <div style={{
                                                            width: 36, height: 36, borderRadius: 12,
                                                            background: "var(--accent-gradient)",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff",
                                                            boxShadow: isDarkMode
                                                                ? "0 0 20px rgba(168,85,247,0.6)"
                                                                : "0 0 16px rgba(124,58,237,0.4), 0 4px 12px rgba(0,0,0,0.1)",
                                                            overflow: "hidden",  // ← clé pour que l'image soit rognée

                                                        }}>
                                                            {profileImage ? (
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
                                                    position: "absolute", top: "calc(100% + 7px)", left: selectedLang === "FR" ? "-1px" : (selectedLang === "AR" ? "-3px" : "-1px"),
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
                                                        { id: "profile", label: t("nav.myProfile", "Mon profil"), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, color: isDarkMode ? "#a855f7" : "#7c3aed" },
                                                        { id: "reservations", label: t("nav.myReservations", "Mes Réservations"), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, color: isDarkMode ? "#60a5fa" : "#2563eb" },
                                                        { id: "favorites", label: t("nav.favorites", "Favoris"), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>, color: isDarkMode ? "#f43f5e" : "#e11d48" },
                                                    ].map(({ id, label, icon, color }) => (
                                                        <div key={id} style={{ padding: "11px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s ease", color: "var(--text-main)" }}
                                                            onClick={() => {
                                                                if (id === "profile") navigate("/profile");
                                                                if (id === "favorites") navigate("/favorites");
                                                            }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.paddingLeft = "22px"; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "18px"; }}>
                                                            <div style={{ width: 30, height: 30, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0, transition: "all 0.2s" }}>
                                                                {icon}
                                                            </div>
                                                            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                                                            <svg style={{ marginLeft: "auto", opacity: 0.4 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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
                                                        <span style={{ fontSize: 14, fontWeight: 600, color: "#ef4444", fontFamily: "'DM Sans',sans-serif" }}>{t("nav.logout", "Log out")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <button className="primary-btnE" style={isMobile ? { padding: "8px 14px", fontSize: 13 } : {}} onClick={() => setMenuOpen(p => !p)}>
                                                    Se connecter
                                                    <svg style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </button>
                                                <div style={{
                                                    position: "absolute", top: "calc(100% + 14px)", left: "40%",
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
                                                        { label: "Client", desc: "Louer un véhicule", color: isDarkMode ? "#60a5fa" : "#10b981", glow: isDarkMode ? "rgba(96,165,250,0.12)" : "rgba(16,185,129,0.08)", badge: null, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
                                                        { label: "Agence de location", desc: "Gérer ma flotte", color: isDarkMode ? "#a855f7" : "#047857", glow: isDarkMode ? "rgba(168,85,247,0.12)" : "rgba(4,120,87,0.08)", badge: "Pro", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><path d="M8 7V5a2 2 0 0 0-4 0v2" /></svg> },
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

                    {/* ══ MOBILE MENU PANEL ══ */}
                    {isMobile && mobileMenuOpen && (
                        <div className="mob-menu-panel" onClick={e => { if (e.target === e.currentTarget || e.currentTarget.querySelector('.mob-menu-backdrop') === e.target) setMobileMenuOpen(false); }}>
                            {/* backdrop */}
                            <div className="mob-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />

                            {/* Sheet */}
                            <div className="mob-menu-sheet" style={{
                                background: isDarkMode
                                    ? "linear-gradient(160deg, rgba(10,8,24,0.98) 0%, rgba(15,12,36,0.99) 100%)"
                                    : "linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.99) 100%)",
                                border: `1px solid ${isDarkMode ? "rgba(168,85,247,0.18)" : "rgba(16,185,129,0.18)"}`,
                                boxShadow: isDarkMode
                                    ? "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.06)"
                                    : "0 24px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                            }}>
                                {/* Glow top line */}
                                <div style={{
                                    position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
                                    background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(168,85,247,0.7)" : "rgba(16,185,129,0.6)"}, transparent)`,
                                    pointerEvents: "none",
                                }} />

                                {/* User header (if logged in) */}
                                {currentUser && (
                                    <div style={{
                                        padding: "20px 20px 16px",
                                        borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                                        display: "flex", alignItems: "center", gap: 14,
                                    }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: 50, height: 50, borderRadius: 16, flexShrink: 0,
                                            background: "var(--accent-gradient)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "#fff",
                                            boxShadow: isDarkMode ? "0 0 20px rgba(168,85,247,0.5)" : "0 0 16px rgba(16,185,129,0.4)",
                                            overflow: "hidden", position: "relative",
                                        }}>
                                            {profileImage
                                                ? <img src={profileImage} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                : currentUser.email.charAt(0).toUpperCase()
                                            }
                                            {/* online dot */}
                                            <div style={{
                                                position: "absolute", bottom: 1, right: 1,
                                                width: 12, height: 12, borderRadius: "50%",
                                                background: "#22c55e",
                                                border: `2px solid ${isDarkMode ? "#0a0818" : "#fff"}`,
                                                boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                                                animation: "pulse 2s infinite",
                                            }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16,
                                                color: isDarkMode ? "#e6edf3" : "var(--text-main)",
                                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                            }}>
                                                {currentUser.name || currentUser.email.split("@")[0]}
                                            </div>
                                            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                {currentUser.email}
                                            </div>
                                            {/* Online badge */}
                                            <div style={{
                                                display: "inline-flex", alignItems: "center", gap: 5,
                                                marginTop: 5, background: "rgba(34,197,94,0.1)",
                                                border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20,
                                                padding: "2px 8px",
                                            }}>
                                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                                                <span style={{ fontSize: 10, fontWeight: 700, color: "#22c55e" }}>En ligne</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Nav items */}
                                <div style={{ padding: "10px 12px" }}>
                                    {[
                                        {
                                            id: "profile",
                                            label: t("nav.myProfile", "Mon profil"),
                                            sub: selectedLang === "AR" ? "ملفي الشخصي" : selectedLang === "FR" ? "Voir et modifier" : "View & edit",
                                            color: isDarkMode ? "#a855f7" : "#7c3aed",
                                            icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
                                            action: () => { navigate("/profile"); setMobileMenuOpen(false); },
                                        },
                                        {
                                            id: "reservations",
                                            label: t("nav.myReservations", "Mes Réservations"),
                                            sub: selectedLang === "AR" ? "حجوزاتي" : selectedLang === "FR" ? "Historique & actives" : "History & active",
                                            color: isDarkMode ? "#60a5fa" : "#2563eb",
                                            icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
                                            action: () => { navigate("/reservations"); setMobileMenuOpen(false); },
                                        },
                                        {
                                            id: "favorites",
                                            label: t("nav.favorites", "Favoris"),
                                            sub: selectedLang === "AR" ? "المفضلة" : selectedLang === "FR" ? "Véhicules sauvegardés" : "Saved vehicles",
                                            color: isDarkMode ? "#f43f5e" : "#e11d48",
                                            icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
                                            action: () => { navigate("/favorites"); setMobileMenuOpen(false); },
                                        },
                                    ].map(({ id, label, sub, color, icon, action }) => (
                                        <button
                                            key={id}
                                            onClick={action}
                                            style={{
                                                width: "100%", display: "flex", alignItems: "center", gap: 14,
                                                padding: "13px 10px", borderRadius: 16, border: "none",
                                                background: "transparent", cursor: "pointer",
                                                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                                                textAlign: "left",
                                            }}
                                            onPointerDown={e => { e.currentTarget.style.background = isDarkMode ? `${color}12` : `${color}0d`; e.currentTarget.style.transform = "scale(0.98)"; }}
                                            onPointerUp={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                                        >
                                            {/* Icon box */}
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                                                background: `${color}15`,
                                                border: `1.5px solid ${color}30`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color, boxShadow: `0 4px 14px ${color}20`,
                                                transition: "all 0.25s",
                                            }}>
                                                {icon}
                                            </div>
                                            {/* Text */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "var(--text-main)" }}>{label}</div>
                                                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{sub}</div>
                                            </div>
                                            {/* Arrow */}
                                            <svg style={{ color: "var(--text-muted)", opacity: 0.5, flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                        </button>
                                    ))}

                                    {/* Divider */}
                                    <div style={{ height: 1, background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", margin: "6px 4px" }} />

                                    {/* ── LANGUAGE SELECTOR ── */}
                                    <div style={{ padding: "10px 10px 6px" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                                            {selectedLang === "AR" ? "اللغة" : selectedLang === "FR" ? "Langue" : "Language"}
                                        </div>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            {[
                                                { code: "AR", label: "العربية", flag: "🇲🇦" },
                                                { code: "FR", label: "Français", flag: "🇫🇷" },
                                                { code: "EN", label: "English", flag: "🇬🇧" },
                                            ].map(lang => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => { setSelectedLang(lang.code); }}
                                                    style={{
                                                        flex: 1, padding: "10px 8px", borderRadius: 14, cursor: "pointer",
                                                        border: `1.5px solid ${selectedLang === lang.code
                                                            ? (isDarkMode ? "rgba(168,85,247,0.6)" : "rgba(16,185,129,0.6)")
                                                            : "var(--nav-border)"}`,
                                                        background: selectedLang === lang.code
                                                            ? (isDarkMode ? "rgba(168,85,247,0.14)" : "rgba(16,185,129,0.1)")
                                                            : (isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)"),
                                                        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                                                        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                                                        boxShadow: selectedLang === lang.code
                                                            ? (isDarkMode ? "0 0 12px rgba(168,85,247,0.2)" : "0 0 10px rgba(16,185,129,0.2)")
                                                            : "none",
                                                    }}
                                                >
                                                    <span style={{ fontSize: 20 }}>{lang.flag}</span>
                                                    <span style={{
                                                        fontSize: 11, fontWeight: 800,
                                                        fontFamily: "'Syne',sans-serif",
                                                        color: selectedLang === lang.code
                                                            ? (isDarkMode ? "#f8c6ff" : "#0f766e")
                                                            : "var(--text-muted)",
                                                        textTransform: "uppercase", letterSpacing: "0.1em",
                                                    }}>{lang.country}</span>
                                                    <span style={{
                                                        fontSize: 11, fontWeight: 600,
                                                        color: selectedLang === lang.code
                                                            ? (isDarkMode ? "#e5e7eb" : "#111827")
                                                            : "var(--text-muted)",
                                                        whiteSpace: "nowrap",
                                                    }}>{lang.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ── THEME TOGGLE ── */}
                                    <div style={{ padding: "8px 10px 6px" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                                            {selectedLang === "AR" ? "المظهر" : selectedLang === "FR" ? "Apparence" : "Theme"}
                                        </div>
                                        <button
                                            onClick={() => setIsDarkMode(p => !p)}
                                            style={{
                                                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                                                padding: "12px 16px", borderRadius: 14, cursor: "pointer",
                                                border: `1.5px solid ${isDarkMode ? "rgba(250,204,21,0.3)" : "rgba(99,102,241,0.25)"}`,
                                                background: isDarkMode ? "rgba(250,204,21,0.07)" : "rgba(99,102,241,0.06)",
                                                transition: "all 0.3s",
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <span style={{ fontSize: 20 }}>{isDarkMode ? "🌙" : "☀️"}</span>
                                                <div>
                                                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "var(--text-main)" }}>
                                                        {isDarkMode
                                                            ? (selectedLang === "AR" ? "الوضع الداكن" : selectedLang === "FR" ? "Mode sombre" : "Dark mode")
                                                            : (selectedLang === "AR" ? "الوضع الفاتح" : selectedLang === "FR" ? "Mode clair" : "Light mode")}
                                                    </div>
                                                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                                        {selectedLang === "AR" ? "اضغط للتغيير" : selectedLang === "FR" ? "Appuyez pour changer" : "Tap to switch"}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Toggle pill */}
                                            <div style={{
                                                width: 46, height: 26, borderRadius: 13,
                                                background: isDarkMode ? "rgba(168,85,247,0.7)" : "rgba(209,213,219,0.9)",
                                                position: "relative", transition: "background 0.3s",
                                                boxShadow: isDarkMode ? "0 0 10px rgba(168,85,247,0.4)" : "none",
                                                flexShrink: 0,
                                            }}>
                                                <div style={{
                                                    position: "absolute", top: 3,
                                                    left: isDarkMode ? "calc(100% - 23px)" : 3,
                                                    width: 20, height: 20, borderRadius: "50%", background: "#fff",
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                                    transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                }} />
                                            </div>
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div style={{ height: 1, background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", margin: "6px 4px" }} />

                                    {/* ── LOGOUT ── */}
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("accessToken");
                                            localStorage.removeItem("refreshToken");
                                            localStorage.removeItem("user");
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("role");
                                            setCurrentUser(null);
                                            setMobileMenuOpen(false);
                                            navigate("/");
                                        }}
                                        style={{
                                            width: "100%", display: "flex", alignItems: "center", gap: 14,
                                            padding: "13px 10px", borderRadius: 16, border: "none",
                                            background: "rgba(239,68,68,0.07)",
                                            cursor: "pointer", transition: "all 0.25s",
                                            marginBottom: 4,
                                        }}
                                        onPointerDown={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.transform = "scale(0.98)"; }}
                                        onPointerUp={e => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; e.currentTarget.style.transform = "scale(1)"; }}
                                    >
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                                            background: "rgba(239,68,68,0.12)",
                                            border: "1.5px solid rgba(239,68,68,0.28)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: "0 4px 14px rgba(239,68,68,0.15)",
                                        }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#ef4444" }}>
                                                {t("nav.logout", "Déconnexion")}
                                            </div>
                                            <div style={{ fontSize: 11, color: "rgba(239,68,68,0.7)" }}>
                                                {selectedLang === "AR" ? "تسجيل الخروج" : selectedLang === "FR" ? "Quitter la session" : "Sign out"}
                                            </div>
                                        </div>
                                        <svg style={{ color: "rgba(239,68,68,0.5)", flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MEGA MENU PANEL */}
                    {!isMobile && !["EN", "AR"].includes(selectedLang) && (
                        <div style={{
                            position: "absolute", top: "calc(100% + 12px)", left: "50%",
                            width: "100%", maxWidth: 900,
                            background: "var(--nav-bg)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
                            border: "1px solid var(--nav-border)", borderRadius: 32, padding: activeDropdown ? 32 : 0,
                            boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
                            opacity: activeDropdown ? 1 : 0,
                            visibility: activeDropdown ? "visible" : "hidden",
                            pointerEvents: activeDropdown ? "auto" : "none",
                            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                            transform: activeDropdown ? "translate(-50%, 0) scale(1)" : "translate(-50%, -10px) scale(0.98)",
                            overflow: "hidden", maxHeight: activeDropdown ? 600 : 0
                        }}>
                            <div style={{ position: "relative" }}>

                                {/* VEHICLES DROPDOWN */}
                                <div style={{ display: activeDropdown === "Vehicles" ? "grid" : "none", gridTemplateColumns: "1.5fr 1fr", gap: 32, animation: "fadeUp 0.4s ease" }}>
                                    <div>
                                        <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", margin: "0 0 16px 16px" }}>Browse by Category</h4>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                            {[
                                                { name: "Sports Cars", desc: "Performance & Thrill", icon: <ZapIcon size={18} color="var(--accent-color)" /> },
                                                { name: "Luxury Sedans", desc: "Elegance & Comfort", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2"><path d="M4 16l4.5-9h7L20 16M4 16v4h16v-4M4 16h16" /></svg> },
                                                { name: "Premium SUVs", desc: "Space & Power", icon: <ShieldIcon size={18} color="var(--accent-color)" /> },
                                                { name: "Electric Models", desc: "Zero Emissions", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" /></svg> },
                                            ].map(c => (
                                                <div key={c.name} style={{ padding: "16px", borderRadius: 20, border: "1px solid transparent", transition: "all 0.3s", cursor: "pointer", display: "flex", gap: 14 }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = "var(--card-bg)"; e.currentTarget.style.borderColor = "var(--nav-border)"; e.currentTarget.style.transform = "translateX(5px)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}>
                                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                        {c.icon}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "var(--text-main)", marginBottom: 4 }}>{c.name}</div>
                                                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{c.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ background: "var(--card-bg)", borderRadius: 24, padding: "32px 24px", border: "1px solid var(--nav-border)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                                        <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: "var(--accent-color)", filter: "blur(60px)", opacity: 0.15 }} />
                                        <div style={{ padding: "4px 10px", background: "rgba(16,185,129,0.15)", color: "#10b981", fontSize: 10, fontWeight: 800, textTransform: "uppercase", borderRadius: 12, width: "fit-content", marginBottom: "auto", border: "1px solid rgba(16,185,129,0.3)" }}>Featured Release</div>
                                        <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text-main)", marginBottom: 8, marginTop: 40 }}>UppCar-Utopia</h4>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--text-muted)", marginBottom: 24, lineHeight: 1.6 }}>Experience 0-100 km/h in 3.2s. The pinnacle of modern engineering and design.</p>
                                        <button className="primary-btnE" style={{ padding: "12px 20px", fontSize: 14, width: "100%", borderRadius: 16 }}>Reserve Now</button>
                                    </div>
                                </div>

                                {/* SERVICES DROPDOWN */}
                                <div style={{ display: activeDropdown === "Services" ? "grid" : "none", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, animation: "fadeUp 0.4s ease" }}>
                                    {[
                                        { title: "Chauffeur Service", desc: "Professional drivers for executive travel and special occasions.", icon: <GlobeIcon size={20} color="#3b82f6" />, color: "#3b82f6" },
                                        { title: "Airport Transfers", desc: "Seamless pickup and drop-off with flight tracking included.", icon: <MapPinIcon size={20} color="#a855f7" />, color: "#a855f7" },
                                        { title: "Workspace d'Agence", desc: "Gérez votre flotte, vos réservations et votre activité depuis un tableau de bord complet.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, color: "#10b981" },
                                    ].map(s => (
                                        <div key={s.title} style={{ padding: "32px 24px", borderRadius: 24, background: "var(--card-bg)", border: "1px solid var(--nav-border)", transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)", cursor: "pointer", position: "relative", overflow: "hidden" }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}20`; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--nav-border)"; e.currentTarget.style.boxShadow = "none"; }}>
                                            <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: s.color, opacity: 0.1, borderRadius: "50%", filter: "blur(30px)" }} />
                                            <div style={{ width: 48, height: 48, borderRadius: 16, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{s.icon}</div>
                                            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-main)", marginBottom: 8 }}>{s.title}</h4>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 24 }}>{s.desc}</p>
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: s.color, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Explore <ArrowRightIcon size={14} color={s.color} /></div>
                                        </div>
                                    ))}
                                </div>

                                {/* PRICING DROPDOWN */}
                                <div style={{ display: activeDropdown === "Pricing" ? "grid" : "none", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, animation: "fadeUp 0.4s ease" }}>
                                    {[
                                        { tier: "Pay As You Go", price: "Free", desc: "No monthly fees. Perfect for occasional weekend rentals.", btn: "Sign Up Free" },
                                        { tier: "Premium Pass", price: "$19/mo", desc: "Unlock 15% discounts, no deposits, and free upgrades.", btn: "Get Premium", highlight: true },
                                        { tier: "Enterprise Fleet", price: "Custom", desc: "Dedicated account manager and consolidated billing.", btn: "Contact Sales" },
                                    ].map((p, i) => (
                                        <div key={p.tier} style={{ padding: "32px 24px", borderRadius: 24, background: p.highlight ? "rgba(16,185,129,0.05)" : "var(--card-bg)", border: `1px solid ${p.highlight ? "#10b981" : "var(--nav-border)"}`, position: "relative", display: "flex", flexDirection: "column" }}>
                                            {p.highlight && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#10b981", color: "#fff", fontSize: 9, fontWeight: 800, textTransform: "uppercase", padding: "4px 12px", borderRadius: "0 0 8px 8px", letterSpacing: "0.15em" }}>Most Popular</div>}
                                            <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 8, marginTop: p.highlight ? 16 : 0 }}>{p.tier}</h4>
                                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text-main)", marginBottom: 12, letterSpacing: -1 }}>{p.price}</div>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{p.desc}</p>
                                            <button className={p.highlight ? "primary-btnDE" : "secondary-btn"} style={{ width: "100%", padding: "12px", fontSize: 13, borderRadius: 14 }}>{p.btn}</button>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* ══ HERO ══ */}
                <section style={{
                    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                    padding: isMobile ? "60px 16px 48px" : "90px 20px 70px",
                    position: "relative",
                }}>
                    {isDarkMode && (
                        <div style={{
                            position: "absolute", top: "50%", left: "50%",
                            width: isMobile ? 280 : 600, height: isMobile ? 280 : 600,
                            borderRadius: "50%",
                            background: "radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,rgba(59,130,246,0.06) 40%,transparent 70%)",
                            pointerEvents: "none", animation: "breathe 6s ease-in-out infinite",
                            transform: "translate(-50%,-50%)",
                        }} />
                    )}

                    {/* Mobile live badge (Removed) */}

                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: isMobile ? 5 : 10,
                        padding: isMobile ? "10px 17px" : "10.7px 20px", borderRadius: 50,
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 11 : 14, fontWeight: 500,
                        whiteSpace: "nowrap",
                        background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
                        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.25)"}`,
                        color: "var(--accent-color)",
                        position: "relative", bottom: isMobile ? 22 : 24, left: isMobile ? 6 : 23,
                        boxShadow: isDarkMode
                            ? "0 0 0 2px rgba(96,165,250,0.2), 0 4px 20px rgba(96,165,250,0.15), 0 0 40px rgba(96,165,250,0.08)"
                            : "0 0 0 2px rgba(16,185,129,0.2), 0 4px 20px rgba(16,185,129,0.15), 0 0 40px rgba(16,185,129,0.08)",
                    }}>
                        <span style={{
                            width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                            background: isDarkMode ? "#60a5fa" : "#10b981",
                            animation: "pulse 2s ease-in-out infinite",
                        }} />
                        {t("hero.taglineBadge", "Up to 50 bookings processed automatically in 1 click")}
                    </div>
                    {/* ── H1 ── */}
                    <h1 style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: isMobile
                            ? (selectedLang === "AR" ? "clamp(40px,9.5vw,42px)" : "clamp(36px,9vw,37px)")
                            : (selectedLang === "AR" ? "clamp(60px,5vw,95px)" : "clamp(50px,4.8vw,90px)"),
                        fontWeight: 800,
                        letterSpacing: isMobile ? -2 : -3,
                        lineHeight: isMobile ? (selectedLang === "AR" ? 1.2 : 1.1) : (selectedLang === "AR" ? 1.2 : 1),
                        marginBottom: isMobile ? 16 : 20,
                        paddingBottom: selectedLang === "AR" ? 10 : 0,
                        background: "var(--accent-gradient)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        animation: "fadeUp 0.7s 0.1s ease both",
                        position: "relative", top: isMobile ? 0 : (selectedLang === "AR" ? -1 : 10),
                        maxWidth: "100%",
                        marginTop: 0,
                    }}>
                        {isMobile
                            ? t("hero.h1Mobile", <>The Car You Want Ready To Drive<br /></>)
                            : t("hero.h1Desktop", <>The Car You Want Second<br />You Need It</>)
                        }
                    </h1>

                    {/* ── Typewriter ── */}
                    <div style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: isMobile
                            ? (selectedLang === "AR" ? "clamp(20px,5.5vw,26px)" : "clamp(16px,5vw,24px)")
                            : (selectedLang === "AR" ? "clamp(40px,3.8vw,60px)" : "clamp(37px,3.5vw,55px)"),
                        fontWeight: selectedLang === "AR" ? 600 : 400, color: isDarkMode ? "var(--accent-color)" : "rgba(33, 141, 0, 1)",
                        marginBottom: isMobile ? 29 : 12,
                        height: "1.5em", width: "100%",
                        maxWidth: isMobile ? "100%" : 900,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                        animation: "fadeUp 0.7s 0.2s ease both",
                        position: "relative", bottom: isMobile ? "1px" : 0,
                        top: isMobile ? 0 : (selectedLang === "AR" ? 0 : 12),
                    }}>
                        <span>{displayed}</span>
                        <span style={{ display: "inline-block", width: 2, height: "0.85em", background: isDarkMode ? "var(--accent-color)" : "#064e3b", animation: "blink 1s infinite", flexShrink: 0, boxShadow: `0 0 6px ${isDarkMode ? "var(--accent-color)" : "#064e3b"}` }} />
                    </div>

                    {/* ══ AI VIDEO / IMAGE INPUT ══ */}
                    <div style={{
                        width: "100%", maxWidth: isMobile ? "100%" : (selectedLang === "AR" ? 780 : 700),
                        marginBottom: isMobile ? 38 : 48,
                        animation: "fadeUp 0.7s 0.4s ease both",
                        position: "relative", zIndex: 1,
                        bottom: isMobile ? 7 : 0,
                    }}>
                        <div style={{
                            display: "flex", alignItems: "center",
                            background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
                            border: `1.5px solid ${aiFocused
                                ? (isDarkMode ? "rgba(96,165,250,0.55)" : "rgba(4,120,87,0.5)")
                                : (isDarkMode ? "rgba(255,255,255,0.09)" : "rgba(6,78,59,0.13)")}`,
                            borderRadius: 50,
                            height: selectedLang === "AR" ? (isMobile ? 65 : 76) : (isMobile ? 60 : 70),
                            padding: isMobile
                                ? (selectedLang === "AR" ? "0 24px 0 0" : "0 0 0 24px")
                                : (selectedLang === "AR" ? "0 30px 0 6px" : "0 6px 0 30px"),
                            overflow: "hidden",
                            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                            boxShadow: isMobile
                                ? (aiFocused
                                    ? (isDarkMode
                                        ? "0 0 0 3px rgba(96,165,250,0.3), 0 12px 50px rgba(37,99,235,0.4), inset 0 1px 2px rgba(255,255,255,0.1)"
                                        : "0 0 0 3px rgba(16,185,129,0.3), 0 12px 50px rgba(16,185,129,0.35), inset 0 1px 2px rgba(255,255,255,0.2)")
                                    : (isDarkMode
                                        ? "0 8px 32px rgba(37,99,235,0.2), 0 0 60px rgba(14,165,233,0.08)"
                                        : "0 8px 32px rgba(16,185,129,0.15), 0 0 60px rgba(74,222,128,0.06)"))
                                : (aiFocused
                                    ? (isDarkMode
                                        ? "0 0 0 3.2px rgba(96,165,250,0.25), 0 8px 40px rgba(37,99,235,0.3), 0 0 80px rgba(14,165,233,0.15)"
                                        : "0 0 0 3.2px rgba(16,185,129,0.25), 0 8px 40px rgba(5,150,105,0.25), 0 0 60px rgba(16,185,129,0.12)")
                                    : (isDarkMode
                                        ? "0 0 0 3.2px rgba(96,165,250,0.15), 0 8px 40px rgba(37,99,235,0.25), 0 0 80px rgba(14,165,233,0.1)"
                                        : "0 0 0 3.2px rgba(16,185,129,0.15), 0 8px 40px rgba(5,150,105,0.2), 0 0 60px rgba(16,185,129,0.08)")),
                            transition: "border-color 0.3s, box-shadow 0.3s",
                            width: isMobile ? "100%" : (selectedLang === "AR" ? "100%" : "111%"),
                            margin: isMobile ? "0 auto" : (selectedLang === "AR" ? "0 5%" : "0 -5.5%"),
                            position: "relative",
                            top: isMobile ? 0 : (selectedLang === "AR" ? 10 : 34),
                            right: isMobile ? "auto" : (selectedLang === "AR" ? "-35px" : "auto"),
                            boxSizing: "border-box",
                            animation: isMobile && !aiFocused ? (isDarkMode ? "borderGlowDark 3s ease-in-out infinite" : "borderGlow 3s ease-in-out infinite") : "none"
                        }}>
                            <input
                                value={aiValue}
                                onChange={e => setAiValue(e.target.value)}
                                onFocus={() => setAiFocused(true)}
                                onBlur={() => setAiFocused(false)}
                                onKeyDown={e => e.key === "Enter" && handleGenerate()}
                                placeholder={aiFocused ? t("hero.searchPlaceholder", "Décrivez votre voiture…") : aiPlaceholder}
                                style={{
                                    flex: 1, border: "none", outline: "none", background: "transparent",
                                    fontFamily: "'DM Sans','Syne',sans-serif",
                                    fontSize: selectedLang === "AR" ? (isMobile ? 16 : 20) : 17.3,
                                    fontWeight: 700, color: "var(--text-main)",
                                    caretColor: isDarkMode ? "#60a5fa" : "#10b981",
                                    minWidth: 0,
                                }}
                            />
                            <button
                                aria-label="Entrée vocale"
                                onClick={startListening}
                                style={{
                                    width: selectedLang === "AR" ? (isMobile ? 50 : 54) : 45,
                                    height: selectedLang === "AR" ? (isMobile ? 50 : 54) : 45,
                                    borderRadius: "50%",
                                    background: listening ? "rgba(239,68,68,0.15)" : "none",
                                    border: "none", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: listening ? "#ef4444" : (isDarkMode ? "rgba(96,165,250,0.6)" : "rgba(4,120,87,0.55)"),
                                    flexShrink: 0,
                                    marginRight: isMobile ? 4 : (selectedLang === "AR" ? 0 : 6),
                                    marginLeft: isMobile ? 4 : (selectedLang === "AR" ? 6 : 0),
                                    transition: "all 0.2s",
                                    position: "relative",
                                }}
                            >
                                {listening && (
                                    <div style={{
                                        position: "absolute", inset: -4, borderRadius: "50%",
                                        border: "1.5px solid #ef4444",
                                        animation: "ping 1s ease-out infinite",
                                    }} />
                                )}
                                <svg width={selectedLang === "AR" ? 20 : 17} height={selectedLang === "AR" ? 20 : 17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                    <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            </button>
                            <button
                                className="primary-btnDE"
                                onClick={handleGenerate}
                                disabled={aiLoading}
                                style={{
                                    width: isMobile ? "auto" : "auto",
                                    height: isMobile ? "100%" : (selectedLang === "AR" ? 76 : 68),
                                    padding: isMobile ? "0 22px" : (selectedLang === "AR" ? "3px 69px" : "3px 41px"),
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    borderRadius: isMobile
                                        ? (selectedLang === "AR" ? "50px 0 0 50px" : "0 50px 50px 0")
                                        : 44,
                                    fontSize: selectedLang === "AR" ? (isMobile ? 15 : 19) : (isMobile ? 11.5 : 16),
                                    letterSpacing: (selectedLang === "AR" || isMobile) ? "0" : "0.05em",
                                    fontFamily: "'DM Sans','Syne',sans-serif",
                                    fontWeight: 700,
                                    gap: 7,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                    alignSelf: isMobile ? "stretch" : "auto",
                                    position: "relative",
                                    left: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : "6px"),
                                    right: isMobile ? "auto" : (selectedLang === "AR" ? "6px" : "auto"),
                                }}
                            >
                                <svg className="hyrakle" width={selectedLang === "AR" ? 25 : (isMobile ? 24 : 23)} height={selectedLang === "AR" ? 25 : (isMobile ? 24 : 23)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                                {!isMobile && t("hero.searchBtn", "To research")}
                            </button>
                        </div>
                    </div>

                    {!isMobile && (
                        <div style={{
                            fontSize: selectedLang === "AR" ? 24 : 22,
                            maxWidth: 760,
                            margin: "16px auto 0",
                            textAlign: "center",
                            lineHeight: 1.6,
                            fontWeight: 700,
                            fontFamily: "'Syne', sans-serif",
                            whiteSpace: "pre-line",
                            ...(isDarkMode ? {
                                background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 25%, #93c5fd 50%, #60a5fa 75%, #3b82f6 100%)",
                                backgroundSize: "300% 300%",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                animation: "gradientShift 5s ease infinite",
                            } : {
                                color: "var(--text-main)",
                                opacity: 0.85,
                            }),
                            opacity: 1,
                            position: "relative",
                            top: selectedLang === "AR" ? -22 : 10,

                            letterSpacing: "0.3px",
                        }}>
                            {t("hero.subtitle", "The ultimate platform for modern drivers and agencies.\nSmooth reservations and powerful management.")}
                        </div>
                    )}

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 4 : 12,
                        animation: "fadeUp 0.7s 0.45s ease both",
                        width: "100%", maxWidth: 600,
                    }}>
                        <span style={{
                            fontSize: isMobile
                                ? (selectedLang === "AR" ? 17 : 12)
                                : (selectedLang === "AR" ? 22 : 16),
                            fontWeight: 800, letterSpacing: selectedLang === "AR" ? "0em" : "0.15em",
                            fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap",
                            position: "relative",
                            top: isMobile ? -15 : (selectedLang === "AR" ? -10 : 35),
                            bottom: isMobile ? 0 : "43px",
                            left: "auto",
                            textAlign: "center",
                            margin: isMobile ? "-8px 0 0" : "0 auto",
                            backgroundImage: isDarkMode
                                ? "linear-gradient(270deg, #60a5fa, #a855f7, #f472b6, #60a5fa)"
                                : "linear-gradient(270deg, #059669, #10b981, #0ea5e9, #059669)",
                            backgroundSize: "300% 300%",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                            display: "inline-block",
                            animation: "btnGradientMove 3s ease infinite",
                        }}>
                            {t("hero.number1", "Number 1 platform in Morocco")}
                        </span>
                    </div>




                    <button
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                        style={{
                            width: 35, height: 53, borderRadius: 21,
                            border: `2px solid ${isDarkMode ? "rgba(96,165,250,0.8)" : "rgba(16,185,129,0.8)"}`,
                            background: isDarkMode ? "rgba(96,165,250,0.12)" : "rgba(16,185,129,0.12)",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                            position: "relative",
                            top: isMobile ? "6px" : (selectedLang === "AR" ? "15px" : "65px"), left: "25px",
                            transform: "translateX(-50%)",
                            boxShadow: isDarkMode ? "0 0 30px rgba(96,165,250,0.3)" : "0 0 30px rgba(16,185,129,0.3)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateX(-50%) translateY(-3px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateX(-50%)"}
                    >
                        <svg style={{ animation: "arrowFall 1.6s cubic-bezier(0.45,0,0.55,1) infinite" }}
                            width="14" height="20" viewBox="0 0 14 20" fill="none">
                            <line x1="7" y1="0" x2="7" y2="12"
                                stroke={isDarkMode ? "#60a5fa" : "#10b981"}
                                strokeWidth="2" strokeLinecap="round" />
                            <polyline points="1,8 7,14 13,8"
                                stroke={isDarkMode ? "#60a5fa" : "#10b981"}
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* ── Feature pills ── */}
                    {!isMobile && <div className={isMobile ? "mobile-scroll" : ""} style={{
                        display: "flex",
                        gap: isMobile ? 8 : 28,
                        flexWrap: isMobile ? "nowrap" : "wrap",
                        justifyContent: isMobile ? "flex-start" : "center",
                        overflowX: isMobile ? "auto" : "visible",
                        width: isMobile ? "calc(100% + 32px)" : "auto",
                        marginLeft: isMobile ? -16 : 0,
                        paddingLeft: isMobile ? 16 : 0,
                        paddingRight: isMobile ? 16 : 0,
                        paddingBottom: isMobile ? 4 : 0,
                        animation: "fadeUp 0.7s 0.7s ease both",
                        position: "relative",
                        top: selectedLang === "AR" ? (isMobile ? "0px" : "40px") : "90px",
                        cursor: "pointer",


                    }}>
                        {[
                            { icon: <CheckIcon />, l: isMobile ? t("hero.feature1Mobile", "No Deposit") : t("hero.feature1", "No Deposit Required") },
                            { icon: <CrosshairIcon />, l: isMobile ? t("hero.feature2Mobile", "Contactless") : t("hero.feature2", "Contactless Handover") },
                            { icon: <ShieldIcon />, l: t("hero.feature3", "Fully Insured") },
                            { icon: <MapPinIcon />, l: isMobile ? t("hero.feature4Mobile", "150+ Locs") : t("hero.feature4", "150+ Locations") },
                        ].map(({ icon, l }) => (
                            <div key={l} style={{
                                display: "flex", alignItems: "center", gap: 7,
                                color: "var(--text-muted)", fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                background: "var(--card-bg)", padding: isMobile ? "8px 14px" : "10px 20px",
                                borderRadius: 20, border: "1px solid var(--card-border)",
                                flexShrink: 0,
                                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                                cursor: "pointer",
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = isDarkMode ? "rgba(96,165,250,0.8)" : "rgba(16,185,129,0.8)";
                                    e.currentTarget.style.background = isDarkMode ? "rgba(96,165,250,0.08)" : "rgba(16,185,129,0.08)";
                                    e.currentTarget.style.color = isDarkMode ? "#60a5fa" : "#10b981";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow = isDarkMode ? "0 0 20px rgba(96,165,250,0.2)" : "0 0 20px rgba(16,185,129,0.2)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "var(--card-border)";
                                    e.currentTarget.style.background = "var(--card-bg)";
                                    e.currentTarget.style.color = "var(--text-muted)";
                                    e.currentTarget.style.transform = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <span style={{ color: "var(--accent-color)", display: "flex", alignItems: "center" }}>{icon}</span>{l}
                            </div>
                        ))}
                    </div>}

                </section>

                {/* ── SEARCH RESULTS ── */}
                {hasSearched && (
                    <section id="search-results" style={{
                        width: "100%", maxWidth: "98vw", margin: "0 auto 80px",
                        animation: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
                        padding: isMobile ? "0 12px" : "0 40px",
                        position: "relative",
                        top: isMobile ? 0 : 90,
                    }}>
                        <div style={{
                            textAlign: "center", marginBottom: 40,
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 12
                        }}>
                            {searchResults.length > 0 && (
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                                    borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 700,
                                    color: "var(--accent-color)"
                                }}>
                                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-color)", animation: "pulse 2s infinite" }} />
                                    {searchResults.length} {selectedLang === "AR" ? "السيارات المتاحة" : selectedLang === "FR" ? "Voitures disponibles" : "Vehicles Found"}
                                </div>
                            )}
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text-main)" }}>
                                {selectedLang === "AR" ? "مجموعتك المختارة من السيارات المميزة" : selectedLang === "FR" ? "Votre Sélection de Véhicules d'Exception" : "Our Exceptional Vehicles Selection"}
                            </h2>
                        </div>

                        {searchResults.length > 0 ? (
                            <div dir="ltr" style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                                gap: isMobile ? 16 : 37
                            }}>
                                {searchResults.map((car, idx) => (
                                    <div key={car.id} dir={selectedLang === "AR" ? "rtl" : "ltr"} className="fleet-card" style={{
                                        animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both ${idx * 0.1}s`,
                                        padding: 0, overflow: "hidden", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 24,
                                        textAlign: selectedLang === "AR" ? "right" : "left"
                                    }}>
                                        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                                            <img
                                                src={car.photos && car.photos.length > 0 ? car.photos[0] : ""}
                                                alt={car.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                className="car-img"
                                            />
                                            {/* ❤ Favorite button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleFavorite(car.id); }}
                                                title={favorites.has(car.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                                style={{
                                                    position: "absolute", top: 12, left: 12,
                                                    width: 36, height: 36, borderRadius: "50%",
                                                    background: favorites.has(car.id) ? "rgba(239,68,68,0.18)" : "rgba(0,0,0,0.45)",
                                                    backdropFilter: "blur(8px)",
                                                    border: favorites.has(car.id) ? "1.5px solid rgba(239,68,68,0.6)" : "1.5px solid rgba(255,255,255,0.15)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                                                    transform: "scale(1)",
                                                    boxShadow: favorites.has(car.id) ? "0 4px 16px rgba(239,68,68,0.35)" : "none",
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.18)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill={favorites.has(car.id) ? "#ef4444" : "none"} stroke={favorites.has(car.id) ? "#ef4444" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                            </button>
                                            {/* Category badge */}
                                            <div style={{
                                                position: "absolute", top: 12, right: 12,
                                                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                                                color: "#fff", padding: "4px 12px", borderRadius: 12,
                                                fontSize: 12, fontWeight: 800
                                            }}>
                                                {car.category}
                                            </div>
                                        </div>
                                        <div style={{ padding: 24 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                                <div>
                                                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-main)", marginBottom: 4 }}>{car.name}</h3>
                                                    <div style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                                                        <MapPinIcon size={13} /> {car.plate || "Location available"}
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <div style={{ fontSize: 22, fontWeight: 900, color: "var(--accent-color)", fontFamily: "'Syne',sans-serif" }}>
                                                        {car.price} MAD
                                                    </div>
                                                    <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>/ {selectedLang === "AR" ? "يوم" : selectedLang === "FR" ? "jour" : "day"}</div>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
                                                marginBottom: 24, borderTop: "1px solid var(--card-border)", paddingTop: 16
                                            }}>
                                                <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)" }}>
                                                    <ZapIcon size={14} color="var(--accent-color)" /> {car.fuel}
                                                </div>
                                                <div style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)" }}>
                                                    <UsersIcon size={14} color="var(--accent-color)" /> {car.seats} {selectedLang === "AR" ? "مقاعد" : "Seats"}
                                                </div>
                                            </div>
                                            <button
                                                className="primary-btnDE"
                                                style={{ width: "100%", padding: "14px", borderRadius: 16, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                                                onClick={() => {
                                                    navigate(`/booking/${car.id}`);
                                                }}
                                            >
                                                {selectedLang === "AR" ? (
                                                    <>
                                                        <CalendarIcon size={18} />
                                                        <span>احجز الآن</span>
                                                    </>
                                                ) : selectedLang === "FR" ? (
                                                    <>
                                                        <CalendarIcon size={18} />
                                                        <span>Réserver maintenant</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CalendarIcon size={18} />
                                                        <span>Book Now</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                textAlign: "center", padding: "160px 20px", background: "var(--card-bg)",
                                borderRadius: 32, border: "1px solid var(--card-border)"
                            }}>
                                <AnimatedSearchIcon />
                                <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-main)", marginBottom: 12 }}>
                                    {selectedLang === "AR" ? "لم يتم العثور على سيارات" : selectedLang === "FR" ? "Aucune voiture trouvée" : "No Vehicles Found"}
                                </h3>
                                <p style={{ color: "var(--text-muted)", maxWidth: 400, margin: "0 auto" }}>
                                    {selectedLang === "AR" ? "جرب البحث عن شيء آخر أو تصفح مجموعتنا الكاملة." : selectedLang === "FR" ? "Essayez d'autres mots-clés ou parcourez notre flotte complète." : "Try searching for something else or browse our full fleet."}
                                </p>
                            </div>
                        )}
                    </section>
                )}

                {/* ══ MARQUEE ══ */}
                <section style={{ padding: isMobile ? "32px 0" : "50px 0", position: "relative", top: isMobile ? 20 : 80 }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "15%", height: "100%", zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, width: "15%", height: "100%", zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 40, position: "relative", zIndex: 1 }}>
                        <span style={{ fontSize: isMobile ? 12 : 22, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-color)" }}>
                            {t("marquee.trusted", "Trusted by world-class manufacturers")}
                        </span>
                    </div>
                    <div dir="ltr" style={{ display: "flex", flexDirection: "column", gap: isMobile ? 24 : 40, position: "relative", zIndex: 1 }}>
                        {/* ROW 1 */}
                        <div style={{ display: "flex", width: "fit-content" }}>
                            <div style={{ display: "flex", gap: isMobile ? 60 : 100, alignItems: "center", paddingRight: isMobile ? 60 : 100, animation: "marquee 40s linear infinite" }}>
                                {["Mercedes-Benz", "Porsche", "BMW", "Audi", "Range Rover", "Maserati", "Aston Martin", "Tesla",
                                    "Mercedes-Benz", "Porsche", "BMW", "Audi", "Range Rover", "Maserati", "Aston Martin", "Tesla"].map((brand, i) => {
                                        const color = getColor(brand);
                                        return (
                                            <div key={`r1-${i}`} style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, opacity: 1, transition: "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)", cursor: "pointer", filter: "grayscale(0%)" }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15) translateY(-5px)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
                                                <div style={{ width: isMobile ? 32 : 44, height: isMobile ? 32 : 44, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 20px ${color}25`, transition: "all 0.5s" }}>
                                                    <GlobeIcon size={isMobile ? 14 : 20} color={color} />
                                                </div>
                                                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 36, letterSpacing: "-0.02em", color: color, whiteSpace: "nowrap", transition: "color 0.5s", textShadow: `0 0 40px ${color}30` }}>{brand}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        {/* ROW 2 */}
                        <div style={{ display: "flex", width: "fit-content" }}>
                            <div style={{ display: "flex", gap: isMobile ? 60 : 100, alignItems: "center", paddingRight: isMobile ? 60 : 100, animation: "marquee 50s linear infinite reverse" }}>
                                {["Jaguar", "Lexus", "Volvo", "Alfa Romeo", "Bentley", "Ferrari", "Lamborghini", "Bugatti",
                                    "Jaguar", "Lexus", "Volvo", "Alfa Romeo", "Bentley", "Ferrari", "Lamborghini", "Bugatti"].map((brand, i) => {
                                        const color = getColor(brand);
                                        return (
                                            <div key={`r2-${i}`} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16, opacity: 1, transition: "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)", cursor: "pointer", filter: "grayscale(0%)" }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15) translateY(-5px)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
                                                <div style={{ width: isMobile ? 26 : 36, height: isMobile ? 26 : 36, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px ${color}20` }}>
                                                    <ZapIcon size={isMobile ? 12 : 16} color={color} />
                                                </div>
                                                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 15 : 24, letterSpacing: "-0.01em", color: color, whiteSpace: "nowrap", textShadow: `0 0 30px ${color}25` }}>{brand}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </section>


                <section style={{ padding: isMobile ? "60px 16px" : "100px 20px", position: "relative", zIndex: 1, position: "relative", bottom: 8 }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, marginTop: 40 }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 30, padding: "6px 16px", animation: "fadeUp 0.6s ease both", position: "relative", bottom: 11 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pulse 2s infinite" }} />
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("partnership.badge", "Partnership")}</span>
                            </div>
                        </div>
                        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(32px,8vw,44px)" : "clamp(48px,5vw,64px)", color: "var(--text-main)", textAlign: "center", marginBottom: 45, letterSpacing: -2, animation: "fadeUp 0.7s 0.2s ease both" }}>
                            {t("partnership.titleLeft", "A Model Built for ")} <span style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("partnership.titleHighlight", "Agency Growth")}</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>{t("partnership.subtitle", "Join UppCar and transform your business with our hybrid partnership model. We believe in proving our value first.")}</p>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 24, paddingBottom: 60 }}>
                            {[
                                { title: t("partnership.cards.0.title", "Agency Access"), price: t("partnership.cards.0.price", "100% Free"), desc: t("partnership.cards.0.desc", "Full access to our complete SaaS dashboard, fleet management, and analytics with zero upfront commitment."), color: "#10b981", badge: t("partnership.cards.0.badge", "Start Here") },
                                { title: t("partnership.cards.1.title", "Management Tools"), price: t("partnership.cards.1.price", "Included"), desc: t("partnership.cards.1.desc", "Enjoy your powerful digital workspace to manage your agency operations, vehicles, and bookings efficiently."), color: "#3b82f6" },
                                { title: t("partnership.cards.2.title", "Marketplace Commission"), price: t("partnership.cards.2.price", "10% success fee"), desc: t("partnership.cards.2.desc", "We only win when you win. A flat commission applies to every confirmed booking through the platform."), color: "#a855f7" }
                            ].map((p, i) => (
                                <div key={p.title} style={{ background: "var(--card-bg)", border: `1px solid ${p.color}40`, borderRadius: 32, padding: "40px 32px", position: "relative", overflow: "hidden", transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)", cursor: "pointer", zIndex: 1 }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = "translateY(-12px) scale(1.03)";
                                        e.currentTarget.style.borderColor = p.color;
                                        e.currentTarget.style.boxShadow = `0 30px 60px ${p.color}25, 0 0 0 1px ${p.color}`;
                                        e.currentTarget.style.zIndex = 10;
                                        const glow = e.currentTarget.querySelector('.pricing-glow');
                                        if (glow) { glow.style.opacity = "0.25"; glow.style.transform = "scale(1.5)"; }
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                                        e.currentTarget.style.borderColor = `${p.color}40`;
                                        e.currentTarget.style.boxShadow = "none";
                                        e.currentTarget.style.zIndex = 1;
                                        const glow = e.currentTarget.querySelector('.pricing-glow');
                                        if (glow) { glow.style.opacity = "0.1"; glow.style.transform = "scale(1)"; }
                                    }}>
                                    <div className="pricing-glow" style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: p.color, opacity: 0.1, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none", transition: "all 0.6s ease" }} />
                                    {p.badge && <div style={{ position: "absolute", top: 24, right: 24, background: `${p.color}15`, color: p.color, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 800, backdropFilter: "blur(8px)", border: `1px solid ${p.color}40`, boxShadow: `0 4px 12px ${p.color}20` }}>{p.badge}</div>}
                                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, color: p.color, marginBottom: 16 }}>{p.title}</h3>
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text-main)", marginBottom: 20, letterSpacing: -1, whiteSpace: "nowrap" }}>{p.price}</div>
                                    <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6 }}>{p.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>


                {/* ══ INTERACTIVE SAAS DASHBOARD SHOWCASE ══ */}
                <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .feature-item { cursor: pointer; border-radius: 20px; border: 1px solid transparent; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .feature-item:hover { background: var(--card-bg); border-color: var(--card-border); }
        .mockup-window { position: relative; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 28px; overflow: hidden; box-shadow: 0 40px 120px rgba(0,0,0,0.05); }
        [data-theme='dark'] .mockup-window { background: linear-gradient(145deg,rgba(12,14,22,0.95) 0%, rgba(7,9,18,0.98) 100%); border-color: rgba(255,255,255,0.08); box-shadow: 0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06); }
        .cta-btn { background: var(--bg-color); border: 1px solid var(--card-border); color: var(--text-main); border-radius: 14px; padding: 14px 28px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif; cursor: pointer; letter-spacing: 0.02em; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); background: var(--text-main); color: var(--bg-color); }
        .cta-btn.primary { background: linear-gradient(135deg, #1d4ed8, #3b82f6); border-color: transparent; box-shadow: 0 8px 24px rgba(59,130,246,0.2); color: #fff; }
        .cta-btn.primary:hover { box-shadow: 0 14px 36px rgba(59,130,246,0.35); color: #fff; }
      `}</style>

                <section style={{ padding: "10px 20px", position: "relative", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>

                    {/* ── Background atmosphere ── */}


                    <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>

                        {/* ── Header ── */}
                        <div style={{ textAlign: "center", marginBottom: 80, animation: mounted ? "fadeUp 0.7s ease both" : "none" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 40, padding: "7px 18px", marginBottom: 28 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: f.color, boxShadow: `0 0 8px ${f.color}`, animation: "pulse 2s infinite", transition: "background 0.4s, box-shadow 0.4s" }} />
                                <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("agencyOS.badge", "Agency OS")}</span>
                            </div>
                            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(52px,7vw,84px)", color: "var(--text-main)", letterSpacing: -3, lineHeight: 1.0, marginBottom: 20 }}>
                                {t("agencyOS.title", "Accelerate Your")}<br />
                                <span style={{ color: f.color, transition: "color 0.4s ease" }}> {t("agencyOS.titleHighlight", "Operations.")}</span>
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: 20, maxWidth: 480, margin: "0 auto", lineHeight: 1.6, fontWeight: 400 }}>
                                {t("agencyOS.subtitle", "One command center. Every booking, vehicle, and revenue stream — perfectly orchestrated.")}
                            </p>
                        </div>

                        {/* ── Main Grid ── */}
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "360px 1fr", gap: isMobile ? 32 : 80 }}>

                            {/* LEFT: Feature list */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {features.map((item) => {
                                    const isActive = activeFeature === item.id;
                                    return (
                                        <div key={item.id} className="feature-item"
                                            onMouseEnter={() => handleSelect(item.id)}
                                            onClick={() => handleSelect(item.id)}
                                            style={{
                                                padding: "20px 22px",
                                                background: isActive ? "var(--card-bg)" : "transparent",
                                                border: `1px solid ${isActive ? "var(--card-border)" : "transparent"}`,
                                                transform: isActive ? "translateX(6px)" : "translateX(0)",
                                                boxShadow: isActive ? `0 0 40px ${item.color}15, inset 0 0 20px ${item.color}05` : "none",
                                            }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                {/* Icon */}
                                                <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? `${item.color}15` : "var(--card-bg)", color: isActive ? item.color : "var(--text-muted)", border: `1px solid ${isActive ? `${item.color}30` : "var(--card-border)"}`, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                                                    {item.icon}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: isActive ? "var(--text-main)" : "var(--text-muted)", transition: "color 0.3s", letterSpacing: -0.3 }}>{item.title}</span>
                                                    </div>
                                                    <div style={{ maxHeight: isActive ? 40 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)", marginTop: isActive ? 4 : 0 }}>
                                                        <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.5 }}>{item.tagline}</div>
                                                    </div>
                                                </div>
                                                {/* Progress indicator */}
                                                {isActive && (
                                                    <div style={{ width: 32, height: 32, flexShrink: 0, position: "relative" }}>
                                                        <svg width="32" height="32" viewBox="0 0 32 32" style={{ transform: "rotate(-90deg)" }}>
                                                            <circle cx="16" cy="16" r="12" fill="none" stroke={`${item.color}20`} strokeWidth="2" />
                                                            <circle cx="16" cy="16" r="12" fill="none" stroke={item.color} strokeWidth="2" strokeDasharray={`${2 * Math.PI * 12}`} strokeDashoffset="0" style={{ animation: "none" }} />
                                                        </svg>
                                                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* CTA Buttons */}
                                <div style={{ display: "flex", gap: 10, marginTop: 20, paddingLeft: 4 }}>
                                    <button className="primary-btnE">{t("agencyOS.getStartedBtn", "Get Started")}</button>
                                    <button className="secondary-btn">{t("agencyOS.watchDemoBtn", "Watch Demo")}</button>
                                </div>
                            </div>

                            {/* RIGHT: App window mockup */}
                            <div className="mockup-window" style={{ minHeight: 520 }}>
                                {/* Dynamic color glow */}
                                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 60% 30%, ${f.glow} 0%, transparent 60%)`, transition: "background 0.6s ease", pointerEvents: "none", zIndex: 0 }} />

                                {/* Scanline animation */}
                                <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1, opacity: 0.3 }}>
                                    <div style={{ position: "absolute", left: 0, right: 0, height: "30%", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.02) 50%, transparent)", animation: "scanline 6s linear infinite" }} />
                                </div>

                                {/* Title bar */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, background: "var(--card-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)", display: "flex", alignItems: "center", padding: "0 22px", zIndex: 20, gap: 8 }}>
                                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ef4444", opacity: 0.8 }} />
                                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
                                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#22c55e", opacity: 0.8 }} />
                                    <div style={{ margin: "0 auto", display: "flex", alignItems: "center", gap: 6, background: "var(--bg-color)", borderRadius: 8, padding: "4px 14px", border: "1px solid var(--card-border)" }}>
                                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: f.color, boxShadow: `0 0 5px ${f.color}`, transition: "background 0.4s, box-shadow 0.4s" }} />
                                        <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.05em" }}>uppcar.io/dashboard</span>
                                    </div>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        {features.map(feat => (
                                            <div key={feat.id} style={{ width: 5, height: 5, borderRadius: "50%", background: activeFeature === feat.id ? feat.color : "var(--text-muted)", opacity: activeFeature === feat.id ? 1 : 0.3, transition: "all 0.3s", cursor: "pointer" }} onClick={() => handleSelect(feat.id)} />
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar nav */}
                                <div style={{ position: "absolute", left: 0, top: 52, bottom: 0, width: isMobile ? 44 : 52, borderRight: "1px solid var(--card-border)", background: "var(--card-bg)", backdropFilter: "blur(10px)", zIndex: 15, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, gap: isMobile ? 8 : 10 }}>
                                    {features.map(feat => (
                                        <div key={feat.id} onClick={() => handleSelect(feat.id)} style={{ width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: activeFeature === feat.id ? `${feat.color}15` : "transparent", color: activeFeature === feat.id ? feat.color : "var(--text-muted)", border: `1px solid ${activeFeature === feat.id ? `${feat.color}35` : "transparent"}`, transition: "all 0.3s" }}>
                                            {React.cloneElement(feat.icon, { width: isMobile ? 18 : 22, height: isMobile ? 18 : 22 })}
                                        </div>
                                    ))}
                                </div>

                                {/* Content area */}
                                <div style={{ position: "absolute", left: isMobile ? 44 : 52, top: 52, right: 0, bottom: 0, zIndex: 5 }}>
                                    <FleetMockup active={activeFeature === 0} selectedLang={selectedLang} isMobile={isMobile} />
                                    <CRMMockup active={activeFeature === 1} selectedLang={selectedLang} isMobile={isMobile} />
                                    <ReservationsMockup active={activeFeature === 2} selectedLang={selectedLang} isMobile={isMobile} />
                                    <AnalyticsMockup active={activeFeature === 3} selectedLang={selectedLang} isMobile={isMobile} />
                                </div>

                            </div>
                        </div>

                        {/* ── Bottom stats strip ── */}
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 24, marginTop: 70 }}>
                            {[
                                { val: t("agencyOS.stats.0.val", "4.2s"), label: t("agencyOS.stats.0.label", "Avg. booking time"), color: "#10b981", icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
                                { val: t("agencyOS.stats.1.val", "99.9%"), label: t("agencyOS.stats.1.label", "Platform uptime"), color: "#3b82f6", icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
                                { val: t("agencyOS.stats.2.val", "38%"), label: t("agencyOS.stats.2.label", "Revenue increase"), color: "#a855f7", icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg> },
                                { val: t("agencyOS.stats.3.val", "1,200+"), label: t("agencyOS.stats.3.label", "Agencies powered"), color: "#f59e0b", icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg> },
                            ].map((s, i) => (
                                <div key={i} style={{ position: "relative", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 24, padding: "30px 24px", minHeight: "180px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", cursor: "pointer", zIndex: 1 }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                                        e.currentTarget.style.background = "var(--bg-color)";
                                        e.currentTarget.style.borderColor = s.color;
                                        e.currentTarget.style.boxShadow = `0 24px 48px ${s.color}25, 0 0 0 1px ${s.color}`;
                                        const glow = e.currentTarget.querySelector('.stat-glow');
                                        if (glow) glow.style.opacity = "0.4";
                                        const icn = e.currentTarget.querySelector('.stat-icon');
                                        if (icn) { icn.style.transform = "scale(1.15) translateY(-4px)"; }
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = "none";
                                        e.currentTarget.style.background = "var(--card-bg)";
                                        e.currentTarget.style.borderColor = "var(--card-border)";
                                        e.currentTarget.style.boxShadow = "none";
                                        const glow = e.currentTarget.querySelector('.stat-glow');
                                        if (glow) glow.style.opacity = "0.2";
                                        const icn = e.currentTarget.querySelector('.stat-icon');
                                        if (icn) { icn.style.transform = "none"; }
                                    }}>
                                    <div className="stat-glow" style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, background: s.color, opacity: 0.2, borderRadius: "50%", filter: "blur(36px)", pointerEvents: "none", transition: "opacity 0.4s ease" }} />
                                    <div className="stat-icon" style={{ display: "flex", justifyContent: "center", marginBottom: 26, color: s.color, transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                                        {s.icon}
                                    </div>
                                    <div style={{ color: "var(--text-main)", fontSize: 30, fontWeight: 900, fontFamily: "'Syne',sans-serif", letterSpacing: -1.5, lineHeight: 1 }}>{s.val}</div>
                                    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 10, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{s.label}</div>

                                </div>
                            ))}
                        </div>

                    </div>
                </section>


                {/* ══ HOW IT WORKS (ANIMATED) ══ */}


                <div id="ecosystem" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", marginTop: 165, scrollMarginTop: 120 }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 30, padding: "6px 16px", animation: "fadeUp 0.6s ease both" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-color)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("ecosystem.badge", "Digital Core")}</span>
                        </div>
                    </div>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(32px,8vw,44px)" : "clamp(48px,5vw,64px)", color: "var(--text-main)", textAlign: "center", marginBottom: 24, letterSpacing: -2, animation: "fadeUp 0.7s 0.2s ease both" }}>
                        {t("ecosystem.titleLeft", "The UppCar")} <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("ecosystem.titleHighlight", "Ecosystem")}</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 16 : 20, color: "var(--text-muted)", textAlign: "center", maxWidth: 680, margin: "0 auto 80px", lineHeight: 1.6, animation: "fadeUp 0.8s 0.3s ease both" }}>
                        {t("ecosystem.subtitle", "A unified platform bridging the gap between drivers seeking the perfect ride and agencies aiming for unparalleled growth.")}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 32, marginBottom: 80 }}>
                        {[
                            { t: t("ecosystem.cards.0.title", "Marketplace for Drivers"), d: t("ecosystem.cards.0.desc", "Stop endlessly searching. Compare live availability, filter by specs, and book instantly. No paperwork, just the open road."), c: "#10b981", i: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg> },
                            { t: t("ecosystem.cards.1.title", "Command Center for Agencies"), d: t("ecosystem.cards.1.desc", "Get a complete SaaS workspace. Manage your fleet, track reservations in real time, and analyze your business performance automatically."), c: "#3b82f6", i: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> },
                            { t: t("ecosystem.cards.2.title", "Data-Driven Growth"), d: t("ecosystem.cards.2.desc", "Leverage real-time analytics to understand your top-performing vehicles, track monthly revenue, and unlock forecasting insights."), c: "#a855f7", i: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg> }
                        ].map((f, i) => (
                            <div key={f.t} style={{ padding: "48px 40px", background: "linear-gradient(180deg, var(--card-bg) 0%, transparent 100%)", border: "1px solid var(--card-border)", borderRadius: 32, boxShadow: "0 20px 40px rgba(0,0,0,0.02)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer", position: "relative", overflow: "hidden", zIndex: 1, display: "flex", flexDirection: "column", animation: `fadeUp 0.8s ${0.4 + i * 0.1}s ease both` }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                                    e.currentTarget.style.boxShadow = `0 30px 60px ${f.c}15`;
                                    e.currentTarget.style.borderColor = `${f.c}50`;
                                    const glow = e.currentTarget.querySelector('.feature-glow');
                                    if (glow) { glow.style.opacity = "0.15"; glow.style.transform = "scale(1.5)"; }
                                    const icon = e.currentTarget.querySelector('.feature-icon');
                                    if (icon) { icon.style.transform = "scale(1.1) translateY(-4px)"; icon.style.background = `${f.c}25`; }
                                    const arrow = e.currentTarget.querySelector('.explore-arrow');
                                    if (arrow) { arrow.style.transform = "translateX(6px)"; }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.02)";
                                    e.currentTarget.style.borderColor = "var(--card-border)";
                                    const glow = e.currentTarget.querySelector('.feature-glow');
                                    if (glow) { glow.style.opacity = "0"; glow.style.transform = "scale(1)"; }
                                    const icon = e.currentTarget.querySelector('.feature-icon');
                                    if (icon) { icon.style.transform = "scale(1) translateY(0)"; icon.style.background = `linear-gradient(135deg, ${f.c}15, transparent)`; }
                                    const arrow = e.currentTarget.querySelector('.explore-arrow');
                                    if (arrow) { arrow.style.transform = "translateX(0)"; }
                                }}>
                                <div className="feature-glow" style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, background: f.c, opacity: 0, borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", transition: "all 0.6s ease" }} />

                                <div className="feature-icon" style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${f.c}15, transparent)`, border: `1px solid ${f.c}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, color: f.c, transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
                                    {f.i}
                                </div>

                                <h3 style={{ position: "relative", zIndex: 1, fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, background: `linear-gradient(90deg, var(--text-main) 30%, ${f.c} 50%, var(--text-main) 100%)`, backgroundSize: "200% auto", animation: "btnGradientMove 4s linear infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 16, letterSpacing: -0.5 }}>{f.t}</h3>
                                <p style={{ position: "relative", zIndex: 1, fontFamily: "'DM Sans',sans-serif", color: "var(--text-muted)", lineHeight: 1.7, fontSize: 16 }}>{f.d}</p>

                                <div style={{ marginTop: "auto", paddingTop: 32, display: "flex", alignItems: "center", gap: 8, color: f.c, fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", textShadow: `0 0 15px ${f.c}40` }}>
                                    {t("ecosystem.explore", "Explore")} <svg className="explore-arrow" style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, marginBottom: 80, animation: "fadeUp 0.8s 0.6s ease both" }}>
                        {[
                            { id: "clients", t: t("ecosystem.comparison.clients.title", "Why Clients Love UppCar"), c: "#10b981", bg: "rgba(16,185,129,0.03)", items: [{ title: t("ecosystem.comparison.clients.items.0.title", "Zero Friction"), desc: t("ecosystem.comparison.clients.items.0.desc", "Compare multiple agencies in one unified interface.") }, { title: t("ecosystem.comparison.clients.items.1.title", "Total Transparency"), desc: t("ecosystem.comparison.clients.items.1.desc", "What you see is what you pay. No surprises at the counter.") }, { title: t("ecosystem.comparison.clients.items.2.title", "Control on the Go"), desc: t("ecosystem.comparison.clients.items.2.desc", "View trips, edit profiles, and manage reservations seamlessly.") }] },
                            { id: "agencies", t: t("ecosystem.comparison.agencies.title", "Why Agencies Choose Us"), c: "#3b82f6", bg: "rgba(59,130,246,0.03)", items: [{ title: t("ecosystem.comparison.agencies.items.0.title", "Centralized Operations"), desc: t("ecosystem.comparison.agencies.items.0.desc", "Ditch manual tracking. Cars, bookings, and clients organized digitally.") }, { title: t("ecosystem.comparison.agencies.items.1.title", "Extended Visibility"), desc: t("ecosystem.comparison.agencies.items.1.desc", "Reach thousands of new customers who are ready to book.") }, { title: t("ecosystem.comparison.agencies.items.2.title", "Unmatched Analytics"), desc: t("ecosystem.comparison.agencies.items.2.desc", "Stop guessing. See your exact city performance and KPIs at a glance.") }] }
                        ].map(box => (
                            <div key={box.id} style={{ background: `linear-gradient(135deg, var(--card-bg) 0%, ${box.bg} 100%)`, border: `1px solid var(--card-border)`, borderRadius: 32, padding: isMobile ? "40px 24px" : 48, position: "relative", overflow: "hidden", transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)", cursor: "pointer", zIndex: 1 }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                                    e.currentTarget.style.borderColor = `${box.c}50`;
                                    e.currentTarget.style.boxShadow = `0 30px 60px ${box.c}15, inset 0 0 0 1px ${box.c}20`;
                                    const glow = e.currentTarget.querySelector(`.${box.id}-glow`);
                                    if (glow) { glow.style.opacity = "0.15"; glow.style.transform = "scale(1.3)"; }
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                                    e.currentTarget.style.borderColor = "var(--card-border)";
                                    e.currentTarget.style.boxShadow = "none";
                                    const glow = e.currentTarget.querySelector(`.${box.id}-glow`);
                                    if (glow) { glow.style.opacity = "0.05"; glow.style.transform = "scale(1)"; }
                                }}>
                                <div className={`${box.id}-glow`} style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: box.c, opacity: 0.05, borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none", transition: "all 0.6s ease" }} />
                                <h3 style={{ position: "relative", zIndex: 1, fontFamily: "'Syne',sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 800, background: `linear-gradient(90deg, var(--text-main) 0%, ${box.c} 50%, var(--text-main) 100%)`, backgroundSize: "200% auto", animation: "btnGradientMove 4s linear infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 40, letterSpacing: -1 }}>{box.t}</h3>
                                <ul style={{ position: "relative", zIndex: 1, listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                                    {box.items.map(b => (
                                        <li key={b.title} style={{ display: "flex", gap: 16 }}>
                                            <div style={{ marginTop: 2, flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: `${box.c}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${box.c}30` }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={box.c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text-main)", marginBottom: 6 }}>{b.title}</div>
                                                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6 }}>{b.desc}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══ PLATFORM ECOSYSTEM ══ */}


                {/* ══ FLEET ══ */}


                {/* ══ CTA ══ */}
                <section style={{ padding: isMobile ? "64px 16px" : "80px 20px", position: "relative", overflow: "hidden", textAlign: "center", Bottom: 120 }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 400 : 700, height: isMobile ? 400 : 700, borderRadius: "50%", border: "1px solid var(--card-border)", animation: "breathe 6s ease-in-out infinite", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 260 : 500, height: isMobile ? 260 : 500, borderRadius: "50%", border: "1px solid var(--card-border)", animation: "breathe 6s ease-in-out infinite 1s", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(circle,var(--accent-color) 0%,transparent 70%)", opacity: 0.07, pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 30, padding: "6px 16px", marginBottom: isMobile ? 24 : 40 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-color)", display: "inline-block", animation: "pulse 2s infinite" }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{t("cta.badge", "Start Today")}</span>
                        </div>
                        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(40px,5.5vw,90px)", color: "var(--text-main)", letterSpacing: -2, lineHeight: 1.05, marginBottom: isMobile ? 20 : 40 }}>
                            <span style={{ whiteSpace: "nowrap", display: "block" }}>{t("cta.h2Line1", "The Road is Yours")}</span>
                            <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>{t("cta.h2Line2", "Reserve Now?")}</span>
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: isMobile ? 15 : 18, lineHeight: 1.7, maxWidth: 520, margin: "0 auto", marginBottom: isMobile ? 32 : 60 }}>
                            {t("cta.subtitle", "Whether you're booking your next weekend getaway or taking your rental business to the next level, UppCar has everything you need.")}
                        </p>
                        <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", padding: isMobile ? "0 8px" : 0 }}>
                            <button className="primary-btnDE" style={{ padding: isMobile ? "16px 24px" : "20px 52px", fontSize: 16 }}>
                                {t("cta.primaryBtn", "My Reservations")}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </button>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="secondary-btn" style={{ padding: isMobile ? "16px 24px" : "20px 40px", fontSize: 16 }}>
                                {t("cta.secondaryBtn", "Browse the Fleet")}
                            </button>
                        </div>
                        <div style={{ display: "flex", gap: isMobile ? 16 : 40, justifyContent: "center", marginTop: isMobile ? 32 : 56, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
                            {t("cta.pills", ["No deposit required", "Free cancellation", "Insured from day one"]).map(txt => (
                                <div key={t} style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    color: "var(--text-muted)", fontSize: 14, fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = isDarkMode ? "#60a5fa" : "#10b981";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = "var(--text-muted)";
                                        e.currentTarget.style.transform = "none";
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {txt}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ FOOTER ══ */}
                <footer ref={footerRef} style={{
                    position: "relative",
                    overflow: "hidden",
                    marginTop: isMobile ? 10 : 55,
                }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--accent-color), transparent)", opacity: 0.5 }} />
                    <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "var(--accent-color)", opacity: 0.8, filter: "blur(4px)" }} />
                    <div style={{
                        padding: isMobile ? "64px 20px 40px" : "88px 40px 40px",
                        background: "linear-gradient(180deg, var(--bg-color) 0%, rgba(16,185,129,0.02) 100%)",
                        position: "relative",
                        zIndex: 1
                    }}>


                        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
                            <div style={{
                                display: "flex", flexWrap: "wrap",
                                gap: isMobile ? 48 : 80,
                                justifyContent: "space-between",
                                marginBottom: isMobile ? 60 : 55,
                                animation: "footerFadeUp 0.8s ease both",
                                flexDirection: isMobile ? "column" : "row",

                            }}>
                                {/* Brand */}
                                <div style={{ maxWidth: isMobile ? "100%" : 350, position: "relative", right: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : 120), left: isMobile ? "auto" : (selectedLang === "AR" ? 120 : "auto") }}>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 30, background: "var(--card-bg)", border: "1px solid var(--card-border)", fontSize: 11, fontWeight: 700, color: "var(--text-main)", marginBottom: 28, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent-color)", display: "inline-block" }} />
                                        {t("footer.hqBadge", "Global Headquarters")}
                                    </div>
                                    <AnimatedLogo />
                                    <p style={{ color: "var(--text-muted)", fontSize: isMobile ? 15 : 16, lineHeight: 1.8, marginTop: 24, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>
                                        {t("footer.tagline", "Redefining mobility for the modern era. Fully digital, seamless, and premium car rental experiences across the globe.")}
                                    </p>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        {[
                                            {
                                                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                                                </svg>,
                                                bg: "#000000",
                                                border: "#000000",
                                                shadow: "rgba(0,0,0,0.4)",
                                                gradient: false,
                                            },
                                            {
                                                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
                                                bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                                                border: "#dc2743",
                                                shadow: "rgba(220,39,67,0.4)",
                                                gradient: true,
                                            },
                                            {
                                                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
                                                bg: "#0A66C2",
                                                border: "#0A66C2",
                                                shadow: "rgba(10,102,194,0.4)",
                                                gradient: false,
                                            },
                                        ].map(({ icon, bg, border, shadow, gradient }, i) => (
                                            <div
                                                key={i}
                                                className="f-social"
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = bg;
                                                    e.currentTarget.style.borderColor = border;
                                                    e.currentTarget.style.color = "#fff";
                                                    e.currentTarget.style.transform = "translateY(-2px) scale(1.1)";
                                                    e.currentTarget.style.boxShadow = `0 12px 28px ${shadow}`;
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = "var(--card-bg)";
                                                    e.currentTarget.style.borderColor = "var(--card-border)";
                                                    e.currentTarget.style.color = "var(--text-main)";
                                                    e.currentTarget.style.transform = "none";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                {icon}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile ? "1fr 1fr" : "auto auto auto",
                                    gap: isMobile ? 40 : 80,
                                    width: isMobile ? "100%" : "auto",
                                    position: "relative",
                                    left: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : 142),
                                    right: isMobile ? "auto" : (selectedLang === "AR" ? 142 : "auto"),
                                }}>
                                    {(selectedLang === "AR" ? AR.footer.columns.map((c, i) => ({ ...c, c: ["#10b981", "#3b82f6", "#a855f7"][i] })) : [
                                        { title: "Platform", c: "#10b981", links: ["App Features", "Pricing & Plans", "Global Locations", "Our Fleet"] },
                                        { title: "Company", c: "#3b82f6", links: ["About Us", "Careers", "Press & Media", "Sustainability"] },
                                        { title: "Resources", c: "#a855f7", links: ["Help Center", "Contact Support", "API Documentation", "System Status"] },
                                    ]).map(({ title, c, links }, ci) => (
                                        <div key={title} className="f-col" style={{ animation: `footerFadeUp 0.8s ${0.1 + ci * 0.1}s ease both`, gridColumn: isMobile && ci === 2 ? "1/-1" : "auto" }}>
                                            <div className="f-col-title" style={{
                                                fontSize: 18,
                                                fontWeight: 800,
                                                paddingBottom: 10,
                                                background: `linear-gradient(90deg, var(--text-main) 0%, ${c} 50%, var(--text-main) 100%)`,
                                                backgroundSize: "200% auto",
                                                animation: "btnGradientMove 4s linear infinite",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em"
                                            }}>{title}</div>
                                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: isMobile ? 16 : 20 }}>
                                                {links.map((link, li) => (
                                                    <li key={link} style={{ animation: `footerFadeUp 0.6s ${0.2 + ci * 0.1 + li * 0.05}s ease both` }}>
                                                        <a href="/" className="f-link" style={{ fontSize: isMobile ? 15 : 16, fontFamily: "'DM Sans', sans-serif" }}>{link}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom bar */}
                            <div style={{
                                borderTop: "1px solid var(--card-border)", paddingTop: isMobile ? 32 : 40,
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between", alignItems: "center",
                                gap: isMobile ? 24 : 0,
                                textAlign: isMobile ? "center" : "left",
                                animation: "footerFadeUp 0.8s 0.5s ease both",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", background: "rgba(34,197,94,0.1)", padding: "6px 14px", borderRadius: 30, border: "1px solid rgba(34,197,94,0.2)", position: "relative", right: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : 132), left: isMobile ? "auto" : (selectedLang === "AR" ? 132 : "auto") }}>
                                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "onlineDot 2s ease-in-out infinite", margin: "0 8px" }} />
                                    <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t("footer.operational", "All Systems Operational")}</span>
                                </div>

                                <div style={{ color: "var(--text-muted)", fontSize: 15, fontFamily: "'DM Sans', sans-serif", position: "relative", left: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : 80), right: isMobile ? "auto" : (selectedLang === "AR" ? 80 : "auto") }}>
                                    &copy; 2026 <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800, margin: "0 5px" }}>UppCar Technologies Inc.</span>&nbsp; {t("footer.rights", "All rights reserved.")}
                                </div>

                                <div style={{ display: "flex", gap: isMobile ? 20 : 32, flexWrap: "wrap", justifyContent: "center", position: "relative", left: isMobile ? "auto" : (selectedLang === "AR" ? "auto" : 139), right: isMobile ? "auto" : (selectedLang === "AR" ? 139 : "auto") }}>
                                    {t("footer.legalLinks", ["Privacy Policy", "Terms of Service", "Cookie Settings"]).map(l => (
                                        <a key={l} href="/" className="f-bottom-link" style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{l}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Mobile bottom nav */}


            </div>

            {/* Scroll to top */}
            <div style={{
                position: "fixed",
                bottom: isMobile ? 24 : 40,
                right: isMobile ? 16 : 40,
                zIndex: 1000,
                opacity: showScrollButton ? 1 : 0,
                visibility: showScrollButton ? "visible" : "hidden",
                transition: "opacity 0.4s ease,visibility 0.4s ease",
                pointerEvents: showScrollButton ? "auto" : "none",
            }}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
                    width: isMobile ? 46 : 55, height: isMobile ? 46 : 55,
                    borderRadius: "14px",
                    background: isDarkMode
                        ? "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 90%)"
                        : "linear-gradient(135deg,#059669 0%,#10b981 50%,#34d399 90%)",
                    border: "none", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: isDarkMode ? "0 8px 24px rgba(37,99,235,0.4)" : "0 8px 24px rgba(16,185,129,0.4)",
                    transition: "transform 0.2s,box-shadow 0.2s",
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                    </svg>
                </button>
            </div>

            {/* ══ SEARCH OVERLAY ══ */}
            {showSearchOverlay && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    background: isDarkMode
                        ? "rgba(10, 10, 15, 0.5)"
                        : "rgba(216, 240, 223, 0.5)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0,
                    animation: "fadeUp 0.4s ease both",
                }}>
                    {/* Texte principal */}
                    <div style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: isMobile ? 39 : 74,
                        fontWeight: 900,
                        letterSpacing: -3,
                        marginBottom: 32,
                        textAlign: "center",
                        lineHeight: 1.1,
                        background: isDarkMode
                            ? "linear-gradient(to right, #e6edf3 20%, #60a5fa 50%, #e6edf3 80%)"
                            : "linear-gradient(to right, #064e3b 20%, #10b981 50%, #064e3b 80%)",
                        backgroundSize: "200% auto",
                        color: isDarkMode ? "#e6edf3" : "#064e3b",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "shimmerText 2.5s linear infinite"
                    }}>
                        {selectedLang === "AR" ? "جارٍ البحث" : selectedLang === "FR" ? "Recherche en Cours" : "Searching"}
                    </div>

                    {/* Requête affichée */}
                    {aiValue && (
                        <div style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 16 : 22,
                            color: isDarkMode ? "rgba(255,255,255,0.55)" : "rgba(6,78,59,0.6)",
                            marginBottom: 52,
                            maxWidth: 600,
                            textAlign: "center",
                            padding: "0 20px",
                            fontStyle: "italic",
                        }}>
                            « {aiValue} »
                        </div>
                    )}

                    {/* Trois points animés */}
                    <div style={{
                        display: "flex",
                        gap: 20,
                        alignItems: "center",
                        marginTop: aiValue ? 0 : 52,
                    }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{
                                width: 29,
                                height: 29,
                                borderRadius: "50%",
                                background: isDarkMode ? "#60a5fa" : "#10b981",
                                animationName: "bounceDot",
                                animationDuration: "1.1s",
                                animationTimingFunction: "ease-in-out",
                                animationIterationCount: "infinite",
                                animationDelay: `${i * 0.2}s`,
                            }} />
                        ))}
                    </div>

                    <style>{`
                        @keyframes bounceDot {
                            0%   { transform: translateY(0px);   opacity: 0.35; }
                            50%  { transform: translateY(-28px); opacity: 1;    }
                            100% { transform: translateY(0px);   opacity: 0.35; }
                        }
                        @keyframes shimmerText {
                            0%   { background-position: -200% center; }
                            100% { background-position: 200% center; }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}
