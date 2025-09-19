import React from 'react';
import { alumni, donations, alumniByYear, alumniByCompany, alumniByLocation, engagementData } from '../../data/staticData';
import { TrendingUp, Users, DollarSign, MapPin, Building2 } from 'lucide-react';
import CustomBarChart from '../charts/BarChart';
import CustomPieChart from '../charts/PieChart';
import CustomLineChart from '../charts/LineChart';

const Analytics = () => {
  const totalDonations = alumni.reduce((sum, alum) => sum + alum.donationAmount, 0);
  const avgDonation = totalDonations / alumni.length;
  const topDonors = [...alumni].sort((a, b) => b.donationAmount - a.donationAmount).slice(0, 5);
  const mentorshipRate = (alumni.filter(alum => alum.mentorshipOffered).length / alumni.length) * 100;
  const totalInternships = alumni.reduce((sum, alum) => sum + alum.internshipsOffered, 0);

  const keyMetrics = [
    {
      title: 'Alumni Engagement Rate',
      value: '78%',
      icon: Users,
      color: 'text-blue-600',
      change: '+5.2%',
      trend: 'up'
    },
    {
      title: 'Average Donation',
      value: `$${avgDonation.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      change: '+12.3%',
      trend: 'up'
    },
    {
      title: 'Mentorship Rate',
      value: `${mentorshipRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      change: '+8.1%',
      trend: 'up'
    },
    {
      title: 'Internships Offered',
      value: totalInternships.toString(),
      icon: Building2,
      color: 'text-orange-600',
      change: '+15.6%',
      trend: 'up'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="text-sm text-gray-600">Data as of {new Date().toLocaleDateString()}</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${metric.color}`} />
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomBarChart
          data={alumniByYear}
          dataKey="count"
          xKey="year"
          title="Alumni Distribution by Graduation Year"
          color="#3b82f6"
        />
        <CustomPieChart
          data={alumniByCompany}
          dataKey="value"
          nameKey="name"
          title="Alumni by Current Company"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomBarChart
          data={alumniByLocation}
          dataKey="count"
          xKey="location"
          title="Alumni Geographic Distribution"
          color="#10b981"
        />
        <CustomLineChart
          data={engagementData}
          lines={[
            { dataKey: 'mentorships', name: 'Mentorships' },
            { dataKey: 'events', name: 'Events' },
            { dataKey: 'donations', name: 'Donations' }
          ]}
          title="Alumni Engagement Trends"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {topDonors.map((donor, index) => (
              <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium">{donor.name}</div>
                    <div className="text-sm text-gray-600">{donor.currentCompany}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">${donor.donationAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">donated</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Industry Distribution</h3>
          <div className="space-y-3">
            {[
              { industry: 'Technology', count: 12, percentage: 57 },
              { industry: 'Finance', count: 4, percentage: 19 },
              { industry: 'Healthcare', count: 2, percentage: 10 },
              { industry: 'Engineering', count: 2, percentage: 10 },
              { industry: 'Others', count: 1, percentage: 4 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium">{item.industry}</div>
                  <div className="text-sm text-gray-500">({item.count} alumni)</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600 mt-1">Event Attendance Rate</div>
            <div className="text-xs text-green-600 mt-1">↑ 12% from last year</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600 mt-1">Alumni Satisfaction</div>
            <div className="text-xs text-green-600 mt-1">↑ 8% from last year</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">67%</div>
            <div className="text-sm text-gray-600 mt-1">Active Network Rate</div>
            <div className="text-xs text-green-600 mt-1">↑ 15% from last year</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
