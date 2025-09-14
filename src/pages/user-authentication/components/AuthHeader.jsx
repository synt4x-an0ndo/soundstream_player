import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getHeaderContent = () => {
    if (activeTab === 'login') {
      return {
        title: 'Welcome Back',
        subtitle: 'Sign in to access your music library and continue where you left off',
        icon: 'Music'
      };
    }
    return {
      title: 'Join SoundStream',
      subtitle: 'Create your account to start streaming and downloading your favorite music',
      icon: 'UserPlus'
    };
  };

  const { title, subtitle, icon } = getHeaderContent();

  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name={icon} size={28} color="white" />
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;