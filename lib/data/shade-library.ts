export interface SingleShade {
  id: string;
  name: string;
  code: string;
  hex: string;
  group: 'Neutrals' | 'Beiges & Yellows' | 'Pinks & Purples' | 'Blues & Greens';
  isSampled?: boolean;
}

export interface DualCombination {
  id: string;
  title: string;
  code: string;
  group: '2 Colour Combinations';
  colors: {
    role: string; // e.g. "Primary Wall", "Accent Wall"
    name: string;
    code: string;
    hex: string;
  }[];
}

export interface TripleCombination {
  id: string;
  title: string;
  code: string;
  group: '3 Colour Combinations';
  colors: {
    role: string; // e.g. "Main Wall", "Feature Wall", "Trim / Ceiling"
    name: string;
    code: string;
    hex: string;
  }[];
}

export interface SheenComparison {
  id: string;
  title: string;
  group: 'Impact of Sheen on Colour';
  description: string;
  hex: string; // Base colour
  finishes: {
    finishName: string;
    sheenLevel: string; // e.g. "5-10% Gloss", "20-30% Gloss", "85%+ Gloss"
    perceivedEffect: string;
    reflectance: string;
  }[];
}

export type ShadeItem = SingleShade | DualCombination | TripleCombination | SheenComparison;

export const SHADE_GROUPS = [
  'All Shades',
  'Neutrals',
  'Beiges & Yellows',
  'Pinks & Purples',
  'Blues & Greens',
  '2 Colour Combinations',
  '3 Colour Combinations',
  'Impact of Sheen on Colour',
] as const;

