
import React from 'react';
// Import Link for other uses if any, but SafeLinkButton for the problematic CTA
import { Link } from 'react-router-dom'; 
import Button from '../components/ui/Button';
import SafeLinkButton from '../components/ui/SafeLinkButton'; // Import SafeLinkButton
import Accordion from '../components/ui/Accordion';
import { FAQ_ITEMS, BirdLogo, UploadIcon, CheckIcon } from '../constants';
// Removed PRICING_TIERS and PricingTierCard as they are moved to PricingPage
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
// Removed PricingTier type import as it's not used here anymore

const HomePage: React.FC = () => {
  // Removed billingCycle state and getAdjustedPricingTiers as they are moved to PricingPage

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-12 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-primary mb-6 leading-tight">
          Organize, Share & <br className="hidden sm:inline"/>Deliver Logos
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          LogoDrop helps designers export and share brand assets across social, web, and print beautifully and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <SafeLinkButton to="/free-tool" variant="primary" size="lg">Start for Free</SafeLinkButton>
          {/* Updated link to /pricing */}
          <Button<typeof Link> as={Link} to="/pricing" variant="outline" size="lg">View Plans</Button>
        </div>
        <div className="mt-12 max-w-xl mx-auto">
          <BirdLogo className="w-full h-auto text-gray-300" />
        </div>
      </section>

      {/* IFDS Section */}
      <section className="max-w-4xl mx-auto">
        <p className="text-sm text-center text-gray-500 mb-4">Trusted by top design studios</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-red-700 mb-2">😡 Pain:</h3>
            <p className="text-red-600">Logo files everywhere. No structure. No consistency.</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">✅ Solution:</h3>
            <p className="text-green-600">One place for every brand asset: from SVG to social-ready JPEGs.</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-brand-primary mb-3">Key Features</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto">Everything you need to manage and deliver logos like a pro.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="bg-indigo-100 text-indigo-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <UploadIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Drag & Drop Uploads</h3>
            <p className="text-gray-600 text-sm">Get your logo in all the formats you need with one click. Drop your logo here or click to browse.</p>
          </Card>
          <Card className="p-6">
            <div className="bg-pink-100 text-pink-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0-4.502-3.726A15.995 15.995 0 0 0 2.25 10.5c0-1.106.318-2.127.868-2.996V4.5h1.296M15.75 5.25v1.5m0 0H17.25m-1.5 0V8.25m0 0h1.5m-1.5 0H12.75m1.5-1.5V5.25m0 0h1.5m-1.5 0H12.75" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fonts, Colors, Notes</h3>
            <p className="text-gray-600 text-sm">Keep all brand metadata (colors, fonts, usage notes, links) organized in one central panel.</p>
          </Card>
          <Card className="p-6">
            <div className="bg-teal-100 text-teal-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4 mx-auto">
              <CheckIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Auto-export Sizes</h3>
            <p className="text-gray-600 text-sm">Automatically generate social media, web, and print-ready files in various sizes and formats.</p>
          </Card>
        </div>
      </section>

      {/* Pricing Section Removed - It's now on /pricing page */}

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion items={FAQ_ITEMS} />
      </section>

      {/* Newsletter CTA (Simplified from footer) */}
      <section className="max-w-2xl mx-auto text-center bg-gray-100 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-brand-primary mb-3">Stay Updated with LogoDrop</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest features, tips, and product news.</p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
          <Input type="email" placeholder="your@email.com" className="flex-grow" wrapperClassName="flex-grow text-left" required />
          <Button type="submit" variant="primary" size="lg">Subscribe</Button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;
