import React, { useState } from 'react';
import { alumni, mentorships } from '../../data/staticData';
import { useAuth } from '../../hooks/useAuth';
import { Users, MessageSquare, Calendar, Star, Search, Filter, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import Modal from '../shared/Modal';

const MentorshipRequests = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [mentorshipRequest, setMentorshipRequest] = useState({
    topic: '',
    goals: '',
    duration: '3 months',
    frequency: 'bi-weekly',
    message: ''
  });

  // Available mentors
  const availableMentors = alumni.filter(alum => alum.mentorshipOffered);
  
  // My mentorship history
  const myMentorships = [
    {
      id: 1,
      mentorId: 1,
      mentorName: 'Sarah Johnson',
      mentorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      topic: 'Full Stack Development',
      status: 'active',
      startDate: '2024-01-15',
      sessions: 8,
      nextSession: '2024-03-22',
      rating: 5,
      progress: 75,
      goals: ['Master React development', 'Learn backend APIs', 'Build portfolio projects'],
      achievements: ['Completed React fundamentals', 'Built first full-stack app']
    },
    {
      id: 2,
      mentorId: 7,
      mentorName: 'Amanda Thompson',
      mentorImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      topic: 'UX Research Methods',
      status: 'completed',
      startDate: '2023-10-01',
      endDate: '2024-01-31',
      sessions: 12,
      rating: 5,
      progress: 100,
      goals: ['Learn user research', 'Master design thinking', 'Create UX portfolio'],
      achievements: ['Completed UX certification', 'Built research portfolio', 'Landed UX internship']
    },
    {
      id: 3,
      mentorId: 2,
      mentorName: 'Michael Chen',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      topic: 'Data Science Career Guidance',
      status: 'pending',
      requestDate: '2024-03-10',
      message: 'Interested in transitioning to data science. Would love guidance on skill development and career path.',
      goals: ['Learn Python for data science', 'Understand ML fundamentals', 'Build data portfolio']
    }
  ];

  // Recommended mentors based on interests
  const recommendedMentors = availableMentors.filter(mentor =>
    user?.interests?.some(interest =>
      mentor.skills.some(skill =>
        skill.toLowerCase().includes(interest.toLowerCase())
      )
    )
  );

  const allSkills = [...new Set(availableMentors.flatMap(mentor => mentor.skills))].sort();

  const filteredMentors = availableMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = !filterSkill || mentor.skills.includes(filterSkill);
    
    return matchesSearch && matchesSkill;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
  };

  const submitMentorshipRequest = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('Submitting mentorship request:', {
      mentorId: selectedMentor.id,
      studentId: user.id,
      ...mentorshipRequest
    });
    setShowRequestModal(false);
    setMentorshipRequest({
      topic: '',
      goals: '',
      duration: '3 months',
      frequency: 'bi-weekly',
      message: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mentorship</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{myMentorships.filter(m => m.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active Mentorships</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{myMentorships.filter(m => m.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {myMentorships.filter(m => m.sessions).reduce((sum, m) => sum + m.sessions, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Sessions</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{availableMentors.length}</div>
          <div className="text-sm text-gray-600">Available Mentors</div>
        </div>
      </div>

      {/* My Mentorships */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">My Mentorships</h3>
        <div className="space-y-4">
          {myMentorships.map((mentorship) => (
            <div key={mentorship.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={mentorship.mentorImage}
                    alt={mentorship.mentorName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{mentorship.mentorName}</h4>
                    <p className="text-sm text-gray-600">{mentorship.topic}</p>
                    {mentorship.nextSession && (
                      <p className="text-xs text-blue-600">Next session: {new Date(mentorship.nextSession).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mentorship.status)}`}>
                  {mentorship.status}
                </span>
              </div>

              {mentorship.status !== 'pending' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{mentorship.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mentorship.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {mentorship.sessions && (
                  <div>
                    <strong>Sessions:</strong> {mentorship.sessions}
                  </div>
                )}
                <div>
                  <strong>Started:</strong> {new Date(mentorship.startDate).toLocaleDateString()}
                </div>
                {mentorship.rating && (
                  <div className="flex items-center space-x-1">
                    <strong>Rating:</strong>
                    <div className="flex">
                      {[...Array(mentorship.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {mentorship.goals && (
                <div className="mt-3">
                  <strong className="text-sm">Goals:</strong>
                  <ul className="text-sm text-gray-600 mt-1">
                    {mentorship.goals.map((goal, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span>•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mentorship.achievements && mentorship.achievements.length > 0 && (
                <div className="mt-3">
                  <strong className="text-sm">Achievements:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mentorship.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                      >
                        ✓ {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                {mentorship.status === 'active' && (
                  <>
                    <button className="btn-secondary text-sm">Schedule Session</button>
                    <button className="btn-primary text-sm">Send Message</button>
                  </>
                )}
                {mentorship.status === 'pending' && (
                  <button className="btn-secondary text-sm">Cancel Request</button>
                )}
                {mentorship.status === 'completed' && (
                  <button className="btn-secondary text-sm">Leave Review</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Mentors */}
      {recommendedMentors.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMentors.slice(0, 6).map((mentor) => (
              <div key={mentor.id} className="p-4 border rounded-lg bg-blue-50">
                <div className="text-center mb-3">
                  <img
                    src={mentor.profileImage}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-full object-cover mx-auto mb-2"
                  />
                  <h4 className="font-semibold text-gray-800">{mentor.name}</h4>
                  <p className="text-sm text-gray-600">{mentor.position}</p>
                  <p className="text-sm text-gray-500">{mentor.currentCompany}</p>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => handleRequestMentorship(mentor)}
                  className="w-full btn-primary text-sm"
                >
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Find Mentors */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Find Mentors</h3>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="input-field"
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Advanced Filter</span>
          </button>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-center mb-3">
                <img
                  src={mentor.profileImage}
                  alt={mentor.name}
                  className="h-16 w-16 rounded-full object-cover mx-auto mb-2"
                />
                <h4 className="font-semibold text-gray-800">{mentor.name}</h4>
                <p className="text-sm text-gray-600">{mentor.position}</p>
                <p className="text-sm text-gray-500">{mentor.currentCompany}</p>
                <p className="text-sm text-gray-500">{mentor.location}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {mentor.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-600 mb-3">
                <p><strong>Experience:</strong> Class of {mentor.graduationYear}</p>
                <p><strong>Events Attended:</strong> {mentor.eventsAttended}</p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setShowModal(true);
                  }}
                  className="flex-1 btn-secondary text-sm"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleRequestMentorship(mentor)}
                  className="flex-1 btn-primary text-sm"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Profile Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedMentor?.name || 'Mentor Profile'}
        size="lg"
      >
        {selectedMentor && (
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={selectedMentor.profileImage}
                alt={selectedMentor.name}
                className="h-24 w-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800">{selectedMentor.name}</h3>
              <p className="text-gray-600">{selectedMentor.position} at {selectedMentor.currentCompany}</p>
              <p className="text-gray-500">{selectedMentor.location}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">About</h4>
              <p className="text-gray-600">{selectedMentor.bio}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMentor.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Career Milestones</h4>
              <div className="space-y-2">
                {selectedMentor.careerMilestones?.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-primary-600">{milestone.year}</div>
                    <div>
                      <div className="font-medium text-sm">{milestone.role}</div>
                      <div className="text-xs text-gray-600">{milestone.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleRequestMentorship(selectedMentor);
                }}
                className="btn-primary"
              >
                Request Mentorship
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Mentorship Request Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title={`Request Mentorship from ${selectedMentor?.name}`}
        size="lg"
      >
        <form onSubmit={submitMentorshipRequest} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Focus Area</label>
            <input
              type="text"
              value={mentorshipRequest.topic}
              onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, topic: e.target.value })}
              className="input-field"
              placeholder="e.g., Full Stack Development, Career Transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Goals</label>
            <textarea
              value={mentorshipRequest.goals}
              onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, goals: e.target.value })}
              className="input-field h-24"
              placeholder="What do you hope to achieve through this mentorship?"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={mentorshipRequest.duration}
                onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, duration: e.target.value })}
                className="input-field"
              >
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency</label>
              <select
                value={mentorshipRequest.frequency}
                onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, frequency: e.target.value })}
                className="input-field"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="as-needed">As needed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message</label>
            <textarea
              value={mentorshipRequest.message}
              onChange={(e) => setMentorshipRequest({ ...mentorshipRequest, message: e.target.value })}
              className="input-field h-32"
              placeholder="Tell the mentor about yourself and why you'd like their guidance..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MentorshipRequests;
