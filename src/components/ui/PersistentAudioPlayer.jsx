import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const PersistentAudioPlayer = () => {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const progressRef = useRef(null);

  const currentTrack = {
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    album: "Nocturnal Vibes",
    artwork: "/assets/images/album-cover.jpg",
    duration: 240
  };

  const queue = [
    { id: 1, title: "Midnight Dreams", artist: "Luna Eclipse", duration: 240 },
    { id: 2, title: "Stellar Waves", artist: "Cosmic Journey", duration: 195 },
    { id: 3, title: "Digital Sunset", artist: "Neon Lights", duration: 210 }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
  };

  const handleNext = () => {
    setCurrentTime(0);
  };

  const handleProgressClick = (e) => {
    if (progressRef?.current) {
      const rect = progressRef?.current?.getBoundingClientRect();
      const clickX = e?.clientX - rect?.left;
      const newTime = (clickX / rect?.width) * duration;
      setCurrentTime(Math.floor(newTime));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes?.indexOf(repeatMode);
    setRepeatMode(modes?.[(currentIndex + 1) % modes?.length]);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'all': return 'Repeat';
      case 'one': return 'Repeat1';
      default: return 'Repeat';
    }
  };

  // Compact player for non-dashboard pages
  if (location?.pathname !== '/music-player-dashboard' && !isExpanded) {
    return (
      <div className="fixed top-16 left-0 right-0 z-100 bg-card/95 backdrop-blur-sm border-b border-border theme-transition">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Image
              src={currentTrack?.artwork}
              alt={currentTrack?.title}
              className="w-10 h-10 rounded-md object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-card-foreground truncate">
                {currentTrack?.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack?.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="w-8 h-8"
            >
              <Icon name="SkipBack" size={16} />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
              className="w-10 h-10"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="w-8 h-8"
            >
              <Icon name="SkipForward" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="w-8 h-8 ml-2"
            >
              <Icon name="ChevronUp" size={16} />
            </Button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // Expanded player for dashboard or when expanded
  return (
    <div className="fixed top-16 left-0 right-0 z-100 bg-card/95 backdrop-blur-sm border-b border-border theme-transition">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {location?.pathname !== '/music-player-dashboard' && (
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
            >
              <Icon name="ChevronDown" size={20} />
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Album Art & Track Info */}
          <div className="flex items-center space-x-4">
            <Image
              src={currentTrack?.artwork}
              alt={currentTrack?.title}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-card-foreground truncate">
                {currentTrack?.title}
              </h3>
              <p className="text-muted-foreground truncate">{currentTrack?.artist}</p>
              <p className="text-sm text-muted-foreground truncate">{currentTrack?.album}</p>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleShuffle}
                className={isShuffled ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name="Shuffle" size={20} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
              >
                <Icon name="SkipBack" size={24} />
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={handlePlayPause}
                className="w-12 h-12"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
              >
                <Icon name="SkipForward" size={24} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRepeat}
                className={repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}
              >
                <Icon name={getRepeatIcon()} size={20} />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                <span className="font-mono">{formatTime(currentTime)}</span>
                <span className="font-mono ml-auto">{formatTime(duration)}</span>
              </div>
              <div
                ref={progressRef}
                className="w-full h-2 bg-muted rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Volume & Additional Controls */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
            >
              <Icon 
                name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                size={20} 
              />
            </Button>
            
            <div className="hidden sm:flex items-center space-x-2 w-24">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer slider"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
            >
              <Icon name="Heart" size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
            >
              <Icon name="MoreHorizontal" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentAudioPlayer;