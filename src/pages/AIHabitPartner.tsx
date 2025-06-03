
import React from 'react';
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout';
import { AIHabitPartnerPricing } from '@/components/revenue/AIHabitPartnerPricing';

const AIHabitPartner = () => {
  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gray-950 py-8">
        <div className="container mx-auto px-4">
          <AIHabitPartnerPricing />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default AIHabitPartner;
