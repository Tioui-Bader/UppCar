import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { LOGIN_FR } from "./fr";
import { LOGIN_AR } from "./ar";

/* ── Default English ── */
const LOGIN_EN = {
  eyebrow: "Agency Space",
  title: "Welcome back !",
  subtitle: "Sign in to your agency space to manage your activity.",
  emailLabel: "Professional email",
  emailPlaceholder: "agency@example.com",
  passwordLabel: "Password",
  remember: "Remember me",
  forgot: "Forgot password?",
  submit: "Sign in",
  loading: "Signing in…",
  success: "✅ Signed in — redirecting…",
  divider: "or continue with",
  noAccount: "No account yet?",
  register: "Create agency account",
  errorFill: "Please fill in all fields.",
  errorLogin: "Incorrect email or password.",
  leftTag1: "Manage your",
  leftTag2: "rental agency",
  leftTag3: "intelligently.",
  leftSub: "Join 1,200+ agencies that trust UppCar to manage their fleet, bookings and analytics in real time.",
  pills: ["Live dashboard", "GPS fleet tracking", "Advanced analytics", "No commitment"],
  decoLabel1: "Revenue this month",
  decoSub1: "↑ +24% vs March",
  decoLabel2: "Active fleet",
  decoVehicles: "vehicles",
  decoSub2: "3 on rental · 9 available",
  decoLabel3: "Reservations",
  decoMonth: "month",
};

