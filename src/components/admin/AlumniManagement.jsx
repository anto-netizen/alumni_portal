import React, { useState } from 'react';
import { alumni } from '../../data/staticData';
import { Search, Filter, MapPin, Building2, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';

const AlumniManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const courses = [...new Set(alumni.map(alum => alum.course))];
  const years = [...new Set(alumni.map(alum => alum.graduationYear))].sort((a, b) => b - a);

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.currentCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !filterCourse || alum.course === filterCourse;
    const matchesYear = !filterYear || alum.graduationYear.toString() === filterYear;
    
    return matchesSearch && matchesCourse && matchesYear;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Alumni Management</h1>
        <div className="text-sm text-gray-600">Total: {filteredAlumni.length} alumni</div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="input-field"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="input-field"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button className="btn-primary flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Advanced Filter</span>
          </button>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={alum.profileImage}
                  alt={alum.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{alum.name}</h3>
                  <p className="text-sm text-gray-600">{alum.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {alum.verified ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
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
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Class of {alum.graduationYear}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
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
                  +{alum.skills.length - 3} more
                </span>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-primary-600">{alum.eventsAttended}</div>
                  <div className="text-gray-500">Events</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">${alum.donationAmount}</div>
                  <div className="text-gray-500">Donated</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlumni(alum)}
                className="btn-secondary flex items-center space-x-1"
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedAlumni.profileImage}
                    alt={selectedAlumni.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedAlumni.name}</h2>
                    <p className="text-gray-600">{selectedAlumni.position} at {selectedAlumni.currentCompany}</p>
                    <p className="text-sm text-gray-500">{selectedAlumni.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlumni(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
                  <p className="text-gray-600">{selectedAlumni.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumni.skills.map((skill, index) => (
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
                  <h3 className="font-semibold text-gray-800 mb-2">Career Milestones</h3>
                  <div className="space-y-2">
                    {selectedAlumni.careerMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-primary-600">{milestone.year}</div>
                        <div>
                          <div className="font-medium">{milestone.role}</div>
                          <div className="text-sm text-gray-600">{milestone.company}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Achievements</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedAlumni.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="font-semibold text-2xl text-primary-600">{selectedAlumni.eventsAttended}</div>
                    <div className="text-sm text-gray-500">Events Attended</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-2xl text-green-600">${selectedAlumni.donationAmount}</div>
                    <div className="text-sm text-gray-500">Total Donations</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-2xl text-blue-600">{selectedAlumni.internshipsOffered}</div>
                    <div className="text-sm text-gray-500">Internships Offered</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-2xl text-purple-600">
                      {selectedAlumni.mentorshipOffered ? 'Yes' : 'No'}
                    </div>
                    <div className="text-sm text-gray-500">Mentorship Available</div>
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

export default AlumniManagement;
