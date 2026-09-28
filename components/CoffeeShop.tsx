'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { Product, GrindOption } from '@/lib/types';
import { 
  ShoppingBag, 
  Check, 
  Info, 
  Sparkles, 
  Layers, 
  Coffee, 
  X,
  Droplets,
  Mountain
} from 'lucide-react';

const GRIND_OPTIONS: GrindOption[] = [
  'دانه کامل (آسیاب‌نشده)',
  'آسیاب اسپرسو',
  'آسیاب دمی / V60',
  'آسیاب فرنچ‌پرس',
  'آسیاب موکاپات'
];

export function CoffeeShop() {
  const { products, addToCart } = useCoffee();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'single-origin' | 'blend'>('all');
  const [roastFilter, setRoastFilter] = useState<'all' | 'لایت' | 'مدیوم' | 'دارک'>('all');
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  // Per-product state for weight and grind
  const [productSelections, setProductSelections] = useState<{
    [productId: string]: {
      weight: 250 | 500 | 1000;
      grind: GrindOption;
      quantity: number;
    };
  }>({});

  const getProductSelection = (productId: string) => {
    return productSelections[productId] || {
      weight: 250,
      grind: 'دانه کامل (آسیاب‌نشده)',
      quantity: 1
    };
  };

  const updateProductSelection = (
    productId: string, 
    updates: Partial<{ weight: 250 | 500 | 1000; grind: GrindOption; quantity: number }>
  ) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...getProductSelection(productId),
        ...updates
      }
    }));
  };

  const calculatePrice = (basePrice: number, weight: 250 | 500 | 1000) => {
    if (weight === 250) return basePrice;
    if (weight === 500) return Math.round(basePrice * 1.95);
    return Math.round(basePrice * 3.7);
  };

  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (roastFilter !== 'all' && p.roastLevel !== roastFilter) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    const sel = getProductSelection(product.id);
    const unitPrice = calculatePrice(product.pricePer250g, sel.weight);
    
    addToCart({
      product,
      quantity: sel.quantity,
      selectedWeight: sel.weight,
      selectedGrind: sel.grind,
      unitPrice
    });
  };

  return (
    <section id="shop" className="py-12 md:py-16 bg-[#FAFAF8] border-t border-[#593E2B]/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#A06A42] tracking-wider mb-2">
              <Coffee className="w-4 h-4" />
              <span>فروشگاه دانه‌های تخصصی تازه رُست</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2C1810]">
              مجموعه دانه‌های برشته‌کاری موکا
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              هر دانه با شناسنامه شفاف مزرعه، روش فرآوری و میزان اسیدیته برای تجربه فنجانی بی‌نقص
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-white border border-stone-200 rounded-xl shadow-xs">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  categoryFilter === 'all'
                    ? 'bg-[#2C1810] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                همه دانه‌ها
              </button>
              <button
                onClick={() => setCategoryFilter('single-origin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  categoryFilter === 'single-origin'
                    ? 'bg-[#2C1810] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                تک‌خاستگاه
              </button>
              <button
                onClick={() => setCategoryFilter('blend')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  categoryFilter === 'blend'
                    ? 'bg-[#2C1810] text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                بلندهای تخصصی
              </button>
            </div>

            {/* Roast Level Filter */}
            <div className="flex items-center p-1 bg-white border border-stone-200 rounded-xl shadow-xs">
              <span className="text-[11px] text-stone-400 px-2 font-medium">رُست:</span>
              {(['all', 'لایت', 'مدیوم', 'دارک'] as const).map(roast => (
                <button
                  key={roast}
                  onClick={() => setRoastFilter(roast)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                    roastFilter === roast
                      ? 'bg-[#593E2B] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {roast === 'all' ? 'همه' : roast}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const sel = getProductSelection(product.id);
            const currentPrice = calculatePrice(product.pricePer250g, sel.weight);
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="bg-white border border-[#593E2B]/15 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Card Top: Image & Badge */}
                <div>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60 mb-4 group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-[#2C1810]/90 text-amber-100 text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        {product.badge}
                      </div>
                    )}

                    {/* Stock Alert */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono px-2 py-0.5 rounded bg-white/90 text-stone-700 backdrop-blur-xs border border-stone-200">
                      {isOutOfStock ? (
                        <span className="text-rose-600 font-bold">ناموجود</span>
                      ) : (
                        <span>موجودی: {product.stock} بسته</span>
                      )}
                    </div>
                  </div>

                  {/* Title & Origin */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-[#2C1810]">{product.name}</h3>
                      <p className="text-xs text-stone-400 font-sans tracking-wide mt-0.5">{product.englishName}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProductDetails(product)}
                      className="p-1.5 text-stone-400 hover:text-[#593E2B] hover:bg-[#593E2B]/5 rounded-lg transition-colors"
                      title="اطلاعات شناسنامه قهوه"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Unboxed Metadata (Section 1A discipline) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mt-2.5">
                    <span>{product.origin}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>رُست {product.roastLevel}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>{product.process}</span>
                  </div>

                  {/* Flavor Notes */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-[#593E2B] bg-[#593E2B]/8 px-2 py-0.5 rounded-md"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Weight Selector */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="text-[11px] text-stone-500 mb-1.5">انتخاب وزن بسته:</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {([250, 500, 1000] as const).map(w => (
                        <button
                          key={w}
                          onClick={() => updateProductSelection(product.id, { weight: w })}
                          className={`py-1 text-xs font-semibold rounded-lg border transition-all ${
                            sel.weight === w
                              ? 'border-[#2C1810] bg-[#2C1810] text-white shadow-xs'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          {w === 1000 ? '۱ کیلوگرم' : `${w} گرم`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grind Selector */}
                  <div className="mt-3">
                    <label className="text-[11px] text-stone-500 mb-1.5 block">نوع آسیاب:</label>
                    <select
                      value={sel.grind}
                      onChange={(e) => updateProductSelection(product.id, { grind: e.target.value as GrindOption })}
                      className="w-full text-xs font-medium border border-stone-200 rounded-lg px-2.5 py-1.5 bg-white text-stone-700 focus:outline-hidden focus:border-[#593E2B]"
                    >
                      {GRIND_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bottom Pricing & Add to Cart */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-stone-400">قیمت نهایی:</div>
                    <div className="text-base font-black text-[#2C1810] font-mono tabular-nums">
                      {currentPrice.toLocaleString('fa-IR')} <span className="text-xs font-normal text-stone-500">تومان</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isOutOfStock}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95 ${
                      isOutOfStock
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#2C1810] hover:bg-[#3D2317] text-white shadow-[#2C1810]/10'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isOutOfStock ? 'اتمام موجودی' : 'افزودن به سبد'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProductDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#A06A42] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>شناسنامه و مشخصات تخصصی دان</span>
              </div>

              <h3 className="text-xl font-black text-[#2C1810]">{selectedProductDetails.name}</h3>
              <p className="text-xs font-sans text-stone-400">{selectedProductDetails.englishName}</p>

              <p className="text-sm text-stone-600 mt-4 leading-relaxed bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#593E2B]/10">
                {selectedProductDetails.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Mountain className="w-3.5 h-3.5" />
                    <span>خاستگاه و ارتفاع:</span>
                  </div>
                  <div className="font-semibold text-stone-800">{selectedProductDetails.origin}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{selectedProductDetails.altitude}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>روش فرآوری و رُست:</span>
                  </div>
                  <div className="font-semibold text-stone-800">{selectedProductDetails.process}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">درجه برشته‌کاری: {selectedProductDetails.roastLevel}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-bold text-stone-700 mb-2">طعم‌یادهای حسی (Cupping Notes):</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProductDetails.flavorNotes.map((note, i) => (
                    <span key={i} className="text-xs bg-[#593E2B]/10 text-[#593E2B] font-semibold px-3 py-1 rounded-lg">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedProductDetails(null)}
                  className="px-5 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors"
                >
                  متوجه شدم
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
