import { ChecklistData } from '../types';

export const initialChecklistData: ChecklistData = {
  packageName: '',
  phases: [
    {
      id: 'step-0',
      title: 'Step 0: Initial Setup',
      description: 'Foundation setup for your PLR package deployment',
      items: [
        {
          id: 'step-0-1',
          text: 'Download and extract PLR package files',
          completed: false
        },
        {
          id: 'step-0-2',
          text: 'Review license terms and usage rights',
          completed: false
        },
        {
          id: 'step-0-3',
          text: 'Inventory all included materials',
          completed: false,
          hasInput: true,
          inputValue: '',
          inputPlaceholder: 'List materials (e.g., ebooks, videos, graphics...)'
        },
        {
          id: 'step-0-4',
          text: 'Set up project folder structure',
          completed: false
        }
      ]
    },
    {
      id: 'phase-1',
      title: 'Phase 1: Content Preparation',
      description: 'Customize and prepare your PLR content for deployment',
      items: [
        {
          id: 'phase-1-1',
          text: 'Rebrand materials with your business identity',
          completed: false
        },
        {
          id: 'phase-1-2',
          text: 'Edit and customize content to match your voice',
          completed: false
        },
        {
          id: 'phase-1-3',
          text: 'Create or update graphics and visuals',
          completed: false
        },
        {
          id: 'phase-1-4',
          text: 'Proofread all content for quality assurance',
          completed: false
        },
        {
          id: 'phase-1-5',
          text: 'Add your contact information and branding',
          completed: false
        },
        {
          id: 'phase-1-6',
          text: 'Create additional bonus materials (optional)',
          completed: false,
          hasInput: true,
          inputValue: '',
          inputPlaceholder: 'Describe bonus materials created...'
        }
      ]
    },
    {
      id: 'phase-2',
      title: 'Phase 2: Platform Setup',
      description: 'Set up your sales and delivery platforms',
      items: [
        {
          id: 'phase-2-1',
          text: 'Choose and set up sales platform',
          completed: false,
          hasInput: true,
          inputValue: '',
          inputPlaceholder: 'Platform name (e.g., Gumroad, Shopify...)'
        },
        {
          id: 'phase-2-2',
          text: 'Create product listings with descriptions',
          completed: false
        },
        {
          id: 'phase-2-3',
          text: 'Set up payment processing',
          completed: false
        },
        {
          id: 'phase-2-4',
          text: 'Configure digital delivery system',
          completed: false
        },
        {
          id: 'phase-2-5',
          text: 'Test purchase and delivery process',
          completed: false
        },
        {
          id: 'phase-2-6',
          text: 'Set up customer support system',
          completed: false
        }
      ]
    },
    {
      id: 'phase-3',
      title: 'Phase 3: Marketing & Launch',
      description: 'Market your PLR products and launch to customers',
      items: [
        {
          id: 'phase-3-1',
          text: 'Create compelling sales copy and landing pages',
          completed: false
        },
        {
          id: 'phase-3-2',
          text: 'Design promotional graphics and banners',
          completed: false
        },
        {
          id: 'phase-3-3',
          text: 'Set up email marketing campaigns',
          completed: false
        },
        {
          id: 'phase-3-4',
          text: 'Plan social media promotion strategy',
          completed: false,
          hasInput: true,
          inputValue: '',
          inputPlaceholder: 'List social platforms and strategy...'
        },
        {
          id: 'phase-3-5',
          text: 'Create affiliate program (if applicable)',
          completed: false
        },
        {
          id: 'phase-3-6',
          text: 'Launch product and announce to audience',
          completed: false
        },
        {
          id: 'phase-3-7',
          text: 'Monitor initial sales and customer feedback',
          completed: false
        }
      ]
    },
    {
      id: 'phase-4',
      title: 'Phase 4: Optimization & Growth',
      description: 'Optimize performance and scale your PLR business',
      items: [
        {
          id: 'phase-4-1',
          text: 'Analyze sales data and customer behavior',
          completed: false
        },
        {
          id: 'phase-4-2',
          text: 'Gather and implement customer feedback',
          completed: false
        },
        {
          id: 'phase-4-3',
          text: 'Optimize pricing and product positioning',
          completed: false
        },
        {
          id: 'phase-4-4',
          text: 'Expand to additional sales channels',
          completed: false,
          hasInput: true,
          inputValue: '',
          inputPlaceholder: 'List additional channels to explore...'
        },
        {
          id: 'phase-4-5',
          text: 'Create upsells and cross-sell opportunities',
          completed: false
        },
        {
          id: 'phase-4-6',
          text: 'Plan next PLR package acquisition and deployment',
          completed: false
        }
      ]
    }
  ],
  lastUpdated: new Date().toISOString()
};
