import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// Audio Context for global audio state management
const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

// Audio Provider Component
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample audio URLs (replace with your actual audio files)
  const sampleTracks = [
    {
      id: 1,
      title: "Midnight Dreams",
      artist: "Luna Eclipse",
      album: "Nocturnal Vibes",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Sample audio
      duration: 240,
      isDownloaded: true
    },
    {
      id: 2,
      title: "Stellar Waves",
      artist: "Cosmic Journey", 
      album: "Interstellar",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Sample audio
      duration: 195,
      isDownloaded: true
    },
    {
      id: 3,
      title: "Digital Sunset",
      artist: "Neon Lights",
      album: "Synthwave Collection", 
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3", // Sample audio
      duration: 210,
      isDownloaded: false
    }
  ];

  // Initialize audio element
  useEffect(() => {
    if (!audioRef?.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }

    const audio = audioRef?.current;

    // Set initial playlist if empty
    if (playlist?.length === 0) {
      setPlaylist(sampleTracks);
      setCurrentTrack(sampleTracks?.[0]);
    }

    // Audio event listeners
    const handleLoadedMetadata = () => {
      setDuration(audio?.duration || 0);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio?.currentTime || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e) => {
      console.error('Audio playback error:', e);
      setError('Failed to load audio file');
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    // Add event listeners
    audio?.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio?.addEventListener('timeupdate', handleTimeUpdate);
    audio?.addEventListener('ended', handleEnded);
    audio?.addEventListener('error', handleError);
    audio?.addEventListener('loadstart', handleLoadStart);
    audio?.addEventListener('canplaythrough', handleCanPlayThrough);

    // Set volume
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }

    return () => {
      // Cleanup event listeners
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
      audio?.removeEventListener('ended', handleEnded);
      audio?.removeEventListener('error', handleError);
      audio?.removeEventListener('loadstart', handleLoadStart);
      audio?.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [volume, isMuted]);

  // Load track when current track changes
  useEffect(() => {
    if (currentTrack?.audioUrl && audioRef?.current) {
      const audio = audioRef?.current;
      
      // Pause current playback
      audio?.pause();
      setIsPlaying(false);
      
      // Load new track
      audio.src = currentTrack?.audioUrl;
      audio?.load();
      
      // Reset states
      setCurrentTime(0);
      setError(null);
    }
  }, [currentTrack?.audioUrl]);

  const handlePlay = async () => {
    if (!audioRef?.current || !currentTrack?.audioUrl) {
      setError('No audio track loaded');
      return;
    }

    try {
      setIsLoading(true);
      await audioRef?.current?.play();
      setIsPlaying(true);
      setError(null);
    } catch (error) {
      console.error('Play error:', error);
      setError('Failed to play audio');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (audioRef?.current) {
      audioRef?.current?.pause();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (time) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef?.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist?.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlist?.[nextIndex]);
  };

  const handlePrevious = () => {
    if (currentTime > 5) {
      handleSeek(0);
    } else {
      const prevIndex = currentIndex === 0 ? playlist?.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist?.[prevIndex]);
    }
  };

  const handleTrackSelect = (track, index) => {
    setCurrentIndex(index);
    setCurrentTrack(track);
  };

  const contextValue = {
    // State
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    playlist,
    currentIndex,
    isLoading,
    error,
    
    // Controls
    handlePlayPause,
    handlePlay,
    handlePause,
    handleSeek,
    handleVolumeChange,
    handleToggleMute,
    handleNext,
    handlePrevious,
    handleTrackSelect,
    
    // Setters
    setPlaylist,
    setCurrentTrack
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

// Basic Audio Player Component
const AudioPlayer = ({ track, autoPlay = false, className = "" }) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    isLoading,
    error,
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleToggleMute
  } = useAudio();

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const isCurrentTrack = track?.id === currentTrack?.id;

  return (
    <div className={`bg-card rounded-lg p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            isCurrentTrack && isPlaying
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isCurrentTrack && isPlaying ? (
            '⏸️'
          ) : (
            '▶️'
          )}
        </button>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-card-foreground truncate">
            {track?.title}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {track?.artist}
          </p>
        </div>

        {/* Duration */}
        <div className="text-xs text-muted-foreground font-mono">
          {formatTime(track?.duration || 0)}
        </div>
      </div>

      {/* Progress Bar (only show for current track) */}
      {isCurrentTrack && (
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full h-2 bg-muted rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e?.currentTarget?.getBoundingClientRect();
              const clickX = e?.clientX - rect?.left;
              const newTime = (clickX / rect?.width) * duration;
              handleSeek(newTime);
            }}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-xs text-destructive">
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;