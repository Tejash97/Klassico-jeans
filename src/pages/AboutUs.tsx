
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs: React.FC = () => {
  // Scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-klassico-charcoal/5 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-medium mb-6 text-klassico-charcoal">
              Our Story
            </h1>
            <p className="text-xl text-klassico-muted max-w-2xl mx-auto">
              The journey of redefining elegance in modern craftsmanship
            </p>
          </div>
        </div>
      </section>
      
      {/* Founding Story */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="tag">Founded in 2019</span>
              <h2 className="text-3xl md:text-4xl font-display mb-6">The Genesis of Klassico</h2>
              <p className="text-klassico-muted mb-5">
                Founded in 2019 by visionary designer Shubham Mishra, Klassico was born from a passion to create timeless fashion that bridges traditional craftsmanship with contemporary elegance.
              </p>
              <p className="text-klassico-muted mb-5">
                Our journey began in the vibrant streets of Kolkata, where rich textile traditions meet modern aspirations. Today, with flagship stores in both Kolkata and Mumbai, we continue to expand our presence while maintaining our commitment to quality and exclusivity.
              </p>
              <p className="text-klassico-muted">
                Each Klassico piece—whether it's our premium jeans, bespoke blazers, artisanal kurtis, or designer sarees—carries the signature of meticulous craftsmanship and timeless style that defines our brand ethos.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Founder's vision" 
                className="rounded-lg shadow-elegant w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-elegant max-w-xs">
                <p className="text-klassico-gold font-serif italic">"Our vision is to create fashion that isn't just worn, but experienced."</p>
                <p className="text-right mt-2 font-medium">- Shubham Mishra</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Locations */}
      <section className="py-16 md:py-24 bg-klassico-charcoal/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="tag">Experience Klassico</span>
            <h2 className="text-3xl md:text-4xl font-display mb-6">Our Flagship Stores</h2>
            <p className="text-klassico-muted max-w-2xl mx-auto">
              Visit our exclusive boutiques in Kolkata and Mumbai to experience the Klassico collections firsthand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolkata Store */}
            <div className="glass-card bg-white p-8 rounded-lg shadow-elegant">
              <h3 className="text-2xl font-display mb-4">Kolkata</h3>
              <p className="text-klassico-muted mb-4">
                Our original flagship store in the heart of Kolkata's fashion district showcases our full collection with a special focus on our artisanal sarees and kurtis.
              </p>
              <div className="mt-4 pt-4 border-t border-klassico-gold/20">
                <p className="font-medium">Park Street, Kolkata</p>
                <p className="text-klassico-muted">Open 10:00 AM - 8:00 PM, Monday to Saturday</p>
              </div>
            </div>
            
            {/* Mumbai Store */}
            <div className="glass-card bg-white p-8 rounded-lg shadow-elegant">
              <h3 className="text-2xl font-display mb-4">Mumbai</h3>
              <p className="text-klassico-muted mb-4">
                Our Mumbai boutique brings Klassico's signature style to western India, featuring our premium jeans and bespoke blazers collection.
              </p>
              <div className="mt-4 pt-4 border-t border-klassico-gold/20">
                <p className="font-medium">Bandra West, Mumbai</p>
                <p className="text-klassico-muted">Open 11:00 AM - 9:00 PM, Monday to Sunday</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="tag">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-display mb-6">Where Heritage Meets Haute Couture</h2>
            <p className="text-klassico-muted mb-8">
              At Klassico, we believe that true luxury lies in the perfect harmony between heritage craftsmanship and contemporary design. Our philosophy centers around creating timeless pieces that transcend trends and become cherished parts of your wardrobe.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
              <div>
                <h3 className="text-xl font-display mb-3">Artisanal Excellence</h3>
                <p className="text-klassico-muted">We partner with master craftspeople who bring generations of expertise to every stitch and detail.</p>
              </div>
              <div>
                <h3 className="text-xl font-display mb-3">Sustainable Luxury</h3>
                <p className="text-klassico-muted">Our commitment to ethical practices ensures that luxury and responsibility go hand in hand.</p>
              </div>
              <div>
                <h3 className="text-xl font-display mb-3">Personal Connection</h3>
                <p className="text-klassico-muted">Beyond products, we create experiences and relationships that elevate the art of dressing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* WhatsApp CTA */}
      <section className="py-16 bg-klassico-charcoal text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-6">Connect With Us</h2>
            <p className="text-white/80 mb-8">
              Have questions about our collections or want to schedule a personal styling session? Reach out to our concierge team via WhatsApp.
            </p>
            <a 
              href="https://wa.me/918910131099" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Message Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
