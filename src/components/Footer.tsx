
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-klassico-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div>
            <a href="#" className="inline-block text-2xl font-display font-semibold tracking-wider mb-6">
              Klassico<span className="text-klassico-gold">.</span>
            </a>
            <p className="text-white/70 mb-6">
              Where Heritage Meets Haute Couture – Timeless Styles, Unmatched Comfort.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-medium mb-6">Collections</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Premium Jeans</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Bespoke Blazers</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Luxury Kurtis</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Designer Sarees</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Limited Editions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Craftsmanship</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Sustainability</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Store Locations</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Size Guide</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Product Care</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Sustainability Badge */}
        <div className="border-t border-white/10 pt-8 pb-10 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-14 h-14 rounded-full border border-klassico-gold/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-klassico-gold/20 flex items-center justify-center">
                <span className="text-klassico-gold text-lg font-display">K</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-display">Klassico Jeans</h4>
              <p className="text-white/70 text-sm">Founded by Shubham Mishra</p>
            </div>
          </div>
          

        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Klassico. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
