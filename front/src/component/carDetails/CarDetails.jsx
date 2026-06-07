import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Lock, ShieldCheck,
  Calendar, User, CheckCircle2, ChevronRight,
  Zap, Moon, Sun, Info, Star, MessageSquare
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
  .review-grid { grid-template-columns: 1fr; }
}

.review-grid {
  max-width: 1100px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  position: relative;
  z-index: 10;
}

.car-image-card {
  border-radius: 32px;
  overflow: hidden;
  min-height: 380px;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card {
  background: var(--elite-card-bg);
  backdrop-filter: var(--elite-glass);
  -webkit-backdrop-filter: var(--elite-glass);
  grid-template-columns: 1.2fr 0.82fr;
  gap: 32px;
  position: relative;
  z-index: 10;
  padding-bottom: 60px;
}

.checkout-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  padding: 40px;
  margin-top: 20px;
}

[data-theme='dark'] .checkout-card {
  background: #0f172a;
  border-color: #1e293b;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.method-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.method-tab {
  flex: 1;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
}

.method-tab.active {
  border-color: var(--elite-accent);
  background: rgba(16, 185, 129, 0.04);
}

[data-theme='dark'] .method-tab { border-color: #1e293b; }
[data-theme='dark'] .method-tab.active { background: rgba(52, 211, 153, 0.06); border-color: var(--elite-accent); }

.method-icon {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  color: #64748b;
}
.method-tab.active .method-icon { color: var(--elite-accent); }

.method-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #64748b;
}
.method-tab.active .method-label { color: var(--elite-accent); }

.form-group-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-container {
  margin-bottom: 24px;
}

.field-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #64748b;
}

.field-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.pro-input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;
  background: white;
  color: #0f172a;
}

[data-theme='dark'] .pro-input {
  background: #1e293b;
  border-color: #334155;
  color: white;
}

.pro-input:focus {
  border-color: var(--elite-accent);
  box-shadow: 0 0 0 3px var(--elite-accent-glow);
}

.field-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
}

.trust-strip {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
}

[data-theme='dark'] .trust-strip { background: rgba(255,255,255,0.03); }

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
}

.confirm-pay-btn {
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  background: var(--elite-grad);
  border: none;
  color: white;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; align-items: center; justify-content: center; gap: 12px;
  margin-top: 10px;
}

.confirm-pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px var(--elite-accent-glow);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes popIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

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
  const startDate = location.state?.startDate || "";
  const endDate = location.state?.endDate || "";
  const cinNumber = location.state?.cinNumber || "N/A";
  const permisNumber = location.state?.permisNumber || "N/A";
  const clientFullName = location.state?.clientName || "Client";
  const total = carData.price * days;

  const cardRef = useRef(null);
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('visa');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const originalTheme = localStorage.getItem('appTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', 'light');
    return () => {
      document.documentElement.setAttribute('data-theme', originalTheme);
    };
  }, []);

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

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const reservationData = {
        carId: id,
        clientId: user.id || null,
        agencyId: carData.agencyId || carData.agency?.id || (carData.agency && typeof carData.agency === 'object' ? carData.agency.id : carData.agency) || null,
        clientFirstName: user.firstName || clientFullName.split(' ')[0] || clientFullName,
        clientLastName: user.lastName || clientFullName.split(' ').slice(1).join(' ') || "",
        cin: cinNumber,
        licenseNumber: permisNumber,
        startDate: startDate,
        endDate: endDate,
        totalPrice: total,
        status: "CONFIRMED"
      };

      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
        }, 1500);
      } else {
        setIsLoading(false);
        alert("Erreur lors de l'enregistrement de la réservation.");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Erreur technique lors de la réservation.");
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="payment-container">
      <style>{styles}</style>

      <div className="blob blob-1" style={{ opacity: 0.3 }} />
      <div className="blob blob-2" style={{ opacity: 0.2 }} />


      <div className="payment-grid" style={{ marginTop: 40 }}>
        <div className="main-content">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-1px' }}>
            Finaliser votre réservation
          </h1>
          <p style={{ opacity: 0.6, fontSize: 15, marginBottom: 32 }}>
            Paiement sécurisé crypté par SSL 256 bits
          </p>

          <div className="checkout-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16, 185, 129, 0.1)', color: 'var(--elite-accent)', display: 'flex', alignItems: 'center', justifyCenter: 'center', display: 'flex', justifyContent: 'center' }}>
                <CreditCard size={22} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Carte de Crédit</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Paiement sécurisé par carte bancaire</div>
              </div>
            </div>

            <div style={{ animation: 'popIn 0.3s ease' }}>
              <div className="field-container">
                <label className="field-label">Nom complet sur la carte</label>
                <div className="field-input-wrapper">
                  <User className="field-icon" size={18} />
                  <input
                    className="pro-input"
                    placeholder="Ex: Jean Dupont"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                  />
                </div>
              </div>

              <div className="field-container">
                <label className="field-label">Numéro de carte sécurisé</label>
                <div className="field-input-wrapper">
                  <CreditCard className="field-icon" size={18} />
                  <input
                    className="pro-input"
                    placeholder="0000 0000 0000 0000"
                    value={cardNum}
                    onChange={e => formatCardNum(e.target.value)}
                  />
                  <div style={{ position: 'absolute', right: 16, display: 'flex', gap: 6 }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: 10, opacity: cardType === 'visa' ? 1 : 0.3 }} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MC" style={{ height: 12, opacity: cardType === 'mastercard' ? 1 : 0.3 }} />
                  </div>
                </div>
              </div>

              <div className="form-group-row">
                <div className="field-container">
                  <label className="field-label">Expiration (MM/YY)</label>
                  <div className="field-input-wrapper">
                    <Calendar className="field-icon" size={18} />
                    <input
                      className="pro-input"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={e => formatExpiry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field-container">
                  <label className="field-label">Code CVV/CVC</label>
                  <div className="field-input-wrapper">
                    <Lock className="field-icon" size={18} />
                    <input
                      className="pro-input"
                      placeholder="123"
                      type="password"
                      maxLength="3"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
              </div>

              <button className="confirm-pay-btn" onClick={handlePayment} disabled={isLoading}>
                {isLoading ? <div className="spinner" /> : <>Confirmer le paiement de {total} MAD</>}
              </button>
            </div>

            <div className="trust-strip">
              <div className="trust-item"><ShieldCheck size={16} /> 256-bit SSL</div>
              <div className="trust-item"><Lock size={16} /> PCI DSS</div>
              <div className="trust-item"><CheckCircle2 size={16} /> Secure Payment</div>
            </div>
          </div>
        </div>

        <div className="sidebar" style={{ marginTop: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', position: 'sticky', top: 40 }}>
            <div style={{ position: 'relative', height: 160 }}>
              <img
                src={carData.photos?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'}
                alt={carData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>{carData.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{carData.category} · {carData.agencyName}</div>
              </div>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 20, borderBottom: '1px dashed #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Période</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{startDate} — {endDate}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Durée</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{days} jours</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: `Tarif journalier (${carData.price} MAD x ${days})`, val: `${total} MAD` },
                  { label: "Frais de service (5%)", val: `${(total * 0.05).toFixed(0)} MAD` },
                  { label: "TVA Incluse", val: "0 MAD", color: '#10b981' }
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: item.color || 'inherit' }}>
                    <span style={{ color: item.color ? 'inherit' : '#64748b' }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Total TTC</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: 'var(--elite-accent)', fontFamily: "'Syne', sans-serif" }}>
                  {(total * 1.05).toFixed(0)} MAD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Paiement Réussi</h2>
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