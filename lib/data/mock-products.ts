import { Product } from '@/types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    "id": "prod-001",
    "name": "BERGER RED OXIDE PRIMER",
    "slug": "berger-red-oxide-primer-1l",
    "sku": "BRG-ROP-1L",
    "description": "High-performance anti-corrosive red oxide metal primer from Berger Paints for interior and exterior iron and steel surfaces.",
    "shortDescription": "Anti-corrosive red oxide metal primer for durable rust protection.",
    "price": 220,
    "category": "Paint",
    "subcategory": "Primers",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-red-oxide.png"
    ],
    "stock": 50,
    "lowStockThreshold": 10,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.8,
    "reviewCount": 42,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Category",
        "value": "PAINT"
      },
      {
        "name": "Type",
        "value": "Red Oxide Primer"
      }
    ],
    "createdAt": "2026-01-10T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-500ml",
        "name": "500 ML",
        "sku": "BRG-ROP-1L-500ML",
        "price": 132,
        "stock": 50
      },
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-ROP-1L-1L",
        "price": 220,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-ROP-1L-4L",
        "price": 814,
        "stock": 40
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-ROP-1L-20L",
        "price": 3740,
        "stock": 15
      }
    ]
  },
  {
    "id": "prod-002",
    "name": "BERGER PINK PRIMER",
    "slug": "berger-pink-primer-1l",
    "sku": "BRG-PNK-1L",
    "description": "Premium wood primer formulated to seal and protect wooden surfaces prior to topcoat paint application.",
    "shortDescription": "Wood primer for smooth adhesion and sealing on timber surfaces.",
    "price": 210,
    "category": "Paint",
    "subcategory": "Primers",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-pink-primer.png"
    ],
    "stock": 45,
    "lowStockThreshold": 10,
    "status": "active",
    "featured": true,
    "popular": false,
    "rating": 4.7,
    "reviewCount": 38,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Category",
        "value": "PAINT"
      },
      {
        "name": "Type",
        "value": "Pink Wood Primer"
      }
    ],
    "createdAt": "2026-01-10T08:30:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-500ml",
        "name": "500 ML",
        "sku": "BRG-PNK-1L-500ML",
        "price": 126,
        "stock": 50
      },
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-PNK-1L-1L",
        "price": 210,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-PNK-1L-4L",
        "price": 777,
        "stock": 40
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-PNK-1L-20L",
        "price": 3570,
        "stock": 15
      }
    ]
  },
  {
    "id": "prod-003",
    "name": "BERGER LUXOL HIGH GLOSS BROWN ENAMEL",
    "slug": "luxol-brown-enamel-1l",
    "sku": "BRG-LX-BRN",
    "description": "Berger Luxol High Gloss synthetic enamel paint in rich brown shade for wood, metal and masonry surfaces.",
    "shortDescription": "High gloss synthetic enamel paint for long lasting gloss & protection.",
    "price": 280,
    "category": "Paint",
    "subcategory": "Enamel Paint",
    "brand": "Berger Luxol",
    "images": [
      "/assets/products/berger-luxol-brown.png"
    ],
    "stock": 60,
    "lowStockThreshold": 12,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 65,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger Luxol"
      },
      {
        "name": "Color",
        "value": "Brown"
      },
      {
        "name": "Finish",
        "value": "High Gloss"
      }
    ],
    "createdAt": "2026-01-12T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-500ml",
        "name": "500 ML",
        "sku": "BRG-LX-BRN-1L-500ML",
        "price": 190,
        "stock": 80
      },
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-LX-BRN-1L-1L",
        "price": 280,
        "stock": 90,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-LX-BRN-1L-4L",
        "price": 1050,
        "stock": 35
      }
    ]
  },
  {
    "id": "prod-005",
    "name": "LUXOL GOLDEN BROWN ENAMEL 1 LTR",
    "slug": "luxol-golden-brown-enamel-1l",
    "sku": "BRG-LX-GBRN-1L",
    "description": "Berger Luxol high gloss synthetic enamel in vibrant golden brown shade.",
    "shortDescription": "Golden brown high gloss enamel paint.",
    "price": 280,
    "category": "Paint",
    "subcategory": "Enamel Paint",
    "brand": "Berger Luxol",
    "images": [
      "/assets/products/berger-luxol-brown.svg"
    ],
    "stock": 40,
    "lowStockThreshold": 10,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.8,
    "reviewCount": 34,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger Luxol"
      },
      {
        "name": "Color",
        "value": "Golden Brown"
      }
    ],
    "createdAt": "2026-01-14T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-500ml",
        "name": "500 ML",
        "sku": "BRG-LX-GBRN-1L-500ML",
        "price": 190,
        "stock": 80
      },
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-LX-GBRN-1L-1L",
        "price": 280,
        "stock": 90,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-LX-GBRN-1L-4L",
        "price": 1050,
        "stock": 35
      }
    ]
  },
  {
    "id": "prod-006",
    "name": "LONGLIFE FLEXO PO BASE 4 LTR",
    "slug": "longlife-flexo-po-base-4l",
    "sku": "BRG-LLF-PO-4L",
    "description": "Berger Longlife Flexo exterior paint base formulation with crack-bridging elastomer technology for long weather protection.",
    "shortDescription": "Flexible weather-guard exterior paint base with crack protection.",
    "price": 2550,
    "category": "Paint",
    "subcategory": "Exterior Emulsion",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-emulsion.svg"
    ],
    "stock": 25,
    "lowStockThreshold": 5,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 52,
    "attributes": [
      {
        "name": "Quantity",
        "value": "4 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Type",
        "value": "Flexo PO Base"
      }
    ],
    "createdAt": "2026-01-15T11:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-LLF-PO-4L-1L",
        "price": 671,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-LLF-PO-4L-4L",
        "price": 2550,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-LLF-PO-4L-10L",
        "price": 5905,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-LLF-PO-4L-20L",
        "price": 11072,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-007",
    "name": "BERGER DAMPSTOP DUO WATERPROOF PRIMER",
    "slug": "dampstop-duo-waterproof-primer-20l",
    "sku": "BRG-DSD",
    "description": "Heavy duty 2-in-1 waterproof sealer and interior/exterior primer preventing dampness, efflorescence and peeling.",
    "shortDescription": "20L waterproof primer protecting walls from severe dampness.",
    "price": 6520,
    "category": "Paint",
    "subcategory": "Waterproof Primer",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-dampstop.svg"
    ],
    "stock": 18,
    "lowStockThreshold": 5,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 88,
    "attributes": [
      {
        "name": "Quantity",
        "value": "20 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Type",
        "value": "Waterproof Primer"
      }
    ],
    "createdAt": "2026-01-18T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-DSD-20L-1L",
        "price": 978,
        "stock": 60
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-DSD-20L-4L",
        "price": 2934,
        "stock": 45
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-DSD-20L-10L",
        "price": 4890,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-DSD-20L-20L",
        "price": 6520,
        "stock": 25,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-009",
    "name": "SEAL O PRIME WATERPROOF PRIMER 20 LTR",
    "slug": "seal-o-prime-waterproof-primer-20l",
    "sku": "BRG-SOP-20L",
    "description": "Triple action waterproof primer with penetrating acrylic polymers for chalky and damp walls.",
    "shortDescription": "20L high-penetration waterproof primer for wall protection.",
    "price": 4500,
    "category": "Paint",
    "subcategory": "Waterproof Primer",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-dampstop.svg"
    ],
    "stock": 22,
    "lowStockThreshold": 5,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 71,
    "attributes": [
      {
        "name": "Quantity",
        "value": "20 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      }
    ],
    "createdAt": "2026-01-20T12:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-SOP-20L-1L",
        "price": 675,
        "stock": 60
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-SOP-20L-4L",
        "price": 2025,
        "stock": 45
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-SOP-20L-10L",
        "price": 3375,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-SOP-20L-20L",
        "price": 4500,
        "stock": 25,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-010",
    "name": "DAMPSTOP ADVANCED 4 LTR",
    "slug": "dampstop-advanced-4l",
    "sku": "BRG-DSA-4L",
    "description": "Berger Dampstop Advanced liquid waterproofing treatment for severe wall dampness problems.",
    "shortDescription": "4L advanced anti-damp coating for interior and exterior walls.",
    "price": 2100,
    "category": "Paint",
    "subcategory": "Waterproof Treatment",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-dampstop.svg"
    ],
    "stock": 35,
    "lowStockThreshold": 8,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.7,
    "reviewCount": 39,
    "attributes": [
      {
        "name": "Quantity",
        "value": "4 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      }
    ],
    "createdAt": "2026-01-22T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-DSA-4L-1L",
        "price": 315,
        "stock": 60
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-DSA-4L-4L",
        "price": 945,
        "stock": 45
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-DSA-4L-10L",
        "price": 1575,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-DSA-4L-20L",
        "price": 2100,
        "stock": 25,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-011",
    "name": "BERGER WATERPROOF PUTTY 40 KG",
    "slug": "berger-waterproof-putty-40kg",
    "sku": "BRG-WPP-40KG",
    "description": "White cement-based polymer enriched waterproof wall putty providing marble-like smooth finish and superior damp resistance.",
    "shortDescription": "40kg waterproof wall putty for ultra-smooth wall finish.",
    "price": 1150,
    "category": "Tiles",
    "subcategory": "Wall Putty",
    "brand": "Berger",
    "images": [
      "/assets/products/wall-putty-bag.svg"
    ],
    "stock": 120,
    "lowStockThreshold": 20,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 110,
    "attributes": [
      {
        "name": "Quantity",
        "value": "40 KG"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Type",
        "value": "Waterproof Wall Putty"
      }
    ],
    "createdAt": "2026-01-25T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "BRG-WPP-40KG-5KG",
        "price": 184,
        "stock": 60
      },
      {
        "id": "v-20kg",
        "name": "20 KG",
        "sku": "BRG-WPP-40KG-20KG",
        "price": 633,
        "stock": 40
      },
      {
        "id": "v-40kg",
        "name": "40 KG",
        "sku": "BRG-WPP-40KG-40KG",
        "price": 1150,
        "stock": 100,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-012",
    "name": "BISON PUTTY 40 KG",
    "slug": "bison-putty-40kg",
    "sku": "BRG-BSP-40KG",
    "description": "Berger Bison smooth white acrylic wall putty for interior plaster leveling.",
    "shortDescription": "40kg economy wall putty for smooth interior walls.",
    "price": 800,
    "category": "Tiles",
    "subcategory": "Wall Putty",
    "brand": "Berger",
    "images": [
      "/assets/products/wall-putty-bag.svg"
    ],
    "stock": 150,
    "lowStockThreshold": 25,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.6,
    "reviewCount": 78,
    "attributes": [
      {
        "name": "Quantity",
        "value": "40 KG"
      },
      {
        "name": "Brand",
        "value": "Berger"
      }
    ],
    "createdAt": "2026-01-25T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "BRG-BSP-40KG-5KG",
        "price": 128,
        "stock": 60
      },
      {
        "id": "v-20kg",
        "name": "20 KG",
        "sku": "BRG-BSP-40KG-20KG",
        "price": 440,
        "stock": 40
      },
      {
        "id": "v-40kg",
        "name": "40 KG",
        "sku": "BRG-BSP-40KG-40KG",
        "price": 800,
        "stock": 100,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-013",
    "name": "JK WATERPROOF PUTTY 40 KG",
    "slug": "jk-waterproof-putty-40kg",
    "sku": "JKC-WPP-40KG",
    "description": "JK White Cement based waterproof wall putty with active silane polymer protection.",
    "shortDescription": "40kg JK waterproof white cement putty for damp resistant walls.",
    "price": 1300,
    "category": "Tiles",
    "subcategory": "Wall Putty",
    "brand": "JK Cement",
    "images": [
      "/assets/products/wall-putty-bag.svg"
    ],
    "stock": 90,
    "lowStockThreshold": 15,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 95,
    "attributes": [
      {
        "name": "Quantity",
        "value": "40 KG"
      },
      {
        "name": "Brand",
        "value": "JK Cement"
      },
      {
        "name": "Status",
        "value": "Verified Stock"
      }
    ],
    "createdAt": "2026-01-28T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "JKC-WPP-40KG-5KG",
        "price": 208,
        "stock": 60
      },
      {
        "id": "v-20kg",
        "name": "20 KG",
        "sku": "JKC-WPP-40KG-20KG",
        "price": 715,
        "stock": 40
      },
      {
        "id": "v-40kg",
        "name": "40 KG",
        "sku": "JKC-WPP-40KG-40KG",
        "price": 1300,
        "stock": 100,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-014",
    "name": "JK PUTTY 40 KG",
    "slug": "jk-putty-40kg",
    "sku": "JKC-PTY-40KG",
    "description": "Standard JK White Max wall putty for interior and exterior wall preparation.",
    "shortDescription": "40kg standard white cement wall putty.",
    "price": 700,
    "category": "Tiles",
    "subcategory": "Wall Putty",
    "brand": "JK Cement",
    "images": [
      "/assets/products/wall-putty-bag.svg"
    ],
    "stock": 160,
    "lowStockThreshold": 30,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.7,
    "reviewCount": 82,
    "attributes": [
      {
        "name": "Quantity",
        "value": "40 KG"
      },
      {
        "name": "Brand",
        "value": "JK Cement"
      }
    ],
    "createdAt": "2026-01-28T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "JKC-PTY-40KG-5KG",
        "price": 112,
        "stock": 60
      },
      {
        "id": "v-20kg",
        "name": "20 KG",
        "sku": "JKC-PTY-40KG-20KG",
        "price": 385,
        "stock": 40
      },
      {
        "id": "v-40kg",
        "name": "40 KG",
        "sku": "JKC-PTY-40KG-40KG",
        "price": 700,
        "stock": 100,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-015",
    "name": "JK WHITE CEMENT 50 KG",
    "slug": "jk-white-cement-50kg",
    "sku": "JKC-WC-50KG",
    "description": "Premium grade high-whiteness Portland white cement from JK Cement for architectural flooring, grouting and decorative plastering.",
    "shortDescription": "50kg super white cement bag for marble laying, tiling & plastering.",
    "price": 1100,
    "category": "Tiles",
    "subcategory": "White Cement",
    "brand": "JK Cement",
    "images": [
      "/assets/products/white-cement-bag.svg"
    ],
    "stock": 200,
    "lowStockThreshold": 30,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 140,
    "attributes": [
      {
        "name": "Quantity",
        "value": "50 KG"
      },
      {
        "name": "Brand",
        "value": "JK Cement"
      }
    ],
    "createdAt": "2026-02-01T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1kg",
        "name": "1 KG",
        "sku": "JKC-WC-50KG-1KG",
        "price": 35,
        "stock": 100
      },
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "JKC-WC-50KG-5KG",
        "price": 140,
        "stock": 80
      },
      {
        "id": "v-25kg",
        "name": "25 KG",
        "sku": "JKC-WC-50KG-25KG",
        "price": 580,
        "stock": 40
      },
      {
        "id": "v-50kg",
        "name": "50 KG",
        "sku": "JKC-WC-50KG-50KG",
        "price": 1100,
        "stock": 90,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-016",
    "name": "BERGER BISON INTERIOR EMULSION",
    "slug": "bison-interior-emulsion-1l",
    "sku": "BRG-BIE",
    "description": "Berger Bison Economy range acrylic interior emulsion for smooth wall finish at budget cost.",
    "shortDescription": "1L economy interior wall paint.",
    "price": 300,
    "category": "Paint",
    "subcategory": "Economy Interior Paint",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-emulsion.svg"
    ],
    "stock": 75,
    "lowStockThreshold": 15,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.5,
    "reviewCount": 46,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Range",
        "value": "Economy Range Paint"
      }
    ],
    "createdAt": "2026-02-03T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-BIE-1L-1L",
        "price": 300,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-BIE-1L-4L",
        "price": 1140,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-BIE-1L-10L",
        "price": 2640,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-BIE-1L-20L",
        "price": 4950,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-018",
    "name": "SILK GLAMOUR DAZZLE EMULSION 1 LTR",
    "slug": "silk-glamour-dazzle-emulsion-1l",
    "sku": "BRG-SGD-1L",
    "description": "Ultra-luxury interior emulsion with metallic dazzle sheen and rich color depth.",
    "shortDescription": "1L luxury interior emulsion with dazzle sheen.",
    "price": 700,
    "category": "Paint",
    "subcategory": "Luxury Interior Paint",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-silk-glamour.svg"
    ],
    "stock": 40,
    "lowStockThreshold": 8,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 62,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Range",
        "value": "Luxury Range Paint"
      }
    ],
    "createdAt": "2026-02-05T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-SGD-1L-1L",
        "price": 700,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-SGD-1L-4L",
        "price": 2660,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-SGD-1L-10L",
        "price": 6160,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-SGD-1L-20L",
        "price": 11550,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-019",
    "name": "EASY CLEAN EMULSION 1 LTR",
    "slug": "easy-clean-emulsion-1l",
    "sku": "BRG-ECE-1L",
    "description": "Berger Easy Clean washable luxury interior emulsion with cross-linking polymers for stain resistant walls.",
    "shortDescription": "1L 100% washable luxury paint for easy stain removal.",
    "price": 600,
    "category": "Paint",
    "subcategory": "Luxury Interior Paint",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-emulsion.svg"
    ],
    "stock": 65,
    "lowStockThreshold": 12,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.8,
    "reviewCount": 73,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Range",
        "value": "Luxury Range Paint"
      }
    ],
    "createdAt": "2026-02-06T11:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-ECE-1L-1L",
        "price": 600,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-ECE-1L-4L",
        "price": 2280,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-ECE-1L-10L",
        "price": 5280,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-ECE-1L-20L",
        "price": 9900,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-020",
    "name": "RANGOLI TOTAL CARE EMULSION 1 LTR",
    "slug": "rangoli-total-care-emulsion-1l",
    "sku": "BRG-RTC-1L",
    "description": "Berger Rangoli Total Care premium interior paint with bio-resistant formulation and smooth matte texture.",
    "shortDescription": "1L premium interior paint with total wall protection.",
    "price": 350,
    "category": "Paint",
    "subcategory": "Premium Interior Paint",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-emulsion.svg"
    ],
    "stock": 90,
    "lowStockThreshold": 15,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.7,
    "reviewCount": 51,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Range",
        "value": "Premium Range Paint"
      }
    ],
    "createdAt": "2026-02-08T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-RTC-1L-1L",
        "price": 350,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-RTC-1L-4L",
        "price": 1330,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-RTC-1L-10L",
        "price": 3080,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-RTC-1L-20L",
        "price": 5775,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-021",
    "name": "SILK GLAMOUR EMULSION 1 LTR",
    "slug": "silk-glamour-emulsion-1l",
    "sku": "BRG-SGE-1L",
    "description": "Berger Silk Glamour 100% acrylic luxury emulsion with crystal reflection technology for high gloss walls.",
    "shortDescription": "1L ultra-luxury smooth silk emulsion.",
    "price": 950,
    "category": "Paint",
    "subcategory": "Luxury Interior Paint",
    "brand": "Berger",
    "images": [
      "/assets/products/berger-silk-glamour.svg"
    ],
    "stock": 30,
    "lowStockThreshold": 6,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 84,
    "attributes": [
      {
        "name": "Quantity",
        "value": "1 LTR"
      },
      {
        "name": "Brand",
        "value": "Berger"
      },
      {
        "name": "Range",
        "value": "Luxury Range Paint"
      }
    ],
    "createdAt": "2026-02-10T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "BRG-SGE-1L-1L",
        "price": 950,
        "stock": 80,
        "isDefault": true
      },
      {
        "id": "v-4l",
        "name": "4 LTR",
        "sku": "BRG-SGE-1L-4L",
        "price": 3610,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "BRG-SGE-1L-10L",
        "price": 8360,
        "stock": 30
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "BRG-SGE-1L-20L",
        "price": 15675,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-022",
    "name": "PARRYWARE INDIAN CLOSET SEAT",
    "slug": "parryware-seat-23-indian",
    "sku": "PRW-IND-SEAT",
    "description": "Heavy duty Parryware vitreous china 23-inch Indian squatting pan seat.",
    "shortDescription": "23-inch durable ceramic Indian closet seat.",
    "price": 1650,
    "category": "Sanitary Items",
    "subcategory": "Indian Closet Seats",
    "brand": "Parryware",
    "images": [
      "/assets/products/parryware-sanitary-seat.svg"
    ],
    "stock": 35,
    "lowStockThreshold": 8,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 4.8,
    "reviewCount": 60,
    "attributes": [
      {
        "name": "Size",
        "value": "23 Inch"
      },
      {
        "name": "Brand",
        "value": "Parryware"
      },
      {
        "name": "Category",
        "value": "SANITARY"
      }
    ],
    "createdAt": "2026-02-12T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-20in",
        "name": "20 Inch",
        "sku": "PRW-IND-20",
        "price": 1250,
        "stock": 40
      },
      {
        "id": "v-23in",
        "name": "23 Inch",
        "sku": "PRW-IND-23",
        "price": 1650,
        "stock": 35,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-023",
    "name": "ALPHA NXT ONE PIECE",
    "slug": "alpha-nxt-one-piece",
    "sku": "PRW-ANP-001",
    "description": "Parryware Alpha Nxt modern one-piece ceramic water closet with dual flush and soft closing seat cover.",
    "shortDescription": "Luxury one-piece water closet with dual flush.",
    "price": 10490,
    "category": "Sanitary Items",
    "subcategory": "One Piece Closets",
    "brand": "Parryware",
    "images": [
      "/assets/products/parryware-one-piece.svg"
    ],
    "stock": 15,
    "lowStockThreshold": 3,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 92,
    "attributes": [
      {
        "name": "Type",
        "value": "One Piece Water Closet"
      },
      {
        "name": "Brand",
        "value": "Parryware"
      },
      {
        "name": "Category",
        "value": "SANITARY"
      }
    ],
    "createdAt": "2026-02-14T11:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-std",
        "name": "Standard White",
        "sku": "PRW-ANP-STD",
        "price": 10490,
        "stock": 15,
        "isDefault": true
      },
      {
        "id": "v-soft",
        "name": "Soft-Close Dual Flush",
        "sku": "PRW-ANP-SFT",
        "price": 11990,
        "stock": 10
      }
    ]
  },
  {
    "id": "prod-025",
    "name": "FEVICOL SH SYNTHETIC RESIN ADHESIVE",
    "slug": "fevicol-sh-125g",
    "sku": "PDL-FSH",
    "description": "Synthetic resin adhesive for wood, plywood, laminate and furniture joinery.",
    "shortDescription": "125g wood adhesive pack.",
    "price": 70,
    "category": "Hardware Tools",
    "subcategory": "Adhesives",
    "brand": "Pidilite",
    "images": [
      "/assets/products/fevicol-sh.svg"
    ],
    "stock": 200,
    "lowStockThreshold": 30,
    "status": "active",
    "featured": false,
    "popular": true,
    "rating": 4.9,
    "reviewCount": 150,
    "attributes": [
      {
        "name": "Quantity",
        "value": "125 GM"
      },
      {
        "name": "Brand",
        "value": "Pidilite"
      }
    ],
    "createdAt": "2026-02-18T09:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-125g",
        "name": "125 GM",
        "sku": "PDL-FSH-125G",
        "price": 70,
        "stock": 200
      },
      {
        "id": "v-250g",
        "name": "250 GM",
        "sku": "PDL-FSH-250G",
        "price": 120,
        "stock": 180
      },
      {
        "id": "v-500g",
        "name": "500 GM",
        "sku": "PDL-FSH-500G",
        "price": 200,
        "stock": 140
      },
      {
        "id": "v-1kg",
        "name": "1 KG",
        "sku": "PDL-FSH-1KG",
        "price": 350,
        "stock": 160,
        "isDefault": true
      },
      {
        "id": "v-2kg",
        "name": "2 KG",
        "sku": "PDL-FSH-2KG",
        "price": 725,
        "stock": 90
      },
      {
        "id": "v-5kg",
        "name": "5 KG",
        "sku": "PDL-FSH-5KG",
        "price": 1700,
        "stock": 60
      },
      {
        "id": "v-10kg",
        "name": "10 KG",
        "sku": "PDL-FSH-10KG",
        "price": 3000,
        "stock": 40
      },
      {
        "id": "v-50kg",
        "name": "50 KG",
        "sku": "PDL-FSH-50KG",
        "price": 10650,
        "stock": 20
      }
    ]
  },
  {
    "id": "prod-033",
    "name": "DR.FIXIT PIDIPROOF LW+ 101 WATERPROOFING",
    "slug": "dr-fixit-pidiproof-lw-101-20l",
    "sku": "DFX-LW101",
    "description": "Dr. Fixit Pidiproof LW+ 101 integral liquid waterproofing compound for concrete, plaster and mortar mixtures.",
    "shortDescription": "20L integral waterproofing liquid for concrete and plaster.",
    "price": 2600,
    "category": "Pipes & Fittings",
    "subcategory": "Waterproofing",
    "brand": "Dr. Fixit",
    "images": [
      "/assets/products/dr-fixit-lw101.svg"
    ],
    "stock": 55,
    "lowStockThreshold": 10,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 160,
    "attributes": [
      {
        "name": "Quantity",
        "value": "20 LTR"
      },
      {
        "name": "Brand",
        "value": "Dr. Fixit"
      },
      {
        "name": "Drive Image",
        "value": "https://drive.google.com/file/d/12l0yOVl6P_1EN5oEK2zSClhWxMi6rOyZ/view?usp=drivesdk"
      }
    ],
    "createdAt": "2026-02-20T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "DFX-LW101-20L-1L",
        "price": 200,
        "stock": 100
      },
      {
        "id": "v-5l",
        "name": "5 LTR",
        "sku": "DFX-LW101-20L-5L",
        "price": 850,
        "stock": 75
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "DFX-LW101-20L-10L",
        "price": 1400,
        "stock": 60
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "DFX-LW101-20L-20L",
        "price": 2600,
        "stock": 40,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-037",
    "name": "DR.FIXIT PIDICRETE URP 301 WATERPROOFING",
    "slug": "dr-fixit-pidicrete-urp-301-20l",
    "sku": "DFX-URP301",
    "description": "Dr. Fixit Pidicrete URP 301 SBR latex polymer bonding agent for concrete repair, waterproofing and roof coating.",
    "shortDescription": "20L SBR polymer for concrete bonding & waterproofing.",
    "price": 7500,
    "category": "Pipes & Fittings",
    "subcategory": "Waterproofing",
    "brand": "Dr. Fixit",
    "images": [
      "/assets/products/dr-fixit-urp301.svg"
    ],
    "stock": 30,
    "lowStockThreshold": 5,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 115,
    "attributes": [
      {
        "name": "Quantity",
        "value": "20 LTR"
      },
      {
        "name": "Brand",
        "value": "Dr. Fixit"
      }
    ],
    "createdAt": "2026-02-22T10:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-1l",
        "name": "1 LTR",
        "sku": "DFX-URP301-20L-1L",
        "price": 450,
        "stock": 80
      },
      {
        "id": "v-5l",
        "name": "5 LTR",
        "sku": "DFX-URP301-20L-5L",
        "price": 2000,
        "stock": 50
      },
      {
        "id": "v-10l",
        "name": "10 LTR",
        "sku": "DFX-URP301-20L-10L",
        "price": 3800,
        "stock": 35
      },
      {
        "id": "v-20l",
        "name": "20 LTR",
        "sku": "DFX-URP301-20L-20L",
        "price": 7500,
        "stock": 25,
        "isDefault": true
      }
    ]
  },
  {
    "id": "prod-041",
    "name": "WD-40 MULTI-USE SPRAY 420 ML",
    "slug": "wd-40-multi-use-spray-420ml",
    "sku": "WD40-MUS-420ML",
    "description": "WD-40 multi-use maintenance spray canister for rust removal, lubrication, squeak elimination and moisture displacement.",
    "shortDescription": "420ml multi-use maintenance spray for rust, squeaks & lubrication.",
    "price": 440,
    "category": "Hardware Tools",
    "subcategory": "Lubricants & Sprays",
    "brand": "WD-40",
    "images": [
      "/assets/products/wd-40-spray.svg"
    ],
    "stock": 110,
    "lowStockThreshold": 20,
    "status": "active",
    "featured": true,
    "popular": true,
    "rating": 5,
    "reviewCount": 240,
    "attributes": [
      {
        "name": "Quantity",
        "value": "420 ML"
      },
      {
        "name": "Brand",
        "value": "WD-40"
      },
      {
        "name": "Drive Image",
        "value": "https://drive.google.com/file/d/1tnQY2MYxj3T2VsCNmgL40vNri1zOrJ7O/view?usp=drivesdk"
      }
    ],
    "createdAt": "2026-02-25T08:00:00Z",
    "updatedAt": "2026-10-08T10:00:00Z",
    "variants": [
      {
        "id": "v-100ml",
        "name": "100 ML Can",
        "sku": "WD40-MUS-420ML-100ML",
        "price": 145,
        "stock": 60
      },
      {
        "id": "v-420ml",
        "name": "420 ML Spray",
        "sku": "WD40-MUS-420ML-420ML",
        "price": 440,
        "stock": 110,
        "isDefault": true
      }
    ]
  }
];
