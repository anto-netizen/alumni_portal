import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Briefcase,
  DollarSign,
  UserCheck,
  BarChart3,
  Settings,
  Network,
  BookOpen,
  Trophy,
  MessageSquare
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { userRole } = useAuth();

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'alumni', label: 'Alumni Management', icon: Users },
          { id: 'students', label: 'Student Management', icon: GraduationCap },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'jobs', label: 'Job Postings', icon: Briefcase },
          { id: 'donations', label: 'Donations', icon: DollarSign },
          { id: 'mentorship', label: 'Mentorship', icon: UserCheck },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'alumni':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'My Profile', icon: Users },
          { id: 'network', label: 'Network', icon: Network },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'mentorship', label: 'Mentorship', icon: UserCheck },
          { id: 'jobs', label: 'Job Opportunities', icon: Briefcase },
          { id: 'donations', label: 'Contributions', icon: DollarSign },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'messages', label: 'Messages', icon: MessageSquare }
        ];
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'profile', label: 'My Profile', icon: Users },
          { id: 'alumni', label: 'Find Alumni', icon: Network },
          { id: 'mentorship', label: 'Mentorship', icon: UserCheck },
          { id: 'jobs', label: 'Job Search', icon: Briefcase },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'resources', label: 'Resources', icon: BookOpen },
          { id: 'messages', label: 'Messages', icon: MessageSquare }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 shadow-md h-full border-r">
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
