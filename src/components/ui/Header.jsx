import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('online');

  const navigationItems = [
    { path: '/music-player-dashboard', label: 'Now Playing', icon: 'Play' },
    { path: '/playlist-library', label: 'Library', icon: 'Library' },
    { path: '/music-discovery', label: 'Discover', icon: 'Compass' },
    { path: '/offline-downloads-manager', label: 'Downloads', icon: 'Download' }
  ];

  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setConnectionStatus(navigator.onLine ? 'online' : 'offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="Music" size={20} color="white" />
      </div>
      <span className="text-xl font-bold text-foreground">SoundStream</span>
    </div>
  );

  const ConnectionIndicator = () => (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
      connectionStatus === 'online' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        connectionStatus === 'online' ? 'bg-success' : 'bg-warning'
      }`} />
      <span className="hidden sm:inline">
        {connectionStatus === 'online' ? 'Online' : 'Offline'}
      </span>
    </div>
  );

  const AuthModal = () => (
    isAuthModalOpen && (
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsAuthModalOpen(false)}
        />
        <div className="relative bg-card rounded-lg shadow-elevation-3 w-full max-w-md mx-4 p-6 theme-transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-card-foreground">Welcome Back</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAuthModalOpen(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-card-foreground">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
              />
            </div>
            
            <Button
              variant="default"
              fullWidth
              onClick={handleLogin}
              className="mt-6"
            >
              Sign In
            </Button>
            
            <div className="text-center">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const UserMenu = () => (
    isUserMenuOpen && (
      <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
        <div className="py-1">
          <button
            onClick={() => setIsUserMenuOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => setIsUserMenuOpen(false)}
            className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors"
          >
            Settings
          </button>
          <hr className="my-1 border-border" />
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border theme-transition">
        <div className="flex items-center justify-between h-16 px-6">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="transition-all duration-200"
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <ConnectionIndicator />
            
            <div className="relative">
              <Button
                variant={isAuthenticated ? "ghost" : "default"}
                size="sm"
                onClick={handleAuthClick}
                iconName={isAuthenticated ? "User" : "LogIn"}
                iconPosition="left"
                iconSize={16}
              >
                {isAuthenticated ? "Account" : "Sign In"}
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden border-t border-border bg-background">
          <div className="flex items-center justify-around py-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center space-y-1 min-w-0 px-2 py-2 ${
                  location?.pathname === item?.path 
                    ? 'text-primary' :'text-muted-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={location?.pathname === item?.path ? 'var(--color-primary)' : 'currentColor'}
                />
                <span className="text-xs font-medium truncate">{item?.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </header>
      <AuthModal />
    </>
  );
};

export default Header;