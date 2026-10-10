export const SITE_CONFIG = {
  name: 'AK Hardware',
  tagline: 'Har Kaam, Ek Hi Naam',
  description: 'Your trusted store for sanitary items, pipes & fittings, hardware tools, tiles, paint, and electrical items.',
  phone: '7484034410',
  formattedPhone: '7484034410',
  telLink: 'tel:+917484034410',
  email: 'akhardware@gmail.com',
  secondaryEmail: 'info@akhardware.com',
  emails: ['akhardware@gmail.com', 'info@akhardware.com'],
  address: 'Dhiranpatti Chowk, Markan - Muzaffarpur Rd, near Shyam Nandan Sahaye College, Narayanpur Anant, Sherpur, Muzaffarpur, Bihar 842005',
  workingHours: '8:00 AM – 8:00 PM',
  openingHours: {
    label: '8:00 AM – 8:00 PM',
    opens: '08:00',
    closes: '20:00',
  },
  gstNumber: '10GBVPP8578J1ZO',
  gstin: 'GST No: 10GBVPP8578J1ZO',
  announcementText: 'GST No: 10GBVPP8578J1ZO',
  announcementPromo: 'Free Shipping on Orders Above ₹2,499',
  mapEmbedIframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.032161727664!2d85.41597647542606!3d26.097868794632674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed11c7c3bc756f%3A0x6deb6cb215eef2a8!2sAK%20Hardware!5e0!3m2!1sen!2sin!4v1790704024798!5m2!1sen!2sin',
  whatsapp: {
    phone: '917484034410',
    displayPhone: '7484034410',
    formattedPhone: '+91 7484034410',
  },
};

export const WHATSAPP_CONFIG = {
  phone: '917484034410',
  displayPhone: '7484034410',
  formattedPhone: '+91 7484034410',
  defaultLink: 'https://wa.me/917484034410',
};

export interface WhatsAppQuickMessage {
  id: string;
  label: string;
  message: string;
}

export const WHATSAPP_QUICK_MESSAGES: WhatsAppQuickMessage[] = [
  {
    id: 'product-inquiry',
    label: 'Product Inquiry',
    message: 'Hi AK Hardware, I would like to know more about a product.',
  },
  {
    id: 'availability',
    label: 'Product Availability',
    message: 'Hi AK Hardware, I want to check the availability of a product.',
  },
  {
    id: 'order-help',
    label: 'Order Help',
    message: 'Hi AK Hardware, I need help regarding my order.',
  },
  {
    id: 'bulk-requirement',
    label: 'Bulk / Project Requirement',
    message: 'Hi AK Hardware, I have a bulk or project requirement. Please assist me.',
  },
  {
    id: 'general-inquiry',
    label: 'General Inquiry',
    message: 'Hi AK Hardware, I have a general inquiry. Please help me.',
  },
];

export function createWhatsAppLink(message?: string): string {
  const cleanPhone = WHATSAPP_CONFIG.phone.replace(/\D/g, '');
  if (!message || !message.trim()) {
    return `https://wa.me/${cleanPhone}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

export const BUSINESS_CONFIG = {
  name: SITE_CONFIG.name,
  address: {
    full: SITE_CONFIG.address,
    street: 'Dhiranpatti Chowk, Markan - Muzaffarpur Rd',
    landmark: 'near Shyam Nandan Sahaye College',
    locality: 'Narayanpur Anant, Sherpur',
    city: 'Muzaffarpur',
    state: 'Bihar',
    pincode: '842005',
  },
  phone: SITE_CONFIG.phone,
  telLink: SITE_CONFIG.telLink,
  emails: SITE_CONFIG.emails,
  openingHours: SITE_CONFIG.openingHours,
  mapEmbedUrl: SITE_CONFIG.mapEmbedIframeUrl,
};

export const COLOR_TOKENS = {
  navy: '#012157',
  royalBlue: '#014A94',
  brightBlue: '#0088E8',
  primaryOrange: '#FA3A08',
  goldenOrange: '#F9970A',
  yellowAccent: '#FFB800',
  greenAccent: '#00A23A',
  background: '#F7F8FA',
  textMain: '#111827',
  textMuted: '#6B7280',
  border: '#E5E7EB',
};

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Categories', href: '/categories' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Our Partners', href: '/our-partners' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blogs', href: '/blog' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Our Partners', href: '/our-partners' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return & Refund Policy', href: '/refund-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'Youtube' },
];

export const PAYMENT_METHODS = [
  { id: 'visa', name: 'Visa', logoText: 'VISA' },
  { id: 'mastercard', name: 'Mastercard', logoText: 'Mastercard' },
  { id: 'rupay', name: 'RuPay', logoText: 'RuPay' },
  { id: 'paytm', name: 'Paytm', logoText: 'Paytm' },
  { id: 'phonepe', name: 'PhonePe', logoText: 'PhonePe' },
  { id: 'gpay', name: 'Google Pay', logoText: 'Google Pay' },
  { id: 'cred', name: 'CRED Pay', logoText: 'CRED' },
  { id: 'amazonpay', name: 'Amazon Pay', logoText: 'Amazon Pay' },
];
