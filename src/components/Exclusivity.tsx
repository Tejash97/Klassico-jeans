
import React from 'react';
import { Calendar, ShoppingBag, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: '"By Invitation" Pre-Launch Access',
    description: 'Exclusive first access to limited edition collections before they become available to the public.',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Personalized Styling',
    description: 'Complimentary one-to-one virtual consultations with our expert stylists to curate your perfect look.',
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: 'Free Monogramming',
    description: 'Personalize select blazers and denim with your initials, crafted by our master artisans.',
  },
];

const Exclusivity: React.FC = () => {
  return (
    <section id="exclusivity" className="py-24 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-klassico-charcoal/90 backdrop-blur-sm z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop" 
          alt="Luxury background" 
          className="w-full h-full object-cover parallax"
          style={{ transform: 'translateY(-5%)' }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="tag bg-white/10 text-white opacity-0 animate-fade-up">Premium Experience</span>
          <h2 className="section-title text-white opacity-0 animate-fade-up stagger-1">Exclusivity Redefined</h2>
          <p className="section-subtitle text-white/80 opacity-0 animate-fade-up stagger-2">
            Beyond just clothing, Klassico offers a complete luxury experience tailored to you
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-lg opacity-0 animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-klassico-gold/20 text-klassico-gold mb-6">
                {feature.icon}
              </div>
              <h3 className="text-white text-xl font-display mb-4">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-20 text-center opacity-0 animate-fade-up stagger-5">
          <a href="#" className="btn-primary bg-white text-klassico-charcoal hover:bg-white/90">
            Join Klassico Inner Circle
          </a>
          <p className="mt-4 text-white/60 text-sm">Limited memberships available</p>
        </div>
      </div>
    </section>
  );
};

export default Exclusivity;
