import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  onSearchChange?: (query: string) => void;
}

/**
 * Main Layout Component
 * Wraps all pages with consistent header and footer
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'MovieDB',
  showHeader = true,
  showFooter = true,
  onSearchChange,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header */}
      {showHeader && <Header title={title} onSearchChange={onSearchChange} />}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer companyName={title} />}
    </div>
  );
};

export default Layout;
