import React, { useState } from 'react';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <nav className="bg-white shadow-md h-16 flex items-center px-6">
      <div className="flex items-center gap-4 flex-1">
        <Menu className="h-6 w-6 text-gray-600" />
        <h1 className="text-xl font-semibold text-gray-800">iManager</h1>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="text-gray-700">Sashi</span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Sashi</p>
              <p className="text-sm text-gray-500">sashi@example.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;