import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingChart = ({ tracks, onPlay, onAddToPlaylist }) => {
  const [timeframe, setTimeframe] = useState('today');

  const timeframes = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-indigo-500" />
          Trending Now
        </h3>
        
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {timeframes?.map((tf) => (
            <button
              key={tf?.value}
              onClick={() => setTimeframe(tf?.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeframe === tf?.value
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tf?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {tracks?.slice(0, 10)?.map((track, index) => (
          <div
            key={track?.id}
            className="group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8">
              <span className={`text-sm font-semibold ${
                index < 3 
                  ? 'text-indigo-600 dark:text-indigo-400' :'text-gray-500 dark:text-gray-400'
              }`}>
                {index + 1}
              </span>
            </div>
            
            <div className="relative">
              <Image
                src={track?.artwork}
                alt={`${track?.title} by ${track?.artist}`}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg flex items-center justify-center transition-all duration-200">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPlay(track?.id)}
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-100 text-black"
                >
                  <Icon name="Play" size={14} className="ml-0.5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {track?.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {track?.artist}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {formatDuration(track?.duration)}
              </span>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddToPlaylist(track?.id)}
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="Plus" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="MoreHorizontal" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingChart;