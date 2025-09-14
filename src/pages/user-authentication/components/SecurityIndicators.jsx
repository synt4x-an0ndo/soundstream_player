import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Login'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-gray-500">
            <Icon name={feature?.icon} size={16} />
            <span className="text-xs">{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Your data is protected with industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;