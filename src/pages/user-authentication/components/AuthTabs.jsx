import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Create Account' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`
            flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200
            ${activeTab === tab?.id
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;