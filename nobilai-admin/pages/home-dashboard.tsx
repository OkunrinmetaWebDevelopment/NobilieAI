// pages/home-dashboard.tsx
import { withAuth, withServerAuth } from '@/lib/withAuth';
import { DashboardCard } from '@/components/DashboardCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const getServerSideProps = withServerAuth;

function Home() {
  const dashboardCards = [
    {
      href: "/admin/directions",
      title: "Upload Location Directions",
      description: "Get educational insights from your documents.",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    {
      href: "/admin/upload",
      title: "Upload RAG Files",
      description: "Navigate and explore Mauritius easily.",
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-700",
    },
    {
      href: "/admin/locations",
      title: "Verify Locations",
      description: "Get accurate legal advice.",
      bgColor: "bg-gray-800",
      hoverColor: "hover:bg-gray-900",
    },
    {
      href: "/admin/settings",
      title: "Settings",
      description: "Provide directions to a specified location.",
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-700",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Welcome to Noblie AI Admin</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <DashboardCard
                key={index}
                href={card.href}
                title={card.title}
                description={card.description}
                bgColor={card.bgColor}
                hoverColor={card.hoverColor}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default withAuth(Home);
