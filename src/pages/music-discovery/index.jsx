import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import DiscoverySection from './components/DiscoverySection';

import GenreCard from './components/GenreCard';
import FriendActivity from './components/FriendActivity';
import TrendingChart from './components/TrendingChart';

const MusicDiscovery = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [downloadingTracks, setDownloadingTracks] = useState({});

  // Mock data for personalized recommendations
  const personalizedRecommendations = [
    {
      id: 1,
      title: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 201,
      isPlaying: false,
      isDownloaded: true,
      downloadProgress: 0
    },
    {
      id: 2,
      title: "Flowers",
      artist: "Miley Cyrus",
      album: "Endless Summer Vacation",
      artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      duration: 200,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 3,
      title: "Unholy",
      artist: "Sam Smith ft. Kim Petras",
      album: "Gloria",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 156,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 65
    },
    {
      id: 4,
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      duration: 167,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 5,
      title: "Bad Habit",
      artist: "Steve Lacy",
      album: "Gemini Rights",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 221,
      isPlaying: false,
      isDownloaded: true,
      downloadProgress: 0
    }
  ];

  // Mock data for trending tracks
  const trendingTracks = [
    {
      id: 6,
      title: "Vampire",
      artist: "Olivia Rodrigo",
      album: "GUTS",
      artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      duration: 219,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 7,
      title: "Paint The Town Red",
      artist: "Doja Cat",
      album: "Scarlet",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 231,
      isPlaying: false,
      isDownloaded: true,
      downloadProgress: 0
    },
    {
      id: 8,
      title: "Cruel Summer",
      artist: "Taylor Swift",
      album: "Lover",
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      duration: 178,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    }
  ];

  // Mock data for new releases
  const newReleases = [
    {
      id: 9,
      title: "Water Under the Bridge",
      artist: "Adele",
      album: "25",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      duration: 240,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 10,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      duration: 200,
      isPlaying: false,
      isDownloaded: false,
      downloadProgress: 0
    },
    {
      id: 11,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      artwork: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      duration: 203,
      isPlaying: false,
      isDownloaded: true,
      downloadProgress: 0
    }
  ];

  // Mock data for genres
  const genres = [
    {
      id: 1,
      name: "Pop",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      color: "#FF6B6B",
      trackCount: 12450
    },
    {
      id: 2,
      name: "Rock",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      color: "#4ECDC4",
      trackCount: 8920
    },
    {
      id: 3,
      name: "Hip-Hop",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      color: "#45B7D1",
      trackCount: 15670
    },
    {
      id: 4,
      name: "Electronic",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
      color: "#96CEB4",
      trackCount: 9340
    }
  ];

  // Mock data for friend activity
  const friendActivities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
      },
      type: "playing",
      track: {
        title: "Anti-Hero",
        artist: "Taylor Swift"
      },
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      type: "liked",
      track: {
        title: "Flowers",
        artist: "Miley Cyrus"
      },
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      type: "playing",
      track: {
        title: "Vampire",
        artist: "Olivia Rodrigo"
      },
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ];

  const handlePlay = (trackId) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  const handleAddToPlaylist = (trackId) => {
    console.log('Adding track to playlist:', trackId);
    // Implementation would show playlist selection modal
  };

  const handleDownload = (trackId) => {
    if (downloadingTracks?.[trackId]) return;
    
    setDownloadingTracks(prev => ({ ...prev, [trackId]: 0 }));
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadingTracks(prev => {
        const currentProgress = prev?.[trackId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [trackId]: undefined };
        }
        return { ...prev, [trackId]: currentProgress + 10 };
      });
    }, 200);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implementation would perform search
  };

  const handleVoiceSearch = (query) => {
    console.log('Voice search:', query);
    // Implementation would handle voice search
  };

  const handleGenreSelect = (genreId) => {
    console.log('Selected genre:', genreId);
    // Implementation would navigate to genre page
  };

  const handleViewAll = (section) => {
    console.log('View all:', section);
    // Implementation would navigate to full section view
  };

  const handleRefresh = (section) => {
    console.log('Refreshing:', section);
    // Implementation would refresh recommendations
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/music-player-dashboard" className="flex items-center space-x-2">
                <Icon name="Music" size={24} className="text-indigo-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">SoundStream</span>
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link 
                  to="/music-player-dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/music-discovery" 
                  className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm font-medium border-b-2 border-indigo-600"
                >
                  Discover
                </Link>
                <Link 
                  to="/playlist-library" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Library
                </Link>
                <Link 
                  to="/offline-downloads-manager" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Downloads
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Link to="/user-authentication">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onVoiceSearch={handleVoiceSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Discovery Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Personalized Recommendations */}
            <DiscoverySection
              title="Made for You"
              subtitle="Personalized recommendations based on your listening history"
              items={personalizedRecommendations}
              showRefresh={true}
              onViewAll={() => handleViewAll('recommendations')}
              onRefresh={() => handleRefresh('recommendations')}
              onPlay={handlePlay}
              onAddToPlaylist={handleAddToPlaylist}
              onDownload={handleDownload}
            />

            {/* Trending Tracks */}
            <DiscoverySection
              title="Trending Now"
              subtitle="What everyone's listening to right now"
              items={trendingTracks}
              onViewAll={() => handleViewAll('trending')}
              onRefresh={() => handleRefresh('trending')}
              onPlay={handlePlay}
              onAddToPlaylist={handleAddToPlaylist}
              onDownload={handleDownload}
            />

            {/* New Releases */}
            <DiscoverySection
              title="New Releases"
              subtitle="Fresh music from your favorite artists"
              items={newReleases}
              onViewAll={() => handleViewAll('new-releases')}
              onRefresh={() => handleRefresh('new-releases')}
              onPlay={handlePlay}
              onAddToPlaylist={handleAddToPlaylist}
              onDownload={handleDownload}
            />

            {/* Genres */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Browse by Genre
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewAll('genres')}
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {genres?.map((genre) => (
                  <GenreCard
                    key={genre?.id}
                    {...genre}
                    onSelect={handleGenreSelect}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Chart */}
            <TrendingChart
              tracks={[...personalizedRecommendations, ...trendingTracks, ...newReleases]}
              onPlay={handlePlay}
              onAddToPlaylist={handleAddToPlaylist}
            />

            {/* Friend Activity */}
            <FriendActivity
              activities={friendActivities}
              onViewAll={() => handleViewAll('friends')}
            />
          </div>
        </div>
      </main>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link 
            to="/music-player-dashboard"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400"
          >
            <Icon name="Home" size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/music-discovery"
            className="flex flex-col items-center justify-center space-y-1 text-indigo-600 dark:text-indigo-400"
          >
            <Icon name="Compass" size={20} />
            <span className="text-xs">Discover</span>
          </Link>
          <Link 
            to="/playlist-library"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400"
          >
            <Icon name="Library" size={20} />
            <span className="text-xs">Library</span>
          </Link>
          <Link 
            to="/offline-downloads-manager"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400"
          >
            <Icon name="Download" size={20} />
            <span className="text-xs">Downloads</span>
          </Link>
          <Link 
            to="/user-authentication"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400"
          >
            <Icon name="User" size={20} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicDiscovery;