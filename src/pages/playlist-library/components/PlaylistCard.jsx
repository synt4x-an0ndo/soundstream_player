import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PlaylistCard = ({ playlist, onPlay, onShuffle, onDownload, onToggleOffline }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(playlist?.downloadProgress || 0);

  const handleDownloadToggle = () => {
    if (playlist?.isOfflineAvailable) {
      onToggleOffline(playlist?.id, false);
    } else {
      onDownload(playlist?.id);
      // Simulate download progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setDownloadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          onToggleOffline(playlist?.id, true);
        }
      }, 200);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div 
      className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={playlist?.coverArt}
            alt={playlist?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Overlay controls on hover */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onPlay(playlist?.id)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <Icon name="Play" size={20} className="text-white" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onShuffle(playlist?.id)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          >
            <Icon name="Shuffle" size={20} className="text-white" />
          </Button>
        </div>

        {/* Offline indicator */}
        {playlist?.isOfflineAvailable && (
          <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-1">
            <Icon name="Download" size={16} />
          </div>
        )}

        {/* Download progress */}
        {downloadProgress > 0 && downloadProgress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <p className="text-white text-xs mt-1">{downloadProgress}% downloaded</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-1 truncate">{playlist?.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{playlist?.trackCount} tracks</p>
        <p className="text-xs text-muted-foreground mb-3">{formatDuration(playlist?.duration)}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlay(playlist?.id)}
              className="p-1"
            >
              <Icon name="Play" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShuffle(playlist?.id)}
              className="p-1"
            >
              <Icon name="Shuffle" size={16} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownloadToggle}
            className="p-1"
          >
            <Icon 
              name={playlist?.isOfflineAvailable ? "Check" : "Download"} 
              size={16}
              className={playlist?.isOfflineAvailable ? "text-success" : "text-muted-foreground"}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;