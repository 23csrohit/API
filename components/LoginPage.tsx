import React, { useState } from 'react';

interface LoginPageProps {
  navigateToHome: () => void;
  navigateToRegister: () => void;
  navigateToDashboard: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateToHome, navigateToRegister, navigateToDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Simulate login - in real app, this would call an API
    // For demo purposes, accept any email/password
    console.log('Login attempt:', { email, password });
    
    // Navigate to dashboard on successful login
    navigateToDashboard();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 sm:p-8 bg-white rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-api-blue mb-4">Sign In</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Welcome back! Please enter your details.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm text-left">
              {error}
            </div>
          )}
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue" 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-api-blue" 
            />
          </div>
          <button type="submit" className="w-full bg-api-blue text-white font-bold py-3 rounded-md hover:bg-api-blue-800 transition-colors duration-300">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Don't have an account?{' '}
          <button 
            onClick={navigateToRegister} 
            className="font-semibold text-api-orange hover:underline"
          >
            Register Now
          </button>
        </p>
      </div>
      <button 
        onClick={navigateToHome} 
        className="mt-8 text-api-blue hover:underline"
      >
        &larr; Back to Home
      </button>
    </div>
  );
};

export default LoginPage;
