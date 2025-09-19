import React from 'react';
import { alumni, students, events, donations, engagementData, alumniByYear, alumniByCompany } from '../../data/staticData';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, Award } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';
import CustomPieChart from '../charts/PieChart';
import CustomLineChart from '../charts/LineChart';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Alumni',
      value: alumni.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Students',
      value: students.length,
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Upcoming Events',
      value: events.filter(e => e.status === 'upcoming').length,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+25%'
    },
    {
      title: 'Total Donations',
      value: `$${alumni.reduce((sum, alum) => sum + alum.donationAmount, 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%'
    }
  ];

  const recentAlumni = alumni.slice(0, 5);
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomBarChart
          data={alumniByYear}
          dataKey="count"
          xKey="year"
          title="Alumni by Graduation Year"
          color="#3b82f6"
        />
        <CustomPieChart
          data={alumniByCompany}
          dataKey="value"
          nameKey="name"
          title="Alumni by Company"
        />
      </div>

      <CustomLineChart
        data={engagementData}
        lines={[
          { dataKey: 'mentorships', name: 'Mentorships' },
          { dataKey: 'events', name: 'Events' },
          { dataKey: 'donations', name: 'Donations' }
        ]}
        title="Alumni Engagement Trends"
      />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Alumni</h3>
          <div className="space-y-3">
            {recentAlumni.map((alum) => (
              <div key={alum.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={alum.profileImage}
                  alt={alum.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{alum.name}</p>
                  <p className="text-sm text-gray-600">{alum.currentCompany}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary-600">{alum.graduationYear}</p>
                  <p className="text-xs text-gray-500">{alum.course}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-600">{event.attendees} attendees</p>
                    <p className="text-xs text-gray-500">/{event.maxCapacity} max</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
