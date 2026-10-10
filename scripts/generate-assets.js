const fs = require('fs');
const path = require('path');

const dirs = [
  'public/assets/brand',
  'public/assets/hero',
  'public/assets/categories',
  'public/assets/products',
  'public/assets/banners',
  'public/assets/blog',
  'public/assets/testimonials',
  'public/assets/misc'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

function createSvg(title, color1, color2, iconSymbol) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad)" rx="16" />
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="4" rx="12" />
  <g transform="translate(400, 270)" text-anchor="middle">
    <circle cx="0" cy="0" r="90" fill="#FFFFFF" fill-opacity="0.15" />
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="72" fill="#FFFFFF" font-weight="bold">${iconSymbol}</text>
  </g>
  <text x="400" y="440" font-family="Montserrat, Arial, sans-serif" font-size="32" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">${title.toUpperCase()}</text>
  <text x="400" y="480" font-family="Montserrat, Arial, sans-serif" font-size="18" font-weight="600" fill="#FFAE00" text-anchor="middle" letter-spacing="3">AK HARDWARE • PREMIUM SUPPLIES</text>
</svg>`;
}

const categoryAssets = [
  { name: 'sanitary.svg', title: 'Sanitaryware & Toilets', c1: '#014A94', c2: '#012157', icon: '🚽' },
  { name: 'pipes-fittings.svg', title: 'Pipes & Fittings', c1: '#00A23A', c2: '#014A94', icon: '🚰' },
  { name: 'paints-tools.svg', title: 'Paint & Application Tools', c1: '#FA3A08', c2: '#F9970A', icon: '🖌️' },
  { name: 'hardware.svg', title: 'Hardware & Fittings', c1: '#F9970A', c2: '#FFB800', icon: '🔩' },
  { name: 'electrical.svg', title: 'Electrical & Cabling', c1: '#0088E8', c2: '#012157', icon: '⚡' },
  { name: 'power-tools.svg', title: 'Professional Power Tools', c1: '#012157', c2: '#FA3A08', icon: '⚙️' },
  { name: 'hand-tools.svg', title: 'Precision Hand Tools', c1: '#014A94', c2: '#0088E8', icon: '🔧' },
  { name: 'fasteners.svg', title: 'Fasteners & Bolts', c1: '#F9970A', c2: '#FA3A08', icon: '🛠️' },
  { name: 'bathroom-accessories.svg', title: 'Bathroom Fittings', c1: '#0088E8', c2: '#00A23A', icon: '🚿' },
  { name: 'construction-hardware.svg', title: 'Building & Construction', c1: '#012157', c2: '#014A94', icon: '🏗️' }
];

categoryAssets.forEach(cat => {
  fs.writeFileSync(path.join('public/assets/categories', cat.name), createSvg(cat.title, cat.c1, cat.c2, cat.icon));
});

const productAssets = [
  { name: 'prod-rotary-hammer.svg', title: '20V Brushless Rotary Hammer', c1: '#012157', c2: '#014A94', icon: '🔨' },
  { name: 'prod-angle-grinder.svg', title: '850W Angle Grinder', c1: '#014A94', c2: '#FA3A08', icon: '⚡' },
  { name: 'prod-socket-set.svg', title: '108-Piece Mechanics Tool Set', c1: '#374151', c2: '#111827', icon: '🧰' },
  { name: 'prod-ball-valve.svg', title: 'Solid Brass Ball Valve 1"', c1: '#F9970A', c2: '#FA3A08', icon: '🚰' },
  { name: 'prod-armored-cable.svg', title: '100m Armored Copper Cable', c1: '#0088E8', c2: '#012157', icon: '🔌' },
  { name: 'prod-hex-bolts.svg', title: '304 Stainless Hex Bolts (500 Pcs)', c1: '#6B7280', c2: '#374151', icon: '🔩' },
  { name: 'prod-cpvc-pipe.svg', title: 'Heavy Duty CPVC Water Pipe', c1: '#00A23A', c2: '#014A94', icon: '🧪' },
  { name: 'prod-paint-roller.svg', title: 'Professional Paint Roller Kit', c1: '#FA3A08', c2: '#F9970A', icon: '🎨' },
  { name: 'prod-bathroom-faucet.svg', title: 'Single Lever Brass Mixer Faucet', c1: '#0088E8', c2: '#014A94', icon: '🚰' },
  { name: 'prod-sanitary-toilet.svg', title: 'Dual Flush Ceramic Commode', c1: '#014A94', c2: '#012157', icon: '🚽' }
];

productAssets.forEach(prod => {
  fs.writeFileSync(path.join('public/assets/products', prod.name), createSvg(prod.title, prod.c1, prod.c2, prod.icon));
});

// Hero & Banners
fs.writeFileSync('public/assets/hero/hero-hardware.svg', createSvg('Heavy Industrial Tools & Materials', '#012157', '#014A94', '🏗️'));
fs.writeFileSync('public/assets/banners/promo-tools-banner.svg', createSvg('Power Tools Special Offer', '#FA3A08', '#012157', '⚡'));
fs.writeFileSync('public/assets/banners/promo-plumbing-banner.svg', createSvg('Commercial Plumbing Supplies', '#014A94', '#00A23A', '🚰'));

// Blog Assets
fs.writeFileSync('public/assets/blog/rotary-hammer-guide.svg', createSvg('Rotary Hammer Selection Guide', '#012157', '#FA3A08', '📖'));
fs.writeFileSync('public/assets/blog/fasteners-guide.svg', createSvg('Stainless Steel 304 vs 316', '#374151', '#F9970A', '📐'));
fs.writeFileSync('public/assets/blog/plumbing-guide.svg', createSvg('CPVC Plumbing Standards', '#00A23A', '#014A94', '🚰'));

console.log('All local SVG assets generated successfully!');
