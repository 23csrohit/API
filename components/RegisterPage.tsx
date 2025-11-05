import React, { useState } from 'react';

interface RegisterPageProps {
  navigateToHome: () => void;
  navigateToLogin: () => void;
  navigateToDashboard: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigateToHome, navigateToLogin, navigateToDashboard }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the registration data to your backend
      console.log('Registration data:', formData);
      // For demo purposes, navigate directly to dashboard after successful registration
      // In a real app, you might want to show a success message first
      navigateToDashboard();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-api-blue mb-4">Create Account</h1>
        <p className="text-gray-600 mb-6">Join us today! Please fill in your details to get started.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-api-blue'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>}
          </div>
          
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-api-blue'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-api-blue'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-api-blue'
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 text-left">{errors.confirmPassword}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-api-blue text-white font-bold py-3 rounded-md hover:bg-api-blue-800 transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <button 
            onClick={navigateToLogin} 
            className="font-semibold text-api-orange hover:underline"
          >
            Sign In
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

export default RegisterPage;

