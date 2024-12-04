// pages/admin/directions.tsx
'use client';

import axios from 'axios';
import { withAuth } from '@/lib/withAuth';
import { FileUploader } from '@/components/FileUploader';
import { LocationForm } from '@/components/LocationForm';
import { getAccessToken } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LocationData {
  from_location: string;
  to_destination: string;
  description: string;
}

function UploadLocation() {
  const handleLocationSubmit = async (locationData: LocationData) => {
    try {
      const token = getAccessToken();
      const response = await axios.post(`${API_URL}admin/locations/`, locationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Submission response:', response.data);
      alert('Location directions submitted successfully!');
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Failed to submit location directions.');
    }
  };

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = getAccessToken();
      const response = await axios.post(`${API_URL}admin/upload-directions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Submission response:', response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Enter Location Directions</h1>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Location Details</h2>
          <LocationForm onSubmit={handleLocationSubmit} />
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upload File</h2>
          <FileUploader onFileUpload={handleFileUpload} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(UploadLocation);
