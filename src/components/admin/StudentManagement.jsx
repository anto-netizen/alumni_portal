import React, { useState } from 'react';
import { students, alumni } from '../../data/staticData';
import { Search, Filter, GraduationCap, User, BookOpen, TrendingUp, Eye, Edit, Mail } from 'lucide-react';
import Modal from '../shared/Modal';
import CustomBarChart from '../charts/BarChart';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const courses = [...new Set(students.map(student => student.course))];
  const years = [...new Set(students.map(student => student.year))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = !filterCourse || student.course === filterCourse;
    const matchesYear = !filterYear || student.year === filterYear;
    
    return matchesSearch && matchesCourse && matchesYear;
  });

  const studentStats = [
    {
      title: 'Total Students',
      value: students.length,
      icon: User,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Average GPA',
      value: (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2),
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+0.2'
    },
    {
      title: 'Active Programs',
      value: courses.length,
      icon: GraduationCap,
      color: 'bg-purple-500',
      change: '+1'
    },
    {
      title: 'Mentorship Rate',
      value: '78%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

  const gpaDistribution = [
    { range: '3.5-4.0', count: 12 },
    { range: '3.0-3.5', count: 8 },
    { range: '2.5-3.0', count: 3 },
    { range: '2.0-2.5', count: 1 }
  ];

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <div className="text-sm text-gray-600">{filteredStudents.length} students</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, index) => {
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

      {/* GPA Distribution Chart */}
      <CustomBarChart
        data={gpaDistribution}
        dataKey="count"
        xKey="range"
        title="Student GPA Distribution"
        color="#10b981"
      />

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
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

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={student.profileImage}
                alt={student.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.course}</p>
                <p className="text-sm text-gray-500">{student.year}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GPA:</span>
                <span className="font-medium text-gray-800">{student.gpa}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Interests:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {student.interests.slice(0, 2).map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {student.interests.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{student.interests.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-xs text-gray-500">
                {student.email}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openStudentModal(student)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`${selectedStudent?.name} - Student Profile`}
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <img
                src={selectedStudent.profileImage}
                alt={selectedStudent.name}
                className="h-24 w-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h3>
                <p className="text-gray-600">{selectedStudent.course}</p>
                <p className="text-sm text-gray-500">{selectedStudent.year}</p>
                <p className="text-sm text-gray-500">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Academic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPA:</span>
                    <span className="font-medium">{selectedStudent.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{selectedStudent.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Major:</span>
                    <span className="font-medium">{selectedStudent.course}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Interests & Goals</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Recommended Alumni Connections</h4>
              <div className="space-y-3">
                {alumni.filter(alum => 
                  alum.mentorshipOffered && 
                  selectedStudent.interests.some(interest => 
                    alum.skills.some(skill => 
                      skill.toLowerCase().includes(interest.toLowerCase())
                    )
                  )
                ).slice(0, 3).map((alum) => (
                  <div key={alum.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={alum.profileImage}
                      alt={alum.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{alum.name}</div>
                      <div className="text-sm text-gray-600">{alum.position} at {alum.currentCompany}</div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentManagement;
