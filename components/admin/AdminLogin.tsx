'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Eye, EyeOff, ArrowRight, Lock, Globe } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { AdminToast } from '@/components/admin/ui/AdminToast';

export function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@akhardware.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/ashish');
    }, 600);
  };

  const handleForgot = () => {
    setToastMessage(`Password reset instructions sent to ${email}`);
  };

  return (
    <div className="h-[100svh] min-h-[100svh] max-h-[100svh] w-full flex flex-col lg:flex-row bg-surface-bg overflow-hidden select-none font-sans">
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* LEFT VISUAL SIDE (50% DESKTOP) */}
      <div className="lg:w-1/2 bg-navy-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative">
        <div className="flex items-center justify-between">
          <div className="relative h-9 w-36">
            <Image
              src="/assets/brand/ak-hardware-logo.png"
              alt="AK Hardware"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <span className="text-xs font-mono font-bold text-orange-brand bg-orange-brand/10 border border-orange-brand/20 px-2 py-0.5 rounded-[4px]">
            OPERATIONS CONTROL
          </span>
        </div>

        <div className="flex flex-col gap-4 max-w-lg my-auto py-8">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Enterprise Admin Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            AK Hardware Operations System
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Centralized management workspace for real-time inventory tracking, fulfillment queues, trade accounts, financial reports, and catalog administration.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-[6px] text-xs flex flex-col gap-1">
              <span className="font-bold text-white">● Order Fulfillment</span>
              <span className="text-[11px] text-slate-300">Live dispatch timeline processing</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-[6px] text-xs flex flex-col gap-1">
              <span className="font-bold text-white">● Inventory Control</span>
              <span className="text-[11px] text-slate-300">Stock thresholds &amp; automated alerts</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-4 border-t border-white/10">
          <span>© 2026 AK Hardware • Operations System</span>
          <span>Muzaffarpur, Bihar</span>
        </div>
      </div>

      {/* RIGHT AUTHENTICATION FORM (50% DESKTOP) */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="relative h-10 w-44">
              <Image
                src="/assets/brand/ak-hardware-logo.png"
                alt="AK Hardware"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <h2 className="text-xl font-bold text-navy-900 tracking-tight">Sign In to Dashboard</h2>
              <p className="text-xs text-text-muted">Enter official credentials to access operational controls.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-navy-900">Admin Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@akhardware.com"
                className="h-10 text-xs"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-navy-900">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-10 text-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-navy-900"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-text-secondary font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-orange-brand focus:ring-orange-brand"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgot}
                className="font-bold text-blue-brand hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-navy-900 text-white rounded-[7px] font-semibold hover:bg-navy-800 transition-colors flex items-center justify-center gap-2 shadow-xs mt-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to Admin Panel'}</span>
              <ArrowRight className="h-4 w-4 text-orange-brand" />
            </button>
          </form>

          {/* INTEGRATION SSO BUTTONS */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-border" />
              <span className="relative bg-white px-3 text-[11px] text-text-muted font-medium">Or continue with SSO</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => router.push('/ashish')}
                className="h-9 bg-surface-bg border border-border rounded-[6px] text-xs font-semibold text-text-secondary hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                <span>Google Workspace</span>
              </button>
              <button
                type="button"
                onClick={() => router.push('/ashish')}
                className="h-9 bg-surface-bg border border-border rounded-[6px] text-xs font-semibold text-text-secondary hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-blue-800" />
                <span>Microsoft SSO</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-center text-[11px] text-text-muted flex items-center justify-center gap-1">
            <Lock className="h-3 w-3 text-emerald-600" />
            <span>Encrypted 256-bit admin session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
