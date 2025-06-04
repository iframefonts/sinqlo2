
import React from 'react';
import { Link } from 'react-router-dom'; // Added import
import { PricingTier } from '../../types';
import Button from '../ui/Button';
import { CheckIcon } from '../../constants';

interface PricingTierCardProps {
  tier: PricingTier;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({ tier }) => {
  return (
    <div className={`flex flex-col rounded-xl border p-6 shadow-lg text-center h-full
        ${tier.isPopular ? 'border-brand-primary border-2 relative' : 'border-gray-200 bg-white'}
    `}>
      {tier.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
      <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
      <div className="mt-4">
        <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
        {tier.priceFrequency && <span className="text-base font-medium text-gray-500">{tier.priceFrequency}</span>}
      </div>
      <ul className="mt-6 space-y-3 text-sm text-left flex-grow">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button<typeof Link> // Specify generic for polymorphic component
            as={Link}        // Use Link component
            to={tier.ctaPath || '#'} // Pass ctaPath to 'to' prop. If ctaPath is '#', Link will handle it gracefully.
            variant={tier.isPopular ? 'primary' : 'outline'} 
            size="lg" 
            className="w-full"
            // Removed the onClick handler that used window.location.href
        >
          {tier.ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PricingTierCard;
