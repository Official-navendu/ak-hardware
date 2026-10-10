'use client';

import React from 'react';
import Image from 'next/image';

export const PaymentMethods: React.FC = () => {
  return (
    <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
      <Image
        src="/assets/footer/payment-strip.png"
        alt="Accepted Payment Methods"
        width={500}
        height={60}
        className="w-full sm:w-auto max-w-[340px] sm:max-w-[400px] h-auto max-h-8 sm:max-h-9 object-contain rounded-md"
      />
    </div>
  );
};
