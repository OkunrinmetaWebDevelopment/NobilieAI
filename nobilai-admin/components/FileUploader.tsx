// components/FileUploader.tsx
'use client';

import React, { useState } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => Promise<void>;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select or drop a file before uploading.');
      return;
    }

    try {
      await onFileUpload(file);
      setFile(null);
    } catch (error) {
      console.error('File upload error', error);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full p-6 border-2 rounded-lg text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        {file ? (
          <div>
            <p className="text-gray-700">Selected File: {file.name}</p>
            <button
              onClick={handleFileRemove}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove File
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500">Drag and drop a file here, or click to select</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2 block mx-auto"
              id="fileInput"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Upload File
      </button>
    </div>
  );
}