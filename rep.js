const fs = require('fs');
const file = 'front/src/component/home/Home.jsx';
let code = fs.readFileSync(file, 'utf8');
let lines = code.split('\n');

let startIdx = lines.findIndex(l => l.includes('{/* ══ AI VIDEO / IMAGE INPUT ══ */}'));
let endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('{/* Notice */}'));

// End index is the line with {/* Notice */}
// We want to remove up to the closing </div> which is 2 lines below Notice
if (startIdx !== -1 && endIdx !== -1) {
  let removeCount = (endIdx + 2) - startIdx + 1;
  
  const newComponent = `          {/* ══════════════════════════════════════════
              ULTRA-MODERN AI SEARCH INPUT
          ══════════════════════════════════════════ */}
          <div style={{
            width: "100%", maxWidth: "780px", margin: "0 auto",
            marginBottom: "48px",
            animation: "fadeUp 0.8s 0.4s ease both",
            position: "relative", zIndex: 10,
          }}>
            {/* Animated Gradient Background Glow */}
            <div style={{
              position: "absolute", inset: "-4px", borderRadius: "60px",
              background: "linear-gradient(90deg, #10b981, #3b82f6, #a855f7, #10b981)",
              backgroundSize: "300% 100%",
              animation: "btnGradientMove 5s linear infinite",
              filter: "blur(16px)", opacity: "0.4",
              transition: "opacity 0.4s ease",
              pointerEvents: "none", zIndex: -1
            }} />

            {/* Main Input Wrapper */}
            <div style={{
              position: "relative",
              padding: "3px",
              borderRadius: "60px",
              background: "var(--card-bg)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}>
              {/* Inner Pill */}
              <div style={{
                display: "flex", alignItems: "center",
                borderRadius: "58px",
                height: "68px",
                padding: "0 10px 0 24px",
                background: "var(--bg-color)",
              }}>
                {/* Search Sparkle Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--accent-color)", marginRight: "16px" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>

                {/* Input Text Box */}
                <input
                  value={aiValue}
                  onChange={e => setAiValue(e.target.value)}
                  onFocus={() => setAiFocused(true)}
                  onBlur={() => setAiFocused(false)}
                  onKeyDown={e => e.key === "Enter" && handleGenerate()}
                  placeholder={"Describe your perfect ride with AI..."}
                  style={{
                    flex: 1, border: "none", outline: "none", background: "transparent",
                    fontFamily: "'DM Sans','Syne',sans-serif", fontSize: "16px", fontWeight: 500,
                    color: "var(--text-main)",
                    caretColor: "var(--accent-color)",
                    minWidth: 0,
                  }}
                />
                
                {/* Image Upload Icon */}
                <button
                  aria-label="Upload Image"
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "transparent", border: "1px solid transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", flexShrink: 0, marginRight: "4px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--text-main)"; e.currentTarget.style.background = "rgba(128,128,128,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </button>

                {/* Bouton Générer */}
                <button
                  onClick={handleGenerate}
                  disabled={aiLoading}
                  style={{
                    height: "54px",
                    padding: "0 28px",
                    borderRadius: "40px",
                    fontSize: "14px",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "var(--accent-gradient)",
                    color: "#fff",
                    border: "none",
                    cursor: aiLoading ? "wait" : "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    boxShadow: "0 8px 20px rgba(16,185,129,0.3)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={e => { if(!aiLoading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(16,185,129,0.4)"; } }}
                  onMouseLeave={e => { if(!aiLoading) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(16,185,129,0.3)"; } }}
                >
                  {aiLoading ? (
                    <>
                      <span style={{
                        width: "16px", height: "16px",
                        border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                        borderRadius: "50%", animation: "spinWheel 0.8s linear infinite",
                        display: "inline-block"
                      }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s" }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      Find AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>`;

  lines.splice(startIdx, removeCount, newComponent);
  fs.writeFileSync(file, lines.join('\n'));
  console.log("Successfully replaced from line " + startIdx + " to " + (endIdx + 2));
} else {
  console.log("Could not find start/end markers. startIdx: " + startIdx + " endIdx: " + endIdx);
}
