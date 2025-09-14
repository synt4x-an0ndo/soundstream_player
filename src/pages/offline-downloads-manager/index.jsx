import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import StorageOverview from './components/StorageOverview';
import DownloadFilters from './components/DownloadFilters';
import DownloadItem from './components/DownloadItem';
import NetworkStatus from './components/NetworkStatus';
import DownloadSettings from './components/DownloadSettings';

const OfflineDownloadsManager = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    quality: 'all'
  });

  // Mock data for downloads
  const [downloads] = useState([
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      type: "song",
      duration: 200,
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      fileSize: 8500000,
      quality: "320kbps",
      status: "completed",
      downloadDate: "2025-01-10"
    },
    {
      id: 2,
      title: "Chill Vibes Playlist",
      artist: "Various Artists",
      type: "playlist",
      trackCount: 25,
      artwork: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=400&h=400&fit=crop",
      fileSize: 180000000,
      quality: "192kbps",
      status: "downloading",
      progress: 65,
      eta: "3 min"
    },
    {
      id: 3,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      type: "song",
      duration: 178,
      artwork: "https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=400&h=400&fit=crop",
      fileSize: 7200000,
      quality: "320kbps",
      status: "paused",
      progress: 30
    },
    {
      id: 4,
      title: "Dua Lipa - Future Nostalgia",
      artist: "Dua Lipa",
      type: "album",
      trackCount: 11,
      artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
      fileSize: 95000000,
      quality: "320kbps",
      status: "failed",
      error: "Network timeout"
    },
    {
      id: 5,
      title: "Levitating",
      artist: "Dua Lipa",
      type: "song",
      duration: 203,
      artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?w=400&h=400&fit=crop",
      fileSize: 8100000,
      quality: "320kbps",
      status: "completed",
      downloadDate: "2025-01-09"
    },
    {
      id: 6,
      title: "Workout Mix 2025",
      artist: "Various Artists",
      type: "playlist",
      trackCount: 40,
      artwork: "https://images.pixabay.com/photo/2017/08/06/12/06/people-2592247_1280.jpg?w=400&h=400&fit=crop",
      fileSize: 320000000,
      quality: "192kbps",
      status: "downloading",
      progress: 15,
      eta: "12 min"
    }
  ]);

  // Mock storage data
  const [storageData] = useState({
    used: 2400000000, // 2.4 GB
    total: 32000000000, // 32 GB
    available: 29600000000 // 29.6 GB
  });

  // Mock network status
  const [networkStatus] = useState({
    isOnline: true,
    connectionType: 'wifi',
    downloadSpeed: 1250 // KB/s
  });

  // Mock settings
  const [settings, setSettings] = useState({
    defaultQuality: 'high',
    storageLocation: 'internal',
    autoDownloadLiked: true,
    autoDownloadPlaylists: false,
    wifiOnly: true,
    autoDeleteOld: false,
    maxStorageGB: 10
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleItemSelect = (itemId, isSelected) => {
    setSelectedItems(prev => 
      isSelected 
        ? [...prev, itemId]
        : prev?.filter(id => id !== itemId)
    );
  };

  const handleSelectAll = () => {
    const filteredDownloads = getFilteredDownloads();
    const allSelected = filteredDownloads?.every(item => selectedItems?.includes(item?.id));
    
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredDownloads?.map(item => item?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    // Mock implementation
    setSelectedItems([]);
  };

  const handleItemAction = (itemId, action) => {
    console.log(`Performing ${action} on item:`, itemId);
    // Mock implementation
  };

  const handleManageStorage = () => {
    setShowSettings(true);
  };

  const getFilteredDownloads = () => {
    return downloads?.filter(item => {
      if (filters?.status !== 'all' && item?.status !== filters?.status) return false;
      if (filters?.type !== 'all' && item?.type !== filters?.type) return false;
      if (filters?.quality !== 'all') {
        const qualityMap = { high: '320kbps', medium: '192kbps', low: '128kbps' };
        if (item?.quality !== qualityMap?.[filters?.quality]) return false;
      }
      return true;
    });
  };

  const filteredDownloads = getFilteredDownloads();
  const allSelected = filteredDownloads?.length > 0 && filteredDownloads?.every(item => selectedItems?.includes(item?.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/music-player-dashboard"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Offline Downloads
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your downloaded music and storage
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icon name="Settings" size={20} />
              </button>
              
              <nav className="hidden md:flex space-x-1">
                <Link
                  to="/playlist-library"
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Playlists
                </Link>
                <Link
                  to="/music-discovery"
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Discover
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <StorageOverview 
              storageData={storageData}
              onManageStorage={handleManageStorage}
            />
            
            <NetworkStatus 
              isOnline={networkStatus?.isOnline}
              connectionType={networkStatus?.connectionType}
              downloadSpeed={networkStatus?.downloadSpeed}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <DownloadFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onBulkAction={handleBulkAction}
              selectedItems={selectedItems}
            />

            {/* Downloads List Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Downloads ({filteredDownloads?.length})
                    </h2>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Icon name="Download" size={16} />
                    <span>
                      {downloads?.filter(d => d?.status === 'downloading')?.length} active
                    </span>
                  </div>
                </div>
              </div>

              {/* Downloads List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDownloads?.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <Icon name="Download" size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No downloads found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start downloading music to enjoy offline playback
                    </p>
                    <Link
                      to="/music-discovery"
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      <Icon name="Search" size={16} className="mr-2" />
                      Discover Music
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {filteredDownloads?.map((item) => (
                      <DownloadItem
                        key={item?.id}
                        item={item}
                        isSelected={selectedItems?.includes(item?.id)}
                        onSelect={handleItemSelect}
                        onAction={handleItemAction}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Settings Modal */}
      <DownloadSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default OfflineDownloadsManager;