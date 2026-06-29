import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImageDark from "../../asset/image.png";
import bgImageLight from "../../asset/image123.png";
import { AR } from "../login/ar.js";
import { FR } from "../login/fr.js";

function GlobeIcon({ size = 24, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function ZapIcon({ size = 24, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function ShieldIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function MapPinIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
function ArrowRightIcon({ size = 16, color = "currentColor" }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}
function AnimatedLogo({ onClick, showText = true }) {
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
            {showText && (
                <div style={{ position: 'relative', fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 32, letterSpacing: "-0.5px", margin: 0 }}>
                    <span style={{ color: "#1e293b" }}>Upp</span>
                    <span style={{ color: "#3b82f6" }}>Car</span>
                    <span style={{ position: 'absolute', bottom: 8, right: -14, width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', animation: 'blink 2s infinite' }} />
                </div>
            )}
        </div>
    );
}
function SunIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}
function MoonIcon() {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
}
function LanguageIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
        </svg>
    );
}

export default function Loginadmin() {
    const navigate = useNavigate();
    const cardRef = React.useRef(null);

    const isDarkMode = true;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [focused, setFocused] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    const handleTilt = (e) => {
        if (!cardRef.current || window.innerWidth < 768) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        cardRef.current.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        cardRef.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        cardRef.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    const resetTilt = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
    };

    //////
    /* class Particle {
      constructor(W, H) { this.W = W; this.H = H; this.reset(); }
      reset() { this.x = Math.random() * this.W; this.y = Math.random() * this.H; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.r = Math.random() * 1.5 + 0.5; this.alpha = Math.random() * 0.5 + 0.2; const colors = ["#6366f1", "#3b82f6", "#38bdf8", "#a78bfa", "#34d399"]; this.color = colors[Math.floor(Math.random() * colors.length)]; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) this.reset(); }
    } */
    const [isMobile, setIsMobile] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");
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
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("appTheme", "dark");

        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
        localStorage.setItem("appLang", selectedLang);
    }, [selectedLang]);

    // Fermer si clic dehors
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest(".login-menu-wrap")) setMenuOpen(false);
            if (!e.target.closest(".lang-menu-wrap")) setLangMenuOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        setLoading(true);
        setError("");

        try {
            // Délai artificiel de 4 secondes avant d'exécuter la requête
            await new Promise(resolve => setTimeout(resolve, 4000));

            const response = await fetch(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}`}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.accessToken);        // ✅ clé attendue par PrivateRoute
                localStorage.setItem("role", "user");                   // ✅ rôle attendu par PrivateRoute
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                setLoading(false);
                setDone(true);
                localStorage.setItem('role', 'admin');
                setTimeout(() => navigate('/homeadmin'), 2000);
            } else {
                setLoading(false);
                setError(t("login.errorCreds", "Email or password incorrect"));
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            setError("Erreur de connexion au serveur backend");
        }
    };



    return (
        <div style={{
            height: "100dvh",
            width: "100%",
            display: "flex", flexDirection: "column",
            background: `url(${isDarkMode ? bgImageDark : bgImageLight}) center/cover no-repeat fixed`,
            fontFamily: "'DM Sans', sans-serif",
            position: "fixed",
            top: 0, left: 0,
            overflowY: "auto",
            overflowX: "hidden"
        }}>

            <div style={{
                position: "absolute", inset: 0,
                background: isDarkMode ? "linear-gradient(135deg, rgba(6, 9, 18, 0.5), rgba(6, 9, 18, 0.15))" : "linear-gradient(135deg, rgba(240, 253, 244, 0.15), rgba(240, 253, 244, 0.05))",
                zIndex: 0, pointerEvents: "none"
            }} />

            {/* TOP LOGO (SAME AS HOME) */}
            <div style={{ position: "absolute", top: 30, left: 30, zIndex: 100 }}>
                <AnimatedLogo onClick={() => navigate("/")} showText={true} />
            </div>


            {/* CENTERED LOGIN BARRE */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: 20, position: "relative", zIndex: 10 }}>

                <style>{`
                    html, body {
                        background-color: var(--bg-color) !important;
                        overscroll-behavior: none !important;
                        margin: 0;
                        padding: 0;
                    }
                    :root {
                      --bg-color: #f0fdf4;
                      --text-main: #064e3b;
                      --text-muted: #166534;
                      --nav-bg: rgba(255, 255, 255, 0.6);
                      --nav-border: rgba(6, 78, 59, 0.1);
                      --card-bg: rgba(255, 255, 255, 0.8);
                      --card-border: rgba(6, 78, 59, 0.1);
                      --accent-gradient: linear-gradient(135deg, #047857 0%, #10b981 50%, #0ea5e9 100%);
                      --accent-color: #10b981;
                      --btn-text: #ffffff;
                      --text-miin: #064e06ff;
                      --bg-coloor: #ffffffff;
                    }
                    [data-theme='dark'] {
                      --bg-color: #060912;
                      --text-main: #e6edf3;
                      --text-muted: #9ca3af;
                      --nav-bg: rgba(10, 14, 26, 0.7);
                      --nav-border: rgba(255, 255, 255, 0.06);
                      --card-bg: rgba(255, 255, 255, 0.03);
                      --card-border: rgba(255, 255, 255, 0.07);
                      --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
                      --accent-color: #60a5fa;
                      --btn-text: #060912;
                      --text-miin: #072d75ff;
                      --bg-coloor: #060912;
                      

                    }
                   .nav-wrapper { position: relative; z-index: 100; margin: 9px 20px; transition: all 0.3s ease; }
                    .nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); animation: fadeUp 0.6s ease-out; }
                    .nav-link { position: relative; color: var(--text-muted); text-decoration: none; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; padding: 8px 16px; border-radius: 12px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); overflow: hidden; }
                    .nav-link::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--text-main); opacity:0; z-index:-1; transition:opacity 0.3s ease; border-radius:12px; }
                    .nav-link:hover { color:var(--bg-color); transform:translateY(-2px); }
                    .nav-link:hover::before { opacity:1; }
                    .icon-btn { background:rgba(255,255,255,0.05); border:1px solid var(--nav-border); color:var(--text-main); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1);position:relative; }
                    .icon-btn:hover { background:var(--text-main); color:var(--bg-color); transform:scale(1.1) rotate(5deg); box-shadow:0 4px 12px rgba(0,0,0,0.1); }
                    .primary-btnDE { position:relative; background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 100%); background-size:200% 200%; color:#ffffff; border:none; border-radius:16px; font-family:'Syne',sans-serif; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; letter-spacing:0.3px; overflow:hidden; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); animation:btnGradientMove 4s ease infinite; box-shadow:0 0 0 1px rgba(37,99,235,0.3),0 4px 15px rgba(37,99,235,0.3),0 0 40px rgba(14,165,233,0.15); font-family: 'DM Sans', 'Syne', sans-serif; }
                    .primary-btnDE::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.25) 50%,transparent 100%); animation:shineSweep 3s ease-in-out infinite; pointer-events:none; }
                    .primary-btnDE::after { content:''; position:absolute; inset:-3px; border-radius:19px; background:var(--accent-gradient); background-size:300% 300%; z-index:-1; opacity:0.6; filter:blur(6px); animation:btnGradientMove 4s ease infinite; }
                    .primary-btnDE:hover { transform:translateY(-1px) scale(1.01); box-shadow:0 0 0 1px rgba(14,165,233,0.5),0 8px 30px rgba(37,99,235,0.5),0 0 60px rgba(14,165,233,0.3); }
                    .secondary-btn { background:transparent; color:var(--text-main); border:1px solid var(--card-border); padding:14px 28px; border-radius:16px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:10px; }
                    .secondary-btn:hover { background:var(--text-main); color:var(--bg-color); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
                    .primary-btnE { color:#ffffff; border:none; padding:10.5px 30px; border-radius:12px; font-family:'Syne',sans-serif; font-size:15.3px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:8px; backdrop-filter:blur(4px); background:var(--text-miin); }
                    .primary-btnE:hover { background:var(--accent-gradient); color:white; transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.1); border:none; }
                    [data-theme='dark'] .primary-btnE { background:linear-gradient(155deg,#1e3a8a,#1d4ed8); box-shadow:0px 0px 15px #1e3a8a; }
                    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes spin { to { transform: rotate(360deg); } }
                    @keyframes checkPop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
                    @keyframes spinWheel { 100%{transform:rotate(360deg);} }
                    @keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
                    @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
                    @keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
                    @keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
                    .inp-focus { border-color: ${isDarkMode ? "rgba(96,165,250,0.6)" : "rgba(16,185,129,0.5)"} !important; box-shadow: 0 0 0 3px ${isDarkMode ? "rgba(96,165,250,0.15)" : "rgba(16,185,129,0.1)"}; background: ${isDarkMode ? "rgba(96,165,250,0.04)" : "rgba(16,185,129,0.04)"} !important; }
                    .sv-social:hover { transform: translateY(-3px); background: ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"} !important; }
                    .btn-login:hover { transform: translateY(-3px); box-shadow: 0 12px 30px ${isDarkMode ? "rgba(59,130,246,0.3)" : "rgba(16,185,129,0.3)"}; }
                    @keyframes glowEmail {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(96,165,250,0.15), 0 0 24px 4px rgba(96,165,250,0.08); }
  50% { box-shadow: 0 0 16px 4px rgba(96,165,250,0.3), 0 0 40px 8px rgba(96,165,250,0.15); }    
}
@keyframes glowEmailLight {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(16,185,129,0.15), 0 0 24px 4px rgba(16,185,129,0.08); }
  50% { box-shadow: 0 0 16px 4px rgba(16,185,129,0.3), 0 0 40px 8px rgba(16,185,129,0.15); }
}
@keyframes glowPass {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(99,102,241,0.15), 0 0 24px 4px rgba(99,102,241,0.08); }
  50% { box-shadow: 0 0 16px 4px rgba(99,102,241,0.3), 0 0 40px 8px rgba(99,102,241,0.15); }
}
@keyframes glowPassLight {
  0%, 100% { box-shadow: 0 0 8px 2px rgba(5,150,105,0.15), 0 0 24px 4px rgba(5,150,105,0.08); }
  50% { box-shadow: 0 0 16px 4px rgba(5,150,105,0.3), 0 0 40px 8px rgba(5,150,105,0.15); }
}
@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
}
.card-perspective {
    perspective: 2000px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 10;
}
.card-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(96, 165, 250, 0.08) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 80%);
  pointer-events: none;
  z-index: 1;
}
.login-card-3d {
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
}
                `}</style>

                <div className="card-perspective">
                    <div
                        ref={cardRef}
                        onMouseMove={handleTilt}
                        onMouseLeave={resetTilt}
                        className="login-card-3d"
                        style={{
                            width: "100%", maxWidth: 440,
                            backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
                            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.1)"}`,
                            borderRadius: 32, padding: "35px 40px",
                            boxShadow: isDarkMode ? "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 24px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
                            animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                            position: "relative",
                            left: selectedLang === "AR" ? "20px" : "-20px",
                            overflow: "hidden"
                        }}
                    >
                        <div className="card-glow" />
                        {done ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                                <div style={{ width: 72, height: 72, borderRadius: "50%", background: isDarkMode ? "linear-gradient(135deg, #2563eb, #60a5fa)" : "linear-gradient(135deg, #059669, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: isDarkMode ? "0 8px 30px rgba(59,130,246,0.4)" : "0 8px 30px rgba(16,185,129,0.4)" }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 900, color: isDarkMode ? "#e6edf3" : "#064e3b" }}>{t("login.successTitle", "Bienvenue !")}</h2>
                                <p style={{ color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", fontSize: 15 }}>{t("login.successText", "Connexion réussie. Redirection en cours…")}</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ height: 20 }} />
                                {/* Badge */}
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: isDarkMode ? "rgba(96,165,250,0.1)" : "rgba(16,185,129,0.1)", color: isDarkMode ? "#60a5fa" : "#10b981", border: `1px solid ${isDarkMode ? "rgba(96,165,250,0.2)" : "rgba(16,185,129,0.2)"}`, borderRadius: 30, padding: "6px 16px", marginBottom: 32, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", position: "relative", left: selectedLang === "AR" ? "auto" : (isMobile ? "79px" : "130px"), right: selectedLang === "AR" ? (isMobile ? "80px" : "155px") : "auto", top: 7 }}>
                                    <span style={{ width: 6.5, height: 6.5, borderRadius: "50%", background: isDarkMode ? "#60a5fa" : "#10b981", boxShadow: `0 0 8px ${isDarkMode ? "#60a5fa" : "#10b981"}` }} /> {selectedLang === "AR" ? "فضاء المسؤولين" : "Espace Admin"}
                                </div>



                                <h2 style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: 32,
                                    fontWeight: 900,
                                    letterSpacing: "-1px",
                                    position: "relative",
                                    bottom: 17,
                                    textAlign: "center",
                                    ...(isDarkMode ? {
                                        background: "linear-gradient(90deg, #e6edf3 0%, #478de2ff 50%, #c9e2f8ff 100%)",
                                        backgroundSize: "200% auto",
                                        animation: "btnGradientMove 4s linear infinite",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                        width: "100%",
                                    } : {
                                        color: "#10b981",
                                    })
                                }}>
                                    {t("login.title", "Welcome Back!")}
                                </h2>
                                <p style={{ color: isDarkMode ? "#9ca3af" : "#166534", fontSize: 22, lineHeight: 1.5, position: "relative", bottom: 29, textAlign: "center" }}> {t("login.subtitle", "Log in to your account to continue.")}</p>



                                <form onSubmit={handleSubmit}>
                                    {/* EMAIL */}
                                    <div style={{ marginBottom: 24, position: "relative", bottom: 12 }}>
                                        <label style={{
                                            display: "block", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em",
                                            textTransform: "uppercase", marginBottom: 8, transition: "color 0.3s",
                                            color: isDarkMode ? "#9ca3af" : "#166534"
                                        }}>{t("login.emailLabel", "E-mail address")}</label>
                                        <div style={{
                                            display: "flex", alignItems: "center",
                                            background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                                            border: `1.5px solid ${isDarkMode ? "#60a5fa" : "#10b981"}`,
                                            borderRadius: 16, height: 58, padding: "0 18px", gap: 12,
                                            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",

                                            boxShadow: isDarkMode
                                                ? "0 0 0 4px rgba(96,165,250,0.15), 0 8px 24px rgba(96,165,250,0.2)"
                                                : "0 0 0 4px rgba(16,185,129,0.12), 0 8px 24px rgba(16,185,129,0.18)",
                                            backdropFilter: "blur(8px)",

                                        }}
                                            onMouseEnter={e => {
                                                if (focused !== "email") {
                                                    e.currentTarget.style.transform = "translateY(-1px)";
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (focused !== "email") {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                }
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                stroke={focused === "email" ? (isDarkMode ? "#60a5fa" : "#10b981") : (isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(16,185,129,0.5)")}
                                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                style={{ transition: "stroke 0.3s", flexShrink: 0 }}>
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                            <input
                                                type="email" placeholder={t("login.emailPlaceholder", "Your Email")}
                                                value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                                                onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                                                style={{
                                                    width: "100%", background: "transparent", border: "none", outline: "none",
                                                    color: isDarkMode ? "#e6edf3" : "#064e3b",
                                                    fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 500,
                                                }}
                                            />
                                            {email && (
                                                <div style={{
                                                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                                                    background: isDarkMode ? "rgba(96,165,250,0.15)" : "rgba(16,185,129,0.15)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    animation: "checkPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                }}>
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                                        stroke={isDarkMode ? "#60a5fa" : "#10b981"} strokeWidth="3"
                                                        strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    <div style={{ marginBottom: 32, position: "relative", bottom: 12 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                        </div>
                                        <div style={{ marginBottom: 32, position: "relative", bottom: 9 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                <label style={{
                                                    display: "block", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em",
                                                    textTransform: "uppercase", transition: "color 0.3s",
                                                    color: isDarkMode ? "#9ca3af" : "#166534"
                                                }}>{t("login.passLabel", "Password")}</label>
                                            </div>
                                            <div style={{
                                                display: "flex", alignItems: "center",
                                                background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                                                border: `1.5px solid ${isDarkMode ? "#60a5fa" : "#10b981"}`,
                                                borderRadius: 16, height: 58, padding: "0 18px", gap: 12,
                                                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                                boxShadow: isDarkMode
                                                    ? "0 0 0 4px rgba(96,165,250,0.15), 0 8px 24px rgba(96,165,250,0.2)"
                                                    : "0 0 0 4px rgba(16,185,129,0.12), 0 8px 24px rgba(16,185,129,0.18)",
                                                backdropFilter: "blur(8px)",
                                            }}
                                                onMouseEnter={e => {
                                                    if (focused !== "pass") {
                                                        e.currentTarget.style.transform = "translateY(-1px)";
                                                    }
                                                }}
                                                onMouseLeave={e => {
                                                    if (focused !== "pass") {
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                    }
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                    stroke={focused === "pass" ? (isDarkMode ? "#60a5fa" : "#10b981") : (isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(16,185,129,0.5)")}
                                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                    style={{ transition: "stroke 0.3s", flexShrink: 0 }}>
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                <input
                                                    type={showPass ? "password" : "text"} placeholder={t("login.passPlaceholder", "Password")}
                                                    value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
                                                    onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
                                                    style={{
                                                        width: "100%", background: "transparent", border: "none", outline: "none",
                                                        color: isDarkMode ? "#e6edf3" : "#064e3b",
                                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 500,
                                                    }}
                                                />
                                                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                                                    background: "none", border: "none", cursor: "pointer", flexShrink: 0,
                                                    color: isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(16,185,129,0.6)",
                                                    transition: "color 0.2s, transform 0.2s",
                                                    padding: 4, borderRadius: 8,
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.color = isDarkMode ? "#60a5fa" : "#10b981"; e.currentTarget.style.transform = "scale(1.1)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.color = isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(16,185,129,0.6)"; e.currentTarget.style.transform = "scale(1)"; }}
                                                >
                                                    {showPass ?
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                        :
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        {/* Message d'erreur personnalisé */}
                                        {error && (
                                            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, color: "#ef4444", fontSize: 17, fontWeight: 700, animation: "fadeUp 0.2s ease", position: "relative", bottom: 20, marginBottom: 14 }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                                {error}
                                            </div>
                                        )}
                                        <div style={{ display: "flex", justifySelf: selectedLang === "AR" ? "end" : "start", justifyContent: selectedLang === "AR" ? "flex-end" : "flex-start", position: "relative", bottom: 20 }}>
                                            <a href="#" style={{ fontSize: 17, color: isDarkMode ? "#60a5fa" : "#10b981", fontWeight: 700, textDecoration: "none", transition: "opacity 0.2s" }}
                                                onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
                                                onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                                                {t("login.forgotPass", "Forgot Password ?")}
                                            </a>
                                        </div>
                                    </div>

                                    <button type="submit" className="primary-btnE" disabled={loading || !email || !password} style={{
                                        width: "100%", height: 58, borderRadius: 16, border: "none", cursor: (!email || !password || loading) ? "not-allowed" : "pointer",
                                        color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: "0.05em",
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                        position: "relative", bottom: 36

                                    }}>
                                        {loading ? <> <div style={{ width: 22, height: 22, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> {t("login.loading", "Connexion en cours...")} </> : <>{t("login.submitBtn", "Sign In")} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></>}
                                    </button>
                                </form>

                                <div style={{ textAlign: "center", fontSize: 14, color: isDarkMode ? "#b3b7beff" : "#166534", position: "relative", bottom: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                                    <div style={{ animation: "driveBumps 2s ease-in-out infinite" }}>
                                        <ShieldIcon size={18} color={isDarkMode ? "#60a5fa" : "#10b981"} />
                                    </div>
                                    <span style={{ fontWeight: 600 }}>
                                        {selectedLang === "AR" ? "مدخل آمن للمسؤولين فقط" : "Accès sécurisé réservé aux administrateurs"}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
