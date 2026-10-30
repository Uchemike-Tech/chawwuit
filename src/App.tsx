/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import {
  DELIVERY_ZONES,
  INITIAL_CART_ITEMS,
  INITIAL_ORDERS,
  INITIAL_USER_PROFILE,
  MENU_ITEMS,
  PROMO_DEALS,
} from './data/menuData';
import { AboutScreen } from './screens/AboutScreen';
import { ContactScreen } from './screens/ContactScreen';
import { DealsScreen } from './screens/DealsScreen';
import { HomeScreen } from './screens/HomeScreen';
import { OrderTrackingScreen } from './screens/OrderTrackingScreen';
import { ShopCatalogueScreen } from './screens/ShopCatalogueScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import {
  CartItem,
  CategoryId,
  DeliveryZone,
  DishAddon,
  HeatLevel,
  MenuItem,
  OrderRecord,
  OrderStatusStep,
  ScreenRoute,
  UserProfileData,
} from './types';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenRoute>(ScreenRoute.HOME);
  const [selectedShopCategory, setSelectedShopCategory] = useState<CategoryId>(CategoryId.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(() =>
    loadStored('chawwit_zone_v1', DELIVERY_ZONES[0])
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadStored('chawwit_cart_v1', INITIAL_CART_ITEMS)
  );
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() =>
    loadStored('chawwit_coupon_v1', null)
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    loadStored('chawwit_orders_v1', INITIAL_ORDERS)
  );
  const [userProfile, setUserProfile] = useState<UserProfileData>(() =>
    loadStored('chawwit_profile_v1', INITIAL_USER_PROFILE)
  );

  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem('chawwit_zone_v1', JSON.stringify(selectedZone));
      window.localStorage.setItem('chawwit_cart_v1', JSON.stringify(cartItems));
      window.localStorage.setItem('chawwit_coupon_v1', JSON.stringify(appliedCoupon));
      window.localStorage.setItem('chawwit_orders_v1', JSON.stringify(orders));
      window.localStorage.setItem('chawwit_profile_v1', JSON.stringify(userProfile));
    } catch {
      // Ignore storage quota issues in restricted iframes
    }
  }, [selectedZone, cartItems, appliedCoupon, orders, userProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 3400);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const navigateTo = (screen: ScreenRoute) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryInShop = (category: CategoryId) => {
    setSelectedShopCategory(category);
    navigateTo(ScreenRoute.SHOP);
  };

  const getItemUnitUsd = (item: CartItem) => {
    const addonsUsd = item.selectedAddons.reduce((s, a) => s + a.priceUsd, 0);
    const match = item.selectedProtein?.match(/\+\$(\d+(\.\d+)?)/);
    const proteinExtra = match ? parseFloat(match[1]) : 0;
    return item.dish.priceUsd + addonsUsd + proteinExtra;
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotalUsd = cartItems.reduce(
    (sum, i) => sum + getItemUnitUsd(i) * i.quantity,
    0
  );

  const handleAddToCart = (
    dish: MenuItem,
    quantity: number,
    selectedHeat: HeatLevel,
    selectedProtein?: string,
    selectedAddons: DishAddon[] = [],
    kitchenNotes?: string
  ) => {
    setCartItems((prev) => {
      const addonKey = selectedAddons
        .map((a) => a.id)
        .sort()
        .join('|');
      const existingIndex = prev.findIndex(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedHeat === selectedHeat &&
          item.selectedProtein === selectedProtein &&
          (item.kitchenNotes || '') === (kitchenNotes || '') &&
          item.selectedAddons
            .map((a) => a.id)
            .sort()
            .join('|') === addonKey
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          cartItemId: `bag-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          dish,
          quantity,
          selectedHeat,
          selectedProtein,
          selectedAddons,
          kitchenNotes,
        },
      ];
    });

    showToast(`Added ${quantity}x ${dish.name} to your thermal bag!`);
  };

  const handleQuickAdd = (dish: MenuItem) => {
    handleAddToCart(dish, 1, dish.heatLevel, dish.proteinOptions?.[0], []);
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleApplyCoupon = (code: string): { ok: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    const deal = PROMO_DEALS.find((d) => d.code === normalized);
    if (!deal) {
      return {
        ok: false,
        message: 'Invalid code. Try CHAWWIT35, FLAME20, or FIRSTCHAW.',
      };
    }
    setAppliedCoupon(normalized);
    if (cartSubtotalUsd < deal.minOrderUsd) {
      return {
        ok: true,
        message: `${normalized} saved! Add $${(deal.minOrderUsd - cartSubtotalUsd).toFixed(2)} more to unlock the discount.`,
      };
    }
    return {
      ok: true,
      message: `${normalized} applied — ${deal.subtitle}!`,
    };
  };

  const handleCopyAndApplyCoupon = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    const res = handleApplyCoupon(code);
    showToast(`Code ${code} copied! ${res.message}`);
  };

  const handlePlaceOrder = (payload: {
    deliveryMode: 'delivery' | 'pickup';
    addressLabel: string;
    paymentMethod: 'Paystack' | 'Flutterwave' | 'Pay on Delivery';
  }) => {
    const activeDeal = PROMO_DEALS.find((d) => d.code === appliedCoupon);
    let discountUsd = 0;
    let freeBonusItem: string | undefined;

    if (activeDeal && cartSubtotalUsd >= activeDeal.minOrderUsd) {
      if (activeDeal.discountPercent) {
        discountUsd = +(cartSubtotalUsd * (activeDeal.discountPercent / 100)).toFixed(2);
      } else if (activeDeal.flatDiscountUsd) {
        discountUsd = activeDeal.flatDiscountUsd;
      }
      freeBonusItem = activeDeal.freeItemBonus;
    }

    const deliveryFeeUsd =
      payload.deliveryMode === 'pickup' ? 0 : selectedZone.deliveryFeeUsd;
    const totalUsd = Math.max(0, cartSubtotalUsd - discountUsd + deliveryFeeUsd);
    const totalNgn = Math.round(totalUsd * 500);

    const newOrder: OrderRecord = {
      id: `CHW-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: 'Just now',
      estimatedMinutes:
        payload.deliveryMode === 'pickup' ? 15 : selectedZone.avgMinutes,
      deliveryMode: payload.deliveryMode,
      addressLabel: payload.addressLabel,
      paymentMethod: payload.paymentMethod,
      items: [...cartItems],
      subtotalUsd: cartSubtotalUsd,
      discountUsd,
      deliveryFeeUsd,
      totalUsd,
      totalNgn,
      appliedCoupon: discountUsd > 0 || freeBonusItem ? appliedCoupon || undefined : undefined,
      freeBonusItem,
      statusStep: OrderStatusStep.CONFIRMED,
      courierName: 'Musa Ibrahim',
      courierBikeId: `Thermal Bike #${selectedZone.id.toUpperCase().slice(0, 2)}-208`,
      courierPhone: '+234 803 555 0194',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      ordersCount: prev.ordersCount + 1,
      flamePoints: prev.flamePoints + Math.round(totalUsd * 10),
    }));
    setCartItems([]);
    setAppliedCoupon(null);
    setIsCartOpen(false);
    navigateTo(ScreenRoute.TRACKING);
    showToast(`Order #${newOrder.id} sent to our charcoal hearth!`);
  };

  const handleAdvanceOrderStage = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nextStep = Math.min(
          OrderStatusStep.DELIVERED,
          (ord.statusStep + 1) as OrderStatusStep
        );
        return { ...ord, statusStep: nextStep };
      })
    );
  };

  const handleReorder = (order: OrderRecord) => {
    setCartItems(
      order.items.map((item, idx) => ({
        ...item,
        cartItemId: `reorder-${Date.now()}-${idx}`,
      }))
    );
    setIsCartOpen(true);
    showToast(`Loaded ${order.items.length} dishes from Order #${order.id} into your bag!`);
  };

  const hasActiveOrder = orders.some((o) => o.statusStep < OrderStatusStep.DELIVERED);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header
        activeScreen={activeScreen}
        onNavigate={navigateTo}
        selectedZone={selectedZone}
        zones={DELIVERY_ZONES}
        onSelectZone={(z) => {
          setSelectedZone(z);
          showToast(`Delivering to ${z.name} (~${z.avgMinutes} mins)`);
        }}
        cartCount={cartCount}
        cartSubtotalUsd={cartSubtotalUsd}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        menuItems={MENU_ITEMS}
        onSelectDish={(dish) => setSelectedDishModal(dish)}
        userAvatar={userProfile.avatar}
        hasActiveOrder={hasActiveOrder}
      />

      <main className="w-full pt-20 flex-1">
        {activeScreen === ScreenRoute.HOME && (
          <HomeScreen
            menuItems={MENU_ITEMS}
            selectedZone={selectedZone}
            onSelectDish={(dish) => setSelectedDishModal(dish)}
            onQuickAdd={handleQuickAdd}
            onNavigate={navigateTo}
            onSelectCategoryInShop={handleSelectCategoryInShop}
            onCopyAndApplyCoupon={handleCopyAndApplyCoupon}
          />
        )}

        {activeScreen === ScreenRoute.SHOP && (
          <ShopCatalogueScreen
            menuItems={MENU_ITEMS}
            selectedCategory={selectedShopCategory}
            onSelectCategory={setSelectedShopCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectDish={(dish) => setSelectedDishModal(dish)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeScreen === ScreenRoute.DEALS && (
          <DealsScreen
            menuItems={MENU_ITEMS}
            appliedCoupon={appliedCoupon}
            onCopyAndApplyCoupon={handleCopyAndApplyCoupon}
            onSelectDish={(dish) => setSelectedDishModal(dish)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeScreen === ScreenRoute.ABOUT && (
          <AboutScreen
            onNavigate={navigateTo}
            onSelectZoneAndShop={(zone) => {
              setSelectedZone(zone);
              navigateTo(ScreenRoute.SHOP);
              showToast(`Switched kitchen hub to ${zone.hub}`);
            }}
          />
        )}

        {activeScreen === ScreenRoute.CONTACT && <ContactScreen onShowToast={showToast} />}

        {activeScreen === ScreenRoute.TRACKING && (
          <OrderTrackingScreen
            orders={orders}
            onAdvanceOrderStage={handleAdvanceOrderStage}
            onNavigate={navigateTo}
            onShowToast={showToast}
          />
        )}

        {activeScreen === ScreenRoute.PROFILE && (
          <UserProfileScreen
            profile={userProfile}
            onUpdateProfile={(next) => {
              setUserProfile(next);
              showToast('Profile preferences updated!');
            }}
            orders={orders}
            onReorder={handleReorder}
            onApplyRewardCoupon={(code) => {
              handleCopyAndApplyCoupon(code);
              setIsCartOpen(true);
            }}
            onNavigate={navigateTo}
          />
        )}
      </main>

      <Footer
        onNavigate={navigateTo}
        onSelectCategoryInShop={handleSelectCategoryInShop}
        onShowToast={showToast}
      />

      {/* Dish Customization Contiguous Modal */}
      <DishDetailModal
        dish={selectedDishModal}
        defaultHeat={userProfile.preferredHeat}
        onClose={() => setSelectedDishModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Thermal Bag & Instant Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        selectedZone={selectedZone}
        userProfile={userProfile}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 left-5 sm:left-auto sm:max-w-sm z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-outline/20"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">
              local_fire_department
            </span>
            <span className="text-label-md">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="text-inverse-on-surface/70 hover:text-inverse-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
