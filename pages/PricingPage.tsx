
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { PRICING_TIERS } from '../constants';
import PricingTierCard from '../components/shared/PricingTierCard';
import { PricingTier } from '../types';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const annualDiscount = 0.20; // 20% discount

  const getAdjustedPricingTiers = (): PricingTier[] => {
    if (billingCycle === 'monthly') {
      // Return a deep copy to avoid mutating the original constant for 'free' and 'enterprise' if they were directly modified before
      return PRICING_TIERS.map(tier => ({...tier}));
    }

    // Annual billing selected
    return PRICING_TIERS.map(tier => {
      const newTier = {...tier}; // Create a copy to modify
      // Apply discount only to specific paid tiers, e.g., 'dashboard'
      if (newTier.id === 'dashboard' && newTier.price && !isNaN(parseFloat(newTier.price.replace('$', '')))) {
        const monthlyPriceNumber = parseFloat(newTier.price.replace('$', ''));
        const annualPrice = monthlyPriceNumber * 12 * (1 - annualDiscount);
        newTier.price = `$${annualPrice.toFixed(2)}`;
        newTier.priceFrequency = '/year';
        return newTier;
      }
      // For Free plan, keep price and frequency as is or adjust if needed
      if (newTier.id === 'free') {
        // Price is $0, frequency can remain /month or be /year, doesn't change the cost
        newTier.priceFrequency = '/month'; 
        return newTier;
      }
      // For Enterprise plan, keep price as "Custom"
      if (newTier.id === 'enterprise') {
        newTier.priceFrequency = ''; // No frequency for custom
        return newTier;
      }
      return newTier; // Fallback for any other tiers
    });
  };

  const currentTiers = getAdjustedPricingTiers();

  return (
    <section className="bg-gray-50 py-12 md:py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-brand-primary mb-4">
          Simple Pricing, Powerful Features
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Choose the plan that's right for you. All paid plans come with a 30-day money-back guarantee.
        </p>
        <div className="inline-flex rounded-md shadow-sm mb-10" role="group">
          <Button
            variant={billingCycle === 'monthly' ? 'primary' : 'outline'}
            className="rounded-r-none px-6 py-3 text-base"
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly billing
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'primary' : 'outline'}
            className={`rounded-l-none px-6 py-3 text-base ${billingCycle === 'monthly' ? 'border-l-0' : ''}`}
            onClick={() => setBillingCycle('annual')}
          >
            Annual billing <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {currentTiers.map(tier => (
            <PricingTierCard key={tier.id} tier={tier} />
          ))}
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Need more? <a href="/contact-placeholder?reason=custom-plan" className="text-brand-accent hover:underline">Contact us</a> for custom solutions.
        </p>
      </div>
    </section>
  );
};

export default PricingPage;
