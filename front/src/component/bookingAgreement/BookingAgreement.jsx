import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Calendar as CalendarIcon,
    ArrowRight as ArrowRightIcon,
    ArrowLeft as ArrowLeftIcon,
    Clock as ClockIcon,
    Tag as TagIcon,
    Moon as MoonIcon,
    Sun as SunIcon,
    Globe as GlobeIcon,
    ChevronLeft,
    ChevronRight,
    Check,
    Menu,
    X
} from 'lucide-react';

// ── CUSTOM CSS ──
const styles = `
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
  --accent-color: #60a5fa;
  --btn-text: #060912;
}

body { background: var(--bg-color); color: var(--text-main); position: relative; }
[data-theme='dark'] body::before { content: ''; }

.home-base-bg {
  position: fixed;
  inset: 0;
  z-index: -10;
  background: var(--bg-color);
}

@keyframes floatIcon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes btnGradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes shineSweep { 0% { left: -100%; } 100% { left: 200%; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes homeDrift{
  0%,100%{transform:translate(0,0) scale(1) rotate(0deg);}
  33%{transform:translate(30px,-20px) scale(1.08) rotate(3deg);}
  66%{transform:translate(-20px,30px) scale(.95) rotate(-3deg);}
}

.home-mesh-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none; filter: blur(50px) contrast(110%);
}
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

.home-noise-bg {
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  /*background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");*/
}
[data-theme='dark'] .home-noise-bg { opacity: 0.04; }
:root .home-noise-bg { opacity: 0.07; }

.home-blob{
  position:fixed; border-radius:50%; filter:blur(100px); pointer-events:none; z-index:1; animation:homeDrift 18s ease-in-out infinite;
}
.home-blob1{ width:600px; height:400px; top:-150px; left:-150px; background:rgba(16,185,129,.15); }
.home-blob2{ width:450px; height:550px; bottom:-150px; right:-100px; background:rgba(99,102,241,.12); }
.home-blob3{ width:320px;height:320px;top:40%; left:30%; background:rgba(245,158,11,.08); }
.home-blob4{ width:220px;height:220px;top:20%; right:30%; background:rgba(168,85,247,.1); }

.booking-card {
    border: 2px solid var(--card-border);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-radius: 40px;
    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.3);
    padding: 8px 50px;
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
}

.booking-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
}

.next-button {
    position: relative;
    background: var(--accent-gradient);
    background-size: 200% 200%;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 16px 40px;
    font-size: 16px;
    font-weight: 800;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 14px;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: btnGradientMove 4s ease infinite;
    box-shadow: 0 20px 40px rgba(var(--accent-rgb), 0.3);
}
.next-button:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 25px 50px rgba(var(--accent-rgb), 0.5);
}
.next-button:active { transform: translateY(2px) scale(0.98); }

.calendar-day {
    aspect-ratio: 1;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-weight: 700;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-size: 18px;
    position: relative;
    border: 1px solid transparent;
  
}

.calendar-day.selected {
    background: var(--accent-gradient);
    color: white;
    box-shadow: 0 6px 18px rgba(var(--accent-rgb), 0.3);
    z-index: 2;
    width: 44px;
    height: 44px;
    border-radius: 50% !important;
    margin: auto;
}
.calendar-day.in-range {
    background: rgba(var(--accent-rgb), 0.1);
    color: var(--accent-color);
    border-radius: 0;
}
.calendar-day.range-start { border-radius: 18px 0 0 18px; }
.calendar-day.range-end { border-radius: 0 18px 18px 0; }
.calendar-day.today {
}
.calendar-day.disabled {
    opacity: 0.15; cursor: not-allowed;
}

@media (max-width: 768px) {
    .calendar-day { font-size: 14px; }
    .calendar-day.selected { width: 36px; height: 36px; }
    .booking-card { padding: 20px 12px; }
}

.calendar-header-btn {
    background: rgba(255,255,255,0.03); border: 1px solid var(--card-border);
    border-radius: 14px; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-main);
    transition: all 0.3s;
}
.calendar-header-btn:hover {
    background: var(--text-main); color: var(--bg-color);
    transform: scale(1.1);
}

.lang-dropdown {
    position: absolute; top: 110%; right: 0;
    background: var(--nav-bg); backdrop-filter: blur(30px);
    border: 1px solid var(--nav-border); border-radius: 20px;
    padding: 12px; min-width: 160px; box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    display: flex; flexDirection: column; gap: 6px; z-index: 100;
    animation: zoomIn 0.4s cubic-bezier(0.16,1,0.3,1);
}
@keyframes zoomIn { from { opacity: 0; transform: scale(0.9) translateY(-10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.lang-item {
    padding: 12px 16px; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    font-weight: 700; font-size: 14px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.lang-item:hover { background: rgba(255,255,255,0.08); transform: translateX(4px); }
.lang-item.active { color: var(--accent-color); background: rgba(var(--accent-rgb), 0.1); }

@keyframes spinWheel { 100%{transform:rotate(360deg);} }
@keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
@keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(0.75);opacity:0.5;} }
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }

.nav-wrapper { position: sticky; top: 10px; z-index: 100; margin: 0 20px; transition: all 0.3s ease; }
.nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 10px 26px; animation: fadeUp 0.6s ease-out; }

.icon-btn { background:rgba(255,255,255,0.05); border:1px solid var(--nav-border); color:var(--text-main); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); position:relative; }

.primary-btnE {
  background: var(--text-main); /* Default/Light: Dark Green like Se connecter */
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

[data-theme='dark'] .primary-btnE {
  background: #1d4ed8; /* Dark: Blue */
  box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
}

[data-theme='dark'] .primary-btnE:hover {
  background: #1e40af;
  box-shadow: 0 8px 25px rgba(29, 78, 216, 0.4);
}

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

const BookingAgreement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("appTheme") === "dark");
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [isLangHovered, setIsLangHovered] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [profileImage] = useState(localStorage.getItem("profileImage") || null);

    const T = {
        "nav.logout": { FR: "Déconnexion", EN: "Log out", AR: " تسجيل الخروج" },
        "nav.myProfile": { FR: "Mon profil", EN: "My Profile", AR: "ملفي الشخصي" },
        "nav.myReservations": { FR: "Mes Réservations", EN: "My Reservations", AR: "حجوزاتي" },
        "nav.favorites": { FR: "Favoris", EN: "Favorites", AR: "المفضلة" },
    };
    const t = (key) => T[key]?.[selectedLang] || T[key]?.FR || "";

    // Date Range State
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/cars/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCar(data);
                }
            } catch (err) {
                console.error("Error fetching car:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();

        // Styles
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Particles
        let aniId;
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let W = canvas.width = window.innerWidth;
            let H = canvas.height = window.innerHeight;
            let particles = Array.from({ length: 90 }, () => new Particle(W, H));
            const render = () => {
                ctx.clearRect(0, 0, W, H);
                particles.forEach(p => {
                    p.update();
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
                });
                aniId = requestAnimationFrame(render);
            };
            render();
            const res = () => {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
                particles = Array.from({ length: 90 }, () => new Particle(W, H));
            };
            window.addEventListener('resize', res);
            return () => { cancelAnimationFrame(aniId); window.removeEventListener('resize', res); document.head.removeChild(styleSheet); };
        }
        return () => document.head.removeChild(styleSheet);
    }, [id]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem("appTheme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem("appLang", selectedLang);
        document.documentElement.dir = selectedLang === "AR" ? "rtl" : "ltr";
    }, [selectedLang]);

    const handleNext = () => {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        navigate(`/car/${id}`, { state: { reservationDays: days, startDate, endDate } });
    };

    const isDateInRange = (date) => {
        return date >= startDate && date <= endDate;
    };

    const isDateSelected = (date) => {
        if (!startDate && !endDate) return false;
        return (startDate && date.toDateString() === startDate.toDateString()) ||
            (endDate && date.toDateString() === endDate.toDateString());
    };

    const handleDateClick = (date) => {
        if (date < new Date(new Date().setHours(0, 0, 0, 0))) return;

        const isStart = startDate && date.toDateString() === startDate.toDateString();
        const isEnd = endDate && date.toDateString() === endDate.toDateString();

        if (isStart) {
            setStartDate(null);
            setEndDate(null);
        } else if (isEnd) {
            setEndDate(null);
        } else if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else {
            if (date < startDate) {
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day disabled" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === new Date().toDateString();
            const isDisabled = date < new Date(new Date().setHours(0, 0, 0, 0));
            const isSelected = isDateSelected(date);
            const inRange = startDate && endDate && date > startDate && date < endDate;
            const isRangeStart = startDate && date.toDateString() === startDate.toDateString();
            const isRangeEnd = endDate && date.toDateString() === endDate.toDateString();

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${inRange ? 'in-range' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    const monthName = currentMonth.toLocaleString(selectedLang === "AR" ? 'ar' : 'fr', { month: 'long', year: 'numeric' });
    const dayNames = selectedLang === "AR"
        ? ["ح", "ن", "ث", "ر", "خ", "ج", "س"]
        : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
            <div style={{ width: 40, height: 40, border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spinWheel 1s linear infinite' }} />
        </div>;
    }

    if (!car) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', color: 'var(--text-main)' }}>Car not found.</div>;

    const diffTime = (startDate && endDate) ? Math.abs(endDate - startDate) : 0;
    const diffDays = (startDate && endDate) ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
    const totalPrice = car.price * (diffDays || 0);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)', position: 'relative', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
            <div className="home-base-bg" />
            <div className="home-mesh-bg" />
            <div className="home-noise-bg" />
            <div className="home-blob home-blob1" />
            <div className="home-blob home-blob2" />
            <div className="home-blob home-blob3" />
            <div className="home-blob home-blob4" />

            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

            {/* ══ NAV ══ */}
            {!isMobile && (
                <div className="nav-wrapper" dir="ltr">
                    <nav className="nav-glass" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr", alignItems: "center", position: "relative" }}>
                    {/* Left: Logo */}
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <AnimatedLogo onClick={() => navigate("/homeConnect")} />
                    </div>

                    {isMobile ? (
                        /* MOBILE: Toggle Menu */
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button className="icon-btn" onClick={() => setMobileMenuOpen(p => !p)}>
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            
                            {/* Dropdown Menu */}
                            {mobileMenuOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', right: '26px', marginTop: '14px',
                                    background: isDarkMode ? "rgba(10,14,26,0.95)" : "rgba(255,255,255,0.98)",
                                    backdropFilter: 'blur(25px)',
                                    borderRadius: '24px', padding: '20px', width: '240px',
                                    display: 'flex', flexDirection: 'column', gap: '16px',
                                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(6,78,59,0.12)"}`,
                                    boxShadow: '0 24px 50px rgba(0,0,0,0.25)',
                                    zIndex: 200, animation: 'fadeUp 0.3s ease-out'
                                }}>
                                    
                                    {/* Languages Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                        {['AR', 'FR', 'EN'].map(lang => (
                                            <button key={lang} onClick={() => { setSelectedLang(lang); setMobileMenuOpen(false); }} style={{
                                                padding: '10px 0', borderRadius: '14px',
                                                background: selectedLang === lang ? 'var(--accent-gradient)' : 'var(--card-bg)',
                                                color: selectedLang === lang ? '#fff' : 'var(--text-main)',
                                                border: `1px solid ${selectedLang === lang ? 'transparent' : 'var(--card-border)'}`,
                                                fontWeight: 800, fontFamily: "'Syne', sans-serif", fontSize: 13,
                                                cursor: "pointer", transition: "all 0.2s"
                                            }}>
                                                {lang}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Theme Toggle */}
                                    <button onClick={() => { setIsDarkMode(!isDarkMode); setMobileMenuOpen(false); }} style={{ 
                                        width: '100%', padding: '14px', borderRadius: '16px',
                                        background: 'rgba(128,128,128,0.1)', color: 'var(--text-main)', 
                                        border: '1px solid var(--card-border)', display: 'flex', 
                                        alignItems: 'center', justifyContent: 'center', gap: 10,
                                        fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer"
                                    }}>
                                        {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                                        <span>{isDarkMode ? "Mode Clair" : "Mode Sombre"}</span>
                                    </button>

                                    {/* Back Button */}
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="primary-btnE"
                                        style={{ width: '100%', justifyContent: 'center', height: '48px', borderRadius: '16px' }}
                                    >
                                        {selectedLang === "AR" ? <ArrowRightIcon size={18} /> : <ArrowLeftIcon size={18} />}
                                        <span>{selectedLang === "AR" ? "رجوع" : selectedLang === "EN" ? "Back" : "Retour"}</span>
                                    </button>

                                </div>
                            )}
                        </div>
                    ) : (
                        /* DESKTOP NAV ITEMS */
                        <>
                            {/* Center: Lang & Theme Toggle (Adaptive UI) */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
                                {/* Language Selector Wrapper */}
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    {/* Icon Button (Stable Flow Anchor) */}
                                    <button
                                        className="icon-btn"
                                        onClick={() => setLangMenuOpen(p => !p)}
                                        style={{
                                            background: langMenuOpen ? "#fff" : (isLangHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"),
                                            color: langMenuOpen ? "#000" : (isDarkMode ? "#fff" : "#000"),
                                            border: langMenuOpen ? "none" : `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(6,78,59,0.1)"}`,
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            zIndex: 11,
                                            cursor: "pointer",
                                            boxShadow: langMenuOpen ? "0 8px 16px rgba(0,0,0,0.2)" : "none",
                                            flexShrink: 0,
                                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                        }}
                                        onMouseEnter={() => setIsLangHovered(true)}
                                        onMouseLeave={() => setIsLangHovered(false)}
                                    >
                                        <svg
                                            style={{
                                                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                transform: langMenuOpen ? "rotate(-180deg) scale(1.15)" : "rotate(0deg) scale(1)"
                                            }}
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                        >
                                            <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
                                        </svg>
                                        <span style={{
                                            position: "absolute", top: -4, right: -4,
                                            background: "#2563eb", color: "#fff",
                                            fontSize: "9px", fontWeight: "900", padding: "2px 5px", borderRadius: "6px",
                                            lineHeight: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                                        }}>{selectedLang}</span>
                                    </button>

                                    {/* Adaptive Pill with Options */}
                                    <div style={{
                                        position: "absolute",
                                        right: "52px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        width: langMenuOpen ? "140px" : "0px",
                                        height: "42px",
                                        opacity: langMenuOpen ? 1 : 0,
                                        background: isDarkMode ? "rgba(10,14,26,0.85)" : "rgba(255,255,255,0.9)",
                                        borderRadius: "21px",
                                        padding: langMenuOpen ? "0 8px" : "0",
                                        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(6,78,59,0.1)"}`,
                                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                                        overflow: "hidden",
                                        pointerEvents: langMenuOpen ? "auto" : "none",
                                        boxShadow: isDarkMode ? "0 10px 30px rgba(0,0,0,0.4)" : "0 8px 16px rgba(0,0,0,0.06)",
                                        zIndex: 10,
                                        whiteSpace: "nowrap",
                                        backdropFilter: "blur(12px)"
                                    }}>
                                        {[
                                            { code: "AR", label: "AR" },
                                            { code: "FR", label: "FR" },
                                            { code: "EN", label: "EN" }
                                        ].map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setSelectedLang(lang.code); setLangMenuOpen(false); }}
                                                style={{
                                                    background: selectedLang === lang.code ? (isDarkMode ? "#0738a3ff" : "#008f18ff") : "transparent",
                                                    color: selectedLang === lang.code ? "#fff" : (isDarkMode ? "rgba(255,255,255,0.8)" : "#064e3b"),
                                                    border: "none",
                                                    borderRadius: "16px",
                                                    padding: "6px 14px",
                                                    fontSize: "11px",
                                                    fontWeight: "800",
                                                    cursor: "pointer",
                                                    fontFamily: "'Syne', sans-serif",
                                                    transition: "all 0.3s",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button className="icon-btn" style={{ background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(16,185,129,0.1)"}`, padding: "10px", flexShrink: 0 }} onClick={() => setIsDarkMode(!isDarkMode)}>
                                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
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
                                    {selectedLang === "AR" ? <ArrowRightIcon size={18} /> : <ArrowLeftIcon size={18} />}
                                    <span>{selectedLang === "AR" ? "رجوع" : selectedLang === "EN" ? "Back" : "Retour"}</span>
                                </button>
                            </div>
                        </>
                    )}
                </nav>
            </div>
            )}

            <main style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: isMobile ? "10px auto 100px" : "20px auto 80px", padding: isMobile ? "0 14px" : "0 40px", top: isMobile ? "5px" : "29px" }}>

                {/* Page Header */}

                <div className="booking-card" style={{ padding: isMobile ? '20px 16px' : '28px 28px 34px 28px', position: "relative", bottom: isMobile ? "0px" : "12px", borderRadius: isMobile ? '28px' : '40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '400px 1fr', gap: isMobile ? 24 : 32 }}>

                        {/* ── LEFT: Car Panel ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                            {/* Car image hero */}
                            <div style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.25)', flexShrink: 0 }}>
                                <img
                                    src={car.photos?.[0] || ""}
                                    alt={car.name}
                                    style={{ width: '100%', height: isMobile ? 160 : 190, objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                {/* Gradient overlay */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.7) 100%)' }} />
                                {/* Category badge */}
                                <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--accent-gradient)', color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em', backdropFilter: 'blur(10px)' }}>
                                    {car.category || 'Premium'}
                                </div>
                                {/* Car name on image */}
                                <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
                                    <div style={{ fontSize: 19, fontWeight: 900, color: '#fff', fontFamily: "'Syne', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.5)', marginBottom: 2 }}>{car.name}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 700 }}>
                                        <TagIcon size={13} />
                                        <span>{car.price} MAD <span style={{ opacity: 0.7, fontWeight: 500 }}>/ Jour</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Date range display */}
                            <div style={{ background: 'rgba(var(--accent-rgb),0.06)', border: '1px solid rgba(var(--accent-rgb),0.15)', borderRadius: 18, padding: '14px 16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
                                    {selectedLang === "AR" ? "الفترة المختارة" : "Période sélectionnée"}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8 }}>
                                    <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: '10px 12px', border: '1px solid var(--card-border)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 3, textTransform: 'uppercase' }}>
                                            {selectedLang === "AR" ? "من" : "Début"}
                                        </div>
                                        <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-main)', fontFamily: "'Syne', sans-serif" }}>
                                            {startDate ? startDate.toLocaleDateString(selectedLang === "AR" ? 'ar' : 'fr', { day: '2-digit', month: 'short' }) : '—'}
                                        </div>
                                    </div>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {selectedLang === "AR" ? (
                                            <ArrowLeftIcon size={14} color="#fff" />
                                        ) : (
                                            <ArrowRightIcon size={14} color="#fff" />
                                        )}
                                    </div>
                                    <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: '10px 12px', border: '1px solid var(--card-border)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 3, textTransform: 'uppercase' }}>
                                            {selectedLang === "AR" ? "إلى" : "Fin"}
                                        </div>
                                        <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-main)', fontFamily: "'Syne', sans-serif" }}>
                                            {endDate ? endDate.toLocaleDateString(selectedLang === "AR" ? 'ar' : 'fr', { day: '2-digit', month: 'short' }) : '—'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary pricing */}
                            <div style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderRadius: 18, padding: '14px 16px', border: '1px solid var(--card-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>{selectedLang === "AR" ? "المدة" : "Durée"}</span>
                                    <span style={{ fontWeight: 900, fontSize: 16, fontFamily: "'Syne', sans-serif", color: 'var(--text-main)' }}>{diffDays} {selectedLang === "AR" ? "أيام" : "J"}</span>
                                </div>
                                <div style={{ height: 1, background: 'var(--card-border)', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>Total Estimé</div>
                                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>TVA incluse</div>
                                    </div>
                                    <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--accent-color)', fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                                        {totalPrice} <span style={{ fontSize: 13 }}>MAD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Next button - in left panel */}
                            <button className="primary-btnE" onClick={handleNext} disabled={!endDate} style={{ 
                                width: isMobile ? 'calc(100vw - 40px)' : '100%', 
                                justifyContent: 'center', height: '55px', borderRadius: '18px', 
                                position: isMobile ? 'fixed' : 'relative', 
                                bottom: isMobile ? '20px' : 'auto', 
                                left: isMobile ? '50%' : 'auto', 
                                transform: isMobile ? 'translateX(-50%)' : 'none', 
                                zIndex: isMobile ? 1000 : 1, 
                                top: isMobile ? 'auto' : '284px',
                                boxShadow: isMobile ? '0 10px 30px rgba(0,0,0,0.3)' : ''
                            }}>
                                <span>{selectedLang === "AR" ? "متابعة الحجز" : "Confirmer les dates"}</span>
                                {selectedLang === "AR" ? <ArrowLeftIcon size={18} /> : <ArrowRightIcon size={18} />}
                            </button>
                        </div>

                        {/* ── RIGHT: Calendar ── */}
                        <div style={{ padding: isMobile ? '10px 0 20px' : '22px 24px' }}>
                            {/* Month nav */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="calendar-header-btn">
                                    <ChevronLeft size={18} />
                                </button>
                                <h3 style={{ fontSize: 16, fontWeight: 900, textTransform: 'capitalize', color: 'var(--text-main)', letterSpacing: '-0.3px', fontFamily: "'Syne', sans-serif" }}>{monthName}</h3>
                                <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="calendar-header-btn">
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            {/* Day names */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 8 }}>
                                {dayNames.map(d => (
                                    <div key={d} style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '4px 0' }}>{d}</div>
                                ))}
                            </div>

                            {/* Day grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                                {renderCalendar()}
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingAgreement;
