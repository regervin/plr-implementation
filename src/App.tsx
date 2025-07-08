import React, { useMemo } from 'react';
import { ChecklistData } from './types';
import { initialChecklistData } from './data/checklistData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { PhaseCard } from './components/PhaseCard';
import { PackageNameInput } from './components/PackageNameInput';

function App() {
  const [checklistData, setChecklistData] = useLocalStorage<ChecklistData>(
    'plr-checklist-data',
    initialChecklistData
  );

  const { totalCompleted, totalItems } = useMemo(() => {
    const total = checklistData.phases.reduce((acc, phase) => acc + phase.items.length, 0);
    const completed = checklistData.phases.reduce(
      (acc, phase) => acc + phase.items.filter(item => item.completed).length,
      0
    );
    return { totalCompleted: completed, totalItems: total };
  }, [checklistData]);

  const handleToggleItem = (itemId: string) => {
    setChecklistData(prev => ({
      ...prev,
      phases: prev.phases.map(phase => ({
        ...phase,
        items: phase.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      })),
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleInputChange = (itemId: string, value: string) => {
    setChecklistData(prev => ({
      ...prev,
      phases: prev.phases.map(phase => ({
        ...phase,
        items: phase.items.map(item =>
          item.id === itemId ? { ...item, inputValue: value } : item
        )
      })),
      lastUpdated: new Date().toISOString()
    }));
  };

  const handlePackageNameChange = (packageName: string) => {
    setChecklistData(prev => ({
      ...prev,
      packageName,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(checklistData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `plr-checklist-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      setChecklistData(initialChecklistData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        totalCompleted={totalCompleted}
        totalItems={totalItems}
        onExport={handleExport}
        onReset={handleReset}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <PackageNameInput
          packageName={checklistData.packageName}
          onPackageNameChange={handlePackageNameChange}
        />

        <div className="space-y-8 mt-8">
          {checklistData.phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onToggleItem={handleToggleItem}
              onInputChange={handleInputChange}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date(checklistData.lastUpdated).toLocaleString()}</p>
          <p className="mt-2">Your progress is automatically saved locally in your browser.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
