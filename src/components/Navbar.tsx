import React from 'react';
import { Search } from 'lucide-react';
import '../styles/Navbar.scss';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1 className="logo">MovieVerse</h1>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;