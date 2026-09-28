'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  MenuItem, 
  CartItem, 
  Order, 
  Reservation, 
  Review, 
  AppNotification, 
  OrderStatus 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_MENU_ITEMS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS, 
  INITIAL_RESERVATIONS, 
  INITIAL_NOTIFICATIONS 
} from './initial-data';
import { playNotificationSound, playSuccessSound } from './sound';

interface CoffeeContextType {
  products: Product[];
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  reservations: Reservation[];
  reviews: Review[];
  notifications: AppNotification[];
  activeToast: AppNotification | null;
  isCartOpen: boolean;
  isPaymentOpen: boolean;
  isAdminOpen: boolean;
  activeSection: string;
  
  // Actions
  setActiveSection: (sec: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsPaymentOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  dismissToast: () => void;
  
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  
  createOrder: (orderInfo: {
    customerName: string;
    phone: string;
    address: string;
    postalCode: string;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  
  createReservation: (resInfo: {
    customerName: string;
    phone: string;
    guestsCount: number;
    date: string;
    time: string;
    tableLocation: Reservation['tableLocation'];
    notes?: string;
  }) => Reservation;
  updateReservationStatus: (resId: string, status: Reservation['status']) => void;
  
  addReview: (reviewInfo: {
    authorName: string;
    rating: number;
    productOrDrink: string;
    comment: string;
  }) => void;
  
  updateProductStock: (productId: string, stock: number) => void;
  updateProductPrice: (productId: string, price: number) => void;
  
  markAllNotificationsAsRead: () => void;
  markNotificationAsRead: (id: string) => void;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export function CoffeeProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Trigger toast with sound
  const pushNotification = (title: string, message: string, type: AppNotification['type'], relatedId?: string) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      message,
      timestamp: 'هم‌اکنون',
      type,
      read: false,
      relatedId
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    playNotificationSound();

    // Auto dismiss toast after 5s
    setTimeout(() => {
      setActiveToast(current => (current?.id === newNotif.id ? null : current));
    }, 5500);
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === newItem.product.id && 
                item.selectedWeight === newItem.selectedWeight && 
                item.selectedGrind === newItem.selectedGrind
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });

    pushNotification(
      'افزودن به سبد خرید ☕',
      `${newItem.quantity} بسته ${newItem.product.name} (${newItem.selectedWeight} گرم) به سبد اضافه شد.`,
      'info'
    );
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], quantity };
      return copy;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderInfo: {
    customerName: string;
    phone: string;
    address: string;
    postalCode: string;
  }): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const deliveryFee = subtotal >= 700000 ? 0 : 45000;
    const total = subtotal + deliveryFee;
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `MKH-${randomCode}`;
    const paymentRefId = `SHP-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      trackingCode,
      customerName: orderInfo.customerName,
      phone: orderInfo.phone,
      address: orderInfo.address,
      postalCode: orderInfo.postalCode,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: 'پرداخت شده',
      createdAt: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) + ' - امروز',
      estimatedDelivery: 'فردا بین ساعت ۱۲ تا ۱۷',
      paymentRefId
    };

    // Deduct stock
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartMatches = cart.filter(ci => ci.product.id === p.id);
        if (cartMatches.length === 0) return p;
        const totalPacks = cartMatches.reduce((s, ci) => s + ci.quantity, 0);
        return {
          ...p,
          stock: Math.max(0, p.stock - totalPacks)
        };
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    playSuccessSound();

    pushNotification(
      'پرداخت و ثبت موفق سفارش 🎉',
      `سفارش شما با کد پیگیری ${trackingCode} ثبت شد و به کارگاه رُست ارسال گردید.`,
      'order',
      trackingCode
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => {
      return prev.map(ord => {
        if (ord.id === orderId) {
          const updated = { ...ord, status: newStatus };
          pushNotification(
            `وضعیت سفارش ${ord.trackingCode} تغییر کرد`,
            `سفارش مشتری (${ord.customerName}) به وضعیت «${newStatus}» تغییر یافت.`,
            'order',
            ord.trackingCode
          );
          return updated;
        }
        return ord;
      });
    });
  };

  const createReservation = (resInfo: {
    customerName: string;
    phone: string;
    guestsCount: number;
    date: string;
    time: string;
    tableLocation: Reservation['tableLocation'];
    notes?: string;
  }): Reservation => {
    const code = `RSV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      code,
      customerName: resInfo.customerName,
      phone: resInfo.phone,
      guestsCount: resInfo.guestsCount,
      date: resInfo.date,
      time: resInfo.time,
      tableLocation: resInfo.tableLocation,
      notes: resInfo.notes,
      status: 'در انتظار',
      createdAt: 'همین حالا'
    };

    setReservations(prev => [newReservation, ...prev]);
    playSuccessSound();

    pushNotification(
      'رزرو میز ثبت شد ✨',
      `رزرو میز شما برای ${resInfo.guestsCount} نفر در ساعت ${resInfo.time} (${resInfo.date}) با کد ${code} دریافت شد.`,
      'reservation',
      code
    );

    return newReservation;
  };

  const updateReservationStatus = (resId: string, status: Reservation['status']) => {
    setReservations(prev => {
      return prev.map(res => {
        if (res.id === resId) {
          const updated = { ...res, status };
          pushNotification(
            `وضعیت رزرو ${res.code} بروز شد`,
            `رزرو میز ${res.customerName} به «${status}» تغییر پیدا کرد.`,
            'reservation',
            res.code
          );
          return updated;
        }
        return res;
      });
    });
  };

  const addReview = (reviewInfo: {
    authorName: string;
    rating: number;
    productOrDrink: string;
    comment: string;
  }) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      authorName: reviewInfo.authorName,
      rating: reviewInfo.rating,
      date: 'لحظاتی پیش',
      productOrDrink: reviewInfo.productOrDrink,
      comment: reviewInfo.comment,
      verifiedPurchase: true
    };

    setReviews(prev => [newRev, ...prev]);
    pushNotification(
      'دیدگاه شما با موفقیت ثبت شد 🌟',
      'با تشکر از ثبت نظرتان درباره کیفیت محصولات کافه موکا.',
      'info'
    );
  };

  const updateProductStock = (productId: string, stock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock } : p));
    pushNotification('بروزرسانی انبارداری', 'موجودی دانه قهوه در سیستم انبار اصلاح گردید.', 'inventory');
  };

  const updateProductPrice = (productId: string, price: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, pricePer250g: price } : p));
    pushNotification('بروزرسانی قیمت', 'نرخ فروش محصول در فروشگاه آنلاین بروز شد.', 'inventory');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <CoffeeContext.Provider
      value={{
        products,
        menuItems,
        cart,
        orders,
        reservations,
        reviews,
        notifications,
        activeToast,
        isCartOpen,
        isPaymentOpen,
        isAdminOpen,
        activeSection,
        setActiveSection,
        setIsCartOpen,
        setIsPaymentOpen,
        setIsAdminOpen,
        dismissToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        createReservation,
        updateReservationStatus,
        addReview,
        updateProductStock,
        updateProductPrice,
        markAllNotificationsAsRead,
        markNotificationAsRead
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
}
