import React, { useState } from 'react';
import ApiDirectoryPage from './components/ApiDirectoryPage';
import Chatbot from './components/Chatbot';
import DashboardPage from './components/DashboardPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'apiDirectory';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage 
                  navigateToHome={() => navigateTo('home')} 
                  navigateToRegister={() => navigateTo('register')}
                  navigateToDashboard={() => navigateTo('dashboard')}
               />;
      case 'register':
        return <RegisterPage 
                  navigateToHome={() => navigateTo('home')} 
                  navigateToLogin={() => navigateTo('login')}
                  navigateToDashboard={() => navigateTo('dashboard')}
               />;
      case 'dashboard':
        return <DashboardPage navigateToHome={() => navigateTo('home')} />;
      case 'apiDirectory':
        return <ApiDirectoryPage navigateToHome={() => navigateTo('home')} />;
      case 'home':
      default:
        return <HomePage 
                  navigateToLogin={() => navigateTo('login')} 
                  navigateToApiDirectory={() => navigateTo('apiDirectory')} 
               />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderPage()}
      <Chatbot />
    </div>
  );
};

export default App;