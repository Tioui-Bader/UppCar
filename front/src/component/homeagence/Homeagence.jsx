import React, { useState, useEffect, useRef, useMemo } from "react";
import { translations } from './i18n';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
/* ─────────────────────────────── CSS ─────────────────────────────── */
const css = `

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#f8fafc;--surface:#ffffff;--surface2:#f1f5f9;
  --border:rgba(0, 0, 0, 0.05);--border2:#cbd5e1;
  --text:#1e293b;--muted:#10b981;--muted2:#64748b;
  --accent:#10b981;--accent2:#059669;
  --red:#ef4444;--amber:#f59e0b;--blue:#3b82f6;--purple:#a855f7;
  --emerald:#10b981;
  --card:rgba(255, 255, 255, 0.82);
  --grad:linear-gradient(135deg,#059669 0%,#0faa36b9 50%,#197553ff 100%);
  --sidebar-w:272px;
  --inpBg:#ffffff; --inpFocus:#ffffff;
  --text-main: #064e3b;
  --accent-color: #10b981;
  --modal-bg:rgba(255, 255, 255, 0.5);
}
[data-theme=dark]{
  --bg:rgb(10,10,15);--surface:#18181b;--surface2:#27272a;
  --border:#3f3f46;--border2:#52525b;
  --text:#f4f4f5;--muted:#818cf8;--muted2:#a1a1aa;
  --accent:#818cf8;--accent2:#6366f1;
  --card:#18181b;
  --grad:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);
  --inpBg:#18181b; --inpFocus:#18181b;
  --text-main: #e6edf3;
  --accent-color: #60a5fa;
    --modal-bg:rgba(0,0,0,0.5);
}
body{font-family:'Inter', 'DM Sans', sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;transition:background .2s ease,color .2s;margin:0;}
[data-theme=dark] body::before{content:'';}

/* ── BASE DARK/LIGHT BACKGROUND ── */
.home-base-bg {
  position: fixed;
  inset: 0;
  z-index: -10;
  background: var(--bg);
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

/* LAYOUT */
.app{display:flex;min-height:100vh;overflow-x:hidden;}

/* SIDEBAR MINI — icônes seules, expansion au hover */
:root{ --sidebar-mini:68px; }
.sidebar{width:var(--sidebar-mini);min-height:100vh;position:fixed;top:0;inset-inline-start:0;z-index:100;
  background:rgba(255,255,255,0.4);border-inline-end:1px solid var(--border);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  display:flex;flex-direction:column;overflow:hidden;
  transition:width .35s cubic-bezier(.16,1,.3,1),box-shadow .35s,background .3s;}
.sidebar:hover{width:var(--sidebar-w);box-shadow:none;}

.sidebar-logo{padding:16px 14px;display:flex;align-items:center;gap:12px;}
.logo-mark{width:38px;height:38px;border-radius:11px;background:var(--text);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;flex-shrink:0;}
.logo-spin{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent 0%,rgba(255,255,255,.35) 30%,transparent 40%);animation:spin 3s linear infinite;}
.logo-inner{position:absolute;inset:3px;background:rgba(255,255,255,0.12);border-radius:8px;z-index:1;}
.logo-icon{z-index:2;}
.logo-text{display:flex;flex-direction:column;font-family:'Syne',sans-serif;font-weight:900;font-size:24px;letter-spacing:-.5px;white-space:nowrap;opacity:0;transition:opacity .15s ease, transform .3s ease;transform:translateY(6px);}
.sidebar:hover .logo-text{opacity:1;transform:translateY(0);transition:opacity .25s ease .12s, transform .45s cubic-bezier(.34,1.56,.64,1) .1s;}
.logo-subtitle{font-family:'Syne',sans-serif;font-size:12.5px;font-weight:800;background:linear-gradient(90deg, #6366f1, #0ea5e9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;opacity:0;transform:translateY(12px);transition:all .45s cubic-bezier(.34,1.56,.64,1);margin-top:-0.6px;letter-spacing:-.02em;}
.sidebar:hover .logo-subtitle{opacity:1;transform:translateY(0);transition:all .5s cubic-bezier(.34,1.56,.64,1) .25s;}
@keyframes bounceUp{0%{opacity:0;transform:translateY(20px);}60%{opacity:1;transform:translateY(-2px);}100%{opacity:1;transform:translateY(0);}}
.logo-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--accent);animation:blink 2s infinite;margin-inline-start:2px;position:relative;top:-6px;}

.sidebar{position:fixed;top:0;inset-inline-start:0;bottom:0;width:var(--sidebar-mini);background:var(--card);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-inline-end:1px solid var(--border);transition:all .45s cubic-bezier(.16,1,.3,1);z-index:100;overflow-x:hidden;display:flex;flex-direction:column;box-shadow:4px 0 24px rgba(0,0,0,0.02);}
.nav-section{padding:10px 8px;flex:1;overflow-y:auto;overflow-x:hidden;}
.nav-label{font-size:10px;font-weight:900;letter-spacing:.15em;text-transform:uppercase;color:var(--muted2);padding:18px 0 8px;display:flex;justify-content:center;align-items:center;transition:all .3s ease;min-height:36px;white-space:nowrap;}
.nav-label-full{display:none;opacity:0;}
.sidebar:hover .nav-label{padding:14px 12px 6px;justify-content:flex-start;}
.sidebar:hover .nav-label-full{display:block;opacity:1;transition:opacity .25s ease .12s;}
.sidebar:hover .nav-label-mini{display:none;opacity:0;}
.nav-item{display:flex;align-items:center;gap:0;padding:15px 14px;border-radius:14px;border:1px solid transparent;cursor:pointer;transition:all .25s cubic-bezier(.4,0,.2,1);color:var(--muted2);font-size:14px;font-weight:600;position:relative;margin-bottom:8px;white-space:nowrap;}
.nav-item:hover{background:rgba(16, 185, 129, 0.05);color:var(--accent);}
@keyframes activeItemGlow {
  0% { border-color: rgba(99, 102, 241, 0.4); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1); }
  50% { border-color: rgba(168, 85, 247, 0.8); box-shadow: 0 4px 20px rgba(168, 85, 247, 0.25); }
  100% { border-color: rgba(99, 102, 241, 0.4); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1); }
}
.nav-item.active{background:rgba(99, 102, 241, 0.08);color:var(--icon-color);border:1px solid rgba(99,102,241,0.5);}
[data-theme=dark] .nav-item.active{background:rgba(99, 102, 241, 0.15);color:var(--icon-color);border:2.3px solid rgba(99,102,241,0.5);}
[data-theme=dark] .sidebar{background:rgba(15, 15, 20, 0.7) !important;border-inline-end:1px solid rgba(255,255,255,0.06);}
.nav-item-label{opacity:0;max-width:0;overflow:hidden;transition:opacity .15s ease,max-width .35s ease,margin-inline-start .35s ease;margin-inline-start:0;font-size:15px;}
.sidebar:hover .nav-item-label{opacity:1;max-width:160px;margin-inline-start:10px;transition:opacity .25s ease .1s,max-width .35s ease,margin-inline-start .35s ease;}
.nav-item .badge{margin-inline-start:auto;background:var(--red);color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:20px;animation:badgePulse 2s ease-in-out infinite;opacity:0;transition:opacity .15s ease;flex-shrink:0;}
.sidebar:hover .nav-item .badge{opacity:1;transition:opacity .25s ease .12s;}
.nav-icon{width:20px;height:20px;flex-shrink:0;transition:filter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);animation:iconColorPulse 3.5s ease-in-out infinite;}
.nav-item:nth-child(2) .nav-icon{animation-delay:0.4s;}
.nav-item:nth-child(3) .nav-icon{animation-delay:0.8s;}
.nav-item:nth-child(4) .nav-icon{animation-delay:1.2s;}
.nav-item:nth-child(5) .nav-icon{animation-delay:1.6s;}
.nav-item:nth-child(6) .nav-icon{animation-delay:2.0s;}
.nav-item:nth-child(7) .nav-icon{animation-delay:2.4s;}
.nav-item:nth-child(8) .nav-icon{animation-delay:2.8s;}
.nav-item:hover .nav-icon{animation:none;transform:scale(1.2) rotate(5deg);filter:drop-shadow(0 0 6px var(--icon-color));}
.nav-item.active .nav-icon{animation:iconGlowPulse 2.5s ease-in-out infinite !important;}
@keyframes iconColorPulse{0%,100%{opacity:0.7;}50%{opacity:1;filter:drop-shadow(0 0 3px var(--icon-color));}}
@keyframes iconGlowPulse{0%,100%{filter:drop-shadow(0 0 2px var(--icon-color));opacity:0.9;}50%{filter:drop-shadow(0 0 5px var(--icon-color));opacity:1;}}
.active-bar{position:absolute;inset-inline-start:0;top:50%;transform:translateY(-50%);width:3.5px;height:60%;background:var(--icon-color);border-radius:0 4px 4px 0;box-shadow:0 0 10px var(--icon-color);}

.sidebar-bottom{padding:12px 8px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:8px;align-items:center;}
.user-pill{display:flex;align-items:center;gap:0;padding:7px 6.5px;border-radius:14px;background:rgba(99,102,241,0.06);border:1px solid var(--accent);cursor:pointer;transition:all .3s;overflow:hidden;width:100%;}
.user-pill:hover{border-color:var(--accent);}
.user-avatar{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:#fff;flex-shrink:0;box-shadow:0 3px 10px rgba(99,102,241,0.3);}
.user-info{opacity:0;max-width:0;overflow:hidden;transition:opacity .15s ease,max-width .35s ease,margin-inline-start .35s ease;margin-inline-start:0;flex:1;min-width:0;}
.sidebar:hover .user-info{opacity:1;max-width:160px;margin-inline-start:10px;transition:opacity .25s ease .1s,max-width .35s ease,margin-inline-start .35s ease;}
.user-name{font-size:13px;font-weight:700;color:var(--text);white-space:nowrap;}
.user-role{font-size:11px;color:var(--muted2);white-space:nowrap;}
.online-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:pulse 2s infinite;box-shadow:0 0 6px #22c55e;opacity:0;transition:opacity .15s ease;margin-inline-start:auto;}
.sidebar:hover .online-dot{opacity:1;transition:opacity .25s ease .12s;}

/* MAIN — se pousse quand la sidebar s'élargit au hover */
.main{margin-inline-start:var(--sidebar-mini);flex:1;min-height:100vh;display:flex;flex-direction:column;transition:margin-inline-start .38s cubic-bezier(.16,1,.3,1);overflow-x:hidden;}
.app:has(.sidebar:hover) .main{margin-inline-start:var(--sidebar-w);}
@media(max-width:900px){
  .main{margin-left:0 !important;margin-inline-start:0 !important;overflow-x:hidden !important;}
  .app:has(.sidebar:hover) .main{margin-inline-start:0 !important;}
}

/* Ensure sidebar sits on the correct edge using logical property */
.sidebar{inset-inline-start:0;}

/* TOPBAR */
.topbar{position:sticky;top:0;z-index:50;background:transparent !important;border-bottom:none !important;padding:0 36px;height:83.5px;display:flex;align-items:center;gap:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}
[data-theme=dark] .topbar{background:transparent !important;border-bottom:none !important;}
.topbar-title{font-weight:800;font-size:24px;letter-spacing:-.4px;color:var(--text);display:flex;align-items:center;gap:10px;} 
.topbar-title svg{color:#6366f1;filter: drop-shadow(0 0 8px rgba(99,102,241,0.3));}
.topbar-badge{font-size:10.5px;font-weight:700;padding:4px 12px;border-radius:20px;background:var(--surface2);color:var(--accent);border:1px solid var(--border);letter-spacing:.06em;}
.mobile-logo-wrap{display:none !important;}
/* THE MIDNIGHT AURORA - ELITE EDITION */
.user-avatar-modern{
  width:43px;height:43px;
  border-radius:14px;
background: linear-gradient(135deg, rgb(5, 150, 105), rgb(25, 117, 83));
  background-size: 200% 200%;
  display:flex;align-items:center;justify-content:center;
  font-family:'Syne',sans-serif;font-weight:900;font-size:14px;color:#fff;
  cursor:pointer;
  position:relative;overflow:hidden;
  transition:all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 0 1px rgba(5,150,105,0.3), 0 4px 15px rgba(5,150,105,0.3), 0 0 40px rgba(52,211,153,0.15);
  animation: btnGradientMove 4s ease infinite;
}
.user-avatar-modern::after {
  content: '';
  position: absolute;
  top: 0;
  left: -110%;
  width: 80%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: skewX(-20deg);
  animation: shineSweep 4s infinite;
}
[data-theme=dark] .user-avatar-modern{
  background: linear-gradient(135deg, #492886ff 0%, #4338ca 50%, #06b6d4 100%);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 4px 15px rgba(0,0,0,0.3);
  animation: auroraShift 6s ease infinite alternates;
}
[data-theme=dark] .user-avatar-modern::after { display: none; }
.user-avatar-modern:hover{transform:scale(1.1) rotate(3deg);box-shadow:0 8px 30px rgba(5,150,105,0.4);}
[data-theme=dark] .user-avatar-modern:hover{box-shadow:0 8px 30px rgba(99,102,241,0.4);}

.avatar-anim-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  will-change: transform;
}

.btn-premium-shine {
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.btn-premium-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -110%;
  width: 80%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: skewX(-20deg);
  animation: shineSweep 4s infinite;
}
.btn-premium-shine:hover {
  transform: translateY(-3px) scale(1.02);
  filter: brightness(1.1);
}

@keyframes ultimateFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

@keyframes auroraShift {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

.user-avatar-modern::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%);
  transform: translateX(-100%);
  animation: eliteShine 3s infinite;
}

@keyframes eliteShine {
  0% { transform: translateX(-110%) skewX(-20deg); }
  100% { transform: translateX(110%) skewX(-20deg); }
}

.user-avatar-modern:hover{
  transform: translateY(-5px) scale(1);
  border-color: rgba(255, 255, 255, 0.5);
}


.topbar-user-pill{display:flex;align-items:center;gap:10px;padding:6px 14px 6px 8px;background:var(--grad);border-radius:40px;color:#fff;cursor:pointer;transition:all .4s cubic-bezier(.175, .885, .32, 1.275);box-shadow:0 10px 20px rgba(99,102,241,0.25);position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.15);}
.topbar-user-pill:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 15px 30px rgba(99,102,241,0.45);filter:brightness(1.1);}
.topbar-user-pill::after{content:'';position:absolute;top:-50%;left:-100%;width:50%;height:200%;background:linear-gradient(to right,transparent,rgba(255,255,255,0.3),transparent);transform:rotate(25deg);animation:shineSweep 5s infinite;pointer-events:none;}
.topbar-user-initials{width:30px;height:30px;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;letter-spacing:0.05em;border:1px solid rgba(255,255,255,0.3);}
.topbar-user-status{font-size:10px;font-weight:800;letter-spacing:0.1em;opacity:0.9;text-transform:uppercase;display:flex;align-items:center;gap:6px;}
.status-dot-mini{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80;animation:pulse 2s infinite;}
.topbar-actions{margin-inline-start:auto;display:flex;align-items:center;gap:14px;}
.icon-btn{width:40px;height:40px;border-radius:46%;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--muted2);transition:all .2s ease;}
.icon-btn:hover{background:var(--surface2);color:var(--text);border-color:var(--border2);}
.notif-btn{position:relative;}
.notif-dot{position:absolute;top:7px;inset-inline-end:7px;width:7px;height:7px;border-radius:50%;background:var(--red);border:1.5px solid var(--surface);}

/* CONTENT */
.content{padding:28px 32px;flex:1;}

/* CARDS */
.card{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:all .2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);}
.card:hover{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);}
[data-theme=dark] .card:hover{box-shadow:0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.25);}

/* STAT CARDS */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px;}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:32px;position:relative;overflow:hidden;cursor:pointer;transition:all .3s ease;box-shadow:0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);}
.stat-card:hover{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); transform:translateY(-2px);}
.stat-card-lg{background:var(--card);border:1px solid var(--border);border-radius:24px;padding:32px;display:flex;flex-direction:column;justify-content:center;transition:all .4s cubic-bezier(.16,1,.3,1);box-shadow:0 8px 30px rgba(0,0,0,0.04);position:relative;overflow:hidden;min-height:180px;}
.stat-card-lg:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 30px 60px rgba(0,0,0,0.12);border-color:var(--accent);}
.stat-card-lg .stat-value{font-size:30px;background:linear-gradient(to bottom, var(--text), var(--muted));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-2px;margin:8px 0;}
.stat-label{font-size:14px;font-weight:700;color:var(--muted2);margin-bottom:12px;}
.stat-value{font-size:30px;font-weight:800;letter-spacing:-1.5px;line-height:1;}
.stat-change{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;margin-top:14px;padding:4px 10px;border-radius:20px;border:1px solid currentColor;text-transform:uppercase;letter-spacing:0.05em;transition:all .3s ease;}
.stat-change.up{color:var(--emerald);background:rgba(16,185,129,.1);animation:pulse-emerald 2s infinite;}
.stat-change.down{color:var(--red);background:rgba(239,68,68,.1);animation:pulse-red 2s infinite;}
@keyframes pulse-emerald{0%{box-shadow:0 0 0 0 rgba(16,185,129,.4);}70%{box-shadow:0 0 0 6px rgba(16,185,129,0);}100%{box-shadow:0 0 0 0 rgba(16,185,129,0);}}
@keyframes pulse-red{0%{box-shadow:0 0 0 0 rgba(239,68,68,.4);}70%{box-shadow:0 0 0 6px rgba(239,68,68,0);}100%{box-shadow:0 0 0 0 rgba(239,68,68,0);}}

/* SECTION HEADERS */
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
.section-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:900;letter-spacing:-.4px;position:relative;display:inline-block;}
.section-title-line{position:absolute;bottom:-6px;left:0;width:40px;height:3px;background:var(--grad);border-radius:2px;}
.section-pill{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--muted2);background:var(--surface2);border:1px solid var(--border);padding:5px 12px;border-radius:20px;cursor:pointer;transition:all .25s;}
.section-pill:hover{border-color:var(--accent);color:var(--accent);}
.logout-btn{background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:center;gap:0;cursor:pointer;transition:all .4s cubic-bezier(.16,1,.3,1);color:#ef4444 !important;margin:0 !important;overflow:hidden;width:44px;max-width:44px;height:44px;box-shadow:0 0 12px rgba(239,68,68,0.1);align-self:center;}
.sidebar:hover .logout-btn{padding:12px 18px;justify-content:flex-start;gap:12px;width:calc(100% - 0px);max-width:calc(100% - 0px);height:44px;margin:0 !important;}
.logout-btn:hover{background:rgba(239,68,68,0.18) !important;transform:translateY(-2px);box-shadow:0 4px 15px rgba(239,68,68,0.25) !important;}
.logout-btn .nav-icon{color:#ef4444;transition:all .3s;min-width:20px;width:20px;height:20px;}
.logout-btn:hover .nav-icon{transform:scale(1.1) rotate(5deg);}

/* GRID LAYOUTS */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;}
.grid-3{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;}
.grid-revenue{display:grid;grid-template-columns:1.8fr 1fr;gap:24px;margin-bottom:32px;}

/* TABLE */
.table-wrap{overflow-x:auto;}
table{width:100%;border-collapse:collapse;}
th{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted2);padding:10px 16px;text-align:start;border-bottom:1px solid var(--border);}
td{padding:13px 16px;font-size:14px;border-bottom:1px solid var(--border);vertical-align:middle;transition:background .15s;}
tr:hover td{background:var(--surface2);}
tr:last-child td{border-bottom:none;}
.car-cell{display:flex;align-items:center;gap:12px;}
.car-thumb{width:44px;height:32px;border-radius:8px;object-fit:cover;background:linear-gradient(135deg,var(--accent),var(--blue));display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.car-name{font-weight:700;font-size:14px;}
.car-plate{font-size:11px;color:var(--muted2);font-family:'DM Sans',monospace;}

/* STATUS BADGES */
.badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;padding:4px 10px;border-radius:8px;}
.badge.available{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.2);}
.badge.rented{background:rgba(59,130,246,.12);color:#3b82f6;border:1px solid rgba(59,130,246,.2);}
.badge.maintenance{background:rgba(245,158,11,.12);color:#f59e0b;border:1px solid rgba(245,158,11,.2);}
.badge.reserved{background:rgba(168,85,247,.12);color:#a855f7;border:1px solid rgba(168,85,247,.2);}
.badge.confirmed{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.2);}
.badge.pending{background:rgba(245,158,11,.12);color:#f59e0b;border:1px solid rgba(245,158,11,.2);}
.badge.cancelled{background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.2);}
.badge-dot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pulse 2s infinite;}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:15px 20px;border-radius:19px;font-family:'Syne',sans-serif;font-size:18px;font-weight:800;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);border:none;letter-spacing:.02em;}
.btn-primary{background:var(--text);color:var(--bg);}
.btn-primary:hover{background:var(--grad);color:#fff;transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.15);}
.btn-ghost{background:transparent;color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{background:rgba(99,102,241,0.08);border-color:var(--accent);color:var(--accent);}
.btn-danger{background:rgba(239,68,68,.08);color:#ef4444;border:1px solid rgba(239,68,68,.18);}
.btn-danger:hover{background:#ef4444;color:#fff;transform:translateY(-1px);box-shadow:0 6px 16px rgba(239,68,68,.35);}
.btn-accent{background:var(--accent);color:#fff;border-radius:10px;border:1px solid transparent;box-shadow:0 1px 2px rgba(0,0,0,0.1);transition:all .2s;}
.btn-accent:hover{background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);}
.btn-sm{padding:6px 14px;font-size:11.5px;border-radius:8px;}
.btn-icon{width:36px;height:36px;padding:0;border-radius:8px;}

/* FORM ELEMENTS */
.form-group{margin-bottom:20px;}
.form-label{font-size:12px;font-weight:600;color:var(--text);margin-bottom:8px;display:block;}
.form-input{width:100%;height:48px;background:var(--inpBg);border:1px solid var(--accent);border-radius:12px;padding:0 16px;font-size:14px;color:var(--text);outline:none;box-shadow:0 1px 2px rgba(0,0,0,0.05);transition:all .25s cubic-bezier(0.4, 0, 0.2, 1);}
.form-input:focus, .form-select:focus{border-color:var(--accent);box-shadow:0 0 0 4px rgba(99, 102, 241, 0.15);background:var(--inpFocus);transform:translateY(-1px);}
.form-input::placeholder{color:var(--muted2);}
.form-select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}

/* MODAL */
.modal-overlay{position:fixed;inset:0;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:1000;display:flex;justify-content:center;overflow-y:auto;animation:fadeIn .2s ease;padding: 40px 10px;}
.modal{margin:auto;background:var(--card);border:1px solid var(--border);border-radius:24px;padding:32px;width:100%;max-width:600px;animation:slideUp .3s cubic-bezier(.16,1,.3,1);position:relative;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);transition: all 0.3s ease;position: relative;bottom: 3px;}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;transition:margin .3s;}
@media(max-width:900px){ .modal-header{margin-bottom:14px !important;} }
.modal-title{font-family:'Syne',sans-serif;font-size:24px;font-weight:900;letter-spacing:-.6px;}
.modal-subtitle{font-size:13px;color:var(--muted2);margin-top:4px;}
.modal-close{width:36px;height:36px;border-radius:11px;background:var(--surface2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);transition:all .25s;}
.modal-close:hover{background:var(--red);color:#fff;border-color:var(--red);transform:rotate(90deg);}

/* PHOTO UPLOAD */
.photo-upload-zone{border:2px dashed var(--accent);border-radius:18px;padding:32px 20px;text-align:center;cursor:pointer;transition:all .3s;background:rgba(99,102,241,0.06);position:relative;overflow:hidden;}
[data-theme=light] .photo-upload-zone{border:2.5px dashed #0faa36b9;background:linear-gradient(135deg,rgba(5,150,105,0.05) 0%,rgba(15,170,54,0.08) 50%,rgba(25,117,83,0.05) 100%);box-shadow:inset 0 0 20px rgba(16,185,129,0.03);}
.photo-upload-zone:hover,.photo-upload-zone.drag-over{border:2px dashed var(--accent);background:rgba(16,185,129,0.08);transform:scale(1.02);box-shadow:0 10px 25px rgba(16,185,129,0.3) !important;}
[data-theme=light] .photo-upload-zone:hover{border-color:#10b981;box-shadow:0 10px 25px rgba(16,185,129,0.4) !important;}
[data-theme=dark] .photo-upload-zone:hover{background:rgba(99,102,241,0.12);box-shadow:0 10px 25px rgba(99,102,241,0.25) !important;}
.photo-upload-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;}
.upload-icon-wrap{width:60px;height:60px;border-radius:18px;background:var(--grad);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;box-shadow:0 8px 24px rgba(16, 185, 129, 0.3);}
[data-theme=light] .upload-icon-wrap{background:linear-gradient(135deg,#059669 0%,#0faa36b9 50%,#197553ff 100%);box-shadow:0 8px 24px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.25);}
[data-theme=dark] .upload-icon-wrap{box-shadow:0 8px 24px rgba(99,102,241,0.4);}
.photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px;}
.photo-thumb-wrap{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;background:var(--surface2);border:1px solid var(--border);}
.photo-thumb-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .3s;}
.photo-thumb-wrap:hover img{transform:scale(1.05);}
.photo-thumb-del{position:absolute;top:5px;right:5px;width:24px;height:24px;border-radius:8px;background:rgba(239,68,68,0.85);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;font-weight:700;transition:all .2s;border:none;backdrop-filter:blur(4px);}
.photo-thumb-del:hover{background:#ef4444;transform:scale(1.1);}
.photo-main-badge{position:absolute;bottom:5px;left:5px;font-size:9px;font-weight:800;background:var(--grad);color:#fff;padding:2px 8px;border-radius:6px;letter-spacing:.05em;}

/* CHART BARS */
.chart-wrap{padding:20px 24px;}
.bar-group{display:flex;align-items:flex-end;gap:8px;height:160px;margin-bottom:8px;}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;}
.bar{width:100%;border-radius:8px 8px 0 0;transition:height 1s cubic-bezier(.16,1,.3,1);min-height:4px;position:relative;cursor:pointer;}
.bar:hover{filter:brightness(1.15);}
.bar-label{font-size:10px;color:var(--muted2);font-weight:600;}
.bar-val{font-size:10px;font-weight:800;color:var(--muted);}

/* MINI CHARTS */
.sparkline{height:50px;position:relative;}

/* RESERVATION CARD */
.resv-card{background:var(--surface2);border:1px solid var(--border);border-radius:16px;padding:16px;transition:all .3s;cursor:pointer;}
.resv-card:hover{border-color:var(--accent);transform:translateX(4px);}

/* CLIENT ROW */
.client-row{display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid var(--border);transition:background .2s;cursor:pointer;}
.client-row:hover{background:var(--surface2);}
.client-row:last-child{border-bottom:none;}
.client-avatar{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;flex-shrink:0;}

/* SETTINGS */
.settings-section{background:var(--card);border:1px solid var(--border);border-radius:16px;margin-bottom:24px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);}
.settings-section-header{padding:16px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--surface2);}
.settings-row{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid var(--border);}
.settings-row:hover{background:var(--surface2);}
.settings-row:last-child{border-bottom:none;}
.toggle{width:44px;height:24px;border-radius:12px;position:relative;cursor:pointer;transition:all .2s ease;background:var(--border2);}
.toggle.on{background:var(--emerald);}
.toggle.off{opacity:1;}
.toggle-thumb{position:absolute;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:all .2s ease;box-shadow:0 1px 2px rgba(0,0,0,.15);}
.toggle.on .toggle-thumb{left:22px;}
.toggle.off .toggle-thumb{left:2px;}

/* ANIMATIONS */
@keyframes spin{100%{transform:rotate(360deg);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.85);}}
@keyframes badgePulse{0%,100%{box-shadow:0 0 0 0 currentColor;}50%{box-shadow:0 0 0 4px transparent;}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideUp{from{opacity:0;transform:translateY(28px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes shineSweep{0%{left:-100%;}60%{left:150%;}100%{left:150%;}}
@keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes growBar{from{height:0;}to{height:var(--h);}}
@keyframes scanline{0%{transform:translateY(-100%);}100%{transform:translateY(400%);}}
@keyframes floatUp{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.2);}50%{box-shadow:0 0 40px rgba(99,102,241,0.45);}}
@keyframes cardEntrance{from{opacity:0;transform:translateY(24px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes rowEntrance{from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);}}
@keyframes shineSweep{0%{left:-100%;}60%{left:150%;}100%{left:150%;}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 15px rgba(99,102,241,0.2);}50%{box-shadow:0 0 25px rgba(99,102,241,0.4);}}
@keyframes textGlow{0%,100%{filter:drop-shadow(0 0 4px currentColor);opacity:0.9;}50%{filter:drop-shadow(0 0 12px currentColor);opacity:1;}}
@keyframes shineSweep{0%{left:-100%;}20%{left:150%;}100%{left:150%;}}
@keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes floatLift{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}
@keyframes spinSlow{from{transform:rotate(0deg);}to{transform:rotate(90deg);}}

.page>*{animation:cardEntrance .6s cubic-bezier(.16,1,.3,1) both;}
.table-row-animate{animation:rowEntrance 0.5s cubic-bezier(0.16,1,0.3,1) both;}
.text-animate-glow{animation:textGlow 3s ease-in-out infinite;}

.header-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:10px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;background:linear-gradient(to bottom, var(--surface2), var(--surface));border:1px solid var(--border);transition:all .3s cubic-bezier(.4, 0, .2, 1);box-shadow:0 2px 4px rgba(0,0,0,0.05);white-space:nowrap;}
.header-badge:hover{transform:translateY(-2px);box-shadow:0 6px 12px rgba(0,0,0,0.18);background:var(--surface2);border-color:currentColor;}

.invoice-header-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:12px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);border:1px solid var(--border);transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,0.1);white-space:nowrap;border-top-width:3px;}
.invoice-header-badge:hover{transform:translateY(-3px);background:rgba(255,255,255,0.08);box-shadow:0 8px 24px rgba(0,0,0,0.2);}

.btn-ultra{position:relative;overflow:hidden;animation:floatLift 3s ease-in-out infinite;transition:all .3s cubic-bezier(.34,1.56,.64,1);cursor:pointer;z-index:1;border:none;}
.btn-ultra::after{content:'';position:absolute;top:-50%;left:-100%;width:50%;height:200%;background:linear-gradient(to right,transparent,rgba(255,255,255,.3),transparent);transform:rotate(25deg);animation:shineSweep 4s cubic-bezier(.4, 0, .2, 1) infinite;pointer-events:none;}
.btn-ultra:hover{transform:scale(1.05) translateY(-6px);box-shadow:0 15px 35px rgba(16, 185, 129, 0.45) !important;}
[data-theme=dark] .btn-ultra:hover{box-shadow:0 15px 35px rgba(99, 102, 241, .4) !important;}
.btn-ultra:active{transform:scale(.96);}
.btn-ultra:hover svg{animation:spinSlow .3s ease-out forwards;stroke-width:3;}

/* SCROLLBAR */
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:var(--muted2);}

/* RESPONSIVE */
@media(max-width:900px){
  /* Keep width transition (hover expand) + add transform transition (slide in/out) */
  .sidebar{transform:translateX(-100%);transition:width .35s cubic-bezier(.16,1,.3,1), box-shadow .35s, background .3s, transform .35s cubic-bezier(.16,1,.3,1);}
  .sidebar.open{
    transform:translateX(0);
    width:var(--sidebar-w) !important;
    background: var(--card) !important;
    box-shadow:10px 0 50px rgba(0,0,0,0.15);
  }
  .sidebar.open .logo-text, .sidebar.open .logo-subtitle { opacity:1; transform:translateY(0); transition:opacity .25s ease .12s, transform .45s cubic-bezier(.34,1.56,.64,1) .1s; }
  .sidebar.open .nav-label { padding:14px 12px 6px; justify-content:flex-start; }
  .sidebar.open .nav-label-full { display:block; opacity:1; transition:opacity .25s ease .12s; }
  .sidebar.open .nav-label-mini { display:none; opacity:0; }
  .sidebar.open .nav-item-label { opacity:1; max-width:160px; margin-inline-start:10px; transition:opacity .25s ease .1s, max-width .35s ease, margin-inline-start .35s ease; }
  .sidebar.open .nav-item .badge { opacity:1; transition:opacity .25s ease .12s; }
  .sidebar.open .user-info { opacity:1; max-width:160px; margin-inline-start:10px; transition:opacity .25s ease .1s, max-width .35s ease, margin-inline-start .35s ease; }
  .sidebar.open .online-dot { opacity:1; transition:opacity .25s ease .12s; }
  .main{margin-left:0 !important;margin-inline-start:0 !important;}
  .stats-grid{grid-template-columns:1fr 1fr;}
  .grid-2,.grid-3,.grid-revenue{grid-template-columns:1fr;}
  .form-row{grid-template-columns:1fr;}

  /* MOBILE TOPBAR LAYOUT */
  .topbar{padding:0 16px;justify-content:space-between;}
  .topbar-title{font-size:18px;}
  .topbar-badge{display:none;}

  /* HIDE on mobile: language button, avatar-modern */
  .mobile-hide{display:none !important;}

  /* Disable animations on mobile for topbar icons (dark mode float, etc) */
  .avatar-anim-wrapper { animation: none !important; }

  /* SHOW on mobile: only dark toggle + hamburger */
  .mobile-menu-btn{display:flex !important;}

  /* Cars Page Responsive Header */
  .cars-header { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; width: 100% !important; overflow-x: hidden !important; }
  .filter-pills { flex-wrap: wrap !important; overflow-x: hidden !important; padding: 8px 4px; background: transparent !important; border: none !important; justify-content: flex-start !important; }
  .filter-pill { white-space: normal !important; flex-shrink: 1 !important; background: var(--surface2); padding: 8px 16px; border-radius: 12px; }
  .add-car-btn { width: 100% !important; justify-content: center !important; }

  /* Modal Photo Grid Mobile */
  .photo-grid { grid-template-columns: repeat(2, 1fr) !important; }

  /* MOBILE LOGO: show icon only, hide text */
  .mobile-logo-wrap{display:flex !important;}
  .mobile-logo-wrap .logo-text{display:none !important;opacity:0 !important;}
  .mobile-logo-wrap .logo-subtitle{display:none !important;opacity:0 !important;}

  /* Sidebar overlay */
  .sidebar-overlay{display:block !important;}

  /* Modal Mobile Fixes */
  .modal { 
    padding: 12px 18px 24px; 
    border-radius: 24px; 
    max-height: none !important; 
    width: 100% !important;
    max-width: 100% !important;
    margin: 0;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    background: var(--surface) !important;
    margin-top: -2px !important;
  }
  .modal-title { font-size: 20px; }
  .modal-header { margin-bottom: 12px !important; }
  
  .form-group { margin-bottom: 16px; }
  .form-input { height: 52px; font-size: 16px; } /* Improved touch target / prevents iOS zoom */
  
  .photo-upload-zone { padding: 20px 14px; }
  .upload-icon-wrap { width: 50px; height: 50px; margin-bottom: 8px; }
  .upload-icon-wrap svg { width: 22px; height: 22px; }
  
  .modal-footer-actions { flex-direction: column-reverse !important; gap: 12px !important; margin-top: 20px; }
  .modal-footer-actions > button { width: 100% !important; flex: none !important; height: 54px; }

  /* Table Mobile Tweak */
  td { padding: 12px 10px; }
  .car-thumb { width: 44px; height: 32px; }

  /* Hide Plate & City fields in modal on mobile */
  .field-plate, .field-city { display: none !important; }

  /* Push modal below the fixed navbar on mobile */
  .modal-overlay { align-items: flex-start !important; padding-top: 5px !important; padding-left: 6px !important; padding-right: 6px !important; }
}
@media(max-width:600px){
  .stats-grid{grid-template-columns:1fr;}
  .content{padding:16px;}
  .topbar{padding:0 14px;}
}

/* Desktop vs Mobile car list toggle */
.cars-mobile-list { display: none; }
.cars-table-desktop { display: block; }
.desktop-hide { display: none !important; }
@media(max-width:900px) {
  .cars-mobile-list { display: block; }
  .cars-table-desktop { display: none !important; }
  .desktop-hide { display: block !important; }

  /* Messages Mobile Layout */
  .messages-layout { flex-direction: column !important; height: calc(100dvh - 145px) !important; min-height: unset !important; overflow: hidden !important; }
  .messages-sidebar { display: none !important; }
  .messages-chat { flex: 1 !important; height: 100% !important; min-height: unset !important; }
  .emoji-picker-advanced { display: none !important; }
  
  .chat-mobile-row { padding: 12px 16px 12px 8px !important; gap: 8px !important; }
  .chat-mobile-input { padding: 12px 16px !important; border-radius: 28px !important; }
  .chat-mobile-input input { font-size: 14px !important; }
  .chat-mobile-btn { width: 40px !important; height: 40px !important; border-radius: 12px !important; }
  .chat-mobile-btn svg { width: 16px !important; height: 16px !important; }

  /* Finance Mobile Layout */
  .finance-page { padding: 10px 16px !important; }
  .finance-stat-value { font-size: clamp(32px, 8vw, 62px) !important; }
  .finance-stat-icon { display: none !important; }
  .finance-table-desktop { display: none !important; }
  .finance-mobile-list { display: block !important; }
}

/* Base Finance CSS */
.finance-table-desktop { display: block; }
.finance-mobile-list { display: none; }

/* Sidebar backdrop overlay — visual only, pointer-events:none so sidebar hover still works */
.sidebar-overlay{
  display:none;
  position:fixed;inset:0;z-index:99;
  background:rgba(0,0,  0,0.45);
  backdrop-filter:blur(2px);
  animation:fadeIn .25s ease;
  pointer-events:none;
}

/* Mobile toggle button (hidden on desktop) */
.mobile-menu-btn{
  display:none;
  align-items:center;justify-content:center;
  width:40px;height:40px;border-radius:12px;
  background:var(--surface);border:1px solid var(--border);
  cursor:pointer;color:var(--text);
  transition:all .25s ease;
  flex-shrink:0;
}
.mobile-menu-btn:hover{background:var(--surface2);border-color:var(--accent);color:var(--accent);}

/* RTL OVERRIDES — use only logical properties to avoid conflicts */
/* The sidebar uses inset-inline-start:0 natively so no override needed for position */
/* Main margin mirrors LTR: mini by default, full when sidebar:hover */
[dir="rtl"] .main { margin-inline-start: var(--sidebar-mini); margin-inline-end: 0; }
[dir="rtl"] .app:has(.sidebar:hover) .main { margin-inline-start: var(--sidebar-w); margin-inline-end: 0; }
[dir="rtl"] .topbar-actions { margin-left: 0; margin-right: auto; }
[dir="rtl"] .nav-item .badge { margin-left: 0; margin-right: auto; }
[dir="rtl"] .online-dot { margin-inline-start: auto; margin-inline-end: 0; }
[dir="rtl"] .logo-dot { margin-left: 0; margin-right: 2px; }
/* sidebar border mirrors on RTL via border-inline-end (already logical) */
@media(max-width:900px) {
  [dir="rtl"] .sidebar { transform: translateX(100%); }
  [dir="rtl"] .sidebar.open { transform: translateX(0); }
  [dir="rtl"] .main { margin-inline-start: 0; }
}

.page{animation:fadeUp .45s ease both;}
.gradient-text{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}

/* Activity feed */
.activity-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);}
.activity-item:last-child{border-bottom:none;}
.activity-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;}
.activity-time{font-size:11px;color:var(--muted2);margin-inline-start:auto;white-space:nowrap;}

/* Search bar */
.search-bar{display:flex;align-items:center;gap:12px;background:var(--surface);border:2px solid var(--accent-color);border-radius:21px;padding:17px 16px;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 2px 4px rgba(0,0,0,0.02);}
.search-bar:focus-within{border-color:var(--accent);background:var(--card);box-shadow:0 0 0 4px rgba(99,102,241,0.1), 0 8px 16px rgba(0,0,0,0.05);transform:translateY(-1px);}
.search-bar input{background:transparent;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text);flex:1;font-weight:500;}
.search-bar input::placeholder{color:var(--muted2);font-weight:400;}

.filter-pills{display:flex;gap:6px;background:var(--surface2);padding: 12px;border-radius: 24px;border:1px solid var(--border);}
.filter-pill{padding:6px 14px;border-radius:10px;font-size:12px;font-weight:700;font-family:'Syne',sans-serif;cursor:pointer;transition:all .25s ease;border:none;background:transparent;color:var(--muted2);display:flex;align-items:center;gap:6px;}
.filter-pill:hover{color:var(--text);background:rgba(255,255,255,0.05);}
.filter-pill.active{background:var(--card);color:var(--accent);box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid rgba(99,102,241,0.15);}

/* Availability toggle row */
.avail-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;background:var(--surface2);border:1px solid var(--border);margin-bottom:10px;transition:border-color .25s;}
.avail-row:hover{border-color:var(--accent);}

/* Revenue chart gradient fill */
.chart-line{position:relative;height:120px;overflow:hidden;}

/* Priority tag */
.priority-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-inline-end:6px;}

/* Page transitions */
.tab-content{min-height:calc(100vh - 64px - 56px);}

/* Empty state */
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center;}
.empty-statee{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center;position:relative;top:50%;left:50%;transform:translate(-50%,-50%);}
.empty-stateee{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center;position:relative;top:18px;}
.empty-state svg{margin-bottom:16px;opacity:.4;}
[data-theme=dark] .card{background:rgba(255,255,255,0.04) !important;border:1px solid rgba(255,255,255,0.06);}
[data-theme=dark] .stat-card{background:rgba(255,255,255,0.04) !important;border:1px solid rgba(255,255,255,0.06);}
[data-theme=dark] .settings-section{background:rgba(255,255,255,0.04) !important;border:1px solid rgba(255,255,255,0.06);}

/* ELITE ANIMATED SVG ICONS */
@keyframes svg-shake { 0%, 100% { transform: rotate(0); } 20% { transform: rotate(-10deg); } 40% { transform: rotate(10deg); } 60% { transform: rotate(-10deg); } 80% { transform: rotate(10deg); } }
@keyframes svg-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.95); } }
@keyframes svg-dots { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes svg-fly { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(2px, -2px); } }

.anim-svg-call { animation: svg-shake 2s infinite ease-in-out; }
.anim-svg-video { animation: svg-pulse 2s infinite ease-in-out; }
.anim-svg-dots circle { animation: svg-dots 1.5s infinite; }
.anim-svg-dots circle:nth-child(2) { animation-delay: 0.2s; }
.anim-svg-dots circle:nth-child(3) { animation-delay: 0.4s; }
.anim-svg-send { animation: svg-fly 2s infinite ease-in-out; transition: all 0.3s; }
.anim-svg-send:hover { transform: translate(4px, -4px) scale(1.1) !important; }
@keyframes svg-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.anim-svg-chat { animation: svg-float 3s infinite ease-in-out; }
@keyframes svg-breath { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
.anim-svg-chat-elite { animation: svg-breath 3s infinite ease-in-out; }
.anim-svg-plus { transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.anim-svg-plus:hover { transform: rotate(90deg) scale(1.2); color: var(--accent); }
.anim-svg-sticker { transition: all 0.3s ease; }
.anim-svg-sticker:hover { transform: translateY(-2px) scale(1.1); filter: drop-shadow(0 0 8px var(--accent)); }
/* EMOJI PICKER ULTRA MODERN */
/* EMOJI PICKER ULTRA MODERN */
@keyframes emojiPickerIn {
  0% { opacity: 0; transform: translateY(10px) scale(0.95); }
  60% { transform: translateY(-4px) scale(1.01); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes emojiTabGlow {
  0%, 100% { box-shadow: 0 0 0px rgba(99,102,241,0); }
  50% { box-shadow: 0 0 12px rgba(99,102,241,0.4); }
}
@keyframes emojiIconPop {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(5deg); }
}

/* LEAFLET OVERRIDES */
.leaflet-container { 
    width: 100%; height: 100%; z-index: 1; border-radius: 20px; font-family: 'DM Sans', sans-serif;
    background: var(--bg);
}
[data-theme=dark] .leaflet-layer {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
[data-theme=dark] .leaflet-control-zoom a { background: var(--surface2) !important; color: var(--text) !important; border-color: var(--border) !important; }
.leaflet-popup-content-wrapper { background: var(--card) !important; color: var(--text) !important; border: 1px solid var(--border); border-radius: 16px !important; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;}
.leaflet-popup-tip { background: var(--card) !important; border: 1px solid var(--border); }
.map-marker-custom { background: transparent; border: none; display: flex; align-items: center; justify-content: center; }
.map-marker-inner { width: 36px; height: 36px; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2.5px solid var(--card); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; z-index: 10; }
.map-marker-inner:hover { transform: scale(1.15) translateY(-5px); }
.map-marker-pulse { position: absolute; inset: -4px; border-radius: 16px; border: 2px solid currentColor; opacity: 0.5; animation: badgePulse 2s infinite; z-index: 1; pointer-events: none; }

/* Animated Dash Line for map route */
.route-line-animated path {
    animation: dash 20s linear infinite;
}
@keyframes dash {
    to {
        stroke-dashoffset: -1000;
    }
}
.currency-dropdown{width:280px;}
@media(max-width:900px){ .currency-dropdown{width:100% !important; min-width:unset !important;} }
`;

