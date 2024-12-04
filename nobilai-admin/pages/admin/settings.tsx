'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth';
import { withAuth } from '@/lib/withAuth';
import Navbar from '@/components/Navbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Model Selection Component
const ModelSelector = ({ 
  models, 
  selectedModel, 
  onModelChange 
}: { 
  models: Array<{id: number, name: string}>, 
  selectedModel: number | null, 
  onModelChange: (id: number) => Promise<void> 
}) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2">Select Model</h2>
    <select
      value={selectedModel || ''}
      onChange={(e) => onModelChange(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded-md w-full"
    >
      <option value="" disabled>Select a model</option>
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  </div>
);

// Database Clearing Component
const DatabaseCleaner = ({ 
  onClearDatabase 
}: { 
  onClearDatabase: (pathType: string) => Promise<void> 
}) => {
  const databases = [
    { key: 'pdfVDB', label: 'PDF VDB' },
    { key: 'guideVDB', label: 'Guide VDB' },
    { key: 'lawVDB', label: 'Law VDB' }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Clear Vector Database</h2>
      <div className="flex space-x-2">
        {databases.map((db) => (
          <button
            key={db.key}
            onClick={() => onClearDatabase(db.key)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Clear {db.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Settings Component
const Settings: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [clearStatus, setClearStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const models = [
    { id: 1, name: 'Cohere' },
    { id: 2, name: 'Ollama' },
    { id: 3, name: 'Huggingface' },
    { id: 4, name: 'TogetherAi' },
  ];

  // Handle model selection
  const handleModelChange = async (id: number) => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
      
      if (!token) {
        throw new Error("Authentication required");
      }

      await axios.put(`${API_URL}admin/update_current-model/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setSelectedModel(id);
      const modelName = models.find(m => m.id === id)?.name;
      alert(`Model ${modelName} selected successfully`);
    } catch (error) {
      console.error('Failed to update model:', error);
      alert('Failed to update model');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle database clearing
  const handleClearDatabase = async (pathType: string) => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
  
      if (!token) {
        throw new Error("Authentication required");
      }
  
      const response = await axios.delete(`${API_URL}admin/clear-vector-db-admin`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { path_type: pathType },
      });
  
      setClearStatus(response.data.message || `${pathType} cleared successfully`);
    } catch (error) {
      console.error('Error clearing database:', error);
      setClearStatus('Failed to clear database');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     {/* Navbar */}
     <Navbar />
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      <ModelSelector 
        models={models}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />

      <DatabaseCleaner 
        onClearDatabase={handleClearDatabase}
      />

      {clearStatus && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          {clearStatus}
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
        </div>
      )}
    </div>
    </>
  );
};

export default withAuth(Settings);