import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistFilters from './components/PlaylistFilters';
import PlaylistGrid from './components/PlaylistGrid';
import StorageIndicator from './components/StorageIndicator';
import CreatePlaylistModal from './components/CreatePlaylistModal';

const PlaylistLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({ activeFilter: 'all' });
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock playlist data
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: "My Favorites",
      trackCount: 45,
      duration: 2700, // 45 minutes
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      isOfflineAvailable: true,
      createdAt: new Date('2024-01-15'),
      lastPlayed: new Date('2024-09-13'),
      downloadProgress: 100
    },
    {
      id: 2,
      title: "Workout Mix",
      trackCount: 32,
      duration: 1920, // 32 minutes
      coverArt: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      isOfflineAvailable: false,
      createdAt: new Date('2024-02-20'),
      lastPlayed: new Date('2024-09-12'),
      downloadProgress: 0
    },
    {
      id: 3,
      title: "Chill Vibes",
      trackCount: 28,
      duration: 1680, // 28 minutes
      coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      isOfflineAvailable: true,
      createdAt: new Date('2024-03-10'),
      lastPlayed: new Date('2024-09-10'),
      downloadProgress: 100
    },
    {
      id: 4,
      title: "Road Trip Classics",
      trackCount: 67,
      duration: 4020, // 67 minutes
      coverArt: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      isOfflineAvailable: false,
      createdAt: new Date('2024-04-05'),
      lastPlayed: new Date('2024-09-08'),
      downloadProgress: 0
    },
    {
      id: 5,
      title: "Study Focus",
      trackCount: 23,
      duration: 1380, // 23 minutes
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      isOfflineAvailable: true,
      createdAt: new Date('2024-05-12'),
      lastPlayed: new Date('2024-09-14'),
      downloadProgress: 100
    },
    {
      id: 6,
      title: "Party Hits",
      trackCount: 54,
      duration: 3240, // 54 minutes
      coverArt: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      isOfflineAvailable: false,
      createdAt: new Date('2024-06-18'),
      lastPlayed: new Date('2024-09-11'),
      downloadProgress: 0
    }
  ]);

  // Storage data
  const storageData = {
    usedStorage: 2.4 * 1024 * 1024 * 1024, // 2.4 GB in bytes
    totalStorage: 16 * 1024 * 1024 * 1024, // 16 GB in bytes
    downloadQueue: 2
  };

  // Filter and sort playlists
  const filteredAndSortedPlaylists = useMemo(() => {
    let filtered = playlists;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(playlist =>
        playlist?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    switch (filters?.activeFilter) {
      case 'offline':
        filtered = filtered?.filter(playlist => playlist?.isOfflineAvailable);
        break;
      case 'online':
        filtered = filtered?.filter(playlist => !playlist?.isOfflineAvailable);
        break;
      case 'recent':
        filtered = filtered?.filter(playlist => {
          const daysSinceLastPlayed = (new Date() - playlist?.lastPlayed) / (1000 * 60 * 60 * 24);
          return daysSinceLastPlayed <= 7;
        });
        break;
      default:
        break;
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.title?.localeCompare(b?.title);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'duration':
          return b?.duration - a?.duration;
        case 'tracks':
          return b?.trackCount - a?.trackCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [playlists, searchQuery, filters?.activeFilter, sortBy]);

  const handlePlay = (playlistId) => {
    console.log('Playing playlist:', playlistId);
    navigate('/music-player-dashboard');
  };

  const handleShuffle = (playlistId) => {
    console.log('Shuffling playlist:', playlistId);
    navigate('/music-player-dashboard');
  };

  const handleDownload = (playlistId) => {
    console.log('Downloading playlist:', playlistId);
    setPlaylists(prev => prev?.map(playlist => 
      playlist?.id === playlistId 
        ? { ...playlist, downloadProgress: 10 }
        : playlist
    ));
  };

  const handleToggleOffline = (playlistId, isOffline) => {
    setPlaylists(prev => prev?.map(playlist => 
      playlist?.id === playlistId 
        ? { ...playlist, isOfflineAvailable: isOffline, downloadProgress: isOffline ? 100 : 0 }
        : playlist
    ));
  };

  const handleFilterChange = (filterKey) => {
    setFilters({ activeFilter: filterKey });
  };

  const handleCreatePlaylist = (playlistData) => {
    const newPlaylist = {
      id: Date.now(),
      title: playlistData?.name,
      trackCount: 0,
      duration: 0,
      coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      isOfflineAvailable: false,
      createdAt: new Date(),
      lastPlayed: null,
      downloadProgress: 0,
      isPrivate: playlistData?.isPrivate
    };
    
    setPlaylists(prev => [newPlaylist, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Playlist Library</h1>
          <p className="text-muted-foreground">
            Organize and manage your music collections with offline access
          </p>
        </div>

        {/* Storage Indicator */}
        <StorageIndicator
          usedStorage={storageData?.usedStorage}
          totalStorage={storageData?.totalStorage}
          downloadQueue={storageData?.downloadQueue}
        />

        {/* Filters and Controls */}
        <PlaylistFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filters={filters}
          onFilterChange={handleFilterChange}
          onCreatePlaylist={() => setShowCreateModal(true)}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedPlaylists?.length} of {playlists?.length} playlists
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Playlist Grid */}
        <PlaylistGrid
          playlists={filteredAndSortedPlaylists}
          onPlay={handlePlay}
          onShuffle={handleShuffle}
          onDownload={handleDownload}
          onToggleOffline={handleToggleOffline}
        />

        {/* Create Playlist Modal */}
        <CreatePlaylistModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreatePlaylist={handleCreatePlaylist}
        />
      </div>
    </div>
  );
};

export default PlaylistLibrary;