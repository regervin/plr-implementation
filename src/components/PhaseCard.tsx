import React from 'react';
import { Phase } from '../types';
import { ChecklistItem } from './ChecklistItem';
import { CheckCircle2, Circle } from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
  onToggleItem: (itemId: string) => void;
  onInputChange: (itemId: string, value: string) => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  onToggleItem,
  onInputChange
}) => {
  const completedItems = phase.items.filter(item => item.completed).length;
  const totalItems = phase.items.length;
  const isPhaseComplete = completedItems === totalItems;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isPhaseComplete ? (
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
              ) : (
                <Circle className="text-gray-400 flex-shrink-0" size={24} />
              )}
              <h2 className="text-xl font-semibold text-gray-900">{phase.title}</h2>
            </div>
            <p className="text-gray-600">{phase.description}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {phase.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => onToggleItem(item.id)}
              onInputChange={(value) => onInputChange(item.id, value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
