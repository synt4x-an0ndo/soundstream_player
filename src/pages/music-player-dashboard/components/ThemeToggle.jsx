import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement?.classList?.add('dark');
    } else {
      setIsDark(false);
      document.documentElement?.classList?.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement?.classList?.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement?.classList?.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200"
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <Icon 
          name={isDark ? "Sun" : "Moon"} 
          size={18}
          className="transition-transform duration-200 hover:scale-110"
        />
      </Button>
    </div>
  );
};

export default ThemeToggle;