import React, { useState } from 'react';
import { events } from '../../data/staticData';
import { Calendar, Clock, MapPin, Users, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const EventManagement = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'career': return 'bg-purple-100 text-purple-800';
      case 'webinar': return 'bg-yellow-100 text-yellow-800';
      case 'networking': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Event Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{events.length}</div>
            <div className="text-sm text-gray-500">Total Events</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.status === 'upcoming').length}
            </div>
            <div className="text-sm text-gray-500">Upcoming</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {events.reduce((sum, e) => sum + e.attendees, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Attendees</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(events.reduce((sum, e) => sum + (e.attendees / e.maxCapacity), 0) / events.length * 100)}%
            </div>
            <div className="text-sm text-gray-500">Avg. Occupancy</div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                                    <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxCapacity} attendees</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-2">{event.description}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Organized by: {event.organizer}
                  </div>
                  <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 ml-4">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus className="h-6 w-6 rotate-45" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input type="text" className="input-field" placeholder="Enter event title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select className="input-field">
                      <option>Career Fair</option>
                      <option>Webinar</option>
                      <option>Networking</option>
                      <option>Workshop</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input type="time" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Capacity</label>
                    <input type="number" className="input-field" placeholder="100" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" className="input-field" placeholder="Event location" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea className="input-field h-32" placeholder="Event description..."></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">Create Event</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedEvent.type)}`}>
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Plus className="h-6 w-6 rotate-45" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold">{selectedEvent.date}</div>
                  <div className="text-sm text-gray-500">Date</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold">{selectedEvent.time}</div>
                  <div className="text-sm text-gray-500">Time</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold">{selectedEvent.location}</div>
                  <div className="text-sm text-gray-500">Location</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold">{selectedEvent.attendees}/{selectedEvent.maxCapacity}</div>
                  <div className="text-sm text-gray-500">Attendees</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Organizer</h3>
                  <p className="text-gray-600">{selectedEvent.organizer}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Registration Status</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-primary-500 h-4 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ width: `${(selectedEvent.attendees / selectedEvent.maxCapacity) * 100}%` }}
                    >
                      {Math.round((selectedEvent.attendees / selectedEvent.maxCapacity) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
