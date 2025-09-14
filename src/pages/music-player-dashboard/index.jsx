import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NowPlayingSection from './components/NowPlayingSection';
import PlaybackControls from './components/PlaybackControls';
import PlaylistSidebar from './components/PlaylistSidebar';
import ThemeToggle from './components/ThemeToggle';
import ConnectionStatus from './components/ConnectionStatus';
import { AudioProvider, useAudio } from '../../components/ui/AudioPlayer';

const MusicPlayerDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <AudioProvider>
      <MusicPlayerDashboardContent navigate={navigate} />
    </AudioProvider>
  );
};

const MusicPlayerDashboardContent = ({ navigate }) => {
  const {
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
    handlePlayPause,
    handleSeek,
    handleVolumeChange,
    handleToggleMute,
    handleNext,
    handlePrevious,
    handleTrackSelect
  } = useAudio();

  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handleToggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentModeIndex = modes?.indexOf(repeatMode);
    setRepeatMode(modes?.[(currentModeIndex + 1) % modes?.length]);
  };

  const handleTrackSelectFromQueue = (index) => {
    handleTrackSelect(playlist?.[index], index);
  };

  const handleRemoveFromQueue = (index) => {
    // In a real app, this would update the queue
    console.log(`Remove track at index ${index}`);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Connection Status */}
      <ConnectionStatus />

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto p-4 mb-4">
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-center space-x-2">
            <span>⚠️</span>
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className={`grid gap-6 transition-all duration-300 ${
          isSidebarCollapsed 
            ? 'grid-cols-1' :'grid-cols-1 lg:grid-cols-3'
        }`}>
          
          {/* Main Content */}
          <div className={`space-y-6 ${
            isSidebarCollapsed ? 'col-span-1' : 'col-span-1 lg:col-span-2'
          }`}>
            
            {/* Now Playing Section */}
            <NowPlayingSection
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              isLoading={isLoading}
              onTogglePlay={handlePlayPause}
            />

            {/* Playback Controls */}
            <PlaybackControls
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              isShuffled={isShuffled}
              repeatMode={repeatMode}
              isLoading={isLoading}
              onPlayPause={handlePlayPause}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
              onToggleMute={handleToggleMute}
              onToggleShuffle={handleToggleShuffle}
              onToggleRepeat={handleToggleRepeat}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/playlist-library')}
                className="p-4 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                    <span className="text-lg">🎵</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">Library</h3>
                    <p className="text-sm text-muted-foreground">Browse playlists</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/music-discovery')}
                className="p-4 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-200">
                    <span className="text-lg">🔍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">Discover</h3>
                    <p className="text-sm text-muted-foreground">Find new music</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/offline-downloads-manager')}
                className="p-4 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors duration-200">
                    <span className="text-lg">⬇️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">Downloads</h3>
                    <p className="text-sm text-muted-foreground">Offline music</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/user-authentication')}
                className="p-4 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">Account</h3>
                    <p className="text-sm text-muted-foreground">Profile settings</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Playlist Sidebar */}
          {!isSidebarCollapsed && (
            <div className="col-span-1">
              <PlaylistSidebar
                queue={playlist || []}
                currentTrackIndex={currentIndex}
                isCollapsed={false}
                onToggleCollapse={handleToggleSidebar}
                onTrackSelect={handleTrackSelectFromQueue}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            </div>
          )}

          {/* Collapsed Sidebar Button */}
          {isSidebarCollapsed && (
            <PlaylistSidebar
              queue={playlist || []}
              currentTrackIndex={currentIndex}
              isCollapsed={true}
              onToggleCollapse={handleToggleSidebar}
              onTrackSelect={handleTrackSelectFromQueue}
              onRemoveFromQueue={handleRemoveFromQueue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerDashboard;