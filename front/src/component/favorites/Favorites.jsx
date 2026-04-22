import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logActivity } from "../../utils/activity";

/* ── Mini icons ── */
function MapPinIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
function ZapIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function UsersIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function HeartIcon({ filled = false, size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}
function ArrowLeftIcon({ size = 16 }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
}
function SunIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}
function MoonIcon() {
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
}

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
  --title-gradient: linear-gradient(270deg, #059669, #10b981, #0ea5e9, #059669);
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
  --title-gradient: linear-gradient(270deg, #60a5fa, #a855f7, #f472b6, #60a5fa);
  --accent-color: #60a5fa;
  --btn-text: #060912;
}

body { background: var(--bg-color); color: var(--text-main); position: relative; }

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
}
[data-theme='dark'] .home-noise-bg { opacity: 0.04; }
:root .home-noise-bg { opacity: 0.07; }

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

@keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(0.75);opacity:0.5;} }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
@keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
@keyframes breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6;} 50%{transform:translate(-50%,-50%) scale(1.12);opacity:1;} }
@keyframes spinWheel { 100%{transform:rotate(360deg);} }
@keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
@keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

.nav-wrapper { position: sticky; top: 10px; z-index: 100; margin: 0 20px; transition: all 0.3s ease; }
.nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 5px 20px;background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); animation: fadeUp 0.6s ease-out; }

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

.primary-btnE {
  background: var(--accent-gradient);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 10px 20px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
}
.primary-btnE:hover {
  transform: translateY(-2px);    
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}

