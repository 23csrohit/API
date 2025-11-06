import React, { useState } from 'react';
import './RegisterPage.css';

interface RegisterPageProps {
  navigateToHome: () => void;
  navigateToLogin: () => void;
  navigateToDashboard: () => void;
}

const digilockerLogo = '/digilocker-logo.svg';

const RegisterPage: React.FC<RegisterPageProps> = ({ navigateToHome, navigateToLogin, navigateToDashboard }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the Terms of Use to continue';
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
    <div className="register-root">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Join us today! Please fill in your details to get started.</p>

        <div className="digilocker-section">
          <h2 style={{margin:'0 0 10px 0', textAlign:'left', fontSize:14, color:'#2563eb', fontWeight:600}}>Continue using</h2>
          <button 
            type="button"
            onClick={() => {/* Implement DigiLocker integration */}}
            className="digilocker-btn"
          >
            <img 
              src={digilockerLogo} 
              alt="DigiLocker" 
            />
            <span>DigiLocker - MeriPehchaan</span>
          </button>
          <p className="register-subtitle" style={{marginTop:12, textAlign:'left'}}>Securely sign up using your DigiLocker credentials</p>
        </div>

        <div className="separator">
          <hr />
          <span>OR</span>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          
          <div>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 sm:mt-1 mr-2"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 text-left">
              By clicking on Log In/Sign Up, I accept API HUB's{' '}
              <a href="/terms" className="text-api-blue hover:underline">Terms of Use</a>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-xs sm:text-sm mb-4 text-left">{errors.terms}</p>}

          <button 
            type="submit" 
            className="w-full bg-api-blue text-white font-bold text-sm sm:text-base py-2.5 sm:py-3 rounded-md hover:bg-api-blue-800 transition-all duration-300 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-xs sm:text-sm text-gray-500">
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
        className="mt-6 sm:mt-8 text-xs sm:text-sm text-api-blue hover:underline flex items-center space-x-1"
      >
        <span>&larr;</span>
        <span>Back to Home</span>
      </button>
    </div>
  );
};

export default RegisterPage;

