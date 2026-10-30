export enum ScreenRoute {
  HOME = 'home',
  SHOP = 'shop-catalogue',
  DEALS = 'deals',
  ABOUT = 'about',
  CONTACT = 'contact',
  TRACKING = 'order-tracking',
  PROFILE = 'user-profile',
}

export enum CategoryId {
  ALL = 'all',
  FLAME_GRILLS = 'flame-grills',
  SIGNATURE_BOWLS = 'signature-bowls',
  STREET_BITES = 'street-bites',
  MEAL_COMBOS = 'meal-combos',
  SIDES_DRINKS = 'sides-drinks',
  SWEET_TREATS = 'sweet-treats',
}

export enum HeatLevel {
  MILD = 'Mild / Sweet',
  SAVORY = 'Savory Warm',
  MEDIUM = 'Med Heat',
  HOT = 'Hot',
  EXTRA_SPICY = 'Fiery Yaji',
}

export interface DishAddon {
  id: string;
  name: string;
  priceUsd: number;
  priceNgn: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: CategoryId;
  priceUsd: number;
  priceNgn: number;
  originalPriceUsd?: number;
  image: string;
  imageAlt: string;
  prepTime: string;
  heatLevel: HeatLevel;
  rating: number;
  reviewCount: number;
  isHalal: boolean;
  isVegan?: boolean;
  isChefsPick?: boolean;
  isBestSeller?: boolean;
  isDinerFav?: boolean;
  isFeaturedSpecial?: boolean;
  calories: number;
  proteinOptions?: string[];
  availableAddons: DishAddon[];
}

export interface CartItem {
  cartItemId: string;
  dish: MenuItem;
  quantity: number;
  selectedHeat: HeatLevel;
  selectedProtein?: string;
  selectedAddons: DishAddon[];
  kitchenNotes?: string;
}

export interface PromoDeal {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  minOrderUsd: number;
  discountPercent?: number;
  flatDiscountUsd?: number;
  freeItemBonus?: string;
  expiryText: string;
  image: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  hub: string;
  avgMinutes: number;
  deliveryFeeUsd: number;
  deliveryFeeNgn: number;
  kitchenStatus: string;
}

export enum OrderStatusStep {
  CONFIRMED = 0,
  GRILLING = 1,
  PACKED = 2,
  EN_ROUTE = 3,
  DELIVERED = 4,
}

export interface OrderRecord {
  id: string;
  placedAt: string;
  estimatedMinutes: number;
  deliveryMode: 'delivery' | 'pickup';
  addressLabel: string;
  paymentMethod: 'Paystack' | 'Flutterwave' | 'Pay on Delivery';
  items: CartItem[];
  subtotalUsd: number;
  discountUsd: number;
  deliveryFeeUsd: number;
  totalUsd: number;
  totalNgn: number;
  appliedCoupon?: string;
  freeBonusItem?: string;
  statusStep: OrderStatusStep;
  courierName: string;
  courierBikeId: string;
  courierPhone: string;
}

export interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  preferredHeat: HeatLevel;
  flamePoints: number;
  ordersCount: number;
  savedAddresses: {
    id: string;
    label: string;
    street: string;
    zoneId: string;
    isDefault: boolean;
  }[];
}
