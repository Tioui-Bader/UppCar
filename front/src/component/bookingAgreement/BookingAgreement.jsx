import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Moon as MoonIcon, Sun as SunIcon, X, ChevronRight, ChevronLeft,
    CheckCircle2, Camera, Upload, Shield, Car, Building2,
    MapPin, Star, Fuel, Users, Gauge, Hash, Sparkles, AlertCircle,
    FileText, CreditCard, Eye, Zap, ArrowLeft, XCircle, Loader2, MessageSquare, Calendar
} from 'lucide-react';
import whatsappIcon from '../../asset/c49ca2acb2de3f97cab50b6d927244b4-removebg-preview.png';

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const css = `

:root {
  --bg: #f0fdf4;
  --text: #064e3b;
  --muted: #166534;
  --nav-bg: rgba(255,255,255,0.65);
  --nav-border: rgba(6,78,59,0.1);
  --card: rgba(255,255,255,0.82);
  --card-border: rgba(6,78,59,0.1);
  --accent: #10b981;
  --accent2: #0ea5e9;
  --accent-grad: linear-gradient(135deg,#047857 0%,#10b981 50%,#0ea5e9 100%);
  --btn-text: #ffffff;
  --success: #22c55e;
  --success-glow: rgba(34,197,94,0.25);
  --glass: rgba(255,255,255,0.55);
  --glass-border: rgba(255,255,255,0.9);
}
[data-theme='dark'] {
  --bg: rgb(8,10,18);
  --text: #e6edf3;
  --muted: #8b95a8;
  --nav-bg: rgba(10,14,26,0.72);
  --nav-border: rgba(255,255,255,0.07);
  --card: rgba(255,255,255,0.035);
  --card-border: rgba(255,255,255,0.08);
  --accent: #60a5fa;
  --accent2: #a78bfa;
  --accent-grad: linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#ec4899 100%);
  --btn-text: #ffffff;
  --success: #34d399;
  --success-glow: rgba(52,211,153,0.22);
  --glass: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.1);
  --btn-textee: #cfcfcf;
    --accent-gradrr: linear-gradient(135deg, #3b82f6 0%, #8fbaffff 50%, #8b5cf6 100%);

  
}

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body { background:var(--bg); color:var(--text); font-family:'DM Sans',sans-serif; overflow-x:hidden; }

/* — Keyframes — */
@keyframes fadeUp        { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn        { from{opacity:0} to{opacity:1} }
@keyframes spinWheel     { to{transform:rotate(360deg)} }
@keyframes driveBumps    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1.5px)} }
@keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes homeDrift     { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(28px,-18px) scale(1.07)} 66%{transform:translate(-18px,26px) scale(.96)} }
@keyframes gradMove      { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes shine         { 0%{left:-120%;opacity:0} 18%{opacity:1} 58%{left:140%;opacity:0} 100%{left:140%;opacity:0} }
@keyframes popIn         { from{transform:scale(0.35);opacity:0} to{transform:scale(1);opacity:1} }
@keyframes ringPulse     { 0%,100%{transform:scale(1);opacity:.55} 50%{transform:scale(1.28);opacity:0} }
@keyframes barShine      { from{transform:translateX(-100%)} to{transform:translateX(220%)} }
@keyframes confettiFall  { 0%{transform:translateY(0) rotate(0deg) scale(1);opacity:1} 100%{transform:translateY(120px) rotate(400deg) scale(.5);opacity:0} }
@keyframes float         { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
@keyframes cardReveal    { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes shimmerPulse  { 0%,100%{opacity:.4} 50%{opacity:.9} }
@keyframes scanLine      { from{top:-2px} to{top:calc(100% + 2px)} }
@keyframes borderRotate  { to{--border-angle:360deg} }
@keyframes glow          { 0%,100%{box-shadow:0 0 20px var(--success-glow)} 50%{box-shadow:0 0 40px var(--success-glow),0 0 80px var(--success-glow)} }
@keyframes strokeSpin    { to{stroke-dashoffset:-120} }
@keyframes liquidFill    { from{background-position:100% 0} to{background-position:0% 0} }
@keyframes phaseOut      { to{opacity:0;transform:translateX(-20px)} }
@keyframes phaseIn       { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
@keyframes btnParticle   { 0%{transform:translate(-50%,-50%) scale(0);opacity:1} 100%{transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(1);opacity:0} }
@keyframes ringDraw      { to{stroke-dashoffset:0} }
@keyframes successPop    { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes successRing   { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.22);opacity:0} }
@keyframes wordIn        { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes thumbSlide    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes ctaReveal     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes dropPulse     { 0%,100%{border-color:var(--accent);box-shadow:0 0 0 0 rgba(96,165,250,.4)} 50%{box-shadow:0 0 0 8px rgba(96,165,250,.15)} }
@keyframes dropOverlayIn { from{opacity:0} to{opacity:1} }
@keyframes progressWave  { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
@keyframes barGlow       { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.2)} 50%{box-shadow:0 0 0 8px rgba(16,185,129,.05)} }
@keyframes expandPulse   { 0%{height:100%} 50%{height:105%} 100%{height:100%} }
@keyframes glowFlash     { 0%{opacity:.5} 50%{opacity:1} 100%{opacity:.5} }

/* — Layout — */
.ba-base    { position:fixed;inset:0;z-index:-10;background:var(--bg); }
.ba-mesh    { position:fixed;inset:0;z-index:0;pointer-events:none;filter:blur(55px) contrast(115%); }
[data-theme='dark'] .ba-mesh {
  background:
    radial-gradient(at 0% 0%,   rgba(16,185,129,.4) 0,transparent 45%),
    radial-gradient(at 100% 0%, rgba(99,102,241,.35) 0,transparent 42%),
    radial-gradient(at 100% 100%,rgba(168,85,247,.3) 0,transparent 46%),
    radial-gradient(at 0% 100%, rgba(59,130,246,.25) 0,transparent 42%);
}
:root .ba-mesh {
  background:
    radial-gradient(at 0% 0%,   rgba(16,185,129,.18) 0,transparent 52%),
    radial-gradient(at 100% 0%, rgba(14,165,233,.14) 0,transparent 47%),
    radial-gradient(at 100% 100%,rgba(5,150,105,.12) 0,transparent 52%);
}
.ba-noise  { position:fixed;inset:0;z-index:5;pointer-events:none; }
[data-theme='dark'] .ba-noise { opacity:.04; }
:root      .ba-noise { opacity:.07; }
.ba-blob   { position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:1;animation:homeDrift 18s ease-in-out infinite; }
.blob1     { width:600px;height:400px;top:-150px;left:-150px;background:rgba(16,185,129,.15); }
.blob2     { width:440px;height:540px;bottom:-150px;right:-100px;background:rgba(99,102,241,.12); }
.blob3     { width:300px;height:300px;top:40%;left:32%;background:rgba(245,158,11,.07); }
.blob4     { width:210px;height:210px;top:22%;right:28%;background:rgba(168,85,247,.1); }

/* — Nav — */
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
@keyframes onlineDot { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0);} }
@keyframes mobileMenuSlideDown {
  from { opacity:0; transform:translateY(-18px) scale(0.97); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes mobileMenuSlideUp {
  from { opacity:1; transform:translateY(0) scale(1); }
  to   { opacity:0; transform:translateY(-18px) scale(0.97); }
}

.nav-wrapper { position:sticky;top:10px;z-index:100;margin:0 20px; transition:all .3s ease; }
.nav-glass {
  display:flex;align-items:center;justify-content:space-between;
  padding:9px 20px;background:inherit;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border:1px solid var(--nav-border);border-radius:24px;
  box-shadow:0 8px 32px rgba(0,0,0,.05);animation:fadeUp .6s ease-out;
}
.nav-items { display:flex; gap:10px; list-style:none; margin:0; padding:0; }
.nav-link { position:relative; color:#cedfff; text-decoration:none; font-family:'Syne',sans-serif; font-size:14px; font-weight:700; padding:8px 16px; border-radius:12px; transition:all .3s cubic-bezier(.4,0,.2,1); overflow:hidden; }
.nav-link::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--text); opacity:0; z-index:-1; transition:opacity .3s ease; border-radius:12px; }
.nav-link:hover { color:var(--bg); transform:translateY(-2px); }
.nav-link:hover::before { opacity:1; }
.icon-btn { background:rgba(255,255,255,.05); border:1px solid var(--nav-border); color:var(--text); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .3s cubic-bezier(.4,0,.2,1); position:relative; }
.icon-btn:hover { background:var(--text); color:var(--bg); transform:scale(1.1) rotate(5deg); box-shadow:0 4px 12px rgba(0,0,0,.1); }
@media(max-width:980px) { .nav-items { display:none; } }

/* — Mobile menu — */
.mob-burger { display:none; }
@media(max-width:980px) { .mob-burger { display:flex !important; } .desktop-user-pill { display:none !important; } }
@keyframes mobileMenuSlideDown { from{opacity:0;transform:translateY(-18px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes mobileMenuSlideUp   { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(-18px) scale(.97)} }
.mob-menu-panel  { position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;pointer-events:none; }
.mob-menu-backdrop { position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);pointer-events:all; }
.mob-menu-sheet  { position:absolute;top:74px;left:10px;right:10px;border-radius:26px;overflow:hidden;pointer-events:all;animation:mobileMenuSlideDown .38s cubic-bezier(.16,1,.3,1) both; }

/* — Page — */
.ba-page {
  position:relative;z-index:10;max-width:1280px;margin:0 auto;padding:0 24px 100px;
  font-family:'DM Sans',sans-serif;
}
.ba-hero-title {
  font-family:'Syne',sans-serif;font-weight:900;font-size:clamp(34px,5.2vw,56px);
  letter-spacing:-2.2px;color:var(--text);margin:40px 0 12px;animation:fadeUp .55s ease both;
  line-height:1.08;
}
.ba-hero-sub  { color:var(--muted);font-size:16px;margin-bottom:44px;animation:fadeUp .55s .12s ease both;font-weight:500;line-height:1.7; }
.grad-text    { background:var(--accent-gradrr);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

/* — Grid — */
.ba-grid { display:grid;grid-template-columns:1fr 390px;gap:32px;align-items:start; }
@media(max-width:980px) { .ba-grid { grid-template-columns:1fr; } }
.ba-left { display:flex;flex-direction:column;gap:24px; }

/* — Glass card + Aurora spotlight — */
.card {
  background:var(--card);border:1px solid var(--card-border);border-radius:28px;
  padding:36px 40px;backdrop-filter:blur(16px);position:relative;overflow:hidden;
  transition:all .5s cubic-bezier(.2,.8,.2,1);
  --mouse-x:50%; --mouse-y:50%;
  box-shadow:0 12px 48px rgba(0,0,0,.12);
}
.card::before {
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--accent),transparent);opacity:.3;z-index:2;
}
.card::after {
  content:'';position:absolute;inset:0;border-radius:28px;pointer-events:none;z-index:0;
  background:radial-gradient(520px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,.11), transparent 42%);
  opacity:0;transition:opacity .35s ease;
}
[data-theme='dark'] .card::after {
  background:radial-gradient(520px circle at var(--mouse-x) var(--mouse-y), rgba(96,165,250,.14), transparent 42%);
}
.card:hover::after { opacity:1; }
.card:hover { border-color:rgba(96,165,250,.4);box-shadow:0 32px 80px rgba(16,185,129,.18);transform:translateY(-6px); }
.card-anim { animation:cardReveal .6s cubic-bezier(.16,1,.3,1) both; }
.card > * { position:relative; z-index:1; }

.sec-label {
  font-family:'Syne',sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;
  letter-spacing:.15em;color:var(--muted);display:flex;align-items:center;gap:10px;margin-bottom:24px;
}
  
.sec-label svg { color:var(--accent); }
.sec-label::after { content:'';flex:1;height:1px;background:var(--card-border); }

/* — Vehicle — */
.car-hero { display:flex;gap:32px;align-items:flex-start; }
@media(max-width:640px) { .car-hero { flex-direction:column; } }
.car-img-wrap { position:relative;flex-shrink:0;border-radius:24px;overflow:hidden;width:240px;height:160px;box-shadow:0 12px 40px rgba(0,0,0,.12); }
@media(max-width:640px) { .car-img-wrap { width:100%;height:200px; } }
.car-img { width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.8,.2,1); display:block; }
.card:hover .car-img { transform:scale(1.08) rotate(0.5deg); }
.car-img-overlay {
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 65%);
}
.car-img-badge {
  position:absolute;bottom:12px;left:12px;
  background:rgba(0,0,0,.7);backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.18);border-radius:13px;
  padding:5px 14px;font-size:12px;font-weight:700;color:#fff;font-family:'Syne',sans-serif;
}
.car-name   { font-family:'Syne',sans-serif;font-size:clamp(24px,4vw,38px);font-weight:900;letter-spacing:-1.2px;color:var(--text); }
.car-price  { display:flex;align-items:baseline;gap:8px;margin-top:16px; }
.price-val  { font-family:'Syne',sans-serif;font-size:48px;font-weight:900;letter-spacing:-2.5px;background:var(--btn-textee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.price-unit { font-size:14px;color:var(--muted);font-weight:600; }
.specs-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:28px; }
@media(max-width:580px) { .specs-grid { grid-template-columns:repeat(2,1fr); } }
.spec-tile {
  background:rgba(255,255,255,.04);border:1px solid var(--card-border);border-radius:18px;
  padding:16px 18px;transition:all .4s cubic-bezier(.2,.8,.2,1);cursor:default;
}
.spec-tile:hover { border-color:var(--accent);box-shadow:0 0 24px rgba(16,185,129,.14);transform:translateY(-3px);background:rgba(16,185,129,.05); }
.spec-icon { color:var(--accent);margin-bottom:10px;transition:transform .3s; }
.spec-tile:hover .spec-icon { transform:scale(1.2); }
.spec-lbl  { font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);font-weight:700; }
.spec-val  { font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:var(--text);margin-top:6px;letter-spacing:-.3px; }

/* — Agency — */
.agency-row  { display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px; }
.agency-av   {
  width:70px;height:70px;border-radius:20px;background:var(--accent-grad);
  display:flex;align-items:center;justify-content:center;
  font-family:'Syne',sans-serif;font-size:28px;font-weight:900;color:var(--btn-text);
  box-shadow:0 12px 32px rgba(0,0,0,.18);flex-shrink:0;transition:transform .3s;
}
.agency-av:hover { transform:scale(1.08); }
.agency-name { font-family:'Syne',sans-serif;font-size:22px;font-weight:900;color:var(--text);letter-spacing:-.3px; }
.agency-city { display:flex;align-items:center;gap:6px;font-size:14px;color:var(--muted);margin-top:6px;font-weight:500; }
.stars       { display:flex;align-items:center;gap:4px; }
.stars svg   { color:#f59e0b;width:18px;height:18px; }
.stars span  { font-family:'Syne',sans-serif;font-weight:900;font-size:17px;margin-left:8px;color:var(--text); }

.agency-info-stack { display:flex; flex-direction:column; gap:20px; }
.agency-address { display:flex; align-items:center; gap:8px; color:var(--muted); font-size:14px; font-weight:500; }
.agency-logo-img { width:70px; height:70px; border-radius:18px; object-fit:cover; background: rgba(255,255,255,0.05); border: 1px solid var(--card-border); }
.contact-actions { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.contact-btn {
  display:flex; align-items:center; gap:10px; padding:19px 50px; border-radius:14px;
  font-family:'Syne',sans-serif; font-weight:700; font-size:14px; cursor:pointer;
  transition:all .3s cubic-bezier(.16,1,.3,1); border:1.5px solid transparent;
  position:relative;
  top:85px;
  overflow: hidden;
}
.contact-btn.phone { border-color: rgba(124,58,237,0.4); color: #a78bfa; background: rgba(124,58,237,0.08); min-width: 200px; justify-content: center; }
.contact-btn.phone:hover { background: #7c3aed; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.3); border-color: #7c3aed; }

/* Slide Animation Logic */
.btn-content-flex { display: flex; align-items: center; gap: 10px; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.phone-val-slide { 
  position: absolute; 
  right: -100%; 
  opacity: 0; 
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'DM Sans', sans-serif;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.contact-btn.showing-phone .btn-content-flex { transform: translateX(-150%); opacity: 0; }
.contact-btn.showing-phone .phone-val-slide { right: 50%; transform: translateX(50%); opacity: 1; }

.contact-btn.whatsapp { border-color: rgba(34,197,94,0.4); color: #4ade80; background: rgba(34,197,94,0.08); }
.contact-btn.whatsapp:hover { background: #22c55e; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34,197,94,0.3); border-color: #22c55e; }

@media (max-width: 768px) {
  .contact-actions { flex-direction: column; width: 100%; gap: 10px; }
  .contact-btn { 
    padding: 12px 24px; 
    font-size: 13px; 
    top: 0 !important; 
    width: 100%; 
    justify-content: center; 
    border-radius: 12px;
  }
}

/* ─── VERIFICATION SECTION ─── */
.verify-wrap { animation:cardReveal .65s cubic-bezier(.16,1,.3,1) both; }

/* Two-doc row */
.doc-pair { display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px; }
@media(max-width:560px) { .doc-pair { grid-template-columns:1fr; } }

.doc-slot {
  padding: 55px 28px 55px;display:flex;flex-direction:column;align-items:center;gap:16px;
  text-align:center;cursor:pointer;transition:all .5s cubic-bezier(.2,.8,.2,1);
  background:linear-gradient(135deg,rgba(255,255,255,.02) 0%,rgba(16,185,129,.02) 100%);position:relative;overflow:hidden;
  box-shadow:0 8px 32px rgba(0,0,0,.08);
  border-radius:19px;
}
.doc-slot-inner { z-index:1; width:100%; display:flex; flex-direction:column; align-items:center; gap:14px; }
.doc-slot-svg {
  position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0;
}
.doc-slot-svg rect {
  fill:none; stroke:var(--accent); stroke-width:2.5;
  stroke-dasharray:10 14; stroke-linecap:round;
  rx:24; ry:24;
}
.doc-slot:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(16,185,129,.22);border-color:rgba(16,185,129,.55);background:linear-gradient(135deg,rgba(16,185,129,.06) 0%,rgba(16,185,129,.03) 100%);border-width:2.5px; }
.doc-slot.has-doc { background:rgba(239,68,68,.06); box-shadow:0 0 32px rgba(239,68,68,0.25), 0 0 64px rgba(239,68,68,.14); }
.doc-slot.has-doc .doc-slot-svg { display:none; }
.doc-slot.has-doc::before {
  content:''; position:absolute; inset:0; border-radius:24px;
  border:2px solid var(--success); pointer-events:none; z-index:0;
}
.doc-slot.drag-over { animation:dropPulse .8s ease infinite; }
.doc-slot.drag-over .drop-overlay { display:flex; }
.drop-overlay {
  display:none; position:absolute; inset:0; z-index:10; border-radius:24px;
  background:rgba(96,165,250,.15); backdrop-filter:blur(8px);
  align-items:center; justify-content:center; flex-direction:column; gap:10px;
  animation:dropOverlayIn .25s ease; pointer-events:none;
}
.drop-overlay span { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:var(--accent); }
.doc-slot-icon {
  width:68px;height:68px;border-radius:18px;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg, #059669 0%, #10b981 40%, #0ea5e9 100%);background-size:100% 100%;
  color:var(--btn-text);box-shadow:0 16px 48px rgba(16,185,129,.38);flex-shrink:0;
  transition:transform .4s cubic-bezier(.2,.8,.2,1);
}
.doc-slot-icon { color:var(--btn-text);box-shadow:0 16px 48px rgba(16,185,129,.38);flex-shrink:0; transition:transform .4s cubic-bezier(.2,.8,.2,1); }
.doc-slot-icon::before {
  content:''; position:absolute; inset:0; border-radius:18px;
  background:linear-gradient(135deg, rgba(255,255,255,.3) 0%, transparent 50%, rgba(0,0,0,.1) 100%);
  pointer-events:none;
}
.doc-slot:hover .doc-slot-icon { transform:scale(1.18) rotate(-8deg) translateY(-2px); }
.doc-actions  { display:flex;gap:10px;width:100%;margin-top:8px; }
.doc-btn-sm {
  flex:1;padding:19px 12px;border-radius:13px;font-size:16px;font-weight:700;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;
  font-family:'Syne',sans-serif;transition:all .35s;border:none;
}
.doc-btn-sm.upload { background:var(--card-border);color:var(--text);border:1px solid var(--card-border); }
.doc-btn-sm.upload:hover { background:var(--text);color:var(--bg);transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.12); }
.doc-btn-sm.camera {
  background:linear-gradient(135deg, #059669 0%, #10b981 40%, #0ea5e9 100%);
  color:var(--btn-text);box-shadow:0 10px 28px rgba(16,185,129,.24);
}
.doc-btn-sm.camera:hover { transform:translateY(-3px) scale(1.05);box-shadow:0 16px 42px rgba(16,185,129,.32); }

/* Doc preview inside slot */
.doc-preview-wrap { position:relative;width:100%;border-radius:16px;overflow:hidden; }
.doc-preview-wrap .scan-line { animation:none; }
.doc-preview-img  { width:100%;height:250px;;display:block; }
.doc-prev-label {
  position:absolute;bottom:0;inset-x:0;
  background:rgba(0,0,0,.7);backdrop-filter:blur(8px);
  padding:6px 10px;display:flex;align-items:center;gap:6px;
  font-size:11px;font-weight:700;color:var(--success);
}
.doc-prev-label.invalid { color: #ff4d4d; background: rgba(220, 38, 38, 0.25); }
.doc-prev-label.pending { color: var(--accent); }
.spin { animation: spinWheel 1.2s linear infinite; }
.doc-slot.invalid-border::before { border: 2.5px solid #ff4d4d !important; box-shadow: 0 0 30px rgba(239, 68, 68, 0.2); }
.doc-prev-rm {
  position:absolute;top:6px;right:6px;width:28px;height:28px;border-radius:50%;
  background:rgba(239,68,68,.9);color:#fff;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:transform .25s;z-index:2;
}
.doc-prev-rm:hover { transform:scale(1.15); }

/* Scan line animation on preview */
.scan-line {
  position:absolute;left:0;right:0;height:3px;
  background:linear-gradient(90deg, transparent, rgba(34,197,94,.25) 20%, rgba(34,197,94,.85) 50%, rgba(34,197,94,.25) 80%, transparent);
  box-shadow:0 0 12px rgba(34,197,94,.5);
  animation:scanLine 2.5s linear infinite;pointer-events:none;
}
[data-theme='dark'] .scan-line {
  background:linear-gradient(90deg, transparent, rgba(52,211,153,.2) 20%, rgba(52,211,153,.9) 50%, rgba(52,211,153,.2) 80%, transparent);
}

/* — Selfie step — */
.selfie-zone { margin-top:8px; }
.selfie-header {
  display:flex;align-items:center;gap:16px;margin-bottom:26px;
  padding:22px 24px;background:rgba(255,255,255,.04);
  border:1.5px solid var(--card-border);border-radius:20px;transition:all .4s;
}
.selfie-header:hover { border-color:var(--accent);background:rgba(16,185,129,.05); }
.selfie-icon-wrap {
  width:56px;height:56px;border-radius:16px;flex-shrink:0;
  background:var(--accent-grad);background-size:200% 200%;animation:gradMove 4.5s ease infinite;
  display:flex;align-items:center;justify-content:center;color:var(--btn-text);box-shadow:0 8px 24px rgba(0,0,0,.15);
}
.selfie-title { font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--text);letter-spacing:-.3px; }
.selfie-sub   { font-size:14px;color:var(--muted);margin-top:5px;font-weight:500; }
.selfie-tips  { display:flex;flex-direction:column;gap:12px;margin-bottom:26px; }
.tip-row {
  display:flex;align-items:center;gap:14px;padding:14px 16px;
  border-radius:16px;background:rgba(255,255,255,.03);border:1px solid var(--card-border);
  font-size:14px;color:var(--muted);transition:all .35s;font-weight:500;
}
.tip-row:hover { border-color:var(--accent);background:rgba(16,185,129,.06);transform:translateX(4px); }
.tip-row svg  { color:var(--accent);flex-shrink:0;transition:transform .3s; }
.tip-row:hover svg { transform:scale(1.2); }

/* Selfie SVG ring */
.selfie-ring-wrap {
  position:relative; width:200px; height:200px; margin:0 auto 28px;
}
.selfie-ring-svg {
  position:absolute; inset:0; width:100%; height:100%;
  transform:rotate(-90deg); pointer-events:none;
}
.selfie-ring-svg circle.track { fill:none; stroke:var(--card-border); stroke-width:3.5; }
.selfie-ring-svg circle.progress {
  fill:none; stroke:var(--accent); stroke-width:3.5; stroke-linecap:round;
  stroke-dasharray:502; stroke-dashoffset:502;
  animation:ringDraw 2.8s ease-in-out infinite alternate;
}
.selfie-ring-svg.done circle.progress {
  stroke:var(--success); stroke-dashoffset:0; animation:none;
  transition:stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1), stroke .5s;
}
.selfie-ring-inner {
  position:absolute; inset:16px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  background:rgba(96,165,250,.08); color:var(--muted);
  overflow:hidden; animation:float 4.5s ease-in-out infinite;
}
.selfie-ring-inner img { width:100%; height:100%; object-fit:cover; animation:none; }
.selfie-ring-wrap.has-photo .selfie-ring-inner { box-shadow:0 0 50px var(--success-glow);background:rgba(34,197,94,.12); animation:glow 2.8s ease infinite; }
.selfie-ring-wrap.has-photo .scan-line { animation-duration:1.8s; }

.selfie-ring { width:200px;height:200px;margin:0 auto 28px;border-radius:50%;background:rgba(96,165,250,.08);display:flex;align-items:center;justify-content:center;color:var(--muted);animation:float 4.5s ease-in-out infinite; }

.selfie-preview-ring { width:200px;height:200px;margin:0 auto 28px;border-radius:50%;overflow:hidden;border:3px solid var(--success);box-shadow:0 0 40px var(--success-glow);position:relative; }
.selfie-preview-ring img { width:100%;height:100%;object-fit:cover; }
.selfie-preview-ring .scan-line { position:absolute;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,rgba(34,197,94,.3) 20%,rgba(34,197,94,.9) 50%,rgba(34,197,94,.3) 80%,transparent);animation:scanLine 2s linear infinite; }

.or-divider { display:flex;align-items:center;gap:12px;color:var(--muted);font-size:13px;margin:18px 0; }
.or-divider::before,.or-divider::after { content:'';flex:1;height:1px;background:var(--card-border); }

/* — Progress Orbs — */
.progress-orbs { display:flex;align-items:center;gap:10px; }
.orb { width:12px;height:12px;border-radius:50%;background:var(--card-border);transition:all .5s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 0 3px rgba(255,255,255,.08); }
.orb.done { background:var(--success);box-shadow:0 0 14px var(--success-glow);transform:scale(1.2); }

/* — CTA Row — */
.cta-row { display:flex;justify-content:flex-end;align-items:center;gap:16px;margin-top:36px; }
.cta-hint { font-size:14px;color:var(--muted);font-weight:600; }

/* — Buttons — */
.doc-slot h4  { font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:var(--text);letter-spacing:-.4px; }
.doc-slot p   { font-size:14px;color:var(--muted);line-height:1.7;font-weight:500; }
.btn-primary {
  position:relative;background:linear-gradient(135deg,#059669 0%,#10b981 40%,#0ea5e9 100%);
  background-size:100% 100%;color:#fff;border:none;border-radius:18px;
  font-family:'Syne',sans-serif;font-weight:800;font-size:15px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;
  padding:16px 32px;transition:transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .35s;overflow:hidden;
  box-shadow:0 12px 36px rgba(16,185,129,.42);letter-spacing:.3px;
}
[data-theme='dark'] .btn-primary { background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 40%,#0ea5e9 100%);background-size:100% 100%;box-shadow:0 12px 36px rgba(37,99,235,.42); }
.btn-primary:hover:not(:disabled) { transform:translateY(-5px) scale(1.05);box-shadow:0 20px 50px rgba(16,185,129,.55); }
.btn-primary:disabled { opacity:.45;cursor:not-allowed;transform:none !important; }
.btn-primary.lg { padding:18px 40px;font-size:17px;border-radius:20px;letter-spacing:.4px; }
.btn-particle {
  position:absolute; width:8px; height:8px; border-radius:50%;
  background:#fff; pointer-events:none; left:50%; top:50%;
  animation:btnParticle .7s ease-out forwards;
}

/* — 3-segment progress bar — */
.seg-progress { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:32px; }
.seg-item { display:flex; flex-direction:column; gap:8px; }
.seg-track {
  height:14px; border-radius:14px; background:var(--card-border); overflow:hidden; position:relative; box-shadow:inset 0 2px 4px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.12);
}
.seg-fill {
  height:100%; width:0; border-radius:14px; background:linear-gradient(90deg, #059669 0%, #10b981 40%, #0ea5e9 100%); background-size:100% 100%;
  transition:width 1.2s cubic-bezier(.34,1.4,.64,1); position:relative; overflow:hidden; box-shadow:0 0 24px rgba(16,185,129,.45), inset 0 1px 3px rgba(255,255,255,.3);
}
.seg-fill.done {
  width:100% !important;
  background:linear-gradient(90deg, #22c55e 0%, #34d399 50%, #4ade80 100%);
  background-size:100% 100%;
  box-shadow:0 0 32px var(--success-glow), inset 0 0 20px rgba(255,255,255,.25);
}
.seg-fill.done::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent);
  animation:barShine 2s ease infinite;
}
.seg-label { font-size:11px; font-weight:700; color:var(--muted); text-align:center; font-family:'Syne',sans-serif; transition:color .4s; letter-spacing:.05em; }
.seg-label.done { color:var(--success); }

/* Sidebar liquid segments */
.seg-liquid-row { display:flex; flex-direction:column; gap:16px; margin-top:18px; }
.seg-liquid { display:flex; flex-direction:column; gap:7px; }
.seg-liquid-track { height:12px; border-radius:12px; background:var(--card-border); overflow:hidden; box-shadow:inset 0 2px 4px rgba(0,0,0,.08), 0 4px 14px rgba(0,0,0,.1); }
.seg-liquid-fill {
  height:100%; width:0; border-radius:12px;
  background:linear-gradient(90deg, #059669 0%, #10b981 40%, #0ea5e9 100%); background-size:100% 100%;
  transition:width 1.2s cubic-bezier(.34,1.4,.64,1), box-shadow .6s ease;
  box-shadow:0 0 18px rgba(16,185,129,.35), inset 0 1px 2px rgba(255,255,255,.3);
}
.seg-liquid-fill.done {
  width:100%; background:linear-gradient(90deg, #22c55e 0%, #34d399 50%, #4ade80 100%);
  background-size:100% 100%;
  animation:liquidFill 1.2s ease forwards;
  box-shadow:0 0 28px var(--success-glow), inset 0 0 16px rgba(255,255,255,.28);
}

/* Phase transition */
.phase-panel { animation:phaseIn .35s cubic-bezier(.16,1,.3,1) both; }
.phase-panel.exiting { animation:phaseOut .25s ease forwards; pointer-events:none; }

/* — SUCCESS (sequenced) — */
.success-wrap { text-align:center;padding:40px 0; position:relative; min-height:420px; }
.s-ring { position:relative;width:140px;height:140px;margin:0 auto 40px; }
.s-ring::before,.s-ring::after {
  content:'';position:absolute;inset:0;border-radius:50%;
  border:3px solid var(--success); opacity:0;
  animation:successRing 2.4s ease infinite; animation-delay:200ms;
}
.s-ring::after { animation-delay:900ms; }
.s-icon {
  position:relative;z-index:1;width:140px;height:140px;border-radius:50%;
  background:linear-gradient(135deg,#22c55e,#34d399);
  display:flex;align-items:center;justify-content:center;
  animation:successPop .7s cubic-bezier(.16,1,.3,1) both;
  box-shadow:0 0 80px var(--success-glow);
}
.s-title { font-family:'Syne',sans-serif;font-size:42px;font-weight:900;letter-spacing:-2px;margin-bottom:16px;color:var(--text); display:flex; flex-wrap:wrap; justify-content:center; gap:.3em; }
.s-title .word { display:inline-block; opacity:0; animation:wordIn .55s cubic-bezier(.16,1,.3,1) forwards; }
.s-sub   { color:var(--muted);font-size:16px;line-height:1.85;max-width:480px;margin:0 auto; opacity:0; animation:fadeUp .6s ease forwards; animation-delay:600ms;font-weight:500; }
.s-thumbs { display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin:36px 0; }
.s-thumb  { width:120px;border-radius:18px;overflow:hidden;border:3px solid var(--success);box-shadow:0 12px 32px var(--success-glow);transition:transform .3s; opacity:0; animation:thumbSlide .65s cubic-bezier(.16,1,.3,1) forwards; }
.s-thumb:nth-child(1) { animation-delay:750ms; }
.s-thumb:nth-child(2) { animation-delay:820ms; }
.s-thumb:nth-child(3) { animation-delay:890ms; }
.s-thumb:hover { transform:scale(1.08) translateY(-4px); }
.s-thumb img { width:100%;height:85px;object-fit:cover;display:block; }
.s-thumb div { background:linear-gradient(135deg,rgba(0,0,0,.8),rgba(0,0,0,.6));font-size:11px;text-align:center;padding:6px;color:#fff;font-weight:700;font-family:'Syne',sans-serif; }
.s-cta { opacity:0; animation:ctaReveal .6s ease forwards; animation-delay:1100ms; }

/* Confetti — varied shapes */
.confetti-bit { position:absolute; animation:confettiFall 1.4s ease forwards; pointer-events:none; }
.confetti-bit.square { width:9px; height:9px; border-radius:2px; }
.confetti-bit.round { width:8px; height:8px; border-radius:50%; }
.confetti-bit.triangle {
  width:0; height:0; border-left:5px solid transparent; border-right:5px solid transparent;
  border-bottom:9px solid var(--c-color); background:transparent !important;
}

/* Animated Inputs */
.modern-doc-input {
  width:100%; padding:14px 18px; border-radius:16px; border:2px solid var(--card-border);
  background:var(--glass); color:var(--text); outline:none; font-size:15px; font-weight:700;
   transition:all .4s cubic-bezier(.25,1,.5,1);
  box-shadow:0 4px 12px rgba(0,0,0,.02);
}
.modern-doc-input::placeholder { color:var(--muted); opacity:.6; font-weight:500; }
.modern-doc-input:focus {
  border-color:var(--success); background:var(--card);
  transform:translateY(-2px) scale(1.02);
  animation:modernInputGlow 2.5s infinite alternate;
}
@keyframes modernInputGlow {
  0% { box-shadow:0 0 20px var(--success-glow), inset 0 0 5px transparent; }
  100% { box-shadow:0 0 45px var(--success-glow), inset 0 0 15px var(--success-glow); }
}

.side-price-animated { font-family:'Syne',sans-serif; font-size:30px; font-weight:900; }

/* — SIDEBAR — */
.sidebar { position:sticky;top:90px;display:flex;flex-direction:column;gap:20px;animation:fadeUp .6s .15s ease both; }
@media(max-width:980px) { .sidebar { position:static; } }
.side-card { background:var(--card);border:1px solid var(--card-border);border-radius:28px;overflow:hidden;backdrop-filter:blur(16px);box-shadow:0 12px 40px rgba(0,0,0,.12);transition:all .5s cubic-bezier(.2,.8,.2,1); }
.side-card:hover { transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.16);border-color:rgba(96,165,250,.2); }
.side-img  { width:100%;height:240px;object-fit:cover;display:block;transition:transform .8s ease; }
.side-card:hover .side-img { transform:scale(1.05); }
.side-body { padding:28px 30px; }
.side-name { font-family:'Syne',sans-serif;font-size:24px;font-weight:900;color:var(--text);letter-spacing:-.5px; }
.side-price { font-family:'Syne',sans-serif;font-size:36px;font-weight:900;background:var(--btn-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.side-unit  { font-size:13px;color:var(--muted);font-weight:600; }
.divider    { height:1.5px;background:linear-gradient(90deg,var(--card-border),transparent);margin:20px 0; }
.info-row   { display:flex;justify-content:space-between;font-size:14px;margin-bottom:14px;align-items:center; }
.info-row .lbl { color:var(--muted);font-weight:600;letter-spacing:.03em; }
.info-row .val { font-weight:800;color:var(--text);font-family:'Syne',sans-serif;font-size:15px; }

/* Progress bar */
.prog-wrap   { padding:24px 26px 28px;border-top:1px solid var(--card-border); }
.prog-lbl    { font-size:12px;color:var(--muted);margin-bottom:14px;display:flex;justify-content:space-between;font-weight:600;letter-spacing:.05em; }
.prog-lbl strong { color:var(--accent);font-family:'Syne',sans-serif;font-size:15px;font-weight:800; }
.prog-track  { height:14px;background:var(--card-border);border-radius:14px;overflow:hidden;box-shadow:inset 0 2px 4px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.12); }
.prog-fill   {
  height:100%;border-radius:14px;background:linear-gradient(90deg, #059669 0%, #10b981 40%, #0ea5e9 100%);background-size:100% 100%;
  transition:width 1.4s cubic-bezier(.34,1.4,.64,1), box-shadow .5s ease;
  position:relative;overflow:hidden;box-shadow:0 0 24px rgba(16,185,129,.45), inset 0 1px 3px rgba(255,255,255,.3);
}
.prog-fill::after {
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);
  animation:barShine 2.2s ease infinite;
}
.checks { margin-top:20px;display:flex;flex-direction:column;gap:14px; }
.chk    { display:flex;align-items:center;gap:12px;font-size:14px;font-weight:600;transition:all .35s;padding:10px 12px;border-radius:12px;cursor:default; }
.chk .dot { width:10px;height:10px;border-radius:50%;background:var(--card-border);flex-shrink:0;transition:all .5s;box-shadow:0 0 0 3px rgba(255,255,255,.1); }
.chk.done { color:var(--text);background:rgba(34,197,94,.08); }
.chk.done .dot { background:var(--success);box-shadow:0 0 12px var(--success-glow);transform:scale(1.1); }
.chk.partial { color:var(--text);background:rgba(16,185,129,.08); }
.chk.partial .dot { background:var(--accent);animation:shimmerPulse 1.8s ease infinite;box-shadow:0 0 10px rgba(16,185,129,.4); }
.chk:not(.done):not(.partial) { color:var(--muted);opacity:.7; }

.secure-badge {
  display:flex;align-items:center;gap:14px;padding:18px 22px;
  border-radius:20px;background:rgba(34,197,94,.09);border:1.5px solid rgba(34,197,94,.25);
  font-size:13px;color:var(--muted);font-weight:600;
  box-shadow:0 8px 24px rgba(34,197,94,.12);transition:all .4s;
}
.secure-badge:hover { background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.35);box-shadow:0 12px 32px rgba(34,197,94,.18); }
.secure-badge svg { color:var(--success);flex-shrink:0;width:20px;height:20px; }

/* — CAMERA — */
.cam-overlay {
  position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.94);
  display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;
  animation:fadeIn .25s ease;
}
.cam-frame {
  position:relative;width:100%;max-width:500px;border-radius:26px;overflow:hidden;
  border:2px solid var(--accent);box-shadow:0 0 80px rgba(96,165,250,.25);
}
.cam-frame video { width:100%;display:block; }
.cam-frame.mirror video { transform:scaleX(-1); }
.cam-close {
  position:absolute;top:14px;right:14px;width:46px;height:46px;border-radius:50%;
  background:rgba(0,0,0,.6);color:#fff;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;z-index:2;transition:background .25s;
}
.cam-close:hover { background:#ef4444; }
.capture-btn {
  width:80px;height:80px;border-radius:50%;border:3px solid var(--accent);
  padding:6px;cursor:pointer;margin-top:30px;background:transparent;transition:transform .25s;
}
.capture-btn:hover { transform:scale(1.08); }
.capture-inner { width:100%;height:100%;border-radius:50%;background:#fff; }
.cam-hint { color:rgba(255,255,255,.55);font-size:13px;margin-top:18px;text-align:center;max-width:320px; }

/* — Logo — */
.logo-wrap {
  display:flex;align-items:center;gap:14px;cursor:pointer;
  transition:transform .2s ease;
}
.logo-wrap:hover { transform:scale(1.02); }
.logo-box {
  position:relative;width:46px;height:46px;border-radius:15px;
  background:var(--text);display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 18px rgba(0,0,0,.16);overflow:hidden;
}
.logo-wordmark { position:relative;font-family:'Syne',sans-serif;font-weight:900;font-size:27px;letter-spacing:-.5px; }
`;

