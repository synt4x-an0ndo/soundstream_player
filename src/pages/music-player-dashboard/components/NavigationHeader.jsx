import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ThemeToggle from './ThemeToggle';
import ConnectionStatus from './ConnectionStatus';

const NavigationHeader = ({ isOnline, downloadProgress }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/music-player-dashboard', label: 'Player', icon: 'Play' },
    { path: '/playlist-library', label: 'Library', icon: 'Library' },
    { path: '/music-discovery', label: 'Discover', icon: 'Compass' },
    { path: '/offline-downloads-manager', label: 'Downloads', icon: 'Download' },
    { path: '/user-authentication', label: 'Account', icon: 'User' }
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Music" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">SoundStream</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems?.map((item) => (
              <Link key={item?.path} to={item?.path}>
                <Button
                  variant={location?.pathname === item?.path ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon name={item?.icon} size={16} />
                  {item?.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Connection Status - Hidden on mobile */}
            <div className="hidden lg:block">
              <ConnectionStatus isOnline={isOnline} downloadProgress={downloadProgress} />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Link key={item?.path} to={item?.path} className="flex-1">
                <Button
                  variant={location?.pathname === item?.path ? "default" : "ghost"}
                  size="sm"
                  className="w-full flex-col gap-1 h-auto py-2"
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="text-xs">{item?.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;