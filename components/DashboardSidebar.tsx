import React from 'react';
import { DashboardView } from './DashboardPage';
import { ApiHubLogo, CarIcon, CloseIcon, DashboardIcon, KeyIcon, LogIcon, LogoutIcon, UserIcon, WalletIcon } from './icons';

interface DashboardSidebarProps {
  currentView: DashboardView;
  setCurrentView: (view: DashboardView) => void;
  navigateToHome: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentView, setCurrentView, navigateToHome, isOpen, setIsOpen }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: DashboardIcon },
        { id: 'client', label: 'Client Info', icon: UserIcon },
        { id: 'keys', label: 'API Keys', icon: KeyIcon },
        { id: 'logs', label: 'API Logs', icon: LogIcon },
        { id: 'wallet', label: 'Wallet & Billing', icon: WalletIcon },
        { id: 'vehicle', label: 'Vehicle Details', icon: CarIcon },
    ];

    const handleNavigation = (view: DashboardView) => {
        setCurrentView(view);
        setIsOpen(false); // Close sidebar on navigation
    };

    const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
        const isActive = currentView === item.id;
        return (
            <button
                onClick={() => handleNavigation(item.id as DashboardView)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-api-orange/20 text-api-orange font-semibold' : 'text-gray-300 hover:bg-white/10'}`}
            >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
            </button>
        );
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <aside className={`w-64 bg-gradient-to-b from-api-blue-900 to-api-blue-800 text-white flex flex-col p-4 fixed inset-y-0 left-0 z-50 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed shadow-xl`}>
                <div className="flex items-center justify-between py-4 mb-6 border-b border-white/20">
                    <ApiHubLogo className="text-white" />
                    <button className="md:hidden p-1 text-white/80 hover:text-white" onClick={() => setIsOpen(false)} aria-label="Close sidebar">
                        <CloseIcon className="h-6 w-6"/>
                    </button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 mb-6 bg-white/10 rounded-lg backdrop-blur-sm">
                    <img src="https://i.pravatar.cc/48" alt="User Avatar" className="h-12 w-12 rounded-full border-2 border-api-orange shadow-md" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">Jane Doe</p>
                        <p className="text-xs text-gray-300 truncate">jane.doe@example.com</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map(item => <NavLink key={item.id} item={item} />)}
                </nav>

                <div className="mt-auto">
                    <button
                        onClick={navigateToHome}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-white/10"
                    >
                        <LogoutIcon className="h-6 w-6" />
                        <span>Back to Home</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;