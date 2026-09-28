export type RoastLevel = 'لایت' | 'مدیوم' | 'دارک';

export type GrindOption = 
  | 'دانه کامل (آسیاب‌نشده)' 
  | 'آسیاب اسپرسو' 
  | 'آسیاب دمی / V60' 
  | 'آسیاب فرنچ‌پرس' 
  | 'آسیاب موکاپات';

export interface Product {
  id: string;
  name: string;
  englishName: string;
  origin: string;
  altitude: string;
  process: string;
  roastLevel: RoastLevel;
  flavorNotes: string[];
  description: string;
  pricePer250g: number; // in Tomans
  stock: number; // available packets
  image: string;
  badge?: string;
  category: 'single-origin' | 'blend' | 'drip-bag' | 'equipment';
}

export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  category: 'espresso' | 'filter' | 'cold' | 'pastry';
  price: number; // in Tomans
  description: string;
  ingredients?: string;
  volume?: string;
  calories?: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: 250 | 500 | 1000; // in grams
  selectedGrind: GrindOption;
  unitPrice: number;
}

export type OrderStatus = 
  | 'پرداخت شده' 
  | 'در حال رُست و بسته‌بندی' 
  | 'تحویل به سفیر و ارسال' 
  | 'تحویل داده شده' 
  | 'لغو شده';

export interface Order {
  id: string;
  trackingCode: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  paymentRefId: string;
}

export interface Reservation {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  guestsCount: number;
  date: string;
  time: string;
  tableLocation: 'سالن اصلی' | 'کنار پنجره' | 'تراس و فضای باز' | 'میز کاری دنج';
  notes?: string;
  status: 'تایید شده' | 'در انتظار' | 'به پایان رسیده' | 'لغو شده';
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  date: string;
  productOrDrink: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'reservation' | 'inventory' | 'info';
  read: boolean;
  relatedId?: string;
}
