'use client';

import React from 'react';
import { Coffee, MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

export function Footer({ onNavigate }: { onNavigate: (sectionId: string) => void }) {
  return (
    <footer className="bg-[#2C1810] text-amber-50 pt-14 pb-10 border-t border-[#593E2B]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-700/60">
          
          {/* Brand & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#2C1810] flex items-center justify-center font-serif font-black text-xl">
                M
              </div>
              <div>
                <h3 className="text-lg font-black text-white">کافه و رُستری موکا</h3>
                <span className="text-[11px] text-amber-200/70 font-sans tracking-widest">MOKHA SPECIALTY COFFEE</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              موکا برآمده از شور و اشتیاق برای خلق فنجانی صادقانه است. ما دانه‌های سبز قهوه را از کشاورزان متعهد جهان خریداری کرده و با افتخار در کارگاه اختصاصی خود با دقیق‌ترین متدهای روز دنیا رُست می‌کنیم.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-200/80">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>عضو رسمی انجمن قهوه تخصصی (SCA)</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-amber-200 tracking-wider">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  فروشگاه دانه‌های قهوه
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition-colors">
                  منوی بار و نوشیدنی‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservation')} className="hover:text-white transition-colors">
                  رزرو آنلاین میز کافه
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-white transition-colors">
                  پیگیری لحظه‌ای سفارش
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors">
                  نظرات و امتیازات مشتریان
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-200 tracking-wider">ساعات کاری و پذیرایی</h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">شنبه تا پنج‌شنبه:</div>
                  <div className="text-[11px] text-stone-400">۸:۰۰ صبح الی ۲۳:۳۰ شب</div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">جمعه‌ها و روزهای تعطیل:</div>
                  <div className="text-[11px] text-stone-400">۹:۰۰ صبح الی ۲۴:۰۰ بامداد</div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-amber-200 tracking-wider">آدرس و تماس</h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">تهران، خیابان ولیعصر، بالاتر از ظفر، نبش کوچه یاسمن، پلاک ۱۴</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-white font-bold">۰۲۱ - ۸۸۹۹ ۰۰۱۱</span>
              </div>
              <div className="text-[11px] text-stone-400 pt-1">
                ارسال دانه‌های قهوه با پیک در تهران و پست پیشتاز به سراسر کشور
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی برای کافه و رُستری موکا محفوظ است.
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>طراحی با ظرافت و مینیمالیسم سفید و قهوه‌ای</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 mx-1" />
          </div>
        </div>

      </div>
    </footer>
  );
}
