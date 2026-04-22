const fs = require('fs');
const parser = require('@babel/parser');

const filePath = './src/component/homeagence/Homeagence.jsx';
const code = fs.readFileSync(filePath, 'utf8');

try {
    parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx']
    });
    console.log("No syntax errors found.");
} catch (e) {
    console.error("Syntax Error found!");
    console.error(e.message);
    const line = e.loc.line;
    // print 5 lines around the error
    const lines = code.split('\n');
    for(let i = Math.max(0, line - 5); i < Math.min(lines.length, line + 5); i++) {
        console.log(`${i+1}: ${lines[i]}`);
    }
}
