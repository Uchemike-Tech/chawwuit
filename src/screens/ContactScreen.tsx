import React, { useState } from 'react';

interface ContactScreenProps {
  onShowToast: (msg: string) => void;
}

const FAQS = [
  {
    q: "How does the '30 Mins or It's Free' delivery guarantee work?",
    a: 'If your thermal courier arrives more than 30 minutes after kitchen confirmation within our standard Victoria Island, Lekki Phase 1, Ikoyi, or Ikeja GRA zones, we automatically credit a 100% meal voucher to your Chawwit account.',
  },
  {
    q: 'Are vegan bowls cooked separately from meat grills?',
    a: 'Yes! Our Plant-Based Harvest Jollof Bowl, Peppered Dodo, and Oyster Mushroom Suya are prepared on dedicated plant-only grates with separate utensils.',
  },
  {
    q: 'Do you handle corporate lunches and product launch catering?',
    a: 'Every day! Use the inquiry form on this page to book team feasts from 10 to 200+ guests with custom labeled boxes, chafing setups, and dedicated courier vans.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'We accept local & international cards, instant bank transfer, and USSD via Paystack and Flutterwave, as well as contactless POS terminal on delivery.',
  },
];

export const ContactScreen: React.FC<ContactScreenProps> = ({ onShowToast }) => {
  const [topic, setTopic] = useState('Corporate / Team Catering');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `CHW-SUP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket(ticketId);
    onShowToast(`Request ${ticketId} received! Our Lagos concierge responds in under 10 mins.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-full min-h-screen bg-surface pb-space-xl">
      <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low border-b border-outline-variant/25">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <span className="text-label-sm text-primary uppercase tracking-widest font-bold">
            24/7 Diner Concierge &amp; Catering
          </span>
          <h1 className="text-headline-xl-mobile md:text-headline-xl font-bold text-on-surface">
            Need Help With an Order or Planning a Team Feast?
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl">
            Reach our live Lagos kitchen dispatch desk directly—no endless phone trees. Average
            concierge response time is 4 minutes during kitchen hours.
          </p>
        </div>
      </section>

      <section className="w-full px-margin-mobile md:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Contact / Catering Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-3xl border border-outline-variant/30 shadow-2xs">
            {submittedTicket ? (
              <div className="py-8 text-center flex flex-col items-center gap-space-md">
                <div className="w-16 h-16 rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[34px]">check_circle</span>
                </div>
                <h2 className="text-headline-md font-bold text-on-surface">
                  Ticket {submittedTicket} Dispatched!
                </h2>
                <p className="text-body-md text-on-surface-variant max-w-md">
                  Our Victoria Island &amp; Ikeja hospitality desk has received your message and
                  will follow up shortly via email or WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="bg-primary text-on-primary px-space-lg py-2.5 rounded-xl text-label-md font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                <h2 className="text-headline-md font-bold text-on-surface">
                  Message Kitchen Concierge
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md font-bold text-on-surface">Inquiry Topic</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Corporate / Team Catering',
                      'Live Order Assistance',
                      'Dietary & Halal Info',
                      'Partnership / Press',
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`px-3 py-2.5 rounded-xl text-label-md border text-left transition-all cursor-pointer ${
                          topic === t
                            ? 'bg-primary text-on-primary border-primary font-bold'
                            : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container-high'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-label-md font-bold text-on-surface">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Amina Mohammed"
                      className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-label-md font-bold text-on-surface"
                    >
                      Email or WhatsApp Number
                    </label>
                    <input
                      id="contact-email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amina@company.ng / +234..."
                      className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-msg" className="text-label-md font-bold text-on-surface">
                    Details (Order ID, Guest Count, or Delivery Notes)
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can make your feast unforgettable..."
                    className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary text-on-primary hover:bg-primary-container py-3.5 px-space-xl rounded-xl text-label-lg font-bold shadow-md w-fit flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Send to Kitchen Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Hub Info & FAQs */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="bg-surface-container-low p-space-lg rounded-3xl border border-outline-variant/25 flex flex-col gap-space-md">
              <h3 className="text-headline-sm font-bold text-on-surface">
                Direct Dispatch Hotlines
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">
                    storefront
                  </span>
                  <div>
                    <strong className="text-label-md text-on-surface block">
                      Island Hub (VI &amp; Lekki)
                    </strong>
                    <span className="text-body-sm text-on-surface-variant">
                      14 Adeola Odeku St, Victoria Island • +234 700 CHAWWIT
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                    outdoor_grill
                  </span>
                  <div>
                    <strong className="text-label-md text-on-surface block">
                      Mainland Hub (Ikeja GRA &amp; Yaba)
                    </strong>
                    <span className="text-body-sm text-on-surface-variant">
                      21 Isaac John St, Ikeja GRA • Daily 10:30 AM – 11:30 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable FAQs */}
            <div className="flex flex-col gap-space-sm">
              <h3 className="text-headline-sm font-bold text-on-surface">
                Frequently Asked Questions
              </h3>
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={item.q}
                    className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-label-md font-bold text-on-surface">{item.q}</span>
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                        {isOpen ? 'remove' : 'add'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-body-sm text-on-surface-variant leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
