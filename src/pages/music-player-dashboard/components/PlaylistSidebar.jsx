import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaylistSidebar = ({ 
  queue, 
  currentTrackIndex, 
  isCollapsed, 
  onToggleCollapse, 
  onTrackSelect,
  onRemoveFromQueue 
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      // Handle reordering logic here
      console.log(`Move track from ${draggedIndex} to ${dropIndex}`);
    }
    setDraggedIndex(null);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={onToggleCollapse}
          className="w-12 h-12 rounded-full shadow-elevation-3"
        >
          <Icon name="List" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="List" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-card-foreground">Queue</h2>
          <span className="text-sm text-muted-foreground">({queue?.length})</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
          >
            <Icon name="Shuffle" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Queue List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {queue?.map((track, index) => (
            <div
              key={track?.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`group flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                index === currentTrackIndex
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
              }`}
              onClick={() => onTrackSelect(index)}
            >
              {/* Drag Handle */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="GripVertical" size={16} color="var(--color-muted-foreground)" />
              </div>

              {/* Track Number / Playing Indicator */}
              <div className="w-6 flex items-center justify-center">
                {index === currentTrackIndex ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="flex space-x-0.5">
                      <div className="w-0.5 h-3 bg-primary rounded-full animate-pulse" />
                      <div className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground font-mono">
                    {(index + 1)?.toString()?.padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Album Art */}
              <Image
                src={track?.artwork || '/assets/images/default-album.jpg'}
                alt={track?.title}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate ${
                  index === currentTrackIndex ? 'text-primary' : 'text-card-foreground'
                }`}>
                  {track?.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {track?.artist}
                </p>
              </div>

              {/* Duration & Actions */}
              <div className="flex items-center space-x-2">
                {/* Offline Indicator */}
                {track?.isDownloaded && (
                  <div className="w-2 h-2 bg-success rounded-full" title="Downloaded" />
                )}
                
                <span className="text-xs text-muted-foreground font-mono">
                  {formatDuration(track?.duration)}
                </span>

                {/* More Options */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onRemoveFromQueue(index);
                  }}
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Total: {formatDuration(queue?.reduce((acc, track) => acc + track?.duration, 0))}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Clear Queue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSidebar;