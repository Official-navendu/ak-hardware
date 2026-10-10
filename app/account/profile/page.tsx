'use client';

import React, { useState, useEffect } from 'react';
import { User, Lock, Save, X, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/lib/context/user-context';
import { useToast } from '@/lib/context/toast-context';

export default function ProfilePage() {
  const { user, updateProfile, changePassword } = useUser();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    companyGst: user.companyGst || '',
  });

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      companyGst: user.companyGst || '',
    });
  }, [user]);

  const validateProfile = (): boolean => {
    const errs: Record<string, string> = {};
    if (!profileData.firstName.trim()) errs.firstName = 'First name is required';
    if (!profileData.lastName.trim()) errs.lastName = 'Last name is required';

    if (!profileData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!profileData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (profileData.phone.trim().replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) {
      toast.error('Please check the highlighted fields');
      return;
    }

    updateProfile({
      firstName: profileData.firstName.trim(),
      lastName: profileData.lastName.trim(),
      email: profileData.email.trim(),
      phone: profileData.phone.trim(),
      companyGst: profileData.companyGst.trim(),
    });

    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancelProfile = () => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      companyGst: user.companyGst || '',
    });
    setProfileErrors({});
    setIsEditing(false);
  };

  const validatePassword = (): boolean => {
    const errs: Record<string, string> = {};
    if (!passwordData.currentPassword) errs.currentPassword = 'Current password is required';

    if (!passwordData.newPassword) {
      errs.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errs.newPassword = 'Password must be at least 6 characters';
    }

    if (passwordData.confirmPassword !== passwordData.newPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) {
      toast.error('Please check the password fields');
      return;
    }

    changePassword(passwordData.currentPassword, passwordData.newPassword);
    toast.success('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({});
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="Account Details &amp; Security"
        subtitle="Manage your contact information, GSTIN preferences and security password."
        badge="Account Details"
      />

      {/* PERSONAL INFORMATION FORM */}
      <form onSubmit={handleProfileSubmit} className="bg-white border border-border rounded-brand-lg p-6 shadow-subtle flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h4 className="font-extrabold text-[#0C1E38] text-sm flex items-center gap-2">
            <User className="h-4 w-4 text-[#014A94]" />
            <span>Personal Information</span>
          </h4>
          {!isEditing && (
            <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name *"
            value={profileData.firstName}
            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
            disabled={!isEditing}
            error={profileErrors.firstName}
          />
          <Input
            label="Last Name *"
            value={profileData.lastName}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
            disabled={!isEditing}
            error={profileErrors.lastName}
          />
          <Input
            label="Email Address *"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            disabled={!isEditing}
            error={profileErrors.email}
          />
          <Input
            label="Phone Number *"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            disabled={!isEditing}
            error={profileErrors.phone}
          />
          <div className="sm:col-span-2">
            <Input
              label="Company / GSTIN Number (Optional)"
              placeholder="e.g. 10GBVPP8578J1ZO"
              value={profileData.companyGst}
              onChange={(e) => setProfileData({ ...profileData, companyGst: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border-light">
            <Button type="button" variant="secondary" size="sm" onClick={handleCancelProfile} leftIcon={<X className="h-4 w-4" />}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="h-4 w-4" />}>
              Save Changes
            </Button>
          </div>
        )}
      </form>

      {/* CHANGE PASSWORD FORM */}
      <form onSubmit={handlePasswordSubmit} className="bg-white border border-border rounded-brand-lg p-6 shadow-subtle flex flex-col gap-6">
        <h4 className="font-extrabold text-[#0C1E38] text-sm border-b border-border pb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#014A94]" />
          <span>Change Password</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Current Password *"
            type="password"
            placeholder="••••••••"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            error={passwordErrors.currentPassword}
          />
          <Input
            label="New Password *"
            type="password"
            placeholder="••••••••"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            error={passwordErrors.newPassword}
          />
          <Input
            label="Confirm New Password *"
            type="password"
            placeholder="••••••••"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            error={passwordErrors.confirmPassword}
          />
        </div>

        <div className="flex items-center justify-end pt-2">
          <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="h-4 w-4" />}>
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
