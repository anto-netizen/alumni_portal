import React, { useState } from 'react';
import { alumni } from '../../data/staticData';
import { DollarSign, TrendingUp, Users, Calendar, Search, Filter, Download, Plus, Eye } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';
import CustomLineChart from '../charts/LineChart';
import CustomPieChart from '../charts/PieChart';
import Modal from '../shared/Modal';

const DonationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalDonations = alumni.reduce((sum, alum) => sum + alum.donationAmount, 0);
  const avgDonation = totalDonations / alumni.filter(alum => alum.donationAmount > 0).length;
  const topDonors = [...alumni].sort((a, b) => b.donationAmount - a.donationAmount).slice(0, 10);
  const donorsCount = alumni.filter(alum => alum.donationAmount > 0).length;

  const campaigns = [
    {
      id: 1,
      name: 'Scholarship Fund 2024',
      description: 'Supporting deserving students with financial aid for their education.',
      goal: 50000,
      raised: 35000,
      donors: 25,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      category: 'Education',
      organizer: 'Alumni Committee'
    },
    {
      id: 2,
      name: 'New Library Construction',
      description: 'Building a state-of-the-art library facility for students and faculty.',
      goal: 100000,
      raised: 75000,
      donors: 45,
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      status: 'active',
      category: 'Infrastructure',
      organizer: 'College Administration'
    },
    {
      id: 3,
      name: 'Student Emergency Fund',
      description: 'Emergency financial assistance for students facing unexpected hardships.',
      goal: 25000,
      raised: 28000,
      donors: 35,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'completed',
      category: 'Emergency',
      organizer: 'Student Affairs'
    },
    {
      id: 4,
      name: 'Technology Upgrade Initiative',
      description: 'Upgrading computer labs and technology infrastructure.',
      goal: 75000,
      raised: 23000,
      donors: 18,
      startDate: '2024-02-01',
      endDate: '2024-10-31',
      status: 'active',
      category: 'Technology',
      organizer: 'IT Department'
    },
    {
      id: 5,
      name: 'Alumni Mentorship Program',
      description: 'Supporting mentorship activities and career development programs.',
      goal: 15000,
      raised: 12000,
      donors: 28,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      category: 'Programs',
      organizer: 'Career Services'
    }
  ];

  const donations = [
    { donor: 'Sarah Johnson', amount: 5000, date: '2024-03-15', campaign: 'Scholarship Fund 2024', method: 'Credit Card' },
    { donor: 'Michael Chen', amount: 3500, date: '2024-03-14', campaign: 'Library Construction', method: 'Bank Transfer' },
    { donor: 'Emily Rodriguez', amount: 2000, date: '2024-03-13', campaign: 'Scholarship Fund 2024', method: 'PayPal' },
    { donor: 'David Park', amount: 4000, date: '2024-03-12', campaign: 'Technology Upgrade', method: 'Credit Card' },
    { donor: 'Jessica Liu', amount: 2500, date: '2024-03-11', campaign: 'Emergency Fund', method: 'Bank Transfer' },
    { donor: 'Robert Wilson', amount: 6000, date: '2024-03-10', campaign: 'Library Construction', method: 'Credit Card' },
    { donor: 'Amanda Thompson', amount: 3000, date: '2024-03-09', campaign: 'Scholarship Fund 2024', method: 'Check' },
    { donor: 'Kevin Zhang', amount: 1500, date: '2024-03-08', campaign: 'Mentorship Program', method: 'PayPal' },
    { donor: 'Lisa Garcia', amount: 4500, date: '2024-03-07', campaign: 'Technology Upgrade', method: 'Credit Card' },
    { donor: 'Thomas Brown', amount: 7000, date: '2024-03-06', campaign: 'Library Construction', method: 'Bank Transfer' }
  ];

  const monthlyTrend = [
    { month: 'Jan', donations: 15000, donors: 12, campaigns: 3 },
    { month: 'Feb', donations: 22000, donors: 15, campaigns: 4 },
    { month: 'Mar', donations: 18000, donors: 14, campaigns: 5 },
    { month: 'Apr', donations: 28000, donors: 18, campaigns: 5 },
    { month: 'May', donations: 35000, donors: 22, campaigns: 5 },
    { month: 'Jun', donations: 31000, donors: 20, campaigns: 4 }
  ];

  const donationsByCategory = [
    { name: 'Education', value: 45000, color: '#3b82f6' },
    { name: 'Infrastructure', value: 32000, color: '#10b981' },
    { name: 'Technology', value: 18000, color: '#f59e0b' },
    { name: 'Programs', value: 12000, color: '#8b5cf6' },
    { name: 'Emergency', value: 8000, color: '#ef4444' }
  ];

  const donationsByRange = [
    { range: '$1-$500', count: 45, total: 12000 },
    { range: '$501-$1000', count: 28, total: 21000 },
    { range: '$1001-$2500', count: 18, total: 32000 },
    { range: '$2501-$5000', count: 12, total: 38000 },
    { range: '$5000+', count: 8, total: 42000 }
  ];

  const donationStats = [
    {
      title: 'Total Raised',
      value: `$${totalDonations.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+18.5%',
      trend: 'up'
    },
    {
      title: 'Active Donors',
      value: donorsCount,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12.3%',
      trend: 'up'
    },
    {
      title: 'Average Donation',
      value: `$${Math.round(avgDonation).toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+8.7%',
      trend: 'up'
    },
    {
      title: 'Active Campaigns',
      value: campaigns.filter(c => c.status === 'active').length,
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+25.1%',
      trend: 'up'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Donation Management</h1>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donationStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className={`text-sm flex items-center mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
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
          data={monthlyTrend}
          lines={[
            { dataKey: 'donations', name: 'Donations ($)' },
            { dataKey: 'donors', name: 'Donors Count' }
          ]}
          title="Monthly Donation Trends"
        />
        <CustomPieChart
          data={donationsByCategory}
          dataKey="value"
          nameKey="name"
          title="Donations by Category"
        />
      </div>

      <CustomBarChart
        data={donationsByRange}
        dataKey="total"
        xKey="range"
        title="Donations by Amount Range"
        color="#10b981"
      />

      {/* Active Campaigns */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Fundraising Campaigns</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{campaign.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                  <p className="text-xs text-gray-500">
                    {campaign.donors} donors • Organized by {campaign.organizer}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setShowModal(true);
                    }}
                    className="p-1 text-gray-600 hover:text-primary-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>${campaign.raised.toLocaleString()} raised</span>
                  <span>${campaign.goal.toLocaleString()} goal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      campaign.status === 'completed' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{Math.round((campaign.raised / campaign.goal) * 100)}% achieved</span>
                <span>Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Donations */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Donor</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Campaign</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Method</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{donation.donor}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ${donation.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {donation.campaign}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {donation.method}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Donors */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Top Donors (All Time)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topDonors.filter(donor => donor.donationAmount > 0).slice(0, 8).map((donor, index) => (
            <div key={donor.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">{index + 1}</span>
              </div>
              <img
                src={donor.profileImage}
                alt={donor.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-800">{donor.name}</div>
                <div className="text-sm text-gray-600">{donor.currentCompany}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">${donor.donationAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCampaign?.name || 'Campaign Details'}
        size="lg"
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Campaign Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Goal:</strong> ${selectedCampaign.goal.toLocaleString()}</div>
                  <div><strong>Raised:</strong> ${selectedCampaign.raised.toLocaleString()}</div>
                  <div><strong>Progress:</strong> {Math.round((selectedCampaign.raised / selectedCampaign.goal) * 100)}%</div>
                  <div><strong>Donors:</strong> {selectedCampaign.donors}</div>
                  <div><strong>Category:</strong> {selectedCampaign.category}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Start Date:</strong> {new Date(selectedCampaign.startDate).toLocaleDateString()}</div>
                  <div><strong>End Date:</strong> {new Date(selectedCampaign.endDate).toLocaleDateString()}</div>
                  <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedCampaign.status)}`}>{selectedCampaign.status}</span></div>
                  <div><strong>Organizer:</strong> {selectedCampaign.organizer}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600">{selectedCampaign.description}</p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${
                  selectedCampaign.status === 'completed' ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((selectedCampaign.raised / selectedCampaign.goal) * 100, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Close
              </button>
              <button className="btn-primary">Edit Campaign</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Campaign Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Campaign"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
              <input type="text" className="input-field" placeholder="Enter campaign name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Amount</label>
              <input type="number" className="input-field" placeholder="50000" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" className="input-field" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="input-field">
              <option>Education</option>
              <option>Infrastructure</option>
              <option>Technology</option>
              <option>Programs</option>
              <option>Emergency</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea className="input-field h-32" placeholder="Describe the campaign purpose and impact..."></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">Create Campaign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DonationManagement;
