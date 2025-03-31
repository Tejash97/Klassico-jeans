
import React from 'react';

const Sustainability: React.FC = () => {
  return (
    <section id="sustainability" className="py-24 bg-klassico-charcoal text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="tag bg-white/10 text-white opacity-0 animate-fade-up">Our Promise</span>
          <h2 className="section-title text-white opacity-0 animate-fade-up stagger-1">Ethical Luxury</h2>
          <p className="section-subtitle text-white/80 opacity-0 animate-fade-up stagger-2">
            Sustainability isn't just a buzzword for us—it's woven into the fabric of everything we create
          </p>
        </div>
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <div className="opacity-0 animate-fade-up stagger-3">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border border-klassico-gold/30 rounded-sm -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Sustainable production" 
                className="w-full rounded-sm"
              />
            </div>
          </div>
          
          {/* Right column - Features */}
          <div className="opacity-0 animate-fade-up stagger-4">
            <div className="space-y-8">
              <div className="p-6 border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <h3 className="text-xl font-display mb-3">Sustainable Sourcing</h3>
                <p className="text-white/70">All our materials are ethically sourced from certified suppliers who adhere to the highest environmental and social standards.</p>
              </div>
              
              <div className="p-6 border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <h3 className="text-xl font-display mb-3">Zero-Waste Production</h3>
                <p className="text-white/70">Our innovative production processes minimize waste, and any fabric scraps are repurposed into accessories or recycled.</p>
              </div>
              
              <div className="p-6 border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <h3 className="text-xl font-display mb-3">Carbon-Neutral Shipping</h3>
                <p className="text-white/70">We offset 100% of carbon emissions from shipping and use eco-friendly packaging made from biodegradable materials.</p>
              </div>
              
              <div className="p-6 border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <h3 className="text-xl font-display mb-3">Longevity by Design</h3>
                <p className="text-white/70">Each piece is designed to last for years, not seasons, reducing the environmental impact of fast fashion.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sustainability Badge */}
        <div className="mt-20 flex justify-center opacity-0 animate-fade-up stagger-5">
          <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full py-2 px-6">
            <span className="text-xl text-klassico-gold font-display">KLASSICO JEANS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