function getT(lang) {
  if (lang === "AR") return LOGIN_AR;
  if (lang === "FR") return LOGIN_FR;
  return LOGIN_EN;
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
const IMail = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IEye = ({ s }) => s
  ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const ILock = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;

export default function LoginAgence() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  /* ── Read settings from localStorage (written by Home.jsx) ── */
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      // ✅ NE PAS remplir le fond en mode light — laisser le CSS visible
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

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 4000));
        const res = await fetch("http://localhost:8080/api/auth/google-agency", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText);
        }
        const data = await res.json();
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("role", "agence");
        localStorage.setItem("agencyData", JSON.stringify(data.agency));

        setSuccess(true);
        setTimeout(() => navigate("/homeagence"), 1200);
      } catch (error) {
        setError(error.message || t.errorLogin);
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google login failed")
  });

  const handleSubmit = async e => {
    e.preventDefault(); setError("");
    if (!email || !password) { setError(t.errorFill); return; }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      const response = await fetch("http://localhost:8080/api/auth/login-agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        let errStr = t.errorLogin;
        try {
          const errObj = await response.json();
          errStr = errObj.message || errStr;
        } catch { }
        throw new Error(errStr);
      }

      const data = await response.json();
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", "agence");
      localStorage.setItem("agencyData", JSON.stringify(data.agency));

      setSuccess(true);
      setTimeout(() => navigate("/homeagence"), 1200);
    } catch (err) { setError(err.message || t.errorLogin); }
    finally { setLoading(false); }
  };

  /* ── VARIABLES ── */
  const bg = isDark ? '#070b17' : 'transparent';
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
    .la-base-bg {
      position: fixed;
      inset: 0;
      z-index: -10;
      background: ${isDark ? "#060813" : "#f8fafc"};
    }

    /* ── ULTRA-MODERN CORNER GLOW ── */
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

    /* ── LAYOUT (two equal columns) ── */
    .la-wrap{
      position:relative;z-index:10;
      min-height:100vh;
      display:flex;align-items:stretch;
    }

    /* ── FORM side (left in LTR, right in RTL) ── */
    .la-form-side{
      flex:1;display:flex;align-items:center;justify-content:center;
      padding:60px 56px;
      order:0;
    }
    /* AR: form stays LEFT (order:0), same as LTR */

    .la-form-inner{width:100%;max-width:420px;}

    /* ── IMAGE side (right in LTR, left in RTL) ── */
    .la-img-side{
      width:49%;flex-shrink:0;position:relative;overflow:hidden;
      display:flex;flex-direction:column;justify-content:flex-end;padding:52px;
      order:1;
    }
    /* AR: image stays RIGHT (order:1), same as LTR */

    .la-img-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80&auto=format') center/cover no-repeat;}
    .la-img-ov{
      position:absolute;inset:0;
      background:linear-gradient(160deg,rgba(4,7,20,.25) 0%,rgba(16,185,129,.12) 40%,rgba(4,7,20,.9) 100%);
    }

    /* orbit rings */
    .la-orb-w{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;pointer-events:none;z-index:1;opacity:.18;}
    .la-orb{position:absolute;inset:0;border:1px dashed rgba(16,185,129,.5);border-radius:50%;animation:laOrb 16s linear infinite;}
    .la-orb2{inset:40px;animation-duration:12s;animation-direction:reverse;border-color:rgba(99,102,241,.4);}
    .la-orb3{inset:80px;animation-duration:20s;}
    .la-orb-d{position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 10px #10b981;}

    /* deco cards */
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

    /* car scene */
    .la-car-s{position:absolute;bottom:0;left:0;right:0;height:56px;overflow:hidden;pointer-events:none;z-index:4;opacity:.5;}
    .la-road{position:absolute;bottom:0;left:0;right:0;height:22px;background:rgba(255,255,255,.04);border-top:1px solid rgba(255,255,255,.06);}
    .la-road-ls{position:absolute;bottom:8px;left:0;display:flex;animation:laRoad 2s linear infinite;white-space:nowrap;}
    .la-road-l{width:38px;height:3px;border-radius:2px;background:rgba(255,255,255,.12);margin-right:38px;display:inline-block;}
    .la-car{position:absolute;bottom:16px;left:0;animation:laCar 9s linear infinite;}

    /* left-side content */
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

    /* ── FORM (no card — direct on background) ── */
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


    /* remember + forgot row */
    .la-opts{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;font-size:13px;}
    .la-chk-row{display:flex;align-items:center;gap:8px;color:${muted};cursor:pointer;}
    .la-ck{width:16px;height:16px;border-radius:5px;flex-shrink:0;accent-color:${accentFg};cursor:pointer;}
    a{color:${accentGr};text-decoration:none;font-weight:600;} a:hover{text-decoration:underline;}

    /* submit button */
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

    /* divider */
    .la-dv{display:flex;align-items:center;gap:12px;margin-bottom:18px;color:${muted2};font-size:12px;}
    .la-dv::before,.la-dv::after{content:'';flex:1;height:1px;background:${isDark ? 'rgba(99,102,241,.15)' : 'rgba(99,102,241,.12)'};}

    /* social */
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

    /* error */
    .la-err{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:12px;padding:11px 15px;font-size:13px;color:#f87171;margin-bottom:16px;display:flex;align-items:center;gap:9px;animation:laUp .3s ease both;}

    /* ── KEYFRAMES ── */
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
      <div className="la-blob la-blob1" />
      <div className="la-blob la-blob2" />
      <div className="la-blob la-blob3" />
      <div className="la-blob la-blob4" />

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

            {/* ── Animated Logo UppCar ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 28, animation: "laUp .5s ease both", direction: "ltr" }}>
              {/* Spinning wheel logo — identical to Home.jsx */}
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

            {/* ── Stats bar ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24, animation: "laUp .5s .04s ease both" }}>
              {[
                {
                  val: "1,200+",
                  lbl: lang === "AR" ? "وكالة" : lang === "FR" ? "Agences" : "Agencies",
                  color: "#10b981",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" /></svg>
                },
                {
                  val: "94%",
                  lbl: lang === "AR" ? "رضا" : lang === "FR" ? "Satisfaction" : "Satisfaction",
                  color: "#f59e0b",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                },
                {
                  val: "24/7",
                  lbl: lang === "AR" ? "دعم" : lang === "FR" ? "Support" : "Support",
                  color: "#818cf8",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                },
              ].map(s => (
                <div key={s.val} style={{ background: isDark ? "rgba(255,255,255,.04)" : "rgba(255,255,255,.7)", border: `1px solid ${s.color}25`, borderRadius: 14, padding: "10px 8px", textAlign: "center", backdropFilter: "blur(10px)", boxShadow: `0 4px 16px ${s.color}10`, transition: "all .3s" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: muted, marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* ── Eyebrow + Title + Subtitle ── */}
            <div className="la-eyebrow" style={{ animation: "laUp .5s .07s ease both" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accentGr, animation: "laPulse 2s infinite", display: "inline-block" }} />
              {t.eyebrow}
            </div>
            <h1 className="la-title" style={{ animation: "laUp .5s .09s ease both" }}>{t.title}</h1>
            <p className="la-sub-txt" style={{ animation: "laUp .5s .11s ease both" }}>{t.subtitle}</p>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="la-err">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="la-ig" style={{ animation: "laUp .5s .13s ease both" }}>
                <label className="la-ilb" htmlFor="la-em">{t.emailLabel}</label>
                <div className="la-ifw">
                  <input id="la-em" className="la-ifd" type="email" placeholder={t.emailPlaceholder || "agency@example.com"}
                    value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                  <div className="la-ico"><IMail /></div>
                </div>
              </div>

              {/* Password */}
              <div className="la-ig" style={{ animation: "laUp .5s .16s ease both" }}>
                <label className="la-ilb" htmlFor="la-pw">{t.passwordLabel}</label>
                <div className="la-ifw">
                  <input id="la-pw" className="la-ifd" type={showPw ? "text" : "password"} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                  <div className="la-ico" onClick={() => setShowPw(p => !p)} style={{ cursor: "pointer", pointerEvents: "all" }}>
                    <IEye s={showPw} />
                  </div>
                </div>
              </div>

              {/* Remember + forgot */}
              <div className="la-opts" style={{ animation: "laUp .5s .19s ease both" }}>
                <label className="la-chk-row">
                  <input type="checkbox" className="la-ck" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  {t.remember}
                </label>
                <a href="/agency/forgot-password">{t.forgot}</a>
              </div>

              <button type="submit" className="la-sbtn"
                disabled={loading || success}
                style={{ animation: "laUp .5s .22s ease both", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                {success ? t.success : loading ? (
                  <>
                    <div style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "laOrb 0.8s linear infinite" }} />
                    {t.loading}
                  </>
                ) : t.submit}
              </button>
            </form>

            {/* ── Divider + Social ── */}
            <div className="la-dv" style={{ animation: "laUp .5s .26s ease both" }}>{t.divider}</div>

            <div className="la-srow" style={{ animation: "laUp .5s .28s ease both" }}>
              <button className="la-sbtn2" type="button" onClick={() => loginWithGoogle()}><GoogleSVG />Google</button>
              <button className="la-sbtn2" type="button">
                <svg style={{ position: "relative", left: 5, bottom: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.42 2.23-1.15 3.03-.78.85-2.05 1.5-3.13 1.41-.14-1.12.41-2.32 1.13-3.1.78-.85 2.12-1.46 3.15-1.34zm4.14 15.36c-.57 1.32-.83 1.91-1.57 3.04-1.04 1.56-2.5 3.51-4.32 3.53-1.62.02-2.04-1.05-4.24-1.04-2.2.01-2.66 1.06-4.28 1.05-1.82-.02-3.21-1.79-4.25-3.35C.2 17.56-.55 12.76 1.7 9.47c1.12-1.65 2.89-2.69 4.54-2.71 1.69-.03 3.28 1.14 4.24 1.14.96 0 2.77-1.41 4.68-1.2.8.03 3.05.32 4.5 2.44-.12.08-2.68 1.56-2.65 4.65.03 3.68 3.22 4.9 3.26 4.92z" />
                </svg>
                Apple
              </button>
            </div>

            {/* ── Feature pills ── */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, animation: "laUp .5s .3s ease both", justifyContent: "center" }}>
              {[
                {
                  lbl: lang === "AR" ? "آمن 100%" : lang === "FR" ? "100% Sécurisé" : "100% Secure",
                  color: "#818cf8",
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                },
                {
                  lbl: lang === "AR" ? "لحظي" : lang === "FR" ? "Temps réel" : "Real-time",
                  color: "#f59e0b",
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                },
                {
                  lbl: lang === "AR" ? "تحليلات" : lang === "FR" ? "Analytics" : "Analytics",
                  color: "#3b82f6",
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                },
                {
                  lbl: lang === "AR" ? "GPS حي" : lang === "FR" ? "GPS Live" : "Live GPS",
                  color: "#10b981",
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>
                },
              ].map(p => (
                <span key={p.lbl} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: p.color, background: isDark ? `${p.color}0D` : `${p.color}12`, border: `1px solid ${p.color}30`, borderRadius: 20, padding: "5px 11px", backdropFilter: "blur(8px)" }}>
                  {p.icon}{p.lbl}
                </span>
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: 14, color: muted, animation: "laUp .5s .32s ease both", position: "relative", top: "15px" }}>
              {t.noAccount}{" "}<a href="/registreagence">{t.register}</a>
            </p>

          </div>
        </div>

        {/* ── IMAGE SIDE ── (order:1 LTR → right, order:0 RTL → left) */}
        <div className="la-img-side">
          <div className="la-img-bg" /><div className="la-img-ov" />

          {/* Orbits */}
          <div className="la-orb-w">
            <div className="la-orb"><div className="la-orb-d" /></div>
            <div className="la-orb la-orb2"><div className="la-orb-d" style={{ background: "#818cf8", boxShadow: "0 0 10px #818cf8" }} /></div>
            <div className="la-orb la-orb3"><div className="la-orb-d" style={{ background: "#f59e0b", boxShadow: "0 0 10px #f59e0b" }} /></div>
          </div>

          {/* Deco cards */}
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

          {/* Car scene */}
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

          {/* Brand + copy */}
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
