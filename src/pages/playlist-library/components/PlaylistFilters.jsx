import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PlaylistFilters = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  filters, 
  onFilterChange,
  onCreatePlaylist 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'date', label: 'Date Created' },
    { value: 'duration', label: 'Duration' },
    { value: 'tracks', label: 'Track Count' }
  ];

  const filterButtons = [
    { key: 'all', label: 'All Playlists', icon: 'Music' },
    { key: 'offline', label: 'Offline Available', icon: 'Download' },
    { key: 'online', label: 'Online Only', icon: 'Wifi' },
    { key: 'recent', label: 'Recently Played', icon: 'Clock' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          {filterButtons?.map((filter) => (
            <Button
              key={filter?.key}
              variant={filters?.activeFilter === filter?.key ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter?.key)}
              iconName={filter?.icon}
              iconPosition="left"
              iconSize={16}
            >
              {filter?.label}
            </Button>
          ))}
        </div>

        <Button
          variant="default"
          onClick={onCreatePlaylist}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Create Playlist
        </Button>
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Icon name="Filter" size={18} />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onCreatePlaylist}
          >
            <Icon name="Plus" size={18} />
          </Button>
        </div>

        {/* Expandable filters panel */}
        {showMobileFilters && (
          <div className="space-y-3 pt-3 border-t border-border">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
              label="Sort by"
            />
            
            <div className="grid grid-cols-2 gap-2">
              {filterButtons?.map((filter) => (
                <Button
                  key={filter?.key}
                  variant={filters?.activeFilter === filter?.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => onFilterChange(filter?.key)}
                  iconName={filter?.icon}
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  {filter?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistFilters;