'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCoffee } from '@/lib/context';
import { OrderStatus, Reservation } from '@/lib/types';
import { 
  Package, 
  SlidersHorizontal, 
  X, 
  ShoppingBag, 
  CalendarClock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Minus,
  Edit2,
  Check,
  Send,
  Coffee,
  RotateCcw
} from 'lucide-react';

export function AdminPanel() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    orders, 
    reservations, 
    updateProductStock, 
    updateProductPrice,
    updateOrderStatus,
    updateReservationStatus 
  } = useCoffee();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'reservations' | 'stats'>('inventory');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  if (!isAdminOpen) return null;

  // Stats calculation
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalActiveReservations = reservations.filter(r => r.status === 'تایید شده' || r.status === 'در انتظار').length;
  const lowStockCount = products.filter(p => p.stock < 15).length;

  const handleSavePrice = (productId: string) => {
    if (tempPrice > 0) {
      updateProductPrice(productId, tempPrice);
    }
    setEditingPriceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C1810] text-amber-200 flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#2C1810] text-base">پنل مدیریت یکپارچه کافه و رُستری موکا</h3>
                <span className="text-[10px] font-bold bg-[#593E2B]/10 text-[#593E2B] px-2 py-0.5 rounded-full">
                  ادمین فروشگاه
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                کنترل زنده موجودی انبار، تغییر وضعیت سفارشات و تایید رزروهای میز
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs & Metrics Banner */}
        <div className="px-5 py-3 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'inventory' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>کنترل موجودی انبار ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>مدیریت سفارشات ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'reservations' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>رزروهای میز ({reservations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'stats' ? 'bg-[#2C1810] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>گزارشات و فروش</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500">فروش ثبت شده:</span>
            <span className="font-mono font-bold text-[#593E2B] bg-[#593E2B]/10 px-2.5 py-1 rounded-lg">
              {totalSales.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#FAF9F5]">
          
          {/* TAB 1: INVENTORY CONTROL */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl text-xs text-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    تغییر موجودی در این بخش، مستقیماً امکان خرید آنلاین مشتریان را کنترل می‌کند. به محض صفر شدن موجودی، دکمه خرید محصول غیرفعال می‌گردد.
                  </span>
                </div>
                {lowStockCount > 0 && (
                  <span className="font-bold text-amber-800 text-[11px] bg-amber-200/70 px-2.5 py-0.5 rounded-full shrink-0">
                    {lowStockCount} قلم کم‌موجود
                  </span>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                      <tr>
                        <th className="p-3.5">نام محصول</th>
                        <th className="p-3.5">خاستگاه و رُست</th>
                        <th className="p-3.5">قیمت (هر ۲۵۰ گرم)</th>
                        <th className="p-3.5 text-center">موجودی انبار</th>
                        <th className="p-3.5 text-center">عملیات سریع انبارداری</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-[#2C1810]">{prod.name}</div>
                            <div className="text-[10px] text-stone-400 font-sans">{prod.englishName}</div>
                          </td>

                          <td className="p-3.5 text-stone-600">
                            <div>{prod.origin}</div>
                            <div className="text-[11px] text-[#A06A42]">رُست {prod.roastLevel}</div>
                          </td>

                          <td className="p-3.5 font-mono">
                            {editingPriceId === prod.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-24 border border-stone-300 rounded px-2 py-1 text-xs"
                                />
                                <button
                                  onClick={() => handleSavePrice(prod.id)}
                                  className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-stone-900">
                                  {prod.pricePer250g.toLocaleString('fa-IR')} تومان
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingPriceId(prod.id);
                                    setTempPrice(prod.pricePer250g);
                                  }}
                                  className="text-stone-400 hover:text-stone-700 p-1"
                                  title="ویرایش قیمت"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 text-center">
                            <span
                              className={`font-mono font-bold px-2.5 py-1 rounded-full text-xs ${
                                prod.stock <= 0
                                  ? 'bg-rose-100 text-rose-700'
                                  : prod.stock < 15
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {prod.stock <= 0 ? 'ناموجود (۰)' : `${prod.stock} بسته`}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => updateProductStock(prod.id, Math.max(0, prod.stock - 1))}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
                                title="کاهش یک عدد"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateProductStock(prod.id, prod.stock + 1)}
                                className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
                                title="افزایش یک عدد"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateProductStock(prod.id, prod.stock + 10)}
                                className="px-2 py-1 rounded-lg bg-[#593E2B]/10 text-[#593E2B] font-semibold text-[11px] hover:bg-[#593E2B]/20"
                                title="شارژ ۱۰ بسته جدید"
                              >
                                +۱۰ بسته
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-xs text-stone-700">
                💡 <b>ارسال اعلان زنده:</b> با تغییر وضعیت هر سفارش، بلافاصله اعلان لحظه‌ای برای خریدار ارسال شده و مراحل رهگیری در بخش پیگیری سفارشات بروز خواهد شد.
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm text-[#2C1810] tracking-wider">
                          {ord.trackingCode}
                        </span>
                        <span className="text-xs text-stone-400">·</span>
                        <span className="font-bold text-xs text-stone-800">{ord.customerName}</span>
                        <span className="font-mono text-xs text-stone-500">({ord.phone})</span>
                      </div>

                      <div className="text-xs text-stone-600">
                        {ord.items.map((it, idx) => (
                          <span key={idx} className="inline-block ml-3">
                            {it.product.name} ({it.selectedWeight} گرم × {it.quantity})
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-stone-400">
                        آدرس: {ord.address} · کد پستی: {ord.postalCode}
                      </div>

                      <div className="text-xs font-mono font-bold text-[#593E2B]">
                        مبلغ کل: {ord.total.toLocaleString('fa-IR')} تومان ({ord.createdAt})
                      </div>
                    </div>

                    {/* Status Changer Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                      <div className="text-xs text-stone-500">وضعیت فعلی:</div>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold border border-stone-300 rounded-xl px-3 py-2 bg-[#FAF9F5] text-[#2C1810] focus:outline-hidden focus:border-[#593E2B]"
                      >
                        <option value="پرداخت شده">پرداخت شده</option>
                        <option value="در حال رُست و بسته‌بندی">در حال رُست و بسته‌بندی</option>
                        <option value="تحویل به سفیر و ارسال">تحویل به سفیر و ارسال</option>
                        <option value="تحویل داده شده">تحویل داده شده</option>
                        <option value="لغو شده">لغو شده</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RESERVATIONS MANAGEMENT */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#593E2B]">{res.code}</span>
                          <span className="font-bold text-xs text-stone-800">{res.customerName}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            res.status === 'تایید شده'
                              ? 'bg-emerald-100 text-emerald-800'
                              : res.status === 'در انتظار'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {res.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                        <div>
                          <span className="text-stone-400">زمان مراجعه:</span> {res.date} · ساعت {res.time}
                        </div>
                        <div>
                          <span className="text-stone-400">تعداد مهمانان:</span> {res.guestsCount} نفر · موقعیت: {res.tableLocation}
                        </div>
                        <div>
                          <span className="text-stone-400">شماره تماس:</span> <span className="font-mono">{res.phone}</span>
                        </div>
                        {res.notes && (
                          <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-lg mt-2">
                            یادداشت مشتری: {res.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                      {res.status !== 'تایید شده' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'تایید شده')}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                        >
                          تایید رزرو
                        </button>
                      )}
                      {res.status !== 'به پایان رسیده' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'به پایان رسیده')}
                          className="px-3 py-1.5 border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg text-xs"
                        >
                          ثبت اتمام
                        </button>
                      )}
                      {res.status !== 'لغو شده' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'لغو شده')}
                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs"
                        >
                          لغو
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STATS & OVERVIEW */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-xs text-stone-500">فروش کل آنلاین</div>
                  <div className="font-mono font-black text-xl text-[#2C1810] mt-1">
                    {totalSales.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-xs text-stone-500">تعداد سفارشات موفق</div>
                  <div className="font-mono font-black text-xl text-[#593E2B] mt-1">
                    {totalOrdersCount} <span className="text-xs font-normal">سفارش</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-xs text-stone-500">رزروهای فعال کافه</div>
                  <div className="font-mono font-black text-xl text-[#A06A42] mt-1">
                    {totalActiveReservations} <span className="text-xs font-normal">میز</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-xs text-stone-500">تنوع محصولات قهوه</div>
                  <div className="font-mono font-black text-xl text-stone-700 mt-1">
                    {products.length} <span className="text-xs font-normal">پروفایل</span>
                  </div>
                </div>
              </div>

              {/* Coffee roastery info */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <h4 className="font-bold text-sm text-[#2C1810] mb-3">وضعیت تولید و رستری کافه موکا:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold block text-stone-800">دستگاه رُست:</span>
                    <span>Giesen W6A Specialty Coffee Roaster</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold block text-stone-800">برنامه برشته‌کاری:</span>
                    <span>شنبه‌ها و سه‌شنبه‌ها ساعت ۷ صبح</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl">
                    <span className="font-bold block text-stone-800">کنترل کیفیت دی‌گس:</span>
                    <span>حداقل ۳ روز استراحت دانه‌ها قبل از عصاره‌گیری</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex justify-end">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-6 py-2.5 bg-[#2C1810] hover:bg-[#3D2317] text-white rounded-xl text-xs font-bold transition-all"
          >
            خروج از پنل مدیریت
          </button>
        </div>

      </motion.div>
    </div>
  );
}
