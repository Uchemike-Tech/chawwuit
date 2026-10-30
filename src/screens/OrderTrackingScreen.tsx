import React, { useState } from 'react';
import { SmartImage } from '../components/SmartImage';
import { OrderRecord, OrderStatusStep, ScreenRoute } from '../types';

interface OrderTrackingScreenProps {
  orders: OrderRecord[];
  onAdvanceOrderStage: (orderId: string) => void;
  onNavigate: (screen: ScreenRoute) => void;
  onShowToast: (msg: string) => void;
}

const STAGE_STEPS = [
  {
    step: OrderStatusStep.CONFIRMED,
    title: 'Order Confirmed',
    desc: 'Ticket rang our hearth kitchen bell',
    icon: 'receipt_long',
  },
  {
    step: OrderStatusStep.GRILLING,
    title: 'Searing on Hearth Grill',
    desc: 'Master grillers searing over hardwood coals',
    icon: 'outdoor_grill',
  },
  {
    step: OrderStatusStep.PACKED,
    title: 'Thermal Eco-Box Sealed',
    desc: 'Passed 68°C temperature check & vented seal',
    icon: 'inventory_2',
  },
  {
    step: OrderStatusStep.EN_ROUTE,
    title: 'Courier En Route',
    desc: 'GPS thermal bike heading to your drop-off',
    icon: 'moped',
  },
  {
    step: OrderStatusStep.DELIVERED,
    title: 'Delivered Steaming Hot',
    desc: 'Handed off fresh — time to chaw!',
    icon: 'check_circle',
  },
];

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  orders,
  onAdvanceOrderStage,
  onNavigate,
  onShowToast,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [driverNote, setDriverNote] = useState('');

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!activeOrder) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-space-xl text-center gap-space-md">
        <span className="material-symbols-outlined text-primary text-[48px]">moped</span>
        <h1 className="text-headline-lg font-bold text-on-surface">No Live Orders Yet</h1>
        <p className="text-body-md text-on-surface-variant max-w-md">
          Place an order from our flame-grilled menu to watch real-time kitchen prep and thermal
          courier milestones here.
        </p>
        <button
          type="button"
          onClick={() => onNavigate(ScreenRoute.SHOP)}
          className="bg-primary text-on-primary px-space-xl py-3 rounded-xl text-label-lg font-bold cursor-pointer"
        >
          Browse Hot Specials
        </button>
      </div>
    );
  }

  const remainingEta =
    activeOrder.statusStep === OrderStatusStep.DELIVERED
      ? 0
      : Math.max(4, activeOrder.estimatedMinutes - activeOrder.statusStep * 5);

  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      {/* Header Bar */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/25 px-margin-mobile md:px-margin py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <span className="text-label-sm text-tertiary uppercase tracking-widest font-bold">
              Live Hearth &amp; Courier Telemetry
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface mt-0.5 tabular-price">
              Order #{activeOrder.id}
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Placed {activeOrder.placedAt} • {activeOrder.addressLabel}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {orders.length > 1 && (
              <select
                aria-label="Switch tracked order"
                value={activeOrder.id}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-3.5 py-2.5 text-label-md text-on-surface cursor-pointer"
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    Order #{o.id} ({o.placedAt})
                  </option>
                ))}
              </select>
            )}

            {activeOrder.statusStep < OrderStatusStep.DELIVERED && (
              <button
                type="button"
                onClick={() => onAdvanceOrderStage(activeOrder.id)}
                className="bg-secondary-container text-on-secondary-container px-4 py-2.5 rounded-xl text-label-md font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">fast_forward</span>
                <span>Simulate Next Kitchen Stage</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-margin-mobile md:px-margin pt-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: 5-Stage Progress & Courier Info */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* ETA Highlight Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-lg">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-space-md border-b border-outline-variant/25">
                <div>
                  <span className="text-label-sm uppercase text-on-surface-variant">
                    {activeOrder.statusStep === OrderStatusStep.DELIVERED
                      ? 'Order Status'
                      : 'Estimated Hot Arrival'}
                  </span>
                  <div className="text-display-lg-mobile font-extrabold text-primary tabular-price mt-0.5">
                    {activeOrder.statusStep === OrderStatusStep.DELIVERED
                      ? 'Delivered! Enjoy your Chaw'
                      : `${remainingEta} – ${remainingEta + 4} mins`}
                  </div>
                </div>
                <div className="bg-tertiary/10 text-tertiary px-4 py-2 rounded-2xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">thermostat</span>
                  <div className="flex flex-col">
                    <span className="text-label-sm font-bold">Thermal Pack Temp</span>
                    <span className="text-label-md font-extrabold tabular-price">71°C Optimal</span>
                  </div>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="flex flex-col gap-4">
                {STAGE_STEPS.map((st, idx) => {
                  const isCompleted = activeOrder.statusStep > st.step;
                  const isCurrent = activeOrder.statusStep === st.step;
                  return (
                    <div key={st.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${
                            isCompleted
                              ? 'bg-tertiary text-on-tertiary'
                              : isCurrent
                                ? 'bg-primary text-on-primary shadow-md shadow-primary/25'
                                : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[22px]">
                            {isCompleted ? 'check' : st.icon}
                          </span>
                        </div>
                        {idx < STAGE_STEPS.length - 1 && (
                          <div
                            className={`w-0.5 h-6 mt-1 ${
                              isCompleted ? 'bg-tertiary' : 'bg-outline-variant/40'
                            }`}
                          />
                        )}
                      </div>

                      <div className="pt-1 flex-1 flex items-center justify-between gap-2">
                        <div>
                          <h3
                            className={`text-label-lg font-bold ${
                              isCurrent
                                ? 'text-primary'
                                : isCompleted
                                  ? 'text-on-surface'
                                  : 'text-on-surface-variant'
                            }`}
                          >
                            {st.title}
                          </h3>
                          <p className="text-body-sm text-on-surface-variant">{st.desc}</p>
                        </div>
                        {isCurrent && (
                          <span className="text-label-sm uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">
                            Active Now
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Courier & Gate Drop-off Note */}
            {activeOrder.deliveryMode === 'delivery' && (
              <div className="bg-surface-container-low p-space-lg rounded-3xl border border-outline-variant/25 flex flex-col gap-space-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-headline-sm">
                      MI
                    </div>
                    <div>
                      <h4 className="text-headline-sm font-bold text-on-surface">
                        {activeOrder.courierName}
                      </h4>
                      <p className="text-body-sm text-on-surface-variant">
                        {activeOrder.courierBikeId} • Verified Thermal Rider (4.97 ★)
                      </p>
                    </div>
                  </div>
                  <span className="text-label-md font-bold text-primary tabular-price">
                    {activeOrder.courierPhone}
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!driverNote.trim()) return;
                    onShowToast(`Gate instruction sent to ${activeOrder.courierName}!`);
                    setDriverNote('');
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={driverNote}
                    onChange={(e) => setDriverNote(e.target.value)}
                    placeholder="Send gate code or drop-off note to rider..."
                    className="flex-1 bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="bg-on-surface text-on-primary px-4 py-2.5 rounded-xl text-label-md font-bold cursor-pointer"
                  >
                    Send Note
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right: Thermal Receipt Summary */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/25">
                <h2 className="text-headline-sm font-bold text-on-surface">Order Summary</h2>
                <span className="text-label-sm bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface">
                  Paid via {activeOrder.paymentMethod}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {activeOrder.items.map((item) => (
                  <div key={item.cartItemId} className="flex items-center gap-3">
                    <SmartImage
                      src={item.dish.image}
                      alt={item.dish.imageAlt}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-label-md font-bold text-on-surface truncate">
                        {item.quantity}x {item.dish.name}
                      </p>
                      <p className="text-body-sm text-on-surface-variant truncate">
                        {item.selectedHeat}
                        {item.selectedProtein ? ` • ${item.selectedProtein}` : ''}
                      </p>
                    </div>
                    <span className="text-label-md font-bold text-on-surface tabular-price">
                      ${(item.dish.priceUsd * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                {activeOrder.freeBonusItem && (
                  <div className="bg-tertiary/10 text-tertiary px-3 py-2 rounded-xl text-label-sm font-bold flex items-center justify-between">
                    <span>+ {activeOrder.freeBonusItem}</span>
                    <span>FREE</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-outline-variant/25 flex flex-col gap-1.5 text-body-sm tabular-price">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>${activeOrder.subtotalUsd.toFixed(2)}</span>
                </div>
                {activeOrder.discountUsd > 0 && (
                  <div className="flex justify-between text-tertiary font-semibold">
                    <span>Discount ({activeOrder.appliedCoupon})</span>
                    <span>-${activeOrder.discountUsd.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Delivery</span>
                  <span>
                    {activeOrder.deliveryFeeUsd === 0
                      ? 'Free'
                      : `$${activeOrder.deliveryFeeUsd.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-outline-variant/25 flex justify-between items-baseline">
                  <span className="text-label-lg font-bold text-on-surface">Total Paid</span>
                  <div className="text-right">
                    <span className="text-price-lg font-extrabold text-primary">
                      ${activeOrder.totalUsd.toFixed(2)}
                    </span>
                    <span className="block text-body-sm text-on-surface-variant">
                      ₦{activeOrder.totalNgn.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
