import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-800',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            type="button"
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={loading}
            className={`
              w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg
              ${provider?.color} ${provider?.textColor}
              transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            `}
          >
            <Icon name={provider?.icon} size={20} className="mr-3" />
            <span className="text-sm font-medium">
              Continue with {provider?.name}
            </span>
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-primary hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default SocialAuth;