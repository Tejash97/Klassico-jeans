
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import NavbarAuth from './NavbarAuth';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Menu items with paths
  const menuItems = [
    { name: 'Collections', path: '/#collections' },
    { name: 'Craftsmanship', path: '/#craftsmanship' },
    { name: 'Sustainability', path: '/#sustainability' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "relative z-10 text-2xl font-display font-semibold tracking-wider",
              isScrolled ? "text-klassico-charcoal" : "text-white"
            )}
          >
            Klassico
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "relative menu-link text-sm font-medium tracking-wide transition-colors",
                      isScrolled 
                        ? "text-klassico-charcoal/90 hover:text-klassico-charcoal" 
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-5">
            <a 
              href="https://wa.me/918910131099"
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-sm transition-colors",
                isScrolled 
                  ? "bg-klassico-charcoal/5 text-klassico-charcoal hover:bg-klassico-charcoal/10" 
                  : "bg-klassico-gold/10 text-white hover:bg-klassico-gold/20"
              )}
            >
              Order via WhatsApp
            </a>
            
            <NavbarAuth />
            
            <button 
              className={cn(
                "relative w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                isScrolled 
                  ? "text-klassico-charcoal hover:bg-klassico-charcoal/5" 
                  : "text-white hover:bg-white/5"
              )}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="cart-badge">2</span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={cn(
                "relative z-10 md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors",
                isScrolled 
                  ? "text-klassico-charcoal hover:bg-klassico-charcoal/5" 
                  : "text-white hover:bg-white/5"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center transition-all duration-500 z-[40]",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="w-full">
          <ul className="flex flex-col items-center space-y-8">
            {menuItems.map((item) => (
              <li key={item.name} className="w-full text-center">
                <Link 
                  to={item.path} 
                  className="block text-xl font-medium tracking-wide text-klassico-charcoal py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="w-full text-center pt-6">
              <a 
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-white bg-klassico-gold rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order via WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
