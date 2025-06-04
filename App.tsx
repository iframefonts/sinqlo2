
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FreeToolPage from './pages/FreeToolPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AuthPlaceholderPage from './pages/AuthPlaceholderPage';
import ContactPlaceholderPage from './pages/ContactPlaceholderPage';
import GenericPlaceholderPage from './components/shared/GenericPlaceholderPage'; // New import

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/free-tool" element={<FreeToolPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/auth-placeholder" element={<AuthPlaceholderPage />} />
          <Route path="/contact-placeholder" element={<ContactPlaceholderPage />} />

          {/* Company Links */}
          <Route path="/about" element={<GenericPlaceholderPage pageTitle="About Us" />} />
          <Route path="/careers" element={<GenericPlaceholderPage pageTitle="Careers" />} />
          <Route path="/press" element={<GenericPlaceholderPage pageTitle="Press" />} />
          <Route path="/blog" element={<GenericPlaceholderPage pageTitle="Blog" />} />

          {/* Product Links */}
          <Route path="/updates" element={<GenericPlaceholderPage pageTitle="Product Updates" />} />
          
          {/* Resources Links */}
          <Route path="/help-center" element={<GenericPlaceholderPage pageTitle="Help Center" />} />
          <Route path="/api-docs" element={<GenericPlaceholderPage pageTitle="API Documentation" />} />
          <Route path="/terms-of-service" element={<GenericPlaceholderPage pageTitle="Terms of Service" />} />
          <Route path="/privacy-policy" element={<GenericPlaceholderPage pageTitle="Privacy Policy" />} />
          <Route path="/cookie-policy" element={<GenericPlaceholderPage pageTitle="Cookie Policy" />} />


          {/* Contact Links */}
          <Route path="/support" element={<GenericPlaceholderPage pageTitle="Support" />} />
          <Route path="/sales" element={<GenericPlaceholderPage pageTitle="Contact Sales" />} />
          <Route path="/partners" element={<GenericPlaceholderPage pageTitle="Partnerships" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
