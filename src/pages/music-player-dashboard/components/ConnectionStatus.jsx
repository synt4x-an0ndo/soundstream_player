import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate download progress when online
    if (isOnline && !isDownloading) {
      setIsDownloading(true);
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            setIsDownloading(false);
            clearInterval(interval);
            return 0;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => {
        clearInterval(interval);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, isDownloading]);

  return (
    <div className="fixed top-20 left-4 z-50">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isOnline 
          ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
      } backdrop-blur-sm shadow-elevation-2`}>
        <div className={`w-2 h-2 rounded-full ${
          isOnline ? 'bg-success' : 'bg-warning'
        } ${isOnline ? 'animate-pulse' : ''}`} />
        
        <Icon 
          name={isOnline ? "Wifi" : "WifiOff"} 
          size={16} 
        />
        
        <span className="hidden sm:inline">
          {isOnline ? 'Online' : 'Offline'}
        </span>

        {isDownloading && isOnline && (
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={14} />
            <span className="text-xs">{Math.round(downloadProgress)}%</span>
          </div>
        )}
      </div>

      {/* Download Progress Bar */}
      {isDownloading && isOnline && (
        <div className="mt-2 w-32 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300 ease-out"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;