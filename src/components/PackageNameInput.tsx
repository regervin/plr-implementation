import React from 'react';
import { Package } from 'lucide-react';

interface PackageNameInputProps {
  packageName: string;
  onPackageNameChange: (name: string) => void;
}

export const PackageNameInput: React.FC<PackageNameInputProps> = ({
  packageName,
  onPackageNameChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Package className="text-blue-600" size={24} />
        <h2 className="text-lg font-semibold text-gray-900">PLR Package Information</h2>
      </div>
      
      <div>
        <label htmlFor="package-name" className="block text-sm font-medium text-gray-700 mb-2">
          Package Name
        </label>
        <input
          id="package-name"
          type="text"
          value={packageName}
          onChange={(e) => onPackageNameChange(e.target.value)}
          placeholder="Enter the name of your PLR package..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
      </div>
    </div>
  );
};
