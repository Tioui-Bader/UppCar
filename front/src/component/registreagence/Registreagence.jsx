import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REG_FR } from "./fr";
import { REG_AR } from "./ar";

/* ── Default English ── */
const REG_EN = {
  eyebrow: "Create Agency Account",
  title: "Join UppCar 🚀",
  subtitle: "Create your agency space and manage your fleet in minutes.",
  step1Title: "Personal Information",
  step2Title: "Agency Details",
  step3Title: "Choose Your Plan",
  stepOf: (s, t) => `Step ${s} of ${t}`,
  firstNameLabel: "First name", lastNameLabel: "Last name",
  emailLabel: "Professional email", passwordLabel: "Password",
  termsLabel: "I agree to the", termsLink: "terms of use",
  agencyNameLabel: "Agency name", cityLabel: "City",
  phoneLabel: "Phone", fleetSizeLabel: "Fleet size",
  fleetOptions: ["1–5 vehicles", "6–20 vehicles", "21–50 vehicles", "50+ vehicles"],
  planStarter: "Starter", planStarterPrice: "Free", planStarterDesc: "Up to 5 vehicles, basic dashboard.",
  planPro: "Pro", planProPrice: "€49/mo", planProDesc: "Up to 50 vehicles, live GPS, advanced analytics.",
  planEnterprise: "Enterprise", planEnterprisePrice: "Custom", planEnterpriseDesc: "Unlimited fleet, dedicated support, API.",
  next: "Continue", back: "Back", submit: "Create Account",
  loading: "Creating…", success: "✅ Account created — redirecting…",
  errorFirst: "First name required.", errorLast: "Last name required.",
  errorEmail: "Invalid email.", errorPw: "Min. 8 characters.",
  errorTerms: "Please accept the terms.", errorAgency: "Agency name required.",
  errorCity: "City required.", errorPhone: "Phone required.", errorFleet: "Please select fleet size.",
  pwWeak: "Weak", pwFair: "Fair", pwStrong: "Strong", pwVStrong: "Very strong",
  leftTag1: "Manage your", leftTag2: "rental agency", leftTag3: "intelligently.",
  leftSub: "Join 1,200+ agencies that trust UppCar to manage their fleet, bookings and analytics in real time.",
  pills: ["Live dashboard", "GPS fleet tracking", "Advanced analytics", "No commitment"],
  decoLabel1: "Revenue this month", decoSub1: "↑ +24% vs March",
  decoLabel2: "Active fleet", decoVehicles: "vehicles", decoSub2: "3 on rental · 9 available",
  decoLabel3: "Reservations", decoMonth: "month",
  haveAccount: "Already have an account?", login: "Sign in",
};

function getT(lang) {
  if (lang === "AR") return REG_AR;
  if (lang === "FR") return REG_FR;
  return REG_EN;
}

/* ── PARTICLE ── */
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

/* ── ICONS ── */
const IUser = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IMail = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const ILock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const IPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.12 3.42 2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const IBldg = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" /></svg>;
const IPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const IInfo = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>;
const ICheck = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>;
const IEye = ({ s }) => s ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const GSVG = () => <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>;

