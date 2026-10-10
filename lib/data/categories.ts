export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  iconName: 'Droplets' | 'Workflow' | 'Wrench' | 'LayoutGrid' | 'Paintbrush' | 'Zap';
  image: string;
  productCount: number;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'cat-sanitary',
    name: 'Sanitary Items',
    slug: 'sanitary-items',
    subtitle: 'Bathroom & sanitary products',
    description: 'Vitreous china toilets, wall-hung closets, wash basins, urinals, and ceramic sanitaryware.',
    iconName: 'Droplets',
    image: '/assets/categories/sanitary-3d.jpg',
    productCount: 112,
  },
  {
    id: 'cat-pipes',
    name: 'Pipes & Fittings',
    slug: 'pipes-fittings',
    subtitle: 'Pipes, connectors & fittings',
    description: 'CPVC, UPVC, PVC pressure pipes, brass valves, and plumbing joints.',
    iconName: 'Workflow',
    image: '/assets/categories/pipes-3d.jpg',
    productCount: 245,
  },
  {
    id: 'cat-hardware',
    name: 'Hardware Tools',
    slug: 'hardware-tools',
    subtitle: 'Professional hardware tools',
    description: 'Power tools, hand tools, door locks, hinges, and structural fasteners.',
    iconName: 'Wrench',
    image: '/assets/categories/tools-3d.jpg',
    productCount: 310,
  },
  {
    id: 'cat-tiles',
    name: 'Tiles',
    slug: 'tiles',
    subtitle: 'Floor & wall tiles',
    description: 'Vitrified floor tiles, ceramic wall tiles, tile adhesives, cement, and grouts.',
    iconName: 'LayoutGrid',
    image: '/assets/categories/building-3d.jpg',
    productCount: 185,
  },
  {
    id: 'cat-paint',
    name: 'Paint',
    slug: 'paint',
    subtitle: 'Interior & exterior paints',
    description: 'Interior emulsions, exterior weather-guard paints, primers, rollers, and brushes.',
    iconName: 'Paintbrush',
    image: '/assets/categories/paints-3d.jpg',
    productCount: 130,
  },
  {
    id: 'cat-electrical',
    name: 'Electrical Items',
    slug: 'electrical-items',
    subtitle: 'Electrical accessories & products',
    description: 'Armored cables, modular switches, MCB breakers, conduit pipes, and junction boxes.',
    iconName: 'Zap',
    image: '/assets/categories/electrical-3d.jpg',
    productCount: 195,
  },
];