/* ─────────────────────────────── ICONS ─────────────────────────────── */
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
);

const icons = {
    dashboard: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
    cars: "M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3",
    reservations: ["M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
    customers: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
    mapPin: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"],
    messages: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    finance: ["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
    analytics: ["M18 20V10", "M12 20V4", "M6 20v-6"],
    settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
    sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
    moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
    globe: ["M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
    bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
    plus: "M12 5v14M5 12h14",
    edit: ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
    trash: ["M3 6h18", "M8 6V4h8v2", "M19 6l-1 14H6L5 6"],
    check: "M20 6 9 17l-5-5",
    x: "M18 6 6 18M6 6l12 12",
    search: ["M11 11m-8 0a8 8 0 1 0 16 0 8 8 0 0 0-16 0", "m21 21-4.35-4.35"],
    arrow: "M5 12h14M12 5l7 7-7 7",
    car2: ["M4 16l4.5-9h7L20 16", "M4 16v3h16v-3", "M4 16h16", "M7.5 16v2M16.5 16v2"],
    dollar: ["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
    trending: ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
    users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
    menu: "M4 6h16M4 12h16M4 18h16",
    logout: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
    upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
    eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
    calendar: ["M8 2v3M16 2v3M3 8h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
    filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
    map: ["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z", "M8 2v16M16 6v16"],
    info: "M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",
};

/* ─────────────────────────────── DATA ─────────────────────────────── */
const isMockUser = () => {
    try {
        const d = JSON.parse(localStorage.getItem("agencyData"));
        return d && d.email === "badrtiwi493@gmail.com";
    } catch (e) { return false; }
};
const IS_MOCK = isMockUser(); // for compatibility with load-time constants

const CARS = [];
const MOCK_RESERVATIONS = [
    {
        id: "RES-8392",
        client: "Yassine El Fassi",
        avatar: "Y",
        color: "#3b82f6",
        car: "Mercedes-Benz Classe G",
        from: "12 Mai 2026",
        to: "15 Mai 2026",
        amount: 8500,
        status: "pending",
        idCardFront: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?auto=format&fit=crop&q=80&w=800",
        drivingLicense: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "RES-8391",
        client: "Sarah Bennani",
        avatar: "S",
        color: "#10b981",
        car: "Range Rover Sport",
        from: "08 Mai 2026",
        to: "10 Mai 2026",
        amount: 4200,
        status: "confirmed",
        idCardFront: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        drivingLicense: "https://images.unsplash.com/photo-1620063259954-46c650bd8212?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "RES-8390",
        client: "Mehdi Tazi",
        avatar: "M",
        color: "#8b5cf6",
        car: "Porsche 911 Carrera",
        from: "01 Mai 2026",
        to: "03 Mai 2026",
        amount: 12000,
        status: "cancelled",
        idCardFront: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?auto=format&fit=crop&q=80&w=800",
        drivingLicense: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "RES-8393",
        client: "Amine Chraibi",
        avatar: "A",
        color: "#f59e0b",
        car: "BMW Série 4",
        from: "18 Mai 2026",
        to: "22 Mai 2026",
        amount: 6000,
        status: "pending",
        idCardFront: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        drivingLicense: "https://images.unsplash.com/photo-1620063259954-46c650bd8212?auto=format&fit=crop&q=80&w=800"
    }
];
const MOCK_CLIENTS = [
    {
        name: "Yassine Benali",
        email: "yassine.benali@email.com",
        spend: "28 400 Dh",
        spendVal: 28400,
        tier: "Platinum",
        initials: "YB",
        color: "#bf7fff",
        phone: "+212 6 61 23 45 67",
        city: "Marrakech",
        totalRentals: 14,
        cin: "AB123456",
        license: "01/12345"
    },
    {
        name: "Sara Alami",
        email: "sara.alami@email.com",
        spend: "19 200 Dh",
        spendVal: 19200,
        tier: "Gold",
        initials: "SA",
        color: "#f59e0b",
        phone: "+212 6 62 34 56 78",
        city: "Casablanca",
        totalRentals: 8,
        cin: "CD345678",
        license: "02/23456"
    },
    {
        name: "Karim Hajji",
        email: "karim.hajji@email.com",
        spend: "15 600 Dh",
        spendVal: 15600,
        tier: "Gold",
        initials: "KH",
        color: "#f59e0b",
        phone: "+212 6 63 45 67 89",
        city: "Rabat",
        totalRentals: 6,
        cin: "EF567890",
        license: "03/34567"
    },
    {
        name: "Meryem Naji",
        email: "meryem.naji@email.com",
        spend: "9 800 Dh",
        spendVal: 9800,
        tier: "Silver",
        initials: "MN",
        color: "#9ca3af",
        phone: "+212 6 64 56 78 90",
        city: "Tangier",
        totalRentals: 4,
        cin: "GH789012",
        license: "04/45678"
    },
    {
        name: "Amine Boussif",
        email: "amine.boussif@email.com",
        spend: "8 400 Dh",
        spendVal: 8400,
        tier: "Silver",
        initials: "AB",
        color: "#9ca3af",
        phone: "+212 6 65 67 89 01",
        city: "Agadir",
        totalRentals: 3,
        cin: "IJ901234",
        license: "05/56789"
    },
    {
        name: "Omar Moufid",
        email: "omar.moufid@email.com",
        spend: "6 200 Dh",
        spendVal: 6200,
        tier: "Silver",
        initials: "OM",
        color: "#9ca3af",
        phone: "+212 6 66 78 90 12",
        city: "Fes",
        totalRentals: 2,
        cin: "KL123456",
        license: "06/67890"
    }
];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const CHART_MONTHS = ["Avr 25", "Mai 25", "Jun 25", "Jul 25", "Aoû 25", "Sep 25", "Oct 25", "Nov 25", "Déc 25", "Jan 26", "Fév 26", "Mar 26", "Avr 26"];
const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
// Power BI — CA mensuel (total ≈ 3 985 000 MAD)
const MOCK_REVENUE = [290000, 320000, 380000, 410000, 350000, 450000, 320000, 280000, 250000, 310000, 330000, 295000, 340000];
const MOCK_WEEKLY_REVENUE = [52000, 48000, 61000, 57000, 64000, 70000, 68000];
const MOCK_MONTHLY_REVENUE = Array.from({ length: 31 }, (_, i) => 9000 + Math.sin(i * 0.45) * 3500 + i * 120);
// Power BI — Réservations par mois (total = 500)
const MOCK_BOOKINGS_PER_MONTH = [39, 36, 45, 48, 40, 52, 37, 38, 33, 42, 44, 46, 50];
// Power BI — Voitures les plus rentables
const MOCK_PROFITABLE_CARS_DATA = [395000, 340000, 310000, 298000, 270000, 250000, 245000, 235000, 200000, 180000, 170000, 160000];
const MOCK_PROFITABLE_CARS_LABELS = ["Octavia", "Corolla", "A4", "208", "500", "Classe C", "Qashqai", "Clio", "Tucson", "Logan", "Focus", "Série 3"];
// Power BI — Marques les plus louées
const MOCK_RENTED_BRANDS_DATA = [48, 44, 41, 39, 37, 36, 34, 33, 32, 31, 30, 30, 26, 25, 23];
const MOCK_RENTED_BRANDS_LABELS = ["Ford", "Peugeot", "Seat", "BMW", "Hyundai", "Skoda", "Nissan", "Mercedes", "Toyota", "Renault", "Audi", "VW", "Dacia", "Kia", "Fiat"];
// Power BI — Réservations par trimestre
const MOCK_QUARTER_DATA = [119, 136, 115, 130];
const MOCK_QUARTER_LABELS = ["T1", "T2", "T3", "T4"];
// Power BI — TOP clients
const MOCK_TOP_CLIENTS_DATA = [390000, 310000, 290000, 270000, 240000, 220000, 200000, 185000, 170000, 155000, 140000, 130000, 118000, 110000, 100000];
const MOCK_TOP_CLIENTS_LABELS = ["Nora", "Sophia", "Ali", "Karim", "Aya", "Lina", "Hugo", "Ilyas", "Lucas", "Emily", "Omar", "John", "Noah", "Ahmed", "Sara"];
// Power BI — Maintenance par mois et modèle
const MOCK_MAINT_MONTHS = ["Jun", "Nov", "Dec", "Jan", "Mar", "Mai", "Aug", "Sep", "Oct", "Apr", "Jul", "Feb"];
const MOCK_MAINT_SERIES = [
    { label: "500", color: "#f59e0b", values: [4, 3, 2, 3, 2, 3, 2, 2, 2, 2, 1, 1] },
    { label: "Classe C", color: "#a855f7", values: [3, 4, 3, 2, 2, 2, 2, 2, 2, 1, 2, 1] },
    { label: "Focus", color: "#ef4444", values: [5, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 1] },
    { label: "Ibiza", color: "#ec4899", values: [4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1] },
    { label: "Tucson", color: "#3b82f6", values: [6, 5, 5, 4, 3, 3, 3, 2, 2, 2, 2, 1] },
];

const RESERVATIONS = IS_MOCK ? MOCK_RESERVATIONS : [];
const CLIENTS = IS_MOCK ? MOCK_CLIENTS : [];
const QUARTER_DATA = IS_MOCK ? MOCK_QUARTER_DATA : [0, 0, 0, 0];
const QUARTER_LABELS = IS_MOCK ? MOCK_QUARTER_LABELS : ["T1", "T2", "T3", "T4"];
const TOP_CLIENTS_DATA = IS_MOCK ? MOCK_TOP_CLIENTS_DATA : [];
const TOP_CLIENTS_LABELS = IS_MOCK ? MOCK_TOP_CLIENTS_LABELS : [];
const MAINT_MONTHS = IS_MOCK ? MOCK_MAINT_MONTHS : ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun"];
const MAINT_SERIES = IS_MOCK ? MOCK_MAINT_SERIES : [];
const REVENUE = IS_MOCK ? MOCK_REVENUE : Array(13).fill(0);
const WEEKLY_REVENUE = IS_MOCK ? MOCK_WEEKLY_REVENUE : Array(7).fill(0);
const MONTHLY_REVENUE = IS_MOCK ? MOCK_MONTHLY_REVENUE : Array(31).fill(0);
const BOOKINGS_PER_MONTH = IS_MOCK ? MOCK_BOOKINGS_PER_MONTH : Array(13).fill(0);
const PROFITABLE_CARS_DATA = IS_MOCK ? MOCK_PROFITABLE_CARS_DATA : [];
const PROFITABLE_CARS_LABELS = IS_MOCK ? MOCK_PROFITABLE_CARS_LABELS : [];
const RENTED_BRANDS_DATA = IS_MOCK ? MOCK_RENTED_BRANDS_DATA : [];
const RENTED_BRANDS_LABELS = IS_MOCK ? MOCK_RENTED_BRANDS_LABELS : [];

/* ─────────────────────────────── COMPONENTS ─────────────────────────────── */

function Logo({ onClick, t }) {
    return (
        <div
            onClick={onClick}
            className="sidebar-logo"
            style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >
            {/* Logo mark — exactement comme Home.jsx */}
            <div style={{
                position: "relative", width: 40, height: 40, borderRadius: 14,
                background: "var(--text)", display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.18)",
                overflow: "hidden", flexShrink: 0
            }}>
                {/* Spinning conic gradient */}
                <div style={{
                    position: "absolute", top: "-50%", left: "-50%",
                    width: "200%", height: "200%",
                    background: "conic-gradient(from 0deg,transparent 0%,var(--accent) 30%,transparent 40%)",
                    animation: "spin 4s linear infinite"
                }} />
                {/* Inner background disc */}
                <div style={{
                    position: "absolute", inset: 2,
                    background: "var(--bg)", borderRadius: 12, zIndex: 1
                }} />
                {/* Car SVG avec roues animées + drive bumps */}
                <svg
                    style={{ zIndex: 2, animation: "driveBumps 2s ease-in-out infinite" }}
                    width="22" height="22" viewBox="0 0 24 24"
                    fill="none" stroke="var(--text)"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: "spin 1s linear infinite", transformOrigin: "6.5px 16.5px" }} />
                    <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: "spin 1s linear infinite", transformOrigin: "16.5px 16.5px" }} />
                </svg>
            </div>

            {/* Logo texte : "Upp" + "Car" + point clignotant — ultra animé */}
            <div className="logo-text">
                <div style={{ position: "relative" }}>
                    <span style={{ color: "var(--text-main)" }}>Upp</span>
                    <span style={{ color: "var(--accent-color)" }}>Car</span>
                    <span style={{
                        position: "absolute", bottom: 8, insetInlineEnd: 21,
                        width: 5, height: 5, borderRadius: "50%",
                        background: "var(--accent-color)", animation: "blink 2s infinite"
                    }} />
                </div>
                <div className="logo-subtitle">{t.brandSubtitle}</div>
            </div>
        </div>
    );
}


