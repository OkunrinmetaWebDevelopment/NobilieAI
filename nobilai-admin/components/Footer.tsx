import React from 'react';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/solid';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { 
      title: 'Legal', 
      links: [
        { href: '/terms', label: 'Terms of Service', icon: DocumentTextIcon },
        { href: '/privacy', label: 'Privacy Policy', icon: ShieldCheckIcon },
      ]
    },
    { 
      title: 'Support', 
      links: [
        { href: '/help', label: 'Help Center', icon: QuestionMarkCircleIcon },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Noblie AI</h3>
          <p className="text-gray-400 text-sm">
            Empowering innovation through intelligent AI solutions.
          </p>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-4">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <link.icon className="h-5 w-5 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-800 pt-4">
        <p>&copy; {currentYear} Noblie AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;