import React, { useState } from 'react';
import { PROMO_DEALS } from '../data/menuData';
import { CartItem, DeliveryZone, UserProfileData } from '../types';
import { SmartImage } from './SmartImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => { ok: boolean; message: string };
  onRemoveCoupon: () => void;
  selectedZone: DeliveryZone;
  userProfile: UserProfileData;
  onPlaceOrder: (payload: {
    deliveryMode: 'delivery' | 'pickup';
    addressLabel: string;
    paymentMethod: 'Paystack' | 'Flutterwave' | 'Pay on Delivery';
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  selectedZone,
  userProfile,
  onPlaceOrder,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    'Paystack' | 'Flutterwave' | 'Pay on Delivery'
  >('Paystack');
  const [customStreet, setCustomStreet] = useState(
    userProfile.savedAddresses.find((a) => a.isDefault)?.street ||
      `14B Adeola Odeku St, ${selectedZone.name}`
  );
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout'>('bag');

  if (!isOpen) return null;

  const getItemUnitUsd = (item: CartItem) => {
    const addonsUsd = item.selectedAddons.reduce((s, a) => s + a.priceUsd, 0);
    const match = item.selectedProtein?.match(/\+\$(\d+(\.\d+)?)/);
    const proteinExtra = match ? parseFloat(match[1]) : 0;
    return item.dish.priceUsd + addonsUsd + proteinExtra;
  };

  const subtotalUsd = items.reduce(
    (sum, item) => sum + getItemUnitUsd(item) * item.quantity,
    0
  );

  // Calculate active promo discount
  const activeDeal = PROMO_DEALS.find((d) => d.code === appliedCoupon);
  let discountUsd = 0;
  let freeBonusItem: string | undefined;

  if (activeDeal && subtotalUsd >= activeDeal.minOrderUsd) {
    if (activeDeal.discountPercent) {
      discountUsd = +(subtotalUsd * (activeDeal.discountPercent / 100)).toFixed(2);
    } else if (activeDeal.flatDiscountUsd) {
      discountUsd = activeDeal.flatDiscountUsd;
    }
    freeBonusItem = activeDeal.freeItemBonus;
  }

  const deliveryFeeUsd =
    items.length === 0 || deliveryMode === 'pickup' ? 0 : selectedZone.deliveryFeeUsd;
  const totalUsd = Math.max(0, subtotalUsd - discountUsd + deliveryFeeUsd);
  const totalNgn = Math.round(totalUsd * 500);

  const freePlantainThreshold = 35;
  const remainingForFreePlantain = Math.max(0, freePlantainThreshold - subtotalUsd);
  const progressPct = Math.min(100, (subtotalUsd / freePlantainThreshold) * 100);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim().toUpperCase());
    setCouponFeedback(res.message);
    if (res.ok) setCouponInput('');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    onPlaceOrder({
      deliveryMode,
      addressLabel:
        deliveryMode === 'pickup'
          ? `Pickup at ${selectedZone.hub}`
          : `${customStreet} (${selectedZone.name})`,
      paymentMethod,
    });
    setCheckoutStep('bag');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-lowest h-full shadow-[0_20px_50px_-8px_rgba(31,25,22,0.25)] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Bar */}
        <div className="p-space-lg border-b border-outline-variant/30 flex flex-col gap-space-sm bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                shopping_bag
              </span>
              <h2 className="text-headline-md font-bold text-on-surface">
                {checkoutStep === 'bag' ? 'Your Thermal Bag' : 'Confirm & Dispatch'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bag drawer"
              className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Delivery vs Pickup Toggle */}
          <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl">
            <button
              type="button"
              onClick={() => setDeliveryMode('delivery')}
              className={`py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMode === 'delivery'
                  ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">moped</span>
              <span>Hot Delivery (~{selectedZone.avgMinutes}m)</span>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMode('pickup')}
              className={`py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                deliveryMode === 'pickup'
                  ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Hub Pickup (15m)</span>
            </button>
          </div>

          {/* $35 Complimentary Plantain Bites Progress */}
          {items.length > 0 && (
            <div className="bg-surface-container-low px-3.5 py-2.5 rounded-xl flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-body-sm">
                {remainingForFreePlantain > 0 ? (
                  <span className="text-on-surface-variant">
                    Add <strong className="text-primary">${remainingForFreePlantain.toFixed(2)}</strong> more to unlock{' '}
                    <strong className="text-on-surface">CHAWWIT35</strong> free plantains!
                  </span>
                ) : (
                  <span className="text-tertiary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">celebration</span>
                    Eligible for CHAWWIT35 Free Plantains + $4 Off!
                  </span>
                )}
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-md">
          {items.length === 0 ? (
            <div className="my-auto text-center py-12 flex flex-col items-center gap-space-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">outdoor_grill</span>
              </div>
              <div className="flex flex-col gap-1 max-w-xs">
                <h3 className="text-headline-sm font-bold text-on-surface">
                  Your thermal bag is empty
                </h3>
                <p className="text-body-sm text-on-surface-variant">
                  Our charcoal hearth is hot! Add smoky firewood jollof, suya ribs, or crispy wings
                  to start your feast.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-primary text-on-primary px-space-lg py-3 rounded-xl text-label-md font-bold cursor-pointer"
              >
                Explore Hot Specials
              </button>
            </div>
          ) : checkoutStep === 'bag' ? (
            <>
              {/* Itemized List */}
              <div className="flex flex-col gap-space-sm">
                {items.map((item) => {
                  const unitUsd = getItemUnitUsd(item);
                  return (
                    <div
                      key={item.cartItemId}
                      className="bg-surface-container-low/70 border border-outline-variant/25 rounded-2xl p-3.5 flex gap-3"
                    >
                      <SmartImage
                        src={item.dish.image}
                        alt={item.dish.imageAlt}
                        className="w-18 h-18 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-label-lg font-bold text-on-surface leading-snug">
                              {item.dish.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.cartItemId)}
                              aria-label={`Remove ${item.dish.name}`}
                              className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                          <p className="text-body-sm text-on-surface-variant mt-0.5">
                            {item.selectedHeat}
                            {item.selectedProtein ? ` · ${item.selectedProtein}` : ''}
                          </p>
                          {item.selectedAddons.length > 0 && (
                            <p className="text-body-sm text-primary font-medium mt-0.5">
                              + {item.selectedAddons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                          {item.kitchenNotes && (
                            <p className="text-body-sm italic text-on-surface-variant mt-0.5">
                              &ldquo;{item.kitchenNotes}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-price-md font-bold text-on-surface tabular-price">
                            ${(unitUsd * item.quantity).toFixed(2)}
                          </span>

                          {/* Pill Stepper */}
                          <div className="flex items-center bg-surface-container-lowest border border-outline-variant/40 rounded-full px-1 py-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">remove</span>
                            </button>
                            <span className="w-6 text-center text-label-md font-bold tabular-price">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[15px]">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {freeBonusItem && (
                  <div className="bg-tertiary/10 border border-tertiary/25 rounded-2xl p-3 flex items-center justify-between gap-2 text-tertiary">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">redeem</span>
                      <span className="text-label-md font-bold">{freeBonusItem}</span>
                    </div>
                    <span className="text-label-sm uppercase font-bold">FREE</span>
                  </div>
                )}
              </div>

              {/* Promo Coupon Section */}
              <div className="pt-2 border-t border-outline-variant/25 flex flex-col gap-2">
                <span className="text-label-md font-bold text-on-surface">
                  Promo / Voucher Code
                </span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-secondary-fixed/40 border border-secondary/30 px-3.5 py-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        local_offer
                      </span>
                      <div className="flex flex-col">
                        <span className="text-label-md font-bold text-on-surface">
                          {appliedCoupon} Applied
                        </span>
                        {activeDeal && subtotalUsd < activeDeal.minOrderUsd && (
                          <span className="text-body-sm text-error">
                            Min. order ${activeDeal.minOrderUsd} required
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveCoupon();
                        setCouponFeedback(null);
                      }}
                      className="text-label-sm text-error hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try CHAWWIT35 or FLAME20"
                      className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2 text-body-sm uppercase focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="bg-on-surface text-on-primary px-4 py-2 rounded-xl text-label-md font-semibold hover:bg-primary transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <span className="text-body-sm text-on-surface-variant">{couponFeedback}</span>
                )}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['CHAWWIT35', 'FLAME20'].map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          const res = onApplyCoupon(code);
                          setCouponFeedback(res.message);
                        }}
                        className="text-label-sm bg-surface-container-high hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-full text-on-surface-variant transition-colors cursor-pointer"
                      >
                        Tap to apply {code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Step 2: Delivery Address & Payment Gateway Confirmation */
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="flex flex-col gap-space-md">
              <button
                type="button"
                onClick={() => setCheckoutStep('bag')}
                className="inline-flex items-center gap-1 text-label-md text-primary w-fit cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to bag items</span>
              </button>

              {deliveryMode === 'delivery' ? (
                <div className="flex flex-col gap-space-xs">
                  <label className="text-label-md font-bold text-on-surface">
                    Drop-off Street Address ({selectedZone.name})
                  </label>
                  <input
                    type="text"
                    required
                    value={customStreet}
                    onChange={(e) => setCustomStreet(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                  <span className="text-body-sm text-tertiary flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[15px]">timer</span>
                    Dispatched from {selectedZone.hub} • Guaranteed 30-min window
                  </span>
                </div>
              ) : (
                <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 flex flex-col gap-1">
                  <span className="text-label-sm uppercase text-primary">Express Hub Pickup</span>
                  <strong className="text-label-lg text-on-surface">{selectedZone.hub}</strong>
                  <span className="text-body-sm text-on-surface-variant">
                    Ready at the Thermal Counter in 14–18 mins. Zero delivery fee.
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-space-xs">
                <span className="text-label-md font-bold text-on-surface">
                  Select Payment Method
                </span>
                <div className="flex flex-col gap-2">
                  {(
                    [
                      {
                        id: 'Paystack',
                        subtitle: 'Instant Card, Bank Transfer, or USSD',
                        icon: 'verified',
                      },
                      {
                        id: 'Flutterwave',
                        subtitle: 'Apple Pay, International & Local Cards',
                        icon: 'lock',
                      },
                      {
                        id: 'Pay on Delivery',
                        subtitle: 'Contactless POS Terminal or Transfer at Door',
                        icon: 'payments',
                      },
                    ] as const
                  ).map((pm) => {
                    const active = paymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-primary/8 border-primary'
                            : 'bg-surface-container-lowest border-outline-variant/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            {pm.icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-label-md font-bold text-on-surface">
                              {pm.id}
                            </span>
                            <span className="text-body-sm text-on-surface-variant">
                              {pm.subtitle}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            active
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-outline'
                          }`}
                        >
                          {active && (
                            <span className="material-symbols-outlined text-[13px]">check</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Summary & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-space-lg bg-surface-container-low border-t border-outline-variant/35 flex flex-col gap-space-md tabular-price">
            <div className="flex flex-col gap-1.5 text-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>${subtotalUsd.toFixed(2)}</span>
              </div>
              {discountUsd > 0 && (
                <div className="flex justify-between text-tertiary font-semibold">
                  <span>Promo Savings ({appliedCoupon})</span>
                  <span>-${discountUsd.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>
                  {deliveryMode === 'pickup' ? 'Hub Pickup' : 'Thermal Courier Delivery'}
                </span>
                <span>{deliveryFeeUsd === 0 ? 'Free' : `$${deliveryFeeUsd.toFixed(2)}`}</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex items-baseline justify-between">
                <span className="text-headline-sm font-bold text-on-surface">Total</span>
                <div className="text-right">
                  <span className="text-price-lg font-extrabold text-primary">
                    ${totalUsd.toFixed(2)}
                  </span>
                  <span className="block text-body-sm text-on-surface-variant">
                    ≈ ₦{totalNgn.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full bg-primary text-on-primary hover:bg-primary-container py-3.5 rounded-xl text-label-lg font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Instant Checkout</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-tertiary text-on-tertiary hover:bg-tertiary-container py-3.5 rounded-xl text-label-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Fire Hearth &amp; Place Order (${totalUsd.toFixed(2)})</span>
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
