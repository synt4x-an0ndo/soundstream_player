import React from 'react';
import Icon from '../../../components/AppIcon';

const StorageIndicator = ({ usedStorage, totalStorage, downloadQueue }) => {
  const usagePercentage = (usedStorage / totalStorage) * 100;
  
  const formatStorage = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb?.toFixed(1)} GB`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="HardDrive" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-card-foreground">Storage Usage</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {formatStorage(usedStorage)} / {formatStorage(totalStorage)}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            usagePercentage > 90 ? 'bg-error' : 
            usagePercentage > 70 ? 'bg-warning' : 'bg-primary'
          }`}
          style={{ width: `${usagePercentage}%` }}
        />
      </div>
      
      {downloadQueue > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Download" size={16} className="animate-pulse" />
          <span>{downloadQueue} items in download queue</span>
        </div>
      )}
    </div>
  );
};

export default StorageIndicator;