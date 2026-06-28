import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Lock, ShieldCheck,
  Calendar, User, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import masterCardLogo from '../../asset/MasterCard_Logo.svg.png';
import cmiLogo from '../../asset/59199a7cabe38c31af9176268cbd3eef-removebg-preview.png';

/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM PAYMENT — ELITE GREEN THEME
   ═══════════════════════════════════════════════════════════════════════════ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

:root {
  --g-accent:   #10b981;
  --g-accent2:  #059669;
  --g-glow:     rgba(16,185,129,0.22);
  --g-glow2:    rgba(16,185,129,0.08);
  --g-grad:     linear-gradient(135deg, #059669 0%, #10b981 55%, #34d399 100%);
  --g-bg:       #f0fdf8;
  --g-surface:  #ffffff;
  --g-text:     #0f172a;
  --g-muted:    #64748b;
  --g-border:   #e2e8f0;
  --g-card-shadow: 0 8px 40px rgba(0,0,0,0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

/* ── PAGE SHELL ── */
.pp-root {
  min-height: 100vh;
  background: var(--g-bg);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Ambient blobs */
.pp-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  animation: blobFloat 18s ease-in-out infinite alternate;
}
.pp-blob-a {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
  top: -200px; left: -150px;
}
.pp-blob-b {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%);
  bottom: -150px; right: -100px;
  animation-delay: -9s;
}
@keyframes blobFloat {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(50px,30px) scale(1.12); }
}

/* ── TOPBAR ── */
.pp-topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 68px;
  background: rgba(240,253,248,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(16,185,129,0.12);
}

.pp-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 50px;
  border: 1.5px solid var(--g-border);
  background: white;
  color: var(--g-text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.pp-back:hover {
  border-color: var(--g-accent);
  color: var(--g-accent);
  box-shadow: 0 4px 16px var(--g-glow);
  transform: translateX(-2px);
}

.pp-secure {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  color: var(--g-accent2);
  background: var(--g-glow2);
  border: 1px solid rgba(16,185,129,0.18);
  padding: 8px 16px;
  border-radius: 50px;
}

.pp-steps {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--g-muted);
}
.pp-step-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--g-border);
}
.pp-step-dot.active {
  background: var(--g-accent);
  box-shadow: 0 0 0 3px var(--g-glow);
}

/* ── BODY ── */
.pp-body {
  max-width: 1160px;
  margin: 0 auto;
  padding: 100px 24px 60px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 32px;
  position: relative;
  z-index: 10;
  align-items: start;
}

@media (max-width: 940px) {
  .pp-body { grid-template-columns: 1fr; }
}

/* ── LEFT COLUMN ── */
.pp-left-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: var(--g-text);
  letter-spacing: -0.8px;
  margin-bottom: 4px;
  position: relative;
  top: 49px;
}
.pp-left-sub {
  font-size: 14px;
  color: var(--g-muted);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  top: 55px;
}

/* ── 3D CREDIT CARD ── */
.pp-card-scene {
  perspective: 1100px;
  width: 100%;
  max-width: 400px;
  height: 228px;
  margin: 0 auto 28px;
}

.pp-card-3d {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.72s cubic-bezier(0.4, 0, 0.2, 1);
}
.pp-card-3d.show-back { transform: rotateY(180deg); }

.pp-card-face {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}

