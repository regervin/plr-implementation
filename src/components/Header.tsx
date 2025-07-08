import React from 'react';
import { Download, RotateCcw, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  totalCompleted: number;
  totalItems: number;
  onExport: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCompleted,
  totalItems,
  onExport,
  onReset
}) => {
  const progressPercentage = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" size={28} />
              Universal PLR Implementation Checklist
            </h1>
            <p className="text-gray-600 mt-1">
              Systematically deploy your PLR packages with confidence
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              Export Progress
            </button>
            
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{totalCompleted} of {totalItems} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>
      </div>
    </header>
  );
};
