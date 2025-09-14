import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onVoiceSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef(null);

  const recentSearches = [
    "Taylor Swift",
    "Billie Eilish",
    "The Weeknd",
    "Dua Lipa"
  ];

  const trendingQueries = [
    "Anti-Hero",
    "Flowers",
    "Unholy",
    "As It Was",
    "Bad Habit"
  ];

  const suggestions = [
    "Taylor Swift - Anti-Hero",
    "Miley Cyrus - Flowers",
    "Sam Smith ft. Kim Petras - Unholy",
    "Harry Styles - As It Was",
    "Steve Lacy - Bad Habit"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice search
    setTimeout(() => {
      setIsListening(false);
      const voiceQuery = "Taylor Swift";
      setSearchQuery(voiceQuery);
      onVoiceSearch(voiceQuery);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for songs, artists, albums..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e?.target?.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="pl-12 pr-16 h-12 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-full shadow-sm"
        />
        
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        
        <button
          onClick={handleVoiceSearch}
          disabled={isListening}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Icon 
            name={isListening ? "Loader2" : "Mic"} 
            size={20} 
            className={`text-gray-400 ${isListening ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchQuery && (
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Suggestions</h4>
              {suggestions?.filter(suggestion => suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.slice(0, 3)?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center"
                  >
                    <Icon name="Search" size={16} className="mr-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
            </div>
          )}

          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Searches</h4>
            {recentSearches?.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-3 text-gray-400" />
                  {search}
                </div>
                <Icon name="ArrowUpLeft" size={14} className="text-gray-400" />
              </button>
            ))}
          </div>

          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Trending</h4>
            {trendingQueries?.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSearch(query)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center"
              >
                <Icon name="TrendingUp" size={16} className="mr-3 text-indigo-500" />
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;