/* FRONT */
.pp-card-front {
  background: linear-gradient(135deg, #064e3b 0%, #065f46 30%, #059669 65%, #10b981 100%);
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow:
    0 30px 70px rgba(6,78,59,0.45),
    0 0 0 1px rgba(255,255,255,0.07) inset;
}
.pp-card-front::before {
  content: '';
  position: absolute;
  width: 380px; height: 380px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  top: -140px; right: -100px;
}
.pp-card-front::after {
  content: '';
  position: absolute;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
  bottom: -80px; left: -60px;
}

.pp-chip-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.pp-chip {
  width: 46px; height: 34px;
  border-radius: 7px;
  background: linear-gradient(135deg, #b8860b, #ffd700, #b8860b);
  position: relative;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2) inset;
}
.pp-chip::before {
  content: '';
  position: absolute;
  width: 28px; height: 20px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 3px;
  top: 6px; left: 8px;
}
.pp-chip::after {
  content: '';
  position: absolute;
  width: 14px; height: 1px;
  background: rgba(0,0,0,0.12);
  top: 17px; left: 15px;
}

.pp-card-num {
  font-family: 'Space Grotesk', monospace;
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 3.5px;
  color: rgba(255,255,255,0.95);
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.pp-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 2;
}
.pp-card-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
  margin-bottom: 3px;
}
.pp-card-value {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Space Grotesk', sans-serif;
}

.pp-card-brand {
  display: flex;
  align-items: center;
}

/* BACK */
.pp-card-back {
  background: linear-gradient(135deg, #022c22, #064e3b);
  transform: rotateY(180deg);
  box-shadow: 0 30px 70px rgba(0,0,0,0.5);
}
.pp-card-stripe {
  height: 50px;
  background: #111;
  margin-top: 38px;
}
.pp-cvv-zone {
  padding: 16px 28px;
}
.pp-cvv-lbl {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 6px;
}
.pp-cvv-band {
  background: rgba(255,255,255,0.88);
  border-radius: 6px;
  padding: 9px 14px;
  text-align: right;
  font-family: 'Space Grotesk', monospace;
  font-size: 18px;
  letter-spacing: 6px;
  color: #064e3b;
  font-weight: 700;
}

/* ── FORM CARD ── */
.pp-form-card {
  background: white;
  border-radius: 24px;
  border: 1px solid var(--g-border);
  padding: 36px;
  box-shadow: var(--g-card-shadow);
  animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  overflow: hidden;
      bottom: 181px;
}

.pp-form-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--g-grad);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Method tabs */
.pp-method-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-bottom: 28px;
  padding: 5px;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
}

.pp-method-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 13px 8px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.22s ease;
  color: var(--g-muted);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.pp-method-tab.active {
  background: white;
  color: var(--g-accent);
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}
.pp-method-tab.active svg { color: var(--g-accent); transform: scale(1.1); }

/* Floating-label field */
.pp-field {
  position: relative;
  margin-bottom: 20px;
}

.pp-field-wrap {
  position: relative;
}

.pp-input {
  width: 100%;
  height: 58px;
  padding: 22px 16px 8px 48px;
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  color: var(--g-text);
  background: #fafafa;
  outline: none;
  transition: all 0.25s ease;
  -webkit-appearance: none;
}
.pp-input::placeholder { color: transparent; }
.pp-input:focus {
  border-color: var(--g-accent);
  box-shadow: 0 0 0 4px var(--g-glow);
  background: white;
}
.pp-input:focus ~ .pp-field-lbl,
.pp-input:not(:placeholder-shown) ~ .pp-field-lbl,
.pp-input.filled ~ .pp-field-lbl {
  top: 9px;
  font-size: 10px;
  font-weight: 800;
  color: var(--g-accent);
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.pp-field-lbl {
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 500;
  color: #94a3b8;
  pointer-events: none;
  transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  transform-origin: left;
  white-space: nowrap;
}

.pp-field-ico {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e1;
  transition: color 0.22s ease;
  pointer-events: none;
  z-index: 1;
}
.pp-field-wrap:focus-within .pp-field-ico { color: var(--g-accent); }

.pp-field-suffix {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Focus underline */
.pp-focus-bar {
  position: absolute;
  bottom: 1px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: var(--g-grad);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
}
.pp-field-wrap:focus-within .pp-focus-bar { transform: scaleX(1); }

.pp-row2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

/* Pay Button */
.pp-pay-btn {
  width: 100%;
  height: 58px;
  border-radius: 16px;
  border: none;
  background: var(--g-grad);
  color: white;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 8px 24px var(--g-glow);
}
.pp-pay-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.pp-pay-btn:hover::before { opacity: 1; }
.pp-pay-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 40px var(--g-glow);
}
.pp-pay-btn:active { transform: translateY(0) scale(0.98); }
.pp-pay-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

/* Spinner */
.pp-spinner {
  width: 22px; height: 22px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ppSpin 0.8s linear infinite;
}
@keyframes ppSpin { to { transform: rotate(360deg); } }

/* Trust bar */
.pp-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 14px 20px;
  background: #f0fdf8;
  border-radius: 12px;
  border: 1px solid rgba(16,185,129,0.12);
  flex-wrap: wrap;
}
.pp-trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--g-accent2);
  letter-spacing: 0.2px;
}

/* Alt payment placeholder */
.pp-alt {
  padding: 32px 20px;
  text-align: center;
  background: #f8fafc;
  border-radius: 14px;
  border: 1.5px dashed #e2e8f0;
  font-size: 14px;
  color: var(--g-muted);
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* ── RIGHT SIDEBAR ── */
.pp-sidebar {
  position: sticky;
  top: 88px;
  animation: slideUp 0.5s 0.08s cubic-bezier(0.16,1,0.3,1) both;
}

.pp-order-card {
  background: white;
  border-radius: 24px;
  border: 1px solid var(--g-border);
  overflow: hidden;
  box-shadow: var(--g-card-shadow);
  position: relative;
  top: 54px;
}

/* Hero image */
.pp-hero {
  position: relative;
  height: 210px;
  overflow: hidden;
}
.pp-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 8s ease;
}
.pp-order-card:hover .pp-hero img { transform: scale(1.06); }
.pp-hero-overlay {
  position: absolute;
  inset: 0;
}
.pp-hero-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 20px 22px;
}
.pp-hero-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}
.pp-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(16,185,129,0.25);
  border: 1px solid rgba(16,185,129,0.4);
  backdrop-filter: blur(6px);
  color: #a7f3d0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Summary body */
.pp-summary {
  padding: 24px;
}

/* Date cells */
.pp-dates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 18px;
}
.pp-date-cell {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
}
.pp-date-lbl {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #94a3b8;
  margin-bottom: 3px;
}
.pp-date-val {
  font-size: 13px;
  font-weight: 700;
  color: var(--g-text);
}

/* Duration pill */
.pp-dur {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.06));
  border: 1px solid rgba(16,185,129,0.14);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--g-accent2);
  margin-bottom: 20px;
}

/* Lines */
.pp-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 9px 0;
  border-bottom: 1px solid #f8fafc;
}
.pp-line:last-of-type { border-bottom: none; }
.pp-line-lbl { color: var(--g-muted); font-weight: 500; }
.pp-line-val { font-weight: 700; color: var(--g-text); }
.pp-line-val.green { color: var(--g-accent); }

/* Total row */
.pp-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 2px dashed #e2e8f0;
}
.pp-total-lbl {
  font-size: 15px;
  font-weight: 800;
  color: var(--g-text);
}
.pp-total-amount {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: var(--g-accent);
  letter-spacing: -0.5px;
}

/* Client row */
.pp-client-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 12px 14px;
  background: #f0fdf8;
  border: 1px solid rgba(16,185,129,0.12);
  border-radius: 12px;
  font-size: 13px;
  color: var(--g-muted);
}
.pp-client-row strong { color: var(--g-text); }

