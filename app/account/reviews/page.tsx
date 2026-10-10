import React from 'react';
import { Star, User } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { MOCK_REVIEWS } from '@/lib/data/mock-reviews';
import { formatDate } from '@/lib/utils';

export default function AccountReviewsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        title="My Product Reviews"
        subtitle="Manage product ratings and reviews submitted for hardware items."
        badge="Reviews"
      />

      <div className="flex flex-col gap-4">
        {MOCK_REVIEWS.map((rev) => (
          <div key={rev.id} className="bg-white border border-border rounded-brand-lg p-5 shadow-subtle flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900 text-xs">{rev.productName}</span>
              <span className="text-[10px] text-text-muted">{formatDate(rev.createdAt)}</span>
            </div>

            <div className="flex text-amber-400 my-0.5">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>

            <h5 className="text-xs font-bold text-navy-900">{rev.title}</h5>
            <p className="text-xs text-text-secondary leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
