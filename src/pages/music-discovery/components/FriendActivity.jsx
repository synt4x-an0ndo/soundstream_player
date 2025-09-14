import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FriendActivity = ({ activities, onViewAll }) => {
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Icon name="Users" size={20} className="mr-2" />
          Friend Activity
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={activity?.user?.avatar}
                alt={activity?.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity?.user?.name}
                </span>
                <Icon 
                  name={activity?.type === 'playing' ? 'Play' : 'Heart'} 
                  size={12} 
                  className={activity?.type === 'playing' ? 'text-green-500' : 'text-red-500'} 
                />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {activity?.type === 'playing' ? 'Playing' : 'Liked'} "{activity?.track?.title}" by {activity?.track?.artist}
              </p>
              
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {formatTimeAgo(activity?.timestamp)}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="Play" size={14} />
            </Button>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No friend activity yet
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Connect with friends to see what they're listening to
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendActivity;