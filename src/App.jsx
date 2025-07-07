import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [plrName, setPlrName] = useState('');

  useEffect(() => {
    const savedPlrName = localStorage.getItem('plrName');
    if (savedPlrName) {
      setPlrName(savedPlrName);
    }
  }, []);

  const handlePlrNameChange = (e) => {
    const newName = e.target.value;
    setPlrName(newName);
    localStorage.setItem('plrName', newName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PLR Package Implementation Action Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your PLR content into a profitable business with this comprehensive step-by-step guide
          </p>
        </div>

        <div className="card mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Get Started</h2>
              <p className="text-gray-600">Enter your PLR package name to personalize your action plan</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="plr-name" className="block text-sm font-medium text-gray-700 mb-2">
                PLR Package Name
              </label>
              <input
                type="text"
                id="plr-name"
                value={plrName}
                onChange={handlePlrNameChange}
                placeholder="e.g., Ultimate Weight Loss Guide, Social Media Marketing Mastery..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            
            {plrName && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  <strong>Great!</strong> Your action plan is now customized for: <em>"{plrName}"</em>
                </p>
              </div>
            )}
          </div>
        </div>

        <TaskList plrName={plrName} />

        <div className="card mt-8">
          <div className="border-l-4 border-yellow-400 pl-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📋 Important Implementation Notes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Legal & Compliance</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Review PLR license terms carefully</li>
                  <li>• Ensure FTC compliance for all claims</li>
                  <li>• Add proper disclaimers and disclosures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Quality Control</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Test all content before publishing</li>
                  <li>• Maintain consistent brand voice</li>
                  <li>• Regular backup of customized content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            💡 <strong>Pro Tip:</strong> Complete tasks in order for best results. Each phase builds upon the previous one.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
