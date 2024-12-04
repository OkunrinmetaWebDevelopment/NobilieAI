// components/DashboardCard.tsx
import Link from 'next/link';

interface DashboardCardProps {
  href: string;
  title: string;
  description: string;
  bgColor: string;
  hoverColor: string;
}

export function DashboardCard({ 
  href, 
  title, 
  description, 
  bgColor, 
  hoverColor 
}: DashboardCardProps) {
  return (
    <Link href={href} className="h-full">
      <div className={`p-6 ${bgColor} text-white rounded-lg shadow-md ${hoverColor} cursor-pointer h-full flex flex-col`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 flex-grow">{description}</p>
      </div>
    </Link>
  );
}