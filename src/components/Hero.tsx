
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && textRef.current) {
        const scrollY = window.scrollY;
        const opacity = 1 - Math.min(1, scrollY / 700);
        const translateY = scrollY * 0.3;
        
        textRef.current.style.opacity = `${opacity}`;
        textRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-klassico-charcoal/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-klassico-charcoal/30 to-klassico-charcoal/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Elegant model wearing Klassico" 
          className="w-full h-full object-cover object-center animate-scale-in"
        />
      </div>
      
      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center"
      >
        <div className="space-y-6 max-w-4xl mx-auto">
          <h2 className="opacity-0 animate-fade-up font-serif text-white text-lg md:text-xl lg:text-2xl italic font-light tracking-wide stagger-1">
            Heritage in Every Stitch, Luxury in Every Detail
          </h2>
          
          <h1 className="opacity-0 animate-fade-up font-display text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-[0.25em] stagger-2">
            KLASSICO<span className="text-klassico-gold tracking-normal">.</span>
          </h1>
          
          <p className="opacity-0 animate-fade-up text-white/90 text-lg md:text-xl max-w-2xl mx-auto stagger-3">
            Timeless Styles, Unmatched Comfort – Redefining Elegance in Modern Craftsmanship
          </p>
          
          <div className="opacity-0 animate-fade-up pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 stagger-4">
            <a href="#collections" className="btn-primary">
              Explore Collections
            </a>
            <a href="#exclusivity" className="btn-secondary">
              Our Exclusivity
            </a>
          </div>
          
          <div className="opacity-0 animate-fade-up pt-16 animate-float stagger-5">
            <a 
              href="#collections"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors"
              aria-label="Scroll down"
            >
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