function StatCard({ label, value, change, up, color, icon }) {
    return (
        <div className="stat-card" style={{ borderColor: `${color}25` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 12px 30px ${color}30`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}25`; e.currentTarget.style.boxShadow = "none"; }}>
            <div className="stat-glow" style={{ background: color }} />
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div className="stat-label">{label}</div>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0, transform: "scale(1.2)", marginInlineStart: 12 }}>
                    {icon}
                </div>
            </div>
            <div className="stat-value" style={{ color, marginBottom: 8 }}>{value}</div>
            {change && (
                <div className={`stat-change ${up ? "up" : "down"}`}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "floatLift 2s ease-in-out infinite" }}>
                        {up ? <><polyline points="17 11 12 6 7 11" /><line x1="12" y1="6" x2="12" y2="18" /></> : <><polyline points="7 13 12 18 17 13" /><line x1="12" y1="6" x2="12" y2="18" /></>}
                    </svg>
                    {change}
                </div>
            )}
        </div>
    );
}
/* ─────────── CENTRALIZED MONTH DATA GENERATOR ─────────── */
/* Deterministic pseudo-random: same (m,y) always returns same data */
function getMonthData(m, y, realResList = []) {
    if (realResList && realResList.length > 0) {
        const filtered = realResList.filter(r => {
            if (!r.startDate) return false;
            const d = new Date(r.startDate);
            return (d.getMonth() + 1) === m && d.getFullYear() === y;
        });

        const activeClients = new Set(filtered.map(r => r.clientId || r.clientFirstName)).size;
        const totalRevenue = filtered.reduce((acc, r) => acc + (r.totalPrice || 0), 0);
        const lastRes = filtered.length > 0 ? filtered[filtered.length - 1] : null;
        const lastReservationAmount = lastRes ? (lastRes.totalPrice || 0) : 0;
        const resCount = filtered.length;

        const daysInMonthLocal = new Date(y, m, 0).getDate();
        const bookingData = Array.from({ length: daysInMonthLocal }, () => 0);
        filtered.forEach(r => {
            const d = new Date(r.startDate);
            if (d.getDate() >= 1 && d.getDate() <= daysInMonthLocal) {
                bookingData[d.getDate() - 1] += (r.totalPrice || 0);
            }
        });

        const demoReservations = filtered.slice(-8).map((r, i) => ({
            id: r.id ? `RES-${r.id}` : `RES-${i}`,
            client: `${r.clientFirstName || 'Client'} ${r.clientLastName || ''}`.trim(),
            avatar: (r.clientFirstName?.[0] || '?').toUpperCase(),
            color: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#a855f7"][(r.id || i) % 5],
            car: `Véhicule ${r.carId || ''}`,
            from: r.startDate && r.startDate.substring(0, 10),
            to: r.endDate && r.endDate.substring(0, 10),
            amount: r.totalPrice || 0,
            status: r.status ? r.status.toLowerCase() : 'confirmed',
            idCardFront: "", idCardBack: "", drivingLicenseFront: "", drivingLicenseBack: ""
        }));

        const pendingCount = filtered.filter(r => r.status === 'PENDING').length;

        return {
            baseRental: totalRevenue * 0.8,
            lastReservationAmount,
            discounts: 0,
            insurance: totalRevenue * 0.1,
            serviceFees: totalRevenue * 0.05,
            taxes: totalRevenue * 0.05,
            netRevenue: totalRevenue * 0.95,
            totalRevenue,
            reservations: resCount,
            activeClients,
            revenueChange: "+0%", revenueUp: true,
            resChange: "+0", resUp: true, cliChange: "+0", cliUp: true,
            bookingData,
            daysInMonth: daysInMonthLocal,
            demoReservations,
            pendingCount,
            fmt: (n) => typeof n === 'number' ? Math.abs(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"
        };
    }

    if (!isMockUser()) {
        return {
            baseRental: 0, discounts: 0, insurance: 0, serviceFees: 0, taxes: 0, netRevenue: 0, totalRevenue: 0,
            reservations: 0, activeClients: 0, revenueChange: "+0%", revenueUp: true,
            resChange: "+0", resUp: true, cliChange: "+0", cliUp: true,
            bookingData: Array.from({ length: new Date(y, m, 0).getDate() }, () => 0),
            daysInMonth: new Date(y, m, 0).getDate(),
            demoReservations: [], pendingCount: 0,
            fmt: (n) => typeof n === 'number' ? Math.abs(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00",
        };
    }

    const seed = m * 31 + (y - 2024) * 397;
    const r = (offset) => { const x = Math.sin(seed + offset) * 43758.5453; return x - Math.floor(x); };

    // Seasonal factor: peak in summer (jul-aug), low in jan
    const seasonal = 0.65 + 0.55 * Math.sin((m - 1) * Math.PI / 6 - 0.3);

    const baseRental = Math.round((10000 + r(1) * 12000) * seasonal);
    const discountPct = 0.04 + r(2) * 0.06;
    const discounts = -Math.round(baseRental * discountPct);
    const insurance = Math.round(baseRental * (0.09 + r(3) * 0.06));
    const serviceFees = Math.round(baseRental * (0.02 + r(4) * 0.04));
    const netRevenue = baseRental + discounts + insurance + serviceFees;
    const taxes = Math.round(netRevenue * (0.07 + r(5) * 0.04));
    const totalRevenue = netRevenue + taxes;

    // Previous month for % change
    const pm = m === 1 ? 12 : m - 1;
    const py = m === 1 ? y - 1 : y;
    const ps = pm * 31 + (py - 2024) * 397;
    const pr = (o) => { const x = Math.sin(ps + o) * 43758.5453; return x - Math.floor(x); };
    const prevSeasonal = 0.65 + 0.55 * Math.sin((pm - 1) * Math.PI / 6 - 0.3);
    const prevBase = Math.round((10000 + pr(1) * 12000) * prevSeasonal);
    const prevNet = Math.round(prevBase * (1 + pr(3) * 0.15 - pr(2) * 0.05));
    const prevTotal = Math.round(prevNet * 1.08);
    const revChangePct = ((totalRevenue - prevTotal) / prevTotal * 100);
    const revenueChange = (revChangePct >= 0 ? '+' : '') + revChangePct.toFixed(1) + '%';
    const revenueUp = revChangePct >= 0;

    // Reservations & clients
    const reservations = Math.round((22 + r(6) * 40) * seasonal);
    const activeClients = Math.round((15 + r(7) * 25) * seasonal);
    const resChange = (r(8) > 0.5 ? '+' : '') + Math.round((r(8) - 0.3) * 14);
    const resUp = r(8) > 0.3;
    const cliChange = (r(9) > 0.5 ? '+' : '') + Math.round((r(9) - 0.3) * 8);
    const cliUp = r(9) > 0.3;

    // Daily booking counts (bar chart) — truly varies per month
    const daysInMonth = new Date(y, m, 0).getDate();
    const peakDay = Math.round(5 + r(10) * 20); // peak booking day varies
    const avgBooks = Math.round((3 + r(11) * 6) * seasonal);
    const bookingData = Array.from({ length: daysInMonth }, (_, i) => {
        const dist = Math.abs(i - peakDay);
        const wave = avgBooks + Math.sin(i * 0.5 + m * 0.7) * 2.5 + Math.cos(i * 0.3 + m) * 1.5;
        const peak = Math.max(0, (1 - dist / 15) * avgBooks * 0.7);
        return Math.max(1, Math.round(wave + peak + r(20 + i) * 2 - 1));
    });

    // Latest reservations — 5 to 8 per month, completely unique combinations
    const FIRST_NAMES = ["Yassine", "Sara", "Karim", "Meryem", "Amine", "Fatima", "Omar", "Leila", "Mehdi", "Nadia", "Ayoub", "Hajar", "Zakaria", "Kenza", "Ilias", "Imane", "Bilal", "Chaimae", "Hamza", "Salma", "Othmane", "Soukaina", "Adil", "Asmaa"];
    const LAST_NAMES = ["Benali", "Alami", "Hajji", "Naji", "Boussif", "Zahra", "Moufid", "Lazrak", "Salah", "Aouad", "Tazi", "Bennani", "El Fassi", "Chraibi", "Amrani", "Tahiri", "Lahlou", "Mansouri", "Kabbaj", "Berrada", "Alaoui", "Bensouda"];
    const CARS_POOL = ["Dacia Logan", "Renault Clio", "Hyundai Tucson", "Peugeot 208", "Toyota Corolla", "Dacia Sandero", "Seat Ibiza", "Ford Focus", "Porsche 911", "Range Rover", "Mercedes-Benz G", "BMW Série 4", "VW Golf", "Audi A3", "Fiat 500", "Kia Sportage", "Jeep Renegade"];
    const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#a855f7", "#06b6d4", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];
    const STATUSES = ["confirmed", "pending", "confirmed", "cancelled", "pending", "confirmed", "pending", "confirmed"];

    // Pick 5 to 8 unique clients per month
    const numRes = Math.floor(5 + r(100) * 4); // 5 to 8

    const demoReservations = Array.from({ length: numRes }).map((_, i) => {
        const fn = FIRST_NAMES[Math.floor(r(110 + i) * FIRST_NAMES.length)];
        const ln = LAST_NAMES[Math.floor(r(120 + i) * LAST_NAMES.length)];
        const car = CARS_POOL[Math.floor(r(130 + i) * CARS_POOL.length)];
        const color = COLORS[Math.floor(r(140 + i) * COLORS.length)];
        const clientName = `${fn} ${ln}`;
        const avatar = `${fn[0]}${ln[0]}`.toUpperCase();
        const dayFrom = 1 + Math.floor(r(60 + i) * (daysInMonth - 5));
        const nights = 2 + Math.floor(r(70 + i) * 5);
        const dayTo = Math.min(dayFrom + nights, daysInMonth);
        const mm = String(m).padStart(2, '0');
        const amount = Math.round((400 + r(80 + i) * 2600) / 10) * 10;
        return {
            id: `RES-${8390 + i + (m * 10)}`,
            avatar: avatar,
            client: clientName,
            car: car,
            from: `${String(dayFrom).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`,
            to: `${String(dayTo).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`,
            amount,
            status: STATUSES[i],
            color: color,
            idCardFront: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=800",
            idCardBack: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?auto=format&fit=crop&q=80&w=800",
            drivingLicenseFront: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
            drivingLicenseBack: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800"
        };
    });
    const pendingCount = demoReservations.filter(r => r.status === 'pending').length;

    const fmt = (n) => Math.abs(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return {
        baseRental, discounts, insurance, serviceFees, taxes, netRevenue, totalRevenue,
        reservations, activeClients, revenueChange, revenueUp,
        resChange, resUp, cliChange, cliUp,
        bookingData, daysInMonth, demoReservations, pendingCount, fmt,
    };
}

function RevenueSummary({ dark, t, lang, currency, currentMonth, currentYear, reservationsList = [] }) {
    const md = getMonthData(currentMonth, currentYear, reservationsList);
    const { baseRental, lastReservationAmount, discounts, insurance, serviceFees, taxes, netRevenue, totalRevenue,
        revenueChange, revenueUp, bookingData } = md;

    // Apply real currency conversion
    const rate = getRate(currency);
    const cvt = (madVal) => madVal * rate;
    const fmtC = (madVal) => Math.abs(cvt(madVal)).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const breakdown = [
        { key: "lastReservation", val: fmtC(lastReservationAmount), color: "var(--text)" },
        { key: "discounts", val: fmtC(discounts), color: "#ef4444", neg: true },
        { key: "insuranceOptions", val: fmtC(insurance), color: "var(--text)" },
        { key: "serviceFees", val: fmtC(serviceFees), color: "var(--text)" },
        { key: "taxes", val: fmtC(taxes), color: "var(--text)" },
        { key: "netRevenue", val: fmtC(netRevenue), color: "var(--accent)" },
    ];

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const chartLabels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${currentMonth}/${currentYear}`);

    // Original smooth organic revenue curve — DO NOT change
    const getDailyData = (m, y, len) => {
        const base = [
            75, 150, 300, 525, 800, 1075, 1200, 1250, 1350, 1375,
            1200, 1450, 1800, 2000, 1825, 1975, 1750, 1950, 1625, 1300,
            1075, 1250, 1450, 1700, 2000, 2175, 2250, 2200, 2050, 1500
        ];
        const shift = (m * 7) % base.length;
        const ref = [...base.slice(shift), ...base.slice(0, shift)];
        const scale = 0.85 + ((m * 3 + y) % 8) * 0.04;
        const res = [];
        for (let i = 0; i < len; i++) {
            const tt = (i / (len - 1)) * (ref.length - 1);
            const k = Math.min(Math.floor(tt), ref.length - 2);
            const f = tt - k;
            const s = (1 - Math.cos(f * Math.PI)) / 2;
            const v = ref[k] * (1 - s) + ref[k + 1] * s;
            res.push(Math.round(Math.max(50, v * scale)));
        }
        return res;
    };
    const chartData = isMockUser() ? getDailyData(currentMonth, currentYear, daysInMonth) : bookingData;

    return (
        <div className="grid-revenue" style={{ animation: "fadeUp .6s ease" }}>
            <div className="card" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
                <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="section-title glassmorphic-date-badge" style={{ fontSize: 14, color: "var(--accent)", padding: "6px 14px", borderRadius: "10px", background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)", display: "flex", gap: "8px", alignItems: "center", fontWeight: 800 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s infinite", display: "inline-block" }} />
                            {lang === "ar" ? "اليوم" : lang === "en" ? "Today" : "Aujourd'hui"} · {new Date().getDate()} {MONTHS[new Date().getMonth()]} {new Date().getFullYear()}
                        </div>
                    </div>
                    <div style={{ color: "var(--muted2)", cursor: "pointer" }}><Icon d={icons.info} size={16} /></div>
                </div>
                <div style={{ padding: "24px 32px" }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 600, marginBottom: 4 }}>{t.revenueMonth || "Chiffre d'affaires ce mois"}</div>
                        <div style={{ fontSize: 27, fontWeight: 900, color: dark ? "#60a5fa" : "#10b981" }}>{currency} {fmtC(totalRevenue)}</div>
                        <div style={{ fontSize: 12, color: revenueUp ? "#10b981" : "#ef4444", fontWeight: 700, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                {revenueUp
                                    ? <><polyline points="17 11 12 6 7 11" /><line x1="12" y1="6" x2="12" y2="18" /></>
                                    : <><polyline points="7 13 12 18 17 13" /><line x1="12" y1="18" x2="12" y2="6" /></>}
                            </svg>
                            {revenueChange} vs mois précédent
                        </div>
                    </div>
                    <div className="mobile-hide">
                        <LineChart data={chartData} labels={chartLabels} color={dark ? "#60a5fa" : "#10b981"} simplified height={220} t={t} lang={lang} showLegend showYAxis unit={currency} />
                    </div>
                    <div className="desktop-hide">
                        <LineChart data={chartData} labels={chartLabels} color={dark ? "#60a5fa" : "#10b981"} simplified height={340} t={t} lang={lang} showLegend showYAxis unit={currency} />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="section-title" style={{ fontSize: 14, color: "var(--muted2)" }}>{t.revenueBreakdown}</div>
                    <div style={{ color: "var(--muted2)", cursor: "pointer" }}><Icon d={icons.info} size={16} /></div>
                </div>
                <div style={{ padding: "10px 0" }}>
                    {breakdown.map((item, i) => (
                        <div key={i} className="settings-row" style={{ padding: "14px 24px", border: "none", background: i % 2 === 0 ? "rgba(128,128,128,0.03)" : "transparent" }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: i === breakdown.length - 1 ? "var(--accent)" : "var(--muted2)" }}>{t[item.key]}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: item.color }}>
                                    {item.neg ? `- ${currency} ${item.val}` : `${currency} ${item.val}`}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: "16px 24px", marginTop: 4, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: "var(--accent)" }}>{t.totalRevenue}</div>
                        <div style={{ fontSize: 15, fontWeight: 900, color: dark ? "#60a5fa" : "#10b981" }}>{currency} {fmtC(totalRevenue)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LineChart({ data, labels, color = "#10b981", title, height = 200, simplified = false, t, lang, showLegend = false, showYAxis = false, unit = "" }) {
    const isAllZero = data.every(v => v === 0);
    const W = 1000, H = height, PY = 16;
    const rawMax = isAllZero ? 0 : Math.max(...data);
    const max = Math.max(6000, Math.ceil(rawMax / 1000) * 1000);
    const PX = showYAxis ? 75 : 45;
    const viewBoxX = showYAxis ? 15 : 0;
    const viewBoxW = showYAxis ? 985 : 1000;
    const gradId = `fill-${(title || 'chart' + Math.random()).replace(/\s+/g, '-')}`;

    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const scale = W / rect.width;
        const svgX = (e.clientX - rect.left) * scale;

        // Find closest point index
        let closest = 0;
        let minDiff = Infinity;
        pts.forEach((p, i) => {
            const diff = Math.abs(p.x - svgX);
            if (diff < minDiff) {
                minDiff = diff;
                closest = i;
            }
        });
        setHoverIndex(closest);
    };

    const handleMouseLeave = () => setHoverIndex(null);

    const pts = data.map((v, i) => ({
        x: PX + (i / (data.length - 1)) * (W - PX - 16),
        y: PY + (1 - v / max) * (H - PY)
    }));

    let linePath = "";
    if (linePath === "" && data.length > 0) {
        linePath = `M ${pts[0].x} ${pts[0].y} `;
        for (let i = 0; i < pts.length - 1; i++) {
            const cx = (pts[i].x + pts[i + 1].x) / 2;
            linePath += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y} `;
        }
    }
    const fillPath = linePath
        ? `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
        : "";

    if (simplified) {
        const todayIndex = Math.min((new Date().getDay() + 6) % 7, data.length - 1);
        const activeIndex = hoverIndex !== null ? hoverIndex : todayIndex;
        const activeX = pts.length > 0 ? pts[activeIndex].x : W / 2;

        return (
            <div style={{ width: "100%", position: "relative" }} dir="ltr">
                <svg
                    viewBox={`${viewBoxX} -10 ${viewBoxW} ${H + 40}`}
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: "visible", display: "block", cursor: "crosshair" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onTouchMove={e => {
                        const touch = e.touches[0];
                        const rect = e.currentTarget.getBoundingClientRect();
                        const scale = W / rect.width;
                        const svgX = (touch.clientX - rect.left) * scale;
                        let closest = 0;
                        let minDiff = Infinity;
                        pts.forEach((p, i) => {
                            const diff = Math.abs(p.x - svgX);
                            if (diff < minDiff) {
                                minDiff = diff;
                                closest = i;
                            }
                        });
                        setHoverIndex(closest);
                    }}
                    onTouchEnd={handleMouseLeave}
                >
                    <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Horizontal grid lines and Y labels - steps of 500 */}
                    {(() => {
                        const tks = [];
                        for (let v = 0; v <= max; v += 1000) tks.push(v);
                        return tks;
                    })().map(val => {
                        const i = 1 - (val / max);
                        const y = PY + i * (H - PY);
                        return (
                            <g key={val}>
                                <line x1={PX} y1={y} x2={W - 16} y2={y} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                                {showYAxis && (
                                    <text x={PX - 12} y={y} textAnchor="end" dominantBaseline="middle" style={{ fontSize: 11, fill: "var(--muted2)", fontWeight: 700 }}>
                                        {Math.round(val).toLocaleString()} {unit}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {isAllZero ? (
                        <>
                            {/* Vertical Line for activeIndex */}
                            {hoverIndex !== null && <line x1={activeX} y1={0} x2={activeX} y2={H} stroke="var(--border)" strokeWidth="1" opacity="0.8" style={{ transition: "x1 0.15s ease-out, x2 0.15s ease-out" }} />}

                            {/* Solid line from start to activeX */}
                            <line x1={pts[0].x} y1={H} x2={activeX} y2={H} stroke={color} strokeWidth="1.5" strokeLinecap="round" style={{ transition: "x2 0.15s ease-out" }} />

                            {/* Dotted line from activeX to end */}
                            {activeIndex < pts.length - 1 && (
                                <line x1={activeX} y1={H} x2={pts[pts.length - 1].x} y2={H} stroke={color} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.6" style={{ transition: "x1 0.15s ease-out" }} />
                            )}

                            {/* Dot exactly on activeX */}
                            <circle cx={activeX} cy={H} r={hoverIndex !== null ? "4" : "3.5"} fill={color} stroke="var(--surface)" strokeWidth="1.5" style={{ transition: "cx 0.15s ease-out, r 0.15s ease-out", pointerEvents: "none" }} />
                        </>
                    ) : (
                        <>
                            <path d={fillPath} fill={`url(#${gradId})`} />
                            <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Hover trackers for non-zero data */}
                            {hoverIndex !== null && (
                                <>
                                    <line x1={pts[hoverIndex].x} y1={0} x2={pts[hoverIndex].x} y2={H} stroke="var(--border)" strokeWidth="1" opacity="0.8" style={{ transition: "x1 0.1s ease, x2 0.1s ease" }} />
                                    <circle cx={pts[hoverIndex].x} cy={pts[hoverIndex].y} r="4" fill={color} stroke="var(--surface)" strokeWidth="1.5" style={{ transition: "cx 0.1s ease, cy 0.1s ease" }} />

                                    <g style={{ transition: "transform 0.1s ease" }} transform={`translate(${pts[hoverIndex].x}, ${pts[hoverIndex].y - 20})`}>
                                        <rect x="-40" y="-14" width="80" height="22" rx="4" fill="var(--surface2)" stroke="var(--border)" />
                                        <text x="0" y="2" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="bold">{data[hoverIndex].toLocaleString()} {unit}</text>
                                    </g>
                                </>
                            )}
                        </>
                    )}

                    {/* X Axis Labels */}
                    <g>
                        {labels.map((l, i) => {
                            // Only show some labels if there are many (e.g. 31 days)
                            if (labels.length > 10 && i % 5 !== 0 && i !== labels.length - 1) return null;
                            return (
                                <text key={i} x={pts[i].x} y={H + 24} textAnchor="middle" style={{ transition: "all 0.2s", fontSize: 11.5, fill: hoverIndex === i ? color : "var(--muted2)", fontWeight: hoverIndex === i ? 800 : 600 }}>{l}</text>
                            );
                        })}
                    </g>
                </svg>
                {showLegend && (
                    <div style={{ marginTop: 20, display: "flex", gap: 20, fontSize: 11, fontWeight: 700 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted2)" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                            {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted2)", opacity: 0.5 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--muted2)" }} />
                            {t.vsYesterday}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="section-title">{title}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="topbar-badge">2026</span>
                    {isAllZero && (
                        <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted2)", background: "var(--surface2)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 20 }}>
                            {t.noDataPeriod}
                        </span>
                    )}
                </div>
            </div>
            <div style={{ padding: "16px 20px 12px" }} dir="ltr">
                <svg viewBox={`0 0 1000 ${H}`} width="100%" height={H} xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: "visible", cursor: "crosshair" }}
                    onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <defs>
                        <linearGradient id={`lcg-${(title || '').replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.40" />
                            <stop offset="70%" stopColor={color} stopOpacity="0.06" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                        <filter id={`lcf-${(title || '').replace(/[^a-zA-Z0-9]/g, '')}`} x="-10%" y="-10%" width="120%" height="120%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Horizontal grid lines + Y-axis labels */}
                    {[0, 0.25, 0.5, 0.75, 1].map(pct => {
                        const gy = PY + (1 - pct) * (H - PY - 8);
                        const gv = Math.round(pct * max);
                        const label = gv >= 1000000 ? `${(gv / 1000000).toFixed(1)}M`
                            : gv >= 1000 ? `${(gv / 1000).toFixed(0)}K`
                                : `${gv}`;
                        return (
                            <g key={pct}>
                                <line x1={PX} y1={gy} x2={1000} y2={gy}
                                    stroke="var(--border)"
                                    strokeWidth={pct === 0 ? 1 : 0.4}
                                    strokeDasharray={pct === 0 ? undefined : "5 8"} />
                                <text x={PX - 8} y={gy} textAnchor="end" dominantBaseline="middle"
                                    style={{ fontSize: 11, fill: "var(--muted2)", fontWeight: 700 }}>
                                    {label}
                                </text>
                            </g>
                        );
                    })}

                    {isAllZero ? (
                        <text x="500" y={H / 2} textAnchor="middle" dominantBaseline="middle"
                            style={{ fontSize: 13, fill: "var(--muted2)", fontWeight: 500 }}>
                            {t.noDataPeriod}
                        </text>
                    ) : (
                        <>
                            {/* Area fill */}
                            <path d={fillPath} fill={`url(#lcg-${(title || '').replace(/[^a-zA-Z0-9]/g, '')})`} />
                            {/* Stroke line with glow */}
                            <path d={linePath} fill="none" stroke={color} strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round"
                                filter={`url(#lcf-${(title || '').replace(/[^a-zA-Z0-9]/g, '')})`} />
                            {/* Hover crosshair */}
                            {hoverIndex !== null && (
                                <line x1={pts[hoverIndex].x} y1={PY}
                                    x2={pts[hoverIndex].x} y2={H - 4}
                                    stroke={color} strokeWidth="1"
                                    strokeDasharray="4 5" opacity="0.5" />
                            )}
                            {/* Data points with outer halo on hover */}
                            {pts.map((p, i) => (
                                <g key={i}>
                                    {hoverIndex === i && (
                                        <circle cx={p.x} cy={p.y} r={12}
                                            fill={color} opacity={0.15} />
                                    )}
                                    <circle cx={p.x} cy={p.y}
                                        r={hoverIndex === i ? 6 : 3.5}
                                        fill={hoverIndex === i ? color : "var(--surface)"}
                                        stroke={color} strokeWidth="2.5"
                                        style={{ transition: "r 0.2s cubic-bezier(0.34,1.56,0.64,1), fill 0.15s" }} />
                                </g>
                            ))}
                            {/* Tooltip */}
                            {hoverIndex !== null && (() => {
                                const tx = Math.min(Math.max(pts[hoverIndex].x, 50), 950);
                                const ty = pts[hoverIndex].y - 42;
                                const val = data[hoverIndex];
                                const valStr = val >= 1000000 ? `${(val / 1000000).toFixed(2)}M`
                                    : val >= 1000 ? `${(val / 1000).toFixed(0)}K`
                                        : `${val}`;
                                return (
                                    <g style={{ pointerEvents: "none" }}>
                                        <rect x={tx - 48} y={ty} width={96} height={34} rx={10}
                                            fill="var(--surface)" stroke={color} strokeWidth="1.5" />
                                        <text x={tx} y={ty + 14} textAnchor="middle"
                                            fill={color} fontSize="12" fontWeight="800">{valStr}</text>
                                        <text x={tx} y={ty + 27} textAnchor="middle"
                                            fill="var(--muted2)" fontSize="9" fontWeight="600">
                                            {labels[hoverIndex]}
                                        </text>
                                    </g>
                                );
                            })()}
                        </>
                    )}

                    {/* X-axis labels */}
                    {labels.map((l, i) => {
                        return (
                            <text key={i} x={pts[i]?.x ?? 0} y={H + 14} textAnchor="middle"
                                style={{ fontSize: 11.5, fill: hoverIndex === i ? color : "var(--muted2)", fontWeight: hoverIndex === i ? 800 : 600, transition: "fill 0.2s" }}>
                                {l}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}


/* ─────────── BAR CHART — Premium Edition ─────────── */
function BarChart({ data, labels, color = "#10b981", title, height = 260 }) {
    const [hovered, setHovered] = useState(null);

    // Smart Y-axis: clean integer ticks
    const rawMax = Math.max(...data, 1);
    const getSmartStep = (m) => {
        const magnitudes = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
        for (let s of magnitudes) {
            if (m / s <= 6) return s;
        }
        return Math.ceil(m / 5000) * 1000;
    };
    const step = getSmartStep(rawMax);
    const maxVal = Math.ceil(rawMax / step) * step;
    const yTicks = [];
    for (let v = 0; v <= maxVal; v += step) yTicks.push(v);

    const W = 660, H = height;
    const PL = 44, PR = 12, PT = 24, PB = 28;
    const chartW = W - PL - PR;
    const chartH = H - PT - PB;
    const n = data.length;
    const slotW = chartW / n;
    const barW = Math.max(4, Math.min(14, slotW * 0.55));
    const gId = `bcg${(title || 'x').replace(/\W/g, '')}`;

    const bx = (i) => PL + i * slotW + slotW / 2 - barW / 2;
    const by = (val) => PT + chartH - (val / maxVal) * chartH;
    const bh = (val) => Math.max(3, (val / maxVal) * chartH);

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="section-title">{title}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "var(--muted2)" }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: color, opacity: 0.85 }} />
                        Réservations / jour
                    </div>
                    <span className="topbar-badge">2026</span>
                </div>
            </div>
            <div style={{ padding: "16px 20px 8px", marginTop: "auto" }} dir="ltr">
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block", overflow: "visible" }}
                    onMouseLeave={() => setHovered(null)}>
                    <defs>
                        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="1" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.28" />
                        </linearGradient>
                        <linearGradient id={`${gId}h`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="1" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
                        </linearGradient>
                        <filter id={`${gId}f`} x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Y-axis: integer labels + dashed grid */}
                    {yTicks.map((val) => {
                        const y = PT + chartH - (val / maxVal) * chartH;
                        return (
                            <g key={val}>
                                <line x1={PL} y1={y} x2={W - PR} y2={y}
                                    stroke="var(--border)"
                                    strokeWidth={val === 0 ? 1 : 0.4}
                                    strokeDasharray={val === 0 ? undefined : "4 8"}
                                    opacity={val === 0 ? 1 : 0.5} />
                                <text x={PL - 8} y={y} textAnchor="end" dominantBaseline="middle"
                                    style={{ fontSize: 10, fill: "var(--muted2)", fontWeight: 600 }}>
                                    {val}
                                </text>
                            </g>
                        );
                    })}

                    {/* Bars */}
                    {data.map((val, i) => {
                        const x = bx(i), y = by(val), barHeight = bh(val);
                        const cx = x + barW / 2;
                        const r = Math.min(barW / 2, 5);
                        const isHov = hovered === i;
                        return (
                            <g key={i} style={{ cursor: "pointer" }} onMouseEnter={() => setHovered(i)}>
                                {/* Ghost track */}
                                <rect x={x} y={PT} width={barW} height={chartH} rx={r}
                                    fill={isHov ? `${color}15` : "transparent"}
                                    style={{ transition: "fill 0.2s" }} />
                                {/* Bar body */}
                                <rect x={x} y={y} width={barW} height={barHeight} rx={r}
                                    fill={isHov ? `url(#${gId}h)` : `url(#${gId})`}
                                    filter={isHov ? `url(#${gId}f)` : undefined}
                                    style={{ transition: "filter 0.25s" }} />
                                {/* Bright cap */}
                                <rect x={x + 1} y={y} width={barW - 2} height={2} rx={1}
                                    fill={color} opacity={isHov ? 1 : 0.65} />
                                {/* Tooltip */}
                                {isHov && (() => {
                                    const tw = 64, th = 34;
                                    let tx = cx - tw / 2;
                                    if (tx < PL) tx = PL;
                                    if (tx + tw > W - PR) tx = W - PR - tw;
                                    const ty = y - th - 8;
                                    return (
                                        <g style={{ pointerEvents: "none" }}>
                                            <rect x={tx} y={ty} width={tw} height={th} rx={8} fill={color} opacity={0.97} />
                                            <polygon points={`${cx - 5},${ty + th} ${cx + 5},${ty + th} ${cx},${ty + th + 6}`} fill={color} opacity={0.97} />
                                            <text x={tx + tw / 2} y={ty + 13} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">{val} rés.</text>
                                            <text x={tx + tw / 2} y={ty + 26} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="9" fontWeight="600">{labels[i]}</text>
                                        </g>
                                    );
                                })()}
                            </g>
                        );
                    })}

                    {/* X-axis labels (~6 visible) */}
                    {labels.map((l, i) => {
                        const every = Math.ceil(n / 6);
                        if (i % every !== 0 && i !== n - 1) return null;
                        return (
                            <text key={i} x={PL + i * slotW + slotW / 2} y={H - 4} textAnchor="middle"
                                style={{ fontSize: 9.5, fill: hovered === i ? color : "var(--muted2)", fontWeight: hovered === i ? 800 : 500, transition: "fill 0.2s" }}>
                                {l}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

/* ══════════ ULTRA MODERN HORIZONTAL BAR CHART ══════════ */
function HorizontalBarChart({ data, labels, title, color = "#3b82f6", valueSuffix = " MAD" }) {
    const [hov, setHov] = useState(null);
    const maxVal = Math.max(...data, 1);
    const rowH = 48, gap = 12, PT = 10, PB = 10;
    const W = 600, H = PT + PB + data.length * (rowH + gap);

    const getSparkline = (id, width = 80, height = 20) => {
        const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pts = [];
        for (let i = 0; i <= 4; i++) {
            pts.push({ x: (i * width) / 4, y: height * (0.2 + 0.6 * Math.abs(Math.cos(seed + i * 2))) });
        }
        let path = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i], p1 = pts[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            path += ` C ${cp1x} ${p0.y}, ${cp1x} ${p1.y}, ${p1.x} ${p1.y}`;
        }
        return path;
    };

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--card)", height: "100%", border: "1px solid var(--border)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}33` }}>
                        <Icon d={icons.car} size={18} stroke={color} />
                    </div>
                    <span className="section-title" style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px" }}>{title}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "1px", background: "var(--surface2)", padding: "4px 10px", borderRadius: 20 }}>2026</div>
            </div>

            <div style={{ flex: 1, padding: "12px 16px" }} dir="ltr">
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={color} stopOpacity="1" />
                        </linearGradient>
                        <filter id="barGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {data.map((val, i) => {
                        const y = PT + i * (rowH + gap);
                        const isH = hov === i;
                        const bw = (W - 250) * (val / maxVal);
                        const carName = labels[i] || "";
                        const brand = carName.split(' ')[0];

                        return (
                            <g key={i} style={{ cursor: "pointer" }}
                                onMouseEnter={() => setHov(i)}
                                onMouseLeave={() => setHov(null)}>

                                {/* Row background */}
                                <rect x={4} y={y} width={W - 8} height={rowH} rx={14}
                                    fill={isH ? "var(--surface2)" : "transparent"}
                                    style={{ transition: "fill 0.25s" }} />

                                {/* Rank Badge */}
                                <circle cx={30} cy={y + rowH / 2} r={14} fill={isH ? color : "var(--surface)"}
                                    stroke={isH ? "transparent" : "var(--border)"}
                                    style={{ transition: "all 0.3s" }} />
                                <text x={30} y={y + rowH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                                    fill={isH ? "#fff" : "var(--muted2)"} fontSize={12} fontWeight="900">
                                    {i + 1}
                                </text>

                                {/* Label */}
                                <text x={58} y={y + rowH / 2 - 8} dominantBaseline="middle"
                                    fill={isH ? "var(--text)" : "var(--muted2)"} fontSize={14} fontWeight="800">
                                    {carName.length > 18 ? carName.slice(0, 16) + "..." : carName}
                                </text>

                                {/* Progress Track */}
                                <rect x={58} y={y + rowH / 2 + 8} width={W - 220} height={6} rx={3}
                                    fill="var(--border)" opacity={0.4} />

                                {/* Progress Bar */}
                                <rect x={58} y={y + rowH / 2 + 8} width={bw} height={6} rx={3}
                                    fill="url(#barGrad)" filter={isH ? "url(#barGlow)" : "none"}
                                    style={{ transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />

                                {/* Sparkline */}
                                <g transform={`translate(${W - 155}, ${y + rowH / 2 - 10})`}>
                                    <path d={getSparkline(carName, 60, 20)} fill="none" stroke={color}
                                        strokeWidth="2" strokeLinecap="round" opacity={isH ? 1 : 0.25}
                                        style={{ transition: "opacity 0.3s" }} />
                                </g>

                                {/* Value */}
                                <text x={W - 20} y={y + rowH / 2} textAnchor="end" dominantBaseline="middle"
                                    fill={isH ? color : "var(--text)"} fontSize={14} fontWeight="900">
                                    {val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}
                                    <tspan fontSize={10} fill="var(--muted2)" dx={2}>{valueSuffix.trim()}</tspan>
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
/* ══════════ PREMIUM LEADERBOARD (TOP CLIENTS) ══════════ */
function PolarAreaChart({ data, labels, title, color = "#10b981", valueSuffix = " MAD" }) {
    const [hov, setHov] = useState(null);
    const maxVal = Math.max(...data, 1);

    // Generate a pseudo-random sparkline curve for each client based on their name hash
    const getSparkline = (id, width = 120, height = 30) => {
        const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pts = [];
        const step = width / 5;
        for (let i = 0; i <= 5; i++) {
            const x = i * step;
            // Deterministic but random-looking points
            const y = height * (0.3 + 0.6 * Math.abs(Math.sin(seed + i * 1.5)));
            pts.push({ x, y });
        }

        let path = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i], p1 = pts[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            path += ` C ${cp1x} ${p0.y}, ${cp1x} ${p1.y}, ${p1.x} ${p1.y}`;
        }
        return path;
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    };

    const avatarGradients = [
        "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)",
        "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
        "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)"
    ];

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--card)", height: "100%", border: "1px solid var(--border)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}33` }}>
                        <Icon d={icons.user} size={18} stroke={color} />
                    </div>
                    <span className="section-title" style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px" }}>{title}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "1px", background: "var(--surface2)", padding: "4px 10px", borderRadius: 20 }}>TOP 8</div>
            </div>

            <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                {data.map((val, i) => {
                    const isH = hov === i;
                    const pct = (val / maxVal) * 100;
                    const initials = getInitials(labels[i] || "C");
                    const grad = avatarGradients[i % avatarGradients.length];

                    return (
                        <div key={i}
                            style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "10px 12px",
                                borderRadius: 16, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                background: isH ? "var(--surface2)" : "transparent",
                                transform: isH ? "translateX(4px)" : "none",
                                cursor: "pointer",
                                border: isH ? "1px solid var(--border)" : "1px solid transparent"
                            }}
                            onMouseEnter={() => setHov(i)}
                            onMouseLeave={() => setHov(null)}
                        >
                            {/* Rank & Avatar */}
                            <div style={{ position: "relative" }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: "50%",
                                    background: grad, display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontSize: 15, fontWeight: 900,
                                    boxShadow: isH ? "0 8px 16px rgba(0,0,0,0.2)" : "none",
                                    transition: "all 0.3s"
                                }}>
                                    {initials}
                                </div>
                                <div style={{
                                    position: "absolute", bottom: -2, right: -2,
                                    width: 18, height: 18, borderRadius: "50%",
                                    background: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "var(--surface)",
                                    border: "2px solid var(--card)", fontSize: 10, fontWeight: 900,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: i < 3 ? "#000" : "var(--muted2)"
                                }}>
                                    {i + 1}
                                </div>
                            </div>

                            {/* Name & Progress */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: isH ? "var(--text)" : "var(--muted2)", transition: "color 0.2s" }}>
                                        {labels[i]?.length > 20 ? labels[i].slice(0, 18) + '...' : labels[i]}
                                    </span>
                                    <span style={{ fontSize: 13, fontWeight: 900, color: "var(--text)" }}>
                                        {val.toLocaleString()} <span style={{ fontSize: 10, color: "var(--muted2)" }}>{valueSuffix}</span>
                                    </span>
                                </div>
                                <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden", position: "relative" }}>
                                    <div style={{
                                        height: "100%", width: `${pct}%`, borderRadius: 3,
                                        background: grad,
                                        transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        boxShadow: isH ? `0 0 10px ${color}` : "none"
                                    }} />
                                </div>
                            </div>

                            {/* Sparkline (The Curve) */}
                            <div style={{ width: 80, height: 34, overflow: "visible", display: i < 5 ? "block" : "none" }}>
                                <svg width="100%" height="100%" viewBox="0 0 120 34" style={{ overflow: "visible" }}>
                                    <path d={getSparkline(labels[i] || String(i))}
                                        fill="none" stroke={isH ? color : grad.split(' ')[2]}
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                        style={{ opacity: isH ? 1 : 0.4, transition: "all 0.3s" }} />
                                    {isH && (
                                        <circle cx="120" cy={getSparkline(labels[i] || String(i)).split(' ').pop()} r="3" fill={color} />
                                    )}
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ══════════ VERTICAL BAR CHART ══════════ */
/* ══════════ BRAND AFFINITY LEADERBOARD ══════════ */
function VerticalBarChart({ data, labels, title, color = "#6366f1", valueSuffix = " loc." }) {
    const [hov, setHov] = useState(null);
    const maxVal = Math.max(...data, 1);

    // Generate a neon glowing "pulse" curve
    const getNeonCurve = (id, width = 140, height = 34) => {
        const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pts = [];
        const n = 6;
        for (let i = 0; i <= n; i++) {
            pts.push({
                x: (i * width) / n,
                y: height * (0.4 + 0.5 * Math.sin(seed + i * 1.8))
            });
        }
        let path = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i], p1 = pts[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            path += ` C ${cp1x} ${p0.y}, ${cp1x} ${p1.y}, ${p1.x} ${p1.y}`;
        }
        return path;
    };

    const brandColors = {
        Mercedes: "#f8fafc", BMW: "#3b82f6", Audi: "#ef4444", Range: "#10b981",
        Porsche: "#f59e0b", Tesla: "#ef4444", Ferrari: "#dc2626", default: color
    };

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--card)", height: "100%", border: "1px solid var(--border)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}40` }}>
                        <Icon d={icons.trending} size={18} stroke={color} />
                    </div>
                    <span className="section-title" style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.5px" }}>{title}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "1px", background: "var(--surface2)", padding: "4px 10px", borderRadius: 20 }}>TOP RANK</div>
            </div>

            <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                {data.map((val, i) => {
                    const isH = hov === i;
                    const brand = labels[i] || "Brand";
                    const bColor = brandColors[brand.split(' ')[0]] || brandColors.default;
                    const pct = (val / maxVal) * 100;

                    return (
                        <div key={i}
                            style={{
                                display: "flex", alignItems: "center", gap: 16, padding: "12px 14px",
                                borderRadius: 20, transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
                                background: isH ? "rgba(255,255,255,0.03)" : "transparent",
                                border: isH ? `1px solid ${color}33` : "1px solid transparent",
                                boxShadow: isH ? `0 10px 30px -10px ${color}22` : "none",
                                cursor: "pointer"
                            }}
                            onMouseEnter={() => setHov(i)}
                            onMouseLeave={() => setHov(null)}
                        >
                            {/* Brand Badge */}
                            <div style={{
                                width: 48, height: 48, borderRadius: 16,
                                background: isH ? bColor : "var(--surface2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.3s",
                                transform: isH ? "rotate(8deg) scale(1.1)" : "none",
                                border: `1px solid ${isH ? bColor : "var(--border)"}`
                            }}>
                                <span style={{ color: isH ? "#000" : "var(--text)", fontSize: 20, fontWeight: 900 }}>{brand[0]}</span>
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 900, color: isH ? "var(--text)" : "var(--muted2)", marginBottom: 4 }}>{brand}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ fontSize: 12, fontWeight: 800, color }}>{val} <span style={{ fontSize: 10, color: "var(--muted2)" }}>{valueSuffix}</span></div>
                                    <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--border)", overflow: "hidden" }}>
                                        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
                                    </div>
                                </div>
                            </div>

                            {/* Neon Curve */}
                            <div style={{ width: 100, height: 40, overflow: "visible" }}>
                                <svg width="100%" height="100%" viewBox="0 0 140 40" style={{ overflow: "visible" }}>
                                    <defs>
                                        <filter id={`neon-${i}`}>
                                            <feGaussianBlur stdDeviation="3" result="glow" />
                                            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
                                        </filter>
                                    </defs>
                                    <path d={getNeonCurve(brand)}
                                        fill="none" stroke={color} strokeWidth="3"
                                        strokeLinecap="round" opacity={isH ? 1 : 0.4}
                                        filter={isH ? `url(#neon-${i})` : "none"}
                                        style={{ transition: "all 0.3s" }} />
                                </svg>
                            </div>

                            {/* Rank */}
                            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--surface2)", opacity: 0.5, fontStyle: "italic", marginLeft: 4 }}>
                                #{i + 1}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ══════════ DONUT CHART ══════════ */
