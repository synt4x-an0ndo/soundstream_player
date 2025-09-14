import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenreFilter = ({ selectedGenres = [], onGenreChange, onClearAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const genres = [
    { id: 'pop', name: 'Pop', icon: 'Star', color: 'bg-pink-500' },
    { id: 'rock', name: 'Rock', icon: 'Zap', color: 'bg-red-500' },
    { id: 'hip-hop', name: 'Hip Hop', icon: 'Mic', color: 'bg-purple-500' },
    { id: 'electronic', name: 'Electronic', icon: 'Radio', color: 'bg-blue-500' },
    { id: 'jazz', name: 'Jazz', icon: 'Music', color: 'bg-amber-500' },
    { id: 'classical', name: 'Classical', icon: 'Piano', color: 'bg-emerald-500' },
    { id: 'country', name: 'Country', icon: 'Guitar', color: 'bg-orange-500' },
    { id: 'r&b', name: 'R&B', icon: 'Heart', color: 'bg-rose-500' },
    { id: 'indie', name: 'Indie', icon: 'Headphones', color: 'bg-indigo-500' },
    { id: 'folk', name: 'Folk', icon: 'TreePine', color: 'bg-green-500' },
    { id: 'metal', name: 'Metal', icon: 'Flame', color: 'bg-gray-700' },
    { id: 'reggae', name: 'Reggae', icon: 'Sun', color: 'bg-yellow-500' }
  ];

  const visibleGenres = isExpanded ? genres : genres?.slice(0, 6);

  const handleGenreClick = (genreId) => {
    const isSelected = selectedGenres?.includes(genreId);
    let newSelectedGenres;
    
    if (isSelected) {
      newSelectedGenres = selectedGenres?.filter(id => id !== genreId);
    } else {
      newSelectedGenres = [...selectedGenres, genreId];
    }
    
    if (onGenreChange) {
      onGenreChange(newSelectedGenres);
    }
  };

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Browse by Genre</h3>
        {selectedGenres?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {visibleGenres?.map((genre) => {
          const isSelected = selectedGenres?.includes(genre?.id);
          
          return (
            <button
              key={genre?.id}
              onClick={() => handleGenreClick(genre?.id)}
              className={`relative p-4 rounded-lg transition-all duration-200 group ${
                isSelected 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' :'hover:scale-105'
              }`}
            >
              <div className={`${genre?.color} rounded-lg p-4 mb-3 transition-transform duration-200 group-hover:scale-110`}>
                <Icon name={genre?.icon} size={24} color="white" />
              </div>
              <h4 className={`text-sm font-medium transition-colors duration-200 ${
                isSelected ? 'text-primary' : 'text-foreground'
              }`}>
                {genre?.name}
              </h4>
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {/* Expand/Collapse Button */}
      {genres?.length > 6 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Show Less' : `Show ${genres?.length - 6} More`}
          </Button>
        </div>
      )}
      {/* Selected Genres Summary */}
      {selectedGenres?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Selected:</span>
          {selectedGenres?.map((genreId) => {
            const genre = genres?.find(g => g?.id === genreId);
            return (
              <span
                key={genreId}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                <span>{genre?.name}</span>
                <button
                  onClick={() => handleGenreClick(genreId)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenreFilter;