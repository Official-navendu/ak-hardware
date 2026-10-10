import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100svh] min-h-[100svh] w-full bg-[#F7F8FA] overflow-hidden">
      {children}
    </div>
  );
}
