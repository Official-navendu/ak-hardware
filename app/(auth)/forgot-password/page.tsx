'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useToast } from '@/lib/context/toast-context';

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      toast.error('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Password reset link sent to your email');
    }, 600);
  };

  return (
    <div className="h-[100svh] min-h-[100svh] w-full flex items-center justify-center p-6 sm:p-8 bg-[#F7F8FA] overflow-hidden">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center gap-5 text-xs animate-in fade-in duration-300">
        
        {/* AK HARDWARE LOGO */}
        <div className="flex flex-col items-center mb-1">
          <Logo variant="full" size="sm" href="/" />
        </div>

        {/* FORGOT PASSWORD FORM CONTAINER */}
        <div className="w-full bg-white border border-slate-200 shadow-2xs rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
          {/* CARD HEADER */}
          <div className="text-center flex flex-col items-center gap-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#0C1E38] tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-slate-500 font-normal">
              Enter your account email address to receive a password reset link.
            </p>
          </div>

          {sent ? (
            <div className="flex flex-col items-center text-center p-4 bg-emerald-50 border border-emerald-200 rounded-xl gap-2 animate-in fade-in">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              <h3 className="font-bold text-[#0C1E38] text-sm">Reset Link Sent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We have sent instructions to <strong>{email}</strong>. Please check your inbox.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-xs font-bold text-[#014A94] hover:underline mt-2"
              >
                Resend link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              {/* EMAIL ADDRESS */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reset-email" className="font-semibold text-[#374151] text-xs">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`w-full h-11 sm:h-12 bg-white border ${
                      error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-[#014A94] focus:ring-[#014A94]/20'
                    } rounded-lg pl-10 pr-4 text-xs font-semibold text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors`}
                  />
                </div>
                {error && (
                  <span className="text-[11px] text-red-600 font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" /> {error}
                  </span>
                )}
              </div>

              {/* PRIMARY SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 bg-[#FA3A08] hover:bg-[#d92e00] text-white font-semibold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#FA3A08]/30 mt-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>
          )}

          {/* BACK TO SIGN IN LINK */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FA3A08] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
