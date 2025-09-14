import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PlaylistLibrary from './pages/playlist-library';
import OfflineDownloadsManager from './pages/offline-downloads-manager';
import MusicDiscovery from './pages/music-discovery';
import MusicPlayerDashboard from './pages/music-player-dashboard';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MusicDiscovery />} />
        <Route path="/playlist-library" element={<PlaylistLibrary />} />
        <Route path="/offline-downloads-manager" element={<OfflineDownloadsManager />} />
        <Route path="/music-discovery" element={<MusicDiscovery />} />
        <Route path="/music-player-dashboard" element={<MusicPlayerDashboard />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
