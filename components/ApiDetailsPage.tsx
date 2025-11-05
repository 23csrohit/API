import React from 'react';
import { Api } from '../types';
import { CodeIcon } from './icons';

interface ApiDetailsPageProps {
  api: Api;
  onBack: () => void;
}

const ApiDetailsPage: React.FC<ApiDetailsPageProps> = ({ api, onBack }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header section */}
        <div className="border-b pb-6 mb-8">
          <button onClick={onBack} className="text-api-blue hover:underline font-semibold mb-4">
            &larr; Back to Directory
          </button>
          <span className="block bg-api-blue/10 text-api-blue text-sm font-semibold px-3 py-1 rounded-full mb-3 w-max">
            {api.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{api.name}</h1>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column: Description and Usage */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{api.longDescription}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <CodeIcon className="h-6 w-6 mr-3 text-api-blue" />
                Usage Example
              </h2>
              <div className="bg-gray-800 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto relative">
                <span className="absolute top-2 right-3 text-xs text-gray-400">{api.usageExample.language}</span>
                <pre><code>{api.usageExample.code}</code></pre>
              </div>
            </div>
          </div>

          {/* Right column: Details and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg border sticky top-8">
              <h3 className="text-xl font-semibold text-api-blue-800 mb-4">API Details</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-500">Endpoint</p>
                  <p className="font-mono bg-gray-200 p-2 rounded text-xs text-gray-700 break-words">{api.endpoint}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Pricing</p>
                  <p className="text-gray-800">{api.pricing}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Documentation</p>
                  <a href={api.documentationUrl} target="_blank" rel="noopener noreferrer" className="text-api-orange hover:underline">
                    View Docs &rarr;
                  </a>
                </div>
              </div>
              <div className="mt-8 border-t pt-6">
                <button className="w-full text-center px-4 py-3 bg-api-orange text-white font-bold rounded-md hover:bg-api-orange-600 transition-colors duration-300">
                  Get API Key
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApiDetailsPage;