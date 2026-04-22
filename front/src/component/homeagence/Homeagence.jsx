import React, { useState, useEffect, useRef } from "react";
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
.section-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:900;letter-spacing:-.4px;position:relative;display:inline-block;}
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
.modal-overlay{position:fixed;inset:0;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease;padding: 10px;}
.modal{background:var(--card);border:1px solid var(--border);border-radius:24px;padding:32px;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;animation:slideUp .3s cubic-bezier(.16,1,.3,1);position:relative;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);scrollbar-width: thin; transition: all 0.3s ease;position: relative;bottom: 3px;}
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
    max-height: 98vh; 
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
    map: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"],
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
const CARS = [];
const RESERVATIONS = [];
const CLIENTS = [];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const REVENUE = [0, 0, 0, 0, 0, 0, 0];
const WEEKLY_REVENUE = [0, 0, 0, 0, 0, 0, 0];
const BOOKINGS_PER_MONTH = [0, 0, 0, 0, 0, 0, 0];

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

function RevenueSummary({ dark, t, lang, currency }) {
    const breakdown = [
        { key: "baseRental", val: "0.00" },
        { key: "discounts", val: "0.00" },
        { key: "insuranceOptions", val: "0.00" },
        { key: "serviceFees", val: "0.00" },
        { key: "taxes", val: "0.00" },
        { key: "netRevenue", val: "0.00" },
    ];

    const localizedDays = lang === 'ar'
        ? ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"]
        : lang === 'fr'
            ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className="grid-revenue" style={{ animation: "fadeUp .6s ease" }}>
            {/* Chart Part */}
            <div className="card" style={{ padding: 0, position: "relative", overflow: "hidden" }}>
                <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="section-title" style={{ fontSize: 14, color: "var(--muted2)" }}>{t.weeklyRevenue}</div>
                    <div style={{ color: "var(--muted2)", cursor: "pointer" }}><Icon d={icons.info} size={16} /></div>
                </div>
                <div style={{ padding: "24px 32px" }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 27, fontWeight: 900, color: "var(--text)" }}>{currency} 0.00 —</div>
                    </div>
                    {/* Desktop Version */}
                    <div className="mobile-hide">
                        <LineChart data={WEEKLY_REVENUE} labels={localizedDays} color={dark ? "#60a5fa" : "#10b981"} simplified height={220} t={t} lang={lang} showLegend />
                    </div>
                    {/* Mobile Version */}
                    <div className="desktop-hide">
                        <LineChart data={WEEKLY_REVENUE} labels={localizedDays} color={dark ? "#60a5fa" : "#10b981"} simplified height={340} t={t} lang={lang} showLegend />
                    </div>
                </div>
            </div>

            {/* Breakdown Part */}
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
                                <div style={{ fontSize: 13, fontWeight: 800 }}>{currency} {item.val}</div>
                                <div style={{ width: 12, height: 1, background: "var(--border2)" }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: "16px 24px", marginTop: 4, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: "var(--accent)" }}>{t.totalRevenue}</div>
                        <div style={{ fontSize: 15, fontWeight: 900 }}>{currency} 0.00 —</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LineChart({ data, labels, color = "#10b981", title, height = 200, simplified = false, t, lang, showLegend = false }) {
    const isAllZero = data.every(v => v === 0);
    const W = 680, H = height, PX = 16, PY = 16;
    const max = isAllZero ? 1 : Math.max(...data);
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
        x: PX + (i / (data.length - 1)) * (W - PX * 2),
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
            <div style={{ width: "100%", position: "relative" }}>
                <svg
                    viewBox={`0 -10 680 ${H + 40}`}
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
                    {/* Horizontal grid lines */}
                    {[0, 1, 2].map(i => (
                        <line key={i} x1="0" y1={(H / 2) * i} x2="680" y2={(H / 2) * i} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
                    ))}

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
                                        <rect x="-30" y="-14" width="60" height="22" rx="4" fill="var(--surface2)" stroke="var(--border)" />
                                        <text x="0" y="2" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="bold">{data[hoverIndex]}</text>
                                    </g>
                                </>
                            )}
                        </>
                    )}

                    {/* X Axis Labels */}
                    <g>
                        {labels.map((l, i) => (
                            <text key={i} x={PX + (i / (labels.length - 1)) * (W - PX * 2)} y={H + 24} textAnchor="middle" style={{ transition: "all 0.2s", fontSize: 11, fill: hoverIndex === i ? color : "var(--muted2)", fontWeight: hoverIndex === i ? 800 : 600 }}>{l}</text>
                        ))}
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
        <div className="card" style={{ padding: 0 }}>
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
            <div style={{ padding: "24px 28px 16px" }}>
                <svg viewBox={`0 0 680 ${H} `} width="100%" height={H} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="vgrid" width="97.14" height="40" patternUnits="userSpaceOnUse">
                            <line x1="97.14" y1="0" x2="97.14" y2={H} stroke="var(--border)" strokeWidth="0.5" />
                        </pattern>
                        <pattern id="hgrid" width="680" height="40" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="40" x2="680" y2="40" stroke="var(--border)" strokeWidth="0.5" />
                        </pattern>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="680" height={H} fill="url(#hgrid)" />
                    <rect width="680" height={H} fill="url(#vgrid)" />
                    <line x1="0" y1={H - 0.5} x2="680" y2={H - 0.5} stroke="var(--border2)" strokeWidth="0.5" />
                    {isAllZero ? (
                        <text x="340" y={H / 2} textAnchor="middle" dominantBaseline="middle"
                            style={{ fontSize: 13, fill: "var(--muted2)", fontWeight: 500 }}>
                            {t.noDataPeriod}
                        </text>
                    ) : (
                        <>
                            <path d={fillPath} fill={`url(#${gradId})`} />
                            <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            {pts.map((p, i) => (
                                <g key={i}>
                                    <circle cx={p.x} cy={p.y} r="4" fill={color} opacity="0.2" />
                                    <circle cx={p.x} cy={p.y} r="2.5" fill="var(--card)" stroke={color} strokeWidth="1.5" />
                                </g>
                            ))}
                        </>
                    )}
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, padding: "0 2px" }}>
                    {labels.map((l, i) => (
                        <span key={i} style={{ fontSize: 11, color: "var(--muted2)", fontWeight: 500 }}>{l}</span>
                    ))}
                </div>
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
        </div>
    );
}

