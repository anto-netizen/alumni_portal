import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './components/auth/Login';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AlumniManagement from './components/admin/AlumniManagement';
import StudentManagement from './components/admin/StudentManagement';
import EventManagement from './components/admin/EventManagement';
import JobManagement from './components/admin/JobManagement';
import DonationManagement from './components/admin/DonationManagement';
import MentorshipManagement from './components/admin/MentorshipManagement';
import Analytics from './components/admin/Analytics';

// Alumni Components
import AlumniDashboard from './components/alumni/AlumniDashboard';
import AlumniProfile from './components/alumni/AlumniProfile';
import NetworkHub from './components/alumni/NetworkHub';
import EventParticipation from './components/alumni/EventParticipation';

// Student Components
import StudentDashboard from './components/student/studentdash';
import FindAlumni from './components/student/FindAlumni';
import JobSearch from './components/student/JobSearch';
import MentorshipRequests from './components/student/MentorshipRequests';

const AppContent = () => {
  const { user, userRole, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderContent = () => {
    if (userRole === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'alumni': return <AlumniManagement />;
        case 'students': return <StudentManagement />;
        case 'events': return <EventManagement />;
        case 'jobs': return <JobManagement />;
        case 'donations': return <DonationManagement />;
        case 'mentorship': return <MentorshipManagement />;
        case 'analytics': return <Analytics />;
        case 'settings': return <div className="p-6"><h1 className="text-2xl font-bold">System Settings - Coming Soon</h1></div>;
        default: return <AdminDashboard />;
      }
    } else if (userRole === 'alumni') {
      switch (activeTab) {
        case 'dashboard': return <AlumniDashboard />;
        case 'profile': return <AlumniProfile />;
        case 'network': return <NetworkHub />;
        case 'events': return <EventParticipation />;
        case 'mentorship': return <div className="p-6"><h1 className="text-2xl font-bold">Mentorship Hub - Coming Soon</h1></div>;
        case 'jobs': return <div className="p-6"><h1 className="text-2xl font-bold">Job Postings - Coming Soon</h1></div>;
        case 'donations': return <div className="p-6"><h1 className="text-2xl font-bold">Donations - Coming Soon</h1></div>;
        case 'achievements': return <div className="p-6"><h1 className="text-2xl font-bold">Achievements - Coming Soon</h1></div>;
        case 'messages': return <div className="p-6"><h1 className="text-2xl font-bold">Messages - Coming Soon</h1></div>;
        default: return <AlumniDashboard />;
      }
    } else if (userRole === 'student') {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard />;
        case 'profile': return <div className="p-6"><h1 className="text-2xl font-bold">Student Profile - Coming Soon</h1></div>;
        case 'alumni': return <FindAlumni />;
        case 'mentorship': return <MentorshipRequests />;
        case 'jobs': return <JobSearch />;
        case 'events': return <div className="p-6"><h1 className="text-2xl font-bold">Events - Coming Soon</h1></div>;
        case 'resources': return <div className="p-6"><h1 className="text-2xl font-bold">Resources - Coming Soon</h1></div>;
        case 'messages': return <div className="p-6"><h1 className="text-2xl font-bold">Messages - Coming Soon</h1></div>;
        default: return <StudentDashboard />;
      }
    }

    return <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">Content not found</h1></div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
