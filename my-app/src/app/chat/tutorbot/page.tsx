export default function TutorBotChat() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div className="bg-white p-4 rounded shadow mb-4">
          <p className="text-gray-700">Welcome! How can I help you today?</p>
        </div>
        {/* Add more chat bubbles here */}
      </div>
      <div className="p-4 bg-white shadow-md">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Type your message..."
        />
      </div>
    </div>
  );
}