/* ─── Animated Logo ─── */
function AnimatedLogo({ onClick }) {
    return (
        <div className="logo-wrap" onClick={onClick}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="logo-box">
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,var(--accent) 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 2, background: 'var(--bg)', borderRadius: 13, zIndex: 1 }} />
                <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
                    <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
                </svg>
            </div>
            <div className="logo-wordmark">
                <span style={{ color: 'var(--text)' }}>Upp</span>
                <span style={{ color: 'var(--accent)' }}>Car</span>
                <span style={{ position: 'absolute', bottom: 6, right: -13, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'blink 2s infinite' }} />
            </div>
        </div>
    );
}

/* ─── Particle canvas ─── */
class Particle {
    constructor(W, H) { this.W = W; this.H = H; this.reset(); }
    reset() {
        this.x = Math.random() * this.W; this.y = Math.random() * this.H;
        this.vx = (Math.random() - .5) * .28; this.vy = (Math.random() - .5) * .28;
        this.r = Math.random() * 1.2 + .3; this.alpha = Math.random() * .28 + .06;
        this.color = ['#6366f1', '#10b981', '#3b82f6', '#a78bfa', '#34d399'][Math.floor(Math.random() * 5)];
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) this.reset();
    }
}

/* ─── Confetti ─── */
const CONFETTI = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];
const SHAPE_TYPES = ['square', 'round', 'triangle'];

function cardGlowHandlers() {
    return {
        onMouseMove: (e) => {
            const el = e.currentTarget;
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
            el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
        },
        onMouseLeave: (e) => {
            e.currentTarget.style.setProperty('--mouse-x', '50%');
            e.currentTarget.style.setProperty('--mouse-y', '50%');
        },
    };
}

function Confetti() {
    return (
        <>
            {Array.from({ length: 30 }, (_, i) => {
                const shape = SHAPE_TYPES[i % 3];
                const color = CONFETTI[i % CONFETTI.length];
                return (
                    <span
                        key={i}
                        className={`confetti-bit ${shape}`}
                        style={{
                            left: `${6 + (i * 3.1) % 88}%`,
                            top: `${12 + (i % 6) * 8}%`,
                            background: shape !== 'triangle' ? color : undefined,
                            ['--c-color']: color,
                            animationDelay: `${i * 0.05}s`,
                        }}
                    />
                );
            })}
        </>
    );
}

function SegmentProgress({ segments }) {
    return (
        <div className="seg-progress">
            {segments.map(({ label, done }) => (
                <div className="seg-item" key={label}>
                    <div className="seg-track">
                        <div className={`seg-fill ${done ? 'done' : ''}`} style={{ width: done ? '100%' : '4%' }} />
                    </div>
                    <span className={`seg-label ${done ? 'done' : ''}`}>{done ? '✓ Validé' : 'En attente'}</span>
                </div>
            ))}
        </div>
    );
}

function SelfieRing({ hasPhoto, src }) {
    const r = 80;
    const circ = 2 * Math.PI * r;
    return (
        <div className={`selfie-ring-wrap ${hasPhoto ? 'has-photo' : ''}`}>
            <svg className={`selfie-ring-svg ${hasPhoto ? 'done' : ''}`} viewBox="0 0 180 180">
                <circle className="track" cx="90" cy="90" r={r} />
                <circle
                    className="progress"
                    cx="90" cy="90" r={r}
                    style={{ strokeDasharray: circ, strokeDashoffset: hasPhoto ? 0 : circ * 0.35 }}
                />
            </svg>
            <div className="selfie-ring-inner">
                {hasPhoto ? <img src={src} alt="Selfie" /> : <Users size={54} strokeWidth={1} />}
                {hasPhoto && <div className="scan-line" />}
            </div>
        </div>
    );
}

function PrimaryButton({ children, disabled, onClick, className = '', style = {} }) {
    const [particles, setParticles] = useState([]);
    const handleClick = (e) => {
        if (disabled) return;
        const burst = Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.4;
            const dist = 28 + Math.random() * 22;
            return { id: `${Date.now()}-${i}`, tx: `${Math.cos(angle) * dist}px`, ty: `${Math.sin(angle) * dist}px` };
        });
        setParticles(burst);
        setTimeout(() => setParticles([]), 600);
        onClick?.(e);
    };
    return (
        <button type="button" className={`btn-primary ${className}`} disabled={disabled} onClick={handleClick} style={style}>
            {particles.map(p => (
                <span key={p.id} className="btn-particle" style={{ '--tx': p.tx, '--ty': p.ty }} />
            ))}
            {children}
        </button>
    );
}

function AnimatedPrice({ value }) {
    const [display, setDisplay] = useState(0);
    const target = typeof value === 'number' ? value : parseFloat(value);
    const isNumeric = !Number.isNaN(target) && value != null && value !== '—';

    useEffect(() => {
        if (!isNumeric) return;
        const start = performance.now();
        const duration = 1200;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        let frame;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            setDisplay(Math.round(easeOut(p) * target));
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, isNumeric]);

    if (!isNumeric) return <span className="side-price-animated grad-text">{value ?? '—'}</span>;
    return <span className="side-price-animated grad-text">{display}</span>;
}

function SuccessTitle({ text }) {
    const words = text.split(' ');
    return (
        <h2 className="s-title">
            {words.map((w, i) => (
                <span key={i} className="word" style={{ animationDelay: `${400 + i * 60}ms` }}>{w} </span>
            ))}
        </h2>
    );
}

