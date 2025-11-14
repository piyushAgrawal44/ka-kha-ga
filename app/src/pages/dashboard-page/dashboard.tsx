// DashboardPage.tsx - Main Dashboard Home Page Component

import React from 'react';
import {
  Users,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
} from 'lucide-react';

interface DashboardPageProps {
}

const DashboardPage: React.FC<DashboardPageProps> = () => {


  // Sample data - Replace with actual API calls
  const stats = [
    {
      id: 1,
      label: 'Total Children',
      value: '24',
      change: '+12%',
      isPositive: true,
      icon: Users,
      color: 'from-purple-600 to-purple-400',
    },
    {
      id: 2,
      label: 'Active Sessions',
      value: '18',
      change: '+8%',
      isPositive: true,
      icon: Calendar,
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 3,
      label: 'Milestones This Week',
      value: '47',
      change: '+23%',
      isPositive: true,
      icon: Target,
      color: 'from-green-600 to-green-400',
    },
    {
      id: 4,
      label: 'Progress Rate',
      value: '92%',
      change: '-2%',
      isPositive: false,
      icon: TrendingUp,
      color: 'from-pink-600 to-pink-400',
    },
  ];

  const recentMilestones = [
    {
      id: 1,
      childName: 'Alex Johnson',
      milestone: 'Can form 3-word sentences',
      therapist: 'Dr. Sarah Kim',
      date: '2 hours ago',
      category: 'Speech',
    },
    {
      id: 2,
      childName: 'Emma Rodriguez',
      milestone: 'Improved attention span to 15 mins',
      therapist: 'Ms. Jennifer Lee',
      date: '5 hours ago',
      category: 'Behavioral',
    },
    {
      id: 3,
      childName: 'Sarah Lee',
      milestone: 'Threaded 15 beads independently',
      therapist: 'Dr. Maria Garcia',
      date: '1 day ago',
      category: 'Motor Skills',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      childName: 'Alex Johnson',
      therapyType: 'Speech Therapy',
      time: '9:00 AM',
      duration: '45 mins',
      therapist: 'Dr. Sarah Kim',
    },
    {
      id: 2,
      childName: 'Emma Rodriguez',
      therapyType: 'Speech Therapy',
      time: '10:30 AM',
      duration: '45 mins',
      therapist: 'Dr. Sarah Kim',
    },
    {
      id: 3,
      childName: 'Sarah Lee',
      therapyType: 'Occupational Therapy',
      time: '2:00 PM',
      duration: '60 mins',
      therapist: 'Dr. Maria Garcia',
    },
  ];

  const topPerformers = [
    { name: 'Emma R.', progress: 92, improvement: '+18%' },
    { name: 'Alex J.', progress: 88, improvement: '+15%' },
    { name: 'Sarah L.', progress: 85, improvement: '+12%' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your practice today.
            </p>
          </div>
          <button className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
            <Calendar className="w-5 h-5" />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-10`}
              >
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
              <span
                className={`flex items-center text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Milestones */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Milestones</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.childName.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {milestone.childName}
                    </h3>
                    <span className="text-xs text-gray-500">{milestone.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    🎉 {milestone.milestone}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {milestone.therapist}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {milestone.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Performers</h2>
            <button>
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {performer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">
                        {performer.improvement} this month
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {performer.progress}%
                    </p>
                    <Award className="w-5 h-5 text-yellow-500 ml-auto" />
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${performer.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
            View Calendar
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-purple-600">
                  {session.time}
                </span>
                <span className="text-sm text-gray-500">{session.duration}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {session.childName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{session.therapyType}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{session.therapist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-semibold text-gray-900">Add Milestone</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-semibold text-gray-900">Schedule Session</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-semibold text-gray-900">Add Child</p>
        </button>
        <button className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-pink-600" />
          </div>
          <p className="font-semibold text-gray-900">View Reports</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;