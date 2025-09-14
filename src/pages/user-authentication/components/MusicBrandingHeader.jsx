import React from 'react';
import Icon from '../../../components/AppIcon';

const MusicBrandingHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-primary p-3 rounded-full">
          <Icon name="Music" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        SoundStream Player
      </h1>
      
      <p className="text-gray-600 max-w-md mx-auto">
        Access your personalized music library and enjoy seamless streaming with offline downloads
      </p>
    </div>
  );
};

export default MusicBrandingHeader;