import React from 'react';
import PlaylistCard from './PlaylistCard';

const PlaylistGrid = ({ playlists, onPlay, onShuffle, onDownload, onToggleOffline }) => {
  if (playlists?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">No playlists found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters, or create a new playlist.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {playlists?.map((playlist) => (
        <PlaylistCard
          key={playlist?.id}
          playlist={playlist}
          onPlay={onPlay}
          onShuffle={onShuffle}
          onDownload={onDownload}
          onToggleOffline={onToggleOffline}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;