
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory, getCategories } from '@/services/ProductService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from '@/components/WhatsAppButton';

const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
  
  const category = categories.find(c => c.slug === slug);
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => getProductsByCategory(slug || ''),
    enabled: !!slug
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display mb-3">
              {category?.name || 'Products'}
            </h1>
            {category?.description && (
              <p className="text-klassico-charcoal/70 max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-display">No products found</h2>
              <p className="mt-2 text-muted-foreground">
                There are no products available in this category yet.
              </p>
              <Link to="/" className="mt-4 inline-block underline">
                Return to home page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <div key={product.id} className="product-card group">
                  <Link to={`/product/${product.slug}`}>
                    <div className="relative mb-5 overflow-hidden rounded-md">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="product-image w-full aspect-[3/4] object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                      
                      {/* Quick actions */}
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <WhatsAppButton 
                          productName={product.name}
                          className="w-full"
                        />
                      </div>
                      
                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                          {product.tags.map((tag, i) => (
                            <span key={i} className="py-1 px-3 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Featured badge */}
                      {product.featured && (
                        <div className="absolute top-4 right-4 z-20">
                          <Badge>Featured</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-display text-xl mb-1">{product.name}</h3>
                  </Link>
                  <p className="text-klassico-gold font-medium">{formatPrice(product.price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
