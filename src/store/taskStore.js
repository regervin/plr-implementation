import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

// Sample initial tasks
const initialTasks = [
  {
    id: '1',
    title: 'Review PLR Content Package',
    description: 'Go through the entire PLR package to understand what content is included and how it can be used.',
    status: 'completed',
    phase: 1,
    priority: 'high',
    subtasks: [
      { id: '1-1', title: 'Inventory all included files', completed: true },
      { id: '1-2', title: 'Read license terms', completed: true },
      { id: '1-3', title: 'Identify key content pieces', completed: true }
    ]
  },
  {
    id: '2',
    title: 'Create Content Plan',
    description: 'Develop a strategic plan for how to use and repurpose the PLR content across different platforms.',
    status: 'in-progress',
    phase: 1,
    priority: 'high',
    subtasks: [
      { id: '2-1', title: 'Define target audience', completed: true },
      { id: '2-2', title: 'Outline content distribution channels', completed: true },
      { id: '2-3', title: 'Create content calendar', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Customize Main eBook',
    description: 'Edit and personalize the main PLR eBook to match your brand voice and add unique insights.',
    status: 'not-started',
    phase: 2,
    priority: 'medium',
    subtasks: [
      { id: '3-1', title: 'Rewrite introduction', completed: false },
      { id: '3-2', title: 'Add case studies', completed: false },
      { id: '3-3', title: 'Update graphics and formatting', completed: false },
      { id: '3-4', title: 'Proofread final version', completed: false }
    ]
  },
  {
    id: '4',
    title: 'Create Social Media Posts',
    description: 'Break down the PLR content into engaging social media posts for multiple platforms.',
    status: 'not-started',
    phase: 2,
    priority: 'medium',
    subtasks: [
      { id: '4-1', title: 'Extract key quotes and tips', completed: false },
      { id: '4-2', title: 'Design graphics for posts', completed: false },
      { id: '4-3', title: 'Schedule posts in content calendar', completed: false }
    ]
  },
  {
    id: '5',
    title: 'Set Up Email Sequence',
    description: 'Adapt the PLR content into an email sequence to nurture subscribers.',
    status: 'not-started',
    phase: 2,
    priority: 'high',
    subtasks: [
      { id: '5-1', title: 'Outline email sequence flow', completed: false },
      { id: '5-2', title: 'Write email content', completed: false },
      { id: '5-3', title: 'Set up in email marketing platform', completed: false },
      { id: '5-4', title: 'Create opt-in incentive', completed: false }
    ]
  },
  {
    id: '6',
    title: 'Launch Content',
    description: 'Publish and promote the customized PLR content across all planned channels.',
    status: 'not-started',
    phase: 3,
    priority: 'high',
    subtasks: [
      { id: '6-1', title: 'Publish eBook', completed: false },
      { id: '6-2', title: 'Activate email sequence', completed: false },
      { id: '6-3', title: 'Begin social media campaign', completed: false }
    ]
  },
  {
    id: '7',
    title: 'Monitor Performance',
    description: 'Track engagement and conversion metrics for the published PLR content.',
    status: 'not-started',
    phase: 3,
    priority: 'medium',
    subtasks: [
      { id: '7-1', title: 'Set up analytics tracking', completed: false },
      { id: '7-2', title: 'Create performance dashboard', completed: false },
      { id: '7-3', title: 'Schedule weekly review', completed: false }
    ]
  }
]

const useTaskStore = create((set) => ({
  tasks: initialTasks,
  
  // Add a new task
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: uuidv4() }]
  })),
  
  // Update an existing task
  updateTask: (taskId, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    )
  })),
  
  // Delete a task
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  
  // Toggle subtask completion
  toggleSubtask: (taskId, subtaskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            subtasks: task.subtasks.map(subtask => 
              subtask.id === subtaskId 
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          }
        : task
    )
  })),
  
  // Add a subtask to a task
  addSubtask: (taskId, subtaskTitle) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            subtasks: [
              ...task.subtasks,
              {
                id: uuidv4(),
                title: subtaskTitle,
                completed: false
              }
            ]
          }
        : task
    )
  })),
  
  // Delete a subtask
  deleteSubtask: (taskId, subtaskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId)
          }
        : task
    )
  })),
  
  // Update task status
  updateTaskStatus: (taskId, status) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    )
  })),
}))

export default useTaskStore
