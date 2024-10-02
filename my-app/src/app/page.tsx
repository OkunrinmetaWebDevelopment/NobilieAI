import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Noblie AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link href="/chat/tutorbot">
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 cursor-pointer">
            <h2 className="text-xl font-bold">Chat with TutorBot</h2>
            <p className="mt-2">Get educational insights from your documents.</p>
          </div>
        </Link>
        <Link href="/chat/guidebot">
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 cursor-pointer">
            <h2 className="text-xl font-bold">Explore Mauritius with GuideBot</h2>
            <p className="mt-2">Navigate and explore Mauritius easily.</p>
          </div>
        </Link>
        <Link href="/chat/lawbot">
          <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 cursor-pointer">
            <h2 className="text-xl font-bold">Legal Help with LawBot</h2>
            <p className="mt-2">Get accurate legal advice.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
