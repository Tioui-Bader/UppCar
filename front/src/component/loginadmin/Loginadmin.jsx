import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImageAdmin from "../../asset/admin_bg_modern_v2.png";
import {
    PiEnvelopeDuotone,
    PiLockKeyDuotone,
    PiEyeDuotone,
    PiEyeClosedDuotone,
    PiSignInDuotone,
    PiCarProfileDuotone
} from "react-icons/pi";

const AnimatedLogo = ({ hideText = false }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', marginBottom: '2rem' }}>
            <div className="animated-logo-bg" style={{ position: 'relative', width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,#3b82f6 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
                <div style={{ position: 'absolute', inset: 2, background: '#ffffff', borderRadius: 14, zIndex: 1 }} />
                <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                    <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
                    <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
                </svg>
            </div>
            {!hideText && (
                <div style={{ position: 'relative', fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 32, letterSpacing: "-0.5px", margin: 0 }}>
                    <span style={{ color: "#1e293b" }}>Upp</span>
                    <span style={{ color: "#3b82f6" }}>Car</span>
                    <span style={{ position: 'absolute', bottom: 8, right: -14, width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', animation: 'blink 2s infinite' }} />
                </div>
            )}
        </div>
    );
};

const Loginadmin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate("/admin");
        }, 1500);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        .login-page *, .login-page *::before, .login-page *::after {
          box-sizing: border-box;
        }

        .login-page {
          font-family: 'Outfit', system-ui, sans-serif;
          background: url(${bgImageAdmin}) center/cover no-repeat fixed;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1e293b;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Glows */
        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          top: -100px;
          right: -100px;
          pointer-events: none;
          z-index: 0;
        }
        
        .ambient-glow-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          bottom: -50px;
          left: -50px;
          pointer-events: none;
          z-index: 0;
        }

        /* Glassmorphic Card */
        .glass-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0,0,0,0.02);
          padding: 48px 40px;
          z-index: 10;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-size: 15px;
          color: #64748b;
        }

        /* Inputs */
        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
        }

        .password-toggle:hover {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }

        .form-input {
          width: 100%;
          padding: 14px 44px 14px 48px;
          background: #f8fafc;
          border: 1px solid transparent;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: #1e293b;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-input::placeholder {
          color: #94a3b8;
          transition: opacity 0.3s ease;
        }

        .form-input:hover {
          background: #ffffff;
          border-color: #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .form-input:focus {
          background: #ffffff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 4px 20px rgba(37, 99, 235, 0.08);
        }

        .form-input:focus::placeholder {
          opacity: 0.5;
        }

        .input-group:focus-within .input-icon {
          color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        }

        /* Checkbox & Forgot Password */
        .form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          font-size: 14px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #64748b;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .remember-me:hover {
          color: #1e293b;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          border: 2px solid #cbd5e1;
          border-radius: 4px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .remember-me input {
          display: none;
        }

        .remember-me input:checked + .custom-checkbox {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .remember-me input:checked + .custom-checkbox::after {
          content: '';
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          margin-bottom: 2px;
        }

        .forgot-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.35);
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:active {
          transform: translateY(1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 1s ease-in-out infinite;
        }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes spinWheel { 100%{transform:rotate(360deg);} }
        @keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        .animated-logo-bg { 
          background: linear-gradient(135deg, #e0e7ff 0%, #bfdbfe 100%); 
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25); 
        }

        .modern-icon path[opacity="0.2"] {
          opacity: 0.35 !important;
        }

        .back-home {
          position: absolute;
          top: 24px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .back-home:hover {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          transform: translateX(-4px);
        }

      `}</style>

            <div className="login-page">
                <div className="ambient-glow"></div>
                <div className="ambient-glow-2"></div>

                <a href="/" className="back-home" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                    <span style={{ fontSize: 20 }}>←</span> Back to Website
                </a>

                <div className="glass-card">
                    <div className="login-header">
                        <AnimatedLogo />
                        <h1 className="login-title">Admin Portal</h1>
                        <p className="login-subtitle">Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <PiEnvelopeDuotone size={20} className="input-icon modern-icon" />
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <PiLockKeyDuotone size={20} className="input-icon modern-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <PiEyeClosedDuotone size={20} className="modern-icon" />
                                ) : (
                                    <PiEyeDuotone size={20} className="modern-icon" />
                                )}
                            </div>
                        </div>

                        <div className="form-actions">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <div className="custom-checkbox"></div>
                                Remember me
                            </label>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                <>
                                    <PiSignInDuotone size={22} className="modern-icon" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Loginadmin;
