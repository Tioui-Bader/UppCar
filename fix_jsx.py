import os
import re

file_path = 'c:/Users/digit/Desktop/Revv/front/src/component/homeagence/Homeagence.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# We need to wipe from `                    <div className="sidebar-bottom">` all the way to `            </div>\n        </>\n    );\n}` inside `AgencyDashboard`.

start_marker = '                    <div className="sidebar-bottom">'
end_marker = '            </div>\n        </>\n    );\n}'

if start_marker in text and end_marker in text:
    before = text.split(start_marker)[0]
    after = text.split(end_marker)[1]
    
    correct_block = '''                    <div className="sidebar-bottom">
                        <div className="user-pill">
                            <div className="user-avatar">UC</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="user-name">UppCar Agency</div>
                                <div className="user-role">{t.planPro}</div>
                            </div>
                            <div className="online-dot" />
                        </div>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="main">
                    {/* TOPBAR */}
                    <header className="topbar">
                        <button className="icon-btn" style={{ display: "none" }} onClick={() => setMobileOpen(o => !o)} id="menu-btn">
                            <Icon d={icons.menu} size={18} />
                        </button>
                        <div>
                            <div className="topbar-title">{pageTitle[page]}</div>
                        </div>
                        <span className="topbar-badge">{pageBadge[page]}</span>
                        <div className="topbar-actions">
                            <div style={{ position: "relative" }}>
                                <button className="icon-btn" onClick={() => setLangMenuOpen(!langMenuOpen)} style={{ background: langMenuOpen ? "var(--text)" : "transparent", color: langMenuOpen ? "var(--bg)" : "var(--text)" }}>
                                    <Icon d={icons.globe} size={16} />
                                </button>
                                
                                {langMenuOpen && (
                                    <div style={{ position: "absolute", top: "125%", right: 0, display: "flex", background: "var(--surface2)", borderRadius: "12px", padding: "6px", border: "1px solid var(--border)", gap: "4px", alignItems: "center", animation: "slideUp 0.2s ease", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                                        {["ar", "fr", "gb"].map(l => (
                                            <button 
                                                key={l}
                                                onClick={() => { setLang(l === "gb" ? "en" : (l === "ar" ? "ar" : "fr")); setLangMenuOpen(false); }}
                                                style={{ background: lang === (l === "gb" ? "en" : (l === "ar" ? "ar" : "fr")) ? "var(--text)" : "transparent", color: lang === (l === "gb" ? "en" : (l === "ar" ? "ar" : "fr")) ? "var(--bg)" : "var(--muted)", border: "none", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", fontWeight: "800", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}>
                                                {l.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <button className="icon-btn" onClick={() => setDark(d => !d)}>
                                <Icon d={dark ? icons.sun : icons.moon} size={16} />
                            </button>
                            <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 12, color: "#fff", cursor: "pointer" }}>UC</div>
                        </div>
                    </header>

                    {/* PAGE CONTENT */}
                    <div className="content">
                        {page === "dashboard" && <DashboardPage dark={dark} t={t} />}
                        {page === "cars" && <CarsPage t={t} />}
                        {page === "reservations" && <ReservationsPage t={t} />}
                        {page === "customers" && <CustomersPage t={t} />}
                        {page === "analytics" && <AnalyticsPage dark={dark} t={t} />}
                        {page === "settings" && <SettingsPage dark={dark} setDark={setDark} t={t} />}
                    </div>
                </main>
            </div>
        </>
    );
}'''
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(before + correct_block + after)
    print("Fixed.")
else:
    print("Markers not found.")