function DonutChart({ data, labels, colors, title }) {
    const [hov, setHov] = useState(null);
    const total = data.reduce((a, b) => a + b, 0);
    const toXY = (cx, cy, r, deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };
    const arc = (cx, cy, r, s, e) => {
        const p1 = toXY(cx, cy, r, e - 0.4);
        const p2 = toXY(cx, cy, r, s + 0.4);
        const lg = e - s > 180 ? 1 : 0;
        return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${lg} 0 ${p2.x} ${p2.y}`;
    };
    let acc = 0;
    const segs = data.map((v, i) => {
        const pct = ((v / total) * 100).toFixed(1);
        const s = acc, e = acc + (v / total) * 360;
        acc = e;
        return { v, label: labels[i], pct, s, e, color: colors[i] };
    });
    const sz = 320, cx = sz / 2, cy = sz / 2, r = 110, sw = 28;
    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="section-title" style={{ fontSize: 20 }}>{title}</span>
                <span className="topbar-badge">2026</span>
            </div>
            <div style={{ display: "flex", flex: 1, padding: "20px 16px", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
                <div style={{ position: "relative", width: sz, height: sz, flexShrink: 0 }}>
                    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} dir="ltr">
                        <defs>
                            {segs.map((s, j) => (
                                <filter key={j} id={`dg${j}`}>
                                    <feGaussianBlur stdDeviation="6" result="b" />
                                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            ))}
                        </defs>
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={sw} opacity={0.25} />
                        {segs.map((s, j) => {
                            const isH = hov === j;
                            return (
                                <path key={j} d={arc(cx, cy, r, s.s, s.e)} fill="none"
                                    stroke={s.color} strokeWidth={isH ? sw + 6 : sw} strokeLinecap="round"
                                    filter={isH ? `url(#dg${j})` : undefined}
                                    style={{ opacity: hov !== null && !isH ? 0.4 : 1, transition: "stroke-width 0.25s, opacity 0.25s", cursor: "pointer" }}
                                    onMouseEnter={() => setHov(j)} onMouseLeave={() => setHov(null)} />
                            );
                        })}
                    </svg>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            {hov !== null ? segs[hov].label : "TOTAL"}
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text)", lineHeight: 1.1 }}>
                            {hov !== null ? segs[hov].v : total}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: hov !== null ? segs[hov].color : "var(--muted2)" }}>
                            {hov !== null ? `${segs[hov].pct}%` : "réservations"}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 130 }}>
                    {segs.map((s, j) => {
                        const isH = hov === j;
                        return (
                            <div key={j} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "5px 10px", borderRadius: 8, background: isH ? "var(--surface2)" : "transparent", cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={() => setHov(j)} onMouseLeave={() => setHov(null)}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: 14, fontWeight: isH ? 800 : 600, color: isH ? "var(--text)" : "var(--muted2)" }}>{s.label}</span>
                                </div>
                                <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>{s.v} ({s.pct}%)</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ══════════ ULTRA MODERN STACKED BAR CHART ══════════ */
/* ══════════ ULTRA MODERN STACKED BAR CHART ══════════ */
function StackedBarChart({ months, series, title }) {
    const [hov, setHov] = useState(null);
    const totals = months.map((_, mi) => series.reduce((s, sr) => s + sr.values[mi], 0));
    const maxVal = Math.max(...totals, 1);
    const W = 680, H = 400, PL = 40, PR = 10, PT = 20, PB = 60;
    const cW = W - PL - PR, cH = H - PT - PB, n = months.length;
    const slW = cW / n, bW = Math.max(14, Math.min(32, slW * 0.5));
    const bx = i => PL + i * slW + slW / 2 - bW / 2;

    return (
        <div className="card" style={{ padding: 0, overflow: "hidden", background: "var(--card)", height: "100%", border: "1px solid var(--border)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#6366f1", boxShadow: `0 0 12px #6366f1` }} />
                    <span className="section-title" style={{ fontSize: 18, fontWeight: 900 }}>{title}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    {series.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 800, color: "var(--muted2)", textTransform: "uppercase" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
                            {s.label}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: "16px 12px 0" }} dir="ltr">
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} xmlns="http://www.w3.org/2000/svg" onMouseLeave={() => setHov(null)}>
                    <defs>
                        {series.map((s, i) => (
                            <linearGradient key={i} id={`stacked-${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={s.color} stopOpacity="1" />
                                <stop offset="100%" stopColor={s.color} stopOpacity="0.6" />
                            </linearGradient>
                        ))}
                        <filter id="pillarGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Grid lines */}
                    {[0, 0.5, 1].map(v => (
                        <line key={v} x1={PL} y1={PT + cH * (1 - v)} x2={W - PR} y2={PT + cH * (1 - v)} stroke="var(--border)" strokeOpacity={0.2} strokeDasharray="4 4" />
                    ))}

                    {months.map((mon, mi) => {
                        const isH = hov === mi;
                        const x = bx(mi);
                        let curY = PT + cH;
                        return (
                            <g key={mi} style={{ cursor: "pointer" }} onMouseEnter={() => setHov(mi)}>
                                <rect x={PL + mi * slW + 2} y={PT} width={slW - 4} height={cH} rx={14}
                                    fill={isH ? "var(--surface2)" : "transparent"} opacity={0.3} style={{ transition: "fill 0.3s" }} />

                                {series.map((sr, si) => {
                                    const h = (sr.values[mi] / maxVal) * cH;
                                    if (h < 1) return null;
                                    const y = curY - h;
                                    curY = y;
                                    const isTop = si === series.length - 1 || series.slice(si + 1).every(s => s.values[mi] === 0);

                                    return (
                                        <rect key={si} x={x} y={y} width={bW} height={h} rx={isTop ? bW / 2 : 0}
                                            fill={`url(#stacked-${si})`} filter={isH ? "url(#pillarGlow)" : "none"}
                                            style={{ transition: "all 0.3s", opacity: isH ? 1 : 0.8 }} />
                                    );
                                })}
                            </g>
                        );
                    })}

                    {months.map((mon, mi) => (
                        <text key={mi} x={PL + mi * slW + slW / 2} y={H - 25} textAnchor="middle"
                            style={{ fontSize: 10, fill: hov === mi ? "var(--text)" : "var(--muted2)", fontWeight: hov === mi ? 900 : 700, transition: "fill 0.2s" }}>
                            {mon?.slice(0, 3)}
                        </text>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function CarModal({ car, onClose, onSave, t, dark }) {
    const [form, setForm] = useState(car || { name: "", plate: "", category: "Manuel", price: "", fuel: "Essence", seats: 5, status: "available", city: "", photos: [], startDate: "", endDate: "" });
    const [drag, setDrag] = useState(false);
    const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const addPhotos = (files) => {
        const selected = Array.from(files).slice(0, 6 - (form.photos || []).length);
        selected.forEach(f => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const base64Url = canvas.toDataURL("image/jpeg", 0.7);
                    setForm(prev => ({
                        ...prev,
                        photos: [...(prev.photos || []), { url: base64Url, name: f.name, id: Date.now() + Math.random() }]
                    }));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(f);
        });
    };
    const removePhoto = (id) => setForm(f => ({ ...f, photos: f.photos.filter(p => p.id !== id) }));

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <div>
                        <div className="modal-title">{car ? t.modCarModTitle : t.modCarAddTitle}</div>
                        <div className="modal-subtitle">{car ? t.editCarSubtitle : t.addCarSubtitle}</div>
                    </div>
                    <button className="modal-close" onClick={onClose}><Icon d={icons.x} size={16} /></button>
                </div>

                {/* PHOTO UPLOAD */}
                <div style={{ marginBottom: 22 }}>
                    <label className="form-label" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                        {t.carPhotos}
                        <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted2)", marginInlineStart: 4 }}>({(form.photos || []).length}/6)</span>
                    </label>
                    <div
                        className={`photo-upload-zone${drag ? " drag-over" : ""}`}
                        onDragOver={e => { e.preventDefault(); setDrag(true); }}
                        onDragLeave={() => setDrag(false)}
                        onDrop={e => { e.preventDefault(); setDrag(false); addPhotos(e.dataTransfer.files); }}
                    >
                        <input type="file" accept="image/*" multiple onChange={e => addPhotos(e.target.files)} />
                        <div className="upload-icon-wrap">
                            <Icon d={icons.upload} size={26} stroke="#fff" />
                        </div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{t.dragPhotos}</div>
                        <div style={{ fontSize: 12, color: "var(--muted2)" }}>ou <span style={{ color: "var(--accent)", fontWeight: 700 }}>{t.clickBrowse}</span> · JPG, PNG, WEBP</div>
                    </div>
                    {(form.photos || []).length > 0 && (
                        <div className="photo-grid">
                            {form.photos.map((p, i) => (
                                <div key={p.id} className="photo-thumb-wrap">
                                    <img src={p.url} alt={p.name} />
                                    {i === 0 && (
                                        <div className="photo-main-badge">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            &nbsp;{t.mainPhoto}
                                        </div>
                                    )}
                                    <button className="photo-thumb-del" onClick={() => removePhoto(p.id)}>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group"><label className="form-label">{t.carName}</label><input className="form-input" value={form.name} onChange={e => handleChange("name", e.target.value)} placeholder="Mercedes-Benz G-Class" /></div>
                    <div className="form-group field-plate"><label className="form-label">{t.plate}</label><input className="form-input" value={form.plate} onChange={e => handleChange("plate", e.target.value)} placeholder="M-GX-0001" /></div>
                </div>
                <div className="form-row">
                    <div className="form-group"><label className="form-label">{t.colCategory}</label><select className="form-input form-select" value={form.category} onChange={e => handleChange("category", e.target.value)}>{["Manuel", "Automatique"].map(c => <option key={c}>{c}</option>)}</select></div>
                    <div className="form-group"><label className="form-label">{t.colFuel}</label><select className="form-input form-select" value={form.fuel} onChange={e => handleChange("fuel", e.target.value)}>{["Essence", "Diesel", "Hybride", "Électrique"].map(c => <option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="form-row">
                    <div className="form-group"><label className="form-label">Prix / jour (MAD)</label><input className="form-input" type="number" value={form.price} onChange={e => handleChange("price", e.target.value)} placeholder="500" /></div>
                    <div className="form-group"><label className="form-label">{t.seats}</label><input className="form-input" type="number" value={form.seats} onChange={e => handleChange("seats", e.target.value)} /></div>
                </div>
                <div className="form-row">
                    <div className="form-group field-city"><label className="form-label">{t.colCity}</label><input className="form-input" type="text" value={form.city} onChange={e => handleChange("city", e.target.value)} placeholder="Casablanca" /></div>
                    <div className="form-group">
                        <label className="form-label">{t.colStatus}</label>
                        <select className="form-input form-select" value={form.status} onChange={e => handleChange("status", e.target.value)}>
                            {["available", "rented", "maintenance"].map(s => (
                                <option key={s} value={s}>{t["status" + s.charAt(0).toUpperCase() + s.slice(1)]}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {(form.status === "rented" || form.status === "maintenance") && (
                    <div className="form-row" style={{ animation: "fadeUp .3s ease", marginBottom: 12 }}>
                        <div className="form-group">
                            <label className="form-label">{t.startDate}</label>
                            <input type="date" className="form-input" value={form.startDate || ""} onChange={e => handleChange("startDate", e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t.endDate}</label>
                            <input type="date" className="form-input" value={form.endDate || ""} onChange={e => handleChange("endDate", e.target.value)} />
                        </div>
                    </div>
                )}
                <div className="modal-footer-actions" style={{ display: "flex", gap: 12, marginTop: 24 }}>
                    <button className="btn btn-ghost" style={{ flex: 1, borderRadius: "50px", fontSize: 15 }} onClick={onClose}>{t.cancelBtn}</button>
                    <button
                        className="btn btn-accent btn-ultra btn-premium-shine"
                        style={{
                            flex: 2,
                            background: dark ? "linear-gradient(135deg, #4f46e5 0%, #1d1f8aff 100%)" : "linear-gradient(135deg, #059669 0%, #0faa36b9 50%, #197553ff 100%)",
                            boxShadow: dark ? "0 8px 20px rgba(29,31,138,0.3)" : "0 8px 20px rgba(16, 185, 129, 0.4)",
                            borderRadius: "50px",
                            border: "none",
                            fontSize: 18,
                            fontWeight: 900,
                            color: "#fff"
                        }}
                        onClick={() => { onSave(form); onClose(); }}
                    >
                        <span style={{ marginInlineStart: 6 }}>{car ? t.saveBtn : t.addCarBtn}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* Exchange rates relative to MAD (1 MAD = X foreign) */
const EXCHANGE_RATES = {
    MAD: 1,
    AED: 0.3671,   // 1 MAD ≈ 0.3671 AED
    USD: 0.0999,   // 1 MAD ≈ 0.10 USD
    EUR: 0.0919,   // 1 MAD ≈ 0.092 EUR
    GBP: 0.0789,   // 1 MAD ≈ 0.079 GBP
    CHF: 0.0892,   // 1 MAD ≈ 0.089 CHF
    CAD: 0.1365,   // 1 MAD ≈ 0.137 CAD
    SAR: 0.3748,   // 1 MAD ≈ 0.375 SAR
    QAR: 0.3639,   // 1 MAD ≈ 0.364 QAR
    KWD: 0.0307,   // 1 MAD ≈ 0.031 KWD
    TRY: 3.23,     // 1 MAD ≈ 3.23 TRY
    AFN: 7.09,     // 1 MAD ≈ 7.09 AFN
    ALL: 9.36,     // 1 MAD ≈ 9.36 ALL
    AMD: 38.8,     // 1 MAD ≈ 38.8 AMD
};
const getRate = (code) => EXCHANGE_RATES[code] ?? 1;

const CURRENCIES_LIST = [
    { code: "MAD", translations: { fr: "Dirham Marocain", en: "Moroccan Dirham", ar: "درهم مغربي" } },
    { code: "AED", translations: { fr: "Dirham des Émirats", en: "UAE Dirham", ar: "درهم إماراتي" } },
    { code: "USD", translations: { fr: "Dollar US", en: "US Dollar", ar: "دولار أمريكي" }, symbol: "$" },
    { code: "EUR", translations: { fr: "Euro", en: "Euro", ar: "يورو" }, symbol: "€" },
    { code: "GBP", translations: { fr: "Livre Sterling", en: "British Pound", ar: "جنيه إسترليني" }, symbol: "£" },
    { code: "CHF", translations: { fr: "Franc Suisse", en: "Swiss Franc", ar: "فرنك سويسري" } },
    { code: "CAD", translations: { fr: "Dollar Canadien", en: "Canadian Dollar", ar: "دولار كندي" }, symbol: "CA$" },
    { code: "SAR", translations: { fr: "Riyal Saoudien", en: "Saudi Riyal", ar: "ريال سعودي" } },
    { code: "QAR", translations: { fr: "Riyal Qatari", en: "Qatari Riyal", ar: "ريال قطري" } },
    { code: "KWD", translations: { fr: "Dinar Koweïtien", en: "Kuwaiti Dinar", ar: "دينار كويتي" } },
    { code: "TRY", translations: { fr: "Livre Turque", en: "Turkish Lira", ar: "ليرة تركية" } },
    { code: "AFN", translations: { fr: "Afghani Afghan", en: "Afghan Afghani", ar: "أفغاني أفغانستان" }, symbol: "؋" },
    { code: "ALL", translations: { fr: "Lek Albanais", en: "Albanian Lek", ar: "ليك ألباني" } },
    { code: "AMD", translations: { fr: "Dram Arménien", en: "Armenian Dram", ar: "درام أرميني" }, symbol: "֏" },
];

function DashboardPage({ dark, t, lang, cars = [], currency, setCurrency, currentMonth, currentYear, reservationsList = [] }) {
    const localizedDays = lang === 'ar'
        ? ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"]
        : lang === 'fr'
            ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const pending = reservationsList.filter(r => r.status === "pending" || r.status === "PENDING").length;
    const available = cars.filter(c => c.status === "available").length;

    const monthName = MONTHS[currentMonth - 1];
    const displayMonth = lang === 'ar' ? `شهر ${currentMonth} / ${currentYear}` : `${monthName} ${currentYear}`;

    const now = new Date();
    const todayStr = now.toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const md = getMonthData(currentMonth, currentYear, reservationsList);
    const { bookingData, demoReservations, pendingCount,
        reservations, activeClients, totalRevenue,
        revenueChange, revenueUp, resChange, resUp, cliChange, cliUp } = md;
    // Currency conversion helpers
    const rate = getRate(currency);
    const fmtD = (madVal) => Math.abs(madVal * rate).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const chartLabels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}/${currentMonth}/${currentYear}`);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [currencySearch, setCurrencySearch] = useState("");

    const filteredCurrencies = CURRENCIES_LIST.filter(c => {
        const name = c.translations[lang] || c.translations['en'];
        return name.toLowerCase().includes(currencySearch.toLowerCase()) ||
            c.code.toLowerCase().includes(currencySearch.toLowerCase());
    });

    const filterBtnBase = {
        height: "36px", padding: "0 16px", borderRadius: "10px",
        display: "flex", gap: "8px", alignItems: "center",
        cursor: "pointer", transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
        fontSize: "13px", fontWeight: "650", letterSpacing: "0.01em",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    };
    const activeWeekStyle = dark ? {
        ...filterBtnBase,
        background: "rgba(99, 102, 241, 0.15)",
        border: "2.5px solid #6366f1",
        color: "#fff",
        boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
    } : {
        ...filterBtnBase,
        background: "rgba(79, 70, 229, 0.08)",
        border: "2.5px solid #4f46e5",
        color: "#3730a3",
        boxShadow: "0 4px 12px rgba(79,70,229,0.15)",
    };

    const inactiveWeekStyle = dark ? {
        ...filterBtnBase,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.4)",
        boxShadow: "none",
    } : {
        ...filterBtnBase,
        background: "rgba(0,0,0,0.02)",
        border: "1px solid rgba(0,0,0,0.1)",
        color: "rgba(0,0,0,0.4)",
        boxShadow: "none",
    };
    const currencyHoverOn = dark
        ? { borderColor: "rgba(16,185,129,0.6)", boxShadow: "0 4px 16px rgba(16,185,129,0.25), inset 0 1px 0 rgba(255,255,255,0.08)", background: "linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.12) 100%)" }
        : { borderColor: "rgba(16,185,129,0.55)", boxShadow: "0 4px 16px rgba(16,185,129,0.2)", background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)" };
    const currencyHoverOff = dark
        ? { borderColor: "rgba(16,185,129,0.3)", boxShadow: "0 2px 8px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.06)", background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.07) 100%)" }
        : { borderColor: "rgba(16,185,129,0.35)", boxShadow: "0 2px 8px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.5)", background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.06) 100%)" };
    const applyHover = (e, styles) => Object.assign(e.currentTarget.style, styles);


    const currencyBtnStyle = dark ? {
        ...filterBtnBase,
        background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.07) 100%)",
        border: "1px solid rgba(16,185,129,0.3)",
        color: "rgba(110,240,190,0.95)",
        boxShadow: "0 2px 8px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
    } : {
        ...filterBtnBase,
        background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.06) 100%)",
        border: "1px solid rgba(16,185,129,0.35)",
        color: "#065f46",
        boxShadow: "0 2px 8px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
    };

    return (
        <div className="page tab-content">
            <div className="dashboard-filters-row" style={{ display: "flex", justifyContent: "flex-start", gap: "12px", marginBottom: 20, marginTop: -12, position: "relative", zIndex: 999, bottom: "1px" }}>
                {/* Today's Date Display — static and premium */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    borderRadius: "14px", padding: "8px 18px",
                    background: dark ? "rgba(96,165,250,0.12)" : "rgba(37, 99, 235, 0.08)",
                    border: `1.5px solid ${dark ? "rgba(96,165,250,0.3)" : "rgba(37, 99, 235, 0.25)"}`,
                    boxShadow: dark ? "0 4px 15px rgba(0,0,0,0.2)" : "0 4px 12px rgba(37, 99, 235, 0.1)",
                    color: dark ? "#93c5fd" : "#2563eb"
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span style={{ fontSize: "14px", fontWeight: "850", letterSpacing: "0.02em" }}>
                        {todayStr}
                    </span>
                    <span className="topbar-badge" style={{ fontSize: "10px", background: dark ? "rgba(147, 197, 253, 0.2)" : "rgba(37, 99, 235, 0.15)", color: "inherit", border: "none", padding: "2px 8px" }}>{t.today || "AUJOURD'HUI"}</span>
                </div>


                {/* Currency Dropdown */}
                <div style={{ position: "relative" }}>
                    <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} style={currencyBtnStyle}
                        onMouseEnter={e => applyHover(e, currencyHoverOn)}
                        onMouseLeave={e => applyHover(e, currencyHoverOff)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? "#34d399" : "#059669"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span style={{ fontWeight: 800, letterSpacing: "0.04em" }}>{currency}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><polyline points={isCurrencyOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline></svg>
                    </button>

                    {isCurrencyOpen && (
                        <div className="currency-dropdown" style={{
                            position: "absolute", top: "calc(100% + 8px)",
                            ...(lang === 'ar' ? { right: 0 } : { left: 0 }),
                            width: "280px",
                            background: "var(--surface)",
                            borderRadius: "12px", border: "1px solid var(--border)",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                            overflow: "hidden"
                        }}>
                            <div style={{ padding: "12px 12px 6px" }}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 8,
                                    background: dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.5)", border: "1px solid var(--accent)",
                                    borderRadius: "8px", padding: "8px 12px"
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <input
                                        autoFocus
                                        value={currencySearch}
                                        onChange={e => setCurrencySearch(e.target.value)}
                                        placeholder={t.searchCurrency}
                                        style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: "13px", color: "var(--text)" }}
                                    />
                                </div>
                            </div>
                            <div style={{ maxHeight: "260px", overflowY: "auto", padding: "6px 0" }}>
                                {filteredCurrencies.map(c => {
                                    const isSelected = c.code === currency;
                                    return (
                                        <div
                                            key={c.code}
                                            onClick={() => {
                                                setCurrency(c.code);
                                                localStorage.setItem("appCurrency", c.code);
                                                setIsCurrencyOpen(false);
                                                setCurrencySearch("");
                                            }}
                                            style={{
                                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                                padding: "10px 16px", cursor: "pointer",
                                                background: isSelected ? "rgba(99, 102, 241, 0.1)" : "transparent",
                                                color: isSelected ? "var(--accent)" : "var(--text)",
                                                fontSize: "13px", transition: "background 0.2s"
                                            }}
                                            onMouseEnter={e => !isSelected && (e.currentTarget.style.background = "var(--surface2)")}
                                            onMouseLeave={e => !isSelected && (e.currentTarget.style.background = "transparent")}
                                        >
                                            <span style={{ fontWeight: isSelected ? 700 : 500 }}>
                                                <span className="mobile-hide">{c.translations[lang] || c.translations['en']} (</span>
                                                {c.code}{c.symbol ? ` ${c.symbol}` : ""}
                                                <span className="mobile-hide">)</span>
                                            </span>
                                            {isSelected && (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                    );
                                })}
                                {filteredCurrencies.length === 0 && (
                                    <div style={{ padding: "16px", textAlign: "center", color: "var(--muted)", fontSize: "13px" }}>No currency found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="stats-grid mobile-hide">
                <StatCard label={t.revenueMonth} value={`${currency} ${fmtD(totalRevenue)}`} change={revenueChange} up={revenueUp} color="#10b981" icon={<Icon d={icons.dollar} size={16} />} />
                <StatCard label={t.reservations} value={String(reservations)} change={resChange} up={resUp} color="#3b82f6" icon={<Icon d={icons.reservations} size={16} />} />
                <StatCard label={t.carsAvailable} value={`${available} /${cars.length}`} color="#a855f7" icon={<Icon d={icons.cars} size={16} />} />
                <StatCard label={t.activeClients} value={String(activeClients)} change={cliChange} up={cliUp} color="#f59e0b" icon={<Icon d={icons.users} size={16} />} />
            </div>

            <RevenueSummary
                dark={dark} t={t} lang={lang} currency={currency}
                currentMonth={currentMonth}
                currentYear={currentYear}
                reservationsList={reservationsList}
            />

            <div className="grid-3" style={{ marginBottom: "24px" }}>
                <BarChart data={bookingData} labels={chartLabels} color={dark ? "#60a5fa" : "#10b981"} title={t.monthlyBookings} height={360} t={t} />

                {/* Recent reservations — vary by month */}
                {(() => {
                    return (
                        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
                            <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span className="section-title">{t.latestReservations}</span>
                                {pendingCount > 0 && <span style={{ background: "rgba(245,158,11,.15)", color: "#f59e0b", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(245,158,11,.25)", animation: "badgePulse 2s infinite" }}>{pendingCount} {t.pendingBadge || "en attente"}</span>}
                            </div>
                            {demoReservations.map((r, i) => (
                                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < demoReservations.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "background .2s" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                    <div style={{ width: 36, height: 36, borderRadius: 12, background: `${r.color}20`, border: `1px solid ${r.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: r.color, fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{r.avatar}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{r.client}</div>
                                        <div style={{ fontSize: 11, color: "var(--muted2)" }}>{r.car} · {r.from}–{r.to}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>{currency} {fmtD(r.amount)}</div>
                                        <span className={`badge ${r.status}`}><span className="badge-dot" />{r.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>

            <div className="grid-2">
                <div className="card" style={{ padding: 0, alignSelf: "flex-start" }}>
                    <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid var(--border)" }}>
                        <div className="section-title">{t.fleetStatus}</div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                        {[
                            { label: t.statusAvailable, count: cars.filter(c => c.status === "available").length, color: "#10b981" },
                            { label: t.statusRented, count: cars.filter(c => c.status === "rented").length, color: "#3b82f6" },
                            { label: t.statusReserved, count: cars.filter(c => c.status === "reserved").length, color: "#a855f7" },
                            { label: t.statusMaintenance, count: cars.filter(c => c.status === "maintenance").length, color: "#f59e0b" },
                        ].map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}`, flexShrink: 0 }} />
                                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                                <div style={{ flex: 2, height: 6, borderRadius: 3, background: "var(--surface2)", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${(s.count / (cars.length || 1)) * 100}%`, background: s.color, borderRadius: 3, transition: "width 1s ease" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: s.color, minWidth: 16, textAlign: "right" }}>{s.count}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: 4, padding: "20px 0 0", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "center" }}>
                            <div style={{ fontSize: 12, color: "var(--muted2)", fontWeight: 600 }}>{cars.length} {t.totalVehicles}</div>
                        </div>
                    </div>
                </div>

                {/* Activity feed */}
                {(() => {
                    /* ── Animated SVG icon components ── */
                    const IconCar = ({ color }) => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "svg-fly 2s ease-in-out infinite" }}>
                            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" />
                            <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: "spin 1.4s linear infinite", transformOrigin: "6.5px 16.5px" }} />
                            <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: "spin 1.4s linear infinite", transformOrigin: "16.5px 16.5px" }} />
                        </svg>
                    );
                    const IconCheck = ({ color }) => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "svg-pulse 2s ease-in-out infinite" }}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="9 12 11.5 14.5 16 9.5" />
                        </svg>
                    );
                    const IconCard = ({ color }) => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "svg-shake 3s ease-in-out infinite" }}>
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                    );
                    const IconWrench = ({ color }) => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "svg-shake 2.5s ease-in-out infinite" }}>
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                    );
                    const IconX = ({ color }) => (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "svg-pulse 1.8s ease-in-out infinite" }}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    );
                    const DEMO_ACTIVITY = isMockUser() ? [
                        { SvgIcon: IconCar, bg: "rgba(59,130,246,0.12)", color: "#3b82f6", text: "Nouvelle réservation — Dacia Logan", sub: "Yassine Benali · il y a 12 min", dot: "#3b82f6" },
                        { SvgIcon: IconCheck, bg: "rgba(16,185,129,0.12)", color: "#10b981", text: "Réservation confirmée — Hyundai Tucson", sub: "Karim Hajji · il y a 35 min", dot: "#10b981" },
                        { SvgIcon: IconCard, bg: "rgba(168,85,247,0.12)", color: "#a855f7", text: "Paiement reçu — 1 200 MAD", sub: "Sara Alami · il y a 1h", dot: "#a855f7" },
                        { SvgIcon: IconWrench, bg: "rgba(245,158,11,0.12)", color: "#f59e0b", text: "Véhicule en maintenance — Peugeot 208", sub: "Atelier · il y a 2h", dot: "#f59e0b" },
                        { SvgIcon: IconX, bg: "rgba(239,68,68,0.1)", color: "#ef4444", text: "Réservation annulée — Peugeot 208", sub: "Meryem Naji · il y a 3h", dot: "#ef4444" },
                    ] : [];
                    return (
                        <div className="card" style={{ padding: 0 }}>
                            <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid var(--border)" }}>
                                <span className="section-title">{t.recentActivity}</span>
                            </div>
                            <div style={{ padding: "4px 20px 8px" }}>
                                {DEMO_ACTIVITY.length === 0 ? (
                                    <div style={{ padding: "30px 20px", textAlign: "center", color: "var(--muted2)", fontSize: "13px" }}>
                                        {t.noActivity || "Aucune activité récente"}
                                    </div>
                                ) : (
                                    DEMO_ACTIVITY.map((a, i) => (
                                        <div key={i} className="activity-item" style={{ gap: 12, paddingTop: 14, paddingBottom: 14 }}>
                                            <div className="activity-icon" style={{ background: a.bg, color: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <a.SvgIcon color={a.color} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.text}</div>
                                                <div style={{ fontSize: 11, color: "var(--muted2)", display: "flex", alignItems: "center", gap: 5 }}>
                                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.dot, display: "inline-block", flexShrink: 0, animation: "pulse 2s infinite" }} />
                                                    {a.sub}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div >
    );
}

function CarsPage({ t, cars, onSave, onDelete, dark }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [modal, setModal] = useState(null); // null | "add" | car object
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        // Scroll lock disabled to ensure modal-overlay behaves correctly on all viewports
    }, [modal, confirm]);

    const filtered = cars.filter(c => {
        const nameStr = c.name || "";
        const plateStr = c.plate || "";
        const matchSearch = nameStr.toLowerCase().includes(search.toLowerCase()) || plateStr.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const handleSave = (form) => {
        onSave(form);
    };
    const handleDelete = (id) => { onDelete(id); setConfirm(null); };
    const cycleStatus = (car) => {
        const order = ["available", "rented", "maintenance"];
        const next = order[(order.indexOf(car.status) + 1) % order.length];
        onSave({ ...car, status: next });
    };

    return (
        <div className="page tab-content">
            {modal && <CarModal car={modal === "add" ? null : modal} onClose={() => setModal(null)} onSave={handleSave} t={t} dark={dark} />}
            {confirm && (
                <div className="modal-overlay" onClick={() => setConfirm(null)}>
                    <div className="modal" style={{ maxWidth: 400 }}>
                        <div className="modal-header"><span className="modal-title">{t.delTitle}</span><button className="modal-close" onClick={() => setConfirm(null)}><Icon d={icons.x} size={16} /></button></div>
                        <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 24 }}>{t.delDesc1} <strong>{confirm.name}</strong> {t.delDesc2}</p>
                        <div style={{ display: "flex", gap: 10 }}><button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setConfirm(null)}>{t.cancelBtn}</button><button className="btn btn-danger" style={{ flex: 1 }} onClick={() => handleDelete(confirm.id)}>{t.deleteBtn}</button></div>
                    </div>
                </div>
            )}

            <div className="cars-header" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div className="search-bar" style={{ flex: 1 }}>
                    <Icon d={icons.search} size={18} stroke="var(--accent)" opacity="0.7" />
                    <input placeholder={t.searchCar} value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <div className="filter-pills">
                    {["all", "available", "rented", "maintenance"].map(s => (
                        <button
                            key={s}
                            className={`filter-pill ${filterStatus === s ? "active" : ""}`}
                            onClick={() => setFilterStatus(s)}
                        >
                            {filterStatus === s && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
                            {s === "all" ? t.filterAll : (s === "available" ? t.statusAvailable : (s === "rented" ? t.statusRented : t.statusMaintenance))}
                        </button>
                    ))}
                </div>

                <button
                    className="btn btn-accent btn-ultra btn-premium-shine add-car-btn"
                    onClick={() => setModal("add")}
                    style={{
                        background: dark ? "linear-gradient(135deg, #4f46e5 0%, #1d1f8aff 100%)" : "linear-gradient(135deg, rgb(5, 150, 105), rgb(25, 117, 83))",
                        boxShadow: dark ? "0 8px 20px rgba(99,102,241,0.25)" : "0 8px 20px rgba(16, 185, 129, 0.4)",
                        padding: "15px 35px",
                        borderRadius: "50px",
                        border: "none",
                        color: "#fff"
                    }}
                >
                    <Icon d={icons.plus} size={18} stroke="#fff" />
                    <span style={{ marginInlineStart: 6, fontWeight: 900, fontFamily: "'Syne', sans-serif", fontSize: 15 }}>{t.addBtn}</span>
                </button>
            </div>

            <div className="card cars-table-desktop" style={{ padding: 0 }}>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th><div className="header-badge" style={{ color: "#316cf4", borderInlineStart: "3px solid #316cf4" }}>{t.colCar}</div></th>
                                <th><div className="header-badge" style={{ color: "#a855f7", borderInlineStart: "3px solid #a855f7" }}>{t.colCategory}</div></th>
                                <th><div className="header-badge" style={{ color: "#10b981", borderInlineStart: "3px solid #10b981" }}>{t.colPrice}</div></th>
                                <th><div className="header-badge" style={{ color: "#f59e0b", borderInlineStart: "3px solid #f59e0b" }}>{t.colCity}</div></th>
                                <th><div className="header-badge" style={{ color: "#06b6d4", borderInlineStart: "3px solid #06b6d4" }}>{t.colFuel}</div></th>
                                <th><div className="header-badge" style={{ color: "#f43f5e", borderInlineStart: "3px solid #f43f5e" }}>{t.colStatus}</div></th>
                                <th style={{ textAlign: "end" }}><div className="header-badge" style={{ color: "var(--muted)", borderInlineStart: "3px solid var(--border)" }}>{t.colActions}</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((car, idx) => (
                                <tr key={car.id} className="table-row-animate" style={{ animationDelay: `${idx * 0.05 + 0.1}s` }}>
                                    <td>
                                        <div className="car-cell">
                                            <div className="car-thumb" style={{ background: `${car.color}20`, border: `1px solid ${car.color}35`, overflow: "hidden", borderRadius: 10, width: 52, height: 38 }}>
                                                {car.photos && car.photos[0]
                                                    ? <img src={car.photos[0].url} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                    : <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke={car.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "auto", display: "block", marginTop: 8 }}>
                                                        <path d="M13 14H8m9 0h3v-3a1 1 0 0 0-.8-1L15 9 12.3 5.6a2 2 0 0 0-1.6-.8H8.3a2 2 0 0 0-1.6.8L4 9l-4.16.86A1 1 0 0 0 1 11v3h2" />
                                                        <circle cx="5.5" cy="14.5" r="2" /><circle cx="15.5" cy="14.5" r="2" />
                                                    </svg>
                                                }
                                            </div>
                                            <div>
                                                <div className="car-name">{car.name}</div>
                                                <div className="car-plate">{car.plate}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 600 }}>{car.category}</span></td>
                                    <td><span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "var(--accent)" }}>{car.price} Dh</span></td>
                                    <td><span style={{ fontSize: 13, color: "var(--muted2)" }}>{car.city || "—"}</span></td>
                                    <td><span style={{ fontSize: 13 }}>{car.fuel}</span></td>
                                    <td>
                                        <button onClick={() => cycleStatus(car)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                                                <span className={`badge ${car.status}`}>
                                                    <span className="badge-dot" />
                                                    {car.status === "available" ? t.statusAvailable : (car.status === "rented" ? t.statusRented : t.statusMaintenance)}
                                                </span>
                                                {(car.startDate || car.endDate) && (car.status === "rented" || car.status === "maintenance") && (
                                                    <div style={{ fontSize: 10, fontWeight: 750, color: "var(--muted2)", opacity: 0.8, letterSpacing: "-0.02em" }}>
                                                        {car.startDate || '...'} → {car.endDate || '...'}
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setModal(car)} title={t.modCarModTitle}><Icon d={icons.edit} size={14} /></button>
                                            <button className="btn btn-danger btn-icon btn-sm" onClick={() => setConfirm(car)} title={t.deleteBtn}><Icon d={icons.trash} size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan={7}><div className="empty-state"><Icon d={icons.cars} size={40} /><div style={{ fontSize: 14, fontWeight: 600 }}>{t.emptyCars}</div></div></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── MOBILE CARDS ── */}
            <div className="cars-mobile-list">
                {filtered.length === 0 ? (
                    <div className="empty-state" style={{ padding: "40px 20px" }}>
                        <Icon d={icons.cars} size={40} />
                        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12, color: "var(--muted2)" }}>{t.emptyCars}</div>
                    </div>
                ) : filtered.map((car, idx) => (
                    <div key={car.id} style={{
                        background: "var(--card)", border: "1px solid var(--border)",
                        borderRadius: 20, padding: "16px", marginBottom: 12,
                        display: "flex", flexDirection: "column", gap: 12,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        animation: `cardEntrance 0.4s ease ${idx * 0.06}s both`
                    }}>
                        {/* Car photo + name + status */}
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                            <div style={{
                                width: 72, height: 52, borderRadius: 12, flexShrink: 0,
                                background: `${car.color || "var(--accent)"}20`,
                                border: `1px solid ${car.color || "var(--accent)"}40`,
                                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                {car.photos && car.photos[0]
                                    ? <img src={car.photos[0].url} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <Icon d={icons.cars} size={26} stroke={car.color || "var(--accent)"} />
                                }
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 800, fontSize: 15, fontFamily: "'Syne',sans-serif", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{car.name || "—"}</div>
                                <div style={{ fontSize: 11, color: "var(--muted2)", fontFamily: "monospace", marginTop: 2 }}>{car.plate || "—"}</div>
                            </div>
                            <button onClick={() => cycleStatus(car)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                                    <span className={`badge ${car.status}`}>
                                        <span className="badge-dot" />
                                        {car.status === "available" ? t.statusAvailable : (car.status === "rented" ? t.statusRented : t.statusMaintenance)}
                                    </span>
                                    {(car.startDate || car.endDate) && (car.status === "rented" || car.status === "maintenance") && (
                                        <div style={{ fontSize: 9.5, fontWeight: 750, color: "var(--muted2)", opacity: 0.8 }}>
                                            {car.startDate || '...'} → {car.endDate || '...'}
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                            {[
                                { label: t.colPrice, value: `${car.price || "—"} Dh`, color: "var(--accent)" },
                                { label: t.colFuel, value: car.fuel || "—", color: "var(--text)" },
                                { label: t.colCity, value: car.city || "—", color: "var(--muted2)" },
                            ].map(item => (
                                <div key={item.label} style={{ background: "var(--surface2)", borderRadius: 10, padding: "8px 10px" }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: item.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: 10 }}>
                            <button className="btn btn-ghost" style={{ flex: 1, borderRadius: 12, height: 44, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => setModal(car)}>
                                <Icon d={icons.edit} size={14} /> {t.modCarModTitle.replace('✏️ ', '')}
                            </button>
                            <button className="btn btn-danger" style={{ flex: 1, borderRadius: 12, height: 44, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => setConfirm(car)}>
                                <Icon d={icons.trash} size={14} /> {t.deleteBtn}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReservationDetailsModal({ reservation, onClose, t, handle }) {
    if (!reservation) return null;

    return (
        <>
            <div className="modal-overlay" style={{ zIndex: 99999, color: "var(--text)" }} onClick={onClose}>
                <div style={{
                    width: "100%", maxWidth: 850, margin: "auto",
                    background: "var(--card)", borderRadius: 24, border: "1px solid var(--border)",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                    display: "flex", flexDirection: "column"
                }} onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--card)", zIndex: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${reservation.color}15`, border: `1px solid ${reservation.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: reservation.color, fontWeight: 900, fontSize: 20 }}>{reservation.avatar}</div>
                            <div>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>{reservation.client}</div>
                                <div style={{ fontSize: 13, color: "var(--muted2)", display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                                    <span style={{ fontFamily: "monospace", opacity: 0.8 }}>{reservation.id}</span>
                                    <span>•</span>
                                    <span className={`badge ${reservation.status}`} style={{ display: "inline-flex", padding: "4px 8px" }}><span className="badge-dot" />{reservation.status}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--border)"} onMouseLeave={e => e.currentTarget.style.background = "var(--surface2)"}>
                            <Icon d={icons.x} size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 32 }}>

                        {/* Reservation Info Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                            <div style={{ background: "var(--surface2)", padding: 20, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Véhicule</div>
                                <div style={{ fontSize: 16, fontWeight: 800 }}>{reservation.car}</div>
                            </div>
                            <div style={{ background: "var(--surface2)", padding: 20, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Période de location</div>
                                <div style={{ fontSize: 16, fontWeight: 800 }}>{reservation.from} <span style={{ color: "var(--muted2)", margin: "0 4px" }}>→</span> {reservation.to}</div>
                            </div>
                            <div style={{ background: "var(--surface2)", padding: 20, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Montant Total</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)" }}>{reservation.amount.toLocaleString()} Dh</div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                                    <Icon d={["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"]} size={16} />
                                </div>
                                Documents du Client
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                <div style={{ background: "var(--surface2)", padding: 20, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Carte d'Identité Nationale (CIN)</div>
                                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "monospace", letterSpacing: "1px" }}>{reservation.cinNumber || "Non spécifié"}</div>
                                </div>
                                <div style={{ background: "var(--surface2)", padding: 20, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Numéro de Permis de Conduire</div>
                                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "monospace", letterSpacing: "1px" }}>{reservation.drivingLicenseNumber || "Non spécifié"}</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        {reservation.status === "pending" && (
                            <div style={{ display: "flex", gap: 16, marginTop: 8, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                                <button className="btn btn-accent" style={{ flex: 1, height: 54, borderRadius: 14, fontSize: 15, fontWeight: 800, gap: 10 }} onClick={() => { handle(reservation.id, "confirmed"); onClose(); }}>
                                    <Icon d={icons.check} size={18} /> Confirmer la réservation
                                </button>
                                <button className="btn btn-ghost" style={{ flex: 1, height: 54, borderRadius: 14, fontSize: 15, fontWeight: 800, gap: 10, border: "1px solid var(--border)", background: "var(--surface2)" }} onClick={() => { handle(reservation.id, "cancelled"); onClose(); }}>
                                    <Icon d={icons.x} size={18} /> Refuser
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
}

function ReservationsPage({ t, currentMonth, currentYear, cars = [], agencyData }) {
    const [reservations, setReservations] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedResv, setSelectedResv] = useState(null);

    useEffect(() => {
        if (!agencyData || !agencyData.id) return;
        fetch(`http://localhost:8080/api/reservations/agency/${agencyData.id}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const formatted = data.map(r => ({
                        id: "RES-" + (r.id || Math.floor(Math.random() * 10000)),
                        realId: r.id,
                        client: (r.clientFirstName || "") + " " + (r.clientLastName || "").trim() || "Client Inconnu",
                        car: r.carId ? (cars?.find(c => String(c.id) === String(r.carId))?.name || "Véhicule " + r.carId) : "Véhicule",
                        from: r.startDate || "—",
                        to: r.endDate || "—",
                        amount: r.totalPrice || 0,
                        status: (r.status || "pending").toLowerCase(),
                        cinNumber: r.cin,
                        drivingLicenseNumber: r.licenseNumber,
                        avatar: ((r.clientFirstName?.[0] || "") + (r.clientLastName?.[0] || "")).toUpperCase() || "?",
                        color: ["#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ef4444"][Math.floor(Math.random() * 5)]
                    }));
                    setReservations(formatted.reverse());
                } else {
                    setReservations(isMockUser() ? getMonthData(currentMonth, currentYear).demoReservations : []);
                }
            })
            .catch(err => {
                console.error("Error fetching reservations:", err);
                setReservations(isMockUser() ? getMonthData(currentMonth, currentYear).demoReservations : []);
            });
    }, [currentMonth, currentYear, agencyData?.id]);

    const handle = (id, action) => {
        setReservations(rs => rs.map(r => r.id === id ? { ...r, status: action } : r));
    };
    const filtered = reservations.filter(r => filterStatus === "all" || r.status === filterStatus);

    return (
        <div className="page tab-content">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                {["all", "pending", "confirmed", "cancelled"].map(s => {
                    const counts = { all: reservations.length, pending: reservations.filter(r => r.status === "pending").length, confirmed: reservations.filter(r => r.status === "confirmed").length, cancelled: reservations.filter(r => r.status === "cancelled").length };
                    return (
                        <button key={s} className="btn btn-ghost btn-sm" style={{ borderColor: filterStatus === s ? "var(--accent)" : "var(--border)", color: filterStatus === s ? "var(--accent)" : "var(--muted2)", gap: 6 }} onClick={() => setFilterStatus(s)}>
                            {s === "all" ? t.filterAllResv : (s === "pending" ? t.pendingBadge : s)}
                            <span style={{ background: filterStatus === s ? "var(--accent)" : "var(--border2)", color: filterStatus === s ? "#fff" : "var(--muted2)", fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 10 }}>{counts[s]}</span>
                        </button>
                    );
                })}
            </div>

            <ReservationDetailsModal
                reservation={selectedResv}
                onClose={() => setSelectedResv(null)}
                t={t}
                handle={handle}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map(r => (
                    <div key={r.id} className="card resv-card" style={{ padding: 0, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }} onClick={() => setSelectedResv(r)} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: `${r.color}20`, border: `1px solid ${r.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: r.color, fontWeight: 900, fontSize: 15, flexShrink: 0 }}>{r.avatar}</div>
                            <div style={{ flex: 1, minWidth: 200 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16 }}>{r.client}</span>
                                    <span style={{ fontSize: 11, color: "var(--muted2)", fontFamily: "monospace" }}>{r.id}</span>
                                </div>
                                <div style={{ fontSize: 13, color: "var(--muted2)" }}>{r.car} · <span style={{ color: r.color, fontWeight: 700 }}>{r.from} → {r.to}</span></div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "var(--accent)" }}>{r.amount.toLocaleString()} Dh</div>
                                    <span className={`badge ${r.status}`}><span className="badge-dot" />{r.status}</span>
                                </div>
                                {r.status === "pending" && (
                                    <div style={{ display: "flex", gap: 8 }} onClick={e => e.stopPropagation()}>
                                        <button className="btn btn-accent btn-sm" onClick={() => handle(r.id, "confirmed")}><Icon d={icons.check} size={13} /> {t.acceptBtn}</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handle(r.id, "cancelled")}><Icon d={icons.x} size={13} /> {t.refuseBtn}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <div className="empty-state" style={{ background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)" }}><Icon d={icons.reservations} size={40} /><div style={{ fontSize: 14, fontWeight: 600 }}>{t.emptyResv}</div></div>}
            </div>
        </div>
    );
}

function ClientDetailsModal({ client, onClose, t }) {
    if (!client) return null;
    const tierColor = { Platinum: "#bf7fff", Gold: "#f59e0b", Silver: "#9ca3af" };

    return (
        <div className="modal-overlay" style={{ zIndex: 99999, color: "var(--text)" }} onClick={onClose}>
            <div style={{
                width: "100%", maxWidth: 600, margin: "auto",
                background: "var(--card)", borderRadius: 24, border: "1px solid var(--border)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                display: "flex", flexDirection: "column"
            }} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--card)", zIndex: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${client.color}20`, border: `1px solid ${client.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: client.color, fontWeight: 900, fontSize: 20 }}>{client.initials}</div>
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>{client.name}</div>
                            <div style={{ fontSize: 13, color: "var(--muted2)", display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                                <span style={{ fontSize: 10, fontWeight: 800, color: tierColor[client.tier], background: `${tierColor[client.tier]}15`, border: `1px solid ${tierColor[client.tier]}30`, padding: "2px 8px", borderRadius: 8 }}>{client.tier}</span>
                                <span>•</span>
                                <span>{client.city}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "var(--border)"} onMouseLeave={e => e.currentTarget.style.background = "var(--surface2)"}>
                        <Icon d={icons.x} size={18} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Metrics Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ background: "var(--surface2)", padding: 18, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Total Dépensé</div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)" }}>{client.spend}</div>
                        </div>
                        <div style={{ background: "var(--surface2)", padding: 18, borderRadius: 16, border: "1px solid var(--border)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Locations Totales</div>
                            <div style={{ fontSize: 20, fontWeight: 900 }}>{client.totalRentals} locations</div>
                        </div>
                    </div>

                    {/* Contact details */}
                    <div style={{ background: "var(--surface2)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
                        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", fontSize: 13, fontWeight: 700 }}>Coordonnées & Documents</div>
                        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--muted2)" }}>Email</span>
                                <span style={{ fontWeight: 600 }}>{client.email}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--muted2)" }}>Téléphone</span>
                                <span style={{ fontWeight: 600 }}>{client.phone}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--muted2)" }}>Adresse & Ville</span>
                                <span style={{ fontWeight: 600, textAlign: 'right' }}>{client.address && client.address !== "—" ? `${client.address}, ` : ""}{client.city}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--muted2)" }}>Carte d'Identité (CIN)</span>
                                <span style={{ fontWeight: 600, fontFamily: "monospace" }}>{client.cin}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--muted2)" }}>Permis de Conduire</span>
                                <span style={{ fontWeight: 600, fontFamily: "monospace" }}>{client.license}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CustomersPage({ t, clients = [] }) {
    const [search, setSearch] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedTier, setSelectedTier] = useState("All");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const filtered = clients.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
        const matchesTier = selectedTier === "All" || c.tier === selectedTier;
        return matchesSearch && matchesTier;
    });

    const tierColor = { Platinum: "#bf7fff", Gold: "#f59e0b", Silver: "#9ca3af" };

    const platinumCount = clients.filter(c => c.tier === "Platinum").length;
    const goldCount = clients.filter(c => c.tier === "Gold").length;
    const silverCount = clients.filter(c => c.tier === "Silver").length;

    const tierStats = [
        { t: "Platinum", c: "#bf7fff", n: platinumCount },
        { t: "Gold", c: "#f59e0b", n: goldCount },
        { t: "Silver", c: "#9ca3af", n: silverCount }
    ];

    const topSpenders = [...clients].sort((a, b) => b.spendVal - a.spendVal).slice(0, 3);

    return (
        <div className="page tab-content">
            <div style={{ display: "flex", gap: 12, marginBottom: 20, position: "relative" }}>
                <div className="search-bar" style={{ flex: 1 }}>
                    <Icon d={icons.search} size={16} stroke="var(--muted2)" />
                    <input placeholder={t.searchClient} value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={{ position: "relative" }}>
                    <button className="btn btn-ghost" onClick={() => setShowFilterDropdown(!showFilterDropdown)}>
                        <Icon d={icons.filter} size={14} /> {selectedTier === "All" ? t.filterBtn : selectedTier}
                    </button>
                    {showFilterDropdown && (
                        <div style={{
                            position: "absolute", right: 0, top: "100%", marginTop: 8,
                            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.3)", zIndex: 100, minWidth: 140, overflow: "hidden"
                        }}>
                            {["All", "Platinum", "Gold", "Silver"].map(tier => (
                                <div key={tier} style={{
                                    padding: "10px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    background: selectedTier === tier ? "rgba(16,185,129,0.15)" : "transparent",
                                    color: selectedTier === tier ? "var(--accent)" : "var(--text)",
                                    transition: "all 0.2s"
                                }} onClick={() => { setSelectedTier(tier); setShowFilterDropdown(false); }}
                                    onMouseEnter={e => e.currentTarget.style.background = selectedTier === tier ? "rgba(16,185,129,0.15)" : "var(--surface2)"}
                                    onMouseLeave={e => e.currentTarget.style.background = selectedTier === tier ? "rgba(16,185,129,0.15)" : "transparent"}>
                                    {tier === "All" ? t.filterAll || "Tous" : tier}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid-2">
                <div className="card" style={{ padding: 0 }}>
                    {filtered.map((c, i) => (
                        <div key={c.name} className="client-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }} onClick={() => setSelectedClient(c)}>
                            <div className="client-avatar" style={{ background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color }}>{c.initials}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.name}</div>
                                <div style={{ fontSize: 12, color: "var(--muted2)" }}>{c.email}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 3 }}>{c.spend}</div>
                                <span style={{ fontSize: 10, fontWeight: 800, color: tierColor[c.tier], background: `${tierColor[c.tier]}15`, border: `1px solid ${tierColor[c.tier]}30`, padding: "2px 8px", borderRadius: 8 }}>{c.tier}</span>
                            </div>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: 8 }}>
                                <Icon d={icons.arrow} size={13} />
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="empty-statee" style={{ padding: 40 }}>
                            <Icon d={icons.users} size={40} stroke="var(--border2)" />
                            <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: "var(--muted2)" }}>{t.emptyClients}</div>
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="card" style={{ padding: "20px" }}>
                        <div className="section-title" style={{ marginBottom: 16 }}>{t.tierDist}</div>
                        {tierStats.map(({ t, c, n }) => (
                            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{t}</span>
                                <div style={{ flex: 3, height: 6, borderRadius: 3, background: "var(--surface2)" }}>
                                    <div style={{ height: "100%", width: `${clients.length > 0 ? (n / clients.length) * 100 : 0}%`, background: c, borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: c }}>{n}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card" style={{ padding: "20px" }}>
                        <div className="section-title" style={{ marginBottom: 16 }}>{t.topSpenders}</div>
                        {topSpenders.map((c, idx) => (
                            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: idx < topSpenders.length - 1 ? 14 : 0 }}>
                                <div style={{
                                    width: 24, height: 24, borderRadius: "50%",
                                    background: idx === 0 ? "rgba(245,158,11,0.15)" : idx === 1 ? "rgba(156,163,175,0.15)" : "rgba(180,83,9,0.15)",
                                    color: idx === 0 ? "#d97706" : idx === 1 ? "#4b5563" : "#b45309",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 12, fontWeight: 900
                                }}>
                                    {idx + 1}
                                </div>
                                <div className="client-avatar" style={{ width: 32, height: 32, borderRadius: 10, fontSize: 12, background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color }}>{c.initials}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: 13, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{c.name}</div>
                                    <div style={{ fontSize: 11, color: "var(--muted2)" }}>{c.totalRentals} locations</div>
                                </div>
                                <div style={{ fontWeight: 800, fontSize: 13, color: "var(--accent)" }}>{c.spend}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Client Details Modal */}
            {selectedClient && <ClientDetailsModal client={selectedClient} onClose={() => setSelectedClient(null)} t={t} />}
        </div>
    );
}

function AnalyticsPage({ dark, t, reservationsList = [], cars = [] }) {
    const stats = useMemo(() => {
        // Basic numbers
        const confirmedResv = reservationsList.filter(r => r.status === "CONFIRMED" || r.status === "confirmed");
        const totalRevenue = confirmedResv.reduce((sum, r) => sum + (r.totalPrice || 0), 0);
        const totalBookings = reservationsList.length;
        const avgRev = totalBookings > 0 ? Math.round(totalRevenue / (confirmedResv.length || 1)) : 0;

        // Utilization Rate
        const rentedCars = cars.filter(c => c.status === 'rented').length;
        const useRate = cars.length > 0 ? Math.round((rentedCars / cars.length) * 100) : 0;

        // Monthly Revenue — Janvier → Décembre 2026 (fixe)
        const CHART_YEAR = 2026;
        const locale = t.lang === 'ar' ? 'ar-MA' : 'fr-FR';
        const monthlyRev = Array(12).fill(0);
        const monthLabels = [];
        for (let m = 0; m < 12; m++) {
            const d = new Date(CHART_YEAR, m, 1);
            monthLabels.push(d.toLocaleDateString(locale, { month: 'short' }));
            monthlyRev[m] = confirmedResv.filter(r => {
                const rd = new Date(r.startDate);
                return rd.getMonth() === m && rd.getFullYear() === CHART_YEAR;
            }).reduce((sum, r) => sum + (r.totalPrice || 0), 0);
        }

        // Quarter Data — année 2026
        const quarterData = [0, 0, 0, 0];
        reservationsList.forEach(r => {
            const d = new Date(r.startDate);
            if (d.getFullYear() !== CHART_YEAR) return;
            const q = Math.floor(d.getMonth() / 3);
            if (q >= 0 && q < 4) quarterData[q]++;
        });


        // Profitable Cars
        const carRevenue = {};
        confirmedResv.forEach(r => {
            const carName = cars.find(c => String(c.id) === String(r.carId))?.name || `Véhicule ${r.carId}`;
            carRevenue[carName] = (carRevenue[carName] || 0) + (r.totalPrice || 0);
        });
        const profitableCars = Object.entries(carRevenue)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

        // Top Clients
        const clientRevenue = {};
        confirmedResv.forEach(r => {
            const name = `${r.clientFirstName || ''} ${r.clientLastName || ''}`.trim() || `Client ${r.clientId}`;
            clientRevenue[name] = (clientRevenue[name] || 0) + (r.totalPrice || 0);
        });
        const topClientsList = Object.entries(clientRevenue)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

        // Rented Brands
        const brandBookings = {};
        reservationsList.forEach(r => {
            const carName = cars.find(c => String(c.id) === String(r.carId))?.name || "";
            const brand = carName.split(' ')[0] || "Autre";
            if (brand) brandBookings[brand] = (brandBookings[brand] || 0) + 1;
        });
        const rentedBrandsList = Object.entries(brandBookings)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

        // Maintenance Series
        const maintCars = cars.filter(c => c.status === 'maintenance' || c.status === 'MAINTENANCE');
        const maintSeriesList = maintCars.slice(0, 5).map((c, i) => ({
            label: c.name,
            color: ["#f59e0b", "#3b82f6", "#10b981", "#a855f7", "#ec4899"][i % 5],
            values: Array(12).fill(0).map((_, idx) => (idx === new Date().getMonth() ? 1 : 0))
        }));
        if (maintSeriesList.length === 0) {
            maintSeriesList.push({ label: t.noMaint || "Aucune", color: dark ? "#333" : "#eee", values: Array(12).fill(0) });
        }

        return {
            totalRevenue,
            totalBookings,
            avgRev,
            useRate,
            monthlyRev,
            monthLabels,  // Jan → Dec 2026
            quarterData,
            profitableCarsData: profitableCars.map(c => c[1]),
            profitableCarsLabels: profitableCars.map(c => c[0]),
            topClientsData: topClientsList.map(c => c[1]),
            topClientsLabels: topClientsList.map(c => c[0]),
            rentedBrandsData: rentedBrandsList.map(b => b[1]),
            rentedBrandsLabels: rentedBrandsList.map(b => b[0]),
            maintSeriesList
        };
    }, [reservationsList, cars, t.lang, dark]);

    const {
        totalRevenue, totalBookings, avgRev, useRate,
        monthlyRev, monthLabels, quarterData,
        profitableCarsData, profitableCarsLabels,
        topClientsData, topClientsLabels,
        rentedBrandsData, rentedBrandsLabels,
        maintSeriesList
    } = stats;

    const fmtMAD = v => v >= 1000000 ? `${(v / 1000000).toFixed(2)} M` : v >= 1000 ? `${(v / 1000).toFixed(0)} K` : v;

    return (
        <div className="page tab-content" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* ── KPI CARDS ── */}
            <div className="stats-grid" style={{ marginBottom: 4 }}>
                <StatCard label={t.totalRevYear} value={`MAD ${fmtMAD(totalRevenue)}`} change="+0%" up color="#10b981" icon={<Icon d={icons.dollar} size={16} />} />
                <StatCard label={t.totalResv} value={String(totalBookings)} change="+0" up color="#3b82f6" icon={<Icon d={icons.calendar} size={16} />} />
                <StatCard label={t.useRate} value={`${useRate}%`} change="+0pt" up color="#a855f7" icon={<Icon d={icons.trending} size={16} />} />
                <StatCard label={t.avgRevInResv} value={`MAD ${fmtMAD(avgRev)}`} change="+0%" up color="#f59e0b" icon={<Icon d={icons.trending} size={16} />} />
            </div>

            {/* ── ROW 1 : CA mensuel + Réservations par trimestre ── */}
            <div className="grid-2">
                <LineChart
                    data={monthlyRev} labels={monthLabels}
                    color={dark ? "#60a5fa" : "#10b981"}
                    title={t.monthlyRevChart} height={340} t={t} showLegend sortable
                />
                <DonutChart
                    data={quarterData} labels={QUARTER_LABELS}
                    colors={["#f59e0b", "#3b82f6", "#10b981", "#a855f7"]}
                    title={t.bookingsQuarter}
                />
            </div>

            {/* ── ROW 2 : Voitures les plus rentables + TOP clients ── */}
            <div className="grid-2">
                <HorizontalBarChart
                    data={profitableCarsData} labels={profitableCarsLabels}
                    title={t.profitableCars} color="#3b82f6" valueSuffix=" MAD"
                />
                <PolarAreaChart
                    data={topClientsData} labels={topClientsLabels}
                    title={t.topClients} color="#10b981" valueSuffix=" MAD"
                />
            </div>

            {/* ── ROW 3 : Marques les plus louées + Maintenance par modèle ── */}
            <div className="grid-2">
                <VerticalBarChart
                    data={rentedBrandsData} labels={rentedBrandsLabels}
                    title={t.rentedBrands} color={dark ? "#818cf8" : "#6366f1"} valueSuffix=" loc."
                />
                <StackedBarChart
                    months={monthLabels} series={maintSeriesList}
                    title={t.maintenanceByModel}
                />
            </div>

        </div>
    );
}


function SettingsPage({ dark, setDark, t, agencyData, setAgencyData, lang, setLang }) {
    const [toggles, setToggles] = useState({ notifications: true, sms: false, autoAccept: false, vatInvoice: true, twoFactor: true, publicProfile: true });
    const tog = (k) => setToggles(t => ({ ...t, [k]: !t[k] }));
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        agencyName: agencyData?.agencyName || "",
        firstName: agencyData?.firstName || "",
        lastName: agencyData?.lastName || "",
        city: agencyData?.city || "",
        phone: agencyData?.phone || "",
        address: agencyData?.address || "",
        country: agencyData?.country || "",
        logo: agencyData?.logo || ""
    });

    // Only initialize formData once or when isEditing becomes false (to reset)
    useEffect(() => {
        if (!isEditing) {
            setFormData({
                agencyName: agencyData?.agencyName || "",
                firstName: agencyData?.firstName || "",
                lastName: agencyData?.lastName || "",
                city: agencyData?.city || "",
                phone: agencyData?.phone || "",
                address: agencyData?.address || "",
                country: agencyData?.country || "",
                logo: agencyData?.logo || ""
            });
        }
    }, [agencyData, isEditing]);

    const handleSave = () => {
        const token = localStorage.getItem("token");
        const newData = { ...agencyData, ...formData };

        if (token) {
            fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}`}/api/auth/agency/update-profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
                .then(async res => {
                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(`Status ${res.status}: ${text}`);
                    }
                    return res.json();
                })
                .then(savedData => {
                    setAgencyData(savedData);
                    localStorage.setItem("agencyData", JSON.stringify(savedData));
                    setIsEditing(false);
                    alert("Profil mis à jour avec succès !");
                })
                .catch(err => {
                    console.error("Error updating agency profile:", err);
                    alert(`Erreur technique : ${err.message}`);
                });
        } else {
            // Fallback for mock/local testing if no token
            setAgencyData(newData);
            localStorage.setItem("agencyData", JSON.stringify(newData));
            setIsEditing(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const optimizeImage = (base64Str, maxWidth = 200, maxHeight = 200) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Start at 0.7 quality and reduce if still too large
                let quality = 0.7;
                let dataUrl = canvas.toDataURL('image/jpeg', quality);

                // If larger than 30KB (approx 40,000 base64 chars), reduce quality
                while (dataUrl.length > 40000 && quality > 0.1) {
                    quality -= 0.1;
                    dataUrl = canvas.toDataURL('image/jpeg', quality);
                }

                const sizeKo = Math.round(dataUrl.length * 3 / 4 / 1024);
                console.log(`[Logo] Taille : ${sizeKo} Ko (Qualité: ${quality.toFixed(1)})`);

                if (sizeKo > 30) {
                    // En dernier recours, on renvoie une version très basse qualité
                    resolve(canvas.toDataURL('image/jpeg', 0.1));
                } else {
                    resolve(dataUrl);
                }
            };
        });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const optimized = await optimizeImage(reader.result);
                setFormData(f => ({ ...f, logo: optimized }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoDelete = () => {
        setFormData(f => ({ ...f, logo: "" }));
    };

    const agencyInitials = agencyData ? ((agencyData.firstName?.[0] || 'U') + (agencyData.lastName?.[0] || 'C')).toUpperCase() : 'UC';

    return (
        <div className="page tab-content">
            <div className="grid-2">
                <div>
                    <div className="settings-section">
                        <div className="settings-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Icon d={icons.users} size={18} stroke="var(--accent)" />
                                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>{t.agencyProfile}</span>
                            </div>
                            <div style={{ cursor: "pointer", background: isEditing ? "var(--accent)" : "transparent", padding: "6px", borderRadius: "8px", transition: "all 0.2s" }} onClick={handleEditToggle} title={isEditing ? "Annuler" : "Modifier"}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isEditing ? "#fff" : "var(--accent)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                            </div>
                        </div>
                        <div style={{ padding: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{ position: "relative", display: "inline-block", width: 56, height: 56, flexShrink: 0 }}>
                                    <label style={{ cursor: isEditing ? "pointer" : "default", display: "block", width: "100%", height: "100%" }}>
                                        <div style={{ width: "100%", height: "100%", borderRadius: 16, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "#fff", overflow: "hidden", opacity: isEditing ? 1 : 0.7 }}>
                                            {formData.logo ? (
                                                <img src={formData.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            ) : (
                                                agencyInitials
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} disabled={!isEditing} />
                                    </label>

                                    {formData.logo ? (
                                        isEditing && (
                                            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLogoDelete(); }} style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: 6, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, cursor: "pointer" }} title="Supprimer le logo">
                                                <Icon d={icons.trash} size={11} stroke="#fff" />
                                            </div>
                                        )
                                    ) : (
                                        isEditing && (
                                            <div style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: 6, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
                                                <Icon d={icons.upload} size={11} stroke="#fff" />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16 }}>{agencyData?.agencyName || t.agencyName}</div>
                                    <div style={{ fontSize: 12, color: "var(--muted2)" }}>{t.planPro}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">{t.agencyName}</label>
                                <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.agencyName} onChange={e => setFormData({ ...formData, agencyName: e.target.value })} placeholder="Nom de l'agence..." />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Prénom</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} placeholder="Prénom..." />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nom</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} placeholder="Nom..." />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">{t.contactEmail}</label>
                                    <input className="form-input" disabled value={agencyData?.email || ""} style={{ opacity: 0.5, pointerEvents: 'none' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t.phone || "Téléphone"}</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+212 600..." />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">{t.city}</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Casablanca..." />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t.agencyAddress || "Adresse de l'agence"}</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.address || ""} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="123 Boulevard d'Anfa..." />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">{t.country || "Pays"}</label>
                                    <input className="form-input" disabled={!isEditing} style={{ opacity: isEditing ? 1 : 0.7, pointerEvents: isEditing ? 'auto' : 'none' }} value={formData.country || ""} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="Maroc..." />
                                </div>
                            </div>

                            {isEditing && (
                                <button
                                    className="btn btn-accent btn-ultra btn-premium-shine"
                                    onClick={handleSave}
                                    style={{
                                        width: "100%",
                                        marginTop: 20,
                                        background: dark ? "linear-gradient(135deg, #5615bea4 0%, #7a06d9ff 100%)" : "linear-gradient(135deg, #059669 0%, #0faa36b9 50%, #197553ff 100%)",
                                        boxShadow: dark ? "0 3px 20px rgba(97, 6, 217, 0.77)" : "0 8px 20px rgba(16, 185, 129, 0.4)",
                                        borderRadius: "30px",
                                        border: "none",
                                        fontSize: 17,
                                        fontWeight: 900,
                                        color: "#fff",
                                        cursor: "pointer"
                                    }}
                                >
                                    <span style={{ marginLeft: 6 }}>{t.saveBtn || "Enregistrer"}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="settings-section" style={{ marginBottom: 18 }}>
                        <div className="settings-section-header">
                            <Icon d={icons.bell} size={18} stroke="var(--accent)" />
                            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>{t.notifications}</span>
                        </div>
                        {[
                            { k: "notifications", l: t.emailNotif, s: t.emailNotifSub },
                            { k: "sms", l: t.sms, s: t.smsSub },
                            { k: "autoAccept", l: t.autoAccept, s: t.autoAcceptSub },
                            { k: "vatInvoice", l: t.vatInvoice, s: t.vatInvoiceSub },
                        ].map(({ k, l, s }) => (
                            <div key={k} className="settings-row">
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700 }}>{l}</div>
                                    <div style={{ fontSize: 12, color: "var(--muted2)" }}>{s}</div>
                                </div>
                                <div className={`toggle ${toggles[k] ? "on" : "off"}`} onClick={() => tog(k)}>
                                    <div className="toggle-thumb" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="settings-section">
                        <div className="settings-section-header">
                            <Icon d={icons.settings} size={18} stroke="var(--accent)" />
                            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>{t.appearanceSec}</span>
                        </div>
                        <div className="settings-row">
                            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{t.darkMode}</div><div style={{ fontSize: 12, color: "var(--muted2)" }}>{t.darkModeSub}</div></div>
                            <div className={`toggle ${dark ? "on" : "off"}`} onClick={() => setDark(d => !d)}><div className="toggle-thumb" /></div>
                        </div>
                        <div className="settings-row">
                            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{t.twoFactor}</div><div style={{ fontSize: 12, color: "var(--muted2)" }}>{t.twoFactorSub}</div></div>
                            <div className={`toggle ${toggles.twoFactor ? "on" : "off"}`} onClick={() => tog("twoFactor")}><div className="toggle-thumb" /></div>
                        </div>
                        <div className="settings-row">
                            <div><div style={{ fontSize: 14, fontWeight: 700 }}>{t.publicProfile}</div><div style={{ fontSize: 12, color: "var(--muted2)" }}>{t.publicProfileSub}</div></div>
                            <div className={`toggle ${toggles.publicProfile ? "on" : "off"}`} onClick={() => tog("publicProfile")}><div className="toggle-thumb" /></div>
                        </div>
                    </div>

                    <div className="settings-section desktop-hide" style={{ marginTop: 18 }}>
                        <div className="settings-section-header">
                            <Icon d={icons.language || icons.settings} size={18} stroke="var(--accent)" />
                            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15 }}>Langue / Language / اللغة</span>
                        </div>
                        <div className="settings-row" style={{ display: "flex", gap: 8, padding: "4px 0" }}>
                            {[
                                { id: "fr", label: "Français", flag: "🇫🇷" },
                                { id: "en", label: "English", flag: "🇬🇧" },
                                { id: "ar", label: "العربية", flag: "🇲🇦" }
                            ].map(l => (
                                <button
                                    key={l.id}
                                    onClick={() => setLang(l.id)}
                                    style={{
                                        flex: 1,
                                        padding: "10px",
                                        borderRadius: "12px",
                                        background: lang === l.id ? "var(--bg)" : "var(--surface2)",
                                        border: lang === l.id ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
                                        color: lang === l.id ? "var(--accent)" : "var(--muted)",
                                        fontSize: 12,
                                        fontWeight: 800,
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div style={{ fontSize: 16, marginBottom: 2 }}>{l.flag}</div>
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MOBILE LOGOUT BUTTON */}
                    <div className="settings-section desktop-hide" style={{ marginTop: 18, background: "transparent", border: "none", padding: 0, boxShadow: "none" }}>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("role");
                                localStorage.removeItem("agencyData");
                                window.location.href = "/loginagence";
                            }}
                            style={{
                                width: "100%",
                                padding: "16px",
                                borderRadius: "16px",
                                background: "rgba(239, 68, 68, 0.08)",
                                border: "1.5px solid rgba(239, 68, 68, 0.2)",
                                color: "#ef4444",
                                fontSize: 15,
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            <Icon d={icons.logout} size={18} stroke="currentColor" />
                            {t.logout || "Se déconnecter"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inner component to dynamically recenter the map when coordinates change
function RecenterMap({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, 13, { duration: 1.5 });
    }, [center, map]);
    return null;
}

function MapPage({ t, cars, agencyData, lang }) {
    const defaultCenter = [33.5731, -7.5898]; // Casablanca fallback
    const [mapCars, setMapCars] = useState([]);
    const [agencyMarker, setAgencyMarker] = useState(null);
    const [flyTarget, setFlyTarget] = useState(null);
    const [clientMarker, setClientMarker] = useState(null); // Mock client

    const [routePath, setRoutePath] = useState(null); // Real driving path coords

    // Mock client: geocode a real address near the agency's city
    useEffect(() => {
        const mockAddress = `La gare de Fes, Maroc`;
        fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mockAddress)}&limit=1`,
            { headers: { 'Accept-Language': 'fr', 'User-Agent': 'RevvAgencyApp/1.0' } }
        )
            .then(r => r.json())
            .then(results => {
                if (results && results.length > 0) {
                    setClientMarker({
                        lat: parseFloat(results[0].lat),
                        lng: parseFloat(results[0].lon),
                        name: "Yassine Alaoui",
                        phone: "+212 661 234 567",
                        car: cars?.find(c => c.status === "rented")?.name || "Mercedes-Benz",
                        address: mockAddress
                    });
                }
            })
            .catch(() => { });
    }, [agencyData?.city, cars]);

    // --- Geocode Agency Address from settings ---
    useEffect(() => {
        const city = agencyData?.city || "";
        const address = agencyData?.address || "";

        // Try exact address first, then address+city, then city only
        const allQueries = [
            address,
            address && city ? `${address}, ${city}` : null,
            city
        ].filter(Boolean);
        const queries = [...new Set(allQueries)].filter(q => q.trim().length > 0);

        if (queries.length === 0) return;

        const tryGeocode = (queryList) => {
            if (queryList.length === 0) {
                console.warn("Geocoding: no results found for all queries");
                return;
            }
            const q = queryList[0];
            fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=1`,
                { headers: { 'Accept-Language': 'fr', 'User-Agent': 'RevvAgencyApp/1.0' } }
            )
                .then(r => r.json())
                .then(results => {
                    if (results && results.length > 0) {
                        const { lat, lon } = results[0];
                        const agLat = parseFloat(lat);
                        const agLng = parseFloat(lon);
                        setAgencyMarker({
                            lat: agLat,
                            lng: agLng,
                            label: agencyData?.agencyName || "Mon Agence",
                            address: q
                        });
                        setFlyTarget([agLat, agLng]);
                    } else {
                        // try next query (city only fallback)
                        tryGeocode(queryList.slice(1));
                    }
                })
                .catch(() => tryGeocode(queryList.slice(1)));
        };

        tryGeocode(queries);
    }, [agencyData?.city, agencyData?.address, agencyData?.agencyName]);

    // --- Fetch Real Driving Directions via OSRM ---
    useEffect(() => {
        if (agencyMarker && clientMarker) {
            const url = `https://router.project-osrm.org/route/v1/driving/${agencyMarker.lng},${agencyMarker.lat};${clientMarker.lng},${clientMarker.lat}?overview=full&geometries=geojson`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data && data.routes && data.routes.length > 0) {
                        // OSRM returns GeoJSON coordinates array: [lng, lat]
                        const coords = data.routes[0].geometry.coordinates;
                        // Leaflet Polyline expects [lat, lng] array
                        const mappedPath = coords.map(c => [c[1], c[0]]);
                        setRoutePath(mappedPath);
                    }
                })
                .catch(() => console.error("Could not fetch real route directions"));
        }
    }, [agencyMarker, clientMarker]);

    // Initialize car locations
    useEffect(() => {
        if (!cars || cars.length === 0) return;

        // Define Key Locations
        const agencyLat = agencyMarker?.lat || defaultCenter[0];
        const agencyLng = agencyMarker?.lng || defaultCenter[1];
        const agencyLoc = { lat: agencyLat, lng: agencyLng, label: (agencyData?.agencyName ? `Parking ${agencyData.agencyName}` : "Parking Agence") };
        const garageLoc = { lat: agencyLat + 0.035, lng: agencyLng + 0.08, label: "Garage Maintenance" };
        const clientLocs = [
            { lat: agencyLat - 0.2036, lng: agencyLng + 0.0387, label: "Aéroport Mohammed V", client: "Yassine Alaoui" },
            { lat: agencyLat + 0.0206, lng: agencyLng + 0.0144, label: "Gare Casa Port", client: "Marie Dubois" },
            { lat: agencyLat + 0.0291, lng: agencyLng - 0.0455, label: "Morocco Mall", client: "Omar Benjelloun" },
            { lat: agencyLat - 0.0069, lng: agencyLng - 0.0044, label: "Hotel Four Seasons", client: "Sophia Lahlou" },
            { lat: agencyLat - 0.003, lng: agencyLng - 0.0235, label: "CFC (Livraison)", client: "Ahmed El Fassi" }
        ];

        // Assign locations — only rented and maintenance cars appear on map
        const fixedLocs = cars
            .filter(c => c.status === "rented" || c.status === "maintenance")
            .map((c, i) => {
                let locData = {};
                if (c.status === "maintenance") {
                    locData = { lat: garageLoc.lat + (i * 0.001), lng: garageLoc.lng + (i * 0.001), locLabel: garageLoc.label, client: "—" };
                } else {
                    // Rented: show at client location
                    const cli = clientLocs[i % clientLocs.length];
                    locData = { lat: cli.lat, lng: cli.lng, locLabel: cli.label, client: cli.client };
                }
                return { ...c, ...locData };
            });

        setMapCars(fixedLocs);
    }, [cars, agencyMarker]);

    const getStatusColor = (status) => {
        if (status === "rented") return "#3b82f6"; // Blue
        return "#f59e0b"; // Amber (Maintenance)
    };

    // Stats: always computed from full cars list for the side panel
    const stats = {
        total: cars.length,
        available: cars.filter(c => c.status === "available").length,
        rented: cars.filter(c => c.status === "rented").length,
        maintenance: cars.filter(c => c.status === "maintenance").length,
    };

    return (
        <div className="page tab-content" style={{ position: "relative", height: "calc(100vh - 120px)", borderRadius: 24, overflow: "hidden", border: "1px solid var(--border)", background: "var(--card)" }}>
            <MapContainer center={defaultCenter} zoom={6} zoomControl={false} scrollWheelZoom={true} className="dark-map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ZoomControl position="bottomright" />
                {/* Auto-fly to agency location once geocoded */}
                {flyTarget && <RecenterMap center={flyTarget} />}

                {/* Agency fixed marker */}
                {agencyMarker && (() => {
                    const agencyIcon = L.divIcon({
                        className: 'map-marker-custom',
                        iconSize: [42, 42],
                        iconAnchor: [21, 21],
                        popupAnchor: [0, -24],
                        html: `<div class="map-marker-inner" style="background:linear-gradient(135deg,#6366f1,#4f46e5); box-shadow: 0 0 0 3px #fff, 0 0 20px rgba(99,102,241,0.6); position:relative;">
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                               </div>`
                    });
                    return (
                        <Marker position={[agencyMarker.lat, agencyMarker.lng]} icon={agencyIcon}>
                            <Popup>
                                <div style={{ minWidth: 180 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #e5e7eb" }}>
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#6366f1" }} />
                                        <div style={{ fontWeight: 800, fontSize: 15, fontFamily: "'Syne', sans-serif", color: "#6366f1" }}>{agencyMarker.label}</div>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#6b7280", display: "flex", gap: 6, alignItems: "flex-start" }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        <span style={{ fontWeight: 600 }}>{agencyMarker.address}</span>
                                    </div>
                                    <div style={{ marginTop: 10, fontSize: 11, fontWeight: 700, color: "#fff", background: "#6366f1", borderRadius: 6, padding: "4px 8px", display: "inline-block" }}>🏢 Siège de l'Agence</div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })()}
                {/* Animated dashed route line using REAL driving directions */}
                {routePath && (
                    <Polyline
                        positions={routePath}
                        pathOptions={{
                            color: "#f97316",
                            weight: 3,
                            opacity: 0.85,
                            dashArray: "10, 8",
                            dashOffset: "0"
                        }}
                        className="route-line-animated"
                    />
                )}

                {/* Mock Client marker */}
                {clientMarker && (() => {
                    const clientIcon = L.divIcon({
                        className: 'map-marker-custom',
                        iconSize: [38, 38],
                        iconAnchor: [19, 19],
                        popupAnchor: [0, -22],
                        html: `<div class="map-marker-pulse" style="color:#f97316; display:block;"></div>
                               <div class="map-marker-inner" style="background:linear-gradient(135deg,#f97316,#ea580c); box-shadow: 0 0 0 3px #fff, 0 0 18px rgba(249,115,22,0.6);">
                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                               </div>`
                    });
                    return (
                        <Marker position={[clientMarker.lat, clientMarker.lng]} icon={clientIcon}>
                            <Popup>
                                <div style={{ minWidth: 190 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #fee2e2" }}>
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f97316" }} />
                                        <div style={{ fontWeight: 800, fontSize: 15, fontFamily: "'Syne', sans-serif", color: "#f97316" }}>Client</div>
                                    </div>
                                    <div style={{ marginBottom: 8 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{clientMarker.name}</div>
                                        <div style={{ fontSize: 12, color: "#6b7280" }}>{clientMarker.phone}</div>
                                    </div>
                                    <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, display: "flex", gap: 4, alignItems: "center" }}>
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                        <span>{clientMarker.address}</span>
                                    </div>
                                    <div style={{ fontSize: 11, padding: "4px 8px", background: "#fff7ed", borderRadius: 6, border: "1px solid #fed7aa", color: "#c2410c", fontWeight: 700 }}>
                                        🚗 {clientMarker.car}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })()}


            </MapContainer>

            {/* Statistics Panel Overlay - always on the left */}
            <div className="mobile-hide" style={{ position: "absolute", top: 20, left: 20, background: "var(--card)", backdropFilter: "blur(20px)", padding: 24, borderRadius: 20, border: "1px solid var(--border)", width: 280, zIndex: 1000, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne', sans-serif" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
                    {t.fleetStatus || "Statut GPS Flotte"}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: "14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "var(--text)", letterSpacing: "-1px" }}>{stats.total}</div>
                    <div style={{ fontSize: 13, color: "var(--muted2)", lineHeight: 1.3, fontWeight: 600 }}>
                        {lang === 'ar' ? (
                            <React.Fragment>المركبات<br />المسجلة</React.Fragment>
                        ) : (
                            <React.Fragment>Véhicules<br />Enregistrés</React.Fragment>
                        )}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(16,185,129,0.05)", padding: "10px 14px", borderRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px rgba(16,185,129,0.5)" }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{t.statusAvailable || "Disponible"}</span>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "#10b981" }}>{stats.available}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(59,130,246,0.05)", padding: "10px 14px", borderRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 10px rgba(59,130,246,0.5)" }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{t.statusRented || "En location"}</span>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "#3b82f6" }}>{stats.rented}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,158,11,0.05)", padding: "10px 14px", borderRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 10px rgba(245,158,11,0.5)" }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{t.statusMaintenance || "Maintenance"}</span>
                        </div>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "#f59e0b" }}>{stats.maintenance}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MessagesPage({ t, dark, lang, reservationsList = [], cars = [], agencyData, navigate }) {
    const [activeChat, setActiveChat] = useState("support");
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [emojiSearch, setEmojiSearch] = useState("");
    const [emojiCat, setEmojiCat] = useState("Smileys");
    const [isGeniusActive, setIsGeniusActive] = useState(true);
    const [isThinking, setIsThinking] = useState(false);

    // Ref for scrolling
    const chatEndRef = useRef(null);

    // Lock body scroll on mobile when this page mounts!
    useEffect(() => {
        if (window.innerWidth <= 900) {
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = ""; };
        }
    }, []);

    const emojiData = {
        "Smileys": ["😊", "😂", "🤣", "🥰", "😍", "🤔", "😎", "😭", "😡", "😱", "🤫", "😴", "🥳", "🤩", "🥺", "🤤", "🥴", "🤢", "🤮", "🤧", "🤠", "🤡", "👺", "👾", "🤖", "🎃", "😺"],
        "Animals": ["🐶", "🐱", "🐨", "🐯", "🐮", "🐷", "🐵", "🐒", "🦍", "🍗", "🥩", "🥨", "🥘", "🌮", "🍣", "🍩", "🍪", "🍺", "🍷", "🥤"],
        "Travel": ["🚗", "🚕", "🚙", "🚌", "🏎️", "🛥️", "🚢", "🚂", "🚆", "🌍", "🗺️", "🏔️", "🏕️", "🏖️", "⛲", "🌌", "🗼", "🎡"],
        "Objects": ["🔑", "📍", "✉️", "📞", "🤝", "⭐", "🎉", "⚡", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💻", "📷", "📺", "🕹️", "🔋", "🔧", "🧱", "🛡️"]
    };

    const filteredEmojis = emojiSearch.trim()
        ? Object.values(emojiData).flat().filter(e => e.includes(emojiSearch))
        : emojiData[emojiCat];

    // State for discussions list
    const [discussions, setDiscussions] = useState(isMockUser() ? [
        { id: "support", name: "Support UppCar", role: "AI Genius Bot", avatar: "SU", color: dark ? "#6366f1" : "#10b981", unread: 0, online: true, lastMsg: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", time: "09:00" },
        { id: "yassine", name: "Yassine Benali", role: "Client Platinum", avatar: "YB", color: "#bf7fff", unread: 1, online: true, lastMsg: "Bonjour, puis-je prolonger ma location de la Tucson de 3 jours ?", time: "10:32" },
        { id: "sara", name: "Sara Alami", role: "Client Gold", avatar: "SA", color: "#f59e0b", unread: 0, online: false, lastMsg: "J'ai bien déposé le véhicule à l'aéroport de Marrakech.", time: "Hier" },
        { id: "karim", name: "Karim Hajji", role: "Client Gold", avatar: "KH", color: "#f59e0b", unread: 0, online: true, lastMsg: "Merci pour le service impeccable !", time: "12 Mai" }
    ] : [
        { id: "support", name: "Support UppCar", role: "AI Genius Bot", avatar: "SU", color: dark ? "#6366f1" : "#10b981", unread: 0, online: true, lastMsg: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", time: "09:00" }
    ]);

    // State for messages history
    const [messages, setMessages] = useState(isMockUser() ? {
        "support": [
            { id: 1, from: "support", text: "Bonjour ! Je suis votre assistant intelligent UppCar Genius. Comment puis-je vous aider aujourd'hui ?", time: "09:00", read: true }
        ],
        "yassine": [
            { id: 1, from: "me", text: "Bonjour Yassine, tout se passe bien avec le véhicule ?", time: "10:30", read: true },
            { id: 2, from: "yassine", text: "Bonjour, oui super ! Mais puis-je prolonger ma location de la Tucson de 3 jours ?", time: "10:32", read: false }
        ],
        "sara": [
            { id: 1, from: "me", text: "Bonjour Sara, merci de nous confirmer le lieu de retour.", time: "14:00", read: true },
            { id: 2, from: "sara", text: "J'ai bien déposé le véhicule à l'aéroport de Marrakech.", time: "14:15", read: true }
        ],
        "karim": [
            { id: 1, from: "me", text: "Votre facture a été envoyée par e-mail.", time: "09:00", read: true },
            { id: 2, from: "karim", text: "Merci pour le service impeccable !", time: "09:05", read: true }
        ]
    } : {
        "support": [
            { id: 1, from: "support", text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", time: "09:00", read: true }
        ]
    });

    const active = discussions.find(d => d.id === activeChat) || discussions[0];
    const chatMessages = messages[activeChat] || [];

    // Scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages.length, isThinking]);

    // Mark active chat as read
    useEffect(() => {
        setDiscussions(prev => prev.map(d => {
            if (d.id === activeChat && d.unread > 0) {
                return { ...d, unread: 0 };
            }
            return d;
        }));
    }, [activeChat]);

    const filteredDiscussions = discussions.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.lastMsg.toLowerCase().includes(search.toLowerCase())
    );

    const sendMessage = (textOverride = null) => {
        const messageToSend = textOverride || message;
        if (!messageToSend.trim()) return;

        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg = { id: Date.now(), from: "me", text: messageToSend, time: nowStr, read: true };

        // Save msg
        setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));

        // Update sidebar list
        setDiscussions(prev => prev.map(d => {
            if (d.id === activeChat) {
                return { ...d, lastMsg: messageToSend, time: nowStr, unread: 0 };
            }
            return d;
        }));

        if (!textOverride) setMessage("");

        // Genius Mode Logic
        if (isGeniusActive) {
            setIsThinking(true);
            setTimeout(() => {
                let replyText = "";
                const txt = messageToSend.toLowerCase();

                if (activeChat === "support") {
                    // Data-Aware logic
                    if (txt.includes("réservation") || txt.includes("combien") || txt.includes("stats")) {
                        const count = reservationsList.length;
                        const pendingCount = reservationsList.filter(r => r.status === "pending").length;
                        replyText = `Analyse en cours... 🧠 Vous avez actuellement **${count} réservations** au total, dont **${pendingCount} sont en attente** de validation. Souhaitez-vous que je les affiche ?`;
                    } else if (txt.includes("argent") || txt.includes("revenu") || txt.includes("chiffre") || txt.includes("ca")) {
                        const totalRevenue = reservationsList.reduce((acc, r) => acc + (r.totalPrice || 0), 0);
                        replyText = `Voici vos performances financières : Votre chiffre d'affaires total enregistré est de **${totalRevenue.toLocaleString()} MAD**. La tendance est en hausse de 12% par rapport au mois dernier ! 📈`;
                    } else if (txt.includes("voiture") || txt.includes("véhicule") || txt.includes("flotte") || txt.includes("dispo")) {
                        const carCount = cars.length;
                        const models = [...new Set(cars.map(c => c.model))].join(", ");
                        replyText = `Votre flotte comprend **${carCount} véhicules** actifs. Vos modèles les plus loués incluent : ${models}. J'ai détecté qu'une révision est bientôt nécessaire pour la Range Rover. 🧼`;
                    } else if (txt.includes("client") || txt.includes("top")) {
                        replyText = "Votre meilleur client est Yassine Benali avec 14 locations cette année. Voulez-vous lui envoyer une offre promotionnelle Platinum ? 💎";
                    } else if (txt.includes("prolonger") || txt.includes("extension")) {
                        replyText = "Si un client souhaite prolonger, vous pouvez modifier les dates directement dans l'onglet 'Réservations'. J'ai détecté que Yassine Benali vous a justement posé cette question !";
                    } else {
                        replyText = "Bonjour ! Je suis UppCar Genius, votre assistant dopé à l'IA. Je peux analyser vos revenus, gérer votre flotte ou vous aider avec vos clients. Essayez : 'Quelles sont mes stats ?' ou 'Chiffre d'affaires total'. 🚀";
                    }
                } else {
                    replyText = `Genius Bot : J'ai bien reçu votre demande concernant "${messageToSend}". Je transmets l'information à l'agence UppCar qui vous répondra dans les plus brefs délais. 👍`;
                }

                setIsThinking(false);
                const replyMsg = { id: Date.now() + 1, from: activeChat, text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false, isAI: true };
                setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), replyMsg] }));

                setDiscussions(prev => prev.map(d => {
                    if (d.id === activeChat) {
                        return { ...d, lastMsg: replyText, time: "À l'instant", unread: activeChat === "support" ? 0 : 1 };
                    }
                    return d;
                }));
            }, 1200);
        } else {
            // Legacy Logic
            setTimeout(() => {
                let replyText = "Merci pour votre message ! Je reste disponible si vous avez besoin de quoi que ce soit d'autre. 👍";
                const replyMsg = { id: Date.now() + 1, from: activeChat, text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), read: false };
                setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), replyMsg] }));
            }, 1000);
        }
    };

    return (
        <div className="page tab-content messages-layout" style={{ height: "calc(100dvh - 140px)", display: "flex", gap: 16 }}>
            {/* LEFT — Contacts */}
            <div className="messages-sidebar" style={{ width: 320, flexShrink: 0, background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 18, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="anim-svg-chat-elite" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                <path d="M8 12h.01" />
                                <path d="M12 12h.01" />
                                <path d="M16 12h.01" />
                            </svg>
                        </div>
                        {t.messages}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", borderRadius: 20, padding: "15px 13px", border: "1px solid var(--border)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchPlaceholder} style={{ background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--text)", flex: 1 }} />
                    </div>
                </div>
                {/* Contact list */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {filteredDiscussions.length === 0 ? (
                        <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--muted2)", opacity: 0.8, textAlign: "center", height: "100%", animation: "fadeUp .4s ease" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{t.noMessages}</span>
                            <span style={{ fontSize: 11, opacity: 0.7 }}>{t.emptyInboxSub}</span>
                        </div>
                    ) : (
                        filteredDiscussions.map((c, i) => (
                            <div key={c.id} onClick={() => setActiveChat(c.id)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "12px 16px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid var(--border)",
                                    background: activeChat === c.id ? (dark ? "rgba(99,102,241,0.08)" : "rgba(16, 185, 129, 0.08)") : "transparent",
                                    transition: "background .2s",
                                    borderInlineStart: activeChat === c.id ? "3px solid var(--accent)" : "3px solid transparent"
                                }}>
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 14, background: c.id === "support" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : `linear-gradient(135deg, ${c.color}, ${c.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", boxShadow: `0 4px 12px ${c.id === "support" ? "#6366f160" : c.color + "40"}` }}>
                                        {c.id === "support" ? (
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                                        ) : c.avatar}
                                    </div>
                                    {c.online && <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid var(--card)", boxShadow: "0 0 6px #22c55e" }} />}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                                        <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{c.name}</span>
                                        {c.unread > 0 && <span style={{ background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 10 }}>{c.unread}</span>}
                                    </div>
                                    <div style={{ fontSize: 11, color: "var(--muted2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMsg}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Genius Mode Toggle */}
                <div style={{ padding: 16, borderTop: "1px solid var(--border)", background: dark ? "rgba(99,102,241,0.03)" : "rgba(16,185,129,0.03)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", padding: 12, borderRadius: 16, border: `1px solid ${isGeniusActive ? "var(--accent)" : "var(--border)"}`, transition: "all 0.3s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: isGeniusActive ? "var(--grad)" : "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", color: isGeniusActive ? "#fff" : "var(--muted2)" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 12, fontWeight: 800, color: isGeniusActive ? "var(--accent)" : "var(--text)" }}>Genius Mode</span>
                                <span style={{ fontSize: 9, color: "var(--muted2)", fontWeight: 600 }}>IA Decision Agent</span>
                            </div>
                        </div>
                        <div className={`toggle ${isGeniusActive ? "on" : "off"}`} onClick={() => setIsGeniusActive(!isGeniusActive)}>
                            <div className="toggle-thumb" />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT — Chat */}
            <div className="messages-chat" style={{ flex: 1, background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Chat header */}
                <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, background: "var(--surface2)" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: active.id === "support" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : `linear-gradient(135deg, ${active.color}, ${active.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", boxShadow: `0 4px 12px ${active.id === "support" ? "#6366f160" : active.color + "40"}` }}>
                            {active.id === "support" ? (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                            ) : active.avatar}
                        </div>
                        {active.online && <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid var(--surface2)", boxShadow: "0 0 6px #22c55e" }} />}
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            {active.name}
                            {active.id === "support" && <span style={{ fontSize: 9, background: "var(--accent)", color: "#fff", padding: "2px 6px", borderRadius: 6, fontWeight: 900, letterSpacing: 0.5 }}>GENIUS</span>}
                        </div>
                        <div style={{ fontSize: 11, color: active.online ? "#22c55e" : "var(--muted2)", display: "flex", alignItems: "center", gap: 4 }}>
                            {active.online && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />}
                            {active.online ? t.online : active.role}
                        </div>
                    </div>
                    <div style={{ marginInlineStart: "auto", display: "flex", gap: 8 }}>
                        {/* Call Icon */}
                        <div className="topbar-icon-btn" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg className="anim-svg-call" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </div>
                        {/* Video Icon */}
                        <div className="topbar-icon-btn" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg className="anim-svg-video" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>
                        </div>
                        {/* More Icon */}
                        <div className="topbar-icon-btn" style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg className="anim-svg-dots" width="16" height="16" viewBox="0 0 24 24" fill="var(--muted2)"><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /><circle cx="5" cy="12" r="1.5" /></svg>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {chatMessages.length === 0 ? (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, color: "var(--muted2)", opacity: 0.7, animation: "fadeUp .4s ease" }}>
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h8" /><path d="M8 14h4" /></svg>
                            <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.5px" }}>{t.noMessages}</span>
                        </div>
                    ) : (
                        chatMessages.map((msg, i) => (
                            <div key={msg.id} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start", animation: "fadeUp .3s ease" }}>
                                {msg.from !== "me" && (
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: active.id === "support" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : `linear-gradient(135deg, ${active.color}, ${active.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                                        {active.id === "support" ? "G" : active.avatar}
                                    </div>
                                )}
                                <div style={{ maxWidth: "75%" }}>
                                    <div style={{
                                        background: msg.from === "me" ? (dark ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "linear-gradient(135deg, #059669, #197553)") : (msg.isAI ? (dark ? "rgba(99,102,241,0.15)" : "rgba(16,185,129,0.1)") : "var(--surface2)"),
                                        color: msg.from === "me" ? "#fff" : "var(--text)",
                                        padding: "12px 16px",
                                        borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        lineHeight: 1.5,
                                        boxShadow: msg.from === "me" ? (dark ? "0 4px 12px rgba(99,102,241,0.3)" : "0 4px 12px rgba(16,185,129,0.3)") : "0 2px 8px rgba(0,0,0,0.06)",
                                        border: msg.from === "me" ? "none" : (msg.isAI ? `1px solid ${dark ? "#6366f160" : "#10b98160"}` : "1px solid var(--border)")
                                    }}>
                                        {msg.text.split('\n').map((line, idx) => (
                                            <p key={idx} style={{ margin: 0, marginBottom: line.includes("**") ? 8 : 0 }}>
                                                {line.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: msg.from === "me" ? "#fff" : "var(--accent)" }}>{part}</strong> : part)}
                                            </p>
                                        ))}
                                        {msg.isAI && (
                                            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                                                <button onClick={() => navigate("analytics")} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", fontSize: 10, color: "var(--text)", cursor: "pointer", fontWeight: 700 }}>VOIR ANALYTIQUES</button>
                                                <button onClick={() => navigate("reservations")} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", fontSize: 10, color: "var(--text)", cursor: "pointer", fontWeight: 700 }}>VOIR RÉSERVATIONS</button>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ fontSize: 10, color: "var(--muted2)", marginTop: 4, textAlign: msg.from === "me" ? "right" : "left", display: "flex", alignItems: "center", justifyContent: msg.from === "me" ? "flex-end" : "flex-start", gap: 4 }}>
                                        {msg.time} {msg.from === "me" && <span style={{ color: "var(--accent)" }}>✓✓</span>}
                                        {msg.isAI && <span style={{ opacity: 0.7, fontStyle: "italic" }}>— Genius Intelligence</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {isThinking && (
                        <div style={{ display: "flex", justifyContent: "flex-start", animation: "fadeUp .3s ease" }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>G</div>
                            <div style={{ background: "var(--surface2)", padding: "12px 16px", borderRadius: "18px 18px 18px 4px", display: "flex", gap: 4, border: "1px solid var(--border)" }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1.5s infinite" }} />
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1.5s infinite 0.2s" }} />
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1.5s infinite 0.4s" }} />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Smart Actions Bar */}
                {activeChat === "support" && (
                    <div style={{ padding: "0 24px 8px", display: "flex", gap: 8, overflowX: "auto", whiteSpace: "nowrap" }}>
                        <button onClick={() => sendMessage("Quelles sont mes statistiques ?")} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", fontSize: 11, fontWeight: 700, color: "var(--text)", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent)"} onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="anim-svg-stats"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
                            Mes Stats
                        </button>
                        <button onClick={() => sendMessage("Chiffre d'affaires total")} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", fontSize: 11, fontWeight: 700, color: "var(--text)", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent)"} onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="anim-svg-revenue"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                            Revenus
                        </button>
                        <button onClick={() => sendMessage("État de ma flotte")} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", fontSize: 11, fontWeight: 700, color: "var(--text)", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent)"} onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="anim-svg-fleet"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
                            Ma Flotte
                        </button>
                        <button onClick={() => sendMessage("Top clients")} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", fontSize: 11, fontWeight: 700, color: "var(--text)", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent)"} onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="anim-svg-clients"><path d="m11.5 11.5 2.3 2.3" /><path d="M21 21s-1-3.9-4-5" /><path d="M21 3 3 21" /><path d="M3 10V3h7" /><path d="M3 4v.01" /><path d="m9.5 9.5 2.3 2.3" /><circle cx="16" cy="7" r="4" /></svg>
                            Top Clients
                        </button>
                    </div>
                )}

                {/* Input */}
                <div className="chat-mobile-row" style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center" }}>
                    <div className="chat-mobile-input" style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: dark ? "rgba(99,102,241,0.05)" : "rgba(16, 185, 129, 0.05)",
                        borderRadius: 46,
                        padding: "19px 22px",
                        border: dark ? "1.8px solid var(--accent)" : "1.8px solid #0faa36b9",
                        boxShadow: dark ? "0 4px 15px rgba(99,102,241,0.15)" : "0 4px 15px rgba(16, 185, 129, 0.15)"
                    }}>
                        {/* Plus Icon Container */}

                        {/* Sticker Container */}
                        <div style={{ position: "relative" }}>
                            {/* Sticker Icon */}
                            <div className="anim-svg-sticker mobile-hide" onClick={() => setShowEmojis(!showEmojis)} style={{ cursor: "pointer", display: "flex", color: "var(--muted2)" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a10 10 0 1 0 10 10V10a2 2 0 0 0-2-2h-2a2 2 0 0 1-2-2V4a2 2 0 0 0-2-2h-2Z"></path>
                                    <path d="M18 10a8 8 0 0 1-8 8"></path>
                                    <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
                                    <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
                                    <path d="M8 15a4 4 0 0 0 8 0"></path>
                                </svg>
                            </div>

                            {/* EMOJI PICKER POPUP — ELITE CATEGORIZED EDITION */}
                            {showEmojis && (
                                <div className="emoji-picker-advanced" onClick={e => e.stopPropagation()} style={{
                                    position: "absolute",
                                    bottom: 50,
                                    ...(lang === "ar" ? { right: -20 } : { left: -20 }),
                                    background: "var(--bg)",
                                    border: dark ? "1px solid var(--accent)" : "1px solid #0faa36b9",
                                    borderRadius: 16,
                                    width: 320,
                                    zIndex: 100,
                                    animation: "fadeUp .3s ease",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    boxShadow: dark ? "0 0 15px var(--accent)" : "0 0 15px rgba(16, 185, 129, 0.4)",
                                    transform: "translateY(-2px) scale(1.02)"
                                }}>
                                    {/* Tabs — SVG Icons Edition */}
                                    <div style={{ display: "flex", background: "var(--surface)", padding: "4px" }}>
                                        {Object.keys(emojiData).map(cat => {
                                            const catColors = { Smileys: "#f59e0b", Animals: "#10b981", Travel: "#3b82f6", Objects: "#ec4899" };
                                            const color = catColors[cat] || "var(--accent)";
                                            const isActive = emojiCat === cat && !emojiSearch;
                                            return (
                                                <div key={cat} onClick={() => { setEmojiCat(cat); setEmojiSearch(""); }}
                                                    style={{ position: "relative", flex: 1, padding: "10px", textAlign: "center", cursor: "pointer", background: isActive ? "rgba(255,255,255,0.04)" : "transparent", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? color : "var(--muted2)" }}>
                                                    {isActive && <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 2, borderRadius: "3px 3px 0 0", background: color, boxShadow: `0 -2px 8px ${color}60` }} />}
                                                    {cat === "Smileys" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>}
                                                    {cat === "Animals" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20a7 7 0 0 1-7-7c0-3.87 3.13-7 7-7s7 3.13 7 7a7 7 0 0 1-7 7z" /><path d="M11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /><path d="M15 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /><path d="M7 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /><path d="M11 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>}
                                                    {cat === "Travel" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>}
                                                    {cat === "Objects" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.1.7.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Search */}
                                    <div style={{ padding: 12 }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            background: "var(--surface2)",
                                            borderRadius: 8,
                                            padding: "6px 12px",
                                            border: "1px solid transparent",
                                            transition: "border .2s",
                                            borderColor: "transparent"
                                        }}
                                            onFocus={e => e.currentTarget.style.borderColor = dark ? "var(--accent)" : "#10b981"}
                                            onBlur={e => e.currentTarget.style.borderColor = "transparent"}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted2)" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                            <input value={emojiSearch} onChange={e => setEmojiSearch(e.target.value)}
                                                placeholder={t.searchPlaceholder} style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }} />
                                        </div>
                                    </div>

                                    {/* Grid */}
                                    <div style={{ padding: "0 7px 12px", maxHeight: 220, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                                        {filteredEmojis.map((e, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => { setMessage(m => m + e); setShowEmojis(false); }}
                                                style={{
                                                    fontSize: 20,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: 6,
                                                    borderRadius: 8,
                                                    transition: "background .2s",
                                                    background: "transparent"
                                                }}
                                                onMouseEnter={el => el.currentTarget.style.background = "rgba(99,102,241,0.08)"}
                                                onMouseLeave={el => el.currentTarget.style.background = "transparent"}
                                            >
                                                {e}
                                            </div>
                                        ))}
                                        {filteredEmojis.length === 0 && (
                                            <div style={{ gridColumn: "span 7", textAlign: "center", padding: 20, color: "var(--muted2)", fontSize: 12 }}>{t.noEmoji}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
                            placeholder={isGeniusActive ? "Posez une question sur vos données..." : t.writeMessage} style={{ background: "transparent", border: "none", outline: "none", flex: 1, fontSize: 16, fontWeight: 500, color: "var(--text)", letterSpacing: "0.2px" }} />
                    </div>
                    <div
                        onClick={() => sendMessage()}
                        className="btn-premium-shine chat-mobile-btn"
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: isGeniusActive ? (dark ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "linear-gradient(135deg, #059669 0%, #0faa36b9 50%, #197553ff 100%)") : (dark ? "var(--surface2)" : "#94a3b8"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: isGeniusActive ? (dark ? "0 4px 12px rgba(99,102,241,0.4)" : "0 4px 12px rgba(16, 185, 129, 0.4)") : "none",
                            transition: "all 0.2s",
                            flexShrink: 0
                        }}
                    >
                        <svg className="anim-svg-send" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                    </div>
                </div>
            </div>
        </div >
    );
}

function FinancePage({ t, currentMonth = new Date().getMonth() + 1, currentYear = new Date().getFullYear(), currency = "MAD", dark = false, lang = "fr", reservationsList = [] }) {
    const [notification, setNotification] = useState(null);

    const md = getMonthData(currentMonth, currentYear, reservationsList);
    const { taxes, demoReservations } = md;

    const rate = getRate(currency);
    const cvt = (madVal) => madVal * rate;
    const fmtC = (madVal) => Math.abs(cvt(madVal)).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const triggerDownload = (facNum) => {
        setNotification(
            lang === "ar"
                ? `تم تحميل الفاتورة ${facNum} بنجاح !`
                : lang === "en"
                    ? `Invoice ${facNum} successfully downloaded!`
                    : `Facture ${facNum} téléchargée avec succès !`
        );
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <div className="page tab-content finance-page" style={{ padding: "10px 40px" }}>
            {notification && (
                <div className="btn-premium-shine" style={{
                    position: "fixed",
                    top: 24,
                    right: 24,
                    background: dark ? "rgba(99, 102, 241, 0.95)" : "rgba(16, 185, 129, 0.95)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: 16,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    zIndex: 9999,
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    animation: "fadeUp .3s ease"
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    {notification}
                </div>
            )}

            <div className="stats-grid" style={{ gap: 0, marginBottom: 48, gridTemplateColumns: "1fr" }}>
                <div className="stat-card-lg" style={{ textAlign: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
                    <div className="stat-label" style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13 }}>
                        {t.vatCollected || "TVA Collectée"} ({MONTHS[currentMonth - 1]} {currentYear})
                    </div>
                    <div className="stat-value finance-stat-value" style={{ fontSize: 62, margin: "16px 0" }}>
                        {fmtC(taxes)} {currency}
                    </div>
                    <div className="stat-change up" style={{ color: "#3b82f6", fontSize: 14 }}>
                        <Icon d={icons.arrow} size={16} style={{ transform: "rotate(-45deg)" }} />
                        {t.readyForDeclaration || "Prêt pour déclaration"} · {fmtC(taxes)} {currency} {lang === "ar" ? "إجمالاً" : "au total"}
                    </div>
                    <div className="finance-stat-icon" style={{ position: "absolute", top: "50%", right: 40, transform: "translateY(-50%)", padding: 20, borderRadius: 24, background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                        <Icon d={icons.finance} size={32} />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: 32 }}>
                <div className="section-title">
                    {t.recentInvoices}
                    <div className="section-title-line" style={{ width: 60 }} />
                </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="table-wrap finance-table-desktop" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
                <table style={{ borderSpacing: "0 10px", borderCollapse: "separate" }}>
                    <thead>
                        <tr>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#6366f1", color: "#6366f1" }}>{t.invoiceNum}</div></th>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#a855f7", color: "#a855f7" }}>{t.invoiceClient}</div></th>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#10b981", color: "#10b981" }}>{t.invoiceDate}</div></th>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#f59e0b", color: "#f59e0b" }}>{t.invoiceAmount}</div></th>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#06b6d4", color: "#06b6d4" }}>{t.invoiceStatus}</div></th>
                            <th><div className="invoice-header-badge" style={{ borderColor: "#ec4899", color: "#ec4899" }}>Action</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {demoReservations.length === 0 ? (
                            <tr className="table-row-animate" style={{ animationDelay: "0.2s" }}>
                                <td colSpan="6" style={{ textAlign: "center", padding: 60, color: "var(--muted2)", background: "var(--surface2)", borderRadius: 24, border: "1px dashed var(--border)" }}>
                                    <Icon d={icons.finance} size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{t.quietPeriod}</div>
                                    <div style={{ fontSize: 13, marginTop: 4 }}>{t.futureInvoices}</div>
                                </td>
                            </tr>
                        ) : (
                            demoReservations.map((res, i) => {
                                const facNum = `FAC-${res.id.replace("RES-", "")}`;
                                const statusColor = res.status === "confirmed"
                                    ? "#10b981"
                                    : res.status === "pending"
                                        ? "#f59e0b"
                                        : "#ef4444";
                                const statusBg = res.status === "confirmed"
                                    ? "rgba(16, 185, 129, 0.08)"
                                    : res.status === "pending"
                                        ? "rgba(245, 158, 11, 0.08)"
                                        : "rgba(239, 68, 68, 0.08)";
                                const statusBorder = res.status === "confirmed"
                                    ? "1px solid rgba(16, 185, 129, 0.15)"
                                    : res.status === "pending"
                                        ? "1px solid rgba(245, 158, 11, 0.15)"
                                        : "1px solid rgba(239, 68, 68, 0.15)";
                                const statusText = res.status === "confirmed"
                                    ? (lang === "ar" ? "مدفوعة" : lang === "en" ? "Paid" : "Payée")
                                    : res.status === "pending"
                                        ? (lang === "ar" ? "قيد الانتظار" : lang === "en" ? "Pending" : "En attente")
                                        : (lang === "ar" ? "ملغاة" : lang === "en" ? "Cancelled" : "Annulée");

                                return (
                                    <tr key={res.id} className="table-row-animate" style={{ animationDelay: `${0.1 * (i + 1)}s`, background: "var(--card)" }}>
                                        <td style={{ fontWeight: 700, color: "var(--accent)" }}>{facNum}</td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${res.color}, ${res.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff", boxShadow: `0 2px 8px ${res.color}30` }}>
                                                    {res.avatar}
                                                </div>
                                                <span style={{ fontWeight: 600 }}>{res.client}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: "var(--muted)" }}>{res.from}</td>
                                        <td style={{ fontWeight: 800 }}>{fmtC(res.amount)} {currency}</td>
                                        <td>
                                            <span style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 6,
                                                padding: "4px 10px",
                                                borderRadius: 12,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: statusColor,
                                                background: statusBg,
                                                border: statusBorder
                                            }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, display: "inline-block", animation: res.status === "pending" ? "pulse 2s infinite" : "none" }} />
                                                {statusText}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => triggerDownload(facNum)}
                                                className="btn-premium-shine"
                                                style={{
                                                    background: "var(--surface2)",
                                                    border: "1px solid var(--border)",
                                                    color: "var(--text)",
                                                    padding: "6px 12px",
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    transition: "all .2s"
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
                                                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                                PDF
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* MOBILE LIST */}
            <div className="finance-mobile-list" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {demoReservations.length === 0 ? (
                    <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted2)", background: "var(--surface2)", borderRadius: 24, border: "1px dashed var(--border)" }}>
                        <Icon d={icons.finance} size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                        <div style={{ fontSize: 15, fontWeight: 600 }}>{t.quietPeriod}</div>
                        <div style={{ fontSize: 13, marginTop: 4 }}>{t.futureInvoices}</div>
                    </div>
                ) : (
                    demoReservations.map((res, i) => {
                        const facNum = `FAC-${res.id.replace("RES-", "")}`;
                        const statusColor = res.status === "confirmed"
                            ? "#10b981"
                            : res.status === "pending"
                                ? "#f59e0b"
                                : "#ef4444";
                        const statusBg = res.status === "confirmed"
                            ? "rgba(16, 185, 129, 0.08)"
                            : res.status === "pending"
                                ? "rgba(245, 158, 11, 0.08)"
                                : "rgba(239, 68, 68, 0.08)";
                        const statusBorder = res.status === "confirmed"
                            ? "1px solid rgba(16, 185, 129, 0.15)"
                            : res.status === "pending"
                                ? "1px solid rgba(245, 158, 11, 0.15)"
                                : "1px solid rgba(239, 68, 68, 0.15)";
                        const statusText = res.status === "confirmed"
                            ? (lang === "ar" ? "مدفوعة" : lang === "en" ? "Paid" : "Payée")
                            : res.status === "pending"
                                ? (lang === "ar" ? "قيد الانتظار" : lang === "en" ? "Pending" : "En attente")
                                : (lang === "ar" ? "ملغاة" : lang === "en" ? "Cancelled" : "Annulée");

                        return (
                            <div key={res.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontWeight: 800, fontSize: 13, color: "var(--accent)" }}>{facNum}</span>
                                    <span style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "3px 8px",
                                        borderRadius: 8,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: statusColor,
                                        background: statusBg,
                                        border: statusBorder
                                    }}>
                                        {statusText}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${res.color}, ${res.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff" }}>
                                        {res.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 13 }}>{res.client}</div>
                                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{res.from}</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4 }}>
                                    <span style={{ fontWeight: 850, fontSize: 14 }}>{fmtC(res.amount)} {currency}</span>
                                    <button
                                        onClick={() => triggerDownload(facNum)}
                                        className="btn-premium-shine"
                                        style={{
                                            background: "rgba(99, 102, 241, 0.06)",
                                            border: "1px solid rgba(99, 102, 241, 0.15)",
                                            color: "var(--accent)",
                                            padding: "6px 14px",
                                            borderRadius: 8,
                                            cursor: "pointer",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6
                                        }}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                        PDF
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
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

/* ─────────────────────────────── APP ─────────────────────────────── */
export default function AgencyDashboard() {
    const canvasRef = useRef(null);
    const [page, setPage] = useState("dashboard");
    const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [lang, setLang] = useState(() => (localStorage.getItem("appLang") || "FR").toLowerCase());
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [currency, setCurrency] = useState(() => localStorage.getItem("appCurrency") || "MAD");
    const t = translations[lang];
    const [agencyData, setAgencyData] = useState(() => {
        const saved = localStorage.getItem("agencyData");
        return saved ? JSON.parse(saved) : null;
    });

    const [cars, setCars] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showProfileReminder, setShowProfileReminder] = useState(false);
    const [reservationsList, setReservationsList] = useState([]);


    // Sync agency data with backend on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}`}/api/auth/agency/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch agency data");
                    return res.json();
                })
                .then(data => {
                    setAgencyData(data);
                    localStorage.setItem("agencyData", JSON.stringify(data));
                })
                .catch(err => console.error("Error fetching agency profile:", err));
        }
    }, []);

    // Fetch reservations
    useEffect(() => {
        if (agencyData && agencyData.id) {
            const token = localStorage.getItem("token");
            fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/reservations/agency/${agencyData.id}`, {
                headers: token ? { "Authorization": `Bearer ${token}` } : {}
            })
                .then(res => res.json())
                .then(data => setReservationsList(data))
                .catch(err => console.error("Error fetching reservations:", err));
        }
    }, [agencyData?.id]);

    const [clientDetailsMap, setClientDetailsMap] = useState({});

    const clientsDerived = useMemo(() => {
        if (!reservationsList || reservationsList.length === 0) {
            return isMockUser() ? MOCK_CLIENTS : [];
        }
        const grouped = reservationsList.reduce((acc, r) => {
            const key = r.clientId || r.clientEmail || r.clientPhone || `id-${r.id}`;
            if (!acc[key]) {
                const details = clientDetailsMap[r.clientId] || {};
                acc[key] = {
                    clientId: r.clientId,
                    name: (details.firstName ? `${details.firstName} ${details.lastName}` : `${r.clientFirstName || ""} ${r.clientLastName || ""}`).trim() || "Client Inconnu",
                    email: details.email || r.clientEmail || "—",
                    phone: details.phone || r.clientPhone || "—",
                    city: details.city || r.clientCity || "—",
                    address: details.address || "—",
                    cin: r.cin || "—",
                    license: r.licenseNumber || "—",
                    totalRentals: 0,
                    spendVal: 0,
                    color: ["#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ef4444"][Math.floor(Math.random() * 5)]
                };
                acc[key].initials = (acc[key].name.split(' ').map(n => n[0]).join('')).toUpperCase() || "?";
            }
            acc[key].totalRentals += 1;
            acc[key].spendVal += (r.totalPrice || 0);
            return acc;
        }, {});

        return Object.values(grouped).map(c => ({
            ...c,
            spend: `${c.spendVal.toLocaleString()} Dh`,
            tier: c.spendVal > 25000 ? "Platinum" : (c.spendVal > 10000 ? "Gold" : "Silver")
        }));
    }, [reservationsList, clientDetailsMap]);

    // Fetch enriched client details
    useEffect(() => {
        if (reservationsList && reservationsList.length > 0) {
            const uniqueClientIds = [...new Set(reservationsList.map(r => r.clientId).filter(id => id))];
            uniqueClientIds.forEach(id => {
                if (!clientDetailsMap[id]) {
                    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/auth/user/${id}`)
                        .then(res => res.json())
                        .then(userData => {
                            if (userData && userData.id) {
                                setClientDetailsMap(prev => ({ ...prev, [id]: userData }));
                            }
                        })
                        .catch(err => console.error("Error fetching user details:", err));
                }
            });
        }
    }, [reservationsList]);

    // Helper to check if agency profile is incomplete
    const isAgencyProfileIncomplete = (data) => {
        if (!data) return true;
        const requiredFields = ["agencyName", "firstName", "lastName", "phone", "address", "city", "country"];
        return requiredFields.some(field => !data[field] || data[field].toString().trim() === "");
    };

    // Effet pour afficher le rappel de profil pendant 15 secondes
    useEffect(() => {
        if (agencyData && isAgencyProfileIncomplete(agencyData)) {
            setShowProfileReminder(true);
            const timer = setTimeout(() => setShowProfileReminder(false), 15000);
            return () => clearTimeout(timer);
        }
    }, [agencyData?.id]);


    // Fetch cars from backend
    useEffect(() => {
        if (agencyData && agencyData.id) {
            fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/cars/agency/${agencyData.id}`)
                .then(res => res.json())
                .then(data => {
                    // Convert back from simple string array to object array if needed
                    const formatted = data.map(c => ({
                        ...c,
                        photos: (c.photos || []).map((url, i) => ({ url, id: i, name: `Photo ${i}` }))
                    }));
                    setCars(formatted);
                })
                .catch(err => console.error("Error fetching cars:", err));
        }
    }, [agencyData?.id]);
    const audioCtxRef = useRef(null);
    const lastPlayRef = useRef(0);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W, H, id, tt = 0;
        let parts = [];
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; parts = Array.from({ length: 90 }, () => new Particle(W, H)); };
        const loop = () => {
            ctx.clearRect(0, 0, W, H);

            if (!dark) {
                ctx.fillStyle = "#f0fdf4"; ctx.fillRect(0, 0, W, H);
                ctx.globalAlpha = 0.03; ctx.strokeStyle = "#10b981"; ctx.lineWidth = 0.5;
                for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
                for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
            }

            /* aurora */
            tt += .0025;
            const g1 = ctx.createRadialGradient(W * .22 + Math.sin(tt) * 70, H * .28 + Math.cos(tt * .7) * 45, 0, W * .3, H * .3, W * .52);
            g1.addColorStop(0, dark ? 'rgba(99,102,241,.07)' : 'rgba(99,102,241,.05)');
            g1.addColorStop(1, 'transparent');
            ctx.globalAlpha = 1; ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

            const g2 = ctx.createRadialGradient(W * .78 + Math.cos(tt * .6) * 55, H * .65 + Math.sin(tt) * 38, 0, W * .68, H * .6, W * .42);
            g2.addColorStop(0, dark ? 'rgba(16,185,129,.05)' : 'rgba(16,185,129,.04)');
            g2.addColorStop(1, 'transparent');
            ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

            /* particles */
            if (dark) {
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
    }, [dark]);

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

    const handleSaveCar = (form) => {
        if (!agencyData || !agencyData.id) return alert("Agency data missing");

        const carToSave = {
            ...form,
            agencyId: agencyData.id,
            // Convertit les objets photo en simples URL strings pour le backend
            photos: (form.photos || []).map(p => (typeof p === "string" ? p : p.url))
        };

        const isUpdate = !!form.id;
        const url = isUpdate
            ? `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/cars/${form.id}`
            : `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/cars`;
        const method = isUpdate ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carToSave)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(savedCar => {
                const formatted = {
                    ...savedCar,
                    photos: (savedCar.photos || []).map((url, i) => ({ url, id: i, name: `Photo ${i}` }))
                };
                if (isUpdate) {
                    setCars(cs => cs.map(c => c.id === form.id ? formatted : c));
                } else {
                    setCars(cs => [...cs, formatted]);
                }
            })
            .catch(err => console.error("Error saving car:", err));
    };

    const handleDeleteCar = (id) => {
        fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/cars/${id}`, { method: "DELETE" })
            .then(() => {
                setCars(cs => cs.filter(c => c.id !== id));
            })
            .catch(err => console.error("Error deleting car:", err));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("agencyData");
        window.location.href = "/loginagence";
    };

    const agencyInitials = agencyData ? ((agencyData.firstName?.[0] || 'U') + (agencyData.lastName?.[0] || 'C')).toUpperCase() : 'UC';

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        localStorage.setItem("theme", dark ? "dark" : "light");
        localStorage.setItem("appLang", lang.toUpperCase());
    }, [dark, lang]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileOpen]);

    const md = getMonthData(currentMonth, currentYear, reservationsList);
    const pending = md.demoReservations.filter(r => r.status === "pending" || r.status === "PENDING").length;

    const navItems = [
        { id: "dashboard", label: t.dashboard, icon: icons.dashboard, color: dark ? "#6366f1" : "#10b981" },
        { id: "cars", label: t.cars, icon: icons.cars, color: "#10b981" },
        { id: "map", label: t.map, icon: icons.map, color: "#06b6d4" },
        { id: "reservations", label: t.reservations, icon: icons.reservations, badge: pending, color: "#f59e0b" },
        { id: "customers", label: t.customers, icon: icons.customers, color: dark ? "#a855f7" : "#10b981" },
        { id: "messages", label: t.messages, icon: icons.messages, color: dark ? "#38bdf8" : "#06b6d4" },
        { id: "finance", label: t.finance, icon: icons.finance, color: "#10b981" },
        { id: "analytics", label: t.analytics, icon: icons.analytics, color: "#3b82f6" },
        { id: "settings", label: t.settings, icon: icons.settings, color: "#ec4899" },
    ];

    const pageTitle = { dashboard: t.dashboard, cars: t.cars, map: t.map, reservations: t.reservations, customers: t.customers, messages: t.messages, finance: t.finance, analytics: t.analytics, settings: t.settings };
    const pageBadge = { dashboard: t.live, cars: `${cars.length} ${t.vehiclesCount}`, map: "Live GPS", reservations: `${reservationsList.length} ${t.total}`, customers: `${clientsDerived.length} ${t.customers}`, messages: t.unreadCount, finance: "Q1 2024", analytics: "2024", settings: t.agencyPro };

    const navigate = (p) => { setPage(p); setMobileOpen(false); };

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
            <div className="app" style={{ position: "relative", zIndex: 1, background: "transparent" }}>
                {/* MOBILE OVERLAY — clicking it closes the sidebar */}
                {mobileOpen && (
                    <div className="sidebar-overlay" />
                )}

                {/* SIDEBAR */}
                <aside className={`sidebar${mobileOpen ? " open" : ""}`}>
                    <Logo onClick={() => setPage("dashboard")} t={t} />
                    <nav className="nav-section">
                        <div className="nav-label">
                            <span className="nav-label-full">{t.navLabel}</span>
                            <span className="nav-label-mini">NA</span>
                        </div>
                        {navItems.slice(0, 8).map(item => (
                            <div key={item.id} className={`nav-item${page === item.id ? " active" : ""}`} onClick={() => navigate(item.id)} style={{ "--icon-color": item.color }}>
                                {page === item.id && <div className="active-bar" />}
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke={page === item.id ? item.color : item.color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: page === item.id ? 1 : 0.7 }}>
                                    {Array.isArray(item.icon) ? item.icon.map((p, i) => <path key={i} d={p} />) : <path d={item.icon} />}
                                    {item.id === "cars" && <><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></>}
                                </svg>
                                <span className="nav-item-label">{item.label}</span>
                                {item.badge > 0 && <span className="badge" style={{ background: "#f59e0b" }}>{item.badge}</span>}
                            </div>
                        ))}
                        <div className="nav-label" style={{ marginTop: 8 }}>
                            <span className="nav-label-full">{t.prefLabel}</span>
                            <span className="nav-label-mini">PR</span>
                        </div>
                        <div className={`nav-item${page === "settings" ? " active" : ""}`} onClick={() => navigate("settings")} style={{ "--icon-color": "#ec4899" }}>
                            {page === "settings" && <div className="active-bar" />}
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke={page === "settings" ? "var(--accent)" : "#ec4899"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                {Array.isArray(icons.settings) ? icons.settings.map((p, i) => <path key={i} d={p} />) : <path d={icons.settings} />}
                            </svg>
                            <span className="nav-item-label">{t.settings}</span>
                        </div>
                    </nav>
                    <div className="sidebar-bottom">
                        <div className="user-pill" onClick={() => navigate("settings")}>
                            <div className="user-avatar" style={{ background: dark ? "linear-gradient(135deg, #4f46e5 0%, #1d1f8aff 100%)" : "linear-gradient(135deg, rgb(5, 150, 105), rgb(25, 117, 83))", overflow: 'hidden' }}>
                                {agencyData?.logo ? <img src={agencyData.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : agencyInitials}
                            </div>
                            <div className="user-info">
                                <div className="user-name">{agencyData?.agencyName || t.agencyName}</div>
                                <div className="user-role">{t.planPro}</div>
                            </div>
                        </div>
                        <div className="logout-btn" onClick={handleLogout}>
                            <Icon d={icons.logout} size={20} stroke="currentColor" className="nav-icon" />
                            <span className="nav-item-label" style={{ fontWeight: 800, fontSize: 13, color: "#ef4444" }}>{t.logout}</span>
                        </div>
                    </div>
                </aside>

                {/* MAIN — clicking on content area closes sidebar on mobile */}
                <main className="main" onClick={mobileOpen ? () => setMobileOpen(false) : undefined}>
                    {/* TOPBAR */}
                    <header className="topbar">
                        {/* ── MOBILE LEFT: logo icon only ── */}
                        <div className="mobile-logo-wrap" style={{ display: "flex", alignItems: "center" }}>
                            <Logo onClick={() => setPage("dashboard")} t={t} />
                        </div>

                        {/* ── DESKTOP: page title + badge ── */}
                        <div className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div className="topbar-title" style={{ color: navItems.find(n => n.id === page)?.color || "var(--icon-color)" }}>
                                <Icon d={navItems.find(n => n.id === page)?.icon || icons.dashboard} size={22} stroke="currentColor" />
                                {pageTitle[page]}
                            </div>
                            <span className="topbar-badge">{pageBadge[page]}</span>
                        </div>

                        <div className="topbar-actions">
                            {/* Language button — hidden on mobile */}
                            <div className="avatar-anim-wrapper mobile-hide" style={{ animation: "ultimateFloat 3.2s ease-in-out infinite alternate", animationDelay: "0s" }}>
                                <div style={{ position: "relative" }}>
                                    <button className="icon-btn" onClick={() => setLangMenuOpen(!langMenuOpen)} style={{ background: langMenuOpen ? "var(--text)" : "transparent", color: langMenuOpen ? "var(--bg)" : "var(--text)" }}>
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
                                            background: "var(--accent)", color: "#fff",
                                            fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: 6,
                                            lineHeight: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                            pointerEvents: "none"
                                        }}>{lang.toUpperCase()}</span>
                                    </button>

                                    {langMenuOpen && (
                                        <div style={{ position: "absolute", top: "50%", right: lang === "ar" ? "auto" : "calc(100% + 12px)", left: lang === "ar" ? "calc(100% + 12px)" : "auto", transform: "translateY(-50%)", display: "flex", flexDirection: "row", background: "var(--surface2)", borderRadius: "34px", padding: "6px", border: "1px solid var(--border)", gap: "4px", alignItems: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 100 }}>
                                            {[
                                                { code: "ar", label: "Arabe" },
                                                { code: "fr", label: "Francais" },
                                                { code: "en", label: "Anglais" }
                                            ].map(l => (
                                                <button
                                                    key={l.code}
                                                    onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                                                    style={{ display: "flex", alignItems: "center", background: lang === l.code ? "var(--text)" : "transparent", color: lang === l.code ? "var(--bg)" : "var(--muted)", border: "none", borderRadius: "22px", padding: "6px 17px", fontSize: "12px", fontWeight: "800", cursor: "pointer", transition: "all 0.3s" }}>
                                                    <span style={{ fontSize: "16px", filter: lang !== l.code ? "grayscale(40%) opacity(0.8)" : "none", transition: "all 0.3s" }}>{l.flag}</span>
                                                    {l.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dark mode — visible on BOTH mobile and desktop */}
                            <div className="avatar-anim-wrapper" style={{ animation: "ultimateFloat 4.5s ease-in-out infinite alternate", animationDelay: "1.2s" }}>
                                <button className="icon-btn" onClick={() => setDark(d => !d)}>
                                    <Icon d={dark ? icons.sun : icons.moon} size={16} />
                                </button>
                            </div>

                            {/* Avatar (BT) — hidden on mobile */}
                            <div className="avatar-anim-wrapper mobile-hide" style={{ animation: "ultimateFloat 2.7s ease-in-out infinite alternate", animationDelay: "2.5s" }}>
                                <div className="user-avatar-modern" onClick={() => navigate("settings")} style={{ overflow: 'hidden', padding: agencyData?.logo ? 0 : '', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {agencyData?.logo ? <img src={agencyData.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 'inherit' }} /> : agencyInitials}
                                </div>
                            </div>

                            {/* ── MOBILE HAMBURGER TOGGLE ── */}
                            <button
                                className="mobile-menu-btn"
                                onClick={() => setMobileOpen(o => !o)}
                                aria-label="Toggle sidebar"
                            >
                                {mobileOpen ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="4" y1="6" x2="20" y2="6" />
                                        <line x1="4" y1="12" x2="20" y2="12" />
                                        <line x1="4" y1="18" x2="20" y2="18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </header>

                    {/* PAGE CONTENT */}
                    <div className="content">
                        {page === "dashboard" && <DashboardPage dark={dark} t={t} cars={cars} currency={currency} setCurrency={setCurrency} lang={lang} currentMonth={currentMonth} currentYear={currentYear} reservationsList={reservationsList} />}
                        {page === "cars" && <CarsPage t={t} cars={cars} onSave={handleSaveCar} onDelete={handleDeleteCar} dark={dark} />}
                        {page === "map" && <MapPage t={t} cars={cars} agencyData={agencyData} lang={lang} />}
                        {page === "reservations" && <ReservationsPage t={t} currentMonth={currentMonth} currentYear={currentYear} cars={cars} agencyData={agencyData} />}
                        {page === "customers" && <CustomersPage t={t} clients={clientsDerived} />}
                        {page === "messages" && <MessagesPage t={t} dark={dark} lang={lang} reservationsList={reservationsList} cars={cars} agencyData={agencyData} navigate={navigate} />}
                        {page === "finance" && <FinancePage t={t} currentMonth={currentMonth} currentYear={currentYear} currency={currency} dark={dark} lang={lang} reservationsList={reservationsList} />}
                        {page === "analytics" && <AnalyticsPage dark={dark} t={t} reservationsList={reservationsList} cars={cars} />}
                        {page === "settings" && <SettingsPage dark={dark} setDark={setDark} t={t} agencyData={agencyData} setAgencyData={setAgencyData} lang={lang} setLang={setLang} />}
                    </div>

                    {/* ══ PREMIUM PROFILE REMINDER TOAST ══ */}
                    {showProfileReminder && (
                        <div style={{
                            position: "fixed",
                            bottom: 40,
                            right: 40,
                            zIndex: 10000,
                            animation: "toastFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
                        }}>
                            <div style={{
                                background: dark ? "rgba(24, 24, 27, 0.85)" : "rgba(255, 255, 255, 0.85)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.1)"}`,
                                borderLeft: `4px solid ${dark ? "#818cf8" : "#10b981"}`,
                                padding: "16px 24px",
                                borderRadius: "20px",
                                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                                maxWidth: 409,
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: "50%",
                                    background: dark ? "rgba(129,140,248,0.1)" : "rgba(16,185,129,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: dark ? "#818cf8" : "#10b981",
                                    flexShrink: 0
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        margin: 0,
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: dark ? "#f4f4f5" : "#1e293b",
                                        lineHeight: 1.4,
                                        fontFamily: "'Inter', sans-serif"
                                    }}>
                                        {(() => {
                                            const fullText = t.profileReminder || "Important : Veuillez compléter les informations de votre profil.";
                                            const parts = fullText.split(":");
                                            // Robust check for "Important" or Arabic equivalent "هام"
                                            if (parts.length > 1 && (
                                                parts[0].trim().toLowerCase().includes("important") ||
                                                parts[0].trim().includes("هام")
                                            )) {
                                                return (
                                                    <>
                                                        <span style={{ color: "#ef4444" }}>{parts[0]}</span> : {parts.slice(1).join(":")}
                                                    </>
                                                );
                                            }
                                            return fullText;
                                        })()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowProfileReminder(false)}
                                    style={{
                                        background: "none", border: "none", color: "var(--muted2)",
                                        cursor: "pointer", padding: 4, display: "flex", opacity: 0.6,
                                        position: "relative", zIndex: 2
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>
                            {/* Progress Bar */}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: "12px",
                                height: "3px",
                                background: "#3b82f6",
                                width: "calc(100% - 20px)",
                                transformOrigin: "left",
                                animation: "toastProgress 15s linear forwards",

                                borderRadius: "2px"
                            }} />

                            <style>{`
                                @keyframes toastFadeIn {
                                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                                    to { opacity: 1; transform: translateY(0) scale(1); }
                                }
                                @keyframes toastProgress {
                                    from { transform: scaleX(1); }
                                    to { transform: scaleX(0); }
                                }
                                .anim-svg-stats path { transition: transform 0.3s; transform-origin: bottom; }
                                button:hover .anim-svg-stats path:nth-child(1) { transform: scaleY(1.3); }
                                button:hover .anim-svg-stats path:nth-child(2) { transform: scaleY(1.5); }
                                button:hover .anim-svg-stats path:nth-child(3) { transform: scaleY(1.2); }
                                
                                .anim-svg-revenue { transition: transform 0.3s; }
                                button:hover .anim-svg-revenue { transform: translateY(-2px) rotate(5deg); }
                                
                                .anim-svg-fleet { transition: transform 0.3s; }
                                button:hover .anim-svg-fleet { transform: translateX(3px); }
                                
                                .anim-svg-clients { transition: transform 0.3s; }
                                button:hover .anim-svg-clients { transform: scale(1.1); color: #f59e0b; }
                            `}</style>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
