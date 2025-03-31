
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/ProductService';
import PremiumCategoryBanner from './PremiumCategoryBanner';

// Premium category descriptions
const categoryDetails = {
  blazers: {
    title: "Premium Blazers",
    description: "Elevate your style with our handcrafted blazers. Made from premium materials and tailored to perfection for the modern connoisseur.",
    image: "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  jeans: {
    title: "Designer Jeans",
    description: "Experience unparalleled comfort with our premium denim collection. Each pair blends artisanal craftsmanship with contemporary design.",
    image: "https://images.unsplash.com/photo-1715532846484-1b10ddf694d0?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  kurtis: {
    title: "Exclusive Kurtis",
    description: "Our kurtis celebrate traditional craftsmanship with modern sensibilities. Each piece tells a story through intricate detailing and premium fabrics.",
    image: "https://images.unsplash.com/photo-1570382667048-23b581258f6a?q=80&w=1915&auto=format&fit=crop"
  },
  sarees: {
    title: "Luxury Sarees",
    description: "Timeless elegance meets contemporary design. Our sarees are crafted from the finest silks and adorned with meticulous embellishments.",
    image: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
};

// Define the priority order in which we want to display categories
const priorityCategories = ['blazers', 'jeans', 'kurtis', 'sarees'];

const PremiumBanners: React.FC = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  if (isLoading || categories.length === 0) {
    return null;
  }

  // Filter categories to only include those in our priority list and that exist in the database
  const displayCategories = priorityCategories
    .map(slug => {
      const category = categories.find(cat => cat.slug === slug);
      if (!category) return null;
      
      return {
        ...category,
        ...categoryDetails[slug as keyof typeof categoryDetails]
      };
    })
    .filter(Boolean);

  return (
    <section id="premium-collections" className="py-24 bg-klassico-light relative overflow-hidden">
      {/* Premium background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-klassico-gold/20 to-klassico-gold/5 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tr from-klassico-gold/20 to-klassico-gold/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="tag opacity-0 animate-fade-up [animation-delay:100ms] tracking-[0.25em] text-klassico-gold font-medium">Klassico Premium</span>
          <h2 className="section-title opacity-0 animate-fade-up [animation-delay:200ms] text-4xl md:text-5xl font-display tracking-wide mb-4">Signature Collections</h2>
          <p className="section-subtitle opacity-0 animate-fade-up [animation-delay:300ms] text-klassico-muted max-w-2xl mx-auto leading-relaxed">
            Discover our exclusive premium collections, where timeless elegance meets contemporary sophistication
          </p>
        </div>
        
        <div className="space-y-24">
          {displayCategories.map((category, index) => (
            <PremiumCategoryBanner
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              slug={category.slug}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumBanners;
