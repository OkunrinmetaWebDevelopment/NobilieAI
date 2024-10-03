'use client';  // Add this to ensure it's a Client Component

import { useState } from 'react';
import { CloudArrowUpIcon, PencilIcon } from '@heroicons/react/24/outline';  // Import the icons

export default function TutorBotChat() {
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setConversationHistory([...conversationHistory, message]);
      setMessage(''); // Reset the input field
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 relative">
        {/* Sidebar Header with New Conversation Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">TutorBot</h1>
          <button className="p-2 rounded-full hover:bg-gray-800">
            <PencilIcon className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto mb-4">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          {conversationHistory.length === 0 ? (
            <p className="text-gray-400">No conversations yet.</p>
          ) : (
            <ul>
              {conversationHistory.map((conversation, index) => (
                <li key={index} className="mb-2 p-2 bg-gray-800 rounded">
                  {conversation}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* File Upload Section */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Upload Documents</h2>
          <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer flex items-center space-x-2">
            <CloudArrowUpIcon className="h-5 w-5" />
            <span>Upload Files</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Display uploaded files */}
          <div className="mt-4">
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-400">No files uploaded yet.</p>
            ) : (
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-sm bg-gray-800 p-2 mb-2 rounded-md">
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="flex flex-col space-y-4">
            {/* Display previous conversations */}
            {conversationHistory.map((conversation, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md max-w-lg self-start">
                <p className="text-gray-800">{conversation}</p>
              </div>
            ))}

            {/* Initial message or default welcome */}
            <div className="bg-white p-4 rounded-lg shadow-md max-w-lg self-start">
              <p className="text-gray-800">Welcome! How can I help you today?</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 shadow-md flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none resize-none h-16"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
