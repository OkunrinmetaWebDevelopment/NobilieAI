// components/LocationForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Location {
  id: number;
  name: string;
}

interface LocationFormProps {
  onSubmit: (locationData: {
    from_location: string;
    to_destination: string;
    description: string;
  }) => Promise<void>;
}

export function LocationForm({ onSubmit }: LocationFormProps) {
  const [locationsList, setLocationsList] = useState<Location[]>([]);
  const [location, setLocation] = useState({
    from_location: '',
    to_destination: '',
    description: '',
  });

  // Fetch location options
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/get-insert-locations/`);
        setLocationsList(response.data);
      } catch (error) {
        console.error('Error fetching location options:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(location);
      // Optional: Reset form after successful submission
      setLocation({
        from_location: '',
        to_destination: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Failed to submit location directions.');
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">From</label>
          <select
            name="from_location"
            value={location.from_location}
            onChange={handleLocationChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a location</option>
            {locationsList.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">To</label>
          <select
            name="to_destination"
            value={location.to_destination}
            onChange={handleLocationChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a location</option>
            {locationsList.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className="block mb-2 font-medium">Location Description</label>
      <textarea
        name="description"
        value={location.description}
        onChange={handleLocationChange}
        className="w-full p-4 border rounded h-32"
        placeholder="Enter the detailed location description here..."
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Location Directions
      </button>
    </div>
  );
}