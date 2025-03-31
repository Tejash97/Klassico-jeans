
import React from 'react';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  // Format phone number for WhatsApp link
  const whatsappNumber = "+918910131099"; // WhatsApp contact number
  const whatsappMessage = encodeURIComponent("Hello! I'd like to place an order for Klassico products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Enhanced background pattern with premium gradients */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-klassico-gold/20 to-klassico-gold/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-klassico-gold/20 to-klassico-gold/5 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Refined two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left column - WhatsApp Order with enhanced animations */}
            <div className="opacity-0 animate-fade-up [animation-delay:200ms] transform hover:translate-y-[-5px] transition-all duration-500 ease-out">
              <div className="glass-card bg-white/80 backdrop-blur-sm border border-klassico-gold/30 p-8 rounded-2xl shadow-golden h-full flex flex-col relative overflow-hidden group hover:border-klassico-gold/50 transition-all duration-500">
                {/* Premium badge with refined styling */}
                <div className="absolute -right-12 top-6 bg-gradient-to-r from-klassico-gold to-klassico-gold/80 text-white px-12 py-1 transform rotate-45 text-xs font-medium tracking-[0.2em] uppercase">
                  Premium
                </div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-klassico-gold/20 to-klassico-gold/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="w-7 h-7 text-klassico-gold group-hover:rotate-12 transition-transform duration-500" />
                </div>
                
                <h3 className="text-2xl font-display mb-4 tracking-wide">Order via WhatsApp</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow leading-relaxed">
                  Simply message us on WhatsApp to place your order. Our concierge will guide you through the selection process and assist with sizing, customization, and delivery options.
                </p>
                
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2 group/btn hover:shadow-lg transition-all duration-500"
                >
                  <span>WhatsApp Order Concierge</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            {/* Right column - Limited Stock with enhanced animations */}
            <div className="opacity-0 animate-fade-up [animation-delay:400ms] transform hover:translate-y-[-5px] transition-all duration-500 ease-out">
              <div className="glass-card bg-white/80 backdrop-blur-sm border border-klassico-gold/30 p-8 rounded-2xl shadow-golden h-full flex flex-col relative overflow-hidden group hover:border-klassico-gold/50 transition-all duration-500">
                {/* Hot badge with refined styling */}
                <div className="absolute -right-12 top-6 bg-gradient-to-r from-red-500 to-red-400 text-white px-12 py-1 transform rotate-45 text-xs font-medium tracking-[0.2em] uppercase">
                  Hot Sale
                </div>
                
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-klassico-gold/20 to-klassico-gold/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ShoppingBag className="w-7 h-7 text-klassico-gold group-hover:rotate-12 transition-transform duration-500" />
                </div>
                
                <h3 className="text-2xl font-display mb-4 tracking-wide">Limited Edition Collection</h3>
                
                <p className="text-klassico-muted mb-6 flex-grow leading-relaxed">
                  Our newest premium collection of jeans, blazers, kurtis and sarees is almost sold out. Only a few pieces remain—secure yours before they're gone forever.
                </p>
                
                <div className="bg-gradient-to-r from-klassico-charcoal to-klassico-charcoal/90 text-white p-4 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden group/stock">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-400/20 w-1/3 animate-pulse"></div>
                  <span className="font-medium relative z-10 tracking-wide group-hover/stock:tracking-wider transition-all duration-500">Only 3 Left in This Edition</span>
                </div>
                
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full flex items-center justify-center gap-2 group/btn hover:shadow-lg transition-all duration-500">
                  <span>Order Now via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
