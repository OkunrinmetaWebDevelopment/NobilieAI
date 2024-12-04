import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken, logout } from '@/lib/auth';
import { withAuth } from '@/lib/withAuth';
import Navbar from '@/components/Navbar';


type BotKey = keyof typeof BOT_CONFIGS;


// Configuration for different bots
const BOT_CONFIGS = {
  tutorbot: {
    title: 'Chat with TutorBot',
    allowedTypes: ['.pdf', '.txt', '.docx'],
    maxSize: 50 * 1024 * 1024, // 50MB
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}admin/uploadfiles/`,
  },
  guidebot: {
    title: 'Explore Mauritius with GuideBot',
    allowedTypes: ['.pdf', '.txt', '.csv'],
    maxSize: 100 * 1024 * 1024, // 100MB
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}admin/uploadfiles-guidebot-admin/`,
  },
  lawbot: {
    title: 'Legal Help with LawBot',
    allowedTypes: ['.pdf', '.txt', '.docx', '.md'],
    maxSize: 50 * 1024 * 1024, // 50MB
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}admin/uploadfiles-lawbot-admin/`,
  },
};

const FileUploadComponent: React.FC = () => {
  const [files, setFiles] = useState<Record<string, File | null>>({
    tutorbot: null,
    guidebot: null,
    lawbot: null,
  });
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({
    tutorbot: '',
    guidebot: '',
    lawbot: '',
  });
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({
    tutorbot: 0,
    guidebot: 0,
    lawbot: 0,
  });

  const validateFile = (file: File, botKey: BotKey): string | null => {
    const config = BOT_CONFIGS[botKey];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  
    // Check file type
    if (!config.allowedTypes.includes(fileExtension)) {
      return `Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`;
    }
  
    // Check file size
    if (file.size > config.maxSize) {
      return `File too large. Max size: ${config.maxSize / (1024 * 1024)}MB`;
    }
  
    return null;
  };
  

  const parseErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as {
        detail?: string | { msg: string }[];
      };

      if (Array.isArray(errorData.detail)) {
        return errorData.detail.map((err: { msg: string }) => err.msg).join('; ');
      }

      if (typeof errorData.detail === 'string') {
        return errorData.detail;
      }

      return 'Upload failed due to an unexpected error';
    }

    if (error instanceof Error) {
      return error.message || 'Upload failed';
    }

    return 'An unknown error occurred';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, botKey: BotKey) => {
    const file = e.target.files ? e.target.files[0] : null;
  
    if (file) {
      const validationError = validateFile(file, botKey);
      if (validationError) {
        setUploadErrors((prev) => ({ ...prev, [botKey]: validationError }));
        return;
      }
    }
  
    setFiles((prev) => ({ ...prev, [botKey]: file }));
    setUploadErrors((prev) => ({ ...prev, [botKey]: '' }));
    setUploadProgress((prev) => ({ ...prev, [botKey]: 0 }));
  };
  
  const handleFileUpload = async (botKey: BotKey) => {
    // Reset previous errors
    setUploadErrors((prev) => ({ ...prev, [botKey]: '' }));
  
    // Check authentication
    const token = getAccessToken();
    if (!token) {
      logout();
      return;
    }
  
    const file = files[botKey];
    if (!file) {
      setUploadErrors((prev) => ({
        ...prev,
        [botKey]: 'Please select a file',
      }));
      return;
    }
  
    const formData = new FormData();
    formData.append('files', file);
  
    try {
      await axios.post(BOT_CONFIGS[botKey].endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              [botKey]: percentCompleted,
            }));
          } else {
            console.warn('Total size of the upload is undefined.');
          }
        },
        
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });
  
      // Reset file and show success
      setFiles((prev) => ({ ...prev, [botKey]: null }));
      setUploadProgress((prev) => ({ ...prev, [botKey]: 100 }));
      alert(`${botKey} file uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading to ${botKey}:`, error);
  
      // Handle unauthorized errors
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout();
        return;
      }
  
      // Set error message
      const errorMessage = parseErrorMessage(error);
      setUploadErrors((prev) => ({
        ...prev,
        [botKey]: errorMessage,
      }));
      setUploadProgress((prev) => ({ ...prev, [botKey]: 0 }));
    }
  };
  

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Upload Files to VectorDB</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(BOT_CONFIGS).map(([botKey, config]) => (
  <div key={botKey} className="p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">{config.title}</h3>
    <input
      type="file"
      accept={config.allowedTypes.join(',')}
      onChange={(e) => handleFileChange(e, botKey as BotKey)}
      className="w-full p-2 border rounded"
    />
    {uploadErrors[botKey as BotKey] && (
      <p className="text-red-500 text-sm mt-2">{uploadErrors[botKey as BotKey]}</p>
    )}
    {uploadProgress[botKey as BotKey] > 0 && (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${uploadProgress[botKey as BotKey]}%` }}
        ></div>
      </div>
    )}
    <button
      onClick={() => handleFileUpload(botKey as BotKey)}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
      disabled={!files[botKey as BotKey] || uploadProgress[botKey as BotKey] > 0}
    >
      Upload to {botKey.charAt(0).toUpperCase() + botKey.slice(1)}
    </button>
  </div>
))}

        </div>
      </div>
    </>
  );
};

export default withAuth(FileUploadComponent);
