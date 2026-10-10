const fs = require('fs');
const path = require('path');

const mockProductsPath = path.join(__dirname, '..', 'lib', 'data', 'mock-products.ts');
const raw = fs.readFileSync(mockProductsPath, 'utf8');

// Parse array from TS export
const jsonStr = raw.replace('import { Product } from \'@/types/product\';\n\nexport const MOCK_PRODUCTS: Product[] = ', '').replace(/;\s*$/, '');
const products = JSON.parse(jsonStr);

// Helper to generate variants for paints/putty/adhesives/waterproofing
function buildVariants(p) {
  const name = p.name.toUpperCase();
  const cat = p.category.toUpperCase();

  // FEVICOL SH ADHESIVE
  if (name.includes('FEVICOL')) {
    return [
      { id: 'v-125g', name: '125 GM', sku: `${p.sku}-125G`, price: 70, stock: 100 },
      { id: 'v-250g', name: '250 GM', sku: `${p.sku}-250G`, price: 120, stock: 90 },
      { id: 'v-500g', name: '500 GM', sku: `${p.sku}-500G`, price: 200, stock: 80 },
      { id: 'v-1kg', name: '1 KG', sku: `${p.sku}-1KG`, price: 350, stock: 120, isDefault: true },
      { id: 'v-2kg', name: '2 KG', sku: `${p.sku}-2KG`, price: 725, stock: 60 },
      { id: 'v-5kg', name: '5 KG', sku: `${p.sku}-5KG`, price: 1700, stock: 45 },
      { id: 'v-10kg', name: '10 KG', sku: `${p.sku}-10KG`, price: 3000, stock: 30 },
      { id: 'v-50kg', name: '50 KG', sku: `${p.sku}-50KG`, price: 10650, stock: 15 },
    ];
  }

  // DR FIXIT PIDIPROOF LW 101
  if (name.includes('PIDIPROOF')) {
    return [
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: 200, stock: 100 },
      { id: 'v-5l', name: '5 LTR', sku: `${p.sku}-5L`, price: 850, stock: 75 },
      { id: 'v-10l', name: '10 LTR', sku: `${p.sku}-10L`, price: 1400, stock: 60 },
      { id: 'v-20l', name: '20 LTR', sku: `${p.sku}-20L`, price: 2600, stock: 40, isDefault: true },
    ];
  }

  // DR FIXIT PIDICRETE URP 301
  if (name.includes('PIDICRETE') || name.includes('URP')) {
    return [
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: 450, stock: 80 },
      { id: 'v-5l', name: '5 LTR', sku: `${p.sku}-5L`, price: 2000, stock: 50 },
      { id: 'v-10l', name: '10 LTR', sku: `${p.sku}-10L`, price: 3800, stock: 35 },
      { id: 'v-20l', name: '20 LTR', sku: `${p.sku}-20L`, price: 7500, stock: 25, isDefault: true },
    ];
  }

  // DAMPSTOP DUO / SEAL O PRIME / DAMPSTOP ADVANCED
  if (name.includes('DAMPSTOP') || name.includes('SEAL O PRIME')) {
    return [
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: Math.round(p.price * 0.15), stock: 60 },
      { id: 'v-4l', name: '4 LTR', sku: `${p.sku}-4L`, price: Math.round(p.price * 0.45), stock: 45 },
      { id: 'v-10l', name: '10 LTR', sku: `${p.sku}-10L`, price: Math.round(p.price * 0.75), stock: 30 },
      { id: 'v-20l', name: '20 LTR', sku: `${p.sku}-20L`, price: p.price, stock: 25, isDefault: true },
    ];
  }

  // LUXOL ENAMEL
  if (name.includes('LUXOL')) {
    return [
      { id: 'v-500ml', name: '500 ML', sku: `${p.sku}-500ML`, price: 190, stock: 80 },
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: 280, stock: 90, isDefault: true },
      { id: 'v-4l', name: '4 LTR', sku: `${p.sku}-4L`, price: 1050, stock: 35 },
    ];
  }

  // EMULSION PAINTS (BISON / SILK GLAMOUR / EASY CLEAN / RANGOLI)
  if (name.includes('EMULSION') || name.includes('LONGLIFE')) {
    const base1L = p.price > 1000 ? Math.round(p.price / 3.8) : p.price;
    return [
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: base1L, stock: 80, isDefault: true },
      { id: 'v-4l', name: '4 LTR', sku: `${p.sku}-4L`, price: Math.round(base1L * 3.8), stock: 50 },
      { id: 'v-10l', name: '10 LTR', sku: `${p.sku}-10L`, price: Math.round(base1L * 8.8), stock: 30 },
      { id: 'v-20l', name: '20 LTR', sku: `${p.sku}-20L`, price: Math.round(base1L * 16.5), stock: 20 },
    ];
  }

  // PRIMERS (RED OXIDE / PINK PRIMER)
  if (name.includes('PRIMER') || name.includes('PRIMMER')) {
    return [
      { id: 'v-500ml', name: '500 ML', sku: `${p.sku}-500ML`, price: Math.round(p.price * 0.6), stock: 50 },
      { id: 'v-1l', name: '1 LTR', sku: `${p.sku}-1L`, price: p.price, stock: 80, isDefault: true },
      { id: 'v-4l', name: '4 LTR', sku: `${p.sku}-4L`, price: Math.round(p.price * 3.7), stock: 40 },
      { id: 'v-20l', name: '20 LTR', sku: `${p.sku}-20L`, price: Math.round(p.price * 17), stock: 15 },
    ];
  }

  // PUTTY (BERGER / BISON / JK WATERPROOF / JK PUTTY)
  if (name.includes('PUTTY')) {
    const base40 = p.price;
    return [
      { id: 'v-5kg', name: '5 KG', sku: `${p.sku}-5KG`, price: Math.round(base40 * 0.16), stock: 60 },
      { id: 'v-20kg', name: '20 KG', sku: `${p.sku}-20KG`, price: Math.round(base40 * 0.55), stock: 40 },
      { id: 'v-40kg', name: '40 KG', sku: `${p.sku}-40KG`, price: base40, stock: 100, isDefault: true },
    ];
  }

  // WHITE CEMENT
  if (name.includes('WHITE CEMENT')) {
    return [
      { id: 'v-1kg', name: '1 KG', sku: `${p.sku}-1KG`, price: 35, stock: 100 },
      { id: 'v-5kg', name: '5 KG', sku: `${p.sku}-5KG`, price: 140, stock: 80 },
      { id: 'v-25kg', name: '25 KG', sku: `${p.sku}-25KG`, price: 580, stock: 40 },
      { id: 'v-50kg', name: '50 KG', sku: `${p.sku}-50KG`, price: 1100, stock: 90, isDefault: true },
    ];
  }

  // PARRYWARE SANITARY SEAT
  if (name.includes('PARRYWARE SEAT')) {
    return [
      { id: 'v-20in', name: '20 Inch', sku: 'PRW-IND-20', price: 1250, stock: 40 },
      { id: 'v-23in', name: '23 Inch', sku: 'PRW-IND-23', price: 1650, stock: 35, isDefault: true },
    ];
  }

  // PARRYWARE ONE PIECE
  if (name.includes('ALPHA NXT')) {
    return [
      { id: 'v-std', name: 'Standard White', sku: 'PRW-ANP-STD', price: 10490, stock: 15, isDefault: true },
      { id: 'v-soft', name: 'Soft-Close Dual Flush', sku: 'PRW-ANP-SFT', price: 11990, stock: 10 },
    ];
  }

  // WD 40
  if (name.includes('WD')) {
    return [
      { id: 'v-100ml', name: '100 ML Can', sku: `${p.sku}-100ML`, price: 145, stock: 60 },
      { id: 'v-420ml', name: '420 ML Spray', sku: `${p.sku}-420ML`, price: 440, stock: 110, isDefault: true },
    ];
  }

  return [];
}

const updatedProducts = products.map((p) => {
  const variants = buildVariants(p);
  return {
    ...p,
    variants: variants.length > 0 ? variants : undefined,
  };
});

const tsOutput = `import { Product } from '@/types/product';\n\nexport const MOCK_PRODUCTS: Product[] = ${JSON.stringify(updatedProducts, null, 2)};\n`;

fs.writeFileSync(mockProductsPath, tsOutput);
console.log('Successfully added variant options to all mock products!');
