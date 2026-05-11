import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homeadmin = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = "UppCar - Tableau de Bord Admin";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: isDark 
        ? "linear-gradient(180deg, #090c13 0%, #111827 50%, #0f1419 100%)"
        : "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)",
      color: isDark ? "#e2e8f0" : "#0f172a",
      padding: "32px 20px",
      fontFamily: "'Inter', 'Syne', system-ui, sans-serif",
      transition: "all 0.3s ease",
    },
    wrapper: {
      maxWidth: 1400,
      margin: "0 auto",
    },
    header: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      marginBottom: 40,
      paddingBottom: 24,
      borderBottom: isDark ? "1px solid rgba(148,163,184,0.12)" : "1px solid rgba(16,185,129,0.15)",
    },
    headerTitle: {
      flex: 1,
      minWidth: 280,
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: isDark ? "rgba(14, 165, 233, 0.14)" : "rgba(16, 185, 129, 0.15)",
      color: isDark ? "#7dd3fc" : "#059669",
      padding: "8px 16px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    h1: {
      margin: "0 0 12px",
      fontSize: "clamp(2rem, 4vw, 3.2rem)",
      fontWeight: 900,
      lineHeight: 1.1,
      background: isDark 
        ? "linear-gradient(135deg, #60a5fa, #7dd3fc)" 
        : "linear-gradient(135deg, #059669, #10b981)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      maxWidth: 680,
      color: isDark ? "#cbd5e1" : "#475569",
      fontSize: 15,
      lineHeight: 1.8,
      margin: "12px 0 0",
    },
    headerActions: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    btn: {
      border: "none",
      borderRadius: 14,
      padding: "12px 24px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: 14,
    },
    btnPrimary: {
      background: isDark 
        ? "linear-gradient(135deg, #3b82f6, #60a5fa)" 
        : "linear-gradient(135deg, #059669, #10b981)",
      color: "#fff",
    },
    btnSecondary: {
      background: isDark ? "rgba(248, 113, 113, 0.15)" : "rgba(248, 113, 113, 0.1)",
      color: isDark ? "#fca5a5" : "#dc2626",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 18,
      marginBottom: 32,
    },
    statCard: {
      borderRadius: 24,
      padding: 24,
      background: isDark 
        ? "linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.88))" 
        : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,253,250,0.92))",
      border: isDark ? "1px solid rgba(148,163,184,0.12)" : "1px solid rgba(16,185,129,0.1)",
      boxShadow: isDark 
        ? "0 24px 80px rgba(15,23,42,0.18)" 
        : "0 8px 24px rgba(16,185,129,0.08)",
      backdropFilter: "blur(12px)",
    },
    statLabel: {
      fontSize: 12,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.16em",
      color: isDark ? "#94a3b8" : "#64748b",
      marginBottom: 16,
    },
    statValue: {
      fontSize: "2.8rem",
      fontWeight: 900,
      letterSpacing: "-0.02em",
      marginBottom: 8,
      color: isDark ? "#fff" : "#0f172a",
    },
    statDetail: {
      fontSize: 13,
      color: isDark ? "#94a3b8" : "#64748b",
      lineHeight: 1.6,
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 20,
      marginBottom: 32,
    },
    card: {
      borderRadius: 24,
      padding: 28,
      background: isDark 
        ? "rgba(15, 23, 42, 0.92)" 
        : "rgba(255, 255, 255, 0.95)",
      border: isDark 
        ? "1px solid rgba(148,163,184,0.12)" 
        : "1px solid rgba(16,185,129,0.1)",
      boxShadow: isDark 
        ? "0 28px 90px rgba(15,23,42,0.16)" 
        : "0 8px 32px rgba(16,185,129,0.08)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
      paddingBottom: 16,
      borderBottom: isDark ? "1px solid rgba(148,163,184,0.08)" : "1px solid rgba(16,185,129,0.08)",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 800,
      color: isDark ? "#f8fafc" : "#0f172a",
    },
    actionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: 14,
    },
    actionBtn: {
      borderRadius: 16,
      padding: "16px 12px",
      border: "none",
      color: "#fff",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: 13,
      textAlign: "center",
    },
    requestsList: {
      display: "grid",
      gap: 12,
    },
    requestItem: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 12,
      alignItems: "center",
      padding: "16px 20px",
      borderRadius: 18,
      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(16,185,129,0.03)",
      border: isDark ? "1px solid rgba(148,163,184,0.08)" : "1px solid rgba(16,185,129,0.1)",
    },
    trendList: {
      display: "grid",
      gap: 14,
    },
    trendItem: {
      padding: "16px 18px",
      borderRadius: 18,
      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(16,185,129,0.03)",
      border: isDark ? "1px solid rgba(148,163,184,0.08)" : "1px solid rgba(16,185,129,0.1)",
    },
    progressBar: {
      width: "100%",
      height: 6,
      borderRadius: 999,
      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(16,185,129,0.1)",
      overflow: "hidden",
      marginTop: 8,
    },
  };

  const stats = [
    {
      label: "Véhicules actifs",
      value: "128",
      detail: "Disponibles cette semaine",
      color: isDark ? "#38bdf8" : "#10b981",
    },
    {
      label: "Nouvelles réservations",
      value: "46",
      detail: "Ces 24 dernières heures",
      color: isDark ? "#ec4899" : "#ec4899",
    },
    {
      label: "Utilisateurs inscrits",
      value: "1,540",
      detail: "Croissance +12% ce mois",
      color: isDark ? "#a855f7" : "#7c3aed",
    },
    {
      label: "Revenu brut",
      value: "€27,400",
      detail: "Revenu généré cette semaine",
      color: isDark ? "#f59e0b" : "#d97706",
    },
  ];

  const actions = [
    { label: "Ajouter véhicule", color: isDark ? "#0ea5e9" : "#10b981" },
    { label: "Voir réservations", color: isDark ? "#22c55e" : "#059669" },
    { label: "Gestion utilisateurs", color: isDark ? "#8b5cf6" : "#7c3aed" },
    { label: "Analyse trafic", color: isDark ? "#f97316" : "#d97706" },
  ];

  const requests = [
    { id: "#R104", client: "M. Chafik A.", vehicle: "Tesla Model 3", status: "Confirmée", statusColor: "#22c55e" },
    { id: "#R108", client: "Mme Leila B.", vehicle: "Renault Clio", status: "En attente", statusColor: "#f59e0b" },
    { id: "#R112", client: "M. Karim M.", vehicle: "Peugeot 208", status: "Annulée", statusColor: "#ef4444" },
    { id: "#R117", client: "Mme Sara D.", vehicle: "Kia Rio", status: "Confirmée", statusColor: "#22c55e" },
  ];

  const trends = [
    { name: "Taux d'occupation", value: "89.2%", progress: 89.2, color: "#38bdf8" },
    { name: "Nouvelles inscriptions", value: "+72 cette semaine", progress: 72, color: "#a855f7" },
    { name: "Taux de satisfaction", value: "4.8/5.0", progress: 96, color: "#22c55e" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <div style={styles.badge}>
              📊 TABLEAU DE BORD ADMIN
            </div>
            <h1 style={styles.h1}>Bienvenue, administrateur UppCar</h1>
            <p style={styles.subtitle}>
              Gérez les véhicules, suivez les réservations en temps réel et accédez aux statistiques complètes depuis cette interface moderne et intuitive.
            </p>
          </div>
          <div style={styles.headerActions}>
            <button
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? "☀️ Clair" : "🌙 Sombre"}
            </button>
            <button
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} style={styles.statCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={styles.statLabel}>{stat.label}</span>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: stat.color }} />
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <p style={styles.statDetail}>{stat.detail}</p>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={styles.mainGrid}>
          {/* ACTIONS CARD */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Actions rapides</h2>
              <span style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>Accès direct</span>
            </div>
            <div style={styles.actionGrid}>
              {actions.map((action, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.actionBtn,
                    background: action.color,
                    boxShadow: `0 12px 32px ${action.color}30`,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.boxShadow = `0 16px 48px ${action.color}50`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = `0 12px 32px ${action.color}30`;
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* TRENDS CARD */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Tendances</h2>
              <span style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>Aujourd'hui</span>
            </div>
            <div style={styles.trendList}>
              {trends.map((trend, i) => (
                <div key={i} style={styles.trendItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: isDark ? "#cbd5e1" : "#374151" }}>{trend.name}</span>
                    <strong style={{ fontSize: 15, color: trend.color, fontWeight: 800 }}>{trend.value}</strong>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        width: `${trend.progress}%`,
                        height: "100%",
                        background: trend.color,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div style={styles.mainGrid}>
          {/* REQUESTS CARD */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Demandes récentes</h2>
              <span style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>Mise à jour 2 min</span>
            </div>
            <div style={styles.requestsList}>
              {requests.map((req, i) => (
                <div key={i} style={styles.requestItem}>
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
                      {req.id}
                    </p>
                    <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                      {req.client}
                    </p>
                    <p style={{ margin: "0", fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
                      {req.vehicle}
                    </p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: req.statusColor, whiteSpace: "nowrap" }}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY CARD */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Activité récente</h2>
              <span style={{ fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>Dernières 24h</span>
            </div>
            <div style={styles.trendList}>
              <div style={styles.trendItem}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: "0", fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                      Bilal Amri
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>
                      Réservation créée
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8" }}>Il y a 45 min</span>
                </div>
              </div>
              <div style={styles.trendItem}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: "0", fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                      Nadia Fakhri
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>
                      Véhicule ajouté
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8" }}>Il y a 2h</span>
                </div>
              </div>
              <div style={styles.trendItem}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: "0", fontSize: 14, fontWeight: 700, color: isDark ? "#f8fafc" : "#0f172a" }}>
                      Youssef Dib
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: isDark ? "#94a3b8" : "#64748b" }}>
                      Rapport généré
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: isDark ? "#64748b" : "#94a3b8" }}>Il y a 5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeadmin;
