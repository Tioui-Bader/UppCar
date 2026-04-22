const fs = require('fs');
const homeRaw = fs.readFileSync('front/src/component/home/Home.jsx', 'utf8');
const hcRaw = fs.readFileSync('front/src/component/homeConnected/HomeConnect.jsx', 'utf8');

// 1. Extract the currentUser state block from HomeConnect
const stateBlockMatch = hcRaw.match(/const \[currentUser, setCurrentUser\] = useState\(null\);\s*const \[isMobile, setIsMobile\] = useState\(false\);\s*const \[userMenuOpen, setUserMenuOpen\] = useState\(false\);\s*useEffect\(\(\) => \{\s*const user = localStorage.getItem\("user"\);\s*if \(user\) setCurrentUser\(JSON.parse\(user\)\);\s*\}, \[\]\);/);
let stateBlock = stateBlockMatch ? stateBlockMatch[0] : `  const [currentUser, setCurrentUser] = useState(null);\n  const [userMenuOpen, setUserMenuOpen] = useState(false);\n  useEffect(() => {\n      const user = localStorage.getItem("user");\n      if (user) setCurrentUser(JSON.parse(user));\n  }, []);`;

// Remove duplicate isMobile states if mixed
stateBlock = stateBlock.replace(/const \[isMobile, setIsMobile\] = useState\(false\);/, '');

// 2. Extract the login-menu-wrap containing currentUser logic from HomeConnect
const hcNavMatch = hcRaw.match(/<div className="login-menu-wrap" style=\{\{ position: "relative" \}\}>[\s\S]*?(?=<\/nav>)/);
let hcNav = hcNavMatch[0];

// 3. Translate the strings in hcNav
hcNav = hcNav.replace(/"Mon profil"/g, 't("nav.myProfile", "Mon profil")');
hcNav = hcNav.replace(/"Mes Réservations"/g, 't("nav.myReservations", "Mes Réservations")');
hcNav = hcNav.replace(/"Favoris"/g, 't("nav.favorites", "Favoris")');
hcNav = hcNav.replace(/"Log out"/gi, 't("nav.logout", "Log out")');
hcNav = hcNav.replace(/>Log out</gi, '>{t("nav.logout", "Log out")}<');
hcNav = hcNav.replace(/"Se connecter"/g, 't("nav.signIn", "Se connecter")');

// Add RTL to the user menu dropdown position
hcNav = hcNav.replace(/right: 0,/g, 'right: selectedLang === "AR" ? "auto" : 0, left: selectedLang === "AR" ? 0 : "auto",');
hcNav = hcNav.replace(/left: "40%",/g, 'left: selectedLang === "AR" ? "86px" : "40%",');

// 4. In homeRaw, inject the state variables
let newHC = homeRaw.replace('const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");', 'const [selectedLang, setSelectedLang] = useState(localStorage.getItem("appLang") || "FR");\n' + stateBlock);

// 5. In homeRaw, replace the login-menu-wrap area
newHC = newHC.replace(/<div className="login-menu-wrap" style=\{\{ position: "relative" \}\}>[\s\S]*?(?=<\/nav>)/, hcNav);

// Rename component
newHC = newHC.replace(/export default function UppCarLanding/g, 'export default function HomeConnect');

// Replace any hardcoded navigate("/") that was home only to keep current connected state if needed (optional)

// 6. Write out to HomeConnect.jsx
fs.writeFileSync('front/src/component/homeConnected/HomeConnect.jsx', newHC);
console.log('Successfully merged Home.jsx translations into HomeConnect.jsx');
