import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, CreditCard, Lock, ShieldCheck,
    Calendar, User, CheckCircle2, ChevronRight,
    Zap, Moon, Sun, Info
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   ELITE OS - MODERN PAYMENT UI STYLES
   ────────────────────────────────────────────────────────────────────────── */
const styles = `
:root {
  --elite-bg: #f8fafc;
  --elite-text: #0f172a;
  --elite-accent: #10b981;
  --elite-accent-glow: rgba(16, 185, 129, 0.25);
  --elite-card-bg: rgba(255, 255, 255, 0.8);
  --elite-card-border: rgba(15, 23, 42, 0.08);
  --elite-input-bg: rgba(255, 255, 255, 0.5);
  --elite-glass: blur(12px);
  --elite-grad: linear-gradient(135deg, #059669 0%, #10b981 50%, #3b82f6 100%);
}

[data-theme='dark'] {
  --elite-bg: #020617;
  --elite-text: #f8fafc;
  --elite-accent: #34d399;
  --elite-accent-glow: rgba(52, 211, 153, 0.15);
  --elite-card-bg: rgba(15, 23, 42, 0.4);
  --elite-card-border: rgba(255, 255, 255, 0.1);
  --elite-input-bg: rgba(0, 0, 0, 0.2);
}

.payment-container {
  min-height: 100vh;
  background: var(--elite-bg);
  color: var(--elite-text);
  font-family: 'Outfit', sans-serif;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
}

/* Background Blobs */
.blob {
  position: fixed;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.5;
  animation: drift 20s infinite alternate ease-in-out;
}
.blob-1 { width: 500px; height: 500px; background: rgba(16, 185, 129, 0.1); top: -100px; left: -100px; }
.blob-2 { width: 400px; height: 400px; background: rgba(59, 130, 246, 0.1); bottom: -100px; right: -100px; }

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(40px, 40px) scale(1.1); }
}

.payment-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  position: relative;
  z-index: 10;
}

@media (max-width: 900px) {
  .payment-grid { grid-template-columns: 1fr; }
}

.glass-card {
  background: var(--elite-card-bg);
  backdrop-filter: var(--elite-glass);
  -webkit-backdrop-filter: var(--elite-glass);
  border: 1px solid var(--elite-card-border);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
  .glass-carde {
  background: var(--elite-card-bg);
  backdrop-filter: var(--elite-glass);
  -webkit-backdrop-filter: var(--elite-glass);
  border: 1px solid var(--elite-card-border);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 79px;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textGlow 5s ease infinite;
}

@keyframes textGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.8;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.elite-input {
  width: 100%;
  background: var(--elite-input-bg);
  border: 1px solid var(--elite-accent);
  box-shadow: 0 0 0 4px var(--elite-accent-glow);
  border-radius: 16px;
  padding: 16px 16px 16px 48px;
  color: var(--elite-text);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.elite-input:focus {
  border-color: var(--elite-accent);
  box-shadow: 0 0 0 4px var(--elite-accent-glow);
}

.input-icon {
  position: absolute;
  left: 16px;
  color: var(--elite-accent);
  opacity: 0.7;
}

.card-brand-icons {
  position: absolute;
  right: 16px;
  display: flex;
  gap: 8px;
}

.brand-icon {
  height: 24px;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.brand-icon.active { opacity: 1; }

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 3D Dynamic Card Styles */
.card-perspective {
  perspective: 2000px;
  margin-bottom: 32px;
  z-index: 20;
}

.dynamic-card {
  width: 91%;
height: 250px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 24px;
  padding: 32px;
  color: white;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  box-shadow: 0 40px 80px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
}

.card-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(16, 185, 129, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 80%);
  pointer-events: none;
}

.card-hologram {
  position: absolute; top: 10%; right: 10%; width: 70px; height: 70px;
  background: conic-gradient(from 0deg, #10b981, #3b82f6, #8b5cf6, #10b981);
  border-radius: 50%; filter: blur(25px); opacity: 0.3; animation: rotateCard 12s linear infinite;
}

@keyframes rotateCard { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.card-chip {
  width: 45px;
  height: 35px;
  background: linear-gradient(135deg, #ffd700, #b8860b);
  border-radius: 6px;
}

.card-number-display {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  letter-spacing: 4px;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.card-info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.info-label { font-size: 10px; text-transform: uppercase; opacity: 0.6; letter-spacing: 1px; }
.info-value { font-size: 16px; font-weight: 800; margin-top: 4px; }
.card-brand-display { font-family: 'Syne', sans-serif; font-weight: 900; font-size: 22px; font-style: italic; opacity: 0.9; }

/* Sidebar Summary */
.summary-card {
  padding: 32px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 15px;
}

.summary-total {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--elite-card-border);
  display: flex;
  justify-content: space-between;
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 900;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textGlow 4s ease infinite;
}

.pay-button {
  width: 100%;
  margin-top: 32px;
  background: var(--elite-grad);
  border: none;
  border-radius: 18px;
  padding: 20px;
  color: #fff;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pay-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px var(--elite-accent-glow);
}

.pay-button:active { transform: scale(0.98); }

.security-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 13px;
  opacity: 0.6;
}

/* Spinner & Success Overlay */
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.spinner {
  width: 24px; height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%;
  animation: spin 1s linear infinite;
}

.success-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  animation: fadeIn 0.4s ease forwards;
}

.success-card {
  background: var(--elite-card-bg);
  border: 1px solid var(--elite-accent);
  padding: 50px; border-radius: 32px;
  text-align: center; color: var(--elite-text);
  box-shadow: 0 40px 80px rgba(16, 185, 129, 0.15);
  animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-width: 420px; width: 90%;
}

.success-icon-wrapper {
  width: 90px; height: 90px;
  background: var(--elite-accent-glow);
  border-radius: 50%; margin: 0 auto 24px;
  display: flex; align-items: center; justify-content: center;
  color: var(--elite-accent);
  box-shadow: 0 0 40px var(--elite-accent-glow);
}

.success-btn {
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  border: none; padding: 18px 32px; border-radius: 20px;
  color: white; font-family: 'Syne', sans-serif;
  font-weight: 800; font-size: 16px; cursor: pointer;
  width: 100%; transition: all 0.3s ease;
  margin-top: 10px;
}
.success-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px var(--elite-accent-glow);
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { opacity: 0; transform: scale(0.8) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }

/* Back button */
.back-btn {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--elite-card-bg);
  backdrop-filter: var(--elite-glass);
  -webkit-backdrop-filter: var(--elite-glass);
  border: 1px solid var(--elite-accent);
  color: var(--elite-accent);
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 15px 40px var(--elite-accent-glow);
  transform: translateY(-3px) scale(1.02);
}
.back-btn:hover { 
  transform: translateY(-3px) scale(1.04);
}
.back-btn:active {
  transform: scale(0.95);
}

/* Theme Toggle */

`;

