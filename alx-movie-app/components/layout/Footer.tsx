import React from 'react';
import Link from 'next/link';

interface FooterProps {
  year?: number;
  companyName?: string;
}

/**
 * Footer Layout Component
 * Displays the application footer with links and copyright information
 */
const Footer: React.FC<FooterProps> = ({
  year = new Date().getFullYear(),
  companyName = 'MovieDB',
}) => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm">
              {companyName} provides comprehensive movie and TV show information powered by TMDB API.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-blue-400 transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://developer.themoviedb.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  API Docs
                </a>
              </li>
              <li>
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  TMDB
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@moviedb.com" className="hover:text-blue-400 transition">
                  support@moviedb.com
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {year} {companyName}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-blue-400 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
