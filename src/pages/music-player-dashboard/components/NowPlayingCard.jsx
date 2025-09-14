import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const NowPlayingCard = ({ currentSong, isPlaying, onTogglePlay }) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Album Artwork */}
        <div className="relative group">
          <div className="w-48 h-48 lg:w-32 lg:h-32 rounded-lg overflow-hidden shadow-md">
            <Image
              src={currentSong?.albumArt}
              alt={`${currentSong?.title} album cover`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Play/Pause Overlay */}
          <button
            onClick={onTogglePlay}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg"
          >
            <div className="bg-white/90 rounded-full p-3">
              <Icon
                name={isPlaying ? "Pause" : "Play"}
                size={24}
                className="text-gray-900"
              />
            </div>
          </button>
        </div>

        {/* Song Information */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl lg:text-xl font-bold text-foreground mb-2 line-clamp-2">
            {currentSong?.title}
          </h2>
          <p className="text-lg lg:text-base text-muted-foreground mb-1">
            {currentSong?.artist}
          </p>
          <p className="text-sm text-muted-foreground">
            {currentSong?.album} • {currentSong?.year}
          </p>
          
          {/* Download Status */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
            <Icon
              name={currentSong?.isDownloaded ? "Download" : "Cloud"}
              size={16}
              className={currentSong?.isDownloaded ? "text-success" : "text-muted-foreground"}
            />
            <span className="text-xs text-muted-foreground">
              {currentSong?.isDownloaded ? "Downloaded" : "Streaming"}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex lg:flex-col gap-2">
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Icon name="Heart" size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Icon name="Share2" size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Icon name="MoreHorizontal" size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingCard;