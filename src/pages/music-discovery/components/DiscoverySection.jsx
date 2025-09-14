import React, { useRef, useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import MusicCard from './MusicCard';

const DiscoverySection = ({ 
  title, 
  subtitle, 
  items, 
  onViewAll, 
  onRefresh, 
  showRefresh = false,
  onPlay,
  onAddToPlaylist,
  onDownload
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef?.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef?.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft = direction === 'left' 
        ? scrollRef?.current?.scrollLeft - scrollAmount
        : scrollRef?.current?.scrollLeft + scrollAmount;
      
      scrollRef?.current?.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {showRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              iconName="RefreshCw"
              iconSize={16}
            >
              Refresh
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            View All
          </Button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div className="relative">
        {/* Scroll Buttons */}
        {canScrollLeft && (
          <Button
            variant="default"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
        )}
        
        {canScrollRight && (
          <Button
            variant="default"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        )}

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items?.map((item) => (
            <div key={item?.id} className="flex-shrink-0 w-48">
              <MusicCard
                {...item}
                onPlay={onPlay}
                onAddToPlaylist={onAddToPlaylist}
                onDownload={onDownload}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverySection;