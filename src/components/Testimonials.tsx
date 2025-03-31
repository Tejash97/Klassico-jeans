
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sophia Martinez",
    title: "Fashion Influencer",
    quote: "Klassico's bespoke blazers got me featured in Vogue! The attention to detail and fit is unmatched in today's fashion landscape.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Alexander Chen",
    title: "Executive Director",
    quote: "The Milano Slim Fit jeans are the perfect balance of comfort and style. I can transition from boardroom meetings to evening events effortlessly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Shah",
    title: "Lifestyle Blogger",
    quote: "As someone who appreciates cultural fusion in fashion, Klassico's saree collection is a dream. Traditional craftsmanship with modern sensibilities.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Art Director",
    quote: "The virtual styling consultation transformed my wardrobe. The personal attention to my style preferences was refreshing in today's digital age.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Auto-scroll functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, isAnimating]);
  
  // Reset interval on manual navigation
  const handleManualNavigation = (callback: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    callback();
    
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  return (
    <section className="py-24 bg-klassico-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-klassico-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-klassico-gold/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="tag opacity-0 animate-fade-up">Testimonials</span>
          <h2 className="section-title opacity-0 animate-fade-up stagger-1">Client Experiences</h2>
          <p className="section-subtitle opacity-0 animate-fade-up stagger-2">
            Hear from our clients who have experienced the Klassico difference
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-elegant text-klassico-charcoal hover:bg-klassico-gold hover:text-white transition-colors"
              onClick={() => handleManualNavigation(prevTestimonial)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-elegant text-klassico-charcoal hover:bg-klassico-gold hover:text-white transition-colors"
              onClick={() => handleManualNavigation(nextTestimonial)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Testimonial Cards */}
          <div className="relative h-[360px] md:h-[300px] opacity-0 animate-fade-up stagger-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 flex transition-all duration-500 ease-in-out",
                  activeIndex === index 
                    ? "opacity-100 translate-x-0 z-10" 
                    : index < activeIndex 
                      ? "opacity-0 -translate-x-full z-0" 
                      : "opacity-0 translate-x-full z-0"
                )}
              >
                <div className="w-full flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-lg shadow-elegant">
                  {/* Avatar */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full border-2 border-klassico-gold/30"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4", 
                            i < testimonial.rating ? "text-klassico-gold fill-klassico-gold" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                    
                    {/* Author */}
                    <div>
                      <h4 className="font-display text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-klassico-muted">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "w-8 bg-klassico-gold" 
                    : "bg-klassico-gold/30 hover:bg-klassico-gold/50"
                )}
                onClick={() => handleManualNavigation(() => setActiveIndex(index))}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
