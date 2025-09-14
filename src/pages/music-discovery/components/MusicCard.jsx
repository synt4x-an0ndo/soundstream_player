import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MusicCard = ({ 
  id, 
  title, 
  artist, 
  album, 
  artwork, 
  duration, 
  isPlaying, 
  isDownloaded, 
  downloadProgress,
  onPlay, 
  onAddToPlaylist, 
  onDownload 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={artwork}
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center transition-opacity duration-200 ${isHovered || isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="default"
            size="icon"
            onClick={() => onPlay(id)}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-black shadow-lg"
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={20} 
              className={isPlaying ? "" : "ml-0.5"} 
            />
          </Button>
        </div>

        {/* Download Status */}
        {isDownloaded && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Icon name="Download" size={14} className="text-white" />
          </div>
        )}

        {downloadProgress > 0 && downloadProgress < 100 && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="text-xs text-white font-medium">
              {Math.round(downloadProgress)}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
          {artist}
        </p>
        {album && (
          <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
            {album}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatDuration(duration)}
          </span>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onAddToPlaylist(id)}
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="Plus" size={14} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowOptions(!showOptions)}
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="MoreHorizontal" size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Options Menu */}
      {showOptions && (
        <div className="absolute top-full right-4 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 py-1 min-w-[160px]">
          <button
            onClick={() => {
              onDownload(id);
              setShowOptions(false);
            }}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          >
            <Icon name="Download" size={16} className="mr-2" />
            {isDownloaded ? 'Downloaded' : 'Download'}
          </button>
          <button
            onClick={() => {
              onAddToPlaylist(id);
              setShowOptions(false);
            }}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          >
            <Icon name="ListPlus" size={16} className="mr-2" />
            Add to Playlist
          </button>
          <button
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          >
            <Icon name="Share" size={16} className="mr-2" />
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicCard;