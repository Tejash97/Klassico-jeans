
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type PremiumCategoryBannerProps = {
  title: string;
  description: string;
  image: string;
  slug: string;
  position?: 'left' | 'right';
};

const PremiumCategoryBanner: React.FC<PremiumCategoryBannerProps> = ({
  title,
  description,
  image,
  slug,
  position = 'left'
}) => {
  const isLeft = position === 'left';
  
  return (
    <div className="opacity-0 animate-fade-up bg-white overflow-hidden rounded-xl shadow-elegant mb-10">
      <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
        <div className="lg:w-1/2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src={image} 
            alt={title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 z-20 bg-klassico-gold rounded-full p-3 shadow-golden opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h3 className="font-display text-3xl md:text-4xl mb-3 text-klassico-charcoal">
            {title}
            <span className="text-klassico-gold">.</span>
          </h3>
          
          <p className="text-klassico-muted mb-6">
            {description}
          </p>
          
          <Link 
            to={`/category/${slug}`}
            className="self-start btn-secondary group flex items-center gap-2 hover:bg-klassico-gold hover:text-white transition-colors duration-300"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PremiumCategoryBanner;
