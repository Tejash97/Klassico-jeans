
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '@/services/ProductService';
import { Badge } from '@/components/ui/badge';
import { Tag, ChevronLeft } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug || ''),
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
          <Link 
            to={`/category/${product?.categoryName?.toLowerCase()}`} 
            className="inline-flex items-center text-sm mb-6 hover:underline text-klassico-charcoal/70"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to {product?.categoryName || 'Products'}
          </Link>

          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              Loading product details...
            </div>
          ) : error || !product ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-display">Product not found</h2>
              <p className="mt-2 text-muted-foreground">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/" className="mt-4 inline-block underline">
                Return to home page
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="rounded-lg overflow-hidden bg-klassico-light">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-auto aspect-[4/5] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-muted flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <Link 
                    to={`/category/${product.categoryName?.toLowerCase()}`}
                    className="text-sm text-klassico-charcoal/70 hover:underline"
                  >
                    {product.categoryName}
                  </Link>
                </div>

                <h1 className="text-3xl md:text-4xl font-display mb-4">{product.name}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags && product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-2xl font-medium text-klassico-gold mb-6">
                  {formatPrice(product.price)}
                </p>

                <div className="border-t border-b border-klassico-charcoal/10 py-6 mb-6">
                  <p className="text-klassico-charcoal/80">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-6">
                    <Badge variant={product.in_stock ? "default" : "destructive"} className="text-sm">
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>

                  <WhatsAppButton 
                    productName={product.name}
                    className="w-full md:w-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
