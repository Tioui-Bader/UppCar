const fs = require('fs');
const path = require('path');

const filePath = path.join('C:', 'Users', 'digit', 'Desktop', 'Revv', 'front', 'src', 'component', 'home', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. PHRASES
content = content.replace(
  'const PHRASES = ["Don\'t Wait. Just Drive.", "Reserve in 10 Seconds.", "Your Dream Car. One Click Away.", "The Road is Yours. Reserve Now."];',
  'const PHRASES = ["The Ultimate Marketplace.", "A Professional SaaS.", "Data-Driven Growth.", "Transform Your Rental Business."];'
);

// 2. HERO H1
content = content.replace(
  '{isMobile\n              ? <>The Car You Want Ready To Drive<br /></>\n              : <>The Car You Want The Second<br />You Need It</>\n            }',
  '{isMobile\n              ? <>The Smart Way to<br />Rent & Manage</>\n              : <>The Smart Way to Rent<br />and Manage Vehicles</>\n            }'
);

// 3. HERO P
content = content.replace(
  '<p style={{ color: "var(--text-muted)", fontSize: 25, maxWidth: 760, marginBottom: 38, animation: "fadeUp 0.7s 0.3s ease both" }}>\n              Professional-grade quantitative tools. No coding required.<br />Verification built into the architecture.\n            </p>',
  '<p style={{ color: "var(--text-muted)", fontSize: 20, maxWidth: 860, marginBottom: 38, animation: "fadeUp 0.7s 0.3s ease both", lineHeight: 1.6 }}>\n              Join the most advanced digital ecosystem for car rentals. Find your perfect ride in seconds, or scale your rental agency with our powerful all-in-one management platform.\n            </p>'
);

// 4. HERO BADGE
content = content.replace(
  '{isMobile ? "No Deposit · Fully Insured" : "No Deposit Required – Fully Insured Vehicles"}',
  '{isMobile ? "Marketplace & SaaS Platform" : "Complete Marketplace & Agency SaaS Platform"}'
);

// 5. HERO BUTTONS
content = content.replace(
  '<button className="primary-btnDE" style={{ padding: isMobile ? "16px 24px" : "16px 36px", fontSize: 16, width: isMobile ? "200px" : "auto" }}>\n              Reserve Now <ArrowRightIcon size={19} />\n            </button>\n            <button className="secondary-btn" style={{ padding: isMobile ? "14px 24px" : "16px 36px", fontSize: isMobile ? 15 : 16, width: isMobile ? "200px" : "auto" }}>\n              <CompassIcon size={18} /> Browse Fleet\n            </button>',
  '<button className="primary-btnDE" style={{ padding: isMobile ? "16px 24px" : "16px 36px", fontSize: 16, width: isMobile ? "200px" : "auto" }}>\n              Find a Car <ArrowRightIcon size={19} />\n            </button>\n            <button className="secondary-btn" style={{ padding: isMobile ? "14px 24px" : "16px 36px", fontSize: isMobile ? 15 : 16, width: isMobile ? "200px" : "auto" }}>\n              <ZapIcon size={18} /> Partner With Us\n            </button>'
);

// 6. HOW IT WORKS TEXT
content = content.replace(
  'num: "01", color: "#10b981", title: "Browse & Pick", desc: "500+ hand-selected vehicles. Filter by brand, model, specs, and live availability.", features: ["Real-time availability", "500+ vehicles", "Filter by specs & price"], badge: "10 seconds",',
  'num: "01", color: "#10b981", title: "Browse & Filter", desc: "Search hundreds of available cars by city, brand, or price. Compare options instantly.", features: ["Real-time availability", "500+ vehicles", "Filter by specs & price"], badge: "10 seconds",'
);
content = content.replace(
  'num: "02", color: "#3b82f6", title: "Confirm Instantly", desc: "No paperwork. No deposit. One tap confirms your booking — insurance activates immediately.", features: [], badge: "Zero deposit",',
  'num: "02", color: "#3b82f6", title: "Book Instantly", desc: "Confirm your choice securely with transparent pricing and zero hidden fees. No paperwork.", features: [], badge: "Zero deposit",'
);
content = content.replace(
  'num: "03", color: "#a855f7", title: "Unlock & Drive", desc: "Walk up, tap your phone, doors open. Drive anywhere. Return to any UppCar hub.", features: [], badge: "No keys needed",',
  'num: "03", color: "#a855f7", title: "Pick Up & Drive", desc: "Pick up your car and go. Manage your entire trip and reservations from your profile.", features: [], badge: "No keys needed",'
);

// 7. PRICING & FEATURES INJECTION
const pricingFeaturesJSX = `
        {/* ══ PLATFORM ECOSYSTEM ══ */}
        <section style={{ padding: isMobile ? "60px 16px" : "100px 20px", position: "relative", zIndex: 1, background: "rgba(0,0,0,0.015)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, color: "var(--text-main)", textAlign: "center", marginBottom: 60 }}>The UppCar Ecosystem</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 32, marginBottom: 80 }}>
              {[
                { t: "Marketplace for Drivers", d: "Stop endlessly searching. Compare live availability, filter by specs, and book instantly. No paperwork, just the open road.", c: "#10b981" },
                { t: "Command Center for Agencies", d: "Get a complete SaaS workspace. Manage your fleet, track reservations in real time, and analyze your business performance automatically.", c: "#3b82f6" },
                { t: "Data-Driven Growth", d: "Leverage real-time analytics to understand your top-performing vehicles, track monthly revenue, and unlock forecasting insights.", c: "#a855f7" }
              ].map(f => (
                <div key={f.t} style={{ padding: 40, borderTop: \`4px solid \${f.c}\`, background: "var(--card-bg)", borderRadius: "0 0 24px 24px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-main)", marginBottom: 16 }}>{f.t}</h3>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{f.d}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, marginBottom: 80 }}>
              <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 32, padding: 48, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: "#10b981", opacity: 0.1, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text-main)", marginBottom: 32 }}>Why Clients Love UppCar</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { title: "Zero Friction", desc: "Compare multiple agencies in one unified interface." },
                    { title: "Total Transparency", desc: "What you see is what you pay. No surprises at the counter." },
                    { title: "Control on the Go", desc: "View trips, edit profiles, and manage reservations seamlessly."}
                  ].map(b => (
                    <li key={b.title} style={{ display: "flex", gap: 16 }}>
                      <div style={{ marginTop: 2, flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--text-main)", marginBottom: 4 }}>{b.title}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 15 }}>{b.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 32, padding: 48, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: "#3b82f6", opacity: 0.1, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text-main)", marginBottom: 32 }}>Why Agencies Choose Us</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { title: "Centralized Operations", desc: "Ditch manual tracking. Cars, bookings, and clients organized digitally." },
                    { title: "Extended Visibility", desc: "Reach thousands of new customers who are ready to book." },
                    { title: "Unmatched Analytics", desc: "Stop guessing. See your exact city performance and KPIs at a glance."}
                  ].map(b => (
                    <li key={b.title} style={{ display: "flex", gap: 16 }}>
                      <div style={{ marginTop: 2, flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: "var(--text-main)", marginBottom: 4 }}>{b.title}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 15 }}>{b.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, color: "var(--text-main)", textAlign: "center", marginBottom: 20 }}>A Model Built for Agency Growth</h2>
            <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", textAlign: "center" }}>Join UppCar and transform your business with our hybrid partnership model. We believe in proving our value first.</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 24, paddingBottom: 60 }}>
              {[
                { title: "Free Trial", price: "2 Months Free", desc: "Full access to our complete SaaS dashboard, fleet management, and analytics with zero upfront commitment.", color: "#10b981", badge: "Start Here" },
                { title: "SaaS Subscription", price: "199 MAD / mo", desc: "After your trial, keep your powerful workspace to manage your agency operations efficiently.", color: "#3b82f6" },
                { title: "Marketplace Commission", price: "5% success fee", desc: "We only win when you win. A flat commission applies to every confirmed booking through the platform.", color: "#a855f7" }
              ].map((p, i) => (
                <div key={p.title} style={{ background: "var(--card-bg)", border: \`1px solid \${p.color}40\`, borderRadius: 32, padding: "40px 32px", position: "relative", overflow: "hidden", transition: "all 0.4s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: p.color, opacity: 0.1, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
                  {p.badge && <div style={{ position: "absolute", top: 24, right: 24, background: \`\${p.color}20\`, color: p.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{p.badge}</div>}
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, color: p.color, marginBottom: 16 }}>{p.title}</h3>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text-main)", marginBottom: 20, letterSpacing: -1, whiteSpace: "nowrap" }}>{p.price}</div>
                  <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FLEET ══ */}`;

content = content.replace('{/* ══ FLEET ══ */}', pricingFeaturesJSX);

// 8. CTA UPDATE
content = content.replace(
  '<span style={{ whiteSpace: "nowrap", display: "block" }}>The Road is Yours</span>\n              <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Reserve Now?</span>',
  '<span style={{ whiteSpace: "nowrap", display: "block" }}>Ready to Shift</span>\n              <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>into High Gear?</span>'
);
content = content.replace(
  'Join 50,000+ drivers already using UppCar. No deposit. No queues. Just open the app and go.',
  "Whether you're booking your next weekend getaway or taking your rental business to the next level, UppCar has everything you need."
);
content = content.replace(
  'Reserve Your First Ride',
  'Get Started for Free'
);
content = content.replace(
  'Explore the App',
  'Browse the Fleet'
);

// 9. HEADER "How it works" -> "Book Your Car" etc
content = content.replace(
  'From Zero<br />\n                <span style={{ WebkitTextStroke: "2px var(--accent-color)", WebkitTextFillColor: "transparent", color: "transparent" }}>to Rolling.</span>',
  'Book Your Car<br />\n                <span style={{ WebkitTextStroke: "2px var(--accent-color)", WebkitTextFillColor: "transparent", color: "transparent" }}>in 3 Steps.</span>'
);
content = content.replace(
  'We rebuilt car rental from the ground up. No deposits. No paperwork. No queues.',
  'The easiest way to rent a vehicle. No deposits, no paperwork, no queues.'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete!');
