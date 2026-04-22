const fs = require('fs');
let content = fs.readFileSync('Profile.jsx', 'utf8');

// Replace copper rgb with emerald rgb
content = content.replace(/217,\s*119,\s*6/g, '16, 185, 129'); 
// Replace amber/gold hexes with emerald/sky hexes
content = content.replace(/#fbbf24/i, '#10b981');
content = content.replace(/#f59e0b/i, '#0ea5e9');

fs.writeFileSync('Profile.jsx', content);
