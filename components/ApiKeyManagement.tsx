import React, { useState } from 'react';

const ApiKeyManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<string[]>(['sk-live-a1b2c3d4e5f6g7h8i9j0k1l2', 'sk-live-z9y8x7w6v5u4t3s2r1q0p9o8']);
  const [generationMessage, setGenerationMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerateKey = () => {
    const newKey = `sk-live-${Math.random().toString(36).substring(2, 14)}${Math.random().toString(36).substring(2, 14)}`;
    setApiKeys(prevKeys => [newKey, ...prevKeys]);
    setGenerationMessage(`New API Key generated successfully!`);

    setTimeout(() => {
      setGenerationMessage('');
    }, 5000);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy API key: ', err);
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-api-blue">API Key Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Generate, revoke, and manage your access keys below.</p>
        </div>
        <button 
          onClick={handleGenerateKey}
          className="bg-green-600 text-white font-bold py-2 px-4 sm:px-5 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          + Generate New API Key
        </button>
      </div>
      
      {generationMessage && (
        <div className="my-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md text-sm transition-opacity duration-300">
          {generationMessage}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Your Keys</h3>
        {apiKeys.length > 0 ? (
          <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {apiKeys.map((key, index) => (
              <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-md border shadow-sm gap-3">
                <pre className="text-xs sm:text-sm text-gray-600 font-mono overflow-x-auto flex-1 min-w-0 break-all">{key}</pre>
                <div className="flex items-center flex-shrink-0 space-x-3 sm:space-x-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleCopyKey(key)}
                    disabled={copiedKey === key}
                    className="text-xs sm:text-sm font-semibold text-api-blue hover:text-api-blue-800 disabled:text-green-600 disabled:cursor-not-allowed transition-colors px-3 py-1.5 border border-api-blue rounded-md hover:bg-api-blue/10 disabled:border-green-600 flex-1 sm:flex-none"
                  >
                    {copiedKey === key ? 'Copied!' : 'Copy'}
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold px-3 py-1.5 border border-red-500 rounded-md hover:bg-red-50 flex-1 sm:flex-none">Revoke</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-md border">
            <p className="text-gray-500 italic text-sm sm:text-base">You have not generated any API keys yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyManagement;
