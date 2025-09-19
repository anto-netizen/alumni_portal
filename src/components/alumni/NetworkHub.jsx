import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { alumni } from '../../data/staticData';
import { Search, Users, MessageSquare, Calendar, MapPin, Building2 } from 'lucide-react';

const NetworkHub = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter out current user from alumni list
  const otherAlumni = alumni.filter(alum => alum.id !== user?.id);
  
  const filteredAlumni = otherAlumni.filter(alum =>
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const connections = otherAlumni.slice(0, 8); // Simulate existing connections
  const suggestions = otherAlumni.slice(8, 14); // Simulate suggested connections

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search alumni by name, company, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="card hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <img
                src={alum.profileImage}
                alt={alum.name}
                className="h-20 w-20 rounded-full object-cover mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-800">{alum.name}</h3>
              <p className="text-sm text-gray-600">{alum.position}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4" />
                <span>{alum.currentCompany}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{alum.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Class of {alum.graduationYear}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {alum.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between">
              <button className="btn-primary text-sm flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Connect</span>
              </button>
              <button className="btn-secondary text-sm flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyNetworkTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{connections.length}</div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">156</div>
          <div className="text-sm text-gray-600">Profile Views</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">23</div>
          <div className="text-sm text-gray-600">Messages</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">12</div>
          <div className="text-sm text-gray-600">Endorsements</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Your Connections</h3>
        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={connection.profileImage}
                  alt={connection.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-800">{connection.name}</div>
                  <div className="text-sm text-gray-600">{connection.position} at {connection.currentCompany}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="btn-secondary text-sm">Message</button>
                <button className="btn-secondary text-sm">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuggestionsTab = () => (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">People You May Know</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={suggestion.profileImage}
                alt={suggestion.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{suggestion.name}</h4>
                <p className="text-sm text-gray-600">{suggestion.position} at {suggestion.currentCompany}</p>
                <p className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 10) + 1} mutual connections
                </p>
              </div>
              <button className="btn-primary text-sm">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Alumni Network</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'discover', label: 'Discover', count: filteredAlumni.length },
            { id: 'network', label: 'My Network', count: connections.length },
            { id: 'suggestions', label: 'Suggestions', count: suggestions.length }
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
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'discover' && renderDiscoverTab()}
      {activeTab === 'network' && renderMyNetworkTab()}
      {activeTab === 'suggestions' && renderSuggestionsTab()}
    </div>
  );
};

export default NetworkHub;
