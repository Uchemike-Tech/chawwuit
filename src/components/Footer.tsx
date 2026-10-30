import React, { useState } from 'react';
import { BRAND_IMAGES } from '../data/menuData';
import { CategoryId, ScreenRoute } from '../types';
import { SmartImage } from './SmartImage';

interface FooterProps {
  onNavigate: (screen: ScreenRoute) => void;
  onSelectCategoryInShop: (category: CategoryId) => void;
  onShowToast: (message: string) => void;
}

type LegalTopic = 'privacy' | 'terms' | 'faq' | null;

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategoryInShop,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalTopic>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      onShowToast('Please enter a valid email address to join the flavor loop.');
      return;
    }
    setSubscribed(true);
    setEmail('');
    onShowToast('Subscribed! Watch your inbox for secret hearth menu drops & 20% vouchers.');
  };

  const handleShareLink = (label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    onShowToast(`${label} link copied — share Chawwit with your squad!`);
  };

  return (
    <>
      <footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg border-t border-outline-variant/25 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter pb-space-xl">
            {/* Brand + Newsletter */}
            <div className="lg:col-span-2 flex flex-col gap-space-md pr-0 lg:pr-space-lg">
              <button
                type="button"
                onClick={() => onNavigate(ScreenRoute.HOME)}
                className="flex items-center gap-space-sm w-fit cursor-pointer"
              >
                <SmartImage
                  src={BRAND_IMAGES.logo}
                  alt="Chawwit official brand logo"
                  className="h-8 w-8 rounded-md object-contain"
                />
                <span className="text-headline-sm font-bold text-primary tracking-tight">
                  Chawwit
                </span>
              </button>
              <p className="text-body-md text-on-surface-variant max-w-sm">
                Artisanal culinary craft and vibrant street food culture delivered fresh to your
                doorstep. Satisfying cravings with warm hospitality and flavor-first dishes.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-space-xs mt-space-sm">
                <span className="text-label-sm text-on-surface uppercase tracking-wider">
                  Stay in the flavor loop
                </span>
                {subscribed ? (
                  <div className="flex items-center gap-2 bg-tertiary/10 text-tertiary px-space-md py-2.5 rounded-xl text-label-md max-w-md">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>You&apos;re on the VIP Hearth List!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-space-xs max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant px-space-md py-2.5 rounded-lg flex-1 text-body-sm border border-outline-variant/35 shadow-[0_1px_4px_rgba(0,0,0,0.03)] focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="bg-primary text-on-primary px-space-md py-2.5 rounded-lg text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-space-sm">
              <span className="text-headline-sm font-bold text-on-surface">Quick Links</span>
              <ul className="flex flex-col gap-space-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.SHOP)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Full Catalog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.DEALS)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Daily Specials &amp; Deals
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.ABOUT)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Our Kitchen &amp; Story
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.CONTACT)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Customer Support
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.TRACKING)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Track Live Order
                  </button>
                </li>
              </ul>
            </div>

            {/* Food Categories */}
            <div className="flex flex-col gap-space-sm">
              <span className="text-headline-sm font-bold text-on-surface">Food Categories</span>
              <ul className="flex flex-col gap-space-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryInShop(CategoryId.FLAME_GRILLS)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Flame Grilled Bowls
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryInShop(CategoryId.STREET_BITES)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Artisan Street Bites
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryInShop(CategoryId.MEAL_COMBOS)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Smokey Jollof Combos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryInShop(CategoryId.SIGNATURE_BOWLS)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Vegan &amp; Plant-Based
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectCategoryInShop(CategoryId.SWEET_TREATS)}
                    className="text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  >
                    Craft Refreshers &amp; Desserts
                  </button>
                </li>
              </ul>
            </div>

            {/* Secure Payments & Social */}
            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-space-sm">
                <span className="text-headline-sm font-bold text-on-surface">Secure Payments</span>
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="bg-surface-container-lowest px-space-md py-1.5 rounded-lg text-label-md text-on-surface border border-outline-variant/30 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">
                      verified
                    </span>
                    Paystack
                  </span>
                  <span className="bg-surface-container-lowest px-space-md py-1.5 rounded-lg text-label-md text-on-surface border border-outline-variant/30 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      lock
                    </span>
                    Flutterwave
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <span className="text-label-md text-on-surface">Follow Our Flavors</span>
                <div className="flex items-center gap-space-sm">
                  <button
                    type="button"
                    onClick={() => handleShareLink('Chawwit storefront')}
                    aria-label="Share Chawwit"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShareLink('Chawwit Instagram')}
                    aria-label="Chawwit food gallery"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(ScreenRoute.CONTACT)}
                    aria-label="Contact kitchen concierge"
                    className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Row */}
          <div className="pt-space-lg border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md">
            <p className="text-body-sm text-on-surface-variant">
              © 2025 Chawwit Food Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-space-lg">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('faq')}
                className="text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Delivery FAQs
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Clean Info Modal for Privacy / Terms / FAQs */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-lg shadow-2xl border border-outline-variant/30 flex flex-col gap-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-headline-md font-bold text-on-surface">
                {legalModal === 'privacy' && 'Privacy & Data Protection'}
                {legalModal === 'terms' && 'Terms of Culinary Service'}
                {legalModal === 'faq' && '30-Minute Hot Delivery FAQs'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {legalModal === 'privacy' && (
              <div className="text-body-md text-on-surface-variant flex flex-col gap-3">
                <p>
                  Chawwit Food Technologies Inc. uses your delivery coordinates, phone contact, and
                  dietary preferences solely to prepare and dispatch your meals accurately.
                </p>
                <p>
                  All card transactions are tokenized end-to-end through PCI-DSS Level 1 certified
                  gateways (Paystack &amp; Flutterwave). We never sell or share diner data with
                  third-party brokers.
                </p>
              </div>
            )}

            {legalModal === 'terms' && (
              <div className="text-body-md text-on-surface-variant flex flex-col gap-3">
                <p>
                  Every Chawwit dish is cooked live over seasoned hardwood coals once your order is
                  confirmed. Modifications can be made within 2 minutes of checkout before searing
                  begins.
                </p>
                <p>
                  Our <strong>30 Mins or It&apos;s Free</strong> guarantee applies to standard zones
                  within 6km of our Victoria Island and Ikeja GRA kitchens on orders under $80.
                </p>
              </div>
            )}

            {legalModal === 'faq' && (
              <div className="text-body-md text-on-surface-variant flex flex-col gap-3">
                <div>
                  <strong className="text-on-surface block">How does the food stay steaming hot?</strong>
                  Every platter is sealed inside vented foil-lined eco-packs and carried in
                  active-thermal courier bags rated to hold 68°C+ for 45 minutes.
                </div>
                <div>
                  <strong className="text-on-surface block">Are all meats 100% Halal?</strong>
                  Yes. Every beef, lamb, and poultry supplier in our Lagos farm network is
                  independently Halal-audited weekly.
                </div>
                <div>
                  <strong className="text-on-surface block">Can I order for an office team?</strong>
                  Absolutely! Visit Customer Support or choose our Chaw Squad Feast Boxes for
                  groups of 4 to 50+.
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="self-end bg-primary text-on-primary px-space-lg py-2.5 rounded-xl text-label-md cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
