import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { alumni, events, jobs, mentorships } from '../../data/staticData';
import { Users, Calendar, Briefcase, BookOpen, TrendingUp, Star } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';

const StudentDashboard = () => {
  const { user } = useAuth();

  const availableMentors = alumni.filter(alum => alum.mentorshipOffered).length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const availableJobs = jobs.filter(job => job.status === 'active').length;
  const myMentorships = mentorships.filter(m => m.studentId === user?.id).length;

  const stats = [
    {
      title: 'Available Mentors',
      value: availableMentors,
      icon: Users,
      color: 'bg-blue-500',
      change: '+5 new this week'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: Calendar,
      color: 'bg-green-500',
      change: 'Register now'
    },
    {
      title: 'Job Opportunities',
      value: availableJobs,
      icon: Briefcase,
      color: 'bg-purple-500',
      change: 'Apply today'
    },
    {
      title: 'My Mentorships',
      value: myMentorships,
      icon: BookOpen,
      color: 'bg-orange-500',
      change: 'Active sessions'
    }
  ];

  const recommendedMentors = alumni.filter(alum => 
    alum.mentorshipOffered && 
    user?.interests?.some(interest => 
      alum.skills.some(skill => 
        skill.toLowerCase().includes(interest.toLowerCase())
      )
    )
  ).slice(0, 3);

  const upcomingEventsData = events.filter(e => e.status === 'upcoming').slice(0, 3);
  const recentJobs = jobs.filter(job => job.status === 'active').slice(0, 3);

  const skillsDemand = [
    { skill: 'React', demand: 85 },
    { skill: 'Python', demand: 78 },
    { skill: 'Data Analysis', demand: 72 },
    { skill: 'Machine Learning', demand: 68 },
    { skill: 'JavaScript', demand: 82 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600">Discover opportunities and connect with alumni</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800">{user?.course}</div>
            <div className="text-xs text-gray-500">{user?.year} • GPA: {user?.gpa}</div>
          </div>
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

      {/* Skills Demand Chart */}
      <CustomBarChart
        data={skillsDemand}
        dataKey="demand"
        xKey="skill"
        title="In-Demand Skills in Your Field"
        color="#8b5cf6"
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Mentors */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recommended Mentors</h3>
          <div className="space-y-3">
            {recommendedMentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={mentor.profileImage}
                  alt={mentor.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{mentor.name}</div>
                  <div className="text-sm text-gray-600">{mentor.position} at {mentor.currentCompany}</div>
                  <div className="flex space-x-1 mt-1">
                    {mentor.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn-primary text-sm">Connect</button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEventsData.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-800">{event.title}</div>
                    <div className="text-sm text-gray-600">{event.date} at {event.time}</div>
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </div>
                  <div className="text-right">
                    <button className="btn-primary text-sm">Register</button>
                    <div className="text-xs text-gray-500 mt-1">{event.attendees} registered</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Opportunities */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Job Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium text-gray-800">{job.title}</div>
                  <div className="text-sm text-gray-600">{job.company}</div>
                  <div className="text-sm text-gray-500">{job.location}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  job.type === 'Internship' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">{job.applications} applications</div>
                <button className="btn-primary text-sm">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-gray-800">Find Alumni</div>
            <div className="text-sm text-gray-600">Connect with graduates</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-gray-800">Browse Events</div>
            <div className="text-sm text-gray-600">Attend workshops</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium text-gray-800">Job Search</div>
            <div className="text-sm text-gray-600">Find opportunities</div>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors">
            <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="font-medium text-gray-800">Get Mentored</div>
            <div className="text-sm text-gray-600">Learn from experts</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
