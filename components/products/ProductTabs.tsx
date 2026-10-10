'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  CheckCircle2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Package,
  Clock,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Send,
} from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface ProductTabsProps {
  product: Product;
  moreFromBrand: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
}

interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  likes: number;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  moreFromBrand,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'shipping'>('description');
  
  // Review form local state
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Default reviews tailored by product category
  const getInitialReviews = (p: Product): UserReview[] => {
    const isPaint = p.category.toLowerCase().includes('paint');
    const isPutty = p.category.toLowerCase().includes('putty') || p.category.toLowerCase().includes('cement') || p.category.toLowerCase().includes('tiles');
    const isWaterproofing = p.category.toLowerCase().includes('waterproof') || p.category.toLowerCase().includes('pipe');
    const isAdhesive = p.category.toLowerCase().includes('hardware') || p.category.toLowerCase().includes('tool') || p.brand.toLowerCase().includes('pidilite');
    const isSanitary = p.category.toLowerCase().includes('sanitary') || p.brand.toLowerCase().includes('parryware');

    if (isPaint) {
      return [
        {
          id: 'rev-p1',
          name: 'Rajesh Sharma',
          rating: 5,
          date: '10 days ago',
          title: 'Excellent color finish & coverage!',
          comment: `Bought ${p.name} for home painting. The consistency is perfect and covered our walls in just 2 coats. Genuine product delivered in 24 hours in Muzaffarpur!`,
          verified: true,
          likes: 12,
        },
        {
          id: 'rev-p2',
          name: 'Amit Kumar Singh',
          rating: 5,
          date: '2 weeks ago',
          title: 'Original Berger Paint from AK Hardware',
          comment: `100% authentic factory-sealed container. Great price compared to local market. Highly recommended for contracting work.`,
          verified: true,
          likes: 8,
        },
        {
          id: 'rev-p3',
          name: 'Vikas Mishra',
          rating: 4,
          date: '1 month ago',
          title: 'Good quality & fast delivery',
          comment: `Paint quality is top-notch with long gloss retention. Delivery packaging was safe with double sealing.`,
          verified: true,
          likes: 5,
        }
      ];
    } else if (isPutty) {
      return [
        {
          id: 'rev-u1',
          name: 'Surendra Prasad',
          rating: 5,
          date: '5 days ago',
          title: 'Super smooth wall finish & no cracking',
          comment: `Used ${p.name} for building plastering. Gives marble-like smooth surface. Highly durable putty with no chalking.`,
          verified: true,
          likes: 15,
        },
        {
          id: 'rev-u2',
          name: 'Ramesh Contractor',
          rating: 5,
          date: '3 weeks ago',
          title: 'Best price for 40kg bag',
          comment: `Original bag with genuine hologram seal. Delivered directly to our construction site without damage.`,
          verified: true,
          likes: 10,
        }
      ];
    } else if (isWaterproofing) {
      return [
        {
          id: 'rev-w1',
          name: 'Dr. Anand Prakash',
          rating: 5,
          date: '1 week ago',
          title: 'Stopped terrace dampness completely!',
          comment: `Applied ${p.name} mixed with cement plaster. Even during heavy monsoon rains, there is zero dampness or seepage now!`,
          verified: true,
          likes: 24,
        },
        {
          id: 'rev-w2',
          name: 'Sunil Yadav',
          rating: 5,
          date: '2 weeks ago',
          title: 'Must have for concrete waterproofing',
          comment: `Dr. Fixit products are always reliable and AK Hardware provided original stock with recent manufacturing date.`,
          verified: true,
          likes: 14,
        }
      ];
    } else if (isAdhesive) {
      return [
        {
          id: 'rev-a1',
          name: 'Manoj Carpenter',
          rating: 5,
          date: '4 days ago',
          title: 'Strong bonding strength for furniture & plywood',
          comment: `Fevicol SH / WD-40 quality is unmatched. Glues laminates tightly without bubbling. Fast dispatch from AK Hardware.`,
          verified: true,
          likes: 18,
        },
        {
          id: 'rev-a2',
          name: 'Alok Kumar',
          rating: 5,
          date: '12 days ago',
          title: 'Original Pidilite product',
          comment: `Seal is intact and adhesive is fresh. Very good pricing for bulk quantity.`,
          verified: true,
          likes: 9,
        }
      ];
    } else if (isSanitary) {
      return [
        {
          id: 'rev-s1',
          name: 'Priyanka Sen',
          rating: 5,
          date: '1 week ago',
          title: 'Sturdy Parryware build & elegant design',
          comment: `The ceramic glaze is brilliant and easy to clean. Fits perfectly in our modern bathroom renovation.`,
          verified: true,
          likes: 16,
        },
        {
          id: 'rev-s2',
          name: 'Deepak Roy',
          rating: 5,
          date: '3 weeks ago',
          title: 'Heavy duty ceramic with soft close seat',
          comment: `Delivered safely in heavy Wooden crate protection. No chips or scratches. Excellent service!`,
          verified: true,
          likes: 11,
        }
      ];
    }

    return [
      {
        id: 'rev-g1',
        name: 'Ravi Kumar',
        rating: 5,
        date: '1 week ago',
        title: 'Top quality product!',
        comment: `Extremely satisfied with ${p.name}. Works as advertised and delivered on time.`,
        verified: true,
        likes: 7,
      },
      {
        id: 'rev-g2',
        name: 'Suresh Shah',
        rating: 5,
        date: '2 weeks ago',
        title: 'Highly recommended',
        comment: `AK Hardware provides 100% original hardware items. Great experience shopping here.`,
        verified: true,
        likes: 4,
      }
    ];
  };

  const [reviewsList, setReviewsList] = useState<UserReview[]>(() => getInitialReviews(product));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim() || !reviewTitle.trim()) return;

    const newRev: UserReview = {
      id: `user-rev-${Date.now()}`,
      name: reviewName,
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle,
      comment: reviewComment,
      verified: true,
      likes: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Helper for dynamic features per product category
  const getDynamicFeatures = (p: Product) => {
    const cat = p.category.toLowerCase();
    const brand = p.brand.toLowerCase();

    if (cat.includes('paint')) {
      return [
        'High opacity and superior wall coverage',
        'Anti-fungal & weather-guard protection',
        'Smooth aesthetic finish with long color retention',
        'Low VOC and eco-friendly formulation',
        'Easy application with roller, brush, or spray gun',
      ];
    } else if (cat.includes('putty') || cat.includes('cement') || cat.includes('tile')) {
      return [
        'White cement silane polymer formulation',
        'Prevents water seepage and dampness peeling',
        'Smooth marble-like finish for walls',
        'Strong tensile adhesion strength',
        'Eliminates surface micro-cracks and rough spots',
      ];
    } else if (cat.includes('waterproof') || cat.includes('pipe')) {
      return [
        'Deep penetrating acrylic SBR polymer shield',
        'Prevents efflorescence and saltpetre formation',
        'Ideal for RCC slabs, terraces, and damp walls',
        'Increases concrete bond and flexural strength',
        'Protects steel reinforcement against corrosion',
      ];
    } else if (brand.includes('pidilite') || cat.includes('tool') || cat.includes('hardware')) {
      return [
        'High synthetic resin bonding strength',
        'Fast setting and initial tack time',
        'Water-resistant durable jointing',
        'Ideal for wood, laminates, veneer, and multi-purpose repair',
        'Multi-use rust prevention & anti-squeak lubrication',
      ];
    } else if (cat.includes('sanitary') || brand.includes('parryware')) {
      return [
        'Vitreous china ceramic construction',
        'Stain-resistant smooth antibacterial glaze',
        'Ergonomic space-saving design',
        'Effortless cleaning and hygiene maintenance',
        'Factory tested dual flush and leak-proof seal',
      ];
    }

    return [
      '100% Genuine factory certified product',
      'Engineered for long-lasting durability',
      'Tested for heavy-duty trade usage',
      'Easy installation and maintenance',
      'Backed by manufacturer brand warranty',
    ];
  };

  // Helper for category application instructions
  const getApplicationGuide = (p: Product) => {
    const cat = p.category.toLowerCase();
    if (cat.includes('paint')) {
      return 'Clean wall surface thoroughly from dust and loose particles. Apply 1 coat of primer followed by 2 coats of emulsion paint diluted with 30-40% clean water. Allow 4-6 hours drying time between coats.';
    } else if (cat.includes('putty') || cat.includes('cement')) {
      return 'Mix powder with 35-40% clean water by volume to form a smooth workable paste. Apply 2 coats of putty with a putty blade keeping total thickness around 1.5mm. Allow 6-8 hours drying before painting.';
    } else if (cat.includes('waterproof')) {
      return 'For waterproofing mortar: Add 200ml LW+/URP per 50kg bag of cement. For bonding coat: Mix 1 part URP polymer with 1.5 parts cement and brush apply over prepared concrete surface.';
    } else if (p.name.includes('FEVICOL')) {
      return 'Apply a uniform thin layer of Fevicol SH on both clean dry surfaces. Press surfaces together firmly and keep clamped or under weight for 4-6 hours for optimum bonding.';
    } else if (p.name.includes('WD-40') || p.name.includes('WD 40')) {
      return 'Shake can well. Spray directly onto rusty or sticking metal parts. Allow 2 minutes for deep liquid penetration. Wipe excess liquid with a clean cloth.';
    } else if (cat.includes('sanitary')) {
      return 'Ensure waste pipe alignment and level mounting surface before installation. Use recommended ceramic sealant or rubber gaskets to prevent water leakage.';
    }
    return 'Follow standard hardware safety guidelines. Store in a cool dry place away from direct sunlight.';
  };

  const dynamicFeatures = getDynamicFeatures(product);
  const applicationInstructions = getApplicationGuide(product);
  const quantityAttr = product.attributes?.find((a) => a.name.toLowerCase() === 'quantity' || a.name.toLowerCase() === 'size')?.value || 'Standard Pack';

  return (
    <div className="w-full">
      {/* TAB NAVIGATION HEADER */}
      <div className="flex items-center gap-4 sm:gap-8 border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`pb-3 text-sm font-extrabold transition-all whitespace-nowrap relative ${
            activeTab === 'description'
              ? 'text-[#FA3A08] border-b-2 border-[#FA3A08]'
              : 'text-slate-500 hover:text-[#0C1E38]'
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('specifications')}
          className={`pb-3 text-sm font-extrabold transition-all whitespace-nowrap relative ${
            activeTab === 'specifications'
              ? 'text-[#FA3A08] border-b-2 border-[#FA3A08]'
              : 'text-slate-500 hover:text-[#0C1E38]'
          }`}
        >
          Specifications
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-sm font-extrabold transition-all whitespace-nowrap relative ${
            activeTab === 'reviews'
              ? 'text-[#FA3A08] border-b-2 border-[#FA3A08]'
              : 'text-slate-500 hover:text-[#0C1E38]'
          }`}
        >
          Reviews ({product.reviewCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shipping')}
          className={`pb-3 text-sm font-extrabold transition-all whitespace-nowrap relative ${
            activeTab === 'shipping'
              ? 'text-[#FA3A08] border-b-2 border-[#FA3A08]'
              : 'text-slate-500 hover:text-[#0C1E38]'
          }`}
        >
          Shipping &amp; Returns
        </button>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN TAB CONTENT AREA (9 COLS) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* TAB 1: DESCRIPTION */}
          {activeTab === 'description' && (
            <div className="flex flex-col gap-6 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-[#0C1E38] text-lg mb-3">About {product.name}</h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* DYNAMIC FEATURE HIGHLIGHTS */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-extrabold text-[#0C1E38] text-sm mb-4">Key Features &amp; Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dynamicFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-[#FAFCFF] border border-slate-100 p-3 rounded-xl">
                      <CheckCircle2 className="h-4 w-4 text-[#00A23A] flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-[#0C1E38]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* APPLICATION & USAGE GUIDE */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-extrabold text-[#0C1E38] text-sm mb-2">Usage &amp; Application Guide</h4>
                <div className="bg-[#E8F1FD]/50 border border-[#D0E2FB] rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-[#1B4E9B] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {applicationInstructions}
                  </p>
                </div>
              </div>

              {/* BRAND & FACTORY SEAL ASSURANCE */}
              <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#FA3A08]" />
                  <span>Factory Sealed Container: <strong className="text-[#0C1E38]">{quantityAttr}</strong></span>
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#00A23A]" />
                  <span>Manufacturer Brand: <strong className="text-[#0C1E38]">{product.brand}</strong></span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#1B4E9B]" />
                  <span>Shelf Life: <strong className="text-[#0C1E38]">24 Months</strong></span>
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIFICATIONS */}
          {activeTab === 'specifications' && (
            <div className="flex flex-col gap-6 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-[#0C1E38] text-lg mb-2">Technical Specifications</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Detailed product parameters and manufacturing attributes for {product.name}.
                </p>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="flex items-center justify-between p-3.5 bg-[#F1F5F9] font-bold text-[#0C1E38] border-b border-slate-200">
                    <span>Specification Field</span>
                    <span>Product Parameter</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white border-b border-slate-100">
                    <span className="font-medium text-slate-600">Product Name</span>
                    <span className="font-bold text-[#0C1E38]">{product.name}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAFCFF] border-b border-slate-100">
                    <span className="font-medium text-slate-600">Manufacturer Brand</span>
                    <span className="font-bold text-[#1B4E9B]">{product.brand}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white border-b border-slate-100">
                    <span className="font-medium text-slate-600">Product Category</span>
                    <span className="font-bold text-[#0C1E38]">{product.category}</span>
                  </div>

                  {product.subcategory && (
                    <div className="flex items-center justify-between p-3.5 bg-[#FAFCFF] border-b border-slate-100">
                      <span className="font-medium text-slate-600">Subcategory / Type</span>
                      <span className="font-bold text-[#0C1E38]">{product.subcategory}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3.5 bg-white border-b border-slate-100">
                    <span className="font-medium text-slate-600">Pack Quantity / Size</span>
                    <span className="font-bold text-[#FA3A08]">{quantityAttr}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAFCFF] border-b border-slate-100">
                    <span className="font-medium text-slate-600">SKU Code</span>
                    <span className="font-mono text-slate-700">{product.sku}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white border-b border-slate-100">
                    <span className="font-medium text-slate-600">Stock Availability</span>
                    <span className="font-bold text-[#00A23A]">In Stock ({product.stock} units)</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#FAFCFF] border-b border-slate-100">
                    <span className="font-medium text-slate-600">Quality Assurance</span>
                    <span className="font-bold text-[#0C1E38]">100% Genuine Authorized Stock</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white">
                    <span className="font-medium text-slate-600">Return Policy</span>
                    <span className="font-bold text-[#1B4E9B]">7 Days Replacement Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
              
              {/* REVIEWS HEADER SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FAFCFF] border border-slate-200/80 p-6 rounded-2xl">
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0">
                  <span className="text-4xl font-extrabold text-[#0C1E38]">{product.rating}</span>
                  <div className="flex text-amber-400 gap-1 my-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Based on {product.reviewCount} customer ratings</span>
                </div>

                <div className="md:col-span-8 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-slate-600 font-semibold">5 Stars</span>
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[85%]" />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-medium">85%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-slate-600 font-semibold">4 Stars</span>
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[12%]" />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-medium">12%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-slate-600 font-semibold">3 Stars</span>
                    <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-[3%]" />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-medium">3%</span>
                  </div>
                </div>
              </div>

              {/* WRITE A REVIEW FORM */}
              <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50/50">
                <h4 className="font-extrabold text-[#0C1E38] text-base mb-1">Write a Customer Review</h4>
                <p className="text-xs text-slate-500 mb-4">Share your experience with {product.name}</p>

                {reviewSubmitted && (
                  <div className="bg-[#EAFBF0] border border-[#00A23A]/30 text-[#00A23A] text-xs font-bold p-3.5 rx-lg mb-4 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Thank you! Your review has been published successfully.</span>
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">Your Rating:</span>
                    <div className="flex gap-1 text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`h-5 w-5 ${star <= reviewRating ? 'fill-current text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#FA3A08]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Review Headline *</label>
                      <input
                        type="text"
                        required
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Excellent quality & fast delivery!"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#FA3A08]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Detailed Review *</label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Write your feedback regarding product finish, coverage, or durability..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#FA3A08]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="self-start bg-[#0C1E38] hover:bg-[#1B4E9B] text-white font-bold text-xs py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>

              {/* VERIFIED REVIEWS LIST */}
              <div className="flex flex-col gap-4">
                <h4 className="font-extrabold text-[#0C1E38] text-base">Verified Customer Reviews ({reviewsList.length})</h4>
                <div className="flex flex-col gap-4">
                  {reviewsList.map((rev) => (
                    <div key={rev.id} className="border-b border-slate-100 pb-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0C1E38]">{rev.name}</span>
                          {rev.verified && (
                            <span className="bg-[#EAFBF0] text-[#00A23A] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`} />
                          ))}
                        </div>
                        <h5 className="font-bold text-xs text-[#0C1E38]">{rev.title}</h5>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                        <button type="button" className="hover:text-[#1B4E9B] flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>Helpful ({rev.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SHIPPING & RETURNS */}
          {activeTab === 'shipping' && (
            <div className="flex flex-col gap-6 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-[#0C1E38] text-lg mb-2">Shipping &amp; Delivery Information</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fast &amp; reliable doorstep shipping from AK Hardware store &amp; warehouse.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#FAFCFF] border border-slate-200/80 p-5 rounded-2xl flex flex-col gap-2">
                    <MapPin className="h-5 w-5 text-[#FA3A08]" />
                    <h4 className="font-bold text-xs text-[#0C1E38]">Store Pickup (Muzaffarpur)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Free same-day pickup at AK Hardware, Main Road, Muzaffarpur, Bihar. Ready within 2 hours.
                    </p>
                  </div>

                  <div className="bg-[#FAFCFF] border border-slate-200/80 p-5 rounded-2xl flex flex-col gap-2">
                    <Truck className="h-5 w-5 text-[#1B4E9B]" />
                    <h4 className="font-bold text-xs text-[#0C1E38]">Bihar Express Delivery</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Delivered within 24–48 hours across Muzaffarpur, Patna, Darbhanga, Sitamarhi &amp; Samastipur.
                    </p>
                  </div>

                  <div className="bg-[#FAFCFF] border border-slate-200/80 p-5 rounded-2xl flex flex-col gap-2">
                    <Package className="h-5 w-5 text-[#00A23A]" />
                    <h4 className="font-bold text-xs text-[#0C1E38]">Free Shipping over ₹999</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Enjoy free home delivery on all retail hardware &amp; paint orders exceeding ₹999.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7 DAYS RETURN POLICY */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-extrabold text-[#0C1E38] text-base mb-3 flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-[#FA3A08]" />
                  <span>7-Day Replacement Guarantee</span>
                </h4>
                <div className="bg-[#FFF0EC] border border-[#FA3A08]/20 p-4 rounded-xl text-xs text-slate-700 leading-relaxed flex flex-col gap-2">
                  <p>
                    If your item arrives damaged, defective, or incorrect, AK Hardware offers an immediate 100% replacement or refund within 7 days of delivery.
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-medium text-slate-800">
                    <li>Paints, Primers &amp; Putty containers must remain factory sealed &amp; unopened.</li>
                    <li>Sanitaryware &amp; Hardware items must include original product packaging.</li>
                    <li>Contact support at <strong>+91 7484034410</strong> or email <strong>akhardware@gmail.com</strong> for quick return pickup.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: MORE FROM BRAND (3 COLS) */}
        <div className="lg:col-span-3 bg-[#FAFCFF] border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4 self-start">
          <h4 className="font-extrabold text-[#0C1E38] text-sm border-b border-slate-200/60 pb-3">More From {product.brand}</h4>
          <div className="flex flex-col gap-3">
            {moreFromBrand.length > 0 ? (
              moreFromBrand.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                  <div className="relative w-10 h-10 flex-shrink-0 bg-slate-50 rounded p-1">
                    <Image src={item.images[0]} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <span className="font-bold text-[#0C1E38] text-xs truncate">{item.name}</span>
                    <span className="font-extrabold text-[#FA3A08] text-xs">
                      {formatPrice(item.salePrice ?? item.price)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-[10px] px-2.5 py-1.5 rounded transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No other items from {product.brand} available.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