/* ── SUCCESS OVERLAY ── */
.pp-success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6,78,59,0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.4s ease;
}
.pp-success-card {
  background: white;
  border-radius: 30px;
  padding: 56px 48px;
  max-width: 440px;
  width: 92%;
  text-align: center;
  box-shadow: 0 50px 100px rgba(0,0,0,0.25);
  animation: popIn 0.6s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  overflow: hidden;
}
.pp-success-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--g-grad);
}
@keyframes popIn {
  from { opacity: 0; transform: scale(0.82) translateY(30px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.pp-success-icon {
  width: 88px; height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
  color: #059669;
  animation: iconIn 0.5s 0.3s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes iconIn {
  from { transform: scale(0) rotate(-90deg); }
  to   { transform: scale(1) rotate(0deg); }
}
.pp-success-h { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 800; color: var(--g-text); margin-bottom: 8px; }
.pp-success-amt { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 900; color: var(--g-accent); margin-bottom: 10px; }
.pp-success-p { font-size: 15px; color: var(--g-muted); line-height: 1.7; margin-bottom: 32px; }
.pp-success-btn {
  width: 100%;
  height: 54px;
  border-radius: 14px;
  border: none;
  background: var(--g-grad);
  color: white;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px var(--g-glow);
}
.pp-success-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px var(--g-glow); }
`;

/* ─────────────────── Helpers ─────────────────── */
const padGroups = (raw) => {
  const d = raw.replace(/\D/g, '').substring(0, 16);
  const parts = d.match(/.{1,4}/g) || [];
  while (parts.length < 4) parts.push('');
  return parts.map(p => p.padEnd(4, '•')).join('  ');
};

/* ─────────────────── CARD FRONT ─────────────────── */


/* ─────────────────── CARD BACK ─────────────────── */
function CardBack({ cvv }) {
  return (
    <div className="pp-card-face pp-card-back">
      <div className="pp-card-stripe" />
      <div className="pp-cvv-zone">
        <div className="pp-cvv-lbl">CVV / CVC</div>
        <div className="pp-cvv-band">{cvv ? '•'.repeat(cvv.length) : '•••'}</div>
      </div>
      <div style={{ padding: '10px 28px' }}>
        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, lineHeight: 1.6 }}>
          This card is issued by UppCar Financial Services. Unauthorized use is prohibited.
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const carData = location.state?.car || { name: 'Premium Vehicle', price: 750 };
  const days = location.state?.reservationDays || 1;
  const startDate = location.state?.startDate || '';
  const endDate = location.state?.endDate || '';
  const cinNumber = location.state?.cinNumber || 'N/A';
  const permisNumber = location.state?.permisNumber || 'N/A';
  const clientFullName = location.state?.clientName || 'Client';
  const total = carData.price * days;
  const serviceFee = +(total * 0.05).toFixed(0);
  const grandTotal = total + serviceFee;

  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('visa');
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('appTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');
    return () => document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const n = cardNum.replace(/\s/g, '');
    setCardType(n.startsWith('5') ? 'mastercard' : 'visa');
  }, [cardNum]);

  const fmtNum = (v) => {
    const d = v.replace(/\D/g, '').substring(0, 16);
    setCardNum((d.match(/.{1,4}/g) || []).join(' '));
  };
  const fmtExp = (v) => {
    const d = v.replace(/\D/g, '').substring(0, 4);
    setExpiry(d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const body = {
        carId: id,
        clientId: user.id || null,
        agencyId: carData.agencyId || carData.agency?.id ||
          (carData.agency && typeof carData.agency === 'object' ? carData.agency.id : carData.agency) || null,
        clientFirstName: user.firstName || clientFullName.split(' ')[0] || clientFullName,
        clientLastName: user.lastName || clientFullName.split(' ').slice(1).join(' ') || '',
        cin: cinNumber,
        licenseNumber: permisNumber,
        startDate, endDate,
        totalPrice: grandTotal,
        status: 'CONFIRMED'
      };
      const res = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res.ok) setIsSuccess(true);
        else alert("Erreur lors de l'enregistrement de la réservation.");
      }, 1800);
    } catch {
      setIsLoading(false);
      alert('Erreur technique lors de la réservation.');
    }
  };

  return (
    <div className="pp-root">
      <style>{styles}</style>
      <div className="pp-blob pp-blob-a" />
      <div className="pp-blob pp-blob-b" />

      {/* ── TOPBAR ── */}
      <div className="pp-topbar">
        <button className="pp-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Retour
        </button>

        {!isMobile && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className={`pp-step-dot${i === 3 ? ' active' : ''}`} />
              ))}
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--g-muted)', marginLeft: 4 }}>Paiement</span>
            </div>

            <div className="pp-secure">
              <ShieldCheck size={14} />
              SSL 256-bit · Sécurisé
            </div>
          </>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="pp-body">

        {/* LEFT : FORM */}
        <div>
          <div className="pp-left-title">Finaliser la réservation</div>
          <div className="pp-left-sub">
            <Lock size={13} style={{ color: 'var(--g-accent)' }} />
            Paiement chiffré et 100% sécurisé
          </div>

          {/* 3D Card preview */}
          <div className="pp-card-scene">
            <div className={`pp-card-3d${flipped ? ' show-back' : ''}`}>
              <CardBack cvv={cvv} />
            </div>
          </div>

          {/* Form */}
          <div className="pp-form-card">

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--g-accent)' }}>
                <CreditCard size={20} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--g-text)' }}>Carte bancaire</div>
                <div style={{ fontSize: 12, color: 'var(--g-muted)' }}>Paiement sécurisé par carte</div>
              </div>
            </div>

            <>
              {/* Cardholder */}
              <div className="pp-field">
                <div className="pp-field-wrap">
                  <span className="pp-field-ico"><User size={18} /></span>
                  <input
                    className={`pp-input${cardName ? ' filled' : ''}`}
                    placeholder=" "
                    value={cardName}
                    onChange={e => setCardName(e.target.value.toUpperCase())}
                    autoComplete="cc-name"
                    style={{ textTransform: 'uppercase', letterSpacing: cardName ? '0.5px' : 'normal' }}
                  />
                  <label className="pp-field-lbl">Nom sur la carte</label>
                  <span className="pp-focus-bar" />
                </div>
              </div>

              {/* Card number */}
              <div className="pp-field">
                <div className="pp-field-wrap">
                  <span className="pp-field-ico"><CreditCard size={18} /></span>
                  <input
                    className={`pp-input${cardNum ? ' filled' : ''}`}
                    placeholder=" "
                    value={cardNum}
                    onChange={e => fmtNum(e.target.value)}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    style={{ letterSpacing: cardNum ? '2.5px' : 'normal', paddingRight: 90 }}
                  />
                  <label className="pp-field-lbl">Numéro de carte</label>
                  <div className="pp-field-suffix">
                    <img
                      src={cmiLogo}
                      alt="CMI" style={{ height: 20, transition: 'opacity 0.3s', opacity: cardType !== 'mastercard' ? 1 : 0.5 }}
                    />
                    <img
                      src={masterCardLogo}
                      alt="MC" style={{ height: 22, transition: 'opacity 0.3s', opacity: cardType === 'mastercard' ? 1 : 0.5 }}
                    />
                  </div>
                  <span className="pp-focus-bar" />
                </div>
              </div>

              {/* Expiry + CVV */}
              <div className="pp-row2">
                <div className="pp-field">
                  <div className="pp-field-wrap">
                    <span className="pp-field-ico"><Calendar size={18} /></span>
                    <input
                      className={`pp-input${expiry ? ' filled' : ''}`}
                      placeholder=" "
                      value={expiry}
                      onChange={e => fmtExp(e.target.value)}
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      style={{ letterSpacing: expiry ? '2px' : 'normal' }}
                    />
                    <label className="pp-field-lbl">MM / AA</label>
                    <span className="pp-focus-bar" />
                  </div>
                </div>

                <div className="pp-field">
                  <div className="pp-field-wrap">
                    <span className="pp-field-ico"><Lock size={18} /></span>
                    <input
                      className={`pp-input${cvv ? ' filled' : ''}`}
                      placeholder=" "
                      type="password"
                      maxLength="4"
                      value={cvv}
                      onChange={e => { setCvv(e.target.value.replace(/\D/g, '')); setFlipped(true); }}
                      onBlur={() => setFlipped(false)}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      style={{ letterSpacing: '4px' }}
                    />
                    <label className="pp-field-lbl">CVV / CVC</label>
                    <span className="pp-focus-bar" />
                  </div>
                </div>
              </div>

              <button className="pp-pay-btn" onClick={handlePayment} disabled={isLoading}>
                {isLoading
                  ? <><div className="pp-spinner" /> Traitement…</>
                  : <><Lock size={16} /> Payer {grandTotal.toLocaleString('fr-MA')} MAD</>}
              </button>
            </>

            <div className="pp-trust">
              <div className="pp-trust-item"><ShieldCheck size={14} /> 256-bit SSL</div>
              <div className="pp-trust-item"><Lock size={14} /> PCI DSS</div>
              <div className="pp-trust-item"><CheckCircle2 size={14} /> 3D Secure</div>
            </div>
          </div>
        </div>

        {/* RIGHT : SIDEBAR */}
        {!isMobile && (
          <div className="pp-sidebar">
            <div className="pp-order-card">

              <div className="pp-hero">
                <img
                  src={carData.photos?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'}
                  alt={carData.name}
                />
                <div className="pp-hero-overlay" />
                <div className="pp-hero-content">
                  <div className="pp-hero-name">{carData.name}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                    {carData.category && <span className="pp-hero-badge">{carData.category}</span>}
                    {carData.agencyName && <span className="pp-hero-badge">{carData.agencyName}</span>}
                  </div>
                </div>
              </div>

              <div className="pp-summary">

                <div className="pp-dates">
                  <div className="pp-date-cell">
                    <div className="pp-date-lbl">📅 Début</div>
                    <div className="pp-date-val">{startDate || '—'}</div>
                  </div>
                  <div className="pp-date-cell">
                    <div className="pp-date-lbl">📅 Fin</div>
                    <div className="pp-date-val">{endDate || '—'}</div>
                  </div>
                </div>

                <div className="pp-dur">
                  <Calendar size={15} />
                  Durée : <strong>{days} jour{days > 1 ? 's' : ''}</strong>
                </div>

                <div>
                  <div className="pp-line">
                    <span className="pp-line-lbl">{carData.price} MAD × {days} j.</span>
                    <span className="pp-line-val">{total.toLocaleString('fr-MA')} MAD</span>
                  </div>
                  <div className="pp-line">
                    <span className="pp-line-lbl">Frais de service (5%)</span>
                    <span className="pp-line-val">{serviceFee.toLocaleString('fr-MA')} MAD</span>
                  </div>
                  <div className="pp-line">
                    <span className="pp-line-lbl">TVA</span>
                    <span className="pp-line-val green">Incluse ✓</span>
                  </div>
                </div>

                <div className="pp-total">
                  <span className="pp-total-lbl">Total TTC</span>
                  <span className="pp-total-amount">{grandTotal.toLocaleString('fr-MA')} MAD</span>
                </div>

                <div className="pp-client-row">
                  <User size={15} style={{ flexShrink: 0, color: 'var(--g-accent)' }} />
                  <span>
                    <strong>{clientFullName}</strong> · CIN : {cinNumber}
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS OVERLAY */}
      {isSuccess && (
        <div className="pp-success-overlay">
          <div className="pp-success-card">
            <div className="pp-success-icon">
              <CheckCircle2 size={46} />
            </div>
            <div className="pp-success-h">Paiement Réussi !</div>
            <div className="pp-success-amt">{grandTotal.toLocaleString('fr-MA')} MAD</div>
            <p className="pp-success-p">
              Votre réservation pour <strong>{carData.name}</strong> est confirmée.<br />
              Un email de confirmation vous sera envoyé sous peu.
            </p>
            <button className="pp-success-btn" onClick={() => navigate('/')}>
              <CheckCircle2 size={18} /> Retour à l'accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}