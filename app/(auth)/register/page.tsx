'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { useUser } from '@/lib/context/user-context';
import { useToast } from '@/lib/context/toast-context';

export default function RegisterPage() {
  const router = useRouter();
  const { updateProfile, login } = useUser();
  const toast = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required.';
    if (!lastName.trim()) errs.lastName = 'Last name is required.';

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phone.trim().replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    }

    if (confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please check the highlighted fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      login();
      toast.success('Account created successfully');
      router.push('/account');
    }, 700);
  };

  return (
    <div className="h-[100svh] min-h-[100svh] w-full flex overflow-hidden bg-[#F7F8FA]">
      
      {/* LEFT 50% — REGISTER FORM PANEL */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 overflow-y-auto bg-[#F7F8FA]">
        <div className="w-full max-w-[440px] mx-auto flex flex-col gap-3 text-xs animate-in fade-in slide-in-from-left-4 duration-300">
          
          {/* AK HARDWARE LOGO */}
          <div className="flex flex-col items-center mb-0.5">
            <Logo variant="full" size="sm" href="/" />
          </div>

          {/* CARD HEADER */}
          <div className="text-center flex flex-col items-center gap-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Create an account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-0.5">
            {/* FIRST NAME & LAST NAME GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label htmlFor="reg-firstname" className="font-semibold text-[#374151] text-xs">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <User className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="reg-firstname"
                    type="text"
                    autoComplete="given-name"
                    required
                    placeholder="Rajesh"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                    }}
                    className={`w-full h-11 bg-white border ${
                      errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                    } rounded-lg pl-10 pr-3 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.firstName && (
                  <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.firstName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="reg-lastname" className="font-semibold text-[#374151] text-xs">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <User className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="reg-lastname"
                    type="text"
                    autoComplete="family-name"
                    required
                    placeholder="Sharma"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
                    }}
                    className={`w-full h-11 bg-white border ${
                      errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                    } rounded-lg pl-10 pr-3 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {errors.lastName && (
                  <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* EMAIL ADDRESS */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-email" className="font-semibold text-[#374151] text-xs">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="reg-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full h-11 bg-white border ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                  } rounded-lg pl-10 pr-4 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                />
              </div>
              {errors.email && (
                <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.email}
                </span>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-phone" className="font-semibold text-[#374151] text-xs">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="reg-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="7484034410"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full h-11 bg-white border ${
                    errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                  } rounded-lg pl-10 pr-4 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                />
              </div>
              {errors.phone && (
                <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.phone}
                </span>
              )}
            </div>

            {/* PASSWORD WITH INDEPENDENT EYE 1 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="reg-password" className="font-semibold text-[#374151] text-xs">
                  Password
                </label>
                <span className="text-[10px] text-slate-400 font-normal">At least 8 characters</span>
              </div>
              <div className="relative flex items-center">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className={`w-full h-11 bg-white border ${
                    errors.password ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                  } rounded-lg pl-10 pr-12 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 h-9 w-9 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg focus:outline-none focus:bg-slate-100 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.password}
                </span>
              )}
            </div>

            {/* CONFIRM PASSWORD WITH INDEPENDENT EYE 2 */}
            <div className="flex flex-col gap-1">
              <label htmlFor="reg-confirm-password" className="font-semibold text-[#374151] text-xs">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={`w-full h-11 bg-white border ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                  } rounded-lg pl-10 pr-12 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute right-2.5 h-9 w-9 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg focus:outline-none focus:bg-slate-100 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" /> {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* PRIMARY CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 sm:h-12 bg-[#FA3A08] hover:bg-[#d92e00] text-white font-semibold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#FA3A08]/30 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>

            {/* DIVIDER */}
            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-[#F7F8FA] px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
                OR
              </span>
            </div>

            {/* GOOGLE SIGN IN BUTTON */}
            <GoogleSignInButton text="Continue with Google" />
          </form>

          {/* BOTTOM NAVIGATION LINK */}
          <div className="text-center text-xs text-slate-600 font-medium pt-0.5">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#FA3A08] hover:underline transition-colors ml-1">
              Sign in
            </Link>
          </div>

        </div>
      </div>

      {/* RIGHT 50% — PREMIUM VISUAL IMAGE PANEL */}
      <div className="hidden lg:block w-1/2 h-full relative overflow-hidden bg-[#012157]">
        <Image
          src="/assets/hero/shop-hero-banner.jpg"
          alt="AK Hardware Tools & Supplies Showcase"
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="50vw"
        />
        {/* SUBTLE DEEP NAVY OVERLAY TINT (rgba(1, 33, 87, 0.20)) */}
        <div className="absolute inset-0 bg-[#012157]/20 pointer-events-none" />
      </div>

    </div>
  );
}
