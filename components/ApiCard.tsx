import React from 'react';
import { Api } from '../types';

interface ApiCardProps {
  api: Api;
  onViewDetails: () => void;
}

const ApiCard: React.FC<ApiCardProps> = ({ api, onViewDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="flex-grow">
        <span className="inline-block bg-api-blue/10 text-api-blue text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
          {api.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{api.name}</h3>
        <p className="text-gray-600 text-sm">{api.description}</p>
      </div>
      <div className="mt-6">
        <button 
          onClick={onViewDetails}
          className="w-full text-center px-4 py-2 bg-api-orange text-white font-semibold rounded-md hover:bg-api-orange-600 transition-colors duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApiCard;