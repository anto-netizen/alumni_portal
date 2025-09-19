import React, { useState } from 'react';
import { alumni, students, mentorships } from '../../data/staticData';
import { Users, UserCheck, MessageSquare, Calendar, TrendingUp, Search, Filter, Eye, Plus } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';
import CustomLineChart from '../charts/LineChart';
import Modal from '../shared/Modal';

const MentorshipManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedMentorship, setSelectedMentorship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Extended mentorship data
  const allMentorships = [
    ...mentorships,
    {
      id: 3,
      mentorId: 3,
      mentorName: 'Emily Rodriguez',
      studentId: 3,
      studentName: 'Ryan Mitchell',
      topic: 'Finance and Investment Banking',
      status: 'active',
      startDate: '2024-02-15',
      sessions: 6,
      nextSession: '2024-03-20',
      goals: ['Understanding financial markets', 'Interview preparation', 'Career planning'],
      progress: 75
    },
    {
      id: 4,
      mentorId: 4,
      mentorName: 'David Park',
      studentId: 1,
      studentName: 'Alex Kumar',
      topic: 'Engineering Leadership',
      status: 'active',
      startDate: '2024-01-20',
      sessions: 10,
      nextSession: '2024-03-22',
      goals: ['Technical leadership', 'Project management', 'Team collaboration'],
      progress: 60
    },
    {
      id: 5,
      mentorId: 5,
      mentorName: 'Jessica Liu',
      studentId: 2,
      studentName: 'Emma Thompson',
      topic: 'Digital Marketing Strategy',
      status: 'completed',
      startDate: '2023-11-01',
      endDate: '2024-02-28',
      sessions: 12,
      goals: ['Marketing analytics', 'Campaign management', 'Brand strategy'],
      progress: 100
    },
    {
      id: 6,
      mentorId: 6,
      mentorName: 'Robert Wilson',
      studentId: 3,
      studentName: 'Ryan Mitchell',
      topic: 'Hardware Engineering',
      status: 'pending',
      startDate: '2024-03-25',
      sessions: 0,
      goals: ['Circuit design', 'Hardware optimization', 'Industry insights'],
      progress: 0
    },
    {
      id: 7,
      mentorId: 7,
      mentorName: 'Amanda Thompson',
      studentId: 1,
      studentName: 'Alex Kumar',
      topic: 'UX Research Methods',
      status: 'active',
      startDate: '2024-02-01',
      sessions: 4,
      nextSession: '2024-03-25',
      goals: ['User research techniques', 'Data analysis', 'Design thinking'],
      progress: 40
    },
    {
      id: 8,
      mentorId: 8,
      mentorName: 'Kevin Zhang',
      studentId: 2,
      studentName: 'Emma Thompson',
      topic: 'Financial Analysis',
      status: 'paused',
      startDate: '2024-01-10',
      sessions: 3,
      goals: ['Financial modeling', 'Risk assessment', 'Investment analysis'],
      progress: 25
    }
  ];

  const availableMentors = alumni.filter(alum => alum.mentorshipOffered);
  const activeMentorships = allMentorships.filter(m => m.status === 'active');
  const completedMentorships = allMentorships.filter(m => m.status === 'completed');

  const mentorshipStats = [
    {
      title: 'Active Mentorships',
      value: activeMentorships.length,
      icon: UserCheck,
      color: 'bg-blue-500',
      change: '+15%'
    },
    {
      title: 'Available Mentors',
      value: availableMentors.length,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Total Sessions',
      value: allMentorships.reduce((sum, m) => sum + m.sessions, 0),
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: '+22%'
    },
    {
      title: 'Success Rate',
      value: `${Math.round((completedMentorships.length / allMentorships.length) * 100)}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const mentorshipTrends = [
    { month: 'Jan', active: 8, completed: 2, new: 5 },
    { month: 'Feb', active: 12, completed: 3, new: 7 },
    { month: 'Mar', active: 15, completed: 4, new: 6 },
    { month: 'Apr', active: 18, completed: 5, new: 8 },
    { month: 'May', active: 22, completed: 6, new: 9 },
    { month: 'Jun', active: 25, completed: 7, new: 10 }
  ];

  const mentorshipByTopic = [
    { topic: 'Software Development', count: 8 },
    { topic: 'Data Science', count: 6 },
    { topic: 'Business & Finance', count: 5 },
    { topic: 'Engineering', count: 4 },
    { topic: 'Marketing', count: 3 },
    { topic: 'Design & UX', count: 2 }
  ];

  const filteredMentorships = allMentorships.filter(mentorship => {
    const matchesSearch = mentorship.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentorship.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentorship.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || mentorship.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentorshipStats.map((stat, index) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomLineChart
          data={mentorshipTrends}
          lines={[
            { dataKey: 'active', name: 'Active' },
            { dataKey: 'completed', name: 'Completed' },
            { dataKey: 'new', name: 'New Matches' }
          ]}
          title="Mentorship Trends"
        />
        <CustomBarChart
          data={mentorshipByTopic}
          dataKey="count"
          xKey="topic"
          title="Mentorships by Topic"
          color="#8b5cf6"
        />
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Mentorship Activity</h3>
        <div className="space-y-3">
          {allMentorships.slice(0, 5).map((mentorship) => (
            <div key={mentorship.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    {mentorship.mentorName} ↔ {mentorship.studentName}
                  </div>
                  <div className="text-sm text-gray-600">{mentorship.topic}</div>
                  <div className="text-xs text-gray-500">
                    {mentorship.sessions} sessions • Started {new Date(mentorship.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentorship.status)}`}>
                  {mentorship.status}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {mentorship.progress}% complete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMentorships = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentorships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="pending">Pending</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Match</span>
          </button>
        </div>
      </div>

      {/* Mentorships List */}
      <div className="space-y-4">
        {filteredMentorships.map((mentorship) => (
          <div key={mentorship.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {mentorship.mentorName} ↔ {mentorship.studentName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mentorship.status)}`}>
                    {mentorship.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{mentorship.topic}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Started {new Date(mentorship.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{mentorship.sessions} sessions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>{mentorship.progress}% progress</span>
                  </div>
                  {mentorship.nextSession && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {new Date(mentorship.nextSession).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mentorship.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => {
                    setSelectedMentorship(mentorship);
                    setShowModal(true);
                  }}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMentors = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableMentors.map((mentor) => (
          <div key={mentor.id} className="card">
            <div className="text-center mb-4">
              <img
                src={mentor.profileImage}
                alt={mentor.name}
                className="h-16 w-16 rounded-full object-cover mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-800">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.position}</p>
              <p className="text-sm text-gray-500">{mentor.currentCompany}</p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mentor.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm">
                <strong>Active Mentorships:</strong> {allMentorships.filter(m => m.mentorId === mentor.id && m.status === 'active').length}
              </div>
            </div>
            
            <button className="w-full btn-primary text-sm">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mentorship Management</h1>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'mentorships', label: 'Mentorships', count: allMentorships.length },
            { id: 'mentors', label: 'Mentors', count: availableMentors.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} {tab.count && `(${tab.count})`}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'mentorships' && renderMentorships()}
      {activeTab === 'mentors' && renderMentors()}

      {/* Mentorship Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Mentorship Details"
        size="lg"
      >
        {selectedMentorship && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mentor</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedMentorship.mentorName}</div>
                  <div><strong>Topic:</strong> {selectedMentorship.topic}</div>
                  <div><strong>Sessions:</strong> {selectedMentorship.sessions}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Student</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedMentorship.studentName}</div>
                  <div><strong>Progress:</strong> {selectedMentorship.progress}%</div>
                  <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedMentorship.status)}`}>{selectedMentorship.status}</span></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Goals</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {selectedMentorship.goals?.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${selectedMentorship.progress}%` }}
              ></div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Close
              </button>
              <button className="btn-primary">Send Message</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MentorshipManagement;
