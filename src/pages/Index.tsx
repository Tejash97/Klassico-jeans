
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import Craftsmanship from '@/components/Craftsmanship';
import Sustainability from '@/components/Sustainability';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import PremiumBanners from '@/components/PremiumBanners';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Index: React.FC = () => {
  const { toast } = useToast();
  
  // Scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Display welcome toast
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to Klassico",
          description: "Discover our premium collections, handcrafted for the modern connoisseur",
          duration: 5000,
        });
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 2000);
    }
  }, [toast]);

  // Add smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.pathname === window.location.pathname) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
          
          // Update URL without page jump
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PremiumBanners />
      <Collections />
      <Craftsmanship />
      <Sustainability />
      <Testimonials />
      <CTASection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