export default function PaymentPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Recovery of data from navigation or defaults
    const carData = location.state?.car || { name: "Premium Vehicle", price: 750 };
    const days = location.state?.reservationDays || 1;
    const total = carData.price * days;

    const cardRef = useRef(null);
    const [cardNum, setCardNum] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('visa'); // Default visual
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Preserve and restore the global theme (prevent booking page from staying in light mode)
    useEffect(() => {
        const originalTheme = localStorage.getItem('appTheme') || 'dark';
        // Force light mode for CarDetails as requested
        document.documentElement.setAttribute('data-theme', 'light');

        return () => {
            // Restore original theme when going back to Booking
            document.documentElement.setAttribute('data-theme', originalTheme);
        };
    }, []);

    // Simple card detection
    useEffect(() => {
        if (cardNum.startsWith('5')) setCardType('mastercard');
        else if (cardNum.startsWith('4')) setCardType('visa');
        else setCardType('visa');
    }, [cardNum]);

    const formatCardNum = (val) => {
        const v = val.replace(/\D/g, '').substring(0, 16);
        const parts = v.match(/.{1,4}/g) || [];
        setCardNum(parts.join(' '));
    };

    const formatExpiry = (val) => {
        const v = val.replace(/\D/g, '').substring(0, 4);
        if (v.length > 2) {
            setExpiry(v.substring(0, 2) + '/' + v.substring(2));
        } else {
            setExpiry(v);
        }
    };

    const handleTilt = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        cardRef.current.style.transform = `rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
        cardRef.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        cardRef.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    const resetTilt = () => { if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'; };

    const handlePayment = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 5000);
    };

    const handleBack = () => navigate(-1);

    return (
        <div className="payment-container">
            <style>{styles}</style>

            {/* Background Effects */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />


            <button className="back-btn" onClick={handleBack}>
                <ArrowLeft size={18} /> Retour
            </button>

            <div className="payment-grid" style={{ marginTop: 20 }}>
                {/* Left Side: Form */}
                <div className="main-content">
                    <h1 className="section-title">Paiement Sécurisé</h1>

                    <div className="card-perspective">
                        <div
                            ref={cardRef} className="dynamic-card"
                            onMouseMove={handleTilt} onMouseLeave={resetTilt}
                        >
                            <div className="card-glow" />
                            <div className="card-hologram" />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div className="card-chip" />
                                <div className="card-brand-display">
                                    {cardType === 'visa' ? 'VISA' : 'mastercard'}
                                </div>
                            </div>

                            <div className="card-number-display">
                                {cardNum || '•••• •••• •••• ••••'}
                            </div>

                            <div className="card-info-row">
                                <div>
                                    <div className="info-label">Card Holder</div>
                                    <div className="info-value">{cardName.toUpperCase() || 'YOUR NAME'}</div>
                                </div>
                                <div>
                                    <div className="info-label">Expires</div>
                                    <div className="info-value">{expiry || 'MM/YY'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card">
                        <div className="input-group">
                            <label className="input-label">Nom sur la carte</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    className="elite-input"
                                    placeholder="LEANDRE DUPONT"
                                    value={cardName}
                                    onChange={e => setCardName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Numéro de carte</label>
                            <div className="input-wrapper">
                                <CreditCard className="input-icon" size={18} />
                                <input
                                    className="elite-input"
                                    placeholder="4000 1234 5678 9012"
                                    value={cardNum}
                                    onChange={e => formatCardNum(e.target.value)}
                                />
                                <div className="card-brand-icons">
                                    <ShieldCheck className={`brand-icon ${cardType === 'visa' ? 'active' : ''}`} size={20} />
                                    <Zap className={`brand-icon ${cardType === 'mastercard' ? 'active' : ''}`} size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="row-2">
                            <div className="input-group">
                                <label className="input-label">Date d'expiration</label>
                                <div className="input-wrapper">
                                    <Calendar className="input-icon" size={18} />
                                    <input
                                        className="elite-input"
                                        placeholder="MM / YY"
                                        value={expiry}
                                        onChange={e => formatExpiry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">CVV / CVC</label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input
                                        className="elite-input"
                                        placeholder="•••"
                                        type="password"
                                        maxLength="3"
                                        value={cvv}
                                        onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="pay-button" onClick={handlePayment} disabled={isLoading} style={{ opacity: isLoading ? 0.8 : 1 }}>
                            {isLoading ? (
                                <div className="spinner" />
                            ) : (
                                <>Payer {total} MAD <ChevronRight size={20} /></>
                            )}
                        </button>

                        <div className="security-badge">
                            <Lock size={14} />
                            SSL Secured Connection · 256-bit Encryption
                        </div>
                    </div>
                </div>

                {/* Right Side: Summary */}
                <div className="sidebar">
                    <div className="glass-carde summary-card">
                        <h2 className="section-title" style={{ fontSize: 22 }}>Résumé</h2>

                        <div style={{ background: 'var(--elite-input-bg)', borderRadius: 20, padding: 20, marginBottom: 24 }}>
                            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{carData.name}</div>
                            <div style={{ fontSize: 13, opacity: 0.6 }}>{days} jour(s) de location</div>
                        </div>

                        <div className="summary-item">
                            <span>Prix journalier</span>
                            <span>{carData.price} MAD</span>
                        </div>
                        <div className="summary-item">
                            <span>Frais de service (5%)</span>
                            <span>{(total * 0.05).toFixed(0)} MAD</span>
                        </div>
                        <div className="summary-item">
                            <span>Taxes</span>
                            <span>Incluse</span>
                        </div>

                        <div className="summary-total">
                            <span>Total</span>
                            <span>{(total * 1.05).toFixed(0)} MAD</span>
                        </div>

                        <div style={{ marginTop: 32, padding: 20, background: 'rgba(16, 185, 129, 0.05)', borderRadius: 16, border: '1px solid rgba(16, 185, 129, 0.1)', display: 'flex', gap: 12 }}>
                            <Info size={18} color="var(--elite-accent)" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.8 }}>
                                Votre transaction est gérée de manière sécurisée par notre partenaire financier agréé.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            {isSuccess && (
                <div className="success-overlay">
                    <div className="success-card">
                        <div className="success-icon-wrapper">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="section-title" style={{ marginBottom: 12 }}>Paiement Réussi</h2>
                        <p style={{ opacity: 0.7, marginBottom: 32, lineHeight: 1.6, fontSize: 16 }}>
                            Votre transaction a été validée avec succès. Vous allez recevoir un email de confirmation d'ici quelques instants.
                        </p>
                        <button className="success-btn" onClick={() => navigate('/')}>
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}