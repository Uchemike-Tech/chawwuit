import React, { useState } from 'react';
import { SmartImage } from '../components/SmartImage';
import { DELIVERY_ZONES } from '../data/menuData';
import { HeatLevel, OrderRecord, ScreenRoute, UserProfileData } from '../types';

interface UserProfileScreenProps {
  profile: UserProfileData;
  onUpdateProfile: (next: UserProfileData) => void;
  orders: OrderRecord[];
  onReorder: (order: OrderRecord) => void;
  onApplyRewardCoupon: (code: string) => void;
  onNavigate: (screen: ScreenRoute) => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  orders,
  onReorder,
  onApplyRewardCoupon,
  onNavigate,
}) => {
  const [newLabel, setNewLabel] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newZoneId, setNewZoneId] = useState(DELIVERY_ZONES[0].id);
  const [addingAddress, setAddingAddress] = useState(false);

  const handleSetDefaultAddress = (addrId: string) => {
    onUpdateProfile({
      ...profile,
      savedAddresses: profile.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === addrId,
      })),
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newStreet.trim()) return;
    const created = {
      id: `addr-${Date.now()}`,
      label: newLabel.trim(),
      street: newStreet.trim(),
      zoneId: newZoneId,
      isDefault: true,
    };
    onUpdateProfile({
      ...profile,
      savedAddresses: [
        ...profile.savedAddresses.map((a) => ({ ...a, isDefault: false })),
        created,
      ],
    });
    setNewLabel('');
    setNewStreet('');
    setAddingAddress(false);
  };

  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      {/* Foodie Header */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/25 px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <SmartImage
              src={profile.avatar}
              alt={profile.fullName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
            />
            <div className="flex flex-col gap-1">
              <span className="text-label-sm uppercase tracking-wider text-primary font-bold">
                Chawwit Gold Foodie • {profile.ordersCount} Feasts Ordered
              </span>
              <h1 className="text-headline-xl-mobile md:text-headline-lg font-bold text-on-surface">
                {profile.fullName}
              </h1>
              <p className="text-body-sm text-on-surface-variant">
                {profile.email} • {profile.phone}
              </p>
            </div>
          </div>

          {/* Flame Rewards Card */}
          <div className="bg-gradient-to-r from-secondary to-primary text-on-primary p-space-md rounded-2xl shadow-lg flex items-center gap-space-lg tabular-price">
            <div className="flex flex-col">
              <span className="text-label-sm uppercase text-secondary-fixed">
                Flame Reward Points
              </span>
              <span className="text-headline-lg font-extrabold">
                {profile.flamePoints.toLocaleString()} pts
              </span>
            </div>
            <button
              type="button"
              onClick={() => onApplyRewardCoupon('FIRSTCHAW')}
              className="bg-surface-container-lowest text-primary px-4 py-2.5 rounded-xl text-label-md font-bold hover:bg-surface-container-high transition-colors cursor-pointer whitespace-nowrap"
            >
              Redeem $5 Perk
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-margin-mobile md:px-margin pt-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: Spice Preference & Saved Lagos Addresses */}
          <div className="lg:col-span-6 flex flex-col gap-space-lg">
            {/* Spice Profile */}
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-md">
              <div>
                <h2 className="text-headline-sm font-bold text-on-surface">
                  Default Heat Preference
                </h2>
                <p className="text-body-sm text-on-surface-variant">
                  Automatically pre-selected whenever you customize a grill platter or bowl.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  HeatLevel.MILD,
                  HeatLevel.MEDIUM,
                  HeatLevel.HOT,
                  HeatLevel.EXTRA_SPICY,
                ].map((h) => {
                  const active = profile.preferredHeat === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => onUpdateProfile({ ...profile, preferredHeat: h })}
                      className={`py-2.5 px-3 rounded-xl text-label-md border transition-all cursor-pointer ${
                        active
                          ? 'bg-primary text-on-primary border-primary font-bold'
                          : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container-high'
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-sm font-bold text-on-surface">
                  Saved Lagos Drop-off Locations
                </h2>
                <button
                  type="button"
                  onClick={() => setAddingAddress((v) => !v)}
                  className="text-label-md text-primary font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addingAddress ? 'close' : 'add'}
                  </span>
                  <span>{addingAddress ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {addingAddress && (
                <form
                  onSubmit={handleAddAddress}
                  className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Label (e.g., Gym • Ikoyi)"
                      className="bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-3.5 py-2 text-body-sm"
                    />
                    <select
                      value={newZoneId}
                      onChange={(e) => setNewZoneId(e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-3.5 py-2 text-body-sm"
                    >
                      {DELIVERY_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="Full street address & gate landmark"
                    className="bg-surface-container-lowest border border-outline-variant/45 rounded-xl px-3.5 py-2 text-body-sm"
                  />
                  <button
                    type="submit"
                    className="self-end bg-primary text-on-primary px-4 py-2 rounded-xl text-label-md font-bold cursor-pointer"
                  >
                    Save Location
                  </button>
                </form>
              )}

              <div className="flex flex-col gap-2.5">
                {profile.savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleSetDefaultAddress(addr.id)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      addr.isDefault
                        ? 'bg-primary/8 border-primary'
                        : 'bg-surface-container-low/60 border-outline-variant/30 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                        location_on
                      </span>
                      <div>
                        <span className="text-label-md font-bold text-on-surface block">
                          {addr.label}
                        </span>
                        <span className="text-body-sm text-on-surface-variant">{addr.street}</span>
                      </div>
                    </div>
                    {addr.isDefault && (
                      <span className="text-label-sm uppercase bg-primary text-on-primary px-2.5 py-1 rounded-full font-bold shrink-0">
                        Default
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Recent Orders & One-Tap Reorder */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl border border-outline-variant/30 shadow-2xs flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-sm font-bold text-on-surface">
                  Recent Hearth Orders
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate(ScreenRoute.TRACKING)}
                  className="text-label-md text-tertiary font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">moped</span>
                  <span>Live Tracker</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/25 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-label-lg font-bold text-on-surface tabular-price">
                          Order #{ord.id}
                        </span>
                        <span className="block text-body-sm text-on-surface-variant">
                          {ord.placedAt} • {ord.items.length} dishes
                        </span>
                      </div>
                      <span className="text-price-md font-extrabold text-primary tabular-price">
                        ${ord.totalUsd.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-body-sm text-on-surface">
                      {ord.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(', ')}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onReorder(ord)}
                        className="bg-primary text-on-primary px-4 py-2 rounded-xl text-label-md font-bold hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        Reorder Feast
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate(ScreenRoute.TRACKING)}
                        className="bg-surface-container-lowest border border-outline-variant/40 text-on-surface px-4 py-2 rounded-xl text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        View Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
