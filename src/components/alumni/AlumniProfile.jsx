import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MapPin, Building2, Calendar, Edit, Save, X, Plus } from 'lucide-react';

const AlumniProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user || {});
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    // In a real app, you would save to backend
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills?.includes(newSkill.trim())) {
      setEditedProfile({
        ...editedProfile,
        skills: [...(editedProfile.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const addMilestone = () => {
    const newMilestone = {
      year: new Date().getFullYear(),
      role: 'New Role',
      company: 'Company Name'
    };
    setEditedProfile({
      ...editedProfile,
      careerMilestones: [...(editedProfile.careerMilestones || []), newMilestone]
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(user || {});
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card">
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <img
                src={editedProfile.profileImage || user?.profileImage}
                alt={editedProfile.name || user?.name}
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full">
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="text-xl font-bold text-center border-b border-gray-300 focus:border-primary-500 outline-none"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            )}
            
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.position || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, position: e.target.value })}
                className="text-gray-600 text-center w-full mt-1 border-b border-gray-300 focus:border-primary-500 outline-none"
              />
            ) : (
              <p className="text-gray-600">{user?.position}</p>
            )}
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.currentCompany || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, currentCompany: e.target.value })}
                    className="border-b border-gray-300 focus:border-primary-500 outline-none"
                  />
                ) : (
                  <span>{user?.currentCompany}</span>
                )}
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    className="border-b border-gray-300 focus:border-primary-500 outline-none"
                  />
                ) : (
                  <span>{user?.location}</span>
                )}
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Class of {user?.graduationYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                value={editedProfile.bio || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="input-field h-24"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600">{user?.bio}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Skills & Expertise</h3>
              {isEditing && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    className="input-field text-sm w-32"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill} className="btn-primary text-sm">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(editedProfile.skills || user?.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isEditing
                      ? 'bg-red-100 text-red-700 cursor-pointer hover:bg-red-200'
                      : 'bg-primary-50 text-primary-700'
                  }`}
                  onClick={() => isEditing && removeSkill(skill)}
                >
                  {skill} {isEditing && '×'}
                </span>
              ))}
            </div>
          </div>

          {/* Career Milestones */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Career Milestones</h3>
              {isEditing && (
                <button onClick={addMilestone} className="btn-primary text-sm flex items-center space-x-1">
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              )}
            </div>
            <div className="space-y-3">
              {(editedProfile.careerMilestones || user?.careerMilestones || []).map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        value={milestone.year}
                        onChange={(e) => {
                          const newMilestones = [...(editedProfile.careerMilestones || [])];
                          newMilestones[index] = { ...milestone, year: parseInt(e.target.value) };
                          setEditedProfile({ ...editedProfile, careerMilestones: newMilestones });
                        }}
                        className="w-16 input-field text-sm"
                      />
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={milestone.role}
                          onChange={(e) => {
                            const newMilestones = [...(editedProfile.careerMilestones || [])];
                            newMilestones[index] = { ...milestone, role: e.target.value };
                            setEditedProfile({ ...editedProfile, careerMilestones: newMilestones });
                          }}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          value={milestone.company}
                          onChange={(e) => {
                            const newMilestones = [...(editedProfile.careerMilestones || [])];
                            newMilestones[index] = { ...milestone, company: e.target.value };
                            setEditedProfile({ ...editedProfile, careerMilestones: newMilestones });
                          }}
                          className="input-field text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-medium text-primary-600 w-16">{milestone.year}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{milestone.role}</div>
                        <div className="text-sm text-gray-600">{milestone.company}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="space-y-2">
              {(user?.achievements || []).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">{user?.eventsAttended}</div>
          <div className="text-sm text-gray-600">Events Attended</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">${user?.donationAmount?.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Donations</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">{user?.internshipsOffered}</div>
          <div className="text-sm text-gray-600">Internships Offered</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600">
            {user?.mentorshipOffered ? 'Active' : 'Inactive'}
          </div>
          <div className="text-sm text-gray-600">Mentorship Status</div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
