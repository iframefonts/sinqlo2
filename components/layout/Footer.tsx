
import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, AppLogo } from '../../constants';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and About */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-brand-primary mb-4">
              <AppLogo className="h-8 w-8" />
              <span>LogoDrop</span>
            </Link>
            <p className="text-sm text-gray-500">Organize, Share & Deliver Logos beautifully and efficiently.</p>
            <div className="flex space-x-4 mt-4">
                {/* Social media icons placeholder */}
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Facebook</span> F</a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Instagram</span> I</a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span> T</a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4 capitalize">{key}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-gray-900">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Newsletter Signup</h3>
            <p className="text-sm text-gray-500 mb-3">Get updates, tips, and news from LogoDrop.</p>
            <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" wrapperClassName="flex-grow"/>
              <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {currentYear} LogoDrop. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gray-900">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-gray-900">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
