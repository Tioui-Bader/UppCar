import {
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon,
    Zap as ZapIcon,
    Users as UsersIcon,
    MapPin as MapPinIcon,
    Calendar as CalendarIcon,
    ShieldCheck as ShieldIcon,
    Fuel as FuelIcon,
    Gauge as GaugeIcon,
    Palette as ColorIcon,
    CreditCard as CardIcon,
    CheckCircle2 as SuccessIcon,
    Info as InfoIcon,
    Sun as SunIcon,
    Moon as MoonIcon,
    Globe as GlobeIcon,
    Star as StarIcon,
    Lock as LockIcon,
    Award as AwardIcon,
    Clock as ClockIcon,
    ChevronLeft,
    ChevronRight,
    Tag as TagIcon,
    Check
} from 'lucide-react';
import { AR } from "./ar";
import { FR } from "./fr";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const styles = `

:root {
  --bg-color: #f6fdf9;
  --text-main: #064e3b;
  --text-muted: #166534;
  --text-muteddd: #dfece4ff;
  --nav-bg: rgba(255, 255, 255, 0.7);
  --nav-border: rgba(6, 78, 59, 0.08);
  --card-bg: rgba(255, 255, 255, 0.85);
  --card-border: rgba(6, 78, 59, 0.1);
  --accent-gradient: linear-gradient(135deg, #059669 0%, #10b981 50%, #3b82f6 100%);
  --accent-color: #10b981;
  --glass-bg: rgba(255, 255, 255, 0.6);
  --glass-border: rgba(6, 78, 59, 0.1);
  --bento-bg: rgba(255, 255, 255, 0.4);
  --bento-text: #064e3b;
  --booking-bg: rgba(255, 255, 255, 0.75);
  --booking-border: rgba(6, 78, 59, 0.1);
  --booking-shadow: 0 40px 100px rgba(6, 78, 59, 0.12);
  --wow-gradient: linear-gradient(135deg, #059669, #10b981, #3b82f6);
  --bg-colorrr: #181818;
  --re-color: #73ff00ff;

}

[data-theme='dark'] {
  --bg-color: #05070a;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-muteddd: #94a3b8;
  --nav-bg: rgba(10, 14, 26, 0.75);
  --nav-border: rgba(255, 255, 255, 0.08);
  --card-bg: rgba(15, 23, 42, 0.6);
  --card-border: rgba(255, 255, 255, 0.1);
  --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f43f5e 100%);
  --accent-color: #60a5fa;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --bento-bg: rgba(255, 255, 255, 0.02);
  --bento-text: #ffffff;
  --booking-bg: rgba(10, 15, 30, 0.6);
  --booking-border: rgba(255, 255, 255, 0.08);
  --booking-shadow: 0 80px 180px rgba(0,0,0,0.4);
  --wow-gradient: linear-gradient(10deg, #000000ff, #ffffffff, #ffffffff, #ffffffff, #ffffffff);
  --bg-colorrr: #05070a;
    --re-color: #fffffeff;


}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg-color); color: var(--text-main); position: relative; font-family: 'Outfit', sans-serif; overflow-x: hidden; }

.home-base-bg { position: fixed; inset: 0; z-index: -10; background: var(--bg-color); }
.home-mesh-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; filter: blur(50px) contrast(110%); }
[data-theme='dark'] .home-mesh-bg {
  background: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.4) 0, transparent 45%),
    radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.35) 0, transparent 40%),
    radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.3) 0, transparent 45%),
    radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.25) 0, transparent 40%);
}
[data-theme='light'] .home-mesh-bg {
  background: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.15) 0, transparent 45%),
    radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.15) 0, transparent 40%);
}
.home-noise-bg { position: fixed; inset: 0; z-index: 5; pointer-events: none; }
[data-theme='dark'] .home-noise-bg { opacity: 0.04; }
:root .home-noise-bg { opacity: 0.07; }

.home-blob { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 1; animation: homeDrift 18s ease-in-out infinite; }
.home-blob1 { width: 600px; height: 400px; top: -150px; left: -150px; background: rgba(16, 185, 129, .15); }
.home-blob2 { width: 450px; height: 550px; bottom: -150px; right: -100px; background: rgba(99, 102, 241, .12); }
.home-blob3 { width: 320px; height: 320px; top: 40%; left: 30%; background: rgba(245, 158, 11, .08); }
.home-blob4 { width: 220px; height: 220px; top: 20%; right: 30%; background: rgba(168, 85, 247, .1); }

@keyframes homeDrift { 0%, 100% { transform: translate(0,0) scale(1) rotate(0deg); } 33% { transform: translate(30px,-20px) scale(1.08) rotate(3deg); } 66% { transform: translate(-20px,30px) scale(.95) rotate(-3deg); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
@keyframes spinWheel { 100% { transform: rotate(360deg); } }
@keyframes driveBumps { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes cardFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

.nav-wrapper { position: sticky; top: 10px; z-index: 100; margin: 0 20px; transition: all 0.3s ease; }
.nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 10px 26px;  -webkit-backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(0,0,0,0.05); }

.icon-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--nav-border); color: var(--text-main); cursor: pointer; padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; }
.icon-btnee { background: rgba(255,255,255,0.05); border: 1px solid var(--nav-border); color: #ffffffff; cursor: pointer; padding: 10px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); position: relative; }

.primary-btnE {
  background: var(--text-main);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 10px 24px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.primary-btnE:hover { 
  background: var(--accent-gradient);
  transform: translateY(-2px); 
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2); 
}
[data-theme='dark'] .primary-btnE { background: #1d4ed8; box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3); }
[data-theme='dark'] .primary-btnE:hover { background: #1e40af; box-shadow: 0 8px 25px rgba(29, 78, 216, 0.4); }

.cd-layout { 
  max-width: 1600px; 
  margin: 0 auto 100px; 
  padding: 0 40px; 
  display: grid; 
  grid-template-columns: 1fr 440px; 
  gap: 80px; 
  position: relative;
  z-index: 10;
}

.cd-hero-container {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 85vh;
  margin-bottom: -150px;
  overflow: hidden;
  z-index: 1;
  position:relative;
  bottom:67px;
}

.cd-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
  transition: transform 3s cubic-bezier(0.16, 1, 0.3, 1);
  scale: 1.05;
}

.cd-hero-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-family: 'Syne', sans-serif;
  font-size: 25vw;
  font-weight: 800;
  white-space: nowrap;
  opacity: 0.15;
  color: transparent;
  -webkit-text-stroke: 1px var(--text-main);
  pointer-events: none;
  z-index: 1;
  animation: bgTextFloat 20s linear infinite;
}

@keyframes bgTextFloat { 
  0%, 100% { transform: translate(-50%, -60%) skewX(-5deg); } 
  50% { transform: translate(-48%, -58%) skewX(5deg); } 
}

.cd-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, var(--bg-colorrr) 95%);
  z-index: 2;
}

.cd-hero-content {
  position: absolute;
  bottom: 180px;
  left: 10%;
  width: 80%;
  z-index: 3;
  animation: revealUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes revealUp { 
  from { opacity: 0; transform: translateY(60px) skewY(2deg); } 
  to { opacity: 1; transform: translateY(0) skewY(0deg); } 
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 180px;
  gap: 24px;
  margin-top: 60px;
}

.bento-card {
  background: var(--bento-bg);
  border: 1px solid var(--glass-border);
  border-radius: 40px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  padding: 40px;
  color: var(--bento-text);
  transition: transform 0.1s ease-out, border-color 0.4s, box-shadow 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 40px rgba(0,0,0,0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* 8 PANEL VARIATIONS (Optimized for both themes) */
.bc-1 { background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(16, 185, 129, 0.25); }
.bc-2 { background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(59, 130, 246, 0.25); }
.bc-3 { background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(139, 92, 246, 0.25); }
.bc-4 { background: radial-gradient(circle at top right, rgba(20, 184, 166, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(20, 184, 166, 0.25); }
.bc-5 { background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(245, 158, 11, 0.25); }
.bc-6 { background: radial-gradient(circle at top right, rgba(236, 72, 153, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(236, 72, 153, 0.25); }
.bc-7 { background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(99, 102, 241, 0.25); }
.bc-8 { background: radial-gradient(circle at top right, rgba(168, 85, 247, 0.2), transparent 70%), var(--bento-bg); border-color: rgba(168, 85, 247, 0.25); }

.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.bento-card::after {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%);
  animation: flowScan 8s linear infinite;
  pointer-events: none;
}

@keyframes flowScan {
  0% { transform: translate(-30%, -30%); }
  100% { transform: translate(30%, 30%); }
}

.bento-card:hover { border-color: var(--accent-color); box-shadow: 0 40px 100px rgba(0,0,0,0.2); }
.bento-card:hover::before { opacity: 1; }

.booking-module {
  background: var(--booking-bg);
  border: 1px solid var(--booking-border);
  border-radius: 48px;
  padding: 48px;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  box-shadow: var(--booking-shadow);
  position: sticky;
  top: 40px;
  z-index: 20;
  overflow: hidden;
}

.booking-module::before {
  content: var(--elite-ribbon, 'ELITE ACCESS');
  position: absolute;
  top: 39px;
  right: -49px;
  background: var(--accent-gradient);
  color: #fff;
  font-size: var(--elite-font-size, 10px);
  font-weight: 900;
  padding: 5px 60px;
  transform: rotate(45deg);
  letter-spacing: 2px;
  box-shadow: 0 10px 20px rgba(16,185,129,0.3);
}

.elite-price-val {
  font-size: 80px;
  font-weight: 950;
  font-family: 'Syne', sans-serif;
  letter-spacing: -4px;
  background: linear-gradient(180deg, var(--text-main) 0%, var(--text-muted) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 0.9;
}

[data-theme='dark'] .elite-price-val {
  background-image: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pulse-glow {
  width: 10px; height: 10px; background: #10b981; border-radius: 50%;
  box-shadow: 0 0 20px #10b981; animation: pulse 2s infinite;
}

@keyframes liquidShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes platGradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.dna-text-gradient {
  background-image: linear-gradient(270deg, #059669, #10b981, #0ea5e9, #059669);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  display: block;
  width: fit-content;
  animation: platGradientMove 4s ease infinite;
}

.brand-title-gradient {
  background-image: linear-gradient(270deg, #059669, #ffffffff, #ffffffff, #059669);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: platGradientMove 8s linear infinite;
}

[data-theme='dark'] .brand-title-gradient {
  background: none;
  -webkit-text-fill-color: initial;
  color: var(--text-main);
}

[data-theme='dark'] .dna-text-gradient {
  background-image: linear-gradient(270deg, #60a5fa, #a855f7, #f43f5e, #60a5fa);
}

.elite-btn {
  background: var(--wow-gradient);
  background-size: 200% 200%;
  animation: btnGradientMove 4s ease infinite;
  color: #000000ff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 21px;
  font-weight: 950;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  //border: 0.5px solid var(--accent-color);

}

.elite-btn:hover { transform: scale(1.02) translateY(-4px); }

/* Elite Modals */
.cd-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.cd-modal {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 40px;
  width: 100%;
  max-width: 540px;
  padding: 48px;
  position: relative;
  box-shadow: 0 50px 100px rgba(0,0,0,0.3);
  backdrop-filter: blur(40px);
  animation: modalScale 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScale { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.cd-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-main);
  transition: all 0.3s;
}

.cd-modal-close:hover { background: var(--text-main); color: var(--bg-color); transform: rotate(90deg); }

.cd-steps { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; justify-content: center; }
.cd-step { width: 36px; height: 36px; border-radius: 50%; background: var(--glass-bg); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; color: var(--text-muted); }
.cd-step.active { background: var(--accent-gradient); color: #fff; border: none; box-shadow: 0 8px 16px rgba(16, 185, 129, 0.2); }
.cd-step-line { flex: 1; height: 1px; background: var(--glass-border); max-width: 40px; }

.cd-card-visual {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 32px;
  height: 200px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.cd-card-visual::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
}

.cd-card-chip { width: 44px; height: 32px; background: linear-gradient(135deg, #fbbf24, #d97706); border-radius: 6px; }
.cd-card-num { font-family: 'Syne', sans-serif; font-size: 20px; letter-spacing: 2px; }
.cd-card-meta { display: flex; justify-content: space-between; align-items: flex-end; }
.cd-card-meta .lbl { font-size: 10px; text-transform: uppercase; opacity: 0.6; margin-bottom: 4px; }
.cd-card-meta .val { font-size: 14px; fontWeight: 700; }

.cd-modal-summary { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; padding: 20px; margin-bottom: 32px; }
.cd-modal-row { display: flex; justify-content: space-between; align-items: center; }
.cd-modal-row.total { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: var(--text-main); }

.cd-confirm-btn {
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background: var(--accent-gradient);
  border: none;
  color: #fff;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}

.cd-confirm-btn:hover { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3); }

.cd-success-icon {
  width: 100px; height: 100px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); color: #10b981;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 32px;
  animation: successPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes successPop { from { transform: scale(0); } to { transform: scale(1); } }

@media (max-width: 768px) {
    .nav-wrapper { display: none !important; }
    .cd-layout { grid-template-columns: 1fr !important; padding: 0 16px !important; gap: 32px !important; margin-bottom: 20px !important; margin-top: -30px !important; }
    .cd-hero-container { height: 60vh !important; margin-bottom: 0px !important; bottom: 0px !important; }
    .cd-hero-content { bottom: 30px !important; left: 20px !important; width: calc(100% - 40px) !important; }
    .brand-title-gradient { font-size: 42px !important; line-height: 1 !important; }
    .bento-grid { display: flex !important; flex-direction: column !important; gap: 16px !important; margin-top: 30px !important; }
    .bento-card { padding: 24px !important; }
    .booking-module { padding: 24px !important; border-radius: 32px !important; position: relative !important; top: 0 !important; margin-bottom: 100px !important; }
    .elite-price-val { font-size: 48px !important; }
    .cd-modal { padding: 24px !important; margin: 16px !important; border-radius: 24px !important; width: 100% !important; }
    .cd-hero-bg-text { font-size: 35vw !important; top: 60% !important; opacity: 0.1 !important; }
    .mobile-floating-btn { display: flex !important; }
    .mobile-back-btn { display: flex !important; }
    .hero-stats-container { gap: 16px !important; flex-wrap: wrap !important; }
    .mobile-gallery { margin-top: 40px !important; }
}

.mobile-floating-btn {
    display: none; position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 1000; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border-radius: 24px;
}
.mobile-back-btn {
    display: none; position: absolute; top: 20px; left: 20px; z-index: 100; background: rgba(0,0,0,0.3); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: white; width: 44px; height: 44px; border-radius: 50%; align-items: center; justify-content: center; cursor: pointer;
}
[dir="rtl"] .mobile-back-btn { left: auto; right: 20px; }
`;

