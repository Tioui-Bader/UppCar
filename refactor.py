import os
import re

file_path = 'c:/Users/digit/Desktop/Revv/front/src/component/homeagence/Homeagence.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add import for translations
code = code.replace("import './Homeagence.css';", "import './Homeagence.css';\nimport { translations } from './i18n';")

# 2. Add language state and 't' into AgencyDashboard
code = code.replace(
    'const [mobileOpen, setMobileOpen] = useState(false);',
    'const [mobileOpen, setMobileOpen] = useState(false);\n    const [lang, setLang] = useState("fr");\n    const t = translations[lang];'
)

# 3. Apply RTL direction based on language
code = code.replace(
    'document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");',
    'document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");\n        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");'
)
code = code.replace('[dark]);', '[dark, lang]);')

# 4. Inject Language Selector into Topbar
old_topbar = '''<button className="icon-btn notif-btn">
                                <Icon d={icons.bell} size={16} />
                                <span className="notif-dot" />
                            </button>'''
new_topbar = '''<div style={{ display: "flex", background: "var(--surface2)", borderRadius: "12px", padding: "4px", border: "1px solid var(--border)", gap: "4px", alignItems: "center" }}>
                                {["fr", "gb", "ar"].map(l => (
                                    <button 
                                        key={l}
                                        onClick={() => setLang(l)}
                                        style={{ background: lang === l ? "var(--text)" : "transparent", color: lang === l ? "var(--bg)" : "var(--muted)", border: "none", borderRadius: "8px", padding: "4px 8px", fontSize: "11px", fontWeight: "800", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s" }}>
                                        {l === "gb" ? "en" : l}
                                    </button>
                                ))}
                            </div>
                            <button className="icon-btn notif-btn">
                                <Icon d={icons.bell} size={16} />
                                <span className="notif-dot" />
                            </button>'''
code = code.replace(old_topbar, new_topbar)

# 5. Pass `t` to Pages
code = code.replace('<DashboardPage dark={dark} />', '<DashboardPage dark={dark} t={t} />')
code = code.replace('<CarsPage />', '<CarsPage t={t} />')
code = code.replace('<ReservationsPage />', '<ReservationsPage t={t} />')
code = code.replace('<CustomersPage />', '<CustomersPage t={t} />')
code = code.replace('<AnalyticsPage dark={dark} />', '<AnalyticsPage dark={dark} t={t} />')
code = code.replace('<SettingsPage dark={dark} setDark={setDark} />', '<SettingsPage dark={dark} setDark={setDark} t={t} />')

# 6. Update Page component signatures
code = code.replace('function DashboardPage({ dark })', 'function DashboardPage({ dark, t })')
code = code.replace('function CarsPage()', 'function CarsPage({ t })')
code = code.replace('function ReservationsPage()', 'function ReservationsPage({ t })')
code = code.replace('function CustomersPage()', 'function CustomersPage({ t })')
code = code.replace('function AnalyticsPage({ dark })', 'function AnalyticsPage({ dark, t })')
code = code.replace('function SettingsPage({ dark, setDark })', 'function SettingsPage({ dark, setDark, t })')

# 7. Basic top-level translations in AgencyDashboard
code = code.replace('"Tableau de bord"', 't.dashboard')
code = code.replace('"Véhicules"', 't.cars')
code = code.replace('"Réservations", icon: icons.reservations', 't.reservations, icon: icons.reservations')
code = code.replace('"Clients"', 't.customers')
code = code.replace('"Analytiques"', 't.analytics')
code = code.replace('"Paramètres", icon: icons.settings', 't.settings, icon: icons.settings')
code = code.replace('"Navigation"', '{t.navLabel}')
code = code.replace('"Préférences"', '{t.prefLabel}')
code = code.replace('"En direct"', 't.live')
code = code.replace('`${CARS.length} véhicules`', '`${CARS.length} ${t.vehiclesCount}`')
code = code.replace('`${RESERVATIONS.length} total`', '`${RESERVATIONS.length} ${t.total}`')
code = code.replace('`${CLIENTS.length} clients`', '`${CLIENTS.length} ${t.customers}`')
code = code.replace('"Agence Pro"', 't.agencyPro')
code = code.replace('"Plan Pro · Marrakech"', '{t.planPro}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Modification complete")
