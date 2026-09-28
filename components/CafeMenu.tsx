'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCoffee } from '@/lib/context';
import { MenuItem } from '@/lib/types';
import { Coffee, Flame, CupSoda, CakeSlice, Sparkles } from 'lucide-react';

export function CafeMenu() {
  const { menuItems } = useCoffee();
  const [activeCategory, setActiveCategory] = useState<'all' | 'espresso' | 'filter' | 'cold' | 'pastry'>('all');

  const categories = [
    { id: 'all', label: 'همه گزینه‌ها', icon: Sparkles },
    { id: 'espresso', label: 'اسپرسو و نوشیدنی گرم', icon: Coffee },
    { id: 'filter', label: 'قهوه‌های دمی تخصصی', icon: Flame },
    { id: 'cold', label: 'بار سرد و کلدبرو', icon: CupSoda },
    { id: 'pastry', label: 'بیکری و کیک تازه روز', icon: CakeSlice },
  ] as const;

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="menu" className="py-12 md:py-16 bg-white border-t border-[#593E2B]/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with Visual Showcase */}
        <div className="relative rounded-3xl overflow-hidden mb-12 border border-[#593E2B]/20 bg-[#2C1810] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-center text-right z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-200/90 mb-2">
                <Coffee className="w-4 h-4" />
                <span>بار قهوه و بیکری باریستا</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-50 leading-tight">
                منوی حضوری کافه موکا
              </h2>
              <p className="mt-3 text-stone-300 text-sm leading-relaxed max-w-xl">
                تمام نوشیدنی‌های بار با شیر ارگانیک تازه، آب تصفیه شده تخصصی با TDS استاندارد و عصاره‌گیری بر پایه دانه‌های تک‌خاستگاه روز آماده می‌شوند. شیرینی‌ها هر روز ساعت ۸ صبح در آشپزخانه کافه پخته می‌شوند.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-amber-100/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>دستگاه اسپرسو سه گروپ Slayer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>آسیاب EK43 Mahlkönig</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>گزینه‌های گیاهی (شیر جو و بادام)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 lg:h-80 w-full">
              <Image
                src="/images/cup.jpg"
                alt="فلت وایت تازه دست ساز با لاته آرت و کروسان داغ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-transparent to-transparent lg:block hidden" />
            </div>

          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1 p-1.5 bg-stone-100 rounded-2xl border border-stone-200/70">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#2C1810] shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#593E2B]' : 'text-stone-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#593E2B]/15 hover:border-[#593E2B]/35 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#2C1810]">{item.name}</h4>
                      {item.isPopular && (
                        <span className="text-[10px] font-bold text-[#A06A42] bg-[#A06A42]/10 px-2 py-0.5 rounded-full">
                          محبوب مهمانان
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-sans text-stone-400 block mt-0.5">{item.englishName}</span>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-base font-black text-[#593E2B] font-mono tabular-nums">
                      {item.price.toLocaleString('fa-IR')}
                    </span>
                    <span className="text-[11px] text-stone-500 mr-1">تومان</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Volume / Ingredients info */}
              <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center justify-between text-[11px] text-stone-500">
                {item.volume && <span>حجم سرو: {item.volume}</span>}
                {item.ingredients && <span>ترکیبات: {item.ingredients}</span>}
                <span className="text-[#A06A42] font-medium mr-auto">آماده‌سازی تازه</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
