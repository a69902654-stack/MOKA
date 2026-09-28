'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { Star, MessageSquare, Plus, CheckCircle2, X, Sparkles } from 'lucide-react';

export function ReviewsSection() {
  const { reviews, addReview } = useCoffee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [productOrDrink, setProductOrDrink] = useState('اتیوپی یرگاچف گوتیتی');
  const [comment, setComment] = useState('');

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      alert('لطفاً نام و متن نظر خود را وارد فرمایید.');
      return;
    }

    addReview({
      authorName: authorName.trim(),
      rating,
      productOrDrink,
      comment: comment.trim()
    });

    setAuthorName('');
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <section id="reviews" className="py-12 md:py-16 bg-[#FAFAF8] border-t border-[#593E2B]/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#A06A42] mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>تجربه طعمی مهمانان و خریداران</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2C1810]">
              دیدگاه‌ها و نظرات خریداران
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              نظرات واقعی خریداران دانه‌های تخصصی و مهمانان حضوری کافه موکا
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Score summary */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono font-bold text-sm text-[#2C1810]">{averageRating} از ۵</span>
              <span className="text-xs text-stone-400">({reviews.length} نظر)</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>ثبت نظر شما</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-[#593E2B]/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                </div>

                {/* Comment text */}
                <p className="text-xs text-stone-700 leading-relaxed">
                  «{rev.comment}»
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#2C1810]">{rev.authorName}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5 truncate max-w-[140px]">{rev.productOrDrink}</div>
                </div>

                {rev.verifiedPurchase && (
                  <span className="text-[10px] text-[#593E2B] bg-[#593E2B]/10 px-2 py-0.5 rounded flex items-center gap-1 shrink-0 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[#593E2B]" />
                    <span>خریدار تایید شده</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#A06A42] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>اشتراک‌گذاری تجربه</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C1810]">ثبت نظر درباره قهوه یا کافه موکا</h3>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1.5">امتیاز شما:</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-stone-500 mr-2">{rating} از ۵ ستاره</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">نام شما:</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="مثال: آیدین سلیمی"
                    required
                    className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2 bg-white text-stone-800 focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">محصول یا خدمت بررسی شده:</label>
                  <select
                    value={productOrDrink}
                    onChange={(e) => setProductOrDrink(e.target.value)}
                    className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2 bg-white text-stone-800 focus:outline-hidden focus:border-[#593E2B]"
                  >
                    <option value="اتیوپی یرگاچف گوتیتی">اتیوپی یرگاچف گوتیتی</option>
                    <option value="کلمبیا سوپریمو هویلا">کلمبیا سوپریمو هویلا</option>
                    <option value="برزیل موجیانا فاین‌کاپ">برزیل موجیانا فاین‌کاپ</option>
                    <option value="گواتمالا آنتیگوا لوس ولکانس">گواتمالا آنتیگوا لوس ولکانس</option>
                    <option value="بلند اسپرسو دارک موکا">بلند اسپرسو دارک موکا</option>
                    <option value="فلت وایت و کروسان در کافه">فلت وایت و کروسان در کافه</option>
                    <option value="رزرو میز و سرویس‌دهی">رزرو میز و سرویس‌دهی</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">متن دیدگاه شما:</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="تجربه طعمی، عطر دانه، نحوه ارسال و نظرتان را بنویسید..."
                    required
                    className="w-full text-xs border border-stone-200 rounded-xl px-3 py-2 bg-white text-stone-800 focus:outline-hidden focus:border-[#593E2B]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-stone-200 text-stone-600 rounded-xl text-xs hover:bg-stone-50"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2C1810] text-white rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-all"
                  >
                    ثبت دیدگاه
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
