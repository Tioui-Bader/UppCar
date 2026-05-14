import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homeadmin = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Overview");

  useEffect(() => {
    document.title = "UppCar - Admin Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", icon: "�" },
    { name: "Users", icon: "👥" },
    { name: "Agencies", icon: "🏘️" },
    { name: "Reservations", icon: "🗓️" },
    { name: "Financials", icon: "💹" },
  ];

  const kpis = [
    { label: "New Users", value: "24", icon: "👤", indicator: "+12%", color: "#10b981" },
    { label: "New Agencies", value: "3", icon: "🏢", indicator: "+2", color: "#3b82f6" },
    { label: "Reservations", value: "12", icon: "📅", indicator: "+8%", color: "#f59e0b" },
    { label: "Daily Revenue", value: "$2,450", icon: "💵", indicator: "+15%", color: "#ef4444" },
  ];

  const activities = [
    {
      user: "John Doe",
      action: "Created new",
      entity: "User Account",
      status: "SUCCESS",
      time: "2 min ago",
      statusColor: "#ef4444"
    },
    {
      user: "Sarah Wilson",
      action: "Updated",
      entity: "Agency Profile",
      status: "UPDATED",
      time: "15 min ago",
      statusColor: "#3b82f6"
    },
    {
      user: "Mike Johnson",
      action: "Confirmed",
      entity: "Reservation #1234",
      status: "CONFIRMED",
      time: "1 hour ago",
      statusColor: "#10b981"
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#eef2ff",
      fontFamily: "'Inter', system-ui, sans-serif",
      display: "flex",
    }}>
      {/* SIDEBAR */}
      <div style={{
        width: 300,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(15, 23, 42, 0.08)",
      }}>
        {/* Logo */}
        <div style={{
          padding: "24px 20px",
          borderBottom: "1px solid #e2e8f0",
        }}>
          <h1 style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            🚗 UppCar Admin
          </h1>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: "20px 0",
        }}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveNav(item.name)}
              style={{
                width: "100%",
                border: "none",
                backgroundColor: activeNav === item.name ? "#eff6ff" : "transparent",
                color: activeNav === item.name ? "#1e293b" : "#64748b",
                padding: "14px 22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 15,
                fontWeight: activeNav === item.name ? 700 : 500,
                justifyContent: "flex-start",
                borderLeft: activeNav === item.name ? "4px solid #3b82f6" : "4px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                display: "grid",
                placeItems: "center",
                backgroundColor: activeNav === item.name ? "#dbeafe" : "#f8fafc",
                color: activeNav === item.name ? "#2563eb" : "#94a3b8",
                fontSize: 18,
              }}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{
          padding: "20px",
          borderTop: "1px solid #e2e8f0",
        }}>
          <button style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 16px",
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 12,
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
          >
            📊 New Report
          </button>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            <div style={{
              padding: "8px 12px",
              color: "#64748b",
              fontSize: 14,
              cursor: "pointer",
              borderRadius: 6,
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#f1f5f9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
              ❓ Help Center
            </div>
            <div
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                color: "#dc2626",
                fontSize: 14,
                cursor: "pointer",
                borderRadius: 6,
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#fef2f2"}
              onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
              🚪 Logout
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* TOP HEADER */}
        <header style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}>
          <div style={{ flex: 1, maxWidth: 400 }}>
            <div style={{
              position: "relative",
            }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  paddingLeft: 40,
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  fontSize: 14,
                  backgroundColor: "#f8fafc",
                  outline: "none",
                }}
              />
              <span style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
                fontSize: 16,
              }}>
                🔍
              </span>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              borderRadius: 6,
              color: "#64748b",
              fontSize: 18,
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#f1f5f9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
              🔔
            </button>
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              borderRadius: 6,
              color: "#64748b",
              fontSize: 18,
              transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#f1f5f9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
            >
              ⚙️
            </button>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}>
              A
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main style={{
          flex: 1,
          padding: 24,
          overflow: "auto",
        }}>
          {/* KPI GRID */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              margin: "0 0 20px",
              fontSize: 24,
              fontWeight: 700,
              color: "#1e293b",
            }}>
              Today at a Glance
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
            }}>
              {kpis.map((kpi, i) => (
                <div key={i} style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    backgroundColor: kpi.color,
                    color: "#ffffff",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}>
                    {kpi.indicator}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 16,
                  }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: `${kpi.color}22`,
                      color: kpi.color,
                      fontSize: 24,
                    }}>
                      {kpi.icon}
                    </div>
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: 14,
                        color: "#64748b",
                        fontWeight: 600,
                      }}>
                        {kpi.label}
                      </p>
                      <p style={{
                        margin: "8px 0 0",
                        fontSize: 30,
                        fontWeight: 800,
                        color: "#1e293b",
                      }}>
                        {kpi.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY TABLE */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}>
            <div style={{
              padding: 24,
              borderBottom: "1px solid #e2e8f0",
            }}>
              <h2 style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: "#1e293b",
              }}>
                Recent Activity
              </h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}>
                    <th style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      User / Action
                    </th>
                    <th style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      Entity
                    </th>
                    <th style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      Status
                    </th>
                    <th style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      Time
                    </th>
                    <th style={{
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, i) => (
                    <tr key={i} style={{
                      borderBottom: i < activities.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fbff"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{
                        padding: "20px 24px",
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}>
                          <div style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: "#e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#475569",
                          }}>
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p style={{
                              margin: 0,
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#1e293b",
                            }}>
                              {activity.user}
                            </p>
                            <p style={{
                              margin: "2px 0 0",
                              fontSize: 12,
                              color: "#64748b",
                            }}>
                              {activity.action}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{
                        padding: "20px 24px",
                        fontSize: 14,
                        color: "#374151",
                        fontWeight: 500,
                      }}>
                        {activity.entity}
                      </td>
                      <td style={{
                        padding: "20px 24px",
                      }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 12px",
                          borderRadius: 12,
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: `${activity.statusColor}20`,
                          color: activity.statusColor,
                        }}>
                          {activity.status}
                        </span>
                      </td>
                      <td style={{
                        padding: "20px 24px",
                        fontSize: 14,
                        color: "#64748b",
                      }}>
                        {activity.time}
                      </td>
                      <td style={{
                        padding: "20px 24px",
                      }}>
                        <button style={{
                          padding: "6px 12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: 6,
                          backgroundColor: "transparent",
                          color: "#374151",
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#f1f5f9";
                          e.target.style.borderColor = "#cbd5e1";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.borderColor = "#e2e8f0";
                        }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homeadmin;
