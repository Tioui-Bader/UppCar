const fs = require('fs');
let content = fs.readFileSync('Profile.jsx', 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\${/g, '${');
content = content.replace(/\\}/g, '}');
fs.writeFileSync('Profile.jsx', content);
