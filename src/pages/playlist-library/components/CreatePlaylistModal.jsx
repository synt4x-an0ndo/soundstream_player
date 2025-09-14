import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreatePlaylistModal = ({ isOpen, onClose, onCreatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (playlistName?.trim()) {
      onCreatePlaylist({
        name: playlistName?.trim(),
        description: description?.trim(),
        isPrivate
      });
      setPlaylistName('');
      setDescription('');
      setIsPrivate(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Create New Playlist</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Playlist Name"
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e?.target?.value)}
            required
          />
          
          <Input
            label="Description (Optional)"
            type="text"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
          />
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e?.target?.checked)}
              className="rounded border-border"
            />
            <label htmlFor="private" className="text-sm text-card-foreground">
              Make this playlist private
            </label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!playlistName?.trim()}
              fullWidth
            >
              Create Playlist
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;