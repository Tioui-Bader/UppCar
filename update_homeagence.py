import re

file_path = 'front/src/component/homeagence/Homeagence.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the giant const css = `...`; block
new_content = re.sub(r'const css = `.*?`;', "import './Homeagence.css';", content, flags=re.DOTALL)

# Remove the inline <style>{css}</style> tag
new_content = new_content.replace('<style>{css}</style>', '')

# Add the glowing orbs right after <div className="app">
orb_injection = """<div className="bg-ambience">
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
                <div className="bg-orb orb-3"></div>
            </div>
            <div className="app">"""
            
new_content = new_content.replace('<div className="app">', orb_injection)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Modification complete.")
