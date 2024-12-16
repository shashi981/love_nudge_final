'use client';

import { useState } from 'react';
import { Event } from '../types/events';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onSave?: (event: Omit<Event, 'id'>) => void;
}

type EventType = 'fight' | 'happy' | 'special';

export default function EventModal({ isOpen, onClose, date, onSave }: EventModalProps) {
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [reminder, setReminder] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    const event = {
      type: selectedType,
      title,
      description,
      date,
      photoUrl: photoUrl || undefined,
      reminder: reminder ? new Date(reminder) : undefined,
    };

    onSave?.(event);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setSelectedType(null);
    setTitle('');
    setDescription('');
    setPhotoUrl('');
    setReminder('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {date.toLocaleDateString('en-US', { 
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        {!selectedType ? (
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setSelectedType('fight')}
              className="px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800"
            >
              Fight
            </button>
            <button 
              onClick={() => setSelectedType('happy')}
              className="px-4 py-2 rounded-md bg-green-100 hover:bg-green-200 text-green-800"
            >
              Happy Moment
            </button>
            <button 
              onClick={() => setSelectedType('special')}
              className="px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-800"
            >
              Special Event
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            {selectedType !== 'fight' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            {selectedType === 'special' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Reminder</label>
                <input
                  type="datetime-local"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 