function AnimatedLogo({ onClick }) {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, background: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,var(--accent-color) 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 2, background: 'var(--bg-color)', borderRadius: 12, zIndex: 1 }} />
                <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" style={{ transformOrigin: '6.5px 16.5px' }} />
                    <circle cx="16.5" cy="16.5" r="2.5" style={{ transformOrigin: '16.5px 16.5px' }} />
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

export default function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reservationDays = location.state?.reservationDays || 1;
    const canvasRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("appTheme") === "dark");
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [isLangHovered, setIsLangHovered] = useState(false);

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const t = (path, fallback) => {
        const keys = path.split('.');
        let cur = selectedLang === "AR" ? AR : FR;
        for (const k of keys) { if (!cur || cur[k] === undefined) return fallback; cur = cur[k]; }
        return cur;
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem("appTheme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem("appLang", selectedLang);
        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
    }, [selectedLang]);

    useEffect(() => {
        const el = document.createElement("style");
        el.innerText = styles;
        document.head.appendChild(el);

        let raf;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let W = canvas.width = window.innerWidth;
            let H = canvas.height = window.innerHeight;
            let pts = Array.from({ length: 90 }, () => new Particle(W, H));
            const draw = () => {
                ctx.clearRect(0, 0, W, H);
                pts.forEach(p => {
                    p.update();
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
                });
                raf = requestAnimationFrame(draw);
            };
            draw();
            const res = () => {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
                pts = Array.from({ length: 90 }, () => new Particle(W, H));
            };
            window.addEventListener('resize', res);
            return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', res); document.head.removeChild(el); };
        }
        return () => document.head.removeChild(el);
    }, []);

    useEffect(() => { fetchCar(); }, [id]);

    const fetchCar = async () => {
        try {
            const r = await fetch(`http://localhost:8080/api/cars/${id}`);
            if (r.ok) setCar(await r.json());
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const openModal = () => { setShowModal(true); setStep(1); };

    const confirm = () => {
        setStep(2);
        const act = {
            id: Date.now(), type: 'booking', carId: car.id, carName: car.name,
            timestamp: new Date().toISOString(), status: 'completed',
            price: car.price * reservationDays, days: reservationDays,
            image: car.photos?.[0] || ""
        };
        const prev = JSON.parse(localStorage.getItem('recent_activities') || '[]');
        localStorage.setItem('recent_activities', JSON.stringify([act, ...prev]));
    };

    const isAR = selectedLang === "AR";

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
            <div className="cd-loader" />
        </div>
    );

    if (!car) return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔍</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, marginBottom: 12 }}>
                {isAR ? "السيارة غير موجودة" : "Voiture non trouvée"}
            </h2>
            <p style={{ color: 'var(--text-3)', maxWidth: 400, lineHeight: 1.7, marginBottom: 32, fontSize: 16 }}>
                {isAR
                    ? `المركبة ${id} غير موجودة أو لم تعد متوفرة حالياً.`
                    : `Le véhicule ${id} n'existe pas ou n'est plus disponible.`
                }
            </p>
            <button onClick={() => navigate(-1)} className="cd-back" style={{ margin: '0 auto' }}>
                {isAR ? "رجوع" : "Retour"}
            </button>
        </div>
    );

    const translateVal = (val) => {
        if (!isAR) return val;
        const map = {
            'Électrique': 'كهربائي',
            'Essence': 'بنزين',
            'Diesel': 'ديزل',
            'Hybride': 'هجين',
            'Automatique': 'أوتوماتيكي',
            'Manuelle': 'يدوي',
            'Sport': 'رياضية',
            'Luxe': 'فاخرة',
            'Citadine': 'مدينة',
            'SUV': 'دفع رباعي',
            'Blanc': 'أبيض',
            'Noir': 'أسود',
            'Gris': 'رمادي',
            'Bleu': 'أزرق',
            'Rouge': 'أحمر'
        };
        return map[val] || val;
    };

    const specs = [
        { icon: <CalendarIcon size={16} />, lbl: t("details.year", "Année"), val: car.year },
        { icon: <GaugeIcon size={16} />, lbl: t("details.mileage", "Kilométrage"), val: car.mileage },
        { icon: <FuelIcon size={16} />, lbl: t("details.fuel", "Carburant"), val: translateVal(car.fuel) },
        { icon: <UsersIcon size={16} />, lbl: t("details.seats", "Places"), val: car.seats },
        { icon: <ColorIcon size={16} />, lbl: t("details.color", "Couleur"), val: translateVal(car.color) },
        { icon: <InfoIcon size={16} />, lbl: t("details.category", "Catégorie"), val: translateVal(car.category) },
    ];

    const featurePills = [
        { icon: <ZapIcon size={18} />, val: isAR ? "كيلومترات غير محدودة" : "Kilométrage illimité", lbl: isAR ? "كم غير محدود" : "km illimité" },
        { icon: <ShieldIcon size={18} />, val: isAR ? "تأمين شامل" : "Assurance incluse", lbl: isAR ? "تغطية كاملة" : "couverture totale" },
        { icon: <ClockIcon size={18} />, val: isAR ? "مساعدة 24/7" : "Assistance 24/7", lbl: isAR ? "في كل المغرب" : "partout au Maroc" },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
            {/* ══ LAYERED BACKGROUND (ELITE OS) ══ */}
            <div className="home-base-bg" />
            <div className="home-mesh-bg" />
            <div className="home-noise-bg" />
            <div className="home-blob home-blob1" />
            <div className="home-blob home-blob2" />
            <div className="home-blob home-blob3" />
            <div className="home-blob home-blob4" />
            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

            {/* ══ ELITE NAVIGATION ══ */}
            {!isMobile && (
                <div className="nav-wrapper" dir="ltr">
                    <nav className="nav-glass" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
                        {/* Left: Logo */}
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                            <AnimatedLogo onClick={() => navigate("/homeConnect")} />
                        </div>

                        {/* Center: Lang & Theme Pill (Adaptive) */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                {/* Icon Button (Flow Anchor) */}
                                <button
                                    className="icon-btn"
                                    onClick={() => setLangMenuOpen(p => !p)}
                                    style={{
                                        background: langMenuOpen ? "#fff" : (isLangHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"),
                                        color: langMenuOpen ? "#000" : (isDarkMode ? "#fff" : "#000"),
                                        border: langMenuOpen ? "none" : `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(6,78,59,0.1)"}`,
                                        width: "44px", height: "44px", borderRadius: "50%",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", zIndex: 11, cursor: "pointer",
                                        boxShadow: langMenuOpen ? "0 8px 16px rgba(0,0,0,0.2)" : "none",
                                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}
                                    onMouseEnter={() => setIsLangHovered(true)}
                                    onMouseLeave={() => setIsLangHovered(false)}
                                >
                                    <svg style={{ transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: langMenuOpen ? "rotate(-180deg) scale(1.15)" : "rotate(0deg) scale(1)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
                                    </svg>
                                    <span style={{ position: "absolute", top: -4, right: -4, background: "#2563eb", color: "#fff", fontSize: "9px", fontWeight: "900", padding: "2px 5px", borderRadius: "6px", lineHeight: 1 }}>{selectedLang}</span>
                                </button>

                                {/* Expanding Pill (Absolute) */}
                                <div style={{
                                    position: "absolute", right: "52px", display: "flex", alignItems: "center", gap: "8px",
                                    height: "48px", opacity: langMenuOpen ? 1 : 0,
                                    background: isDarkMode ? "rgba(10,14,26,0.85)" : "rgba(255,255,255,0.9)",
                                    borderRadius: "21px", padding: langMenuOpen ? "0 8px" : "0",
                                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(6,78,59,0.1)"}`,
                                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                                    overflow: "hidden", pointerEvents: langMenuOpen ? "auto" : "none",
                                    boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.4)" : "0 8px 16px rgba(0,0,0,0.06)",
                                    zIndex: 10, whiteSpace: "nowrap", backdropFilter: "blur(12px)"
                                }}>
                                    {[{ code: "AR", label: "AR" }, { code: "FR", label: "FR" }, { code: "EN", label: "EN" }].map(lang => (
                                        <button key={lang.code} onClick={() => { setSelectedLang(lang.code); setLangMenuOpen(false); }} style={{
                                            background: selectedLang === lang.code ? (isDarkMode ? "#0738a3ff" : "#008f18ff") : "transparent",
                                            color: selectedLang === lang.code ? "#fff" : (isDarkMode ? "rgba(255,255,255,0.8)" : "#064e3b"),
                                            border: "none", borderRadius: "16px", padding: "6px 14px", fontSize: "11px", fontWeight: "800", cursor: "pointer", fontFamily: "'Syne', sans-serif"
                                        }}>{lang.label}</button>
                                    ))}
                                </div>
                            </div>

                            <button className="icon-btnee" onClick={() => setIsDarkMode(!isDarkMode)}>
                                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
                            </button>
                        </div>

                        {/* Right: Back Button */}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => navigate(-1)}
                                className="primary-btnE"
                                aria-label="Retour"
                                style={{ padding: '14px 30px', borderRadius: '15px' }}
                            >
                                <ArrowLeftIcon size={18} />
                                <span>{selectedLang === "AR" ? "رجوع" : selectedLang === "EN" ? "Back" : "Retour"}</span>
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* ══ ELITE QUANTUM HERO ══ */}
            <div className="cd-hero-container">
                <button className="mobile-back-btn" onClick={() => navigate(-1)}>
                    {selectedLang === "AR" ? <ArrowRightIcon size={20} /> : <ArrowLeftIcon size={20} />}
                </button>
                <div className="cd-hero-bg-text">{car.brand || car.name?.split(' ')[0]}</div>
                <img
                    src={car.photos?.[activeImg] || ""}
                    className="cd-hero-img"
                    alt={car.name}
                    style={{ transform: `scale(${1.05 + activeImg * 0.02})` }}
                />
                <div className="cd-hero-overlay" />
                <div className="cd-hero-content">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{
                            background: 'var(--accent-gradient)', padding: '8px 20px', borderRadius: '40px',
                            color: '#fff', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase',
                            letterSpacing: '3px', width: 'fit-content', boxShadow: '0 20px 40px rgba(16,185,129,0.3)'
                        }}>
                            {car.category || 'Exclusive Series'}
                        </div>
                        <h1 className="brand-title-gradient" style={{
                            fontFamily: "'Syne', sans-serif", fontWeight: 800,
                            fontSize: "clamp(60px, 10vw, 150px)", letterSpacing: "-6px",
                            lineHeight: 0.85, textShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            {car.name}
                        </h1>
                        <div className="hero-stats-container" style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
                            {[
                                { val: "280 km/h", lbl: isAR ? "السرعة القصوى" : "Vitesse Max" },
                                { val: "3.2s", lbl: isAR ? "تسارع 0-100 كـم/س" : "0-100 km/h" },
                                { val: isAR ? "نخبة" : "Elite", lbl: isAR ? "الراحة" : "Confort" }
                            ].map((stat, i) => (
                                <div key={i} style={{ animation: `fadeUp 0.8s ${0.4 + i * 0.1}s both` }}>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muteddd)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.lbl}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: "'Syne', sans-serif", color: 'var(--re-color)' }}>{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ QUANTUM LAYOUT ══ */}
            <main className="cd-layout" style={{ direction: selectedLang === "AR" ? "rtl" : "ltr" }}>
                <div className="cd-left">
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px', position: 'relative' }}>
                            <div style={{
                                position: 'absolute', top: '-40px', left: '-20px', fontSize: '120px',
                                fontWeight: 900, opacity: 0.03, fontFamily: "'Syne', sans-serif",
                                color: 'var(--text-main)', pointerEvents: 'none', userSelect: 'none'
                            }}>DNA</div>
                            <h2 className="dna-text-gradient" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "72px", letterSpacing: '-4px', lineHeight: 1, position: 'relative', zIndex: 1 }}>
                                {selectedLang === "AR" ? "الخصائص" : "The Core DNA"}
                            </h2>
                            <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, var(--card-border), transparent)', marginTop: '10px' }} />
                        </div>

                        {/* BENTO GRID */}
                        <div className="bento-grid">
                            <div className="bento-card bc-1"
                                style={{ gridColumn: 'span 3', gridRow: 'span 2' }}
                                onMouseMove={e => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = (e.clientX - rect.left) / rect.width;
                                    const y = (e.clientY - rect.top) / rect.height;
                                    e.currentTarget.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(y - 0.5) * -10}deg) translateY(-8px)`;
                                    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                                    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
                                }}>
                                <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--accent-color)', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                    {isAR ? "جينيسيس / التجربة" : "Genesis / L'Expérience"}
                                </div>
                                <h3 style={{ fontSize: '34px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', fontFamily: "'Syne', sans-serif" }}>
                                    {isAR ? "تناغم مثالي بين القوة والرقي." : "Une symbiose parfaite entre puissance et raffinement."}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: '15px' }}>
                                    {isAR
                                        ? `كل تفصيلة في ${car.name} صممت لتتحدى الهواء، لتوفر ثباتا لا يضاهى حتى في السرعات القصوى.`
                                        : `Chaque courbe de la ${car.name} a été sculptée pour fendre l'air, offrant une stabilité inégalée même à des vitesses extrêmes.`
                                    }
                                </p>
                                <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', gap: '10px' }}>
                                    <div style={{ width: '40px', height: '4px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
                                    <div style={{ width: '10px', height: '4px', background: 'var(--card-border)', borderRadius: '2px' }} />
                                </div>
                            </div>

                            {specs.map((s, i) => (
                                <div key={i} className={`bento-card bc-${i + 2}`} style={{ gridColumn: 'span 1.5' }}
                                    onMouseMove={e => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = (e.clientX - rect.left) / rect.width;
                                        const y = (e.clientY - rect.top) / rect.height;
                                        e.currentTarget.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 20}deg) rotateX(${(y - 0.5) * -20}deg) translateY(-8px)`;
                                        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                                        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
                                    }}>
                                    <div style={{ color: "var(--accent-color)", marginBottom: "16px", background: 'var(--nav-border)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                                    <div style={{ fontSize: "10px", fontWeight: 900, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: '1px', marginBottom: '8px' }}>{s.lbl}</div>
                                    <div style={{ fontSize: "18px", fontWeight: 950, fontFamily: "'Syne', sans-serif", color: 'var(--bento-text)' }}>{s.val}</div>
                                </div>
                            ))}

                            <div className="bento-card bc-8"
                                style={{ gridColumn: 'span 3' }}
                                onMouseMove={e => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = (e.clientX - rect.left) / rect.width;
                                    const y = (e.clientY - rect.top) / rect.height;
                                    e.currentTarget.style.transform = `perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(y - 0.5) * -10}deg) translateY(-8px)`;
                                    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                                    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
                                }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }} />
                                    <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', color: 'var(--bento-text)' }}>
                                        {isAR ? "أقصى حماية" : "Protection Maximale"}
                                    </span>
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 600 }}>
                                    {isAR
                                        ? "تأمين بلاتيني شامل ومساعدة VIP 24/7 في جميع أنحاء المغرب."
                                        : "Assurance Platinum complète et assistance VIP 24/7 partout au Maroc."
                                    }
                                </p>
                            </div>
                        </div>

                        {/* GALLERY */}
                        <div className="mobile-gallery" style={{ marginTop: '80px' }}>
                            <div style={{ display: 'flex', gap: '20px', padding: '20px 0', WebkitOverflowScrolling: 'touch' }} className="no-scrollbar">
                                {car.photos?.map((p, i) => (
                                    <div key={i}
                                        onClick={() => setActiveImg(i)}
                                        style={{
                                            minWidth: '240px', height: '160px', borderRadius: '24px',
                                            overflow: 'hidden', cursor: 'pointer',
                                            border: activeImg === i ? '2px solid var(--accent-color)' : '1px solid var(--card-border)',
                                            transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            scale: activeImg === i ? '1.05' : '1'
                                        }}>
                                        <img src={p} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT: COMMAND MODULE */}
                <div className="cd-right">
                    <div className="booking-module" style={{
                        '--elite-ribbon': isAR ? '"وصول النخبة"' : '"ELITE ACCESS"',
                        '--elite-font-size': isAR ? '13px' : '10px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: isAR ? 'row-reverse' : 'row', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
                            <div className="pulse-glow" />
                            <span style={{ fontSize: isAR ? '16px' : '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#10b981' }}>
                                {isAR ? "نسخة نادرة متوفرة" : "Rare Acquisition Available"}
                            </span>
                        </div>

                        <div style={{ marginBottom: "48px" }}>
                            <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: 800, color: "var(--text-muted)", marginBottom: "12px", letterSpacing: '1px' }}>
                                {isAR ? "الاستثمار / يوم" : "Investment / Day"}
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                                <span className="elite-price-val">{car.price}</span>
                                <span style={{ fontSize: "28px", fontWeight: 950, color: "var(--text-muted)", fontFamily: "'Syne', sans-serif" }}>
                                    {isAR ? "درهم" : "MAD"}
                                </span>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '32px',
                            padding: '32px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: '40px',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px' }}>
                                <span style={{ opacity: 0.5, fontWeight: 700 }}>{isAR ? "المدة" : "DURÉE"}</span>
                                <span style={{ fontWeight: 900 }}>{reservationDays} {isAR ? (reservationDays > 1 ? 'أيام' : 'يوم') : (reservationDays > 1 ? 'JOURS' : 'JOUR')}</span>
                            </div>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '15px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div style={{ fontSize: '14px', fontWeight: 700, opacity: 0.5 }}>{isAR ? "الإجمالي" : "TOTAL"}</div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '38px', fontWeight: 950, fontFamily: "'Syne', sans-serif", letterSpacing: '-1px', color: 'var(--text-main)' }}>{car.price * reservationDays} {isAR ? "درهم" : "MAD"}</div>
                                    <div style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)' }}>
                                        {isAR ? "شامل الضريبة • تأمين ذهبي" : "TVA Incluse • Assurance Gold"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!isMobile && (
                            <button className="elite-btn" onClick={openModal} style={{ width: '103%', height: '69px', fontSize: '18px' }}>
                                <svg style={{ animation: 'cardFloat 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                                <span style={{ fontSize: '19px', fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>
                                    {isAR ? "تأكيد الحجز" : "Confirmer la Réservation"}
                                </span>
                            </button>
                        )}

                        <div style={{
                            marginTop: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <LockIcon size={12} />
                                <span>{isAR ? "آمن بواسطة سترايب و 3D سكيور" : "Sécurisé par Stripe & 3D Secure"}</span>
                            </div>
                            <div style={{ width: '60px', height: '2px', background: 'var(--card-border)', opacity: 0.5 }} />
                            <div style={{ fontSize: '10px', opacity: 0.3, fontWeight: 700, textAlign: 'center' }}>
                                No. REF: UP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--accent-gradient)',
                        padding: '24px',
                        borderRadius: '32px',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        boxShadow: 'var(--booking-shadow)',
                        marginTop: '24px'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AwardIcon size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 900, fontSize: '18px', fontFamily: "'Syne', sans-serif" }}>
                                {isAR ? "مكافآت النخبة" : "Elite Rewards"}
                            </div>
                            <div style={{ opacity: 0.9, fontSize: '12px' }}>
                                {isAR ? "اربح +450 نقطة في هذه الرحلة" : "Gagnez +450 points avec ce trajet"}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {isMobile && (
                <div className="mobile-floating-btn">
                    <button className="elite-btn" onClick={openModal} style={{ width: '100%', height: '64px', fontSize: '18px', borderRadius: '24px' }}>
                        <svg style={{ animation: 'cardFloat 2s ease-in-out infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                        <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
                            {isAR ? "تأكيد الحجز" : "Confirmer la Réservation"}
                        </span>
                    </button>
                </div>
            )}

            {/* ══ PAYMENT MODAL ══ */}
            {showModal && (
                <div className="cd-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div className="cd-modal">
                        <div className="cd-modal-topbar" />
                        <button className="cd-modal-close" onClick={() => setShowModal(false)}>✕</button>
                        <div className="cd-modal-inner" style={{ direction: selectedLang === "AR" ? "rtl" : "ltr" }}>
                            {step === 1 ? (
                                <>
                                    <div className="cd-steps">
                                        <div className="cd-step active">1</div>
                                        <div className="cd-step-line" />
                                        <div className="cd-step">2</div>
                                    </div>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, marginBottom: "8px", color: "var(--text-main)" }}>
                                        {selectedLang === "AR" ? "تأكيد الحجز" : "Confirmer la réservation"}
                                    </h2>
                                    <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
                                        {selectedLang === "AR" ? "تحقق من التفاصيل قبل المتابعة" : "Vérifiez les détails avant de procéder au paiement"}
                                    </p>

                                    <div className="cd-card-visual">
                                        <div className="cd-card-chip" />
                                        <div className="cd-card-num">•••• •••• •••• 4242</div>
                                        <div className="cd-card-meta">
                                            <div>
                                                <div className="lbl">{isAR ? "صاحب البطاقة" : "Titulaire"}</div>
                                                <div className="val">John Doe</div>
                                            </div>
                                            <div style={{ fontSize: "24px", fontWeight: 900 }}>VISA</div>
                                        </div>
                                    </div>

                                    <div className="cd-modal-summary">
                                        <div className="cd-modal-row total">
                                            <span className="ml">{selectedLang === "AR" ? "المجموع النهائي" : "Total à payer"}</span>
                                            <span className="mr">{car.price * reservationDays} MAD</span>
                                        </div>
                                    </div>

                                    <button className="cd-confirm-btn" onClick={confirm}>
                                        <LockIcon size={16} /> {selectedLang === "AR" ? "تأكيد الدفع" : "Confirmer le paiement"}
                                    </button>
                                </>
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    <div className="cd-success-icon"><Check size={48} /></div>
                                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, marginBottom: "12px", color: "var(--text-main)" }}>
                                        {selectedLang === "AR" ? "تم الحجز بنجاح" : "Réservation Confirmée !"}
                                    </h2>
                                    <p style={{ color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "32px" }}>
                                        {selectedLang === "AR"
                                            ? `تم حجز ${car.name} بنجاح. سنتصل بك قريباً لتأكيد التفاصيل.`
                                            : `Votre ${car.name} est réservée. Nous vous contacterons sous peu pour finaliser les détails.`
                                        }
                                    </p>
                                    <button className="cd-confirm-btn" onClick={() => { setShowModal(false); navigate("/homeConnect"); }}>
                                        {selectedLang === "AR" ? "العودة للرئيسية" : "Retour à l'accueil"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};