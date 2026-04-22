const fs = require('fs');
const file = './front/src/component/home/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const newComponent = `          {/* ══════════════════════════════════════════
              ULTRA-MODERN AI SEARCH INPUT
          ══════════════════════════════════════════ */}
          <div style={{
            width: "100%", maxWidth: isMobile ? "100%" : 780,
            marginBottom: isMobile ? 32 : 48,
            animation: "fadeUp 0.8s 0.5s ease both",
            position: "relative", zIndex: 10,
            bottom: isMobile ? 0 : 20,
          }}>
            {/* Animated Gradient Background Glow */}
            <div style={{
              position: "absolute", inset: -4, borderRadius: 60,
              background: "linear-gradient(90deg, #10b981, #3b82f6, #a855f7, #10b981)",
              backgroundSize: "300% 100%",
              animation: "btnGradientMove 5s linear infinite",
              filter: "blur(14px)", opacity: aiFocused ? 0.6 : 0.15,
              transition: "opacity 0.4s ease",
              pointerEvents: "none", zIndex: -1
            }} />

            {/* Main Input Wrapper */}
            <div style={{
              position: "relative",
              padding: "4px",
              borderRadius: 60,
              background: isDarkMode ? "var(--card-bg)" : "rgba(255,255,255,0.85)",
              boxShadow: isDarkMode ? "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)" : "0 10px 40px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            }}>
              {/* Inner Pill */}
              <div style={{
                display: "flex", alignItems: "center",
                borderRadius: 58,
                height: isMobile ? 64 : 76,
                padding: "0 8px 0 24px",
                background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.4)",
              }}>
                {/* Search Sparkle Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--accent-color)", marginRight: 16 }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>

                {/* Input Text Box */}
                <input
                  value={aiValue}
                  onChange={e => setAiValue(e.target.value)}
                  onFocus={() => setAiFocused(true)}
                  onBlur={() => setAiFocused(false)}
                  onKeyDown={e => e.key === "Enter" && handleGenerate()}
                  placeholder={aiFocused ? "E.g. I need a luxury SUV in Paris tomorrow..." : aiPlaceholder || "Describe your perfect ride with AI..."}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontFamily: "'DM Sans','Syne',sans-serif", fontSize: isMobile ? 15 : 18, fontWeight: 500,
                    color: "var(--text-main)",
                    caretColor: "var(--accent-color)",
                    minWidth: 0,
                  }}
                />
                
                {/* Mic & Img Buttons Container */}
                <div style={{ display: "flex", gap: 6, marginRight: 8 }}>
                  <button
                    aria-label="Upload Image"
                    style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "transparent", border: "1px solid transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)", flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--text-main)"; e.currentTarget.style.background = isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </button>
                  <button
                    aria-label="Voice Search"
                    style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "transparent", border: "1px solid transparent", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--text-muted)", flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-color)"; e.currentTarget.style.background = isDarkMode ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </button>
                </div>

                {/* Bouton Générer */}
                <button
                  onClick={handleGenerate}
                  disabled={aiLoading}
                  style={{
                    height: isMobile ? 50 : 60,
                    padding: isMobile ? "0 24px" : "0 36px",
                    borderRadius: 40,
                    fontSize: isMobile ? 13 : 15,
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    display: "flex", alignItems: "center", gap: 10,
                    background: "var(--text-main)",
                    color: "var(--bg-color)",
                    border: "none",
                    cursor: aiLoading ? "wait" : "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                  onMouseEnter={e => { if(!aiLoading) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "var(--accent-gradient)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(16,185,129,0.3)"; } }}
                  onMouseLeave={e => { if(!aiLoading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "var(--text-main)"; e.currentTarget.style.color = "var(--bg-color)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"; } }}
                >
                  {aiLoading ? (
                    <>
                      <span style={{
                        width: 18, height: 18,
                        border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "currentColor",
                        borderRadius: "50%", animation: "spinWheel 0.8s linear infinite",
                        display: "inline-block"
                      }} />
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s" }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      Find
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Tags / Hints */}
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: isMobile ? 12 : 16, marginTop: 24, fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ opacity: 0.8 }}>Try saying:</span>
              <span style={{ cursor: "pointer", color: "var(--text-main)", fontWeight: 600, borderBottom: "1px dashed var(--card-border)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="var(--accent-color)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-main)"}>"A convertible in Paris tomorrow"</span>
              <span style={{ cursor: "pointer", color: "var(--text-main)", fontWeight: 600, borderBottom: "1px dashed var(--card-border)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color="var(--accent-color)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-main)"}>"Luxury SUV for 7 passengers"</span>
            </div>
          </div>\n`;

const m1 = "{/* ══ AI VIDEO / IMAGE INPUT ══ */}";
const i1 = code.indexOf(m1);
if(i1 !== -1) {
  // Let's find exactly the line after the CTA buttons start
  const m2 = "          {/* ── CTA buttons ── */}";
  const i2 = code.indexOf(m2, i1);

  // We find exactly the empty space above the CTA buttons where the input used to be
  // We'll replace everything from m1 up to m2 with our new component
  if(i2 !== -1) {
    code = code.substring(0, i1) + newComponent + "\\n" + code.substring(i2);
  }
}

fs.writeFileSync(file, code);
