import React, { useState, useEffect, useRef } from 'react';
import { ApiHubLogo, CloseIcon, MenuIcon, ChevronDownIcon } from './icons';

interface HeaderProps {
  onSignInClick: () => void;
  onApiDirectoryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick, onApiDirectoryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Explore APIs', action: onApiDirectoryClick },
    { 
      name: 'Resources', 
      dropdownItems: [
        { name: 'Explore API Setu', action: () => {} },
        { name: 'Utilities', action: () => {} },
        { name: 'API Policy', action: () => {} },
        { name: 'Data Standards', action: () => {} },
        { name: 'Developers', action: () => {} },
        { name: 'Digilocker', action: () => {} },
        { name: 'Standard Operating Procedure', action: () => {} },
        { name: 'Information Videos', action: () => {} },
      ]
    },
    { 
      name: 'Category', 
      dropdownItems: [
        { name: 'Health', action: () => {} },
        { name: 'Finance', action: () => {} },
        { name: 'Education', action: () => {} },
        { name: 'Transport', action: () => {} },
        { name: 'Agriculture', action: () => {} },
        { name: 'Utilities', action: () => {} },
      ]
    },
    { name: 'Blog', action: () => {} },
    { name: 'Join Us', action: () => {} },
  ];
  
  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const handleLinkClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <button onClick={() => window.location.reload()} aria-label="Go to homepage">
                <ApiHubLogo className="h-8 w-auto" />
              </button>
            </div>

            <nav ref={navRef} className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  <button
                    onClick={() => (link.dropdownItems ? handleDropdownToggle(link.name) : link.action?.())}
                    className="flex items-center space-x-1 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                    aria-haspopup={!!link.dropdownItems}
                    aria-expanded={openDropdown === link.name}
                  >
                    <span>{link.name}</span>
                    {link.dropdownItems && <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </button>

                  {link.dropdownItems && openDropdown === link.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 origin-top animate-fade-in py-1">
                      {link.dropdownItems.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            item.action();
                            setOpenDropdown(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={onSignInClick}
                className="px-6 py-2 font-semibold text-blue-600 rounded-full hover:bg-blue-600/10 transition-all duration-300"
              >
                Log In
              </button>
              <button
                onClick={onSignInClick}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
            
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="text-slate-600 hover:text-blue-600 focus:outline-none" aria-label="Open menu">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <ApiHubLogo />
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-500 hover:text-blue-600" aria-label="Close menu">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                 {/* A simple implementation for mobile. Could be an accordion later. */}
                <button onClick={() => handleLinkClick(link.action || (() => {}))} className="w-full text-left font-semibold text-lg text-slate-700 hover:text-blue-600 p-3 rounded-md hover:bg-slate-100 transition-colors">
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-2 space-y-3">
             <button
              onClick={() => handleLinkClick(onSignInClick)}
              className="w-full text-center px-6 py-3 bg-slate-100 text-blue-600 font-semibold rounded-full hover:bg-slate-200 transition-all duration-300"
            >
              Log In
            </button>
            <button
              onClick={() => handleLinkClick(onSignInClick)}
              className="w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              Create Account
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
