'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useUser, SavedAddress } from '@/lib/context/user-context';
import { useToast } from '@/lib/context/toast-context';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUser();
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setFormData({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      isDefault: addresses.length === 0,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleOpenEditModal = (addr: SavedAddress) => {
    setEditingAddress(addr);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      isDefault: addr.isDefault,
    });
    setErrors({});
    setModalOpen(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.street.trim()) newErrors.street = 'Street / site address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please check the highlighted fields');
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
      toast.success('Address updated successfully');
    } else {
      addAddress(formData);
      toast.success('Address added successfully');
    }

    setModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    toast.success('Default address updated');
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deleteAddress(deleteId);
    toast.success('Address removed successfully');
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-border rounded-brand p-5 shadow-subtle">
        <SectionHeading
          title="Saved Delivery Addresses"
          subtitle="Manage delivery addresses for your home, job sites, and contractor offices."
          badge="Addresses"
        />
        <Button variant="accent" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={handleOpenAddModal}>
          Add New Address
        </Button>
      </div>

      {/* ADDRESSES GRID */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-brand border border-dashed border-slate-200 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <MapPin className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-[#0C1E38] text-sm">No saved addresses</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            Add a delivery address for a faster checkout when ordering hardware supplies.
          </p>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={handleOpenAddModal}>
            Add Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white border rounded-brand-lg p-5 flex flex-col justify-between shadow-subtle gap-4 transition-all ${
                addr.isDefault ? 'border-[#014A94] ring-1 ring-[#014A94]/20' : 'border-border'
              }`}
            >
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border-light">
                  <div className="flex items-center gap-1.5 font-bold text-[#0C1E38] text-sm">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span>{addr.fullName}</span>
                  </div>
                  {addr.isDefault ? (
                    <Badge variant="primary" size="sm" className="bg-[#014A94]">
                      Default Address
                    </Badge>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[11px] font-bold text-[#014A94] hover:underline"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <p className="text-text-secondary leading-relaxed pt-1">{addr.street}</p>
                <p className="text-text-secondary font-medium">
                  {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p className="text-text-muted font-mono mt-1 text-[11px]">Phone: {addr.phone}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border-light">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Edit2 className="h-3.5 w-3.5" />}
                    onClick={() => handleOpenEditModal(addr)}
                  >
                    Edit
                  </Button>
                  {!addr.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteId(addr.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  )}
                </div>
                {addr.isDefault && (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Selected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT ADDRESS MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAddress ? 'Edit Delivery Address' : 'Add New Delivery Address'}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingAddress ? 'Save Changes' : 'Add Address'}
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <Input
              label="Full Name *"
              placeholder="e.g. Rajesh Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={errors.fullName}
            />
          </div>
          <div>
            <Input
              label="Phone Number *"
              placeholder="e.g. 7484034410"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="Street / Site Address *"
              placeholder="Plot / House / Sector / Landmark"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              error={errors.street}
            />
          </div>
          <div>
            <Input
              label="City *"
              placeholder="e.g. Muzaffarpur"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              error={errors.city}
            />
          </div>
          <div>
            <Input
              label="State *"
              placeholder="e.g. Bihar"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              error={errors.state}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label="PIN Code *"
              placeholder="e.g. 842005"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              error={errors.postalCode}
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="set-default-check"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="h-4 w-4 text-[#014A94] rounded border-border focus:ring-[#014A94]"
            />
            <label htmlFor="set-default-check" className="text-xs font-semibold text-[#0C1E38] cursor-pointer">
              Set as default shipping address
            </label>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Saved Address?"
        description="Are you sure you want to delete this delivery address? This action cannot be undone."
        confirmText="Delete Address"
        cancelText="Cancel"
        isDanger={true}
      />
    </div>
  );
}
