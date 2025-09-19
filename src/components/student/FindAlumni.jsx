import React, { useState } from 'react';
import { alumni } from '../../data/staticData';
import { Search, Filter, MapPin, Building2, Calendar, MessageSquare, UserPlus } from 'lucide-react';

const FindAlumni = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSkill, setFilterSkill] = useState('');

  const companies = [...new Set(alumni.map(alum => alum.currentCompany))].sort();
  const locations = [...new Set(alumni.map(alum => alum.location.split(', ').pop()))].sort();
  const allSkills = [...new Set(alumni.flatMap(alum => alum.skills))].sort();

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = !filterCompany || alum.currentCompany === filterCompany;
    const matchesLocation = !filterLocation || alum.location.includes(filterLocation);
    const matchesSkill = !filterSkill || alum.skills.includes(filterSkill);
    
    return matchesSearch && matchesCompany && matchesLocation && matchesSkill;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Find Alumni</h1>
        <div className="text-sm text-gray-600">{filteredAlumni.length} alumni found</div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="input-field"
          >
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="input-field"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
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
          <button className="btn-primary flex items-center justify-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={alum.profileImage}
                alt={alum.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{alum.name}</h3>
                <p className="text-sm text-gray-600">{alum.position}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>Class of {alum.graduationYear}</span>
                </div>
              </div>
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
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">{alum.course}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{alum.bio}</p>
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
              {alum.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{alum.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {alum.mentorshipOffered ? 'Available' : 'Not Available'}
                  </div>
                  <div>Mentorship</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{alum.internshipsOffered}</div>
                  <div>Internships</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
                  <UserPlus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAlumni.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No alumni found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Featured Alumni Section */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Featured Alumni</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alumni.filter(alum => alum.verified && alum.mentorshipOffered).slice(0, 2).map((alum) => (
            <div key={alum.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg">
              <img
                src={alum.profileImage}
                alt={alum.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{alum.name}</h4>
                <p className="text-sm text-gray-600">{alum.position} at {alum.currentCompany}</p>
                <p className="text-xs text-gray-500 mt-1">{alum.achievements[0]}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    Mentor Available
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {alum.eventsAttended} Events
                  </span>
                </div>
              </div>
              <button className="btn-primary text-sm">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindAlumni;
