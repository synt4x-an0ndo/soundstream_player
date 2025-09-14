import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NowPlayingSection = ({ 
  currentTrack, 
  isPlaying, 
  isLoading,
  onTogglePlay 
}) => {
  if (!currentTrack) {
    return (
      <div className="bg-card rounded-lg p-8 shadow-elevation-2 text-center">
        <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
          <Icon name="Music" size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground mb-2">
          No Track Selected
        </h2>
        <p className="text-muted-foreground">
          Choose a song to start listening
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-8 shadow-elevation-2">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Album Artwork */}
        <div className="relative flex-shrink-0">
          <div className="w-48 h-48 rounded-lg overflow-hidden shadow-elevation-2 group">
            <Image
              src={currentTrack?.artwork}
              alt={`${currentTrack?.title} - ${currentTrack?.artist}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Floating Play Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg">
            <Button
              variant="default"
              size="lg"
              onClick={onTogglePlay}
              disabled={isLoading}
              className="w-16 h-16 rounded-full shadow-elevation-3 hover:scale-105 transition-transform duration-200"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon 
                  name={isPlaying ? "Pause" : "Play"} 
                  size={24} 
                />
              )}
            </Button>
          </div>
        </div>

        {/* Track Information */}
        <div className="flex-1 text-center md:text-left space-y-4">
          {/* Now Playing Label */}
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="flex space-x-1">
              {[...Array(3)]?.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-4 bg-primary rounded-full ${
                    isPlaying && !isLoading 
                      ? 'animate-pulse' :''
                  }`}
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              {isLoading ? 'Loading...' : isPlaying ? 'Now Playing' : 'Paused'}
            </span>
          </div>

          {/* Track Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2 leading-tight">
              {currentTrack?.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-1">
              {currentTrack?.artist}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentTrack?.album}
            </p>
          </div>

          {/* Track Stats */}
          <div className="flex items-center justify-center md:justify-start space-x-6 text-sm text-muted-foreground">
            {currentTrack?.playCount && (
              <div className="flex items-center space-x-1">
                <Icon name="Play" size={14} />
                <span>{currentTrack?.playCount?.toLocaleString()} plays</span>
              </div>
            )}
            {currentTrack?.likes && (
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>{currentTrack?.likes?.toLocaleString()} likes</span>
              </div>
            )}
            {currentTrack?.isDownloaded && (
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={14} className="text-success" />
                <span className="text-success">Downloaded</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="Heart" size={16} />
              <span>Like</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add to Playlist</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="Share" size={16} />
              <span>Share</span>
            </Button>
            
            {!currentTrack?.isDownloaded && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Download</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingSection;