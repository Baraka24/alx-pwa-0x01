import React from 'react';
import Link from 'next/link';
import Button from './Button';

interface HeaderProps {
  title?: string;
  showNav?: boolean;
  onSearchChange?: (query: string) => void;
}

/**
 * Header Layout Component
 * Displays the application header with navigation and branding
 */
const Header: React.FC<HeaderProps> = ({
  title = 'MovieDB',
  showNav = true,
  onSearchChange,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo/Title */}
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">
            {title}
          </Link>

          {/* Navigation */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link href="/movies" className="hover:text-blue-400 transition">
                Movies
              </Link>
              <Link href="/about" className="hover:text-blue-400 transition">
                About
              </Link>
            </nav>
          )}

          {/* Search Bar */}
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Button */}
          <Button variant="primary" className="hidden sm:inline-block">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
