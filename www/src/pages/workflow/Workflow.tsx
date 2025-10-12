import { useState } from 'react';
import { 
  User, Calendar, Target, FileText, Bell, TrendingUp, 
  CheckCircle2, Clock, Users, ArrowRight, Plus, 
  MessageSquare, Award, Activity, Brain, Heart,
  BarChart3, Download, Share2, Edit, Save, X
} from 'lucide-react';

export default function WorkflowPage() {
  const [activeWorkflow, setActiveWorkflow] = useState('milestone');

  const workflows = [
    { id: 'milestone', label: 'Add Milestone' },
    { id: 'session', label: 'Session Notes' },
    { id: 'parent', label: 'Parent View' },
    { id: 'dashboard', label: 'Therapist Dashboard' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            क-ख-ग
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Workflows</span>
          </h1>
          <p className="text-xl text-gray-600">Interactive software demonstrations for potential clients</p>
        </div>

        {/* Workflow Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {workflows.map(wf => (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflow(wf.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                activeWorkflow === wf.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              {wf.label}
            </button>
          ))}
        </div>

        {/* Workflow 1: Add Milestone */}
        {activeWorkflow === 'milestone' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-600" />
                Workflow 1: Adding a Milestone
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Step 1 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Select Child</h3>
                    <p className="text-sm text-gray-600">Choose the child from your caseload</p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-purple-600" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                      <Edit className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Record Progress</h3>
                    <p className="text-sm text-gray-600">Document achievement with notes and media</p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-purple-600" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Notify Parents</h3>
                  <p className="text-sm text-gray-600">Parents instantly receive the update</p>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
                  {/* Mock Interface Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg">
                    <h3 className="font-semibold flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      New Milestone Entry
                    </h3>
                  </div>
                  
                  {/* Mock Form */}
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Child Name</label>
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            AJ
                          </div>
                          <div>
                            <div className="font-semibold">Alex Johnson</div>
                            <div className="text-sm text-gray-500">Age: 5 years • Speech Therapy</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Milestone Category</label>
                      <div className="border-2 border-purple-300 rounded-lg p-3 bg-purple-50">
                        <div className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-purple-900">Speech & Language</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Achievement</label>
                      <div className="border-2 border-green-300 rounded-lg p-3 bg-green-50">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-900">Can form 3-word sentences</span>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                      <div className="border-2 border-gray-200 rounded-lg p-3 text-gray-600 text-sm">
                        Alex successfully formed multiple 3-word sentences during today's session. Showed consistent improvement in subject-verb-object construction. Recommended activities for home practice included.
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Session Date: Oct 12, 2025</span>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all">
                        <Save className="w-5 h-5" />
                        <span>Save & Notify Parents</span>
                      </button>
                      <button className="px-6 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow 2: Session Notes */}
        {activeWorkflow === 'session' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-8 h-8 mr-3 text-purple-600" />
                Workflow 2: Recording Session Notes
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-sm">Schedule Session</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 text-center">
                  <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-sm">Conduct Activities</div>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-4 text-center">
                  <FileText className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <div className="font-bold text-sm">Document Notes</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center">
                  <Share2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-sm">Share with Team</div>
                </div>
              </div>

              {/* Session Notes Interface */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Session Notes - Oct 12, 2025</span>
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">In Progress</span>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Child Info */}
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          SL
                        </div>
                        <div>
                          <div className="font-bold text-lg">Sarah Lee</div>
                          <div className="text-sm text-gray-500">Session #24 • Occupational Therapy</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-bold text-lg">45 mins</div>
                      </div>
                    </div>

                    {/* Activities Completed */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-purple-600" />
                        Activities Completed
                      </h4>
                      <div className="space-y-2">
                        {['Fine Motor Skills - Bead Threading', 'Sensory Integration - Tactile Play', 'Hand-Eye Coordination - Ball Toss'].map((activity, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-900">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Observations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Observations & Progress</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                        Sarah showed significant improvement in fine motor control. Successfully threaded 15 beads independently (up from 8 last session). Demonstrated better focus and patience during activities. Recommend continuing with similar exercises at home.
                      </div>
                    </div>

                    {/* Goals Progress */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Goals Progress</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Fine Motor Skills</span>
                            <span className="text-sm font-bold text-purple-600">75%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 w-3/4"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Sensory Processing</span>
                            <span className="text-sm font-bold text-purple-600">60%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 w-3/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                        Complete Session
                      </button>
                      <button className="px-6 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                        Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow 3: Parent View */}
        {activeWorkflow === 'parent' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-pink-600" />
                Parent Dashboard View
              </h2>
              
              <p className="text-gray-600 mb-8">What parents see when they login to track their child's progress</p>

              {/* Parent Dashboard */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">Welcome back, Mom! 👋</h3>
                        <p className="text-pink-100">Here's Emma's progress</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                        <Bell className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Child Profile */}
                    <div className="flex items-center space-x-4 pb-6 border-b">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        E
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900">Emma Rodriguez</h4>
                        <p className="text-gray-500">Age 4 • Started therapy: Jan 2025</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">+28%</div>
                        <div className="text-sm text-gray-500">Overall Progress</div>
                      </div>
                    </div>

                    {/* Recent Milestones */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-500" />
                        Recent Milestones (This Week)
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 mb-1">🎉 First 5-word sentence!</div>
                              <p className="text-sm text-gray-600 mb-2">Emma said "I want to play outside now" independently during speech therapy.</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  Dr. Sarah Kim
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  2 hours ago
                                </span>
                              </div>
                            </div>
                            <Award className="w-8 h-8 text-yellow-500 flex-shrink-0 ml-4" />
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 mb-1">Improved attention span</div>
                              <p className="text-sm text-gray-600 mb-2">Focused on single activity for 15 minutes (goal: 12 minutes)</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  Ms. Jennifer Lee
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Yesterday
                                </span>
                              </div>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-blue-500 flex-shrink-0 ml-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Chart */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                        Progress Over Time
                      </h4>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                        <div className="space-y-4">
                          {[
                            { label: 'Speech & Language', progress: 85, color: 'from-purple-600 to-pink-600' },
                            { label: 'Social Skills', progress: 70, color: 'from-blue-600 to-cyan-600' },
                            { label: 'Motor Skills', progress: 65, color: 'from-green-600 to-emerald-600' }
                          ].map((item, idx) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900">{item.label}</span>
                                <span className="font-bold text-purple-600">{item.progress}%</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${item.color}`}
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Next Session */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Next Session</div>
                          <div className="text-sm text-gray-600">Speech Therapy with Dr. Sarah Kim</div>
                          <div className="text-sm text-gray-500 mt-1">Monday, Oct 14 at 10:00 AM</div>
                        </div>
                        <Calendar className="w-10 h-10 text-yellow-600" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                        <MessageSquare className="w-5 h-5" />
                        <span>Message Therapist</span>
                      </button>
                      <button className="border-2 border-purple-300 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Download Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow 4: Therapist Dashboard */}
        {activeWorkflow === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-purple-600" />
                Therapist Dashboard
              </h2>
              
              <p className="text-gray-600 mb-8">Comprehensive view of all your clients and their progress</p>

              {/* Dashboard Interface */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-lg">
                  {/* Dashboard Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
                    <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">24</div>
                        <div className="text-sm text-purple-100">Active Clients</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">18</div>
                        <div className="text-sm text-purple-100">This Week's Sessions</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">47</div>
                        <div className="text-sm text-purple-100">Milestones Added</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">92%</div>
                        <div className="text-sm text-purple-100">Avg Progress Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                      <div className="grid grid-cols-4 gap-3">
                        <button className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-lg hover:shadow-md transition-all">
                          <Plus className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Add Milestone</div>
                        </button>
                        <button className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-lg hover:shadow-md transition-all">
                          <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Session Notes</div>
                        </button>
                        <button className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg hover:shadow-md transition-all">
                          <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Schedule</div>
                        </button>
                        <button className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg hover:shadow-md transition-all">
                          <BarChart3 className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                          <div className="text-sm font-semibold text-gray-900">Reports</div>
                        </button>
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                        Today's Schedule
                      </h4>
                      <div className="space-y-3">
                        {[
                          { name: 'Alex Johnson', time: '9:00 AM', type: 'Speech Therapy', color: 'purple' },
                          { name: 'Emma Rodriguez', time: '10:30 AM', type: 'Speech Therapy', color: 'pink' },
                          { name: 'Sarah Lee', time: '2:00 PM', type: 'Occupational Therapy', color: 'blue' }
                        ].map((session, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 bg-gradient-to-br from-${session.color}-400 to-${session.color}-500 rounded-full flex items-center justify-center text-white font-bold`}>
                                {session.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{session.name}</div>
                                <div className="text-sm text-gray-500">{session.type}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">{session.time}</div>
                              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">View Details</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Progress Summary */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                        Top Performing Clients This Month
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'Emma R.', progress: 92, improvement: '+18%' },
                          { name: 'Alex J.', progress: 88, improvement: '+15%' },
                          { name: 'Sarah L.', progress: 85, improvement: '+12%' }
                        ].map((client, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-gray-900">{client.name}</div>
                              <Award className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-1">{client.progress}%</div>
                            <div className="text-xs text-gray-600">Progress Score</div>
                            <div className="mt-2 text-sm font-semibold text-green-700">{client.improvement} this month</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activities */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-purple-600" />
                        Recent Activity Feed
                      </h4>
                      <div className="space-y-2">
                        {[
                          { action: 'Milestone added', client: 'Alex Johnson', detail: 'Can form 3-word sentences', time: '2 hours ago', icon: <Target className="w-4 h-4" /> },
                          { action: 'Session completed', client: 'Sarah Lee', detail: 'Occupational Therapy - 45 mins', time: '5 hours ago', icon: <CheckCircle2 className="w-4 h-4" /> },
                          { action: 'Parent message', client: 'Emma Rodriguez', detail: 'Question about home exercises', time: '1 day ago', icon: <MessageSquare className="w-4 h-4" /> }
                        ].map((activity, idx) => (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                              {activity.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{activity.action}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{activity.client}</span>
                              </div>
                              <div className="text-sm text-gray-500">{activity.detail}</div>
                            </div>
                            <div className="text-xs text-gray-400">{activity.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Add New Client</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to See More?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These workflows demonstrate how क-ख-ग streamlines therapy management, improves communication between therapists and parents, and helps track every child's unique journey to success.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Schedule a Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}