.fav-card {
  background:var(--card-bg); border:1px solid var(--card-border); border-radius:24px;
  overflow:hidden; transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1);
}
.fav-card:hover { transform:translateY(-10px); border-color:var(--accent-color); box-shadow:0 24px 48px rgba(0,0,0,0.1); }
.car-img { transition:transform 0.6s cubic-bezier(0.16,1,0.3,1); }
.fav-card:hover .car-img { transform:scale(1.08); }
.gradient-text { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.title-gradient-text { 
    background: var(--title-gradient); 
    background-size: 200% auto;
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
    animation: btnGradientMove 4s linear infinite;
}
  /* === MOBILE === */
  @media (max-width: 768px) {
    html, body { overflow-x: hidden !important; max-width: 100vw !important; }
    * { max-width: 100%; }
    .nav-wrapper { margin: 8px 10px !important; top: 8px !important; }
    .nav-glass { padding: 8px 12px !important; border-radius: 20px !important; }
    .icon-btn { position: static !important; left: auto !important; padding: 8px !important; }
    .fav-card:hover { transform: translateY(-4px) !important; }
    .primary-btnDE { font-size: 14px !important; padding: 14px 20px !important; }

    /* mobile menu */
    .mob-menu-panel { position: fixed; inset: 0; z-index: 9999; display: flex; flex-direction: column; pointer-events: none; }
    .mob-menu-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); pointer-events: all; }
    .mob-menu-sheet { position: absolute; top: 68px; left: 10px; right: 10px; border-radius: 24px; overflow: hidden; pointer-events: all; animation: mobileMenuSlideDown 0.35s cubic-bezier(0.16,1,0.3,1) both; }
    @keyframes mobileMenuSlideDown {
      from { opacity: 0; transform: translateY(-16px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  }
`;

export default function Favorites() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("appTheme") === "dark");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [profileImage] = useState(localStorage.getItem("profileImage") || null);

    const [favoriteCars, setFavoriteCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("appTheme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem("appLang", selectedLang);
    }, [selectedLang]);

    /* Particle Background Logic */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let W, H, id, tt = 0;
        let parts = [];
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; parts = Array.from({ length: 90 }, () => new Particle(W, H)); };
        const loop = () => {
            ctx.clearRect(0, 0, W, H);
            tt += .0025;
            const g1 = ctx.createRadialGradient(W * .22 + Math.sin(tt) * 70, H * .28 + Math.cos(tt * .7) * 45, 0, W * .3, H * .3, W * .52);
            g1.addColorStop(0, isDarkMode ? 'rgba(99,102,241,.07)' : 'rgba(99,102,241,.05)');
            g1.addColorStop(1, 'transparent');
            ctx.globalAlpha = 1; ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
            const g2 = ctx.createRadialGradient(W * .78 + Math.cos(tt * .6) * 55, H * .65 + Math.sin(tt) * 38, 0, W * .68, H * .6, W * .42);
            g2.addColorStop(0, isDarkMode ? 'rgba(16,185,129,.05)' : 'rgba(16,185,129,.04)');
            g2.addColorStop(1, 'transparent');
            ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
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

    /* Load favorites from localStorage + fetch details */
    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem("favoriteCars") || "[]");
        if (ids.length === 0) { setLoading(false); return; }
        fetch(`http://localhost:8080/api/cars`)
            .then(r => r.json())
            .then(all => {
                setFavoriteCars(all.filter(c => ids.includes(c.id)));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const removeFavorite = (carId) => {
        const ids = JSON.parse(localStorage.getItem("favoriteCars") || "[]");
        const updated = ids.filter(id => id !== carId);
        localStorage.setItem("favoriteCars", JSON.stringify(updated));
        setFavoriteCars(prev => prev.filter(c => c.id !== carId));
        logActivity('favorite_remove', { carId });
    };

    const T = {
        title: { FR: "Mes Favoris", EN: "My Favorites", AR: "المفضلة" },
        subtitle: { FR: "Vos voitures sauvegardées", EN: "Your saved cars", AR: "سياراتك المحفوظة" },
        empty: { FR: "Aucun favori pour l'instant", EN: "No favorites yet", AR: "لا توجد مفضلة بعد" },
        emptyDesc: { FR: "Explorez notre flotte et cliquez sur ❤ pour sauvegarder une voiture.", EN: "Browse our fleet and click ❤ to save a car.", AR: "تصفح أسطولنا وانقر على ❤ لحفظ سيارة." },
        browse: { FR: "Explorer la flotte", EN: "Browse Fleet", AR: "تصفح الأسطول" },
        book: { FR: "Louer maintenant", EN: "Book Now", AR: "احجز الآن" },
        remove: { FR: "Retirer", EN: "Remove", AR: "إزالة" },
        back: { FR: "Retour", EN: "Back", AR: "رجوع" },
        day: { FR: "jour", EN: "day", AR: "يوم" },
        seats: { FR: "Sièges", EN: "Seats", AR: "مقاعد" },
        found: { FR: "voiture(s) sauvegardée(s)", EN: "saved car(s)", AR: "سيارة محفوظة" },
        book: { FR: "Louer maintenant", EN: "Book Now", AR: "احجز الآن" },
        perDay: { FR: "/ jour", EN: "/ day", AR: "/ يوم" },
        location: { FR: "Localisation disponible", EN: "Location available", AR: "الموقع متاح" },
        "nav.logout": { FR: "Déconnexion", EN: "Log out", AR: " تسجيل الخروج" },
        "nav.myProfile": { FR: "Mon profil", EN: "My Profile", AR: "ملفي الشخصي" },
        "nav.myReservations": { FR: "Mes Réservations", EN: "My Reservations", AR: "حجوزاتي" },
        "nav.favorites": { FR: "Favoris", EN: "Favorites", AR: "المفضلة" },
    };
    const t = (key) => T[key]?.[selectedLang] || T[key]?.FR || "";

    return (
        <div data-theme={isDarkMode ? "dark" : "light"} style={{ minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>
            <style>{css}</style>

            {/* ── BACKGROUND SYSTEM ── */}
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
                <div className="nav-wrapper" dir="ltr">
                    <nav className="nav-glass" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr", alignItems: "center", width: "100%" }}>
                        {/* Left: Logo */}
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <AnimatedLogo onClick={() => navigate("/homeConnect")} />
                        </div>

                        {/* Center: Lang & Theme — desktop only */}
                        {!isMobile && (
                            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                {/* Lang Switcher */}
                                <div className="lang-menu-wrap" style={{ position: "relative" }}>
                                    <button
                                        className="icon-btn"
                                        style={{
                                            position: "relative",
                                            background: langMenuOpen ? "var(--text-main)" : "transparent",
                                            color: langMenuOpen ? "var(--bg-color)" : "var(--text-main)",
                                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                            left: 0, // Reset previous left offset if any
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
                                            top: "calc(100% + 12px)",
                                            left: "50%",
                                            transform: "translateX(-50%)",
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
                                            {["AR", "FR", "EN"].map(code => (
                                                <button
                                                    key={code}
                                                    onClick={() => { setSelectedLang(code); setLangMenuOpen(false); }}
                                                    style={{
                                                        background: selectedLang === code ? "var(--text-main)" : "transparent",
                                                        color: selectedLang === code ? "var(--bg-color)" : "var(--text-muted)",
                                                        border: "none", borderRadius: "10px", padding: "8px 14px", fontSize: "12px", fontWeight: "800", cursor: "pointer",
                                                        fontFamily: "'Syne', sans-serif", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)"
                                                    }}
                                                    onMouseEnter={e => selectedLang !== code && (e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)")}
                                                    onMouseLeave={e => selectedLang !== code && (e.currentTarget.style.background = "transparent")}
                                                >
                                                    {code}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button className="icon-btn" style={{ left: 0 }} onClick={() => setIsDarkMode(!isDarkMode)}>
                                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                </button>
                            </div>
                        )}

                        {/* Right: User Menu or Mobile Burger */}
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>
                            {isMobile && (
                                <>
                                    <button className="icon-btn" style={{ position: "static", left: "auto" }} onClick={() => setIsDarkMode(!isDarkMode)}>
                                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                                    </button>
                                    <button
                                        className="icon-btn"
                                        style={{ position: "static", left: "auto", background: mobileMenuOpen ? "var(--text-main)" : "transparent", color: mobileMenuOpen ? "var(--bg-color)" : "var(--text-main)" }}
                                        onClick={() => setMobileMenuOpen(p => !p)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {mobileMenuOpen
                                                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                                                : <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="14" x2="20" y2="14" /></>}
                                        </svg>
                                    </button>
                                </>
                            )}
                            {!isMobile && (
                                <div className="login-menu-wrap" style={{ position: "relative" }}>
                                    {currentUser ? (
                                        <div style={{ position: "relative" }}>
                                            <div className="avatar-pill" style={{
                                                display: "inline-flex", alignItems: "center", gap: isMobile ? 8 : 13,
                                                padding: isMobile ? "8px 10px" : "13px 15px", borderRadius: 18,
                                                background: isDarkMode
                                                    ? "rgba(10,8,24,0.9)"
                                                    : "rgba(255,255,255,0.95)",
                                                border: `2px solid ${isDarkMode ? "rgba(150, 62, 231, 0.4)" : "rgba(114, 250, 2, 0.93)"}`,
                                                cursor: "pointer", position: "relative", overflow: "hidden",
                                                boxShadow: isDarkMode
                                                    ? "0 0 0 1px rgba(168,85,247,0.1), 0 8px 32px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.08)"
                                                    : "0 0 0 1px rgba(43, 233, 68, 0.58), 0 8px 32px rgba(18, 180, 39, 0.43), 0 4px 16px rgba(248, 248, 248, 0.06)",
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
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu sheet */}
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
                                            {localStorage.getItem("profileImage") ? <img src={localStorage.getItem("profileImage")} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : currentUser.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-main)" }}>{currentUser.name || currentUser.email.split("@")[0]}</div>
                                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{currentUser.email}</div>
                                        </div>
                                    </div>
                                )}
                                {[{ label: "Vehicles", path: "/homeConnect" }, { label: "Favoris", path: "/favorites" }, { label: "Profil", path: "/profile" }].map(item => (
                                    <div key={item.path} onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "var(--text-main)", cursor: "pointer", borderBottom: "1px solid rgba(128,128,128,0.07)" }}>
                                        {item.label}
                                    </div>
                                ))}
                                {currentUser && (
                                    <div onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("user"); setMobileMenuOpen(false); navigate("/"); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "#ef4444", cursor: "pointer" }}>
                                        {t("nav.logout")}
                                    </div>
                                )}
                                {!currentUser && (
                                    <div onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                                        style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "var(--accent-color)", cursor: "pointer" }}>
                                        Se connecter
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ══ BACK BUTTON ALIGNED WITH LOGO ══ */}

                {/* ── CONTENT ── */}
                <div style={{ width: "100%", padding: isMobile ? "0 16px 80px" : "0 0 100px", position: "relative", zIndex: 1 }}>

                    {/* Header */}
                    {!loading && favoriteCars.length > 0 && (
                        <div style={{ marginBottom: 99, animation: "fadeUp 0.6s ease both", textAlign: "center", position: "relative", top: "45px" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                background: "var(--card-bg)", border: "1px solid rgba(239,68,68,0.25)",
                                borderRadius: 20, padding: "6px 16px", marginBottom: 16,
                            }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite" }} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>
                                    {favoriteCars.length} {t("found")}
                                </span>
                            </div>
                            <h1 className="title-gradient-text" style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 900, letterSpacing: -1 }}>
                                {t("title")}
                            </h1>
                            <p style={{ color: "var(--text-muted)", fontSize: 16, marginTop: 8 }}>{t("subtitle")}</p>
                        </div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid var(--card-border)", borderTopColor: "var(--accent-color)", animation: "spinWheel 0.8s linear infinite" }} />
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && favoriteCars.length === 0 && (
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            minHeight: 744, textAlign: "center", animation: "fadeUp 0.6s ease both",
                        }}>
                            <div style={{ fontSize: 80, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>❤️</div>
                            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text-main)", marginBottom: 12 }}>
                                {t("empty")}
                            </h2>
                            <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 380, lineHeight: 1.6, marginBottom: 32 }}>
                                {t("emptyDesc")}
                            </p>
                            <button
                                className="primary-btnDE"
                                style={{ padding: "14px 32px", fontSize: 16 }}
                                onClick={() => navigate("/homeConnect")}
                            >
                                {t("browse")}
                            </button>
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && favoriteCars.length > 0 && (
                        <div style={{
                            maxWidth: 1820,
                            margin: isMobile ? "0 auto" : "0 46px",
                            padding: isMobile ? "0" : "0"
                        }}>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
                                gap: isMobile ? 20 : 32,
                            }}>
                                {favoriteCars.map((car, idx) => (
                                    <div key={car.id || idx} style={{
                                        background: "var(--card-bg)",
                                        borderRadius: 32,
                                        border: "1px solid var(--card-border)",
                                        overflow: "hidden",
                                        transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
                                        cursor: "pointer",
                                        animation: `fadeUp 0.6s ${0.2 + idx * 0.1}s ease both`
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                                            e.currentTarget.style.borderColor = "var(--accent-color)";
                                            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = "none";
                                            e.currentTarget.style.borderColor = "var(--card-border)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}>

                                        <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
                                            <img
                                                src={car.photos && car.photos.length > 0 ? car.photos[0] : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"}
                                                alt={car.name}
                                                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                                                className="car-img"
                                            />
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />

                                            {/* ❤ Remove Toggle button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFavorite(car.id); }}
                                                title={t("remove")}
                                                style={{
                                                    position: "absolute", top: 16, left: 16,
                                                    width: 42, height: 42, borderRadius: "14px",
                                                    background: "rgba(255,255,255,0.1)",
                                                    backdropFilter: "blur(12px)",
                                                    border: "1px solid rgba(255,255,255,0.2)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    cursor: "pointer",
                                                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.2)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
                                            >
                                                <HeartIcon filled size={20} />
                                            </button>

                                            {/* Category badge */}
                                            <div style={{
                                                position: "absolute", top: 16, right: 16,
                                                background: "var(--accent-gradient)",
                                                color: "#fff", padding: "6px 14px", borderRadius: 12,
                                                fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em",
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                                backdropFilter: "blur(4px)"
                                            }}>
                                                {car.category}
                                            </div>
                                        </div>

                                        <div style={{ padding: isMobile ? 20 : 32, textAlign: selectedLang === "AR" ? "right" : "left" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 16 : 24 }}>
                                                <div style={{ minWidth: 0, flex: 1, paddingRight: 12 }}>
                                                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? 18 : 24, fontWeight: 900, color: "var(--text-main)", marginBottom: 8, letterSpacing: "-0.5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{car.name}</h3>
                                                    <div style={{ fontSize: 14, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8, justifyContent: selectedLang === "AR" ? "flex-end" : "flex-start" }}>
                                                        <MapPinIcon size={14} color="var(--accent-color)" /> {car.plate || t("location")}
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: selectedLang === "AR" ? "left" : "right" }}>
                                                    <div style={{ fontSize: 28, fontWeight: 900, color: "var(--accent-color)", fontFamily: "'Syne',sans-serif", letterSpacing: "-1px", lineHeight: 1 }}>
                                                        {car.prix || car.price}
                                                        <span style={{ fontSize: 13, marginLeft: 4 }}>MAD</span>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, marginTop: 4 }}>{t("perDay")}</div>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
                                                marginBottom: 32, borderTop: "1px solid var(--card-border)", paddingTop: 24
                                            }}>
                                                <div style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 10, color: "var(--text-main)", fontWeight: 600, justifyContent: selectedLang === "AR" ? "flex-end" : "flex-start" }}>
                                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <ZapIcon size={16} color="var(--accent-color)" />
                                                    </div>
                                                    {car.fuel}
                                                </div>
                                                <div style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 10, color: "var(--text-main)", fontWeight: 600, justifyContent: selectedLang === "AR" ? "flex-end" : "flex-start" }}>
                                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <UsersIcon size={16} color="var(--accent-color)" />
                                                    </div>
                                                    {car.seats} {t("seats")}
                                                </div>
                                            </div>

                                            <button
                                                className="primary-btnDE"
                                                style={{
                                                    width: "100%", padding: isMobile ? "14px" : "18px", borderRadius: 20, fontSize: isMobile ? 14 : 16,
                                                    fontWeight: 800, textTransform: "uppercase", letterSpacing: isMobile ? "0.5px" : "1px",
                                                    boxShadow: "0 10px 25px rgba(59,130,246,0.3)"
                                                }}
                                                onClick={() => {
                                                    logActivity('booking', {
                                                        carId: car.id,
                                                        carName: car.name,
                                                        price: car.prix || car.price,
                                                        image: car.photos && car.photos.length > 0 ? car.photos[0] : ""
                                                    });
                                                    alert(selectedLang === "AR" ? "تم تسجيل الحجز!" : "Réservation enregistrée !");
                                                }}
                                            >
                                                {t("book")}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}