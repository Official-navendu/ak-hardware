import { Category } from '@/types/category';

export const PAINT_SUBCATEGORIES = [
  {
    id: 'sub-paint-interior',
    name: 'Interior Paint',
    slug: 'interior',
    parentId: 'cat-paint',
    description: 'Interior emulsions, acrylic wall coats, washability emulsions, and smooth interior wall finishes.',
    image: '/assets/categories/paints-3d.jpg',
    productCount: 45,
    isActive: true,
  },
  {
    id: 'sub-paint-exterior',
    name: 'Exterior Paint',
    slug: 'exterior',
    parentId: 'cat-paint',
    description: 'Weather-shield exterior emulsions, waterproof wall paints, heat-reflective coatings, and exterior primers.',
    image: '/assets/categories/paints-3d.jpg',
    productCount: 40,
    isActive: true,
  },
  {
    id: 'sub-paint-luxury-wood',
    name: 'Luxury & Wood Paint',
    slug: 'luxury-wood',
    parentId: 'cat-paint',
    description: 'Luxury metallic finishes, polyurethane wood polishes, clear varnishes, wood stains, and enamel coatings.',
    image: '/assets/categories/paints-3d.jpg',
    productCount: 35,
    isActive: true,
  },
];

export const OFFICIAL_CATEGORIES = [
  {
    id: 'cat-sanitary',
    name: 'Sanitary Items',
    slug: 'sanitary-items',
    description: 'Vitreous china toilets, wall-hung closets, wash basins, urinals, and ceramic sanitaryware.',
    image: '/assets/hero/sanitary.png',
    productCount: 112,
    featured: true,
    subcategories: [],
  },
  {
    id: 'cat-pipes',
    name: 'Pipes & Fittings',
    slug: 'pipes-fittings',
    description: 'CPVC, UPVC, PVC pressure pipes, brass valves, and plumbing joints.',
    image: '/assets/hero/pipes.png',
    productCount: 245,
    featured: true,
    subcategories: [],
  },
  {
    id: 'cat-hardware',
    name: 'Hardware Tools',
    slug: 'hardware-tools',
    description: 'Power tools, hand tools, door locks, hinges, and structural fasteners.',
    image: '/assets/hero/hardware-tools.png',
    productCount: 310,
    featured: true,
    subcategories: [],
  },
  {
    id: 'cat-tiles',
    name: 'Tiles',
    slug: 'tiles',
    description: 'Vitrified floor tiles, ceramic wall tiles, tile adhesives, cement, and grouts.',
    image: '/assets/hero/tiles.png',
    productCount: 185,
    featured: true,
    subcategories: [],
  },
  {
    id: 'cat-paint',
    name: 'Paint',
    slug: 'paint',
    description: 'Interior emulsions, exterior weather-guard paints, primers, rollers, and brushes.',
    image: '/assets/hero/paint.png',
    productCount: 130,
    featured: true,
    subcategories: PAINT_SUBCATEGORIES,
  },
  {
    id: 'cat-electrical',
    name: 'Electrical Items',
    slug: 'electrical-items',
    description: 'Armored cables, modular switches, MCB breakers, conduit pipes, and junction boxes.',
    image: '/assets/hero/electrical-items.png',
    productCount: 195,
    featured: true,
    subcategories: [],
  },
];

export const MOCK_CATEGORIES: Category[] = OFFICIAL_CATEGORIES.map((cat) => ({
  ...cat,
  subcategories: cat.subcategories || [],
}));

