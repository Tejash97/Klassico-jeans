
import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Pencil, Trash2, Plus, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  getProducts, 
  deleteProduct, 
  Product
} from '@/services/ProductService';
import ProductForm from './ProductForm';

const ProductManager: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await deleteProduct(id);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setIsFormOpen(false);
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedProduct(null)}>
              <Plus className="mr-2" size={16} /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm 
              product={selectedProduct} 
              onClose={handleFormClose} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.name}
                  {product.featured && (
                    <Badge variant="secondary" className="ml-2">Featured</Badge>
                  )}
                </TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <Badge variant={product.in_stock ? "default" : "destructive"}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.tags && product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Tag size={12} />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductManager;