export default function RegisterAgence() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return localStorage.getItem("appTheme") === "dark";
  });
  const lang = localStorage.getItem("appLang") || "EN";
  const isAr = lang === "AR";
  const t = getT(lang);

  useEffect(() => {
    const themeStr = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeStr);
    localStorage.setItem("theme", themeStr);
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang.toLowerCase());
  }, [isDark, isAr, lang]);

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [remember, setRemember] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);
  const [pwStr, setPwStr] = useState(0);
  const [agencyName, setAgencyName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const audioCtxRef = useRef(null);
  const lastPlayRef = useRef(0);

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
  const strColors = ['#ef4444', '#f59e0b', '#0ea5e9', '#10b981'];
  const strLabels = [t.pwWeak, t.pwFair, t.pwStrong, t.pwVStrong];
  const calcStr = v => { let s = 0; if (v.length >= 6) s++; if (v.length >= 10) s++; if (/[A-Z]/.test(v) && /[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++; setPwStr(s); };
  const v1 = () => { if (!firstName.trim()) return t.errorFirst; if (!lastName.trim()) return t.errorLast; if (!email.includes("@")) return t.errorEmail; if (password.length < 8) return t.errorPw; if (!terms) return t.errorTerms; return null; };
  const v2 = () => { if (!agencyName.trim()) return t.errorAgency; if (!city.trim()) return t.errorCity; if (!phone.trim()) return t.errorPhone; if (!fleetSize) return t.errorFleet; return null; };
  const nextStep = () => { setError(""); const err = step === 1 ? v1() : step === 2 ? v2() : null; if (err) { setError(err); return; } setStep(s => s + 1); };

  /* ── Animated particle canvas ── */
  useEffect(() => {
    const cv = canvasRef.current, ctx = cv.getContext("2d");
    let W, H, parts = [], id, tt = 0;
    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
      parts = Array.from({ length: 75 }, () => new Particle(W, H));
    };
    const loop = () => {
      /* ✅ FIX: en mode light, clearRect laisse le gradient CSS du body visible */
      ctx.clearRect(0, 0, W, H);

      /* grid */
      ctx.globalAlpha = isDark ? .03 : .04;
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = .5;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      /* aurora */
      tt += .0025;
      const g1 = ctx.createRadialGradient(W * .22 + Math.sin(tt) * 70, H * .28 + Math.cos(tt * .7) * 45, 0, W * .3, H * .3, W * .52);
      g1.addColorStop(0, isDark ? 'rgba(99,102,241,.07)' : 'rgba(99,102,241,.05)');
      g1.addColorStop(1, 'transparent');
      ctx.globalAlpha = 1; ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * .78 + Math.cos(tt * .6) * 55, H * .65 + Math.sin(tt) * 38, 0, W * .68, H * .6, W * .42);
      g2.addColorStop(0, isDark ? 'rgba(16,185,129,.05)' : 'rgba(16,185,129,.04)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      /* particles */
      parts.forEach(p => {
        p.update();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    resize(); window.addEventListener("resize", resize); loop();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []); // eslint-disable-line

  /* ── Parallax deco cards ── */
  useEffect(() => {
    const h = e => {
      const px = (e.clientX / window.innerWidth - .5) * 12;
      const py = (e.clientY / window.innerHeight - .5) * 12;
      document.querySelectorAll('.la-dc').forEach((el, i) => {
        const f = (i + 1) * .4;
        el.style.transform = `translateX(${px * f}px) translateY(${py * f}px)`;
      });
    };
    document.addEventListener("mousemove", h);
    return () => document.removeEventListener("mousemove", h);
  }, []);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      const response = await fetch("http://localhost:8080/api/auth/register-agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, agencyName, city, phone, fleetSize })
      });

      if (!response.ok) {
        const errorText = await response.text();
        let parsedErr = "Erreur lors de l'inscription";
        try { parsedErr = JSON.parse(errorText).message || errorText; } catch { parsedErr = errorText; }
        throw new Error(parsedErr);
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("agencyData", JSON.stringify(data.agency));

      setSuccess(true);
      setTimeout(() => navigate("/homeagence"), 1400);
    } catch (e) { setError(e.message || "Error."); }
    finally { setLoading(false); }
  };

  /* ── VARIABLES ── */
  const fg = isDark ? '#e8eaf6' : '#1e1b4b';
  const muted = isDark ? '#d3d3d3e3' : '#006905ff';
  const muted2 = isDark ? '#4b5563' : '#9ca3af';
  const inpBg = isDark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.7)';
  const inpFocus = isDark ? 'rgba(255,255,255,.07)' : '#ffffff';
  const brd = isDark ? 'rgba(99,102,241,.22)' : 'rgba(99,102,241,.2)';
  const accentFg = '#6366f1';
  const accentGr = '#10b981';

  /* ── CSS ── */
  const css = `
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body{
      min-height:100%;
      font-family:'DM Sans',sans-serif;
      overflow-x:hidden;
      background: transparent;
      color:${fg};
      transition:color .35s;
    }

    /* ── BASE DARK/LIGHT BACKGROUND ── */
    /* ── BASE DARK/LIGHT BACKGROUND ── */
    .la-base-bg {
      position: fixed;
      inset: 0;
      z-index: -10;
      background: ${isDark ? "#060813" : "#f8fafc"};
    }

    .la-mesh-bg {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: 
        ${isDark
      ? `radial-gradient(at ${isAr ? '100%' : '0%'} 0%, rgba(16, 185, 129, 0.4) 0, transparent 45%),
             radial-gradient(at ${isAr ? '0%' : '100%'} 0%, rgba(99, 102, 241, 0.35) 0, transparent 40%),
             radial-gradient(at ${isAr ? '0%' : '100%'} 100%, rgba(168, 85, 247, 0.3) 0, transparent 45%),
             radial-gradient(at ${isAr ? '100%' : '0%'} 100%, rgba(59, 130, 246, 0.25) 0, transparent 40%)`
      : `radial-gradient(at ${isAr ? '100%' : '0%'} 0%, rgba(16, 185, 129, 0.15) 0, transparent 40%),
             radial-gradient(at ${isAr ? '0%' : '100%'} 0%, rgba(99, 102, 241, 0.12) 0, transparent 35%),
             radial-gradient(at ${isAr ? '0%' : '100%'} 100%, rgba(168, 85, 247, 0.1) 0, transparent 40%),
             radial-gradient(at ${isAr ? '100%' : '0%'} 100%, rgba(59, 130, 246, 0.08) 0, transparent 35%)`
    };
      filter: blur(50px) contrast(110%);
    }

    .la-noise-bg {
      position: fixed;
      inset: 0;
      z-index: 5;
      opacity: ${isDark ? 0.04 : 0.07};
      pointer-events: none;
      /*background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");*/
    }
    [dir="rtl"]{font-family:'Cairo',sans-serif;}

    /* blobs animés — palette luxury car */
    .la-blob{
      position:fixed;border-radius:50%;
      filter:blur(100px);pointer-events:none;z-index:1;
      animation:laDrift 18s ease-in-out infinite;
    }
    .la-blob1{
      width:600px;height:400px;top:-150px;
      ${isAr ? 'right: -150px;' : 'left: -150px;'}
      background:${isDark ? 'rgba(16,185,129,.15)' : 'rgba(16,185,129,.18)'};
    }
    .la-blob2{
      width:450px;height:550px;bottom:-150px;
      ${isAr ? 'left: -100px;' : 'right: -100px;'}
      background:${isDark ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.15)'};
    }
    .la-blob3{
      width:320px;height:320px;top:40%;
      ${isAr ? 'right: 30%;' : 'left: 30%;'}
      background:${isDark ? 'rgba(245,158,11,.08)' : 'rgba(245,158,11,.1)'};
    }
    .la-blob4{
      width:220px;height:220px;top:20%;
      ${isAr ? 'left: 30%;' : 'right: 30%;'}
      background:${isDark ? 'rgba(168,85,247,.1)' : 'rgba(168,85,247,.12)'};
    }
    @keyframes laDrift{
      0%,100%{transform:translate(0,0) scale(1) rotate(0deg);}
      33%{transform:translate(30px,-20px) scale(1.08) rotate(3deg);}
      66%{transform:translate(-20px,30px) scale(.95) rotate(-3deg);}
    }

    #la-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;background:transparent !important;}

    .la-wrap{
      position:relative;z-index:10;
      min-height:100vh;
      display:flex;align-items:stretch;
    }

    .la-form-side{
      flex:1;display:flex;align-items:center;justify-content:center;
      padding:60px 56px;
      order:0;
    }

    .la-form-inner{width:100%;max-width:420px;}

    .la-img-side{
      width:49%;flex-shrink:0;position:relative;overflow:hidden;
      display:flex;flex-direction:column;justify-content:flex-end;padding:52px;
      order:1;
    }

    .la-img-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80&auto=format') center/cover no-repeat;}
    .la-img-ov{
      position:absolute;inset:0;
      background:linear-gradient(160deg,rgba(4,7,20,.25) 0%,rgba(16,185,129,.12) 40%,rgba(4,7,20,.9) 100%);
    }

    .la-orb-w{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;pointer-events:none;z-index:1;opacity:.18;}
    .la-orb{position:absolute;inset:0;border:1px dashed rgba(16,185,129,.5);border-radius:50%;animation:laOrb 16s linear infinite;}
    .la-orb2{inset:40px;animation-duration:12s;animation-direction:reverse;border-color:rgba(99,102,241,.4);}
    .la-orb3{inset:80px;animation-duration:20s;}
    .la-orb-d{position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 10px #10b981;}

    .la-dc-wrap{position:absolute;inset:0;pointer-events:none;z-index:2;}
    .la-dc{
      position:absolute;
      background:rgba(255,255,255,.07);
      backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
      border:1px solid rgba(255,255,255,.12);
      border-radius:20px;padding:16px 20px;animation:laDc linear infinite;transition:transform .1s ease-out;
    }
    .la-dc1{top:8%;right:6%;width:195px;animation-duration:7s;}
    .la-dc2{top:38%;right:9%;width:172px;animation-duration:9s;animation-delay:-3s;}
    .la-dc3{top:21%;left:5%;width:154px;animation-duration:8s;animation-delay:-1.5s;}
    [dir="rtl"] .la-dc1{right:auto;left:6%;}
    [dir="rtl"] .la-dc2{right:auto;left:9%;}
    [dir="rtl"] .la-dc3{left:auto;right:5%;}
    .la-dc-stat{font-family:'Syne',sans-serif;font-size:25px;font-weight:900;background:linear-gradient(135deg,#047857,#10b981,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:4px;}
    .la-dc-lbl{font-size:9.5px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.12em;font-weight:700;}
    .la-dc-dot{width:5px;height:5px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px #22c55e;display:inline-block;margin-inline-end:5px;animation:laPulse 2s infinite;}

    .la-car-s{position:absolute;bottom:0;left:0;right:0;height:56px;overflow:hidden;pointer-events:none;z-index:4;opacity:.5;}
    .la-road{position:absolute;bottom:0;left:0;right:0;height:22px;background:rgba(255,255,255,.04);border-top:1px solid rgba(255,255,255,.06);}
    .la-road-ls{position:absolute;bottom:8px;left:0;display:flex;animation:laRoad 2s linear infinite;white-space:nowrap;}
    .la-road-l{width:38px;height:3px;border-radius:2px;background:rgba(255,255,255,.12);margin-right:38px;display:inline-block;}
    .la-car{position:absolute;bottom:16px;left:0;animation:laCar 9s linear infinite;}

    .la-img-content{position:relative;z-index:3;}
    .la-brand{display:flex;align-items:center;gap:12px;margin-bottom:36px;}
    .la-bl{width:48px;height:48px;border-radius:15px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
    .la-bl-spin{position:absolute;inset:-50%;width:200%;height:200%;background:conic-gradient(from 0,transparent,#10b981 25%,transparent 35%);animation:laOrb 3s linear infinite;}
    .la-bl-in{position:absolute;inset:2px;background:rgba(4,7,20,.8);border-radius:13px;z-index:1;}
    .la-bt{
      font-family:'Syne',sans-serif;font-weight:900;font-size:26px;letter-spacing:-.5px;color:#e8eaf6;
      display:flex;align-items:center;
    }
    .la-blink{
      width:5px;height:5px;border-radius:50%;background:#10b981;
      animation:laBlink 2s infinite;display:inline-block;
      margin-inline-start:8px;vertical-align:middle;
    }
    .la-tag{font-family:'Syne',sans-serif;font-size:clamp(26px,3.2vw,44px);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:14px;color:#fff;}
    [dir="rtl"] .la-tag{letter-spacing:0;font-family:'Cairo',sans-serif;}
    .la-sub{font-size:14px;color:rgba(255,255,255,.55);line-height:1.65;max-width:360px;margin-bottom:28px;}
    .la-pills{display:flex;flex-wrap:wrap;gap:7px;}
    .la-pill{display:flex;align-items:center;gap:6px;padding:6px 13px;border-radius:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.11);font-size:11.5px;font-weight:600;color:rgba(255,255,255,.7);}
    .la-pill-d{width:4px;height:4px;border-radius:50%;flex-shrink:0;background:#10b981;}

    .la-eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:${accentGr};background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.22);border-radius:20px;padding:5px 13px;margin-bottom:16px;}
    .la-title{font-family:'Syne',sans-serif;font-size:clamp(26px,3vw,38px);font-weight:900;letter-spacing:-1px;line-height:1.05;margin-bottom:10px;color:${fg};}
    [dir="rtl"] .la-title{font-family:'Cairo',sans-serif;letter-spacing:0;}
    .la-sub-txt{font-size:14px;color:${muted};line-height:1.55;margin-bottom:32px;}

    /* static label above input */
    .la-ig{margin-bottom:16px;}
    .la-ifw{position:relative;}
    .la-ilb{
      display:block;font-size:16px;font-weight:700;
      color:${muted};letter-spacing:.07em;
      margin-bottom:11.5px;
    }
    .la-ifd{
      width:100%;height:52px;
      background:${inpBg};
      border:1.5px solid ${brd};
      border-radius:16px;
      padding:0 50px 0 18px;
      font-family:'DM Sans',sans-serif;font-size:15px;
      color:${fg};outline:none;
      box-shadow:0 0 0 2px #818cf8;
      transition:border-color .3s,box-shadow .3s,background .3s;
      backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
    }
    [dir="rtl"] .la-ifd{padding:0 18px 0 50px;text-align:right;font-family:'Cairo',sans-serif;}
    .la-ifd::placeholder{color:${muted2};}
    .la-ifd:focus{border-color:#818cf8;box-shadow:0 0 0 2.5px #818cf8, 0 0 0 6px rgba(129,140,248,.15);background:${inpFocus};}
    .la-ico{position:absolute;inset-inline-end:16px;top:50%;transform:translateY(-50%);color:${muted2};transition:color .25s;display:flex;align-items:center;}
    .la-ig:focus-within .la-ico{color:${accentFg};}

    .la-opts{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;font-size:13px;}
    .la-chk-row{display:flex;align-items:center;gap:8px;color:${muted};cursor:pointer;}
    .la-ck{width:16px;height:16px;border-radius:5px;flex-shrink:0;accent-color:${accentFg};cursor:pointer;}
    a{color:${accentGr};text-decoration:none;font-weight:600;} a:hover{text-decoration:underline;}

    .la-sbtn{
      width:100%;padding:17px;border:none;border-radius:16px;
      font-family:'Syne',sans-serif;font-size:15.5px;font-weight:800;
      cursor:pointer;letter-spacing:.03em;margin-bottom:22px;
      position:relative;overflow:hidden;
      background:linear-gradient(135deg,#047857 0%,#10b981 50%,#34d399 100%);
      background-size:200%;animation:laGrad 4s ease infinite;
      color:#fff;
      box-shadow:0 0 0 1px rgba(16,185,129,.22),0 8px 28px rgba(16,185,129,.3);
      transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;
    }
    [dir="rtl"] .la-sbtn{font-family:'Cairo',sans-serif;letter-spacing:0;}
    .la-sbtn::before{content:'';position:absolute;top:0;inset-inline-start:-100%;width:55%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.22),transparent);animation:laShine 3s ease-in-out infinite;}
    .la-sbtn:hover{transform:translateY(-3px) scale(1.01);box-shadow:0 0 0 1px rgba(16,185,129,.4),0 14px 40px rgba(16,185,129,.4);}
    .la-sbtn:active{transform:scale(.98);}
    .la-sbtn:disabled{opacity:.6;cursor:not-allowed;transform:none;}

    .la-dv{display:flex;align-items:center;gap:12px;margin-bottom:18px;color:${muted2};font-size:12px;}
    .la-dv::before,.la-dv::after{content:'';flex:1;height:1px;background:${isDark ? 'rgba(99,102,241,.15)' : 'rgba(99,102,241,.12)'};}

    .la-srow{display:flex;gap:10px;margin-bottom:24px;}
    .la-sbtn2{
      flex:1;padding:12px;border-radius:14px;cursor:pointer;
      border:1.5px solid ${brd};
      background:${inpBg};color:${fg};
      font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;
      display:flex;align-items:center;justify-content:center;gap:8px;
      transition:all .3s cubic-bezier(.34,1.56,.64,1);
      backdrop-filter:blur(10px);
    }
    .la-sbtn2:hover{border-color:${accentFg};background:${inpFocus};transform:translateY(-2px);box-shadow:0 8px 24px rgba(99,102,241,.1);}

    .la-err{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:12px;padding:11px 15px;font-size:13px;color:#f87171;margin-bottom:16px;display:flex;align-items:center;gap:9px;animation:laUp .3s ease both;}

    @keyframes laOrb{to{transform:rotate(360deg);}}
    @keyframes laDc{0%,100%{transform:translateY(0);}33%{transform:translateY(-10px) rotate(.7deg);}66%{transform:translateY(5px) rotate(-.4deg);}}
    @keyframes laBlink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes laPulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.75);}}
    @keyframes laUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    @keyframes laShine{0%{inset-inline-start:-100%;}65%{inset-inline-start:150%;}100%{inset-inline-start:150%;}}
    @keyframes laGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
    @keyframes laRoad{0%{transform:translateX(0);}100%{transform:translateX(-190px);}}
    @keyframes laCar{0%{transform:translateX(-130px);}100%{transform:translateX(calc(50vw + 130px));}}

    @media(max-width:768px){
      .la-img-side{display:none;}
      .la-form-side{padding:36px 20px;}
        .la-theme-toggle{display:none;}
    }
  `;

  const GoogleSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );

  return (
    <>
      <style>{css}</style>
      <div className="la-base-bg" />
      <canvas ref={canvasRef} id="la-canvas" />
      <div className="la-mesh-bg" />
      <div className="la-noise-bg" />

      <div className="la-wrap">

        {/* ── FORM SIDE ── */}
        <div className="la-form-side">
          {/* Theme Toggle */}
          <button
            className="la-theme-toggle"
            onClick={() => setIsDark(!isDark)}
            style={{
              position: "absolute", top: 20,
              left: isAr ? "auto" : 32,
              right: isAr ? 32 : "auto",
              width: 40, height: 40, borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(16,185,129,0.1)",
              border: "1px solid " + (isDark ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.2)"),
              color: isDark ? "#facc15" : "#10b981",
              cursor: "pointer", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s", zIndex: 10
            }}
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
          <div className="la-form-inner">

            {/* Logo UppCar */}
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 28, animation: "laUp .5s ease both", direction: "ltr" }}>
              <div onClick={() => navigate("/")} style={{ position: "relative", width: 46, height: 46, borderRadius: 14, background: fg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 20px ${isDark ? "rgba(0,0,0,0.4)" : "rgba(16,185,129,0.2)"}`, overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
                <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "conic-gradient(from 0deg,transparent 0%,#10b981 30%,transparent 40%)", animation: "laOrb 4s linear infinite" }} />
                <div style={{ position: "absolute", inset: 2, background: isDark ? "#070b17" : "#fff", borderRadius: 12, zIndex: 1 }} />
                <svg style={{ zIndex: 2 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" />
                  <circle cx="6.5" cy="16.5" r="2.5" />
                  <circle cx="16.5" cy="16.5" r="2.5" />
                </svg>
              </div>
              <div onClick={() => navigate("/")} style={{ position: "relative", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: "-0.5px", lineHeight: 1, cursor: "pointer" }}>
                <span style={{ color: fg }}>Upp</span>
                <span style={{ color: accentGr }}>Car</span>
                <span style={{ position: "absolute", bottom: 5, right: -10, width: 6, height: 6, borderRadius: "50%", background: accentGr, animation: "laPulse 2s infinite", display: "inline-block" }} />
              </div>
              <div style={{ marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 5, background: isDark ? "rgba(16,185,129,.1)" : "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 20, padding: "4px 10px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", display: "inline-block", animation: "laPulse 2s infinite" }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: accentGr, letterSpacing: ".1em", textTransform: "uppercase" }}>Live</span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10, animation: "laUp .5s .04s ease both" }}>
              {[1, 2].map(n => (
                <div key={n} style={{ flex: 1, height: 3, borderRadius: 3, background: n <= step ? accentGr : (isDark ? "rgba(255,255,255,.1)" : "rgba(99,102,241,.12)"), transition: "background .4s" }} />
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
              {t.stepOf(step, 2)}
            </div>

            {/* Eyebrow + Title + Sub */}
            <div className="la-eyebrow" style={{ animation: "laUp .5s .07s ease both" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accentGr, animation: "laPulse 2s infinite", display: "inline-block" }} />
              {t.eyebrow}
            </div>
            <h1 className="la-title" style={{ animation: "laUp .5s .09s ease both" }}>
              {step === 1 ? t.step1Title : t.step2Title}
            </h1>
            <p className="la-sub-txt" style={{ animation: "laUp .5s .11s ease both" }}>{t.subtitle}</p>

            {/* Error */}
            {error && (
              <div className="la-err">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {error}
              </div>
            )}

            {/* ── Step 1: Personal info ── */}
            {step === 1 && (
              <div style={{ animation: "laUp .35s ease both" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="la-ig">
                    <label className="la-ilb" htmlFor="la-fn">{t.firstNameLabel}</label>
                    <div className="la-ifw">
                      <input id="la-fn" className="la-ifd" type="text" placeholder="Jean" value={firstName} onChange={e => { setFirstName(e.target.value); setError(""); }} />
                      <div className="la-ico"><IUser /></div>
                    </div>
                  </div>
                  <div className="la-ig">
                    <label className="la-ilb" htmlFor="la-ln">{t.lastNameLabel}</label>
                    <div className="la-ifw">
                      <input id="la-ln" className="la-ifd" type="text" placeholder="Dupont" value={lastName} onChange={e => { setLastName(e.target.value); setError(""); }} />
                      <div className="la-ico"><IUser /></div>
                    </div>
                  </div>
                </div>
                <div className="la-ig">
                  <label className="la-ilb" htmlFor="la-em">{t.emailLabel}</label>
                  <div className="la-ifw">
                    <input id="la-em" className="la-ifd" type="email" placeholder="agency@example.com" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} autoComplete="email" />
                    <div className="la-ico"><IMail /></div>
                  </div>
                </div>
                <div className="la-ig">
                  <label className="la-ilb" htmlFor="la-pw">{t.passwordLabel}</label>
                  <div className="la-ifw">
                    <input id="la-pw" className="la-ifd" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => { setPassword(e.target.value); calcStr(e.target.value); setError(""); }} autoComplete="new-password" />
                    <div className="la-ico" onClick={() => setShowPw(p => !p)} style={{ cursor: "pointer", pointerEvents: "all" }}><IEye s={showPw} /></div>
                  </div>
                  {password && (
                    <div style={{ display: "flex", gap: 4, marginTop: 6, alignItems: "center" }}>
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i < pwStr ? strColors[pwStr - 1] : (isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.07)"), transition: "background .3s" }} />
                      ))}
                      <span style={{ fontSize: 10, color: strColors[pwStr - 1] || muted, fontWeight: 700, whiteSpace: "nowrap", marginInlineStart: 6 }}>{pwStr > 0 ? strLabels[pwStr - 1] : ""}</span>
                    </div>
                  )}
                </div>
                <label className="la-chk-row" style={{ marginBottom: 20 }}>
                  <input type="checkbox" className="la-ck" checked={terms} onChange={e => setTerms(e.target.checked)} />
                  <span style={{ color: muted, fontSize: 13 }}>{t.termsLabel} <a href="/terms">{t.termsLink}</a></span>
                </label>
              </div>
            )}

            {/* ── Step 2: Agency info ── */}
            {step === 2 && (
              <div style={{ animation: "laUp .35s ease both" }}>
                <div className="la-ig">
                  <label className="la-ilb" htmlFor="la-ag">{t.agencyNameLabel}</label>
                  <div className="la-ifw">
                    <input id="la-ag" className="la-ifd" type="text" placeholder="AutoDrive Paris" value={agencyName} onChange={e => { setAgencyName(e.target.value); setError(""); }} />
                    <div className="la-ico"><IBldg /></div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="la-ig">
                    <label className="la-ilb" htmlFor="la-ct">{t.cityLabel}</label>
                    <div className="la-ifw">
                      <input id="la-ct" className="la-ifd" type="text" placeholder="Paris" value={city} onChange={e => { setCity(e.target.value); setError(""); }} />
                      <div className="la-ico"><IPin /></div>
                    </div>
                  </div>
                  <div className="la-ig">
                    <label className="la-ilb" htmlFor="la-ph">{t.phoneLabel}</label>
                    <div className="la-ifw">
                      <input id="la-ph" className="la-ifd" type="tel" placeholder="+33 6 00 00 00 00" value={phone} onChange={e => { setPhone(e.target.value); setError(""); }} />
                      <div className="la-ico"><IPhone /></div>
                    </div>
                  </div>
                </div>
                <div className="la-ig">
                  <label className="la-ilb" htmlFor="la-fs">{t.fleetSizeLabel}</label>
                  <div className="la-ifw">
                    <select id="la-fs" className="la-ifd" value={fleetSize} onChange={e => { setFleetSize(e.target.value); setError(""); }} style={{ appearance: "none", cursor: "pointer" }}>
                      <option value="">—</option>
                      {t.fleetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <div className="la-ico"><IBldg /></div>
                  </div>
                </div>
                <div style={{ background: isDark ? "rgba(59,130,246,.07)" : "rgba(59,130,246,.06)", border: "1px solid rgba(59,130,246,.18)", borderRadius: 12, padding: "10px 13px", fontSize: 12.5, color: isDark ? "#93c5fd" : "#3b82f6", display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 16 }}>
                  <IInfo />{lang === "AR" ? "ستتمكن من إدارة أسطولك بعد التسجيل مباشرة." : lang === "FR" ? "Vous pourrez gérer votre flotte dès après l'inscription." : "You can manage your fleet right after registration."}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {step > 1 && (
                <button type="button" onClick={() => { setError(""); setStep(s => s - 1); }} style={{ flex: 1, padding: 16, borderRadius: 16, border: `1.5px solid ${brd}`, background: inpBg, color: fg, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14.5, cursor: "pointer", backdropFilter: "blur(10px)", transition: "all .3s" }}>
                  ← {t.back}
                </button>
              )}
              {step < 2 ? (
                <button type="button" className="la-sbtn" style={{ flex: step > 1 ? 2 : 1, marginBottom: 0 }} onClick={nextStep}>{t.next} →</button>
              ) : (
                <button type="button" className="la-sbtn" style={{ flex: step > 1 ? 2 : 1, marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }} disabled={loading} onClick={handleSubmit}>
                  {success ? t.success : loading ? (
                    <>
                      <div style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "laOrb 0.8s linear infinite" }} />
                      {t.loading}
                    </>
                  ) : t.submit}
                </button>
              )}
            </div>

            <p style={{ textAlign: "center", fontSize: 14, color: muted, marginTop: 18, position: "relative", top: "15px" }}>
              {t.haveAccount}{" "}<a href="/loginagence">{t.login}</a>
            </p>

          </div>
        </div>

        {/* ── IMAGE SIDE ── */}
        <div className="la-img-side">
          <div className="la-img-bg" /><div className="la-img-ov" />

          <div className="la-orb-w">
            <div className="la-orb"><div className="la-orb-d" /></div>
            <div className="la-orb la-orb2"><div className="la-orb-d" style={{ background: "#818cf8", boxShadow: "0 0 10px #818cf8" }} /></div>
            <div className="la-orb la-orb3"><div className="la-orb-d" style={{ background: "#f59e0b", boxShadow: "0 0 10px #f59e0b" }} /></div>
          </div>

          <div className="la-dc-wrap">
            <div className="la-dc la-dc1">
              <div className="la-dc-lbl"><span className="la-dc-dot" />{t.decoLabel1}</div>
              <div className="la-dc-stat">€72,400</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{t.decoSub1}</div>
            </div>
            <div className="la-dc la-dc2">
              <div className="la-dc-lbl">{t.decoLabel2}</div>
              <div style={{ display: "flex", gap: 6, margin: "6px 0", alignItems: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#e8eaf6", lineHeight: 1 }}>
                  12 <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{t.decoVehicles}</span>
                </span>
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>{t.decoSub2}</div>
            </div>
            <div className="la-dc la-dc3">
              <div className="la-dc-lbl">{t.decoLabel3}</div>
              <div className="la-dc-stat" style={{ fontSize: 21 }}>
                31 <span style={{ fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 400, WebkitTextFillColor: "rgba(255,255,255,.4)" }}>/ {t.decoMonth}</span>
              </div>
            </div>
          </div>

          <div className="la-car-s">
            <div className="la-road">
              <div className="la-road-ls">{Array.from({ length: 12 }).map((_, i) => <span key={i} className="la-road-l" />)}</div>
            </div>
            <div className="la-car">
              <svg width="80" height="34" viewBox="0 0 80 34" fill="none">
                <rect x="8" y="16" width="64" height="14" rx="4" fill="rgba(16,185,129,0.7)" />
                <path d="M18 16 L26 6 L54 6 L62 16" fill="rgba(16,185,129,0.5)" />
                <circle cx="22" cy="30" r="6" fill="#1f2937" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="22" cy="30" r="2.5" fill="#374151" />
                <circle cx="58" cy="30" r="6" fill="#1f2937" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="58" cy="30" r="2.5" fill="#374151" />
                <rect x="29" y="8" width="22" height="7" rx="2" fill="rgba(14,165,233,0.3)" />
                <circle cx="65" cy="19" r="3" fill="rgba(245,158,11,0.9)" />
                <circle cx="15" cy="19" r="2" fill="rgba(239,68,68,0.7)" />
              </svg>
            </div>
          </div>

          <div className="la-img-content">
            <div className="la-brand">
              <div className="la-bl">
                <div className="la-bl-spin" /><div className="la-bl-in" />
                <svg style={{ position: "relative", zIndex: 2 }} width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#e8eaf6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" />
                  <circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" />
                </svg>
              </div>
              <div className="la-bt">
                <span style={{ color: "#e8eaf6" }}>Upp</span>
                <span style={{ color: "#10b981" }}>Car</span>
                <span className="la-blink" />
              </div>
            </div>
            <h2 className="la-tag">
              {t.leftTag1}<br />
              <span style={{ background: "linear-gradient(135deg,#047857,#10b981,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.leftTag2}
              </span><br />
              {t.leftTag3}
            </h2>
            <p className="la-sub">{t.leftSub}</p>
            <div className="la-pills">
              {t.pills.map(p => (
                <div key={p} className="la-pill"><span className="la-pill-d" />{p}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}