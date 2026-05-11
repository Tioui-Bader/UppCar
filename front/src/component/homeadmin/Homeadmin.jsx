import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homeadmin = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = "UppCar - Tableau de Bord Admin";
    
    // Ultra-modern CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes floatIn { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes pulse-subtle { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
      .admin-wrapper { animation: fadeIn 0.7s ease-out; }
      .stat-card { animation: floatIn 0.6s ease-out backwards; }
      .stat-card:nth-child(1) { animation-delay: 0.1s; }
      .stat-card:nth-child(2) { animation-delay: 0.2s; }
      .stat-card:nth-child(3) { animation-delay: 0.3s; }
      .stat-card:nth-child(4) { animation-delay: 0.4s; }
      .card-section { animation: slideInUp 0.7s ease-out backwards; }
      .card-section:nth-child(1) { animation-delay: 0.5s; }
      .card-section:nth-child(2) { animation-delay: 0.6s; }
      .btn-action:hover { transform: translateY(-6px) scale(1.02); }
      .request-item:hover { transform: translateX(8px); background: rgba(59, 130, 246, 0.1) !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const stats = [
    { label: "Véhicules actifs", value: "128", detail: "Disponibles cette semaine", icon: "🚗", color: "#3b82f6" },
    { label: "Réservations", value: "46", detail: "Ces 24 dernières heures", icon: "📅", color: "#ec4899" },
    { label: "Utilisateurs", value: "1,540", detail: "Croissance +12% ce mois", icon: "👥", color: "#a855f7" },
    { label: "Revenu brut", value: "€27.4K", detail: "Généré cette semaine", icon: "💰", color: "#f59e0b" },
  ];

  const actions = [
    { label: "Ajouter Véhicule", icon: "➕", color: "#0ea5e9" },
    { label: "Réservations", icon: "📋", color: "#22c55e" },
    { label: "Utilisateurs", icon: "👤", color: "#8b5cf6" },
    { label: "Analytiques", icon: "📊", color: "#f97316" },
  ];

  const requests = [
    { id: "#A104", client: "M. Chafik A.", vehicle: "Tesla Model 3", status: "Confirmée", color: "#22c55e" },
    { id: "#A108", client: "Mme Leila B.", vehicle: "Renault Clio", status: "En attente", color: "#f59e0b" },
    { id: "#A112", client: "M. Karim M.", vehicle: "Peugeot 208", status: "Annulée", color: "#ef4444" },
    { id: "#A117", client: "Mme Sara D.", vehicle: "Kia Rio", status: "Confirmée", color: "#22c55e" },
  ];

  const metrics = [
    { name: "Taux d'occupation", value: "89.2%", max: 100, color: "#38bdf8" },
    { name: "Inscriptions", value: "72 cette semaine", max: 100, color: "#a855f7" },
    { name: "Satisfaction", value: "4.8/5.0", max: 5, color: "#22c55e" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: isDark 
        ? "radial-gradient(ellipse 150% 100% at 50% 0%, rgba(30,41,59,0.4) 0%, rgba(9,12,19,0.98) 80%)"
        : "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 50%, #f0fdf4 100%)",
      color: isDark ? "#e2e8f0" : "#0f172a",
      padding: "48px 24px",
      fontFamily: "'Inter', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: isDark
          ? `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          : `radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
             radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1460, margin: "0 auto", position: "relative", zIndex: 1 }} className="admin-wrapper">
        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 40,
          marginBottom: 60,
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: isDark 
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.08))" 
                : "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.08))",
              color: isDark ? "#60a5fa" : "#0ea5e9",
              padding: "12px 20px",
              borderRadius: 50,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: isDark ? "1px solid rgba(59, 130, 246, 0.25)" : "1px solid rgba(16, 185, 129, 0.2)",
              backdropFilter: "blur(10px)",
              marginBottom: 20,
            }}>
              📊 Tableau de Bord
            </div>
            <h1 style={{
              margin: "0 0 18px",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 950,
              lineHeight: 1.1,
              background: isDark 
                ? "linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)" 
                : "linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>
              Bienvenue, Admin UppCar
            </h1>
            <p style={{
              maxWidth: 720,
              fontSize: 16,
              color: isDark ? "#cbd5e1" : "#475569",
              lineHeight: 1.8,
              margin: 0,
              fontWeight: 500,
            }}>
              Contrôlez la flotte complète, suivez les réservations en temps réel et exploitez les données pour optimiser votre activité.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                border: "none",
                borderRadius: 14,
                padding: "12px 26px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
                background: isDark 
                  ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" 
                  : "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                marginBottom: 8,
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 12px 32px rgba(59, 130, 246, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(59, 130, 246, 0.3)";
              }}
            >
              {isDark ? "☀️ Clair" : "🌙 Sombre"}
            </button>
            <button
              onClick={handleLogout}
              style={{
                border: isDark ? "1px solid rgba(248, 113, 113, 0.4)" : "1px solid rgba(248, 113, 113, 0.3)",
                borderRadius: 14,
                padding: "12px 26px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
                background: isDark ? "rgba(248, 113, 113, 0.1)" : "rgba(248, 113, 113, 0.08)",
                color: isDark ? "#fca5a5" : "#dc2626",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                marginBottom: 8,
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDark ? "rgba(248, 113, 113, 0.2)" : "rgba(248, 113, 113, 0.15)";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = isDark ? "rgba(248, 113, 113, 0.1)" : "rgba(248, 113, 113, 0.08)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginBottom: 40,
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card" style={{
              borderRadius: 22,
              padding: 28,
              background: isDark 
                ? "linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.7) 100%)" 
                : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,253,250,0.95) 100%)",
              border: isDark 
                ? "1px solid rgba(148,163,184,0.2)" 
                : "1px solid rgba(16,185,129,0.15)",
              boxShadow: isDark 
                ? "0 20px 60px rgba(15,23,42,0.25)" 
                : "0 10px 35px rgba(16,185,129,0.1)",
              backdropFilter: "blur(20px)",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = isDark 
                ? "0 30px 80px rgba(15,23,42,0.35)" 
                : "0 15px 50px rgba(16,185,129,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isDark 
                ? "0 20px 60px rgba(15,23,42,0.25)" 
                : "0 10px 35px rgba(16,185,129,0.1)";
            }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: isDark ? "#94a3b8" : "#64748b",
                }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: 24 }}>{stat.icon}</span>
              </div>
              <div style={{
                fontSize: "3.2rem",
                fontWeight: 950,
                letterSpacing: "-0.03em",
                marginBottom: 12,
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {stat.value}
              </div>
              <p style={{
                fontSize: 14,
                color: isDark ? "#94a3b8" : "#64748b",
                margin: 0,
                fontWeight: 500,
              }}>
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1.2fr",
          gap: 22,
          marginBottom: 30,
        }}>
          {/* ACTIONS CARD */}
          <div className="card-section" style={{
            borderRadius: 24,
            padding: 32,
            background: isDark 
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)" 
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(240, 253, 250, 0.96) 100%)",
            border: isDark 
              ? "1px solid rgba(148,163,184,0.15)" 
              : "1px solid rgba(16,185,129,0.12)",
            boxShadow: isDark 
              ? "0 25px 80px rgba(15,23,42,0.2)" 
              : "0 12px 40px rgba(16,185,129,0.1)",
            backdropFilter: "blur(30px)",
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 850,
              color: isDark ? "#f1f5f9" : "#0f172a",
              margin: "0 0 28px",
              letterSpacing: "-0.01em",
            }}>
              Actions rapides
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}>
              {actions.map((action, i) => (
                <button
                  key={i}
                  className="btn-action"
                  style={{
                    borderRadius: 16,
                    padding: "20px 16px",
                    border: "none",
                    color: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                    fontSize: 14,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                    boxShadow: `0 12px 36px ${action.color}40`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "-0.5px",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{action.icon}</div>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* METRICS CARD */}
          <div className="card-section" style={{
            borderRadius: 24,
            padding: 32,
            background: isDark 
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)" 
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(240, 253, 250, 0.96) 100%)",
            border: isDark 
              ? "1px solid rgba(148,163,184,0.15)" 
              : "1px solid rgba(16,185,129,0.12)",
            boxShadow: isDark 
              ? "0 25px 80px rgba(15,23,42,0.2)" 
              : "0 12px 40px rgba(16,185,129,0.1)",
            backdropFilter: "blur(30px)",
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 850,
              color: isDark ? "#f1f5f9" : "#0f172a",
              margin: "0 0 28px",
              letterSpacing: "-0.01em",
            }}>
              Métriques clés
            </h2>
            <div style={{ display: "grid", gap: 18 }}>
              {metrics.map((metric, i) => (
                <div key={i} style={{
                  padding: "20px 22px",
                  borderRadius: 18,
                  background: isDark 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))" 
                    : "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.03))",
                  border: isDark 
                    ? "1px solid rgba(148,163,184,0.1)" 
                    : "1px solid rgba(16,185,129,0.12)",
                  transition: "all 0.3s ease",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, color: isDark ? "#cbd5e1" : "#374151", fontWeight: 600 }}>{metric.name}</span>
                    <strong style={{ fontSize: 15, color: metric.color, fontWeight: 800 }}>{metric.value}</strong>
                  </div>
                  <div style={{
                    width: "100%",
                    height: 8,
                    borderRadius: 10,
                    background: isDark ? "rgba(255,255,255,0.1)" : "rgba(16,185,129,0.1)",
                    overflow: "hidden",
                    position: "relative",
                  }}>
                    <div style={{
                      width: `${(metric.value.split('/')[0] / metric.max) * 100}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`,
                      borderRadius: 10,
                      transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 22,
        }}>
          {/* REQUESTS */}
          <div className="card-section" style={{
            borderRadius: 24,
            padding: 32,
            background: isDark 
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)" 
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(240, 253, 250, 0.96) 100%)",
            border: isDark 
              ? "1px solid rgba(148,163,184,0.15)" 
              : "1px solid rgba(16,185,129,0.12)",
            boxShadow: isDark 
              ? "0 25px 80px rgba(15,23,42,0.2)" 
              : "0 12px 40px rgba(16,185,129,0.1)",
            backdropFilter: "blur(30px)",
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 850,
              color: isDark ? "#f1f5f9" : "#0f172a",
              margin: "0 0 28px",
              letterSpacing: "-0.01em",
            }}>
              Demandes récentes
            </h2>
            <div style={{ display: "grid", gap: 14 }}>
              {requests.map((req, i) => (
                <div key={i} className="request-item" style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                  alignItems: "center",
                  padding: "20px 24px",
                  borderRadius: 18,
                  background: isDark 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))" 
                    : "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.03))",
                  border: isDark 
                    ? "1px solid rgba(148,163,184,0.1)" 
                    : "1px solid rgba(16,185,129,0.12)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}>
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>{req.id}</p>
                    <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>{req.client}</p>
                    <p style={{ margin: "0", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>{req.vehicle}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: req.color, whiteSpace: "nowrap" }}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="card-section" style={{
            borderRadius: 24,
            padding: 32,
            background: isDark 
              ? "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.6) 100%)" 
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(240, 253, 250, 0.96) 100%)",
            border: isDark 
              ? "1px solid rgba(148,163,184,0.15)" 
              : "1px solid rgba(16,185,129,0.12)",
            boxShadow: isDark 
              ? "0 25px 80px rgba(15,23,42,0.2)" 
              : "0 12px 40px rgba(16,185,129,0.1)",
            backdropFilter: "blur(30px)",
          }}>
            <h2 style={{
              fontSize: 22,
              fontWeight: 850,
              color: isDark ? "#f1f5f9" : "#0f172a",
              margin: "0 0 28px",
              letterSpacing: "-0.01em",
            }}>
              Activité
            </h2>
            <div style={{ display: "grid", gap: 16 }}>
              {[
                { name: "Bilal Amri", action: "Réservation créée", time: "45 min" },
                { name: "Nadia Fakhri", action: "Véhicule ajouté", time: "2h" },
                { name: "Youssef Dib", action: "Rapport généré", time: "5h" },
              ].map((activity, i) => (
                <div key={i} style={{
                  padding: "18px 20px",
                  borderRadius: 16,
                  background: isDark 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))" 
                    : "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.03))",
                  border: isDark 
                    ? "1px solid rgba(148,163,184,0.1)" 
                    : "1px solid rgba(16,185,129,0.12)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ margin: "0", fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                        {activity.name}
                      </p>
                      <p style={{ margin: "6px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>
                        {activity.action}
                      </p>
                    </div>
                    <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8" }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeadmin;
