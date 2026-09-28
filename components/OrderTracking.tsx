'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { Order, OrderStatus } from '@/lib/types';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Flame, 
  CreditCard, 
  MapPin, 
  Clock, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';

const STATUS_STEPS: Array<{
  status: OrderStatus;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { status: 'پرداخت شده', title: 'تایید پرداخت و ثبت', desc: 'تراکنش بانکی موفق و صدور فاکتور', icon: CreditCard },
  { status: 'در حال رُست و بسته‌بندی', title: 'برشته‌کاری و بسته‌بندی', desc: 'رُست تازه و بسته‌بندی سوپاپ‌دار', icon: Flame },
  { status: 'تحویل به سفیر و ارسال', title: 'تحویل به سفیر و ارسال', desc: 'سفیر در مسیر تحویل به آدرس', icon: Truck },
  { status: 'تحویل داده شده', title: 'تحویل نهایی به خریدار', desc: 'سفارش با موفقیت تحویل گردید', icon: CheckCircle }
];

export function OrderTracking() {
  const { orders } = useCoffee();
  const [searchInput, setSearchInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    if (!clean) return;

    setSearched(true);
    const found = orders.find(
      o => o.trackingCode.toUpperCase() === clean || o.phone.includes(clean)
    );

    if (found) {
      setSelectedOrder(found);
      setNotFound(false);
    } else {
      setSelectedOrder(null);
      setNotFound(true);
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'پرداخت شده': return 0;
      case 'در حال رُست و بسته‌بندی': return 1;
      case 'تحویل به سفیر و ارسال': return 2;
      case 'تحویل داده شده': return 3;
      case 'لغو شده': return -1;
      default: return 0;
    }
  };

  return (
    <section id="tracking" className="py-12 md:py-16 bg-white border-t border-[#593E2B]/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A06A42] bg-[#A06A42]/10 px-3 py-1 rounded-full mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>رهگیری لحظه‌ای و هوشمند مرسولات</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2C1810]">
            پیگیری آنلاین وضعیت سفارش قهوه
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            کد رهگیری پیامک‌شده (مانند MKH-74921) یا شماره موبایل ثبت‌شده در هنگام خرید را وارد کنید تا وضعیت پردازش و موقعیت بسته را به صورت زنده مشاهده فرمایید.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setNotFound(false);
                }}
                placeholder="کد پیگیری سفارش (مثال: MKH-74921) یا شماره همراه..."
                className="w-full text-xs sm:text-sm border border-stone-200 rounded-2xl px-4 py-3 bg-stone-50 text-stone-800 font-mono focus:outline-hidden focus:border-[#593E2B] focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              استعلام وضعیت
            </button>
          </form>

          {/* Quick suggestions for convenience */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-stone-500">
            <span>سفارش‌های نمونه آماده تست:</span>
            {orders.slice(0, 3).map(ord => (
              <button
                key={ord.id}
                onClick={() => {
                  setSearchInput(ord.trackingCode);
                  setSelectedOrder(ord);
                  setNotFound(false);
                  setSearched(true);
                }}
                className="font-mono text-[#593E2B] bg-[#593E2B]/10 hover:bg-[#593E2B]/20 px-2 py-0.5 rounded transition-colors"
              >
                {ord.trackingCode}
              </button>
            ))}
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>سفارشی با این مشخصات یافت نشد. لطفاً کد رهگیری را مجدداً بررسی فرمایید.</span>
          </div>
        )}

        {/* Order Details Display */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-[#FAF9F5] border border-[#593E2B]/20 rounded-3xl p-6 sm:p-8 shadow-sm"
          >
            {/* Top Bar of Order */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-stone-500">کد رهگیری:</span>
                  <span className="text-lg font-black font-mono text-[#2C1810] tracking-wider">{selectedOrder.trackingCode}</span>
                  <span className="text-[11px] font-bold bg-[#593E2B] text-white px-2.5 py-0.5 rounded-full">
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-xs text-stone-400 mt-1 flex items-center gap-2">
                  <span>ثبت سفارش: {selectedOrder.createdAt}</span>
                  <span>·</span>
                  <span>کد ارجاع پرداخت: {selectedOrder.paymentRefId}</span>
                </div>
              </div>

              <div className="text-right sm:text-left">
                <span className="text-xs text-stone-500 block">زمان تخمینی تحویل:</span>
                <span className="text-xs font-bold text-[#593E2B] flex items-center sm:justify-end gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="my-8">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {STATUS_STEPS.map((step, idx) => {
                  const currentIdx = getStepIndex(selectedOrder.status);
                  const isDone = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;
                  const IconC = step.icon;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-[#2C1810] text-amber-200 ring-4 ring-[#2C1810]/15 shadow-md'
                            : isDone
                            ? 'bg-[#593E2B] text-white'
                            : 'bg-white border border-stone-200 text-stone-300'
                        }`}
                      >
                        <IconC className="w-5 h-5" />
                      </div>

                      <div className="mt-2.5 font-bold text-xs text-[#2C1810]">{step.title}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5 hidden sm:block max-w-[130px]">{step.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Recipient Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
              {/* Items List */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80">
                <h4 className="font-bold text-xs text-[#2C1810] mb-3 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#593E2B]" />
                  <span>اقلام سفارش داده شده ({selectedOrder.items.length} قلم):</span>
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-stone-100 last:border-0 last:pb-0">
                      <div>
                        <div className="font-semibold text-stone-800">{item.product.name}</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          وزن: {item.selectedWeight} گرم · {item.selectedGrind}
                        </div>
                      </div>
                      <div className="text-left font-mono">
                        <div className="font-bold text-stone-900">
                          {(item.unitPrice * item.quantity).toLocaleString('fa-IR')} تومان
                        </div>
                        <div className="text-[10px] text-stone-400">{item.quantity} عدد</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#2C1810]">
                  <span>مبلغ پرداختی:</span>
                  <span className="font-mono text-sm text-[#593E2B]">
                    {selectedOrder.total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#2C1810] mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#593E2B]" />
                    <span>مشخصات تحویل‌گیرنده:</span>
                  </h4>

                  <div className="space-y-2 text-xs text-stone-700">
                    <div>
                      <span className="text-stone-400">نام تحویل‌گیرنده:</span>
                      <span className="font-semibold mr-1.5">{selectedOrder.customerName}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">شماره تماس:</span>
                      <span className="font-mono mr-1.5">{selectedOrder.phone}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">آدرس تحویل:</span>
                      <p className="font-medium text-stone-800 mt-1 leading-relaxed">{selectedOrder.address}</p>
                    </div>
                    <div>
                      <span className="text-stone-400">کد پستی:</span>
                      <span className="font-mono mr-1.5">{selectedOrder.postalCode}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-700 flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>بسته‌بندی اختصاصی ضدضربه و عایق رطوبت</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
}
