
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../../types';
import { DASHBOARD_FILTERS } from '../../constants';
import Button from '../ui/Button';

interface DashboardSidebarProps {
  activeFilter: string; // e.g., '#all'
  onFilterChange: (filter: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <aside className="w-64 bg-white p-6 space-y-6 border-r border-gray-200 rounded-lg shadow-sm">
      <nav className="space-y-1">
        {DASHBOARD_FILTERS.map((item) => (
          <button
            key={item.name}
            onClick={() => onFilterChange(item.path)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${activeFilter === item.path
                ? 'bg-gray-100 text-brand-primary'
                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-primary'
              }`}
          >
            {item.icon && <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
            {item.name}
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-200 pt-6">
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <h4 className="text-sm font-semibold text-gray-800">Plan</h4>
          <p className="mt-1 text-xs text-gray-500">You are currently on the Free Plan.</p>
          <Button variant="primary" size="sm" className="mt-3 w-full">
            Upgrade your plan now!
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center mt-auto pt-4">
        IFRAME ADMIN MODAL
      </p>
    </aside>
  );
};

export default DashboardSidebar;
