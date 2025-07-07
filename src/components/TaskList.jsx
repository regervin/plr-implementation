import { useState, useEffect } from 'react';

const TaskList = ({ plrName }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expandedPhase, setExpandedPhase] = useState(1);

  useEffect(() => {
    const initialTasks = [
      // Phase 1: Planning & Analysis
      {
        id: 1,
        title: "Review PLR License & Content",
        description: "Thoroughly examine license terms and inventory all included materials",
        category: "Legal",
        priority: "high",
        phase: 1,
        completed: false,
        estimatedTime: "45 min",
        tips: "Create a checklist of what you can and cannot do with the content"
      },
      {
        id: 2,
        title: "Market Research & Competitor Analysis",
        description: "Research your target market and analyze competing products",
        category: "Research",
        priority: "high",
        phase: 1,
        completed: false,
        estimatedTime: "2 hours",
        tips: "Use tools like Google Trends, Amazon bestsellers, and social media groups"
      },
      {
        id: 3,
        title: "Define Your Unique Value Proposition",
        description: "Identify what makes your version different and valuable",
        category: "Strategy",
        priority: "high",
        phase: 1,
        completed: false,
        estimatedTime: "1 hour",
        tips: "Focus on your personal experience and unique insights"
      },
      {
        id: 4,
        title: "Create Content Strategy & Calendar",
        description: "Plan how you'll use and distribute the PLR content",
        category: "Planning",
        priority: "medium",
        phase: 1,
        completed: false,
        estimatedTime: "1.5 hours",
        tips: "Consider multiple formats: ebook, course, blog series, social posts"
      },

      // Phase 2: Customization & Branding
      {
        id: 5,
        title: "Rebrand All Visual Elements",
        description: "Replace generic branding with your logo, colors, and style",
        category: "Design",
        priority: "high",
        phase: 2,
        completed: false,
        estimatedTime: "3 hours",
        tips: "Use Canva or similar tools for professional-looking designs"
      },
      {
        id: 6,
        title: "Rewrite & Personalize Content",
        description: "Add your voice, examples, and unique insights to the content",
        category: "Content",
        priority: "high",
        phase: 2,
        completed: false,
        estimatedTime: "5 hours",
        tips: "Aim for 30-50% original content to make it truly yours"
      },
      {
        id: 7,
        title: "Create Lead Magnets & Bonuses",
        description: "Develop free resources to capture leads and add value",
        category: "Marketing",
        priority: "high",
        phase: 2,
        completed: false,
        estimatedTime: "2 hours",
        tips: "Checklists, templates, and quick-start guides work well"
      },
      {
        id: 8,
        title: "Build Sales Pages & Funnels",
        description: "Create compelling landing pages and sales sequences",
        category: "Marketing",
        priority: "high",
        phase: 2,
        completed: false,
        estimatedTime: "4 hours",
        tips: "Focus on benefits, not features. Include testimonials and guarantees"
      },
      {
        id: 9,
        title: "Set Up Payment & Delivery Systems",
        description: "Configure payment processing and automated delivery",
        category: "Technical",
        priority: "high",
        phase: 2,
        completed: false,
        estimatedTime: "2 hours",
        tips: "Test the entire customer journey before launch"
      },

      // Phase 3: Launch & Marketing
      {
        id: 10,
        title: "Build Email Marketing Sequences",
        description: "Create nurture sequences and promotional campaigns",
        category: "Marketing",
        priority: "high",
        phase: 3,
        completed: false,
        estimatedTime: "3 hours",
        tips: "Include value-first emails, not just promotional content"
      },
      {
        id: 11,
        title: "Create Social Media Content",
        description: "Develop posts, stories, and videos for social platforms",
        category: "Marketing",
        priority: "medium",
        phase: 3,
        completed: false,
        estimatedTime: "2 hours",
        tips: "Repurpose content across multiple platforms with platform-specific tweaks"
      },
      {
        id: 12,
        title: "Launch Beta Test Campaign",
        description: "Soft launch to a small audience for feedback and optimization",
        category: "Testing",
        priority: "high",
        phase: 3,
        completed: false,
        estimatedTime: "1 week",
        tips: "Offer beta pricing in exchange for detailed feedback"
      },
      {
        id: 13,
        title: "Execute Full Launch Campaign",
        description: "Roll out complete marketing campaign across all channels",
        category: "Marketing",
        priority: "high",
        phase: 3,
        completed: false,
        estimatedTime: "2 weeks",
        tips: "Create urgency with limited-time bonuses or pricing"
      },
      {
        id: 14,
        title: "Monitor, Analyze & Optimize",
        description: "Track performance metrics and continuously improve",
        category: "Analytics",
        priority: "medium",
        phase: 3,
        completed: false,
        estimatedTime: "Ongoing",
        tips: "Focus on conversion rates, customer feedback, and revenue per visitor"
      }
    ];

    const savedTasks = localStorage.getItem('plrTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
      localStorage.setItem('plrTasks', JSON.stringify(initialTasks));
    }
  }, []);

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('plrTasks', JSON.stringify(updatedTasks));
  };

  const getPhaseInfo = (phase) => {
    const phaseData = {
      1: {
        title: "Planning & Analysis",
        description: "Research, strategy, and foundation setting",
        icon: "🎯",
        color: "blue"
      },
      2: {
        title: "Customization & Branding", 
        description: "Transform PLR into your unique product",
        icon: "🎨",
        color: "purple"
      },
      3: {
        title: "Launch & Marketing",
        description: "Bring your product to market successfully",
        icon: "🚀",
        color: "green"
      }
    };
    return phaseData[phase] || phaseData[1];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Legal': 'bg-purple-100 text-purple-800',
      'Research': 'bg-blue-100 text-blue-800',
      'Strategy': 'bg-indigo-100 text-indigo-800',
      'Planning': 'bg-cyan-100 text-cyan-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Content': 'bg-green-100 text-green-800',
      'Marketing': 'bg-orange-100 text-orange-800',
      'Technical': 'bg-gray-100 text-gray-800',
      'Testing': 'bg-yellow-100 text-yellow-800',
      'Analytics': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group tasks by phase
  const tasksByPhase = tasks.reduce((acc, task) => {
    if (!acc[task.phase]) acc[task.phase] = [];
    acc[task.phase].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {plrName ? `${plrName} Implementation` : 'PLR Implementation Progress'}
            </h2>
            <p className="text-gray-600 mt-1">Track your progress through the implementation phases</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="progress-bar mb-4">
          <div 
            className={`progress-bar-fill transition-all duration-500 ${
              progressPercentage < 30 ? 'low' : 
              progressPercentage < 70 ? 'medium' : 'high'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            <strong>{completedCount}</strong> of <strong>{totalCount}</strong> tasks completed
          </span>
          <span className="text-gray-600">
            <strong>{totalCount - completedCount}</strong> remaining
          </span>
        </div>
      </div>

      {/* Phase Cards */}
      {[1, 2, 3].map(phase => {
        const phaseTasks = tasksByPhase[phase] || [];
        const phaseInfo = getPhaseInfo(phase);
        const phaseCompleted = phaseTasks.filter(t => t.completed).length;
        const phaseTotal = phaseTasks.length;
        const phaseProgress = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
        const isExpanded = expandedPhase === phase;

        return (
          <div key={phase} className="card">
            <div 
              className="cursor-pointer"
              onClick={() => setExpandedPhase(isExpanded ? null : phase)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-${phaseInfo.color}-100`}>
                    {phaseInfo.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Phase {phase}: {phaseInfo.title}
                    </h3>
                    <p className="text-gray-600">{phaseInfo.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{phaseProgress}%</div>
                    <div className="text-sm text-gray-500">{phaseCompleted}/{phaseTotal}</div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="progress-bar">
                <div 
                  className={`progress-bar-fill ${
                    phaseProgress < 30 ? 'low' : 
                    phaseProgress < 70 ? 'medium' : 'high'
                  }`}
                  style={{ width: `${phaseProgress}%` }}
                ></div>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-6 space-y-4">
                {phaseTasks.map(task => (
                  <div
                    key={task.id}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                      task.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className={`text-lg font-medium ${
                            task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h4>
                          
                          <div className="flex space-x-2 ml-4">
                            <span className={`badge text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`badge text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                          </div>
                        </div>
                        
                        <p className={`text-sm mb-3 leading-relaxed ${
                          task.completed ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                        
                        {task.tips && (
                          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-800">
                              <strong>💡 Tip:</strong> {task.tips}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">
                            ⏱️ Estimated time: <strong>{task.estimatedTime}</strong>
                          </span>
                          {task.completed && (
                            <span className="text-green-600 font-medium flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