function LiquidSegments({ items }) {
    return (
        <div className="seg-liquid-row">
            {items.map(({ label, done }) => (
                <div className="seg-liquid" key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600 }}>
                        <span style={{ color: 'var(--muted)' }}>{label}</span>
                        <span style={{ color: done ? 'var(--success)' : 'var(--muted)' }}>{done ? '✓' : '—'}</span>
                    </div>
                    <div className="seg-liquid-track">
                        <div className={`seg-liquid-fill ${done ? 'done' : ''}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Doc Slot ─── */
function DocSlot({ icon, title, sub, doc, status, onUpload, onCamera, onRemove, onDropFile, dropLabel = 'Drop', labelPending = 'pending...', labelValidated = 'validated' }) {
    const [dragOver, setDragOver] = useState(false);
    const handleDrop = (e) => {
        e.preventDefault(); e.stopPropagation(); setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file?.type.startsWith('image/')) onDropFile(file);
    };
    return (
        <div
            className={`doc-slot ${doc ? 'has-doc' : ''} ${dragOver ? 'drag-over' : ''} ${status === 'invalid' ? 'invalid-border' : ''}`}
            onClick={!doc ? onUpload : undefined} role="button" tabIndex={0}
            onKeyDown={e => !doc && e.key === 'Enter' && onUpload()}
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
            onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
            onDrop={handleDrop}
        >
            {!doc && <svg className="doc-slot-svg" preserveAspectRatio="none"><rect x="1" y="1" width="99%" height="99%" /></svg>}
            <div className="drop-overlay"><Upload size={28} color="var(--accent)" /><span>{dropLabel}</span></div>
            <div className="doc-slot-inner">
                {!doc ? (
                    <>
                        <div className="doc-slot-icon">{icon}</div>
                        <h4>{title}</h4>
                        <p>{sub}</p>
                        <div className="doc-actions" onClick={e => e.stopPropagation()}>
                            <button type="button" className="doc-btn-sm upload" onClick={onUpload} style={{ flex: 1 }}><Upload size={13} /> Importer</button>
                            <button type="button" className="doc-btn-sm camera" onClick={onCamera} style={{ flex: 1 }}><Camera size={13} /> Photo</button>
                        </div>
                    </>
                ) : (
                    <div className="doc-preview-wrap" onClick={e => e.stopPropagation()}>
                        <img className="doc-preview-img" src={doc} alt={title} />
                        <div className="scan-line" />
                        <div className={`doc-prev-label ${status}`}>
                            {status === 'pending' ? <Sparkles className="spin" size={12} /> :
                                status === 'invalid' ? <XCircle size={12} color="#ff4d4d" /> :
                                    <CheckCircle2 size={12} />}
                            {title} {status === 'pending' ? labelPending : status === 'invalid' ? '?????' : labelValidated}
                        </div>
                        <button type="button" className="doc-prev-rm" onClick={onRemove}><X size={14} /></button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── MAIN COMPONENT ─── */
export default function BookingAgreement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef(null);
    const photoCanvasRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const fileRef = useRef(null);

    const [isDark, setIsDark] = useState(() => localStorage.getItem('appTheme') === 'dark');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem('appLang') || 'FR');

    const texts = {
        FR: {
            // Hero
            title: "Finaliser votre ", res: "réservation",
            sub: "Vérifiez le véhicule, l'agence et complétez la vérification d'identité sécurisée.",
            // Nav
            navProfile: "Profil", navRes: "Réservations", navFav: "Favoris", navAbout: "À propos", logout: "🚪  Déconnexion",
            modeDark: "🌙  Mode sombre", modeLight: "☀️  Mode clair",
            // Sections
            carDet: "Détails du véhicule", agency: "Agence loueur", verify: "Vérification d'identité",
            // Agency card
            loc: "Localisation", call: "Appeler", avis: "avis",
            // Sidebar
            madDay: "MAD / jour", sideAgency: "Agence", sideVille: "Ville", sideCat: "Catégorie", sideFuel: "Carburant",
            progress: "Progression", sideCin: "Carte d'Identité Nationale", sidePermis: "Permis de conduire", sideSelfie: "Selfie de vérification",
            badge: "Données chiffrées · Conforme RGPD · Usage réservation uniquement",
            specFuel: "Carburant", specSeats: "Places", specStatus: "Statut", specPlate: "Immat.",
            statusAvailable: "Disponible", statusBooked: "Réservé", statusService: "En maintenance",
            fuelGas: "Essence", fuelDiesel: "Diesel", fuelElectric: "Électrique", fuelHybrid: "Hybride",
            // Steps
            step1: "Étape 1 : Pièce d'Identité", step2: "Étape 2 : Permis de conduire", step3: "Étape 3 : Selfie de vérification",
            cinTitle: "Carte d'Identité", cinSub: "Recto de votre CIN nationale",
            permisTitle: "Permis de conduire", permisSub: "Permis en cours de validité",
            tip_cin1: "Assurez-vous que l'image est nette", tip_cin2: "Tous les bords doivent être visibles",
            tip_permis1: "Photo claire et lisible uniquement", tip_permis2: "Format card recommandé",
            tip_selfie1: "Visage bien éclairé", tip_selfie2: "Regardez la caméra",
            docLoaded: "✓ Document chargé", selfieReady: "✓ Selfie prêt", optional: "Étape facultative",
            continueBtn: "Continuer", back: "← Retour", confirm: "Confirmer", analyzing: "Analyse IA...",
            importBtn: "Importer", photoBtn: "Photo", retake: "Reprendre", finishRes: "Terminer la réservation",
            dropHere: "Déposez ici",
            pending: "en cours...", validated: "validé",
            // Success
            verifComp: "Vérification complète !",
            successSub: "Tous vos documents ont été soumis avec succès. Votre réservation est en cours de traitement par l'agence.",
            aiValidated: "Identité validée par IA", nameExtracted: "Nom extrait du dossier", verified: "Vérifié",
            // Camera
            camHintSelfie: "Tenez votre CIN à côté de votre visage et regardez la caméra",
            camHintDoc: "Cadrez le document — texte bien lisible",
            // Errors
            errAI: "Service d'identité indisponible temporairement.",
            errConn: "Erreur de connexion au service d'analyse.",
            errBlur: "Document trop flou. Veuillez reprendre la photo sous un meilleur éclairage.",
            errMismatch: "Mismatch : Les noms sur la CIN et le permis ne correspondent pas.",
            errFace: "Le selfie ne correspond pas au visage sur les documents.",
            errGlobal: "Échec de la validation d'identité.",
        },
        EN: {
            title: "Finalize your ", res: "booking",
            sub: "Check the vehicle, the agency and complete the secure identity verification.",
            navProfile: "Profile", navRes: "Bookings", navFav: "Favorites", navAbout: "About", logout: "🚪  Log Out",
            modeDark: "🌙  Dark Mode", modeLight: "☀️  Light Mode",
            carDet: "Vehicle Details", agency: "Rental Agency", verify: "Identity Verification",
            loc: "Location", call: "Call", avis: "reviews",
            madDay: "MAD / day", sideAgency: "Agency", sideVille: "City", sideCat: "Category", sideFuel: "Fuel",
            progress: "Progress", sideCin: "National ID Card", sidePermis: "Driver's License", sideSelfie: "Verification Selfie",
            badge: "Encrypted data · GDPR compliant · For booking use only",
            specFuel: "Fuel", specSeats: "Seats", specStatus: "Status", specPlate: "Plate",
            statusAvailable: "Available", statusBooked: "Booked", statusService: "Maintenance",
            fuelGas: "Gasoline", fuelDiesel: "Diesel", fuelElectric: "Electric", fuelHybrid: "Hybrid",
            step1: "Step 1: Identity Card", step2: "Step 2: Driver's License", step3: "Step 3: Verification Selfie",
            cinTitle: "Identity Card", cinSub: "Front of your national ID",
            permisTitle: "Driver's License", permisSub: "Valid license required",
            tip_cin1: "Make sure the image is sharp", tip_cin2: "All edges must be visible",
            tip_permis1: "Clear and readable photo only", tip_permis2: "Card format recommended",
            tip_selfie1: "Well-lit face", tip_selfie2: "Look at the camera",
            docLoaded: "✓ Document loaded", selfieReady: "✓ Selfie ready", optional: "Optional step",
            continueBtn: "Continue", back: "← Back", confirm: "Confirm", analyzing: "AI Analysis...",
            importBtn: "Import", photoBtn: "Photo", retake: "Retake", finishRes: "Finish Booking",
            dropHere: "Drop here",
            pending: "in progress...", validated: "validated",
            verifComp: "Verification Complete!",
            successSub: "All your documents have been submitted successfully. Your booking is being processed by the agency.",
            aiValidated: "Identity validated by AI", nameExtracted: "Name extracted from file", verified: "Verified",
            camHintSelfie: "Hold your ID next to your face and look at the camera",
            camHintDoc: "Frame the document — text clearly readable",
            errAI: "Identity service temporarily unavailable.",
            errConn: "Connection error to analysis service.",
            errBlur: "Document too blurry. Please retake photo with better lighting.",
            errMismatch: "Mismatch: Names on ID and Driver's License do not match.",
            errFace: "Selfie does not match the face on the documents.",
            errGlobal: "Identity verification failed.",
        },
        AR: {
            title: "إتمام ", res: "الحجز",
            sub: "تحقق من السيارة والوكالة وأكمل التحقق الآمن من الهوية.",
            navProfile: "الملف الشخصي", navRes: "الحجوزات", navFav: "المفضلة", navAbout: "حول", logout: "🚪  تسجيل الخروج",
            modeDark: "🌙  الوضع الليلي", modeLight: "☀️  الوضع النهاري",
            carDet: "تفاصيل السيارة", agency: "وكالة التأجير", verify: "التحقق من الهوية",
            loc: "الموقع", call: "اتصال", avis: "تقييم",
            madDay: "درهم / يوم", sideAgency: "الوكالة", sideVille: "المدينة", sideCat: "الفئة", sideFuel: "الوقود",
            progress: "التقدم", sideCin: "بطاقة الهوية الوطنية", sidePermis: "رخصة القيادة", sideSelfie: "صورة التحقق",
            badge: "بيانات مشفرة · متوافق مع RGPD · للحجز فقط",
            specFuel: "الوقود", specSeats: "المقاعد", specStatus: "الحالة", specPlate: "الترقيم",
            statusAvailable: "متوفر", statusBooked: "محجوز", statusService: "في الصيانة",
            fuelGas: "بنزين", fuelDiesel: "ديزل", fuelElectric: "كهرباء", fuelHybrid: "هجين",
            step1: "الخطوة 1: بطاقة الهوية", step2: "الخطوة 2: رخصة القيادة", step3: "الخطوة 3: صورة التحقق",
            cinTitle: "بطاقة الهوية الوطنية", cinSub: "الوجه الأمامي لبطاقتك",
            permisTitle: "رخصة القيادة", permisSub: "رخصة سارية المفعول",
            tip_cin1: "تأكد من وضوح الصورة", tip_cin2: "يجب أن تظهر جميع الحواف",
            tip_permis1: "صورة واضحة ومقروءة فقط", tip_permis2: "يُنصح بحجم البطاقة",
            tip_selfie1: "وجه مضاء جيدًا", tip_selfie2: "انظر إلى الكاميرا",
            docLoaded: "✓ تم تحميل الوثيقة", selfieReady: "✓ الصورة جاهزة", optional: "خطوة اختيارية",
            continueBtn: "متابعة", back: "→ رجوع", confirm: "تأكيد", analyzing: "تحليل الذكاء الاصطناعي...",
            importBtn: "استيراد", photoBtn: "التقاط", retake: "إعادة", finishRes: "إنهاء الحجز",
            dropHere: "أفلت هنا",
            pending: "جارٍ...", validated: "تم التحقق",
            verifComp: "اكتمل التحقق!",
            successSub: "تم إرسال جميع وثائقك بنجاح. حجزك قيد المعالجة من قِبل الوكالة.",
            aiValidated: "تم التحقق من الهوية بالذكاء الاصطناعي", nameExtracted: "الاسم المستخرج من الملف", verified: "تم التحقق",
            camHintSelfie: "ضع بطاقتك بجانب وجهك وانظر إلى الكاميرا",
            camHintDoc: "ضع الوثيقة في الإطار — يجب أن يكون النص مقروءًا",
            errAI: "خدمة التحقق غير متوفرة مؤقتًا.",
            errConn: "خطأ في الاتصال بخدمة التحليل.",
            errBlur: "الوثيقة غير واضحة. يرجى إعادة التقاط الصورة في إضاءة أفضل.",
            errMismatch: "عدم تطابق: الأسماء في بطاقة الهوية ورخصة القيادة غير متطابقة.",
            errFace: "الصورة الشخصية لا تطابق الوجه الموجود في الوثائق.",
            errGlobal: "فشل التحقق من الهوية.",
        }
    };
    const t = texts[selectedLang] || texts.FR;

    const [currentUser, setCurrentUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
    const [car, setCar] = useState(null);
    const [agency, setAgency] = useState(null);
    const [loading, setLoading] = useState(true);

    // Phases: 0 = CIN, 1 = Permis, 2 = Selfie, 3 = Success
    const [phase, setPhase] = useState(0);
    const [displayPhase, setDisplayPhase] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [docs, setDocs] = useState({ cin: null, permis: null, selfie: null });
    const [cinNumber, setCinNumber] = useState('');
    const [permisNumber, setPermisNumber] = useState('');
    const [camType, setCamType] = useState(null);
    const [isCamOpen, setIsCamOpen] = useState(false);
    const [activeFile, setActiveFile] = useState(null);
    const [aiResults, setAiResults] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState(null);
    const [docStatuses, setDocStatuses] = useState({ cin: 'pending', permis: 'pending', selfie: 'valid' });
    const [showPhone, setShowPhone] = useState(false);

    // Review state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async () => {
        try {
            const r = await fetch(`http://localhost:8080/api/reviews/car/${id}`);
            if (r.ok) setReviews(await r.json());
        } catch (e) { console.error("Error fetching reviews:", e); }
    };

    const changePhase = useCallback((next) => {
        if (next === phase) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setPhase(next);
            setDisplayPhase(next);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 250);
    }, [phase]);

    const verifyDoc = async (type, base64) => {
        setDocStatuses(p => ({ ...p, [type]: 'pending' }));
        try {
            const r = await fetch('http://localhost:8000/verify-doc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, doc_type: type })
            });
            if (r.ok) {
                const data = await r.json();
                setDocStatuses(p => ({ ...p, [type]: data.is_valid ? 'valid' : 'invalid' }));
            } else {
                setDocStatuses(p => ({ ...p, [type]: 'invalid' }));
            }
        } catch {
            setDocStatuses(p => ({ ...p, [type]: 'invalid' }));
        }
    };

    const readFileAsDataUrl = useCallback((file, key) => {
        const reader = new FileReader();
        reader.onload = ev => {
            const res = ev.target.result;
            setDocs(p => ({ ...p, [key]: res }));
            if (key !== 'selfie') verifyDoc(key, res);
        };
        reader.readAsDataURL(file);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('appTheme', isDark ? 'dark' : 'light');
    }, [isDark]);

    useEffect(() => {
        const u = localStorage.getItem('user');
        if (u) setCurrentUser(JSON.parse(u));
        const check = () => setIsMobile(window.innerWidth < 980);
        check(); window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const close = (e) => {
            if (!e.target.closest('.lang-menu-wrap')) setLangMenuOpen(false);
            if (!e.target.closest('.login-menu-wrap')) setUserMenuOpen(false);
        };
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const r = await fetch(`http://localhost:8080/api/cars/${id}`);
                if (r.ok) {
                    const d = await r.json();
                    setCar(d);
                    if (d.agencyId) {
                        const ar = await fetch(`http://localhost:8080/api/cars/agency-details/${d.agencyId}`);
                        if (ar.ok) setAgency(await ar.json());
                    }
                }
                // Fetch reviews too
                fetchReviews();
            } catch (e) { console.error(e); } finally { setLoading(false); }
        })();
    }, [id]);

    /* Particle canvas */
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, animId, tt = 0, parts = [];
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; parts = Array.from({ length: 90 }, () => new Particle(W, H)); };
        const loop = () => {
            ctx.clearRect(0, 0, W, H); tt += .0025;
            const g1 = ctx.createRadialGradient(W * .22 + Math.sin(tt) * 70, H * .28 + Math.cos(tt * .7) * 45, 0, W * .3, H * .3, W * .52);
            g1.addColorStop(0, isDark ? 'rgba(99,102,241,.07)' : 'rgba(99,102,241,.05)');
            g1.addColorStop(1, 'transparent'); ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
            if (isDark) { parts.forEach(p => { p.update(); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill(); }); }
            ctx.globalAlpha = 1; animId = requestAnimationFrame(loop);
        };
        resize(); window.addEventListener('resize', resize); loop();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, [isDark]);

    /* Camera */
    const openCam = useCallback(async (type) => {
        setCamType(type); setIsCamOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: type === 'selfie' ? 'user' : 'environment' } });
            streamRef.current = stream;
            setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
        } catch { alert("Impossible d'accéder à la caméra"); closeCam(); }
    }, []);

    const closeCam = useCallback(() => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null; setIsCamOpen(false); setCamType(null);
    }, []);

    const takePhoto = useCallback(() => {
        const v = videoRef.current; if (!v) return;
        const c = photoCanvasRef.current;
        c.width = v.videoWidth; c.height = v.videoHeight;
        const ctx = c.getContext('2d');
        if (camType === 'selfie') { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
        ctx.drawImage(v, 0, 0);
        const dataUrl = c.toDataURL('image/jpeg', .9);
        setDocs(p => ({ ...p, [camType]: dataUrl }));
        if (camType !== 'selfie') verifyDoc(camType, dataUrl);
        closeCam();
    }, [camType, closeCam]);

    const triggerFile = (key) => { setActiveFile(key); setTimeout(() => fileRef.current?.click(), 0); };
    const handleFile = (e) => {
        const file = e.target.files?.[0]; if (!file || !activeFile) return;
        const reader = new FileReader();
        reader.onload = ev => {
            const res = ev.target.result;
            setDocs(p => ({ ...p, [activeFile]: res }));
            if (activeFile !== 'selfie') verifyDoc(activeFile, res);
        };
        reader.readAsDataURL(file); e.target.value = '';
    };
    const removeDoc = (key) => setDocs(p => ({ ...p, [key]: null }));

    const handleVerification = async () => {
        setIsVerifying(true);
        setVerificationError(null);

        // Si l'utilisateur n'a pas fourni les documents principaux,
        // on ignore l'appel IA et on passe directement à la fin (étape facultative)
        if (!docs.cin || !docs.permis) {
            setIsVerifying(false);
            changePhase(3);
            return;
        }

        try {
            const r = await fetch('http://localhost:8000/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...docs, cin_number: cinNumber, permis_number: permisNumber })
            });
            if (r.ok) {
                const data = await r.json();
                setAiResults(data);

                if (data.validation_document.global_identity_valid) {
                    changePhase(3);
                } else {
                    let errMsg = t.errGlobal;
                    if (data.document_content.cin.is_blurry || data.document_content.permis.is_blurry) {
                        errMsg = t.errBlur;
                    } else if (!data.validation_document.names_match) {
                        errMsg = t.errMismatch;
                    } else if (data.face_matching && !data.face_matching.cin_vs_selfie.match) {
                        errMsg = t.errFace;
                    }
                    setVerificationError(errMsg);
                }
            } else {
                setVerificationError(t.errAI);
            }
        } catch (e) {
            console.error("AI Service error:", e);
            setVerificationError(t.errConn);
        } finally {
            setIsVerifying(false);
        }
    };

    const docsReady = docs.cin && docs.permis;
    const allDone = docs.cin && docs.permis;
    const progress = phase === 3 ? 100 : Math.round((phase / 2) * 100 + (phase === 0 && docs.cin ? 15 : phase === 1 && docs.permis ? 15 : 0));
    const carImg = car?.photos?.[0] || '/static/car-placeholder.jpg';

    const specs = [
        { icon: <Fuel size={16} />, label: t.specFuel, val: car?.fuel === 'Essence' ? t.fuelGas : car?.fuel === 'Diesel' ? t.fuelDiesel : car?.fuel || '—' },
        { icon: <Users size={16} />, label: t.specSeats, val: car?.seats ?? '—' },
        { icon: <Gauge size={16} />, label: t.specStatus, val: car?.status === 'Disponible' ? t.statusAvailable : t.statusBooked },
        { icon: <Hash size={16} />, label: t.specPlate, val: car?.plate || '—' },
    ];

    return (
        <>
            <style>{css}</style>
            <div className="ba-base" />
            <div className="ba-mesh" />
            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
            <div className="ba-noise" />
            <div className="ba-blob blob1" /><div className="ba-blob blob2" />
            <div className="ba-blob blob3" /><div className="ba-blob blob4" />
            <canvas ref={photoCanvasRef} style={{ display: 'none' }} aria-hidden="true" />

            {/* NAV */}
            <div className="nav-wrapper" dir="ltr" onMouseLeave={() => setLangMenuOpen(false)}>
                <nav className="nav-glass">
                    <AnimatedLogo onClick={() => navigate('/homeConnect')} />

                    {/* Desktop links */}
                    {!isMobile && (
                        <ul style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
                            {[
                                { l: t.navProfile, action: () => navigate('/profile') },
                                { l: t.navRes, action: () => navigate('/homeConnect') },
                                { l: t.navFav, action: () => navigate('/favorites'), b: true },
                                {
                                    l: t.navAbout, action: () => {
                                        const eco = document.getElementById('ecosystem');
                                        if (eco) eco.scrollIntoView({ behavior: 'smooth' });
                                        else navigate('/homeConnect#ecosystem');
                                    }
                                },
                            ].map(({ l, action, b }) => (
                                <li key={l}>
                                    <span className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={action}>
                                        {l}
                                        {b && <span style={{ background: "var(--accent-gradient)", color: isDark ? "#000" : "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>Pro</span>}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Right controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12 }}>
                        {/* Language selector — desktop */}
                        {!isMobile && (
                            <div className="lang-menu-wrap" style={{ position: 'relative' }}>
                                <button
                                    className="icon-btn"
                                    style={{ position: 'relative', background: langMenuOpen ? 'var(--text)' : 'transparent', color: langMenuOpen ? 'var(--bg)' : 'var(--text)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                                    onClick={() => setLangMenuOpen(p => !p)}
                                    aria-label="Changer de langue"
                                >
                                    <svg
                                        style={{ transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: langMenuOpen ? 'rotate(-180deg) scale(1.15)' : 'rotate(0deg) scale(1)' }}
                                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
                                    </svg>
                                    <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--accent)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 6, lineHeight: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', pointerEvents: 'none' }}>{selectedLang}</span>
                                </button>
                                {langMenuOpen && (
                                    <div style={{ position: 'absolute', top: '50%', right: 'calc(100% + 12px)', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'row', background: isDark ? 'rgba(10,14,26,.97)' : 'rgba(255,255,255,.97)', borderRadius: 14, padding: 6, border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(16,185,129,.15)'}`, gap: 4, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,.4)' : '0 10px 25px rgba(0,0,0,0.1)', backdropFilter: 'blur(20px)', zIndex: 200 }}>
                                        {[{ code: 'AR', label: 'العربية' }, { code: 'FR', label: 'Français' }].map(lang => (
                                            <button key={lang.code} onClick={() => { setSelectedLang(lang.code); setLangMenuOpen(false); localStorage.setItem('appLang', lang.code); }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: selectedLang === lang.code ? 'var(--text)' : 'transparent', color: selectedLang === lang.code ? 'var(--bg)' : 'var(--muted)', border: 'none', borderRadius: 9, padding: '6px 12px', fontSize: 12, fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', transition: 'all .3s', fontFamily: "'Syne', sans-serif" }}>
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {!isMobile && <div style={{ width: 1, height: 24, background: 'var(--nav-border)', margin: '0 4px' }} />}

                        {/* User pill — desktop */}
                        {!isMobile && (
                            <div className="login-menu-wrap desktop-user-pill" style={{ position: 'relative' }}>
                                {currentUser ? (
                                    <div style={{ position: 'relative' }}>
                                        {/* Avatar pill — Format 5 Floating glow card */}
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: 13,
                                            padding: "13px 15px 13px 15px", borderRadius: 18,
                                            background: isDark ? "rgba(10,8,24,0.9)" : "rgba(255,255,255,0.95)",
                                            border: `2px solid ${isDark ? "rgba(150, 62, 231, 0.4)" : "rgba(114, 250, 2, 0.93)"}`,
                                            cursor: "pointer", position: "relative", overflow: "hidden",
                                            boxShadow: isDark
                                                ? "0 0 0 1px rgba(168,85,247,0.1), 0 8px 32px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.08)"
                                                : "0px 0px 5px rgba(100, 237, 58, 0.61)", // matching the image glow
                                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                            backdropFilter: "blur(20px)",
                                        }}

                                        >
                                            {/* Glow line top */}
                                            <div style={{
                                                position: "absolute", top: -1, left: "20%", right: "20%", height: 1,
                                                background: isDark
                                                    ? "linear-gradient(90deg, transparent, rgba(168,85,247,0.9), transparent)"
                                                    : "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
                                                pointerEvents: "none",
                                            }} />

                                            {/* Shine sweep */}
                                            <div style={{
                                                position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%",
                                                background: isDark
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
                                                    boxShadow: isDark
                                                        ? "0 0 20px rgba(168,85,247,0.6)"
                                                        : "0 0 16px rgba(124,58,237,0.4), 0 4px 12px rgba(0,0,0,0.1)",
                                                    overflow: "hidden",
                                                }}>
                                                    {profileImage ? (
                                                        <img src={profileImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                    ) : (
                                                        (currentUser.name || currentUser.email || 'U')[0].toUpperCase()
                                                    )}
                                                </div>
                                                {/* Point online */}
                                                <div style={{
                                                    position: "absolute", bottom: -2, right: -2,
                                                    width: 11, height: 11, borderRadius: "50%",
                                                    background: "#22c55e",
                                                    border: `2px solid ${isDark ? "#0a0818" : "#fff"}`,
                                                    boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                                                    animation: "onlineDot 2s infinite",
                                                }} />
                                            </div>

                                            {/* Texte */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                                <span style={{
                                                    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15,
                                                    ...(isDark ? {
                                                        background: "linear-gradient(90deg, #e6edf3, #c084fc)",
                                                        WebkitBackgroundClip: "text", backgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        display: "inline-block",
                                                    } : {
                                                        color: "var(--text)",
                                                    })
                                                }}>
                                                    {currentUser.name || currentUser.prenom || (currentUser.email ? currentUser.email.split("@")[0] : 'User')}
                                                </span>
                                                <span style={{
                                                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                                                    color: isDark ? "rgba(231, 231, 231, 0.8)" : "rgba(0, 0, 0, 0.7)",
                                                }}>
                                                    {currentUser.email || 'Client'}
                                                </span>
                                            </div>

                                            {/* Chevron */}
                                            <svg style={{
                                                marginLeft: 2, opacity: isDark ? 0.6 : 0.7,
                                                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                                                transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                                width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                stroke={isDark ? "#a855f7" : "#7c3aed"}
                                                strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>

                                        {/* Dropdown menu */}
                                        <div style={{
                                            position: "absolute", top: "calc(100% + 7px)", right: 0,
                                            width: 240, borderRadius: 20, overflow: "hidden",
                                            background: isDark ? "rgba(10,12,24,0.97)" : "rgba(255,255,255,0.97)",
                                            border: `1px solid ${isDark ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.15)"}`,
                                            boxShadow: isDark
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
                                            <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <div>
                                                        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--accent)", fontFamily: "'Syne',sans-serif" }}>{currentUser.name || currentUser.prenom || 'User'}</div>
                                                        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'DM Sans',sans-serif", position: "relative", top: 2 }}>{currentUser.email || 'Client'}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Log out Directly below email */}
                                            <div style={{ padding: "11px 18px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s ease" }}
                                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.paddingLeft = "22px"; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "18px"; }}
                                                onClick={() => {
                                                    localStorage.removeItem("user");
                                                    setCurrentUser(null);
                                                    setUserMenuOpen(false);
                                                    navigate("/login");
                                                }}>
                                                <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: "#ef4444", fontFamily: "'DM Sans',sans-serif" }}>Déconnexion</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="icon-btn" onClick={() => navigate('/login')} style={{ padding: '10px 22px', borderRadius: 14 }}>Connexion</button>
                                )}
                            </div>
                        )}

                        {/* Mobile hamburger */}
                        {isMobile && (
                            <button className="icon-btn mob-burger" onClick={() => setMobileMenuOpen(p => !p)} style={{ background: mobileMenuOpen ? 'var(--text)' : 'transparent', color: mobileMenuOpen ? 'var(--bg)' : 'var(--text)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    {mobileMenuOpen
                                        ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)
                                        : (<><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></>)
                                    }
                                </svg>
                            </button>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile menu panel */}
            {mobileMenuOpen && (
                <div className="mob-menu-panel">
                    <div className="mob-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
                    <div className="mob-menu-sheet" style={{ background: isDark ? 'rgba(10,14,26,.97)' : 'rgba(255,255,255,.97)', border: `1px solid ${isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)'}`, backdropFilter: 'blur(24px)', padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { label: '👤  Profil', path: '/profile' },
                            { label: t.navRes, path: '/homeConnect' },
                            { label: t.navFav, path: '/favorites' },
                            { label: t.navAbout, path: '/homeConnect#ecosystem' }
                        ].map(item => (
                            <button key={item.label} onClick={() => { navigate(item.path); setMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', borderRadius: 16, padding: '14px 20px', color: 'var(--text)', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
                                {item.label}
                            </button>
                        ))}
                        <div style={{ height: 1, background: 'var(--nav-border)', margin: '6px 0' }} />

                        {/* Theme toggle — mirrors HomeConnect mobile menu */}
                        <button onClick={() => setIsDark(d => !d)} style={{ textAlign: 'left', background: 'none', border: 'none', borderRadius: 16, padding: '14px 20px', color: 'var(--text)', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
                            {isDark ? t.modeLight : t.modeDark}
                        </button>

                        <div style={{ display: 'flex', gap: 10, padding: '10px' }}>
                            {[{ code: 'AR', label: 'العربية' }, { code: 'FR', label: 'FR' }].map(lang => (
                                <button key={lang.code} onClick={() => { setSelectedLang(lang.code); localStorage.setItem('appLang', lang.code); }} style={{ flex: 1, background: selectedLang === lang.code ? 'var(--text)' : 'var(--card-border)', color: selectedLang === lang.code ? 'var(--bg)' : 'var(--muted)', border: 'none', borderRadius: 12, padding: '10px 0', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                        {currentUser && (
                            <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }} style={{ textAlign: 'left', background: 'none', border: 'none', borderRadius: 16, padding: '14px 20px', color: '#ff4d4d', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: "'Syne', sans-serif" }}>
                                {t.logout}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <main className="ba-page" dir={selectedLang === 'AR' ? 'rtl' : 'ltr'}>
                <h1 className="ba-hero-title">
                    {t.title} <span className="grad-text">{t.res}</span>
                </h1>
                <p className="ba-hero-sub">{t.sub}</p>

                <div className="ba-grid">
                    {/* ── LEFT COLUMN ── */}
                    <div className="ba-left">

                        {/* VEHICLE CARD */}
                        <article className="card card-anim" style={{ animationDelay: '.05s' }} {...cardGlowHandlers()}>
                            <div className="sec-label"><Car size={14} /> {t.carDet}</div>
                            {loading ? (
                                <div style={{ height: 160, background: 'var(--card-border)', borderRadius: 20, animation: 'gradMove 1.5s ease infinite', backgroundSize: '200% 100%' }} />
                            ) : (
                                <>
                                    <div className="car-hero">
                                        <div className="car-img-wrap">
                                            <img className="car-img" src={carImg} alt={car?.name} />
                                            <div className="car-img-overlay" />
                                            <div className="car-img-badge">{car?.category || 'Premium'}</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h2 className="car-name">{car?.name || '—'}</h2>
                                            <div className="car-price">
                                                <span className="price-val grad-text">{car?.price ?? '—'}</span>
                                                <span className="price-unit">{t.madDay}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="specs-grid">
                                        {specs.map((s, i) => (
                                            <div className="spec-tile" key={i} style={{ animationDelay: `${.1 + i * .05}s` }}>
                                                <div className="spec-icon">{s.icon}</div>
                                                <div className="spec-lbl">{s.label}</div>
                                                <div className="spec-val">{s.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </article>

                        {/* AGENCY CARD */}
                        <article className="card card-anim" style={{ animationDelay: '.1s', padding: '30px' }} {...cardGlowHandlers()}>
                            <div className="sec-label"><Building2 size={14} /> {t.agency}</div>

                            <div className="agency-info-stack">


                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <div style={{ position: 'relative' }}>
                                            {agency?.logo ? (
                                                <img className="agency-logo-img" src={agency.logo} alt={agency.agencyName} style={{ border: 'none' }} />
                                            ) : (
                                                <div className="agency-av">{(agency?.agencyName || 'A')[0].toUpperCase()}</div>
                                            )}
                                            <div style={{ position: 'absolute', bottom: -6, right: -6, background: 'var(--success)', width: 18, height: 18, borderRadius: '50%', border: '3px solid var(--bg)', boxShadow: '0 0 10px var(--success-glow)' }}></div>
                                        </div>
                                        <div>
                                            <div className="agency-name" style={{ fontSize: 20 }}>{agency?.agencyName || 'Agence partenaire'}</div>
                                            <div className="stars" style={{ marginTop: 4 }}>
                                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill={s <= 4 ? '#f59e0b' : 'none'} stroke={s <= 4 ? '#f59e0b' : 'currentColor'} />)}
                                                <span style={{ fontSize: 13, opacity: 0.8, marginLeft: 4 }}>4.8 • (124 {t.avis})</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="contact-actions">
                                        {agency?.phone && (
                                            <div
                                                className={`contact-btn phone ${showPhone ? 'showing-phone' : ''}`}
                                                onClick={() => {
                                                    if (!showPhone) {
                                                        setShowPhone(true);
                                                    }
                                                }}
                                            >
                                                <div className="btn-content-flex">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                                    <span>{t.call}</span>
                                                </div>
                                                <div className="phone-val-slide" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                                    <span>{agency.phone}</span>
                                                </div>
                                            </div>
                                        )}
                                        <a href={`https://wa.me/${agency?.phone?.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="contact-btn whatsapp" style={{ textDecoration: 'none' }}>
                                            <img src={whatsappIcon} alt="WhatsApp" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                </div>

                                {(agency?.address || agency?.city) && (
                                    <div className="agency-address" style={{ marginTop: 15, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)', border: '1px solid rgba(16,185,129,0.1)' }}>
                                            <MapPin size={18} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '250px' }}>
                                            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontFamily: "'Syne', sans-serif" }}>{t.loc}</span>
                                            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", lineHeight: '1.4' }}>
                                                {agency?.address}{agency?.city ? `, ${agency.city}` : ''}{agency?.country ? `, ${agency.country}` : ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>

                        {/* IDENTITY VERIFICATION */}
                        <article className="card verify-wrap" style={{ animationDelay: '.15s' }}>
                            <div className="sec-label"><Shield size={14} /> {t.verify}</div>

                            {phase === 3 ? (
                                /* ── SUCCESS ── */
                                <div className="success-wrap">
                                    <Confetti />
                                    <div className="s-ring">
                                        <div className="s-icon"><CheckCircle2 size={48} color="#fff" /></div>
                                    </div>
                                    <h2 className="s-title">
                                        <Sparkles size={28} style={{ verticalAlign: 'middle', marginRight: 8, color: 'var(--accent)' }} />
                                        {t.verifComp}
                                    </h2>
                                    <p className="s-sub">{t.successSub}</p>
                                    <div className="s-thumbs">
                                        {/* AI Results badge */}
                                        {aiResults && (
                                            <div style={{ width: '100%', marginBottom: 15, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                <div style={{ padding: '12px 15px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <Shield size={16} />
                                                    <span style={{ fontWeight: 800 }}>{t.aiValidated}</span>
                                                </div>
                                                <div style={{ padding: '12px 15px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', textAlign: 'left' }}>
                                                    <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{t.nameExtracted}</div>
                                                    <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne' }}>{aiResults.document_content.cin.name_extracted || t.verified}</div>
                                                </div>
                                            </div>
                                        )}
                                        {[{ key: 'cin', label: 'CIN' }, { key: 'permis', label: 'Permis' }, { key: 'selfie', label: 'Selfie' }].map(({ key, label }) =>
                                            docs[key] && (
                                                <div className="s-thumb" key={key}>
                                                    <img src={docs[key]} alt={label} />
                                                    <div>{label}</div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <button type="button" className="btn-primary lg" style={{ margin: '0 auto' }} onClick={() => navigate(`/car/${id}`, {
                                        state: {
                                            car: car,
                                            reservationDays: location.state?.reservationDays || 1,
                                            startDate: location.state?.startDate,
                                            endDate: location.state?.endDate,
                                            cinNumber: cinNumber,
                                            permisNumber: permisNumber,
                                            clientName: aiResults?.document_content?.cin?.name_extracted || "Client"
                                        }
                                    })}>
                                        {t.finishRes} {selectedLang === 'AR' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                                    </button>
                                </div>
                            ) : phase === 0 ? (
                                /* — STEP 1: CIN — */
                                <div key="step-cin">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                                        <div className="progress-orbs">
                                            <div className={`orb ${docs.cin ? 'done' : ''}`} style={{ background: !docs.cin ? 'var(--accent)' : undefined }} />
                                            <div className="orb" /><div className="orb" />
                                        </div>
                                        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{t.step1}</span>
                                    </div>
                                    <DocSlot
                                        icon={<CreditCard size={22} />}
                                        title={t.cinTitle}
                                        sub={t.cinSub}
                                        dropLabel={t.dropHere}
                                        labelPending={t.pending}
                                        labelValidated={t.validated}
                                        docKey="cin"
                                        doc={docs.cin}
                                        status={docStatuses.cin}
                                        onUpload={() => triggerFile('cin')}
                                        onCamera={() => openCam('cin')}
                                        onRemove={() => removeDoc('cin')}
                                    />
                                    {docStatuses.cin === 'valid' && (
                                        <div style={{ marginTop: 20, animation: 'fadeUp 0.3s ease' }}>
                                            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                                                {selectedLang === 'AR' ? 'رقم البطاقة الوطنية *' : selectedLang === 'EN' ? 'National ID Number *' : 'Numéro de CIN *'}
                                            </label>
                                            <input
                                                type="text"
                                                className="modern-doc-input"
                                                value={cinNumber}
                                                onChange={e => setCinNumber(e.target.value)}
                                                placeholder={selectedLang === 'AR' ? 'أدخل رقم البطاقة الوطنية' : selectedLang === 'EN' ? 'Enter your ID number' : 'Entrez votre numéro de CIN'}
                                            />
                                        </div>
                                    )}
                                    <div className="selfie-tips" style={{ marginTop: 24 }}>
                                        {[t.tip_cin1, t.tip_cin2].map((tip, i) => (
                                            <div className="tip-row" key={i}><AlertCircle size={15} />{tip}</div>
                                        ))}
                                    </div>
                                    <div className="cta-row">
                                        <span className="cta-hint">{docs.cin ? t.docLoaded : t.optional}</span>
                                        <button type="button" className="btn-primary" onClick={() => changePhase(1)} disabled={(docs.cin && docStatuses.cin !== 'valid') || (docStatuses.cin === 'valid' && !cinNumber.trim())}>
                                            {t.continueBtn} {selectedLang === 'AR' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                        </button>
                                    </div>
                                </div>
                            ) : phase === 1 ? (
                                /* — STEP 2: PERMIS — */
                                <div key="step-permis">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                                        <div className="progress-orbs">
                                            <div className="orb done" />
                                            <div className={`orb ${docs.permis ? 'done' : ''}`} style={{ background: !docs.permis ? 'var(--accent)' : undefined }} />
                                            <div className="orb" />
                                        </div>
                                        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{t.step2}</span>
                                    </div>
                                    <DocSlot
                                        icon={<FileText size={22} />}
                                        title={t.permisTitle}
                                        sub={t.permisSub}
                                        dropLabel={t.dropHere}
                                        labelPending={t.pending}
                                        labelValidated={t.validated}
                                        docKey="permis"
                                        doc={docs.permis}
                                        status={docStatuses.permis}
                                        onUpload={() => triggerFile('permis')}
                                        onCamera={() => openCam('permis')}
                                        onRemove={() => removeDoc('permis')}
                                    />
                                    {docStatuses.permis === 'valid' && (
                                        <div style={{ marginTop: 20, animation: 'fadeUp 0.3s ease' }}>
                                            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                                                {selectedLang === 'AR' ? 'رقم رخصة القيادة *' : selectedLang === 'EN' ? 'Driver License Number *' : 'Numéro de Permis *'}
                                            </label>
                                            <input
                                                type="text"
                                                className="modern-doc-input"
                                                value={permisNumber}
                                                onChange={e => setPermisNumber(e.target.value)}
                                                placeholder={selectedLang === 'AR' ? 'أدخل رقم رخصة القيادة' : selectedLang === 'EN' ? 'Enter your license number' : 'Entrez votre numéro de permis'}
                                            />
                                        </div>
                                    )}
                                    <div className="selfie-tips" style={{ marginTop: 24 }}>
                                        {[t.tip_permis1, t.tip_permis2].map((tip, i) => (
                                            <div className="tip-row" key={i}><AlertCircle size={15} />{tip}</div>
                                        ))}
                                    </div>
                                    {verificationError && (
                                        <div style={{
                                            padding: '14px 18px',
                                            borderRadius: 16,
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            color: '#ef4444',
                                            fontSize: 13,
                                            fontWeight: 700,
                                            marginTop: 20,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            animation: 'fadeUp 0.3s ease'
                                        }}>
                                            <AlertCircle size={18} />
                                            {verificationError}
                                        </div>
                                    )}

                                    <div className="cta-row">
                                        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', font: '600 13px/1 DM Sans,sans-serif', display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => changePhase(0)}>
                                            {t.back}
                                        </button>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span className="cta-hint">{docs.permis ? t.docLoaded : t.optional}</span>
                                            <button type="button" className="btn-primary" onClick={handleVerification} disabled={isVerifying || (docs.permis && docStatuses.permis !== 'valid') || (docStatuses.permis === 'valid' && !permisNumber.trim())}>
                                                {isVerifying ? t.analyzing : t.confirm} <Zap size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </article>
                    </div>

                    {/* ── SIDEBAR ── */}
                    <aside className="sidebar">
                        <div className="side-card">
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img className="side-img" src={carImg} alt="" />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)' }} />
                                <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                                    <span className="side-price grad-text">{car?.price ?? '—'}</span>
                                    <span className="side-unit" style={{ color: 'rgba(255,255,255,.7)' }}>{t.madDay}</span>
                                </div>
                            </div>
                            <div className="side-body">
                                <div className="side-name">{car?.name || '—'}</div>
                                <div className="divider" />
                                {[
                                    { label: t.sideAgency, val: agency?.agencyName },
                                    { label: t.sideVille, val: agency?.city || car?.city },
                                    { label: t.sideCat, val: car?.category === 'Premium' ? 'Premium' : car?.category },
                                    { label: t.sideFuel, val: car?.fuel === 'Essence' ? t.fuelGas : car?.fuel === 'Diesel' ? t.fuelDiesel : car?.fuel || '—' },
                                ].map(({ label, val }) => (
                                    <div className="info-row" key={label}>
                                        <span className="lbl">{label}</span>
                                        <span className="val">{val || '—'}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="prog-wrap">
                                <div className="prog-lbl">
                                    <span>{t.progress}</span>
                                    <strong>{progress}%</strong>
                                </div>
                                <div className="prog-track">
                                    <div className="prog-fill" style={{ width: `${progress}%` }} />
                                </div>
                                <div className="checks">
                                    {[
                                        { label: t.sideCin, done: !!docs.cin },
                                        { label: t.sidePermis, done: !!docs.permis },
                                        /* { label: t.sideSelfie, done: !!docs.selfie }, */
                                    ].map(({ label, done }, i) => {
                                        const active = phase === i;
                                        return (
                                            <div className={`chk ${done ? 'done' : active ? 'partial' : ''}`} key={i}>
                                                <span className="dot" />
                                                {label}
                                                {done && <CheckCircle2 size={14} color="var(--success)" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="secure-badge">
                            <Shield size={18} />
                            <span>{t.badge}</span>
                        </div>
                    </aside>
                </div>

                {/* REVIEW CARD - FULL WIDTH */}
                <article className="card card-anim" style={{ animationDelay: '.3s', padding: '28px 32px', marginTop: '24px', width: '100%' }} {...cardGlowHandlers()}>
                    <div className="sec-label"><Star size={14} /> {selectedLang === 'AR' ? "اكتب تقييما" : selectedLang === 'EN' ? "Write a review" : "Laissez un avis"}</div>

                    {isReviewSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeUp 0.4s ease' }}>
                            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--success)' }}>
                                <CheckCircle2 size={30} />
                            </div>
                            <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
                                {selectedLang === 'AR' ? "تم إرسال التقييم بنجاح!" : selectedLang === 'EN' ? "Review sent successfully!" : "Avis publié avec succès !"}
                            </h4>
                            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{selectedLang === 'AR' ? "شكرا على ملاحظاتك." : selectedLang === 'EN' ? "Thank you for your feedback." : "Merci pour votre retour."}</p>
                        </div>

                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '10px', marginTop: '8px', marginBottom: '5px' }}>
                                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--muted)' }}>
                                    {selectedLang === 'AR' ? "كيف كانت تجربتك؟" : selectedLang === 'EN' ? "How was your experience?" : "Évaluez votre expérience"}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={32}
                                            fill={(hoverRating || rating) >= star ? '#f59e0b' : 'transparent'}
                                            stroke={(hoverRating || rating) >= star ? '#f59e0b' : 'var(--muted)'}
                                            style={{ cursor: 'pointer', transition: 'all 0.2s', transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)' }}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <textarea
                                className="modern-doc-input"
                                placeholder={selectedLang === 'AR' ? "شارك تجربتك بخصوص السيارة أو الوكالة..." : selectedLang === 'EN' ? "Share your thoughts about the agency or vehicle..." : "Partagez votre avis sur l'agence ou le véhicule..."}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                style={{ minHeight: '80px', resize: 'vertical', fontSize: '14px' }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    disabled={rating === 0 || !reviewText.trim()}
                                    onClick={async () => {
                                        const newRev = {
                                            userName: currentUser?.name || currentUser?.prenom || (currentUser?.email ? currentUser.email.split('@')[0] : 'Client'),
                                            date: new Date().toLocaleDateString('fr-FR'),
                                            rating: rating,
                                            comment: reviewText,
                                            carId: id
                                        };
                                        try {
                                            const r = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/api/reviews`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(newRev)
                                            });
                                            if (r.ok) {
                                                setIsReviewSubmitted(true);
                                                fetchReviews(); // Refresh list
                                            }
                                        } catch (e) { console.error("Error saving review:", e); }
                                    }}
                                    style={{ padding: '12px 28px', fontSize: '15px' }}
                                >
                                    {selectedLang === 'AR' ? "إرسال التقييم" : selectedLang === 'EN' ? "Submit review" : "Soumettre l'avis"} <MessageSquare size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </article>

                <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', paddingBottom: '40px' }}>
                    {reviews.map((rev, idx) => (
                        <div key={rev.id} className="card card-anim" style={{ animationDelay: `${0.3 + idx * 0.1}s`, padding: '30px', border: '1px solid var(--card-border)', background: 'var(--card)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--accent-grad)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontFamily: 'Syne', fontSize: 18 }}>
                                        {rev.userName ? rev.userName[0].toUpperCase() : 'C'}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne' }}>{rev.userName}</div>
                                        <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                                            <Calendar size={13} strokeWidth={2.5} /> {rev.date}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,158,11,0.08)', padding: '6px 10px', borderRadius: '10px' }}>
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star key={s} size={15} fill={s <= rev.rating ? '#f59e0b' : 'transparent'} stroke={s <= rev.rating ? '#f59e0b' : 'var(--muted)'} strokeWidth={2.5} />
                                    ))}
                                </div>
                            </div>
                            <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7, opacity: 0.85, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                {rev.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            {/* CAMERA OVERLAY */}
            {isCamOpen && (
                <div className="cam-overlay" role="dialog" aria-modal="true">
                    <div className={`cam-frame${camType === 'selfie' ? ' mirror' : ''}`}>
                        <button type="button" className="cam-close" onClick={closeCam}><X size={20} /></button>
                        <video ref={videoRef} autoPlay playsInline muted />
                    </div>
                    <button type="button" className="capture-btn" onClick={takePhoto} aria-label="Capturer">
                        <div className="capture-inner" />
                    </button>
                    <p className="cam-hint">{camType === 'selfie' ? t.camHintSelfie : t.camHintDoc}</p>
                </div>
            )}

            <input type="file" ref={fileRef} style={{ display: 'none' }} accept="image/*" onChange={handleFile} />
        </>
    );
}