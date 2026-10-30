import React, { useEffect, useRef, useState } from 'react';
import { BRAND_IMAGES } from '../data/menuData';
import { DeliveryZone, MenuItem, ScreenRoute } from '../types';
import { SmartImage } from './SmartImage';

interface HeaderProps {
  activeScreen: ScreenRoute;
  onNavigate: (screen: ScreenRoute) => void;
  selectedZone: DeliveryZone;
  zones: DeliveryZone[];
  onSelectZone: (zone: DeliveryZone) => void;
  cartCount: number;
  cartSubtotalUsd: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  menuItems: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
  userAvatar: string;
  hasActiveOrder: boolean;
}

const NAV_ITEMS: { label: string; route: ScreenRoute }[] = [
  { label: 'Home', route: ScreenRoute.HOME },
  { label: 'Shop / Catalogue', route: ScreenRoute.SHOP },
  { label: 'Deals', route: ScreenRoute.DEALS },
  { label: 'About', route: ScreenRoute.ABOUT },
  { label: 'Contact', route: ScreenRoute.CONTACT },
];

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  selectedZone,
  zones,
  onSelectZone,
  cartCount,
  cartSubtotalUsd,
  onOpenCart,
  searchQuery,
  onSearchChange,
  menuItems,
  onSelectDish,
  userAvatar,
  hasActiveOrder,
}) => {
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const zoneRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (zoneRef.current && !zoneRef.current.contains(e.target as Node)) {
        setZoneDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const searchResults =
    searchQuery.trim().length > 0
      ? menuItems
          .filter(
            (m) =>
              m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              m.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
      : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/25 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between gap-gutter-mobile md:gap-gutter">
        {/* Left: Brand + Location Selector */}
        <div className="flex items-center gap-space-md lg:gap-space-lg shrink-0">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(ScreenRoute.HOME)}
            className="flex items-center gap-space-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
          >
            <SmartImage
              src={BRAND_IMAGES.logo}
              alt="Chawwit official brand logo"
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="text-headline-sm font-bold text-primary tracking-tight whitespace-nowrap">
              Chawwit
            </span>
          </button>

          {/* Interactive Location Picker */}
          <div className="relative hidden xl:block" ref={zoneRef}>
            <button
              type="button"
              onClick={() => setZoneDropdownOpen((v) => !v)}
              className="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-space-md py-space-xs rounded-full text-on-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                location_on
              </span>
              <div className="flex flex-col text-left">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Delivering to
                </span>
                <span className="text-label-md text-on-surface whitespace-nowrap">
                  {selectedZone.name}
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-space-xs">
                expand_more
              </span>
            </button>

            {zoneDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_-8px_rgba(31,25,22,0.14)] border border-outline-variant/40 p-2 z-50">
                <div className="px-3 py-2 border-b border-outline-variant/25">
                  <span className="text-label-sm uppercase tracking-wider text-primary">
                    Select Lagos Delivery Zone
                  </span>
                </div>
                <div className="flex flex-col gap-1 mt-1">
                  {zones.map((zone) => {
                    const isSelected = zone.id === selectedZone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => {
                          onSelectZone(zone);
                          setZoneDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-surface-container-low text-on-surface'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-label-md font-bold">{zone.name}</span>
                          <span className="text-body-sm text-on-surface-variant">{zone.hub}</span>
                        </div>
                        <span className="text-label-sm bg-surface-container-high text-on-surface px-2 py-1 rounded-full tabular-price whitespace-nowrap">
                          ~{zone.avgMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-space-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.route;
            return (
              <button
                key={item.route}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.route)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container text-label-lg font-bold rounded-lg px-space-md py-1.5'
                    : 'text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60 px-space-sm py-1.5 rounded-lg'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {hasActiveOrder && (
            <button
              type="button"
              onClick={() => onNavigate(ScreenRoute.TRACKING)}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeScreen === ScreenRoute.TRACKING
                  ? 'bg-tertiary text-on-tertiary text-label-md font-bold rounded-lg px-space-md py-1.5'
                  : 'text-label-md text-tertiary bg-tertiary/10 hover:bg-tertiary/15 px-space-sm py-1.5 rounded-lg font-bold'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">moped</span>
              <span>Track Order</span>
            </button>
          )}
        </nav>

        {/* Right: Search + Bag + Profile */}
        <div className="flex items-center gap-space-sm md:gap-space-md shrink-0">
          {/* Interactive Search Input */}
          <div className="relative hidden md:flex items-center" ref={searchRef}>
            <span className="material-symbols-outlined absolute left-space-md text-on-surface-variant pointer-events-none text-[20px]">
              restaurant_menu
            </span>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  setSearchFocused(false);
                  onNavigate(ScreenRoute.SHOP);
                }
              }}
              placeholder="Search meals, cravings..."
              className="bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant pl-10 pr-8 py-2.5 rounded-lg w-48 xl:w-68 text-body-sm border border-outline-variant/35 shadow-[0_1px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}

            {/* Instant Search Results Popover */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-88 bg-surface-container-lowest rounded-2xl shadow-[0_20px_40px_-8px_rgba(31,25,22,0.16)] border border-outline-variant/40 overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div className="p-2 flex flex-col gap-1">
                    {searchResults.map((dish) => (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => {
                          setSearchFocused(false);
                          onSelectDish(dish);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low text-left transition-colors cursor-pointer"
                      >
                        <SmartImage
                          src={dish.image}
                          alt={dish.imageAlt}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-label-md font-bold text-on-surface truncate">
                            {dish.name}
                          </p>
                          <p className="text-body-sm text-on-surface-variant truncate">
                            {dish.prepTime} • {dish.heatLevel}
                          </p>
                        </div>
                        <span className="text-label-md font-bold text-primary tabular-price shrink-0">
                          ${dish.priceUsd.toFixed(2)}
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        onNavigate(ScreenRoute.SHOP);
                      }}
                      className="mt-1 py-2 text-center text-label-md text-primary hover:bg-primary/5 rounded-xl font-bold cursor-pointer"
                    >
                      View all results in Catalogue →
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-body-sm text-on-surface-variant">
                    No dishes matching &ldquo;{searchQuery}&rdquo;. Try &ldquo;Jollof&rdquo;, &ldquo;Suya&rdquo;, or &ldquo;Wings&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bag CTA */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-2.5 rounded-xl shadow-[0_4px_16px_-2px_rgba(31,25,22,0.12)] hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-98 cursor-pointer whitespace-nowrap tabular-price"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="text-label-md font-semibold">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} • ${cartSubtotalUsd.toFixed(2)}
            </span>
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={() => onNavigate(ScreenRoute.PROFILE)}
            title="Your Foodie Profile"
            className={`flex items-center rounded-full p-0.5 transition-all cursor-pointer ${
              activeScreen === ScreenRoute.PROFILE
                ? 'ring-2 ring-primary'
                : 'hover:ring-2 hover:ring-primary/50'
            }`}
          >
            <SmartImage
              src={userAvatar}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 px-margin-mobile py-space-md shadow-xl flex flex-col gap-space-md">
          {/* Mobile Search */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMobileMenuOpen(false);
                  onNavigate(ScreenRoute.SHOP);
                }
              }}
              placeholder="Search firewood jollof, suya, wings..."
              className="w-full bg-surface-container-low text-on-surface pl-10 pr-4 py-2.5 rounded-xl text-body-md border border-outline-variant/40 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => {
                    onNavigate(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-left text-label-lg cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                onNavigate(ScreenRoute.TRACKING);
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl text-left text-label-lg bg-tertiary/10 text-tertiary font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">moped</span>
              Live Order
            </button>
          </div>

          {/* Mobile Delivery Zone Selector */}
          <div className="pt-2 border-t border-outline-variant/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">
                location_on
              </span>
              <span className="text-label-md text-on-surface">{selectedZone.name}</span>
            </div>
            <select
              aria-label="Delivery zone"
              value={selectedZone.id}
              onChange={(e) => {
                const found = zones.find((z) => z.id === e.target.value);
                if (found) onSelectZone(found);
              }}
              className="bg-surface-container-high text-on-surface text-label-sm px-3 py-1.5 rounded-lg"
            >
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
