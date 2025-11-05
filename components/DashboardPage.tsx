import React, { useState } from 'react';
import ApiKeyManagement from './ApiKeyManagement';
import ApiLogs from './ApiLogs';
import ClientInfo from './ClientInfo';
import DashboardOverview from './DashboardOverview';
import DashboardSidebar from './DashboardSidebar';
import { ApiHubLogo, MenuIcon } from './icons';
import VehicleDetails from './VehicleDetails';
import WalletPage from './WalletPage';

export type DashboardView = 'overview' | 'client' | 'keys' | 'logs' | 'wallet' | 'vehicle';

interface DashboardPageProps {
  navigateToHome: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ navigateToHome }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'overview': return <DashboardOverview setCurrentView={setCurrentView} />;
      case 'client': return <ClientInfo />;
      case 'keys': return <ApiKeyManagement />;
      case 'logs': return <ApiLogs />;
      case 'wallet': return <WalletPage />;
      case 'vehicle': return <VehicleDetails />;
      default: return <DashboardOverview setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <DashboardSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        navigateToHome={navigateToHome}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto md:ml-64 bg-gray-50">
        <div className="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
            <ApiHubLogo />
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 text-gray-600 hover:text-api-blue"
              aria-label="Open sidebar"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;