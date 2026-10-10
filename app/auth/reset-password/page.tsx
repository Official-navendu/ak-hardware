import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeading title="Reset Password" subtitle="Set a new password for your account." />
      <Input label="New Password" type="password" placeholder="••••••••" />
      <Input label="Confirm New Password" type="password" placeholder="••••••••" />
      <Button variant="primary" fullWidth size="lg">Update Password</Button>
    </div>
  );
}
