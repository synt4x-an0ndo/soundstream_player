import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlaybackControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffled,
  repeatMode,
  isLoading,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat
}) => {
  const progressRef = useRef(null);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (progressRef?.current && duration) {
      const rect = progressRef?.current?.getBoundingClientRect();
      const clickX = e?.clientX - rect?.left;
      const newTime = (clickX / rect?.width) * duration;
      onSeek(Math.floor(newTime));
    }
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'all': return 'Repeat';
      case 'one': return 'Repeat1';
      default: return 'Repeat';
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'VolumeX';
    if (volume < 0.5) return 'Volume1';
    return 'Volume2';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          ref={progressRef}
          className="w-full h-3 bg-muted rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-200 relative"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </div>
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleShuffle}
          className={`w-10 h-10 ${isShuffled ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name="Shuffle" size={20} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="w-12 h-12"
          disabled={isLoading}
        >
          <Icon name="SkipBack" size={24} />
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={onPlayPause}
          className="w-16 h-16 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icon name={isPlaying ? "Pause" : "Play"} size={28} />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="w-12 h-12"
          disabled={isLoading}
        >
          <Icon name="SkipForward" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleRepeat}
          className={`w-10 h-10 ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Icon name={getRepeatIcon()} size={20} />
        </Button>
      </div>
      {/* Volume Control */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMute}
          className="w-8 h-8"
        >
          <Icon name={getVolumeIcon()} size={18} />
        </Button>
        
        <div className="flex items-center space-x-2 w-32">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) ${(isMuted ? 0 : volume) * 100}%, var(--color-muted) 100%)`
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
          >
            <Icon name="Heart" size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
          >
            <Icon name="Share" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;