'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { useUser } from '@/lib/context/user-context';
import { useToast } from '@/lib/context/toast-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Please enter your password.';
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
      login();
      toast.success('Signed in successfully');
      router.push('/account');
    }, 600);
  };

  return (
    <div className="h-[100svh] min-h-[100svh] w-full flex overflow-hidden bg-[#F7F8FA]">
      
      {/* LEFT 50% — PREMIUM VISUAL IMAGE PANEL */}
      <div className="hidden lg:block w-1/2 h-full relative overflow-hidden bg-[#012157]">
        <Image
          src="/assets/hero/about.png"
          alt="AK Hardware Professional Building & Supplies"
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="50vw"
        />
        {/* SUBTLE DEEP NAVY OVERLAY TINT (rgba(1, 33, 87, 0.20)) */}
        <div className="absolute inset-0 bg-[#012157]/20 pointer-events-none" />
      </div>

      {/* RIGHT 50% — LOGIN FORM PANEL */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 overflow-y-auto bg-[#F7F8FA]">
        <div className="w-full max-w-[420px] mx-auto flex flex-col gap-3.5 text-xs animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* AK HARDWARE LOGO */}
          <div className="flex flex-col items-center mb-0.5">
            <Logo variant="full" size="sm" href="/" />
          </div>

          {/* CARD HEADER */}
          <div className="text-center flex flex-col items-center gap-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-1">
            {/* EMAIL ADDRESS FIELD */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="font-semibold text-[#374151] text-xs">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full h-11 sm:h-12 bg-white border ${
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

            {/* PASSWORD FIELD WITH EYE TOGGLE */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="font-semibold text-[#374151] text-xs">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className={`w-full h-11 sm:h-12 bg-white border ${
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

            {/* REMEMBER ME & FORGOT PASSWORD ROW */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#FA3A08] focus:ring-[#FA3A08]"
                />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="font-bold text-[#014A94] hover:text-[#FA3A08] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* PRIMARY SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 sm:h-12 bg-[#FA3A08] hover:bg-[#d92e00] text-white font-semibold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#FA3A08]/30 mt-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>

            {/* DIVIDER */}
            <div className="relative flex items-center justify-center my-1.5">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-[#F7F8FA] px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
                OR
              </span>
            </div>

            {/* GOOGLE SIGN IN BUTTON */}
            <GoogleSignInButton text="Continue with Google" />
          </form>

          {/* BOTTOM NAVIGATION LINK */}
          <div className="text-center text-xs text-slate-600 font-medium pt-1">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#FA3A08] hover:underline transition-colors ml-1">
              Create an account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
