'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Coffee, Calendar, ShieldCheck, Flame, Truck, Award } from 'lucide-react';

interface HeroProps {
  onExploreShop: () => void;
  onExploreReservation: () => void;
}

export function Hero({ onExploreShop, onExploreReservation }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content (Right column in RTL) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-right">
            
            <div className="inline-flex items-center gap-2 self-start bg-[#FAF6F0] border border-[#593E2B]/15 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#593E2B] mb-5">
              <Flame className="w-3.5 h-3.5 text-[#A06A42]" />
              <span>برشته‌کاری هفتگی دانه‌های ارگانیک با نمره کیفی +۸۴</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#2C1810] leading-tight md:leading-[1.25] tracking-tight">
              هنر برشته‌کاری قهوه تخصصی <br className="hidden sm:inline" />
              <span className="text-[#6F4E37] relative inline-block">
                و مهمان‌نوازی در کافه موکا
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              از ارتفاعات رویایی یرگاچف اتیوپی تا خاک‌های آتشفشانی کلمبیا و گواتمالا؛ دانه‌های دست‌چین شده با بالاترین استانداردهای انجمن قهوه تخصصی (SCA)، رُست دقیق و ارسال سریع به درب منزل شما.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreShop}
                className="px-6 py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#3D2317] text-white font-semibold text-sm transition-all shadow-md shadow-[#2C1810]/15 flex items-center gap-2 active:scale-95"
              >
                <Coffee className="w-4 h-4 text-amber-200" />
                <span>خرید دانه‌های تازه رُست</span>
              </button>

              <button
                onClick={onExploreReservation}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-[#593E2B]/25 text-[#2C1810] font-semibold text-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#593E2B]" />
                <span>رزرو آنلاین میز کافه</span>
              </button>
            </div>

            {/* Quick Proof Points */}
            <div className="mt-10 pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-3 sm:gap-6 text-stone-700">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810]">
                  <Truck className="w-4 h-4 text-[#593E2B] shrink-0" />
                  <span>ارسال فوق‌سریع</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">رایگان برای خرید بالای ۷۰۰ هزار</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810]">
                  <Flame className="w-4 h-4 text-[#593E2B] shrink-0" />
                  <span>تازگی تضمینی</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">رُست کمتر از ۷ روز</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2C1810]">
                  <Award className="w-4 h-4 text-[#593E2B] shrink-0" />
                  <span>درگاه امن بانکی</span>
                </div>
                <span className="text-[11px] text-stone-500 mt-0.5">تسویه شاپرک و پیگیری زنده</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Banner (Left column in RTL) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden border border-[#593E2B]/20 bg-stone-100 shadow-xl shadow-[#2C1810]/10 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group"
            >
              <Image
                src="/images/hero.jpg"
                alt="عصاره‌گیری دستی و دانه‌های قهوه تخصصی موکا"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent" />
              
              {/* Floating Bottom Card on Image */}
              <div className="absolute bottom-4 right-4 left-4 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg flex items-center justify-between text-right">
                <div>
                  <div className="text-xs font-bold text-[#2C1810]">کارگاه عصاره‌گیری و بار باریستا</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">تهران، خیابان ولیعصر، نبش کوچه یاسمن</div>
                </div>
                <div className="text-[11px] font-bold text-[#593E2B] bg-[#593E2B]/10 px-2.5 py-1 rounded-lg">
                  پذیرایی حضوری
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
