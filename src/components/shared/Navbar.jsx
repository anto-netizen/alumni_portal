import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, userRole, logout } = useAuth();

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin': return 'College Admin Dashboard';
      case 'alumni': return 'Alumni Portal';
      case 'student': return 'Student Portal';
      default: return 'Portal';
    }
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">{getRoleTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600 hover:text-primary-600 cursor-pointer" />
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-600 bg-gray-200 rounded-full p-1" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-red-600 p-2 rounded-md"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
