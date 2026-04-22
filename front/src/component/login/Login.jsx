import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImageDark from "../../asset/image.png";
import bgImageLight from "../../asset/image123.png";
import { useGoogleLogin } from '@react-oauth/google';
import { AR } from "./ar.js";
import { FR } from "./fr.js";
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
export default function LoginUser() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("appTheme") === "dark");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [focused, setFocused] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    //////

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
        const theme = isDarkMode ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("appTheme", theme);

        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
        localStorage.setItem("appLang", selectedLang);
    }, [isDarkMode, selectedLang]);

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

            const response = await fetch("http://localhost:8080/api/auth/login", {
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
                setTimeout(() => navigate('/homeConnect'), 2000);
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

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: tokenResponse.access_token })
                });
                const data = await res.json();
                localStorage.setItem("token", data.accessToken);        // ✅ clé attendue par PrivateRoute
                localStorage.setItem("role", "user");                   // ✅ rôle attendu par PrivateRoute
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/homeConnect");
            } catch (error) {
                console.error("Erreur Google", error);
            }
        },
        onError: () => console.log("Erreur Google login")
    });

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

            {!isMobile && (
                <div className="nav-wrapper" onMouseLeave={() => setActiveDropdown(null)}>
                    <nav className="nav-glass">
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                            <AnimatedLogo onClick={() => navigate("/")} />
                        </div>

                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', position: "relative", left: selectedLang === "AR" ? "8px" : "1px" }}>
                            <div className="lang-menu-wrap" style={{ position: "relative" }}>
                                <button
                                    className="icon-btn"
                                    style={{
                                        background: langMenuOpen ? "var(--text-main)" : "rgba(255,255,255,0.05)",
                                        color: langMenuOpen ? "var(--bg-color)" : "var(--text-main)",
                                        width: 42, height: 42, padding: 0,
                                    }}
                                    onClick={() => setLangMenuOpen(p => !p)}
                                >
                                    <div style={{
                                        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        transform: langMenuOpen ? "rotate(-180deg)" : "rotate(0deg)"
                                    }}>
                                        <LanguageIcon />
                                    </div>
                                    <span style={{
                                        position: "absolute", top: -6, right: -6,
                                        background: "#60a5fa", color: "#fff",
                                        fontSize: 10, fontWeight: 900, padding: "3px 6px", borderRadius: 8,
                                        lineHeight: 1, boxShadow: "0 2px 10px rgba(96,165,250,0.4)",
                                        pointerEvents: "none", textTransform: "uppercase",
                                        border: "2px solid var(--bg-color)"
                                    }}>{selectedLang}</span>
                                </button>

                                {langMenuOpen && (
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "calc(100% + 14px)",
                                        transform: "translateY(-50%)",
                                        display: "flex",
                                        flexDirection: "row",
                                        background: isDarkMode ? "rgba(10, 14, 26, 0.85)" : "rgba(255, 255, 255, 0.9)",
                                        borderRadius: "40px",
                                        padding: "6px",
                                        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.15)"}`,
                                        gap: "6px",
                                        alignItems: "center",
                                        boxShadow: isDarkMode ? "0 10px 40px rgba(0,0,0,0.5)" : "0 10px 30px rgba(16,185,129,0.1)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        zIndex: 1000,
                                        whiteSpace: "nowrap"
                                    }}>
                                        {[
                                            { code: "AR", label: "العربية" },
                                            { code: "FR", label: "FRANÇAIS" },
                                            { code: "EN", label: "ENGLISH" }
                                        ].map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setSelectedLang(lang.code); setLangMenuOpen(false); }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "8px",
                                                    background: selectedLang === lang.code
                                                        ? (isDarkMode ? "#eef2ff" : "var(--text-main)")
                                                        : "transparent",
                                                    color: selectedLang === lang.code
                                                        ? (isDarkMode ? "#1e1b4b" : "#fff")
                                                        : (isDarkMode ? "rgba(255,255,255,0.6)" : "var(--text-muted)"),
                                                    border: "none", borderRadius: "30px", padding: "10px 22px",
                                                    fontSize: "12px", fontWeight: "900", cursor: "pointer",
                                                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                                                    fontFamily: "'Syne', sans-serif",
                                                    letterSpacing: "0.05em"
                                                }}
                                                onMouseEnter={e => {
                                                    if (selectedLang !== lang.code) {
                                                        e.currentTarget.style.color = isDarkMode ? "#fff" : "var(--text-main)";
                                                        e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(16,185,129,0.08)";
                                                    }
                                                }}
                                                onMouseLeave={e => {
                                                    if (selectedLang !== lang.code) {
                                                        e.currentTarget.style.color = isDarkMode ? "rgba(255,255,255,0.6)" : "var(--text-muted)";
                                                        e.currentTarget.style.background = "transparent";
                                                    }
                                                }}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                                {isDarkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: isMobile ? 8 : 12 }}>
                            {!isMobile && <div style={{ width: 1, height: 24, background: "var(--nav-border)", margin: "0 4px" }} />}
                            <div className="login-menu-wrap" style={{ position: "relative" }}>
                                <button
                                    className="primary-btnE"
                                    style={isMobile ? { padding: "8px 14px", fontSize: 13 } : {}}
                                    onClick={() => setMenuOpen(p => !p)}
                                >
                                    {t("nav.loginBtn", "Sign In")}
                                    <svg style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)", transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>

                                <div style={{
                                    position: "absolute", top: "calc(100% + 14px)", left: "40%",
                                    transform: menuOpen ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-12px) scale(0.95)",
                                    opacity: menuOpen ? 1 : 0,
                                    visibility: menuOpen ? "visible" : "hidden",
                                    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                    width:
                                        selectedLang === "AR"
                                            ? 246
                                            : selectedLang === "FR"
                                                ? 254
                                                : 248, // EN par exemple
                                    borderRadius: 24, overflow: "hidden",
                                    background: isDarkMode
                                        ? "linear-gradient(145deg, rgba(12,14,26,0.98), rgba(7,9,18,0.99))"
                                        : "rgba(255,255,255,0.98)",
                                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(6,78,59,0.1)"}`,
                                    boxShadow: isDarkMode
                                        ? "0 0 0 2px rgba(96,165,250,0.2), 0 4px 20px rgba(96,165,250,0.15), 0 0 40px rgba(96,165,250,0.08)"
                                        : "0 0 0 2px rgba(16,185,129,0.2), 0 4px 20px rgba(16,185,129,0.15), 0 0 40px rgba(16,185,129,0.08)",
                                    zIndex: 999,
                                    left:
                                        selectedLang === "AR"
                                            ? "81px"
                                            : selectedLang === "FR"
                                                ? "91px"
                                                : "50px", // EN

                                }}>

                                    {/* Glow line top */}
                                    <div style={{
                                        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                                        background: `linear-gradient(90deg, transparent, ${isDarkMode ? "rgba(96,165,250,0.6)" : "rgba(16,185,129,0.6)"}, transparent)`,
                                    }} />

                                    {[
                                        {
                                            label: t("nav.client", "Client"), desc: t("nav.clientDesc", "Louer un véhicule"),
                                            color: isDarkMode ? "#60a5fa" : "#10b981",
                                            glow: isDarkMode ? "rgba(96,165,250,0.12)" : "rgba(16,185,129,0.08)",
                                            badge: null,
                                            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,

                                        },
                                        {
                                            label: t("nav.agency", "Agence de location"), desc: t("nav.agencyDesc", "Gérer ma flotte"),
                                            color: isDarkMode ? "#a855f7" : "#047857",
                                            glow: isDarkMode ? "rgba(168,85,247,0.12)" : "rgba(4,120,87,0.08)",
                                            badge: "Pro",
                                            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "currentColor" : "red"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><path d="M8 7V5a2 2 0 0 0-4 0v2" /></svg>,
                                        },
                                    ].map(({ label, desc, color, glow, badge, icon }, i) => (
                                        <div key={label} style={{
                                            padding: "12px 15px", cursor: "pointer",
                                            display: "flex", alignItems: "center", gap: 14,
                                            borderBottom: i === 0 ? `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.06)"}` : "none",
                                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                            position: "relative",
                                        }}
                                            onClick={() => {
                                                if (label === "Client") navigate("/login");
                                                if (label === t("nav.agency", "Agence de location")) navigate("/loginagence");
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = glow;
                                                e.currentTarget.style.transform = "translateX(1px)";
                                                const ico = e.currentTarget.querySelector(".mico");
                                                ico.style.background = `${color}25`;
                                                ico.style.borderColor = `${color}50`;
                                                ico.style.boxShadow = `0 0 16px ${color}30`;
                                                ico.style.transform = "scale(1.01) rotate(-4deg)";
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = "transparent";
                                                e.currentTarget.style.transform = "none";
                                                const ico = e.currentTarget.querySelector(".mico");
                                                ico.style.background = `${color}10`;
                                                ico.style.borderColor = `${color}25`;
                                                ico.style.boxShadow = "none";
                                                ico.style.transform = "none";
                                            }}
                                        >
                                            <div className="mico" style={{
                                                width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                background: `${color}10`, border: `1px solid ${color}25`, color,
                                                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                            }}>
                                                {icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: "var(--text-main)", marginBottom: 2 }}>{label}</div>
                                                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans',sans-serif" }}>{desc}</div>
                                            </div>
                                            {badge && (
                                                <div style={{
                                                    padding: "2px 8px", borderRadius: 6,
                                                    fontSize: 9, fontWeight: 800, letterSpacing: "0.1em",
                                                    background: "linear-gradient(135deg, #a855f7, #6366f1)", color: "#fff",
                                                    animation: "pulse 2s ease-in-out infinite",
                                                }}>{badge}</div>
                                            )}
                                            <svg style={{ color: "var(--text-muted)", flexShrink: 0, transition: "all 0.3s" }}
                                                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )}

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
                `}</style>

                <div style={{
                    width: "100%", maxWidth: 440,
                    backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.1)"}`,
                    borderRadius: 32, padding: "35px 40px",
                    boxShadow: isDarkMode ? "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 24px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
                    animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    position: "relative",
                    left: selectedLang === "AR" ? "20px" : "-20px"

                }}>
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
                            {!isMobile && (
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: isDarkMode ? "rgba(96,165,250,0.1)" : "rgba(16,185,129,0.1)", color: isDarkMode ? "#60a5fa" : "#10b981", border: `1px solid ${isDarkMode ? "rgba(96,165,250,0.2)" : "rgba(16,185,129,0.2)"}`, borderRadius: 30, padding: "6px 16px", marginBottom: 32, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", position: "relative", left: selectedLang === "AR" ? "auto" : "130px", right: selectedLang === "AR" ? "153px" : "auto", top: 7 }}>
                                    <span style={{ width: 6.5, height: 6.5, borderRadius: "50%", background: isDarkMode ? "#60a5fa" : "#10b981", boxShadow: `0 0 8px ${isDarkMode ? "#60a5fa" : "#10b981"}` }} /> {t("login.userSpace", "Espace Utilisateur")}
                                </div>
                            )}



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

                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, position: "relative", bottom: 18 }}>
                                <button onClick={() => loginWithGoogle()}
                                    style={{
                                        height: 57, borderRadius: 14, border: "none", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
                                        position: "relative", overflow: "hidden",
                                        background: isDarkMode
                                            ? "linear-gradient(135deg, rgba(95, 9, 165, 0.42), rgba(15, 32, 20, 0.9), rgba(91, 5, 251, 0.1), rgba(95, 9, 165, 0.42))"
                                            : "linear-gradient(135deg,rgba(66,133,244,0.08),rgba(52,168,83,0.08),rgba(251,188,5,0.08),rgba(234,67,53,0.08))",
                                        backgroundSize: "300% 300%",
                                        animation: "btnGradientMove 4s ease infinite",
                                        color: isDarkMode ? "#fff" : "#1a1a1a",
                                        boxShadow: isDarkMode
                                            ? "0 0 0 1px rgba(66,133,244,0.3), 0 0 20px rgba(66,133,244,0.15), 0 0 40px rgba(52,168,83,0.08)"
                                            : "0 0 0 1px rgba(66,133,244,0.2), 0 4px 20px rgba(66,133,244,0.12), 0 0 30px rgba(52,168,83,0.08)",
                                        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                                        e.currentTarget.style.boxShadow = isDarkMode
                                            ? "0 0 0 1px rgba(66,133,244,0.5), 0 8px 30px rgba(66,133,244,0.3), 0 0 50px rgba(52,168,83,0.15)"
                                            : "0 0 0 1px rgba(66,133,244,0.3), 0 8px 30px rgba(66,133,244,0.2), 0 0 40px rgba(52,168,83,0.12)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                                        e.currentTarget.style.boxShadow = isDarkMode
                                            ? "0 0 0 1px rgba(66,133,244,0.3), 0 0 20px rgba(66,133,244,0.15), 0 0 40px rgba(52,168,83,0.08)"
                                            : "0 0 0 1px rgba(66,133,244,0.2), 0 4px 20px rgba(66,133,244,0.12), 0 0 30px rgba(52,168,83,0.08)";
                                    }}
                                >
                                    {/* Shine sweep */}
                                    <div style={{
                                        position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
                                        background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)",
                                        animation: "shineSweep 3s ease-in-out infinite",
                                        pointerEvents: "none",
                                    }} />

                                    {/* Google colored border bottom */}

                                    <svg width="22" height="22" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>

                                    {t("login.googleBtn", "Continue with Google")}
                                </button>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "24px 0", position: "relative", bottom: 18 }}>
                                <div style={{ flex: 1, height: 1, background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                                <span style={{ fontSize: 11, color: isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t("login.orEmail", "or with email")}</span>
                                <div style={{ flex: 1, height: 1, background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* EMAIL */}
                                <div style={{ marginBottom: 24, position: "relative", bottom: 12 }}>
                                    <label style={{
                                        display: "block", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em",
                                        textTransform: "uppercase", marginBottom: 8, transition: "color 0.3s",
                                        color: focused === "email" ? (isDarkMode ? "#60a5fa" : "#10b981") : (isDarkMode ? "#9ca3af" : "#166534")
                                    }}>{t("login.emailLabel", "E-mail address")}</label>
                                    <div style={{
                                        display: "flex", alignItems: "center",
                                        background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                                        border: `1.5px solid ${focused === "email"
                                            ? (isDarkMode ? "#60a5fa" : "#10b981")
                                            : (isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.25)")}`,
                                        borderRadius: 16, height: 58, padding: "0 18px", gap: 12,
                                        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",

                                        boxShadow: focused === "email"
                                            ? (isDarkMode
                                                ? "0 0 0 4px rgba(96,165,250,0.15), 0 8px 24px rgba(96,165,250,0.2)"
                                                : "0 0 0 4px rgba(16,185,129,0.12), 0 8px 24px rgba(16,185,129,0.18)")
                                            : (isDarkMode
                                                ? "0 2px 12px rgba(96,165,250,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                                                : "0 2px 12px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"),
                                        backdropFilter: "blur(8px)",

                                    }}
                                        onMouseEnter={e => {
                                            if (focused !== "email") {
                                                e.currentTarget.style.borderColor = isDarkMode ? "rgba(96,165,250,0.4)" : "rgba(16,185,129,0.5)";
                                                e.currentTarget.style.boxShadow = isDarkMode
                                                    ? "0 0 0 3px rgba(96,165,250,0.08), 0 6px 20px rgba(96,165,250,0.15)"
                                                    : "0 0 0 3px rgba(16,185,129,0.07), 0 6px 20px rgba(16,185,129,0.12)";
                                                e.currentTarget.style.transform = "translateY(-1px)";
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (focused !== "email") {
                                                e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.25)";
                                                e.currentTarget.style.boxShadow = isDarkMode
                                                    ? "0 2px 12px rgba(96,165,250,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                                                    : "0 2px 12px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.8)";
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
                                                color: focused === "pass" ? (isDarkMode ? "#60a5fa" : "#10b981") : (isDarkMode ? "#9ca3af" : "#166534")
                                            }}>{t("login.passLabel", "Password")}</label>
                                        </div>
                                        <div style={{
                                            display: "flex", alignItems: "center",
                                            background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                                            border: `1.5px solid ${focused === "pass"
                                                ? (isDarkMode ? "#60a5fa" : "#10b981")
                                                : (isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.25)")}`,
                                            borderRadius: 16, height: 58, padding: "0 18px", gap: 12,
                                            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                                            boxShadow: focused === "pass"
                                                ? (isDarkMode
                                                    ? "0 0 0 4px rgba(96,165,250,0.15), 0 8px 24px rgba(96,165,250,0.2)"
                                                    : "0 0 0 4px rgba(16,185,129,0.12), 0 8px 24px rgba(16,185,129,0.18)")
                                                : (isDarkMode
                                                    ? "0 2px 12px rgba(96,165,250,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                                                    : "0 2px 12px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"),
                                            backdropFilter: "blur(8px)",
                                        }}
                                            onMouseEnter={e => {
                                                if (focused !== "pass") {
                                                    e.currentTarget.style.borderColor = isDarkMode ? "rgba(96,165,250,0.4)" : "rgba(16,185,129,0.5)";
                                                    e.currentTarget.style.boxShadow = isDarkMode
                                                        ? "0 0 0 3px rgba(96,165,250,0.08), 0 6px 20px rgba(96,165,250,0.15)"
                                                        : "0 0 0 3px rgba(16,185,129,0.07), 0 6px 20px rgba(16,185,129,0.12)";
                                                    e.currentTarget.style.transform = "translateY(-1px)";
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (focused !== "pass") {
                                                    e.currentTarget.style.borderColor = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.25)";
                                                    e.currentTarget.style.boxShadow = isDarkMode
                                                        ? "0 2px 12px rgba(96,165,250,0.08), inset 0 1px 0 rgba(255,255,255,0.05)"
                                                        : "0 2px 12px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.8)";
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

                            <div style={{ textAlign: "center", fontSize: 15, color: isDarkMode ? "#c2c8d3ff" : "#166534", position: "relative", bottom: 3 }}>
                                {t("login.noAccount", "Don't have an account?")} <a href="/" onClick={(e) => { e.preventDefault(); navigate("/registre"); }} style={{ color: isDarkMode ? "#60a5fa" : "#10b981", fontWeight: 800, textDecoration: "none" }}>{t("login.createAccount", "Create an account.")}</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}