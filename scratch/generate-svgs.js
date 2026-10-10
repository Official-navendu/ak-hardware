const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function write(name, svg) {
  fs.writeFileSync(path.join(targetDir, name), svg.trim());
  console.log('Created product SVG:', name);
}

write('berger-red-oxide.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#8B0000"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#D1D5DB"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#8B0000">BERGER</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#1E293B">RED OXIDE</text>
  <text x="200" y="220" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#64748B">PRIMER</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#BE123C"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">PAINT PRIMER</text>
</svg>`);

write('berger-pink-primer.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#DB2777"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#E2E8F0"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#BE185D">BERGER</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#1E293B">PINK PRIMER</text>
  <text x="200" y="220" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#64748B">WOOD PRIMER</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#9D174D"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">WOOD PRIMER</text>
</svg>`);

write('berger-luxol-brown.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#78350F"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#CBD5E1"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#92400E">BERGER</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#1E293B">LUXOL ENAMEL</text>
  <text x="200" y="222" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#B45309">BROWN / GOLDEN</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#451A03"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">HIGH GLOSS</text>
</svg>`);

write('berger-dampstop.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="90" y="80" width="220" height="250" rx="20" fill="#0284C7"/>
  <rect x="80" y="60" width="240" height="30" rx="8" fill="#0369A1"/>
  <rect x="105" y="130" width="190" height="135" rx="10" fill="#FFFFFF"/>
  <text x="200" y="165" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#0284C7">BERGER</text>
  <text x="200" y="190" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="16" fill="#0F172A">DAMPSTOP DUO</text>
  <text x="200" y="212" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#0284C7">WATERPROOF PRIMER</text>
  <rect x="130" y="280" width="140" height="32" rx="16" fill="#075985"/>
  <text x="200" y="301" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">WATERPROOFING</text>
</svg>`);

write('berger-emulsion.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#2563EB"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#94A3B8"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#1D4ED8">BERGER</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="15" fill="#1E293B">BISON EMULSION</text>
  <text x="200" y="222" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#2563EB">INTERIOR SMOOTH</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#1E40AF"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">EMULSION PAINT</text>
</svg>`);

write('berger-silk-glamour.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#7E22CE"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#E9D5FF"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#6B21A8">BERGER</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="15" fill="#1E293B">SILK GLAMOUR</text>
  <text x="200" y="222" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#7E22CE">LUXURY EMULSION</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#581C87"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">LUXURY PAINT</text>
</svg>`);

write('wall-putty-bag.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <path d="M110,90 L290,90 L310,320 L90,320 Z" fill="#059669"/>
  <rect x="120" y="130" width="160" height="130" rx="8" fill="#FFFFFF"/>
  <text x="200" y="165" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#047857">WALL PUTTY</text>
  <text x="200" y="190" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="15" fill="#0F172A">BERGER / JK</text>
  <text x="200" y="212" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#059669">WATERPROOF SHIELD</text>
  <rect x="140" y="275" width="120" height="30" rx="15" fill="#064E3B"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#FFFFFF">40 KG BAG</text>
</svg>`);

write('white-cement-bag.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <path d="M110,90 L290,90 L310,320 L90,320 Z" fill="#0284C7"/>
  <rect x="120" y="130" width="160" height="130" rx="8" fill="#FFFFFF"/>
  <text x="200" y="165" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#0369A1">JK CEMENT</text>
  <text x="200" y="190" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="15" fill="#0F172A">WHITE CEMENT</text>
  <text x="200" y="212" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#0284C7">SUPER WHITE</text>
  <rect x="140" y="275" width="120" height="30" rx="15" fill="#075985"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#FFFFFF">50 KG BAG</text>
</svg>`);

write('fevicol-sh.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="110" y="100" width="180" height="220" rx="20" fill="#1D4ED8"/>
  <rect x="100" y="75" width="200" height="30" rx="8" fill="#DC2626"/>
  <rect x="125" y="145" width="150" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="180" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="#DC2626">FEVICOL</text>
  <text x="200" y="210" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="24" fill="#1D4ED8">SH</text>
  <text x="200" y="235" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="11" fill="#475569">WOOD ADHESIVE</text>
</svg>`);

write('dr-fixit-lw101.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#EA580C"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#1E293B"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#EA580C">DR. FIXIT</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#0F172A">PIDIPROOF LW+</text>
  <text x="200" y="220" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#C2410C">WATERPROOFING 101</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#9A3412"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">LIQUID SHIELD</text>
</svg>`);

write('dr-fixit-urp301.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="100" y="90" width="200" height="240" rx="16" fill="#CA8A04"/>
  <rect x="90" y="70" width="220" height="25" rx="6" fill="#1E293B"/>
  <rect x="110" y="140" width="180" height="120" rx="8" fill="#FFFFFF"/>
  <text x="200" y="175" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="#A16207">DR. FIXIT</text>
  <text x="200" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#0F172A">PIDICRETE URP</text>
  <text x="200" y="220" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#854D0E">SBR POLYMER 301</text>
  <rect x="130" y="275" width="140" height="30" rx="15" fill="#713F12"/>
  <text x="200" y="295" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">BONDING AGENT</text>
</svg>`);

write('wd-40-spray.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="140" y="110" width="120" height="220" rx="12" fill="#1D4ED8"/>
  <rect x="170" y="70" width="60" height="40" rx="4" fill="#DC2626"/>
  <rect x="185" y="50" width="30" height="20" rx="2" fill="#FFFFFF"/>
  <rect x="150" y="150" width="100" height="120" rx="6" fill="#FACC15"/>
  <text x="200" y="190" text-anchor="middle" font-family="Arial" font-weight="black" font-size="22" fill="#1D4ED8">WD-40</text>
  <text x="200" y="215" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="11" fill="#DC2626">MULTI-USE</text>
  <text x="200" y="235" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="10" fill="#1E293B">LUBRICANT SPRAY</text>
</svg>`);

write('parryware-sanitary-seat.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <ellipse cx="200" cy="210" rx="110" ry="130" fill="#014A94"/>
  <ellipse cx="200" cy="210" rx="95" ry="115" fill="#FFFFFF"/>
  <ellipse cx="200" cy="210" rx="55" ry="75" fill="#F8FAFC"/>
  <rect x="150" y="70" width="100" height="30" rx="6" fill="#012157"/>
  <text x="200" y="90" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="13" fill="#FFFFFF">PARRYWARE</text>
</svg>`);

write('parryware-one-piece.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="130" y="70" width="140" height="130" rx="12" fill="#E2E8F0"/>
  <rect x="140" y="80" width="120" height="110" rx="8" fill="#FFFFFF"/>
  <path d="M130,200 L270,200 L250,330 L150,330 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="4"/>
  <ellipse cx="200" cy="220" rx="65" ry="20" fill="#CBD5E1"/>
  <text x="200" y="140" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#014A94">PARRYWARE</text>
  <text x="200" y="160" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="12" fill="#475569">ALPHA NXT</text>
</svg>`);
