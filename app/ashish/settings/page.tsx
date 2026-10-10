'use client';

import React, { useState } from 'react';
import { Save, Store, Truck, ShieldCheck, Mail } from 'lucide-react';
import { useAdminContext } from '@/lib/context/admin-context';
import { AdminPageHeader } from '@/components/admin/ui/AdminPageHeader';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminToast } from '@/components/admin/ui/AdminToast';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminContext();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'shipping' | 'contacts'>('general');

  const [formData, setFormData] = useState({
    storeName: settings.storeName || 'AK Hardware',
    storeTagline: settings.storeTagline || 'Industrial & Domestic Hardware Supply',
    contactPhone: settings.contactPhone || '7484034410',
    contactEmail: settings.contactEmail || 'akhardware@gmail.com',
    secondaryEmail: 'info@akhardware.com',
    openingHours: '8:00 AM – 8:00 PM',
    address: 'Dhiranpatti Chowk, Markan - Muzaffarpur Rd, near Shyam Nandan Sahaye College, Narayanpur Anant, Sherpur, Muzaffarpur, Bihar 842005',
    freeShippingThreshold: settings.freeShippingThreshold || 999,
    defaultShippingCharge: settings.defaultShippingCharge || 99,
    taxRate: 18,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName: formData.storeName,
      storeTagline: formData.storeTagline,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      contactAddress: formData.address,
      freeShippingThreshold: Number(formData.freeShippingThreshold),
      defaultShippingCharge: Number(formData.defaultShippingCharge),
    });

    setToastMessage('Global store settings updated successfully.');
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* PAGE HEADER */}
      <AdminPageHeader
        title="Store Settings"
        description="Configure official business contact info, global shipping thresholds, and GST tax defaults."
        breadcrumbs={[{ label: 'System', href: '/ashish/settings' }, { label: 'Settings' }]}
      />

      {/* SETTINGS LAYOUT: LEFT TAB NAVIGATION (240px) / RIGHT FORMS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT TAB MENU */}
        <div className="md:col-span-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3.5 py-2.5 rounded-[7px] text-xs font-semibold transition-colors flex items-center gap-2.5 ${
              activeTab === 'general'
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white border border-border text-navy-900 hover:bg-slate-50'
            }`}
          >
            <Store className="h-4 w-4" />
            <span>General &amp; Store Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`w-full text-left px-3.5 py-2.5 rounded-[7px] text-xs font-semibold transition-colors flex items-center gap-2.5 ${
              activeTab === 'shipping'
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white border border-border text-navy-900 hover:bg-slate-50'
            }`}
          >
            <Truck className="h-4 w-4" />
            <span>Shipping &amp; Tax Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contacts')}
            className={`w-full text-left px-3.5 py-2.5 rounded-[7px] text-xs font-semibold transition-colors flex items-center gap-2.5 ${
              activeTab === 'contacts'
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white border border-border text-navy-900 hover:bg-slate-50'
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Official Business Contacts</span>
          </button>
        </div>

        {/* RIGHT ACTIVE SETTINGS PANEL */}
        <div className="md:col-span-9">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {activeTab === 'general' && (
              <AdminCard title="General Store Information" description="Primary store branding and tagline">
                <div className="flex flex-col gap-4 text-xs">
                  <Input
                    label="Store Name"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    required
                  />
                  <Input
                    label="Store Tagline"
                    value={formData.storeTagline}
                    onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
                  />
                  <Input
                    label="Opening Hours"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    required
                  />
                </div>
              </AdminCard>
            )}

            {activeTab === 'shipping' && (
              <AdminCard title="Shipping &amp; GST Defaults" description="Order shipping calculation rules">
                <div className="flex flex-col gap-4 text-xs">
                  <Input
                    label="Free Shipping Minimum Order Threshold (₹)"
                    type="number"
                    value={formData.freeShippingThreshold}
                    onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                    required
                  />
                  <Input
                    label="Default Flat Shipping Fee (₹)"
                    type="number"
                    value={formData.defaultShippingCharge}
                    onChange={(e) => setFormData({ ...formData, defaultShippingCharge: Number(e.target.value) })}
                    required
                  />
                  <Input
                    label="GST Tax Rate (%)"
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                    required
                  />
                </div>
              </AdminCard>
            )}

            {activeTab === 'contacts' && (
              <AdminCard title="Official Business Contact Details" description="Verified company details displayed on store invoices and footer">
                <div className="flex flex-col gap-4 text-xs">
                  <Input
                    label="Official Business Phone Number"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    required
                  />
                  <Input
                    label="Primary Support Email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    required
                  />
                  <Input
                    label="Secondary Email"
                    value={formData.secondaryEmail}
                    onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                  />
                  <Textarea
                    label="Full Store Business Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
              </AdminCard>
            )}

            <button
              type="submit"
              className="h-10 px-5 bg-navy-900 text-white rounded-[7px] text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center gap-2 w-fit shadow-xs"
            >
              <Save className="h-4 w-4 text-orange-brand" />
              <span>Save Configuration</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
