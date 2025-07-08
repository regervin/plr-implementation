import { useState } from 'react'
import StepItem from './StepItem'

const TaskList = ({ plrName }) => {
  const [steps, setSteps] = useState([
    {
      number: 1,
      title: "Research and Select PLR Content",
      description: "Find high-quality PLR content that aligns with your niche and audience needs.",
      category: "Research",
      completed: false
    },
    {
      number: 2,
      title: "Review and Analyze Content Quality",
      description: "Thoroughly examine the PLR content for accuracy, relevance, and overall quality.",
      category: "Research",
      completed: false
    },
    {
      number: 3,
      title: "Plan Content Customization Strategy",
      description: "Develop a comprehensive plan for how you'll modify and personalize the content.",
      category: "Planning",
      completed: false
    },
    {
      number: 4,
      title: "Create Content Outline and Structure",
      description: "Organize the content into a logical flow that serves your specific goals.",
      category: "Planning",
      completed: false
    },
    {
      number: 5,
      title: "Rewrite and Personalize Content",
      description: "Modify the PLR content to match your voice, brand, and unique perspective.",
      category: "Content Creation",
      completed: false
    },
    {
      number: 6,
      title: "Add Original Examples and Case Studies",
      description: "Include your own examples, stories, and case studies to make content unique.",
      category: "Content Creation",
      completed: false
    },
    {
      number: 7,
      title: "Design Visual Elements and Graphics",
      description: "Create or customize images, charts, and visual elements for the content.",
      category: "Design",
      completed: false
    },
    {
      number: 8,
      title: "Format and Style Content",
      description: "Apply consistent formatting, styling, and branding to all content elements.",
      category: "Design",
      completed: false
    },
    {
      number: 9,
      title: "Proofread and Edit Content",
      description: "Thoroughly review content for grammar, spelling, and clarity issues.",
      category: "Quality Assurance",
      completed: false
    },
    {
      number: 10,
      title: "Test Content with Target Audience",
      description: "Get feedback from a small group of your target audience before full launch.",
      category: "Quality Assurance",
      completed: false
    },
    {
      number: 11,
      title: "Set Up Distribution Channels",
      description: "Prepare your website, email lists, and other channels for content distribution.",
      category: "Distribution",
      completed: false
    },
    {
      number: 12,
      title: "Create Marketing Materials",
      description: "Develop promotional content, sales pages, and marketing assets.",
      category: "Marketing",
      completed: false
    },
    {
      number: 13,
      title: "Launch and Promote Content",
      description: "Execute your launch strategy and begin promoting the customized content.",
      category: "Marketing",
      completed: false
    },
    {
      number: 14,
      title: "Monitor Performance and Optimize",
      description: "Track results, gather feedback, and make improvements based on performance data.",
      category: "Optimization",
      completed: false
    }
  ])

  const toggleStep = (index) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, completed: !step.completed } : step
    ))
  }

  const completedSteps = steps.filter(step => step.completed).length
  const progressPercentage = (completedSteps / steps.length) * 100

  const getCategoryColor = (category) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-purple-100 text-purple-800',
      'Content Creation': 'bg-green-100 text-green-800',
      'Design': 'bg-yellow-100 text-yellow-800',
      'Quality Assurance': 'bg-red-100 text-red-800',
      'Distribution': 'bg-indigo-100 text-indigo-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Optimization': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            PLR Implementation Progress
          </h2>
          <span className="text-sm text-gray-600">
            {completedSteps} of {steps.length} steps completed
          </span>
        </div>
        
        <div className="progress-bar mb-2">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-600">
          {progressPercentage.toFixed(0)}% Complete
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepItem
            key={step.number}
            step={step}
            stepIndex={index}
            onToggle={() => toggleStep(index)}
            plrName={plrName}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          Implementation Summary
        </h3>
        <p className="text-blue-800 text-sm">
          Follow these 14 steps to successfully implement and customize your PLR content. 
          Each step builds upon the previous one to ensure a comprehensive and professional result.
        </p>
      </div>
    </div>
  )
}

export default TaskList
