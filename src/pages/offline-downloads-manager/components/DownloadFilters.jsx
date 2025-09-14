import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const DownloadFilters = ({ filters, onFilterChange, onBulkAction, selectedItems }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'downloading', label: 'Downloading' },
    { value: 'paused', label: 'Paused' },
    { value: 'failed', label: 'Failed' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'song', label: 'Songs' },
    { value: 'playlist', label: 'Playlists' },
    { value: 'album', label: 'Albums' }
  ];

  const qualityOptions = [
    { value: 'all', label: 'All Quality' },
    { value: 'high', label: 'High (320kbps)' },
    { value: 'medium', label: 'Medium (192kbps)' },
    { value: 'low', label: 'Low (128kbps)' }
  ];

  const bulkActions = [
    { id: 'pause', label: 'Pause Selected', icon: 'Pause' },
    { id: 'resume', label: 'Resume Selected', icon: 'Play' },
    { id: 'delete', label: 'Delete Selected', icon: 'Trash2' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Filter by status"
            className="w-full sm:w-40"
          />
          
          <Select
            options={typeOptions}
            value={filters?.type}
            onChange={(value) => onFilterChange('type', value)}
            placeholder="Filter by type"
            className="w-full sm:w-40"
          />
          
          <Select
            options={qualityOptions}
            value={filters?.quality}
            onChange={(value) => onFilterChange('quality', value)}
            placeholder="Filter by quality"
            className="w-full sm:w-40"
          />
        </div>

        {selectedItems?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 self-center">
              {selectedItems?.length} selected
            </span>
            {bulkActions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => onBulkAction(action?.id)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                <Icon name={action?.icon} size={14} />
                <span className="hidden sm:inline">{action?.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadFilters;