import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import SecurityIndicators from './components/SecurityIndicators';
import MusicBrandingHeader from './components/MusicBrandingHeader';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Mock credentials for testing
  const mockCredentials = {
    email: 'demo@soundstream.com',
    password: 'Demo123!'
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/music-player-dashboard');
        }, 1000);
      } else {
        setError('Invalid credentials. Use demo@soundstream.com / Demo123!');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccessMessage('Account created successfully! Please sign in.');
      setActiveTab('login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`${provider} login successful! Redirecting...`);
      setTimeout(() => {
        navigate('/music-player-dashboard');
      }, 1000);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <MusicBrandingHeader />
          
          <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {successMessage && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {activeTab === 'login' ? (
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                error={error}
              />
            ) : (
              <RegisterForm
                onSubmit={handleRegister}
                loading={loading}
                error={error}
              />
            )}
            
            <SocialAuth
              onSocialLogin={handleSocialLogin}
              loading={loading}
            />
          </div>
          
          <SecurityIndicators />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <button className="text-primary hover:underline">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;