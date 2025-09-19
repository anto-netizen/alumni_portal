import React, { useState } from 'react';
import { events } from '../../data/staticData';
import { Calendar, MapPin, Clock, Users, Star, CheckCircle, XCircle, Filter, Search } from 'lucide-react';
import Modal from '../shared/Modal';

const EventParticipation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [registrations, setRegistrations] = useState({});

  // Extended events data
  const allEvents = [
    ...events,
    {
      id: 4,
      title: 'Alumni Career Panel',
      date: '2024-04-05',
      time: '6:00 PM',
      location: 'Virtual Webinar',
      description: 'Panel discussion with alumni from various industries sharing career insights.',
      organizer: 'Career Services',
      attendees: 245,
      maxCapacity: 300,
      type: 'panel',
      status: 'upcoming',
      category: 'Career Development',
      speakers: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'],
      registration: true
    },
    {
      id: 5,
      title: 'Tech Innovation Summit',
      date: '2024-04-12',
      time: '9:00 AM',
      location: 'Innovation Center',
      description: 'Full-day summit exploring latest trends in technology and innovation.',
      organizer: 'Alumni Tech Committee',
      attendees: 180,
      maxCapacity: 200,
      type: 'summit',
      status: 'upcoming',
      category: 'Technology',
      speakers: ['David Park', 'Jessica Liu', 'Daniel Taylor'],
      registration: true
    },
    {
      id: 6,
      title: 'Regional Alumni Meetup - SF',
      date: '2024-03-30',
      time: '7:00 PM',
      location: 'San Francisco, CA',
      description: 'Casual networking meetup for Bay Area alumni.',
      organizer: 'SF Alumni Chapter',
      attendees: 67,
      maxCapacity: 80,
      type: 'meetup',
      status: 'upcoming',
      category: 'Networking',
      registration: true
    },
    {
      id: 7,
      title: 'Entrepreneurship Workshop',
      date: '2024-04-18',
      time: '2:00 PM',
      location: 'Business Incubator',
      description: 'Workshop on starting and scaling a business, led by successful alumni entrepreneurs.',
      organizer: 'Business Alumni Network',
      attendees: 95,
      maxCapacity: 120,
      type: 'workshop',
      status: 'upcoming',
      category: 'Business',
      speakers: ['Andrew Lee', 'Maria Gonzalez'],
      registration: true
    },
    {
      id: 8,
      title: 'Alumni Awards Ceremony',
      date: '2024-02-28',
      time: '6:30 PM',
      location: 'Grand Auditorium',
      description: 'Annual ceremony recognizing outstanding alumni achievements.',
      organizer: 'Alumni Relations',
      attendees: 320,
      maxCapacity: 350,
      type: 'ceremony',
      status: 'completed',
      category: 'Recognition',
      registration: false
    },
    {
      id: 9,
      title: 'Data Science Bootcamp',
      date: '2024-05-03',
      time: '10:00 AM',
      location: 'Computer Science Building',
      description: 'Intensive one-day bootcamp covering latest data science techniques and tools.',
      organizer: 'CS Alumni Association',
      attendees: 45,
      maxCapacity: 60,
      type: 'bootcamp',
      status: 'upcoming',
      category: 'Education',
      speakers: ['Michael Chen', 'Amanda Thompson'],
      registration: true
    },
    {
      id: 10,
      title: 'Finance Industry Roundtable',
      date: '2024-04-25',
      time: '4:00 PM',
      location: 'Business School',
      description: 'Roundtable discussion on current trends and opportunities in finance.',
      organizer: 'Finance Alumni Group',
      attendees: 78,
      maxCapacity: 100,
      type: 'roundtable',
      status: 'upcoming',
      category: 'Finance',
      speakers: ['Emily Rodriguez', 'Kevin Zhang'],
      registration: true
    }
  ];

  const myAttendedEvents = [1, 2, 8]; // Simulate attended events
  const myUpcomingEvents = [3, 4, 6]; // Simulate registered events

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || event.type === filterType;
    const matchesStatus = !filterStatus || event.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getEventTypeColor = (type) => {
    const colors = {
      career: 'bg-blue-100 text-blue-800',
      webinar: 'bg-green-100 text-green-800',
      networking: 'bg-purple-100 text-purple-800',
      panel: 'bg-orange-100 text-orange-800',
      summit: 'bg-red-100 text-red-800',
      meetup: 'bg-yellow-100 text-yellow-800',
      workshop: 'bg-indigo-100 text-indigo-800',
      ceremony: 'bg-pink-100 text-pink-800',
      bootcamp: 'bg-teal-100 text-teal-800',
      roundtable: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegister = (eventId) => {
    setRegistrations(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const isRegistered = (eventId) => {
    return registrations[eventId] || myUpcomingEvents.includes(eventId);
  };

  const hasAttended = (eventId) => {
    return myAttendedEvents.includes(eventId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Events & Participation</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{allEvents.filter(e => e.status === 'upcoming').length}</div>
          <div className="text-sm text-gray-600">Upcoming Events</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">{myUpcomingEvents.length}</div>
          <div className="text-sm text-gray-600">My Registrations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{myAttendedEvents.length}</div>
          <div className="text-sm text-gray-600">Events Attended</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">4.8</div>
          <div className="text-sm text-gray-600">Avg. Rating</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="career">Career</option>
            <option value="webinar">Webinar</option>
            <option value="networking">Networking</option>
            <option value="workshop">Workshop</option>
            <option value="summit">Summit</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Advanced Filter</span>
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              {hasAttended(event.id) && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {isRegistered(event.id) && !hasAttended(event.id) && (
                <Star className="h-5 w-5 text-yellow-600" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-3 text-sm">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{event.attendees}/{event.maxCapacity} attendees</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Organized by {event.organizer}</span>
              </div>
            </div>

            {event.speakers && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Speakers:</p>
                <div className="flex flex-wrap gap-1">
                  {event.speakers.map((speaker, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                    >
                      {speaker}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedEvent(event);
                  setShowModal(true);
                }}
                className="btn-secondary text-sm"
              >
                View Details
              </button>
              
              {event.status === 'upcoming' && event.registration && (
                <button
                  onClick={() => handleRegister(event.id)}
                  className={`text-sm px-3 py-1 rounded ${
                    isRegistered(event.id)
                      ? 'bg-green-100 text-green-800'
                      : 'btn-primary'
                  }`}
                >
                  {isRegistered(event.id) ? 'Registered' : 'Register'}
                </button>
              )}
              
              {hasAttended(event.id) && (
                <button className="btn-primary text-sm">
                  Rate Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* My Event History */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">My Event History</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Upcoming Events</h4>
              <div className="space-y-2">
                {allEvents.filter(e => myUpcomingEvents.includes(e.id)).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.date}</div>
                    </div>
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Attended Events</h4>
              <div className="space-y-2">
                {allEvents.filter(e => myAttendedEvents.includes(e.id)).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.date}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedEvent?.title || 'Event Details'}
        size="lg"
      >
        {selectedEvent && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Event Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Date:</strong> {selectedEvent.date}</div>
                  <div><strong>Time:</strong> {selectedEvent.time}</div>
                  <div><strong>Location:</strong> {selectedEvent.location}</div>
                  <div><strong>Category:</strong> {selectedEvent.category}</div>
                  <div><strong>Organizer:</strong> {selectedEvent.organizer}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Attendance</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Registered:</strong> {selectedEvent.attendees}</div>
                  <div><strong>Capacity:</strong> {selectedEvent.maxCapacity}</div>
                  <div><strong>Available:</strong> {selectedEvent.maxCapacity - selectedEvent.attendees}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(selectedEvent.attendees / selectedEvent.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>
            
            {selectedEvent.speakers && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Speakers</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.speakers.map((speaker, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {speaker}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Close
              </button>
              {selectedEvent.status === 'upcoming' && selectedEvent.registration && (
                <button
                  onClick={() => {
                    handleRegister(selectedEvent.id);
                    setShowModal(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    isRegistered(selectedEvent.id)
                      ? 'bg-green-100 text-green-800'
                      : 'btn-primary'
                  }`}
                >
                  {isRegistered(selectedEvent.id) ? 'Registered' : 'Register Now'}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventParticipation;

