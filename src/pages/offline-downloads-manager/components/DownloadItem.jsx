import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DownloadItem = ({ item, isSelected, onSelect, onAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'downloading': return 'text-blue-600 dark:text-blue-400';
      case 'paused': return 'text-yellow-600 dark:text-yellow-400';
      case 'failed': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'downloading': return 'Download';
      case 'paused': return 'PauseCircle';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatSize = (bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border transition-all duration-200 ${
      isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`}>
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(item?.id, e?.target?.checked)}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        
        <div className="flex-shrink-0">
          <Image
            src={item?.artwork}
            alt={item?.title}
            className="w-12 h-12 rounded-md object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item?.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {item?.artist} • {item?.type === 'song' ? formatDuration(item?.duration) : `${item?.trackCount} tracks`}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatSize(item?.fileSize)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item?.quality}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${getStatusColor(item?.status)}`}>
                  <Icon name={getStatusIcon(item?.status)} size={12} />
                  <span className="capitalize">{item?.status}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {item?.status === 'downloading' && (
                <button
                  onClick={() => onAction(item?.id, 'pause')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Icon name="Pause" size={16} />
                </button>
              )}
              
              {item?.status === 'paused' && (
                <button
                  onClick={() => onAction(item?.id, 'resume')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Icon name="Play" size={16} />
                </button>
              )}
              
              {item?.status === 'failed' && (
                <button
                  onClick={() => onAction(item?.id, 'retry')}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Icon name="RotateCcw" size={16} />
                </button>
              )}
              
              <button
                onClick={() => onAction(item?.id, 'delete')}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Icon name="Trash2" size={16} />
              </button>
              
              <button
                onClick={() => onAction(item?.id, 'more')}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
          
          {item?.status === 'downloading' && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>{item?.progress}% complete</span>
                <span>ETA: {item?.eta}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${item?.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadItem;