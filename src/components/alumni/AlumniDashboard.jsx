import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { events, mentorships, jobs } from '../../data/staticData';
import { Calendar, Users, Briefcase, DollarSign, Award, TrendingUp } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';
import CustomLineChart from '../charts/LineChart';

const AlumniDashboard = () => {
  const { user } = useAuth();

  const myStats = {
    eventsAttended: user?.eventsAttended || 0,
    mentorshipsSessions: mentorships.filter(m => m.mentorId === user?.id).length,
    donationAmount: user?.donationAmount || 0,
    networkConnections: 45
  };

  const activityData = [
    { month: 'Jan', events: 2, mentoring: 3, networking: 5 },
    { month: 'Feb', events: 1, mentoring: 4, networking: 7 },
    { month: 'Mar', events: 3, mentoring: 5, networking: 6 },
    { month: 'Apr', events: 2, mentoring: 6, networking: 8 },
    { month: 'May', events: 4, mentoring: 4, networking: 9 },
    { month: 'Jun', events: 1, mentoring: 7, networking: 10 }
  ];

  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const activeMentorships = mentorships.filter(m => m.mentorId === user?.id && m.status === 'active');

  const stats = [
    {
      title: 'Events Attended',
      value: myStats.eventsAttended,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+3 this month'
    },
    {
      title: 'Mentoring Sessions',
      value: myStats.mentorshipsSessions,
      icon: Users,
      color: 'bg-green-500',
      change: '+2 active'
    },
    {
      title: 'Total Contributions',
      value: `$${myStats.donationAmount.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: 'This year'
    },
    {
      title: 'Network Size',
      value: myStats.networkConnections,
      icon: Award,
      color: 'bg-purple-500',
      change: '+8 new connections'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's what's happening with your alumni network</p>
        </div>
        <div className="flex items-center space-x-3">
          <img
            src={user?.profileImage}
            alt={user?.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CustomLineChart
          data={activityData}
          lines={[
            { dataKey: 'events', name: 'Events' },
            { dataKey: 'mentoring', name: 'Mentoring' },
            { dataKey: 'networking', name: 'Networking' }
          ]}
          title="My Activity Overview"
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{event.title}</div>
                  <div className="text-sm text-gray-600">{event.date} • {event.location}</div>
                </div>
                <button className="btn-primary text-sm">RSVP</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Active Mentorships</h3>
          <div className="space-y-3">
            {activeMentorships.length > 0 ? (
              activeMentorships.map((mentorship) => (
                <div key={mentorship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{mentorship.studentName}</div>
                    <div className="text-sm text-gray-600">{mentorship.topic}</div>
                    <div className="text-xs text-gray-500">{mentorship.sessions} sessions completed</div>
                  </div>
                  <button className="btn-secondary text-sm">Message</button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No active mentorships</p>
                <button className="btn-primary mt-2 text-sm">Offer Mentorship</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements & Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-800">Mentor Badge</div>
            <div className="text-sm text-gray-600">Completed 10 mentoring sessions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-800">Network Builder</div>
            <div className="text-sm text-gray-600">Connected with 25+ alumni</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-800">Contributor</div>
            <div className="text-sm text-gray-600">Made significant donations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