export const SINGLE_SHADES: SingleShade[] = [
  // NEUTRALS
  { id: 'n-01', name: 'Cotton Wool', code: '7891', hex: '#F9F8F6', group: 'Neutrals', isSampled: true },
  { id: 'n-02', name: 'Pebble Grey', code: '4102', hex: '#D8D9D7', group: 'Neutrals', isSampled: true },
  { id: 'n-03', name: 'Pure Snow', code: '0915', hex: '#FFFFFF', group: 'Neutrals', isSampled: true },
  { id: 'n-04', name: 'Silvermist', code: '8432', hex: '#BFC5C7', group: 'Neutrals', isSampled: true },
  { id: 'n-05', name: 'Smoky Quartz', code: '0142', hex: '#6C7175', group: 'Neutrals', isSampled: true },
  { id: 'n-06', name: 'Classic Slate', code: '6109', hex: '#4A5056', group: 'Neutrals', isSampled: true },
  { id: 'n-07', name: 'Titanium White', code: '9001', hex: '#F4F5F7', group: 'Neutrals', isSampled: true },
  { id: 'n-08', name: 'Chalkboard Grey', code: '7016', hex: '#373D43', group: 'Neutrals', isSampled: true },

  // BEIGES & YELLOWS
  { id: 'by-01', name: 'Warm Ivory', code: '2104', hex: '#FFF9E6', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-02', name: 'Sandalwood', code: '3012', hex: '#EBDCB9', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-03', name: 'Golden Honey', code: '1024', hex: '#F5C542', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-04', name: 'Buttercup', code: '1018', hex: '#F9E076', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-05', name: 'Desert Dune', code: '2005', hex: '#D6C09C', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-06', name: 'Classic Magnolia', code: '1015', hex: '#F5E6C8', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-07', name: 'Champagne Gold', code: '1032', hex: '#E6C687', group: 'Beiges & Yellows', isSampled: true },
  { id: 'by-08', name: 'Soft Wheat', code: '2003', hex: '#EBE0C7', group: 'Beiges & Yellows', isSampled: true },

  // PINKS & PURPLES
  { id: 'pp-01', name: 'Blush Rose', code: '4001', hex: '#F4C2C2', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-02', name: 'Dusty Orchid', code: '5002', hex: '#DDA0DD', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-03', name: 'Plum Velvet', code: '4007', hex: '#6B3050', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-04', name: 'Soft Lavender', code: '4009', hex: '#E6E6FA', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-05', name: 'Berry Crush', code: '4004', hex: '#A52A2A', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-06', name: 'Vintage Lilac', code: '4008', hex: '#C8A2C8', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-07', name: 'Coral Pink', code: '3022', hex: '#F88379', group: 'Pinks & Purples', isSampled: true },
  { id: 'pp-08', name: 'Royal Magenta', code: '5006', hex: '#8B008B', group: 'Pinks & Purples', isSampled: true },

  // BLUES & GREENS
  { id: 'bg-01', name: 'AK Royal Navy', code: '0157', hex: '#012157', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-02', name: 'AK Royal Blue', code: '0149', hex: '#014A94', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-03', name: 'Ocean Teal', code: '6004', hex: '#008080', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-04', name: 'Sage Harmony', code: '6021', hex: '#9CAF88', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-05', name: 'Sky Azure', code: '5015', hex: '#4682B4', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-06', name: 'Forest Moss', code: '6005', hex: '#2E4A3E', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-07', name: 'Emerald Mist', code: '6016', hex: '#50C878', group: 'Blues & Greens', isSampled: true },
  { id: 'bg-08', name: 'Pacific Cyan', code: '5012', hex: '#008B8B', group: 'Blues & Greens', isSampled: true },
];

export const DUAL_COMBINATIONS: DualCombination[] = [
  {
    id: 'dc-01',
    title: 'Royal Navy & Warm Ivory',
    code: 'COMB-201',
    group: '2 Colour Combinations',
    colors: [
      { role: 'Primary Wall', name: 'AK Royal Navy', code: '0157', hex: '#012157' },
      { role: 'Accent Wall', name: 'Warm Ivory', code: '2104', hex: '#FFF9E6' },
    ],
  },
  {
    id: 'dc-02',
    title: 'Slate Grey & Ocean Teal',
    code: 'COMB-202',
    group: '2 Colour Combinations',
    colors: [
      { role: 'Primary Wall', name: 'Classic Slate', code: '6109', hex: '#4A5056' },
      { role: 'Feature Wall', name: 'Ocean Teal', code: '6004', hex: '#008080' },
    ],
  },
  {
    id: 'dc-03',
    title: 'Terracotta & Sandstone',
    code: 'COMB-203',
    group: '2 Colour Combinations',
    colors: [
      { role: 'Primary Wall', name: 'Desert Dune', code: '2005', hex: '#D6C09C' },
      { role: 'Accent Feature', name: 'Terracotta', code: '3020', hex: '#C05621' },
    ],
  },
  {
    id: 'dc-04',
    title: 'Sage Green & Cotton White',
    code: 'COMB-204',
    group: '2 Colour Combinations',
    colors: [
      { role: 'Primary Wall', name: 'Sage Harmony', code: '6021', hex: '#9CAF88' },
      { role: 'Ceiling & Trim', name: 'Cotton Wool', code: '7891', hex: '#F9F8F6' },
    ],
  },
];

export const TRIPLE_COMBINATIONS: TripleCombination[] = [
  {
    id: 'tc-01',
    title: 'Royal Heritage Palette',
    code: 'COMB-301',
    group: '3 Colour Combinations',
    colors: [
      { role: 'Main Wall', name: 'Warm Ivory', code: '2104', hex: '#FFF9E6' },
      { role: 'Feature Wall', name: 'AK Royal Navy', code: '0157', hex: '#012157' },
      { role: 'Trim & Accent', name: 'Champagne Gold', code: '1032', hex: '#E6C687' },
    ],
  },
  {
    id: 'tc-02',
    title: 'Modern Urban Sanctuary',
    code: 'COMB-302',
    group: '3 Colour Combinations',
    colors: [
      { role: 'Main Wall', name: 'Pebble Grey', code: '4102', hex: '#D8D9D7' },
      { role: 'Feature Wall', name: 'Ocean Teal', code: '6004', hex: '#008080' },
      { role: 'Ceiling / Trim', name: 'Pure Snow', code: '0915', hex: '#FFFFFF' },
    ],
  },
  {
    id: 'tc-03',
    title: 'Earthy Botanical Trio',
    code: 'COMB-303',
    group: '3 Colour Combinations',
    colors: [
      { role: 'Main Wall', name: 'Desert Dune', code: '2005', hex: '#D6C09C' },
      { role: 'Feature Wall', name: 'Forest Moss', code: '6005', hex: '#2E4A3E' },
      { role: 'Highlight', name: 'Sandalwood', code: '3012', hex: '#EBDCB9' },
    ],
  },
];

export const SHEEN_COMPARISONS: SheenComparison[] = [
  {
    id: 'sc-01',
    title: 'Royal Navy (0157) Finish Impact',
    group: 'Impact of Sheen on Colour',
    description: 'Notice how light reflection transforms perceived depth and richness across paint finishes.',
    hex: '#012157',
    finishes: [
      { finishName: 'Matt Finish', sheenLevel: '3-5% Gloss', perceivedEffect: 'Velvety, non-reflective deep color that hides minor wall imperfections.', reflectance: 'Low Reflection' },
      { finishName: 'Silk / Satin', sheenLevel: '25-35% Gloss', perceivedEffect: 'Smooth pearl sheen that enhances vibrancy and is easy to wipe clean.', reflectance: 'Medium Reflection' },
      { finishName: 'High Gloss', sheenLevel: '80%+ Gloss', perceivedEffect: 'Mirror-like reflective finish ideal for doors, trim, and high-impact accents.', reflectance: 'High Reflection' },
    ],
  },
  {
    id: 'sc-02',
    title: 'Warm Ivory (2104) Finish Impact',
    group: 'Impact of Sheen on Colour',
    description: 'Comparing surface light bounce on interior emulsion shades.',
    hex: '#FFF9E6',
    finishes: [
      { finishName: 'Flat Matt', sheenLevel: '2-4% Gloss', perceivedEffect: 'Soft, chalky elegance for living room ceilings and quiet spaces.', reflectance: 'Minimal Bounce' },
      { finishName: 'Soft Sheen', sheenLevel: '15-20% Gloss', perceivedEffect: 'Subtle warm glow ideal for bedrooms and dining spaces.', reflectance: 'Soft Glow' },
      { finishName: 'Gloss Finish', sheenLevel: '75%+ Gloss', perceivedEffect: 'Bright polished sheen for wooden cabinetry and metal trims.', reflectance: 'Maximum Bounce' },
    ],
  },
];
