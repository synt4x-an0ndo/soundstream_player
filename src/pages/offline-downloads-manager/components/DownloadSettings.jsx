import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DownloadSettings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const qualityOptions = [
    { value: 'high', label: 'High Quality (320kbps)' },
    { value: 'medium', label: 'Medium Quality (192kbps)' },
    { value: 'low', label: 'Low Quality (128kbps)' }
  ];

  const storageOptions = [
    { value: 'internal', label: 'Internal Storage' },
    { value: 'external', label: 'External Storage' },
    { value: 'cloud', label: 'Cloud Storage' }
  ];

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Download Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <Select
              label="Default Download Quality"
              description="Higher quality uses more storage space"
              options={qualityOptions}
              value={localSettings?.defaultQuality}
              onChange={(value) => handleSettingChange('defaultQuality', value)}
            />
          </div>
          
          <div>
            <Select
              label="Storage Location"
              description="Choose where to save downloaded music"
              options={storageOptions}
              value={localSettings?.storageLocation}
              onChange={(value) => handleSettingChange('storageLocation', value)}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Automatic Downloads</h3>
            
            <Checkbox
              label="Auto-download liked songs"
              description="Automatically download songs when you like them"
              checked={localSettings?.autoDownloadLiked}
              onChange={(e) => handleSettingChange('autoDownloadLiked', e?.target?.checked)}
            />
            
            <Checkbox
              label="Auto-download playlists"
              description="Download entire playlists when you follow them"
              checked={localSettings?.autoDownloadPlaylists}
              onChange={(e) => handleSettingChange('autoDownloadPlaylists', e?.target?.checked)}
            />
            
            <Checkbox
              label="Download only on WiFi"
              description="Prevent mobile data usage for downloads"
              checked={localSettings?.wifiOnly}
              onChange={(e) => handleSettingChange('wifiOnly', e?.target?.checked)}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Storage Management</h3>
            
            <Checkbox
              label="Auto-delete old downloads"
              description="Remove downloads not played in 30 days"
              checked={localSettings?.autoDeleteOld}
              onChange={(e) => handleSettingChange('autoDeleteOld', e?.target?.checked)}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Storage Usage
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={localSettings?.maxStorageGB}
                  onChange={(e) => handleSettingChange('maxStorageGB', parseInt(e?.target?.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                  {localSettings?.maxStorageGB} GB
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSettings;