'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Plus,
  Minus,
  Navigation,
  Car,
  Package,
  Bus,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { InnerPageHero } from '@/components/layout/InnerPageHero';
import { SITE_CONFIG, BUSINESS_CONFIG, WHATSAPP_CONFIG, createWhatsAppLink } from '@/lib/data/site-config';
import { WhatsAppIcon } from '@/components/whatsapp/FloatingWhatsApp';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ fullName: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const contactFaqs = [
    { q: 'What are your store timings?', a: 'Our store is open daily from 8:00 AM to 8:00 PM.' },
    { q: 'Do you offer home delivery?', a: 'Yes! We deliver across India with doorstep delivery options for all hardware, tools and building supplies.' },
    { q: 'How can I track my order?', a: 'Registered users can view real-time tracking in their customer Account dashboard.' },
    { q: 'What is your return policy?', a: 'We offer a 7-day hassle-free return policy for unused items in original packaging.' },
    { q: 'Do you provide installation services?', a: 'Yes, expert installation assistance is available for select sanitaryware, faucets and electrical fixtures.' },
    { q: 'Can I get bulk order pricing?', a: 'Absolutely. We offer dedicated trade accounts and bulk wholesale rates for contractors and builders.' },
    { q: 'How can I reach customer support?', a: 'You can email us directly at akhardware@gmail.com / info@akhardware.com or call 7484034410.' },
  ];

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-14">
      {/* 1. CONTACT HERO HEADER (OPEN EDITORIAL COMPOSITION) */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
        eyebrow="CONTACT AK HARDWARE"
        title="Let’s Talk About Your Next Project"
        description="Have a product question, need help finding the right hardware, or want to visit us? Get in touch with AK Hardware."
        primaryCta={{
          label: 'Send Message',
          href: '#contact-form',
        }}
        secondaryCta={{
          label: 'Call Support',
          href: 'tel:+917484034410',
        }}
        imageSrc="/assets/hero/contact.png"
        imageAlt="AK Hardware Store & Customer Support"
        imageObjectFit="cover"
      />

      {/* 2. MAIN CONTACT SECTION GRID */}
      <Container className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN (7 COLS): INFO CARDS & MAP */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* 4 CONTACT INFORMATION CARDS */}
            <div>
              <h2 className="text-xl font-extrabold text-[#0C1E38] mb-1">Contact Information</h2>
              <p className="text-xs text-slate-500 font-normal mb-5">
                Reach out to us through any of these channels. We&apos;d love to hear from you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CALL US */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EC] text-[#FA3A08] flex items-center justify-center mb-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0C1E38] text-sm mb-1">Call Us</h3>
                  <a
                    href={SITE_CONFIG.telLink}
                    className="text-sm font-extrabold text-[#0C1E38] hover:text-[#FA3A08] transition-colors mb-2"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-auto">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{SITE_CONFIG.workingHours}</span>
                  </p>
                </div>

                {/* EMAIL US */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F1FD] text-[#1B4E9B] flex items-center justify-center mb-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0C1E38] text-sm mb-1">Email Us</h3>
                  <a
                    href="mailto:akhardware@gmail.com"
                    className="text-xs font-bold text-[#1B4E9B] hover:underline"
                  >
                    akhardware@gmail.com
                  </a>
                  <a
                    href="mailto:info@akhardware.com"
                    className="text-xs font-bold text-[#1B4E9B] hover:underline mb-2"
                  >
                    info@akhardware.com
                  </a>
                  <p className="text-[11px] text-slate-400 font-normal mt-auto">
                    Typically responds within 24 hours
                  </p>
                </div>

                {/* VISIT OUR STORE */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-start shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EAFBF0] text-[#00A23A] flex items-center justify-center mb-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0C1E38] text-sm mb-1">Visit Our Store</h3>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed mb-3">
                    {SITE_CONFIG.address}
                  </p>
                  <p className="text-[11px] text-slate-400 font-normal mt-auto">
                    {SITE_CONFIG.workingHours}
                  </p>
                </div>

                {/* WHATSAPP SUPPORT */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col items-start shadow-2xs justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#25D366] flex items-center justify-center mb-3 border border-[#25D366]/20">
                      <WhatsAppIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-extrabold text-[#0C1E38] text-sm mb-1">Chat on WhatsApp</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Direct WhatsApp support for product questions, availability &amp; orders ({WHATSAPP_CONFIG.displayPhone}).
                    </p>
                  </div>
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs py-2.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Chat on WhatsApp ({WHATSAPP_CONFIG.displayPhone})</span>
                  </a>
                </div>
              </div>
            </div>

            {/* MAP & STORE LOCATION CARD */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-4 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-[#0C1E38] text-base mb-1">Our Location</h3>
                <p className="text-xs text-slate-500">Visit our store in Muzaffarpur, Bihar for a wide range of hardware products.</p>
              </div>

              {/* OFFICIAL GOOGLE MAPS EMBED IFRAME */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  title="AK Hardware Location Map"
                  src={SITE_CONFIG.mapEmbedIframeUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0 rounded-xl"
                />

                {/* OVERLAY MAP CARD */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200 shadow-md max-w-xs text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FA3A08] animate-pulse" />
                    <span className="font-extrabold text-[#0C1E38]">{SITE_CONFIG.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug mb-1">
                    {SITE_CONFIG.address}
                  </p>
                  <span className="inline-block text-[10px] text-emerald-700 font-bold">
                    ● Open Daily · {SITE_CONFIG.workingHours}
                  </span>
                </div>
              </div>

              {/* MAP FEATURE PILLS STRIP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="bg-[#FAFCFF] border border-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-[#1B4E9B]" />
                  <div>
                    <span className="font-bold text-[#0C1E38] block text-[11px]">Prime Location</span>
                    <span className="text-[10px] text-slate-400">Muzaffarpur, Bihar</span>
                  </div>
                </div>

                <div className="bg-[#FAFCFF] border border-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                  <Car className="h-4 w-4 text-[#1B4E9B]" />
                  <div>
                    <span className="font-bold text-[#0C1E38] block text-[11px]">Free Parking</span>
                    <span className="text-[10px] text-slate-400">For Store Visitors</span>
                  </div>
                </div>

                <div className="bg-[#FAFCFF] border border-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#1B4E9B]" />
                  <div>
                    <span className="font-bold text-[#0C1E38] block text-[11px]">10,000+ Items</span>
                    <span className="text-[10px] text-slate-400">In Stock</span>
                  </div>
                </div>

                <div className="bg-[#FAFCFF] border border-slate-100 p-2.5 rounded-xl flex items-center gap-2">
                  <Bus className="h-4 w-4 text-[#1B4E9B]" />
                  <div>
                    <span className="font-bold text-[#0C1E38] block text-[11px]">Easy Transport</span>
                    <span className="text-[10px] text-slate-400">Accessible Location</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN (5 COLS): MESSAGE FORM & FAQ */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* SEND US A MESSAGE FORM */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <h2 className="text-xl font-extrabold text-[#0C1E38] mb-1">Send Us a Message</h2>
              <p className="text-xs text-slate-500 mb-5">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs">
                {/* FULL NAME */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#0C1E38]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B4E9B]"
                  />
                </div>

                {/* EMAIL ADDRESS */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#0C1E38]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B4E9B]"
                  />
                </div>

                {/* PHONE NUMBER & SUBJECT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#0C1E38]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="7484034410"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B4E9B]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#0C1E38]">Subject *</label>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full h-9 bg-slate-50 border border-slate-200 rounded-md px-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1B4E9B]"
                    >
                      <option value="">Select a subject ▾</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Tracking &amp; Delivery</option>
                      <option value="bulk">Bulk / Trade Order Quote</option>
                      <option value="support">Product Technical Support</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#0C1E38]">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your message here..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1B4E9B]"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-[#FA3A08] hover:bg-[#E03000] text-white font-bold text-xs py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-2xs mt-1"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message →</span>
                </button>

                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Thank you! Your message has been sent successfully. We will contact you shortly.</span>
                  </div>
                )}
              </form>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS WIDGET */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <h3 className="font-extrabold text-[#0C1E38] text-base">Frequently Asked Questions</h3>
                <Link href="/#faq" className="text-xs font-semibold text-[#1B4E9B] hover:underline">
                  View All FAQs →
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {contactFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border-b border-slate-100 last:border-0 pb-2">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full py-2 text-left flex items-center justify-between gap-3 text-xs font-bold text-[#0C1E38] hover:text-[#1B4E9B] transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <Minus className="h-3.5 w-3.5 text-[#FA3A08]" /> : <Plus className="h-3.5 w-3.5 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <p className="text-[11px] text-slate-600 font-normal leading-relaxed pt-1 pb-2">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </Container>
    </div>
  );
}