function CarModal({ car, onClose, onSave, t, dark }) {
    const [form, setForm] = useState(car || { name: "", plate: "", category: "SUV", price: "", fuel: "Essence", seats: 5, status: "available", city: "", photos: [], startDate: "", endDate: "" });
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
                    <div className="form-group"><label className="form-label">{t.colCategory}</label><select className="form-input form-select" value={form.category} onChange={e => handleChange("category", e.target.value)}>{["SUV", "Sport", "Berline", "Luxe", "Cabriolet"].map(c => <option key={c}>{c}</option>)}</select></div>
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

const CURRENCIES_LIST = [
    { code: "MAD", translations: { fr: "Dirham Marocain", en: "Moroccan Dirham", ar: "درهم مغربي" } },
    { code: "AED", translations: { fr: "Dirham des Émirats", en: "UAE Dirham", ar: "درهم إماراتي" } },
    { code: "USD", translations: { fr: "Dollar US", en: "US Dollar", ar: "دولار أمريكي" }, symbol: "$" },
    { code: "EUR", translations: { fr: "Euro", en: "Euro", ar: "يورو" }, symbol: "€" },
    { code: "AFN", translations: { fr: "Afghani Afghan", en: "Afghan Afghani", ar: "أفغاني أفغانستان" }, symbol: "؋" },
    { code: "ALL", translations: { fr: "Lek Albanais", en: "Albanian Lek", ar: "ليك ألباني" } },
    { code: "AMD", translations: { fr: "Dram Arménien", en: "Armenian Dram", ar: "درام أرميني" }, symbol: "֏" },
];

function DashboardPage({ dark, t, lang, cars = [], currency, setCurrency }) {
    const localizedDays = lang === 'ar'
        ? ["إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"]
        : lang === 'fr'
            ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const pending = RESERVATIONS.filter(r => r.status === "pending").length;
    const available = cars.filter(c => c.status === "available").length;

    const [activePeriod, setActivePeriod] = useState("thisWeek");
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

    // Simple hover helper logic
    const handleWeekHoverEntry = (e, targetActive) => {
        if (targetActive) return; // do not apply hover effect if already active
        e.currentTarget.style.background = dark ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)" : "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)";
    };
    const handleWeekHoverLeave = (e, targetActive) => {
        if (targetActive) return;
        Object.assign(e.currentTarget.style, inactiveWeekStyle);
    };

    return (
        <div className="page tab-content">
            <div className="dashboard-filters-row" style={{ display: "flex", justifyContent: "flex-start", gap: "8px", marginBottom: 20, marginTop: -12, position: "relative", zIndex: 999, bottom: "1px" }}>
                {/* This Week Button */}
                <button
                    onClick={() => setActivePeriod("thisWeek")}
                    style={activePeriod === "thisWeek" ? activeWeekStyle : inactiveWeekStyle}
                    onMouseEnter={e => handleWeekHoverEntry(e, activePeriod === "thisWeek")}
                    onMouseLeave={e => handleWeekHoverLeave(e, activePeriod === "thisWeek")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activePeriod === "thisWeek" ? "currentColor" : (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>{t.thisWeek}</span>
                </button>

                {/* Last Week Button */}
                <button
                    onClick={() => setActivePeriod("lastWeek")}
                    style={activePeriod === "lastWeek" ? activeWeekStyle : inactiveWeekStyle}
                    onMouseEnter={e => handleWeekHoverEntry(e, activePeriod === "lastWeek")}
                    onMouseLeave={e => handleWeekHoverLeave(e, activePeriod === "lastWeek")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activePeriod === "lastWeek" ? "currentColor" : (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9h18M9 3v18M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.5Z"></path>
                        <circle cx="12" cy="14" r="2"></circle>
                    </svg>
                    <span>{t.lastWeek}</span>
                </button>

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
                <StatCard label={t.revenueMonth} value={`${currency} 0.00 —`} color="#10b981" icon={<Icon d={icons.dollar} size={16} />} />
                <StatCard label={t.reservations} value="0 —" color="#3b82f6" icon={<Icon d={icons.reservations} size={16} />} />
                <StatCard label={t.carsAvailable} value={`${available} /${cars.length} —`} color="#a855f7" icon={<Icon d={icons.cars} size={16} />} />
                <StatCard label={t.activeClients} value="0 —" color="#f59e0b" icon={<Icon d={icons.users} size={16} />} />
            </div>

            <RevenueSummary dark={dark} t={t} lang={lang} currency={currency} />

            <div className="grid-3" style={{ marginBottom: "24px" }}>
                <LineChart data={BOOKINGS_PER_MONTH} labels={lang === 'ar' ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"] : MONTHS} color="#f59e0b" title={t.monthlyBookings} height={300} t={t} lang={lang} />

                {/* Recent reservations */}
                <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="section-title">{t.latestReservations}</span>
                        {pending > 0 && <span style={{ background: "rgba(245,158,11,.15)", color: "#f59e0b", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(245,158,11,.25)", animation: "badgePulse 2s infinite" }}>{pending} {t.pendingBadge}</span>}
                    </div>
                    {RESERVATIONS.length === 0 && <div className="empty-state" style={{ flex: 1, padding: 40 }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg><div style={{ marginTop: 14, fontSize: 14, fontWeight: 600 }}>{t.emptyResv}</div></div>}
                    {RESERVATIONS.slice(0, 4).map((r, i) => (
                        <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: i < 3 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "background .2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                            <div style={{ width: 36, height: 36, borderRadius: 12, background: `${r.color}20`, border: `1px solid ${r.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: r.color, fontWeight: 900, fontSize: 12, flexShrink: 0 }}>{r.avatar}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{r.client}</div>
                                <div style={{ fontSize: 11, color: "var(--muted2)" }}>{r.car} · {r.from}–{r.to}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 3 }}>{r.amount.toLocaleString()} MAD</div>
                                <span className={`badge ${r.status}`}><span className="badge-dot" />{r.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid-2">
                <div className="card" style={{ padding: 0 }}>
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
                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid var(--border)" }}>
                        <span className="section-title">{t.recentActivity}</span>
                    </div>
                    <div style={{ padding: "8px 20px" }}>
                        <div className="empty-stateee" style={{ padding: 30 }}><div style={{ marginTop: 10, fontSize: 14, fontWeight: 600 }}>Aucune activité récente</div></div>
                    </div>
                </div>
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
        if (modal || confirm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
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

function ReservationsPage({ t }) {
    const [reservations, setReservations] = useState(RESERVATIONS);
    const [filterStatus, setFilterStatus] = useState("all");

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

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map(r => (
                    <div key={r.id} className="card resv-card" style={{ padding: 0 }}>
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
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "var(--accent)" }}>€{r.amount.toLocaleString()}</div>
                                    <span className={`badge ${r.status}`}><span className="badge-dot" />{r.status}</span>
                                </div>
                                {r.status === "pending" && (
                                    <div style={{ display: "flex", gap: 8 }}>
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

function CustomersPage({ t }) {
    const [search, setSearch] = useState("");
    const filtered = CLIENTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
    const tierColor = { Platinum: "#bf7fff", Gold: "#f59e0b", Silver: "#9ca3af" };

    return (
        <div className="page tab-content">
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <div className="search-bar" style={{ flex: 1 }}>
                    <Icon d={icons.search} size={16} stroke="var(--muted2)" />
                    <input placeholder={t.searchClient} value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="btn btn-ghost"><Icon d={icons.filter} size={14} /> {t.filterBtn}</button>
            </div>

            <div className="grid-2">
                <div className="card" style={{ padding: 0 }}>
                    {filtered.map((c, i) => (
                        <div key={c.name} className="client-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <div className="client-avatar" style={{ background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color }}>{c.initials}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.name}</div>
                                <div style={{ fontSize: 12, color: "var(--muted2)" }}>{c.email}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 3 }}>{c.spend}</div>
                                <span style={{ fontSize: 10, fontWeight: 800, color: tierColor[c.tier], background: `${tierColor[c.tier]}15`, border: `1px solid ${tierColor[c.tier]}30`, padding: "2px 8px", borderRadius: 8 }}>{c.tier}</span>
                            </div>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "space-center", cursor: "pointer", marginLeft: 8 }}>
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
                        {[{ t: "Platinum", c: "#bf7fff", n: 1 }, { t: "Gold", c: "#f59e0b", n: 2 }, { t: "Silver", c: "#9ca3af", n: 2 }].map(({ t, c, n }) => (
                            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                                <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{t}</span>
                                <div style={{ flex: 3, height: 6, borderRadius: 3, background: "var(--surface2)" }}>
                                    <div style={{ height: "100%", width: `${(n / CLIENTS.length) * 100}%`, background: c, borderRadius: 3 }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 800, color: c }}>{n}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card" style={{ padding: "20px" }}>
                        <div className="section-title" style={{ marginBottom: 16 }}>{t.topSpenders}</div>
                        <div className="empty-state" style={{ padding: 20 }}><div style={{ fontSize: 13, fontWeight: 600 }}>Aucune donnée de client</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsPage({ dark, t }) {
    const totalRevenue = REVENUE.reduce((a, b) => a + b, 0);
    const totalBookings = BOOKINGS_PER_MONTH.reduce((a, b) => a + b, 0);
    return (
        <div className="page tab-content">
            <div className="stats-grid" style={{ marginBottom: 20 }}>
                <StatCard label={t.totalRevYear} value={`MAD 0.00 — `} change="+0% vs 2026" up color="#10b981" icon={<Icon d={icons.dollar} size={16} />} />
                <StatCard label={t.totalResv} value={totalBookings} change="+0% vs 2026" up color="#3b82f6" icon={<Icon d={icons.calendar} size={16} />} />
                <StatCard label={t.useRate} value="0%" change="+0pt vs 2026" up color="#a855f7" icon={<Icon d={icons.trending} size={16} />} />
                <StatCard label={t.avgRevInResv} value="MAD 0.00 —" change="+0% vs 2026" up color="#f59e0b" icon={<Icon d={icons.trending} size={16} />} />
            </div>

            <div className="grid-2">
                <LineChart data={REVENUE} labels={MONTHS} color={dark ? "#60a5fa" : "#10b981"} title={t.monthlyRevChart} height={400} t={t} showLegend />
                <LineChart data={BOOKINGS_PER_MONTH} labels={MONTHS} color={dark ? "#a78bfa" : "#a855f7"} title={t.monthlyResvChart} height={400} t={t} showLegend />
            </div>

            <div className="card" style={{ padding: "20px" }}>
                <div className="section-title" style={{ marginBottom: 16 }}>{t.topCars}</div>
                <div className="empty-state" style={{ padding: 30 }}><div style={{ fontSize: 14, fontWeight: 600 }}>Aucune donnée de location</div></div>
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
        logo: agencyData?.logo || ""
    });

    // Sync formData when agencyData changes (e.g., on mount after localStorage load)
    useEffect(() => {
        setFormData({
            agencyName: agencyData?.agencyName || "",
            firstName: agencyData?.firstName || "",
            lastName: agencyData?.lastName || "",
            city: agencyData?.city || "",
            phone: agencyData?.phone || "",
            address: agencyData?.address || "",
            logo: agencyData?.logo || ""
        });
    }, [agencyData]);

    const handleSave = () => {
        const newData = { ...agencyData, ...formData };
        setAgencyData(newData);
        localStorage.setItem("agencyData", JSON.stringify(newData));
        setIsEditing(false);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newLogo = reader.result;
                setFormData(f => ({ ...f, logo: newLogo }));
                const newData = { ...agencyData, logo: newLogo };
                setAgencyData(newData);
                localStorage.setItem("agencyData", JSON.stringify(newData));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoDelete = () => {
        setFormData(f => ({ ...f, logo: "" }));
        const newData = { ...agencyData, logo: "" };
        setAgencyData(newData);
        localStorage.setItem("agencyData", JSON.stringify(newData));
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
                                    <label style={{ cursor: "pointer", display: "block", width: "100%", height: "100%" }}>
                                        <div style={{ width: "100%", height: "100%", borderRadius: 16, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 20, color: "#fff", overflow: "hidden" }}>
                                            {formData.logo ? (
                                                <img src={formData.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            ) : (
                                                agencyInitials
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
                                    </label>

                                    {formData.logo ? (
                                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleLogoDelete(); }} style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: 6, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, cursor: "pointer" }} title="Supprimer le logo">
                                            <Icon d={icons.trash} size={11} stroke="#fff" />
                                        </div>
                                    ) : (
                                        <div style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderRadius: 6, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
                                            <Icon d={icons.upload} size={11} stroke="#fff" />
                                        </div>
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

function MessagesPage({ t, dark, lang }) {
    const [activeChat, setActiveChat] = useState("support");
    const [message, setMessage] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [emojiSearch, setEmojiSearch] = useState("");
    const [emojiCat, setEmojiCat] = useState("Smileys");

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

    const [messages, setMessages] = useState({
        "support": [
            { id: 1, from: "support", text: t.supportGreeting, time: "09:00", read: true },

        ]
    });

    const contacts = [];

    const sendMessage = () => {
        if (!message.trim()) return;
        const newMsg = { id: Date.now(), from: "me", text: message, time: t.now, read: false };
        setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
        setMessage("");
        setTimeout(() => {
            const replies = t.autoReplies;
            const reply = { id: Date.now() + 1, from: "support", text: replies[Math.floor(Math.random() * replies.length)], time: t.now, read: false };
            setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), reply] }));
        }, 1200);
    };

    const supportContact = { id: "support", name: t.supportName, role: t.assistance, avatar: "SU", color: dark ? "#6366f1" : "#10b981", unread: 0, online: true };
    const active = activeChat === "support" ? supportContact : (contacts.find(c => c.id === activeChat) || supportContact);
    const chatMessages = messages[activeChat] || [];

    return (
        <div className="page tab-content messages-layout" style={{ height: "calc(100dvh - 140px)", display: "flex", gap: 16 }}>
            {/* LEFT — Contacts */}
            <div className="messages-sidebar" style={{ width: 300, flexShrink: 0, background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
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
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface2)", borderRadius: 20, padding: "15px 13px", border: "1px solid var(--accent-color)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <input placeholder={t.searchPlaceholder} style={{ background: "transparent", border: "none", outline: "none", fontSize: 13, color: "var(--text)", flex: 1 }} />
                    </div>
                </div>
                {/* Contact list */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {contacts.length === 0 ? (
                        <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "var(--muted2)", opacity: 0.8, textAlign: "center", height: "100%", animation: "fadeUp .4s ease" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{t.noMessages}</span>
                            <span style={{ fontSize: 11, opacity: 0.7 }}>{t.emptyInboxSub}</span>
                        </div>
                    ) : (
                        contacts.map((c, i) => (
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
                                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${c.color}, ${c.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", boxShadow: `0 4px 12px ${c.color}40` }}>{c.avatar}</div>
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

                {/* ANIMATED SUPPORT BUTTON AT THE BOTTOM */}
                <div onClick={() => setActiveChat("support")} style={{
                    padding: "16px",
                    borderTop: "1px solid var(--border)",
                    background: activeChat === "support" ? (dark ? "rgba(99,102,241,0.08)" : "rgba(16, 185, 129, 0.08)") : "var(--surface2)",
                    transition: "all .3s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    borderInlineStart: activeChat === "support" ? "3px solid var(--accent)" : "3px solid transparent"
                }}>
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        background: dark ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "linear-gradient(135deg, #059669, #197553)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        boxShadow: activeChat === "support"
                            ? (dark ? "0 4px 15px rgba(99,102,241,0.4)" : "0 4px 15px rgba(16, 185, 129, 0.4)")
                            : (dark ? "0 4px 10px rgba(99,102,241,0.2)" : "0 4px 10px rgba(16, 185, 129, 0.2)")
                    }}>
                        <svg className="anim-svg-chat-elite" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>{t.supportName}</div>
                        <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 800, letterSpacing: "0.5px" }}>{t.assistance}</div>
                    </div>
                    {/* Pulsing indicator */}
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                </div>
            </div>

            {/* RIGHT — Chat */}
            <div className="messages-chat" style={{ flex: 1, background: "var(--card)", borderRadius: 20, border: "1px solid var(--border)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Chat header */}
                <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, background: "var(--surface2)" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${active.color}, ${active.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", boxShadow: `0 4px 12px ${active.color}40` }}>{active.avatar}</div>
                        {active.online && <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid var(--surface2)", boxShadow: "0 0 6px #22c55e" }} />}
                    </div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>{active.name}</div>
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
                                {msg.from === "support" && (
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${active.color}, ${active.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#fff", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>{active.avatar[0]}</div>
                                )}
                                <div style={{ maxWidth: "65%" }}>
                                    <div style={{
                                        background: msg.from === "me" ? (dark ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "linear-gradient(135deg, #059669, #197553)") : "var(--surface2)",
                                        color: msg.from === "me" ? "#fff" : "var(--text)",
                                        padding: "10px 14px",
                                        borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        boxShadow: msg.from === "me" ? (dark ? "0 4px 12px rgba(99,102,241,0.3)" : "0 4px 12px rgba(16,185,129,0.3)") : "0 2px 8px rgba(0,0,0,0.06)",
                                        border: msg.from === "me" ? "none" : "1px solid var(--border)"
                                    }}>
                                        {msg.text}
                                    </div>
                                    <div style={{ fontSize: 10, color: "var(--muted2)", marginTop: 4, textAlign: msg.from === "me" ? "right" : "left" }}>{msg.time} {msg.from === "me" && "✓✓"}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

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
                            placeholder={t.writeMessage} style={{ background: "transparent", border: "none", outline: "none", flex: 1, fontSize: 16, fontWeight: 500, color: "var(--text)", letterSpacing: "0.2px" }} />
                    </div>
                    <div
                        onClick={sendMessage}
                        className="btn-premium-shine chat-mobile-btn"
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: dark ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "linear-gradient(135deg, #059669 0%, #0faa36b9 50%, #197553ff 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: dark ? "0 4px 12px rgba(99,102,241,0.4)" : "0 4px 12px rgba(16, 185, 129, 0.4)",
                            transition: "all .2s",
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

function FinancePage({ t }) {
    const animatedValue = (val, color) => (
        <span className="text-animate-glow" style={{ color }}>{val}</span>
    );

    return (
        <div className="page tab-content finance-page" style={{ padding: "10px 40px" }}>
            <div className="stats-grid" style={{ gap: 0, marginBottom: 48, gridTemplateColumns: "1fr" }}>
                <div className="stat-card-lg" style={{ textAlign: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
                    <div className="stat-label" style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 13 }}>TVA Collectée (2026)</div>
                    <div className="stat-value finance-stat-value" style={{ fontSize: 62, margin: "16px 0" }}>0 MAD</div>
                    <div className="stat-change up" style={{ color: "#3b82f6", fontSize: 14 }}>
                        <Icon d={icons.arrow} size={16} style={{ transform: "rotate(-45deg)" }} />
                        Prêt pour déclaration · 0 MAD au total
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-row-animate" style={{ animationDelay: "0.2s" }}>
                            <td colSpan="5" style={{ textAlign: "center", padding: 60, color: "var(--muted2)", background: "var(--surface2)", borderRadius: 24, border: "1px dashed var(--border)" }}>
                                <Icon d={icons.finance} size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                                <div style={{ fontSize: 15, fontWeight: 600 }}>{t.quietPeriod}</div>
                                <div style={{ fontSize: 13, marginTop: 4 }}>{t.futureInvoices}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* MOBILE LIST */}
            <div className="finance-mobile-list" style={{ marginTop: 20 }}>
                <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted2)", background: "var(--surface2)", borderRadius: 24, border: "1px dashed var(--border)" }}>
                    <Icon d={icons.finance} size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{t.quietPeriod}</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>{t.futureInvoices}</div>
                </div>
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

    // Fetch cars from backend
    useEffect(() => {
        if (agencyData && agencyData.id) {
            fetch(`http://localhost:8080/api/cars/agency/${agencyData.id}`)
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
    // useEffect(() => {
    //     localStorage.setItem("agencyCars", JSON.stringify(cars));
    // }, [cars]);

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
            ? `http://localhost:8080/api/cars/${form.id}`
            : "http://localhost:8080/api/cars";
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
        fetch(`http://localhost:8080/api/cars/${id}`, { method: "DELETE" })
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

    const pending = RESERVATIONS.filter(r => r.status === "pending").length;

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
    const pageBadge = { dashboard: t.live, cars: `${cars.length} ${t.vehiclesCount}`, map: "Live GPS", reservations: `${RESERVATIONS.length} ${t.total}`, customers: `${CLIENTS.length} ${t.customers}`, messages: t.unreadCount, finance: "Q1 2024", analytics: "2024", settings: t.agencyPro };

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
                        {page === "dashboard" && <DashboardPage dark={dark} t={t} cars={cars} currency={currency} setCurrency={setCurrency} lang={lang} />}
                        {page === "cars" && <CarsPage t={t} cars={cars} onSave={handleSaveCar} onDelete={handleDeleteCar} dark={dark} />}
                        {page === "map" && <MapPage t={t} cars={cars} agencyData={agencyData} lang={lang} />}
                        {page === "reservations" && <ReservationsPage t={t} />}
                        {page === "customers" && <CustomersPage t={t} />}
                        {page === "messages" && <MessagesPage t={t} dark={dark} lang={lang} />}
                        {page === "finance" && <FinancePage t={t} />}
                        {page === "analytics" && <AnalyticsPage dark={dark} t={t} />}
                        {page === "settings" && <SettingsPage dark={dark} setDark={setDark} t={t} agencyData={agencyData} setAgencyData={setAgencyData} lang={lang} setLang={setLang} />}
                    </div>
                </main>
            </div>
        </>
    );
} 