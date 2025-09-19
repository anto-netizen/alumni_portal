import React, { useState } from 'react';
import { jobs } from '../../data/staticData';
import { 
  Search, Filter, MapPin, Building2, Calendar, Clock, Users, 
  Bookmark, ExternalLink, TrendingUp 
} from 'lucide-react';

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  const allJobs = [
    ...jobs,
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Adobe',
      location: 'San Jose, CA',
      type: 'Internship',
      description: 'Join our creative marketing team for a summer internship program.',
      requirements: ['Marketing background', 'Creative thinking', 'Adobe Creative Suite'],
      postedBy: 'Jessica Liu',
      postedDate: '2024-02-25',
      applications: 28,
      status: 'active',
      salary: '$20/hour',
      duration: '3 months'
    },
    {
      id: 4,
      title: 'Junior Financial Analyst',
      company: 'Goldman Sachs',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Entry-level position in our investment banking division.',
      requirements: ['Finance degree', 'Excel proficiency', 'Analytical skills'],
      postedBy: 'Emily Rodriguez',
      postedDate: '2024-02-28',
      applications: 67,
      status: 'active',
      salary: '$75,000 - $85,000',
      duration: 'Permanent'
    },
    {
      id: 5,
      title: 'Mechanical Engineering Intern',
      company: 'Tesla',
      location: 'Austin, TX',
      type: 'Internship',
      description: 'Work on cutting-edge electric vehicle technology.',
      requirements: ['Mechanical Engineering', 'CAD software', 'Problem-solving'],
      postedBy: 'David Park',
      postedDate: '2024-03-01',
      applications: 89,
      status: 'active',
      salary: '$25/hour',
      duration: '6 months'
    },
    {
      id: 6,
      title: 'UX Research Assistant',
      company: 'Meta',
      location: 'Menlo Park, CA',
      type: 'Internship',
      description: 'Support user research initiatives for social media platforms.',
      requirements: ['Psychology/HCI background', 'Research methods', 'Data analysis'],
      postedBy: 'Amanda Thompson',
      postedDate: '2024-03-03',
      applications: 42,
      status: 'active',
      salary: '$22/hour',
      duration: '4 months'
    },
    {
      id: 7,
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      type: 'Full-time',
      description: 'Join our cloud infrastructure team to build scalable solutions.',
      requirements: ['AWS experience', 'Docker/Kubernetes', 'Python/Bash'],
      postedBy: 'Daniel Taylor',
      postedDate: '2024-03-05',
      applications: 156,
      status: 'active',
      salary: '$95,000 - $120,000',
      duration: 'Permanent'
    }
  ];

  const companies = [...new Set(allJobs.map(job => job.company))].sort();
  const locations = [...new Set(allJobs.map(job => job.location.split(', ').pop()))].sort();

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || job.type === filterType;
    const matchesLocation = !filterLocation || job.location.includes(filterLocation);
    const matchesCompany = !filterCompany || job.company === filterCompany;
    
    return matchesSearch && matchesType && matchesLocation && matchesCompany;
  });

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getJobTypeColor = (type) => {
    return type === 'Internship' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getApplicantColor = (count) => {
    if (count < 30) return 'text-green-600';
    if (count < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Job Search</h1>
        <div className="text-sm text-gray-600">{filteredJobs.length} opportunities found</div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{allJobs.length}</div>
          <div className="text-sm text-gray-600">Total Opportunities</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {allJobs.filter(job => job.type === 'Internship').length}
          </div>
          <div className="text-sm text-gray-600">Internships</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {allJobs.filter(job => job.type === 'Full-time').length}
          </div>
          <div className="text-sm text-gray-600">Full-time Roles</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">{savedJobs.length}</div>
          <div className="text-sm text-gray-600">Saved Jobs</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="input-field">
            <option value="">All Types</option>
            <option value="Internship">Internships</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)} className="input-field">
            <option value="">All Companies</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="input-field">
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <button 
            onClick={() => { setSearchTerm(''); setFilterType(''); setFilterLocation(''); setFilterCompany(''); }}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Featured Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allJobs.filter(job => job.applications < 50).slice(0, 2).map((job) => (
            <div key={job.id} className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-1 rounded ${savedJobs.includes(job.id) ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-500'}`}
                  >
                    <Bookmark className="h-4 w-4" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{job.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">{job.salary}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getApplicantColor(job.applications)}`}>
                    {job.applications} applicants
                  </span>
                  <button className="btn-primary text-sm">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-1 rounded ${savedJobs.includes(job.id) ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-500'}`}
                  >
                    <Bookmark className="h-4 w-4" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2"><Building2 className="h-4 w-4" /><span>{job.company}</span></div>
                  <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>{job.location}</span></div>
                  <div className="flex items-center space-x-2"><Calendar className="h-4 w-4" /><span>Posted {new Date(job.postedDate).toLocaleDateString()}</span></div>
                  <div className="flex items-center space-x-2"><Clock className="h-4 w-4" /><span>{job.duration}</span></div>
                </div>
                <p className="text-gray-600 mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.requirements.map((req, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{req}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">Posted by: <span className="font-medium text-gray-700">{job.postedBy}</span></span>
                    <span className="font-medium text-green-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className={getApplicantColor(job.applications)}>{job.applications} applicants</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-6">
                <button className="btn-primary text-sm flex items-center space-x-1"><span>Apply Now</span><ExternalLink className="h-4 w-4" /></button>
                <button className="btn-secondary text-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Saved Jobs */}
      {savedJobs.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">My Saved Jobs ({savedJobs.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allJobs.filter(job => savedJobs.includes(job.id)).map((job) => (
              <div key={job.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <button onClick={() => toggleSaveJob(job.id)} className="text-yellow-600">
                    <Bookmark className="h-4 w-4" fill="currentColor" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600">{job.salary}</span>
                  <button className="btn-primary text-xs">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Application Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg"><div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3"><Users className="h-6 w-6 text-white" /></div><h4 className="font-medium text-gray-800 mb-2">Network First</h4><p className="text-sm text-gray-600">Connect with alumni at target companies before applying.</p></div>
          <div className="text-center p-4 bg-green-50 rounded-lg"><div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3"><ExternalLink className="h-6 w-6 text-white" /></div><h4 className="font-medium text-gray-800 mb-2">Tailor Resume</h4><p className="text-sm text-gray-600">Customize your resume for each specific role and company.</p></div>
          <div className="text-center p-4 bg-purple-50 rounded-lg"><div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3"><Clock className="h-6 w-6 text-white" /></div><h4 className="font-medium text-gray-800 mb-2">Apply Early</h4><p className="text-sm text-gray-600">Submit applications within the first week of posting.</p></div>
        </div>
      </div>

      {/* Analytics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Your Job Search Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center"><div className="text-2xl font-bold text-blue-600">12</div><div className="text-sm text-gray-600">Jobs Viewed</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-green-600">5</div><div className="text-sm text-gray-600">Applications Sent</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-purple-600">3</div><div className="text-sm text-gray-600">Interviews Scheduled</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-orange-600">85%</div><div className="text-sm text-gray-600">Profile Match</div></div>
        </div>
      </div>

      {/* Company Insights */}
            {/* Company Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Company Insights</h3>
        <div className="space-y-3">
          {companies.slice(0, 5).map((company) => {
            const companyJobs = allJobs.filter(job => job.company === company);
            const avgApplicants = companyJobs.reduce((sum, j) => sum + j.applications, 0) / companyJobs.length;

            return (
              <div
                key={company}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{company}</h4>
                  <p className="text-sm text-gray-600">{companyJobs.length} open roles</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-gray-700">
                    Avg. {Math.round(avgApplicants)} applicants
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
