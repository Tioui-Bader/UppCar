import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from './component/home/Home';
import Login from './component/login/Login';
import Registre from './component/registre/Registre';

import Loginagence from './component/loginagence/Loginagence';
import Registreagence from './component/registreagence/Registreagence';

import HomeConnect from './component/homeConnected/HomeConnect';
import Homeagence from './component/homeagence/Homeagence';
import Homeadmin from './component/homeadmin/Homeadmin';
import Profile from './component/profile/Profile';
import Favorites from './component/favorites/Favorites';
import CarDetails from './component/carDetails/CarDetails';
import BookingAgreement from './component/bookingAgreement/BookingAgreement';


function PrivateRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");


    if (!token) {
        return <Navigate to={role === "agence" ? "/loginagence" : "/login"} replace />;
    }


    if (role && userRole !== role) {
        return <Navigate to="/" replace />;
    }

    // ✅ accès autorisé
    return children;
}


function App() {
    useEffect(() => {
        // Éviter les doublons si le script existe déjà
        if (document.getElementById('n8n-chat-script')) return;

        // 1. Charger le CSS officiel
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // 2. Design Ultra-Moderne Premium
        const appLang = localStorage.getItem("appLang") || "FR";
        const isArabic = appLang === "AR";
        const isEnglish = appLang === "EN";
        const currentPath = (window.location.pathname + window.location.hash).toLowerCase();
        const isAgencyPage = currentPath.includes('agence');
        const isDark = localStorage.getItem('appTheme') === 'dark' && !isAgencyPage;

        const themeHeaderBg = isDark ? "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0ea5e9 100%)" : "linear-gradient(135deg, #065f46 0%, #10b981 100%)";
        const themeButtonBg = isDark ? "linear-gradient(135deg, #0f172a 0%, #001e72ff 100%)" : "linear-gradient(135deg, #065f46 0%, #10b981 100%)";
        const themeUserMsgBg = isDark ? "#2563eb" : "#0e533cbb";
        const themePrimaryColor = isDark ? "#0e44b9ff" : "#10b981bb";

        const style = document.createElement('style');
        style.id = 'n8n-chat-style';
        style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      /* ── CSS Variables ── */
      :root {
        --chat--color--primary: ${themePrimaryColor};
        --chat--color--primary--shade-50: #1d4ed8;
        --chat--color--primary--shade-100: #1e40af;
        --chat--color--secondary: #0ea5e9;
        --chat--color--background: #0f172a;
        --chat--color--font--light: #ffffff;
        --chat--header--background: ${themeHeaderBg};
        --chat--header--color: #ffffff;
        --chat--message--bot--background: #ffffff;
        --chat--message--bot--color: #0f172a;
        --chat--message--user--background: ${themeUserMsgBg};
        --chat--message--user--color: #ffffff;
        --chat--input--border-color: rgba(37,99,235,0.3);
        --chat--window--width: 380px; 
        --chat--window--height: 580px;
        --chat--border-radius: 20px;
        --chat--font-family: 'Inter', sans-serif;
      }

      /* ── Fenêtre principale ── */
      #n8n-chat-widget .n8n-chat-window {
        border-radius: 24px !important;
        overflow: hidden !important;
        box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        backdrop-filter: blur(20px) !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* ── Header ── */
      #n8n-chat-widget .chat-window-header {
        background: ${themeHeaderBg} !important;
        padding: 16px 20px !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        position: relative !important;
        overflow: hidden !important;
      }
      #n8n-chat-widget .chat-window-header::before {
        content: '' !important;
        position: absolute !important;
        top: -50% !important; right: -20% !important;
        width: 200px !important; height: 200px !important;
        background: rgba(255,255,255,0.06) !important;
        border-radius: 50% !important;
      }
      #n8n-chat-widget .chat-window-header h1,
      #n8n-chat-widget .chat-window-header .title {
        font-size: 18px !important; 
        font-weight: 800 !important;
        color: #ffffff !important;
        letter-spacing: -0.3px !important;
        font-family: 'Inter', sans-serif !important;
      }
      #n8n-chat-widget .chat-window-header p,
      #n8n-chat-widget .chat-window-header .subtitle {
        font-size: 12.5px !important;
        color: rgba(255,255,255,0.75) !important;
        margin-top: 3px !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* ── Force variables sur le widget ── */
      #n8n-chat-widget {
        --chat--color--background: #ffffff !important;
        --chat--input--background: #f1f5f9 !important;
        --chat--input--border-color: #e2e8f0 !important;
        --chat--message--bot--background: #ffffff !important;
        --chat--message--bot--color: #1e293b !important;
      }

      /* ── Zone messages (sélecteurs universels) ── */
      #n8n-chat-widget .chat-messages-list,
      #n8n-chat-widget [class*="messages"],
      #n8n-chat-widget [class*="Messages"],
      #n8n-chat-widget [class*="body"],
      #n8n-chat-widget [class*="Body"] {
        background: #f8fafc !important;
        background-color: #f8fafc !important;
        padding: 20px 16px !important;
      }
      #n8n-chat-widget .chat-message {
        margin-bottom: 12px !important;
        display: flex !important;
        width: 100% !important;
      }
      #n8n-chat-widget .chat-message-from-bot {
        justify-content: flex-start !important;
      }
      #n8n-chat-widget .chat-message-from-user {
        justify-content: flex-end !important;
      }

      /* Messages bot */
      #n8n-chat-widget .chat-message.chat-message-from-bot .chat-message-bubble {
        background: #ffffff !important;
        color: #1e293b !important;
        border-radius: 18px 18px 18px 4px !important;
        border: 1px solid #e2e8f0 !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        line-height: 1.6 !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* Messages utilisateur */
      #n8n-chat-widget .chat-message.chat-message-from-user .chat-message-bubble {
        background: ${themeUserMsgBg} !important;
        color: #ffffff !important;
        border-radius: 18px 18px 4px 18px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        line-height: 1.6 !important;
        box-shadow: 0 4px 20px rgba(37,99,235,0.4) !important;
        font-family: 'Inter', sans-serif !important;
      }

      /* ── Zone de saisie (sélecteurs universels) ── */
      #n8n-chat-widget .chat-input,
      #n8n-chat-widget [class*="input"],
      #n8n-chat-widget [class*="Input"],
      #n8n-chat-widget [class*="footer"],
      #n8n-chat-widget [class*="Footer"] {
        background: #ffffff !important;
        background-color: #ffffff !important;
        border-top: 1px solid #e2e8f0 !important;
        padding: 14px 16px !important;
      }
      #n8n-chat-widget .chat-input textarea,
      #n8n-chat-widget .chat-input input,
      #n8n-chat-widget textarea,
      #n8n-chat-widget input[type="text"] {
        background: #f1f5f9 !important;
        background-color: #f1f5f9 !important;
        border: 1.5px solid #e2e8f0 !important;
        border-radius: 14px !important;
        color: #1e293b !important;
        font-size: 14px !important;
        padding: 12px 16px !important;
        font-family: 'Inter', sans-serif !important;
        transition: border-color 0.3s !important;
      }
      #n8n-chat-widget textarea:focus,
      #n8n-chat-widget input[type="text"]:focus {
        border-color: rgba(37,99,235,0.6) !important;
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.12) !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
      }
      #n8n-chat-widget textarea::placeholder,
      #n8n-chat-widget input[type="text"]::placeholder {
        color: #94a3b8 !important;
      }

      /* ── Bouton Envoyer ── */
      #n8n-chat-widget .chat-input button[type="submit"],
      #n8n-chat-widget .chat-input .chat-input-send-button {
        background: ${themeUserMsgBg} !important;
        border-radius: 12px !important;
        border: none !important;
        width: 42px !important; height: 42px !important;
        box-shadow: 0 4px 15px rgba(37,99,235,0.4) !important;
        transition: all 0.3s ease !important;
      }
      #n8n-chat-widget .chat-input button[type="submit"] svg,
      .chat-input .chat-input-send-button svg {
        ${isArabic ? 'transform: scaleX(-1);' : ''}
      }

      /* ── Arabic RTL specific overrides ── */
      #n8n-chat-widget {
        ${isArabic ? 'direction: rtl !important;' : 'direction: ltr !important;'}
      }

      ${isArabic ? `
       .chat-message {
        direction: rtl !important;
      }
      .chat-message-from-bot {
        display: flex !important;
        justify-content: flex-end !important; /* GAUCHE en RTL */
      }
      .chat-message-from-user {
        display: flex !important;
        justify-content: flex-start !important; /* DROITE en RTL */
      }
      .chat-message-bubble {
        direction: rtl !important;
        text-align: right !important;
      }
       .chat-message-from-bot .chat-message-bubble {
        border-radius: 18px 18px 18px 4px !important; /* Queue à gauche */
      }
     .chat-message-from-user .chat-message-bubble {
        border-radius: 18px 18px 4px 18px !important; /* Queue à droite */
      }
      #n8n-chat-widget .chat-input .chat-input-send-button,
      #n8n-chat-widget button[type="submit"] {
         transform: rotate(180deg) !important;
        left: 8px !important;
        right: auto !important;
      }
      .chat-window-header {
        text-align: right !important;
      }
      ` : ''}

      /* ── Bouton principal (FAB) ── */
      #n8n-chat-widget .n8n-chat-button {
        background: ${themeButtonBg} !important;
        box-shadow: 0 10px 40px rgba(37, 99, 235, 0.45) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        width: 40px !important;  /* Bouton plus petit */
        height: 40px !important; /* Bouton plus petit */
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        position: relative !important;
      }
      #n8n-chat-widget .n8n-chat-button:hover {
        transform: scale(1.1) translateY(-5px) !important;
        box-shadow: 0 15px 50px rgba(37, 99, 235, 0.6) !important;
      }
      
      /* Cacher l'icône native (chevron/message) de n8n partout */
      .n8n-chat-button svg, 
      #n8n-chat-widget .n8n-chat-button svg { 
        display: none !important; 
        opacity: 0 !important;
        visibility: hidden !important;
      }

      /* Icône Sparkles (Base) */
      .n8n-chat-button::before,
      #n8n-chat-widget .n8n-chat-button::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'%3E%3C/path%3E%3Cpath d='M5 3v4'%3E%3C/path%3E%3Cpath d='M3 5h4'%3E%3C/path%3E%3C/svg%3E") !important;
        background-size: 24px !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        opacity: 1 !important;
        transform: scale(1) rotate(0deg) !important;
        z-index: 999 !important;
      }

      /* Icône X (Fermeture) */
      .n8n-chat-button::after,
      #n8n-chat-widget .n8n-chat-button::after {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E") !important;
        background-size: 24px !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        opacity: 0 !important;
        transform: scale(0.5) rotate(-90deg) !important;
        z-index: 1000 !important;
      }

      /* Etat ouvert: Cache IA, montre X */
      .n8n-chat-button.chat-is-open::before,
      #n8n-chat-widget .n8n-chat-button.chat-is-open::before {
        opacity: 0 !important;
        transform: scale(0.5) rotate(90deg) !important;
      }
      .n8n-chat-button.chat-is-open::after,
      #n8n-chat-widget .n8n-chat-button.chat-is-open::after {
        opacity: 1 !important;
        transform: scale(1) rotate(0deg) !important;
      }

      body.n8n-chat-hidden #n8n-chat-widget,
      body.n8n-chat-hidden .n8n-chat-button {
        display: none !important;
      }
    `;
        document.head.appendChild(style);

        // 3. Initialiser le script n8n
        const txtWelcome = isArabic ? 'مرحبًا بك في UppCar ! 🚗' : (isEnglish ? 'Welcome to UppCar! 🚗' : 'Bienvenue sur UppCar ! 🚗');
        const txtNathan = isArabic ? "اسمي ناثان. كيف يمكنني مساعدتك اليوم؟" : (isEnglish ? "My name is Nathan. How can I help you today?" : "Je m'appelle Nathan. Comment puis-je vous aider aujourd'hui ?");
        const txtTitle = isArabic ? 'مساعد UppCar 🤖' : (isEnglish ? 'UppCar Assistant 🤖' : 'UppCar Assistant 🤖');
        const txtSubtitle = isArabic ? 'متاح على مدار 24 ساعة لمساعدتك.' : (isEnglish ? 'Available 24/7 to help you.' : 'Disponible 24h/24 et 7j/7 pour vous aider.');
        const txtPlaceholder = isArabic ? 'اكتب رسالتك هنا...' : (isEnglish ? 'Type your message here...' : 'Tapez votre message ici...');
        const txtGetStarted = isArabic ? 'محادثة جديدة' : (isEnglish ? 'New conversation' : 'Nouvelle conversation');
        const txtError = isArabic ? 'هذا الحقل لا يجب أن يكون فارغًا' : (isEnglish ? 'This field cannot be empty' : 'Ce champ ne doit pas être vide');

        const script = document.createElement('script');
        script.id = 'n8n-chat-script';
        script.type = 'module';
        script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://baderiti.app.n8n.cloud/webhook/c2f2ed42-5263-4d62-897e-b0ea2311858b/chat',
        initialMessages: [
          \`${txtWelcome}\`,
          \`${txtNathan}\`
        ],
        i18n: {
          en: {
            title: \`${txtTitle}\`,
            subtitle: \`${txtSubtitle}\`,
            inputPlaceholder: \`${txtPlaceholder}\`,
            getStarted: \`${txtGetStarted}\`,
            error: \`${txtError}\`,
          },
        },
      });
    `;
        document.body.appendChild(script);

        // 4. FORCE BRUTALE POUR LE THEME ET LA TAILLE DU TITRE
        const enforceThemeAndTitle = () => {
            // --- VISIBILITÉ SELON LA PAGE ---
            const currentUrl = (window.location.pathname + window.location.hash).toLowerCase();
            // On cache sur login, registre, et agence
            const shouldHide = currentUrl.includes('login') || currentUrl.includes('registre') || currentUrl.includes('agence');

            const widget = document.querySelector('#n8n-chat-widget');
            const btn = document.querySelector('.n8n-chat-button');

            if (shouldHide) {
                document.body.classList.add('n8n-chat-hidden');
                if (widget) widget.style.setProperty('display', 'none', 'important');
                if (btn) btn.style.setProperty('display', 'none', 'important');
            } else {
                document.body.classList.remove('n8n-chat-hidden');
                if (widget) widget.style.removeProperty('display');
                if (btn) btn.style.removeProperty('display');
            }

            if (!widget) return;
            const root = widget.shadowRoot || widget;

            // --- THEME (VERT EN CLAIR/AGENCE, BLEU EN SOMBRE) ---
            const isAgencyNow = window.location.pathname.toLowerCase().includes('agence');
            const isDark = (document.documentElement.getAttribute("data-theme") === "dark" ||
                document.body.getAttribute("data-theme") === "dark" ||
                localStorage.getItem("appTheme") === "dark") && !isAgencyNow;

            const currentLang = localStorage.getItem("appLang") || "FR";
            const isArabicNow = currentLang === "AR";
            
            // 1. Trouver le widget par tous les moyens (Tag, ID, ou Class)
            const chatWidget = document.querySelector('n8n-chat-widget') || 
                           document.querySelector('#n8n-chat-widget') ||
                           document.querySelector('[id*="n8n-chat"]');

            if (!chatWidget) return;
            const shadowRoot = chatWidget.shadowRoot || chatWidget;

            // 2. Trouver le bouton à l'intérieur
            const button = shadowRoot.querySelector('button') || 
                           shadowRoot.querySelector('.n8n-chat-button') ||
                           document.querySelector('.n8n-chat-button');

            const darkHeader = 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0ea5e9 100%)';
            const darkButton = 'linear-gradient(135deg, #0f172a 0%, #001e72ff 100%)';
            const lightHeader = 'linear-gradient(135deg, #065f46 0%, #10b981 100%)';
            const lightButton = 'linear-gradient(135deg, #065f46 0%, #10b981 100%)';

            const userMsgBg = isDark ? '#2563eb' : '#10b981';

            // 1. Force Header (Shadow DOM)
            const header = shadowRoot.querySelector('.chat-window-header') || shadowRoot.querySelector('[class*="header"]');
            if (header) {
                header.style.setProperty('background', isDark ? darkHeader : lightHeader, 'important');
            }

            if (button) {
                button.style.setProperty('background', isDark ? darkButton : lightButton, 'important');
                button.style.setProperty('position', 'relative', 'important');
                button.style.setProperty('overflow', 'hidden', 'important');

                // Injecter le CSS des icônes DIRECTEMENT dans le root et le document
                if (!shadowRoot.querySelector('#final-chat-style')) {
                    const style = document.createElement('style');
                    style.id = 'final-chat-style';
                    style.textContent = `
                        button svg, .n8n-chat-button svg { display: none !important; }
                        button, .n8n-chat-button { 
                            position: relative !important; 
                            overflow: hidden !important; 
                            background: ${isDark ? darkButton : lightButton} !important;
                            border: none !important;
                            box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
                        }
                        
                        /* Cacher les points rouges ou badges de notification n8n */
                        [class*="badge"], [class*="notification"], .n8n-chat-button::after:not([content=""]) {
                            display: none !important;
                            opacity: 0 !important;
                        }

                        /* Icône IA */
                        button::before, .n8n-chat-button::before {
                            content: "" !important;
                            position: absolute !important;
                            inset: 0 !important;
                            z-index: 10 !important;
                            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'%3E%3C/path%3E%3Cpath d='M5 3v4'%3E%3C/path%3E%3Cpath d='M3 5h4'%3E%3C/path%3E%3C/svg%3E") no-repeat center / 24px !important;
                            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                            opacity: 1 !important;
                        }

                        /* Icône X */
                        button::after, .n8n-chat-button::after {
                            content: "" !important;
                            position: absolute !important;
                            inset: 0 !important;
                            z-index: 11 !important;
                            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E") no-repeat center / 24px !important;
                            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                            opacity: 0 !important;
                            transform: scale(0.5) rotate(-90deg) !important;
                        }

                        /* Switch */
                        .chat-is-open::before { opacity: 0 !important; transform: scale(0.5) !important; }
                        .chat-is-open::after { opacity: 1 !important; transform: scale(1) rotate(0deg) !important; }
                    `;
                    shadowRoot.appendChild(style);
                }

                // Détection de l'état ouvert améliorée
                const isChatOpen = !!shadowRoot.querySelector('.chat-window-header') || 
                                   !!shadowRoot.querySelector('[class*="header"]') || 
                                   !!shadowRoot.querySelector('.n8n-chat-widget-window') ||
                                   !!document.querySelector('.n8n-chat-widget-window');

                if (isChatOpen) {
                    button.classList.add('chat-is-open');
                } else {
                    button.classList.remove('chat-is-open');
                }
            }

            // 3. Force User Messages (Shadow DOM)
            const userMsgs = root.querySelectorAll('.chat-message-from-user .chat-message-bubble');
            userMsgs.forEach(msg => {
                msg.style.setProperty('background', userMsgBg, 'important');
            });

            // 4. Positionnement des messages (Shadow DOM)
            // 4. Positionnement des messages (Shadow DOM)
            const messageRows = root.querySelectorAll('[class*="message"]');
            messageRows.forEach(row => {
                const isBot = row.classList.contains('chat-message-from-bot') || row.className.includes('bot');
                const isUser = row.classList.contains('chat-message-from-user') || row.className.includes('user');

                // Force la direction sur chaque ligne pour éviter les héritages cassés
                row.style.setProperty('direction', isArabicNow ? 'rtl' : 'ltr', 'important');

                if (isArabicNow) {
                    row.style.setProperty('display', 'flex', 'important');
                    row.style.setProperty('width', '100%', 'important');
                    if (isBot) {
                        row.style.setProperty('justify-content', 'flex-end', 'important'); // GAUCHE en RTL
                    } else if (isUser) {
                        row.style.setProperty('justify-content', 'flex-start', 'important'); // DROITE en RTL
                    }
                } else {
                    row.style.setProperty('display', 'flex', 'important');
                    row.style.setProperty('width', '100%', 'important');
                    if (isBot) {
                        row.style.setProperty('justify-content', 'flex-start', 'important'); // GAUCHE en LTR
                    } else if (isUser) {
                        row.style.setProperty('justify-content', 'flex-end', 'important'); // DROITE en LTR
                    }
                }
            });

            const bubbles = root.querySelectorAll('.chat-message-bubble');
            bubbles.forEach(b => {
                if (isArabicNow) {
                    b.style.setProperty('direction', 'rtl', 'important');
                    b.style.setProperty('text-align', 'right', 'important');
                } else {
                    b.style.removeProperty('direction');
                    b.style.removeProperty('text-align');
                }
            });

            // 5. Inverser la flèche d'envoi (Force Brutale Shadow DOM)
            const textarea = root.querySelector('textarea');
            if (textarea) {
                // On remonte au conteneur du champ de saisie (le footer)
                const inputContainer = textarea.closest('div').parentElement;
                if (inputContainer) {
                    if (isArabicNow) {
                        inputContainer.style.setProperty('flex-direction', 'row-reverse', 'important');
                        const footerIcons = inputContainer.querySelectorAll('svg, button');
                        footerIcons.forEach(icon => {
                            icon.style.setProperty('transform', 'rotate(180deg)', 'important');
                        });
                    } else {
                        inputContainer.style.removeProperty('flex-direction');
                        const footerIcons = inputContainer.querySelectorAll('svg, button');
                        footerIcons.forEach(icon => {
                            icon.style.removeProperty('transform');
                        });
                    }
                }
            }

            const iconsToFlip = root.querySelectorAll('svg, i, .n8n-chat-icon');
            iconsToFlip.forEach(icon => {
                if (!icon.closest('[class*="header"]') && !icon.closest('.chat-window-header')) {
                    if (isArabicNow) {
                        icon.style.setProperty('transform', 'scaleX(-1)', 'important');
                    } else {
                        icon.style.removeProperty('transform');
                    }
                }
            });

            // --- TRADUCTION DYNAMIQUE ET TAILLES ---
            const translations = {
                welcome: { AR: 'مرحبًا بك في UppCar ! 🚗', EN: 'Welcome to UppCar! 🚗', FR: 'Bienvenue sur UppCar ! 🚗' },
                nathan: { AR: "اسمي ناثان. كيف يمكنني مساعدتك اليوم؟", EN: "My name is Nathan. How can I help you today?", FR: "Je m'appelle Nathan. Comment puis-je vous aider aujourd'hui ?" },
                title: { AR: '🤖 UppCar مساعد', EN: 'UppCar Assistant 🤖', FR: 'UppCar Assistant 🤖' },
                subtitle: { AR: 'متاح 24/7 لمساعدتك.', EN: 'Available 24/7 to help you.', FR: 'Disponible 24h/24 et 7j/7 pour vous aider.' }
            };

            const lang = localStorage.getItem("appLang") || "FR";
            const targetWelcome = translations.welcome[lang] || translations.welcome.FR;
            const targetNathan = translations.nathan[lang] || translations.nathan.FR;
            const targetTitle = translations.title[lang] || translations.title.FR;
            const targetSubtitle = translations.subtitle[lang] || translations.subtitle.FR;

            const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while ((node = walk.nextNode())) {
                // NE PAS traduire les messages envoyés par l'utilisateur
                if (node.parentElement && (node.parentElement.closest('.chat-message-from-user') || node.parentElement.closest('[class*="user"]'))) {
                    continue;
                }

                let text = node.nodeValue;
                let changed = false;

                // Remplacer n'importe quelle version par la version cible
                Object.values(translations.welcome).forEach(v => { if (text.includes(v) && text !== targetWelcome) { text = text.replace(v, targetWelcome); changed = true; } });
                Object.values(translations.nathan).forEach(v => { if (text.includes(v) && text !== targetNathan) { text = text.replace(v, targetNathan); changed = true; } });
                Object.values(translations.title).forEach(v => { if (text.includes(v) && text !== targetTitle) { text = text.replace(v, targetTitle); changed = true; } });
                Object.values(translations.subtitle).forEach(v => { if (text.includes(v) && text !== targetSubtitle) { text = text.replace(v, targetSubtitle); changed = true; } });

                if (changed) node.nodeValue = text;

                if (text.includes(targetTitle)) {
                    if (node.parentElement) {
                        node.parentElement.style.setProperty('font-size', '15px', 'important');
                        node.parentElement.style.setProperty('font-weight', '700', 'important');
                    }
                }
                if (text.includes(targetSubtitle)) {
                    if (node.parentElement) {
                        node.parentElement.style.setProperty('font-size', '11px', 'important');
                    }
                }
            }
        };

        // Répéter pour s'assurer que ça s'applique même si le widget se recharge
        setInterval(enforceThemeAndTitle, 300);

        // 5. MutationObserver: force le thème blanc à l'ouverture du chat
        const applyWhiteTheme = () => {
            const widget = document.querySelector('#n8n-chat-widget');
            if (!widget) return;

            // Inputs et textareas → fond clair
            widget.querySelectorAll('textarea, input').forEach(el => {
                el.style.setProperty('background', '#f8fafc', 'important');
                el.style.setProperty('background-color', '#f8fafc', 'important');
                el.style.setProperty('color', '#0f172a', 'important');
                el.style.setProperty('border', '1.5px solid #e2e8f0', 'important');
                el.style.setProperty('border-radius', '14px', 'important');
                el.style.setProperty('box-shadow', 'none', 'important');
            });
          />

          {/* � ADMIN */}
          <Route path="/admin" element={<Homeadmin />} />
          
          {/* �🚫 ROUTE INCONNUE */}
          <Route path="*" element={<Navigate to="/" replace />} />

            // Éléments avec fond sombre → blanc (sauf le bouton FAB)
            widget.querySelectorAll('*').forEach(el => {
                if (el.closest('.n8n-chat-button')) return;
                try {
                    const bg = window.getComputedStyle(el).backgroundColor;
                    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return;
                    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (match) {
                        const lum = 0.299 * +match[1] + 0.587 * +match[2] + 0.114 * +match[3];
                        if (lum < 80) {
                            el.style.setProperty('background', '#ffffff', 'important');
                            el.style.setProperty('background-color', '#ffffff', 'important');
                            el.style.setProperty('color', '#1e293b', 'important');
                        }
                    }
                } catch (e) { }
            });
        };

        const observer = new MutationObserver(() => applyWhiteTheme());
        observer.observe(document.body, { childList: true, subtree: true });

        // Fallback toutes les 500ms pendant 15s
        let attempts = 0;
        const interval = setInterval(() => {
            applyWhiteTheme();
            if (++attempts >= 30) clearInterval(interval);
        }, 500);

        return () => { observer.disconnect(); clearInterval(interval); };

    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>

                    {/* 🔓 ROUTES PUBLIQUES */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registre" element={<Registre />} />

                    <Route path="/loginagence" element={<Loginagence />} />
                    <Route path="/registreagence" element={<Registreagence />} />

                    {/* 👤 USER */}
                    <Route
                        path="/homeConnect"
                        element={
                            <PrivateRoute role="user">
                                <HomeConnect />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/car/:id"
                        element={
                            <PrivateRoute role="user">
                                <CarDetails />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/booking/:id"
                        element={
                            <PrivateRoute role="user">
                                <BookingAgreement />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute role="user">
                                <Profile />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/favorites"
                        element={
                            <PrivateRoute role="user">
                                <Favorites />
                            </PrivateRoute>
                        }
                    />


                    {/* 🏢 AGENCE */}
                    <Route
                        path="/homeagence"
                        element={
                            <PrivateRoute role="agence">
                                <Homeagence />
                            </PrivateRoute>
                        }
                    />

                    {/* 🚫 ROUTE INCONNUE */}
                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
