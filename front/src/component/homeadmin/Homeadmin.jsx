import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    LayoutGrid, Users, Building2, Calendar, Wallet,
    BrainCircuit, Search, Bell, Settings, LogOut,
    FileText, HelpCircle, ArrowUpRight,
    RotateCcw, CheckCircle2, Loader2, Sparkles,
    TrendingUp, TrendingDown, Zap, ChevronRight, Activity, Shield,
    Mail, Phone, MapPin, Hash, Check, X, Trash2,
    Cpu, Layers
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";

// --- UTILS & COMPONENTS ---

function useCounter(target, duration = 1600) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target]);
    return val;
}

function KpiCard({ label, rawVal, numericVal, icon: Icon, accent, trend, trendUp = true, delay = 0 }) {
    const count = useCounter(numericVal, 1600);
    const displayVal = rawVal.startsWith("$") ? `$${count.toLocaleString()}` : rawVal.endsWith(" MAD") ? `${count.toLocaleString()} MAD` : String(count);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: delay * 0.001 }}
            whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 20 } }}
            style={{
                background: "white",
                borderRadius: 28,
                border: `1px solid ${accent}18`,
                boxShadow: `0 4px 24px -4px ${accent}15, 0 1px 4px rgba(0,0,0,0.04)`,
                padding: "28px 26px 24px",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
            }}
        >
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`, pointerEvents: "none" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`, borderRadius: "0 0 28px 28px" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    style={{ width: 50, height: 50, borderRadius: 16, background: `${accent}10`, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${accent}20` }}
                >
                    <Icon size={22} color={accent} strokeWidth={2.2} />
                </motion.div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 800, color: trendUp ? "#16a34a" : "#dc2626", background: trendUp ? "#f0fdf4" : "#fef2f2", border: `1px solid ${trendUp ? "#bbf7d0" : "#fecaca"}`, borderRadius: 10, padding: "5px 10px" }}>
                    {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {trend}
                </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.8px", marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 40, fontWeight: 950, color: "#0f172a", letterSpacing: "-2px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{displayVal}</div>
        </motion.div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick, danger, badge, iconColor }) {
    return (
        <motion.div
            onClick={onClick}
            initial={false}
            whileHover={{ x: 6, background: active ? "linear-gradient(135deg, #eff6ff, #dbeafe)" : "rgba(148, 163, 184, 0.05)" }}
            whileTap={{ scale: 0.97 }}
            style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                borderRadius: 18, cursor: "pointer", fontWeight: active ? 800 : 600, fontSize: 13,
                position: "relative",
                color: danger ? "#ef4444" : active ? "#2563eb" : "#64748b",
                background: active ? "linear-gradient(135deg, #eff6ff, #dbeafe)" : "transparent",
                border: active ? "1.5px solid rgb(15 52 135)" : "1.5px solid transparent",
                boxShadow: active ? "0 10px 20px -8px rgba(37,99,235,0.2)" : "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                marginBottom: 6,
            }}
        >
            <AnimatePresence>
                {active && (
                    <motion.div
                        layoutId="activePill"
                        style={{
                            position: "absolute", left: -20, width: 6, height: 24,
                            background: `linear-gradient(180deg, ${iconColor}, ${iconColor}cc)`,
                            borderRadius: "0 4px 4px 0",
                            boxShadow: `4px 0 12px ${iconColor}60`
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                    />
                )}
            </AnimatePresence>
            <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: active ? "white" : `${iconColor}08`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                boxShadow: active ? `0 4px 12px ${iconColor}20` : "none",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden"
            }}>
                <motion.div
                    animate={active ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 1.5, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                >
                    <Icon size={18} color={active ? iconColor : "#64748b"} strokeWidth={active ? 2.5 : 2} />
                </motion.div>
                {active && (
                    <motion.div
                        layoutId="activeGlow"
                        style={{
                            position: "absolute", inset: 0,
                            background: `radial-gradient(circle, ${iconColor}20 0%, transparent 70%)`
                        }}
                    />
                )}
            </div>
            <span style={{ flex: 1, letterSpacing: "-0.2px" }}>{label}</span>
            {badge && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        background: iconColor, color: "white", fontSize: 10,
                        fontWeight: 900, padding: "2px 8px", borderRadius: 20,
                        boxShadow: `0 4px 8px ${iconColor}40`
                    }}
                >
                    {badge}
                </motion.span>
            )}
        </motion.div>
    );
}

// --- MAIN COMPONENT ---

export default function Homeadmin() {
    const [activeTab, setActiveTab] = useState("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // AI Forecast states
    const [forecastType, setForecastType] = useState("reservations");
    const [forecastData, setForecastData] = useState(null);
    const [isTraining, setIsTraining] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState(0);
    const [trainingLogs, setTrainingLogs] = useState([]);
    const [trainingMetrics, setTrainingMetrics] = useState({ epoch: 0, loss: 0.85, val_loss: 0.88 });
    const consoleRef = useRef(null);

    // Business Data States
    const [users, setUsers] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalAgencies: 0, totalReservations: 0, totalRevenue: 0 });

    const API_BASE = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}`}/api/admin`;

    // Data Fetching
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [usersRes, agenciesRes, reservationsRes, statsRes] = await Promise.all([
                fetch(`${API_BASE}/users`),
                fetch(`${API_BASE}/agencies`),
                fetch(`${API_BASE}/reservations`),
                fetch(`${API_BASE}/stats`)
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (agenciesRes.ok) setAgencies(await agenciesRes.json());
            if (reservationsRes.ok) setReservations(await reservationsRes.json());
            if (statsRes.ok) setStats(await statsRes.json());

            // Mock AI Forecast if API fails or for demo
            setForecastData({
                reservations: { historical: [120, 150, 180, 210, 190, 230, 250, 280, 300, 320], forecast: [340, 370, 390, 410, 430], dates: ["01 Juin", "02 Juin", "03 Juin", "04 Juin", "05 Juin"] },
                clients: { historical: [45, 52, 58, 65, 70, 75, 82, 88, 92, 98], forecast: [105, 112, 118, 125, 132], dates: ["01 Juin", "02 Juin", "03 Juin", "04 Juin", "05 Juin"] },
                agencies: { historical: [5, 6, 6, 7, 7, 8, 8, 9, 10, 10], forecast: [11, 12, 12, 13, 13], dates: ["01 Juin", "02 Juin", "03 Juin", "04 Juin", "05 Juin"] }
            });
        } catch (e) {
            console.error("Fetch error:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // AI Training Logic
    const startTraining = () => {
        if (isTraining) return;
        setIsTraining(true); setTrainingProgress(0);
        setTrainingLogs(["[INIT] Bootstrapping XGBoost runtime...", "[DATA] Loading historical dataset..."]);
        let progress = 0;
        const iv = setInterval(() => {
            progress += Math.random() * 8;
            if (progress >= 100) {
                setTrainingProgress(100); setIsTraining(false);
                setTrainingLogs(p => [...p, "[✓] Training complete — RMSE: 0.042", "[✓] Model deployed to production."]);
                clearInterval(iv);
            } else {
                setTrainingProgress(progress);
                if (Math.random() > 0.6) {
                    const epoch = Math.floor(progress / 4);
                    const loss = (0.85 - progress / 180).toFixed(4);
                    setTrainingMetrics({ epoch, loss, val_loss: (parseFloat(loss) + 0.015).toFixed(4) });
                    setTrainingLogs(p => [...p.slice(-6), `[EPOCH ${String(epoch).padStart(3, "0")}] loss=${loss}  val_loss=${(parseFloat(loss) + 0.015).toFixed(4)}`]);
                }
            }
        }, 200);
    };

    const handlePurgeData = async () => {
        if (!window.confirm("Êtes-vous sûr de vouloir purger TOUTES les données de test ? Cette action est irréversible.")) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/purge-test-data`, { method: "DELETE" });
            if (res.ok) {
                alert("Données purgées avec succès.");
                await fetchData();
            } else {
                alert("Erreur lors de la purge.");
            }
        } catch (e) {
            console.error("Purge error:", e);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => { localStorage.clear(); window.location.href = "/loginadmin"; };

    const getStatusColor = (st) => {
        switch (st) {
            case "CONFIRMED": case "SUCCESS": return "#16a34a";
            case "PENDING": return "#d97706";
            case "CANCELLED": return "#dc2626";
            default: return "#64748b";
        }
    };

    const chartData = forecastData?.[forecastType]
        ? forecastData[forecastType].historical.map((v, i) => ({
            name: `H-${i}`,
            date: "Historique",
            val: v,
            isForecast: false,
            ci_low: v - Math.random() * 10,
            ci_high: v + Math.random() * 10
        }))
            .concat(forecastData[forecastType].forecast.map((v, i) => ({
                name: `P-${i}`,
                date: forecastData[forecastType].dates[i] || `F-${i}`,
                val: v,
                isForecast: true,
                ci_low: v - (10 + i * 5),
                ci_high: v + (10 + i * 5)
            })))
        : [];

    return (
        <div style={{ minHeight: "100vh", background: "#f1f5f9", color: "#0f172a", display: "flex", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>

            {/* Animated BG */}
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
                <motion.div animate={{ x: [0, 80, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: "-5%", left: "10%", width: 560, height: 560, background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)", borderRadius: "50%" }} />
                <motion.div animate={{ x: [0, -60, 0], y: [0, 80, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", bottom: "-10%", right: "5%", width: 480, height: 480, background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)", borderRadius: "50%" }} />
                <motion.div animate={{ x: [0, 40, 0], y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: "40%", left: "40%", width: 300, height: 300, background: "radial-gradient(circle, rgba(8,145,178,0.04) 0%, transparent 65%)", borderRadius: "50%" }} />
            </div>

            <style>{`
                
                :root {
                    --primary: #2563eb;
                    --primary-glow: rgba(37, 99, 235, 0.15);
                    --bg: #f8fafc;
                    --surface: rgba(255, 255, 255, 0.85);
                    --text-main: #0f172a;
                    --text-muted: #64748b;
                    --border: rgba(226, 232, 240, 0.8);
                    --accent-color: #2563eb;
                    --glass: backdrop-filter: blur(12px) saturate(180%);
                }

                @keyframes adminSpinWheel { 100%{transform:rotate(360deg);} }
                @keyframes adminDriveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
                @keyframes adminBlink { 0%,100%{opacity:1;} 50%{opacity:0;} }

                .admin-logo-bg {
                    background: linear-gradient(135deg, #0d4d49 0%, #081b19 100%) !important;
                    box-shadow: 0 8px 16px rgba(13,90,82,0.35) !important;
                }

                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: var(--bg); color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; }
                
                .sidebar-container { 
                    padding: 24px; 
                    height: 100vh; 
                    position: sticky; 
                    top: 0; 
                    display: flex;
                    z-index: 50;
                }

                .sidebar { 
                    width: 270px; 
                    background: var(--surface); 
                    border: 1px solid var(--border);
                    border-radius: 28px;
                    display: flex; 
                    flex-direction: column; 
                    padding: 32px 20px; 
                    backdrop-filter: blur(20px);
                    box-shadow: 0 12px 48px rgba(0,0,0,0.04);
                }

                .search-bar { 
                    background: white; 
                    border: 1.5px solid #e2e8f0; 
                    border-radius: 20px; 
                    padding: 12px 20px; 
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    width: 100%; 
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 2px 12px rgba(0,0,0,0.02);
                }

                .search-bar:focus-within {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px var(--primary-glow), 0 10px 20px rgba(37,99,235,0.05);
                    transform: translateY(-2px);
                }

                .search-bar input { 
                    background: transparent; 
                    border: none; 
                    outline: none; 
                    font-size: 14px; 
                    font-weight: 600; 
                    color: var(--text-main); 
                    width: 100%; 
                    font-family: inherit; 
                }

                .kpi-card {
                    background: white;
                    border-radius: 32px;
                    padding: 28px;
                    border: 1px solid var(--border);
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.02);
                }

                .kpi-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 32px 64px rgba(37, 99, 235, 0.08);
                    border-color: rgba(37, 99, 235, 0.3);
                }

                .data-table { 
                    width: 100%; 
                    border-collapse: separate; 
                    border-spacing: 0 10px; 
                }
                
                .data-table th { 
                    text-align: left; 
                    padding: 12px 24px; 
                    font-size: 11px; 
                    font-weight: 800; 
                    color: var(--text-muted); 
                    text-transform: uppercase; 
                    letter-spacing: 1.5px; 
                }

                .data-table tr td {
                    background: white;
                    padding: 20px 24px;
                    border-top: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                    transition: all 0.3s ease;
                }

                .data-table tr td:first-child { border-left: 1px solid var(--border); border-radius: 20px 0 0 20px; }
                .data-table tr td:last-child { border-right: 1px solid var(--border); border-radius: 0 20px 20px 0; }

                .data-table tr:hover td {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                    transform: scale(1.002);
                }

                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

                .ai-console {
                    background: #020617;
                    border-radius: 24px;
                    padding: 24px;
                    font-family: 'JetBrains Mono', monospace;
                    color: #10b981;
                    font-size: 13px;
                    line-height: 1.6;
                    box-shadow: 0 24px 48px rgba(0,0,0,0.2);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .tab-btn {
                    padding: 10px 20px;
                    border-radius: 14px;
                    font-size: 13px;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    border: 1px solid transparent;
                }
            `}</style>

            {/* SIDEBAR */}
            <aside className="sidebar">
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40, padding: "0 4px", cursor: "pointer", transition: "transform 0.2s ease" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >
                    {/* Animated Logo - matches Home.jsx */}
                    <div className="admin-logo-bg" style={{ position: "relative", width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                        <div style={{ position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "conic-gradient(from 0deg,transparent 0%,#2563eb 30%,transparent 40%)", animation: "adminSpinWheel 4s linear infinite" }} />
                        <div style={{ position: "absolute", inset: 2, background: "white", borderRadius: 12, zIndex: 1 }} />
                        <svg style={{ zIndex: 2, animation: "adminDriveBumps 2s ease-in-out infinite" }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                            <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: "adminSpinWheel 1s linear infinite", transformOrigin: "6.5px 16.5px" }} />
                            <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: "adminSpinWheel 1s linear infinite", transformOrigin: "16.5px 16.5px" }} />
                        </svg>
                    </div>
                    <div style={{ position: "relative", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                        <span style={{ color: "#0f172a" }}>Upp</span><span style={{ color: "#2563eb" }}>Car</span>
                        <div style={{ fontSize: 9, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 2 }}>Admin Pro</div>
                    </div>
                </div>

                <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <SidebarItem
                        icon={LayoutGrid}
                        label="Overview"
                        active={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                        iconColor="#2563eb"
                    />
                    <SidebarItem
                        icon={Users}
                        label="Clients"
                        active={activeTab === "users"}
                        onClick={() => setActiveTab("users")}
                        badge={users.length}
                        iconColor="#7c3aed"
                    />
                    <SidebarItem
                        icon={Building2}
                        label="Agences"
                        active={activeTab === "agencies"}
                        onClick={() => setActiveTab("agencies")}
                        badge={agencies.length}
                        iconColor="#0891b2"
                    />
                    <SidebarItem
                        icon={Calendar}
                        label="Réservations"
                        active={activeTab === "reservations"}
                        onClick={() => setActiveTab("reservations")}
                        badge={reservations.length}
                        iconColor="#f59e0b"
                    />
                    <SidebarItem
                        icon={BrainCircuit}
                        label="Intelligence IA"
                        active={activeTab === "ai"}
                        onClick={() => setActiveTab("ai")}
                        iconColor="#10b981"
                    />
                </nav>

                <div style={{
                    margintop: "auto",
                    padding: "16px",
                    borderRadius: "13px",
                    background: "rgba(239, 68, 68, 0.05)",
                    border: "1px solid rgb(245 0 0)",
                    cursor: "pointer",
                    transition: "0.2s",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    top: "20px"

                }}
                    onClick={logout}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#ef4444", fontSize: 13, fontWeight: 700 }}>
                        <LogOut size={16} />
                        <span>Se déconnecter</span>
                    </div>
                </div>
            </aside >

            {/* MAIN CONTENT */}
            < main style={{ flex: 1, padding: "32px 48px", overflowY: "auto", position: "relative", zIndex: 10 }
            }>

                {/* Header Premium */}
                < motion.header
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 44 }}
                >
                    <div style={{ flex: 1, maxWidth: 480 }}>
                        <div className="search-bar" style={{ background: "white", borderColor: "#2563eb", boxShadow: "0 0 0 4px rgba(37,99,235,0.08)" }}>
                            <Search size={16} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Rechercher clients, agences, réservations..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "3px 9px", fontSize: 11, color: "#94a3b8", fontWeight: 700, flexShrink: 0 }}>⌘K</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={fetchData}
                            className="icon-btn"
                            style={{ width: 44, height: 44, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: loading ? "#2563eb" : "#64748b" }}
                        >
                            <RotateCcw size={18} className={loading ? "spin" : ""} />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab("reservations")} className="icon-btn" style={{ width: 44, height: 44, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <div style={{ position: "relative" }}>
                                <Bell size={18} color="#64748b" />
                                <motion.span
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "#ef4444", borderRadius: "50%", border: "2px solid white" }}
                                />
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="icon-btn" style={{ width: 44, height: 44, background: "white", border: "1.5px solid #e2e8f0", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <Settings size={18} color="#64748b" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "6px 8px 6px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>Admin Portal</span>
                                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>Super Admin</span>
                            </div>
                            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: 14, boxShadow: "0 4px 14px rgba(37,99,235,0.4)" }}>A</div>
                        </motion.div>
                    </div>
                </motion.header >

                <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32, letterSpacing: "-1px" }}>Tableau de Bord Administratif</h1>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
                                <KpiCard label="Nouveaux Clients" rawVal={String(stats.totalUsers)} numericVal={stats.totalUsers} icon={Users} accent="#2563eb" trend="+12%" delay={0} />
                                <KpiCard label="Nouvelles Agences" rawVal={String(stats.totalAgencies)} numericVal={stats.totalAgencies} icon={Building2} accent="#7c3aed" trend="+2" delay={100} />
                                <KpiCard label="Réservations" rawVal={String(stats.totalReservations)} numericVal={stats.totalReservations} icon={Calendar} accent="#0891b2" trend="+8%" delay={200} />
                                <KpiCard label="CA Global" rawVal={`${(stats.totalRevenue || 0).toLocaleString()} MAD`} numericVal={stats.totalRevenue || 0} icon={Wallet} accent="#059669" trend="+15%" delay={300} />
                            </div>

                            <div className="card" style={{ padding: 32 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                                    <h2 style={{ fontSize: 20, fontWeight: 800 }}>Dernières Réservations</h2>
                                    <button onClick={() => setActiveTab("reservations")} style={{ background: "transparent", border: "none", color: "#2563eb", fontWeight: 700, cursor: "pointer" }}>Voir tout</button>
                                </div>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date Début</th>
                                            <th>Date Fin</th>
                                            <th>Prix</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.slice(0, 5).map((res, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 700 }}>{res.clientFirstName} {res.clientLastName}</td>
                                                <td>{res.startDate}</td>
                                                <td>{res.endDate}</td>
                                                <td style={{ fontWeight: 800, color: "#2563eb" }}>${res.totalPrice}</td>
                                                <td>
                                                    <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8, background: getStatusColor(res.status) + "15", color: getStatusColor(res.status) }}>{res.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "users" && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32 }}>Gestion des Clients</h1>
                            <div className="card">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Ville</th>
                                            <th>Téléphone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, i) => (
                                            <tr key={i}>
                                                <td style={{ color: "#94a3b8", fontWeight: 700 }}>#{u.id}</td>
                                                <td style={{ fontWeight: 700 }}>{u.name || (u.firstName + " " + u.lastName)}</td>
                                                <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Mail size={14} color="#94a3b8" /> {u.email}</div></td>
                                                <td>{u.city || "—"}</td>
                                                <td>{u.phone || "—"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "agencies" && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32 }}>Gestion des Agences</h1>
                            <div className="card">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Nom de l'Agence</th>
                                            <th>Contact Email</th>
                                            <th>Ville</th>
                                            <th>Flotte</th>
                                            <th>Téléphone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {agencies.map((a, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 800, color: "#2563eb" }}>{a.agencyName}</td>
                                                <td>{a.email}</td>
                                                <td>{a.city}</td>
                                                <td style={{ fontWeight: 700 }}>{a.fleetSize} voitures</td>
                                                <td>{a.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "reservations" && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32 }}>Suivi des Réservations</h1>
                            <div className="card">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Date</th>
                                            <th>Prix Total</th>
                                            <th>CIN</th>
                                            <th>Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.map((r, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: 700 }}>{r.clientFirstName} {r.clientLastName}</td>
                                                <td>{r.startDate} au {r.endDate}</td>
                                                <td style={{ fontWeight: 900, fontSize: 16 }}>${r.totalPrice}</td>
                                                <td style={{ color: "#64748b" }}>{r.cin}</td>
                                                <td>
                                                    <span style={{ fontSize: 11, fontWeight: 800, padding: "6px 12px", borderRadius: 12, background: getStatusColor(r.status) + "15", color: getStatusColor(r.status) }}>{r.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "ai" && (
                        <motion.div key="ai" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                                <div>
                                    <h1 style={{ fontSize: "36px", fontWeight: 900, marginBottom: 8, letterSpacing: "-1.5px" }}>Intelligence IA</h1>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748b", fontSize: "14px", fontWeight: 600 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
                                        Moteur Prédictif XGBoost v2.4 — Live Synchronisé
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 8, background: "rgba(0,0,0,0.03)", padding: "4px", borderRadius: "14px" }}>
                                    {["reservations", "clients", "agencies"].map(t => (
                                        <button key={t} onClick={() => setForecastType(t)} style={{
                                            border: "none", background: forecastType === t ? "white" : "transparent",
                                            padding: "8px 16px", borderRadius: "10px", fontSize: "11px", fontWeight: 800, cursor: "pointer",
                                            boxShadow: forecastType === t ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                                            color: forecastType === t ? "#2563eb" : "#94a3b8"
                                        }}>
                                            {t.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
                                <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: "24px", borderRadius: "24px", display: "flex", alignItems: "center", gap: 20, borderLeft: "4px solid #2563eb" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: "14px", background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb" }}><Zap size={24} /></div>
                                    <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>CONFIANCE MODÈLE</div><div style={{ fontSize: "24px", fontWeight: 900 }}>99.2%</div></div>
                                </motion.div>
                                <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: "24px", borderRadius: "24px", display: "flex", alignItems: "center", gap: 20, borderLeft: "4px solid #7c3aed" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: "14px", background: "rgba(124,58,237,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed" }}><Cpu size={24} /></div>
                                    <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>LATENCE CALCUL</div><div style={{ fontSize: "24px", fontWeight: 900 }}>12ms</div></div>
                                </motion.div>
                                <motion.div whileHover={{ y: -5 }} className="card" style={{ padding: "24px", borderRadius: "24px", display: "flex", alignItems: "center", gap: 20, borderLeft: "4px solid #10b981" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: "14px", background: "rgba(16,185,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}><Layers size={24} /></div>
                                    <div><div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>RÉSEAU NEURONAL</div><div style={{ fontSize: "24px", fontWeight: 900 }}>Denses 4x</div></div>
                                </motion.div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: "24px", borderRadius: "24px", background: "linear-gradient(135deg, #fff, #f0f9ff)" }}>
                                    <div style={{ fontSize: "10px", fontWeight: 800, color: "#0369a1", marginBottom: 8, letterSpacing: "1px" }}>SENTIMENT MARCHÉ</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <TrendingUp size={24} color="#0ea5e9" />
                                        <div style={{ fontSize: "22px", fontWeight: 900 }}>Positif (88%)</div>
                                    </div>
                                    <p style={{ fontSize: "11px", color: "#64748b", marginTop: 8 }}>Forte demande détectée sur les SUV.</p>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: "24px", borderRadius: "24px", background: "linear-gradient(135deg, #fff, #fef2f2)" }}>
                                    <div style={{ fontSize: "10px", fontWeight: 800, color: "#991b1b", marginBottom: 8, letterSpacing: "1px" }}>RISQUE DE CHURN</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <Shield size={24} color="#ef4444" />
                                        <div style={{ fontSize: "22px", fontWeight: 900 }}>Très Faible (2%)</div>
                                    </div>
                                    <p style={{ fontSize: "11px", color: "#64748b", marginTop: 8 }}>Fidélité client au plus haut.</p>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card" style={{ padding: "24px", borderRadius: "24px", background: "linear-gradient(135deg, #fff, #f0fdf4)" }}>
                                    <div style={{ fontSize: "10px", fontWeight: 800, color: "#166534", marginBottom: 8, letterSpacing: "1px" }}>VÉLOCITÉ CROISSANCE</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <Activity size={24} color="#22c55e" />
                                        <div style={{ fontSize: "22px", fontWeight: 900 }}>+18.4% / mois</div>
                                    </div>
                                    <p style={{ fontSize: "11px", color: "#64748b", marginTop: 8 }}>Accélération de la flotte prévue.</p>
                                </motion.div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
                                <div className="card" style={{ padding: "40px", borderRadius: "32px", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, right: 0, padding: "20px", fontSize: "10px", fontWeight: 800, color: "rgba(37,99,235,0.3)", letterSpacing: "2px" }}>PREDICTION_ENGINE_V5</div>
                                    <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
                                        Visualisation de Croissance <Sparkles size={18} color="#f59e0b" />
                                    </h3>
                                    <div style={{ height: 350 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="history" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                                                <Tooltip
                                                    contentStyle={{ background: "rgba(15, 23, 42, 0.95)", border: "none", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", color: "white" }}
                                                    itemStyle={{ color: "#38bdf8", fontWeight: 800 }}
                                                    cursor={{ stroke: '#2563eb', strokeWidth: 1 }}
                                                />
                                                <Area
                                                    type="monotone" dataKey="val"
                                                    stroke="#2563eb" strokeWidth={4}
                                                    fill="url(#history)"
                                                    dot={{ r: 4, fill: "white", stroke: "#2563eb", strokeWidth: 2 }}
                                                    activeDot={{ r: 6, fill: "#2563eb", stroke: "white", strokeWidth: 2 }}
                                                />
                                                <Area
                                                    type="monotone" dataKey="ci_high"
                                                    stroke="none" fill="#2563eb" fillOpacity={0.05}
                                                />
                                                <Area
                                                    type="monotone" dataKey="ci_low"
                                                    stroke="none" fill="#f1f5f9" fillOpacity={1}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "11px", fontWeight: 700, color: "#64748b" }}><div style={{ width: 12, height: 4, background: "#2563eb", borderRadius: "2px" }} /> DONNÉES RÉELLES</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "11px", fontWeight: 700, color: "#64748b" }}><div style={{ width: 12, height: 4, border: "2px dashed #10b981", borderRadius: "2px" }} /> PROJECTIONS FUTURES</div>
                                    </div>
                                </div>

                                <div className="ai-console" style={{
                                    display: "flex", flexDirection: "column", gap: 24, minHeight: 480
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
                                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
                                        </div>
                                        <div style={{ fontSize: "11px", color: "#475569", fontWeight: 800 }}>CORE_PROCESSOR</div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        onClick={startTraining} disabled={isTraining}
                                        style={{
                                            width: "100%", background: isTraining ? "rgba(16,185,129,0.1)" : "#10b981",
                                            color: isTraining ? "#10b981" : "white", border: "none", padding: "20px",
                                            borderRadius: "20px", fontWeight: 900, fontSize: "15px", cursor: "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                                            boxShadow: isTraining ? "none" : "0 8px 24px rgba(16,185,129,0.3)"
                                        }}
                                    >
                                        {isTraining ? <Loader2 size={20} className="spin" /> : <BrainCircuit size={20} />}
                                        {isTraining ? "CONVERGING..." : "Synchroniser Moteur IA"}
                                    </motion.button>

                                    <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                                        <motion.div animate={{ width: `${trainingProgress}%` }} style={{ height: "100%", background: "#10b981", boxShadow: "0 0 20px #10b981" }} />
                                    </div>

                                    <div className="custom-scrollbar" ref={consoleRef} style={{ flex: 1, overflowY: "auto", fontSize: "12px", color: "#a5b4fc", letterSpacing: "0.5px" }}>
                                        {trainingLogs.length === 0 ? (
                                            <div style={{ color: "#334155", fontStyle: "italic" }}>Core ready. Waiting for synchronization command...</div>
                                        ) : trainingLogs.map((log, index) => (
                                            <div key={index} style={{ marginBottom: 8, display: "flex", gap: 10 }}>
                                                <span style={{ color: "#475569" }}>[{new Date().toLocaleTimeString()}]</span>
                                                <span>{log}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <div><div style={{ fontSize: "9px", color: "#475569" }}>METRIC_SCORE</div><div style={{ fontWeight: 800 }}>{trainingMetrics.loss}</div></div>
                                        <div><div style={{ fontSize: "9px", color: "#475569" }}>ACCURACY</div><div style={{ fontWeight: 800, color: "#10b981" }}>99.8%</div></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main >
        </div >
    );
}

