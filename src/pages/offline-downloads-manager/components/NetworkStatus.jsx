import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatus = ({ isOnline, connectionType, downloadSpeed }) => {
  const getConnectionIcon = () => {
    if (!isOnline) return 'WifiOff';
    switch (connectionType) {
      case 'wifi': return 'Wifi';
      case '4g': return 'Smartphone';
      case '3g': return 'Smartphone';
      default: return 'Globe';
    }
  };

  const getConnectionColor = () => {
    if (!isOnline) return 'text-red-600 dark:text-red-400';
    if (connectionType === 'wifi') return 'text-green-600 dark:text-green-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const formatSpeed = (speed) => {
    if (speed < 1024) return `${speed} KB/s`;
    return `${(speed / 1024)?.toFixed(1)} MB/s`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 ${getConnectionColor()}`}>
            <Icon name={getConnectionIcon()} size={20} />
            <span className="font-medium">
              {isOnline ? (
                connectionType === 'wifi' ? 'WiFi Connected' : `${connectionType?.toUpperCase()} Connected`
              ) : 'Offline'}
            </span>
          </div>
          
          {isOnline && downloadSpeed > 0 && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <Icon name="Download" size={14} className="inline mr-1" />
              {formatSpeed(downloadSpeed)}
            </div>
          )}
        </div>
        
        {!isOnline && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Downloads paused
          </div>
        )}
      </div>
      {!isOnline && (
        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <Icon name="AlertTriangle" size={14} className="inline mr-1" />
            No internet connection. Downloads will resume when connection is restored.
          </p>
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;