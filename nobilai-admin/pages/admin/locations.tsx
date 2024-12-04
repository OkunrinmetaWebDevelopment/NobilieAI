// pages/admin/locations.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { withAuth } from '@/lib/withAuth';
import { LocationTable } from '@/components/LocationTable';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { getAccessToken } from '@/lib/auth';
import Navbar from '@/components/Navbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Location {
  id: number;
  from_location: string;
  to_destination: string;
  description: string;
  verified: boolean;
}

function LocationVerification() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = getAccessToken();
        const response = await axios.get(`${API_URL}admin/get-directions-locations/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch locations", error);
        setError('Failed to load locations');
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleVerify = async (id: number, verified: boolean) => {
    try {
      const token = getAccessToken();
      await axios.put(
        `${API_URL}admin/locations/${id}/verify`,
        { verified },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state locally after successful update
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === id ? { ...location, verified } : location
        )
      );
    } catch (error) {
      console.error("Failed to update verification status", error);
      // Optionally, show an error message to the user
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Locations Verification</h1>
        <LocationTable locations={locations} onVerify={handleVerify} />
      </div>
    </>
  );
}

export default withAuth(LocationVerification);
