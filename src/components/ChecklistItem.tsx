import React from 'react';
import { ChecklistItem as ChecklistItemType } from '../types';
import { Check, Square } from 'lucide-react';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: () => void;
  onInputChange: (value: string) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onToggle,
  onInputChange
}) => {
  return (
    <div className="group">
      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-0.5 transition-colors"
        >
          {item.completed ? (
            <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
          ) : (
            <Square size={20} className="text-gray-400 hover:text-gray-600" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <label
            onClick={onToggle}
            className={`block text-sm cursor-pointer transition-colors ${
              item.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-900 hover:text-gray-700'
            }`}
          >
            {item.text}
          </label>
          
          {item.hasInput && (
            <div className="mt-2">
              <input
                type="text"
                value={item.inputValue || ''}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={item.inputPlaceholder}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
