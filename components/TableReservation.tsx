'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { Reservation } from '@/lib/types';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Coffee, 
  Send,
  Phone,
  User,
  Info
} from 'lucide-react';

const TIME_SLOTS = [
  '۱۰:۰۰ صبح',
  '۱۱:۳۰ پیش از ظهر',
  '۱۳:۰۰ ظهر',
  '۱۵:۰۰ بعد از ظهر',
  '۱۶:۳۰ عصر',
  '۱۸:۰۰ غروب',
  '۱۹:۳۰ شب',
  '۲۱:۰۰ شب'
];

const LOCATIONS: Array<{
  id: Reservation['tableLocation'];
  title: string;
  description: string;
}> = [
  { id: 'کنار پنجره', title: 'کنار پنجره قدی', description: 'نور طبیعی عالی و نمای خیابان ولیعصر' },
  { id: 'سالن اصلی', title: 'سالن اصلی دنج', description: 'موسیقی ملایم لوفای و مبلمان راحتی چرمی' },
  { id: 'تراس و فضای باز', title: 'تراس سرسبز', description: 'هوای آزاد، گل‌های طبیعی و گرمایش زمستانی' },
  { id: 'میز کاری دنج', title: 'میز کار و مطالعه', description: 'مجهز به پریز برق اختصاصی و اینترنت پرسرعت' }
];

export function TableReservation() {
  const { createReservation } = useCoffee();

  const [dateOption, setDateOption] = useState('امروز');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[4]);
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedLocation, setSelectedLocation] = useState<Reservation['tableLocation']>('کنار پنجره');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    const res = createReservation({
      customerName: name.trim(),
      phone: phone.trim(),
      guestsCount,
      date: dateOption,
      time: selectedTime,
      tableLocation: selectedLocation,
      notes: notes.trim()
    });

    setConfirmedReservation(res);
  };

  return (
    <section id="reservation" className="py-12 md:py-16 bg-[#FBF9F5] border-t border-[#593E2B]/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A06A42] bg-[#A06A42]/10 px-3 py-1 rounded-full mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>میزبانی و قرار ملاقات در کافه موکا</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2C1810]">
            رزرو آنلاین میز و انتخاب زمان مراجعه
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            بدون معطلی و در کمتر از یک دقیقه، میز محبوب خود را برای دورهمی دوستانه، جلسات کاری یا لحظاتی آرام رزرو نمایید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Form (Right column in RTL) */}
          <div className="lg:col-span-7 bg-white border border-[#593E2B]/15 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {confirmedReservation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#2C1810]">رزرو شما با موفقیت ثبت گردید!</h3>
                <p className="text-xs text-stone-500 mt-1">
                  میز شما آماده خواهد بود. پیامک تایید نیز به شماره تماس شما ارسال شد.
                </p>

                {/* Receipt Card */}
                <div className="mt-6 bg-[#FAF9F5] border border-[#593E2B]/15 rounded-2xl p-5 text-right space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-xs text-stone-500">کد رزرو اختصاصی:</span>
                    <span className="text-base font-black font-mono text-[#593E2B] tracking-wider">{confirmedReservation.code}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">مهمان گرامی:</span>
                    <span className="font-semibold text-stone-800">{confirmedReservation.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">تاریخ و ساعت مراجعه:</span>
                    <span className="font-semibold text-stone-800">{confirmedReservation.date} · ساعت {confirmedReservation.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">تعداد نفرات و موقعیت:</span>
                    <span className="font-semibold text-stone-800">{confirmedReservation.guestsCount} نفر · {confirmedReservation.tableLocation}</span>
                  </div>
                </div>

                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="mt-6 px-6 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors"
                >
                  ثبت رزرو جدید
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Date selection */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#593E2B]" />
                    <span>۱. انتخاب روز مراجعه:</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['امروز', 'فردا', 'پس‌فردا', 'آخر هفته'].map(date => (
                      <button
                        type="button"
                        key={date}
                        onClick={() => setDateOption(date)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          dateOption === date
                            ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-xs'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Time selection */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#593E2B]" />
                    <span>۲. انتخاب ساعت مراجعه:</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                          selectedTime === slot
                            ? 'bg-[#593E2B] text-white border-[#593E2B] shadow-xs'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Number of guests */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#593E2B]" />
                    <span>۳. تعداد نفرات:</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 8].map(count => (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setGuestsCount(count)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                          guestsCount === count
                            ? 'bg-[#2C1810] text-white border-[#2C1810]'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {count} نفر
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Table Atmosphere / Location */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#593E2B]" />
                    <span>۴. موقعیت و فضای میز مورد علاقه:</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {LOCATIONS.map(loc => (
                      <button
                        type="button"
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                          selectedLocation === loc.id
                            ? 'bg-[#FAF6F0] border-[#593E2B] text-[#2C1810]'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div className="font-bold text-xs">{loc.title}</div>
                        <div className="text-[11px] text-stone-500 mt-1">{loc.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">نام و نام خانوادگی:</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="مثال: سهراب سپهری"
                        required
                        className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2.5 bg-white text-stone-800 focus:outline-hidden focus:border-[#593E2B]"
                      />
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">شماره تماس همراه:</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="۰۹۱۲XXXXXXX"
                        required
                        className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2.5 bg-white text-stone-800 font-mono focus:outline-hidden focus:border-[#593E2B]"
                      />
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">توضیحات اختیاری یا مناسبت:</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: سالگرد، تولد، نیازمند صندلی کودک..."
                    className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2 bg-white text-stone-800 focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-xl text-sm font-bold shadow-md shadow-[#2C1810]/15 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Send className="w-4 h-4 text-amber-200" />
                  <span>ثبت قطعی و رایگان رزرو میز</span>
                </button>
              </form>
            )}

          </div>

          {/* Ambience & Visual Showcase (Left column in RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#593E2B]/20 bg-stone-100 shadow-md aspect-4/3">
              <Image
                src="/images/cafe.jpg"
                alt="فضای داخلی مینیمال و نورگیر کافه موکا"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-[10px] font-bold bg-[#A06A42] px-2 py-0.5 rounded text-white inline-block mb-1">
                  معماری و دکوراسیون
                </span>
                <h4 className="text-base font-bold">طراحی اسکاندیناوی با چوب گردو و نور طبیعی</h4>
                <p className="text-xs text-stone-200 mt-1">محیطی عاری از هیاهو، مناسب تمرکز و گفتگوهای دلنشین</p>
              </div>
            </div>

            <div className="bg-white border border-[#593E2B]/15 rounded-2xl p-5 shadow-xs space-y-3">
              <h5 className="font-bold text-xs text-[#2C1810] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#593E2B]" />
                <span>قوانین و شرایط پذیرایی:</span>
              </h5>
              <ul className="text-xs text-stone-600 space-y-1.5 leading-relaxed list-disc pr-4">
                <li>میز رزرو شده تا ۱۵ دقیقه پس از زمان تعیین‌شده برای شما محفوظ خواهد ماند.</li>
                <li>استفاده از اینترنت وای‌فای پرسرعت اختصاصی برای تمامی مهمانان رایگان است.</li>
                <li>کافه مجهز به فضای باز دارای گرماتاب برای روزهای خنک می‌باشد.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
